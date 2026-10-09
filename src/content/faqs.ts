import type { Locale } from "@/i18n/routing";

export interface FaqEntry {
  q: string;
  a: string;
}

export interface FaqItem {
  id: string;
  i18n: Partial<Record<Locale, FaqEntry>>;
}

/** 当前语言文案,缺翻译回退英语 */
export function getFaq(faq: FaqItem, locale: Locale): FaqEntry {
  return faq.i18n[locale] ?? faq.i18n.en!;
}

/** 工具页 FAQ:仅返回当前语言有翻译的条目(避免英文 FAQ 出现在其他语言页面),
 *  新语言翻译补齐后自动出现 */
export function getLocalizedFaqs(faqs: FaqItem[], locale: Locale): FaqEntry[] {
  return faqs.filter((f) => f.i18n[locale]).map((f) => f.i18n[locale]!);
}

/** /cursive 工具页 FAQ(8 语言) */
export const CURSIVE_FAQS: FaqItem[] = [
  {
    id: "cursive-free",
    i18n: {
      en: {
        q: "Is the cursive writing generator free?",
        a: "Yes — no signup. A small site watermark is on by default; turn it off under More like handwriting. Both cursive fonts are open source, and PNG/PDF exports are unlimited.",
      },
      zh: {
        q: "这个花体生成器免费吗?",
        a: "免费——无需注册。导出默认带一行站点水印,可在「更像手写」里关掉。两种花体字均为开源字体,PNG/PDF 导出不限次数。",
      },
      ja: {
        q: "筆記体ジェネレーターは無料ですか?",
        a: "はい——登録不要です。書き出しにはサイト名の透かしが初期状態で入り、「もっと手書きらしく」から消せます。どちらの筆記体フォントもオープンソースで、PNG/PDF 書き出しは無制限です。",
      },
      ko: {
        q: "필기체 생성기는 무료인가요?",
        a: "네 — 가입은 필요 없습니다. 내보내기에는 사이트 워터마크가 기본으로 들어가며, 「더 손글씨처럼」에서 끌 수 있어요. 두 필기체 글꼴 모두 오픈소스이며 PNG/PDF 내보내기는 무제한이에요.",
      },
      es: {
        q: "¿El generador de letra cursiva es gratis?",
        a: "Sí — sin registro. La marca de agua del sitio está activada por defecto; se quita en Más parecido a la letra. Ambas fuentes cursivas son open source y las exportaciones en PNG/PDF son ilimitadas.",
      },
      de: {
        q: "Ist der Schreibschrift-Generator kostenlos?",
        a: "Ja — keine Anmeldung. Ein kleines Seiten-Wasserzeichen ist standardmäßig an und lässt sich unter Eher wie Handschrift ausschalten. Beide Schreibschriften sind Open Source, und PNG-/PDF-Exporte sind unbegrenzt.",
      },
      fr: {
        q: "Le générateur d'écriture cursive est-il gratuit ?",
        a: "Oui — sans inscription. Un petit filigrane du site est présent par défaut et se retire dans Plus proche de l'écriture. Les deux polices cursives sont open source et les exports PNG/PDF sont illimités.",
      },
      pt: {
        q: "O gerador de escrita cursiva é grátis?",
        a: "Sim — sem cadastro. Uma marca d'água do site fica ligada por padrão e pode ser desligada em Mais parecido com letra. As duas fontes cursivas são open source e as exportações em PNG/PDF são ilimitadas.",
      },
    },
  },
  {
    id: "cursive-fonts",
    i18n: {
      en: {
        q: "Which cursive fonts are available?",
        a: "Two: Cedarville Cursive for everyday penmanship and Dancing Script for formal, looped writing. Size, realism and ink are adjustable before export.",
      },
      zh: {
        q: "有哪些花体字体?",
        a: "两种:Cedarville Cursive(日常手写体)和 Dancing Script(正式连笔体)。导出前可调整字号、仿真度和墨色。",
      },
      ja: {
        q: "筆記体フォントは何種類ありますか?",
        a: "2 種類です。日常使いの Cedarville Cursive と、フォーマルなループ系の Dancing Script。サイズ・リアリティ・インクは書き出し前に調整できます。",
      },
      ko: {
        q: "어떤 필기체 글꼴을 쓸 수 있나요?",
        a: "두 가지예요: 일상 손글씨용 Cedarville Cursive와 격식 있는 루프 스타일의 Dancing Script. 크기·리얼리즘·잉크는 내보내기 전에 조절할 수 있어요.",
      },
      es: {
        q: "¿Qué fuentes cursivas hay?",
        a: "Dos: Cedarville Cursive para el día a día y Dancing Script para una letra formal con rizos. Tamaño, realismo y tinta se ajustan antes de exportar.",
      },
      de: {
        q: "Welche Schreibschriften gibt es?",
        a: "Zwei: Cedarville Cursive für die alltägliche Handschrift und Dancing Script für formale, verschnörkelte Schrift. Größe, Realismus und Tinte sind vor dem Export einstellbar.",
      },
      fr: {
        q: "Quelles polices cursives sont disponibles ?",
        a: "Deux : Cedarville Cursive pour l'écriture de tous les jours et Dancing Script pour une écriture formelle à boucles. Taille, réalisme et encre se règlent avant l'export.",
      },
      pt: {
        q: "Quais fontes cursivas estão disponíveis?",
        a: "Duas: Cedarville Cursive para o dia a dia e Dancing Script para uma letra formal com laços. Tamanho, realismo e tinta são ajustáveis antes de exportar.",
      },
    },
  },
  {
    id: "cursive-trace",
    i18n: {
      en: {
        q: "Can I practice cursive by tracing the output?",
        a: "Yes — export the PDF, print it, and trace over the letters. Pair it with three-line handwriting paper for full worksheets; our beginner's guide walks through the method.",
      },
      zh: {
        q: "可以照着打印稿练字吗?",
        a: "可以——导出 PDF 打印后在字母上描摹,再配合三线格练字纸效果更好;入门教程里有完整方法。",
      },
      ja: {
        q: "印刷してなぞり書きの練習に使えますか?",
        a: "はい。PDF を書き出して印刷し、文字の上をなぞるだけ。3 線ノートと組み合わせれば本格的な練習シートになります。方法は初心者ガイドで解説しています。",
      },
      ko: {
        q: "출력물을 따라 쓰며 연습할 수 있나요?",
        a: "네 — PDF로 내보내 인쇄한 뒤 글자 위를 따라 쓰면 됩니다. 3선 용지와 함께 쓰면 완성형 연습장이 돼요. 방법은 입문 가이드에 자세히 나와 있습니다.",
      },
      es: {
        q: "¿Puedo practicar la cursiva calizando el resultado?",
        a: "Sí — exporta el PDF, imprímelo y calca las letras. Combínalo con papel de tres líneas para fichas completas; nuestra guía para principiantes explica el método.",
      },
      de: {
        q: "Kann ich die Schreibschrift per Nachspuren üben?",
        a: "Ja — PDF exportieren, ausdrucken und die Buchstaben nachspuren. Zusammen mit Dreilinien-Papier ergeben sich komplette Übungsblätter; die Anfängeranleitung erklärt die Methode.",
      },
      fr: {
        q: "Peut-on travailler la cursive en repassant sur le résultat ?",
        a: "Oui — exportez le PDF, imprimez-le et repassez sur les lettres. Associez-le au papier à trois lignes pour des fiches complètes ; notre guide débutant détaille la méthode.",
      },
      pt: {
        q: "Dá para praticar a cursiva contornando as letras?",
        a: "Sim — exporte o PDF, imprima e contorne as letras. Combine com papel de três linhas para fichas completas; o nosso guia para iniciantes explica o método.",
      },
    },
  },
  {
    id: "cursive-name",
    i18n: {
      en: {
        q: "Can I see my own name in cursive?",
        a: "Type your name in the text box and it renders instantly — handy for signature ideas or for comparing both fonts before you practice.",
      },
      zh: {
        q: "能看到自己名字的花体效果吗?",
        a: "在文本框输入名字即可实时预览——想设计签名或对比两种字体时很方便。",
      },
      ja: {
        q: "自分の名前を筆記体で見ることはできますか?",
        a: "テキストボックスに名前を入力するとすぐに表示されます。サインのアイデアや、練習前のフォント比較に便利です。",
      },
      ko: {
        q: "제 이름을 필기체로 볼 수 있나요?",
        a: "텍스트 상자에 이름을 입력하면 바로 표시됩니다 — 서명 아이디어를 얻거나 연습 전 두 글꼴을 비교할 때 유용해요.",
      },
      es: {
        q: "¿Puedo ver mi nombre en cursiva?",
        a: "Escribe tu nombre en el cuadro de texto y aparece al instante — útil para ideas de firma o para comparar las dos fuentes antes de practicar.",
      },
      de: {
        q: "Kann ich meinen eigenen Namen in Schreibschrift sehen?",
        a: "Tippe deinen Namen ins Textfeld — er erscheint sofort. Praktisch für Unterschrift-Ideen oder um beide Schriften vor dem Üben zu vergleichen.",
      },
      fr: {
        q: "Puis-je voir mon prénom en cursive ?",
        a: "Tapez votre prénom dans le champ de texte : il s'affiche instantanément — pratique pour des idées de signature ou pour comparer les deux polices avant de vous entraîner.",
      },
      pt: {
        q: "Posso ver o meu nome em cursiva?",
        a: "Digite o nome na caixa de texto e ele aparece na hora — útil para ideias de assinatura ou para comparar as duas fontes antes de praticar.",
      },
    },
  },
  {
    id: "cursive-voice",
    i18n: {
      en: {
        q: "Does voice input work for cursive too?",
        a: "It's the same editor: speak and the words render in cursive. Speech recognition works best in desktop Chrome / Edge; typing always works.",
      },
      zh: {
        q: "语音输入也能生成花体吗?",
        a: "用的是同一个编辑器:说话内容会以花体呈现。语音识别在桌面版 Chrome/Edge 效果最好,打字输入则不受限制。",
      },
      ja: {
        q: "音声入力でも筆記体になりますか?",
        a: "同じエディターを使います。話すとその言葉が筆記体で表示されます。音声認識はデスクトップ Chrome / Edge で最もよく動作し、文字入力はいつでも使えます。",
      },
      ko: {
        q: "음성 입력으로도 필기체를 쓸 수 있나요?",
        a: "같은 에디터예요: 말하면 그 단어가 필기체로 표시됩니다. 음성 인식은 데스크톱 Chrome / Edge에서 가장 잘 되고, 직접 입력은 언제든 가능해요.",
      },
      es: {
        q: "¿La entrada por voz también funciona para la cursiva?",
        a: "Es el mismo editor: habla y las palabras aparecen en cursiva. El reconocimiento de voz funciona mejor en Chrome / Edge de escritorio; escribir siempre funciona.",
      },
      de: {
        q: "Funktioniert Spracheingabe auch für Schreibschrift?",
        a: "Es ist derselbe Editor: Sprich, und die Wörter erscheinen in Schreibschrift. Die Spracherkennung funktioniert am besten in Desktop Chrome / Edge; Tippen geht immer.",
      },
      fr: {
        q: "La dictée vocale marche-t-elle aussi pour la cursive ?",
        a: "C'est le même éditeur : parlez, et les mots s'affichent en cursive. La reconnaissance vocale fonctionne mieux sur Chrome / Edge de bureau ; la saisie au clavier fonctionne toujours.",
      },
      pt: {
        q: "A entrada por voz também funciona para a cursiva?",
        a: "É o mesmo editor: fale e as palavras aparecem em cursiva. O reconhecimento de voz funciona melhor no Chrome / Edge de desktop; digitar sempre funciona.",
      },
    },
  },
];

/** /name-tracing 工具页 FAQ */
export const TRACING_FAQS: FaqItem[] = [
  {
    id: "tracing-free",
    i18n: {
      en: {
        q: "Is the name tracing generator free?",
        a: "Yes — unlimited worksheets, no account, no watermark. Everything renders in your browser and nothing you type is stored.",
      },
      zh: {
        q: "姓名描红生成器免费吗?",
        a: "免费——练习纸不限量、无需账号、无水印。全部在浏览器本地生成,输入的内容不会被保存。",
      },
      ja: {
        q: "名前のなぞり書きメーカーは無料ですか?",
        a: "はい——プリントは無制限、アカウント不要、透かしなし。すべてブラウザ内で生成され、入力した内容は保存されません。",
      },
      ko: {
        q: "이름 쓰기 연습 생성기는 무료인가요?",
        a: "네 — 연습장 무제한, 계정 불필요, 워터마크 없음. 모든 것이 브라우저에서 생성되며 입력한 내용은 저장되지 않아요.",
      },
      es: {
        q: "¿El generador de fichas para calcar nombres es gratis?",
        a: "Sí — fichas ilimitadas, sin cuenta y sin marca de agua. Todo se genera en tu navegador y nada de lo que escribes se guarda.",
      },
      de: {
        q: "Ist der Namens-Nachspur-Generator kostenlos?",
        a: "Ja — unbegrenzt viele Arbeitsblätter, kein Konto, kein Wasserzeichen. Alles wird in deinem Browser gerendert, und nichts von dem, was du tippst, wird gespeichert.",
      },
      fr: {
        q: "Le générateur de prénoms à repasser est-il gratuit ?",
        a: "Oui — des fiches illimitées, sans compte ni filigrane. Tout est généré dans votre navigateur et rien de ce que vous tapez n'est enregistré.",
      },
      pt: {
        q: "O gerador de nomes para caligrafia é grátis?",
        a: "Sim — fichas ilimitadas, sem conta e sem marca d'água. Tudo é gerado no seu navegador e nada do que você digita fica armazenado.",
      },
    },
  },
  {
    id: "tracing-dotted",
    i18n: {
      en: {
        q: "What do the tracing rows look like?",
        a: "Three styles. Dotted rows are dashed outlines. Outline rows are a faint copy of the letter. Blank lines have no letters and no start dots. None of them use numbered stroke arrows.",
      },
      zh: {
        q: "描红行长什么样?",
        a: "三种。虚线是整字的虚线轮廓。空心是浅色的字,可以照着描。只留横线没有字母,也没有落笔点。三种都没有编号笔顺箭头。",
      },
      ja: {
        q: "なぞり行はどんな見た目ですか?",
        a: "3種類です。点線は文字全体の破線、輪郭は薄い文字、罫線のみは文字も始点もありません。番号付きの筆順矢印はありません。",
      },
      ko: {
        q: "따라쓰기 행은 어떻게 보이나요?",
        a: "세 가지입니다. 점선은 글자 전체의 파선이고, 윤곽은 옅은 글자이며, 줄만에는 글자도 시작점도 없습니다. 번호가 있는 획순 화살표는 없습니다.",
      },
      es: {
        q: "¿Cómo se ven las filas para calcar?",
        a: "Hay tres estilos. Punteado es el contorno discontinuo. Contorno es una copia tenue de la letra. Solo líneas no lleva letras ni punto de inicio. Ninguno usa flechas de trazo numeradas.",
      },
      de: {
        q: "Wie sehen die Nachspurzeilen aus?",
        a: "Drei Varianten. Gepunktet ist der gestrichelte Umriss. Umriss ist eine blasse Kopie des Buchstabens. Nur Linien haben weder Buchstaben noch Startpunkt. Nummerierte Strichpfeile gibt es in keiner Variante.",
      },
      fr: {
        q: "À quoi ressemblent les lignes à repasser ?",
        a: "Trois styles. Pointillé : le contour en tirets. Contour : une copie pâle de la lettre. Lignes vides : ni lettre ni point de départ. Aucun style n'utilise de flèches de tracé numérotées.",
      },
      pt: {
        q: "Como são as linhas para calcar?",
        a: "Três estilos. Pontilhado é o contorno tracejado. Contorno é uma cópia clara da letra. Só as linhas não têm letras nem ponto de partida. Nenhum usa setas de traço numeradas.",
      },
    },
  },
  {
    id: "tracing-class",
    i18n: {
      en: {
        q: "Can I make worksheets for the whole class?",
        a: "Type one name per line. Each name gets a dark example row, then tracing rows in the style you chose: dotted, outline, or blank. Print one copy per student.",
      },
      zh: {
        q: "能给全班同学生成练习纸吗?",
        a: "每行输入一个姓名。每个名字先是深色示范行,再是你选的描红行:虚线、空心或只留横线。每位学生打印一份。",
      },
      ja: {
        q: "クラス全員分のプリントを作れますか?",
        a: "1行に1つの名前を入力します。各名前について濃いお手本行のあと、選んだスタイル(点線・輪郭・罫線のみ)のなぞり行が続きます。児童の数だけ印刷してください。",
      },
      ko: {
        q: "반 전체 학생 연습장을 만들 수 있나요?",
        a: "한 줄에 이름을 하나씩 입력하세요. 각 이름마다 진한 예시 행 다음에, 고른 스타일(점선, 윤곽, 줄만)의 연습 행이 이어집니다. 학생 수만큼 인쇄하세요.",
      },
      es: {
        q: "¿Puedo hacer fichas para toda la clase?",
        a: "Escribe un nombre por línea. Cada nombre lleva una fila de ejemplo oscura y luego filas del estilo elegido: punteado, contorno o solo líneas. Imprime una copia por alumno.",
      },
      de: {
        q: "Kann ich Arbeitsblätter für die ganze Klasse erstellen?",
        a: "Tippe pro Zeile einen Namen. Jeder Name bekommt eine dunkle Beispielzeile und danach Übungszeilen im gewählten Stil: gepunktet, Umriss oder nur Linien. Ein Ausdruck pro Kind.",
      },
      fr: {
        q: "Puis-je créer des fiches pour toute la classe ?",
        a: "Tapez un prénom par ligne. Chaque prénom a une ligne d'exemple foncée, puis des lignes dans le style choisi : pointillé, contour ou lignes vides. Imprimez une copie par élève.",
      },
      pt: {
        q: "Posso criar fichas para a turma inteira?",
        a: "Digite um nome por linha. Cada nome ganha uma linha de exemplo escura e depois linhas no estilo escolhido: pontilhado, contorno ou só as linhas. Imprima uma cópia por aluno.",
      },
    },
  },
  {
    id: "tracing-font",
    i18n: {
      en: {
        q: "Which font should I choose for preschoolers?",
        a: "Patrick Hand — clean print-style letterforms. Start with the tallest row height and shrink it as control improves.",
      },
      zh: {
        q: "学龄前孩子选什么字体?",
        a: "推荐 Patrick Hand——接近教材的印刷体风格。行高先调到最大,等控制力提升后再逐步调小。",
      },
      ja: {
        q: "未就学児にはどのフォントを選べばいいですか?",
        a: "Patrick Hand がおすすめ——教科書のようなすっきりした活字体です。行の高さは最大から始め、コツをつかんだら少しずつ狭めていきましょう。",
      },
      ko: {
        q: "미취학 아이에게는 어떤 글꼴을 고르나요?",
        a: "Patrick Hand — 깔끔한 인쇄체 스타일 글자예요. 행 높이는 가장 크게 시작하고, 쓰는 힘이 길러지면 점점 줄여 주세요.",
      },
      es: {
        q: "¿Qué fuente elijo para niños de preescolar?",
        a: "Patrick Hand — letras limpias estilo imprenta. Empieza con la altura de fila más alta y redúcela a medida que mejore el control.",
      },
      de: {
        q: "Welche Schrift soll ich für Vorschulkinder wählen?",
        a: "Patrick Hand — klare, druckschriftliche Buchstabenformen. Starte mit der größten Zeilenhöhe und verkleinere sie, je besser die Kontrolle wird.",
      },
      fr: {
        q: "Quelle police choisir pour les maternelles ?",
        a: "Patrick Hand — des lettres bâton propres, style imprimé. Commencez avec la hauteur de ligne maximale et réduisez-la à mesure que le contrôle s'améliore.",
      },
      pt: {
        q: "Qual fonte escolher para a pré-escola?",
        a: "Patrick Hand — letras limpas, estilo imprensa. Comece com a altura de linha máxima e reduza conforme o controle melhora.",
      },
    },
  },
  {
    id: "tracing-cursive",
    i18n: {
      en: {
        q: "Can I practice cursive names too?",
        a: "Yes — pick Dancing Script or Cedarville Cursive and the same three-line bands render the name in cursive for tracing.",
      },
      zh: {
        q: "也能练花体名字吗?",
        a: "可以——选择 Dancing Script 或 Cedarville Cursive,同样的三线格会以花体呈现名字供描红。",
      },
      ja: {
        q: "筆記体の名前も練習できますか?",
        a: "はい。Dancing Script か Cedarville Cursive を選ぶと、同じ 3 線ガイドに筆記体の名前が表示され、なぞり書きの練習ができます。",
      },
      ko: {
        q: "필기체 이름도 연습할 수 있나요?",
        a: "네 — Dancing Script나 Cedarville Cursive를 고르면 같은 3선 띠에 필기체 이름이 표시되어 따라 쓸 수 있어요.",
      },
      es: {
        q: "¿También puedo practicar nombres en cursiva?",
        a: "Sí — elige Dancing Script o Cedarville Cursive y las mismas bandas de tres líneas muestran el nombre en cursiva para calcar.",
      },
      de: {
        q: "Kann ich auch Schreibschrift-Namen üben?",
        a: "Ja — wähle Dancing Script oder Cedarville Cursive, und dieselben Dreilinien-Bänder geben den Namen in Schreibschrift zum Nachspuren wieder.",
      },
      fr: {
        q: "Peut-on aussi travailler les prénoms en cursive ?",
        a: "Oui — choisissez Dancing Script ou Cedarville Cursive et les mêmes bandes à trois lignes affichent le prénom en cursive à repasser.",
      },
      pt: {
        q: "Dá para praticar nomes em cursiva também?",
        a: "Sim — escolha Dancing Script ou Cedarville Cursive e as mesmas faixas de três linhas mostram o nome em cursiva para contornar.",
      },
    },
  },
];

