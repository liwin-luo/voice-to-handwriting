import type { FaqEntry, FaqItem } from "@/content/faqs";
import type { Locale } from "@/i18n/routing";

/** /cursive-worksheets。免费题放最后，第一条留给「怎么做一张练习纸」。 */
export const CURSIVE_WORKSHEET_FAQS: FaqItem[] = [
  {
    id: "cw-list",
    i18n: { en: {
        q: "How do I make a cursive worksheet from my own words?",
        a: "Paste one word or sentence per line. Those lines repeat down a three-line sheet. The page opens on the large row height. Download the PDF, or a PNG of the page on screen. Nothing you type is uploaded.",
      }, zh: { q: "怎样用自己的词生成一张连笔字描红纸?", a: "一词或一句占一行。这些行会在三线格上往下重复。页面默认是大行高。可以下载 PDF，或下载屏幕上这一页的 PNG。输入的文字不会上传。" },
es: {
          q: "¿Cómo hago una ficha de cursiva con mis propias palabras?",
          a: "Pega una palabra o una frase por línea. Esas líneas se repiten en un papel de tres líneas. La página abre con la altura de línea grande. Descarga el PDF, o un PNG de la página en pantalla. Lo que escribes no se sube.",
        },
pt: {
          q: "Como faço uma ficha de cursiva com as minhas palavras?",
          a: "Cole uma palavra ou uma frase por linha. Essas linhas se repetem numa folha de três linhas. A página abre na altura de linha grande. Baixe o PDF, ou um PNG da página na tela. O que você digita não é enviado.",
        } },
  },
  {
    id: "cw-guides",
    i18n: { en: {
        q: "What do the green dot and red arrow show?",
        a: "Where the pencil lands, and the direction of the first stroke. They are on by default for Sacramento, the font this page opens with, and for Cedarville Cursive. They are the start of the letter, not a numbered stroke diagram. Blank tracing rows hide them.",
      }, zh: { q: "绿点和红箭头表示什么?", a: "铅笔落下的位置，以及第一笔的方向。本页默认字体 Sacramento 和 Cedarville Cursive 都会显示，并且默认打开。它们只标出这一笔的起点，不是带编号的完整笔顺图。空白描红行不画它们。" },
es: {
          q: "¿Qué muestran el punto verde y la flecha roja?",
          a: "Dónde se apoya el lápiz y la dirección del primer trazo. Están activos al abrir la página con Sacramento, la fuente inicial, y también con Cedarville Cursive. Marcan el inicio de la letra, no un diagrama numerado de todos los trazos. Las filas en blanco los ocultan.",
        },
pt: {
          q: "O que mostram o ponto verde e a seta vermelha?",
          a: "Onde o lápis encosta e a direção do primeiro traço. Eles começam ligados em Sacramento, a fonte inicial desta página, e em Cedarville Cursive. Marcam o começo da letra, não um diagrama numerado de todos os traços. As linhas em branco os escondem.",
        } },
  },
  {
    id: "cw-free",
    i18n: { en: {
        q: "Is the cursive worksheet generator free?",
        a: "Yes. No signup. The PDF and PNG from this page do not add a site watermark.",
      }, zh: { q: "这个连笔字描红生成器免费吗?", a: "免费，无需注册。这一页下载的 PDF 和 PNG 不加站点水印。" },
es: {
          q: "¿El generador de fichas de cursiva es gratis?",
          a: "Sí. Sin registro. El PDF y el PNG de esta página no llevan la marca de agua del sitio.",
        },
pt: {
          q: "O gerador de fichas de cursiva é grátis?",
          a: "Sim. Sem cadastro. O PDF e o PNG desta página não levam a marca d'água do site.",
        } },
  },
];

