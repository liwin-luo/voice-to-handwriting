import type { FaqItem } from "@/content/faqs";
import type { Locale } from "@/i18n/routing";

type Row = { q: string; a: string; link?: { href: string; label: string } };

function item(id: string, rows: Record<Locale, Row>): FaqItem {
  return { id, i18n: rows };
}

const college = [
  item("college-ruled-what", {
    en: {
      q: "What is college ruled paper?",
      a: "College ruled paper leaves 9/32 inch (7.1 mm) between lines, with a red left margin. Wide ruled is wider, at 11/32 inch (8.7 mm). Narrow ruled is tighter, at 1/4 inch (6.4 mm).",
      link: { href: "/printable-paper/wide-ruled", label: "Wide ruled paper" },
    },
    zh: {
      q: "窄行横线纸是什么?",
      a: "窄行(college ruled)大约从三年级用到大学:行距 7.1 毫米(9/32 英寸),左侧一条红边。宽行是更宽的那张,行距 8.7 毫米(11/32 英寸)。",
      link: { href: "/printable-paper/wide-ruled", label: "宽行横线" },
    },
    ja: {
      q: "細罫とは何ですか?",
      a: "細罫(college ruled)はおおよそ小3から大学までの狭い罫線です。行間 7.1mm(9/32 インチ)、左に赤いマージン。広罫はより広い用紙で、行間 8.7mm(11/32 インチ)です。",
      link: { href: "/printable-paper/wide-ruled", label: "広罫" },
    },
    ko: {
      q: "좁은 줄 노트란?",
      a: "좁은 줄(college ruled)은 대략 3학년부터 대학까지 쓰는 좁은 줄입니다. 간격 7.1mm(9/32인치), 왼쪽 빨간 여백. 넓은 줄은 더 넓은 종이로, 간격 8.7mm(11/32인치)입니다.",
      link: { href: "/printable-paper/wide-ruled", label: "넓은 줄" },
    },
    es: {
      q: "¿Qué es el papel de raya estrecha?",
      a: "La pauta estrecha (college ruled) se usa desde tercero hasta la universidad: 7,1 mm (9/32 pulgada) entre líneas y un margen rojo a la izquierda. La pauta ancha es la hoja más abierta, a 8,7 mm (11/32 pulgada).",
      link: { href: "/printable-paper/wide-ruled", label: "Papel de raya ancha" },
    },
    de: {
      q: "Was ist eng liniertes Papier?",
      a: "Eng liniert (College Ruled) ist die schmale Lineatur ab etwa der 3. Klasse: 7,1 mm Abstand (9/32 Zoll) und ein roter Rand links. Weit liniert ist das breitere Blatt, mit 8,7 mm (11/32 Zoll).",
      link: { href: "/printable-paper/wide-ruled", label: "Weit liniertes Papier" },
    },
    fr: {
      q: "Qu'est-ce que le papier à interligne étroit ?",
      a: "L'interligne étroit (college ruled) sert à partir du CE2 environ jusqu'à l'université : 7,1 mm (9/32 pouce) entre les lignes, marge rouge à gauche. L'interligne large est la feuille plus ouverte, à 8,7 mm (11/32 pouce).",
      link: { href: "/printable-paper/wide-ruled", label: "Interligne large" },
    },
    pt: {
      q: "O que é papel de pauta estreita?",
      a: "A pauta estreita (college ruled) é a usada a partir do 3.º ano: 7,1 mm (9/32 polegada) entre as linhas e uma margem vermelha à esquerda. A pauta larga é a folha mais aberta, com 8,7 mm (11/32 polegada).",
      link: { href: "/printable-paper/wide-ruled", label: "Pauta larga" },
    },
  }),
  item("college-ruled-a4", {
    en: {
      q: "Can I print college ruled paper on A4?",
      a: "Yes. Download US Letter or A4 and print at actual size. Fit-to-page changes the 7.1 mm spacing.",
    },
    zh: {
      q: "窄行横线纸能用 A4 打印吗?",
      a: "可以。下载 Letter 或 A4,按实际尺寸打印。选择「适合页面」会改变 7.1 毫米的行距。",
    },
    ja: {
      q: "細罫は A4 で印刷できますか?",
      a: "はい。レター判か A4 を等倍で印刷してください。「用紙に合わせる」にすると 7.1mm の行間が変わります。",
    },
    ko: {
      q: "좁은 줄을 A4로 인쇄할 수 있나요?",
      a: "네. Letter 또는 A4를 실제 크기로 인쇄하세요. 페이지에 맞추면 7.1mm 간격이 달라집니다.",
    },
    es: {
      q: "¿Puedo imprimir la pauta estrecha en A4?",
      a: "Sí. Descarga Letter o A4 e imprime a tamaño real. Ajustar a la página cambia el espaciado de 7,1 mm.",
    },
    de: {
      q: "Kann ich eng liniertes Papier auf A4 drucken?",
      a: "Ja. Letter oder A4 herunterladen und in Originalgröße drucken. „An Seite anpassen“ verändert den Abstand von 7,1 mm.",
    },
    fr: {
      q: "Puis-je imprimer l'interligne étroit en A4 ?",
      a: "Oui. Téléchargez en Letter ou A4 et imprimez à taille réelle. Ajuster à la page change l'espacement de 7,1 mm.",
    },
    pt: {
      q: "Posso imprimir a pauta estreita em A4?",
      a: "Sim. Baixe Letter ou A4 e imprima no tamanho real. Ajustar à página muda o espaçamento de 7,1 mm.",
    },
  }),
  item("college-ruled-free", {
    en: { q: "Is college ruled paper free?", a: "Yes. No signup and no watermark on the PDF." },
    zh: { q: "窄行横线纸免费吗?", a: "免费。无需注册,PDF 没有水印。" },
    ja: { q: "細罫は無料ですか?", a: "無料です。登録不要で、PDF に透かしはありません。" },
    ko: { q: "좁은 줄은 무료인가요?", a: "무료입니다. 가입이 없고 PDF에 워터마크도 없습니다." },
    es: { q: "¿El papel de raya estrecha es gratis?", a: "Sí. Sin registro y sin marca de agua en el PDF." },
    de: { q: "Ist eng liniertes Papier kostenlos?", a: "Ja. Ohne Anmeldung und ohne Wasserzeichen im PDF." },
    fr: { q: "Le papier à interligne étroit est-il gratuit ?", a: "Oui. Sans inscription et sans filigrane dans le PDF." },
    pt: { q: "O papel de pauta estreita é grátis?", a: "Sim. Sem cadastro e sem marca d'água no PDF." },
  }),
];

