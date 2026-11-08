import type { Locale } from "@/i18n/routing";

export interface FaqEntry {
  q: string;
  a: string;
  /** 答案后的一条站内链接。href 不带语言前缀。 */
  link?: { href: string; label: string };
}

export interface FaqItem {
  id: string;
  i18n: Partial<Record<Locale, FaqEntry>>;
}

/** 当前语言文案,缺翻译回退英语 */
export function getFaq(faq: FaqItem, locale: Locale): FaqEntry {
  return faq.i18n[locale] ?? faq.i18n.en!;
}

/** 工具页 FAQ:仅返回当前语言有翻译的条目(避免英文 FAQ 出现在其他语言页面),
 *  新语言翻译补齐后自动出现。第一条若是「免费吗」(`id` 以 `-free` 结尾),挪到末尾,
 *  这样默认展开的是搜索问法。 */
export function getLocalizedFaqs(faqs: FaqItem[], locale: Locale): FaqEntry[] {
  const ordered = faqs[0]?.id.endsWith("-free") ? [...faqs.slice(1), faqs[0]!] : faqs;
  return ordered.filter((f) => f.i18n[locale]).map((f) => f.i18n[locale]!);
}

/** /cursive 工具页 FAQ(8 语言) */
export const CURSIVE_FAQS: FaqItem[] = [
  {
    id: "cursive-free",
    i18n: { en: {
        q: "Is the cursive writing generator free?",
        a: "Yes — no signup. A small site watermark is on by default; turn it off under More like handwriting. Both cursive fonts are open source, and PNG/PDF exports are unlimited.",
      } },
  },
  {
    id: "cursive-fonts",
    i18n: { en: {
        q: "Which cursive fonts are available?",
        a: "Two: Cedarville Cursive for everyday penmanship and Dancing Script for formal, looped writing. Size, realism and ink are adjustable before export.",
      } },
  },
  {
    id: "cursive-trace",
    i18n: { en: {
        q: "Can I practice cursive by tracing the output?",
        a: "Yes — export the PDF, print it, and trace over the letters. Pair it with three-line handwriting paper for full worksheets; our beginner's guide walks through the method.",
      } },
  },
  {
    id: "cursive-name",
    i18n: { en: {
        q: "How do I write my name in cursive?",
        a: "Type the name here to compare Cedarville Cursive and Dancing Script. To print a dotted practice sheet of that name, use the name tracing worksheets.",
        link: { href: "/name-tracing", label: "Name tracing worksheets" },
      } },
  },
  {
    id: "cursive-voice",
    i18n: { en: {
        q: "Does voice input work for cursive too?",
        a: "It's the same editor: speak and the words render in cursive. Speech recognition works best in desktop Chrome / Edge; typing always works.",
      } },
  },
];

/** /name-tracing 工具页 FAQ */
export const TRACING_FAQS: FaqItem[] = [
  {
    id: "tracing-free",
    i18n: { en: {
        q: "Is the name tracing generator free?",
        a: "Yes — unlimited worksheets, no account, no watermark. Everything renders in your browser and nothing you type is stored.",
      } },
  },
  {
    id: "tracing-dotted",
    i18n: { en: {
        q: "Does this make dotted name tracing lines?",
        a: "Yes. Dotted rows are dashed outlines of the whole letter, not numbered stroke arrows. Outline rows are a faint copy of the letter. Blank lines have no letters and no start dots.",
      } },
  },
  {
    id: "tracing-class",
    i18n: { en: {
        q: "Can I make worksheets for the whole class?",
        a: "Type one name per line. Each name gets a dark example row, then tracing rows in the style you chose: dotted, outline, or blank. Print one copy per student.",
      } },
  },
  {
    id: "tracing-font",
    i18n: { en: {
        q: "Which font should I choose for preschoolers?",
        a: "Patrick Hand — clean print-style letterforms. Start with the tallest row height and shrink it as control improves.",
      } },
  },
  {
    id: "tracing-cursive",
    i18n: { en: {
        q: "Can I practice cursive names too?",
        a: "Yes — pick Dancing Script or Cedarville Cursive and the same three-line bands render the name in cursive for tracing.",
      } },
  },
];

