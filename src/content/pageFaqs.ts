import type { FaqEntry, FaqItem } from "@/content/faqs";
import type { Locale } from "@/i18n/routing";

/** /cursive-worksheets。免费题放最后，第一条留给「怎么做一张练习纸」。 */
export const CURSIVE_WORKSHEET_FAQS: FaqItem[] = [
  {
    id: "cw-list",
    i18n: {
      en: {
        q: "How do I make a cursive worksheet from my own words?",
        a: "Paste one word or sentence per line. Those lines repeat down a three-line sheet. The page opens on the large row height. Download the PDF, or a PNG of the page on screen. Nothing you type is uploaded.",
      },
      zh: {
        q: "怎样用自己的词生成一张连笔字描红纸?",
        a: "一词或一句占一行。这些行会在三线格上往下重复。页面默认是大行高。可以下载 PDF，或下载屏幕上这一页的 PNG。输入的文字不会上传。",
      },
      ja: {
        q: "自分の単語で筆記体ワークシートを作るには?",
        a: "単語か文を 1 行に 1 つ貼ります。その行が三本線の用紙に繰り返されます。最初は大きい行の高さです。PDF、または画面のページの PNG をダウンロードできます。入力した文字はアップロードされません。",
      },
      ko: {
        q: "내 단어로 필기체 워크시트를 만들려면?",
        a: "단어나 문장을 한 줄에 하나씩 붙여 넣으세요. 그 줄이 3선 노트에 반복됩니다. 처음에는 큰 줄 높이입니다. PDF나 화면에 보이는 페이지의 PNG를 받을 수 있습니다. 입력한 글은 업로드되지 않습니다.",
      },
      es: {
        q: "¿Cómo hago una ficha de cursiva con mis propias palabras?",
        a: "Pega una palabra o una frase por línea. Esas líneas se repiten en un papel de tres líneas. La página abre con la altura de línea grande. Descarga el PDF, o un PNG de la página en pantalla. Lo que escribes no se sube.",
      },
      de: {
        q: "Wie mache ich ein Schreibschrift-Blatt aus meinen eigenen Wörtern?",
        a: "Ein Wort oder ein Satz pro Zeile. Diese Zeilen wiederholen sich auf einem Drei-Linien-Blatt. Die Seite startet mit der großen Zeilenhöhe. Lade das PDF oder ein PNG der Seite auf dem Bildschirm herunter. Eingegebener Text wird nicht hochgeladen.",
      },
      fr: {
        q: "Comment faire une fiche de cursive avec mes propres mots ?",
        a: "Collez un mot ou une phrase par ligne. Ces lignes se répètent sur une feuille à trois lignes. La page s'ouvre sur la grande hauteur de ligne. Téléchargez le PDF, ou un PNG de la page à l'écran. Ce que vous tapez n'est pas envoyé.",
      },
      pt: {
        q: "Como faço uma ficha de cursiva com as minhas palavras?",
        a: "Cole uma palavra ou uma frase por linha. Essas linhas se repetem numa folha de três linhas. A página abre na altura de linha grande. Baixe o PDF, ou um PNG da página na tela. O que você digita não é enviado.",
      },
    },
  },
  {
    id: "cw-guides",
    i18n: {
      en: {
        q: "What do the green dot and red arrow show?",
        a: "Where the pencil lands, and the direction of the first stroke. They are on by default for Sacramento, the font this page opens with, and for Cedarville Cursive. They are the start of the letter, not a numbered stroke diagram. Blank tracing rows hide them.",
      },
      zh: {
        q: "绿点和红箭头表示什么?",
        a: "铅笔落下的位置，以及第一笔的方向。本页默认字体 Sacramento 和 Cedarville Cursive 都会显示，并且默认打开。它们只标出这一笔的起点，不是带编号的完整笔顺图。空白描红行不画它们。",
      },
      ja: {
        q: "緑の点と赤い矢印は何を示しますか?",
        a: "鉛筆を置く位置と、最初の一画の方向です。このページの初期フォント Sacramento と Cedarville Cursive では最初から表示されます。文字の書き始めであって、番号付きの完全な筆順図ではありません。空白のなぞり行では出ません。",
      },
      ko: {
        q: "초록 점과 빨간 화살표는 무엇을 나타내나요?",
        a: "연필을 대는 위치와 첫 획의 방향입니다. 이 페이지의 기본 글꼴인 Sacramento와 Cedarville Cursive에서 처음부터 켜져 있습니다. 글자의 시작이지, 번호가 붙은 전체 획순 그림은 아닙니다. 빈 따라쓰기 줄에는 나오지 않습니다.",
      },
      es: {
        q: "¿Qué muestran el punto verde y la flecha roja?",
        a: "Dónde se apoya el lápiz y la dirección del primer trazo. Están activos al abrir la página con Sacramento, la fuente inicial, y también con Cedarville Cursive. Marcan el inicio de la letra, no un diagrama numerado de todos los trazos. Las filas en blanco los ocultan.",
      },
      de: {
        q: "Was zeigen der grüne Punkt und der rote Pfeil?",
        a: "Wo der Stift ansetzt und in welche Richtung der erste Strich geht. Sie sind beim Öffnen an, für Sacramento, die Startschrift, und für Cedarville Cursive. Sie markieren den Anfang des Buchstabens, kein nummeriertes Strichfolge-Diagramm. Leere Nachspur-Zeilen blenden sie aus.",
      },
      fr: {
        q: "Que montrent le point vert et la flèche rouge ?",
        a: "Où poser le crayon, et la direction du premier trait. Ils sont actifs à l'ouverture pour Sacramento, la police de départ, et pour Cedarville Cursive. Ils marquent le début de la lettre, pas un schéma numéroté de tous les traits. Les lignes vierges les masquent.",
      },
      pt: {
        q: "O que mostram o ponto verde e a seta vermelha?",
        a: "Onde o lápis encosta e a direção do primeiro traço. Eles começam ligados em Sacramento, a fonte inicial desta página, e em Cedarville Cursive. Marcam o começo da letra, não um diagrama numerado de todos os traços. As linhas em branco os escondem.",
      },
    },
  },
  {
    id: "cw-free",
    i18n: {
      en: {
        q: "Is the cursive worksheet generator free?",
        a: "Yes. No signup. The PDF and PNG from this page do not add a site watermark.",
      },
      zh: {
        q: "这个连笔字描红生成器免费吗?",
        a: "免费，无需注册。这一页下载的 PDF 和 PNG 不加站点水印。",
      },
      ja: {
        q: "この筆記体ワークシートは無料ですか?",
        a: "無料で、登録は不要です。このページの PDF と PNG にサイトの透かしは入りません。",
      },
      ko: {
        q: "이 필기체 워크시트 생성기는 무료인가요?",
        a: "무료이고 가입은 필요 없습니다. 이 페이지의 PDF와 PNG에는 사이트 워터마크가 들어가지 않습니다.",
      },
      es: {
        q: "¿El generador de fichas de cursiva es gratis?",
        a: "Sí. Sin registro. El PDF y el PNG de esta página no llevan la marca de agua del sitio.",
      },
      de: {
        q: "Ist der Schreibschrift-Arbeitsblatt-Generator kostenlos?",
        a: "Ja. Ohne Anmeldung. PDF und PNG von dieser Seite bekommen kein Seiten-Wasserzeichen.",
      },
      fr: {
        q: "Le générateur de fiches de cursive est-il gratuit ?",
        a: "Oui. Sans inscription. Le PDF et le PNG de cette page n'ajoutent pas le filigrane du site.",
      },
      pt: {
        q: "O gerador de fichas de cursiva é grátis?",
        a: "Sim. Sem cadastro. O PDF e o PNG desta página não levam a marca d'água do site.",
      },
    },
  },
];