const wide = [
  item("wide-ruled-what", {
    en: {
      q: "What is wide ruled paper?",
      a: "Wide ruled paper leaves 11/32 inch (8.7 mm) between lines, with a red left margin. It is the usual choice from kindergarten through second grade. College ruled is narrower, at 9/32 inch (7.1 mm).",
      link: { href: "/printable-paper/college-ruled", label: "College ruled paper" },
    },
    zh: {
      q: "宽行横线纸是什么?",
      a: "宽行(wide ruled)行距 8.7 毫米(11/32 英寸),左侧一条红边,幼儿园到二年级最常用。窄行更密,行距 7.1 毫米(9/32 英寸)。",
      link: { href: "/printable-paper/college-ruled", label: "窄行横线" },
    },
    ja: {
      q: "広罫とは何ですか?",
      a: "広罫(wide ruled)は行間 8.7mm(11/32 インチ)、左に赤いマージン。幼稚園から小2くらいまでよく使います。細罫はより狭く、行間 7.1mm(9/32 インチ)です。",
      link: { href: "/printable-paper/college-ruled", label: "細罫" },
    },
    ko: {
      q: "넓은 줄 노트란?",
      a: "넓은 줄(wide ruled)은 간격 8.7mm(11/32인치)이고 왼쪽 빨간 여백이 있습니다. 유치원부터 2학년 무렵에 많이 씁니다. 좁은 줄은 더 촘촘하고 간격 7.1mm(9/32인치)입니다.",
      link: { href: "/printable-paper/college-ruled", label: "좁은 줄" },
    },
    es: {
      q: "¿Qué es el papel de raya ancha?",
      a: "La pauta ancha deja 8,7 mm (11/32 pulgada) entre líneas y un margen rojo. Es la habitual hasta segundo. La estrecha es más cerrada, a 7,1 mm (9/32 pulgada).",
      link: { href: "/printable-paper/college-ruled", label: "Papel de raya estrecha" },
    },
    de: {
      q: "Was ist weit liniertes Papier?",
      a: "Weit liniert lässt 8,7 mm (11/32 Zoll) zwischen den Zeilen und hat einen roten Rand links. Üblich etwa bis zur 2. Klasse. Eng liniert ist schmaler, mit 7,1 mm (9/32 Zoll).",
      link: { href: "/printable-paper/college-ruled", label: "Eng liniertes Papier" },
    },
    fr: {
      q: "Qu'est-ce que le papier à interligne large ?",
      a: "L'interligne large laisse 8,7 mm (11/32 pouce) entre les lignes, avec une marge rouge. Il sert à peu près jusqu'au CE1. L'étroit est plus serré, à 7,1 mm (9/32 pouce).",
      link: { href: "/printable-paper/college-ruled", label: "Interligne étroit" },
    },
    pt: {
      q: "O que é papel de pauta larga?",
      a: "A pauta larga deixa 8,7 mm (11/32 polegada) entre as linhas e uma margem vermelha. É a escolha comum até o 2.º ano. A estreita é mais fechada, com 7,1 mm (9/32 polegada).",
      link: { href: "/printable-paper/college-ruled", label: "Pauta estreita" },
    },
  }),
  item("wide-ruled-a4", {
    en: {
      q: "Can I print wide ruled paper on A4?",
      a: "Yes. Download US Letter or A4 and print at actual size. Fit-to-page changes the 8.7 mm spacing.",
    },
    zh: {
      q: "宽行横线纸能用 A4 打印吗?",
      a: "可以。下载 Letter 或 A4,按实际尺寸打印。选择「适合页面」会改变 8.7 毫米的行距。",
    },
    ja: {
      q: "広罫は A4 で印刷できますか?",
      a: "はい。レター判か A4 を等倍で印刷してください。「用紙に合わせる」にすると 8.7mm の行間が変わります。",
    },
    ko: {
      q: "넓은 줄을 A4로 인쇄할 수 있나요?",
      a: "네. Letter 또는 A4를 실제 크기로 인쇄하세요. 페이지에 맞추면 8.7mm 간격이 달라집니다.",
    },
    es: {
      q: "¿Puedo imprimir la pauta ancha en A4?",
      a: "Sí. Descarga Letter o A4 e imprime a tamaño real. Ajustar a la página cambia el espaciado de 8,7 mm.",
    },
    de: {
      q: "Kann ich weit liniertes Papier auf A4 drucken?",
      a: "Ja. Letter oder A4 herunterladen und in Originalgröße drucken. „An Seite anpassen“ verändert den Abstand von 8,7 mm.",
    },
    fr: {
      q: "Puis-je imprimer l'interligne large en A4 ?",
      a: "Oui. Téléchargez en Letter ou A4 et imprimez à taille réelle. Ajuster à la page change l'espacement de 8,7 mm.",
    },
    pt: {
      q: "Posso imprimir a pauta larga em A4?",
      a: "Sim. Baixe Letter ou A4 e imprima no tamanho real. Ajustar à página muda o espaçamento de 8,7 mm.",
    },
  }),
  item("wide-ruled-free", {
    en: { q: "Is wide ruled paper free?", a: "Yes. No signup and no watermark on the PDF." },
    zh: { q: "宽行横线纸免费吗?", a: "免费。无需注册,PDF 没有水印。" },
    ja: { q: "広罫は無料ですか?", a: "無料です。登録不要で、PDF に透かしはありません。" },
    ko: { q: "넓은 줄은 무료인가요?", a: "무료입니다. 가입이 없고 PDF에 워터마크도 없습니다." },
    es: { q: "¿El papel de raya ancha es gratis?", a: "Sí. Sin registro y sin marca de agua en el PDF." },
    de: { q: "Ist weit liniertes Papier kostenlos?", a: "Ja. Ohne Anmeldung und ohne Wasserzeichen im PDF." },
    fr: { q: "Le papier à interligne large est-il gratuit ?", a: "Oui. Sans inscription et sans filigrane dans le PDF." },
    pt: { q: "O papel de pauta larga é grátis?", a: "Sim. Sem cadastro e sem marca d'água no PDF." },
  }),
];

