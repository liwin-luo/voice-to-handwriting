import type { FaqItem } from "@/content/faqs";

/** /faq 目录。问法与首页 FAQ_ITEMS 不重复;完整答案在链接指向的工具页。 */
export const FAQ_HUB: FaqItem[] = [
  {
    id: "hub-name",
    i18n: {
      en: {
        q: "Where do I print a dotted name tracing sheet?",
        a: "The name tracing page makes a dashed outline of the name you type. It is not numbered stroke arrows.",
        link: { href: "/name-tracing", label: "Name tracing worksheets" },
      },
      zh: {
        q: "虚线姓名描红在哪里打印?",
        a: "姓名描红页按你输入的名字生成整字虚线轮廓。不是编号笔顺箭头。",
        link: { href: "/name-tracing", label: "姓名描红" },
      },
      ja: {
        q: "点線の名前なぞりはどこで印刷しますか?",
        a: "名前のなぞり書きページが、入力した名前の破線輪郭を作ります。番号付きの筆順矢印ではありません。",
        link: { href: "/name-tracing", label: "名前のなぞり書き" },
      },
      ko: {
        q: "점선 이름 따라쓰기는 어디에서 인쇄하나요?",
        a: "이름 따라쓰기 페이지가 입력한 이름의 파선 윤곽을 만듭니다. 번호가 있는 획순 화살표는 아닙니다.",
        link: { href: "/name-tracing", label: "이름 따라쓰기" },
      },
      es: {
        q: "¿Dónde imprimo una ficha punteada con el nombre?",
        a: "La página de calcar el nombre hace el contorno discontinuo del nombre que escribes. No son flechas de trazo numeradas.",
        link: { href: "/name-tracing", label: "Fichas para calcar el nombre" },
      },
      de: {
        q: "Wo drucke ich ein gepunktetes Namensblatt?",
        a: "Die Namens-Nachspur macht den gestrichelten Umriss des eingegebenen Namens. Keine nummerierten Strichpfeile.",
        link: { href: "/name-tracing", label: "Namens-Nachspurblätter" },
      },
      fr: {
        q: "Où imprimer une fiche pointillée avec le prénom ?",
        a: "La page pour tracer le prénom trace le contour en tirets du prénom saisi. Ce ne sont pas des flèches de tracé numérotées.",
        link: { href: "/name-tracing", label: "Fiches pour tracer le prénom" },
      },
      pt: {
        q: "Onde imprimo uma ficha pontilhada com o nome?",
        a: "A página de calcar o nome faz o contorno tracejado do nome digitado. Não são setas de traço numeradas.",
        link: { href: "/name-tracing", label: "Fichas para calcar o nome" },
      },
    },
  },
  {
    id: "hub-paper",
    i18n: {
      en: {
        q: "Where do I print college ruled or wide ruled paper?",
        a: "College ruled is 7.1 mm between lines. Wide ruled is 8.7 mm. Kindergarten paper is a separate three-line sheet. The full comparison is on the lined paper page.",
        link: { href: "/printable-paper", label: "Printable lined paper" },
      },
      zh: {
        q: "窄行或宽行横线纸在哪里打印?",
        a: "窄行行距 7.1 毫米,宽行 8.7 毫米。幼儿园三线格是另一张纸。完整对比在横线纸页面。",
        link: { href: "/printable-paper", label: "可打印横线纸" },
      },
      ja: {
        q: "細罫や広罫はどこで印刷しますか?",
        a: "細罫の行間は 7.1mm、広罫は 8.7mm です。幼稚園の3本線は別の用紙です。比較は罫線用紙のページにあります。",
        link: { href: "/printable-paper", label: "印刷用の罫線用紙" },
      },
      ko: {
        q: "좁은 줄이나 넓은 줄은 어디에서 인쇄하나요?",
        a: "좁은 줄 간격은 7.1mm, 넓은 줄은 8.7mm입니다. 유치원 3선은 다른 종이입니다. 비교는 줄 노트 페이지에 있습니다.",
        link: { href: "/printable-paper", label: "인쇄용 줄 노트" },
      },
      es: {
        q: "¿Dónde imprimo pauta estrecha o ancha?",
        a: "La estrecha separa las líneas 7,1 mm. La ancha, 8,7 mm. El papel de infantil es otra hoja de tres líneas. La comparación está en la página de papel pautado.",
        link: { href: "/printable-paper", label: "Papel pautado imprimible" },
      },
      de: {
        q: "Wo drucke ich eng oder weit liniertes Papier?",
        a: "Eng liniert hat 7,1 mm Abstand, weit liniert 8,7 mm. Das Kindergartenpapier ist ein separates Drei-Linien-Blatt. Der Vergleich steht auf der linierten Papierseite.",
        link: { href: "/printable-paper", label: "Liniertes Papier drucken" },
      },
      fr: {
        q: "Où imprimer de l'interligne étroit ou large ?",
        a: "L'étroit espace les lignes de 7,1 mm, le large de 8,7 mm. Le papier de maternelle est une autre feuille à trois lignes. La comparaison est sur la page du papier ligné.",
        link: { href: "/printable-paper", label: "Papier ligné imprimable" },
      },
      pt: {
        q: "Onde imprimo pauta estreita ou larga?",
        a: "A estreita separa as linhas em 7,1 mm. A larga, em 8,7 mm. O papel infantil é outra folha de três linhas. A comparação está na página de papel pautado.",
        link: { href: "/printable-paper", label: "Papel pautado para imprimir" },
      },
    },
  },
  {
    id: "hub-font",
    i18n: {
      en: {
        q: "Where do I preview a real cursive font?",
        a: "The cursive font page renders real typefaces in the browser and exports PNG or PDF. You do not install them to preview. Pasteable Unicode cursive is a different tool.",
        link: { href: "/cursive-font-generator", label: "Cursive font generator" },
      },
      zh: {
        q: "真正的花体字体在哪里预览?",
        a: "花体字体页在浏览器里渲染真正的字体,并导出 PNG 或 PDF。预览不需要安装。可粘贴的 Unicode 花体是另一个工具。",
        link: { href: "/cursive-font-generator", label: "花体字体生成器" },
      },
      ja: {
        q: "本物の筆記体フォントはどこでプレビューしますか?",
        a: "筆記体フォントのページはブラウザで本物の書体を描き、PNG か PDF を書き出します。プレビューにインストールは不要です。貼り付け用の Unicode 筆記体は別のツールです。",
        link: { href: "/cursive-font-generator", label: "筆記体フォント生成器" },
      },
      ko: {
        q: "진짜 필기체 글꼴은 어디에서 미리 보나요?",
        a: "필기체 글꼴 페이지가 브라우저에서 실제 서체를 그리고 PNG나 PDF로 내보냅니다. 미리 보기에 설치는 필요 없습니다. 붙여넣는 Unicode 필기체는 다른 도구입니다.",
        link: { href: "/cursive-font-generator", label: "필기체 글꼴 생성기" },
      },
      es: {
        q: "¿Dónde previsualizo una fuente cursiva de verdad?",
        a: "La página de fuentes cursivas dibuja tipografías reales en el navegador y exporta PNG o PDF. No hace falta instalarlas para verlas. La cursiva Unicode para pegar es otra herramienta.",
        link: { href: "/cursive-font-generator", label: "Generador de fuentes cursivas" },
      },
      de: {
        q: "Wo sehe ich eine echte Schreibschrift?",
        a: "Die Schreibschrift-Seite setzt echte Schriften im Browser und exportiert PNG oder PDF. Zum Ansehen musst du sie nicht installieren. Einfügbare Unicode-Schreibschrift ist ein anderes Werkzeug.",
        link: { href: "/cursive-font-generator", label: "Schreibschrift-Schriften" },
      },
      fr: {
        q: "Où prévisualiser une vraie police cursive ?",
        a: "La page des polices cursives dessine de vraies polices dans le navigateur et exporte en PNG ou PDF. Pas besoin de les installer pour les voir. La cursive Unicode à coller est un autre outil.",
        link: { href: "/cursive-font-generator", label: "Générateur de polices cursives" },
      },
      pt: {
        q: "Onde vejo uma fonte cursiva de verdade?",
        a: "A página de fontes cursivas desenha fontes reais no navegador e exporta PNG ou PDF. Não precisa instalar para ver. A cursiva Unicode para colar é outra ferramenta.",
        link: { href: "/cursive-font-generator", label: "Gerador de fontes cursivas" },
      },
    },
  },
  {
    id: "hub-text",
    i18n: {
      en: {
        q: "Where do I copy cursive text to paste?",
        a: "The cursive text generator swaps letters for Unicode symbols you can paste into a bio or chat. It is not a font, and some phones show boxes. For a printable page, use the font generator.",
        link: { href: "/cursive-text-generator", label: "Cursive text generator" },
      },
      zh: {
        q: "可复制粘贴的花体文字在哪里?",
        a: "花体文字生成器把字母换成 Unicode 符号,可以贴进简介或聊天。它不是字体,有的手机会显示方框。要可打印的页面,用字体生成器。",
        link: { href: "/cursive-text-generator", label: "花体文字生成器" },
      },
      ja: {
        q: "貼り付けられる筆記体テキストはどこですか?",
        a: "筆記体テキスト生成器は文字を Unicode 記号に置き換え、プロフィールやチャットに貼れます。フォントではなく、一部のスマホでは四角になります。印刷するページにはフォント生成器を使います。",
        link: { href: "/cursive-text-generator", label: "筆記体テキスト生成器" },
      },
      ko: {
        q: "붙여넣을 필기체 텍스트는 어디에 있나요?",
        a: "필기체 텍스트 생성기가 글자를 Unicode 기호로 바꿔 소개글이나 채팅에 붙일 수 있게 합니다. 글꼴이 아니고, 일부 휴대폰에서는 네모로 보입니다. 인쇄할 페이지는 글꼴 생성기를 쓰세요.",
        link: { href: "/cursive-text-generator", label: "필기체 텍스트 생성기" },
      },
      es: {
        q: "¿Dónde copio texto cursivo para pegarlo?",
        a: "El generador de texto cursivo cambia las letras por símbolos Unicode que puedes pegar en una bio o un chat. No es una fuente, y algunos móviles muestran cuadros. Para una página imprimible, usa el generador de fuentes.",
        link: { href: "/cursive-text-generator", label: "Generador de texto cursivo" },
      },
      de: {
        q: "Wo kopiere ich Schreibschrift zum Einfügen?",
        a: "Der Schreibschrift-Textgenerator tauscht Buchstaben gegen Unicode-Symbole, die du in eine Bio oder einen Chat einfügst. Das ist keine Schrift, und manche Handys zeigen Kästchen. Für eine druckbare Seite nimm den Schriftgenerator.",
        link: { href: "/cursive-text-generator", label: "Schreibschrift-Textgenerator" },
      },
      fr: {
        q: "Où copier du texte cursif à coller ?",
        a: "Le générateur de texte cursif remplace les lettres par des symboles Unicode à coller dans une bio ou un chat. Ce n'est pas une police, et certains téléphones affichent des carrés. Pour une page imprimable, utilisez le générateur de polices.",
        link: { href: "/cursive-text-generator", label: "Générateur de texte cursif" },
      },
      pt: {
        q: "Onde copio texto cursivo para colar?",
        a: "O gerador de texto cursivo troca letras por símbolos Unicode para colar numa bio ou num chat. Não é uma fonte, e alguns celulares mostram quadrados. Para uma página imprimível, use o gerador de fontes.",
        link: { href: "/cursive-text-generator", label: "Gerador de texto cursivo" },
      },
    },
  },
  {
    id: "hub-watch",
    i18n: {
      en: {
        q: "Where can I watch letters being written?",
        a: "The handwriting repeater uncovers each letter from left to right and loops. It is a font animation, not textbook stroke order, and cursive entry strokes are not marked.",
        link: { href: "/handwriting-repeater", label: "Handwriting repeater" },
      },
      zh: {
        q: "在哪里看着字母被写出来?",
        a: "手写循环演示从左到右逐字揭开并循环。这是字体动画,不是教材笔顺,连笔起笔也不会标出。",
        link: { href: "/handwriting-repeater", label: "手写循环演示" },
      },
      ja: {
        q: "文字が書かれるところはどこで見られますか?",
        a: "手書きリピーターが文字を左から右へ開いてループします。フォントのアニメーションであり、教科書の筆順ではなく、筆記体の入りも印はありません。",
        link: { href: "/handwriting-repeater", label: "手書きリピーター" },
      },
      ko: {
        q: "글자가 써지는 모습은 어디에서 보나요?",
        a: "손글씨 리피터가 글자를 왼쪽에서 오른쪽으로 열고 반복합니다. 글꼴 애니메이션이지 교과서 획순이 아니고, 필기체 시작 획도 표시하지 않습니다.",
        link: { href: "/handwriting-repeater", label: "손글씨 리피터" },
      },
      es: {
        q: "¿Dónde puedo ver cómo se escriben las letras?",
        a: "El repetidor descubre cada letra de izquierda a derecha y la repite. Es una animación de la fuente, no el orden de un libro, y no marca la entrada de la cursiva.",
        link: { href: "/handwriting-repeater", label: "Repetidor de letra" },
      },
      de: {
        q: "Wo kann ich zusehen, wie Buchstaben geschrieben werden?",
        a: "Die Wiederholung deckt jeden Buchstaben von links nach rechts auf und wiederholt die Zeile. Eine Schriftanimation, keine Lehrbuch-Strichfolge, und Schreibschrift-Ansätze sind nicht markiert.",
        link: { href: "/handwriting-repeater", label: "Schreib-Wiederholung" },
      },
      fr: {
        q: "Où regarder les lettres s'écrire ?",
        a: "Le répéteur découvre chaque lettre de gauche à droite et boucle. C'est une animation de police, pas l'ordre d'un manuel, et l'entrée de la cursive n'est pas marquée.",
        link: { href: "/handwriting-repeater", label: "Répéteur d'écriture" },
      },
      pt: {
        q: "Onde vejo as letras sendo escritas?",
        a: "O repetidor revela cada letra da esquerda para a direita e repete. É uma animação da fonte, não a ordem de um livro, e a entrada da cursiva não é marcada.",
        link: { href: "/handwriting-repeater", label: "Repetidor de escrita" },
      },
    },
  },
  {
    id: "hub-quiz",
    i18n: {
      en: {
        q: "Where is the handwriting personality quiz?",
        a: "The quiz is for fun. You pick sample styles; it does not read a photo of your handwriting, and it does not treat graphology as science.",
        link: { href: "/handwriting-personality-quiz", label: "Handwriting personality quiz" },
      },
      zh: {
        q: "笔迹性格测验在哪里?",
        a: "测验供娱乐。你挑选样张风格,它不读取笔迹照片,也不把笔迹学当成科学。",
        link: { href: "/handwriting-personality-quiz", label: "笔迹性格测验" },
      },
      ja: {
        q: "筆跡パーソナリティテストはどこですか?",
        a: "テストは娯楽です。サンプルのスタイルを選びます。筆跡の写真は読まず、筆跡学を科学としても扱いません。",
        link: { href: "/handwriting-personality-quiz", label: "筆跡パーソナリティテスト" },
      },
      ko: {
        q: "글씨 성격 테스트는 어디에 있나요?",
        a: "테스트는 재미용입니다. 샘플 스타일을 고릅니다. 글씨 사진을 읽지 않고, 필적학을 과학으로 다루지 않습니다.",
        link: { href: "/handwriting-personality-quiz", label: "글씨 성격 테스트" },
      },
      es: {
        q: "¿Dónde está el test de personalidad por la letra?",
        a: "El test es para divertirse. Eliges estilos de muestra; no lee una foto de tu letra y no trata la grafología como ciencia.",
        link: { href: "/handwriting-personality-quiz", label: "Test de personalidad por la letra" },
      },
      de: {
        q: "Wo ist der Handschrift-Persönlichkeitstest?",
        a: "Der Test ist zum Spaß. Du wählst Schriftmuster; er liest kein Foto deiner Handschrift und behandelt Graphologie nicht als Wissenschaft.",
        link: { href: "/handwriting-personality-quiz", label: "Handschrift-Persönlichkeitstest" },
      },
      fr: {
        q: "Où est le test de personnalité par l'écriture ?",
        a: "Le test est pour le plaisir. Vous choisissez des styles d'exemple ; il ne lit pas une photo de votre écriture et ne traite pas la graphologie comme une science.",
        link: { href: "/handwriting-personality-quiz", label: "Test de personnalité par l'écriture" },
      },
      pt: {
        q: "Onde fica o teste de personalidade pela letra?",
        a: "O teste é para diversão. Você escolhe estilos de amostra; ele não lê uma foto da sua letra e não trata grafologia como ciência.",
        link: { href: "/handwriting-personality-quiz", label: "Teste de personalidade pela letra" },
      },
    },
  },
  {
    id: "hub-mail",
    i18n: {
      en: {
        q: "Will the site mail a handwritten letter?",
        a: "No. The letter page makes PDFs of the notes and the envelopes. You print them and mail them yourself. The writing is a font, not ink from a pen.",
        link: { href: "/printable-handwritten-letters", label: "Printable handwritten letters" },
      },
      zh: {
        q: "网站会寄出手写信吗?",
        a: "不会。信件页生成信件和信封的 PDF。打印和寄出由你自己完成。字是字体,不是钢笔墨水。",
        link: { href: "/printable-handwritten-letters", label: "可打印的手写信" },
      },
      ja: {
        q: "サイトが手書きの手紙を発送しますか?",
        a: "いいえ。手紙のページは手紙と封筒の PDF を作ります。印刷して出すのはあなたです。文字はフォントで、ペンのインクではありません。",
        link: { href: "/printable-handwritten-letters", label: "印刷できる手書きの手紙" },
      },
      ko: {
        q: "사이트가 손글씨 편지를 보내 주나요?",
        a: "아니요. 편지 페이지는 편지와 봉투 PDF를 만듭니다. 인쇄하고 보내는 것은 사용자입니다. 글자는 글꼴이지 펜 잉크가 아닙니다.",
        link: { href: "/printable-handwritten-letters", label: "인쇄하는 손글씨 편지" },
      },
      es: {
        q: "¿El sitio envía una carta manuscrita?",
        a: "No. La página de cartas genera los PDF de las notas y los sobres. Tú los imprimes y los envías. La letra es una fuente, no tinta de un bolígrafo.",
        link: { href: "/printable-handwritten-letters", label: "Cartas manuscritas para imprimir" },
      },
      de: {
        q: "Verschickt die Seite einen handgeschriebenen Brief?",
        a: "Nein. Die Briefseite erzeugt PDFs der Notizen und der Umschläge. Du druckst und verschickst sie selbst. Die Schrift ist eine Schriftart, keine Tinte aus einem Stift.",
        link: { href: "/printable-handwritten-letters", label: "Handschriftliche Briefe drucken" },
      },
      fr: {
        q: "Le site expédie-t-il une lettre manuscrite ?",
        a: "Non. La page des lettres produit les PDF des notes et des enveloppes. Vous les imprimez et les postez. L'écriture est une police, pas de l'encre.",
        link: { href: "/printable-handwritten-letters", label: "Lettres manuscrites à imprimer" },
      },
      pt: {
        q: "O site envia uma carta manuscrita?",
        a: "Não. A página de cartas gera os PDFs das notas e dos envelopes. Você imprime e envia. A escrita é uma fonte, não tinta de caneta.",
        link: { href: "/printable-handwritten-letters", label: "Cartas manuscritas para imprimir" },
      },
    },
  },
  {
    id: "hub-voice",
    i18n: {
      en: {
        q: "Where do I turn speech into handwriting?",
        a: "The homepage does that: speak or type, then export PNG or PDF. Microphone troubleshooting and audio-file formats are answered there, not on this index.",
        link: { href: "/", label: "Voice to handwriting" },
      },
      zh: {
        q: "语音转手写在哪里?",
        a: "在首页:说话或打字,再导出 PNG 或 PDF。麦克风排错和音频格式的答案在首页,不在这个目录。",
        link: { href: "/", label: "语音转手写" },
      },
      ja: {
        q: "音声を手書きにするのはどこですか?",
        a: "ホームページです。話すか入力して、PNG か PDF で書き出します。マイクのトラブルと音声形式の答えはそこにあって、この一覧にはありません。",
        link: { href: "/", label: "音声を手書きに" },
      },
      ko: {
        q: "음성을 손글씨로 바꾸는 곳은 어디인가요?",
        a: "홈페이지입니다. 말하거나 입력한 뒤 PNG나 PDF로 내보냅니다. 마이크 문제와 오디오 형식의 답은 거기에 있고, 이 목록에는 없습니다.",
        link: { href: "/", label: "음성을 손글씨로" },
      },
      es: {
        q: "¿Dónde convierto la voz en letra manuscrita?",
        a: "En la página de inicio: habla o escribe y exporta PNG o PDF. Los fallos del micrófono y los formatos de audio se responden allí, no en este índice.",
        link: { href: "/", label: "Voz a letra manuscrita" },
      },
      de: {
        q: "Wo wird Sprache zu Handschrift?",
        a: "Auf der Startseite: sprechen oder tippen, dann PNG oder PDF exportieren. Mikrofon-Probleme und Audioformate stehen dort, nicht in diesem Verzeichnis.",
        link: { href: "/", label: "Sprache zu Handschrift" },
      },
      fr: {
        q: "Où transformer la voix en écriture ?",
        a: "Sur la page d'accueil : dictez ou tapez, puis exportez en PNG ou PDF. Le dépannage du micro et les formats audio y sont répondus, pas dans cet index.",
        link: { href: "/", label: "Voix vers écriture" },
      },
      pt: {
        q: "Onde transformo fala em letra manuscrita?",
        a: "Na página inicial: fale ou digite e exporte PNG ou PDF. O microfone e os formatos de áudio são respondidos lá, não neste índice.",
        link: { href: "/", label: "Voz para letra manuscrita" },
      },
    },
  },
];