/** /printable-paper 工具页 FAQ */
export const PAPER_FAQS: FaqItem[] = [
  {
    id: "paper-free",
    i18n: { en: {
        q: "Is the printable lined paper free?",
        a: "Yes — every type and size is free, with no signup and no watermark on the PDF.",
      } },
  },
  {
    id: "paper-college-wide",
    i18n: { en: {
        q: "What's the difference between college ruled and wide ruled?",
        a: "College ruled lines are 9/32 inch apart (7.1 mm). Wide ruled lines are 11/32 inch apart (8.7 mm), the usual choice through second grade. Kindergarten handwriting paper is a different sheet: a top line, a dashed midline, and a baseline, not a wider gap. The spacing slider on this page covers college ruled, wide ruled, and the sizes in between.",
        link: { href: "/printable-paper/kindergarten", label: "Kindergarten handwriting paper" },
      } },
  },
  {
    id: "paper-a4",
    i18n: { en: {
        q: "Does it work for A4 paper?",
        a: "Yes — toggle between US Letter (8.5×11\") and A4 before downloading.",
      } },
  },
  {
    id: "paper-color",
    i18n: { en: {
        q: "Can I change the line color?",
        a: "Yes — pick any color with the color picker; light gray is a popular low-contrast option for sensitive readers.",
      } },
  },
  {
    id: "paper-margin",
    i18n: { en: {
        q: "Can I remove the red margin line?",
        a: "Yes — toggle it off for full-width pages, or keep it for the classic notebook look.",
      } },
  },
];

/** 站点 FAQ(8 语言;新问题:加一个 item 并补齐各语言) */
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "speech-not-working",
    i18n: { en: {
        q: "Speech recognition doesn't respond — what should I check?",
        a: "Use desktop Chrome / Edge, allow microphone access (the icon left of the address bar) and check your system microphone. On unsupported browsers, type directly into the text box.",
      } },
  },
  {
    id: "text-errors",
    i18n: { en: {
        q: "The transcription has mistakes — can I fix them?",
        a: "Yes. Edit the text box: the handwriting on the paper updates in real time.",
      } },
  },
  {
    id: "make-card",
    i18n: { en: {
        q: "How do I make a handwritten greeting card?",
        a: "Speak or type your message, pick a font, paper and ink, then export as PNG or PDF — under 3 minutes. The template library gives you ready-made copy for common occasions.",
      } },
  },
  {
    id: "commercial-use",
    i18n: { en: {
        q: "Can I use the generated images commercially?",
        a: "Yes — generated images belong to you. Fonts are open source under SIL OFL. One limit: don't impersonate another person's handwriting (see Terms).",
      } },
  },
  {
    id: "audio-free",
    i18n: { en: {
        q: "Is audio-file transcription really free?",
        a: "Yes. Transcription runs in your browser with an open-source Whisper model — no account, no minute caps. The model downloads once (~80MB) and works offline afterwards.",
      } },
  },
  {
    id: "audio-formats",
    i18n: { en: {
        q: "Which audio formats are supported?",
        a: "Anything your browser can decode: mp3, wav, m4a, ogg, webm, flac. Safari's decoding is incomplete for some codecs — desktop Chrome / Edge recommended.",
      } },
  },
  {
    id: "same-handwriting",
    i18n: { en: {
        q: "Will every export look identical?",
        a: "You control it: \"Shuffle strokes\" re-generates the writing-style fingerprint (slant, baseline wave, size rhythm, darkness), realism sets how messy it looks, and your preferences are remembered locally.",
      } },
  },
];