const kindergarten = [
  item("kindergarten-what", {
    en: {
      q: "What is kindergarten handwriting paper?",
      a: "It uses three guides: a top line, a dashed midline for the height of letters like a and c, and a solid baseline. US Letter has 12 of these lines, with a red margin line on the left. Print at actual size. Wide ruled is a single wider gap, not this three-line sheet.",
      link: { href: "/printable-paper/wide-ruled", label: "Wide ruled paper" },
    },
    zh: {
      q: "幼儿园三线格是什么?",
      a: "三线格有顶线、给 a、c 这类字母高度用的虚中线,以及实线基线。孩子在改用宽行之前用这一张。宽行只是行距更宽的横线,不是这三线。",
      link: { href: "/printable-paper/wide-ruled", label: "宽行横线" },
    },
    ja: {
      q: "幼稚園の3本線とは何ですか?",
      a: "上の線、a や c の高さに使う破線の中線、実線の基線の三つです。広罫に移る前に使います。広罫は行間が広いだけの罫線で、この3本線ではありません。",
      link: { href: "/printable-paper/wide-ruled", label: "広罫" },
    },
    ko: {
      q: "유치원 3선 노트란?",
      a: "윗줄, a와 c 높이에 쓰는 파선 가운데줄, 실선 기준선입니다. 넓은 줄로 넘어가기 전에 씁니다. 넓은 줄은 간격만 넓은 줄이지, 이 3선이 아닙니다.",
      link: { href: "/printable-paper/wide-ruled", label: "넓은 줄" },
    },
    es: {
      q: "¿Qué es el papel de caligrafía infantil?",
      a: "Tiene tres guías: línea superior, línea media discontinua para la altura de letras como a y c, y línea base. Se usa antes de la pauta ancha. La pauta ancha es un hueco más grande, no esta hoja de tres líneas.",
      link: { href: "/printable-paper/wide-ruled", label: "Papel de raya ancha" },
    },
    de: {
      q: "Was ist Kindergarten-Schreibpapier?",
      a: "Drei Hilfslinien: oben, eine gestrichelte Mitte für die Höhe von a und c, und eine Grundlinie. Das Blatt vor der weiten Lineatur. Weit liniert ist nur ein größerer Zeilenabstand, nicht dieses Drei-Linien-Blatt.",
      link: { href: "/printable-paper/wide-ruled", label: "Weit liniertes Papier" },
    },
    fr: {
      q: "Qu'est-ce que le papier d'écriture de maternelle ?",
      a: "Trois guides : ligne du haut, médiane pointillée pour la hauteur des lettres comme a et c, et ligne de base. On l'utilise avant l'interligne large. L'interligne large est un écart plus grand, pas cette feuille à trois lignes.",
      link: { href: "/printable-paper/wide-ruled", label: "Interligne large" },
    },
    pt: {
      q: "O que é o papel de caligrafia infantil?",
      a: "Tem três guias: linha de cima, linha média tracejada para a altura de letras como a e c, e linha de base. Use antes da pauta larga. A pauta larga é um vão maior, não esta folha de três linhas.",
      link: { href: "/printable-paper/wide-ruled", label: "Pauta larga" },
    },
  }),
  item("kindergarten-a4", {
    en: {
      q: "Can I print kindergarten handwriting paper on A4?",
      a: "Yes. The PDF is US Letter or A4. Print at actual size so the dashed midline stays in the right place.",
    },
    zh: {
      q: "三线格能用 A4 打印吗?",
      a: "可以。PDF 有 Letter 和 A4。按实际尺寸打印,虚中线才落在该在的位置。",
    },
    ja: {
      q: "3本線は A4 で印刷できますか?",
      a: "はい。PDF はレター判と A4 です。等倍で印刷すると、破線の中線が正しい位置に残ります。",
    },
    ko: {
      q: "3선 노트를 A4로 인쇄할 수 있나요?",
      a: "네. PDF는 Letter와 A4입니다. 실제 크기로 인쇄해야 파선 가운데줄이 제자리에 있습니다.",
    },
    es: {
      q: "¿Puedo imprimir el papel de infantil en A4?",
      a: "Sí. El PDF está en Letter o A4. Imprime a tamaño real para que la línea media discontinua quede en su sitio.",
    },
    de: {
      q: "Kann ich das Kindergartenpapier auf A4 drucken?",
      a: "Ja. Das PDF gibt es als Letter oder A4. In Originalgröße drucken, damit die gestrichelte Mitte an der richtigen Stelle bleibt.",
    },
    fr: {
      q: "Puis-je imprimer le papier de maternelle en A4 ?",
      a: "Oui. Le PDF est en Letter ou A4. Imprimez à taille réelle pour que la médiane pointillée reste à sa place.",
    },
    pt: {
      q: "Posso imprimir o papel infantil em A4?",
      a: "Sim. O PDF é Letter ou A4. Imprima no tamanho real para a linha média tracejada ficar no lugar.",
    },
  }),
  item("kindergarten-free", {
    en: { q: "Is kindergarten handwriting paper free?", a: "Yes. No signup and no watermark on the PDF." },
    zh: { q: "三线格免费吗?", a: "免费。无需注册,PDF 没有水印。" },
    ja: { q: "3本線は無料ですか?", a: "無料です。登録不要で、PDF に透かしはありません。" },
    ko: { q: "3선 노트는 무료인가요?", a: "무료입니다. 가입이 없고 PDF에 워터마크도 없습니다." },
    es: { q: "¿El papel de infantil es gratis?", a: "Sí. Sin registro y sin marca de agua en el PDF." },
    de: { q: "Ist das Kindergartenpapier kostenlos?", a: "Ja. Ohne Anmeldung und ohne Wasserzeichen im PDF." },
    fr: { q: "Le papier de maternelle est-il gratuit ?", a: "Oui. Sans inscription et sans filigrane dans le PDF." },
    pt: { q: "O papel infantil é grátis?", a: "Sim. Sem cadastro e sem marca d'água no PDF." },
  }),
];