/** /printable-paper 工具页 FAQ */
export const PAPER_FAQS: FaqItem[] = [
  {
    id: "paper-free",
    i18n: {
      en: {
        q: "Is the printable lined paper free?",
        a: "Yes — every type and size is free, with no signup and no watermark on the PDF.",
      },
      zh: {
        q: "可打印横线纸免费吗?",
        a: "免费——所有纸型和尺寸都免费,无需注册,PDF 无水印。",
      },
      ja: {
        q: "罫線プリント用紙は無料ですか?",
        a: "はい——すべての種類・サイズが無料。登録不要で、PDF に透かしも入りません。",
      },
      ko: {
        q: "인쇄용 줄 용지는 무료인가요?",
        a: "네 — 모든 종류와 크기가 무료이고, 가입도 없고 PDF에 워터마크도 없어요.",
      },
      es: {
        q: "¿El papel rayado imprimible es gratis?",
        a: "Sí — todos los tipos y tamaños son gratis, sin registro y sin marca de agua en el PDF.",
      },
      de: {
        q: "Ist das druckbare linierte Papier kostenlos?",
        a: "Ja — jede Art und Größe ist kostenlos, ohne Anmeldung und ohne Wasserzeichen im PDF.",
      },
      fr: {
        q: "Le papier ligné imprimable est-il gratuit ?",
        a: "Oui — tous les types et formats sont gratuits, sans inscription et sans filigrane dans le PDF.",
      },
      pt: {
        q: "O papel pautado para imprimir é grátis?",
        a: "Sim — todos os tipos e tamanhos são grátis, sem cadastro e sem marca d'água no PDF.",
      },
    },
  },
  {
    id: "paper-college-wide",
    i18n: {
      en: {
        q: "What's the difference between college ruled and wide ruled?",
        a: "College ruled lines are narrower (about 7mm), wide ruled wider (about 8.7mm). Younger writers usually get wide ruled; the spacing slider covers both and everything in between.",
      },
      zh: {
        q: "College ruled 和 wide ruled 有什么区别?",
        a: "College ruled 行距较窄(约 7mm),wide ruled 较宽(约 8.7mm)。低年级一般用宽行距;行距滑杆可以覆盖两种及之间的任意规格。",
      },
      ja: {
        q: "college ruled と wide ruled の違いは?",
        a: "college ruled は行間が狭め(約 7mm)、wide ruled は広め(約 8.7mm)です。低学年には wide ruled が一般的。行間スライダーで両方や中間の値も調整できます。",
      },
      ko: {
        q: "college ruled와 wide ruled의 차이는 무엇인가요?",
        a: "college ruled는 줄 간격이 좁고(약 7mm) wide ruled는 넓습니다(약 8.7mm). 어린아이에게는 보통 wide ruled를 써요. 간격 슬라이더로 두 스타일과 그 사이 모두 조절할 수 있습니다.",
      },
      es: {
        q: "¿Qué diferencia hay entre college ruled y wide ruled?",
        a: "Las líneas college ruled son más estrechas (unos 7 mm) y las wide ruled más anchas (unos 8,7 mm). Los más pequeños suelen usar wide ruled; el control de espaciado cubre ambas y todo lo intermedio.",
      },
      de: {
        q: "Was ist der Unterschied zwischen College Ruled und Wide Ruled?",
        a: "College-Ruled-Linien sind enger (ca. 7 mm), Wide Ruled weiter (ca. 8,7 mm). Jüngere Schreiber nehmen meist Wide Ruled; der Zeilenabstands-Regler deckt beides und alles dazwischen ab.",
      },
      fr: {
        q: "Quelle différence entre college ruled et wide ruled ?",
        a: "Les lignes college ruled sont plus serrées (environ 7 mm), les wide ruled plus larges (environ 8,7 mm). Les plus jeunes utilisent plutôt du wide ruled ; le curseur d'espacement couvre les deux et tous les intermédiaires.",
      },
      pt: {
        q: "Qual a diferença entre college ruled e wide ruled?",
        a: "As linhas college ruled são mais estreitas (cerca de 7 mm) e as wide ruled mais largas (cerca de 8,7 mm). As crianças menores geralmente usam wide ruled; o controle de espaçamento cobre os dois e tudo entre eles.",
      },
    },
  },
  {
    id: "paper-a4",
    i18n: {
      en: {
        q: "Does it work for A4 paper?",
        a: "Yes — toggle between US Letter (8.5×11\") and A4 before downloading.",
      },
      zh: {
        q: "支持 A4 纸吗?",
        a: "支持——下载前可在 US Letter(8.5×11 英寸)和 A4 之间切换。",
      },
      ja: {
        q: "A4 用紙にも対応していますか?",
        a: "はい。ダウンロード前に US Letter(8.5×11 インチ)と A4 を切り替えられます。",
      },
      ko: {
        q: "A4 용지에도 쓸 수 있나요?",
        a: "네 — 다운로드 전에 US Letter(8.5×11인치)와 A4를 전환할 수 있어요.",
      },
      es: {
        q: "¿Sirve para papel A4?",
        a: "Sí — cambia entre US Letter (8,5×11\") y A4 antes de descargar.",
      },
      de: {
        q: "Funktioniert es mit A4-Papier?",
        a: "Ja — schalte vor dem Download zwischen US Letter (8,5×11 Zoll) und A4 um.",
      },
      fr: {
        q: "Est-ce compatible avec le format A4 ?",
        a: "Oui — basculez entre US Letter (8,5×11″) et A4 avant de télécharger.",
      },
      pt: {
        q: "Funciona com papel A4?",
        a: "Sim — alterne entre US Letter (8,5×11\") e A4 antes de baixar.",
      },
    },
  },
  {
    id: "paper-color",
    i18n: {
      en: {
        q: "Can I change the line color?",
        a: "Yes — pick any color with the color picker; light gray is a popular low-contrast option for sensitive readers.",
      },
      zh: {
        q: "可以换线条颜色吗?",
        a: "可以——取色器任选颜色;浅灰色对比度低,适合对格线敏感的书写者。",
      },
      ja: {
        q: "線の色を変えられますか?",
        a: "はい。カラーピッカーで好きな色を選べます。薄いグレーはコントラストが低く、線が気になる方に人気です。",
      },
      ko: {
        q: "줄 색깔을 바꿀 수 있나요?",
        a: "네 — 색상 선택기로 원하는 색을 고르세요. 연한 회색은 대비가 낮아 선에 민감한 분들에게 인기가 많아요.",
      },
      es: {
        q: "¿Puedo cambiar el color de las líneas?",
        a: "Sí — elige cualquier color con el selector; el gris claro es una opción de bajo contraste muy popular para escritores sensibles.",
      },
      de: {
        q: "Kann ich die Linienfarbe ändern?",
        a: "Ja — wähle eine beliebige Farbe mit dem Farbwähler; Hellgrau ist wegen des geringen Kontrasts beliebt bei empfindlichen Schreibern.",
      },
      fr: {
        q: "Puis-je changer la couleur des lignes ?",
        a: "Oui — choisissez n'importe quelle couleur ; le gris clair est une option à faible contraste appréciée des scripteurs sensibles.",
      },
      pt: {
        q: "Posso mudar a cor das linhas?",
        a: "Sim — escolha qualquer cor no seletor; o cinza-claro é uma opção de baixo contraste popular entre quem se sensibiliza com as linhas.",
      },
    },
  },
  {
    id: "paper-margin",
    i18n: {
      en: {
        q: "Can I remove the red margin line?",
        a: "Yes — toggle it off for full-width pages, or keep it for the classic notebook look.",
      },
      zh: {
        q: "可以去掉红色边线吗?",
        a: "可以——关闭开关即得整页通栏,保留则是经典笔记本样式。",
      },
      ja: {
        q: "赤いマージン線を消せますか?",
        a: "はい。オフにすれば余白線のない全幅ページに、オンのままだと定番のノート風レイアウトになります。",
      },
      ko: {
        q: "빨간 여백 선을 없앨 수 있나요?",
        a: "네 — 끄면 여백 없이 전체 폭을 쓸 수 있고, 켜두면 클래식한 공책 느낌이 납니다.",
      },
      es: {
        q: "¿Puedo quitar la línea del margen roja?",
        a: "Sí — desactívala para páginas a todo el ancho, o déjala para el look clásico de cuaderno.",
      },
      de: {
        q: "Kann ich die rote Randlinie entfernen?",
        a: "Ja — schalte sie für randlose Seiten aus, oder lass sie für den klassischen Schulheft-Look aktiviert.",
      },
      fr: {
        q: "Puis-je supprimer la marge rouge ?",
        a: "Oui — désactivez-la pour des pages pleine largeur, ou gardez-la pour le look classique du cahier.",
      },
      pt: {
        q: "Posso remover a linha vermelha da margem?",
        a: "Sim — desligue-a para páginas de largura total, ou mantenha-a para o visual clássico de caderno.",
      },
    },
  },
];

/** 站点 FAQ(8 语言;新问题:加一个 item 并补齐各语言) */
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "speech-not-working",
    i18n: {
      en: {
        q: "Speech recognition doesn't respond — what should I check?",
        a: "Use desktop Chrome / Edge, allow microphone access (the icon left of the address bar) and check your system microphone. On unsupported browsers, type directly into the text box.",
      },
      zh: {
        q: "语音识别没有反应怎么办?",
        a: "使用桌面版 Chrome / Edge,允许麦克风权限(地址栏左侧图标),并确认系统麦克风可用。其他浏览器请直接在文本框输入。",
      },
      ja: {
        q: "音声認識が反応しない場合は?",
        a: "デスクトップ版 Chrome / Edge を使い、マイクを許可し(アドレスバー左のアイコン)、システムのマイク設定を確認してください。その他のブラウザでは直接入力できます。",
      },
      ko: {
        q: "음성 인식이 반응하지 않으면?",
        a: "데스크톱 Chrome / Edge를 사용하고, 마이크 권한을 허용하며(주소창 왼쪽 아이콘), 시스템 마이크를 확인하세요. 다른 브라우저에서는 직접 입력할 수 있어요.",
      },
      es: {
        q: "El reconocimiento de voz no responde, ¿qué reviso?",
        a: "Usa Chrome / Edge de escritorio, permite el micrófono (icono a la izquierda de la barra de direcciones) y revisa el micrófono del sistema. En otros navegadores, escribe directamente.",
      },
      de: {
        q: "Die Spracherkennung reagiert nicht — was prüfen?",
        a: "Nutze Desktop Chrome / Edge, erlaube das Mikrofon (Symbol links in der Adressleiste) und prüfe das Systemmikrofon. In anderen Browsern kannst du direkt tippen.",
      },
      fr: {
        q: "La reconnaissance vocale ne répond pas — que vérifier ?",
        a: "Utilisez Chrome / Edge de bureau, autorisez le micro (icône à gauche de la barre d'adresse) et vérifiez le micro système. Sur d'autres navigateurs, tapez directement.",
      },
      pt: {
        q: "O reconhecimento de voz não responde — o que verificar?",
        a: "Use Chrome / Edge de desktop, permita o microfone (ícone à esquerda da barra de endereços) e verifique o micro do sistema. Em outros navegadores, digite diretamente.",
      },
    },
  },
  {
    id: "text-errors",
    i18n: {
      en: {
        q: "The transcription has mistakes — can I fix them?",
        a: "Yes. Edit the text box: the handwriting on the paper updates in real time.",
      },
      zh: {
        q: "识别出来的文字有错怎么办?",
        a: "直接在文本框修改即可,纸张上的手写效果会实时更新。",
      },
      ja: {
        q: "文字起こしに誤りがある場合は?",
        a: "左のテキスト欄で直接修正できます。用紙の手書き表示はリアルタイムに更新されます。",
      },
      ko: {
        q: "인식된 텍스트에 오류가 있나요?",
        a: "왼쪽 텍스트 상자에서 바로 수정하세요. 용지의 손글씨가 실시간으로 업데이트됩니다.",
      },
      es: {
        q: "La transcripción tiene errores, ¿se pueden corregir?",
        a: "Sí. Edita el cuadro de texto: la escritura en el papel se actualiza en tiempo real.",
      },
      de: {
        q: "Die Transkription hat Fehler — korrigierbar?",
        a: "Ja. Bearbeite das Textfeld: Die Handschrift auf dem Papier aktualisiert sich in Echtzeit.",
      },
      fr: {
        q: "La transcription contient des erreurs — puis-je les corriger ?",
        a: "Oui. Modifiez le champ de texte : l'écriture sur le papier se met à jour en temps réel.",
      },
      pt: {
        q: "A transcrição tem erros — dá para corrigir?",
        a: "Sim. Edite a caixa de texto: a escrita no papel atualiza em tempo real.",
      },
    },
  },
  {
    id: "make-card",
    i18n: {
      en: {
        q: "How do I make a handwritten greeting card?",
        a: "Speak or type your message, pick a font, paper and ink, then export as PNG or PDF — under 3 minutes. The template library gives you ready-made copy for common occasions.",
      },
      zh: {
        q: "手写贺卡怎么制作?",
        a: "说话或打字输入内容,选好字体、纸张和墨色,导出 PNG 或 PDF——全程不到 3 分钟。常见场景可以直接用模板库的现成文案。",
      },
      ja: {
        q: "手書きグリーティングカードの作り方は?",
        a: "話すか入力して、フォント・用紙・インクを選び、PNG か PDF で書き出すだけ。3 分もかかりません。定番シーンはテンプレート庫を活用してください。",
      },
      ko: {
        q: "손글씨 카드는 어떻게 만드나요?",
        a: "말하거나 입력하고, 글꼴·용지·잉크를 고른 뒤 PNG 또는 PDF로 내보내세요. 3분이면 충분해요. 흔한 상황은 템플릿의 문구를 바로 쓸 수 있어요.",
      },
      es: {
        q: "¿Cómo hago una tarjeta manuscrita?",
        a: "Habla o escribe tu mensaje, elige fuente, papel y tinta, y exporta en PNG o PDF — en menos de 3 minutos. La biblioteca de plantillas tiene textos listos.",
      },
      de: {
        q: "Wie erstelle ich eine handgeschriebene Grußkarte?",
        a: "Sprich oder tippe deinen Text, wähle Schrift, Papier und Tinte und exportiere als PNG oder PDF — in unter 3 Minuten. Die Vorlagen-Bibliothek liefert fertige Texte.",
      },
      fr: {
        q: "Comment faire une carte manuscrite ?",
        a: "Dictez ou tapez votre message, choisissez police, papier et encre, puis exportez en PNG ou PDF — en moins de 3 minutes. La bibliothèque de modèles fournit des textes prêts à l'emploi.",
      },
      pt: {
        q: "Como faço um cartão manuscrito?",
        a: "Fale ou digite sua mensagem, escolha fonte, papel e tinta, e exporte em PNG ou PDF — em menos de 3 minutos. A biblioteca de modelos tem textos prontos.",
      },
    },
  },
  {
    id: "commercial-use",
    i18n: {
      en: {
        q: "Can I use the generated images commercially?",
        a: "Yes — generated images belong to you. Fonts are open source under SIL OFL. One limit: don't impersonate another person's handwriting (see Terms).",
      },
      zh: {
        q: "生成的图片可以商用吗?",
        a: "可以。生成图片的权利归你,字体为 SIL OFL 开源授权,商用无忧。唯一限制:不得冒充他人笔迹(见使用条款)。",
      },
      ja: {
        q: "生成画像は商用利用できますか?",
        a: "できます。生成画像の権利はあなたにあり、フォントは SIL OFL のオープンソースです。ただし他人の筆跡への偽装は禁止(利用規約参照)。",
      },
      ko: {
        q: "생성 이미지를 상업적으로 쓸 수 있나요?",
        a: "네, 생성된 이미지의 권리는 사용자에게 있고 글꼴은 SIL OFL 오픈소스입니다. 단, 타인의 필체를 사칭하는 것은 금지됩니다(이용약관 참고).",
      },
      es: {
        q: "¿Puedo usar las imágenes generadas comercialmente?",
        a: "Sí — las imágenes generadas te pertenecen. Las fuentes son open source bajo SIL OFL. Un límite: no suplantes la letra de otra persona (ver Términos).",
      },
      de: {
        q: "Darf ich die erzeugten Bilder kommerziell nutzen?",
        a: "Ja — die erzeugten Bilder gehören dir. Die Schriften sind Open Source unter SIL OFL. Eine Grenze: nicht die Handschrift anderer imitieren (siehe Nutzungsbedingungen).",
      },
      fr: {
        q: "Puis-je utiliser les images générées commercialement ?",
        a: "Oui — les images générées vous appartiennent. Les polices sont open source sous SIL OFL. Une limite : n'imitez pas l'écriture d'autrui (voir les conditions).",
      },
      pt: {
        q: "Posso usar as imagens geradas comercialmente?",
        a: "Sim — as imagens geradas pertencem a você. As fontes são open source sob SIL OFL. Um limite: não finja ser a letra de outra pessoa (veja os Termos).",
      },
    },
  },
  {
    id: "audio-free",
    i18n: {
      en: {
        q: "Is audio-file transcription really free?",
        a: "Yes. Transcription runs in your browser with an open-source Whisper model — no account, no minute caps. The model downloads once (~80MB) and works offline afterwards.",
      },
      zh: {
        q: "录音转文字真的免费吗?",
        a: "免费。转写在你的浏览器本地用开源 Whisper 模型完成——无需账号、没有时长限制。模型首次下载一次(约 80MB),之后离线可用。",
      },
      ja: {
        q: "音声ファイルの文字起こしは本当に無料?",
        a: "無料です。ブラウザ内のオープンソース Whisper モデルで処理され、アカウントも時間制限もありません。モデルは初回のみダウンロード(約 80MB)、以後オフラインで使えます。",
      },
      ko: {
        q: "오디오 파일 변환도 정말 무료인가요?",
        a: "네. 브라우저 안에서 오픈소스 Whisper 모델로 처리됩니다 — 계정도, 시간 제한도 없어요. 모델은 한 번만 다운로드(약 80MB)하면 이후 오프라인으로 사용할 수 있습니다.",
      },
      es: {
        q: "¿La transcripción de audio es realmente gratis?",
        a: "Sí. La transcripción ocurre en tu navegador con un modelo Whisper open source — sin cuenta ni límites de minutos. El modelo se descarga una vez (~80MB) y luego funciona sin conexión.",
      },
      de: {
        q: "Ist die Audio-Transkription wirklich kostenlos?",
        a: "Ja. Die Transkription läuft in deinem Browser mit einem Open-Source-Whisper-Modell — kein Konto, keine Minutenlimits. Das Modell lädt einmal (~80MB) und arbeitet danach offline.",
      },
      fr: {
        q: "La transcription audio est-elle vraiment gratuite ?",
        a: "Oui. La transcription tourne dans votre navigateur avec un modèle Whisper open source — sans compte ni limite de minutes. Le modèle se télécharge une fois (~80 Mo) puis fonctionne hors ligne.",
      },
      pt: {
        q: "A transcrição de áudio é realmente grátis?",
        a: "Sim. A transcrição roda no seu navegador com um modelo Whisper open source — sem conta e sem limite de minutos. O modelo é baixado uma vez (~80MB) e depois funciona offline.",
      },
    },
  },
  {
    id: "audio-formats",
    i18n: {
      en: {
        q: "Which audio formats are supported?",
        a: "Anything your browser can decode: mp3, wav, m4a, ogg, webm, flac. Safari's decoding is incomplete for some codecs — desktop Chrome / Edge recommended.",
      },
      zh: {
        q: "支持哪些音频格式?",
        a: "浏览器能解码的都可以:mp3、wav、m4a、ogg、webm、flac。Safari 对部分编码解码不全,推荐桌面版 Chrome / Edge 上传。",
      },
      ja: {
        q: "対応する音声フォーマットは?",
        a: "ブラウザでデコードできる形式なら OK:mp3、wav、m4a、ogg、webm、flac。Safari は一部コーデックの対応が不完全なため、デスクトップ Chrome / Edge を推奨します。",
      },
      ko: {
        q: "지원되는 오디오 형식은?",
        a: "브라우저가 디코딩할 수 있는 형식이면 됩니다: mp3, wav, m4a, ogg, webm, flac. Safari는 일부 코덱 지원이 불완전해 데스크톱 Chrome / Edge를 권장해요.",
      },
      es: {
        q: "¿Qué formatos de audio están soportados?",
        a: "Todo lo que tu navegador pueda decodificar: mp3, wav, m4a, ogg, webm, flac. Safari no decodifica algunos códecs — recomendamos Chrome / Edge de escritorio.",
      },
      de: {
        q: "Welche Audioformate werden unterstützt?",
        a: "Alles, was dein Browser dekodieren kann: mp3, wav, m4a, ogg, webm, flac. Safari dekodiert einige Codecs nicht vollständig — Desktop Chrome / Edge empfohlen.",
      },
      fr: {
        q: "Quels formats audio sont pris en charge ?",
        a: "Tout ce que votre navigateur peut décoder : mp3, wav, m4a, ogg, webm, flac. Safari ne décode pas certains codecs — Chrome / Edge de bureau recommandé.",
      },
      pt: {
        q: "Quais formatos de áudio são suportados?",
        a: "Tudo o que seu navegador puder decodificar: mp3, wav, m4a, ogg, webm, flac. O Safari não decodifica alguns codecs — recomendamos Chrome / Edge de desktop.",
      },
    },
  },
  {
    id: "same-handwriting",
    i18n: {
      en: {
        q: "Will every export look identical?",
        a: "You control it: \"Shuffle strokes\" re-generates the writing-style fingerprint (slant, baseline wave, size rhythm, darkness), realism sets how messy it looks, and your preferences are remembered locally.",
      },
      zh: {
        q: "每次导出的手写效果会一样吗?",
        a: "由你控制:「换一种笔迹」会重新生成书写习惯指纹(倾斜、基线波浪、大小节奏、墨色深浅),仿真度决定潦草程度,你的偏好也会本地记忆。",
      },
      ja: {
        q: "書き出すたびに同じ見た目になりますか?",
        a: "自分でコントロールできます:「筆跡を変える」で傾き・波・サイズ・濃さのスタイルが再生成され、リアリティで崩れ具合を調整。設定はローカルに記憶されます。",
      },
      ko: {
        q: "내보낼 때마다 똑같이 보이나요?",
        a: "직접 조절할 수 있어요: \"필적 바꾸기\"를 누르면 기울기·물결·크기·농도의 스타일이 새로 생성되고, 리얼리즘으로 정도를 조절합니다. 설정은 로컬에 저장돼요.",
      },
      es: {
        q: "¿Cada exportación se ve idéntica?",
        a: "Tú lo controlas: \"Cambiar trazo\" regenera la huella de estilo (inclinación, ondulación, tamaño, oscuridad), el realismo ajusta el desorden y tus preferencias se recuerdan localmente.",
      },
      de: {
        q: "Sieht jeder Export identisch aus?",
        a: "Du steuerst es: „Handschrift ändern“ erzeugt einen neuen Stil-Fingerprint (Neigung, Wellenlinie, Größenrhythmus, Tiefenschwärze), der Realismus regelt die Ungleichmäßigkeit — Einstellungen werden lokal gemerkt.",
      },
      fr: {
        q: "Chaque export sera-t-il identique ?",
        a: "Vous contrôlez : « Changer d'écriture » régénère l'empreinte du style (inclinaison, ondulation, rythme, densité), le réalisme règle le désordre et vos préférences sont mémorisées localement.",
      },
      pt: {
        q: "Cada exportação fica idêntica?",
        a: "Você controla: \"Trocar a letra\" regenera a impressão do estilo (inclinação, ondulação, ritmo, intensidade), o realismo ajusta a bagunça e suas preferências ficam salvas localmente.",
      },
    },
  },
];

