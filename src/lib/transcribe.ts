"use client";

/**
 * 浏览器端音频文件转写(Whisper via transformers.js)。
 * 音频全程不离开用户设备;模型首次使用时下载并缓存,之后离线可用。
 * 模型源默认走 hf-mirror.com(HuggingFace 镜像),保证国内可达。
 */

export type TranscribeModelId = "base" | "small";

const MODEL_IDS: Record<TranscribeModelId, string> = {
  base: "onnx-community/whisper-base",
  small: "onnx-community/whisper-small",
};

export interface TranscribeProgress {
  phase: "model" | "decoding" | "transcribing";
  /** 0~100,decode 阶段无百分比 */
  percent?: number;
}

type ProgressCallback = (p: TranscribeProgress) => void;

// 懒加载单例:同一模型只初始化一次
const pipelineCache = new Map<TranscribeModelId, Promise<any>>();

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

  const task = (async () => {
    const { pipeline, env } = await import("@huggingface/transformers");
    // 模型自托管在同源 /models/(scripts/models.sh 下载),无 CORS、无外部依赖、国内可达
    env.allowLocalModels = true;
    env.allowRemoteModels = false;
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
  // 失败时移除缓存,允许重试
  task.catch(() => pipelineCache.delete(modelId));
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