const dots = [
  item("dot-grid-what", {
    en: {
      q: "What is dot grid paper?",
      a: "Dot grid paper replaces lines with a light lattice of dots. The default pitch is about 7 mm, for bullet journals, sketches, and handwriting drills. It is not lined paper.",
    },
    zh: {
      q: "点阵纸是什么?",
      a: "点阵纸用浅点代替横线。默认点距大约 7 毫米,适合手帐、草图和练字。它不是横线纸。",
    },
    ja: {
      q: "ドット方眼とは何ですか?",
      a: "ドット方眼は罫線の代わりに薄い点を置きます。初期の間隔は約 7mm。バレットジャーナル、下絵、筆記練習向けです。罫線用紙ではありません。",
    },
    ko: {
      q: "점 격자 노트란?",
      a: "점 격자는 줄 대신 옅은 점을 찍습니다. 기본 간격은 약 7mm입니다. 불릿 저널, 스케치, 글씨 연습용이고, 줄 노트가 아닙니다.",
    },
    es: {
      q: "¿Qué es el papel de puntos?",
      a: "El papel de puntos cambia las rayas por una retícula ligera. El paso por defecto ronda los 7 mm, para bullet journal, bocetos y caligrafía. No es papel pautado.",
    },
    de: {
      q: "Was ist Punktraster-Papier?",
      a: "Punktraster ersetzt Linien durch ein leichtes Punktgitter. Der Abstand liegt bei etwa 7 mm, für Bullet Journal, Skizzen und Schreibübungen. Es ist kein liniertes Papier.",
    },
    fr: {
      q: "Qu'est-ce que le papier à points ?",
      a: "Le papier à points remplace les lignes par un léger quadrillage. Le pas par défaut est d'environ 7 mm, pour le bullet journal, les croquis et l'écriture. Ce n'est pas du papier ligné.",
    },
    pt: {
      q: "O que é papel de pontos?",
      a: "O papel de pontos troca as linhas por uma grade leve. O espaçamento padrão fica em cerca de 7 mm, para bullet journal, rascunhos e caligrafia. Não é papel pautado.",
    },
  }),
  item("dot-grid-a4", {
    en: {
      q: "Can I print dot grid paper on A4?",
      a: "Yes. Download US Letter or A4 and print at actual size so the dots stay about 7 mm apart.",
    },
    zh: {
      q: "点阵纸能用 A4 打印吗?",
      a: "可以。下载 Letter 或 A4,按实际尺寸打印,点距才会保持大约 7 毫米。",
    },
    ja: {
      q: "ドット方眼は A4 で印刷できますか?",
      a: "はい。レター判か A4 を等倍で印刷すると、点の間隔が約 7mm のまま残ります。",
    },
    ko: {
      q: "점 격자를 A4로 인쇄할 수 있나요?",
      a: "네. Letter 또는 A4를 실제 크기로 인쇄해야 점 간격이 약 7mm로 남습니다.",
    },
    es: {
      q: "¿Puedo imprimir el papel de puntos en A4?",
      a: "Sí. Descarga Letter o A4 e imprime a tamaño real para que los puntos sigan a unos 7 mm.",
    },
    de: {
      q: "Kann ich Punktraster auf A4 drucken?",
      a: "Ja. Letter oder A4 herunterladen und in Originalgröße drucken, damit die Punkte etwa 7 mm auseinander bleiben.",
    },
    fr: {
      q: "Puis-je imprimer le papier à points en A4 ?",
      a: "Oui. Téléchargez en Letter ou A4 et imprimez à taille réelle pour que les points restent à environ 7 mm.",
    },
    pt: {
      q: "Posso imprimir o papel de pontos em A4?",
      a: "Sim. Baixe Letter ou A4 e imprima no tamanho real para os pontos ficarem a cerca de 7 mm.",
    },
  }),
  item("dot-grid-free", {
    en: { q: "Is dot grid paper free?", a: "Yes. No signup and no watermark on the PDF." },
    zh: { q: "点阵纸免费吗?", a: "免费。无需注册,PDF 没有水印。" },
    ja: { q: "ドット方眼は無料ですか?", a: "無料です。登録不要で、PDF に透かしはありません。" },
    ko: { q: "점 격자는 무료인가요?", a: "무료입니다. 가입이 없고 PDF에 워터마크도 없습니다." },
    es: { q: "¿El papel de puntos es gratis?", a: "Sí. Sin registro y sin marca de agua en el PDF." },
    de: { q: "Ist Punktraster kostenlos?", a: "Ja. Ohne Anmeldung und ohne Wasserzeichen im PDF." },
    fr: { q: "Le papier à points est-il gratuit ?", a: "Oui. Sans inscription et sans filigrane dans le PDF." },
    pt: { q: "O papel de pontos é grátis?", a: "Sim. Sem cadastro e sem marca d'água no PDF." },
  }),
];

