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
        a: "Yes — no signup, no watermark. Both cursive fonts are open source, and PNG/PDF exports are unlimited.",
      },
      zh: {
        q: "这个花体生成器免费吗?",
        a: "免费——无需注册、没有水印。两种花体字均为开源字体,PNG/PDF 导出不限次数。",
      },
      ja: {
        q: "筆記体ジェネレーターは無料ですか?",
        a: "はい——登録不要、透かしなし。どちらの筆記体フォントもオープンソースで、PNG/PDF 書き出しは無制限です。",
      },
      ko: {
        q: "필기체 생성기는 무료인가요?",
        a: "네 — 가입도 워터마크도 없습니다. 두 필기체 글꼴 모두 오픈소스이며 PNG/PDF 내보내기는 무제한이에요.",
      },
      es: {
        q: "¿El generador de letra cursiva es gratis?",
        a: "Sí — sin registro ni marca de agua. Ambas fuentes cursivas son open source y las exportaciones en PNG/PDF son ilimitadas.",
      },
      de: {
        q: "Ist der Schreibschrift-Generator kostenlos?",
        a: "Ja — keine Anmeldung, kein Wasserzeichen. Beide Schreibschriften sind Open Source, und PNG-/PDF-Exporte sind unbegrenzt.",
      },
      fr: {
        q: "Le générateur d'écriture cursive est-il gratuit ?",
        a: "Oui — sans inscription ni filigrane. Les deux polices cursives sont open source et les exports PNG/PDF sont illimités.",
      },
      pt: {
        q: "O gerador de escrita cursiva é grátis?",
        a: "Sim — sem cadastro e sem marca d'água. As duas fontes cursivas são open source e as exportações em PNG/PDF são ilimitadas.",
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
        q: "Are the tracing letters dotted outlines?",
        a: "No — the tracing rows are solid light-gray letters to write over. If your child needs numbered stroke arrows, pair the sheets with letter-formation cards.",
      },
      zh: {
        q: "描红字母是虚线轮廓吗?",
        a: "不是——描红行是浅灰实心字母,直接在上面书写即可。如果孩子需要笔画箭头提示,可以配合字母笔顺卡片使用。",
      },
      ja: {
        q: "なぞる文字は点線の輪郭ですか?",
        a: "いいえ——なぞり書きの行は薄い灰色の塗り文字です。筆順の矢印が必要な場合は、文字の筆順カードと併用してください。",
      },
      ko: {
        q: "따라 쓰는 글자가 점선 윤곽인가요?",
        a: "아니요 — 연습 행은 그 위에 쓰는 옅은 회색 실선 글자예요. 획순 화살표가 필요하면 글자 모양 카드와 함께 사용하세요.",
      },
      es: {
        q: "¿Las letras para calcar son contornos punteados?",
        a: "No — las filas de calco son letras gris claro sólidas para escribir encima. Si tu hijo necesita flechas de trazo numeradas, combina las fichas con tarjetas de formación de letras.",
      },
      de: {
        q: "Sind die Nachspur-Buchstaben gepunktete Umrisse?",
        a: "Nein — die Übungszeilen zeigen vollständige hellgraue Buchstaben zum Drüberschreiben. Wenn dein Kind nummerierte Strichpfeile braucht, kombiniere die Blätter mit Buchstaben-Karten.",
      },
      fr: {
        q: "Les lettres à repasser sont-elles en pointillés ?",
        a: "Non — les lignes de repassage sont des lettres gris clair pleines à recouvrir. Si votre enfant a besoin de flèches de tracé numérotées, associez les fiches à des cartes de formation des lettres.",
      },
      pt: {
        q: "As letras para calcar são contornos pontilhados?",
        a: "Não — as linhas de caligrafia são letras cinza-claro sólidas para escrever por cima. Se seu filho precisa de setas de traço numeradas, combine as fichas com cartões de formação de letras.",
      },
    },
  },
  {
    id: "tracing-class",
    i18n: {
      en: {
        q: "Can I make worksheets for the whole class?",
        a: "Type one name per line; the page loops through every name with a dark example row followed by light-gray tracing rows. Print one copy per student.",
      },
      zh: {
        q: "能给全班同学生成练习纸吗?",
        a: "每行输入一个姓名,页面会循环填充:每个名字先深色示范,后浅灰描红。每位学生打印一页即可。",
      },
      ja: {
        q: "クラス全員分のプリントを作れますか?",
        a: "1 行に 1 つの名前を入力すると、各名前について濃い色のお手本行 + 薄い灰色のなぞり行が順に生成されます。児童の数だけ印刷してください。",
      },
      ko: {
        q: "반 전체 학생 연습장을 만들 수 있나요?",
        a: "한 줄에 이름을 하나씩 입력하면 페이지가 각 이름마다 진한 예시 행과 옅은 회색 연습 행을 차례로 만들어 줍니다. 학생 수만큼 인쇄하세요.",
      },
      es: {
        q: "¿Puedo hacer fichas para toda la clase?",
        a: "Escribe un nombre por línea; la página recorre cada nombre con una fila de ejemplo oscura seguida de filas grises para calcar. Imprime una copia por alumno.",
      },
      de: {
        q: "Kann ich Arbeitsblätter für die ganze Klasse erstellen?",
        a: "Tippe pro Zeile einen Namen; die Seite durchläuft jeden Namen mit einer dunklen Beispielzeile gefolgt von hellgrauen Nachspurzeilen. Ein Ausdruck pro Kind genügt.",
      },
      fr: {
        q: "Puis-je créer des fiches pour toute la classe ?",
        a: "Tapez un prénom par ligne ; la page enchaîne chaque prénom avec une ligne d'exemple foncée suivie de lignes gris clair à repasser. Imprimez une copie par élève.",
      },
      pt: {
        q: "Posso criar fichas para a turma inteira?",
        a: "Digite um nome por linha; a página percorre cada nome com uma linha de exemplo escura seguida de linhas cinza-claro para calcar. Imprima uma cópia por aluno.",
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
        a: "Yes — unlimited pages, no signup, no watermark. PDF and PNG downloads are free for home and classroom use.",
      },
      zh: {
        q: "名字涂色页生成器免费吗?",
        a: "免费——页数不限、无需注册、无水印。PDF 和 PNG 下载免费,家庭和课堂都能用。",
      },
      ja: {
        q: "名前ぬりえメーカーは無料ですか?",
        a: "はい——ページは無制限、登録不要、透かしなし。PDF と PNG のダウンロードは無料で、家庭でも学校でも使えます。",
      },
      ko: {
        q: "이름 색칠 페이지 생성기는 무료인가요?",
        a: "네 — 페이지 무제한, 가입 불필요, 워터마크 없음. PDF와 PNG 다운로드는 무료로 집에서도 교실에서도 쓸 수 있어요.",
      },
      es: {
        q: "¿El generador de páginas para colorear con nombres es gratis?",
        a: "Sí — páginas ilimitadas, sin registro ni marca de agua. Las descargas en PDF y PNG son gratis para casa y aula.",
      },
      de: {
        q: "Ist der Ausmalbilder-Generator für Namen kostenlos?",
        a: "Ja — unbegrenzt viele Seiten, keine Anmeldung, kein Wasserzeichen. PDF- und PNG-Downloads sind kostenlos für Zuhause und Klassenzimmer.",
      },
      fr: {
        q: "Le générateur de coloriages de prénoms est-il gratuit ?",
        a: "Oui — pages illimitées, sans inscription ni filigrane. Les téléchargements PDF et PNG sont gratuits pour la maison et la classe.",
      },
      pt: {
        q: "O gerador de páginas para colorir com nomes é grátis?",
        a: "Sim — páginas ilimitadas, sem cadastro e sem marca d'água. Os downloads em PDF e PNG são grátis para casa e sala de aula.",
      },
    },
  },
  {
    id: "coloring-how",
    i18n: {
      en: {
        q: "How do I make a coloring page with my child's name?",
        a: "Type the name, pick a playful font, and the page draws bubble-letter outlines of each character with stars and hearts to color.",
      },
      zh: {
        q: "怎么给孩子做名字涂色页?",
        a: "输入名字、选一个可爱字体,页面会自动画出每个字的大气泡轮廓,并配上星星爱心装饰。",
      },
      ja: {
        q: "子どもの名前のぬりえはどうやって作りますか?",
        a: "名前を入力してポップなフォントを選ぶだけ。各文字の吹き出し風の輪郭と、塗れる星・ハートの飾りが自動で描かれます。",
      },
      ko: {
        q: "아이 이름 색칠 페이지는 어떻게 만드나요?",
        a: "이름을 입력하고 귀여운 글꼴을 고르면 페이지가 각 글자의 풍선 글자 윤곽과 색칠할 별·하트 장식을 그려 줍니다.",
      },
      es: {
        q: "¿Cómo hago una página para colorear con el nombre de mi hijo?",
        a: "Escribe el nombre, elige una fuente divertida y la página dibuja los contornos de burbuja de cada letra con estrellas y corazones para colorear.",
      },
      de: {
        q: "Wie erstelle ich ein Ausmalbild mit dem Namen meines Kindes?",
        a: "Tippe den Namen ein, wähle eine verspielte Schrift, und die Seite zeichnet Blasenbuchstaben-Umrisse jedes Buchstabens mit Sternen und Herzen zum Ausmalen.",
      },
      fr: {
        q: "Comment créer un coloriage avec le prénom de mon enfant ?",
        a: "Tapez le prénom, choisissez une police amusante, et la page dessine des lettres-bulles de chaque caractère avec des étoiles et des cœurs à colorier.",
      },
      pt: {
        q: "Como faço uma página para colorir com o nome do meu filho?",
        a: "Digite o nome, escolha uma fonte divertida e a página desenha contornos de letras-bolha de cada caractere com estrelas e corações para colorir.",
      },
    },
  },
  {
    id: "coloring-customize",
    i18n: {
      en: {
        q: "Can I adjust the outlines and decorations?",
        a: "Yes — outline thickness is adjustable (thicker lines are easier for younger kids), the star-and-heart decorations can be switched off, and the font changes the letter shapes.",
      },
      zh: {
        q: "可以调整轮廓和装饰吗?",
        a: "可以——描边粗细可调(线条越粗越适合小龄孩子),星星爱心装饰可以关闭,换字体还能改变字形。",
      },
      ja: {
        q: "輪郭や飾りは調整できますか?",
        a: "はい。輪郭の太さは調節可能(小さい子には太い線がおすすめ)、星とハートの飾りはオフにでき、フォントを変えると文字の形も変わります。",
      },
      ko: {
        q: "윤곽과 장식을 조절할 수 있나요?",
        a: "네 — 윤곽선 굵기는 조절 가능하고(어린아이일수록 굵은 선이 쉬워요), 별·하트 장식은 끌 수 있고, 글꼴을 바꾸면 글자 모양도 달라집니다.",
      },
      es: {
        q: "¿Puedo ajustar los contornos y las decoraciones?",
        a: "Sí — el grosor del contorno es ajustable (las líneas gruesas son más fáciles para los más pequeños), las decoraciones de estrellas y corazones se pueden apagar, y la fuente cambia la forma de las letras.",
      },
      de: {
        q: "Kann ich Umrisse und Dekorationen anpassen?",
        a: "Ja — die Umrissstärke ist einstellbar (dickere Linien sind für jüngere Kinder leichter), die Stern-und-Herz-Dekoration lässt sich abschalten, und die Schrift verändert die Buchstabenformen.",
      },
      fr: {
        q: "Puis-je régler les contours et les décorations ?",
        a: "Oui — l'épaisseur du contour est réglable (les lignes épaisses sont plus faciles pour les petits), les décorations étoiles-cœurs se désactivent, et la police modifie la forme des lettres.",
      },
      pt: {
        q: "Posso ajustar os contornos e as decorações?",
        a: "Sim — a espessura do contorno é ajustável (linhas grossas são mais fáceis para os pequenos), as decorações de estrelas e corações podem ser desligadas, e a fonte muda a forma das letras.",
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
        a: "Yes — every daily sheet is free to download and print, with no signup and no watermark. Print as many copies as you need for your family or classroom.",
      },
      zh: {
        q: "每日草书练习真的免费吗?",
        a: "免费——每天的练习页都可以随意下载打印,无需注册、没有水印,家庭和课堂用都可以不限份数。",
      },
      ja: {
        q: "毎日の筆記体練習は本当に無料ですか?",
        a: "はい。その日の練習シートはダウンロードも印刷も無料、登録も透かしも不要です。ご家庭や教室で必要な部数だけ印刷できます。",
      },
      ko: {
        q: "매일의 필기체 연습은 정말 무료인가요?",
        a: "네 — 매일의 연습장은 다운로드와 인쇄가 모두 무료이고, 가입도 워터마크도 없어요. 가족이나 교실에서 필요한 만큼 인쇄하세요.",
      },
      es: {
        q: "¿La práctica diaria de cursiva es realmente gratis?",
        a: "Sí — cada hoja diaria se puede descargar e imprimir gratis, sin registro ni marca de agua. Imprime tantas copias como necesites para tu familia o tu aula.",
      },
      de: {
        q: "Ist die tägliche Schreibschrift-Übung wirklich kostenlos?",
        a: "Ja — jedes Tagesblatt kann kostenlos heruntergeladen und gedruckt werden, ohne Anmeldung und ohne Wasserzeichen. Drucke so viele Kopien, wie du für Familie oder Klasse brauchst.",
      },
      fr: {
        q: "La pratique quotidienne de la cursive est-elle vraiment gratuite ?",
        a: "Oui — chaque fiche du jour se télécharge et s'imprime gratuitement, sans inscription ni filigrane. Imprimez autant de copies que nécessaire pour votre famille ou votre classe.",
      },
      pt: {
        q: "A prática diária de cursiva é realmente grátis?",
        a: "Sim — cada ficha diária pode ser baixada e impressa de graça, sem cadastro e sem marca d'água. Imprima quantas cópias precisar para a família ou a sala de aula.",
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
