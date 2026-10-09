import type { FontId } from "@/stores/useEditorStore";

/** /cursive-font-generator 字体目录:站内捆绑的拉丁手写字体 + license 信息。
 *  全部为 Google Fonts 收录的 SIL OFL 1.1 开源字体,商用免授权费;
 *  作者与出处逐款标注——下载站的 license 混杂是竞品实证痛点。 */

export interface FontCatalogEntry {
  id: FontId;
  displayName: string;
  author: string;
  license: "SIL Open Font License 1.1";
  /** Google Fonts 字体页(外链,不打包分发字体文件) */
  sourceUrl: string;
  /** 风格标签(英文,页面即 en 语境关键词) */
  style: "formal script" | "casual handwriting" | "print handwriting";
}

export const FONT_CATALOG: FontCatalogEntry[] = [
  {
    id: "sacramento",
    displayName: "Sacramento",
    author: "Astigmatic",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Sacramento",
    style: "formal script",
  },
  {
    id: "dancingscript",
    displayName: "Dancing Script",
    author: "Pablo Impallari",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Dancing+Script",
    style: "formal script",
  },
  {
    id: "cedarvillecursive",
    displayName: "Cedarville Cursive",
    author: "Kimberly Geswein",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Cedarville+Cursive",
    style: "casual handwriting",
  },
  {
    id: "caveat",
    displayName: "Caveat",
    author: "Pavel Emelyanov",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Caveat",
    style: "casual handwriting",
  },
  {
    id: "indieflower",
    displayName: "Indie Flower",
    author: "Kimberly Geswein",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Indie+Flower",
    style: "print handwriting",
  },
  {
    id: "kalam",
    displayName: "Kalam",
    author: "Indian Type Foundry",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Kalam",
    style: "print handwriting",
  },
  {
    id: "patrickhand",
    displayName: "Patrick Hand",
    author: "Patrick Wagesreither",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Patrick+Hand",
    style: "print handwriting",
  },
];
