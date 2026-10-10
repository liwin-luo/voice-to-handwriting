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

/** /signature-practice。第一题是怎么印这张纸,免费题放最后。 */
export const SIGNATURE_FAQS: FaqItem[] = [
  {
    id: "sig-make",
    i18n: {
      en: {
        q: "How do I make a signature practice sheet for my name?",
        a: "Type your name. If it has more than one word, pick the full name, the first name, or the first initial plus the last name. Choose one of the four scripts. The sheet prints that script as a solid line, a dotted line, and blank lines. Download the PDF. Nothing you type is uploaded.",
        link: { href: "/blog/how-to-practice-your-signature", label: "Seven-day practice" },
      },
      zh: {
        q: "怎样用自己的名字做一张签名练习纸?",
        a: "输入姓名。名字里有空格时,可以选全名、名,或名的首字母加姓。四种签名体里选一种。纸上先是实线,再是虚线,然后是空白行。下载 PDF。输入的文字不会上传。",
        link: { href: "/blog/how-to-practice-your-signature", label: "七天练习" },
      },
      ja: {
        q: "自分の名前で署名練習シートを作るには?",
        a: "名前を入力します。空白で区切られていれば、フルネーム、名、または名の頭文字と姓を選べます。4 種類の署名体から 1 つ。実線、点線、空白行の順です。PDF をダウンロードできます。入力した文字はアップロードされません。",
      },
      ko: {
        q: "내 이름으로 서명 연습지를 만들려면?",
        a: "이름을 입력하세요. 띄어쓰기가 있으면 전체 이름, 이름, 또는 이름 첫 글자와 성을 고릅니다. 서명체 네 가지 중 하나. 실선, 점선, 빈 줄 순서입니다. PDF를 받으세요. 입력한 글은 업로드되지 않습니다.",
      },
      es: {
        q: "¿Cómo hago una hoja de práctica de firma con mi nombre?",
        a: "Escribe tu nombre. Si tiene más de una palabra, elige el nombre completo, el nombre de pila o la inicial más el apellido. Elige uno de los cuatro trazos. La hoja imprime una línea continua, una de puntos y líneas en blanco. Descarga el PDF. Lo que escribes no se sube.",
      },
      de: {
        q: "Wie mache ich ein Unterschriften-Übungsblatt mit meinem Namen?",
        a: "Tippe deinen Namen. Bei mehreren Wörtern wählst du den ganzen Namen, den Vornamen oder den Anfangsbuchstaben plus Nachnamen. Eine von vier Schriften. Das Blatt zeigt eine durchgezogene Zeile, eine gepunktete und leere Zeilen. Lade das PDF. Eingegebener Text wird nicht hochgeladen.",
      },
      fr: {
        q: "Comment faire une feuille de signature avec mon nom ?",
        a: "Tapez votre nom. S'il contient plusieurs mots, choisissez le nom complet, le prénom, ou l'initiale plus le nom. Un des quatre tracés. La feuille imprime une ligne pleine, une ligne pointillée, puis des lignes vides. Téléchargez le PDF. Ce que vous tapez n'est pas envoyé.",
      },
      pt: {
        q: "Como faço uma folha de assinatura com o meu nome?",
        a: "Digite o nome. Se tiver mais de uma palavra, escolha o nome completo, o primeiro nome ou a inicial mais o sobrenome. Um dos quatro traços. A folha imprime uma linha cheia, uma pontilhada e linhas em branco. Baixe o PDF. O que você digita não é enviado.",
      },
    },
  },
  {
    id: "sig-short",
    i18n: {
      en: {
        q: "Why does the sheet offer a shorter signature?",
        a: "A signature has to survive a receipt line. The full name stays available. The first name, and the initial plus last name, are there so you can practice the version you can repeat quickly. The split is on spaces only. Names like de Luca stay as you typed them.",
        link: { href: "/blog/cursive-name-signature", label: "Design the signature first" },
      },
      zh: {
        q: "为什么可以练更短的签法?",
        a: "签名要能写进收据那一行。全名还在。名,以及名的首字母加姓,是给想练得又快又稳的人。只按空格拆开。de Luca 这类姓要自己输入,工具不会猜。",
        link: { href: "/blog/cursive-name-signature", label: "先把签名设计出来" },
      },
      ja: {
        q: "短い署名も出せるのはなぜ?",
        a: "署名はレシートの一行に収まる必要があります。フルネームも残しています。名、または頭文字と姓は、速く同じ形で書ける形を練習するためのものです。区切りは空白だけです。",
      },
      ko: {
        q: "더 짧은 서명을 고를 수 있는 이유는?",
        a: "서명은 영수증 한 줄에 들어가야 합니다. 전체 이름도 남습니다. 이름, 또는 첫 글자와 성은 빠르게 같은 모양으로 반복할 형태를 연습하라는 뜻입니다. 띄어쓰기로만 나눕니다.",
      },
      es: {
        q: "¿Por qué la hoja ofrece una firma más corta?",
        a: "Una firma tiene que caber en la línea de un recibo. El nombre completo sigue ahí. El nombre de pila, y la inicial más el apellido, sirven para practicar la versión que puedes repetir rápido. El corte es solo por espacios.",
      },
      de: {
        q: "Warum gibt es eine kürzere Unterschrift?",
        a: "Eine Unterschrift muss in eine Belegzeile passen. Der volle Name bleibt. Vorname und Anfangsbuchstabe plus Nachname sind die Form, die du schnell wiederholen kannst. Getrennt wird nur am Leerzeichen.",
      },
      fr: {
        q: "Pourquoi la feuille propose-t-elle une signature plus courte ?",
        a: "Une signature doit tenir sur la ligne d'un reçu. Le nom complet reste disponible. Le prénom, et l'initiale plus le nom, servent à répéter vite la même forme. La découpe se fait seulement sur les espaces.",
      },
      pt: {
        q: "Por que a folha oferece uma assinatura mais curta?",
        a: "Uma assinatura precisa caber na linha de um recibo. O nome completo continua lá. O primeiro nome, e a inicial mais o sobrenome, são a forma que dá para repetir rápido. O corte é só nos espaços.",
      },
    },
  },
  {
    id: "sig-free",
    i18n: {
      en: {
        q: "Is the signature practice sheet free?",
        a: "Yes. There is no account and no watermark. The scripts are Great Vibes, Alex Brush, Allura, and Mr Dafoe, under the SIL Open Font License. They are models to trace, not your handwriting, and not a signature you can paste onto a contract.",
        link: { href: "/cursive-font-generator", label: "Preview the scripts" },
      },
      zh: {
        q: "签名练习纸免费吗?",
        a: "免费。不用注册,没有水印。四种字体是 Great Vibes、Alex Brush、Allura、Mr Dafoe,采用 SIL 开源字体许可。它们是用来描的范字,不是你的笔迹,也不能贴进合同当作已签名。",
        link: { href: "/cursive-font-generator", label: "先看这几种字体" },
      },
      ja: {
        q: "署名練習シートは無料ですか?",
        a: "無料です。アカウントも透かしもありません。書体は Great Vibes、Alex Brush、Allura、Mr Dafoe で、SIL Open Font License です。なぞる見本であり、あなたの筆跡ではなく、契約書に貼る署名でもありません。",
      },
      ko: {
        q: "서명 연습지는 무료인가요?",
        a: "무료입니다. 계정과 워터마크가 없습니다. 서체는 Great Vibes, Alex Brush, Allura, Mr Dafoe이며 SIL Open Font License입니다. 따라 쓸 본보기이지, 내 필체도 아니고 계약서에 붙이는 서명도 아닙니다.",
      },
      es: {
        q: "¿La hoja de práctica de firma es gratis?",
        a: "Sí. No hay cuenta ni marca de agua. Los trazos son Great Vibes, Alex Brush, Allura y Mr Dafoe, con licencia SIL Open Font License. Son modelos para calcar, no tu letra, y no una firma para pegar en un contrato.",
      },
      de: {
        q: "Ist das Unterschriften-Übungsblatt kostenlos?",
        a: "Ja. Kein Konto, kein Wasserzeichen. Die Schriften sind Great Vibes, Alex Brush, Allura und Mr Dafoe unter der SIL Open Font License. Das sind Vorlagen zum Nachspuren, nicht deine Handschrift und keine Unterschrift für einen Vertrag.",
      },
      fr: {
        q: "La feuille de signature est-elle gratuite ?",
        a: "Oui. Pas de compte, pas de filigrane. Les tracés sont Great Vibes, Alex Brush, Allura et Mr Dafoe, sous licence SIL Open Font License. Ce sont des modèles à calquer, pas votre écriture, et pas une signature à coller sur un contrat.",
      },
      pt: {
        q: "A folha de assinatura é grátis?",
        a: "Sim. Sem conta e sem marca d'água. Os traços são Great Vibes, Alex Brush, Allura e Mr Dafoe, sob a SIL Open Font License. São modelos para calcar, não a sua letra, e não uma assinatura para colar num contrato.",
      },
    },
  },
];

