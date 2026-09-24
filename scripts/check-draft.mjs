import { audioFormat } from "../lib/audio-format.mjs";
import { paginate } from "../lib/paginate.mjs";
import { pdfFromJpegs } from "../lib/pdf.mjs";
import { barePath, localizedPath } from "../lib/locales.mjs";
import { sampleLetter } from "../lib/sample.mjs";

const letter = sampleLetter({
  transcript: "Write a birthday letter to my sister. Mention the trip we took in June.",
  occasion: "birthday",
});

const body = letter.paragraphs.join(" ");
if (!letter.greeting.includes("Sister")) throw new Error("expected Sister in greeting");
if (!body.includes("June")) throw new Error("expected June in the letter");
if (letter.paragraphs.length < 2) throw new Error("expected a real letter");

const thanks = sampleLetter({
  transcript: "Write a thank-you letter to my manager for backing me in the launch.",
});
if (!thanks.greeting.includes("Manager")) throw new Error("expected Manager");
if (!thanks.paragraphs.join(" ").toLowerCase().includes("launch")) throw new Error("expected launch");

if (audioFormat("audio/webm;codecs=opus") !== "webm") throw new Error("expected webm");
if (audioFormat("audio/mp4") !== "m4a") throw new Error("expected m4a for iPhone recordings");

const pages = paginate("one two three four\nfive", { maxChars: 8, lines: 2 });
if (pages.length < 2) throw new Error("expected a second page");
if (pages[0].length !== 2) throw new Error("expected two lines on the first page");

const pdf = pdfFromJpegs([
  { jpeg: new Uint8Array([1, 2, 3]), width: 10, height: 20 },
  { jpeg: new Uint8Array([4]), width: 10, height: 20 },
]);
const header = new TextDecoder().decode(pdf.slice(0, 8));
if (header !== "%PDF-1.3") throw new Error("expected a pdf");
const pdfText = new TextDecoder().decode(pdf);
if (!pdfText.includes("/Count 2")) throw new Error("expected two pdf pages");

if (localizedPath("zh", "/text") !== "/zh/text") throw new Error("expected chinese text path");
if (localizedPath("en", "/zh/faq") !== "/faq") throw new Error("expected english faq path");
if (barePath("/pt/handwriting") !== "/handwriting") throw new Error("expected bare handwriting path");
if (localizedPath("ar", "/") !== "/ar") throw new Error("expected arabic home");

console.log("ok");
