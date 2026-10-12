import { describe, expect, it } from "vitest";
import { isAbortError, transcribeErrorKey } from "./transcribe";

describe("transcribeErrorKey", () => {
  it("模型文件缺失时不归到格式错误", () => {
    const error = new Error(
      'file was not found locally at "/models/onnx-community/whisper-small/config.json"',
    );
    error.name = "ModelFileNotFoundError";
    expect(transcribeErrorKey(error)).toBe("model");
    expect(transcribeErrorKey(new TypeError("Failed to fetch"))).toBe("model");
    expect(transcribeErrorKey(new Error("Unable to decode audio data"))).toBe("import");
    const aborted = new Error("The operation was aborted.");
    aborted.name = "AbortError";
    expect(isAbortError(aborted)).toBe(true);
    expect(isAbortError(new Error("decode failed"))).toBe(false);
  });
});
