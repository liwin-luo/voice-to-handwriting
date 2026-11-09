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
      }, zh: { q: "这个花体生成器免费吗?", a: "免费——无需注册。导出默认带一行站点水印,可在「更像手写」里关掉。两种花体字均为开源字体,PNG/PDF 导出不限次数。" } },
  },
  {
    id: "cursive-fonts",
    i18n: { en: {
        q: "Which cursive fonts are available?",
        a: "Two: Cedarville Cursive for everyday penmanship and Dancing Script for formal, looped writing. Size, realism and ink are adjustable before export.",
      }, zh: { q: "有哪些花体字体?", a: "两种:Cedarville Cursive(日常手写体)和 Dancing Script(正式连笔体)。导出前可调整字号、仿真度和墨色。" } },
  },
  {
    id: "cursive-trace",
    i18n: { en: {
        q: "Can I practice cursive by tracing the output?",
        a: "Yes — export the PDF, print it, and trace over the letters. Pair it with three-line handwriting paper for full worksheets; our beginner's guide walks through the method.",
      }, zh: { q: "可以照着打印稿练字吗?", a: "可以——导出 PDF 打印后在字母上描摹,再配合三线格练字纸效果更好;入门教程里有完整方法。" } },
  },
  {
    id: "cursive-name",
    i18n: { en: {
        q: "How do I write my name in cursive?",
        a: "Type the name here to compare Cedarville Cursive and Dancing Script. To print a dotted practice sheet of that name, use the name tracing worksheets.",
        link: { href: "/name-tracing", label: "Name tracing worksheets" },
      }, zh: { q: "自己的名字怎么写成花体?", a: "在这里输入名字,对比 Cedarville Cursive 和 Dancing Script。要打印这个名字的虚线描红纸,用姓名描红。", link: { href: "/name-tracing", label: "姓名描红" } } },
  },
  {
    id: "cursive-voice",
    i18n: { en: {
        q: "Does voice input work for cursive too?",
        a: "It's the same editor: speak and the words render in cursive. Speech recognition works best in desktop Chrome / Edge; typing always works.",
      }, zh: { q: "语音输入也能生成花体吗?", a: "用的是同一个编辑器:说话内容会以花体呈现。语音识别在桌面版 Chrome/Edge 效果最好,打字输入则不受限制。" } },
  },
];

/** /name-tracing 工具页 FAQ */
export const TRACING_FAQS: FaqItem[] = [
  {
    id: "tracing-free",
    i18n: { en: {
        q: "Is the name tracing generator free?",
        a: "Yes — unlimited worksheets, no account, no watermark. Everything renders in your browser and nothing you type is stored.",
      }, zh: { q: "姓名描红生成器免费吗?", a: "免费——练习纸不限量、无需账号、无水印。全部在浏览器本地生成,输入的内容不会被保存。" } },
  },
  {
    id: "tracing-dotted",
    i18n: { en: {
        q: "Does this make dotted name tracing lines?",
        a: "Yes. Dotted rows are dashed outlines of the whole letter, not numbered stroke arrows. Outline rows are a faint copy of the letter. Blank lines have no letters and no start dots.",
      }, zh: { q: "能生成虚线姓名描红吗?", a: "可以。虚线行是整字的虚线轮廓,不是编号笔顺箭头。空心行是浅色的字。只留横线则没有字母,也没有落笔点。" } },
  },
  {
    id: "tracing-class",
    i18n: { en: {
        q: "Can I make worksheets for the whole class?",
        a: "Type one name per line. Each name gets a dark example row, then tracing rows in the style you chose: dotted, outline, or blank. Print one copy per student.",
      }, zh: { q: "能给全班同学生成练习纸吗?", a: "每行输入一个姓名。每个名字先是深色示范行,再是你选的描红行:虚线、空心或只留横线。每位学生打印一份。" } },
  },
  {
    id: "tracing-font",
    i18n: { en: {
        q: "Which font should I choose for preschoolers?",
        a: "Patrick Hand — clean print-style letterforms. Start with the tallest row height and shrink it as control improves.",
      }, zh: { q: "学龄前孩子选什么字体?", a: "推荐 Patrick Hand——接近教材的印刷体风格。行高先调到最大,等控制力提升后再逐步调小。" } },
  },
  {
    id: "tracing-cursive",
    i18n: { en: {
        q: "Can I practice cursive names too?",
        a: "Yes — pick Dancing Script or Cedarville Cursive and the same three-line bands render the name in cursive for tracing.",
      }, zh: { q: "也能练花体名字吗?", a: "可以——选择 Dancing Script 或 Cedarville Cursive,同样的三线格会以花体呈现名字供描红。" } },
  },
];

