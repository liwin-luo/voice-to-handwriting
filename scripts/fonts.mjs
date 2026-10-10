import { fontSplit } from "cn-font-split";

const jobs = [
  { input: "fonts-src/MaShanZheng-Regular.ttf", outDir: "public/fonts/mashanzheng", family: "Ma Shan Zheng" },
  { input: "fonts-src/LongCang-Regular.ttf", outDir: "public/fonts/longcang", family: "Long Cang" },
  { input: "fonts-src/LiuJianMaoCao-Regular.ttf", outDir: "public/fonts/liujianmaocao", family: "Liu Jian Mao Cao" },
  { input: "fonts-src/Caveat[wght].ttf", outDir: "public/fonts/caveat", family: "Caveat" },
  { input: "fonts-src/ZhiMangXing-Regular.ttf", outDir: "public/fonts/zhimangxing", family: "Zhi Mang Xing" },
  { input: "fonts-src/ZCOOLKuaiLe-Regular.ttf", outDir: "public/fonts/zcoolkuaile", family: "ZCOOL KuaiLe" },
  { input: "fonts-src/LXGWWenKai-Regular.ttf", outDir: "public/fonts/lxgwwenkai", family: "LXGW WenKai" },
  { input: "fonts-src/PatrickHand-Regular.ttf", outDir: "public/fonts/patrickhand", family: "Patrick Hand" },
  { input: "fonts-src/Kalam-Regular.ttf", outDir: "public/fonts/kalam", family: "Kalam" },
  { input: "fonts-src/IndieFlower-Regular.ttf", outDir: "public/fonts/indieflower", family: "Indie Flower" },
  { input: "fonts-src/DancingScript[wght].ttf", outDir: "public/fonts/dancingscript", family: "Dancing Script" },
  { input: "fonts-src/Cedarville-Cursive.ttf", outDir: "public/fonts/cedarvillecursive", family: "Cedarville Cursive" },
  { input: "fonts-src/Sacramento-Regular.ttf", outDir: "public/fonts/sacramento", family: "Sacramento" },
  { input: "fonts-src/GreatVibes-Regular.ttf", outDir: "public/fonts/greatvibes", family: "Great Vibes" },
  { input: "fonts-src/AlexBrush-Regular.ttf", outDir: "public/fonts/alexbrush", family: "Alex Brush" },
  { input: "fonts-src/Allura-Regular.ttf", outDir: "public/fonts/allura", family: "Allura" },
  { input: "fonts-src/MrDafoe-Regular.ttf", outDir: "public/fonts/mrdafoe", family: "Mr Dafoe" },
  { input: "fonts-src/PinyonScript-Regular.ttf", outDir: "public/fonts/pinyonscript", family: "Pinyon Script" },
  { input: "fonts-src/Tangerine-Regular.ttf", outDir: "public/fonts/tangerine", family: "Tangerine" },
  { input: "fonts-src/ArchitectsDaughter-Regular.ttf", outDir: "public/fonts/architectsdaughter", family: "Architects Daughter" },
  { input: "fonts-src/KleeOne-Regular.ttf", outDir: "public/fonts/kleeone", family: "Klee One" },
  { input: "fonts-src/NanumPenScript-Regular.ttf", outDir: "public/fonts/nanumpenscript", family: "Nanum Pen Script" },
];

// 传子串只切匹配项:node scripts/fonts.mjs sacramento
const filter = process.argv[2];
for (const j of jobs.filter((j) => !filter || j.outDir.includes(filter))) {
  console.log("slicing", j.family);
  await fontSplit({ input: j.input, outDir: j.outDir, css: { fontFamily: j.family } });
}
console.log("done");