/** /word-work 拼写练习页 FAQ(8 语言) */
export const WORDWORK_FAQS: FaqItem[] = [
  {
    id: "wordwork-free",
    i18n: { en: {
        q: "Is the word work generator free?",
        a: "Yes — unlimited worksheets, no signup, no watermark. Everything is generated in your browser and your word list is never uploaded.",
      } },
  },
  {
    id: "wordwork-activities",
    i18n: { en: {
        q: "What activities does it generate?",
        a: "Two per sheet: write each word three times (optionally with a traceable first copy) and a fill-in-the-missing-letter puzzle built from the same list.",
        link: { href: "/blog/spelling-list-word-work", label: "Four words on Monday" },
      } },
  },
  {
    id: "wordwork-deterministic",
    i18n: { en: {
        q: "Are the worksheets the same every time for the same list?",
        a: "Yes — the generator is deterministic, so Monday's preview matches Friday's printout. No AI surprises or garbled words: what you paste is exactly what prints.",
      } },
  },
  {
    id: "wordwork-words",
    i18n: { en: {
        q: "Which words can I use?",
        a: "Any list: weekly spelling words, sight words, vocabulary — one word per line. Keep it to a dozen or so per sheet so the writing rows stay comfortable.",
      } },
  },
];

/** /writing-practice CJK 练字帖页 FAQ(8 语言) */
export const WRITING_FAQS: FaqItem[] = [
  {
    id: "writing-grids",
    i18n: { en: {
        q: "Which practice grids are supported?",
        a: "Tianzige (田字格) for Chinese, genkōyoshi (原稿用紙) for Japanese and wongoji (원고지) for Korean — the grid switches with the script you choose, and cell size is adjustable.",
      } },
  },
  {
    id: "writing-fonts",
    i18n: { en: {
        q: "Which handwriting fonts can I choose?",
        a: "Bundled CJK handwriting fonts such as LXGW WenKai for Chinese, Klee One for Japanese and Nanum Pen for Korean, plus more playful styles — switch any time before you print.",
      } },
  },
  {
    id: "writing-modes",
    i18n: { en: {
        q: "Can my child trace, copy or write independently?",
        a: "Three fill modes: light traceable characters, solid dark model characters, or blank cells with just the grid — start with tracing and fade it out as confidence grows.",
        link: { href: "/blog/one-character-in-the-grid", label: "One character, one row" },
      } },
  },
  {
    id: "writing-free",
    i18n: { en: {
        q: "Is it free, and does my text stay private?",
        a: "Yes — free PDF downloads with no watermark, and your practice text never leaves the browser.",
      } },
  },
];

/** /name-coloring 名字涂色页 FAQ(8 语言) */
export const COLORING_FAQS: FaqItem[] = [
  {
    id: "coloring-free",
    i18n: { en: {
        q: "Is the name coloring page generator free?",
        a: "Yes — unlimited pages, no signup. A small site watermark is on by default and can be turned off with the switch above the download buttons. PDF and PNG downloads are free for home and classroom use.",
      } },
  },
  {
    id: "coloring-how",
    i18n: { en: {
        q: "How do I make a coloring page with my child's name?",
        a: "Type the name, pick a playful font and a decoration (stars, animals, or machines), and the page draws bubble-letter outlines of each character.",
        link: { href: "/blog/color-a-name-before-tracing", label: "Color the name first" },
      } },
  },
  {
    id: "coloring-customize",
    i18n: { en: {
        q: "Can I adjust the outlines and decorations?",
        a: "Yes — outline thickness is adjustable (thicker lines are easier for younger kids). Decorations can be stars and hearts, animals, or machines, or turned off. The font changes the letter shapes.",
      } },
  },
  {
    id: "coloring-who",
    i18n: { en: {
        q: "Who is it for?",
        a: "Preschool and kindergarten kids learning to recognize their own name — coloring the letters doubles as letter-shape practice. Teachers use it for name-of-the-week activities; multiple names work too.",
      } },
  },
];