/** /printable-paper 工具页 FAQ */
export const PAPER_FAQS: FaqItem[] = [
  {
    id: "paper-free",
    i18n: { en: {
        q: "Is the printable lined paper free?",
        a: "Yes — every type and size is free, with no signup and no watermark on the PDF.",
      }, zh: { q: "可打印横线纸免费吗?", a: "免费——所有纸型和尺寸都免费,无需注册,PDF 无水印。" } },
  },
  {
    id: "paper-college-wide",
    i18n: { en: {
        q: "What's the difference between college ruled and wide ruled?",
        a: "College ruled lines are 9/32 inch apart (7.1 mm). Wide ruled lines are 11/32 inch apart (8.7 mm), the usual choice through second grade. Kindergarten handwriting paper is a different sheet: a top line, a dashed midline, and a baseline, not a wider gap. The spacing slider on this page covers college ruled, wide ruled, and the sizes in between.",
        link: { href: "/printable-paper/kindergarten", label: "Kindergarten handwriting paper" },
      }, zh: { q: "窄行和宽行横线有什么区别?", a: "窄行(college ruled)行距 7.1 毫米(9/32 英寸)。宽行(wide ruled)行距 8.7 毫米(11/32 英寸),大约用到二年级。幼儿园三线格是另一张纸:顶线、虚中线和基线,不是把行距再加宽。本页的行距滑杆覆盖窄行、宽行以及两者之间。", link: { href: "/printable-paper/kindergarten", label: "幼儿园三线格" } } },
  },
  {
    id: "paper-a4",
    i18n: { en: {
        q: "Does it work for A4 paper?",
        a: "Yes — toggle between US Letter (8.5×11\") and A4 before downloading.",
      }, zh: { q: "支持 A4 纸吗?", a: "支持——下载前可在 US Letter(8.5×11 英寸)和 A4 之间切换。" } },
  },
  {
    id: "paper-color",
    i18n: { en: {
        q: "Can I change the line color?",
        a: "Yes — pick any color with the color picker; light gray is a popular low-contrast option for sensitive readers.",
      }, zh: { q: "可以换线条颜色吗?", a: "可以——取色器任选颜色;浅灰色对比度低,适合对格线敏感的书写者。" } },
  },
  {
    id: "paper-margin",
    i18n: { en: {
        q: "Can I remove the red margin line?",
        a: "Yes — toggle it off for full-width pages, or keep it for the classic notebook look.",
      }, zh: { q: "可以去掉红色边线吗?", a: "可以——关闭开关即得整页通栏,保留则是经典笔记本样式。" } },
  },
];