/** /number-tracing。免费题放最后。 */
export const NUMBER_TRACING_FAQS: FaqItem[] = [
  {
    id: "num-page",
    i18n: {
      en: {
        q: "How do I print a number tracing worksheet for 1 to 10?",
        a: "The page opens on 1 through 10, one number per page, in Patrick Hand. The first row is solid. The rows under it are dotted. Switch to 1 through 20 when you need the teens. Download the PDF. Nothing you type is uploaded.",
        link: { href: "/blog/tracing-numbers-by-age", label: "Number tracing by age" },
      },
      zh: {
        q: "怎样打印 1 到 10 的数字描红纸?",
        a: "页面打开就是 1 到 10,一个数字一页,字体是 Patrick Hand。第一行是实心,下面是虚线。需要十几的数字时,换成 1 到 20。下载 PDF。输入的文字不会上传。",
        link: { href: "/blog/tracing-numbers-by-age", label: "按年龄描数字" },
      },
      ja: {
        q: "1 から 10 の数字なぞりを印刷するには?",
        a: "ページは 1 から 10、数字ごとに 1 ページ、フォントは Patrick Hand で開きます。最初の行は実線、その下は点線です。十の位が必要なら 1 から 20 に切り替えます。PDF をダウンロードできます。入力はアップロードされません。",
      },
      ko: {
        q: "1부터 10까지 숫자 따라 쓰기를 인쇄하려면?",
        a: "페이지는 1부터 10, 숫자마다 한 페이지, 글꼴은 Patrick Hand로 열립니다. 첫 줄은 실선이고 아래는 점선입니다. 십 자리가 필요하면 1부터 20으로 바꿉니다. PDF를 받으세요. 입력은 업로드되지 않습니다.",
      },
      es: {
        q: "¿Cómo imprimo una hoja para trazar los números del 1 al 10?",
        a: "La página abre en 1 a 10, un número por página, en Patrick Hand. La primera fila es continua. Las de abajo van punteadas. Cambia a 1 a 20 cuando necesites las decenas. Descarga el PDF. Lo que escribes no se sube.",
      },
      de: {
        q: "Wie drucke ich ein Zahlenblatt für 1 bis 10?",
        a: "Die Seite öffnet mit 1 bis 10, eine Zahl pro Seite, in Patrick Hand. Die erste Zeile ist durchgezogen. Darunter sind Punktlinien. Wechsle auf 1 bis 20, wenn du die Zehner brauchst. Lade das PDF. Eingegebener Text wird nicht hochgeladen.",
      },
      fr: {
        q: "Comment imprimer une fiche pour tracer les chiffres de 1 à 10 ?",
        a: "La page s'ouvre sur 1 à 10, un chiffre par page, en Patrick Hand. La première ligne est pleine. Celles d'en dessous sont en pointillés. Passez à 1 à 20 pour les dizaines. Téléchargez le PDF. Ce que vous tapez n'est pas envoyé.",
      },
      pt: {
        q: "Como imprimo uma folha para traçar os números de 1 a 10?",
        a: "A página abre em 1 a 10, um número por página, em Patrick Hand. A primeira linha é cheia. As de baixo são pontilhadas. Mude para 1 a 20 quando precisar das dezenas. Baixe o PDF. O que você digita não é enviado.",
      },
    },
  },
  {
    id: "num-free",
    i18n: {
      en: {
        q: "Are number tracing worksheets free?",
        a: "Yes. No account and no watermark. The pages repeat a numeral. How many objects that numeral stands for stays a lesson at the table.",
      },
      zh: {
        q: "数字描红纸免费吗?",
        a: "免费。不用账号,也没有水印。这些页重复一个数字。这个数字表示多少,留在桌上用实物讲。",
      },
      ja: { q: "数字なぞりシートは無料ですか?", a: "無料です。アカウントも透かしもありません。ページは数字の形を繰り返します。その数がいくつを表すかは、机の上の別の時間です。" },
      ko: { q: "숫자 따라 쓰기 연습지는 무료인가요?", a: "무료입니다. 계정과 워터마크가 없습니다. 페이지는 숫자 모양을 반복합니다. 그 수가 얼마인지는 책상 위의 다른 시간입니다." },
      es: { q: "¿Las hojas para trazar números son gratis?", a: "Sí. Sin cuenta y sin marca de agua. Las páginas repiten un numeral. Cuántos objetos representa se queda como lección en la mesa." },
      de: { q: "Sind die Zahlenblätter kostenlos?", a: "Ja. Kein Konto und kein Wasserzeichen. Die Seiten wiederholen eine Ziffer. Wofür die Zahl steht, bleibt eine Übung am Tisch." },
      fr: { q: "Les fiches pour tracer les chiffres sont-elles gratuites ?", a: "Oui. Pas de compte et pas de filigrane. Les pages répètent un chiffre. Ce qu'il représente reste une leçon à table." },
      pt: { q: "As folhas para traçar números são grátis?", a: "Sim. Sem conta e sem marca d'água. As páginas repetem um numeral. O valor que ele representa fica como lição na mesa." },
    },
  },
];