const story = [
  item("story-paper-what", {
    en: {
      q: "What is story paper?",
      a: "Story paper leaves the top of the page empty for a drawing — about two-fifths of the sheet — and puts wide writing lines underneath. Kindergarten and first grade use it for a picture plus one or two sentences.",
    },
    zh: {
      q: "故事纸是什么?",
      a: "故事纸把页面上方留成空白画框,大约占五分之二,下面是宽行横线。幼儿园和一年级用来画一幅图,再写一两句话。",
    },
    ja: {
      q: "絵枠つき用紙とは何ですか?",
      a: "上を絵の枠として空け(ページのおよそ 5 分の 2)、下に広い罫線を引きます。幼稚園や小1が、絵を 1 枚描いてから文を 1、2 文書くときに使います。",
    },
    ko: {
      q: "이야기 종이란?",
      a: "위쪽을 빈 그림 칸으로 두고(페이지의 약 5분의 2), 아래에 넓은 줄을 긋습니다. 유치원과 1학년에서 그림 한 장과 문장 한두 개를 쓸 때 씁니다.",
    },
    es: {
      q: "¿Qué es el papel de cuento?",
      a: "Deja arriba un recuadro vacío para el dibujo, unas dos quintas partes de la hoja, y debajo líneas anchas. En infantil y primero sirve para un dibujo y una o dos frases.",
    },
    de: {
      q: "Was ist Papier mit Bildkasten?",
      a: "Oben bleibt ein leeres Feld für eine Zeichnung, etwa zwei Fünftel der Seite, darunter stehen weite Schreiblinien. In der Kita und der 1. Klasse reicht das für ein Bild und ein oder zwei Sätze.",
    },
    fr: {
      q: "Qu'est-ce que le papier récit ?",
      a: "Le haut de la page reste vide pour un dessin, environ deux cinquièmes de la feuille, et de grandes lignes sont en dessous. En maternelle et au CP, il sert à un dessin plus une ou deux phrases.",
    },
    pt: {
      q: "O que é papel de história?",
      a: "Deixa o topo vazio para um desenho, cerca de dois quintos da folha, e põe linhas largas embaixo. Na educação infantil e no 1.º ano serve para um desenho e uma ou duas frases.",
    },
  }),
  item("story-paper-a4", {
    en: {
      q: "Can I print story paper on A4?",
      a: "Yes. The picture box and the lines below it are laid out for US Letter or A4. Print at actual size.",
    },
    zh: {
      q: "故事纸能用 A4 打印吗?",
      a: "可以。画框和下面的横线按 Letter 或 A4 排好。按实际尺寸打印。",
    },
    ja: {
      q: "絵枠つき用紙は A4 で印刷できますか?",
      a: "はい。絵の枠と下の罫線はレター判と A4 用に組んであります。等倍で印刷してください。",
    },
    ko: {
      q: "이야기 종이를 A4로 인쇄할 수 있나요?",
      a: "네. 그림 칸과 아래 줄은 Letter와 A4에 맞춰져 있습니다. 실제 크기로 인쇄하세요.",
    },
    es: {
      q: "¿Puedo imprimir el papel de cuento en A4?",
      a: "Sí. El recuadro y las líneas de abajo están compuestos para Letter o A4. Imprime a tamaño real.",
    },
    de: {
      q: "Kann ich das Bildkasten-Papier auf A4 drucken?",
      a: "Ja. Kasten und Linien sind für Letter oder A4 gesetzt. In Originalgröße drucken.",
    },
    fr: {
      q: "Puis-je imprimer le papier récit en A4 ?",
      a: "Oui. Le cadre et les lignes du dessous sont composés pour Letter ou A4. Imprimez à taille réelle.",
    },
    pt: {
      q: "Posso imprimir o papel de história em A4?",
      a: "Sim. A caixa e as linhas de baixo estão compostas para Letter ou A4. Imprima no tamanho real.",
    },
  }),
  item("story-paper-free", {
    en: { q: "Is story paper free?", a: "Yes. No signup and no watermark on the PDF." },
    zh: { q: "故事纸免费吗?", a: "免费。无需注册,PDF 没有水印。" },
    ja: { q: "絵枠つき用紙は無料ですか?", a: "無料です。登録不要で、PDF に透かしはありません。" },
    ko: { q: "이야기 종이는 무료인가요?", a: "무료입니다. 가입이 없고 PDF에 워터마크도 없습니다." },
    es: { q: "¿El papel de cuento es gratis?", a: "Sí. Sin registro y sin marca de agua en el PDF." },
    de: { q: "Ist das Bildkasten-Papier kostenlos?", a: "Ja. Ohne Anmeldung und ohne Wasserzeichen im PDF." },
    fr: { q: "Le papier récit est-il gratuit ?", a: "Oui. Sans inscription et sans filigrane dans le PDF." },
    pt: { q: "O papel de história é grátis?", a: "Sim. Sem cadastro e sem marca d'água no PDF." },
  }),
];

const cornell = [
  item("cornell-notes-what", {
    en: {
      q: "What is Cornell notes paper?",
      a: "Cornell notes paper splits the page into three parts: a narrow cue column on the left for questions and keywords, lined notes on the right, and a blank summary band along the bottom.",
    },
    zh: {
      q: "康奈尔笔记纸是什么?",
      a: "康奈尔笔记把一页分成三块:左边窄栏写问题和关键词,右边横线记笔记,底部留一条总结。",
    },
    ja: {
      q: "コーネル式ノートとは何ですか?",
      a: "ページを三つに分けます。左の細い欄に質問やキーワード、右の罫線にノート、下の空白に要約です。",
    },
    ko: {
      q: "코넬 노트 용지란?",
      a: "한 페이지를 셋으로 나눕니다. 왼쪽 좁은 칸에 질문과 핵심어, 오른쪽 줄에 필기, 아래 빈칸에 요약입니다.",
    },
    es: {
      q: "¿Qué es el papel de notas Cornell?",
      a: "Parte la hoja en tres: una columna estrecha a la izquierda para preguntas y palabras clave, líneas de apuntes a la derecha y una banda en blanco abajo para el resumen.",
    },
    de: {
      q: "Was ist Cornell-Notizpapier?",
      a: "Die Seite ist dreigeteilt: links eine schmale Spalte für Fragen und Stichworte, rechts linierte Notizen, unten ein leeres Feld für die Zusammenfassung.",
    },
    fr: {
      q: "Qu'est-ce que le papier de notes Cornell ?",
      a: "Il coupe la page en trois : une colonne étroite à gauche pour les questions et les mots-clés, des lignes de notes à droite, et une bande vide en bas pour le résumé.",
    },
    pt: {
      q: "O que é papel de notas Cornell?",
      a: "Divide a folha em três: uma coluna estreita à esquerda para perguntas e palavras-chave, linhas de anotação à direita e uma faixa em branco embaixo para o resumo.",
    },
  }),
  item("cornell-notes-how", {
    en: {
      q: "How do you fill in Cornell notes?",
      a: "Write the notes on the right during class. Afterward, add questions and keywords in the left column, then a short summary in the bottom band.",
    },
    zh: {
      q: "康奈尔笔记怎么填?",
      a: "课上把笔记写在右边。课后在左栏补问题和关键词,再在底部写一句总结。",
    },
    ja: {
      q: "コーネル式はどう埋めますか?",
      a: "授業中は右にノートを書きます。あとで左に質問とキーワード、下に短い要約を足します。",
    },
    ko: {
      q: "코넬 노트는 어떻게 채우나요?",
      a: "수업 중에는 오른쪽에 필기합니다. 나중에 왼쪽에 질문과 핵심어를 넣고, 아래에 짧은 요약을 씁니다.",
    },
    es: {
      q: "¿Cómo se rellenan las notas Cornell?",
      a: "Los apuntes van a la derecha durante la clase. Después, preguntas y palabras clave en la columna izquierda, y un resumen corto en la banda de abajo.",
    },
    de: {
      q: "Wie füllt man Cornell-Notizen aus?",
      a: "Die Notizen stehen rechts, während des Unterrichts. Danach kommen Fragen und Stichworte in die linke Spalte und eine kurze Zusammenfassung unten.",
    },
    fr: {
      q: "Comment remplir une feuille Cornell ?",
      a: "Les notes vont à droite pendant le cours. Ensuite, questions et mots-clés dans la colonne de gauche, puis un court résumé dans la bande du bas.",
    },
    pt: {
      q: "Como se preenchem as notas Cornell?",
      a: "As anotações vão à direita durante a aula. Depois, perguntas e palavras-chave na coluna da esquerda e um resumo curto na faixa de baixo.",
    },
  }),
  item("cornell-notes-free", {
    en: { q: "Is Cornell notes paper free?", a: "Yes. No signup and no watermark on the PDF." },
    zh: { q: "康奈尔笔记纸免费吗?", a: "免费。无需注册,PDF 没有水印。" },
    ja: { q: "コーネル式ノートは無料ですか?", a: "無料です。登録不要で、PDF に透かしはありません。" },
    ko: { q: "코넬 노트 용지는 무료인가요?", a: "무료입니다. 가입이 없고 PDF에 워터마크도 없습니다." },
    es: { q: "¿El papel Cornell es gratis?", a: "Sí. Sin registro y sin marca de agua en el PDF." },
    de: { q: "Ist Cornell-Notizpapier kostenlos?", a: "Ja. Ohne Anmeldung und ohne Wasserzeichen im PDF." },
    fr: { q: "Le papier Cornell est-il gratuit ?", a: "Oui. Sans inscription et sans filigrane dans le PDF." },
    pt: { q: "O papel Cornell é grátis?", a: "Sim. Sem cadastro e sem marca d'água no PDF." },
  }),
];

