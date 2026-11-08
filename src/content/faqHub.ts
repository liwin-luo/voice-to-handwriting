import type { FaqItem } from "@/content/faqs";

/** /faq 目录。问法与首页 FAQ_ITEMS 不重复;完整答案在链接指向的工具页。 */
export const FAQ_HUB: FaqItem[] = [
  {
    id: "hub-name",
    i18n: { en: {
        q: "Where do I print a dotted name tracing sheet?",
        a: "The name tracing page makes a dashed outline of the name you type. It is not numbered stroke arrows.",
        link: { href: "/name-tracing", label: "Name tracing worksheets" },
      } },
  },
  {
    id: "hub-paper",
    i18n: { en: {
        q: "Where do I print college ruled or wide ruled paper?",
        a: "College ruled is 7.1 mm between lines. Wide ruled is 8.7 mm. Kindergarten paper is a separate three-line sheet. The full comparison is on the lined paper page.",
        link: { href: "/printable-paper", label: "Printable lined paper" },
      } },
  },
  {
    id: "hub-font",
    i18n: { en: {
        q: "Where do I preview a real cursive font?",
        a: "The cursive font page renders real typefaces in the browser and exports PNG or PDF. You do not install them to preview. Pasteable Unicode cursive is a different tool.",
        link: { href: "/cursive-font-generator", label: "Cursive font generator" },
      } },
  },
  {
    id: "hub-text",
    i18n: { en: {
        q: "Where do I copy cursive text to paste?",
        a: "The cursive text generator swaps letters for Unicode symbols you can paste into a bio or chat. It is not a font, and some phones show boxes. For a printable page, use the font generator.",
        link: { href: "/cursive-text-generator", label: "Cursive text generator" },
      } },
  },
  {
    id: "hub-quiz",
    i18n: { en: {
        q: "Where is the handwriting personality quiz?",
        a: "The quiz is for fun. You pick sample styles; it does not read a photo of your handwriting, and it does not treat graphology as science.",
        link: { href: "/handwriting-personality-quiz", label: "Handwriting personality quiz" },
      } },
  },
  {
    id: "hub-mail",
    i18n: { en: {
        q: "Will the site mail a handwritten letter?",
        a: "No. The letter page makes PDFs of the notes and the envelopes. You print them and mail them yourself. The writing is a font, not ink from a pen.",
        link: { href: "/printable-handwritten-letters", label: "Printable handwritten letters" },
      } },
  },
  {
    id: "hub-voice",
    i18n: { en: {
        q: "Where do I turn speech into handwriting?",
        a: "The homepage does that: speak or type, then export PNG or PDF. Microphone troubleshooting and audio-file formats are answered there, not on this index.",
        link: { href: "/", label: "Voice to handwriting" },
      } },
  },
];