/** /handwriting-repeater(2026-11-18 翻案重建,裁定见 us-seo-content-plan §三十二) */
export const REPEATER_FAQS: FaqItem[] = [
  {
    id: "rep-how",
    i18n: { en: {
        q: "How does the handwriting repeater work?",
        a: "Type one word — or the alphabet — and the page repeats it across every line: a solid example row first, then dotted rows to trace on three-line practice paper. Download the PDF or a PNG. Nothing you type is uploaded.",
      }, zh: { q: "重复抄写字帖是怎么生成的?", a: "输入一个词或一段字母,整页每一行都重复这段文字:首行深色示例,其余是三线格上的虚线描红行。可下载 PDF 或 PNG。输入的内容不会上传。" },
      es: { q: "¿Cómo funciona el repetidor de escritura?", a: "Escribe una palabra — o el alfabeto — y la página la repite en todas las líneas: primero una fila sólida de ejemplo y luego filas punteadas para calcar en papel de tres líneas. Descarga el PDF o un PNG. Lo que escribes no se sube." },
      pt: { q: "Como funciona o repetidor de escrita?", a: "Digite uma palavra — ou o alfabeto — e a página repete o texto em todas as linhas: primeiro uma linha sólida de exemplo, depois linhas pontilhadas em papel de três linhas. Baixe o PDF ou um PNG. O que você digita não é enviado." } },
  },
  {
    id: "rep-teachers",
    i18n: { en: {
        q: "Is it useful for teachers and classrooms?",
        a: "Yes — it is built for that. Print one sheet with this week's spelling word, a name, or a letter run like a–z, and each student gets a full page of repetitions. Pair it with the free printable practice paper for independent writing.",
        link: { href: "/printable-paper", label: "Printable practice paper" },
      }, zh: { q: "老师和课堂能用吗?", a: "能,这个工具就是为这个场景做的。把本周拼写词、一个名字或整段字母表打印成一张纸,每个学生都拿到一整页重复练习。独立书写可以配合免费的可打印练习纸。", link: { href: "/printable-paper", label: "可打印练习纸" } },
      es: { q: "¿Sirve para docentes y el aula?", a: "Sí — está pensado para eso. Imprime una hoja con la palabra de la semana, un nombre o una serie como a–z, y cada estudiante recibe una página entera de repeticiones. Para escritura independiente, combínala con el papel de práctica imprimible.", link: { href: "/printable-paper", label: "Papel de práctica imprimible" } },
      pt: { q: "Serve para professores e sala de aula?", a: "Sim — foi feito para isso. Imprima uma folha com a palavra da semana, um nome ou uma sequência como a–z, e cada aluno recebe uma página inteira de repetições. Para escrita independente, combine com o papel de prática imprimível.", link: { href: "/printable-paper", label: "Papel de prática imprimível" } } },
  },
  {
    id: "rep-alphabet",
    i18n: { en: {
        q: "Can I repeat the whole alphabet?",
        a: "Yes. One-tap presets fill in a–z, A–Z or 0–9, so every letter gets repeated across the page. You can also type any custom letter run or word.",
      }, zh: { q: "能重复整段字母表吗?", a: "可以。页面自带 a–z、A–Z、0–9 三个一键预设,每个字母都会在整页里反复出现;也可以输入任意自定义的字母串或词语。" },
      es: { q: "¿Puedo repetir el alfabeto completo?", a: "Sí. Los presets rellenan a–z, A–Z o 0–9 con un toque, así cada letra se repite por toda la página. También puedes escribir cualquier serie de letras o palabra propia." },
      pt: { q: "Posso repetir o alfabeto inteiro?", a: "Sim. Os atalhos preenchem a–z, A–Z ou 0–9 com um toque, e cada letra se repete pela página. Você também pode digitar qualquer sequência de letras ou palavra." } },
  },
  {
    id: "rep-vs",
    i18n: { en: {
        q: "How is this different from the worksheet generator?",
        a: "The worksheet generator gives a different word or sentence per row — good for word lists. The repeater repeats the same text across each line, so one word fills the whole page — that is the muscle-memory style of practice.",
        link: { href: "/handwriting-worksheet-generator", label: "Handwriting worksheet generator" },
      }, zh: { q: "它和通用练习纸生成器有什么区别?", a: "通用练习纸生成器是每行一个不同的词或句子,适合整份词表;重复字帖则是同一段文字在每一行里反复出现,一个词占满一整页,是肌肉记忆式的练法。", link: { href: "/handwriting-worksheet-generator", label: "手写练习纸生成器" } },
      es: { q: "¿En qué se diferencia del generador de hojas de trabajo?", a: "El generador de hojas pone una palabra o frase distinta por fila — ideal para listas de palabras. El repetidor repite el mismo texto en cada línea, así una palabra llena la página entera: práctica de memoria motriz.", link: { href: "/handwriting-worksheet-generator", label: "Generador de hojas de trabajo" } },
      pt: { q: "Qual a diferença para o gerador de folhas de exercício?", a: "O gerador de folhas coloca uma palavra ou frase diferente por linha — ideal para listas de palavras. O repetidor repete o mesmo texto em cada linha, então uma palavra preenche a página inteira: prática de memória motora.", link: { href: "/handwriting-worksheet-generator", label: "Gerador de folhas de exercício" } } },
  },
  {
    id: "rep-free",
    i18n: { en: {
        q: "Is the handwriting repeater free?",
        a: "Yes. Unlimited sheets, no signup, and the PDF has no watermark. Everything renders in your browser.",
      }, zh: { q: "这个重复字帖生成器免费吗?", a: "免费。练习纸不限量、无需注册,PDF 不带水印。全部在浏览器里生成。" },
      es: { q: "¿El repetidor de escritura es gratis?", a: "Sí. Hojas ilimitadas, sin registro y el PDF sin marca de agua. Todo se genera en tu navegador." },
      pt: { q: "O repetidor de escrita é grátis?", a: "Sim. Folhas ilimitadas, sem cadastro e PDF sem marca d'água. Tudo é gerado no seu navegador." } },
  },
];

