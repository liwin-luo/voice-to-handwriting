import type { Locale } from "@/i18n/routing";

export type PaperKindType = "college" | "wide" | "handwriting";

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
];

export function getPaperKind(slug: string): PaperKind | undefined {
  return PAPER_KINDS.find((k) => k.slug === slug);
}