export const DAILY_CURSIVE_FAQS: FaqItem[] = [
  {
    id: "daily-free",
    i18n: { en: {
        q: "Is the daily cursive practice really free?",
        a: "Yes — every daily sheet is free to download and print, with no signup. A small site watermark is on by default and can be turned off with the switch above the download buttons. Print as many copies as you need for your family or classroom.",
      } },
  },
  {
    id: "daily-content",
    i18n: { en: {
        q: "What is on each daily sheet?",
        a: "One printable page with a complete practice ladder: a stroke warm-up row, the cursive letters of the day, three words that use them, and one sentence to trace and then copy on the blank lines. Ten to fifteen minutes, done.",
        link: { href: "/blog/daily-cursive-practice-pdf", label: "Fifteen minutes on today's PDF" },
      } },
  },
  {
    id: "daily-changes",
    i18n: { en: {
        q: "Does the worksheet really change every day?",
        a: "Yes — the letters, words and sentence are picked deterministically from the date, so a new sheet appears every day. Everyone printing on the same date gets the same sheet, which makes it easy to follow along as a class or with a friend.",
      } },
  },
  {
    id: "daily-levels",
    i18n: { en: {
        q: "Is it for kids or for adults?",
        a: "Both. The Kids level uses bigger lines and simple words and sentences; the Adults level uses smaller lines with proverbs and sayings. Switch levels any time — the sheet adjusts instantly.",
      } },
  },
  {
    id: "daily-week",
    i18n: { en: {
        q: "Can I print a whole week at once?",
        a: "Yes — the week button bundles Monday through Sunday into one seven-page PDF, each page with that day's own letters, words and sentence. Great for printing the week ahead on Monday.",
      } },
  },
];

/** /handwriting-personality-quiz 笔迹性格测验页 FAQ(8 语言) */
export const QUIZ_FAQS: FaqItem[] = [
  {
    id: "quiz-what-is",
    i18n: { en: {
        q: "What is a handwriting personality test?",
        a: "It's a light quiz that links the way you write with a fun personality profile. This one shows you sample writing styles — you pick the ones closest to yours — and returns a profile plus practice tips for the habits behind your letters. It's for fun: graphology itself isn't scientific, but the practice tips target real, trainable habits like size, spacing and baseline.",
      } },
  },
  {
    id: "quiz-accurate",
    i18n: { en: {
        q: "Is this quiz scientifically accurate?",
        a: "No — and we say so up front. Graphology (reading personality from handwriting) has been debunked in meta-analyses, so the profile is for fun. What is real: the practice tips, which target trainable habits like letter size, spacing and baseline.",
      } },
  },
  {
    id: "quiz-forensic",
    i18n: { en: {
        q: "Is handwriting analysis the same as forensic document examination?",
        a: "No. Forensic document examiners compare writing to establish authorship or detect forgery for courts — a validated profession with real accuracy studies. Graphology claims personality traits, which research does not support.",
      } },
  },
  {
    id: "quiz-upload",
    i18n: { en: {
        q: "Do I need to upload a photo of my handwriting?",
        a: "No. Every question shows printed letter samples to compare against — nothing is uploaded, nothing is stored, and the quiz keeps working offline once the page has loaded.",
      } },
  },
  {
    id: "quiz-share",
    i18n: { en: {
        q: "Can I save or share my result?",
        a: "Yes — download your result card as a PNG and share it anywhere. The card shows only your profile name and dimension bars, no personal data.",
      } },
  },
  {
    id: "quiz-languages",
    i18n: { en: {
        q: "Which languages is the quiz available in?",
        a: "Eight: English, Spanish, French, German, Portuguese, Chinese, Japanese and Korean. The letter samples show Latin script, since the quiz is about how you write the Latin alphabet.",
      } },
  },
  {
    id: "quiz-improve",
    i18n: { en: {
        q: "Can I improve my handwriting based on my result?",
        a: "That's the point! Each dimension in your result links to a free practice tool matched to that habit — three-line paper for a straight baseline, rhythm rows for even size, and so on. No signup, no watermark.",
      } },
  },
];

/** /doctor-handwriting-generator 工具页 FAQ(8 语言) */
export const DOCTOR_FAQS: FaqItem[] = [
  {
    id: "doctor-why-messy",
    i18n: { en: {
        q: "Why is doctors' handwriting so messy?",
        a: "Volume and speed. A hospital doctor writes thousands of notes a year, often standing, between patients — so letters collapse into shorthand scrawl. Interestingly, studies comparing doctors with other professionals found their handwriting is only slightly worse; the legend owes a lot to prescriptions' private abbreviations and, of course, memes.",
      } },
  },
  {
    id: "doctor-not-real",
    i18n: { en: {
        q: "Is this a real prescription?",
        a: "No — it's a gag. The output is a novelty image/PDF for jokes, gifts and party laughs: a fake \"prescription\" telling a friend to take two vacations a day, for example. It is not a medical document and must never be used to deceive a pharmacy, an employer or anyone else.",
      } },
  },
  {
    id: "doctor-how-to",
    i18n: { en: {
        q: "How do I make my own doctor handwriting note?",
        a: "Type or dictate your text, and the generator writes it in a scrawl on an Rx pad. Push the realism slider toward 100% for maximum illegibility, pick the ℞ paper, then export a PNG or a print-ready PDF. Popular uses: gag prescriptions, \"doctor's orders\" notes excusing chores, and get-well cards with mock side effects like \"may cause napping\".",
      } },
  },
];