/** /word-work 拼写练习页 FAQ(8 语言) */
export const WORDWORK_FAQS: FaqItem[] = [
  {
    id: "wordwork-free",
    i18n: {
      en: {
        q: "Is the word work generator free?",
        a: "Yes — unlimited worksheets, no signup, no watermark. Everything is generated in your browser and your word list is never uploaded.",
      },
      zh: {
        q: "拼写练习生成器免费吗?",
        a: "免费——练习页不限量、无需注册、无水印。全部在浏览器本地生成,单词清单不会上传。",
      },
      ja: {
        q: "ワーワーク(単語練習)メーカーは無料ですか?",
        a: "はい——プリントは無制限、登録不要、透かしなし。すべてブラウザ内で生成され、単語リストがアップロードされることはありません。",
      },
      ko: {
        q: "단어 연습 생성기는 무료인가요?",
        a: "네 — 연습장 무제한, 가입 불필요, 워터마크 없음. 모든 것이 브라우저에서 생성되며 단어 목록은 절대 업로드되지 않아요.",
      },
      es: {
        q: "¿El generador de actividades de palabras es gratis?",
        a: "Sí — fichas ilimitadas, sin registro ni marca de agua. Todo se genera en tu navegador y tu lista de palabras nunca se sube.",
      },
      de: {
        q: "Ist der Word-Work-Generator kostenlos?",
        a: "Ja — unbegrenzt viele Arbeitsblätter, keine Anmeldung, kein Wasserzeichen. Alles wird in deinem Browser erzeugt, und deine Wortliste wird nie hochgeladen.",
      },
      fr: {
        q: "Le générateur d'activités de mots est-il gratuit ?",
        a: "Oui — fiches illimitées, sans inscription ni filigrane. Tout est généré dans votre navigateur et votre liste de mots n'est jamais envoyée.",
      },
      pt: {
        q: "O gerador de atividades com palavras é grátis?",
        a: "Sim — fichas ilimitadas, sem cadastro e sem marca d'água. Tudo é gerado no seu navegador e a sua lista de palavras nunca é enviada.",
      },
    },
  },
  {
    id: "wordwork-activities",
    i18n: {
      en: {
        q: "What activities does it generate?",
        a: "Two per sheet: write each word three times (optionally with a traceable first copy) and a fill-in-the-missing-letter puzzle built from the same list.",
      },
      zh: {
        q: "会生成哪些练习?",
        a: "每页两种:每个单词写三遍(可选第一份为描红),以及用同一份清单生成的补全缺失字母练习。",
      },
      ja: {
        q: "どのような練習が生成されますか?",
        a: "1 枚に 2 種類:各単語を 3 回ずつ書く(最初の 1 回をなぞり書きにするのも可能)、および同じリストから作る「抜けている文字を入れよう」パズルです。",
      },
      ko: {
        q: "어떤 활동이 생성되나요?",
        a: "시트당 두 가지예요: 각 단어를 세 번씩 쓰기(첫 번째는 따라 쓰기로 할 수 있음)와 같은 단어 목록으로 만든 빠진 글자 채우기 퍼즐.",
      },
      es: {
        q: "¿Qué actividades genera?",
        a: "Dos por ficha: escribir cada palabra tres veces (con la primera copia calcable, opcional) y un puzzle de completar la letra que falta creado con la misma lista.",
      },
      de: {
        q: "Welche Übungen erzeugt es?",
        a: "Zwei pro Blatt: Jedes Wort dreimal schreiben (optional mit einer nachspurbaren ersten Kopie) plus ein Lückenrätsel mit fehlenden Buchstaben aus derselben Liste.",
      },
      fr: {
        q: "Quelles activités génère-t-il ?",
        a: "Deux par fiche : écrire chaque mot trois fois (première copie à repasser en option) et un jeu de lettres manquantes construit à partir de la même liste.",
      },
      pt: {
        q: "Que atividades ele gera?",
        a: "Duas por ficha: escrever cada palavra três vezes (opcionalmente com a primeira cópia para calcar) e um quebra-cabeça de completar a letra que falta com a mesma lista.",
      },
    },
  },
  {
    id: "wordwork-deterministic",
    i18n: {
      en: {
        q: "Are the worksheets the same every time for the same list?",
        a: "Yes — the generator is deterministic, so Monday's preview matches Friday's printout. No AI surprises or garbled words: what you paste is exactly what prints.",
      },
      zh: {
        q: "同一份清单生成的内容固定吗?",
        a: "固定——生成器是确定性的,周一预览的和周五打印的完全一致。没有 AI 随机出错,粘贴什么就打印什么。",
      },
      ja: {
        q: "同じリストなら毎回同じプリントになりますか?",
        a: "はい。生成は決定論的で、月曜のプレビューと金曜の印刷物が完全に一致します。AI の暴走や文字化けもなく、貼り付けた内容がそのまま印刷されます。",
      },
      ko: {
        q: "같은 목록이면 매번 같은 연습장이 나오나요?",
        a: "네 — 생성기는 결정론적이라 월요일 미리보기와 금요일 인쇄물이 완전히 같아요. AI 오류나 깨진 글자도 없이, 붙여넣은 그대로 인쇄됩니다.",
      },
      es: {
        q: "¿Las fichas son siempre iguales para la misma lista?",
        a: "Sí — el generador es determinista: la vista previa del lunes coincide con la impresión del viernes. Sin sorpresas de IA ni palabras corruptas: lo que pegas es exactamente lo que se imprime.",
      },
      de: {
        q: "Sind die Arbeitsblätter bei gleicher Liste immer gleich?",
        a: "Ja — der Generator ist deterministisch: Die Vorschau von Montag entspricht dem Ausdruck von Freitag. Keine KI-Überraschungen oder verhunzten Wörter — was du einfügst, wird genau so gedruckt.",
      },
      fr: {
        q: "Les fiches sont-elles identiques à chaque fois pour la même liste ?",
        a: "Oui — le générateur est déterministe : l'aperçu de lundi correspond à l'impression de vendredi. Aucune surprise d'IA ni mot déformé : ce que vous collez est exactement ce qui s'imprime.",
      },
      pt: {
        q: "As fichas são sempre iguais para a mesma lista?",
        a: "Sim — o gerador é determinístico: a prévia de segunda-feira é igual à impressão de sexta-feira. Sem surpresas de IA nem palavras embaralhadas: o que você cola é exatamente o que sai impresso.",
      },
    },
  },
  {
    id: "wordwork-words",
    i18n: {
      en: {
        q: "Which words can I use?",
        a: "Any list: weekly spelling words, sight words, vocabulary — one word per line. Keep it to a dozen or so per sheet so the writing rows stay comfortable.",
      },
      zh: {
        q: "可以用哪些单词?",
        a: "任意清单:每周拼写词、高频词、生词——每行一个。每页建议控制在十来个以内,保证书写行距舒适。",
      },
      ja: {
        q: "どんな単語が使えますか?",
        a: "リストは自由です:今週のスペリング単語、サイトワード、語彙など——1 行に 1 語。1 枚あたり 10 語ほどにすると、書く行がゆったり収まります。",
      },
      ko: {
        q: "어떤 단어를 쓸 수 있나요?",
        a: "목록은 자유예요: 이번 주 받아쓰기 단어, 사이트워드, 어휘 등 — 한 줄에 한 단어씩. 시트당 열 개 정도로 유지하면 쓰는 줄이 편안합니다.",
      },
      es: {
        q: "¿Qué palabras puedo usar?",
        a: "Cualquier lista: palabras de dictado semanales, sight words, vocabulario — una palabra por línea. Mantén una docena aprox. por ficha para que las líneas de escritura queden cómodas.",
      },
      de: {
        q: "Welche Wörter kann ich verwenden?",
        a: "Beliebige Listen: Wochen-Diktatwörter, Grundwortschatz, Vokabeln — ein Wort pro Zeile. Halte es bei etwa einem Dutzend pro Blatt, damit die Schreibzeilen angenehm bleiben.",
      },
      fr: {
        q: "Quels mots puis-je utiliser ?",
        a: "N'importe quelle liste : mots de dictée de la semaine, mots courants, vocabulaire — un mot par ligne. Limite-toi à une douzaine par fiche pour que les lignes d'écriture restent confortables.",
      },
      pt: {
        q: "Quais palavras posso usar?",
        a: "Qualquer lista: palavras de ditado da semana, sight words, vocabulário — uma palavra por linha. Mantenha cerca de uma dúzia por ficha para que as linhas de escrita fiquem confortáveis.",
      },
    },
  },
];

/** /writing-practice CJK 练字帖页 FAQ(8 语言) */
export const WRITING_FAQS: FaqItem[] = [
  {
    id: "writing-grids",
    i18n: {
      en: {
        q: "Which practice grids are supported?",
        a: "Tianzige (田字格) for Chinese, genkōyoshi (原稿用紙) for Japanese and wongoji (원고지) for Korean — the grid switches with the script you choose, and cell size is adjustable.",
      },
      zh: {
        q: "支持哪些练习格?",
        a: "中文田字格、日文原稿用紙、韩文原稿纸——格子随所选文字自动切换,格径大小可调。",
      },
      ja: {
        q: "どの練習マスに対応していますか?",
        a: "中国語の田字格、日本語の原稿用紙、韓国語の원고지に対応。選択した文字に合わせてマスが切り替わり、マスのサイズも調整できます。",
      },
      ko: {
        q: "어떤 연습 격자를 지원하나요?",
        a: "중국어 톈쯔거(田字格), 일본어 원고지(原稿用紙), 한국어 원고지를 지원합니다 — 선택한 문자에 따라 격자가 바뀌고 칸 크기도 조절할 수 있어요.",
      },
      es: {
        q: "¿Qué cuadrículas de práctica admite?",
        a: "Tianzige (田字格) para chino, genkōyoshi (原稿用紙) para japonés y wongoji (원고지) para coreano — la cuadrícula cambia según la escritura elegida, y el tamaño de celda es ajustable.",
      },
      de: {
        q: "Welche Übungsraster werden unterstützt?",
        a: "Tianzige (田字格) für Chinesisch, Genkōyoshi (原稿用紙) für Japanisch und Wongoji (원고지) für Koreanisch — das Raster wechselt mit der gewählten Schrift, und die Zellengröße ist einstellbar.",
      },
      fr: {
        q: "Quelles grilles d'entraînement sont prises en charge ?",
        a: "Tianzige (田字格) pour le chinois, genkōyoshi (原稿用紙) pour le japonais et wongoji (원고지) pour le coréen — la grille change selon l'écriture choisie, et la taille des cases est réglable.",
      },
      pt: {
        q: "Quais grades de prática são suportadas?",
        a: "Tianzige (田字格) para chinês, genkōyoshi (原稿用紙) para japonês e wongoji (원고지) para coreano — a grade muda conforme a escrita escolhida, e o tamanho da célula é ajustável.",
      },
    },
  },
  {
    id: "writing-fonts",
    i18n: {
      en: {
        q: "Which handwriting fonts can I choose?",
        a: "Bundled CJK handwriting fonts such as LXGW WenKai for Chinese, Klee One for Japanese and Nanum Pen for Korean, plus more playful styles — switch any time before you print.",
      },
      zh: {
        q: "有哪些手写字体可选?",
        a: "内置霞鹜文楷(中文)、Klee One(日文)、Nanum Pen(韩文)等 CJK 手写字体,还有更多可爱风格,打印前可随时切换。",
      },
      ja: {
        q: "どんな手書きフォントを選べますか?",
        a: "中国語の LXGW 文楷、日本語の Klee One、韓国語の Nanum Pen といった CJK 手書きフォントを同梱。ポップな書体もあり、印刷前にいつでも切り替えられます。",
      },
      ko: {
        q: "어떤 손글씨 글꼴을 고를 수 있나요?",
        a: "중국어용 LXGW WenKai, 일본어용 Klee One, 한국어용 Nanum Pen 같은 CJK 손글씨 글꼴이 기본 제공되고, 귀여운 스타일도 있어요 — 인쇄 전 언제든 바꿀 수 있습니다.",
      },
      es: {
        q: "¿Qué fuentes manuscritas puedo elegir?",
        a: "Fuentes CJK manuscritas incluidas como LXGW WenKai para chino, Klee One para japonés y Nanum Pen para coreano, además de estilos más divertidos — cambia cuando quieras antes de imprimir.",
      },
      de: {
        q: "Welche Handschrift-Fonts kann ich wählen?",
        a: "Enthaltene CJK-Handschriften wie LXGW WenKai für Chinesisch, Klee One für Japanisch und Nanum Pen für Koreanisch, dazu weitere verspielte Stile — vor dem Drucken jederzeit wechselbar.",
      },
      fr: {
        q: "Quelles polices manuscrites puis-je choisir ?",
        a: "Des polices manuscrites CJK intégrées comme LXGW WenKai pour le chinois, Klee One pour le japonais et Nanum Pen pour le coréen, plus des styles plus ludiques — changez à tout moment avant d'imprimer.",
      },
      pt: {
        q: "Quais fontes manuscritas posso escolher?",
        a: "Fontes manuscritas CJK incluídas como LXGW WenKai para chinês, Klee One para japonês e Nanum Pen para coreano, além de estilos mais divertidos — troque quando quiser antes de imprimir.",
      },
    },
  },
  {
    id: "writing-modes",
    i18n: {
      en: {
        q: "Can my child trace, copy or write independently?",
        a: "Three fill modes: light traceable characters, solid dark model characters, or blank cells with just the grid — start with tracing and fade it out as confidence grows.",
      },
      zh: {
        q: "孩子可以描红、临写还是独立书写?",
        a: "三种填充模式:浅色描红字、深色示范字、纯空白格——建议从描红开始,随着熟练度提升逐步过渡到独立书写。",
      },
      ja: {
        q: "子どもはなぞり書き・書き写し・自力書きのどれができますか?",
        a: "3 つのモードがあります:薄いなぞり文字、濃いお手本文字、マスだけの空白パターン。まずはなぞり書きから始めて、慣れてきたら段階的に自力書きへ移行しましょう。",
      },
      ko: {
        q: "아이가 따라 쓰기, 베껴 쓰기, 독립 쓰기를 모두 할 수 있나요?",
        a: "세 가지 채우기 모드가 있어요: 옅은 따라 쓰기 글자, 진한 모범 글자, 격자만 있는 빈 칸 — 따라 쓰기로 시작하고 자신감이 생기면 점차 줄여 주세요.",
      },
      es: {
        q: "¿Mi hijo puede calcar, copiar o escribir de forma independiente?",
        a: "Tres modos de relleno: caracteres claros para calcar, caracteres modelo oscuros o celdas vacías con solo la cuadrícula — empieza calcando y redúcelo según gane confianza.",
      },
      de: {
        q: "Kann mein Kind nachspuren, abschreiben oder frei schreiben?",
        a: "Drei Füllmodi: helle nachspurbare Zeichen, dunkle Vorlagezeichen oder leere Zellen nur mit Raster — starte mit Nachspuren und blende es aus, wenn das Selbstvertrauen wächst.",
      },
      fr: {
        q: "Mon enfant peut-il repasser, copier ou écrire en autonomie ?",
        a: "Trois modes de remplissage : caractères clairs à repasser, caractères modèles foncés ou cases vides avec seulement la grille — commencez par le repassage et estompez-le à mesure que la confiance grandit.",
      },
      pt: {
        q: "Meu filho pode calcar, copiar ou escrever de forma independente?",
        a: "Três modos de preenchimento: caracteres claros para calcar, caracteres-modelo escuros ou células vazias com apenas a grade — comece calcando e reduza conforme a confiança cresce.",
      },
    },
  },
  {
    id: "writing-free",
    i18n: {
      en: {
        q: "Is it free, and does my text stay private?",
        a: "Yes — free PDF downloads with no watermark, and your practice text never leaves the browser.",
      },
      zh: {
        q: "免费吗?练习文字会上传吗?",
        a: "免费——PDF 不限次下载、无水印,输入的练习文字不会离开浏览器。",
      },
      ja: {
        q: "無料ですか?練習テキストは安全ですか?",
        a: "はい——PDF は透かしなしで無料ダウンロードでき、入力した練習テキストがブラウザの外に出ることはありません。",
      },
      ko: {
        q: "무료인가요? 연습 텍스트는 안전한가요?",
        a: "네 — PDF는 워터마크 없이 무료 다운로드되고, 연습 텍스트는 절대 브라우저 밖으로 나가지 않아요.",
      },
      es: {
        q: "¿Es gratis y mi texto se mantiene privado?",
        a: "Sí — descargas de PDF gratis sin marca de agua, y tu texto de práctica nunca sale del navegador.",
      },
      de: {
        q: "Ist es kostenlos und bleiben meine Texte privat?",
        a: "Ja — kostenlose PDF-Downloads ohne Wasserzeichen, und dein Übungstext verlässt den Browser nie.",
      },
      fr: {
        q: "Est-ce gratuit et mes textes restent-ils privés ?",
        a: "Oui — téléchargements PDF gratuits sans filigrane, et votre texte d'entraînement ne quitte jamais le navigateur.",
      },
      pt: {
        q: "É grátis e meu texto fica privado?",
        a: "Sim — downloads de PDF grátis sem marca d'água, e o seu texto de prática nunca sai do navegador.",
      },
    },
  },
];

