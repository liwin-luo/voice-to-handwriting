// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { setSRForTest, useSpeechRecognition } from "./useSpeechRecognition";

class FakeSR {
  static instances: FakeSR[] = [];
  lang = "";
  continuous = false;
  interimResults = false;
  onresult: any = null;
  onend: any = null;
  onerror: any = null;
  started = false;
  stopped = false;
  start() {
    this.started = true;
    FakeSR.instances.push(this);
  }
  stop() {
    this.stopped = true;
    this.onend?.();
  }
  abort() {
    this.stopped = true;
  }
}

describe("useSpeechRecognition", () => {
  beforeEach(() => {
    FakeSR.instances = [];
    setSRForTest(FakeSR as any);
  });
  afterEach(() => setSRForTest(null));

  it("start 后 onend 自动重启(模拟 Chrome 60s 断开)", async () => {
    const { result } = renderHook(() => useSpeechRecognition({ onFinal: () => {} }));
    act(() => result.current.start());
    expect(result.current.listening).toBe(true);
    act(() => FakeSR.instances[0].onend?.());
    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });
    expect(result.current.listening).toBe(true);
    expect(FakeSR.instances.length).toBeGreaterThanOrEqual(1);
  });

  it("stop 后不再重启", async () => {
    const { result } = renderHook(() => useSpeechRecognition({ onFinal: () => {} }));
    act(() => result.current.start());
    act(() => result.current.stop());
    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });
    expect(result.current.listening).toBe(false);
  });

  it("final 结果回调 onFinal 且清除 interim", () => {
    let final = "";
    const { result } = renderHook(() =>
      useSpeechRecognition({ onFinal: (t) => (final += t) }),
    );
    act(() => result.current.start());
    const rec = FakeSR.instances[0];
    act(() =>
      rec.onresult({
        resultIndex: 0,
        results: [
          { isFinal: true, 0: { transcript: "你好" } },
          { isFinal: false, 0: { transcript: "世界" } },
        ],
      }),
    );
    expect(final).toBe("你好");
    expect(result.current.interim).toBe("世界");
  });

  it("权限拒绝时停止并报错", () => {
    const { result } = renderHook(() => useSpeechRecognition({ onFinal: () => {} }));
    act(() => result.current.start());
    act(() => FakeSR.instances[0].onerror?.({ error: "not-allowed" }));
    expect(result.current.listening).toBe(false);
    expect(result.current.error).toBe("denied");
  });
});
