export type PageId = "home" | "text" | "handwriting" | "faq" | "privacy" | "contact";
export type LocaleId = "en" | "zh" | "hi" | "es" | "fr" | "ar" | "bn" | "pt" | "ru" | "ur";

export type Copy = {
  name: string;
  meta: Record<PageId, { title: string; description: string }>;
  nav: { voice: string; text: string; handwriting: string; faq: string; privacy: string; contact: string; language: string };
  home: {
    kicker: string;
    h1: string;
    lede: string;
    hold: string;
    listening: string;
    transcribing: string;
    upload: string;
    micError: string;
    transcribeError: string;
    features: [string, string][];
  };
  text: { kicker: string; h1: string; lede: string; placeholder: string; back: string; next: string };
  studio: {
    kicker: string;
    h1: string;
    lede: string;
    emptyBefore: string;
    emptyLink: string;
    previous: string;
    nextPage: string;
    page: string;
    edit: string;
    png: string;
    pdf: string;
    alt: string;
    letter: string;
    note: string;
    card: string;
    grid: string;
    casual: string;
    cursive: string;
    messy: string;
    small: string;
    medium: string;
    large: string;
    blue: string;
    black: string;
    pencil: string;
    drawError: string;
    pngError: string;
    pdfError: string;
  };
  faq: { kicker: string; h1: string; items: [string, string][] };
  privacy: { kicker: string; h1: string; notice: string; blocks: [string, string][] };
  contact: { kicker: string; h1: string; body: string; beforeFaq: string; faq: string; afterFaq: string };
};

const en: Copy = {
  name: "English",
  meta: {
    home: {
      title: "Voice to Handwriting — Turn Speech into Printable Handwriting",
      description: "Turn speech into handwriting. Record or upload audio, fix the transcript, then download a PNG or a multi-page PDF.",
    },
    text: {
      title: "Edit Transcript — Voice to Handwriting",
      description: "Review and edit the words from your recording before they are written by hand.",
    },
    handwriting: {
      title: "Handwriting Preview — Voice to Handwriting",
      description: "Choose paper, handwriting style, size, and ink, then download a PNG of one page or a PDF of every page.",
    },
    faq: {
      title: "FAQ — Voice to Handwriting",
      description: "How voice to handwriting works: recording, uploads, phones, paper styles, and PNG or PDF downloads.",
    },
    privacy: {
      title: "Privacy — Voice to Handwriting",
      description: "How Voice to Handwriting handles recordings, transcripts, and downloads.",
    },
    contact: {
      title: "Contact — Voice to Handwriting",
      description: "Email Voice to Handwriting about transcription, downloads, or handwriting styles.",
    },
  },
  nav: { voice: "Voice", text: "Text", handwriting: "Handwriting", faq: "FAQ", privacy: "Privacy", contact: "Contact", language: "Language" },
  home: {
    kicker: "Step 1 of 3",
    h1: "Add your voice.",
    lede: "Record on this page, or upload an audio file. The next page shows the words.",
    hold: "Hold to record",
    listening: "Listening… release to transcribe",
    transcribing: "Transcribing…",
    upload: "Upload audio",
    micError: "Allow the microphone, then try again.",
    transcribeError: "Could not transcribe that audio.",
    features: [
      ["Record or upload", "Hold the button to record, or upload an m4a, mp3, wav, or webm file. Phones and computers use the same step."],
      ["Fix the transcript", "The words land on their own page. Change a name or a sentence before anything is written by hand."],
      ["Paper, ink, and download", "Pick Letter, Note, Card, or Grid, then a handwriting style, size, and ink. Save a PNG of one page or a PDF of all pages."],
    ],
  },
  text: {
    kicker: "Step 2 of 3",
    h1: "Check the words.",
    lede: "This is the transcript. Fix anything the recording got wrong. The handwriting page uses this text, page by page.",
    placeholder: "The transcript shows up here.",
    back: "Back to voice",
    next: "Make handwriting",
  },
  studio: {
    kicker: "Step 3 of 3",
    h1: "Choose a page, then download.",
    lede: "Long text splits across pages. PNG saves the page you are looking at. PDF saves every page.",
    emptyBefore: "No transcript yet.",
    emptyLink: "Add the words first.",
    previous: "Previous",
    nextPage: "Next",
    page: "Page {current} of {total}",
    edit: "Edit text",
    png: "Download PNG",
    pdf: "Download PDF",
    alt: "Handwriting page {current}",
    letter: "Letter",
    note: "Note",
    card: "Card",
    grid: "Grid",
    casual: "Casual",
    cursive: "Cursive",
    messy: "Messy",
    small: "Small",
    medium: "Medium",
    large: "Large",
    blue: "Blue",
    black: "Black",
    pencil: "Pencil",
    drawError: "Could not draw the page.",
    pngError: "Could not export the PNG.",
    pdfError: "Could not export the PDF.",
  },
  faq: {
    kicker: "FAQ",
    h1: "Questions",
    items: [
      ["What does this site do?", "You record or upload speech, check the transcript, then turn those exact words into handwriting you can download."],
      ["Do I need an account?", "No. Record, edit, and download without signing up."],
      ["Can I use it on a phone?", "Yes. Android Chrome can transcribe in the browser. iPhone sends the recording to a transcription service. If that service is not configured, type the words on the text page."],
      ["Which audio files can I upload?", "m4a, mp3, wav, and webm."],
      ["Is the handwriting the same as what I said?", "Yes. The handwriting page uses the text you saved. It does not rewrite it into a different letter."],
      ["What templates and styles are there?", "Paper templates are Letter, Note, Card, and Grid. Handwriting styles are Casual, Cursive, and Messy. You can also set Small, Medium, or Large, and Blue, Black, or Pencil ink."],
      ["What is the difference between PNG and PDF?", "PNG downloads the page you are looking at. PDF downloads every page."],
      ["Can I print it?", "Yes. Download the PDF and print it, or print the PNG."],
      ["What language is the transcript?", "English."],
      ["Do you keep my recording?", "The transcript stays in this browser tab. A recording is sent for transcription only when that service is turned on, and we do not keep the file after the words come back. Details are on the privacy page."],
    ],
  },
  privacy: {
    kicker: "Privacy",
    h1: "Privacy policy",
    notice: "",
    blocks: [
      ["", "Effective date: September 24, 2026. This policy covers voicetohandwriting.online."],
      ["What stays in your browser", "The transcript is saved in this browser tab so you can move from the text page to the handwriting page. Handwriting images are drawn on your device. Clearing the tab removes the transcript."],
      ["Recordings", "If you record or upload audio, the file is sent to our server to be transcribed. When transcription is enabled, that audio is forwarded to OpenRouter and is not stored by us after the text is returned. On Chrome, the browser’s own speech recognition may also send audio to the browser maker. We do not sell recordings."],
      ["What we do not collect", "There is no account. We do not ask for your name or email to use the tool. If you email us, we use that message only to reply."],
      ["Children", "The site is not for children under 13, and we do not knowingly collect their information."],
      ["Contact", "Questions about this policy: hello@voicetohandwriting.online."],
    ],
  },
  contact: {
    kicker: "Contact",
    h1: "Write to us",
    body: "Email hello@voicetohandwriting.online. We read messages about transcription, downloads, and the handwriting styles.",
    beforeFaq: "Include the browser you used and the step you were on. For common questions, see the ",
    faq: "FAQ",
    afterFaq: ".",
  },
};

function fill(name: string, meta: Copy["meta"], nav: Copy["nav"], home: Copy["home"], text: Copy["text"], studio: Copy["studio"], faq: Copy["faq"], privacy: Copy["privacy"], contact: Copy["contact"]): Copy {
  return { name, meta, nav, home, text, studio, faq, privacy, contact };
}

const notice = {
  zh: "本页是译文。与英文版不一致时，以英文版为准。",
  hi: "यह अनुवाद है। अंग्रेज़ी पाठ से भिन्न होने पर अंग्रेज़ी पाठ मान्य होगा।",
  es: "Esta página es una traducción. Si difiere del texto en inglés, prevalece el inglés.",
  fr: "Cette page est une traduction. En cas d’écart avec le texte anglais, la version anglaise prévaut.",
  ar: "هذه الصفحة ترجمة. عند الاختلاف مع النص الإنجليزي، يُعتد بالنص الإنجليزي.",
  bn: "এই পৃষ্ঠা একটি অনুবাদ। ইংরেজি পাঠের সঙ্গে গরমিল হলে ইংরেজি পাঠই চূড়ান্ত।",
  pt: "Esta página é uma tradução. Se divergir do texto em inglês, vale o inglês.",
  ru: "Это перевод. Если он расходится с английским текстом, верным считается английский.",
  ur: "یہ صفحہ ترجمہ ہے۔ انگریزی متن سے اختلاف ہو تو انگریزی متن معتبر ہوگا۔",
};