/** /name-coloring 名字涂色页 FAQ(8 语言) */
export const COLORING_FAQS: FaqItem[] = [
  {
    id: "coloring-free",
    i18n: {
      en: {
        q: "Is the name coloring page generator free?",
        a: "Yes — unlimited pages, no signup. A small site watermark is on by default and can be turned off with the switch above the download buttons. PDF and PNG downloads are free for home and classroom use.",
      },
      zh: {
        q: "名字涂色页生成器免费吗?",
        a: "免费——页数不限、无需注册。页脚默认有一行站点水印,下载按钮上方的开关可以关掉。PDF 和 PNG 下载免费,家庭和课堂都能用。",
      },
      ja: {
        q: "名前ぬりえメーカーは無料ですか?",
        a: "はい——ページは無制限、登録不要です。ページ下部にサイト名の透かしが初期状態で入り、ダウンロードボタン上のスイッチで消せます。PDF と PNG のダウンロードは無料で、家庭でも学校でも使えます。",
      },
      ko: {
        q: "이름 색칠 페이지 생성기는 무료인가요?",
        a: "네 — 페이지 무제한, 가입 불필요. 페이지 아래에 사이트 워터마크가 기본으로 들어가며, 다운로드 버튼 위의 스위치로 끌 수 있어요. PDF와 PNG 다운로드는 무료로 집에서도 교실에서도 쓸 수 있어요.",
      },
      es: {
        q: "¿El generador de páginas para colorear con nombres es gratis?",
        a: "Sí — páginas ilimitadas, sin registro. La marca de agua del sitio está activada por defecto y se quita con el interruptor encima de los botones de descarga. Las descargas en PDF y PNG son gratis para casa y aula.",
      },
      de: {
        q: "Ist der Ausmalbilder-Generator für Namen kostenlos?",
        a: "Ja — unbegrenzt viele Seiten, keine Anmeldung. Ein kleines Seiten-Wasserzeichen ist standardmäßig an und lässt sich mit dem Schalter über den Download-Buttons ausschalten. PDF- und PNG-Downloads sind kostenlos für Zuhause und Klassenzimmer.",
      },
      fr: {
        q: "Le générateur de coloriages de prénoms est-il gratuit ?",
        a: "Oui — pages illimitées, sans inscription. Un petit filigrane du site est présent par défaut et se retire avec l'interrupteur au-dessus des boutons de téléchargement. Les téléchargements PDF et PNG sont gratuits pour la maison et la classe.",
      },
      pt: {
        q: "O gerador de páginas para colorir com nomes é grátis?",
        a: "Sim — páginas ilimitadas, sem cadastro. Uma marca d'água do site fica ligada por padrão e pode ser desligada no interruptor acima dos botões de download. Os downloads em PDF e PNG são grátis para casa e sala de aula.",
      },
    },
  },
  {
    id: "coloring-how",
    i18n: {
      en: {
        q: "How do I make a coloring page with my child's name?",
        a: "Type the name, pick a playful font and a decoration (stars, animals, or machines), and the page draws bubble-letter outlines of each character.",
      },
      zh: {
        q: "怎么给孩子做名字涂色页?",
        a: "输入名字、选一个可爱字体和装饰(星星、动物或机器),页面会自动画出每个字的大气泡轮廓。",
      },
      ja: {
        q: "子どもの名前のぬりえはどうやって作りますか?",
        a: "名前を入力してポップなフォントと飾り(星・動物・機械)を選ぶだけ。各文字の吹き出し風の輪郭が自動で描かれます。",
      },
      ko: {
        q: "아이 이름 색칠 페이지는 어떻게 만드나요?",
        a: "이름을 입력하고 귀여운 글꼴과 장식(별, 동물, 기계)을 고르면 페이지가 각 글자의 풍선 글자 윤곽을 그려 줍니다.",
      },
      es: {
        q: "¿Cómo hago una página para colorear con el nombre de mi hijo?",
        a: "Escribe el nombre, elige una fuente divertida y una decoración (estrellas, animales o máquinas), y la página dibuja los contornos de burbuja de cada letra.",
      },
      de: {
        q: "Wie erstelle ich ein Ausmalbild mit dem Namen meines Kindes?",
        a: "Tippe den Namen ein, wähle eine verspielte Schrift und eine Deko (Sterne, Tiere oder Maschinen), und die Seite zeichnet Blasenbuchstaben-Umrisse jedes Buchstabens.",
      },
      fr: {
        q: "Comment créer un coloriage avec le prénom de mon enfant ?",
        a: "Tapez le prénom, choisissez une police amusante et une décoration (étoiles, animaux ou machines), et la page dessine des lettres-bulles de chaque caractère.",
      },
      pt: {
        q: "Como faço uma página para colorir com o nome do meu filho?",
        a: "Digite o nome, escolha uma fonte divertida e uma decoração (estrelas, animais ou máquinas) e a página desenha contornos de letras-bolha de cada caractere.",
      },
    },
  },
  {
    id: "coloring-customize",
    i18n: {
      en: {
        q: "Can I adjust the outlines and decorations?",
        a: "Yes — outline thickness is adjustable (thicker lines are easier for younger kids). Decorations can be stars and hearts, animals, or machines, or turned off. The font changes the letter shapes.",
      },
      zh: {
        q: "可以调整轮廓和装饰吗?",
        a: "可以——描边粗细可调(线条越粗越适合小龄孩子)。装饰可以选星星爱心、动物或机器,也可以关掉。换字体还能改变字形。",
      },
      ja: {
        q: "輪郭や飾りは調整できますか?",
        a: "はい。輪郭の太さは調節可能です(小さい子には太い線がおすすめ)。飾りは星とハート、動物、機械から選べて、オフにもできます。フォントを変えると文字の形も変わります。",
      },
      ko: {
        q: "윤곽과 장식을 조절할 수 있나요?",
        a: "네 — 윤곽선 굵기는 조절할 수 있어요(어린아이일수록 굵은 선이 쉬워요). 장식은 별과 하트, 동물, 기계 중에서 고르거나 끌 수 있고, 글꼴을 바꾸면 글자 모양도 달라집니다.",
      },
      es: {
        q: "¿Puedo ajustar los contornos y las decoraciones?",
        a: "Sí — el grosor del contorno es ajustable (las líneas gruesas son más fáciles para los más pequeños). Las decoraciones pueden ser estrellas y corazones, animales o máquinas, o apagarse. La fuente cambia la forma de las letras.",
      },
      de: {
        q: "Kann ich Umrisse und Dekorationen anpassen?",
        a: "Ja — die Umrissstärke ist einstellbar (dickere Linien sind für jüngere Kinder leichter). Die Deko kann Sterne und Herzen, Tiere oder Maschinen sein oder ausgeschaltet werden. Die Schrift verändert die Buchstabenformen.",
      },
      fr: {
        q: "Puis-je régler les contours et les décorations ?",
        a: "Oui — l'épaisseur du contour est réglable (les lignes épaisses sont plus faciles pour les petits). Les décorations peuvent être des étoiles et des cœurs, des animaux ou des machines, ou désactivées. La police modifie la forme des lettres.",
      },
      pt: {
        q: "Posso ajustar os contornos e as decorações?",
        a: "Sim — a espessura do contorno é ajustável (linhas grossas são mais fáceis para os pequenos). As decorações podem ser estrelas e corações, animais ou máquinas, ou desligadas. A fonte muda a forma das letras.",
      },
    },
  },
  {
    id: "coloring-who",
    i18n: {
      en: {
        q: "Who is it for?",
        a: "Preschool and kindergarten kids learning to recognize their own name — coloring the letters doubles as letter-shape practice. Teachers use it for name-of-the-week activities; multiple names work too.",
      },
      zh: {
        q: "适合多大的孩子?",
        a: "适合正在认识自己名字的学龄前和幼儿园孩子——涂色的同时练习字形。老师也用它做“本周名字”课堂活动,支持一次输入多个名字。",
      },
      ja: {
        q: "何歳向けですか?",
        a: "自分の名前を覚え始める就学前・幼稚園の子ども向けです。ぬりえしながら文字の形も練習できます。先生の「今週の名前」活動にも使えて、複数の名前にも対応。",
      },
      ko: {
        q: "어떤 아이에게 맞나요?",
        a: "자기 이름을 인식하기 시작하는 미취학·유치원 아이들에게 딱이에요 — 색칠하면서 글자 모양 연습도 함께 됩니다. 선생님들은 '이번 주 이름' 활동에 쓰고, 여러 이름 입력도 가능해요.",
      },
      es: {
        q: "¿Para quién es?",
        a: "Para niños de preescolar y jardín que aprenden a reconocer su nombre — colorear las letras es a la vez práctica de su forma. Los maestros lo usan para actividades de 'nombre de la semana'; también funcionan varios nombres.",
      },
      de: {
        q: "Für wen ist es gedacht?",
        a: "Für Vorschul- und Kindergartenkinder, die ihren eigenen Namen erkennen lernen — Ausmalen ist zugleich Übung der Buchstabenformen. Lehrkräfte nutzen es für „Name der Woche“-Aktivitäten; mehrere Namen funktionieren ebenfalls.",
      },
      fr: {
        q: "Pour qui est-ce fait ?",
        a: "Pour les enfants de maternelle qui apprennent à reconnaître leur prénom — colorier les lettres sert aussi à mémoriser leur forme. Les enseignants l'utilisent pour l'activité « prénom de la semaine » ; plusieurs prénoms fonctionnent aussi.",
      },
      pt: {
        q: "Para quem é?",
        a: "Para crianças da pré-escola e do jardim de infância aprendendo a reconhecer o próprio nome — colorir as letras também é prática da forma delas. Professores usam na atividade 'nome da semana'; vários nomes também funcionam.",
      },
    },
  },
];

export const DAILY_CURSIVE_FAQS: FaqItem[] = [
  {
    id: "daily-free",
    i18n: {
      en: {
        q: "Is the daily cursive practice really free?",
        a: "Yes — every daily sheet is free to download and print, with no signup. A small site watermark is on by default and can be turned off with the switch above the download buttons. Print as many copies as you need for your family or classroom.",
      },
      zh: {
        q: "每日草书练习真的免费吗?",
        a: "免费——每天的练习页都可以随意下载打印,无需注册。页脚默认有一行站点水印,下载按钮上方的开关可以关掉。家庭和课堂用都可以不限份数。",
      },
      ja: {
        q: "毎日の筆記体練習は本当に無料ですか?",
        a: "はい。その日の練習シートはダウンロードも印刷も無料、登録も不要です。ページ下部にサイト名の透かしが初期状態で入り、ダウンロードボタン上のスイッチで消せます。ご家庭や教室で必要な部数だけ印刷できます。",
      },
      ko: {
        q: "매일의 필기체 연습은 정말 무료인가요?",
        a: "네 — 매일의 연습장은 다운로드와 인쇄가 모두 무료이고, 가입도 필요 없어요. 페이지 아래에 사이트 워터마크가 기본으로 들어가며, 다운로드 버튼 위의 스위치로 끌 수 있어요. 가족이나 교실에서 필요한 만큼 인쇄하세요.",
      },
      es: {
        q: "¿La práctica diaria de cursiva es realmente gratis?",
        a: "Sí — cada hoja diaria se puede descargar e imprimir gratis, sin registro. La marca de agua del sitio está activada por defecto y se quita con el interruptor encima de los botones de descarga. Imprime tantas copias como necesites para tu familia o tu aula.",
      },
      de: {
        q: "Ist die tägliche Schreibschrift-Übung wirklich kostenlos?",
        a: "Ja — jedes Tagesblatt kann kostenlos heruntergeladen und gedruckt werden, ohne Anmeldung. Ein kleines Seiten-Wasserzeichen ist standardmäßig an und lässt sich mit dem Schalter über den Download-Buttons ausschalten. Drucke so viele Kopien, wie du für Familie oder Klasse brauchst.",
      },
      fr: {
        q: "La pratique quotidienne de la cursive est-elle vraiment gratuite ?",
        a: "Oui — chaque fiche du jour se télécharge et s'imprime gratuitement, sans inscription. Un petit filigrane du site est présent par défaut et se retire avec l'interrupteur au-dessus des boutons de téléchargement. Imprimez autant de copies que nécessaire pour votre famille ou votre classe.",
      },
      pt: {
        q: "A prática diária de cursiva é realmente grátis?",
        a: "Sim — cada ficha diária pode ser baixada e impressa de graça, sem cadastro. Uma marca d'água do site fica ligada por padrão e pode ser desligada no interruptor acima dos botões de download. Imprima quantas cópias precisar para a família ou a sala de aula.",
      },
    },
  },
  {
    id: "daily-content",
    i18n: {
      en: {
        q: "What is on each daily sheet?",
        a: "One printable page with a complete practice ladder: a stroke warm-up row, the cursive letters of the day, three words that use them, and one sentence to trace and then copy on the blank lines. Ten to fifteen minutes, done.",
      },
      zh: {
        q: "每天的练习页上有什么?",
        a: "一页完整的练习阶梯:一行笔画热身、当日草书字母、用到这些字母的三个单词,以及一句先描红再在空白行临写的句子。十到十五分钟就能练完。",
      },
      ja: {
        q: "1 日分のシートには何が載っていますか?",
        a: "1 ページに完全な練習の階段が入ります:ストロークのウォームアップ行、その日の筆記体アルファベット、それを使った 3 語、そしてなぞってから空き行に書き写す 1 文。10〜15 分で終わります。",
      },
      ko: {
        q: "매일의 연습장에는 무엇이 들어 있나요?",
        a: "한 페이지에 완전한 연습 사다리가 담깁니다: 획 워밍업 행, 그날의 필기체 알파벳, 이를 활용한 세 단어, 그리고 따라 쓴 뒤 빈 줄에 옮겨 쓸 한 문장. 10~15분이면 끝나요.",
      },
      es: {
        q: "¿Qué contiene cada hoja diaria?",
        a: "Una página imprimible con una escalera de práctica completa: una fila de calentamiento de trazos, las letras cursivas del día, tres palabras que las usan y una frase para calcar y luego copiar en las líneas en blanco. Diez a quince minutos y listo.",
      },
      de: {
        q: "Was ist auf jedem Tagesblatt?",
        a: "Eine bedruckbare Seite mit kompletter Übungsleiter: einer Strich-Aufwärmzeile, den Schreibschrift-Buchstaben des Tages, drei Wörtern damit und einem Satz zum Nachspuren und Abschreiben auf den Leerzeilen. Zehn bis fünfzehn Minuten, fertig.",
      },
      fr: {
        q: "Que contient chaque fiche du jour ?",
        a: "Une page imprimable avec un escalier d'entraînement complet : une ligne d'échauffement de traits, les lettres cursives du jour, trois mots qui les emploient et une phrase à repasser puis à copier sur les lignes vierges. Dix à quinze minutes, c'est fait.",
      },
      pt: {
        q: "O que tem em cada ficha diária?",
        a: "Uma página imprimível com uma escada de prática completa: uma linha de aquecimento de traços, as letras cursivas do dia, três palavras que as usam e uma frase para contornar e depois copiar nas linhas em branco. Dez a quinze minutos e pronto.",
      },
    },
  },
  {
    id: "daily-changes",
    i18n: {
      en: {
        q: "Does the worksheet really change every day?",
        a: "Yes — the letters, words and sentence are picked deterministically from the date, so a new sheet appears every day. Everyone printing on the same date gets the same sheet, which makes it easy to follow along as a class or with a friend.",
      },
      zh: {
        q: "练习内容真的每天都不一样吗?",
        a: "是的——字母、单词和句子都由日期确定性抽取,每天自动换新。同一天打印的所有人拿到同一份,方便全班或和朋友一起跟练。",
      },
      ja: {
        q: "シートは本当に毎日変わりますか?",
        a: "はい。文字・単語・文は日付から決定論的に選ばれるため、毎日新しいシートになります。同じ日に印刷すれば誰でも同じシートになるので、クラスや友達と一緒に取り組むのに最適です。",
      },
      ko: {
        q: "연습장이 정말 매일 바뀌나요?",
        a: "네 — 글자·단어·문장은 날짜에서 결정론적으로 뽑히므로 매일 새 연습장이 나옵니다. 같은 날짜에 인쇄하면 모두 같은 연습장이라, 학급이나 친구와 함께 따라 하기 좋아요.",
      },
      es: {
        q: "¿La ficha cambia de verdad cada día?",
        a: "Sí — las letras, palabras y la frase se eligen de forma determinista a partir de la fecha, así que cada día aparece una hoja nueva. Quien imprima en la misma fecha obtiene la misma hoja: fácil de seguir en clase o con un amigo.",
      },
      de: {
        q: "Ändert sich das Arbeitsblatt wirklich jeden Tag?",
        a: "Ja — Buchstaben, Wörter und Satz werden deterministisch aus dem Datum gewählt, sodass täglich ein neues Blatt erscheint. Wer am selben Datum druckt, erhält dasselbe Blatt — ideal, um als Klasse oder mit Freunden mitzumachen.",
      },
      fr: {
        q: "La fiche change-t-elle vraiment chaque jour ?",
        a: "Oui — les lettres, les mots et la phrase sont choisis de façon déterministe à partir de la date, donc une nouvelle fiche apparaît chaque jour. Tous ceux qui impriment à la même date obtiennent la même fiche : idéal pour suivre en classe ou entre amis.",
      },
      pt: {
        q: "A ficha muda de verdade todo dia?",
        a: "Sim — as letras, palavras e a frase são escolhidas de forma determinística a partir da data, então uma ficha nova aparece todos os dias. Quem imprimir na mesma data recebe a mesma ficha: fácil de acompanhar em sala ou com um amigo.",
      },
    },
  },
  {
    id: "daily-levels",
    i18n: {
      en: {
        q: "Is it for kids or for adults?",
        a: "Both. The Kids level uses bigger lines and simple words and sentences; the Adults level uses smaller lines with proverbs and sayings. Switch levels any time — the sheet adjusts instantly.",
      },
      zh: {
        q: "适合儿童还是成人?",
        a: "都适合。儿童难度行距更大,单词句子更简单;成人难度行距更小,句子换成谚语格言。随时切换难度,练习页立即更新。",
      },
      ja: {
        q: "子ども向けですか、大人向けですか?",
        a: "どちらにも。子どもレベルは行間が広く、簡単な単語と文。大人レベルは行間が狭く、ことわざ・格言になります。レベルはいつでも切り替えでき、シートはすぐに更新されます。",
      },
      ko: {
        q: "아이용인가요, 어른용인가요?",
        a: "둘 다예요. 어린이 난이도는 행이 넓고 단어·문장이 쉽고, 어른 난이도는 행이 좁고 속담·격언으로 구성됩니다. 난이도는 언제든 바꿀 수 있고 연습장도 바로 업데이트돼요.",
      },
      es: {
        q: "¿Es para niños o para adultos?",
        a: "Para ambos. El nivel infantil usa líneas más grandes con palabras y frases sencillas; el de adultos usa líneas más pequeñas con proverbos y dichos. Cambia de nivel cuando quieras — la hoja se ajusta al instante.",
      },
      de: {
        q: "Ist es für Kinder oder für Erwachsene?",
        a: "Für beide. Die Kinderstufe nutzt größere Zeilen mit einfachen Wörtern und Sätzen; die Erwachsenen-Stufe nutzt kleinere Zeilen mit Sprichwörtern und Redewendungen. Wechsle jederzeit — das Blatt passt sich sofort an.",
      },
      fr: {
        q: "Est-ce pour les enfants ou pour les adultes ?",
        a: "Pour les deux. Le niveau enfants utilise de plus grandes lignes avec des mots et des phrases simples ; le niveau adultes des lignes plus fines avec proverbes et maximes. Changez de niveau à tout moment — la fiche s'adapte instantanément.",
      },
      pt: {
        q: "É para crianças ou para adultos?",
        a: "Para os dois. O nível infantil usa linhas maiores com palavras e frases simples; o de adultos usa linhas menores com provérbios e ditados. Troque de nível quando quiser — a ficha se ajusta na hora.",
      },
    },
  },
  {
    id: "daily-week",
    i18n: {
      en: {
        q: "Can I print a whole week at once?",
        a: "Yes — the week button bundles Monday through Sunday into one seven-page PDF, each page with that day's own letters, words and sentence. Great for printing the week ahead on Monday.",
      },
      zh: {
        q: "可以一次打印一整周吗?",
        a: "可以——点击「本周套装」按钮,周一到周日合并成一个 7 页 PDF,每页都是当天的字母、单词和句子。适合周一一次性打完一周的量。",
      },
      ja: {
        q: "1 週間分をまとめて印刷できますか?",
        a: "はい。「週まとめ」ボタンで月曜から日曜までが 7 ページの 1 冊の PDF になり、各ページにその日の文字・単語・文が入ります。月曜に 1 週間分を先に印刷するのに便利です。",
      },
      ko: {
        q: "일주일 치를 한 번에 인쇄할 수 있나요?",
        a: "네 — 주간 버튼을 누르면 월요일부터 일요일까지 7페이지짜리 PDF 하나로 묶이고, 각 페이지에 그날의 글자·단어·문장이 담깁니다. 월요일에 한 주 치를 미리 인쇄하기 좋아요.",
      },
      es: {
        q: "¿Puedo imprimir una semana entera de una vez?",
        a: "Sí — el botón de semana agrupa de lunes a domingo en un PDF de siete páginas, cada una con las letras, palabras y frase de ese día. Perfecto para imprimir la semana el lunes.",
      },
      de: {
        q: "Kann ich eine ganze Woche auf einmal drucken?",
        a: "Ja — der Wochen-Button bündelt Montag bis Sonntag in einem siebenseitigen PDF, jede Seite mit den Buchstaben, Wörtern und dem Satz des jeweiligen Tages. Ideal, um am Montag die ganze Woche vorab zu drucken.",
      },
      fr: {
        q: "Puis-je imprimer toute une semaine d'un coup ?",
        a: "Oui — le bouton semaine regroupe du lundi au dimanche dans un PDF de sept pages, chaque page avec les lettres, les mots et la phrase du jour. Pratique pour imprimer la semaine à l'avance le lundi.",
      },
      pt: {
        q: "Posso imprimir uma semana inteira de uma vez?",
        a: "Sim — o botão de semana reúne de segunda a domingo em um PDF de sete páginas, cada uma com as letras, palavras e frase do dia. Ótimo para imprimir a semana com antecedência na segunda-feira.",
      },
    },
  },
];