const narrow = [
  item("narrow-ruled-what", {
    en: {
      q: "What is narrow ruled paper?",
      a: "Narrow ruled paper has 1/4 inch (6.4 mm) between lines. College ruled is 9/32 inch (7.1 mm). US Letter fits 41 narrow lines, with a red left margin.",
      link: { href: "/printable-paper/college-ruled", label: "College ruled paper" },
    },
    zh: {
      q: "1/4 英寸横线纸和窄行有什么不同?",
      a: "这一页行距 6.4 毫米（1/4 英寸）。窄行（college ruled）是 7.1 毫米。Letter 上是 41 行，左侧一条红边。",
      link: { href: "/printable-paper/college-ruled", label: "窄行横线" },
    },
    ja: {
      q: "1/4インチ罫は細罫とどう違いますか?",
      a: "この用紙は行間 6.4mm（1/4インチ）です。細罫（college ruled）は 7.1mm。レター判は 41 行、左に赤いマージンです。",
      link: { href: "/printable-paper/college-ruled", label: "細罫" },
    },
    ko: {
      q: "1/4인치 줄은 좁은 줄과 어떻게 다른가요?",
      a: "이 용지는 간격 6.4mm(1/4인치)입니다. 좁은 줄(college ruled)은 7.1mm입니다. Letter는 41줄이고, 왼쪽 빨간 여백이 있습니다.",
      link: { href: "/printable-paper/college-ruled", label: "좁은 줄" },
    },
    es: {
      q: "¿Qué es el papel de 1/4 de pulgada?",
      a: "Deja 6,4 mm entre líneas. La pauta college ruled deja 7,1 mm. En Letter caben 41 líneas, con un margen rojo a la izquierda.",
      link: { href: "/printable-paper/college-ruled", label: "Papel de raya estrecha" },
    },
    de: {
      q: "Was ist Papier mit 1/4-Zoll-Linien?",
      a: "Der Abstand ist 6,4 mm. College Ruled hat 7,1 mm. Auf US Letter passen 41 Zeilen, links ein roter Rand.",
      link: { href: "/printable-paper/college-ruled", label: "Eng liniertes Papier" },
    },
    fr: {
      q: "Qu'est-ce que le papier ligné à 6,4 mm ?",
      a: "Une ligne tous les 6,4 mm. Le college ruled est à 7,1 mm. Le Letter en contient 41, avec une marge rouge à gauche.",
      link: { href: "/printable-paper/college-ruled", label: "Interligne étroit" },
    },
    pt: {
      q: "O que é o papel de 6,4 mm?",
      a: "Uma linha a cada 6,4 mm. A college ruled tem 7,1 mm. No Letter cabem 41 linhas, com uma margem vermelha à esquerda.",
      link: { href: "/printable-paper/college-ruled", label: "Pauta estreita" },
    },
  }),
  item("narrow-ruled-print", {
    en: {
      q: "How should I print narrow ruled paper?",
      a: "Print at actual size. Fit-to-page changes the 6.4 mm spacing. The linked PDF is US Letter. Use the page-size control for A4.",
    },
    zh: {
      q: "1/4 英寸横线纸怎么打印?",
      a: "按实际尺寸打印。「适合页面」会改变 6.4 毫米的行距。页面上的 PDF 是 Letter。要 A4 就在页面里切换纸张再下载。",
    },
    ja: {
      q: "1/4インチ罫はどう印刷しますか?",
      a: "等倍で印刷してください。「用紙に合わせる」にすると 6.4mm の行間が変わります。リンクの PDF はレター判です。A4 はページ内の用紙サイズで切り替えてからダウンロードします。",
    },
    ko: {
      q: "1/4인치 줄은 어떻게 인쇄하나요?",
      a: "실제 크기로 인쇄하세요. 페이지에 맞추면 6.4mm 간격이 달라집니다. 링크된 PDF는 Letter입니다. A4는 페이지에서 용지 크기를 바꾼 뒤 다운로드하세요.",
    },
    es: {
      q: "¿Cómo imprimo el papel de 1/4 de pulgada?",
      a: "A tamaño real. Ajustar a la página cambia los 6,4 mm. El PDF enlazado es Letter. Para A4, cambia el tamaño en la página y descarga.",
    },
    de: {
      q: "Wie drucke ich das 1/4-Zoll-Papier?",
      a: "In Originalgröße. „An Seite anpassen“ verändert die 6,4 mm. Die verlinkte PDF ist US Letter. Für A4 die Papiergröße auf der Seite umstellen und dann laden.",
    },
    fr: {
      q: "Comment imprimer le papier à 6,4 mm ?",
      a: "À taille réelle. Ajuster à la page change les 6,4 mm. Le PDF lié est en Letter. Pour l'A4, changez le format sur la page, puis téléchargez.",
    },
    pt: {
      q: "Como imprimo o papel de 6,4 mm?",
      a: "No tamanho real. Ajustar à página muda os 6,4 mm. O PDF ligado é Letter. Para A4, mude o tamanho na página e baixe.",
    },
  }),
  item("narrow-ruled-free", {
    en: { q: "Is narrow ruled paper free?", a: "Yes. No signup and no watermark on the PDF." },
    zh: { q: "1/4 英寸横线纸免费吗?", a: "免费。无需注册,PDF 没有水印。" },
    ja: { q: "1/4インチ罫は無料ですか?", a: "無料です。登録不要で、PDF に透かしはありません。" },
    ko: { q: "1/4인치 줄은 무료인가요?", a: "무료입니다. 가입이 없고 PDF에 워터마크도 없습니다." },
    es: { q: "¿El papel de 1/4 de pulgada es gratis?", a: "Sí. Sin registro y sin marca de agua en el PDF." },
    de: { q: "Ist das 1/4-Zoll-Papier kostenlos?", a: "Ja. Ohne Anmeldung und ohne Wasserzeichen im PDF." },
    fr: { q: "Le papier à 6,4 mm est-il gratuit ?", a: "Oui. Sans inscription et sans filigrane dans le PDF." },
    pt: { q: "O papel de 6,4 mm é grátis?", a: "Sim. Sem cadastro e sem marca d'água no PDF." },
  }),
];