/** 站点 FAQ(8 语言;新问题:加一个 item 并补齐各语言) */
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "speech-not-working",
    i18n: { en: {
        q: "Speech recognition doesn't respond — what should I check?",
        a: "Use desktop Chrome / Edge, allow microphone access (the icon left of the address bar) and check your system microphone. On unsupported browsers, type directly into the text box.",
      }, zh: { q: "语音识别没有反应怎么办?", a: "使用桌面版 Chrome / Edge,允许麦克风权限(地址栏左侧图标),并确认系统麦克风可用。其他浏览器请直接在文本框输入。" } },
  },
  {
    id: "text-errors",
    i18n: { en: {
        q: "The transcription has mistakes — can I fix them?",
        a: "Yes. Edit the text box: the handwriting on the paper updates in real time.",
      }, zh: { q: "识别出来的文字有错怎么办?", a: "直接在文本框修改即可,纸张上的手写效果会实时更新。" } },
  },
  {
    id: "make-card",
    i18n: { en: {
        q: "How do I make a handwritten greeting card?",
        a: "Speak or type your message, pick a font, paper and ink, then export as PNG or PDF — under 3 minutes. The template library gives you ready-made copy for common occasions.",
      }, zh: { q: "手写贺卡怎么制作?", a: "说话或打字输入内容,选好字体、纸张和墨色,导出 PNG 或 PDF——全程不到 3 分钟。常见场景可以直接用模板库的现成文案。" } },
  },
  {
    id: "commercial-use",
    i18n: { en: {
        q: "Can I use the generated images commercially?",
        a: "Yes — generated images belong to you. Fonts are open source under SIL OFL. One limit: don't impersonate another person's handwriting (see Terms).",
      }, zh: { q: "生成的图片可以商用吗?", a: "可以。生成图片的权利归你,字体为 SIL OFL 开源授权,商用无忧。唯一限制:不得冒充他人笔迹(见使用条款)。" } },
  },
  {
    id: "audio-free",
    i18n: { en: {
        q: "Is audio-file transcription really free?",
        a: "Yes. Transcription runs in your browser with an open-source Whisper model — no account, no minute caps. The model downloads once (~80MB) and works offline afterwards.",
      }, zh: { q: "录音转文字真的免费吗?", a: "免费。转写在你的浏览器本地用开源 Whisper 模型完成——无需账号、没有时长限制。模型首次下载一次(约 80MB),之后离线可用。" } },
  },
  {
    id: "audio-formats",
    i18n: { en: {
        q: "Which audio formats are supported?",
        a: "Anything your browser can decode: mp3, wav, m4a, ogg, webm, flac. Safari's decoding is incomplete for some codecs — desktop Chrome / Edge recommended.",
      }, zh: { q: "支持哪些音频格式?", a: "浏览器能解码的都可以:mp3、wav、m4a、ogg、webm、flac。Safari 对部分编码解码不全,推荐桌面版 Chrome / Edge 上传。" } },
  },
  {
    id: "same-handwriting",
    i18n: { en: {
        q: "Will every export look identical?",
        a: "You control it: \"Shuffle strokes\" re-generates the writing-style fingerprint (slant, baseline wave, size rhythm, darkness), realism sets how messy it looks, and your preferences are remembered locally.",
      }, zh: { q: "每次导出的手写效果会一样吗?", a: "由你控制:「换一种笔迹」会重新生成书写习惯指纹(倾斜、基线波浪、大小节奏、墨色深浅),仿真度决定潦草程度,你的偏好也会本地记忆。" } },
  },
];

/** /writing-practice CJK 练字帖页 FAQ(8 语言) */
export const WRITING_FAQS: FaqItem[] = [
  {
    id: "writing-grids",
    i18n: { en: {
        q: "Which practice grids are supported?",
        a: "Tianzige (田字格) for Chinese, genkōyoshi (原稿用紙) for Japanese and wongoji (원고지) for Korean — the grid switches with the script you choose, and cell size is adjustable.",
      }, zh: { q: "支持哪些练习格?", a: "中文田字格、日文原稿用紙、韩文原稿纸——格子随所选文字自动切换,格径大小可调。" } },
  },
  {
    id: "writing-fonts",
    i18n: { en: {
        q: "Which handwriting fonts can I choose?",
        a: "Bundled CJK handwriting fonts such as LXGW WenKai for Chinese, Klee One for Japanese and Nanum Pen for Korean, plus more playful styles — switch any time before you print.",
      }, zh: { q: "有哪些手写字体可选?", a: "内置霞鹜文楷(中文)、Klee One(日文)、Nanum Pen(韩文)等 CJK 手写字体,还有更多可爱风格,打印前可随时切换。" } },
  },
  {
    id: "writing-modes",
    i18n: { en: {
        q: "Can my child trace, copy or write independently?",
        a: "Three fill modes: light traceable characters, solid dark model characters, or blank cells with just the grid — start with tracing and fade it out as confidence grows.",
        link: { href: "/blog/one-character-in-the-grid", label: "One character, one row" },
      }, zh: { q: "孩子可以描红、临写还是独立书写?", a: "三种填充模式:浅色描红字、深色示范字、纯空白格——建议从描红开始,随着熟练度提升逐步过渡到独立书写。", link: { href: "/blog/one-character-in-the-grid", label: "一个字写一行" } } },
  },
  {
    id: "writing-free",
    i18n: { en: {
        q: "Is it free, and does my text stay private?",
        a: "Yes — free PDF downloads with no watermark, and your practice text never leaves the browser.",
      }, zh: { q: "免费吗?练习文字会上传吗?", a: "免费——PDF 不限次下载、无水印,输入的练习文字不会离开浏览器。" } },
  },
];