/** /handwriting-personality-quiz 笔迹性格测验页 FAQ(8 语言) */
export const QUIZ_FAQS: FaqItem[] = [
  {
    id: "quiz-what-is",
    i18n: {
      en: {
        q: "What is a handwriting personality test?",
        a: "It's a light quiz that links the way you write with a fun personality profile. This one shows you sample writing styles — you pick the ones closest to yours — and returns a profile plus practice tips for the habits behind your letters. It's for fun: graphology itself isn't scientific, but the practice tips target real, trainable habits like size, spacing and baseline.",
      },
      zh: {
        q: "什么是手写性格测试?",
        a: "手写性格测试是一种把书写方式和趣味性格画像关联起来的小测验。这里的版本会展示多种笔迹样张,选出最接近你的,就能得到对应的性格画像和针对书写习惯的练字建议。它仅供娱乐:笔迹学本身并不科学,但练习建议针对的是真实、可训练的习惯,比如字号、间距和基线。",
      },
      ja: {
        q: "筆跡パーソナリティテストとは何ですか?",
        a: "書き方と楽しい性格プロフィールを結びつける軽いテストです。こちらの版では筆跡サンプルが表示され、自分に一番近いものを選ぶと、プロフィールと文字の癖に合わせた練習のヒントが返ってきます。あくまで娯楽です:グラフォロジー自体は科学的ではありませんが、練習のヒントは大きさ・間隔・ベースラインといった、実際に訓練できる習慣を対象にしています。",
      },
      ko: {
        q: "글씨 성격 테스트란 무엇인가요?",
        a: "쓰는 방식과 재미로 보는 성격 프로필을 연결하는 가벼운 테스트입니다. 이 버전은 필적 샘플을 보여주고 가장 비슷한 것을 고르면, 프로필과 글씨 습관에 맞운 연습 팁을 알려줍니다. 재미용입니다: 그래폴로지 자체는 과학적이지 않지만, 연습 팁은 크기·간격·베이스라인처럼 실제로 훈련 가능한 습관을 대상으로 합니다.",
      },
      es: {
        q: "¿Qué es un test de personalidad por la letra?",
        a: "Es un test ligero que conecta tu forma de escribir con un perfil de personalidad divertido. Esta versión te muestra muestras de escritura —eliges las más parecidas a la tuya— y te devuelve un perfil con consejos de práctica para los hábitos detrás de tus letras. Es solo diversión: la grafología no es científica, pero los consejos atacan hábitos reales y entrenables como tamaño, espaciado y línea base.",
      },
      de: {
        q: "Was ist ein Handschrift-Persönlichkeitstest?",
        a: "Ein leichter Test, der deine Schreibweise mit einem spaßigen Persönlichkeitsprofil verknüpft. Diese Version zeigt dir Schriftmuster — du wählst die aus, die deinen am nächsten kommen — und liefert ein Profil plus Übungstipps für die Gewohnheiten hinter deinen Buchstaben. Nur zum Spaß: Die Graphologie ist nicht wissenschaftlich, aber die Tipps zielen auf echte, trainierbare Gewohnheiten wie Größe, Abstände und Grundlinie.",
      },
      fr: {
        q: "Qu'est-ce qu'un test de personnalité par l'écriture ?",
        a: "C'est un petit test qui relie votre façon d'écrire à un profil de personnalité amusant. Cette version vous montre des échantillons d'écriture — vous choisissez ceux qui ressemblent le plus aux vôtres — et renvoie un profil avec des conseils pour travailler les habitudes derrière vos lettres. C'est juste pour le plaisir : la graphologie n'est pas une science, mais les conseils ciblent des habitudes réelles et entraînables comme la taille, l'espacement et la ligne de base.",
      },
      pt: {
        q: "O que é um teste de personalidade pela letra?",
        a: "É um teste leve que liga o seu jeito de escrever a um perfil de personalidade divertido. Esta versão mostra amostras de escrita — você escolhe as mais parecidas com a sua — e devolve um perfil com dicas de prática para os hábitos por trás das suas letras. É só diversão: a grafologia não é científica, mas as dicas miram hábitos reais e treináveis como tamanho, espaçamento e linha de base.",
      },
    },
  },
  {
    id: "quiz-accurate",
    i18n: {
      en: {
        q: "Is this quiz scientifically accurate?",
        a: "No — and we say so up front. Graphology (reading personality from handwriting) has been debunked in meta-analyses, so the profile is for fun. What is real: the practice tips, which target trainable habits like letter size, spacing and baseline.",
      },
      zh: {
        q: "这个测验有科学依据吗?",
        a: "没有——我们开门见山地承认。笔迹学(从笔迹推断性格)已被多项荟萃分析证伪,所以画像部分纯属娱乐。真实有效的是练习建议:它们针对字号、间距、基线这些可以通过训练改善的习惯。",
      },
      ja: {
        q: "このクイズは科学的に正確ですか?",
        a: "いいえ——最初にはっきりお伝えします。グラフォロジー(筆跡から性格を読む)はメタ分析で否定されており、プロフィールはあくまで娯楽です。本物は練習ヒントのほう。文字の大きさ・間隔・ベースラインなど、訓練で変えられる習慣を対象にしています。",
      },
      ko: {
        q: "이 퀴즈는 과학적으로 정확한가요?",
        a: "아니요 — 처음부터 솔직하게 말씀드려요. 그래폴로지(글씨로 성격 읽기)는 메타분석에서 반박됐고, 프로필은 재미용입니다. 실제인 것은 연습 팁: 글자 크기, 간격, 베이스라인처럼 훈련으로 바꿀 수 있는 습관을 대상으로 합니다.",
      },
      es: {
        q: "¿Este test es científicamente preciso?",
        a: "No — y lo decimos desde el principio. La grafología (leer la personalidad en la letra) está refutada por metaanálisis, así que el perfil es solo diversión. Lo real son los consejos de práctica: atacan hábitos entrenables como el tamaño, el espaciado y la línea base.",
      },
      de: {
        q: "Ist dieses Quiz wissenschaftlich fundiert?",
        a: "Nein — und wir sagen das ganz offen. Die Graphologie (Persönlichkeit aus Schrift zu lesen) wurde in Metaanalysen widerlegt; das Profil ist also nur Spaß. Echt sind die Übungstipps: Sie zielen auf trainierbare Gewohnheiten wie Buchstabengröße, Abstände und Grundlinie.",
      },
      fr: {
        q: "Ce quiz est-il scientifiquement fiable ?",
        a: "Non — et nous le disons d'emblée. La graphologie (lire la personnalité dans l'écriture) est réfutée par les méta-analyses ; le profil est donc purement ludique. Ce qui est réel : les conseils d'entraînement, qui ciblent des habitudes travaillables comme la taille, l'espacement et la ligne de base.",
      },
      pt: {
        q: "Este quiz é cientificamente preciso?",
        a: "Não — e dizemos isso de cara. A grafologia (ler personalidade na letra) foi refutada por meta-análises, então o perfil é só diversão. O que é real: as dicas de prática, que miram hábitos treináveis como tamanho, espaçamento e linha de base.",
      },
    },
  },
  {
    id: "quiz-forensic",
    i18n: {
      en: {
        q: "Is handwriting analysis the same as forensic document examination?",
        a: "No. Forensic document examiners compare writing to establish authorship or detect forgery for courts — a validated profession with real accuracy studies. Graphology claims personality traits, which research does not support.",
      },
      zh: {
        q: "笔迹分析和法庭笔迹鉴定是一回事吗?",
        a: "不是。法庭文书鉴定人通过比对笔迹判断文件作者或识别伪造,是为司法服务的、经过实证检验的职业;而笔迹学声称能看出性格,这一点并没有研究支持。",
      },
      ja: {
        q: "筆跡分析は法科学の文書鑑定と同じですか?",
        a: "違います。法科学の文書鑑定は、筆跡の比較から作者や偽造を判定する裁判向けの専門職で、精度の実証研究があります。一方グラフォロジーは性格の推定を主張しますが、これは研究裏付けがありません。",
      },
      ko: {
        q: "글씨 분석과 법과학 문서감정은 같은 건가요?",
        a: "아니요. 법과학 문서감정관은 필적 비교로 작성자나 위조를 판별하는 검증된 전문 직업입니다. 그래폴로지는 성격을 주장하지만, 이는 연구 뒷받침이 없어요.",
      },
      es: {
        q: "¿El análisis de la letra es lo mismo que la pericia caligráfica forense?",
        a: "No. Los peritos forenses comparan escritos para determinar autoría o detectar falsificaciones para los tribunales: una profesión validada con estudios de precisión reales. La grafología atribuye rasgos de personalidad, y eso la investigación no lo respalda.",
      },
      de: {
        q: "Ist Handschriftenanalyse dasselbe wie forensische Dokumentenprüfung?",
        a: "Nein. Forensische Dokumentensachverständige vergleichen Schriften, um Verfasserschaft oder Fälschungen für Gerichte festzustellen — ein validierter Beruf mit echten Genauigkeitsstudien. Die Graphologie behauptet Persönlichkeitsmerkmale, was die Forschung nicht stützt.",
      },
      fr: {
        q: "L'analyse d'écriture, est-ce la même chose que l'expertise judiciaire en écritures ?",
        a: "Non. Les experts en documents judiciaires comparent les écritures pour établir une paternité d'écriture ou détecter une falsification devant les tribunaux — un métier validé, avec de vraies études de fiabilité. La graphologie attribue des traits de personnalité, et cela, la recherche ne le soutient pas.",
      },
      pt: {
        q: "Análise de letra é a mesma coisa que perícia grafotécnica?",
        a: "Não. Peritos grafotécnicos comparam escritos para apurar autoria ou detectar falsificações para a Justiça — uma profissão validada, com estudos reais de precisão. A grafologia atribui traços de personalidade, e é isso que a pesquisa não sustenta.",
      },
    },
  },
  {
    id: "quiz-upload",
    i18n: {
      en: {
        q: "Do I need to upload a photo of my handwriting?",
        a: "No. Every question shows printed letter samples to compare against — nothing is uploaded, nothing is stored, and the quiz keeps working offline once the page has loaded.",
      },
      zh: {
        q: "需要上传我的手写照片吗?",
        a: "不需要。每道题都是印刷字母样张,对照选择即可——不上传任何内容、不保存任何数据,页面加载完成后离线也能作答。",
      },
      ja: {
        q: "自分の字の写真をアップロードする必要はありますか?",
        a: "いいえ。すべての質問には印刷された文字見本が表示され、見比べて選ぶだけ。アップロードも保存も一切なく、ページを読み込めばオフラインでも答えられます。",
      },
      ko: {
        q: "제 글씨 사진을 올려야 하나요?",
        a: "아니요. 모든 질문에는 인쇄된 글자 샘플이 보여서 비교해 고르기만 하면 됩니다 — 아무것도 업로드되거나 저장되지 않고, 페이지만 로드되면 오프라인에서도 동작해요.",
      },
      es: {
        q: "¿Tengo que subir una foto de mi letra?",
        a: "No. Cada pregunta muestra muestras impresas de letras para comparar — no se sube nada, no se guarda nada, y el test sigue funcionando sin conexión una vez cargada la página.",
      },
      de: {
        q: "Muss ich ein Foto meiner Handschrift hochladen?",
        a: "Nein. Jede Frage zeigt gedruckte Buchstabenmuster zum Vergleichen — nichts wird hochgeladen, nichts gespeichert, und nach dem Laden funktioniert das Quiz auch offline.",
      },
      fr: {
        q: "Faut-il téléverser une photo de mon écriture ?",
        a: "Non. Chaque question affiche des échantillons de lettres imprimés à comparer — rien n'est téléversé, rien n'est stocké, et le quiz marche hors ligne une fois la page chargée.",
      },
      pt: {
        q: "Preciso enviar uma foto da minha letra?",
        a: "Não. Toda pergunta mostra amostras impressas de letras para comparar — nada é enviado, nada é armazenado, e o quiz continua funcionando offline depois que a página carrega.",
      },
    },
  },
  {
    id: "quiz-share",
    i18n: {
      en: {
        q: "Can I save or share my result?",
        a: "Yes — download your result card as a PNG and share it anywhere. The card shows only your profile name and dimension bars, no personal data.",
      },
      zh: {
        q: "可以保存或分享结果吗?",
        a: "可以——把结果卡片下载为 PNG,随时分享。卡片上只有档案名称和维度条,不含任何个人信息。",
      },
      ja: {
        q: "結果を保存・シェアできますか?",
        a: "はい。結果カードを PNG としてダウンロードして、どこでもシェアできます。カードにはプロフィール名と次元バーだけが表示され、個人情報は含まれません。",
      },
      ko: {
        q: "결과를 저장하거나 공유할 수 있나요?",
        a: "네 — 결과 카드를 PNG로 내려받아 어디든 공유하세요. 카드에는 프로필 이름과 차원 막대만 있고 개인정보는 없습니다.",
      },
      es: {
        q: "¿Puedo guardar o compartir mi resultado?",
        a: "Sí — descarga tu tarjeta de resultado en PNG y compártela donde quieras. La tarjeta muestra solo el nombre del perfil y las barras por dimensión, sin datos personales.",
      },
      de: {
        q: "Kann ich mein Ergebnis speichern oder teilen?",
        a: "Ja — lade deine Ergebniskarte als PNG herunter und teile sie überall. Die Karte zeigt nur Profilname und Dimensionsbalken, keine persönlichen Daten.",
      },
      fr: {
        q: "Puis-je enregistrer ou partager mon résultat ?",
        a: "Oui — téléchargez votre carte de résultat en PNG et partagez-la où vous voulez. La carte n'affiche que le nom du profil et les barres par dimension, sans donnée personnelle.",
      },
      pt: {
        q: "Posso salvar ou compartilhar meu resultado?",
        a: "Sim — baixe seu cartão de resultado em PNG e compartilhe onde quiser. O cartão mostra só o nome do perfil e as barras por dimensão, sem dados pessoais.",
      },
    },
  },
  {
    id: "quiz-languages",
    i18n: {
      en: {
        q: "Which languages is the quiz available in?",
        a: "Eight: English, Spanish, French, German, Portuguese, Chinese, Japanese and Korean. The letter samples show Latin script, since the quiz is about how you write the Latin alphabet.",
      },
      zh: {
        q: "这个测验支持哪些语言?",
        a: "八种:英语、西班牙语、法语、德语、葡萄牙语、中文、日语和韩语。字母样张为拉丁字母,因为测验关注的是你写拉丁字母的习惯。",
      },
      ja: {
        q: "クイズは何語で使えますか?",
        a: "8 言語:英語、スペイン語、フランス語、ドイツ語、ポルトガル語、中国語、日本語、韓国語。文字見本はラテン文字です(ラテン文字の書き方についてのクイズのため)。",
      },
      ko: {
        q: "퀴즈는 어떤 언어로 되어 있나요?",
        a: "8개 언어: 영어, 스페인어, 프랑스어, 독일어, 포르투갈어, 중국어, 일본어, 한국어. 글자 샘플은 라틴 문자입니다 — 퀴즈가 라틴 알파벳 쓰기에 관한 것이기 때문이에요.",
      },
      es: {
        q: "¿En qué idiomas está disponible el test?",
        a: "En ocho: inglés, español, francés, alemán, portugués, chino, japonés y coreano. Las muestras de letras están en alfabeto latino, porque el test va sobre cómo escribes el alfabeto latino.",
      },
      de: {
        q: "In welchen Sprachen gibt es das Quiz?",
        a: "In acht: Englisch, Spanisch, Französisch, Deutsch, Portugiesisch, Chinesisch, Japanisch und Koreanisch. Die Buchstabenmuster sind lateinisch, weil es darum geht, wie du das lateinische Alphabet schreibst.",
      },
      fr: {
        q: "Dans quelles langues le quiz est-il disponible ?",
        a: "Huit : anglais, espagnol, français, allemand, portugais, chinois, japonais et coréen. Les échantillons de lettres sont en alphabet latin, puisque le quiz porte sur votre façon d'écrire l'alphabet latin.",
      },
      pt: {
        q: "Em quais idiomas o quiz está disponível?",
        a: "Em oito: inglês, espanhol, francês, alemão, português, chinês, japonês e coreano. As amostras de letras são em alfabeto latino, já que o quiz trata de como você escreve o alfabeto latino.",
      },
    },
  },
  {
    id: "quiz-improve",
    i18n: {
      en: {
        q: "Can I improve my handwriting based on my result?",
        a: "That's the point! Each dimension in your result links to a free practice tool matched to that habit — three-line paper for a straight baseline, rhythm rows for even size, and so on. No signup, no watermark.",
      },
      zh: {
        q: "能根据结果改善我的字吗?",
        a: "这正是本测验的落点!结果里的每个维度都配有对应的免费练习工具——基线不平练三线格、字号不稳练节奏行,以此类推。无需注册,没有水印。",
      },
      ja: {
        q: "結果をもとに字を上達させられますか?",
        a: "それがこのクイズの狙いです!結果の各次元には、その習慣に合った無料練習ツールがリンクされています——ベースラインには 3 線ノート、均一なサイズにはリズム行、など。登録も透かしもありません。",
      },
      ko: {
        q: "결과를 바탕으로 글씨를 고칠 수 있나요?",
        a: "그게 이 퀴즈의 목표입니다! 결과의 각 차원에는 그 습관에 맞는 무료 연습 도구가 연결됩니다 — 곧은 베이스라인은 3선 용지, 균일한 크기는 리듬 행 등. 가입도 워터마크도 없어요.",
      },
      es: {
        q: "¿Puedo mejorar mi letra a partir de mi resultado?",
        a: "¡Ese es el objetivo! Cada dimensión del resultado enlaza a una herramienta de práctica gratuita para ese hábito: papel de tres líneas para la línea base, filas con ritmo para un tamaño uniforme, etcétera. Sin registro ni marca de agua.",
      },
      de: {
        q: "Kann ich mit meinem Ergebnis meine Handschrift verbessern?",
        a: "Genau das ist der Sinn! Jede Dimension im Ergebnis verlinkt ein passendes kostenloses Übungswerkzeug — Drei-Linien-Papier für die Grundlinie, Rhythmuszeilen für gleichmäßige Größe und so weiter. Ohne Anmeldung, ohne Wasserzeichen.",
      },
      fr: {
        q: "Puis-je améliorer mon écriture à partir de mon résultat ?",
        a: "C'est tout l'objectif ! Chaque dimension du résultat renvoie vers un outil d'entraînement gratuit adapté à cette habitude — papier séyès pour la ligne de base, lignes-rythmes pour une taille régulière, etc. Sans inscription, sans filigrane.",
      },
      pt: {
        q: "Posso melhorar minha letra a partir do resultado?",
        a: "Esse é o objetivo! Cada dimensão do resultado leva a uma ferramenta de prática gratuita para aquele hábito — papel de três linhas para a linha de base, linhas com ritmo para tamanho uniforme, e por aí vai. Sem cadastro, sem marca d'água.",
      },
    },
  },
];