/** /templates 索引。详情页用 templateDetailFaqs，问法不跟这里重复。 */
export const TEMPLATE_FAQS: FaqItem[] = [
  {
    id: "tpl-what",
    i18n: { en: {
        q: "What is in a handwriting template?",
        a: "A finished message, plus a font, paper, and ink already chosen. Open a card and the editor loads that sample. You can change the words, the font, the paper, and the ink before you export a PNG or PDF.",
      }, zh: { q: "一份手写模板里有什么?", a: "一段写好的文字，以及已经配好的字体、纸张和墨色。打开一张卡片，编辑器会载入这篇范文。导出 PNG 或 PDF 之前，文字、字体、纸张和墨色都可以改。" },
es: {
          q: "¿Qué incluye una plantilla de escritura a mano?",
          a: "Un mensaje ya escrito, más una fuente, un papel y una tinta elegidos. Al abrir una ficha, el editor carga ese texto. Puedes cambiar las palabras, la fuente, el papel y la tinta antes de exportar un PNG o un PDF.",
        },
pt: {
          q: "O que tem num modelo de escrita à mão?",
          a: "Uma mensagem pronta, mais uma fonte, um papel e uma tinta já escolhidos. Abrir um cartão carrega esse texto no editor. Dá para mudar as palavras, a fonte, o papel e a tinta antes de exportar um PNG ou um PDF.",
        } },
  },
  {
    id: "tpl-edit",
    i18n: { en: {
        q: "Can I change the words in a template?",
        a: "Yes. The sample is a starting point. After you open it, every line in the editor can be rewritten. The text stays in your browser.",
      }, zh: { q: "模板里的文字可以改吗?", a: "可以。范文只是起点。打开之后，编辑器里的每一行都能改。文字留在你的浏览器里。" },
es: {
          q: "¿Puedo cambiar las palabras de una plantilla?",
          a: "Sí. El texto es un punto de partida. Después de abrirlo, cada línea del editor se puede reescribir. El texto se queda en tu navegador.",
        },
pt: {
          q: "Posso mudar as palavras de um modelo?",
          a: "Sim. O texto é um ponto de partida. Depois de abrir, cada linha do editor pode ser reescrita. O texto fica no seu navegador.",
        } },
  },
  {
    id: "tpl-blank",
    i18n: { en: {
        q: "Can I start from a blank page instead?",
        a: "Yes. The handwriting tool opens empty. Templates are only for when you want a sample message and a style already paired.",
        link: { href: "/", label: "Handwriting tool" },
      }, zh: { q: "可以从空白页开始写吗?", a: "可以。手写工具打开时是空的。模板只是在你想要一篇现成文字和配套样式时用。", link: { href: "/", label: "手写工具" } },
es: {
          q: "¿Puedo empezar desde una página en blanco?",
          a: "Sí. La herramienta de escritura se abre vacía. Las plantillas sirven cuando quieres un mensaje de ejemplo y un estilo ya combinados.",
          link: { href: "/", label: "Herramienta de escritura" },
        },
pt: {
          q: "Posso começar de uma página em branco?",
          a: "Sim. A ferramenta de escrita abre vazia. Os modelos servem quando você quer um texto de exemplo e um estilo já combinados.",
          link: { href: "/", label: "Ferramenta de escrita" },
        } },
  },
];