const large = [
  item("large-print-what", {
    en: {
      q: "What is large print writing paper?",
      a: "Large print writing paper leaves 1/2 inch (12.7 mm) between lines. Wide ruled is 11/32 inch (8.7 mm). US Letter has 20 lines and a red left margin. It is the low-vision sheet, not three-line kindergarten paper.",
      link: { href: "/printable-paper/kindergarten", label: "Kindergarten handwriting paper" },
    },
    zh: {
      q: "大字横线纸是什么?",
      a: "行距 12.7 毫米（1/2 英寸）。宽行是 8.7 毫米。Letter 上是 20 行，左侧一条红边。这是低视力用的横线，不是幼儿园三线格。",
      link: { href: "/printable-paper/kindergarten", label: "幼儿园三线格" },
    },
    ja: {
      q: "大活字の罫紙とは何ですか?",
      a: "行間は 12.7mm（1/2インチ）です。広罫は 8.7mm。レター判は 20 行、左に赤いマージン。ロービジョン向けの横罫で、幼稚園の3本線ではありません。",
      link: { href: "/printable-paper/kindergarten", label: "3本線" },
    },
    ko: {
      q: "큰 글자 줄 노트란?",
      a: "간격은 12.7mm(1/2인치)입니다. 넓은 줄은 8.7mm입니다. Letter는 20줄이고, 왼쪽 빨간 여백이 있습니다. 저시력용 줄이며, 유치원 3선이 아닙니다.",
      link: { href: "/printable-paper/kindergarten", label: "3선 노트" },
    },
    es: {
      q: "¿Qué es el papel de letra grande?",
      a: "Deja 12,7 mm entre líneas. La pauta ancha deja 8,7 mm. En Letter caben 20 líneas y un margen rojo. Es la hoja de baja visión, no el papel de tres líneas.",
      link: { href: "/printable-paper/kindergarten", label: "Papel de infantil" },
    },
    de: {
      q: "Was ist Großdruck-Schreibpapier?",
      a: "Der Abstand ist 12,7 mm. Weit liniert hat 8,7 mm. Auf US Letter passen 20 Zeilen und ein roter Rand. Das Blatt für eingeschränktes Sehen, nicht die Drei-Linien-Lineatur.",
      link: { href: "/printable-paper/kindergarten", label: "Drei-Linien-Papier" },
    },
    fr: {
      q: "Qu'est-ce que le papier grands caractères ?",
      a: "12,7 mm entre les lignes. L'interligne large est à 8,7 mm. Le Letter en contient 20, avec une marge rouge. C'est la feuille basse vision, pas le papier à trois lignes.",
      link: { href: "/printable-paper/kindergarten", label: "Papier de maternelle" },
    },
    pt: {
      q: "O que é papel de letra grande?",
      a: "Deixa 12,7 mm entre as linhas. A pauta larga tem 8,7 mm. No Letter cabem 20 linhas e uma margem vermelha. É a folha de baixa visão, não o papel de três linhas.",
      link: { href: "/printable-paper/kindergarten", label: "Papel infantil" },
    },
  }),
  item("large-print-print", {
    en: {
      q: "How should I print large print paper?",
      a: "Print at actual size. Fit-to-page shrinks the 1/2 inch gap. The linked PDF is US Letter. Use the page-size control for A4.",
    },
    zh: {
      q: "大字横线纸怎么打印?",
      a: "按实际尺寸打印。「适合页面」会把 12.7 毫米的行距缩小。页面上的 PDF 是 Letter。要 A4 就在页面里切换纸张再下载。",
    },
    ja: {
      q: "大活字の罫紙はどう印刷しますか?",
      a: "等倍で印刷してください。「用紙に合わせる」と 12.7mm の行間が縮みます。リンクの PDF はレター判です。A4 はページ内で切り替えてからダウンロードします。",
    },
    ko: {
      q: "큰 글자 줄은 어떻게 인쇄하나요?",
      a: "실제 크기로 인쇄하세요. 페이지에 맞추면 12.7mm 간격이 줄어듭니다. 링크된 PDF는 Letter입니다. A4는 페이지에서 용지 크기를 바꾼 뒤 다운로드하세요.",
    },
    es: {
      q: "¿Cómo imprimo el papel de letra grande?",
      a: "A tamaño real. Ajustar a la página encoge los 12,7 mm. El PDF enlazado es Letter. Para A4, cambia el tamaño en la página y descarga.",
    },
    de: {
      q: "Wie drucke ich das Großdruckpapier?",
      a: "In Originalgröße. „An Seite anpassen“ verkleinert die 12,7 mm. Die verlinkte PDF ist US Letter. Für A4 die Papiergröße auf der Seite umstellen.",
    },
    fr: {
      q: "Comment imprimer le papier grands caractères ?",
      a: "À taille réelle. Ajuster à la page réduit les 12,7 mm. Le PDF lié est en Letter. Pour l'A4, changez le format sur la page, puis téléchargez.",
    },
    pt: {
      q: "Como imprimo o papel de letra grande?",
      a: "No tamanho real. Ajustar à página encolhe os 12,7 mm. O PDF ligado é Letter. Para A4, mude o tamanho na página e baixe.",
    },
  }),
  item("large-print-free", {
    en: { q: "Is large print writing paper free?", a: "Yes. No signup and no watermark on the PDF." },
    zh: { q: "大字横线纸免费吗?", a: "免费。无需注册,PDF 没有水印。" },
    ja: { q: "大活字の罫紙は無料ですか?", a: "無料です。登録不要で、PDF に透かしはありません。" },
    ko: { q: "큰 글자 줄은 무료인가요?", a: "무료입니다. 가입이 없고 PDF에 워터마크도 없습니다." },
    es: { q: "¿El papel de letra grande es gratis?", a: "Sí. Sin registro y sin marca de agua en el PDF." },
    de: { q: "Ist das Großdruckpapier kostenlos?", a: "Ja. Ohne Anmeldung und ohne Wasserzeichen im PDF." },
    fr: { q: "Le papier grands caractères est-il gratuit ?", a: "Oui. Sans inscription et sans filigrane dans le PDF." },
    pt: { q: "O papel de letra grande é grátis?", a: "Sim. Sem cadastro e sem marca d'água no PDF." },
  }),
];

