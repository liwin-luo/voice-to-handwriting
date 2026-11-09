import type { FaqItem } from "@/content/faqs";

/** /faq 目录。问法与首页 FAQ_ITEMS 不重复;完整答案在链接指向的工具页。 */
export const FAQ_HUB: FaqItem[] = [
  {
    id: "hub-name",
    i18n: { en: {
        q: "Where do I print a dotted name tracing sheet?",
        a: "The name tracing page makes a dashed outline of the name you type. It is not numbered stroke arrows.",
        link: { href: "/name-tracing", label: "Name tracing worksheets" },
      }, zh: {
        q: "虚线姓名描红在哪里打印?",
        a: "姓名描红页按你输入的名字生成整字虚线轮廓。不是编号笔顺箭头。",
        link: { href: "/name-tracing", label: "姓名描红" },
      } },
  },
  {
    id: "hub-paper",
    i18n: { en: {
        q: "Where do I print college ruled or wide ruled paper?",
        a: "College ruled is 7.1 mm between lines. Wide ruled is 8.7 mm. Kindergarten paper is a separate three-line sheet. The full comparison is on the lined paper page.",
        link: { href: "/printable-paper", label: "Printable lined paper" },
      }, zh: {
        q: "窄行或宽行横线纸在哪里打印?",
        a: "窄行行距 7.1 毫米,宽行 8.7 毫米。幼儿园三线格是另一张纸。完整对比在横线纸页面。",
        link: { href: "/printable-paper", label: "可打印横线纸" },
      } },
  },
  {
    id: "hub-font",
    i18n: { en: {
        q: "Where do I preview a real cursive font?",
        a: "The cursive font page renders real typefaces in the browser and exports PNG or PDF. You do not install them to preview. Pasteable Unicode cursive is a different tool.",
        link: { href: "/cursive-font-generator", label: "Cursive font generator" },
      }, zh: {
        q: "真正的花体字体在哪里预览?",
        a: "花体字体页在浏览器里渲染真正的字体,并导出 PNG 或 PDF。预览不需要安装。可粘贴的 Unicode 花体是另一个工具。",
        link: { href: "/cursive-font-generator", label: "花体字体生成器" },
      } },
  },
  {
    id: "hub-text",
    i18n: { en: {
        q: "Where do I copy cursive text to paste?",
        a: "The cursive text generator swaps letters for Unicode symbols you can paste into a bio or chat. It is not a font, and some phones show boxes. For a printable page, use the font generator.",
        link: { href: "/cursive-text-generator", label: "Cursive text generator" },
      }, zh: {
        q: "可复制粘贴的花体文字在哪里?",
        a: "花体文字生成器把字母换成 Unicode 符号,可以贴进简介或聊天。它不是字体,有的手机会显示方框。要可打印的页面,用字体生成器。",
        link: { href: "/cursive-text-generator", label: "花体文字生成器" },
      } },
  },
  {
    id: "hub-quiz",
    i18n: { en: {
        q: "Where is the handwriting personality quiz?",
        a: "The quiz is for fun. You pick sample styles; it does not read a photo of your handwriting, and it does not treat graphology as science.",
        link: { href: "/handwriting-personality-quiz", label: "Handwriting personality quiz" },
      }, zh: {
        q: "笔迹性格测验在哪里?",
        a: "测验供娱乐。你挑选样张风格,它不读取笔迹照片,也不把笔迹学当成科学。",
        link: { href: "/handwriting-personality-quiz", label: "笔迹性格测验" },
      } },
  },
  {
    id: "hub-mail",
    i18n: { en: {
        q: "Will the site mail a handwritten letter?",
        a: "No. The letter page makes PDFs of the notes and the envelopes. You print them and mail them yourself. The writing is a font, not ink from a pen.",
        link: { href: "/printable-handwritten-letters", label: "Printable handwritten letters" },
      }, zh: {
        q: "网站会寄出手写信吗?",
        a: "不会。信件页生成信件和信封的 PDF。打印和寄出由你自己完成。字是字体,不是钢笔墨水。",
        link: { href: "/printable-handwritten-letters", label: "可打印的手写信" },
      } },
  },
  {
    id: "hub-voice",
    i18n: { en: {
        q: "Where do I turn speech into handwriting?",
        a: "The homepage does that: speak or type, then export PNG or PDF. Microphone troubleshooting and audio-file formats are answered there, not on this index.",
        link: { href: "/", label: "Voice to handwriting" },
      }, zh: {
        q: "语音转手写在哪里?",
        a: "在首页:说话或打字,再导出 PNG 或 PDF。麦克风排错和音频格式的答案在首页,不在这个目录。",
        link: { href: "/", label: "语音转手写" },
      } },
  },
];