/** /name-coloring 名字涂色页 FAQ(8 语言) */
export const COLORING_FAQS: FaqItem[] = [
  {
    id: "coloring-free",
    i18n: { en: {
        q: "Is the name coloring page generator free?",
        a: "Yes — unlimited pages, no signup. A small site watermark is on by default and can be turned off with the switch above the download buttons. PDF and PNG downloads are free for home and classroom use.",
      }, zh: { q: "名字涂色页生成器免费吗?", a: "免费——页数不限、无需注册。页脚默认有一行站点水印,下载按钮上方的开关可以关掉。PDF 和 PNG 下载免费,家庭和课堂都能用。" } },
  },
  {
    id: "coloring-how",
    i18n: { en: {
        q: "How do I make a coloring page with my child's name?",
        a: "Type the name, pick a playful font and a decoration (stars, animals, or machines), and the page draws bubble-letter outlines of each character.",
        link: { href: "/blog/color-a-name-before-tracing", label: "Color the name first" },
      }, zh: { q: "怎么给孩子做名字涂色页?", a: "输入名字、选一个可爱字体和装饰(星星、动物或机器),页面会自动画出每个字的大气泡轮廓。", link: { href: "/blog/color-a-name-before-tracing", label: "先涂名字" } } },
  },
  {
    id: "coloring-customize",
    i18n: { en: {
        q: "Can I adjust the outlines and decorations?",
        a: "Yes — outline thickness is adjustable (thicker lines are easier for younger kids). Decorations can be stars and hearts, animals, or machines, or turned off. The font changes the letter shapes.",
      }, zh: { q: "可以调整轮廓和装饰吗?", a: "可以——描边粗细可调(线条越粗越适合小龄孩子)。装饰可以选星星爱心、动物或机器,也可以关掉。换字体还能改变字形。" } },
  },
  {
    id: "coloring-who",
    i18n: { en: {
        q: "Who is it for?",
        a: "Preschool and kindergarten kids learning to recognize their own name — coloring the letters doubles as letter-shape practice. Teachers use it for name-of-the-week activities; multiple names work too.",
      }, zh: { q: "适合多大的孩子?", a: "适合正在认识自己名字的学龄前和幼儿园孩子——涂色的同时练习字形。老师也用它做“本周名字”课堂活动,支持一次输入多个名字。" } },
  },
];