/** /handwriting-workbook-generator 工具页 FAQ(8 语言) */
export const WORKBOOK_FAQS: FaqItem[] = [
  {
    id: "workbook-free",
    i18n: { en: {
        q: "Is the workbook generator free?",
        a: "Yes — no signup, no watermark, unlimited downloads. Each workbook exports as a single Letter-size PDF with a cover page and one page group per word, ready to print at home or school.",
      } },
  },
  {
    id: "workbook-what-to-put",
    i18n: { en: {
        q: "What should I put in my handwriting workbook?",
        a: "One word per line, up to 100 words. Popular lists: the alphabet for preschoolers, your child's name, Dolch or Fry sight words for kindergarten, this week's spelling list, or themed words (animals, colors, holidays). Each word gets an example row plus traceable rows on three-line guides.",
      } },
  },
  {
    id: "workbook-print-cursive",
    i18n: { en: {
        q: "Can I make a print or a cursive workbook?",
        a: "Both. Pick any font in the font menu — Patrick Hand for clean print practice, Cedarville Cursive or Dancing Script for cursive, or Kalam for a everyday pen look. The guide rows (top line, dashed midline, baseline) stay the same either way.",
      } },
  },
];

/** /handwriting-repeater 循环书写演示 FAQ(8 语言) */
export const REPEATER_FAQS: FaqItem[] = [
  {
    id: "repeater-free",
    i18n: { en: {
        q: "Is the handwriting repeater free?",
        a: "Yes — no signup and no watermark. The animation runs in your browser, and GIF downloads are unlimited.",
      } },
  },
  {
    id: "repeater-animation",
    i18n: { en: {
        q: "Is this a handwriting animation?",
        a: "Yes. It plays in your browser: each letter is uncovered from left to right, then the line loops. You can save a GIF. It is an animation of the font, not a video of someone writing with a pen.",
      } },
  },
  {
    id: "repeater-watch",
    i18n: { en: {
        q: "Can I watch letters being written?",
        a: "Yes. Type a word and the repeater draws it one letter at a time on a loop, so you can see where each letter sits on the line. It does not draw textbook stroke order, and cursive entry strokes are not marked.",
      } },
  },
  {
    id: "repeater-stroke-order",
    i18n: { en: {
        q: "Does the repeater show real stroke order?",
        a: "It uncovers each letter from left to right in the font you picked, then loops. That shows size, spacing, and where the letter sits on the line. It is not a textbook stroke-order diagram, and cursive entry strokes are not marked.",
      } },
  },
  {
    id: "repeater-print",
    i18n: { en: {
        q: "Can I save the animation?",
        a: "Yes. Download GIF saves one writing pass, including the pause at the end, and the file loops. It is drawn in your browser. The two blank lines stay in the picture. It is a loop to watch, not a print worksheet.",
      } },
  },
];

/** /handwriting-page-calculator 工具页 FAQ(8 语言) */
export const PAGE_CALC_FAQS: FaqItem[] = [
  {
    id: "page-calc-free",
    i18n: { en: {
        q: "Is the handwriting page calculator free?",
        a: "Yes. No signup, and the text stays in your browser. It is not uploaded.",
      } },
  },
  {
    id: "page-calc-number",
    i18n: { en: {
        q: "Why do the number and the pasted text disagree?",
        a: "A number uses a model: about 4 mm per Latin letter, or a nearly square character on ruled paper, with a tighter and a looser figure beside it. Pasted text is measured in the handwriting font, so the page count follows that layout.",
      } },
  },
  {
    id: "page-calc-grid",
    i18n: { en: {
        q: "What happens on graph paper and genkou?",
        a: "One character per cell, including punctuation. The spacing slider does not apply. A 400-square genkou sheet holds 400 characters; a 200-square sheet holds 200.",
      } },
  },
];