/** /prewriting-strokes。 */
export const PREWRITING_FAQS: FaqItem[] = [
  {
    id: "pre-which",
    i18n: {
      en: {
        q: "Which strokes are on the prewriting worksheet?",
        a: "Lines are down, across, and slant. Curves are a circle, a wave, and an arch. Each stroke has a solid row, a dotted row, and a blank row. Letters stay on the letter tracing pages.",
        link: { href: "/blog/strokes-before-letter-tracing", label: "Strokes before letters" },
      },
      zh: {
        q: "学前运笔纸上有哪些笔画?",
        a: "直线组是向下、横线、斜线。曲线组是圆、波浪、拱。每种笔画一行实线、一行虚线、一行空白。字母在字母描红页上。",
        link: { href: "/blog/strokes-before-letter-tracing", label: "字母之前的笔画" },
      },
      ja: { q: "運筆シートにはどの線がありますか?", a: "直線は下、横、斜めです。曲線は円、波、アーチです。各線に実線、点線、空白の 3 行があります。字母は字母のページにあります。" },
      ko: { q: "획 연습지에는 어떤 선이 있나요?", a: "직선은 아래, 가로, 빗금입니다. 곡선은 원, 물결, 아치입니다. 각 획에 실선, 점선, 빈 줄이 있습니다. 글자는 글자 페이지에 있습니다." },
      es: { q: "¿Qué trazos trae la hoja previa?", a: "Las líneas son hacia abajo, horizontal e inclinada. Las curvas son un círculo, una ola y un arco. Cada trazo tiene una fila continua, una punteada y una en blanco. Las letras están en las páginas de letras." },
      de: { q: "Welche Striche sind auf dem Blatt?", a: "Linien sind nach unten, quer und schräg. Bögen sind Kreis, Welle und Bogen. Jeder Strich hat eine durchgezogene Zeile, eine punktierte und eine leere. Buchstaben liegen auf den Buchstabenseiten." },
      fr: { q: "Quels tracés sont sur la fiche ?", a: "Les lignes vont vers le bas, à l'horizontale et en oblique. Les courbes sont un cercle, une vague et une arche. Chaque tracé a une ligne pleine, une en pointillés et une vide. Les lettres sont sur les pages de lettres." },
      pt: { q: "Quais traços estão na folha?", a: "As linhas são para baixo, horizontal e inclinada. As curvas são um círculo, uma onda e um arco. Cada traço tem uma linha cheia, uma pontilhada e uma em branco. As letras ficam nas páginas de letras." },
    },
  },
  {
    id: "pre-free",
    i18n: {
      en: { q: "Are prewriting stroke worksheets free?", a: "Yes. No account and no watermark. Print the lines before the curves if the child is still learning to aim the pencil." },
      zh: { q: "学前运笔纸免费吗?", a: "免费。不用账号,也没有水印。孩子还在学把笔对准时,先印直线,再印曲线。" },
      ja: { q: "運筆シートは無料ですか?", a: "無料です。アカウントも透かしもありません。鉛筆の狙いがまだなら、曲線の前に直線を印刷してください。" },
      ko: { q: "획 연습지는 무료인가요?", a: "무료입니다. 계정과 워터마크가 없습니다. 연필을 맞추는 중이라면 곡선보다 직선을 먼저 인쇄하세요." },
      es: { q: "¿La hoja de trazos previos es gratis?", a: "Sí. Sin cuenta y sin marca de agua. Imprime las líneas antes que las curvas si el niño todavía apunta el lápiz." },
      de: { q: "Ist das Strichblatt kostenlos?", a: "Ja. Kein Konto und kein Wasserzeichen. Drucke die Linien vor den Bögen, wenn das Kind den Stift noch zielt." },
      fr: { q: "La fiche de tracés est-elle gratuite ?", a: "Oui. Pas de compte et pas de filigrane. Imprimez les lignes avant les courbes si l'enfant vise encore le crayon." },
      pt: { q: "A folha de traços é grátis?", a: "Sim. Sem conta e sem marca d'água. Imprima as linhas antes das curvas se a criança ainda está a apontar o lápis." },
    },
  },
];

