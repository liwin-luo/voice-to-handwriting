import { create } from "zustand";
import { persist } from "zustand/middleware";

export const FONTS = [
  { id: "mashanzheng", name: "马善政 · 楷", nameEn: "Ma Shan Zheng · Kai", css: "'Ma Shan Zheng', 'Kaiti SC', 'KaiTi', serif" },
  { id: "longcang", name: "龙藏 · 行", nameEn: "Long Cang · Running", css: "'Long Cang', 'Kaiti SC', 'KaiTi', serif" },
  { id: "liujianmaocao", name: "柳建毛草 · 草", nameEn: "Liu Jian Mao Cao · Cursive", css: "'Liu Jian Mao Cao', 'Kaiti SC', 'KaiTi', serif" },
  { id: "caveat", name: "Caveat · 英文", nameEn: "Caveat · English", css: "'Caveat', cursive" },
] as const;
export type FontId = (typeof FONTS)[number]["id"];

export const INKS = [
  { id: "blueblack", name: "蓝黑", nameEn: "Blue black", value: "#15317e" },
  { id: "black", name: "纯黑", nameEn: "Black", value: "#1a1a1a" },
  { id: "red", name: "朱红", nameEn: "Vermilion", value: "#8c1f28" },
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
  setText: (t: string) => void;
  appendText: (t: string) => void;
  setFontId: (id: FontId) => void;
  setPaperId: (id: string) => void;
  setInk: (v: string) => void;
  setFontSize: (n: number) => void;
  setIntensity: (n: number) => void;
  setAlign: (a: TextAlign) => void;
  setIndent: (v: boolean) => void;
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
      }), // 只持久化样式偏好,不持久化正文
    },
  ),
);
