/** /cursive-font-generator 字体目录:站内捆绑的拉丁手写字体 + license 信息。
 *  全部为 Google Fonts 收录的 SIL OFL 1.1 开源字体,商用免授权费;
 *  作者与出处逐款标注——下载站的 license 混杂是竞品实证痛点。
 *  签名体只在这一页出现,不进主工作台 FONTS:整段书信用高对比签名体会难读。 */

export interface FontCatalogEntry {
  id: string;
  displayName: string;
  /** CSS font-family,与 public/fonts/<id>/result.css 里的 font-family 一致 */
  css: string;
  author: string;
  license: "SIL Open Font License 1.1";
  /** Google Fonts 字体页(外链,不打包分发字体文件) */
  sourceUrl: string;
  /** 风格标签(英文,页面即 en 语境关键词) */
  style: "signature script" | "formal script" | "casual handwriting" | "print handwriting";
  /** 仅字体页加载。已在全站 ASYNC_FONT_CSS 里的字体不填 */
  stylesheet?: string;
}

export const FONT_CATALOG: FontCatalogEntry[] = [
  {
    id: "greatvibes",
    displayName: "Great Vibes",
    css: "'Great Vibes', cursive",
    author: "Robert E. Leuschke",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Great+Vibes",
    style: "signature script",
    stylesheet: "/fonts/greatvibes/result.css",
  },
  {
    id: "alexbrush",
    displayName: "Alex Brush",
    css: "'Alex Brush', cursive",
    author: "Robert E. Leuschke",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Alex+Brush",
    style: "signature script",
    stylesheet: "/fonts/alexbrush/result.css",
  },
  {
    id: "allura",
    displayName: "Allura",
    css: "'Allura', cursive",
    author: "Robert E. Leuschke",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Allura",
    style: "signature script",
    stylesheet: "/fonts/allura/result.css",
  },
  {
    id: "mrdafoe",
    displayName: "Mr Dafoe",
    css: "'Mr Dafoe', cursive",
    author: "Alejandro Paul",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Mr+Dafoe",
    style: "signature script",
    stylesheet: "/fonts/mrdafoe/result.css",
  },
  {
    id: "pinyonscript",
    displayName: "Pinyon Script",
    css: "'Pinyon Script', cursive",
    author: "Nicole Fally",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Pinyon+Script",
    style: "formal script",
    stylesheet: "/fonts/pinyonscript/result.css",
  },
  {
    id: "tangerine",
    displayName: "Tangerine",
    css: "'Tangerine', cursive",
    author: "Toshi Omagari",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Tangerine",
    style: "formal script",
    stylesheet: "/fonts/tangerine/result.css",
  },
  {
    id: "sacramento",
    displayName: "Sacramento",
    css: "'Sacramento', cursive",
    author: "Astigmatic",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Sacramento",
    style: "formal script",
  },
  {
    id: "dancingscript",
    displayName: "Dancing Script",
    css: "'Dancing Script', cursive",
    author: "Pablo Impallari",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Dancing+Script",
    style: "formal script",
  },
  {
    id: "cedarvillecursive",
    displayName: "Cedarville Cursive",
    css: "'Cedarville Cursive', cursive",
    author: "Kimberly Geswein",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Cedarville+Cursive",
    style: "casual handwriting",
  },
  {
    id: "caveat",
    displayName: "Caveat",
    css: "'Caveat', cursive",
    author: "Pavel Emelyanov",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Caveat",
    style: "casual handwriting",
  },
  {
    id: "indieflower",
    displayName: "Indie Flower",
    css: "'Indie Flower', cursive",
    author: "Kimberly Geswein",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Indie+Flower",
    style: "print handwriting",
  },
  {
    id: "kalam",
    displayName: "Kalam",
    css: "'Kalam', cursive",
    author: "Indian Type Foundry",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Kalam",
    style: "print handwriting",
  },
  {
    id: "patrickhand",
    displayName: "Patrick Hand",
    css: "'Patrick Hand', cursive",
    author: "Patrick Wagesreiter",
    license: "SIL Open Font License 1.1",
    sourceUrl: "https://fonts.google.com/specimen/Patrick+Hand",
    style: "print handwriting",
  },
];