const graph = [
  item("graph-paper-what", {
    en: {
      q: "What size are the squares on this graph paper?",
      a: "1/4 inch (6.4 mm), four squares to an inch. There is no red margin. Print at actual size so the squares stay that size.",
    },
    zh: {
      q: "这张方格纸的格子多大?",
      a: "边长 6.4 毫米（1/4 英寸），一英寸四个。没有红边。按实际尺寸打印，格子才保持这个大小。",
    },
    ja: {
      q: "この方眼紙のマスは何ミリですか?",
      a: "6.4mm（1/4インチ）で、1インチに四つです。赤いマージンはありません。等倍で印刷すると、マスがその大きさのままです。",
    },
    ko: {
      q: "이 모눈종이 칸은 얼마나 큰가요?",
      a: "6.4mm(1/4인치)이고, 1인치에 네 칸입니다. 빨간 여백은 없습니다. 실제 크기로 인쇄해야 칸이 그 크기로 남습니다.",
    },
    es: {
      q: "¿De qué tamaño son los cuadros?",
      a: "6,4 mm (1/4 de pulgada), cuatro por pulgada. No hay margen rojo. Imprime a tamaño real para que los cuadros no cambien.",
    },
    de: {
      q: "Wie groß sind die Kästchen?",
      a: "6,4 mm (1/4 Zoll), vier pro Zoll. Kein roter Rand. In Originalgröße drucken, damit die Kästchen so bleiben.",
    },
    fr: {
      q: "Quelle est la taille des carreaux ?",
      a: "6,4 mm (1/4 pouce), quatre par pouce. Pas de marge rouge. Imprimez à taille réelle pour que les carreaux gardent cette taille.",
    },
    pt: {
      q: "Qual é o tamanho dos quadrados?",
      a: "6,4 mm (1/4 polegada), quatro por polegada. Sem margem vermelha. Imprima no tamanho real para os quadrados ficarem nesse tamanho.",
    },
  }),
  item("graph-paper-a4", {
    en: {
      q: "Can I print this graph paper on A4?",
      a: "Yes. The linked PDF is US Letter. Switch the page size to A4 and download from the page. Print at actual size.",
    },
    zh: {
      q: "方格纸能用 A4 打印吗?",
      a: "可以。页面上的 PDF 是 Letter。要 A4 就在页面里切换纸张再下载。按实际尺寸打印。",
    },
    ja: {
      q: "この方眼紙は A4 で印刷できますか?",
      a: "はい。リンクの PDF はレター判です。A4 はページ内の用紙サイズを切り替えてからダウンロードします。等倍で印刷してください。",
    },
    ko: {
      q: "이 모눈종이를 A4로 인쇄할 수 있나요?",
      a: "네. 링크된 PDF는 Letter입니다. A4는 페이지에서 용지 크기를 바꾼 뒤 다운로드하세요. 실제 크기로 인쇄하세요.",
    },
    es: {
      q: "¿Puedo imprimir este cuadriculado en A4?",
      a: "Sí. El PDF enlazado es Letter. Cambia el tamaño a A4 en la página y descarga. Imprime a tamaño real.",
    },
    de: {
      q: "Kann ich dieses Karopapier auf A4 drucken?",
      a: "Ja. Die verlinkte PDF ist US Letter. Für A4 die Papiergröße auf der Seite umstellen und dann laden. In Originalgröße drucken.",
    },
    fr: {
      q: "Puis-je imprimer ce quadrillé en A4 ?",
      a: "Oui. Le PDF lié est en Letter. Passez le format en A4 sur la page, puis téléchargez. Imprimez à taille réelle.",
    },
    pt: {
      q: "Posso imprimir este quadriculado em A4?",
      a: "Sim. O PDF ligado é Letter. Mude o tamanho para A4 na página e baixe. Imprima no tamanho real.",
    },
  }),
  item("graph-paper-free", {
    en: { q: "Is this graph paper free?", a: "Yes. No signup and no watermark on the PDF." },
    zh: { q: "方格纸免费吗?", a: "免费。无需注册,PDF 没有水印。" },
    ja: { q: "この方眼紙は無料ですか?", a: "無料です。登録不要で、PDF に透かしはありません。" },
    ko: { q: "이 모눈종이는 무료인가요?", a: "무료입니다. 가입이 없고 PDF에 워터마크도 없습니다." },
    es: { q: "¿Este cuadriculado es gratis?", a: "Sí. Sin registro y sin marca de agua en el PDF." },
    de: { q: "Ist dieses Karopapier kostenlos?", a: "Ja. Ohne Anmeldung und ohne Wasserzeichen im PDF." },
    fr: { q: "Ce papier quadrillé est-il gratuit ?", a: "Oui. Sans inscription et sans filigrane dans le PDF." },
    pt: { q: "Este papel quadriculado é grátis?", a: "Sim. Sem cadastro e sem marca d'água no PDF." },
  }),
];

const BY_SLUG: Record<string, FaqItem[]> = {
  "college-ruled": college,
  "narrow-ruled": narrow,
  "wide-ruled": wide,
  "large-print": large,
  kindergarten,
  "graph-paper": graph,
  "dot-grid": dots,
  "story-paper": story,
  "cornell-notes": cornell,
};

export function paperKindFaqs(slug: string): FaqItem[] {
  return BY_SLUG[slug] ?? [];
}