/** /cursive-text-generator 工具页 FAQ(8 语言) */
export const CURSIVE_TEXT_FAQS: FaqItem[] = [
  {
    id: "ct-free",
    i18n: { en: {
        q: "Is the cursive text generator free?",
        a: "Yes — no signup, no watermark. The conversion runs in your browser, and nothing you type or say is uploaded.",
      } },
  },
  {
    id: "ct-where",
    i18n: { en: {
        q: "Where can I paste cursive text?",
        a: "Anywhere that accepts text: Instagram bios and captions, TikTok, Discord nicknames, WhatsApp messages, notes apps. It will not work in a word processor's font menu, and it is not for print — for paper you want a printable font.",
      } },
  },
  {
    id: "ct-font",
    i18n: { en: {
        q: "Is this a cursive font?",
        a: "No. Each letter is swapped for a Unicode character that looks handwritten (from the mathematical script symbols), so the style travels with the text and needs no install. A real cursive font only changes how text looks inside one app.",
        link: { href: "/cursive-font-generator", label: "Cursive font generator" },
      } },
  },
  {
    id: "ct-boxes",
    i18n: { en: {
        q: "Why do some characters show up as boxes?",
        a: "Some older phones and browsers lack glyphs for a few of these symbols. Switch styles — the typewriter style maps every letter and digit to a character that almost every device renders.",
      } },
  },
];

/** /cursive-font-generator 工具页 FAQ(8 语言) */
export const CURSIVE_FONT_FAQS: FaqItem[] = [
  {
    id: "cf-install",
    i18n: { en: {
        q: "Do I need to install the fonts to use them?",
        a: "No. All thirteen fonts are bundled with the site and render right in your browser — type your text, and each preview line is real typography, not an approximation. Downloads give you a PNG, an SVG with the font embedded, or a PDF of your text; if you want the font files themselves for design software, each row links to the font's Google Fonts page.",
      } },
  },
  {
    id: "cf-commercial",
    i18n: { en: {
        q: "Can I use the exports commercially?",
        a: "Yes. Every font here is licensed under the SIL Open Font License 1.1, which permits personal and commercial use — printed cards, invitations, products, logos. The license covers the font software; the images you export are yours. Each row labels the font's author and license so you can verify anytime.",
      } },
  },
  {
    id: "cf-vs-unicode",
    i18n: { en: {
        q: "How is this different from a cursive text generator?",
        a: "Unicode cursive generators swap your letters for look-alike symbols you can paste as plain text into bios and chats — but they are not fonts, they can't be printed at high quality, and screen readers read them letter by letter. This page uses real typefaces and outputs images and PDFs: the right tool for cards, envelopes and anything on paper. If you want pasteable text, use the cursive text generator instead.",
        link: { href: "/cursive-text-generator", label: "Cursive text generator" },
      } },
  },
];

/** /printable-handwritten-letters */
export const BULK_LETTER_FAQS: FaqItem[] = [
  {
    id: "bulk-mail",
    i18n: { en: {
        q: "Will you mail these letters?",
        a: "No. The page makes two PDFs, one of letters and one of envelopes. You print them, add postage, and mail them yourself. Nothing is sent from this site.",
      } },
  },
  {
    id: "bulk-real",
    i18n: { en: {
        q: "Is the writing done with a pen?",
        a: "No. Each note is set in a handwriting font, with small shifts so the lines are not perfectly even. It is not ink from a pen, and it should not be passed off as a handwritten original.",
      } },
  },
  {
    id: "bulk-csv",
    i18n: { en: {
        q: "How should the recipient list be formatted?",
        a: "On the page the columns are already there: name, street, city, region, postal, and an optional note. Type one person per row, up to 30. The note replaces the letter for that person. {name} in the letter becomes that person's name. The Excel template and a .csv import still need an English header row: name, street, city, region, postal. An optional message column works the same as the note.",
      } },
  },
];