/** /cursive-letter-joins。 */
export const CURSIVE_JOIN_FAQS: FaqItem[] = [
  {
    id: "join-pair",
    i18n: {
      en: {
        q: "How do I practice a cursive letter join?",
        a: "The page opens on same-direction pairs: th, ch, sh, wh, oo, ee, ll, ss. Each pair is its own page in Sacramento. The other set turns in the middle: ai, ay, ou, ow, oa, ea, ir, er. Single letters stay on the cursive alphabet.",
        link: { href: "/blog/how-to-join-cursive-letters", label: "How two letters connect" },
      },
      zh: {
        q: "怎样练一组连笔字母?",
        a: "页面打开是同方向的一对:th、ch、sh、wh、oo、ee、ll、ss。每一对单独一页,字体是 Sacramento。另一组在中间转向:ai、ay、ou、ow、oa、ea、ir、er。单个字母在连笔字母表。",
        link: { href: "/blog/how-to-join-cursive-letters", label: "两个字母怎么连" },
      },
      ja: { q: "筆記体のつなぎはどう練習しますか?", a: "ページは同じ方向の組で開きます。th、ch、sh、wh、oo、ee、ll、ss。各組が Sacramento の 1 ページです。もう一方は途中で曲がります。ai、ay、ou、ow、oa、ea、ir、er。一文字は字母表にあります。" },
      ko: { q: "필기체 이음은 어떻게 연습하나요?", a: "페이지는 같은 방향의 쌍으로 열립니다. th, ch, sh, wh, oo, ee, ll, ss. 각 쌍이 Sacramento로 한 페이지입니다. 다른 묶음은 중간에서 방향이 바뀝니다. ai, ay, ou, ow, oa, ea, ir, er. 한 글자는 알파벳 표에 있습니다." },
      es: { q: "¿Cómo practico una unión de letra cursiva?", a: "La página abre en pares del mismo sentido: th, ch, sh, wh, oo, ee, ll, ss. Cada par es su página en Sacramento. El otro grupo gira en el medio: ai, ay, ou, ow, oa, ea, ir, er. Las letras sueltas están en el abecedario." },
      de: { q: "Wie übe ich eine Schreibschrift-Verbindung?", a: "Die Seite öffnet mit Paaren in gleicher Richtung: th, ch, sh, wh, oo, ee, ll, ss. Jedes Paar ist eine eigene Seite in Sacramento. Die andere Gruppe dreht in der Mitte: ai, ay, ou, ow, oa, ea, ir, er. Einzelbuchstaben bleiben im Alphabet." },
      fr: { q: "Comment exercer une liaison cursive ?", a: "La page s'ouvre sur des paires du même sens : th, ch, sh, wh, oo, ee, ll, ss. Chaque paire a sa page en Sacramento. L'autre groupe tourne au milieu : ai, ay, ou, ow, oa, ea, ir, er. Les lettres seules restent sur l'alphabet." },
      pt: { q: "Como pratico uma ligação de letra cursiva?", a: "A página abre em pares do mesmo sentido: th, ch, sh, wh, oo, ee, ll, ss. Cada par é a sua página em Sacramento. O outro grupo vira no meio: ai, ay, ou, ow, oa, ea, ir, er. Letras soltas ficam no alfabeto." },
    },
  },
  {
    id: "join-free",
    i18n: {
      en: { q: "Are the cursive join pages free?", a: "Yes. No account and no watermark. The page practices the stroke between two letters." },
      zh: { q: "连笔字母对免费吗?", a: "免费。不用账号,也没有水印。这一页练的是两个字母之间的那一笔。" },
      ja: { q: "文字つなぎのページは無料ですか?", a: "無料です。アカウントも透かしもありません。このページは 2 文字のあいだの一画を練習します。" },
      ko: { q: "글자 이음 페이지는 무료인가요?", a: "무료입니다. 계정과 워터마크가 없습니다. 이 페이지는 두 글자 사이의 한 획을 연습합니다." },
      es: { q: "¿Las páginas de uniones cursivas son gratis?", a: "Sí. Sin cuenta y sin marca de agua. La página practica el trazo entre dos letras." },
      de: { q: "Sind die Verbindungsseiten kostenlos?", a: "Ja. Kein Konto und kein Wasserzeichen. Die Seite übt den Strich zwischen zwei Buchstaben." },
      fr: { q: "Les pages de liaison sont-elles gratuites ?", a: "Oui. Pas de compte et pas de filigrane. La page exerce le trait entre deux lettres." },
      pt: { q: "As páginas de ligação são grátis?", a: "Sim. Sem conta e sem marca d'água. A página pratica o traço entre duas letras." },
    },
  },
];

