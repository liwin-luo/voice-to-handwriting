#!/usr/bin/env bash
# 下载 Whisper 模型到 public/models/(同源自托管,浏览器端零外部依赖)
# 用法: npm run models
set -e

MIRROR="https://hf-mirror.com"
DEST="public/models/onnx-community"

download_model() {
  local model="$1"
  local dir="$DEST/$model"
  mkdir -p "$dir/onnx"
  echo "== $model"
  for f in config.json preprocessor_config.json tokenizer.json tokenizer_config.json generation_config.json; do
    [ -s "$dir/$f" ] || curl -fL --retry 3 "$MIRROR/onnx-community/$model/resolve/main/$f" -o "$dir/$f"
  done
  for f in encoder_model_quantized.onnx decoder_model_merged_quantized.onnx; do
    [ -s "$dir/onnx/$f" ] || curl -fL --retry 3 "$MIRROR/onnx-community/$model/resolve/main/onnx/$f" -o "$dir/onnx/$f"
  done
  du -sh "$dir"
}

download_model whisper-base
# 可选高质量模型(约 250MB,需要时取消注释)
# download_model whisper-small
echo "done"
