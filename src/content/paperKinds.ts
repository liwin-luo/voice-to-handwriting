import type { Locale } from "@/i18n/routing";

export type PaperKindType = "college" | "wide" | "narrow" | "large" | "graph" | "handwriting" | "dots" | "story" | "cornell";

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
    copy: { en: {
        label: "College ruled",
        title: "College Ruled Paper — Free Printable PDF (Letter & A4)",
        description: "Print college ruled lined paper with a red margin. About 9/32 inch between lines. Free PDF, no watermark.",
        h1: "College ruled paper",
        intro: "College ruled paper is the 9/32 inch (7.1 mm) ruling used from about third grade through college, with a red left margin. Narrow ruled is a separate sheet at 1/4 inch (6.4 mm). Download a PDF in US Letter or A4 and print at actual size.",
      },
      zh: {
        label: "窄行横线",
        title: "窄行横线纸 — 免费可打印 PDF（Letter 与 A4）",
        description: "带红色边线的窄行横线纸，行距约 7.1 毫米。免费 PDF，无水印。",
        h1: "窄行横线纸",
        intro: "窄行（college ruled）是大约三年级到大学常用的横线：行距 7.1 毫米，左侧一条红边。下载 Letter 或 A4 的 PDF，按实际尺寸打印。"
      },
es: {
          label: "Raya estrecha",
          title: "Papel de raya estrecha — PDF gratis (Letter y A4)",
          description: "Papel pautado estrecho con margen rojo. Unos 7,1 mm entre líneas. PDF gratis, sin marca de agua.",
          h1: "Papel de raya estrecha",
          intro: "La pauta estrecha (college ruled) es la que se usa desde tercero hasta la universidad: 7,1 mm entre líneas y un margen rojo a la izquierda. Descarga el PDF en Letter o A4 e imprímelo a tamaño real.",
        },
pt: {
          label: "Pauta estreita",
          title: "Papel de pauta estreita — PDF grátis (Letter e A4)",
          description: "Papel pautado estreito com margem vermelha. Cerca de 7,1 mm entre as linhas. PDF grátis, sem marca d'água.",
          h1: "Papel de pauta estreita",
          intro: "A pauta estreita (college ruled) é a usada a partir do 3.º ano: 7,1 mm entre as linhas e uma margem vermelha à esquerda. Baixe o PDF em Letter ou A4 e imprima no tamanho real.",
        } },
  },
  {
    slug: "wide-ruled",
    type: "wide",
    copy: { en: {
        label: "Wide ruled",
        title: "Wide Ruled Paper — Free Printable PDF (Letter & A4)",
        description: "Print wide ruled lined paper for early grades. About 11/32 inch between lines, with a red margin. Free PDF.",
        h1: "Wide ruled paper",
        intro: "Wide ruled paper leaves more room between lines — about 11/32 inch (8.7 mm) — so early writers can form letters without crowding. It is the usual choice for kindergarten through second grade. Print US Letter or A4 at actual size.",
      },
      zh: {
        label: "宽行横线",
        title: "宽行横线纸 — 免费可打印 PDF（Letter 与 A4）",
        description: "低年级用的宽行横线纸，行距约 8.7 毫米，带红边。免费 PDF。",
        h1: "宽行横线纸",
        intro: "宽行（wide ruled）行距约 8.7 毫米，给刚开始写字的孩子留出完整字母的高度，幼儿园到二年级最常用。按 Letter 或 A4 实际尺寸打印。"
      },
es: {
          label: "Raya ancha",
          title: "Papel de raya ancha — PDF gratis (Letter y A4)",
          description: "Papel pautado ancho para los primeros cursos. Unos 8,7 mm entre líneas y margen rojo. PDF gratis.",
          h1: "Papel de raya ancha",
          intro: "La pauta ancha deja más sitio entre líneas (unos 8,7 mm) para que las letras no se amontonen. Es la habitual de infantil a segundo. Imprime en Letter o A4 a tamaño real.",
        },
pt: {
          label: "Pauta larga",
          title: "Papel de pauta larga — PDF grátis (Letter e A4)",
          description: "Papel pautado largo para os primeiros anos. Cerca de 8,7 mm e margem vermelha. PDF grátis.",
          h1: "Papel de pauta larga",
          intro: "A pauta larga deixa cerca de 8,7 mm entre as linhas, para as primeiras letras não ficarem apertadas. É a escolha comum até o 2.º ano. Imprima em Letter ou A4 no tamanho real.",
        } },
  },
  {
    slug: "kindergarten",
    type: "handwriting",
    copy: { en: {
        label: "Kindergarten lines",
        title: "Kindergarten Handwriting Paper — 12-Line Printable PDF",
        description: "Print 12 lines of primary handwriting paper: a headline, dashed midline, and baseline, with a red left margin. Free PDF. Print at actual size.",
        h1: "Kindergarten handwriting paper",
        intro: "Primary handwriting paper uses three guides on each line: a top line, a dashed midline for letters like a and c, and a solid baseline. US Letter fits 12 of these lines, with a red margin line on the left. Kindergarten and first grade use this sheet before wide ruled. Print at actual size, not fit-to-page.",
      },
      zh: {
        label: "三线格",
        title: "幼儿园三线格练字纸 — 12 行免费 PDF",
        description: "12 行三线格：顶线、虚中线、基线，左侧红边。免费 PDF。按实际尺寸打印。",
        h1: "幼儿园三线格",
        intro: "三线格有三条辅助线：顶线、给 a、c 这类字母高度用的虚中线，以及实线基线。Letter 上是 12 行，左侧一条红边。孩子在改用宽行横线之前用这一张。按实际尺寸打印，不要选「适合页面」。"
      },
es: {
          label: "Pauta de infantil",
          title: "Papel de caligrafía infantil — PDF de 12 líneas",
          description: "12 líneas de tres guías: techo, línea media discontinua y base, con margen rojo. PDF gratis. Imprime a tamaño real.",
          h1: "Papel de caligrafía para infantil",
          intro: "La pauta de infantil tiene tres guías: línea superior, línea media discontinua (altura de a, c, e) y línea base continua. En Letter caben 12 líneas, con un margen rojo a la izquierda. Sirve antes de pasar a la pauta ancha. Imprime a tamaño real, no ajustado a la página.",
        },
pt: {
          label: "Pauta infantil",
          title: "Papel de caligrafia infantil — PDF de 12 linhas",
          description: "12 linhas com três guias e margem vermelha. PDF grátis. Imprima no tamanho real.",
          h1: "Papel de caligrafia para a educação infantil",
          intro: "A pauta infantil tem três guias: linha superior, linha média tracejada (altura de letras como a e c) e linha de base contínua. No Letter cabem 12 linhas, com uma margem vermelha à esquerda. Use antes da pauta larga. Imprima no tamanho real, sem ajustar à página.",
        } },
  },
  {
    slug: "dot-grid",
    type: "dots",
    copy: { en: {
        label: "Dot grid",
        title: "Dot Grid Paper — Free Printable PDF (Letter & A4)",
        description: "Evenly spaced dots for bullet journals, sketches, and handwriting drills. Free PDF, no watermark.",
        h1: "Dot grid paper",
        intro: "Dot grid paper replaces lines with a light lattice of dots, so you can write, sketch, or keep a bullet journal without a heavy rule. The default pitch is about 7 mm. Print it in US Letter or A4 at actual size.",
      },
      zh: {
        label: "点阵",
        title: "点阵纸 — 免费可打印 PDF（Letter 与 A4）",
        description: "均匀点阵，适合手帐、草图和练字。免费 PDF，无水印。",
        h1: "点阵纸",
        intro: "点阵纸用浅点代替横线，写字、画草图或做手帐都不会被粗线挡住。默认点距大约 7 毫米。按 Letter 或 A4 实际尺寸打印。"
      },
es: {
          label: "Cuadrícula de puntos",
          title: "Papel de puntos — PDF gratis (Letter y A4)",
          description: "Puntos uniformes para bullet journal, bocetos y caligrafía. PDF gratis, sin marca de agua.",
          h1: "Papel de puntos",
          intro: "El papel de puntos cambia las rayas por una retícula ligera. Sirve para bullet journal, bocetos o caligrafía sin una pauta pesada. El paso por defecto ronda los 7 mm. Imprime en Letter o A4 a tamaño real.",
        },
pt: {
          label: "Grade de pontos",
          title: "Papel pontilhado — PDF grátis (Letter e A4)",
          description: "Pontos uniformes para bullet journal, rascunhos e caligrafia. PDF grátis, sem marca d'água.",
          h1: "Papel de pontos",
          intro: "O papel de pontos troca as linhas por uma grade leve. Serve para bullet journal, rascunhos ou caligrafia, sem pauta pesada. O espaçamento padrão fica em cerca de 7 mm. Imprima em Letter ou A4 no tamanho real.",
        } },
  },
  {
    slug: "story-paper",
    type: "story",
    copy: { en: {
        label: "Story paper",
        title: "Story Paper with Picture Box — Free Printable PDF",
        description: "A blank picture box on top and wide lines below, for kindergarten draw-and-write pages. Free PDF.",
        h1: "Story paper with a picture box",
        intro: "Story paper leaves the top of the page empty for a drawing and puts wide writing lines underneath. Kindergarten and first grade use it for a picture plus one or two sentences. The box is about two-fifths of the page. Print in US Letter or A4.",
      },
      zh: {
        label: "图画框",
        title: "带图画框的故事纸 — 免费 PDF",
        description: "上方空白画框，下方宽行横线，适合先画再写。免费 PDF。",
        h1: "带图画框的故事纸",
        intro: "故事纸把页面上方留成空白画框，下面是宽行横线。幼儿园和一年级用来画一幅图，再写一两句话。画框大约占页面的五分之二。可按 Letter 或 A4 打印。"
      },
es: {
          label: "Papel de cuento",
          title: "Papel con recuadro para dibujar — PDF gratis",
          description: "Recuadro en blanco arriba y líneas anchas abajo, para dibujar y escribir. PDF gratis.",
          h1: "Papel de cuento con recuadro",
          intro: "El papel de cuento deja arriba un recuadro vacío para el dibujo y debajo líneas anchas. En infantil y primero se usa para un dibujo y una o dos frases. El recuadro ocupa unas dos quintas partes de la hoja. Imprime en Letter o A4.",
        },
pt: {
          label: "Papel de história",
          title: "Papel com caixa para desenho — PDF grátis",
          description: "Caixa em branco em cima e linhas largas embaixo, para desenhar e escrever. PDF grátis.",
          h1: "Papel de história com caixa de desenho",
          intro: "O papel de história deixa o topo vazio para um desenho e põe linhas largas embaixo. Na educação infantil e no 1.º ano serve para um desenho e uma ou duas frases. A caixa ocupa cerca de dois quintos da página. Imprima em Letter ou A4.",
        } },
  },
  {
    slug: "cornell-notes",
    type: "cornell",
    copy: { en: {
        label: "Cornell notes",
        title: "Cornell Notes Paper — Free Printable PDF (Letter & A4)",
        description: "A cue column, lined notes, and a summary band at the bottom. Free Cornell notes PDF, no watermark.",
        h1: "Cornell notes paper",
        intro: "Cornell notes paper splits the page into three parts: a narrow cue column on the left for questions and keywords, lined notes on the right, and a blank summary band along the bottom. Print it in US Letter or A4 and fill the notes during class, the cues after.",
      },
      zh: {
        label: "康奈尔",
        title: "康奈尔笔记纸 — 免费可打印 PDF（Letter 与 A4）",
        description: "左侧线索栏、右侧横线笔记、底部总结区。免费 PDF，无水印。",
        h1: "康奈尔笔记纸",
        intro: "康奈尔笔记把一页分成三块：左边窄栏写问题和关键词，右边横线记笔记，底部留一条总结。按 Letter 或 A4 打印。课上填右边，课后补左边和总结。"
      },
es: {
          label: "Notas Cornell",
          title: "Papel de notas Cornell — PDF gratis (Letter y A4)",
          description: "Columna de pistas, líneas para apuntes y una banda de resumen abajo. PDF gratis, sin marca de agua.",
          h1: "Papel de notas Cornell",
          intro: "El método Cornell parte la hoja en tres: una columna estrecha a la izquierda para preguntas y palabras clave, líneas de apuntes a la derecha y una banda en blanco abajo para el resumen. Imprime en Letter o A4: los apuntes en clase, las pistas después.",
        },
pt: {
          label: "Notas Cornell",
          title: "Papel de notas Cornell — PDF grátis (Letter e A4)",
          description: "Coluna de pistas, linhas para anotações e uma faixa de resumo embaixo. PDF grátis, sem marca d'água.",
          h1: "Papel de notas Cornell",
          intro: "O método Cornell divide a folha em três: uma coluna estreita à esquerda para perguntas e palavras-chave, linhas de anotação à direita e uma faixa em branco embaixo para o resumo. Imprima em Letter ou A4. As anotações na aula, as pistas depois.",
        } },
  },
  {
    slug: "narrow-ruled",
    type: "narrow",
    copy: { en: {
        label: "Narrow ruled",
        title: "Narrow Ruled Paper — Free Printable PDF (1/4 Inch)",
        description: "Print narrow ruled paper at 1/4 inch (6.4 mm) between lines, with a red left margin. 41 lines on US Letter. Print at actual size.",
        h1: "Narrow ruled paper",
        intro: "Narrow ruled paper puts a line every 1/4 inch (6.4 mm). That is tighter than college ruled at 9/32 inch (7.1 mm), so more writing fits on the page. US Letter has 41 lines and a red margin line on the left. Print at actual size, not fit-to-page.",
      },
      zh: {
        label: "1/4 英寸",
        title: "1/4 英寸横线纸 — 免费可打印 PDF",
        description: "行距 6.4 毫米，左侧红边。Letter 上 41 行。按实际尺寸打印。",
        h1: "1/4 英寸横线纸",
        intro: "每 6.4 毫米（1/4 英寸）一条线，比窄行（college ruled，7.1 毫米）更密，一页写得下更多字。Letter 上是 41 行，左侧一条红边。按实际尺寸打印，不要选「适合页面」。"
      },
es: {
          label: "1/4 pulgada",
          title: "Papel de 1/4 pulgada — PDF gratis",
          description: "Líneas cada 6,4 mm, con margen rojo. 41 líneas en Letter. Imprime a tamaño real.",
          h1: "Papel de raya de 1/4 pulgada",
          intro: "Esta pauta pone una línea cada 1/4 de pulgada (6,4 mm), más cerrada que la college ruled de 7,1 mm. En Letter caben 41 líneas, con un margen rojo a la izquierda. Imprime a tamaño real, no ajustado a la página.",
        },
pt: {
          label: "6,4 mm",
          title: "Papel pautado de 6,4 mm — PDF grátis",
          description: "Linha a cada 6,4 mm, com margem vermelha. 41 linhas no Letter. Imprima no tamanho real.",
          h1: "Papel de pauta de 1/4 polegada",
          intro: "Uma linha a cada 6,4 mm (1/4 polegada), mais fechada que a college ruled de 7,1 mm. No Letter cabem 41 linhas, com uma margem vermelha à esquerda. Imprima no tamanho real, sem ajustar à página.",
        } },
  },
  {
    slug: "large-print",
    type: "large",
    copy: { en: {
        label: "Large print",
        title: "Large Print Writing Paper — 1/2 Inch Lined PDF",
        description: "Low-vision writing paper with 1/2 inch between lines and a red left margin. 20 lines on US Letter. Print at actual size.",
        h1: "Large print writing paper",
        intro: "Large print writing paper leaves 1/2 inch (12.7 mm) between lines, wider than wide ruled at 11/32 inch. It is the sheet for low vision and for writers who need a bigger target. US Letter has 20 lines and a red margin line on the left. Print at actual size, not fit-to-page.",
      },
      zh: {
        label: "大字横线",
        title: "大字横线纸 — 1/2 英寸行距免费 PDF",
        description: "行距 12.7 毫米，左侧红边。Letter 上 20 行。按实际尺寸打印。",
        h1: "大字横线纸",
        intro: "行距 12.7 毫米（1/2 英寸），比宽行（8.7 毫米）更宽。给低视力，以及需要更大书写目标的人。Letter 上是 20 行，左侧一条红边。按实际尺寸打印，不要选「适合页面」。"
      },
es: {
          label: "Letra grande",
          title: "Papel de letra grande — PDF a 1/2 pulgada",
          description: "12,7 mm entre líneas y margen rojo. 20 líneas en Letter. Imprime a tamaño real.",
          h1: "Papel de letra grande",
          intro: "Deja 1/2 pulgada (12,7 mm) entre líneas, más que la pauta ancha de 8,7 mm. Sirve para baja visión y para quien necesita un blanco más grande. En Letter caben 20 líneas, con un margen rojo a la izquierda. Imprime a tamaño real.",
        },
pt: {
          label: "Letra grande",
          title: "Papel de letra grande — PDF de 1/2 polegada",
          description: "12,7 mm entre as linhas e margem vermelha. 20 linhas no Letter. Imprima no tamanho real.",
          h1: "Papel de letra grande",
          intro: "Deixa 1/2 polegada (12,7 mm) entre as linhas, mais do que a pauta larga de 8,7 mm. Serve para baixa visão e para quem precisa de um alvo maior. No Letter cabem 20 linhas, com uma margem vermelha à esquerda. Imprima no tamanho real.",
        } },
  },
  {
    slug: "graph-paper",
    type: "graph",
    copy: { en: {
        label: "Graph paper",
        title: "1/4 Inch Graph Paper — Free Printable PDF",
        description: "Print graph paper with 1/4 inch squares (4 per inch) on US Letter or A4. Free PDF, no watermark. Print at actual size.",
        h1: "1/4 inch graph paper",
        intro: "This graph paper uses 1/4 inch (6.4 mm) squares, four to an inch. That is the usual size for school math and for sketching a small diagram. There is no red margin. Print at actual size, not fit-to-page, or the squares will not stay 1/4 inch.",
      },
      zh: {
        label: "方格纸",
        title: "1/4 英寸方格纸 — 免费可打印 PDF",
        description: "方格边长 6.4 毫米。免费 PDF，无水印。按实际尺寸打印。",
        h1: "1/4 英寸方格纸",
        intro: "方格边长 6.4 毫米（1/4 英寸），一英寸四个。学校数学和小示意图常用这个尺寸。没有红边。按实际尺寸打印，否则方格不再是 6.4 毫米。"
      },
es: {
          label: "Cuadriculado",
          title: "Papel cuadriculado de 1/4 pulgada — PDF gratis",
          description: "Cuadros de 6,4 mm. PDF gratis, sin marca de agua. Imprime a tamaño real.",
          h1: "Papel cuadriculado de 1/4 pulgada",
          intro: "Cuadros de 1/4 de pulgada (6,4 mm), cuatro por pulgada. Es el tamaño habitual para mates y para un diagrama pequeño. No lleva margen rojo. Imprime a tamaño real, o los cuadros dejan de medir 6,4 mm.",
        },
pt: {
          label: "Quadriculado",
          title: "Papel quadriculado de 6,4 mm — PDF grátis",
          description: "Quadrados de 6,4 mm. PDF grátis, sem marca d'água. Imprima no tamanho real.",
          h1: "Papel quadriculado de 1/4 polegada",
          intro: "Quadrados de 6,4 mm (1/4 polegada), quatro por polegada. O tamanho comum para matemática e um diagrama pequeno. Sem margem vermelha. Imprima no tamanho real, senão os quadrados deixam de ter 6,4 mm.",
        } },
  },
];

export function getPaperKind(slug: string): PaperKind | undefined {
  return PAPER_KINDS.find((k) => k.slug === slug);
}