export const COPY = {
  en,
  zh: fill(
    "中文",
    {
      home: { title: "语音转手写 — 把说话变成可打印的手写", description: "把语音变成手写。录音或上传音频，改好文字，再下载单页 PNG 或多页 PDF。" },
      text: { title: "修改文字 — 语音转手写", description: "在写成手写之前，检查并修改录音转出的文字。" },
      handwriting: { title: "手写预览 — 语音转手写", description: "选择纸张、字迹、字号和墨水，下载当前页 PNG 或全部页面的 PDF。" },
      faq: { title: "常见问题 — 语音转手写", description: "语音转手写怎么用：录音、上传、手机、纸张样式，以及 PNG 和 PDF 下载。" },
      privacy: { title: "隐私 — 语音转手写", description: "语音转手写如何处理录音、文字和下载文件。" },
      contact: { title: "联系 — 语音转手写", description: "写信询问转写、下载或手写样式。" },
    },
    { voice: "语音", text: "文字", handwriting: "手写", faq: "常见问题", privacy: "隐私", contact: "联系", language: "语言" },
    {
      kicker: "第 1 步，共 3 步",
      h1: "说出你的话。",
      lede: "在这一页录音，或上传音频。下一页会显示文字。",
      hold: "按住录音",
      listening: "正在听… 松开后转写",
      transcribing: "正在转写…",
      upload: "上传音频",
      micError: "请允许使用麦克风，然后再试一次。",
      transcribeError: "这段音频无法转写。",
      features: [
        ["录音或上传", "按住按钮录音，或上传 m4a、mp3、wav、webm。手机和电脑是同一步。"],
        ["改文字", "文字在单独一页。写成手写之前，可以改名字或句子。"],
        ["纸张、墨水和下载", "选择信纸、笔记、卡片或方格，再选字迹、字号和墨水。单页存 PNG，全部页面存 PDF。"],
      ],
    },
    { kicker: "第 2 步，共 3 步", h1: "核对文字。", lede: "这是转写结果。改掉录音听错的地方。手写页会按这段文字分页。", placeholder: "转写的文字会出现在这里。", back: "返回语音", next: "生成手写" },
    {
      kicker: "第 3 步，共 3 步", h1: "选一页，然后下载。", lede: "长文会分成多页。PNG 保存当前页。PDF 保存每一页。",
      emptyBefore: "还没有文字。", emptyLink: "请先填写文字。", previous: "上一页", nextPage: "下一页", page: "第 {current} 页，共 {total} 页", edit: "编辑文字", png: "下载 PNG", pdf: "下载 PDF", alt: "手写第 {current} 页",
      letter: "信纸", note: "笔记", card: "卡片", grid: "方格", casual: "随意", cursive: "花体", messy: "潦草", small: "小", medium: "中", large: "大", blue: "蓝", black: "黑", pencil: "铅笔",
      drawError: "无法绘制这一页。", pngError: "无法导出 PNG。", pdfError: "无法导出 PDF。",
    },
    {
      kicker: "常见问题", h1: "问题",
      items: [
        ["这个网站做什么？", "你录音或上传语音，核对文字，再把这些原话变成可以下载的手写。"],
        ["需要账号吗？", "不需要。不用注册就能录音、修改和下载。"],
        ["手机可以用吗？", "可以。Android 上的 Chrome 能在浏览器里转写。iPhone 会把录音发给转写服务。如果服务没有配置，可以在文字页自己输入。"],
        ["可以上传哪些音频？", "m4a、mp3、wav 和 webm。"],
        ["手写和我说的一样吗？", "一样。手写页用的是你保存的文字，不会改写成另一封信。"],
        ["有哪些模板和样式？", "纸张有信纸、笔记、卡片和方格。字迹有随意、花体和潦草。还可以选小、中、大，以及蓝、黑、铅笔色。"],
        ["PNG 和 PDF 有什么区别？", "PNG 下载你正在看的这一页。PDF 下载每一页。"],
        ["可以打印吗？", "可以。下载 PDF 或 PNG 后打印。"],
        ["转写是什么语言？", "英文。"],
        ["你们会保存录音吗？", "文字留在这个浏览器标签里。只有开启转写服务时才会送出录音，文字返回后我们不保留文件。详情在隐私页。"],
      ],
    },
    {
      kicker: "隐私", h1: "隐私政策", notice: notice.zh,
      blocks: [
        ["", "生效日期：2026 年 9 月 24 日。本政策适用于 voicetohandwriting.online。"],
        ["留在浏览器里的内容", "文字保存在这个浏览器标签里，方便你从文字页到到手写页。手写图在你的设备上绘制。关掉标签后，文字会被清掉。"],
        ["录音", "录音或上传音频后，文件会送到我们的服务器做转写。开启转写时，音频会转给 OpenRouter，文字返回后我们不保存该文件。在 Chrome 上，浏览器自己的语音识别也可能把音频发给浏览器厂商。我们不出售录音。"],
        ["我们不收集的内容", "没有账号。使用工具时不要求姓名或邮箱。如果你写信给我们，我们只用这封信来回复。"],
        ["儿童", "本网站不面向 13 岁以下儿童，我们也不会故意收集他们的信息。"],
        ["联系", "关于本政策的问题：hello@voicetohandwriting.online。"],
      ],
    },
    { kicker: "联系", h1: "写信给我们", body: "发送邮件到 hello@voicetohandwriting.online。我们会阅读关于转写、下载和手写样式的来信。", beforeFaq: "请写上你用的浏览器和当时的步骤。常见问题见", faq: "常见问题", afterFaq: "。" },
  ),
  hi: fill(
    "हिन्दी",
    {
      home: { title: "आवाज़ से लिखावट — बोलकर छापने लायक लिखावट बनाएँ", description: "बोली को लिखावट में बदलें। रिकॉर्ड करें या ऑडियो अपलोड करें, पाठ सुधारें, फिर PNG या कई पन्नों की PDF डाउनलोड करें।" },
      text: { title: "पाठ संपादित करें — आवाज़ से लिखावट", description: "हाथ से लिखे जाने से पहले रिकॉर्डिंग के शब्द देखें और सुधारें।" },
      handwriting: { title: "लिखावट पूर्वावलोकन — आवाज़ से लिखावट", description: "कागज़, लिखावट, आकार और स्याही चुनें, फिर एक पृष्ठ की PNG या सभी पृष्ठों की PDF डाउनलोड करें।" },
      faq: { title: "सवाल — आवाज़ से लिखावट", description: "आवाज़ से लिखावट कैसे काम करती है: रिकॉर्डिंग, अपलोड, फ़ोन, कागज़, और PNG या PDF।" },
      privacy: { title: "गोपनीयता — आवाज़ से लिखावट", description: "आवाज़ से लिखावट रिकॉर्डिंग, पाठ और डाउनलोड कैसे संभालती है।" },
      contact: { title: "संपर्क — आवाज़ से लिखावट", description: "प्रतिलेखन, डाउनलोड या लिखावट शैलियों के बारे में ईमेल करें।" },
    },
    { voice: "आवाज़", text: "पाठ", handwriting: "लिखावट", faq: "सवाल", privacy: "गोपनीयता", contact: "संपर्क", language: "भाषा" },
    {
      kicker: "चरण 1 / 3", h1: "अपनी आवाज़ जोड़ें।", lede: "इस पृष्ठ पर रिकॉर्ड करें, या ऑडियो फ़ाइल अपलोड करें। अगले पृष्ठ पर शब्द दिखेंगे।",
      hold: "रिकॉर्ड करने के लिए दबाएँ", listening: "सुन रहे हैं… छोड़ते ही प्रतिलेख", transcribing: "प्रतिलेख बन रहा है…", upload: "ऑडियो अपलोड करें",
      micError: "माइक्रोफ़ोन की अनुमति दें, फिर फिर कोशिश करें।", transcribeError: "इस ऑडियो का प्रतिलेख नहीं बन सका।",
      features: [
        ["रिकॉर्ड या अपलोड", "बटन दबाकर रिकॉर्ड करें, या m4a, mp3, wav, webm अपलोड करें। फ़ोन और कंप्यूटर पर यही चरण है।"],
        ["पाठ सुधारें", "शब्द अपने पृष्ठ पर आते हैं। हाथ से लिखने से पहले नाम या वाक्य बदलें।"],
        ["कागज़, स्याही, डाउनलोड", "पत्र, नोट, कार्ड या ग्रिड चुनें, फिर शैली, आकार और स्याही। एक पृष्ठ PNG, सभी पृष्ठ PDF।"],
      ],
    },
    { kicker: "चरण 2 / 3", h1: "शब्द जाँचें।", lede: "यह प्रतिलेख है। रिकॉर्डिंग की गलतियाँ सुधारें। लिखावट पृष्ठ इसी पाठ को पृष्ठ दर पृष्ठ लिखेगा।", placeholder: "प्रतिलेख यहाँ दिखेगा।", back: "आवाज़ पर वापस", next: "लिखावट बनाएँ" },
    {
      kicker: "चरण 3 / 3", h1: "पृष्ठ चुनें, फिर डाउनलोड करें।", lede: "लंबा पाठ कई पृष्ठों में बँटता है। PNG वर्तमान पृष्ठ सहेजता है। PDF हर पृष्ठ सहेजती है।",
      emptyBefore: "अभी कोई पाठ नहीं।", emptyLink: "पहले शब्द जोड़ें।", previous: "पिछला", nextPage: "अगला", page: "पृष्ठ {current} / {total}", edit: "पाठ संपादित करें", png: "PNG डाउनलोड", pdf: "PDF डाउनलोड", alt: "लिखावट पृष्ठ {current}",
      letter: "पत्र", note: "नोट", card: "कार्ड", grid: "ग्रिड", casual: "साधारण", cursive: "सुलेख", messy: "लापरवाह", small: "छोटा", medium: "मध्यम", large: "बड़ा", blue: "नीला", black: "काला", pencil: "पेंसिल",
      drawError: "पृष्ठ नहीं बन सका।", pngError: "PNG नहीं बन सकी।", pdfError: "PDF नहीं बन सकी।",
    },
    {
      kicker: "सवाल", h1: "प्रश्न",
      items: [
        ["यह साइट क्या करती है?", "आप बोली रिकॉर्ड या अपलोड करते हैं, पाठ जाँचते हैं, फिर उन्हीं शब्दों को डाउनलोड करने लायक लिखावट बनाते हैं।"],
        ["क्या खाता चाहिए?", "नहीं। बिना साइन अप रिकॉर्ड करें, संपादित करें और डाउनलोड करें।"],
        ["क्या फ़ोन पर चलेगा?", "हाँ। Android Chrome ब्राउज़र में प्रतिलेख कर सकता है। iPhone रिकॉर्डिंग एक सेवा को भेजता है। सेवा न हो तो पाठ पृष्ठ पर शब्द टाइप करें।"],
        ["कौन सी ऑडियो फ़ाइलें?", "m4a, mp3, wav, और webm।"],
        ["क्या लिखावट वही है जो मैंने कहा?", "हाँ। लिखावट पृष्ठ आपके सहेजे पाठ का उपयोग करता है। यह उसे दूसरे पत्र में नहीं बदलता।"],
        ["कौन से टेम्पलेट और शैलियाँ?", "कागज़: पत्र, नोट, कार्ड, ग्रिड। लिखावट: साधारण, सुलेख, लापरवाह। आकार छोटा, मध्यम, बड़ा। स्याही नीली, काली, पेंसिल।"],
        ["PNG और PDF में अंतर?", "PNG वही पृष्ठ डाउनलोड करता है जो आप देख रहे हैं। PDF हर पृष्ठ डाउनलोड करती है।"],
        ["क्या छाप सकते हैं?", "हाँ। PDF या PNG डाउनलोड करके छापें।"],
        ["प्रतिलेख किस भाषा में है?", "अंग्रेज़ी।"],
        ["क्या आप मेरी रिकॉर्डिंग रखते हैं?", "पाठ इसी ब्राउज़र टैब में रहता है। रिकॉर्डिंग केवल तभी भेजी जाती है जब प्रतिलेख सेवा चालू हो, और शब्द आने के बाद फ़ाइल नहीं रखी जाती। विवरण गोपनीयता पृष्ठ पर है।"],
      ],
    },
    {
      kicker: "गोपनीयता", h1: "गोपनीयता नीति", notice: notice.hi,
      blocks: [
        ["", "प्रभावी तिथि: 24 सितंबर 2026। यह नीति voicetohandwriting.online पर लागू है।"],
        ["ब्राउज़र में क्या रहता है", "पाठ इस टैब में सहेजा जाता है ताकि आप पाठ पृष्ठ से लिखावट पृष्ठ तक जा सकें। लिखावट आपके डिवाइस पर बनती है। टैब साफ़ करने पर पाठ हट जाता है।"],
        ["रिकॉर्डिंग", "रिकॉर्ड या अपलोड करने पर फ़ाइल प्रतिलेख के लिए हमारे सर्वर को जाती है। सेवा चालू हो तो ऑडियो OpenRouter को भेजा जाता है और पाठ लौटने के बाद हम उसे नहीं रखते। Chrome पर ब्राउज़र की वाक् पहचान ऑडियो ब्राउज़र निर्माता को भेज सकती है। हम रिकॉर्डिंग नहीं बेचते।"],
        ["हम क्या नहीं लेते", "कोई खाता नहीं है। उपकरण के लिए नाम या ईमेल नहीं माँगा जाता। यदि आप ईमेल करें, तो संदेश केवल उत्तर के लिए उपयोग होगा।"],
        ["बच्चे", "यह साइट 13 वर्ष से छोटे बच्चों के लिए नहीं है, और हम जानबूझकर उनकी जानकारी नहीं लेते।"],
        ["संपर्क", "इस नीति पर प्रश्न: hello@voicetohandwriting.online।"],
      ],
    },
    { kicker: "संपर्क", h1: "हमें लिखें", body: "hello@voicetohandwriting.online पर ईमेल करें। हम प्रतिलेखन, डाउनलोड और लिखावट शैलियों के संदेश पढ़ते हैं।", beforeFaq: "अपना ब्राउज़र और चरण लिखें। आम सवालों के लिए ", faq: "सवाल", afterFaq: " देखें।" },
  ),
  es: fill(
    "Español",
    {
      home: { title: "Voz a escritura — Convierte el habla en letra para imprimir", description: "Convierte el habla en escritura. Graba o sube audio, corrige el texto y descarga un PNG o un PDF de varias páginas." },
      text: { title: "Editar texto — Voz a escritura", description: "Revisa y corrige las palabras de la grabación antes de pasarlas a mano." },
      handwriting: { title: "Vista de escritura — Voz a escritura", description: "Elige papel, estilo, tamaño y tinta, y descarga un PNG de una página o un PDF de todas." },
      faq: { title: "Preguntas — Voz a escritura", description: "Cómo funciona voz a escritura: grabación, archivos, teléfonos, papeles y descargas PNG o PDF." },
      privacy: { title: "Privacidad — Voz a escritura", description: "Cómo Voz a escritura trata grabaciones, textos y descargas." },
      contact: { title: "Contacto — Voz a escritura", description: "Escribe sobre transcripción, descargas o estilos de escritura." },
    },
    { voice: "Voz", text: "Texto", handwriting: "Escritura", faq: "Preguntas", privacy: "Privacidad", contact: "Contacto", language: "Idioma" },
    {
      kicker: "Paso 1 de 3", h1: "Añade tu voz.", lede: "Graba en esta página o sube un audio. La siguiente muestra las palabras.",
      hold: "Mantén para grabar", listening: "Escuchando… suelta para transcribir", transcribing: "Transcribiendo…", upload: "Subir audio",
      micError: "Permite el micrófono e inténtalo de nuevo.", transcribeError: "No se pudo transcribir ese audio.",
      features: [
        ["Graba o sube", "Mantén el botón para grabar, o sube un archivo m4a, mp3, wav o webm. El teléfono y el ordenador usan el mismo paso."],
        ["Corrige el texto", "Las palabras llegan a su propia página. Cambia un nombre o una frase antes de escribir a mano."],
        ["Papel, tinta y descarga", "Elige Carta, Nota, Tarjeta o Cuadrícula, y luego estilo, tamaño y tinta. Un PNG de una página o un PDF de todas."],
      ],
    },
    { kicker: "Paso 2 de 3", h1: "Revisa las palabras.", lede: "Esta es la transcripción. Corrige lo que la grabación entendió mal. La página de escritura usa este texto, página por página.", placeholder: "La transcripción aparece aquí.", back: "Volver a la voz", next: "Crear escritura" },
    {
      kicker: "Paso 3 de 3", h1: "Elige una página y descarga.", lede: "El texto largo se divide en páginas. El PNG guarda la página que ves. El PDF guarda todas.",
      emptyBefore: "Aún no hay texto.", emptyLink: "Añade las palabras primero.", previous: "Anterior", nextPage: "Siguiente", page: "Página {current} de {total}", edit: "Editar texto", png: "Descargar PNG", pdf: "Descargar PDF", alt: "Página de escritura {current}",
      letter: "Carta", note: "Nota", card: "Tarjeta", grid: "Cuadrícula", casual: "Informal", cursive: "Cursiva", messy: "Descuidada", small: "Pequeño", medium: "Mediano", large: "Grande", blue: "Azul", black: "Negro", pencil: "Lápiz",
      drawError: "No se pudo dibujar la página.", pngError: "No se pudo exportar el PNG.", pdfError: "No se pudo exportar el PDF.",
    },
    {
      kicker: "Preguntas", h1: "Preguntas",
      items: [
        ["¿Qué hace este sitio?", "Grabas o subes voz, revisas el texto y conviertes esas palabras exactas en escritura para descargar."],
        ["¿Necesito una cuenta?", "No. Graba, edita y descarga sin registrarte."],
        ["¿Funciona en el teléfono?", "Sí. Chrome en Android puede transcribir en el navegador. El iPhone envía la grabación a un servicio. Si no está configurado, escribe en la página de texto."],
        ["¿Qué archivos de audio puedo subir?", "m4a, mp3, wav y webm."],
        ["¿La escritura es lo que dije?", "Sí. La página de escritura usa el texto que guardaste. No lo reescribe como otra carta."],
        ["¿Qué plantillas y estilos hay?", "Papel: Carta, Nota, Tarjeta y Cuadrícula. Escritura: Informal, Cursiva y Descuidada. Tamaño pequeño, mediano o grande. Tinta azul, negra o lápiz."],
        ["¿Qué diferencia hay entre PNG y PDF?", "El PNG descarga la página que estás viendo. El PDF descarga todas."],
        ["¿Puedo imprimirlo?", "Sí. Descarga el PDF o el PNG e imprímelo."],
        ["¿En qué idioma está la transcripción?", "Inglés."],
        ["¿Guardan mi grabación?", "El texto permanece en esta pestaña. La grabación se envía solo si el servicio de transcripción está activo, y no conservamos el archivo cuando vuelve el texto. Los detalles están en privacidad."],
      ],
    },
    {
      kicker: "Privacidad", h1: "Política de privacidad", notice: notice.es,
      blocks: [
        ["", "Fecha de vigencia: 24 de septiembre de 2026. Esta política cubre voicetohandwriting.online."],
        ["Qué permanece en el navegador", "El texto se guarda en esta pestaña para pasar de la página de texto a la de escritura. Las imágenes se dibujan en tu dispositivo. Cerrar la pestaña borra el texto."],
        ["Grabaciones", "Si grabas o subes audio, el archivo se envía a nuestro servidor para transcribirlo. Si la transcripción está activa, el audio se reenvía a OpenRouter y no lo guardamos después de recibir el texto. En Chrome, el reconocimiento del navegador también puede enviar audio a su fabricante. No vendemos grabaciones."],
        ["Qué no recopilamos", "No hay cuenta. No pedimos nombre ni correo para usar la herramienta. Si nos escribes, usamos el mensaje solo para responder."],
        ["Menores", "El sitio no es para menores de 13 años y no recopilamos su información a sabiendas."],
        ["Contacto", "Preguntas sobre esta política: hello@voicetohandwriting.online."],
      ],
    },
    { kicker: "Contacto", h1: "Escríbenos", body: "Escribe a hello@voicetohandwriting.online. Leemos mensajes sobre transcripción, descargas y estilos de escritura.", beforeFaq: "Indica el navegador y el paso en el que estabas. Para dudas frecuentes, consulta las ", faq: "preguntas", afterFaq: "." },
  ),
  fr: fill(
    "Français",
    {
      home: { title: "Voix en écriture — Transformez la parole en écriture à imprimer", description: "Transformez la parole en écriture. Enregistrez ou envoyez un audio, corrigez le texte, puis téléchargez un PNG ou un PDF de plusieurs pages." },
      text: { title: "Modifier le texte — Voix en écriture", description: "Relisez et corrigez les mots de l’enregistrement avant qu’ils soient écrits à la main." },
      handwriting: { title: "Aperçu de l’écriture — Voix en écriture", description: "Choisissez le papier, le style, la taille et l’encre, puis téléchargez un PNG d’une page ou un PDF de toutes les pages." },
      faq: { title: "Questions — Voix en écriture", description: "Comment fonctionne voix en écriture : enregistrement, fichiers, téléphones, papiers, et téléchargements PNG ou PDF." },
      privacy: { title: "Confidentialité — Voix en écriture", description: "Comment Voix en écriture traite les enregistrements, les textes et les téléchargements." },
      contact: { title: "Contact — Voix en écriture", description: "Écrivez au sujet de la transcription, des téléchargements ou des styles d’écriture." },
    },
    { voice: "Voix", text: "Texte", handwriting: "Écriture", faq: "Questions", privacy: "Confidentialité", contact: "Contact", language: "Langue" },
    {
      kicker: "Étape 1 sur 3", h1: "Ajoutez votre voix.", lede: "Enregistrez sur cette page, ou envoyez un fichier audio. La page suivante montre les mots.",
      hold: "Maintenir pour enregistrer", listening: "Écoute… relâchez pour transcrire", transcribing: "Transcription…", upload: "Envoyer un audio",
      micError: "Autorisez le microphone, puis réessayez.", transcribeError: "Impossible de transcrire cet audio.",
      features: [
        ["Enregistrer ou envoyer", "Maintenez le bouton pour enregistrer, ou envoyez un fichier m4a, mp3, wav ou webm. Le téléphone et l’ordinateur utilisent la même étape."],
        ["Corriger le texte", "Les mots arrivent sur leur propre page. Changez un nom ou une phrase avant l’écriture à la main."],
        ["Papier, encre et téléchargement", "Choisissez Lettre, Note, Carte ou Grille, puis le style, la taille et l’encre. Un PNG pour une page, un PDF pour toutes."],
      ],
    },
    { kicker: "Étape 2 sur 3", h1: "Vérifiez les mots.", lede: "Ceci est la transcription. Corrigez ce que l’enregistrement a mal entendu. La page d’écriture utilise ce texte, page par page.", placeholder: "La transcription apparaît ici.", back: "Retour à la voix", next: "Créer l’écriture" },
    {
      kicker: "Étape 3 sur 3", h1: "Choisissez une page, puis téléchargez.", lede: "Un long texte se répartit sur plusieurs pages. Le PNG enregistre la page affichée. Le PDF enregistre chaque page.",
      emptyBefore: "Pas encore de texte.", emptyLink: "Ajoutez d’abord les mots.", previous: "Précédent", nextPage: "Suivant", page: "Page {current} sur {total}", edit: "Modifier le texte", png: "Télécharger le PNG", pdf: "Télécharger le PDF", alt: "Page d’écriture {current}",
      letter: "Lettre", note: "Note", card: "Carte", grid: "Grille", casual: "Simple", cursive: "Cursive", messy: "Irrégulière", small: "Petit", medium: "Moyen", large: "Grand", blue: "Bleu", black: "Noir", pencil: "Crayon",
      drawError: "Impossible de dessiner la page.", pngError: "Impossible d’exporter le PNG.", pdfError: "Impossible d’exporter le PDF.",
    },
    {
      kicker: "Questions", h1: "Questions",
      items: [
        ["Que fait ce site ?", "Vous enregistrez ou envoyez de la parole, vérifiez le texte, puis transformez ces mots exacts en écriture à télécharger."],
        ["Faut-il un compte ?", "Non. Enregistrez, modifiez et téléchargez sans inscription."],
        ["Puis-je l’utiliser sur un téléphone ?", "Oui. Chrome sur Android peut transcrire dans le navigateur. L’iPhone envoie l’enregistrement à un service. S’il n’est pas configuré, tapez les mots sur la page de texte."],
        ["Quels fichiers audio puis-je envoyer ?", "m4a, mp3, wav et webm."],
        ["L’écriture correspond-elle à ce que j’ai dit ?", "Oui. La page d’écriture utilise le texte enregistré. Elle ne le réécrit pas en une autre lettre."],
        ["Quels modèles et styles ?", "Papiers : Lettre, Note, Carte et Grille. Écritures : Simple, Cursive et Irrégulière. Tailles petit, moyen, grand. Encres bleu, noir ou crayon."],
        ["Quelle est la différence entre PNG et PDF ?", "Le PNG télécharge la page affichée. Le PDF télécharge chaque page."],
        ["Puis-je l’imprimer ?", "Oui. Téléchargez le PDF ou le PNG, puis imprimez."],
        ["Quelle est la langue de la transcription ?", "L’anglais."],
        ["Conservez-vous mon enregistrement ?", "Le texte reste dans cet onglet. L’enregistrement n’est envoyé que si le service de transcription est activé, et nous ne gardons pas le fichier une fois le texte revenu. Les détails sont sur la page confidentialité."],
      ],
    },
    {
      kicker: "Confidentialité", h1: "Politique de confidentialité", notice: notice.fr,
      blocks: [
        ["", "Date d’effet : 24 septembre 2026. Cette politique couvre voicetohandwriting.online."],
        ["Ce qui reste dans le navigateur", "Le texte est enregistré dans cet onglet pour passer de la page de texte à la page d’écriture. Les images sont dessinées sur votre appareil. Fermer l’onglet efface le texte."],
        ["Enregistrements", "Si vous enregistrez ou envoyez un audio, le fichier est envoyé à notre serveur pour être transcrit. Lorsque la transcription est activée, l’audio est transmis à OpenRouter et nous ne le conservons pas après le retour du texte. Sur Chrome, la reconnaissance du navigateur peut aussi envoyer l’audio à son éditeur. Nous ne vendons pas les enregistrements."],
        ["Ce que nous ne collectons pas", "Il n’y a pas de compte. Nous ne demandons ni nom ni e-mail pour utiliser l’outil. Si vous nous écrivez, le message sert seulement à répondre."],
        ["Enfants", "Le site n’est pas destiné aux enfants de moins de 13 ans, et nous ne collectons pas sciemment leurs informations."],
        ["Contact", "Questions sur cette politique : hello@voicetohandwriting.online."],
      ],
    },
    { kicker: "Contact", h1: "Écrivez-nous", body: "Écrivez à hello@voicetohandwriting.online. Nous lisons les messages sur la transcription, les téléchargements et les styles d’écriture.", beforeFaq: "Indiquez le navigateur et l’étape. Pour les questions courantes, voir la ", faq: "FAQ", afterFaq: "." },
  ),
  ar: fill(
    "العربية",
    {
      home: { title: "من الصوت إلى الخط — حوّل الكلام إلى خط جاهز للطباعة", description: "حوّل الكلام إلى خط يد. سجّل أو ارفع صوتًا، صحّح النص، ثم نزّل PNG أو PDF من عدة صفحات." },
      text: { title: "تعديل النص — من الصوت إلى الخط", description: "راجع كلمات التسجيل وصحّحها قبل كتابتها بخط اليد." },
      handwriting: { title: "معاينة الخط — من الصوت إلى الخط", description: "اختر الورق ونمط الخط والحجم والحبر، ثم نزّل PNG لصفحة واحدة أو PDF لكل الصفحات." },
      faq: { title: "أسئلة — من الصوت إلى الخط", description: "كيف يعمل تحويل الصوت إلى خط: التسجيل والرفع والهاتف وأنواع الورق وتنزيل PNG أو PDF." },
      privacy: { title: "الخصوصية — من الصوت إلى الخط", description: "كيف يتعامل الموقع مع التسجيلات والنصوص والتنزيلات." },
      contact: { title: "اتصال — من الصوت إلى الخط", description: "راسلنا عن التفريغ أو التنزيل أو أنماط الخط." },
    },
    { voice: "الصوت", text: "النص", handwriting: "الخط", faq: "الأسئلة", privacy: "الخصوصية", contact: "اتصال", language: "اللغة" },
    {
      kicker: "الخطوة 1 من 3", h1: "أضف صوتك.", lede: "سجّل في هذه الصفحة، أو ارفع ملفًا صوتيًا. الصفحة التالية تعرض الكلمات.",
      hold: "اضغط مع الاستمرار للتسجيل", listening: "جارٍ الاستماع… ارفع إصبعك للتفريغ", transcribing: "جارٍ التفريغ…", upload: "رفع صوت",
      micError: "اسمح بالميكروفون ثم أعد المحاولة.", transcribeError: "تعذر تفريغ هذا الصوت.",
      features: [
        ["سجّل أو ارفع", "اضغط الزر للتسجيل، أو ارفع ملف m4a أو mp3 أو wav أو webm. الهاتف والحاسوب يستخدمان الخطوة نفسها."],
        ["صحّح النص", "تظهر الكلمات في صفحتها. غيّر اسمًا أو جملة قبل الكتابة بخط اليد."],
        ["الورق والحبر والتنزيل", "اختر رسالة أو ملاحظة أو بطاقة أو شبكة، ثم النمط والحجم والحبر. PNG لصفحة واحدة، وPDF لكل الصفحات."],
      ],
    },
    { kicker: "الخطوة 2 من 3", h1: "راجع الكلمات.", lede: "هذا هو التفريغ. صحّح ما أخطأ فيه التسجيل. صفحة الخط تستخدم هذا النص صفحةً صفحة.", placeholder: "يظهر التفريغ هنا.", back: "العودة إلى الصوت", next: "إنشاء الخط" },
    {
      kicker: "الخطوة 3 من 3", h1: "اختر صفحة ثم نزّل.", lede: "النص الطويل ينقسم على صفحات. PNG يحفظ الصفحة الظاهرة. PDF يحفظ كل الصفحات.",
      emptyBefore: "لا يوجد نص بعد.", emptyLink: "أضف الكلمات أولًا.", previous: "السابق", nextPage: "التالي", page: "صفحة {current} من {total}", edit: "تعديل النص", png: "تنزيل PNG", pdf: "تنزيل PDF", alt: "صفحة الخط {current}",
      letter: "رسالة", note: "ملاحظة", card: "بطاقة", grid: "شبكة", casual: "عادي", cursive: "متصل", messy: "مهمل", small: "صغير", medium: "متوسط", large: "كبير", blue: "أزرق", black: "أسود", pencil: "قلم رصاص",
      drawError: "تعذر رسم الصفحة.", pngError: "تعذر تصدير PNG.", pdfError: "تعذر تصدير PDF.",
    },
    {
      kicker: "الأسئلة", h1: "أسئلة",
      items: [
        ["ماذا يفعل هذا الموقع؟", "تسجّل الكلام أو ترفعه، تراجع النص، ثم تحوّل تلك الكلمات كما هي إلى خط يمكن تنزيله."],
        ["هل أحتاج إلى حساب؟", "لا. سجّل وعدّل ونزّل دون تسجيل دخول."],
        ["هل يعمل على الهاتف؟", "نعم. Chrome على Android يفرّغ في المتصفح. iPhone يرسل التسجيل إلى خدمة تفريغ. إن لم تكن مهيأة، اكتب الكلمات في صفحة النص."],
        ["ما الملفات الصوتية المقبولة؟", "m4a وmp3 وwav وwebm."],
        ["هل الخط هو ما قلته؟", "نعم. صفحة الخط تستخدم النص الذي حفظته. لا تعيد كتابته كرسالة أخرى."],
        ["ما القوالب والأنماط؟", "الورق: رسالة وملاحظة وبطاقة وشبكة. الخط: عادي ومتصل ومهمل. الحجم صغير أو متوسط أو كبير. الحبر أزرق أو أسود أو قلم رصاص."],
        ["ما الفرق بين PNG وPDF؟", "PNG ينزّل الصفحة التي تراها. PDF ينزّل كل الصفحات."],
        ["هل يمكنني الطباعة؟", "نعم. نزّل PDF أو PNG ثم اطبع."],
        ["بأي لغة يكون التفريغ؟", "الإنجليزية."],
        ["هل تحتفظون بتسجيلي؟", "يبقى النص في علامة التبويب هذه. يُرسل التسجيل فقط عند تشغيل خدمة التفريغ، ولا نحتفظ بالملف بعد عودة النص. التفاصيل في صفحة الخصوصية."],
      ],
    },
    {
      kicker: "الخصوصية", h1: "سياسة الخصوصية", notice: notice.ar,
      blocks: [
        ["", "تاريخ السريان: 24 سبتمبر 2026. تغطي هذه السياسة voicetohandwriting.online."],
        ["ما يبقى في المتصفح", "يُحفظ النص في علامة التبويب هذه للانتقال من صفحة النص إلى صفحة الخط. تُرسم الصور على جهازك. إغلاق العلامة يزيل النص."],
        ["التسجيلات", "إذا سجّلت أو رفعت صوتًا، يُرسل الملف إلى خادمنا للتفريغ. عند تفعيل التفريغ يُحال الصوت إلى OpenRouter ولا نحتفظ به بعد عودة النص. في Chrome قد ترسل ميزة التعرف على الكلام الصوت إلى صانع المتصفح. لا نبيع التسجيلات."],
        ["ما لا نجمعه", "لا يوجد حساب. لا نطلب الاسم أو البريد لاستخدام الأداة. إذا راسلتنا، نستخدم الرسالة للرد فقط."],
        ["الأطفال", "الموقع ليس لمن هم دون 13 عامًا، ولا نجمع معلوماتهم عن علم."],
        ["اتصال", "أسئلة عن هذه السياسة: hello@voicetohandwriting.online."],
      ],
    },
    { kicker: "اتصال", h1: "اكتب إلينا", body: "راسل hello@voicetohandwriting.online. نقرأ الرسائل عن التفريغ والتنزيل وأنماط الخط.", beforeFaq: "اذكر المتصفح والخطوة التي كنت فيها. للأسئلة الشائعة انظر ", faq: "الأسئلة", afterFaq: "." },
  ),
  bn: fill(
    "বাংলা",
    {
      home: { title: "কণ্ঠ থেকে হাতের লেখা — কথা বললেই ছাপার যোগ্য হাতের লেখা", description: "কথাকে হাতের লেখায় বদলান। রেকর্ড করুন বা অডিও আপলোড করুন, লেখা ঠিক করুন, তারপর PNG বা একাধিক পাতার PDF নামান।" },
      text: { title: "লেখা সম্পাদনা — কণ্ঠ থেকে হাতের লেখা", description: "হাতে লেখার আগে রেকর্ডিংয়ের শব্দ দেখে ঠিক করুন।" },
      handwriting: { title: "হাতের লেখার প্রিভিউ — কণ্ঠ থেকে হাতের লেখা", description: "কাগজ, হাতের লেখা, আকার ও কালি বেছে নিন, তারপর এক পাতার PNG বা সব পাতার PDF নামান।" },
      faq: { title: "প্রশ্ন — কণ্ঠ থেকে হাতের লেখা", description: "কণ্ঠ থেকে হাতের লেখা কীভাবে কাজ করে: রেকর্ডিং, আপলোড, ফোন, কাগজ, এবং PNG বা PDF।" },
      privacy: { title: "গোপনীয়তা — কণ্ঠ থেকে হাতের লেখা", description: "রেকর্ডিং, লেখা ও ডাউনলোড কীভাবে রাখা হয়।" },
      contact: { title: "যোগাযোগ — কণ্ঠ থেকে হাতের লেখা", description: "প্রতিলিপি, ডাউনলোড বা হাতের লেখার ধরন নিয়ে ইমেল করুন।" },
    },
    { voice: "কণ্ঠ", text: "লেখা", handwriting: "হাতের লেখা", faq: "প্রশ্ন", privacy: "গোপনীয়তা", contact: "যোগাযোগ", language: "ভাষা" },
    {
      kicker: "ধাপ ১ / ৩", h1: "আপনার কণ্ঠ যোগ করুন।", lede: "এই পাতায় রেকর্ড করুন, অথবা অডিও ফাইল আপলোড করুন। পরের পাতায় শব্দ দেখা যাবে।",
      hold: "রেকর্ড করতে চেপে রাখুন", listening: "শুনছি… ছেড়ে দিলে প্রতিলিপি", transcribing: "প্রতিলিপি হচ্ছে…", upload: "অডিও আপলোড",
      micError: "মাইক্রোফোনের অনুমতি দিন, তারপর আবার চেষ্টা করুন।", transcribeError: "এই অডিওর প্রতিলিপি করা যায়নি।",
      features: [
        ["রেকর্ড বা আপলোড", "বোতাম চেপে রেকর্ড করুন, অথবা m4a, mp3, wav, webm আপলোড করুন। ফোন ও কম্পিউটারে একই ধাপ।"],
        ["লেখা ঠিক করুন", "শব্দ আলাদা পাতায় আসে। হাতে লেখার আগে নাম বা বাক্য বদলান।"],
        ["কাগজ, কালি, ডাউনলোড", "চিঠি, নোট, কার্ড বা খাতা বেছে নিন, তারপর ধরন, আকার ও কালি। এক পাতা PNG, সব পাতা PDF।"],
      ],
    },
    { kicker: "ধাপ ২ / ৩", h1: "শব্দ মিলিয়ে নিন।", lede: "এটি প্রতিলিপি। রেকর্ডিংয়ে যা ভুল শুনেছে তা ঠিক করুন। হাতের লেখার পাতা এই লেখাই পাতা অনুসারে ব্যবহার করে।", placeholder: "প্রতিলিপি এখানে দেখা যাবে।", back: "কণ্ঠে ফিরুন", next: "হাতের লেখা বানান" },
    {
      kicker: "ধাপ ৩ / ৩", h1: "একটি পাতা বেছে নামান।", lede: "লম্বা লেখা কয়েকটি পাতায় ভাগ হয়। PNG বর্তমান পাতা রাখে। PDF প্রতিটি পাতা রাখে।",
      emptyBefore: "এখনও কোনো লেখা নেই।", emptyLink: "আগে শব্দ যোগ করুন।", previous: "আগের", nextPage: "পরের", page: "পাতা {current} / {total}", edit: "লেখা সম্পাদনা", png: "PNG নামান", pdf: "PDF নামান", alt: "হাতের লেখার পাতা {current}",
      letter: "চিঠি", note: "নোট", card: "কার্ড", grid: "খাতা", casual: "সাধারণ", cursive: "ছাঁদের", messy: "এলোমেলো", small: "ছোট", medium: "মাঝারি", large: "বড়", blue: "নীল", black: "কালো", pencil: "পেন্সিল",
      drawError: "পাতা আঁকা যায়নি।", pngError: "PNG বানানো যায়নি।", pdfError: "PDF বানানো যায়নি।",
    },
    {
      kicker: "প্রশ্ন", h1: "প্রশ্ন",
      items: [
        ["এই সাইট কী করে?", "আপনি কথা রেকর্ড বা আপলোড করেন, লেখা মিলিয়ে নেন, তারপর সেই শব্দগুলোকে নামানো যায় এমন হাতের লেখায় বদলান।"],
        ["কি অ্যাকাউন্ট লাগে?", "না। সাইন আপ ছাড়াই রেকর্ড, সম্পাদনা ও ডাউনলোড করা যায়।"],
        ["ফোনে চলবে?", "হ্যাঁ। Android-এর Chrome ব্রাউজারে প্রতিলিপি করতে পারে। iPhone রেকর্ডিং একটি সেবায় পাঠায়। সেবা না থাকলে লেখার পাতায় নিজে লিখুন।"],
        ["কোন অডিও ফাইল আপলোড করা যায়?", "m4a, mp3, wav, এবং webm।"],
        ["হাতের লেখা কি আমার বলা কথা?", "হ্যাঁ। হাতের লেখার পাতা আপনার সেভ করা লেখা ব্যবহার করে। সেটিকে অন্য চিঠিতে বদলায় না।"],
        ["কী কী টেমপ্লেট ও ধরন আছে?", "কাগজ: চিঠি, নোট, কার্ড, খাতা। হাতের লেখা: সাধারণ, ছাঁদের, এলোমেলো। আকার ছোট, মাঝারি, বড়। কালি নীল, কালো, পেন্সিল।"],
        ["PNG আর PDF-এর পার্থক্য কী?", "PNG আপনি যে পাতা দেখছেন সেটি নামায়। PDF প্রতিটি পাতা নামায়।"],
        ["ছাপা যাবে?", "হ্যাঁ। PDF বা PNG নেমে ছাপুন।"],
        ["প্রতিলিপি কোন ভাষায়?", "ইংরেজি।"],
        ["আপনারা কি আমার রেকর্ডিং রাখেন?", "লেখা এই ব্রাউজার ট্যাবে থাকে। প্রতিলিপি সেবা চালু থাকলেই রেকর্ডিং পাঠানো হয়, লেখা ফিরে এলে ফাইল রাখা হয় না। বিস্তারিত গোপনীয়তার পাতায়।"],
      ],
    },
    {
      kicker: "গোপনীয়তা", h1: "গোপনীয়তা নীতি", notice: notice.bn,
      blocks: [
        ["", "কার্যকর তারিখ: ২৪ সেপ্টেম্বর ২০২৬। এই নীতি voicetohandwriting.online-এর জন্য।"],
        ["ব্রাউজারে কী থাকে", "লেখা এই ট্যাবে সেভ হয়, যাতে লেখার পাতা থেকে হাতের লেখার পাতায় যাওয়া যায়। ছবি আপনার ডিভাইসে আঁকা হয়। ট্যাব বন্ধ করলে লেখা মুছে যায়।"],
        ["রেকর্ডিং", "রেকর্ড বা আপলোড করলে ফাইল প্রতিলিপির জন্য আমাদের সার্ভারে যায়। সেবা চালু থাকলে অডিও OpenRouter-এ যায় এবং লেখা ফেরার পর আমরা ফাইল রাখি না। Chrome-এ ব্রাউজারের নিজস্ব শনাক্তকরণ অডিও ব্রাউজার নির্মাতার কাছে পাঠাতে পারে। আমরা রেকর্ডিং বিক্রি করি না।"],
        ["আমরা কী সংগ্রহ করি না", "কোনো অ্যাকাউন্ট নেই। টুল ব্যবহার করতে নাম বা ইমেল চাওয়া হয় না। আপনি ইমেল করলে সেটি শুধু উত্তর দিতে ব্যবহার হয়।"],
        ["শিশু", "সাইটটি ১৩ বছরের কম বয়সীদের জন্য নয়, এবং আমরা জেনেশুনে তাদের তথ্য সংগ্রহ করি না।"],
        ["যোগাযোগ", "এই নীতি নিয়ে প্রশ্ন: hello@voicetohandwriting.online।"],
      ],
    },
    { kicker: "যোগাযোগ", h1: "আমাদের লিখুন", body: "hello@voicetohandwriting.online-এ ইমেল করুন। প্রতিলিপি, ডাউনলোড ও হাতের লেখার ধরন নিয়ে চিঠি আমরা পড়ি।", beforeFaq: "ব্যবহৃত ব্রাউজার ও ধাপ লিখুন। সাধারণ প্রশ্নের জন্য ", faq: "প্রশ্ন", afterFaq: " দেখুন।" },
  ),
  pt: fill(
    "Português",
    {
      home: { title: "Voz para letra — Transforme a fala em letra para imprimir", description: "Transforme a fala em letra manuscrita. Grave ou envie um áudio, corrija o texto e baixe um PNG ou um PDF de várias páginas." },
      text: { title: "Editar texto — Voz para letra", description: "Revise e corrija as palavras da gravação antes de passá-las à mão." },
      handwriting: { title: "Prévia da letra — Voz para letra", description: "Escolha o papel, o estilo, o tamanho e a tinta, e baixe um PNG de uma página ou um PDF de todas." },
      faq: { title: "Perguntas — Voz para letra", description: "Como a voz vira letra: gravação, envio, celular, papéis e downloads em PNG ou PDF." },
      privacy: { title: "Privacidade — Voz para letra", description: "Como o site trata gravações, textos e downloads." },
      contact: { title: "Contato — Voz para letra", description: "Escreva sobre transcrição, downloads ou estilos de letra." },
    },
    { voice: "Voz", text: "Texto", handwriting: "Letra", faq: "Perguntas", privacy: "Privacidade", contact: "Contato", language: "Idioma" },
    {
      kicker: "Passo 1 de 3", h1: "Adicione sua voz.", lede: "Grave nesta página ou envie um arquivo de áudio. A próxima mostra as palavras.",
      hold: "Segure para gravar", listening: "Ouvindo… solte para transcrever", transcribing: "Transcrevendo…", upload: "Enviar áudio",
      micError: "Permita o microfone e tente de novo.", transcribeError: "Não foi possível transcrever esse áudio.",
      features: [
        ["Grave ou envie", "Segure o botão para gravar, ou envie um arquivo m4a, mp3, wav ou webm. O celular e o computador usam o mesmo passo."],
        ["Corrija o texto", "As palavras chegam na própria página. Mude um nome ou uma frase antes de escrever à mão."],
        ["Papel, tinta e download", "Escolha Carta, Nota, Cartão ou Grade, depois o estilo, o tamanho e a tinta. PNG de uma página ou PDF de todas."],
      ],
    },
    { kicker: "Passo 2 de 3", h1: "Confira as palavras.", lede: "Esta é a transcrição. Corrija o que a gravação entendeu mal. A página da letra usa este texto, página por página.", placeholder: "A transcrição aparece aqui.", back: "Voltar à voz", next: "Criar a letra" },
    {
      kicker: "Passo 3 de 3", h1: "Escolha uma página e baixe.", lede: "Um texto longo se divide em páginas. O PNG salva a página que você vê. O PDF salva todas.",
      emptyBefore: "Ainda não há texto.", emptyLink: "Adicione as palavras primeiro.", previous: "Anterior", nextPage: "Próxima", page: "Página {current} de {total}", edit: "Editar texto", png: "Baixar PNG", pdf: "Baixar PDF", alt: "Página da letra {current}",
      letter: "Carta", note: "Nota", card: "Cartão", grid: "Grade", casual: "Solta", cursive: "Cursiva", messy: "Irregular", small: "Pequeno", medium: "Médio", large: "Grande", blue: "Azul", black: "Preto", pencil: "Lápis",
      drawError: "Não foi possível desenhar a página.", pngError: "Não foi possível exportar o PNG.", pdfError: "Não foi possível exportar o PDF.",
    },
    {
      kicker: "Perguntas", h1: "Perguntas",
      items: [
        ["O que este site faz?", "Você grava ou envia fala, confere o texto e transforma essas palavras exatas em letra para baixar."],
        ["Preciso de uma conta?", "Não. Grave, edite e baixe sem cadastro."],
        ["Funciona no celular?", "Sim. O Chrome no Android transcreve no navegador. O iPhone envia a gravação a um serviço. Se ele não estiver configurado, digite na página de texto."],
        ["Quais arquivos de áudio posso enviar?", "m4a, mp3, wav e webm."],
        ["A letra é o que eu disse?", "Sim. A página da letra usa o texto que você salvou. Ela não reescreve isso como outra carta."],
        ["Quais modelos e estilos existem?", "Papel: Carta, Nota, Cartão e Grade. Letra: Solta, Cursiva e Irregular. Tamanho pequeno, médio ou grande. Tinta azul, preta ou lápis."],
        ["Qual é a diferença entre PNG e PDF?", "O PNG baixa a página que você está vendo. O PDF baixa todas as páginas."],
        ["Posso imprimir?", "Sim. Baixe o PDF ou o PNG e imprima."],
        ["Em que idioma fica a transcrição?", "Inglês."],
        ["Vocês guardam minha gravação?", "O texto fica nesta aba. A gravação só é enviada quando o serviço de transcrição está ligado, e não guardamos o arquivo depois que o texto volta. Os detalhes estão na privacidade."],
      ],
    },
    {
      kicker: "Privacidade", h1: "Política de privacidade", notice: notice.pt,
      blocks: [
        ["", "Data de vigência: 24 de setembro de 2026. Esta política cobre voicetohandwriting.online."],
        ["O que fica no navegador", "O texto é salvo nesta aba para você ir da página de texto à página da letra. As imagens são desenhadas no seu aparelho. Fechar a aba apaga o texto."],
        ["Gravações", "Se você grava ou envia áudio, o arquivo vai ao nosso servidor para transcrição. Com a transcrição ligada, o áudio segue para a OpenRouter e não o guardamos depois que o texto volta. No Chrome, o reconhecimento do navegador também pode enviar áudio ao fabricante. Não vendemos gravações."],
        ["O que não coletamos", "Não há conta. Não pedimos nome nem e-mail para usar a ferramenta. Se você escrever, usamos a mensagem só para responder."],
        ["Crianças", "O site não é para menores de 13 anos, e não coletamos essas informações de propósito."],
        ["Contato", "Dúvidas sobre esta política: hello@voicetohandwriting.online."],
      ],
    },
    { kicker: "Contato", h1: "Escreva para nós", body: "Envie um e-mail para hello@voicetohandwriting.online. Lemos mensagens sobre transcrição, downloads e estilos de letra.", beforeFaq: "Diga o navegador e o passo em que você estava. Para dúvidas comuns, veja as ", faq: "perguntas", afterFaq: "." },
  ),
  ru: fill(
    "Русский",
    {
      home: { title: "Голос в почерк — Превратите речь в почерк для печати", description: "Превратите речь в почерк. Запишите или загрузите аудио, исправьте текст и скачайте PNG или многостраничный PDF." },
      text: { title: "Правка текста — Голос в почерк", description: "Проверьте и исправьте слова из записи, прежде чем они станут почерком." },
      handwriting: { title: "Просмотр почерка — Голос в почерк", description: "Выберите бумагу, почерк, размер и чернила, затем скачайте PNG одной страницы или PDF всех страниц." },
      faq: { title: "Вопросы — Голос в почерк", description: "Как работает голос в почерк: запись, загрузка, телефон, бумага и скачивание PNG или PDF." },
      privacy: { title: "Конфиденциальность — Голос в почерк", description: "Как сайт обращается с записями, текстом и файлами." },
      contact: { title: "Контакты — Голос в почерк", description: "Напишите о расшифровке, скачивании или стилях почерка." },
    },
    { voice: "Голос", text: "Текст", handwriting: "Почерк", faq: "Вопросы", privacy: "Конфиденциальность", contact: "Контакты", language: "Язык" },
    {
      kicker: "Шаг 1 из 3", h1: "Добавьте голос.", lede: "Запишите на этой странице или загрузите аудиофайл. На следующей появятся слова.",
      hold: "Удерживайте для записи", listening: "Слушаю… отпустите для расшифровки", transcribing: "Расшифровка…", upload: "Загрузить аудио",
      micError: "Разрешите микрофон и попробуйте снова.", transcribeError: "Не удалось расшифровать это аудио.",
      features: [
        ["Запись или загрузка", "Удерживайте кнопку для записи или загрузите m4a, mp3, wav или webm. Телефон и компьютер используют один и тот же шаг."],
        ["Правка текста", "Слова попадают на свою страницу. Измените имя или фразу до того, как текст станет почерком."],
        ["Бумага, чернила и скачивание", "Выберите письмо, заметку, карточку или клетку, затем стиль, размер и чернила. PNG одной страницы или PDF всех страниц."],
      ],
    },
    { kicker: "Шаг 2 из 3", h1: "Проверьте слова.", lede: "Это расшифровка. Исправьте то, что запись поняла неверно. Страница почерка использует этот текст постранично.", placeholder: "Расшифровка появится здесь.", back: "Назад к голосу", next: "Сделать почерк" },
    {
      kicker: "Шаг 3 из 3", h1: "Выберите страницу и скачайте.", lede: "Длинный текст делится на страницы. PNG сохраняет текущую страницу. PDF сохраняет каждую.",
      emptyBefore: "Текста пока нет.", emptyLink: "Сначала добавьте слова.", previous: "Назад", nextPage: "Дальше", page: "Страница {current} из {total}", edit: "Править текст", png: "Скачать PNG", pdf: "Скачать PDF", alt: "Страница почерка {current}",
      letter: "Письмо", note: "Заметка", card: "Карточка", grid: "Клетка", casual: "Простой", cursive: "Пропись", messy: "Неровный", small: "Мелкий", medium: "Средний", large: "Крупный", blue: "Синий", black: "Чёрный", pencil: "Карандаш",
      drawError: "Не удалось нарисовать страницу.", pngError: "Не удалось экспортировать PNG.", pdfError: "Не удалось экспортировать PDF.",
    },
    {
      kicker: "Вопросы", h1: "Вопросы",
      items: [
        ["Что делает этот сайт?", "Вы записываете или загружаете речь, проверяете текст и превращаете эти точные слова в почерк для скачивания."],
        ["Нужен ли аккаунт?", "Нет. Записывайте, правьте и скачивайте без регистрации."],
        ["Работает ли на телефоне?", "Да. Chrome на Android расшифровывает в браузере. iPhone отправляет запись в службу расшифровки. Если она не настроена, введите слова на странице текста."],
        ["Какие аудиофайлы можно загрузить?", "m4a, mp3, wav и webm."],
        ["Почерк совпадает с тем, что я сказал?", "Да. Страница почерка использует сохранённый текст. Она не переписывает его в другое письмо."],
        ["Какие шаблоны и стили есть?", "Бумага: письмо, заметка, карточка и клетка. Почерк: простой, пропись и неровный. Размер мелкий, средний или крупный. Чернила синие, чёрные или карандаш."],
        ["Чем PNG отличается от PDF?", "PNG скачивает страницу, которую вы видите. PDF скачивает все страницы."],
        ["Можно ли напечатать?", "Да. Скачайте PDF или PNG и напечатайте."],
        ["На каком языке расшифровка?", "На английском."],
        ["Вы храните мою запись?", "Текст остаётся в этой вкладке. Запись отправляется только когда служба расшифровки включена, и мы не храним файл после возврата текста. Подробности на странице конфиденциальности."],
      ],
    },
    {
      kicker: "Конфиденциальность", h1: "Политика конфиденциальности", notice: notice.ru,
      blocks: [
        ["", "Дата вступления в силу: 24 сентября 2026. Политика относится к voicetohandwriting.online."],
        ["Что остаётся в браузере", "Текст сохраняется в этой вкладке, чтобы перейти со страницы текста на страницу почерка. Изображения рисуются на вашем устройстве. Закрытие вкладки удаляет текст."],
        ["Записи", "Если вы записываете или загружаете аудио, файл отправляется на наш сервер для расшифровки. Когда расшифровка включена, аудио передаётся в OpenRouter и не хранится у нас после возврата текста. В Chrome распознавание речи браузера тоже может отправить аудио его разработчику. Мы не продаём записи."],
        ["Чего мы не собираем", "Аккаунта нет. Мы не просим имя или почту для использования инструмента. Если вы напишете, сообщение нужно только для ответа."],
        ["Дети", "Сайт не предназначен для детей младше 13 лет, и мы сознательно не собираем их данные."],
        ["Контакт", "Вопросы об этой политике: hello@voicetohandwriting.online."],
      ],
    },
    { kicker: "Контакты", h1: "Напишите нам", body: "Письмо на hello@voicetohandwriting.online. Мы читаем сообщения о расшифровке, скачивании и стилях почерка.", beforeFaq: "Укажите браузер и шаг. Частые вопросы — в разделе ", faq: "вопросов", afterFaq: "." },
  ),
  ur: fill(
    "اردو",
    {
      home: { title: "آواز سے لکھائی — بول کو چھپنے کے قابل ہاتھ کی لکھائی بنائیں", description: "بول کو ہاتھ کی لکھائی میں بدلیں۔ ریکارڈ کریں یا آڈیو اپ لوڈ کریں، متن درست کریں، پھر PNG یا کئی صفحات کی PDF ڈاؤن لوڈ کریں۔" },
      text: { title: "متن میں ترمیم — آواز سے لکھائی", description: "ہاتھ سے لکھے جانے سے پہلے ریکارڈنگ کے الفاظ دیکھیں اور درست کریں۔" },
      handwriting: { title: "لکھائی کا پیش منظر — آواز سے لکھائی", description: "کاغذ، لکھائی، سائز اور روشنائی چنیں، پھر ایک صفحے کی PNG یا تمام صفحات کی PDF ڈاؤن لوڈ کریں۔" },
      faq: { title: "سوالات — آواز سے لکھائی", description: "آواز سے لکھائی کیسے کام کرتی ہے: ریکارڈنگ، اپ لوڈ، فون، کاغذ، اور PNG یا PDF۔" },
      privacy: { title: "رازداری — آواز سے لکھائی", description: "ریکارڈنگ، متن اور ڈاؤن لوڈ کیسے سنبھالے جاتے ہیں۔" },
      contact: { title: "رابطہ — آواز سے لکھائی", description: "نقل، ڈاؤن لوڈ یا لکھائی کے انداز کے بارے میں ای میل کریں۔" },
    },
    { voice: "آواز", text: "متن", handwriting: "لکھائی", faq: "سوالات", privacy: "رازداری", contact: "رابطہ", language: "زبان" },
    {
      kicker: "مرحلہ 1 از 3", h1: "اپنی آواز شامل کریں۔", lede: "اس صفحے پر ریکارڈ کریں، یا آڈیو فائل اپ لوڈ کریں۔ اگلا صفحہ الفاظ دکھائے گا۔",
      hold: "ریکارڈ کے لیے دبائے رکھیں", listening: "سن رہے ہیں… چھوڑتے ہی نقل", transcribing: "نقل ہو رہی ہے…", upload: "آڈیو اپ لوڈ",
      micError: "مائیکروفون کی اجازت دیں، پھر دوبارہ کوشش کریں۔", transcribeError: "اس آڈیو کی نقل نہیں بن سکی۔",
      features: [
        ["ریکارڈ یا اپ لوڈ", "بٹن دبا کر ریکارڈ کریں، یا m4a، mp3، wav، webm اپ لوڈ کریں۔ فون اور کمپیوٹر ایک ہی مرحلہ استعمال کرتے ہیں۔"],
        ["متن درست کریں", "الفاظ اپنے صفحے پر آتے ہیں۔ ہاتھ سے لکھنے سے پہلے نام یا جملہ بدلیں۔"],
        ["کاغذ، روشنائی، ڈاؤن لوڈ", "خط، نوٹ، کارڈ یا گرڈ چنیں، پھر انداز، سائز اور روشنائی۔ ایک صفحہ PNG، تمام صفحات PDF۔"],
      ],
    },
    { kicker: "مرحلہ 2 از 3", h1: "الفاظ چیک کریں۔", lede: "یہ نقل ہے۔ ریکارڈنگ کی غلطیاں درست کریں۔ لکھائی کا صفحہ یہی متن صفحہ بہ صفحہ استعمال کرتا ہے۔", placeholder: "نقل یہاں نظر آئے گی۔", back: "آواز پر واپس", next: "لکھائی بنائیں" },
    {
      kicker: "مرحلہ 3 از 3", h1: "ایک صفحہ چنیں، پھر ڈاؤن لوڈ کریں۔", lede: "لمبا متن کئی صفحات میں بٹ جاتا ہے۔ PNG موجودہ صفحہ محفوظ کرتا ہے۔ PDF ہر صفحہ محفوظ کرتی ہے۔",
      emptyBefore: "ابھی کوئی متن نہیں۔", emptyLink: "پہلے الفاظ شامل کریں۔", previous: "پچھلا", nextPage: "اگلا", page: "صفحہ {current} از {total}", edit: "متن میں ترمیم", png: "PNG ڈاؤن لوڈ", pdf: "PDF ڈاؤن لوڈ", alt: "لکھائی کا صفحہ {current}",
      letter: "خط", note: "نوٹ", card: "کارڈ", grid: "گرڈ", casual: "سادہ", cursive: "متصل", messy: "بے ترتیب", small: "چھوٹا", medium: "درمیانہ", large: "بڑا", blue: "نیلا", black: "کالا", pencil: "پنسل",
      drawError: "صفحہ نہیں بن سکا۔", pngError: "PNG نہیں بن سکی۔", pdfError: "PDF نہیں بن سکی۔",
    },
    {
      kicker: "سوالات", h1: "سوالات",
      items: [
        ["یہ سائٹ کیا کرتی ہے؟", "آپ بول ریکارڈ یا اپ لوڈ کرتے ہیں، متن چیک کرتے ہیں، پھر انہی الفاظ کو ڈاؤن لوڈ کے قابل لکھائی بناتے ہیں۔"],
        ["کیا اکاؤنٹ چاہیے؟", "نہیں۔ سائن اپ کے بغیر ریکارڈ، ترمیم اور ڈاؤن لوڈ کریں۔"],
        ["کیا فون پر چلتا ہے؟", "ہاں۔ Android پر Chrome براؤزر میں نقل کر سکتا ہے۔ iPhone ریکارڈنگ ایک سروس کو بھیجتا ہے۔ سروس نہ ہو تو متن کے صفحے پر خود لکھیں۔"],
        ["کون سی آڈیو فائلیں اپ لوڈ ہو سکتی ہیں؟", "m4a، mp3، wav، اور webm۔"],
        ["کیا لکھائی وہی ہے جو میں نے کہا؟", "ہاں۔ لکھائی کا صفحہ آپ کا محفوظ متن استعمال کرتا ہے۔ اسے کسی اور خط میں نہیں بدلتا۔"],
        ["کون سے سانچے اور انداز ہیں؟", "کاغذ: خط، نوٹ، کارڈ، گرڈ۔ لکھائی: سادہ، متصل، بے ترتیب۔ سائز چھوٹا، درمیانہ، بڑا۔ روشنائی نیلی، کالی، پنسل۔"],
        ["PNG اور PDF میں فرق؟", "PNG وہ صفحہ ڈاؤن لوڈ کرتا ہے جو آپ دیکھ رہے ہیں۔ PDF ہر صفحہ ڈاؤن لوڈ کرتی ہے۔"],
        ["کیا چھاپ سکتے ہیں؟", "ہاں۔ PDF یا PNG ڈاؤن لوڈ کر کے چھاپیں۔"],
        ["نقل کس زبان میں ہے؟", "انگریزی۔"],
        ["کیا آپ میری ریکارڈنگ رکھتے ہیں؟", "متن اسی براؤزر ٹیب میں رہتا ہے۔ ریکارڈنگ صرف تب بھیجی جاتی ہے جب نقل کی سروس چالو ہو، اور متن واپس آنے کے بعد فائل نہیں رکھی جاتی۔ تفصیل رازداری کے صفحے پر ہے۔"],
      ],
    },
    {
      kicker: "رازداری", h1: "رازداری کی پالیسی", notice: notice.ur,
      blocks: [
        ["", "مؤثر تاریخ: 24 ستمبر 2026۔ یہ پالیسی voicetohandwriting.online پر لاگو ہے۔"],
        ["براؤزر میں کیا رہتا ہے", "متن اس ٹیب میں محفوظ ہوتا ہے تاکہ آپ متن کے صفحے سے لکھائی کے صفحے تک جا سکیں۔ تصویریں آپ کے آلے پر بنتی ہیں۔ ٹیب بند کرنے سے متن مٹ جاتا ہے۔"],
        ["ریکارڈنگز", "ریکارڈ یا اپ لوڈ کرنے پر فائل نقل کے لیے ہمارے سرور کو جاتی ہے۔ سروس چالو ہو تو آڈیو OpenRouter کو بھیجا جاتا ہے اور متن واپس آنے کے بعد ہم اسے نہیں رکھتے۔ Chrome پر براؤزر کی اپنی شناخت آڈیو براؤزر بنانے والے کو بھیج سکتی ہے۔ ہم ریکارڈنگ نہیں بیچتے۔"],
        ["ہم کیا نہیں لیتے", "کوئی اکاؤنٹ نہیں۔ آلہ استعمال کرنے کے لیے نام یا ای میل نہیں مانگا جاتا۔ اگر آپ ای میل کریں تو پیغام صرف جواب کے لیے استعمال ہوگا۔"],
        ["بچے", "سائٹ 13 سال سے کم عمر کے بچوں کے لیے نہیں، اور ہم جان بوجھ کر ان کی معلومات نہیں لیتے۔"],
        ["رابطہ", "اس پالیسی کے بارے میں سوال: hello@voicetohandwriting.online۔"],
      ],
    },
    { kicker: "رابطہ", h1: "ہمیں لکھیں", body: "hello@voicetohandwriting.online پر ای میل کریں۔ ہم نقل، ڈاؤن لوڈ اور لکھائی کے انداز کے پیغام پڑھتے ہیں۔", beforeFaq: "اپنا براؤزر اور مرحلہ لکھیں۔ عام سوالوں کے لیے ", faq: "سوالات", afterFaq: " دیکھیں۔" },
  ),
} satisfies Record<LocaleId, Copy>;
