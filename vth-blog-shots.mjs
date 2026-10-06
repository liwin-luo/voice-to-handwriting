import { chromium } from "@playwright/test";

/** 为 US 市场 blog 文章批量截取英文功能图:1440×900,截 main 区域 */
const BASE = "http://localhost:3459";
const OUT = "/Users/luogangming/projects-b/voicetohandwriting/public/blog";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

async function shot(url, action, file) {
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.setItem("vth-consent", "accepted"));
  await page.evaluate(() => document.fonts.ready);
  if (action) await action();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/${file}.png` });
  console.log("saved", file);
}

const fill = (text) => async () => {
  await page.locator("aside textarea").fill(text);
  await page.waitForTimeout(900);
};
const pickFont = async (label) => {
  await page.locator("aside select").first().selectOption(label);
  await page.waitForTimeout(700);
};

// 1. 姓名描红(Patrick Hand,双名字)
await shot("/name-tracing", fill("Emma\nWilliam"), "tracing-worksheet");

// 2. 描红 · 花体签名(Cedarville Cursive)
await shot("/name-tracing", async () => {
  await page.locator("aside textarea").fill("Love, Emma");
  await pickFont("cedarvillecursive");
  await page.waitForTimeout(900);
}, "tracing-cursive");

// 3. 大学 ruled 打印纸(默认即可,含红色边线)
await shot("/printable-paper", null, "lined-paper");

// 4. 三线格 handwriting 纸
await shot("/printable-paper", async () => {
  await page.getByRole("button", { name: "Handwriting (3-line)" }).click();
  await page.waitForTimeout(600);
}, "handwriting-paper");

// 5. /cursive 默认预设 + 全字母 pangram
await shot("/cursive", fill("The quick brown fox jumps over the lazy dog"), "cursive-workspace");

// 6. /cursive 字母家族行(alphabet chart)
await shot("/cursive", fill("c a d g o q\nn m h b r p\nl f k j i t\nu w e s v x y z"), "cursive-alphabet");

// 7. /cursive Dancing Script 签名
await shot("/cursive", async () => {
  await page.locator("aside textarea").fill("Emma Rose Bennett");
  await pickFont("dancingscript");
  await page.waitForTimeout(900);
}, "cursive-signature");

// 8. /cursive Dancing Script 婚礼名单
await shot("/cursive", async () => {
  await page.locator("aside textarea").fill("Emma & Liam\nSophia & James\nOlivia & Noah\nWelcome to our wedding");
  await pickFont("dancingscript");
  await page.waitForTimeout(900);
}, "wedding-script");

// 9. 给圣诞老人的信(Patrick Hand + 横线纸)
await shot("/", async () => {
  await page
    .locator("aside textarea")
    .fill("Dear Santa,\nMy name is Mia and I am five. This year I shared my toys and learned to ride a bike!\nFor Christmas, may I please have art supplies?\nI will leave cookies for you and carrots for the reindeer.\nLove, Mia");
  await pickFont("patrickhand");
  await page.locator("aside select").nth(1).selectOption("ruled");
  await page.waitForTimeout(900);
}, "santa-letter");

// 10. 感谢信模板页
await shot("/templates/thank-you-letter", null, "thank-you-note");

// 11. 笔友信(Indie Flower)
await shot("/", async () => {
  await page
    .locator("aside textarea")
    .fill("Dear Mateo,\nOctober 12, 2026\nI lost my first tooth! My dog Biscuit ate my sandwich.\nWhat is the weather like where you live? Do you have pizza Friday?\nYour friend,\nLily");
  await pickFont("indieflower");
  await page.waitForTimeout(900);
}, "pen-pal-letter");

// 12. 成人练字 pangram(Kalam + 横线纸)
await shot("/", async () => {
  await page
    .locator("aside textarea")
    .fill("The quick brown fox jumps over the lazy dog.\nPack my box with five dozen liquor jugs.");
  await pickFont("kalam");
  await page.locator("aside select").nth(1).selectOption("ruled");
  await page.waitForTimeout(900);
}, "adult-practice");

await browser.close();
console.log("all done");