/** /doctor-handwriting-generator 工具页 FAQ(8 语言) */
export const DOCTOR_FAQS: FaqItem[] = [
  {
    id: "doctor-why-messy",
    i18n: {
      en: {
        q: "Why is doctors' handwriting so messy?",
        a: "Volume and speed. A hospital doctor writes thousands of notes a year, often standing, between patients — so letters collapse into shorthand scrawl. Interestingly, studies comparing doctors with other professionals found their handwriting is only slightly worse; the legend owes a lot to prescriptions' private abbreviations and, of course, memes.",
      },
      zh: {
        q: "为什么医生的字都那么潦草?",
        a: "主要是量大和速度快。住院医生一年要写几千份记录,常常站着写、在病人之间抢时间,字母就缩并成了速记式的潦草。有趣的是,有研究把医生和其他职业的字迹做对比,发现其实只差一点;「天书」的名声更多来自处方里外人看不懂的缩写,当然还有表情包的推波助澜。",
      },
      ja: {
        q: "お医者さんの字はなぜ汚いのですか?",
        a: "量と速さです。入院医師は年間何千件も記録を書き、立ったまま患者の合間に走り書きするため、文字が速記のような走り字になります。興味深いことに、他職種との比較研究では医師の字はわずかに悪い程度という結果も。伝説の理由は、処方箋の略語が他人に読めないことと、いうまでもなくミームです。",
      },
      ko: {
        q: "의사들 글씨는 왜 그렇게 흘려 쓰나요?",
        a: "양과 속도 때문입니다. 병원 의사는 한 해에 수천 건의 기록을, 서 있는 채로 환자 사이 짬짬이 작성하느라 글자가 속기처럼 뭉개집니다. 흥미롭게도 다른 직군과 비교한 연구에서는 차이가 아주 작았어요. '천서(天書)' 이미지는 처방전의 축약어와, 물론 밈 덕분에 커졌죠.",
      },
      es: {
        q: "¿Por qué la letra de los médicos es tan ilegible?",
        a: "Volumen y velocidad. Un médico de hospital escribe miles de notas al año, a menudo de pie y entre pacientes, así que las letras se derrumban en garabatos de taquigrafía. Curiosamente, estudios que comparan a médicos con otros profesionales hallaron diferencias mínimas; su fama se debe a las abreviaturas privadas de las recetas y, por supuesto, a los memes.",
      },
      de: {
        q: "Warum ist die Schrift von Ärzten so krakelig?",
        a: "Menge und Tempo. Ein Klinikarzt schreibt tausende Notizen pro Jahr, oft stehend und zwischen Patienten — die Buchstaben zerfallen zu kurzschriftigen Gekritzel. Interessanterweise fanden Studien nur geringe Unterschiede zu anderen Berufen; der Ruf entsteht durch die kryptischen Abkürzungen auf Rezepten und, nun ja, Memes.",
      },
      fr: {
        q: "Pourquoi les médecins écrivent-ils aussi mal ?",
        a: "Le volume et la vitesse. Un médecin hospitalier rédige des milliers de notes par an, souvent debout, entre deux patients — les lettres s'effondrent en gribouillis sténographiques. Fait intéressant : des études comparant médecins et autres professionnels n'ont trouvé qu'un léger écart ; sa réputation vient des abréviations privées des ordonnances et, évidemment, des mèmes.",
      },
      pt: {
        q: "Por que a letra dos médicos é tão ilegível?",
        a: "Volume e velocidade. Um médico hospitalar escreve milhares de anotações por ano, muitas vezes em pé, no intervalo entre pacientes — as letras viram rabiscos de taquigrafia. Curiosamente, estudos comparando médicos com outros profissionais encontraram diferenças mínimas; a fama vem das abreviações privadas das receitas e, claro, dos memes.",
      },
    },
  },
  {
    id: "doctor-not-real",
    i18n: {
      en: {
        q: "Is this a real prescription?",
        a: "No — it's a gag. The output is a novelty image/PDF for jokes, gifts and party laughs: a fake \"prescription\" telling a friend to take two vacations a day, for example. It is not a medical document and must never be used to deceive a pharmacy, an employer or anyone else.",
      },
      zh: {
        q: "生成的是真处方吗?",
        a: "不是——这只是个整活工具。输出的是娱乐用的图片/PDF,用来开玩笑、送恶搞礼物、聚会活跃气氛,比如给朋友开一张「每日度假两次」的假处方。它不是医疗文件,绝不能用来欺骗药房、雇主或任何人。",
      },
      ja: {
        q: "これは本物の処方箋になりますか?",
        a: "いいえ——完全なネタ工具です。出力は冗談・ギフト・パーティー向けの画像/PDF。「1日に休暇2回処方」のような偽処方箋を作って楽しむためのものです。医療文書ではないため、薬局や勤務先などを騙す用途には絶対に使わないでください。",
      },
      ko: {
        q: "이것은 진짜 처방전인가요?",
        a: "아니요 — 순수한 개그 도구입니다. 결과물은 농담·선물·파티용 이미지/PDF예요. 예를 들어 친구에게 '하루 휴가 2회 복용' 가짜 처방전을 만들어 주는 거죠. 의료 문서가 아니며, 약국이나 직장 등 누구를 속이는 데도 절대 사용하면 안 됩니다.",
      },
      es: {
        q: "¿Esto es una receta médica real?",
        a: "No — es una broma. El resultado es una imagen/PDF de regalo para hacer reír: una \"receta\" falsa que manda a un amigo tomarse dos vacaciones al día, por ejemplo. No es un documento médico y nunca debe usarse para engañar a una farmacia, a un empleador ni a nadie.",
      },
      de: {
        q: "Ist das ein echtes Rezept?",
        a: "Nein — es ist ein Scherz. Das Ergebnis ist ein Novitäten-Bild/PDF für Witze, Geschenke und Partylaunen: ein gefälschtes „Rezept“, das einem Freund z. B. zwei Urlaube täglich verschreibt. Es ist kein medizinisches Dokument und darf niemals verwendet werden, um eine Apotheke, einen Arbeitgeber oder sonst jemanden zu täuschen.",
      },
      fr: {
        q: "C'est une vraie ordonnance ?",
        a: "Non — c'est un gag. Le résultat est une image/PDF novelty pour les blagues, les cadeaux et les fêtes : une fausse « ordonnance » qui prescrit à un ami deux vacances par jour, par exemple. Ce n'est pas un document médical et ne doit jamais servir à tromper une pharmacie, un employeur ou qui que ce soit.",
      },
      pt: {
        q: "Isso é uma receita médica de verdade?",
        a: "Não — é uma pegadinha. O resultado é uma imagem/PDF de brinquedo para piadas, presentes e festas: uma \"receita\" falsa mandando um amigo tomar dois passeios por dia, por exemplo. Não é um documento médico e nunca deve ser usado para enganar farmácia, empregador ou qualquer pessoa.",
      },
    },
  },
  {
    id: "doctor-how-to",
    i18n: {
      en: {
        q: "How do I make my own doctor handwriting note?",
        a: "Type or dictate your text, and the generator writes it in a scrawl on an Rx pad. Push the realism slider toward 100% for maximum illegibility, pick the ℞ paper, then export a PNG or a print-ready PDF. Popular uses: gag prescriptions, \"doctor's orders\" notes excusing chores, and get-well cards with mock side effects like \"may cause napping\".",
      },
      zh: {
        q: "怎么自己做一张医生字迹便条?",
        a: "输入或口述你的文字,生成器会把它以潦草笔迹写到 ℞ 处方笺上。把仿真度滑杆拉到接近 100% 最有「天书」效果,然后导出 PNG 或可打印 PDF。常见玩法:恶搞处方、豁免家务的「医嘱」便条、写着「副作用:可能犯困」的探病卡。",
      },
      ja: {
        q: "自分だけの医者字メモの作り方は?",
        a: "テキストを入力または音声で口述すると、ジェネレーターが ℞ 処方箋に走り字で書き込みます。リアリズム調整を 100% 近くまで上げると最高に読めなくなります。PNG または印刷用 PDF に書き出して、ドネーション処方箋や「医師の指示:家事免除」メモ、「副作用:眠気」のお見舞いカードなどに。",
      },
      ko: {
        q: "의사 글씨 메모를 직접 만들려면?",
        a: "텍스트를 입력하거나 말로 받아쓰면 생성기가 ℞ 처방전 위에 흘려쓴 글씨로 적어 줍니다. 사실감 슬라이더를 100% 근처로 올리면 가장 알아볼 수 없게 됩니다. PNG 또는 인쇄용 PDF로 내보내 개그 처방전, '의사 지시: 집안일 면제' 메모, '부작용: 졸음' 위문 카드 등으로 써 보세요.",
      },
      es: {
        q: "¿Cómo creo mi propia nota con letra de médico?",
        a: "Escribe o dicta tu texto, y el generador lo escribe en garabatos sobre una receta con ℞. Sube el control de realismo hacia el 100% para máxima ilegibilidad y exporta un PNG o un PDF listo para imprimir. Usos populares: recetas-broma, notas de \"órdenes médicas\" que eximen de tareas y tarjetas de recuperación con efectos secundarios falsos como \"puede provocar siestas\".",
      },
      de: {
        q: "Wie erstelle ich meine eigene Notiz in Artzkrakel-Schrift?",
        a: "Tippe oder diktiere deinen Text, und der Generator schreibt ihn als Gekritzel auf ein ℞-Rezept. Schiebe den Realismus-Regler Richtung 100 % für maximale Unlesbarkeit und exportiere ein PNG oder ein druckfertiges PDF. Beliebte Einsätze: Scherzrezepte, „ärztliche Anordnung“-Zettel gegen Hausarbeit und Gute-Besserung-Karten mit Scheiben-Nebenwirkungen wie „kann Schläfrigkeit verursachen“.",
      },
      fr: {
        q: "Comment créer ma propre note en écriture de médecin ?",
        a: "Saisissez ou dictez votre texte, et le générateur l'écrit en gribouillis sur une ordonnance avec ℞. Poussez le curseur de réalisme vers 100 % pour une illisibilité maximale, puis exportez un PNG ou un PDF prêt à imprimer. Usages populaires : ordonnances-blagues, mots « sur ordonnance médicale » qui exemptent de corvées, et cartes de rétablissement avec des effets secondaires fictifs comme « peut provoquer des siestes ».",
      },
      pt: {
        q: "Como faço minha própria nota com letra de médico?",
        a: "Digite ou dite seu texto, e o gerador escreve em rabiscos numa receita com ℞. Empurre o controle de realismo para perto de 100% para ilegibilidade máxima e exporte um PNG ou um PDF pronto para imprimir. Usos populares: receitas de brincadeira, bilhetes de \"determinação médica\" que livram de tarefas e cartões de melhoras com efeitos colaterais fictícios como \"pode causar sono\".",
      },
    },
  },
];

/** /handwriting-workbook-generator 工具页 FAQ(8 语言) */
export const WORKBOOK_FAQS: FaqItem[] = [
  {
    id: "workbook-free",
    i18n: {
      en: {
        q: "Is the workbook generator free?",
        a: "Yes — no signup, no watermark, unlimited downloads. Each workbook exports as a single Letter-size PDF with a cover page and one page group per word, ready to print at home or school.",
      },
      zh: {
        q: "练习册生成器免费吗?",
        a: "免费——无需注册、没有水印、下载不限次。每本练习册导出为一个 Letter 尺寸 PDF,含封面和每词一组练习页,在家或学校都能直接打印。",
      },
      ja: {
        q: "ワークブック生成器は無料ですか?",
        a: "はい——登録不要、透かしなし、ダウンロード無制限。ワークブックは表紙つきのレターサイズ PDF 1 冊として書き出され、家庭でも学校でもそのまま印刷できます。",
      },
      ko: {
        q: "워크북 생성기는 무료인가요?",
        a: "네 — 가입도 워터마크도 없고 다운로드 횟수 제한도 없습니다. 워크북은 표지와 단어별 연습 페이지를 포함한 Letter 규격 PDF 한 파일로 내보내져 집이나 학교에서 바로 인쇄할 수 있어요.",
      },
      es: {
        q: "¿El generador de cuadernos es gratis?",
        a: "Sí — sin registro, sin marca de agua y descargas ilimitadas. Cada cuaderno se exporta como un PDF tamaño Carta con portada y un grupo de páginas por palabra, listo para imprimir en casa o en la escuela.",
      },
      de: {
        q: "Ist der Übungsheft-Generator kostenlos?",
        a: "Ja — ohne Anmeldung, ohne Wasserzeichen, unbegrenzte Downloads. Jedes Heft wird als ein Letter-PDF mit Deckblatt und einer Seitengruppe pro Wort exportiert, druckfertig für Zuhause oder die Schule.",
      },
      fr: {
        q: "Le générateur de cahier est-il gratuit ?",
        a: "Oui — sans inscription, sans filigrane, téléchargements illimités. Chaque cahier est exporté en un seul PDF format Letter avec couverture et un groupe de pages par mot, prêt à imprimer à la maison ou en classe.",
      },
      pt: {
        q: "O gerador de caderno é grátis?",
        a: "Sim — sem cadastro, sem marca d'água, downloads ilimitados. Cada caderno é exportado como um único PDF tamanho Letter com capa e um grupo de páginas por palavra, pronto para imprimir em casa ou na escola.",
      },
    },
  },
  {
    id: "workbook-what-to-put",
    i18n: {
      en: {
        q: "What should I put in my handwriting workbook?",
        a: "One word per line, up to 100 words. Popular lists: the alphabet for preschoolers, your child's name, Dolch or Fry sight words for kindergarten, this week's spelling list, or themed words (animals, colors, holidays). Each word gets an example row plus traceable rows on three-line guides.",
      },
      zh: {
        q: "练习册里放什么内容好?",
        a: "每行一个词,最多 100 个。常见用法:学龄前放字母表、放孩子的名字,幼儿园放 Sight Words 高频词,小学生放本周拼写词表,或按主题来一组(动物、颜色、节日)。每个词都会生成一行示例和多行描红,配三线格。",
      },
      ja: {
        q: "ワークブックには何を入れればいい?",
        a: "1 行に 1 語、最大 100 語。定番は:未就学児のアルファベット、お子さまの名前、小学低学年のスペリングリスト、テーマごとの単語(動物・色・行事)など。各単語にお手本行となぞり行が 3 線ガイド付きで生成されます。",
      },
      ko: {
        q: "워크북에 무엇을 넣으면 좋을까요?",
        a: "한 줄에 한 단어, 최대 100개. 인기 목록: 유아 알파벳, 아이 이름, 저학년 이번 주 단어 목록, 테마 단어(동물·색·명절) 등. 각 단어마다 3선 가이드 위에 예시 줄과 따라 쓰기 줄이 만들어집니다.",
      },
      es: {
        q: "¿Qué pongo en mi cuaderno de caligrafía?",
        a: "Una palabra por línea, hasta 100. Listas populares: el alfabeto para preescolar, el nombre de tu hijo, sight words de kinder, la lista de ortografía semanal o palabras por tema (animales, colores, fiestas). Cada palabra recibe una fila de ejemplo y filas para repasar sobre guía de tres líneas.",
      },
      de: {
        q: "Was gehört in mein Übungsheft?",
        a: "Ein Wort pro Zeile, bis zu 100 Wörter. Beliebte Listen: das Alphabet für Vorschulkinder, der Name deines Kindes, die Wochenliste für die Schule oder Themenwörter (Tiere, Farben, Feste). Jedes Wort bekommt eine Beispielzeile plus Spurzeilen auf Drei-Linien-Guides.",
      },
      fr: {
        q: "Que mettre dans mon cahier d'écriture ?",
        a: "Un mot par ligne, jusqu'à 100. Listes populaires : l'alphabet pour les maternelles, le prénom de votre enfant, la liste d'orthographe de la semaine ou des mots par thème (animaux, couleurs, fêtes). Chaque mot reçoit une ligne modèle et des lignes à repasser sur guides trois lignes.",
      },
      pt: {
        q: "O que coloco no meu caderno de caligrafia?",
        a: "Uma palavra por linha, até 100. Listas populares: o alfabeto para a pré-escola, o nome do seu filho, a lista de ortografia da semana ou palavras por tema (animais, cores, datas). Cada palavra ganha uma linha de exemplo e linhas para treinar sobre guia de três linhas.",
      },
    },
  },
  {
    id: "workbook-print-cursive",
    i18n: {
      en: {
        q: "Can I make a print or a cursive workbook?",
        a: "Both. Pick any font in the font menu — Patrick Hand for clean print practice, Cedarville Cursive or Dancing Script for cursive, or Kalam for a everyday pen look. The guide rows (top line, dashed midline, baseline) stay the same either way.",
      },
      zh: {
        q: "能做印刷体或连笔体的练习册吗?",
        a: "都可以。在字体菜单里任选:Patrick Hand 适合干净利落的印刷体练习,Cedarville Cursive / Dancing Script 适合连笔体,Kalam 是日常手写感。无论哪种,三线格(顶线、虚线中线、基线)保持一致。",
      },
      ja: {
        q: "印刷体でも筆記体でも作れますか?",
        a: "どちらも OK。フォントメニューで好きな書体を:きれいな印刷体なら Patrick Hand、筆記体なら Cedarville Cursive や Dancing Script、日常の手書き風なら Kalam。3 線ガイド(頂線・点線中央線・ベースライン)はどの書体でも同じです。",
      },
      ko: {
        q: "인쇄체나 필기체 워크북 모두 만들 수 있나요?",
        a: "둘 다 됩니다. 글꼴 메뉴에서 아무거나 고르세요 — 깔끔한 인쇄체 연습은 Patrick Hand, 필기체는 Cedarville Cursive나 Dancing Script, 일상 손글씨 느낌은 Kalam. 가이드 줄(윗선, 점선 중앙선, 베이스라인)은 어느 글꼴이든 동일합니다.",
      },
      es: {
        q: "¿Puedo hacer un cuaderno en imprenta o en cursiva?",
        a: "Ambos. Elige cualquier tipografía del menú — Patrick Hand para imprenta limpia, Cedarville Cursive o Dancing Script para cursiva, o Kalam para un aire de pluma cotidiana. Las guías (línea superior, media discontinua, base) se mantienen igual.",
      },
      de: {
        q: "Geht ein Heft in Druckschrift oder Schreibschrift?",
        a: "Beides. Wähle eine Schrift im Menü — Patrick Hand für saubere Druckschrift, Cedarville Cursive oder Dancing Script für Schreibschrift, oder Kalam für den Alltags-Stift-Look. Die Guide-Zeilen (Topline, gestrichelte Mittellinie, Grundlinie) bleiben immer gleich.",
      },
      fr: {
        q: "Cahier en écriture droite ou en cursive ?",
        a: "Les deux. Choisissez n'importe quelle police du menu — Patrick Hand pour une droite bien nette, Cedarville Cursive ou Dancing Script pour la cursive, ou Kalam pour un style stylo du quotidien. Les guides (ligne du haut, médiane pointillée, ligne de base) restent identiques.",
      },
      pt: {
        q: "Dá para fazer caderno em letra de fôrma ou cursiva?",
        a: "Os dois. Escolha qualquer fonte no menu — Patrick Hand para fôrma limpa, Cedarville Cursive ou Dancing Script para cursiva, ou Kalam para um ar de caneta do dia a dia. As guias (linha de cima, linha do meio tracejada, base) ficam iguais em qualquer fonte.",
      },
    },
  },
];