/** /cursive-tattoo-stencil。 */
export const TATTOO_STENCIL_FAQS: FaqItem[] = [
  {
    id: "tat-mirror",
    i18n: {
      en: {
        q: "How do I make a cursive tattoo stencil?",
        a: "Type a phrase of up to 42 characters. Leave Mirror for transfer on. Pick a script. Download the PNG. It is black on white and flipped left to right. Turn the mirror off only when you want to read the phrase as it will sit.",
        link: { href: "/blog/export-a-mirrored-cursive-stencil", label: "Export the stencil" },
      },
      zh: {
        q: "怎样做一张连笔转印稿?",
        a: "输入最多 42 个字符。转印用镜像保持打开。选一种字体。下载 PNG。白底黑字,左右翻转。只有在想看最终怎么读的时候才关掉镜像。",
        link: { href: "/blog/export-a-mirrored-cursive-stencil", label: "导出转印稿" },
      },
      ja: { q: "筆記体の下絵はどう作りますか?", a: "42 文字までの句を入れます。転写用の反転はオンのまま。書体を選び、PNG をダウンロードします。白地に黒で、左右が反転しています。最終的な読みを確認するときだけ反転を切ってください。" },
      ko: { q: "필기체 전사 초안은 어떻게 만드나요?", a: "42자까지 문장을 넣습니다. 전사용 반전은 켜 둡니다. 서체를 고르고 PNG를 받으세요. 흰 바탕에 검은 글씨이고 좌우가 뒤집혀 있습니다. 최종적으로 어떻게 읽히는지 볼 때만 반전을 끄세요." },
      es: { q: "¿Cómo hago una plantilla cursiva para tatuaje?", a: "Escribe una frase de hasta 42 caracteres. Deja el espejo encendido. Elige un trazo. Descarga el PNG. Es negro sobre blanco y está volteado. Apaga el espejo solo para leer la frase como va a quedar." },
      de: { q: "Wie mache ich eine Schreibschrift-Schablone?", a: "Tippe einen Satz mit bis zu 42 Zeichen. Lass den Spiegel an. Wähle eine Schrift. Lade das PNG. Schwarz auf weiß, links-rechts gespiegelt. Schalte den Spiegel nur aus, um den Satz so zu lesen, wie er sitzen wird." },
      fr: { q: "Comment faire un pochoir cursif pour tatouage ?", a: "Tapez une phrase de 42 caractères au plus. Laissez le miroir allumé. Choisissez un tracé. Téléchargez le PNG. Noir sur blanc, retourné. Coupez le miroir seulement pour lire la phrase telle qu'elle se posera." },
      pt: { q: "Como faço um estêncil cursivo para tatuagem?", a: "Digite uma frase de até 42 caracteres. Deixe o espelho ligado. Escolha um traço. Baixe o PNG. É preto no branco e está virado. Desligue o espelho só para ler a frase como ela vai ficar." },
    },
  },
  {
    id: "tat-free",
    i18n: {
      en: {
        q: "Is the cursive tattoo stencil free?",
        a: "Yes. No account. The scripts are open fonts. The PNG is a stencil for transfer paper. The preview is a white rectangle, and the phrase is not uploaded.",
      },
      zh: {
        q: "连笔转印稿免费吗?",
        a: "免费。不用账号。字体是开源的。PNG 是给转印纸用的稿。预览是一块白底,输入的句子不会上传。",
      },
      ja: { q: "タトゥー下絵は無料ですか?", a: "無料です。アカウントは要りません。書体はオープンフォントです。PNG は転写紙用の下絵です。プレビューは白い長方形で、句はアップロードされません。" },
      ko: { q: "타투 전사는 무료인가요?", a: "무료입니다. 계정이 필요 없습니다. 서체는 오픈 폰트입니다. PNG는 전사지용 초안입니다. 미리보기는 흰 사각형이고, 문장은 업로드되지 않습니다." },
      es: { q: "¿La plantilla cursiva para tatuaje es gratis?", a: "Sí. Sin cuenta. Los trazos son fuentes abiertas. El PNG es una plantilla para papel de transferencia. La vista previa es un rectángulo blanco y la frase no se sube." },
      de: { q: "Ist die Schablone kostenlos?", a: "Ja. Kein Konto. Die Schriften sind offen lizenziert. Das PNG ist eine Schablone für Transferpapier. Die Vorschau ist ein weißes Rechteck, und der Satz wird nicht hochgeladen." },
      fr: { q: "Le pochoir cursif est-il gratuit ?", a: "Oui. Pas de compte. Les tracés sont des polices ouvertes. Le PNG est un pochoir pour papier transfert. L'aperçu est un rectangle blanc, et la phrase n'est pas envoyée." },
      pt: { q: "O estêncil cursivo é grátis?", a: "Sim. Sem conta. Os traços são fontes abertas. O PNG é um estêncil para papel de transferência. A prévia é um retângulo branco, e a frase não é enviada." },
    },
  },
];

