import { describe, expect, it } from "vitest";
import { encodeGif, indexRgb332 } from "./gifEncode";

/** 测试用解码:只解第一帧的索引,用来确认 LZW 往返 */
function decodeFirstFrame(gif: Uint8Array, pixelCount: number): number[] {
  let i = gif.indexOf(0x2c);
  expect(i).toBeGreaterThan(0);
  i += 9; // 分隔符 + 位置 + 宽高
  const packed = gif[i];
  i += 1;
  expect(packed & 0x80).toBe(0);
  const minCodeSize = gif[i++];
  const bytes: number[] = [];
  while (gif[i] !== 0) {
    const n = gif[i++];
    for (let j = 0; j < n; j++) bytes.push(gif[i++]);
  }

  const clear = 1 << minCodeSize;
  const eoi = clear + 1;
  let codeSize = minCodeSize + 1;
  let next = eoi + 1;
  const dict: number[][] = [];
  for (let c = 0; c < clear; c++) dict[c] = [c];

  let bitPos = 0;
  const read = () => {
    let code = 0;
    for (let b = 0; b < codeSize; b++) {
      const byte = bytes[bitPos >> 3] ?? 0;
      code |= ((byte >> (bitPos & 7)) & 1) << b;
      bitPos++;
    }
    return code;
  };

  expect(read()).toBe(clear);
  let prev = read();
  const out = dict[prev].slice();
  while (out.length < pixelCount) {
    const code = read();
    if (code === eoi) break;
    if (code === clear) {
      codeSize = minCodeSize + 1;
      next = eoi + 1;
      dict.length = clear;
      prev = read();
      out.push(...dict[prev]);
      continue;
    }
    const known = code < next && dict[code];
    const entry = known ? dict[code] : dict[prev].concat(dict[prev][0]);
    out.push(...entry);
    dict[next++] = dict[prev].concat(entry[0]);
    if (next > (1 << codeSize) - 1 && codeSize < 12) codeSize++;
    prev = code;
  }
  return out.slice(0, pixelCount);
}

describe("encodeGif", () => {
  it("写出循环 GIF,并且第一帧的像素能解回来", () => {
    const width = 16;
    const height = 8;
    const frame = new Uint8Array(width * height);
    for (let i = 0; i < frame.length; i++) frame[i] = (i * 3) % 4;
    const palette = new Uint8Array([0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255]);
    const gif = encodeGif({ width, height, frames: [frame], palette, delayCs: 8 });

    expect(String.fromCharCode(...gif.subarray(0, 6))).toBe("GIF89a");
    expect(String.fromCharCode(...gif)).toContain("NETSCAPE2.0");
    expect(gif[gif.length - 1]).toBe(0x3b);
    expect(decodeFirstFrame(gif, frame.length)).toEqual([...frame]);
  });

  it("两帧各自独立,长重复串也能解回来", () => {
    const frame = new Uint8Array(64);
    frame.fill(1);
    for (let i = 0; i < 64; i += 5) frame[i] = 2;
    const other = frame.map((v) => (v === 1 ? 2 : 1));
    const palette = new Uint8Array(256 * 3);
    const gif = encodeGif({
      width: 8,
      height: 8,
      frames: [frame, other],
      palette,
      delayCs: 5,
    });
    expect(decodeFirstFrame(gif, 64)).toEqual([...frame]);
  });

  it("码宽一路涨到清空字典,像素仍然对得上", () => {
    const frame = new Uint8Array(9000);
    for (let i = 0; i < frame.length; i++) frame[i] = (i * 17 + (i >> 3)) & 15;
    const palette = new Uint8Array(16 * 3);
    const gif = encodeGif({ width: 100, height: 90, frames: [frame], palette, delayCs: 7 });
    expect(decodeFirstFrame(gif, frame.length)).toEqual([...frame]);
  });
});

describe("indexRgb332", () => {
  it("黑接近 0,白是 255", () => {
    expect(indexRgb332(0, 0, 0)).toBe(0);
    expect(indexRgb332(255, 255, 255)).toBe(255);
    expect(indexRgb332(10, 10, 10)).toBe(0);
  });
});