/** /handwriting-personality-quiz 笔迹性格测验页 FAQ(8 语言) */
export const QUIZ_FAQS: FaqItem[] = [
  {
    id: "quiz-what-is",
    i18n: { en: {
        q: "What is a handwriting personality test?",
        a: "It's a light quiz that links the way you write with a fun personality profile. This one shows you sample writing styles — you pick the ones closest to yours — and returns a profile plus practice tips for the habits behind your letters. It's for fun: graphology itself isn't scientific, but the practice tips target real, trainable habits like size, spacing and baseline.",
      }, zh: { q: "什么是手写性格测试?", a: "手写性格测试是一种把书写方式和趣味性格画像关联起来的小测验。这里的版本会展示多种笔迹样张,选出最接近你的,就能得到对应的性格画像和针对书写习惯的练字建议。它仅供娱乐:笔迹学本身并不科学,但练习建议针对的是真实、可训练的习惯,比如字号、间距和基线。" } },
  },
  {
    id: "quiz-accurate",
    i18n: { en: {
        q: "Is this quiz scientifically accurate?",
        a: "No — and we say so up front. Graphology (reading personality from handwriting) has been debunked in meta-analyses, so the profile is for fun. What is real: the practice tips, which target trainable habits like letter size, spacing and baseline.",
      }, zh: { q: "这个测验有科学依据吗?", a: "没有——我们开门见山地承认。笔迹学(从笔迹推断性格)已被多项荟萃分析证伪,所以画像部分纯属娱乐。真实有效的是练习建议:它们针对字号、间距、基线这些可以通过训练改善的习惯。" } },
  },
  {
    id: "quiz-forensic",
    i18n: { en: {
        q: "Is handwriting analysis the same as forensic document examination?",
        a: "No. Forensic document examiners compare writing to establish authorship or detect forgery for courts — a validated profession with real accuracy studies. Graphology claims personality traits, which research does not support.",
      }, zh: { q: "笔迹分析和法庭笔迹鉴定是一回事吗?", a: "不是。法庭文书鉴定人通过比对笔迹判断文件作者或识别伪造,是为司法服务的、经过实证检验的职业;而笔迹学声称能看出性格,这一点并没有研究支持。" } },
  },
  {
    id: "quiz-upload",
    i18n: { en: {
        q: "Do I need to upload a photo of my handwriting?",
        a: "No. Every question shows printed letter samples to compare against — nothing is uploaded, nothing is stored, and the quiz keeps working offline once the page has loaded.",
      }, zh: { q: "需要上传我的手写照片吗?", a: "不需要。每道题都是印刷字母样张,对照选择即可——不上传任何内容、不保存任何数据,页面加载完成后离线也能作答。" } },
  },
  {
    id: "quiz-share",
    i18n: { en: {
        q: "Can I save or share my result?",
        a: "Yes — download your result card as a PNG and share it anywhere. The card shows only your profile name and dimension bars, no personal data.",
      }, zh: { q: "可以保存或分享结果吗?", a: "可以——把结果卡片下载为 PNG,随时分享。卡片上只有档案名称和维度条,不含任何个人信息。" } },
  },
  {
    id: "quiz-languages",
    i18n: { en: {
        q: "Which languages is the quiz available in?",
        a: "Eight: English, Spanish, French, German, Portuguese, Chinese, Japanese and Korean. The letter samples show Latin script, since the quiz is about how you write the Latin alphabet.",
      }, zh: { q: "这个测验支持哪些语言?", a: "八种:英语、西班牙语、法语、德语、葡萄牙语、中文、日语和韩语。字母样张为拉丁字母,因为测验关注的是你写拉丁字母的习惯。" } },
  },
  {
    id: "quiz-improve",
    i18n: { en: {
        q: "Can I improve my handwriting based on my result?",
        a: "That's the point! Each dimension in your result links to a free practice tool matched to that habit — three-line paper for a straight baseline, rhythm rows for even size, and so on. No signup, no watermark.",
      }, zh: { q: "能根据结果改善我的字吗?", a: "这正是本测验的落点!结果里的每个维度都配有对应的免费练习工具——基线不平练三线格、字号不稳练节奏行,以此类推。无需注册,没有水印。" } },
  },
];

/** /handwriting-workbook-generator 工具页 FAQ(8 语言) */
export const WORKBOOK_FAQS: FaqItem[] = [
  {
    id: "workbook-free",
    i18n: { en: {
        q: "Is the workbook generator free?",
        a: "Yes — no signup, no watermark, unlimited downloads. Each workbook exports as a single Letter-size PDF with a cover page and one page group per word, ready to print at home or school.",
      }, zh: { q: "练习册生成器免费吗?", a: "免费——无需注册、没有水印、下载不限次。每本练习册导出为一个 Letter 尺寸 PDF,含封面和每词一组练习页,在家或学校都能直接打印。" } },
  },
  {
    id: "workbook-what-to-put",
    i18n: { en: {
        q: "What should I put in my handwriting workbook?",
        a: "One word per line, up to 100 words. Popular lists: the alphabet for preschoolers, your child's name, Dolch or Fry sight words for kindergarten, this week's spelling list, or themed words (animals, colors, holidays). Each word gets an example row plus traceable rows on three-line guides.",
      }, zh: { q: "练习册里放什么内容好?", a: "每行一个词,最多 100 个。常见用法:学龄前放字母表、放孩子的名字,幼儿园放 Sight Words 高频词,小学生放本周拼写词表,或按主题来一组(动物、颜色、节日)。每个词都会生成一行示例和多行描红,配三线格。" } },
  },
  {
    id: "workbook-print-cursive",
    i18n: { en: {
        q: "Can I make a print or a cursive workbook?",
        a: "Both. Pick any font in the font menu — Patrick Hand for clean print practice, Cedarville Cursive or Dancing Script for cursive, or Kalam for a everyday pen look. The guide rows (top line, dashed midline, baseline) stay the same either way.",
      }, zh: { q: "能做印刷体或连笔体的练习册吗?", a: "都可以。在字体菜单里任选:Patrick Hand 适合干净利落的印刷体练习,Cedarville Cursive / Dancing Script 适合连笔体,Kalam 是日常手写感。无论哪种,三线格(顶线、虚线中线、基线)保持一致。" } },
  },
];