/** /architect-lettering。 */
export const ARCHITECT_FAQS: FaqItem[] = [
  {
    id: "arch-font",
    i18n: {
      en: {
        q: "What font is on the architect lettering sheet?",
        a: "Architects Daughter, the open font Kimberly Geswein published under the SIL Open Font License. The sheet prints the capitals in three rows and the digits 0 through 9. Each line is solid, then dotted, then blank. Google Fonts describes the face as a squared handwriting. Drafting stencils and school programs are different hands.",
        link: { href: "/blog/squared-hand-lettering-practice", label: "Fifteen minutes a day" },
      },
      zh: {
        q: "建筑字体练习纸用的是哪款字体?",
        a: "Architects Daughter, Kimberly Geswein 以 SIL Open Font License 发布的开源字体。纸上是三行大写字母和数字 0 到 9。每行先实线,再虚线,再空白。Google Fonts 把它写成一种偏方的手写。工程模板和学校课本体是另一类字。",
        link: { href: "/blog/squared-hand-lettering-practice", label: "每天十五分钟" },
      },
      ja: { q: "建築レタリングのシートはどのフォントですか?", a: "Architects Daughter です。Kimberly Geswein が SIL Open Font License で公開したオープンフォントです。大文字が 3 行、数字は 0 から 9。各行は実線、点線、空白です。Google Fonts は角ばった手書きと説明しています。製図テンプレートや学校のプログラムは別の手です。" },
      ko: { q: "건축 레터링 연습지의 글꼴은 무엇인가요?", a: "Architects Daughter입니다. Kimberly Geswein이 SIL Open Font License로 공개한 오픈 폰트입니다. 대문자가 세 줄, 숫자는 0부터 9입니다. 각 줄은 실선, 점선, 빈 줄입니다. Google Fonts는 각진 손글씨로 설명합니다. 제도 템플릿과 학교 프로그램은 다른 손입니다." },
      es: { q: "¿Qué fuente usa la hoja de letra de arquitecto?", a: "Architects Daughter, la fuente abierta que Kimberly Geswein publicó bajo la SIL Open Font License. La hoja imprime las mayúsculas en tres filas y los dígitos del 0 al 9. Cada línea es continua, luego punteada, luego en blanco. Google Fonts la describe como una escritura cuadrada. Las plantillas de dibujo y los programas escolares son otras manos." },
      de: { q: "Welche Schrift ist auf dem Architektenblatt?", a: "Architects Daughter, die offene Schrift, die Kimberly Geswein unter der SIL Open Font License veröffentlicht hat. Das Blatt druckt die Großbuchstaben in drei Zeilen und die Ziffern 0 bis 9. Jede Zeile ist durchgezogen, dann punktiert, dann leer. Google Fonts beschreibt sie als eckige Handschrift. Zeichenschablonen und Schulprogramme sind andere Hände." },
      fr: { q: "Quelle police est sur la fiche d'architecte ?", a: "Architects Daughter, la police ouverte que Kimberly Geswein a publiée sous la SIL Open Font License. La fiche imprime les capitales sur trois lignes et les chiffres de 0 à 9. Chaque ligne est pleine, puis en pointillés, puis vide. Google Fonts la décrit comme une écriture carrée. Les pochoirs de dessin et les méthodes scolaires sont d'autres mains." },
      pt: { q: "Qual é a fonte na folha de letra de arquiteto?", a: "Architects Daughter, a fonte aberta que Kimberly Geswein publicou sob a SIL Open Font License. A folha imprime as maiúsculas em três linhas e os dígitos de 0 a 9. Cada linha é cheia, depois pontilhada, depois em branco. O Google Fonts descreve-a como uma escrita quadrada. Moldes de desenho e programas escolares são outras mãos." },
    },
  },
  {
    id: "arch-free",
    i18n: {
      en: { q: "Are architect lettering practice sheets free?", a: "Yes. No account and no watermark. The font is under the SIL Open Font License. The sheet is for tracing that hand." },
      zh: { q: "建筑字体练习纸免费吗?", a: "免费。不用账号,也没有水印。字体使用 SIL Open Font License。这张纸用来描这一款手写。" },
      ja: { q: "建築レタリングの練習シートは無料ですか?", a: "無料です。アカウントも透かしもありません。フォントは SIL Open Font License です。このシートはその手をなぞるためのものです。" },
      ko: { q: "건축 레터링 연습지는 무료인가요?", a: "무료입니다. 계정과 워터마크가 없습니다. 글꼴은 SIL Open Font License입니다. 이 종이는 그 손을 따라 쓰기 위한 것입니다." },
      es: { q: "¿Las hojas de letra de arquitecto son gratis?", a: "Sí. Sin cuenta y sin marca de agua. La fuente está bajo la SIL Open Font License. La hoja sirve para calcar esa mano." },
      de: { q: "Sind die Architektenblätter kostenlos?", a: "Ja. Kein Konto und kein Wasserzeichen. Die Schrift steht unter der SIL Open Font License. Das Blatt ist zum Nachspuren dieser Hand." },
      fr: { q: "Les fiches d'écriture d'architecte sont-elles gratuites ?", a: "Oui. Pas de compte et pas de filigrane. La police est sous SIL Open Font License. La fiche sert à repasser cette main." },
      pt: { q: "As folhas de letra de arquiteto são grátis?", a: "Sim. Sem conta e sem marca d'água. A fonte está sob a SIL Open Font License. A folha serve para traçar essa mão." },
    },
  },
];