/** /handwriting-repeater 循环书写演示 FAQ(8 语言) */
export const REPEATER_FAQS: FaqItem[] = [
  {
    id: "repeater-free",
    i18n: {
      en: {
        q: "Is the handwriting repeater free?",
        a: "Yes — no signup and no watermark. The animation runs in your browser, and GIF downloads are unlimited.",
      },
      zh: {
        q: "手写循环演示免费吗?",
        a: "免费——无需注册,也没有水印。动画在你的浏览器里播放,GIF 下载不限次数。",
      },
      ja: {
        q: "手書きリピーターは無料ですか?",
        a: "はい。登録も透かしもありません。アニメーションはブラウザの中で再生され、GIF の保存に回数制限はありません。",
      },
      ko: {
        q: "손글씨 리피터는 무료인가요?",
        a: "네. 가입도 워터마크도 없습니다. 애니메이션은 브라우저 안에서 재생되고, GIF 받기에 횟수 제한이 없습니다.",
      },
      es: {
        q: "¿El repetidor de escritura es gratis?",
        a: "Sí: sin registro y sin marca de agua. La animación corre en tu navegador, y las descargas en GIF no tienen límite.",
      },
      de: {
        q: "Ist die Schreib-Wiederholung kostenlos?",
        a: "Ja — ohne Anmeldung und ohne Wasserzeichen. Die Animation läuft in deinem Browser, GIF-Downloads sind nicht begrenzt.",
      },
      fr: {
        q: "Le répéteur d'écriture est-il gratuit ?",
        a: "Oui — sans inscription et sans filigrane. L'animation tourne dans votre navigateur, et les téléchargements GIF ne sont pas limités.",
      },
      pt: {
        q: "O repetidor de escrita é grátis?",
        a: "Sim — sem cadastro e sem marca d'água. A animação roda no seu navegador, e os downloads em GIF não têm limite.",
      },
    },
  },
  {
    id: "repeater-stroke-order",
    i18n: {
      en: {
        q: "Does the repeater show real stroke order?",
        a: "It uncovers each letter from left to right in the font you picked, then loops. That shows size, spacing, and where the letter sits on the line. It is not a textbook stroke-order diagram, and cursive entry strokes are not marked.",
      },
      zh: {
        q: "它展示的是真正的笔顺吗?",
        a: "它按你选的字体,从左到右把每个字揭开,然后循环。能看出大小、间距,以及字落在哪条线上。这不是教材笔顺图,连笔的起笔也不会单独标出来。",
      },
      ja: {
        q: "本当の筆順を見せてくれますか?",
        a: "選んだフォントの形を、左から右へ一文字ずつ開いてからループします。大きさ、間隔、文字がどの線に乗るかは分かります。教科書の筆順図ではなく、筆記体の入りの筆も印は付きません。",
      },
      ko: {
        q: "실제 획순을 보여 주나요?",
        a: "고른 글꼴의 모양을 왼쪽에서 오른쪽으로 한 글자씩 연 다음 반복합니다. 크기, 간격, 글자가 어느 줄에 앉는지는 보입니다. 교과서 획순 그림은 아니고, 필기체의 시작 획도 표시하지 않습니다.",
      },
      es: {
        q: "¿Muestra el orden real de los trazos?",
        a: "Descubre cada letra de izquierda a derecha en la fuente elegida y luego la repite. Así se ve el tamaño, el espacio y en qué línea se apoya. No es un diagrama de orden de trazos de un libro, y no marca por dónde entra la cursiva.",
      },
      de: {
        q: "Zeigt sie die echte Strichfolge?",
        a: "Sie deckt jeden Buchstaben von links nach rechts in der gewählten Schrift auf und wiederholt ihn dann. Größe, Abstand und die Linie, auf der der Buchstabe sitzt, sind zu sehen. Es ist kein Strichfolge-Diagramm aus dem Lehrbuch, und Einstiege in der Schreibschrift sind nicht markiert.",
      },
      fr: {
        q: "Est-ce le vrai ordre des traits ?",
        a: "Chaque lettre est découverte de gauche à droite dans la police choisie, puis la ligne recommence. On voit la taille, l'espacement et la ligne d'appui. Ce n'est pas un schéma d'ordre des traits de manuel, et l'attaque de la cursive n'est pas marquée.",
      },
      pt: {
        q: "Ele mostra a ordem real dos traços?",
        a: "Revela cada letra da esquerda para a direita na fonte escolhida e depois repete. Dá para ver o tamanho, o espaço e em que linha a letra se apoia. Não é um diagrama de ordem dos traços de livro, e a entrada da cursiva não vem marcada.",
      },
    },
  },
  {
    id: "repeater-print",
    i18n: {
      en: {
        q: "Can I save the animation?",
        a: "Yes. Download GIF saves one writing pass, including the pause at the end, and the file loops. It is drawn in your browser. The two blank lines stay in the picture. It is a loop to watch, not a print worksheet.",
      },
      zh: {
        q: "动画能保存下来吗?",
        a: "可以。下载 GIF 会保存写完的一遍,包括结尾的停顿,文件会循环播放。画面在浏览器里生成。句子下面的两行空白也在图里。这是用来再看一遍的循环,不是打印用的练习纸。",
      },
      ja: {
        q: "アニメーションを保存できますか?",
        a: "できます。GIF を保存すると、書き終わりの一回分(最後の一呼吸を含む)が入り、ファイルはループします。描画はブラウザの中です。文の下の空白罫線 2 行も入ります。見るためのループで、印刷用の練習紙ではありません。",
      },
      ko: {
        q: "애니메이션을 저장할 수 있나요?",
        a: "네. GIF 받기는 한 번 다 쓰는 과정과 끝의 멈춤을 담고, 파일은 반복됩니다. 그림은 브라우저 안에서 만들어집니다. 문장 아래 빈 줄 두 줄도 들어갑니다. 다시 보기 위한 반복이지, 인쇄용 연습지는 아닙니다.",
      },
      es: {
        q: "¿Puedo guardar la animación?",
        a: "Sí. Descargar GIF guarda una pasada completa, incluida la pausa del final, y el archivo se repite. Se dibuja en tu navegador. Las dos líneas en blanco siguen en la imagen. Es un bucle para volver a verlo, no una ficha para imprimir.",
      },
      de: {
        q: "Kann ich die Animation speichern?",
        a: "Ja. GIF laden speichert einen Schreibdurchgang samt Pause am Ende, und die Datei wiederholt sich. Gezeichnet wird im Browser. Die zwei leeren Zeilen bleiben im Bild. Es ist eine Schleife zum Nochmal-Ansehen, kein Druckblatt.",
      },
      fr: {
        q: "Puis-je enregistrer l'animation ?",
        a: "Oui. Télécharger le GIF enregistre un passage complet, pause finale comprise, et le fichier boucle. Le dessin se fait dans votre navigateur. Les deux lignes vides restent dans l'image. C'est une boucle à revoir, pas une fiche à imprimer.",
      },
      pt: {
        q: "Dá para salvar a animação?",
        a: "Sim. Baixar GIF guarda uma passada completa, com a pausa no fim, e o arquivo repete. O desenho acontece no navegador. As duas linhas em branco continuam na imagem. É um loop para ver de novo, não uma ficha para imprimir.",
      },
    },
  },
];

/** /handwriting-page-calculator 工具页 FAQ(8 语言) */
export const PAGE_CALC_FAQS: FaqItem[] = [
  {
    id: "page-calc-free",
    i18n: {
      en: {
        q: "Is the handwriting page calculator free?",
        a: "Yes. No signup, and the text stays in your browser. It is not uploaded.",
      },
      zh: {
        q: "这个用纸计算器免费吗?",
        a: "免费,不用注册。文字只留在浏览器里,不会上传。",
      },
      ja: {
        q: "この枚数計算機は無料ですか?",
        a: "無料で、登録も不要です。文章はブラウザ内に留まり、送信されません。",
      },
      ko: {
        q: "이 용지 계산기는 무료인가요?",
        a: "무료이고 가입도 없습니다. 글은 브라우저 안에만 있고 올라가지 않습니다.",
      },
      es: {
        q: "¿La calculadora de páginas manuscritas es gratis?",
        a: "Sí. Sin registro. El texto se queda en el navegador y no se sube.",
      },
      de: {
        q: "Ist der Seitenzähler kostenlos?",
        a: "Ja. Ohne Konto. Der Text bleibt im Browser und wird nicht hochgeladen.",
      },
      fr: {
        q: "Le calculateur de pages manuscrites est-il gratuit ?",
        a: "Oui. Sans compte. Le texte reste dans le navigateur et n'est pas envoyé.",
      },
      pt: {
        q: "A calculadora de páginas manuscritas é grátis?",
        a: "Sim. Sem conta. O texto fica no navegador e não é enviado.",
      },
    },
  },
  {
    id: "page-calc-number",
    i18n: {
      en: {
        q: "Why do the number and the pasted text disagree?",
        a: "A number uses a model: about 4 mm per Latin letter, or a nearly square character on ruled paper, with a tighter and a looser figure beside it. Pasted text is measured in the handwriting font, so the page count follows that layout.",
      },
      zh: {
        q: "为什么只填数字和贴上正文的结果不一样?",
        a: "只填数字时用的是模型:拉丁字母大约 4 毫米宽,横线上的方块字接近行高,旁边还有更紧和更松两档。贴上正文后按手写字体的真实宽度排版,页数以这次排版为准。",
      },
      ja: {
        q: "数字だけと本文を貼ったときで結果が違うのはなぜですか?",
        a: "数字だけはモデルです。欧文は約4mm、罫線上の文字は行の高さに近い幅で、詰めと広げも出します。本文を貼ると手書きフォントの実幅で組むので、枚数はその組版に従います。",
      },
      ko: {
        q: "숫자만 넣을 때와 글을 붙일 때 결과가 다른 이유는?",
        a: "숫자만 있으면 모델입니다. 라틴 글자는 약 4mm, 줄 위의 네모 글자는 줄 높이에 가깝고, 더 좁은 값과 더 넓은 값도 나옵니다. 글을 붙이면 손글씨 글꼴의 실제 너비로 배치하므로 쪽수는 그 배치를 따릅니다.",
      },
      es: {
        q: "¿Por qué el número y el texto pegado no coinciden?",
        a: "El número usa un modelo: unos 4 mm por letra latina, o un carácter casi cuadrado en papel pautado, con una cifra más junta y otra más abierta. El texto pegado se mide en la fuente manuscrita, y las páginas salen de esa composición.",
      },
      de: {
        q: "Warum weichen Zahl und eingefügter Text voneinander ab?",
        a: "Eine Zahl benutzt ein Modell: etwa 4 mm pro lateinischem Buchstaben, oder ein fast quadratisches Zeichen auf Linien, dazu eine engere und eine weitere Schätzung. Eingefügter Text wird in der Schreibschrift gemessen, die Seitenzahl folgt diesem Satz.",
      },
      fr: {
        q: "Pourquoi le nombre et le texte collé ne donnent-ils pas la même chose ?",
        a: "Le nombre suit un modèle : environ 4 mm par lettre latine, ou un caractère presque carré sur du papier ligné, avec une estimation plus serrée et une plus large. Le texte collé est mesuré dans la police manuscrite, et les pages viennent de cette mise en page.",
      },
      pt: {
        q: "Por que o número e o texto colado não batem?",
        a: "O número usa um modelo: cerca de 4 mm por letra latina, ou um caractere quase quadrado no papel pautado, com uma estimativa mais junta e outra mais aberta. O texto colado é medido na fonte manuscrita, e as páginas saem dessa composição.",
      },
    },
  },
  {
    id: "page-calc-grid",
    i18n: {
      en: {
        q: "What happens on graph paper and genkou?",
        a: "One character per cell, including punctuation. The spacing slider does not apply. A 400-square genkou sheet holds 400 characters; a 200-square sheet holds 200.",
      },
      zh: {
        q: "方格纸和原稿纸怎么算?",
        a: "一字一格,标点也占一格。字间距滑杆不起作用。400 字原稿纸一面 400 字,200 字原稿纸一面 200 字。",
      },
      ja: {
        q: "方眼と原稿用紙はどう数えますか?",
        a: "1マス1字で、句読点も1マスです。字間のスライダーは効きません。400字詰めは400字、200字詰めは200字です。",
      },
      ko: {
        q: "모눈과 원고지는 어떻게 세나요?",
        a: "한 칸에 한 글자이고 문장부호도 한 칸입니다. 자간 슬라이더는 적용되지 않습니다. 400자 원고지는 400자, 200자 원고지는 200자입니다.",
      },
      es: {
        q: "¿Cómo cuentan la cuadrícula y el genkō?",
        a: "Un carácter por casilla, puntuación incluida. El control de espaciado no actúa. Un genkō de 400 casillas cabe 400 caracteres; uno de 200, 200.",
      },
      de: {
        q: "Wie zählen Kästchenpapier und Genkō?",
        a: "Ein Zeichen pro Feld, Satzzeichen mitgezählt. Der Abstandsregler gilt nicht. Genkō mit 400 Feldern fasst 400 Zeichen, mit 200 Feldern 200.",
      },
      fr: {
        q: "Comment comptent la grille et le genkō ?",
        a: "Un caractère par case, ponctuation comprise. Le curseur d'espacement ne s'applique pas. Un genkō de 400 cases contient 400 caractères ; un de 200 en contient 200.",
      },
      pt: {
        q: "Como contam o quadriculado e o genkō?",
        a: "Um caractere por casa, pontuação incluída. O controle de espaçamento não vale. Um genkō de 400 casas cabe 400 caracteres; um de 200 cabe 200.",
      },
    },
  },
];

/** /cursive-text-generator 工具页 FAQ(8 语言) */
export const CURSIVE_TEXT_FAQS: FaqItem[] = [
  {
    id: "ct-free",
    i18n: {
      en: {
        q: "Is the cursive text generator free?",
        a: "Yes — no signup, no watermark. The conversion runs in your browser, and nothing you type or say is uploaded.",
      },
      zh: {
        q: "花体文字生成器免费吗?",
        a: "免费——无需注册、没有水印。转换在你浏览器里完成,输入的文字和语音都不会上传。",
      },
      ja: {
        q: "筆記体テキスト ジェネレーターは無料ですか?",
        a: "はい——登録不要、透かしなし。変換はブラウザ内で行われ、入力した文字・音声がアップロードされることはありません。",
      },
      ko: {
        q: "필기체 텍스트 생성기는 무료인가요?",
        a: "네 — 가입도 워터마크도 없어요. 변환은 브라우저에서 처리되며, 입력한 글자나 음성이 업로드되지 않습니다.",
      },
      es: {
        q: "¿El generador de texto cursivo es gratis?",
        a: "Sí: sin registro ni marca de agua. La conversión ocurre en tu navegador y nada de lo que escribes o dices se sube a ningún servidor.",
      },
      de: {
        q: "Ist der Schreibschrift-Text-Generator kostenlos?",
        a: "Ja — keine Anmeldung, kein Wasserzeichen. Die Umwandlung läuft im Browser, und nichts von dem, was du tippst oder sagst, wird hochgeladen.",
      },
      fr: {
        q: "Le générateur de texte cursif est-il gratuit ?",
        a: "Oui — sans inscription ni filigrane. La conversion se fait dans votre navigateur, et rien de ce que vous tapez ou dictez n'est envoyé sur un serveur.",
      },
      pt: {
        q: "O gerador de texto cursivo é grátis?",
        a: "Sim — sem cadastro e sem marca d'água. A conversão acontece no seu navegador, e nada do que você digita ou fala é enviado para servidores.",
      },
    },
  },
  {
    id: "ct-where",
    i18n: {
      en: {
        q: "Where can I paste cursive text?",
        a: "Anywhere that accepts text: Instagram bios and captions, TikTok, Discord nicknames, WhatsApp messages, notes apps. It will not work in a word processor's font menu, and it is not for print — for paper you want a printable font.",
      },
      zh: {
        q: "花体文字可以粘贴到哪里?",
        a: "所有能输入文字的地方都可以:Instagram 简介和配文、TikTok、Discord 昵称、WhatsApp 消息、备忘录。它不能用于 Word 的字体菜单,也不适合打印——要打印请用可安装的花体字体。",
      },
      ja: {
        q: "筆記体テキストはどこに貼り付けられますか?",
        a: "テキストを受け付ける場所ならどこでも:Instagram のプロフィールやキャプション、TikTok、Discord のニックネーム、WhatsApp、メモアプリなど。ワープロのフォントメニューには使えず、印刷にも向きません。印刷用はインストール型の筆記体フォントを。",
      },
      ko: {
        q: "필기체 텍스트는 어디에 붙여넣을 수 있나요?",
        a: "텍스트를 입력할 수 있는 곳이라면 어디든: Instagram 프로필과 자막, TikTok, Discord 닉네임, WhatsApp 메시지, 메모 앱 등요. 워드 프로세서의 글꼴 메뉴에는 쓸 수 없고 인쇄에도 적합하지 않습니다. 인쇄용이라면 설치형 필기체 글꼴을 사용하세요.",
      },
      es: {
        q: "¿Dónde puedo pegar texto cursivo?",
        a: "En cualquier sitio que acepte texto: la bio y los pies de Instagram, TikTok, el nick de Discord, mensajes de WhatsApp, apps de notas. No sirve en el menú de fuentes de un procesador de textos ni para imprimir; para papel, mejor una fuente instalable.",
      },
      de: {
        q: "Wo kann ich Schreibschrift-Text einfügen?",
        a: "Überall, wo Text erlaubt ist: Instagram-Bio und -Bildunterschriften, TikTok, Discord-Namen, WhatsApp-Nachrichten, Notiz-Apps. Im Schriftarten-Menü einer Textverarbeitung funktioniert er nicht, und zum Drucken taugt er nicht — dafür nimm eine installierbare Schreibschrift.",
      },
      fr: {
        q: "Où puis-je coller du texte cursif ?",
        a: "Partout où on saisit du texte : bio et légendes Instagram, TikTok, pseudo Discord, messages WhatsApp, apps de notes. Ça ne marche pas dans le menu des polices d'un traitement de texte ni à l'impression — pour le papier, utilisez une police installable.",
      },
      pt: {
        q: "Onde posso colar texto cursivo?",
        a: "Em qualquer lugar que aceite texto: bio e legendas do Instagram, TikTok, apelido no Discord, mensagens do WhatsApp, apps de notas. Não funciona no menu de fontes de um editor de texto nem para impressão — para papel, use uma fonte instalável.",
      },
    },
  },
  {
    id: "ct-font",
    i18n: {
      en: {
        q: "Is this a cursive font?",
        a: "No. Each letter is swapped for a Unicode character that looks handwritten (from the mathematical script symbols), so the style travels with the text and needs no install. A real cursive font only changes how text looks inside one app.",
      },
      zh: {
        q: "这是花体字体吗?",
        a: "不是。它把每个字母替换成看起来像手写的 Unicode 字符(数学花体符号区),样式跟着文字走,无需安装任何东西。真正的花体字体只在安装了它的应用里生效。",
      },
      ja: {
        q: "これは筆記体フォントですか?",
        a: "いいえ。一文字ずつ、手書き風に見える Unicode の文字(数学用スクリプト記号)に置き換えています。装飾がテキストについて回るので、インストールは不要です。本物の筆記体フォントは、インストール済みのアプリ内でしか効きません。",
      },
      ko: {
        q: "이것은 필기체 글꼴인가요?",
        a: "아니요. 각 글자를 손글씨처럼 보이는 Unicode 문자(수학용 스크립트 기호)로 바꾸는 방식이라, 스타일이 텍스트를 따라다니고 설치가 필요 없어요. 진짜 필기체 글꼴은 설치된 앱 안에서만 적용됩니다.",
      },
      es: {
        q: "¿Esto es una fuente cursiva?",
        a: "No. Cada letra se cambia por un carácter Unicode con aspecto manuscrito (de los símbolos script matemáticos), así el estilo viaja con el texto sin instalar nada. Una fuente cursiva de verdad solo cambia el aspecto del texto dentro de una app.",
      },
      de: {
        q: "Ist das eine Schreibschrift-Schriftart?",
        a: "Nein. Jeder Buchstabe wird durch ein handgeschrieben aussehendes Unicode-Zeichen ersetzt (aus den mathematischen Script-Symbolen), deshalb wandert der Stil mit dem Text mit – ohne Installation. Eine echte Schreibschrift ändert nur innerhalb einer App das Aussehen.",
      },
      fr: {
        q: "Est-ce une police cursive ?",
        a: "Non. Chaque lettre est remplacée par un caractère Unicode à l'aspect manuscrit (les symboles script mathématiques), donc le style suit le texte sans aucune installation. Une vraie police cursive ne change l'apparence qu'au sein d'une seule application.",
      },
      pt: {
        q: "Isto é uma fonte cursiva?",
        a: "Não. Cada letra é trocada por um caractere Unicode com aparência manuscrita (dos símbolos script matemáticos), então o estilo viaja com o texto sem instalar nada. Uma fonte cursiva de verdade só muda o visual do texto dentro de um app.",
      },
    },
  },
  {
    id: "ct-boxes",
    i18n: {
      en: {
        q: "Why do some characters show up as boxes?",
        a: "Some older phones and browsers lack glyphs for a few of these symbols. Switch styles — the typewriter style maps every letter and digit to a character that almost every device renders.",
      },
      zh: {
        q: "为什么有些字符显示成方框?",
        a: "部分旧手机和浏览器缺少这几个符号的字形。换一种风格即可——打字机体把每个字母和数字都映射成几乎所有设备都能显示的字符。",
      },
      ja: {
        q: "一部の文字が四角(□)で表示されるのはなぜ?",
        a: "古いスマホやブラウザには、これらの記号の一部の字形がありません。スタイルを変えてみてください。タイプライター スタイルは全字母・数字を、ほとんどの端末が表示できる文字に対応づけます。",
      },
      ko: {
        q: "일부 글자가 네모(□)로 보이는 이유는요?",
        a: "일부 오래된 휴대폰과 브라우저에는 이 기호 몇 개의 글자 모양이 없어요. 스타일을 바꿔 보세요. 타자기체는 모든 글자와 숫자를 대부분의 기기가 표시할 수 있는 문자로 바꿉니다.",
      },
      es: {
        q: "¿Por qué algunos caracteres se ven como cuadros?",
        a: "Algunos móviles y navegadores antiguos no tienen los glifos de ciertos símbolos. Cambia de estilo: el de máquina de escribir asigna cada letra y dígito a caracteres que casi todos los dispositivos muestran.",
      },
      de: {
        q: "Warum zeigen manche Zeichen nur Kästchen?",
        a: "Ein paar ältere Handys und Browser haben für manche dieser Symbole keine Glyphen. Wechsle den Stil: Die Schreibmaschine bildet jeden Buchstaben und jede Ziffer auf Zeichen ab, die fast alle Geräte darstellen.",
      },
      fr: {
        q: "Pourquoi certains caractères s'affichent en carrés ?",
        a: "Quelques téléphones et navigateurs anciens n'ont pas les glyphes de certains de ces symboles. Changez de style : la machine à écrire associe chaque lettre et chaque chiffre à des caractères que presque tous les appareils affichent.",
      },
      pt: {
        q: "Por que alguns caracteres aparecem como quadrados?",
        a: "Alguns celulares e navegadores antigos não têm os glifos de certos símbolos. Troque de estilo: o de máquina de escrever mapeia cada letra e dígito para caracteres que quase todos os aparelhos exibem.",
      },
    },
  },
];

