"use client";

/**
 * 浏览器端音频文件转写(Whisper via transformers.js)。
 * 音频全程不离开用户设备;模型首次使用时下载并缓存,之后离线可用。
 * 模型从 Hugging Face 官方地址下载,不走本站带宽;浏览器缓存后可离线。
 */

export type TranscribeModelId = "base" | "small";

const MODEL_IDS: Record<TranscribeModelId, string> = {
  base: "onnx-community/whisper-base",
  small: "onnx-community/whisper-small",
};

/** 权重不走本站。用户多在国外,直接用 Hugging Face 官方 CDN。 */
const MODEL_HOST = "https://huggingface.co/";

export interface TranscribeProgress {
  phase: "model" | "decoding" | "transcribing";
  /** 0~100,decode 阶段无百分比 */
  percent?: number;
}

type ProgressCallback = (p: TranscribeProgress) => void;

// 懒加载单例:同一模型只初始化一次。未完成的条目可被取消删掉。
const pipelineCache = new Map<TranscribeModelId, Promise<any>>();
const readyModels = new Set<TranscribeModelId>();
let fetchGen = 0;
let activeAbort: AbortController | null = null;

const nativeFetch = globalThis.fetch.bind(globalThis);

/** 中止正在进行的模型下载。已加载完成的模型留在缓存里。 */
export function cancelTranscribe() {
  fetchGen += 1;
  activeAbort?.abort();
  activeAbort = null;
  for (const id of [...pipelineCache.keys()]) {
    if (!readyModels.has(id)) pipelineCache.delete(id);
  }
}

export function isAbortError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const name = "name" in error ? String(error.name) : "";
  const message = "message" in error ? String(error.message) : "";
  return name === "AbortError" || /abort/i.test(message);
}

/** WebGPU 是否真正可用(存在 navigator.gpu 且能拿到适配器) */
async function hasWebGPU(): Promise<boolean> {
  const gpu = (navigator as any).gpu;
  if (!gpu) return false;
  try {
    return !!(await gpu.requestAdapter());
  } catch {
    return false;
  }
}

async function getTranscriber(modelId: TranscribeModelId, onProgress: ProgressCallback) {
  const cached = pipelineCache.get(modelId);
  if (cached) return cached;

  const gen = fetchGen;
  const controller = new AbortController();
  activeAbort = controller;

  const task = (async () => {
    const { pipeline, env } = await import("@huggingface/transformers");
    // 关掉本地 /models/,否则本站有文件时会优先从站点下载
    env.allowLocalModels = false;
    env.allowRemoteModels = true;
    env.remoteHost = MODEL_HOST;
    env.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      const modelName = MODEL_IDS[modelId];
      const wrongModel = url.includes("whisper-") && !url.includes(modelName);
      if (gen !== fetchGen || controller.signal.aborted || wrongModel) {
        return Promise.reject(new DOMException("The operation was aborted.", "AbortError"));
      }
      return nativeFetch(input, { ...init, signal: controller.signal });
    };
    // 先探测适配器再定设备:ORT 会话失败后状态不可复用,不能事后回退
    const device = (await hasWebGPU()) ? "webgpu" : "wasm";
    return pipeline("automatic-speech-recognition", MODEL_IDS[modelId], {
      device: device as "webgpu" | "wasm",
      dtype: "q8",
      progress_callback: (info: { status: string; progress?: number }) => {
        if (info.status === "progress" && typeof info.progress === "number") {
          onProgress({ phase: "model", percent: Math.round(info.progress) });
        }
      },
    });
  })();

  pipelineCache.set(modelId, task);
  task.then(
    (pipeline) => {
      readyModels.add(modelId);
      pipelineCache.set(modelId, Promise.resolve(pipeline));
    },
    () => {
      readyModels.delete(modelId);
      if (pipelineCache.get(modelId) === task) pipelineCache.delete(modelId);
    },
  );
  return task;
}

/** 任意浏览器可解码的音频 → 16kHz 单声道 Float32PCM */
async function decodeToMono16k(file: File): Promise<Float32Array> {
  const buf = await file.arrayBuffer();
  const AudioCtor =
    window.AudioContext ?? (window as any).webkitAudioContext as typeof AudioContext;
  const ctx = new AudioCtor();
  try {
    const decoded = await ctx.decodeAudioData(buf);
    const length = Math.max(1, Math.ceil(decoded.duration * 16000));
    const off = new OfflineAudioContext(1, length, 16000);
    const src = off.createBufferSource();
    src.buffer = decoded;
    src.connect(off.destination);
    src.start();
    const rendered = await off.startRendering();
    return rendered.getChannelData(0);
  } finally {
    void ctx.close();
  }
}

/** 失败时界面该用哪条文案。模型文件 404 与音频解码失败不是同一件事。 */
export function transcribeErrorKey(error: unknown): "model" | "import" {
  const name = error instanceof Error ? error.name : "";
  const message = error instanceof Error ? error.message : String(error ?? "");
  if (name === "EncodingError" || /decode audio/i.test(message)) return "import";
  if (
    name === "ModelFileNotFoundError" ||
    message.includes("not found locally") ||
    /failed to fetch|network|remote file/i.test(message)
  ) {
    return "model";
  }
  return "import";
}

/** 转写音频文件,返回文本。长音频由 whisper 管线内部按 30s 窗口切分。 */
export async function transcribeAudioFile(
  file: File,
  modelId: TranscribeModelId,
  onProgress: ProgressCallback,
  /** Whisper 语言提示(不传会默认按英语解码) */
  language?: string,
): Promise<string> {
  const transcriber = await getTranscriber(modelId, onProgress);
  onProgress({ phase: "decoding" });
  const audio = await decodeToMono16k(file);
  onProgress({ phase: "transcribing" });
  const output = await transcriber(audio, {
    chunk_length_s: 30,
    stride_length_s: 5,
    return_timestamps: false,
    ...(language ? { language } : {}),
    // 简体提示:whisper 对中文易输出繁体,用 initial_prompt 推向简体
    ...(language === "zh" ? { initial_prompt: "以下是普通话的句子。" } : {}),
  });
  return (Array.isArray(output) ? output[0]?.text : output?.text)?.trim() ?? "";
}
