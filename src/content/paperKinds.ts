import type { Locale } from "@/i18n/routing";

export type PaperKindType = "college" | "wide" | "handwriting" | "dots" | "story" | "cornell";

export interface PaperKindCopy {
  /** 短标签，用于索引页链接 */
  label: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
}

export interface PaperKind {
  slug: string;
  type: PaperKindType;
  copy: Record<Locale, PaperKindCopy>;
}

/** 打印纸类型落地页。每页是同一生成器的一种预设，文案按该规格写，避免三页互相复制。 */
export const PAPER_KINDS: PaperKind[] = [
  {
    slug: "college-ruled",
    type: "college",
    copy: {
      en: {
        label: "College ruled",
        title: "College Ruled Paper — Free Printable PDF (Letter & A4)",
        description: "Print college ruled lined paper with a red margin. About 9/32 inch between lines. Free PDF, no watermark.",
        h1: "College ruled paper",
        intro: "College ruled paper is the narrow ruling used from about third grade through college: 9/32 inch (7.1 mm) between lines, with a red left margin. Download a PDF in US Letter or A4 and print at actual size.",
      },
      es: {
        label: "Raya estrecha",
        title: "Papel de raya estrecha — PDF gratis (Letter y A4)",
        description: "Papel pautado estrecho con margen rojo. Unos 7,1 mm entre líneas. PDF gratis, sin marca de agua.",
        h1: "Papel de raya estrecha",
        intro: "La pauta estrecha (college ruled) es la que se usa desde tercero hasta la universidad: 7,1 mm entre líneas y un margen rojo a la izquierda. Descarga el PDF en Letter o A4 e imprímelo a tamaño real.",
      },
      fr: {
        label: "Interligne étroit",
        title: "Papier à interligne étroit — PDF gratuit (Letter et A4)",
        description: "Papier ligné étroit avec marge rouge. Environ 7,1 mm entre les lignes. PDF gratuit, sans filigrane.",
        h1: "Papier à interligne étroit",
        intro: "L'interligne étroit (college ruled) sert à partir du CE2 environ jusqu'à l'université : 7,1 mm entre les lignes, marge rouge à gauche. Téléchargez le PDF en Letter ou A4 et imprimez à taille réelle.",
      },
      de: {
        label: "Eng liniert",
        title: "Eng liniertes Papier — kostenloses PDF (Letter und A4)",
        description: "Eng liniertes Papier mit rotem Rand. Etwa 7,1 mm Zeilenabstand. Kostenloses PDF, ohne Wasserzeichen.",
        h1: "Eng liniertes Papier",
        intro: "Eng liniertes Papier (College Ruled) ist die schmale Lineatur ab etwa der 3. Klasse: 7,1 mm Abstand, roter Rand links. PDF in Letter oder A4 herunterladen und in Originalgröße drucken.",
      },
      pt: {
        label: "Pauta estreita",
        title: "Papel de pauta estreita — PDF grátis (Letter e A4)",
        description: "Papel pautado estreito com margem vermelha. Cerca de 7,1 mm entre as linhas. PDF grátis, sem marca d'água.",
        h1: "Papel de pauta estreita",
        intro: "A pauta estreita (college ruled) é a usada a partir do 3.º ano: 7,1 mm entre as linhas e uma margem vermelha à esquerda. Baixe o PDF em Letter ou A4 e imprima no tamanho real.",
      },
      zh: {
        label: "窄行横线",
        title: "窄行横线纸 — 免费可打印 PDF（Letter 与 A4）",
        description: "带红色边线的窄行横线纸，行距约 7.1 毫米。免费 PDF，无水印。",
        h1: "窄行横线纸",
        intro: "窄行（college ruled）是大约三年级到大学常用的横线：行距 7.1 毫米，左侧一条红边。下载 Letter 或 A4 的 PDF，按实际尺寸打印。",
      },
      ja: {
        label: "細罫",
        title: "細罫ノート用紙 — 無料PDF（レター判とA4）",
        description: "赤いマージン付きの細罫。行間は約7.1mm。透かしなしの無料PDF。",
        h1: "細罫のノート用紙",
        intro: "細罫（college ruled）はおおよそ小3以降から大学まで使う狭い罫線です。行間7.1mm、左に赤いマージン。レター判かA4のPDFを等倍で印刷してください。",
      },
      ko: {
        label: "좁은 줄",
        title: "좁은 줄 노트 — 무료 PDF (Letter와 A4)",
        description: "빨간 여백이 있는 좁은 줄 종이. 줄 간격 약 7.1mm. 워터마크 없는 무료 PDF.",
        h1: "좁은 줄 노트",
        intro: "좁은 줄(college ruled)은 대략 3학년부터 대학까지 쓰는 좁은 줄입니다. 간격 7.1mm, 왼쪽에 빨간 여백. Letter 또는 A4 PDF를 실제 크기로 인쇄하세요.",
      },
    },
  },
  {
    slug: "wide-ruled",
    type: "wide",
    copy: {
      en: {
        label: "Wide ruled",
        title: "Wide Ruled Paper — Free Printable PDF (Letter & A4)",
        description: "Print wide ruled lined paper for early grades. About 11/32 inch between lines, with a red margin. Free PDF.",
        h1: "Wide ruled paper",
        intro: "Wide ruled paper leaves more room between lines — about 11/32 inch (8.7 mm) — so early writers can form letters without crowding. It is the usual choice for kindergarten through second grade. Print US Letter or A4 at actual size.",
      },
      es: {
        label: "Raya ancha",
        title: "Papel de raya ancha — PDF gratis (Letter y A4)",
        description: "Papel pautado ancho para los primeros cursos. Unos 8,7 mm entre líneas y margen rojo. PDF gratis.",
        h1: "Papel de raya ancha",
        intro: "La pauta ancha deja más sitio entre líneas (unos 8,7 mm) para que las letras no se amontonen. Es la habitual de infantil a segundo. Imprime en Letter o A4 a tamaño real.",
      },
      fr: {
        label: "Interligne large",
        title: "Papier à grands carreaux ligné — PDF gratuit (Letter et A4)",
        description: "Papier à interligne large pour les premières années. Environ 8,7 mm, marge rouge. PDF gratuit.",
        h1: "Papier à interligne large",
        intro: "L'interligne large laisse environ 8,7 mm entre les lignes, assez pour les premières années sans tasser les lettres. Imprimez en Letter ou A4 à taille réelle.",
      },
      de: {
        label: "Weit liniert",
        title: "Weit liniertes Papier — kostenloses PDF (Letter und A4)",
        description: "Weit liniertes Papier für die ersten Schuljahre. Etwa 8,7 mm, roter Rand. Kostenloses PDF.",
        h1: "Weit liniertes Papier",
        intro: "Weit liniertes Papier lässt etwa 8,7 mm zwischen den Zeilen, damit frühe Schreiber die Buchstaben nicht zusammendrängen. Üblich etwa bis zur 2. Klasse. Letter oder A4 in Originalgröße drucken.",
      },
      pt: {
        label: "Pauta larga",
        title: "Papel de pauta larga — PDF grátis (Letter e A4)",
        description: "Papel pautado largo para os primeiros anos. Cerca de 8,7 mm e margem vermelha. PDF grátis.",
        h1: "Papel de pauta larga",
        intro: "A pauta larga deixa cerca de 8,7 mm entre as linhas, para as primeiras letras não ficarem apertadas. É a escolha comum até o 2.º ano. Imprima em Letter ou A4 no tamanho real.",
      },
      zh: {
        label: "宽行横线",
        title: "宽行横线纸 — 免费可打印 PDF（Letter 与 A4）",
        description: "低年级用的宽行横线纸，行距约 8.7 毫米，带红边。免费 PDF。",
        h1: "宽行横线纸",
        intro: "宽行（wide ruled）行距约 8.7 毫米，给刚开始写字的孩子留出完整字母的高度，幼儿园到二年级最常用。按 Letter 或 A4 实际尺寸打印。",
      },
      ja: {
        label: "広罫",
        title: "広罫ノート用紙 — 無料PDF（レター判とA4）",
        description: "低学年向けの広い罫線。行間は約8.7mm、赤いマージン付き。無料PDF。",
        h1: "広罫のノート用紙",
        intro: "広罫（wide ruled）は行間約8.7mm。文字が潰れないよう、幼稚園から小2くらいまでよく使います。レター判かA4を等倍で印刷してください。",
      },
      ko: {
        label: "넓은 줄",
        title: "넓은 줄 노트 — 무료 PDF (Letter와 A4)",
        description: "저학년용 넓은 줄. 간격 약 8.7mm, 빨간 여백. 무료 PDF.",
        h1: "넓은 줄 노트",
        intro: "넓은 줄(wide ruled)은 간격이 약 8.7mm입니다. 글자가 붙지 않도록 유치원부터 2학년 무렵에 많이 씁니다. Letter 또는 A4를 실제 크기로 인쇄하세요.",
      },
    },
  },
  {
    slug: "kindergarten",
    type: "handwriting",
    copy: {
      en: {
        label: "Kindergarten lines",
        title: "Kindergarten Handwriting Paper — Free 3-Line PDF",
        description: "Print primary handwriting paper with a headline, dashed midline and baseline. Free PDF in Letter or A4.",
        h1: "Kindergarten handwriting paper",
        intro: "Primary handwriting paper uses three guides: a top line, a dashed midline for the height of letters like a and c, and a solid baseline. That is the sheet kindergarten and first grade use before they move to wide ruled. Print it in US Letter or A4.",
      },
      es: {
        label: "Pauta de infantil",
        title: "Papel de caligrafía infantil — PDF de tres líneas gratis",
        description: "Papel de tres líneas: techo, línea media discontinua y base. PDF gratis en Letter o A4.",
        h1: "Papel de caligrafía para infantil",
        intro: "La pauta de infantil tiene tres guías: línea superior, línea media discontinua (altura de a, c, e) y línea base continua. Sirve antes de pasar a la pauta ancha. Imprime en Letter o A4.",
      },
      fr: {
        label: "Réglure maternelle",
        title: "Papier d'écriture maternelle — PDF à trois lignes gratuit",
        description: "Trois lignes : haute, médiane pointillée et base. PDF gratuit en Letter ou A4.",
        h1: "Papier d'écriture pour la maternelle",
        intro: "La réglure d'apprentissage a trois guides : ligne du haut, médiane pointillée pour la hauteur des lettres comme a et c, et ligne de base continue. À imprimer en Letter ou A4 avant de passer à l'interligne large.",
      },
      de: {
        label: "Schreiblineatur",
        title: "Schreibpapier für die Kita — kostenloses Drei-Linien-PDF",
        description: "Oberlinie, gestrichelte Mittellinie und Grundlinie. Kostenloses PDF in Letter oder A4.",
        h1: "Schreibpapier mit drei Linien",
        intro: "Die Anfangslineatur hat drei Hilfslinien: oben, eine gestrichelte Mitte für die Höhe von a und c, und eine durchgezogene Grundlinie. Das Blatt vor der weiten Lineatur. Letter oder A4 drucken.",
      },
      pt: {
        label: "Pauta infantil",
        title: "Papel de caligrafia infantil — PDF de três linhas grátis",
        description: "Linha de cima, linha média tracejada e linha de base. PDF grátis em Letter ou A4.",
        h1: "Papel de caligrafia para a educação infantil",
        intro: "A pauta infantil tem três guias: linha superior, linha média tracejada (altura de letras como a e c) e linha de base contínua. Use antes da pauta larga. Imprima em Letter ou A4.",
      },
      zh: {
        label: "三线格",
        title: "幼儿园三线格练字纸 — 免费 PDF",
        description: "顶线、虚中线和基线。Letter 或 A4 免费 PDF。",
        h1: "幼儿园三线格",
        intro: "三线格有三条辅助线：顶线、给 a、c 这类字母高度用的虚中线，以及实线基线。孩子在改用宽行横线之前用这一张。可按 Letter 或 A4 打印。",
      },
      ja: {
        label: "3本線",
        title: "幼稚園の3本線ノート — 無料PDF",
        description: "上線、破線の中線、基線。レター判またはA4の無料PDF。",
        h1: "幼稚園の3本線用紙",
        intro: "3本線は上の線、a や c の高さに使う破線の中線、実線の基線です。広罫に移る前の練習紙。レター判かA4で印刷できます。",
      },
      ko: {
        label: "3선 노트",
        title: "유치원 3선 노트 — 무료 PDF",
        description: "윗줄, 파선 가운데줄, 기준선. Letter 또는 A4 무료 PDF.",
        h1: "유치원 3선 노트",
        intro: "3선은 윗줄, a와 c 높이에 쓰는 파선 가운데줄, 실선 기준선입니다. 넓은 줄로 넘어가기 전의 연습지입니다. Letter 또는 A4로 인쇄하세요.",
      },
    },
  },
  {
    slug: "dot-grid",
    type: "dots",
    copy: {
      en: {
        label: "Dot grid",
        title: "Dot Grid Paper — Free Printable PDF (Letter & A4)",
        description: "Evenly spaced dots for bullet journals, sketches, and handwriting drills. Free PDF, no watermark.",
        h1: "Dot grid paper",
        intro: "Dot grid paper replaces lines with a light lattice of dots, so you can write, sketch, or keep a bullet journal without a heavy rule. The default pitch is about 7 mm. Print it in US Letter or A4 at actual size.",
      },
      es: {
        label: "Cuadrícula de puntos",
        title: "Papel de puntos — PDF gratis (Letter y A4)",
        description: "Puntos uniformes para bullet journal, bocetos y caligrafía. PDF gratis, sin marca de agua.",
        h1: "Papel de puntos",
        intro: "El papel de puntos cambia las rayas por una retícula ligera. Sirve para bullet journal, bocetos o caligrafía sin una pauta pesada. El paso por defecto ronda los 7 mm. Imprime en Letter o A4 a tamaño real.",
      },
      fr: {
        label: "Grille de points",
        title: "Papier pointillé — PDF gratuit (Letter et A4)",
        description: "Points réguliers pour bullet journal, croquis et écriture. PDF gratuit, sans filigrane.",
        h1: "Papier à points",
        intro: "Le papier à points remplace les lignes par un léger quadrillage de points : journal, croquis ou exercices d'écriture, sans réglure lourde. Le pas par défaut est d'environ 7 mm. Imprimez en Letter ou A4 à taille réelle.",
      },
      de: {
        label: "Punktraster",
        title: "Punktraster-Papier — kostenloses PDF (Letter und A4)",
        description: "Gleichmäßige Punkte für Bullet Journal, Skizzen und Schreibübungen. Kostenloses PDF, ohne Wasserzeichen.",
        h1: "Punktraster",
        intro: "Punktraster ersetzt Linien durch ein leichtes Punktgitter. Geeignet für Bullet Journal, Skizzen oder Schreibübungen, ohne schwere Lineatur. Der Abstand liegt bei etwa 7 mm. Letter oder A4 in Originalgröße drucken.",
      },
      pt: {
        label: "Grade de pontos",
        title: "Papel pontilhado — PDF grátis (Letter e A4)",
        description: "Pontos uniformes para bullet journal, rascunhos e caligrafia. PDF grátis, sem marca d'água.",
        h1: "Papel de pontos",
        intro: "O papel de pontos troca as linhas por uma grade leve. Serve para bullet journal, rascunhos ou caligrafia, sem pauta pesada. O espaçamento padrão fica em cerca de 7 mm. Imprima em Letter ou A4 no tamanho real.",
      },
      zh: {
        label: "点阵",
        title: "点阵纸 — 免费可打印 PDF（Letter 与 A4）",
        description: "均匀点阵，适合手帐、草图和练字。免费 PDF，无水印。",
        h1: "点阵纸",
        intro: "点阵纸用浅点代替横线，写字、画草图或做手帐都不会被粗线挡住。默认点距大约 7 毫米。按 Letter 或 A4 实际尺寸打印。",
      },
      ja: {
        label: "ドット方眼",
        title: "ドット方眼用紙 — 無料PDF（レター判とA4）",
        description: "等間隔の点。バレットジャーナル、下絵、筆記練習に。透かしなしの無料PDF。",
        h1: "ドット方眼用紙",
        intro: "ドット方眼は罫線の代わりに薄い点を置きます。バレットジャーナル、下絵、筆記の練習に向き、線が主張しません。初期の間隔は約7mm。レター判かA4を等倍で印刷してください。",
      },
      ko: {
        label: "점 격자",
        title: "점 격자 노트 — 무료 PDF (Letter와 A4)",
        description: "고른 간격의 점. 불릿 저널, 스케치, 글씨 연습용. 워터마크 없는 무료 PDF.",
        h1: "점 격자 노트",
        intro: "점 격자는 줄 대신 옅은 점을 찍습니다. 불릿 저널, 스케치, 글씨 연습에 맞고, 줄이 글을 누르지 않습니다. 기본 간격은 약 7mm. Letter 또는 A4를 실제 크기로 인쇄하세요.",
      },
    },
  },
  {
    slug: "story-paper",
    type: "story",
    copy: {
      en: {
        label: "Story paper",
        title: "Story Paper with Picture Box — Free Printable PDF",
        description: "A blank picture box on top and wide lines below, for kindergarten draw-and-write pages. Free PDF.",
        h1: "Story paper with a picture box",
        intro: "Story paper leaves the top of the page empty for a drawing and puts wide writing lines underneath. Kindergarten and first grade use it for a picture plus one or two sentences. The box is about two-fifths of the page. Print in US Letter or A4.",
      },
      es: {
        label: "Papel de cuento",
        title: "Papel con recuadro para dibujar — PDF gratis",
        description: "Recuadro en blanco arriba y líneas anchas abajo, para dibujar y escribir. PDF gratis.",
        h1: "Papel de cuento con recuadro",
        intro: "El papel de cuento deja arriba un recuadro vacío para el dibujo y debajo líneas anchas. En infantil y primero se usa para un dibujo y una o dos frases. El recuadro ocupa unas dos quintas partes de la hoja. Imprime en Letter o A4.",
      },
      fr: {
        label: "Feuille récit",
        title: "Papier avec cadre à dessin — PDF gratuit",
        description: "Un cadre vide en haut et de grandes lignes en dessous, pour dessiner puis écrire. PDF gratuit.",
        h1: "Papier récit avec cadre",
        intro: "La feuille récit réserve le haut de la page à un dessin et place de grandes lignes en dessous. En maternelle et au CP, elle sert à un dessin plus une ou deux phrases. Le cadre occupe environ deux cinquièmes de la page. Imprimez en Letter ou A4.",
      },
      de: {
        label: "Bildergeschichte",
        title: "Schreibpapier mit Bildkasten — kostenloses PDF",
        description: "Leeres Bildfeld oben, weite Linien unten, zum Zeichnen und Schreiben. Kostenloses PDF.",
        h1: "Papier mit Bildkasten",
        intro: "Dieses Blatt lässt oben ein leeres Feld für eine Zeichnung und setzt darunter weite Schreiblinien. In der Kita und der 1. Klasse reicht das für ein Bild und ein oder zwei Sätze. Der Kasten nimmt etwa zwei Fünftel der Seite ein. Letter oder A4 drucken.",
      },
      pt: {
        label: "Papel de história",
        title: "Papel com caixa para desenho — PDF grátis",
        description: "Caixa em branco em cima e linhas largas embaixo, para desenhar e escrever. PDF grátis.",
        h1: "Papel de história com caixa de desenho",
        intro: "O papel de história deixa o topo vazio para um desenho e põe linhas largas embaixo. Na educação infantil e no 1.º ano serve para um desenho e uma ou duas frases. A caixa ocupa cerca de dois quintos da página. Imprima em Letter ou A4.",
      },
      zh: {
        label: "图画框",
        title: "带图画框的故事纸 — 免费 PDF",
        description: "上方空白画框，下方宽行横线，适合先画再写。免费 PDF。",
        h1: "带图画框的故事纸",
        intro: "故事纸把页面上方留成空白画框，下面是宽行横线。幼儿园和一年级用来画一幅图，再写一两句话。画框大约占页面的五分之二。可按 Letter 或 A4 打印。",
      },
      ja: {
        label: "絵日記用紙",
        title: "絵を描く枠つき用紙 — 無料PDF",
        description: "上は空白の絵枠、下は広い罫線。描いてから書く用紙。無料PDF。",
        h1: "絵枠つきの作文用紙",
        intro: "上を絵の枠として空け、下に広い罫線を引きます。幼稚園や小1が、絵を1枚描いてから文を1、2文書くときに使います。枠はページのおよそ5分の2。レター判かA4で印刷できます。",
      },
      ko: {
        label: "그림 칸",
        title: "그림 칸이 있는 이야기 종이 — 무료 PDF",
        description: "위는 빈 그림 칸, 아래는 넓은 줄. 그리고 나서 쓰기. 무료 PDF.",
        h1: "그림 칸이 있는 이야기 종이",
        intro: "이야기 종이는 위쪽을 빈 그림 칸으로 두고, 아래에 넓은 줄을 긋습니다. 유치원과 1학년에서 그림 한 장과 문장 한두 개를 쓸 때 씁니다. 칸은 페이지의 약 5분의 2입니다. Letter 또는 A4로 인쇄하세요.",
      },
    },
  },
  {
    slug: "cornell-notes",
    type: "cornell",
    copy: {
      en: {
        label: "Cornell notes",
        title: "Cornell Notes Paper — Free Printable PDF (Letter & A4)",
        description: "A cue column, lined notes, and a summary band at the bottom. Free Cornell notes PDF, no watermark.",
        h1: "Cornell notes paper",
        intro: "Cornell notes paper splits the page into three parts: a narrow cue column on the left for questions and keywords, lined notes on the right, and a blank summary band along the bottom. Print it in US Letter or A4 and fill the notes during class, the cues after.",
      },
      es: {
        label: "Notas Cornell",
        title: "Papel de notas Cornell — PDF gratis (Letter y A4)",
        description: "Columna de pistas, líneas para apuntes y una banda de resumen abajo. PDF gratis, sin marca de agua.",
        h1: "Papel de notas Cornell",
        intro: "El método Cornell parte la hoja en tres: una columna estrecha a la izquierda para preguntas y palabras clave, líneas de apuntes a la derecha y una banda en blanco abajo para el resumen. Imprime en Letter o A4: los apuntes en clase, las pistas después.",
      },
      fr: {
        label: "Notes Cornell",
        title: "Papier de notes Cornell — PDF gratuit (Letter et A4)",
        description: "Colonne d'indices, lignes de notes et bande de résumé en bas. PDF gratuit, sans filigrane.",
        h1: "Papier pour la méthode Cornell",
        intro: "La feuille Cornell coupe la page en trois : une colonne étroite à gauche pour les questions et les mots-clés, des lignes de notes à droite, et une bande vide en bas pour le résumé. Imprimez en Letter ou A4. Les notes pendant le cours, les indices après.",
      },
      de: {
        label: "Cornell-Notizen",
        title: "Cornell-Notizpapier — kostenloses PDF (Letter und A4)",
        description: "Stichwortspalte, linierte Notizen und ein Zusammenfassungsfeld unten. Kostenloses PDF, ohne Wasserzeichen.",
        h1: "Papier für Cornell-Notizen",
        intro: "Cornell teilt die Seite in drei: links eine schmale Spalte für Fragen und Stichworte, rechts linierte Notizen, unten ein leeres Feld für die Zusammenfassung. Letter oder A4 drucken. Notizen in der Stunde, Stichworte danach.",
      },
      pt: {
        label: "Notas Cornell",
        title: "Papel de notas Cornell — PDF grátis (Letter e A4)",
        description: "Coluna de pistas, linhas para anotações e uma faixa de resumo embaixo. PDF grátis, sem marca d'água.",
        h1: "Papel de notas Cornell",
        intro: "O método Cornell divide a folha em três: uma coluna estreita à esquerda para perguntas e palavras-chave, linhas de anotação à direita e uma faixa em branco embaixo para o resumo. Imprima em Letter ou A4. As anotações na aula, as pistas depois.",
      },
      zh: {
        label: "康奈尔",
        title: "康奈尔笔记纸 — 免费可打印 PDF（Letter 与 A4）",
        description: "左侧线索栏、右侧横线笔记、底部总结区。免费 PDF，无水印。",
        h1: "康奈尔笔记纸",
        intro: "康奈尔笔记把一页分成三块：左边窄栏写问题和关键词，右边横线记笔记，底部留一条总结。按 Letter 或 A4 打印。课上填右边，课后补左边和总结。",
      },
      ja: {
        label: "コーネル式",
        title: "コーネル式ノート — 無料PDF（レター判とA4）",
        description: "左に手がかり欄、右に罫線、下にまとめ欄。透かしなしの無料PDF。",
        h1: "コーネル式ノート用紙",
        intro: "コーネル式はページを三つに分けます。左の細い欄に質問やキーワード、右の罫線にノート、下の空白に要約。レター判かA4で印刷し、授業中は右、あとで左と要約を埋めます。",
      },
      ko: {
        label: "코넬 노트",
        title: "코넬 노트 용지 — 무료 PDF (Letter와 A4)",
        description: "왼쪽 단서 칸, 오른쪽 줄 노트, 아래 요약 칸. 워터마크 없는 무료 PDF.",
        h1: "코넬 노트 용지",
        intro: "코넬 노트는 한 페이지를 셋으로 나눕니다. 왼쪽 좁은 칸에 질문과 핵심어, 오른쪽 줄에 필기, 아래 빈칸에 요약. Letter 또는 A4로 인쇄하고, 수업 중에는 오른쪽, 나중에 왼쪽과 요약을 채우세요.",
      },
    },
  },
];

export function getPaperKind(slug: string): PaperKind | undefined {
  return PAPER_KINDS.find((k) => k.slug === slug);
}

/** 红边距开关只出现在横线和三线格上。 */
export function paperKindHasMargin(type: PaperKindType): boolean {
  return type === "college" || type === "wide" || type === "handwriting";
}