/** /templates 索引。详情页用 templateDetailFaqs，问法不跟这里重复。 */
export const TEMPLATE_FAQS: FaqItem[] = [
  {
    id: "tpl-what",
    i18n: {
      en: {
        q: "What is in a handwriting template?",
        a: "A finished message, plus a font, paper, and ink already chosen. Open a card and the editor loads that sample. You can change the words, the font, the paper, and the ink before you export a PNG or PDF.",
      },
      zh: {
        q: "一份手写模板里有什么?",
        a: "一段写好的文字，以及已经配好的字体、纸张和墨色。打开一张卡片，编辑器会载入这篇范文。导出 PNG 或 PDF 之前，文字、字体、纸张和墨色都可以改。",
      },
      ja: {
        q: "手書きテンプレートには何が入っていますか?",
        a: "書き終えた文面と、すでに選んであるフォント、用紙、インクです。カードを開くとエディタがその文例を読み込みます。PNG や PDF にする前に、文面、フォント、用紙、インクを変えられます。",
      },
      ko: {
        q: "손글씨 템플릿에는 무엇이 들어 있나요?",
        a: "다 쓴 문장과, 이미 고른 글꼴, 종이, 잉크입니다. 카드를 열면 편집기가 그 예문을 불러옵니다. PNG나 PDF로 내보내기 전에 문장, 글꼴, 종이, 잉크를 바꿀 수 있습니다.",
      },
      es: {
        q: "¿Qué incluye una plantilla de escritura a mano?",
        a: "Un mensaje ya escrito, más una fuente, un papel y una tinta elegidos. Al abrir una ficha, el editor carga ese texto. Puedes cambiar las palabras, la fuente, el papel y la tinta antes de exportar un PNG o un PDF.",
      },
      de: {
        q: "Was steckt in einer Handschrift-Vorlage?",
        a: "Ein fertiger Text, plus eine schon gewählte Schrift, ein Papier und eine Tinte. Öffnest du eine Karte, lädt der Editor dieses Beispiel. Wörter, Schrift, Papier und Tinte kannst du ändern, bevor du ein PNG oder PDF exportierst.",
      },
      fr: {
        q: "Que contient un modèle d'écriture manuscrite ?",
        a: "Un message déjà écrit, plus une police, un papier et une encre déjà choisis. Ouvrir une fiche charge cet exemple dans l'éditeur. Vous pouvez changer les mots, la police, le papier et l'encre avant d'exporter un PNG ou un PDF.",
      },
      pt: {
        q: "O que tem num modelo de escrita à mão?",
        a: "Uma mensagem pronta, mais uma fonte, um papel e uma tinta já escolhidos. Abrir um cartão carrega esse texto no editor. Dá para mudar as palavras, a fonte, o papel e a tinta antes de exportar um PNG ou um PDF.",
      },
    },
  },
  {
    id: "tpl-edit",
    i18n: {
      en: {
        q: "Can I change the words in a template?",
        a: "Yes. The sample is a starting point. After you open it, every line in the editor can be rewritten. The text stays in your browser.",
      },
      zh: {
        q: "模板里的文字可以改吗?",
        a: "可以。范文只是起点。打开之后，编辑器里的每一行都能改。文字留在你的浏览器里。",
      },
      ja: {
        q: "テンプレートの文面は変えられますか?",
        a: "変えられます。文例は出発点です。開いたあと、エディタの各行を書き換えられます。テキストはブラウザの中に残ります。",
      },
      ko: {
        q: "템플릿의 문장을 바꿀 수 있나요?",
        a: "바꿀 수 있습니다. 예문은 시작점입니다. 연 뒤에 편집기의 각 줄을 다시 쓸 수 있습니다. 텍스트는 브라우저 안에 남습니다.",
      },
      es: {
        q: "¿Puedo cambiar las palabras de una plantilla?",
        a: "Sí. El texto es un punto de partida. Después de abrirlo, cada línea del editor se puede reescribir. El texto se queda en tu navegador.",
      },
      de: {
        q: "Kann ich die Wörter in einer Vorlage ändern?",
        a: "Ja. Das Beispiel ist ein Anfang. Nach dem Öffnen lässt sich jede Zeile im Editor umschreiben. Der Text bleibt in deinem Browser.",
      },
      fr: {
        q: "Puis-je modifier les mots d'un modèle ?",
        a: "Oui. L'exemple est un point de départ. Une fois ouvert, chaque ligne de l'éditeur peut être réécrite. Le texte reste dans votre navigateur.",
      },
      pt: {
        q: "Posso mudar as palavras de um modelo?",
        a: "Sim. O texto é um ponto de partida. Depois de abrir, cada linha do editor pode ser reescrita. O texto fica no seu navegador.",
      },
    },
  },
  {
    id: "tpl-blank",
    i18n: {
      en: {
        q: "Can I start from a blank page instead?",
        a: "Yes. The handwriting tool opens empty. Templates are only for when you want a sample message and a style already paired.",
        link: { href: "/", label: "Handwriting tool" },
      },
      zh: {
        q: "可以从空白页开始写吗?",
        a: "可以。手写工具打开时是空的。模板只是在你想要一篇现成文字和配套样式时用。",
        link: { href: "/", label: "手写工具" },
      },
      ja: {
        q: "空白のページから始められますか?",
        a: "始められます。手書きツールは空の状態で開きます。テンプレートは、文例とスタイルがすでに組んである方がいいときに使います。",
        link: { href: "/", label: "手書きツール" },
      },
      ko: {
        q: "빈 페이지에서 시작할 수 있나요?",
        a: "가능합니다. 손글씨 도구는 빈 상태로 열립니다. 템플릿은 예문과 스타일이 이미 맞춰져 있으면 좋을 때 씁니다.",
        link: { href: "/", label: "손글씨 도구" },
      },
      es: {
        q: "¿Puedo empezar desde una página en blanco?",
        a: "Sí. La herramienta de escritura se abre vacía. Las plantillas sirven cuando quieres un mensaje de ejemplo y un estilo ya combinados.",
        link: { href: "/", label: "Herramienta de escritura" },
      },
      de: {
        q: "Kann ich mit einer leeren Seite anfangen?",
        a: "Ja. Das Handschrift-Werkzeug öffnet sich leer. Vorlagen sind dafür da, wenn du einen Beispieltext und einen schon passenden Stil willst.",
        link: { href: "/", label: "Handschrift-Werkzeug" },
      },
      fr: {
        q: "Puis-je partir d'une page blanche ?",
        a: "Oui. L'outil d'écriture s'ouvre vide. Les modèles servent quand vous voulez un exemple et un style déjà associés.",
        link: { href: "/", label: "Outil d'écriture" },
      },
      pt: {
        q: "Posso começar de uma página em branco?",
        a: "Sim. A ferramenta de escrita abre vazia. Os modelos servem quando você quer um texto de exemplo e um estilo já combinados.",
        link: { href: "/", label: "Ferramenta de escrita" },
      },
    },
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

const DETAIL: Record<Locale, DetailCopy> = {
  en: {
    useQ: (title) => `How do I use “${title}”?`,
    useA: (description, useLabel) =>
      `${description} ${useLabel} opens this sample in the handwriting editor, with this template's font, paper, and ink already set.`,
    editQ: (title) => `Can I change the words in “${title}”?`,
    editA: (firstLine) =>
      `Yes. The sample starts with “${firstLine}”. Rewrite any line in the editor. The text stays in your browser and is not uploaded.`,
    printQ: (title) => `How do I print “${title}”?`,
    printA: (useLabel) =>
      `${useLabel} opens the handwriting tool with this message filled in. Export a PDF to print, or a PNG.`,
  },
  zh: {
    useQ: (title) => `「${title}」要怎么用?`,
    useA: (description, useLabel) =>
      `${description}点「${useLabel}」会在手写编辑器里打开这篇范文，字体、纸张和墨色已经按这个模板设好。`,
    editQ: (title) => `「${title}」里的字可以改吗?`,
    editA: (firstLine) =>
      `可以。范文从「${firstLine}」起头。编辑器里每一行都能改。文字留在浏览器里，不会上传。`,
    printQ: (title) => `「${title}」要怎么打印?`,
    printA: (useLabel) => `点「${useLabel}」会把手写工具打开，并填好这段文字。导出 PDF 再打印，或导出 PNG。`,
  },
  ja: {
    useQ: (title) => `「${title}」はどう使いますか?`,
    useA: (description, useLabel) =>
      `${description}「${useLabel}」を押すと、この文例が手書きエディタで開きます。フォント、用紙、インクはこのテンプレートのままです。`,
    editQ: (title) => `「${title}」の文面は変えられますか?`,
    editA: (firstLine) =>
      `変えられます。文例は「${firstLine}」から始まります。エディタの各行を書き換えられます。テキストはブラウザ内に残り、アップロードされません。`,
    printQ: (title) => `「${title}」を印刷するには?`,
    printA: (useLabel) =>
      `「${useLabel}」を押すと、この文面が入った状態で手書きツールが開きます。印刷するなら PDF、画像なら PNG を書き出します。`,
  },
  ko: {
    useQ: (title) => `「${title}」는 어떻게 쓰나요?`,
    useA: (description, useLabel) =>
      `${description} 「${useLabel}」를 누르면 이 예문이 손글씨 편집기에서 열립니다. 글꼴, 종이, 잉크는 이 템플릿대로 이미 정해져 있습니다.`,
    editQ: (title) => `「${title}」의 문장을 바꿀 수 있나요?`,
    editA: (firstLine) =>
      `바꿀 수 있습니다. 예문은 「${firstLine}」로 시작합니다. 편집기의 각 줄을 다시 쓸 수 있습니다. 텍스트는 브라우저에 남고 업로드되지 않습니다.`,
    printQ: (title) => `「${title}」를 인쇄하려면?`,
    printA: (useLabel) =>
      `「${useLabel}」를 누르면 이 문장이 채워진 채로 손글씨 도구가 열립니다. 인쇄는 PDF, 이미지는 PNG로 내보내세요.`,
  },
  es: {
    useQ: (title) => `¿Cómo uso «${title}»?`,
    useA: (description, useLabel) =>
      `${description} ${useLabel} abre este texto en el editor de escritura, con la fuente, el papel y la tinta de esta plantilla ya elegidos.`,
    editQ: (title) => `¿Puedo cambiar las palabras de «${title}»?`,
    editA: (firstLine) =>
      `Sí. El ejemplo empieza por «${firstLine}». Reescribe cualquier línea en el editor. El texto se queda en tu navegador y no se sube.`,
    printQ: (title) => `¿Cómo imprimo «${title}»?`,
    printA: (useLabel) =>
      `${useLabel} abre la herramienta de escritura con este mensaje ya escrito. Exporta un PDF para imprimir, o un PNG.`,
  },
  de: {
    useQ: (title) => `Wie benutze ich „${title}“?`,
    useA: (description, useLabel) =>
      `${description} ${useLabel} öffnet dieses Beispiel im Handschrift-Editor, mit Schrift, Papier und Tinte dieser Vorlage.`,
    editQ: (title) => `Kann ich die Wörter in „${title}“ ändern?`,
    editA: (firstLine) =>
      `Ja. Das Beispiel beginnt mit „${firstLine}“. Jede Zeile im Editor lässt sich umschreiben. Der Text bleibt im Browser und wird nicht hochgeladen.`,
    printQ: (title) => `Wie drucke ich „${title}“?`,
    printA: (useLabel) =>
      `${useLabel} öffnet das Handschrift-Werkzeug mit diesem Text. Exportiere ein PDF zum Drucken oder ein PNG.`,
  },
  fr: {
    useQ: (title) => `Comment utiliser « ${title} » ?`,
    useA: (description, useLabel) =>
      `${description} ${useLabel} ouvre cet exemple dans l'éditeur d'écriture, avec la police, le papier et l'encre de ce modèle déjà choisis.`,
    editQ: (title) => `Puis-je modifier les mots de « ${title} » ?`,
    editA: (firstLine) =>
      `Oui. L'exemple commence par « ${firstLine} ». Chaque ligne de l'éditeur peut être réécrite. Le texte reste dans votre navigateur et n'est pas envoyé.`,
    printQ: (title) => `Comment imprimer « ${title} » ?`,
    printA: (useLabel) =>
      `${useLabel} ouvre l'outil d'écriture avec ce message déjà saisi. Exportez un PDF pour l'imprimer, ou un PNG.`,
  },
  pt: {
    useQ: (title) => `Como uso “${title}”?`,
    useA: (description, useLabel) =>
      `${description} ${useLabel} abre este texto no editor de escrita, com a fonte, o papel e a tinta deste modelo já escolhidos.`,
    editQ: (title) => `Posso mudar as palavras de “${title}”?`,
    editA: (firstLine) =>
      `Sim. O exemplo começa com “${firstLine}”. Reescreva qualquer linha no editor. O texto fica no navegador e não é enviado.`,
    printQ: (title) => `Como imprimo “${title}”?`,
    printA: (useLabel) =>
      `${useLabel} abre a ferramenta de escrita com esta mensagem preenchida. Exporte um PDF para imprimir, ou um PNG.`,
  },
};

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