/** /handwriting-page-calculator 工具页 FAQ(8 语言) */
export const PAGE_CALC_FAQS: FaqItem[] = [
  {
    id: "page-calc-free",
    i18n: { en: {
        q: "Is the handwriting page calculator free?",
        a: "Yes. No signup, and the text stays in your browser. It is not uploaded.",
      }, zh: { q: "这个用纸计算器免费吗?", a: "免费,不用注册。文字只留在浏览器里,不会上传。" } },
  },
  {
    id: "page-calc-number",
    i18n: { en: {
        q: "Why do the number and the pasted text disagree?",
        a: "A number uses a model: about 4 mm per Latin letter, or a nearly square character on ruled paper, with a tighter and a looser figure beside it. Pasted text is measured in the handwriting font, so the page count follows that layout.",
      }, zh: { q: "为什么只填数字和贴上正文的结果不一样?", a: "只填数字时用的是模型:拉丁字母大约 4 毫米宽,横线上的方块字接近行高,旁边还有更紧和更松两档。贴上正文后按手写字体的真实宽度排版,页数以这次排版为准。" } },
  },
  {
    id: "page-calc-grid",
    i18n: { en: {
        q: "What happens on graph paper and genkou?",
        a: "One character per cell, including punctuation. The spacing slider does not apply. A 400-square genkou sheet holds 400 characters; a 200-square sheet holds 200.",
      }, zh: { q: "方格纸和原稿纸怎么算?", a: "一字一格,标点也占一格。字间距滑杆不起作用。400 字原稿纸一面 400 字,200 字原稿纸一面 200 字。" } },
  },
];

/** /cursive-text-generator 工具页 FAQ(8 语言) */
export const CURSIVE_TEXT_FAQS: FaqItem[] = [
  {
    id: "ct-free",
    i18n: { en: {
        q: "Is the cursive text generator free?",
        a: "Yes — no signup, no watermark. The conversion runs in your browser, and nothing you type or say is uploaded.",
      }, zh: { q: "花体文字生成器免费吗?", a: "免费——无需注册、没有水印。转换在你浏览器里完成,输入的文字和语音都不会上传。" } },
  },
  {
    id: "ct-where",
    i18n: { en: {
        q: "Where can I paste cursive text?",
        a: "Anywhere that accepts text: Instagram bios and captions, TikTok, Discord nicknames, WhatsApp messages, notes apps. It will not work in a word processor's font menu, and it is not for print — for paper you want a printable font.",
      }, zh: { q: "花体文字可以粘贴到哪里?", a: "所有能输入文字的地方都可以:Instagram 简介和配文、TikTok、Discord 昵称、WhatsApp 消息、备忘录。它不能用于 Word 的字体菜单,也不适合打印——要打印请用可安装的花体字体。" } },
  },
  {
    id: "ct-font",
    i18n: { en: {
        q: "Is this a cursive font?",
        a: "No. Each letter is swapped for a Unicode character that looks handwritten (from the mathematical script symbols), so the style travels with the text and needs no install. A real cursive font only changes how text looks inside one app.",
        link: { href: "/cursive-font-generator", label: "Cursive font generator" },
      }, zh: { q: "这是花体字体吗?", a: "不是。它把每个字母替换成看起来像手写的 Unicode 字符(数学花体符号区),样式跟着文字走,无需安装任何东西。真正的花体字体只在安装了它的应用里生效。", link: { href: "/cursive-font-generator", label: "花体字体生成器" } } },
  },
  {
    id: "ct-boxes",
    i18n: { en: {
        q: "Why do some characters show up as boxes?",
        a: "Some older phones and browsers lack glyphs for a few of these symbols. Switch styles — the typewriter style maps every letter and digit to a character that almost every device renders.",
      }, zh: { q: "为什么有些字符显示成方框?", a: "部分旧手机和浏览器缺少这几个符号的字形。换一种风格即可——打字机体把每个字母和数字都映射成几乎所有设备都能显示的字符。" } },
  },
];