/** /cursive-font-generator 工具页 FAQ(8 语言) */
export const CURSIVE_FONT_FAQS: FaqItem[] = [
  {
    id: "cf-install",
    i18n: {
      en: {
        q: "Do I need to install the fonts to use them?",
        a: "No. All thirteen fonts are bundled with the site and render right in your browser — type your text, and each preview line is real typography, not an approximation. Downloads give you a PNG, an SVG with the font embedded, or a PDF of your text; if you want the font files themselves for design software, each row links to the font's Google Fonts page.",
      },
      zh: {
        q: "使用这些字体需要安装吗?",
        a: "不需要。十三款字体全部内嵌在网站里,在浏览器中直接渲染——输入文字,每一行预览都是真实的字体排版,不是近似效果。下载得到的是文字的 PNG、内嵌字体的 SVG 或 PDF;如果你想要字体文件本身用于设计软件,每一行都附了该字体在 Google Fonts 的页面链接。",
      },
      ja: {
        q: "フォントをインストールする必要はありますか?",
        a: "不要です。13書体すべてサイトに同梱されており、ブラウザ上で直接レンダリングされます。文字を入力すると、各行のプレビューは近似ではなく本物のタイポグラフィです。ダウンロードできるのはテキストのPNG、フォントを埋め込んだSVG、またはPDFです。デザインソフト用のフォントファイル本体が欲しい場合は、各行からGoogle Fontsのページへリンクしています。",
      },
      ko: {
        q: "글꼴을 설치해야 하나요?",
        a: "아니요. 13개 글꼴 모두 사이트에 포함되어 브라우저에서 바로 렌더링됩니다. 텍스트를 입력하면 각 미리보기 줄이 근사치가 아니라 실제 타이포그래피예요. 다운로드는 텍스트의 PNG, 글꼴이 포함된 SVG, 또는 PDF로 제공되고, 디자인 소프트웨어용 글꼴 파일 자체가 필요하면 각 행에서 Google Fonts 페이지로 연결됩니다.",
      },
      es: {
        q: "¿Necesito instalar las fuentes para usarlas?",
        a: "No. Las trece fuentes están incluidas en el sitio y se renderizan directamente en tu navegador: escribe tu texto y cada línea de vista previa es tipografía real, no una aproximación. Las descargas son un PNG, un SVG con la fuente incrustada o un PDF de tu texto; si quieres los archivos de fuente para software de diseño, cada fila enlaza a la página de la fuente en Google Fonts.",
      },
      fr: {
        q: "Faut-il installer les polices pour les utiliser ?",
        a: "Non. Les treize polices sont intégrées au site et s'affichent directement dans votre navigateur : tapez votre texte, chaque ligne d'aperçu est une vraie typographie, pas une approximation. Les téléchargements donnent un PNG, un SVG avec la police intégrée ou un PDF de votre texte ; si vous voulez les fichiers de polices pour un logiciel de design, chaque ligne renvoie vers la page Google Fonts de la police.",
      },
      de: {
        q: "Muss ich die Schriftarten installieren?",
        a: "Nein. Alle dreizehn Schriftarten sind in die Website eingebettet und werden direkt im Browser gerendert — tippe deinen Text, jede Vorschauzeile ist echte Typografie, keine Annäherung. Die Downloads liefern deinen Text als PNG, als SVG mit eingebetteter Schrift oder als PDF; wer die Schriftdateien selbst für Designsoftware möchte, findet in jeder Zeile den Link zur Google-Fonts-Seite.",
      },
      pt: {
        q: "Preciso instalar as fontes para usá-las?",
        a: "Não. As treze fontes vêm embutidas no site e são renderizadas direto no navegador — digite seu texto e cada linha de pré-visualização é tipografia real, não uma aproximação. Os downloads geram um PNG, um SVG com a fonte embutida ou um PDF do seu texto; se quiser os arquivos das fontes para software de design, cada linha tem o link para a página da fonte no Google Fonts.",
      },
    },
  },
  {
    id: "cf-commercial",
    i18n: {
      en: {
        q: "Can I use the exports commercially?",
        a: "Yes. Every font here is licensed under the SIL Open Font License 1.1, which permits personal and commercial use — printed cards, invitations, products, logos. The license covers the font software; the images you export are yours. Each row labels the font's author and license so you can verify anytime.",
      },
      zh: {
        q: "导出的图可以商用吗?",
        a: "可以。这里的十三款字体都采用 SIL Open Font License 1.1 授权,允许个人和商业使用——印刷卡片、请柬、产品、标志都可以。该授权针对字体软件本身;你导出的图片归你所有。每一行都标注了字体的作者与授权,方便随时核对。",
      },
      ja: {
        q: "書き出した画像を商用利用できますか?",
        a: "できます。ここにある13書体はすべてSIL Open Font License 1.1で、個人・商用を問わず利用可能です。印刷カードや招待状、商品、ロゴなどに使えます。ライセンスはフォントソフトウェアに適用され、書き出した画像はあなたのものです。各行に作者とライセンスを明記しているので、いつでも確認できます。",
      },
      ko: {
        q: "내보낸 이미지를 상업적으로 쓸 수 있나요?",
        a: "네. 여기의 13개 글꼴은 모두 SIL Open Font License 1.1이라 개인 및 상업적 사용이 허용됩니다. 인쇄 카드, 청첩장, 제품, 로고 모두 가능해요. 라이선스는 글꼴 소프트웨어에 적용되고, 내보낸 이미지는 여러분의 소유입니다. 각 행에 글꼴 저자와 라이선스를 표시해 두었으니 언제든 확인할 수 있어요.",
      },
      es: {
        q: "¿Puedo usar las exportaciones con fines comerciales?",
        a: "Sí. Todas las fuentes de esta página tienen la licencia SIL Open Font License 1.1, que permite el uso personal y comercial: tarjetas impresas, invitaciones, productos, logotipos. La licencia cubre el software de la fuente; las imágenes que exportas son tuyas. Cada fila indica el autor y la licencia para que puedas verificarlo en cualquier momento.",
      },
      fr: {
        q: "Puis-je utiliser les exports commercialement ?",
        a: "Oui. Toutes les polices de cette page sont sous licence SIL Open Font License 1.1, qui autorise l'usage personnel et commercial — cartes imprimées, faire-part, produits, logos. La licence porte sur le logiciel de police ; les images que vous exportez vous appartiennent. Chaque ligne indique l'auteur et la licence de la police pour vérification à tout moment.",
      },
      de: {
        q: "Darf ich die Exporte kommerziell nutzen?",
        a: "Ja. Alle Schriftarten hier stehen unter der SIL Open Font License 1.1, die private und kommerzielle Nutzung erlaubt — gedruckte Karten, Einladungen, Produkte, Logos. Die Lizenz betrifft die Font-Software; die exportierten Bilder gehören dir. In jeder Zeile stehen Autor und Lizenz, damit du es jederzeit nachprüfen kannst.",
      },
      pt: {
        q: "Posso usar as exportações comercialmente?",
        a: "Sim. Todas as fontes desta página usam a licença SIL Open Font License 1.1, que permite uso pessoal e comercial — cartões impressos, convites, produtos, logotipos. A licença cobre o software da fonte; as imagens que você exporta são suas. Cada linha indica o autor e a licença para você verificar a qualquer momento.",
      },
    },
  },
  {
    id: "cf-vs-unicode",
    i18n: {
      en: {
        q: "How is this different from a cursive text generator?",
        a: "Unicode cursive generators swap your letters for look-alike symbols you can paste as plain text into bios and chats — but they are not fonts, they can't be printed at high quality, and screen readers read them letter by letter. This page uses real typefaces and outputs images and PDFs: the right tool for cards, envelopes and anything on paper. If you want pasteable text, use the cursive text generator instead.",
      },
      zh: {
        q: "这和「花体文字生成器」有什么区别?",
        a: "Unicode 花体生成器把你的字母替换成外形相似的符号,可以以纯文本粘贴进简介和聊天——但那不是字体,无法高质量印刷,读屏软件也会逐字朗读。本页用的是真正的字体,输出图片和 PDF:适合卡片、信封和一切纸面用途。如果你要的是可粘贴文本,请用花体文字生成器。",
      },
      ja: {
        q: "筆記体テキスト生成器との違いは?",
        a: "Unicodeの筆記体ジェネレーターは、文字を見た目の似た記号に置き換えて、バイオやチャットに貼り付けられるテキストにします。ただしフォントではなく、高品質印刷には向かず、スクリーンリーダーは一文字ずつ読み上げます。このページは本物の書体を使い、画像とPDFを出力します。カードや封筒など紙面向けの用途に最適です。貼り付け可能なテキストが欲しい場合は、筆記体テキスト生成器をご利用ください。",
      },
      ko: {
        q: "필기체 텍스트 생성기와 뭐가 다른가요?",
        a: "유니코드 필기체 생성기는 글자를 생김새가 비슷한 기호로 바꿔 소개글과 채팅에 붙여넣을 수 있는 텍스트로 만들어요. 하지만 그건 글꼴이 아니라 고품질 인쇄에 부적합하고, 스크린 리더는 글자를 하나씩 읽습니다. 이 페이지는 실제 서체를 사용해 이미지와 PDF를 출력합니다. 카드, 봉투 등 종이에 쓰이는 용도에 적합해요. 붙여넣기용 텍스트가 필요하면 필기체 텍스트 생성기를 이용하세요.",
      },
      es: {
        q: "¿En qué se diferencia de un generador de texto cursivo?",
        a: "Los generadores Unicode de texto cursivo cambian tus letras por símbolos parecidos que puedes pegar como texto plano en biografías y chats — pero no son fuentes, no se pueden imprimir con calidad y los lectores de pantalla las leen letra por letra. Esta página usa tipografías reales y genera imágenes y PDF: la herramienta correcta para tarjetas, sobres y cualquier cosa en papel. Si quieres texto pegable, usa el generador de texto cursivo.",
      },
      fr: {
        q: "Quelle différence avec un générateur de texte cursif ?",
        a: "Les générateurs Unicode remplacent vos lettres par des symboles ressemblants que vous pouvez coller comme texte brut dans des bios ou des chats — mais ce ne sont pas des polices, ils ne s'impriment pas en haute qualité et les lecteurs d'écran les lisent lettre par lettre. Cette page utilise de vraies polices et produit des images et des PDF : l'outil adapté aux cartes, aux enveloppes et à tout ce qui s'imprime. Pour du texte à coller, utilisez le générateur de texte cursif.",
      },
      de: {
        q: "Was ist der Unterschied zu einem Schreibschrift-Textgenerator?",
        a: "Unicode-Generatoren ersetzen deine Buchstaben durch ähnlich aussehende Symbole, die du als Klartext in Bios und Chats einfügen kannst — aber das sind keine Schriftarten, sie lassen sich nicht hochwertig drucken und Screenreader lesen sie Buchstabe für Buchstabe vor. Diese Seite nutzt echte Schriften und erzeugt Bilder und PDFs: das richtige Werkzeug für Karten, Umschläge und alles auf Papier. Für einfügbaren Text nimm den Schreibschrift-Textgenerator.",
      },
      pt: {
        q: "Qual é a diferença para um gerador de texto cursivo?",
        a: "Geradores Unicode trocam suas letras por símbolos parecidos que você pode colar como texto simples em bios e chats — mas não são fontes, não imprimem em alta qualidade e leitores de tela leem letra por letra. Esta página usa fontes de verdade e gera imagens e PDFs: a ferramenta certa para cartões, envelopes e tudo o que vai para o papel. Para texto colável, use o gerador de texto cursivo.",
      },
    },
  },
];

/** /printable-handwritten-letters */
export const BULK_LETTER_FAQS: FaqItem[] = [
  {
    id: "bulk-mail",
    i18n: {
      en: {
        q: "Will you mail these letters?",
        a: "No. The page makes two PDFs, one of letters and one of envelopes. You print them, add postage, and mail them yourself. Nothing is sent from this site.",
      },
      zh: {
        q: "你们会帮我寄出这些信吗?",
        a: "不会。这个页面只生成两份 PDF:信件和信封。打印、贴邮票、寄出都由你自己完成。本站不寄任何东西。",
      },
      ja: {
        q: "手紙を発送してもらえますか?",
        a: "いいえ。このページが作るのは手紙と封筒、2 つの PDF だけです。印刷し、切手を貼り、ご自身で投函してください。このサイトから何かが送られることはありません。",
      },
      ko: {
        q: "이 편지를 대신 보내 주나요?",
        a: "아니요. 이 페이지는 편지 PDF와 봉투 PDF 두 개만 만듭니다. 인쇄하고 우표를 붙여 직접 보내세요. 이 사이트에서 아무것도 발송하지 않습니다.",
      },
      es: {
        q: "¿Envían estas cartas?",
        a: "No. La página genera dos PDF: las cartas y los sobres. Tú los imprimes, pones el sello y los envías. Desde este sitio no sale ningún envío.",
      },
      de: {
        q: "Verschickt ihr diese Briefe?",
        a: "Nein. Die Seite erzeugt zwei PDFs: Briefe und Umschläge. Du druckst sie, frankierst sie und wirfst sie selbst ein. Von dieser Website wird nichts verschickt.",
      },
      fr: {
        q: "Est-ce que vous expédiez ces lettres ?",
        a: "Non. La page produit deux PDF : les lettres et les enveloppes. Vous les imprimez, vous affranchissez et vous les postez. Rien n'est envoyé depuis ce site.",
      },
      pt: {
        q: "Vocês enviam essas cartas?",
        a: "Não. A página gera dois PDFs: as cartas e os envelopes. Você imprime, cola o selo e envia. Nada é despachado por este site.",
      },
    },
  },
  {
    id: "bulk-real",
    i18n: {
      en: {
        q: "Is the writing done with a pen?",
        a: "No. Each note is set in a handwriting font, with small shifts so the lines are not perfectly even. It is not ink from a pen, and it should not be passed off as a handwritten original.",
      },
      zh: {
        q: "这些字是笔写的吗?",
        a: "不是。每封信用的是手写字体,并加了一点轻微错落,所以不会像印刷体那样齐。这不是钢笔字,也不应当当成手写原件给人。",
      },
      ja: {
        q: "ペンで書かれた文字ですか?",
        a: "いいえ。手書きフォントで組み、わずかに揺らして直線的に見えないようにしています。ペンのインクではなく、手書きの原本として渡さないでください。",
      },
      ko: {
        q: "펜으로 쓴 글씨인가요?",
        a: "아니요. 손글씨 글꼴로 조판하고, 줄이 너무 반듯하지 않도록 조금씩 흔듭니다. 펜으로 쓴 글씨가 아니며, 손글씨 원본인 것처럼 건네지 마세요.",
      },
      es: {
        q: "¿Está escrito con pluma?",
        a: "No. Cada nota usa una fuente de letra manuscrita, con pequeños desplazamientos para que las líneas no queden perfectamente rectas. No es tinta de pluma y no debe presentarse como un original escrito a mano.",
      },
      de: {
        q: "Ist das mit einem Stift geschrieben?",
        a: "Nein. Jede Notiz steht in einer Handschrift, leicht versetzt, damit die Zeilen nicht wie gedruckt aussehen. Es ist keine Tinte vom Stift und sollte nicht als handgeschriebenes Original ausgegeben werden.",
      },
      fr: {
        q: "Est-ce écrit à la plume ?",
        a: "Non. Chaque mot est composé dans une police manuscrite, avec de légers décalages pour que les lignes ne soient pas parfaitement droites. Ce n'est pas de l'encre, et il ne faut pas le présenter comme un original écrit à la main.",
      },
      pt: {
        q: "A escrita é feita à caneta?",
        a: "Não. Cada bilhete usa uma fonte de letra manuscrita, com pequenos deslocamentos para as linhas não ficarem perfeitamente retas. Não é tinta de caneta e não deve ser apresentado como um original escrito à mão.",
      },
    },
  },
  {
    id: "bulk-csv",
    i18n: {
      en: {
        q: "How should the recipient list be formatted?",
        a: "The first row is a header: name, street, city, region, postal. One person per row after that, up to 30. An optional message column replaces the note in the box for that row. {name} in the note becomes that person's name. You can paste the table or import the Excel template (.xlsx or .csv) from the page.",
      },
      zh: {
        q: "收件人名单要怎么写?",
        a: "第一行是表头:name, street, city, region, postal。表头用这几个英文单词。下面每人一行,最多 30 人。可选的 message 列会替换这一行的正文。正文里的 {name} 会换成这个人的名字。可以粘贴表格,也可以导入页面上的 Excel 模板(.xlsx 或 .csv)。",
      },
      ja: {
        q: "宛先リストの形式は?",
        a: "1 行目は見出しです: name, street, city, region, postal。見出しはこの英単語のままにしてください。続く行が 1 人ずつ、最大 30 人です。任意の message 列があるとその行だけ本文の代わりになります。本文の {name} はその人の名前に置き換わります。貼り付けるか、ページの Excel テンプレート（.xlsx または .csv）を読み込めます。",
      },
      ko: {
        q: "받는 사람 목록은 어떤 형식인가요?",
        a: "첫 줄은 머리글입니다: name, street, city, region, postal. 머리글은 이 영어 단어를 그대로 두세요. 그 아래는 한 줄에 한 명, 최대 30명입니다. 선택 항목인 message 열이 있으면 그 줄은 본문 대신 그 내용을 씁니다. 본문의 {name}은 그 사람의 이름으로 바뀝니다. 붙여 넣거나 페이지의 Excel 서식(.xlsx 또는 .csv)을 가져올 수 있습니다.",
      },
      es: {
        q: "¿Cómo tiene que ir la lista de destinatarios?",
        a: "La primera fila es el encabezado: name, street, city, region, postal. Esas palabras van en inglés. Después, una persona por fila, hasta 30. Una columna opcional message sustituye la nota del recuadro en esa fila. {name} en el texto se cambia por el nombre de esa persona. Puedes pegar la tabla o importar la plantilla Excel (.xlsx o .csv) de la página.",
      },
      de: {
        q: "Wie muss die Empfängerliste aussehen?",
        a: "Die erste Zeile ist die Kopfzeile: name, street, city, region, postal. Diese Wörter bleiben englisch. Danach eine Person pro Zeile, höchstens 30. Eine optionale Spalte message ersetzt für diese Zeile den Text im Feld. {name} im Text wird zum Namen dieser Person. Die Tabelle lässt sich einfügen oder aus der Excel-Vorlage der Seite importieren (.xlsx oder .csv).",
      },
      fr: {
        q: "Comment formater la liste des destinataires ?",
        a: "La première ligne est l'en-tête : name, street, city, region, postal. Ces mots restent en anglais. Ensuite, une personne par ligne, jusqu'à 30. Une colonne facultative message remplace le texte du cadre pour cette ligne. {name} dans le texte devient le nom de la personne. Tu peux coller le tableau ou importer le modèle Excel de la page (.xlsx ou .csv).",
      },
      pt: {
        q: "Como formatar a lista de destinatários?",
        a: "A primeira linha é o cabeçalho: name, street, city, region, postal. Essas palavras ficam em inglês. Depois, uma pessoa por linha, até 30. Uma coluna opcional message substitui o texto da caixa naquela linha. {name} no texto vira o nome da pessoa. Dá para colar a tabela ou importar o modelo Excel da página (.xlsx ou .csv).",
      },
    },
  },
];
