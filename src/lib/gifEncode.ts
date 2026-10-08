/** 把调色板索引帧写成循环播放的 GIF89a。无第三方依赖。 */

const GIF_MAX_CODE = 4096;

function lzwBytes(indices: Uint8Array, minCodeSize: number): Uint8Array {
  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;
  let codeSize = minCodeSize + 1;
  let nextCode = eoiCode + 1;
  let dict = new Map<number, number>();

  const packed: number[] = [];
  let acc = 0;
  let bits = 0;
  let clearFlag = false;
  // 码宽在写出当前码之后再加。和 GIF 常见编码器一致:本码仍用旧宽度,下一个码才用新宽度。
  const emit = (code: number) => {
    acc |= code << bits;
    bits += codeSize;
    while (bits >= 8) {
      packed.push(acc & 255);
      acc >>= 8;
      bits -= 8;
    }
    if (clearFlag) {
      codeSize = minCodeSize + 1;
      clearFlag = false;
    } else if (nextCode > (1 << codeSize) - 1 && codeSize < 12) {
      codeSize++;
    }
  };

  emit(clearCode);
  if (indices.length === 0) {
    emit(eoiCode);
    if (bits > 0) packed.push(acc & 255);
    return Uint8Array.from(packed);
  }

  let cur = indices[0];
  for (let i = 1; i < indices.length; i++) {
    const next = indices[i];
    const key = (cur << 8) | next;
    const found = dict.get(key);
    if (found !== undefined) {
      cur = found;
      continue;
    }
    emit(cur);
    if (nextCode < GIF_MAX_CODE) {
      dict.set(key, nextCode++);
    } else {
      dict = new Map();
      nextCode = eoiCode + 1;
      clearFlag = true;
      emit(clearCode);
    }
    cur = next;
  }
  emit(cur);
  emit(eoiCode);
  if (bits > 0) packed.push(acc & 255);
  return Uint8Array.from(packed);
}

function pushSubBlocks(out: number[], data: Uint8Array) {
  for (let i = 0; i < data.length; i += 255) {
    const n = Math.min(255, data.length - i);
    out.push(n);
    for (let j = 0; j < n; j++) out.push(data[i + j]);
  }
  out.push(0);
}

function u16(out: number[], n: number) {
  out.push(n & 255, (n >> 8) & 255);
}

/**
 * 3-3-2 量化下标。抗锯齿边缘会有轻微色带。
 * ponytail: 升级路径是对采样像素做 median cut,再查 15-bit 颜色表。
 */
export function indexRgb332(r: number, g: number, b: number): number {
  return (r & 0xe0) | ((g & 0xe0) >> 3) | (b >> 6);
}

export function palette332(): Uint8Array {
  const palette = new Uint8Array(256 * 3);
  for (let i = 0; i < 256; i++) {
    palette[i * 3] = Math.round(((i >> 5) & 7) * (255 / 7));
    palette[i * 3 + 1] = Math.round(((i >> 2) & 7) * (255 / 7));
    palette[i * 3 + 2] = Math.round((i & 3) * (255 / 3));
  }
  return palette;
}

/** delayCs:每帧延迟,单位是百分之一秒。loop 0 表示无限循环。 */
export function encodeGif(opts: {
  width: number;
  height: number;
  frames: Uint8Array[];
  palette: Uint8Array;
  delayCs: number;
}): Uint8Array {
  const { width, height, frames, delayCs } = opts;
  const colorCount = Math.floor(opts.palette.length / 3);
  let tableBits = 0;
  let tableSize = 2;
  while (tableSize < colorCount) {
    tableSize *= 2;
    tableBits++;
  }
  const minCodeSize = Math.max(2, tableBits + 1);
  const palette = new Uint8Array(tableSize * 3);
  palette.set(opts.palette.subarray(0, palette.length));

  const out: number[] = [];
  out.push(0x47, 0x49, 0x46, 0x38, 0x39, 0x61); // GIF89a
  u16(out, width);
  u16(out, height);
  out.push(0x80 | (7 << 4) | tableBits, 0, 0);
  for (let i = 0; i < palette.length; i++) out.push(palette[i]);

  // Netscape 循环扩展,次数 0 = 一直循环
  out.push(0x21, 0xff, 0x0b);
  for (const c of "NETSCAPE2.0") out.push(c.charCodeAt(0));
  out.push(0x03, 0x01, 0x00, 0x00, 0x00);

  for (const frame of frames) {
    out.push(0x21, 0xf9, 0x04, 0x04);
    u16(out, delayCs);
    out.push(0, 0);
    out.push(0x2c);
    u16(out, 0);
    u16(out, 0);
    u16(out, width);
    u16(out, height);
    out.push(0);
    out.push(minCodeSize);
    pushSubBlocks(out, lzwBytes(frame, minCodeSize));
  }
  out.push(0x3b);
  return Uint8Array.from(out);
}