type DetailCopy = {
  useQ: (title: string) => string;
  useA: (description: string, useLabel: string) => string;
  editQ: (title: string) => string;
  editA: (firstLine: string) => string;
  printQ: (title: string) => string;
  printA: (useLabel: string) => string;
};

const DETAIL: Record<Locale, DetailCopy> = { en: {
    useQ: (title) => `How do I use “${title}”?`,
    useA: (description, useLabel) =>
      `${description} ${useLabel} opens this sample in the handwriting editor, with this template's font, paper, and ink already set.`,
    editQ: (title) => `Can I change the words in “${title}”?`,
    editA: (firstLine) =>
      `Yes. The sample starts with “${firstLine}”. Rewrite any line in the editor. The text stays in your browser and is not uploaded.`,
    printQ: (title) => `How do I print “${title}”?`,
    printA: (useLabel) =>
      `${useLabel} opens the handwriting tool with this message filled in. Export a PDF to print, or a PNG.`,
  }, zh: {
    useQ: (title) => `「${title}」要怎么用?`,
    useA: (description, useLabel) =>
      `${description}点「${useLabel}」会在手写编辑器里打开这篇范文，字体、纸张和墨色已经按这个模板设好。`,
    editQ: (title) => `「${title}」里的字可以改吗?`,
    editA: (firstLine) =>
      `可以。范文从「${firstLine}」起头。编辑器里每一行都能改。文字留在浏览器里，不会上传。`,
    printQ: (title) => `「${title}」要怎么打印?`,
    printA: (useLabel) => `点「${useLabel}」会把手写工具打开，并填好这段文字。导出 PDF 再打印，或导出 PNG。`,
  }, es: {
    useQ: (title) => `¿Cómo se usa "${title}"?`,
    useA: (description, useLabel) =>
      `${description} ${useLabel} abre este ejemplo en el editor de escritura, con la fuente, el papel y la tinta de esta plantilla ya configurados.`,
    editQ: (title) => `¿Puedo cambiar las palabras de "${title}"?`,
    editA: (firstLine) =>
      `Sí. El ejemplo empieza con "${firstLine}". Reescribe cualquier línea en el editor. El texto se queda en tu navegador y no se sube.`,
    printQ: (title) => `¿Cómo se imprime "${title}"?`,
    printA: (useLabel) =>
      `${useLabel} abre la herramienta de escritura con este mensaje ya escrito. Exporta un PDF para imprimir, o un PNG.`,
  }, pt: {
    useQ: (title) => `Como usar "${title}"?`,
    useA: (description, useLabel) =>
      `${description} ${useLabel} abre este exemplo no editor de escrita, com a fonte, o papel e a tinta deste modelo já configurados.`,
    editQ: (title) => `Posso mudar as palavras de "${title}"?`,
    editA: (firstLine) =>
      `Sim. O exemplo começa com "${firstLine}". Reescreva qualquer linha no editor. O texto fica no seu navegador e não é enviado.`,
    printQ: (title) => `Como imprimir "${title}"?`,
    printA: (useLabel) =>
      `${useLabel} abre a ferramenta de escrita com esta mensagem preenchida. Exporte um PDF para imprimir, ou um PNG.`,
  } };