/** /cursive-font-generator 工具页 FAQ(8 语言) */
export const CURSIVE_FONT_FAQS: FaqItem[] = [
  {
    id: "cf-install",
    i18n: { en: {
        q: "Do I need to install the fonts to use them?",
        a: "No. All thirteen fonts are bundled with the site and render right in your browser — type your text, and each preview line is real typography, not an approximation. Downloads give you a PNG, an SVG with the font embedded, or a PDF of your text; if you want the font files themselves for design software, each row links to the font's Google Fonts page.",
      }, zh: { q: "使用这些字体需要安装吗?", a: "不需要。十三款字体全部内嵌在网站里,在浏览器中直接渲染——输入文字,每一行预览都是真实的字体排版,不是近似效果。下载得到的是文字的 PNG、内嵌字体的 SVG 或 PDF;如果你想要字体文件本身用于设计软件,每一行都附了该字体在 Google Fonts 的页面链接。" } },
  },
  {
    id: "cf-commercial",
    i18n: { en: {
        q: "Can I use the exports commercially?",
        a: "Yes. Every font here is licensed under the SIL Open Font License 1.1, which permits personal and commercial use — printed cards, invitations, products, logos. The license covers the font software; the images you export are yours. Each row labels the font's author and license so you can verify anytime.",
      }, zh: { q: "导出的图可以商用吗?", a: "可以。这里的十三款字体都采用 SIL Open Font License 1.1 授权,允许个人和商业使用——印刷卡片、请柬、产品、标志都可以。该授权针对字体软件本身;你导出的图片归你所有。每一行都标注了字体的作者与授权,方便随时核对。" } },
  },
  {
    id: "cf-vs-unicode",
    i18n: { en: {
        q: "How is this different from a cursive text generator?",
        a: "Unicode cursive generators swap your letters for look-alike symbols you can paste as plain text into bios and chats — but they are not fonts, they can't be printed at high quality, and screen readers read them letter by letter. This page uses real typefaces and outputs images and PDFs: the right tool for cards, envelopes and anything on paper. If you want pasteable text, use the cursive text generator instead.",
        link: { href: "/cursive-text-generator", label: "Cursive text generator" },
      }, zh: { q: "这和「花体文字生成器」有什么区别?", a: "Unicode 花体生成器把你的字母替换成外形相似的符号,可以以纯文本粘贴进简介和聊天——但那不是字体,无法高质量印刷,读屏软件也会逐字朗读。本页用的是真正的字体,输出图片和 PDF:适合卡片、信封和一切纸面用途。如果你要的是可粘贴文本,请用花体文字生成器。", link: { href: "/cursive-text-generator", label: "花体文字生成器" } } },
  },
];

/** /printable-handwritten-letters */
export const BULK_LETTER_FAQS: FaqItem[] = [
  {
    id: "bulk-mail",
    i18n: { en: {
        q: "Will you mail these letters?",
        a: "No. The page makes two PDFs, one of letters and one of envelopes. You print them, add postage, and mail them yourself. Nothing is sent from this site.",
      }, zh: { q: "你们会帮我寄出这些信吗?", a: "不会。这个页面只生成两份 PDF:信件和信封。打印、贴邮票、寄出都由你自己完成。本站不寄任何东西。" } },
  },
  {
    id: "bulk-real",
    i18n: { en: {
        q: "Is the writing done with a pen?",
        a: "No. Each note is set in a handwriting font, with small shifts so the lines are not perfectly even. It is not ink from a pen, and it should not be passed off as a handwritten original.",
      }, zh: { q: "这些字是笔写的吗?", a: "不是。每封信用的是手写字体,并加了一点轻微错落,所以不会像印刷体那样齐。这不是钢笔字,也不应当当成手写原件给人。" } },
  },
  {
    id: "bulk-csv",
    i18n: { en: {
        q: "How should the recipient list be formatted?",
        a: "On the page the columns are already there: name, street, city, region, postal, and an optional note. Type one person per row, up to 30. The note replaces the letter for that person. {name} in the letter becomes that person's name. The Excel template and a .csv import still need an English header row: name, street, city, region, postal. An optional message column works the same as the note.",
      }, zh: { q: "收件人名单要怎么写?", a: "页面上的列是固定的:姓名、街道、城市、州或省、邮编,以及可选的附言。每人一行,最多 30 人。附言会换掉这一封的正文。正文里的 {name} 会换成这个人的名字。Excel 模板和 .csv 仍然要有英文表头:name, street, city, region, postal。可选的 message 列和页面上的附言是同一件事。" } },
  },
];
