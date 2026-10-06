import { fontSplit } from "cn-font-split";

const jobs = [
  { input: "fonts-src/MaShanZheng-Regular.ttf", outDir: "public/fonts/mashanzheng", family: "Ma Shan Zheng" },
  { input: "fonts-src/LongCang-Regular.ttf", outDir: "public/fonts/longcang", family: "Long Cang" },
  { input: "fonts-src/LiuJianMaoCao-Regular.ttf", outDir: "public/fonts/liujianmaocao", family: "Liu Jian Mao Cao" },
  { input: "fonts-src/Caveat[wght].ttf", outDir: "public/fonts/caveat", family: "Caveat" },
  { input: "fonts-src/ZhiMangXing-Regular.ttf", outDir: "public/fonts/zhimangxing", family: "Zhi Mang Xing" },
  { input: "fonts-src/ZCOOLKuaiLe-Regular.ttf", outDir: "public/fonts/zcoolkuaile", family: "ZCOOL KuaiLe" },
  { input: "fonts-src/LXGWWenKai-Regular.ttf", outDir: "public/fonts/lxgwwenkai", family: "LXGW WenKai" },
];

for (const j of jobs) {
  console.log("slicing", j.family);
  await fontSplit({ input: j.input, outDir: j.outDir, css: { fontFamily: j.family } });
}
console.log("done");