/** 详情页 FAQ：题干和范文首行带上这一篇的标题，13 张模板不会输出同一组问答。 */
export function templateDetailFaqs(
  meta: { title: string; description: string; text: string },
  locale: Locale,
  useLabel: string,
): FaqEntry[] {
  const copy = DETAIL[locale];
  const firstLine = meta.text.split("\n").map((line) => line.trim()).find(Boolean) ?? meta.title;
  return [
    { q: copy.useQ(meta.title), a: copy.useA(meta.description, useLabel) },
    { q: copy.editQ(meta.title), a: copy.editA(firstLine) },
    { q: copy.printQ(meta.title), a: copy.printA(useLabel) },
  ];
}

/** /number-tracing。免费题放最后。 */
export const NUMBER_TRACING_FAQS: FaqItem[] = [
  {
    id: "num-page",
    i18n: { en: {
        q: "How do I print a number tracing worksheet for 1 to 10?",
        a: "The page opens on 1 through 10, one number per page, in Patrick Hand. The first row is solid. The rows under it are dotted. Switch to 1 through 20 when you need the teens. Download the PDF. Nothing you type is uploaded.",
        link: { href: "/blog/tracing-numbers-by-age", label: "Number tracing by age" },
      }, zh: { q: "怎样打印 1 到 10 的数字描红纸?", a: "页面打开就是 1 到 10,一个数字一页,字体是 Patrick Hand。第一行是实心,下面是虚线。需要十几的数字时,换成 1 到 20。下载 PDF。输入的文字不会上传。", link: { href: "/blog/tracing-numbers-by-age", label: "按年龄描数字" } },
es: {
          q: "¿Cómo imprimo una hoja para trazar los números del 1 al 10?",
          a: "La página abre en 1 a 10, un número por página, en Patrick Hand. La primera fila es continua. Las de abajo van punteadas. Cambia a 1 a 20 cuando necesites las decenas. Descarga el PDF. Lo que escribes no se sube.",
        },
pt: {
          q: "Como imprimo uma folha para traçar os números de 1 a 10?",
          a: "A página abre em 1 a 10, um número por página, em Patrick Hand. A primeira linha é cheia. As de baixo são pontilhadas. Mude para 1 a 20 quando precisar das dezenas. Baixe o PDF. O que você digita não é enviado.",
        } },
  },
  {
    id: "num-free",
    i18n: { en: {
        q: "Are number tracing worksheets free?",
        a: "Yes. No account and no watermark. The pages repeat a numeral. How many objects that numeral stands for stays a lesson at the table.",
      }, zh: { q: "数字描红纸免费吗?", a: "免费。不用账号,也没有水印。这些页重复一个数字。这个数字表示多少,留在桌上用实物讲。" },
    es: { q: "¿Las hojas para trazar números son gratis?", a: "Sí. Sin cuenta y sin marca de agua. Las páginas repiten un numeral. Cuántos objetos representa se queda como lección en la mesa." },
    pt: { q: "As folhas para traçar números são grátis?", a: "Sim. Sem conta e sem marca d'água. As páginas repetem um numeral. O valor que ele representa fica como lição na mesa." } },
  },
];

