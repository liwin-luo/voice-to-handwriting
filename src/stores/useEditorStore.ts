import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CustomPaperConfig } from "@/engine/paper";

export const FONTS = [
  { id: "mashanzheng", css: "'Ma Shan Zheng', 'Kaiti SC', 'KaiTi', serif" },
  { id: "lxgwwenkai", css: "'LXGW WenKai', 'Kaiti SC', 'KaiTi', serif" },
  { id: "longcang", css: "'Long Cang', 'Kaiti SC', 'KaiTi', serif" },
  { id: "zhimangxing", css: "'Zhi Mang Xing', 'Kaiti SC', 'KaiTi', serif" },
  { id: "liujianmaocao", css: "'Liu Jian Mao Cao', 'Kaiti SC', 'KaiTi', serif" },
  { id: "zcoolkuaile", css: "'ZCOOL KuaiLe', 'PingFang SC', sans-serif" },
  { id: "caveat", css: "'Caveat', cursive" },
  { id: "patrickhand", css: "'Patrick Hand', 'Comic Sans MS', cursive" },
  { id: "kalam", css: "'Kalam', 'Comic Sans MS', cursive" },
  { id: "indieflower", css: "'Indie Flower', 'Comic Sans MS', cursive" },
  { id: "dancingscript", css: "'Dancing Script', cursive" },
  { id: "cedarvillecursive", css: "'Cedarville Cursive', cursive" },
  { id: "kleeone", css: "'Klee One', 'Hiragino Mincho ProN', serif" },
  { id: "nanumpenscript", css: "'Nanum Pen Script', cursive" },
] as const;
export type FontId = (typeof FONTS)[number]["id"];

export const INKS = [
  { id: "blueblack", value: "#15317e" },
  { id: "black", value: "#1a1a1a" },
  { id: "red", value: "#8c1f28" },
  { id: "indigo", value: "#303f9f" },
  { id: "green", value: "#1b4332" },
  { id: "brown", value: "#6d4c41" },
  { id: "gray", value: "#4b5563" },
] as const;

export type TextAlign = "left" | "center";

interface EditorState {
  text: string;
  fontId: FontId;
  paperId: string;
  ink: string;
  fontSize: number;
  intensity: number; // 0~1 仿真度
  seed: number;
  align: TextAlign; // 文字排列:左对齐/居中
  indent: boolean; // 段落首行缩进两格
  watermark: boolean; // 导出图品牌水印
  composing: boolean; // 输入法组词中(用于暂停重预览,不持久化)
  setText: (t: string) => void;
  appendText: (t: string) => void;
  setFontId: (id: FontId) => void;
  setPaperId: (id: string) => void;
  setInk: (v: string) => void;
  setFontSize: (n: number) => void;
  setIntensity: (n: number) => void;
  setAlign: (a: TextAlign) => void;
  setIndent: (v: boolean) => void;
  setWatermark: (v: boolean) => void;
  setComposing: (v: boolean) => void;
  customPaper: CustomPaperConfig;
  setCustomPaper: (p: Partial<CustomPaperConfig>) => void;
  reseed: () => void;
  reset: () => void;
}

const initial = {
  text: "",
  fontId: "mashanzheng" as FontId,
  paperId: "ruled",
  ink: INKS[0].value,
  fontSize: 28,
  intensity: 0.6,
  seed: 20261006,
  align: "left" as TextAlign,
  indent: false,
  watermark: true,
  composing: false,
  customPaper: {
    bg: "#fffdf8",
    line: "#c7d4e3",
    spacing: 40,
    mode: "ruled" as "blank" | "ruled" | "grid",
  },
};

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      ...initial,
      setText: (text) => set({ text }),
      appendText: (t) => set((s) => ({ text: s.text + t })),
      setFontId: (fontId) => set({ fontId }),
      setPaperId: (paperId) => set({ paperId }),
      setInk: (ink) => set({ ink }),
      setFontSize: (fontSize) => set({ fontSize }),
      setIntensity: (intensity) => set({ intensity }),
      setAlign: (align) => set({ align }),
      setIndent: (indent) => set({ indent }),
      setWatermark: (watermark) => set({ watermark }),
      setComposing: (composing) => set({ composing }),
      setCustomPaper: (patch) => set((s) => ({ customPaper: { ...s.customPaper, ...patch } })),
      reseed: () => set({ seed: Math.floor(Math.random() * 2 ** 31) }),
      reset: () => set({ ...initial }),
    }),
    {
      name: "vth-prefs",
      partialize: (s) => ({
        fontId: s.fontId,
        paperId: s.paperId,
        ink: s.ink,
        fontSize: s.fontSize,
        intensity: s.intensity,
        align: s.align,
        indent: s.indent,
        watermark: s.watermark,
        customPaper: s.customPaper,
      }), // 只持久化样式偏好,不持久化正文
    },
  ),
);