/** /handwriting-worksheet-generator。/letter-tracing 是 en-only,字体题只有英文带链接;免费题放最后。 */
export const HANDWRITING_WORKSHEET_FAQS: FaqItem[] = [
  {
    id: "worksheet-make",
    i18n: { en: {
        q: "How do I make my own handwriting worksheet?",
        a: "Type your words one per line — or one short sentence per line. The first pass through your list prints solid to copy, and the rows after it are dotted to trace. Pick a row height, download the PDF, and print at actual size. Nothing you type is uploaded.",
        link: { href: "/cursive-worksheets", label: "Same list in cursive" },
      }, zh: { q: "怎么做一张自己的手写练习纸?", a: "一行输入一个单词,或者一行一个短句。词表第一遍印成深色范字,后面的行都是浅色虚线描红。选好行高,下载 PDF,按实际尺寸打印。输入的内容不会上传。", link: { href: "/cursive-worksheets", label: "同一份词表的连笔版" } },
es: {
          q: "¿Cómo hago mi propia hoja de caligrafía?",
          a: "Escribe tus palabras una por línea — o una frase corta por línea. La primera pasada por tu lista se imprime en tinta sólida para copiar, y las filas siguientes salen punteadas para repasar. Elige la altura de fila, descarga el PDF e imprime a tamaño real. Lo que escribes no se sube.",
          link: { href: "/cursive-worksheets", label: "La misma lista en cursiva" },
        },
pt: {
          q: "Como faço minha própria ficha de caligrafia?",
          a: "Digite suas palavras uma por linha — ou uma frase curta por linha. A primeira passada pela lista sai em tinta cheia para copiar, e as linhas seguintes vêm pontilhadas para treinar. Escolha a altura da linha, baixe o PDF e imprima em tamanho real. O que você digita não é enviado.",
          link: { href: "/cursive-worksheets", label: "A mesma lista em cursiva" },
        } },
  },
  {
    id: "worksheet-font",
    i18n: { en: {
        q: "Which font do the worksheets use?",
        a: "Neat print defaults to Patrick Hand, an open-source handwriting font. It is close to classroom print, but not a school textbook font, so a few letterforms may differ from your curriculum. You can switch to any font in the list.",
        link: { href: "/name-tracing", label: "Letter-by-letter print practice" },
      }, zh: { q: "练习纸用的是什么字体?", a: "印刷体默认是 Patrick Hand,一款开源手写字体。它接近课堂印刷体,但不是教材规范体,个别字形会和课本略有差别。字体列表里的任何一款都可以换着用。" },
es: {
          q: "¿Qué fuente usan las hojas?",
          a: "La letra de imprenta usa por defecto Patrick Hand, una fuente manuscrita de código abierto. Se parece a la letra de imprenta de clase, pero no es una fuente de libro de texto: algunas formas de letra pueden diferir de tu método. Puedes cambiar a cualquier fuente de la lista.",
        },
pt: {
          q: "Que fonte as fichas usam?",
          a: "A letra de fôrma usa por padrão Patrick Hand, uma fonte manuscrita de código aberto. Ela se parece com a letra de fôrma da sala de aula, mas não é uma fonte de livro didático: algumas formas podem diferir do seu método. Você pode trocar para qualquer fonte da lista.",
        } },
  },
  {
    id: "worksheet-names",
    i18n: { en: {
        q: "Can I use it for names too?",
        a: "Yes — type one name per line. If you want each name on its own page with grade-sized rows, the name tracing generator does exactly that, with one dark example row per page.",
        link: { href: "/name-tracing", label: "Name tracing generator" },
      }, zh: { q: "也能用来练名字吗?", a: "可以——一行输入一个名字。想把每个名字单独放一页、按年级行高排,用姓名描红字帖生成器正合适,每页同样带一行深色范字。", link: { href: "/name-tracing", label: "姓名描红字帖生成器" } },
es: {
          q: "¿Sirve también para nombres?",
          a: "Sí — escribe un nombre por línea. Si quieres cada nombre en su propia página con filas de tamaño escolar, el generador de fichas para calcar el nombre hace exactamente eso, con una fila de ejemplo por página.",
          link: { href: "/name-tracing", label: "Generador de fichas para calcar el nombre" },
        },
pt: {
          q: "Serve para nomes também?",
          a: "Sim — um nome por linha. Se quiser cada nome em sua própria página com linhas de tamanho escolar, o gerador de fichas para calcar o nome faz exatamente isso, com uma linha de exemplo por página.",
          link: { href: "/name-tracing", label: "Gerador de fichas para calcar o nome" },
        } },
  },
  {
    id: "worksheet-free",
    i18n: { en: {
        q: "Is this handwriting worksheet generator free?",
        a: "Yes. No signup, no watermark on the PDF or PNG, and no usage limit — everything is generated in your browser.",
      }, zh: { q: "这个手写练习纸生成器免费吗?", a: "免费。无需注册,PDF 和 PNG 都没有水印,也没有次数限制——全部在你的浏览器里生成。" },
es: {
          q: "¿Este generador de hojas de caligrafía es gratis?",
          a: "Sí. Sin registro, sin marca de agua en el PDF ni en el PNG y sin límite de uso: todo se genera en tu navegador.",
        },
pt: {
          q: "Este gerador de fichas de caligrafia é grátis?",
          a: "Sim. Sem cadastro, sem marca d'água no PDF nem no PNG e sem limite de uso — tudo é gerado no seu navegador.",
        } },
  },
];
