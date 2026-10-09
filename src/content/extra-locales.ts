import type { Locale } from "@/i18n/routing";

/** de/fr/pt 等后补语言的内容:运行时 merge 进 posts.ts / templates.ts 的 i18n,
 *  避免在大数据文件里反复内联编辑。 */

export interface PostMetaI18n {
  title: string;
  description: string;
}

export interface TemplateMetaI18n {
  title: string;
  description: string;
  text: string;
}

export const EXTRA_POST_I18N: Record<string, Partial<Record<Locale, PostMetaI18n>>> = {
  "handwritten-card-with-voice": {
    de: {
      title: "Grußkarte mit der eigenen Stimme in 3 Minuten",
      description:
        "Keine Kalligraphie nötig. Sprich den Wunsch, wähle Schrift und Papier, exportiere und drucke — mit fertigen Textideen.",
    },
    fr: {
      title: "Écrire une carte avec sa voix en 3 minutes",
      description:
        "Pas besoin de belle écriture. Parlez à la page, choisissez police et papier, exportez et imprimez — avec des idées de texte.",
    },
    pt: {
      title: "Cartão com a sua voz em 3 minutos",
      description:
        "Sem precisa de caligrafia. Fale o desejo, escolha fonte e papel, exporte e imprima — com ideias de texto prontas.",
    },
  },
  "handwriting-image-generator": {
    de: {
      title: "Handschrift-Bilder online erstellen: sprechen statt tippen",
      description:
        "Warum Spracheingabe besser ist als Tippen, plus Tipps für Realismus, Papier und Tinte.",
    },
    fr: {
      title: "Générer des images manuscrites en ligne : parlez au lieu de taper",
      description:
        "Pourquoi la voix bat la saisie, et comment régler réalisme, papier et encre.",
    },
    pt: {
      title: "Gerador de imagem manuscrita online: fale em vez de digitar",
      description:
        "Por que a voz vence a digitação e como ajustar realismo, papel e tinta.",
    },
  },
  "xiaohongshu-handwritten-images": {
    es: {
      title: "Tarjetas con citas manuscritas para redes sociales, en tu navegador",
      description:
        "Las citas manuscritas logran gran interacción. Prodúcelas en lote con entrada por voz: fuente, tinta y realismo fijos, con consejos de portada y formato 3:4.",
    },
    de: {
      title: "Handgeschriebene Zitatkarten für Social Media",
      description:
        "Handschriftliche Zitate bekommen viel Interaktion — mit Spracheingabe im Batch produzieren, inkl. Cover-Tipps.",
    },
    fr: {
      title: "Cartes de citations manuscrites pour les réseaux sociaux",
      description:
        "Les citations manuscrites génèrent de l'engagement — produisez-les en série par la voix.",
    },
    pt: {
      title: "Cartões com frases manuscritas para redes sociais",
      description:
        "Imagens de frases manuscritas geram engajamento — produza em lote pela voz.",
    },
  },
  "audio-to-handwriting": {
    de: {
      title: "Aufnahmen kostenlos in Handschrift-Notizen verwandeln",
      description:
        "Audiodatei hochladen, im Browser mit Whisper transkribieren und als Handschrift exportieren. Mit echten Tests und ehrlichen Grenzen.",
    },
    fr: {
      title: "Transformer un enregistrement en notes manuscrites, gratuitement",
      description:
        "Importez un audio, transcrivez avec Whisper dans le navigateur et exportez manuscrit. Tests réels inclus.",
    },
    pt: {
      title: "Gravações viram notas manuscritas, grátis e local",
      description:
        "Envie um áudio, transcreva com Whisper no navegador e exporte manuscrito. Com testes reais.",
    },
  },
  "handwriting-templates-guide": {
    de: {
      title: "Vorlagen-Bibliothek: sechs Szenarien, auswählen und schreiben",
      description:
        "Liebesbriefe, Entschuldigungen, Dank, Geburtstag, Lehrertag, Neujahr — Text und Stil in einem Tipp.",
    },
    fr: {
      title: "Bibliothèque de modèles : six scénarios, choisissez et écrivez",
      description:
        "Amour, excuses, remerciements, anniversaire, fête des maîtres, Nouvel An — texte et style en un geste.",
    },
    pt: {
      title: "Biblioteca de modelos: seis cenários, escolha e escreva",
      description:
        "Amor, desculpas, agradecimentos, aniversário, Dia do Professor, Ano Novo — texto e estilo em um toque.",
    },
  },
  "name-tracing-generator": {
    zh: {
      title: "名字描红生成器:免费可打印的个性化练习纸",
      description: "输入任意名字,几秒生成可打印的个性化描红练习纸——深色示例行、浅灰描红、三线格,免费 PDF,无需注册、无水印。",
    },
    ja: {
      title: "名前なぞり書きジェネレーター:60秒で個別プリント",
      description: "名前を入力するだけで、数秒でなぞり書きプリントを印刷——お手本行、薄いグレーのなぞり行、3ラインガイド、無料 PDF。登録不要。",
    },
    ko: {
      title: "이름 따라쓰기 생성기: 60초면 맞춤 학습지 완성",
      description: "이름을 입력하면 몇 초 만에 맞춤 따라쓰기 워크시트를 인쇄 — 예시 행, 연한 회색 따라쓰기, 3선 가이드, 무료 PDF. 가입 불필요.",
    },
    de: {
      title: "Kostenloser Nachspur-Generator: Arbeitsblätter zum Drucken",
      description: "Beliebigen Namen eingeben und in Sekunden ein personalisiertes Nachspur-Arbeitsblatt drucken — Musterzeile, Dreilinien, kostenloses PDF. Ohne Anmeldung.",
    },
    fr: {
      title: "Générateur de prénoms à tracer : fiches gratuites à imprimer",
      description: "Tapez un prénom et imprimez en quelques secondes une fiche de traçage personnalisée — ligne modèle, repères à trois lignes, PDF gratuit. Sans inscription.",
    },
    es: {
      title: "Generador de nombres para trazado: gratis y para imprimir",
      description: "Escribe cualquier nombre e imprime en segundos una ficha de trazado personalizada — trazado gris claro, guías de tres líneas, PDF gratis. Sin registro.",
    },
    pt: {
      title: "Gerador de nome para traçar: atividades grátis para imprimir",
      description: "Digite qualquer nome e imprima em segundos uma atividade de traçado personalizada — traço cinza-claro, guias de três linhas, PDF grátis. Sem cadastro.",
    },
  },
  "free-printable-lined-paper": {
    zh: {
      title: "免费打印横线纸:窄行距、宽行距、方格与三线",
      description: "免费打印窄行距、宽行距、方格与三线写字纸:支持 Letter 与 A4 纸张,行距、线条颜色和红色边线都可以自定义,页面按打印机分辨率绘制,线条清晰锐利,无需注册、没有水印,在家就能打印,PDF 数量不限。",
    },
    ja: {
      title: "無料で印刷できる罫線用紙:細かい罫・広い罫・方眼・3本線",
      description: "細かい罫(college ruled)、広い罫、方眼、3本線の文字練習用紙を無料で印刷。Letter と A4 に対応し、罫線の間隔・色・赤いマージン線を調整でき、プリンターの解像度で描画されるので罫線はくっきり。登録不要、透かしなしで PDF を何枚でもダウンロードできます。",
    },
    ko: {
      title: "무료 인쇄용 줄 종이: 좁은 줄·넓은 줄·모눈·세 줄",
      description: "좁은 줄(college ruled), 넓은 줄, 모눈, 세 줄 쓰기 연습 종이를 무료로 인쇄하세요. Letter와 A4를 지원하며 줄 간격·색상·빨간 여백선을 조절할 수 있고, 페이지는 프린터 해상도로 그려져 선이 또렷합니다. 가입도 워터마크도 없이 PDF를 무제한으로 내려받으세요.",
    },
    de: {
      title: "Kostenloses liniertes Papier: schmal, weit, Karo & 3 Linien",
      description: "Schmal liniert, weit liniert, Karo- oder Dreilinienpapier für Letter und A4 — Abstand und Farbe wählen, gestochen scharfes PDF kostenlos herunterladen.",
    },
    fr: {
      title: "Papier ligné gratuit à imprimer : serré, large, quadrillé",
      description: "Papier ligné serré, large, quadrillé ou à trois lignes sur Letter ou A4 — choisissez l'espacement et la couleur, téléchargez un PDF bien net, gratuitement.",
    },
    es: {
      title: "Hoja rayada gratis: estrecha, ancha, cuadrícula y 3 líneas",
      description: "Imprime gratis hojas rayadas estrechas, anchas, cuadriculadas o de tres líneas en Letter o A4 — elige el espaciado, el color de línea y descarga un PDF nítido.",
    },
    pt: {
      title: "Folha pautada grátis: estreita, larga e quadriculada",
      description: "Imprima grátis folhas pautadas estreitas, largas, quadriculadas ou de três linhas em Letter ou A4 — escolha o espaçamento e a cor e baixe um PDF nítido.",
    },
  },
  "cursive-practice-worksheets": {
    zh: {
      title: "自定义英文草书练习字帖,免费可打印",
      description: "输入任意姓名或句子,即可生成英文草书(连笔英文)练习字帖:内置真实的草书字体与三线格引导线,可免费下载 PDF。全部在你的浏览器中生成,输入的内容不会上传,打印后即可开始每天 15 分钟的描红与抄写练习。",
    },
    ja: {
      title: "カスタマイズできる筆記体練習プリント、無料で印刷",
      description: "名前や好きな文から筆記体の練習プリントを生成。本格的な筆記体フォントと3線ガイド付きで、PDFは無料でダウンロードできます。入力内容はブラウザ内だけで処理され、アップロードはされません。印刷してすぐに毎日15分の練習を始められます。",
    },
    ko: {
      title: "영어 필기체 연습 워크시트, 무료로 만들어 인쇄하기",
      description: "이름이나 문장만 입력하면 실제 필기체 폰트와 3선 가이드가 들어간 영어 필기체 연습 워크시트를 만들 수 있습니다. PDF는 무료 다운로드. 입력한 내용은 브라우저에서만 처리되어 전송되지 않으니, 인쇄해서 바로 연습을 시작할 수 있습니다.",
    },
    de: {
      title: "Individuelle Schreibschrift-Arbeitsblätter (kostenlos)",
      description: "Erstelle Schreibschrift-Arbeitsblätter aus jedem Namen oder Satz: echte Schreibschrift-Schriften, Drei-Linien-Hilfslinien und kostenlose PDF-Downloads.",
    },
    fr: {
      title: "Exercices d'écriture cursive à imprimer (gratuit)",
      description: "Créez des feuilles d'exercices de cursive à partir d'un prénom ou d'une phrase : vraies polices cursives, guides de trois lignes et PDF gratuits.",
    },
    es: {
      title: "Hojas de práctica de cursiva personalizadas y gratis",
      description: "Genera hojas de práctica de cursiva con cualquier nombre o frase, con fuentes cursivas reales, guías de tres líneas y descargas de PDF gratuitas.",
    },
    pt: {
      title: "Folhas de treino de cursiva personalizadas e gratuitas",
      description: "Gere folhas de treino de cursiva a partir de qualquer nome ou frase, com fontes cursivas de verdade, linhas-guia de três linhas e downloads de PDF gratuitos.",
    },
  },
  "kindergarten-handwriting-paper": {
    zh: {
      title: "幼儿园三线格书写纸:三条线详解",
      description: "孩子在幼儿园写的每个字母,都落在这三条线上:顶线留给高字母,中间的虚线决定小写字母的个子,底线让每个字母站稳、带尾巴的字母向下钻。分清高字母、小字母、下降字母三个家族,然后在家免费打印幼儿园用的三线格书写纸。",
    },
    ja: {
      title: "幼稚園の文字練習用紙:3本の線が教えること",
      description: "どこの幼稚園の机にもある、上の実線・中央の破線・下の実線。それぞれの線が何を教えるのか、背の高い字母・小さい字母・尾のある字母の3つの家族、そして自宅で無料で印刷できる幼稚園向けの文字練習用紙を解説します。",
    },
    ko: {
      title: "유치원 삼선 공부지: 세 줄이 가르쳐 주는 것",
      description: "유치원 책상마다 있는 그 종이, 삼선 공부지의 윗줄과 가운데 점선, 아랫줄이 각각 가르쳐 주는 것, 키 큰 글자·작은 글자·꼬리 글자의 세 부류, 그리고 집에서 무료로 인쇄할 수 있는 유치원 삼선 공부지와 나이별 줄 높이 선택법을 소개합니다.",
    },
    de: {
      title: "Linienblatt (Vorschule): was die drei Linien lehren",
      description: "Was obere, gestrichelte und untere Linien beibringen, hohe/kleine/Schwanz-Buchstaben und kostenloses, druckbares Dreilinien-Schreibpapier für den Kindergarten.",
    },
    fr: {
      title: "Feuille d'écriture maternelle : les trois lignes expliquées",
      description: "Ce qu'enseignent les trois lignes, les familles de lettres hautes, petites et descendantes, et un papier d'écriture maternelle gratuit à imprimer.",
    },
    es: {
      title: "Papel de escritura preescolar: las tres líneas, explicadas",
      description: "Qué enseñan la línea superior, la discontinua y la base, las letras altas, pequeñas y con cola, y papel de tres líneas imprimible gratis para preescolar.",
    },
    pt: {
      title: "Papel de caligrafia infantil: as três linhas explicadas",
      description: "O que ensinam as linhas de cima, do meio e de baixo, as letras altas, pequenas e com rabo, e papel de caligrafia de três linhas grátis para imprimir.",
    },
  },
  "letter-to-santa-template": {
    zh: {
      title: "给圣诞老人的信模板:免费打印,孩子自己写",
      description: "一份可以直接打印的给圣诞老人的信模板:让孩子说出或输入想写的话,挑选手写风格的字体打印出来,再配上一页描红签名练习。整个过程在浏览器里完成,语音识别不上传任何内容,导出 PDF 免费、无水印,无需注册账号,Letter 和 A4 纸都能全质量打印。",
    },
    ja: {
      title: "サンタクロースへの手紙テンプレート(無料・子どもが自分で書ける)",
      description: "そのまま印刷できるサンタクロースへの手紙テンプレート。子どもの言葉を話すか入力して、親しみやすい手書き風フォントで印刷し、なぞり書きの署名も追加できます。ブラウザ内で完結し、音声はアップロードされません。書き出しは無料・透かしなし・登録不要で、Letter にも A4 にも高品質で印刷できます。",
    },
    ko: {
      title: "산타클로스 편지 템플릿: 무료 인쇄용 (아이가 직접 써요)",
      description: "바로 인쇄할 수 있는 산타클로스 편지 템플릿입니다. 아이의 말을 말하거나 입력하고, 친근한 손글씨체로 인쇄한 뒤, 따라 쓴 서명까지 더하세요. 브라우저 안에서만 실행되고, 내보내기는 무료이며 PDF에 워터마크가 없고, 가입도 필요 없습니다. Letter와 A4 용지 모두 최고 품질로 인쇄됩니다.",
    },
    de: {
      title: "Brief an den Weihnachtsmann: gratis Vorlage zum Ausdrucken",
      description: "Vorlage für den Brief an den Weihnachtsmann: Wörter sprechen oder tippen, in freundlicher Handschrift drucken, Unterschrift nachspuren. Gratis-PDF.",
    },
    fr: {
      title: "Lettre au Père Noël : modèle gratuit à imprimer",
      description: "Modèle de lettre au Père Noël à imprimer : dictez ou tapez les mots, imprimez en écriture manuscrite, ajoutez une signature recopiée. PDF gratuit.",
    },
    es: {
      title: "Plantilla gratis de carta a Papá Noel para imprimir",
      description: "Plantilla de carta a Papá Noel lista para imprimir: di o escribe las palabras, imprime con letra manuscrita y añade una firma trazada. PDF gratis, sin registro.",
    },
    pt: {
      title: "Modelo grátis de carta para o Papai Noel para imprimir",
      description: "Modelo de carta para o Papai Noel para imprimir: fale ou digite as palavras, imprima em fonte de letra manual e treine a assinatura. PDF grátis.",
    },
  },
  "handwritten-thank-you-notes": {
    zh: {
      title: "感谢卡怎么写:四段式公式与可直接抄用的范例",
      description: "一张手写的感谢卡,说的是「你值得我花二十分钟和一张邮票」。本文给出四段式公式,以及婚礼、求职面试、答谢老师等场合可直接抄用的范例;如果嫌自己的字不好看,还有放慢速度、横格纸打底、手写字体打印三个补救办法可用。",
    },
    ja: {
      title: "相手に残るお礼状の書き方:四文の型と文例つき",
      description: "手書きのお礼状は「20分と切手一枚を使う価値がある」というメッセージ。結婚式・就職面接・先生への感謝など、場面別にそのまま使える文例を、四文の型と一緒に紹介します。字に自信がない人には、ゆっくり書くコツ、罫線入り用紙、手書きフォントでの印刷という三つの解決策があります。",
    },
    ko: {
      title: "사람들이 간직하는 감사 편지 쓰는 법: 4단계 공식과 예문",
      description: "손으로 쓴 감사 편지는 「당신을 위해 20분과 우표 한 장을 썼다」는 말이 됩니다. 결혼식, 취업 면접, 선생님 감사 등 바로 써 넣을 수 있는 예문과 4단계 공식을 정리했고, 글씨에 자신이 없다면 느리게 쓰기, 줄 용지, 손글씨 폰트 인쇄라는 세 가지 방법도 준비했습니다.",
    },
    de: {
      title: "Dankeskarte schreiben: Formel und Beispiele zum Übernehmen",
      description: "Die Vier-Sätze-Formel für deine Dankeskarte: fertige Beispiele für Hochzeit, Vorstellungsgespräch und Lehrerin — plus Optionen bei katastrophaler Handschrift.",
    },
    fr: {
      title: "Lettre de remerciement : formule et exemples prêts à copier",
      description: "Formule en quatre phrases du mot de remerciement, exemples prêts à copier (mariage, entretien, enseignante) — et des options si l'écriture est une catastrophe.",
    },
    es: {
      title: "Nota de agradecimiento: fórmula y ejemplos para copiar",
      description: "La fórmula de cuatro frases para escribir una nota de agradecimiento, con ejemplos para boda, entrevista y profesor — y opciones si tu letra es un desastre.",
    },
    pt: {
      title: "Bilhete de agradecimento: fórmula e exemplos prontos",
      description: "A fórmula de quatro frases do bilhete de agradecimento, com exemplos prontos para casamento, entrevista e professor — e opções se sua letra for um desastre.",
    },
  },
  "diy-wedding-calligraphy": {
    zh: {
      title: "DIY 婚礼书法:自己动手做席位卡与指示牌",
      description: "婚礼席位卡、菜单、迎宾牌和誓词纪念品,不必请书法师:用免费的手写体工具排好版,自家打印机或图文店就能输出。字体怎么选、卡纸怎么印、一百个名字如何保持同一斜度——窗户描字法一次讲清。免费、无需注册,当天就能出成品。",
    },
    ja: {
      title: "DIY ウェディングカリグラフィー:席札とサインを自分で作る",
      description: "プロに頼まなくても、席札・メニュー・ウェルカムボード・誓いの記念プリントは自宅のプリンターで作れます。筆記体フォントの選び方、厚紙への印刷のコツ、窓に貼ってなぞる「窓トレース術」まで、無料ツールでの作り方を解説します。",
    },
    ko: {
      title: "DIY 웨딩 캘리그래피: 좌석표·팻말을 직접 만드는 법",
      description: "캘리그래퍼에게 맡기지 않고도 좌석표, 메뉴, 웰컴 팻말, 축원 기념물을 집 프린터로 만들 수 있습니다. 필기체 폰트 고르기부터 카드스톡 인쇄 요령, 창문에 대고 따라 그리는 '창문 트레이싱 기법'까지 무료 도구 사용법을 정리했습니다.",
    },
    de: {
      title: "DIY-Hochzeitskalligraphie: Platzkarten & Schilder selbst",
      description: "Platzkarten, Menüs, Schilder und Gelübde-Drucke im Kalligraphie-Stil vom eigenen Drucker: Schreibschrift-Fonts, Karton-Tipps und der Fenster-Abpastrick.",
    },
    fr: {
      title: "Calligraphie mariage DIY : marque-places et panneaux",
      description: "Marque-places, menus, panneaux et vœux encadrés façon calligraphie depuis votre imprimante : polices scriptes, astuces carton et décalque à la fenêtre.",
    },
    es: {
      title: "Caligrafía de boda DIY: tarjetas de sitio y carteles",
      description: "Tarjetas de sitio, menús, carteles y votos enmarcados estilo caligrafía con tu impresora: fuentes manuscritas, consejos de cartulina y el calco en la ventana.",
    },
    pt: {
      title: "Caligrafia de casamento DIY: cartões de lugar e placas",
      description: "Cartões de lugar, menus, placas e votos emoldurados estilo caligrafia na sua impressora: fontes manuscritas, dicas de papel cartão e o decalque na janela.",
    },
  },
  "pen-pal-letters-for-kids": {
    zh: {
      title: "儿童笔友信:友好信件格式、写作提示与免费信纸",
      description: "笔友信怎么写?我们整理了美国学校教的友好信件五部分格式、能让对方想回信的提问示例,以及行距和线条颜色都能自由调节的免费可打印信纸,帮孩子的书写保持在横线内;名字描红页还能顺便练签名。",
    },
    ja: {
      title: "子どものペンフレット:フレンドリーレターの書き方と文例",
      description: "ペンフレットの書き方にお悩みですか?米国の学校で教わる手紙の5つのパート、返事がもらいやすい質問の文例、行間と線の色を調整できる無料の印刷用紙をまとめました。名前のなぞり練習シートで署名練習もできます。",
    },
    ko: {
      title: "아이들 펜팔 편지: 편지 형식과 질문 아이디어",
      description: "펜팔 편지를 어떻게 쓰게 할까요? 미국 학교에서 가르치는 친근한 편지의 다섯 부분, 답장을 불러오는 질문 예시, 줄 간격을 조절할 수 있는 무료 인쇄용 편지지를 정리했습니다. 이름 따라 쓰기 시트로 서명 연습까지 해결하세요.",
    },
    de: {
      title: "Brieffreundschaften für Kinder: Briefaufbau & Vorlagen",
      description: "Die fünf Teile des Briefaufbaus, Fragen, die Antworten bringen, und druckbares Briefpapier mit einstellbarem Zeilenabstand – alles kostenlos.",
    },
    fr: {
      title: "Correspondants pour enfants : format de la lettre + idées",
      description: "Les cinq parties de la lettre amicale, des questions qui obtiennent une réponse et du papier imprimable gratuit, à l'interligne adapté à votre enfant.",
    },
    es: {
      title: "Amigos por correspondencia para niños: formato e ideas",
      description: "Las cinco partes de la carta amistosa, preguntas que consiguen respuestas y papel para imprimir gratis, con el espaciado ajustado a la letra de tu hijo.",
    },
    pt: {
      title: "Amigo por correspondência: formato de carta para crianças",
      description: "As cinco partes da carta, perguntas que rendem respostas e papel para imprimir de graça, com espaçamento ajustado à letra do seu filho.",
    },
  },
  "how-to-improve-handwriting-adults": {
    zh: {
      title: "成年人如何练好字:4周计划",
      description: "成年人练字不必从零开始:先诊断字的大小、间距、倾斜和基线,找出问题所在,再按每天15分钟的四周计划针对性练习——并用你自己的句子免费生成定制练字帖,打开浏览器即可使用,输入的内容不会上传,坚持四周就能写出更清晰整齐的字。",
    },
    ja: {
      title: "大人の字を改善する方法:4週間プラン",
      description: "放っておいても上手くならない大人の字。まず大きさ・間隔・傾き・ベースラインを診断し、1日15分の4週間プランで集中的に練習しましょう。自分の書いた文から練習シートを無料で作成でき、ブラウザで完結し、入力内容はアップロードされません。",
    },
    ko: {
      title: "어른 글씨 개선 방법: 4주 플랜",
      description: "어른 글씨는 저절로 좋아지지 않습니다. 크기, 간격, 기울기, 기준선을 먼저 진단하고, 하루 15분짜리 4주 플랜으로 집중 연습하세요. 직접 쓴 문장으로 맞춤 연습지를 무료로 만들 수 있고, 브라우저에서 바로 작동하며 입력 내용은 업로드되지 않습니다.",
    },
    de: {
      title: "Handschrift als Erwachsener verbessern: 4-Wochen-Plan",
      description: "Größe, Abstände, Neigung und Grundlinie prüfen, dann 15 Minuten täglich vier Wochen gezielt üben — kostenlose Übungsblätter aus deinen eigenen Sätzen.",
    },
    fr: {
      title: "Améliorer son écriture d'adulte : plan sur 4 semaines",
      description: "Diagnostiquez taille, espacement, inclinaison et ligne de base, puis entraînez-vous 15 minutes par jour — fiches gratuites à partir de vos propres phrases.",
    },
    es: {
      title: "Cómo mejorar tu letra de adulto: plan de 4 semanas",
      description: "Diagnostica tamaño, espaciado, inclinación y línea base; practica 15 minutos al día durante cuatro semanas — hojas de práctica gratis con tus propias frases.",
    },
    pt: {
      title: "Como melhorar sua letra na vida adulta: plano de 4 semanas",
      description: "Diagnostique tamanho, espaçamento, inclinação e linha de base; treine 15 minutos por dia durante quatro semanas — fichas grátis com as suas próprias frases.",
    },
  },
  "handwriting-practice-struggling-writers": {
    zh: {
      title: "写字吃力孩子的练字方法(书写障碍友好)",
      description: "孩子一练字就握紧笔、掉眼泪?我们整理了作业治疗师常用的低压力调整:更高的书写格、浅灰描红行、更短的练习时间和语音输入。附免费可打印的三线格练字纸与名字描红生成器,帮书写障碍的孩子按自己的节奏练出信心。",
    },
    ja: {
      title: "書くのが苦手な子どもの文字練習(書字障害に配慮)",
      description: "鉛筆を握りしめて泣く子に、負担の少ない工夫を:高い行、薄いグレーのなぞり書き、短いセッション、そして音声入力。作業療法で使われる調整方法と、無料で印刷できる筆記用紙・なぞり書きシートのご案内。書くことが敵でも、言葉は紙に残せます。",
    },
    ko: {
      title: "쓰기를 어려워하는 아이의 글씨 연습(쓰기 장애 배려)",
      description: "연필을 꽉 쥐고 눈물까지 흐르는 아이에게: 더 높은 칸, 연한 회색 따라 쓰기, 짧은 세션, 음성 입력. 작업치료에서 쓰는 부담을 낮추는 조정법과 무료 인쇄용 필기 용지·이름 쓰기 학습지를 소개합니다. 아이 속도로, 눈물 없이 연습하세요.",
    },
    de: {
      title: "Schreibübung für Kinder mit Schreibproblemen (Dysgrafie)",
      description: "Üben ohne Tränen: höhere Linien, hellgraue Spurbuchstaben, kurze Einheiten, Spracheingabe. Anpassungen im Ergotherapie-Stil, plus kostenlose Schreibpapiere.",
    },
    fr: {
      title: "Écriture pour enfants en difficulté (adapté dysgraphie)",
      description: "Moins de pression : lignes plus hautes, traçage gris clair, séances courtes, dictée vocale. Ajustements type ergothérapie et fiches gratuites à imprimer.",
    },
    es: {
      title: "Caligrafía para niños con dificultades (apto para disgrafía)",
      description: "Menos presión al escribir: franjas más altas, calco gris claro, sesiones cortas y voz. Ajustes tipo terapia ocupacional y hojas gratis para imprimir.",
    },
    pt: {
      title: "Caligrafia para quem sofre com a escrita (disgrafia)",
      description: "Menos pressão na caligrafia: faixas mais altas, treino em cinza-claro, sessões curtas e ditado. Ajustes estilo terapia ocupacional e fichas grátis para imprimir.",
    },
  },
  "how-to-write-in-cursive": {
    zh: {
      title: "英文连笔怎么写:真正有效的初学者指南",
      description: "从零开始学英文连笔:按手写老师的教学顺序,先练四种基本笔画,再按字母家族(而非字母表顺序)掌握字母,讲清连接规则,并给出可执行的30天计划——每天10~15分钟即可,练习时可随时输入单词,免费生成练字帖并打印描摹。",
    },
    ja: {
      title: "筆記体の書き方:本当に身につく初心者ガイド",
      description: "筆記体をゼロから学ぶ方法:4つの基本ストロークから始めて、アルファベット順ではなく文字ファミリーごとに練習し、接続のルールを押さえるまでを、毎日10〜15分の30日間プランで。練習シートは無料で生成して印刷できます。",
    },
    ko: {
      title: "필기체 쓰는 법: 실제로 통하는 초보자 가이드",
      description: "필기체를 처음부터 배우는 방법: 네 가지 기본 스트로크부터 시작해 알파벳 순서가 아닌 글자군으로 연습하고, 연결 규칙까지 익히는 30일 플랜. 매일 10〜15분이면 충분하고, 연습지는 이름이든 단어 목록이든 무료로 만들어 인쇄할 수 있습니다.",
    },
    de: {
      title: "Schreibschrift lernen: Ein Anfänger-Guide, der wirkt",
      description: "Schreibschrift von Grund auf: die vier Grundstriche, Buchstabenfamilien, Verbindungsregeln und ein 30-Tage-Plan — mit kostenlosen Übungsblättern zum Ausdrucken.",
    },
    fr: {
      title: "Écrire en cursive : le guide débutant qui marche vraiment",
      description: "Apprenez l'écriture cursive de zéro : quatre gestes, familles de lettres, règles de liaison et un plan de 30 jours — fiches gratuites à imprimer.",
    },
    es: {
      title: "Cómo escribir en letra cursiva: guía para principiantes",
      description: "Aprende cursiva desde cero: cuatro trazos básicos, familias de letras, reglas de conexión y un plan de 30 días — hojas de práctica imprimibles gratis.",
    },
    pt: {
      title: "Como escrever em cursiva: guia para iniciantes que funciona",
      description: "Aprenda letra cursiva do zero: os quatro traços básicos, famílias de letras, regras de ligação e um plano de 30 dias — folhas de treino grátis para imprimir.",
    },
  },
  "cursive-alphabet-chart": {
    zh: {
      title: "按学习方式整理的英文草书字母表(免费打印图表)",
      description: "把所有英文草书字母按笔画家族分组:小写与大写全覆盖,单独点出最容易写错的五个字母,并附免费可打印的字母表图表。把任意字母行输入草书生成器,选好字体和字号,即可下载 PDF 打印描红,按家族逐组练习。",
    },
    ja: {
      title: "学ぶ順番に整理した筆記体アルファベット一覧",
      description: "筆記体の文字をすべてストロークファミリー別に整理しました。小文字と大文字、ミスが集中する 5 つの文字、さらに無料で印刷できるアルファベット表つき。文字の行を筆記体ジェネレーターに入力すれば、なぞり練習用のチャートを印刷できます。",
    },
    ko: {
      title: "배우는 순서대로 정리한 필기체 알파벳 차트",
      description: "모든 필기체 글자를 획 계열별로 정리했습니다. 소문자와 대문자, 실수가 집중되는 다섯 글자, 그리고 무료 인쇄용 알파벳 차트까지. 글자 행을 필기체 생성기에 입력해 따라 쓰기 차트를 인쇄해 보세요.",
    },
    de: {
      title: "Das Schreibschrift-Alphabet, sortiert wie du es lernst",
      description: "Alle Schreibschrift-Buchstaben nach Strichfamilien: Klein- und Großbuchstaben, die fünf häufigsten Fehlerquellen und eine kostenlose Tabelle zum Ausdrucken.",
    },
    fr: {
      title: "Alphabet écriture cursive, organisé pour bien apprendre",
      description: "Toutes les lettres cursives par familles de gestes — minuscules et majuscules, les cinq lettres les plus piégeuses, plus une fiche imprimable gratuite.",
    },
    es: {
      title: "El abecedario en cursiva, organizado como lo aprenderás",
      description: "Todas las letras cursivas agrupadas por familias de trazos — minúsculas y mayúsculas, las cinco letras que causan más errores y una ficha imprimible gratis.",
    },
    pt: {
      title: "O alfabeto cursivo, organizado do jeito que você aprende",
      description: "Todas as letras cursivas agrupadas por famílias de traços — minúsculas e maiúsculas, as cinco letras que causam mais erros e um quadro imprimível gratuito.",
    },
  },
  "cursive-name-signature": {
    zh: {
      title: "如何用英文连笔写自己的名字(并练出签名)",
      description: "两阶段练习法:先用可在线生成、免费打印的描红字帖,把你的名字写成清晰可读的英文连笔字——每天五分钟,一周就能稳定成形;再在此基础上设计一个快速、稳定、你真的能重复写出来的签名。",
    },
    ja: {
      title: "筆記体で名前を書く方法——サインも作れる",
      description: "2段階メソッド:印刷できるなぞり書きシートで、名前を読みやすい筆記体で書けるようにします。1日5分、1週間で安定した形に。その骨格をもとに、速く書けて毎回同じ、本当に再現できるサインを設計します。",
    },
    ko: {
      title: "필기체로 이름 쓰는 방법 — 두 단계로 서명까지",
      description: "2단계 방법: 인쇄할 수 있는 따라쓰기 시트로 이름을 알아볼 수 있는 필기체로 쓰는 연습을 먼저 하고, 그다음 매번 똑같이 쓸 수 있는 서명을 설계합니다. 하루 5분이면 일주일 안에 기초가 잡힙니다.",
    },
    de: {
      title: "Namen in Schreibschrift schreiben: deine Unterschrift bauen",
      description: "Zwei Etappen: erst deinen Namen mit druckbaren Vorlagen in lesbarer Schreibschrift schreiben, dann eine Unterschrift, die du wirklich reproduzieren kannst.",
    },
    fr: {
      title: "Écrire son nom en cursive — et créer sa signature",
      description: "Méthode en deux étapes : votre nom en écriture cursive lisible grâce aux fiches à tracer, puis une signature que vous pouvez vraiment reproduire.",
    },
    es: {
      title: "Cómo escribir tu nombre en cursiva (y crear tu firma)",
      description: "Método de dos etapas: primero escribe tu nombre en letra cursiva legible con fichas para calcar imprimibles y luego diseña una firma que puedas reproducir.",
    },
    pt: {
      title: "Como escrever seu nome em cursiva (e criar a assinatura)",
      description: "Método de duas etapas: escreva seu nome em letra cursiva legível com folhas de traçado imprimíveis e depois crie uma assinatura que você consiga reproduzir.",
    },
  },
  "is-cursive-still-taught": {
    zh: {
      title: "学校还教英文草书吗?美国草书教学现状",
      description: "英文草书在 2010 年被 Common Core(美国共同核心州立标准)移出,自 2016 年起在美国各州陆续回归。现在哪些州要求教草书?研究实际发现了什么?家长、孩子和成年人分别该怎么练?这篇文章一次讲清楚。",
    },
    ja: {
      title: "筆記体は学校でまだ教えられている?米国の現状",
      description: "筆記体は 2010 年に Common Core から外れ、2016 年以降は米国の各州で復活が続いています。現在どの州が必須にしているのか、研究が実際に何を言っているのか、保護者と大人が今できることを解説します。",
    },
    ko: {
      title: "학교에서는 아직 필기체를 가르칠까요? 미국의 현황",
      description: "필기체는 2010년 Common Core에서 빠진 뒤, 2016년부터 미국 여러 주에서 되살아나고 있습니다. 지금 어떤 주가 필기체를 의무화하는지, 연구가 실제로 무엇을 말하는지, 학부모와 어른이 지금 할 수 있는 일을 정리했습니다.",
    },
    de: {
      title: "Wird Schreibschrift noch unterrichtet? Der Stand in den USA",
      description: "Schreibschrift flog 2010 aus Common Core und kehrt seit 2016 zurück: welche Bundesstaaten sie vorschreiben, was die Forschung sagt und was du tun kannst.",
    },
    fr: {
      title: "La cursive est-elle encore enseignée ? État des lieux",
      description: "La cursive a quitté les Common Core en 2010 et revient depuis 2016 : quels États américains l'exigent, ce que dit la recherche et ce que vous pouvez faire.",
    },
    es: {
      title: "¿Se sigue enseñando cursiva en las escuelas?",
      description: "La cursiva salió de Common Core en 2010 y vuelve desde 2016: qué estados de EE. UU. la exigen, qué dice la investigación y qué puedes hacer al respecto.",
    },
    pt: {
      title: "As escolas ainda ensinam cursiva? O estado da letra cursiva",
      description: "A cursiva saiu do Common Core em 2010 e vem voltando desde 2016: quais estados exigem, o que diz a pesquisa e o que fazer a respeito.",
    },
  },
  "cursive-vs-print": {
    zh: {
      title: "英文连笔字还是印刷体?该学哪种手写方式?",
      description: "连笔字和印刷体,到底该练哪个?我们从速度、易读性、学习曲线和日常实用性出发,诚实地对比两种英文手写方式,并整理研究的实际发现:决定书写水平的是熟练度,而非字体选择,而大多数成年人其实两种都用得上。文中还给出用同一句话同时练习两种字体的方法。",
    },
    ja: {
      title: "筆記体か活字体か:学ぶべき手書きスタイルはどちら?",
      description: "速さ、読みやすさ、学習曲線、日常での実用性の観点から、筆記体と活字体を正直に比較します。研究が実際に示しているのは、スタイルの選択よりも書く手の熟練が重要だということ。さらに、同じ文章で両方のスタイルを同時に練習する方法も紹介します。",
    },
    ko: {
      title: "필기체 vs 타자체: 어떤 손글씨를 배워야 할까?",
      description: "속도, 가독성, 학습 곡선, 일상적 실용성을 기준으로 필기체와 타자체를 솔직하게 비교합니다. 연구가 실제로 보여주는 결론은 단순합니다. 스타일 선택보다 손의 숙련도가 중요하며, 대부분의 성인에게는 둘 다 필요합니다.",
    },
    de: {
      title: "Schreibschrift oder Druckschrift: Was solltest du lernen?",
      description: "Schreibschrift oder Druckschrift: ein ehrlicher Vergleich zu Tempo, Lesbarkeit, Lernkurve und Alltagstauglichkeit — mit dem, was Studien wirklich zeigen.",
    },
    fr: {
      title: "Écriture cursive ou script : quel style apprendre ?",
      description: "Vitesse, lisibilité, courbe d'apprentissage, usage quotidien : une comparaison honnête de l'écriture cursive et du script — au final, la main exercée gagne.",
    },
    es: {
      title: "Cursiva o imprenta: ¿qué estilo de letra aprender?",
      description: "Velocidad, legibilidad y curva de aprendizaje: una comparación honesta de cursiva e imprenta, con lo que dicen los estudios de verdad.",
    },
    pt: {
      title: "Cursiva ou imprensa: qual estilo de escrita aprender?",
      description: "Velocidade, legibilidade, curva de aprendizado e uso diário: uma comparação honesta entre cursiva e letra de imprensa — no fim, vence a mão treinada.",
    },
  },
  "how-to-teach-cursive-kids": {
    zh: {
      title: "如何在家教孩子写英文连笔字(10分钟小课)",
      description: "孩子什么时候适合学英文连笔字、字母按什么顺序教、每次10分钟的一课怎么上——这里有准备信号、字母家族教学顺序和课程结构,每一步都配免费可打印的连笔字练习纸。",
    },
    ja: {
      title: "おうちで教える子どもの筆記体:10分レッスンの進め方",
      description: "準備が整ったサイン、文字の仲間ごとの教える順序、週3回・1回10分のレッスン構成を解説。各ステップに無料で印刷できる筆記体練習シートが付いています。",
    },
    ko: {
      title: "집에서 가르치는 아이 필기체, 10분 수업 가이드",
      description: "준비 완료 신호, 글자 가족별 가르치기 순서, 주 3회 10분 수업 구성까지. 매 단계에 맞는 무료 인쇄용 필기체 연습지를 함께 제공합니다.",
    },
    de: {
      title: "Schreibschrift lernen mit Kindern: 10-Minuten-Lektionen",
      description: "Bereitschaftszeichen, sinnvolle Buchstaben-Reihenfolge und 10-Minuten-Lektionen — mit gratis druckbaren Schreibschrift-Übungsblättern für jeden Schritt.",
    },
    fr: {
      title: "Apprendre l'écriture cursive à la maison : leçons de 10 min",
      description: "Signes de prêt, ordre d'apprentissage par familles de lettres et leçons de 10 minutes, avec des fiches de cursive imprimables gratuites pour chaque étape.",
    },
    es: {
      title: "Enseñar letra cursiva a niños en casa (lecciones de 10 min)",
      description: "Señales de preparación, orden de enseñanza por familias de letras y lecciones de 10 minutos, con hojas de cursiva imprimibles gratis para cada paso.",
    },
    pt: {
      title: "Como ensinar letra cursiva em casa (lições de 10 minutos)",
      description: "Sinais de prontidão, ordem de ensino por famílias de letras e lições de 10 minutos, com folhas de cursiva para imprimir grátis em cada etapa.",
    },
  },
  "handwriting-vs-typing-brain": {
    zh: {
      title: "手写与打字:大脑研究究竟说了什么",
      description: "脑电图(EEG)研究、Mueller 与 Oppenheimer 引发的笔记方法之争,以及手写与认知衰退之间究竟是什么关系——本文梳理手写与打字对大脑影响的科学证据,区分研究真正证明了什么、还没证明什么,并告诉你如何把每天 15 分钟的手写用起来。",
    },
    ja: {
      title: "手書き vs タイピング:脳研究が実際に語ること",
      description: "脳波(EEG)研究や Mueller & Oppenheimer のノート術をめぐる論争、そして手書きと認知機能低下の関係。研究が示していることと、示していないことを整理し、1日15分の手書き習慣の始め方まで解説します。",
    },
    ko: {
      title: "손글씨 vs 타이핑: 뇌 연구가 실제로 말하는 것",
      description: "뇌전도(EEG) 연구, Mueller & Oppenheimer의 노트 필기 논쟁, 그리고 손글씨와 인지 저하의 관계. 연구가 보여주는 것과 보여주지 않는 것을 정리하고, 하루 15분 손글씨 습관을 시작하는 방법까지 안내합니다.",
    },
    de: {
      title: "Handschreiben vs. Tippen: Was die Hirnforschung zeigt",
      description: "EEG-Studien, die Notiz-Debatte um Mueller & Oppenheimer und was die Forschung über Handschreiben und kognitiven Abbau zeigt — und was nicht.",
    },
    fr: {
      title: "Écriture manuelle vs clavier : que dit la recherche ?",
      description: "Études EEG, le débat Mueller & Oppenheimer sur la prise de notes, et ce que la recherche dit — ou ne dit pas — de l'écriture manuelle et du déclin cognitif.",
    },
    es: {
      title: "Escribir a mano o teclear: qué dice la ciencia del cerebro",
      description: "Estudios de EEG, el debate de Mueller y Oppenheimer sobre los apuntes y qué dice la investigación —y qué no— sobre escritura a mano y deterioro cognitivo.",
    },
    pt: {
      title: "Escrever à mão ou digitar: o que a ciência do cérebro diz",
      description: "Estudos de EEG, o debate Mueller & Oppenheimer sobre anotações e o que a pesquisa diz — e não diz — sobre escrita à mão e declínio cognitivo.",
    },
  },
  "how-to-improve-your-handwriting": {
    zh: {
      title: "如何改善你的字迹:完整指南",
      description: "诊断出大小、间距、基线、倾斜这四个杠杆中是哪一个在拖后腿,执行每天15分钟的练字流程,选定一个值得模仿的范本风格,避开白白浪费几个月的常见错误——坚持两到四周就能看到真实变化,文中所有练习工具都可以免费打印使用。",
    },
    ja: {
      title: "字を上達させる方法:完全ガイド",
      description: "字が雑い原因は才能ではなく、大きさ・間隔・ベースライン・傾きの4つのレバー設定にあります。原因を診断し、1日15分のルーティンを実行し、手本スタイルを選ぶ完全ガイド。練習ツールはすべて無料で印刷できます。",
    },
    ko: {
      title: "손글씨 개선하는 방법: 완벽 가이드",
      description: "글씨가 삐뚤빼뚤한 원인은 재능이 아닙니다. 크기, 간격, 기준선, 기울기라는 네 가지 레버를 진단하고, 하루 15분 루틴을 실행하고, 모범이 될 서체를 고르는 완벽 가이드. 연습 도구는 모두 무료로 인쇄할 수 있습니다.",
    },
    de: {
      title: "Handschrift verbessern: der komplette Ratgeber",
      description: "Diagnostiziere Größe, Abstand, Grundlinie und Neigung, mach die tägliche 15-Minuten-Routine und wähle eine Zielschrift — mit Übungstools zum Ausdrucken.",
    },
    fr: {
      title: "Comment améliorer votre écriture : le guide complet",
      description: "Quatre leviers à corriger (taille, espacement, ligne de base, inclinaison), une routine de 15 minutes par jour, un style modèle — outils gratuits à imprimer.",
    },
    es: {
      title: "Cómo mejorar tu letra: la guía completa",
      description: "Diagnostica tamaño, espaciado, línea base e inclinación, haz la rutina de 15 minutos al día y elige un estilo de referencia — con herramientas gratis.",
    },
    pt: {
      title: "Como melhorar sua letra: o guia completo",
      description: "Diagnostique tamanho, espaçamento, linha de base e inclinação, siga a rotina de 15 minutos por dia e escolha um estilo-modelo — com ferramentas gratuitas.",
    },
  },

  "name-tracing-with-lines": {
    zh: {
      title: "名字描红带线条：免费三线格工作表打印",
      description:
        "三条线各自教什么、几岁用多高的行距，以及怎么用名字描红生成器打印带线条的个性化工作表——免费 PDF。",
    },
    ja: {
      title: "名前のなぞり書きは線付きで：3 線ワークシートを無料印刷",
      description:
        "3 本の線がそれぞれ教えていること、年齢別の行の高さ、名前なぞりジェネレーターで線付きワークシートを印刷する手順。無料 PDF。",
    },
    ko: {
      title: "줄 있는 이름 쓰기 연습지: 세 줄 워크시트 무료 인쇄",
      description:
        "세 줄이 각각 가르치는 것, 나이별 줄 높이, 이름 쓰기 생성기로 줄 있는 맞춤 워크시트를 인쇄하는 방법. 무료 PDF.",
    },
    es: {
      title: "Caligrafía de nombres con líneas: fichas de tres líneas para imprimir",
      description:
        "Qué enseña cada una de las tres líneas, qué altura de fila va según la edad y cómo imprimir fichas de nombres con líneas — PDF gratis.",
    },
  },
  "calligraphy-motto-cards": {
    zh: {
      title: "书法风金句卡片：把座右铭做成手写卡片",
      description:
        "用语音或打字输入座右铭，Dancing Script 配蓝黑墨水与空白纸——实测参数、6 条现成文案与 Pinterest 竖版导出。",
    },
    ja: {
      title: "書道風モットーカード：座右の銘を手書きカードに",
      description:
        "座右の銘を話すか入力するだけ。Dancing Script×藍がかったインク×無地紙の実測設定と、そのまま使える 6 つの文例、Pinterest 縦型書き出し付き。",
    },
    ko: {
      title: "캘리그라피 모토 카드: 좌우명을 손글씨 카드로",
      description:
        "좌우명을 말하거나 입력하면 끝. Dancing Script에 청흑 잉크, 무지 용지의 실측 설정과 바로 쓸 수 있는 문구 6종, Pinterest 세로 내보내기까지.",
    },
    es: {
      title: "Tarjetas de lema en caligrafía: tu mantra escrito a mano",
      description:
        "Di o escribe tu lema, Dancing Script con tinta azul negro sobre papel liso: ajustes probados, 6 lemas listos y exportación vertical para Pinterest.",
    },
  },
};

export const EXTRA_TEMPLATE_I18N: Record<string, Partial<Record<Locale, TemplateMetaI18n>>> = {
  "love-letter": {
    de: {
      title: "Liebesbrief-Vorlage: Wie schreibt man eine liebevolle Liebeserklärung?",
      description:
        "Keine schicken Worte — die kleinen Dinge zählen. Laufschrift auf Briefpapier; eine Zeile ändern und sie ist deins.",
      text: "An dich,\nmanche Worte sagt man besser schriftlich.\nSeit ich dich kenne, leuchten selbst die normalen Tage.\nIch möchte den Weg weiter mit dir gehen.",
    },
    fr: {
      title: "Modèle de lettre d'amour : comment écrire ce qui touche",
      description:
        "Pas de grands mots — les petites choses suffisent. Cursive sur papier lettre ; changez une ligne et c'est à vous.",
      text: "À toi,\ncertaines choses s'écrivent mieux qu'elles ne se disent.\nDepuis que je te connais, les jours ordinaires brillent.\nJe voudrais continuer ce chemin avec toi.",
    },
    pt: {
      title: "Modelo de carta de amor: como escrever o que toca",
      description:
        "Sem palavras rebuscadas — os detalhes pequenos bastam. Cursiva no papel carta; mude uma linha e é sua.",
      text: "Para você,\nalgumas palavras saem melhor escritas do que ditas.\nDesde que te conheci, os dias comuns brilham.\nQuero seguir esse caminho com você.",
    },
  },
  "apology-letter": {
    de: {
      title: "Entschuldigungsbrief-Vorlage: aufrichtig Entschuldigung schreiben",
      description:
        "Formel: eingestehen + mitfühlen + handeln. Kursive Schrift in Schwarz für Freunde und Kollegen.",
      text: "Es tut mir leid.\nMein Ton neulich war falsch, und ich habe es sofort bereut.\nIch habe viel nachgedacht und verstehe, wie du dich fühlst.\nDarf ich mich persönlich entschuldigen? Unsere Freundschaft ist mir wichtig.",
    },
    fr: {
      title: "Modèle de lettre d'excuses : s'excuser avec sincérité",
      description:
        "Reconnaître, comprendre, agir. Écriture régulière à l'encre noire, pour amis et collègues.",
      text: "Je suis désolé(e).\nMon ton de l'autre jour était déplacé — je l'ai regretté dès que j'ai parlé.\nJ'ai beaucoup réfléchi et je comprends ce que tu as ressenti.\nPuis-je m'excuser en personne ? Notre amitié compte pour moi.",
    },
    pt: {
      title: "Modelo de carta de desculpas: como pedir desculpas com sinceridade",
      description:
        "Assumir, se colocar no lugar, agir. Letra regular em tinta preta, para amigos e colegas.",
      text: "Me desculpa.\nMeu tom daquele dia foi errado — me arrependi assim que falei.\nPensei muito e entendi como você se sentiu.\nPosso me desculpar pessoalmente? Nossa amizade importa.",
    },
  },
  "thank-you-letter": {
    de: {
      title: "Dankesbrief-Vorlage: Danke, das von Herzen klingt",
      description:
        "Konkrete Erinnerungen statt Floskeln — für Lehrer, Kollegen, Helfer.",
      text: "Danke dir.\nIch erinnere mich an jeden Moment, in dem du mir geholfen hast.\nDeine Freundlichkeit ist mit der Zeit nicht verschwunden — sie ist klarer geworden.\nMöge dieselbe Freundlichkeit dich finden.",
    },
    fr: {
      title: "Modèle de lettre de remerciement : un merci qui a du poids",
      description:
        "Des souvenirs précis plutôt que des formules — pour un professeur, un collègue, un ami.",
      text: "Merci.\nJe me souviens de chaque moment où tu m'as aidé et guidé.\nTa gentillesse ne s'est pas effacée avec le temps — elle est plus claire.\nQue la même gentillesse te retrouve.",
    },
    pt: {
      title: "Modelo de carta de agradecimento: um obrigado de peso",
      description:
        "Memórias específicas em vez de fórmulas — para professores, colegas, quem ajudou.",
      text: "Obrigado.\nLembro de cada momento em que me ajudou e me orientou.\nSua gentileza não desapareceu com o tempo — ficou mais clara.\nQue a mesma gentileza encontre você.",
    },
  },
  "birthday-wishes": {
    de: {
      title: "Geburtstagskarten-Vorlage: Wünsche ohne Klischee",
      description:
        "Möge jeder Einsatz ein Echo finden. Zentrierte Zinnober-Schrift — fertig für Social Media.",
      text: "Alles Gute zum Geburtstag!\nMöge jede Anstrengung ein Echo finden,\njeder Plan noch Zeit haben und alle Lieben nah sein.\nIm neuen Lebensjahr: Gesundheit und Freude zuerst.",
    },
    fr: {
      title: "Modèle d'anniversaire : des vœux sans clichés",
      description:
        "Que chaque effort trouve son écho. Caractères centrés en cinabre — prêts à publier.",
      text: "Joyeux anniversaire !\nQue chaque effort trouve son écho,\nque chaque projet arrive à temps et tes proches soient proches.\nDans cette nouvelle année : santé et joie d'abord.",
    },
    pt: {
      title: "Modelo de aniversário: desejos sem clichê",
      description:
        "Que cada esforço encontre eco. Caracteres centrados em vermelho — prontos para publicar.",
      text: "Feliz aniversário!\nQue cada esforço encontre eco,\nque todo plano ainda tenha tempo e quem você ama esteja perto.\nNeste novo ano: saúde e alegria em primeiro lugar.",
    },
  },
  "teachers-day": {
    de: {
      title: "Lehrertag-Karten-Vorlage: Danke an die Lehrer",
      description:
        "„Was ich früher als Nörgeln empfand, ist heute mein Rückgrat“ — für Posts und echte Karten.",
      text: "Lieber Lehrer, danke dir.\nDie Tafel wird gewischt; was du gelehrt hast, nicht.\nWas ich früher als Nörgeln empfand, ist heute mein Rückgrat.\nFröhlicher Lehrertag — Frieden und Gesundheit.",
    },
    fr: {
      title: "Modèle pour la fête des maîtres : merci aux enseignants",
      description:
        "« Ce qui me semblait des réprimandes est aujourd'hui ma confiance » — pour publier ou écrire à la main.",
      text: "Cher maître, merci.\nLe tableau s'efface ; ce que vous avez enseigné, jamais.\nLes mots qui semblaient des réprimandes sont aujourd'hui ma confiance.\nBonne fête des maîtres — paix et santé.",
    },
    pt: {
      title: "Modelo do Dia do Professor: agradecimento escrito",
      description:
        "\"O que parecia cobrança hoje é minha confiança\" — para posts e para cartões de verdade.",
      text: "Querido professor, obrigado.\nO quadro se apaga; o que o senhor ensinou, não.\nAs palavras que pareciam cobrança hoje são minha confiança.\nFeliz Dia do Professor — paz e saúde.",
    },
  },
  "new-year-wishes": {
    de: {
      title: "Neujahrs-Vorlage: Wünsche ohne Klischee",
      description:
        "Die Reue des alten Jahres bleibt im alten Jahr. Große zentrierte Zinnober-Zeichen.",
      text: "Frohes neues Jahr!\nDie Reue des alten Jahres bleibt im alten Jahr.\nIm neuen Jahr: Licht in den Augen, Zuversicht im Herzen,\nGesundheit und ein gutes Gelingen — jedes Jahr ein gutes Jahr.",
    },
    fr: {
      title: "Modèle de vœux du Nouvel An : sans clichés",
      description:
        "Grands caractères centrés en cinabre — la publication parfaite pour le réveillon.",
      text: "Bonne année !\nLaisse les regrets dans l'année ancienne.\nPour la nouvelle : de la lumière dans les yeux, de la confiance au cœur,\nla santé et que tout aille bien — que chaque année soit bonne.",
    },
    pt: {
      title: "Modelo de votos de Ano Novo: sem clichê",
      description:
        "Grandes caracteres centrados em vermelho — a imagem perfeita para a virada.",
      text: "Feliz Ano Novo!\nDeixe os arrependimentos no ano velho.\nNo ano novo: luz nos olhos, confiança no coração,\nsaúde e tudo fluindo — que cada ano seja bom.",
    },
  },
  "valentines-day": {
    de: {
      title: "Valentinstags-Vorlage: Gefühle zu Papier bringen",
      description:
        "Für den 14.2 oder jeden mutigen Tag. Laufschrift in Zinnober.",
      text: "An dich,\nwenn Leute fragen, wie es mir geht, denke ich an dich.\nSo viel Zuneigung lässt sich nicht verbergen —\nheute habe ich sie zu Worten gemacht.",
    },
    fr: {
      title: "Modèle de Saint-Valentin : écrire ce qu'on ressent",
      description:
        "Pour le 14 février ou tout jour de courage. Cursive en cinabre.",
      text: "À toi,\nquand on me demande comment je vais, je pense à toi.\nTellement t'aimer ne peut pas rester caché —\naujourd'hui, je l'ai mis en mots.",
    },
    pt: {
      title: "Modelo de Valentine: escrever o que sente",
      description:
        "Para o 14 de fevereiro ou qualquer dia corajoso. Cursiva em vermelho.",
      text: "Para você,\nquando perguntam como estou, penso em você.\nGostar assim não dá para esconder —\nhoje transformei em palavras.",
    },
  },
  "mothers-day": {
    de: {
      title: "Muttertags-Vorlage: einen Brief an Mama",
      description:
        "Der Dank, den man nicht laut sagen kann — handschriftlich für sie.",
      text: "Mama,\ndu hast meine Hand beim Überqueren gehalten; jetzt halte ich deine.\nDu sagst immer, keine Geschenke nötig — dann hör gerade das:\nPass auf dich auf, iss ordentlich, ich liebe dich.",
    },
    fr: {
      title: "Modèle pour la fête des mères : écrire à maman",
      description:
        "Le merci difficile à dire à voix haute, écrit pour elle.",
      text: "Maman,\ntu me tenais la main en traversant ; maintenant c'est mon tour de tenir la tienne.\nTu dis toujours qu'aucun cadeau n'est nécessaire — alors écoute juste :\nprends soin de toi, mange bien, je t'aime.",
    },
    pt: {
      title: "Modelo do Dia das Mães: carta para a mamãe",
      description:
        "O agradecimento difícil de falar, escrito para ela.",
      text: "Mãe,\nquando era pequena você segurava minha mão para atravessar; agora é minha vez.\nVocê sempre diz que não precisa de presente — então só ouça:\nse cuide, coma bem, eu te amo.",
    },
  },
  "fathers-day": {
    de: {
      title: "Vatertags-Vorlage: einen Brief an Papa",
      description:
        "Mit Papa spricht man wenig — also schreib es auf. Kräftige Schrift in Blauschwarz.",
      text: "Papa,\ndu hast wenig gesagt, aber ich erinnere mich an den Wind auf dem Gepäckträger\nund an das „ist okay, versuch es nochmal“ nach jeder verhauenen Prüfung.\nFröhlichen Vatertag. Du wirst älter — jetzt bin ich dran, auf dich zu achten.",
    },
    fr: {
      title: "Modèle pour la fête des pères : écrire à papa",
      description:
        "Avec papa on parle peu — alors écris-le. Écriture forte en bleu noir.",
      text: "Papa,\ntu parlais peu, mais je me souviens du vent à l'arrière de ton vélo\net de ce « c'est bon, réessaie » après chaque examen raté.\nBonne fête des pères. À moi de m'occuper de toi maintenant.",
    },
    pt: {
      title: "Modelo do Dia dos Pais: carta para o pai",
      description:
        "Com o pai se fala pouco — então escreva. Letra forte em azul escuro.",
      text: "Pai,\nvocê falava pouco, mas lembro do vento na garupa da bicicleta\ne do \"tá tudo bem, tenta de novo\" depois de cada prova.\nFeliz Dia dos Pais. Agora é minha vez de cuidar de você.",
    },
  },
  "graduation-message": {
    de: {
      title: "Abschlusskarten-Vorlage: Worte für Mitschüler",
      description:
        "Für das Jahrbuch, für die Menschen, mit denen du aufgewachsen bist.",
      text: "An [Name],\ndie Nachsitzen im Flur, die zusammen abgeschriebenen Hausaufgaben — noch lebendig.\nDie Welt ist groß; geh und nimm deinen Teil.\nMöge man sich in Jahren wiedersehen: du noch du, wir noch wir.",
    },
    fr: {
      title: "Modèle de message de remise des diplômes",
      description:
        "Pour l'album, pour ceux qui ont grandi avec toi.",
      text: "À [nom],\nles retenues dans le couloir, les devoirs copiés ensemble — encore vivants.\nLe monde est immense ; va chercher ta part.\nDans quelques années : que tu sois toujours toi, et nous toujours nous.",
    },
    pt: {
      title: "Modelo de mensagem de formatura",
      description:
        "Para o anuário, para quem cresceu com você.",
      text: "Para [nome]:\na detenção no corredor, os deveres copiados juntos — ainda vivos.\nO mundo é enorme; vá buscar sua parte.\nDaqui a anos, que você ainda seja você e nós ainda sejamos nós.",
    },
  },
  "get-well-card": {
    de: {
      title: "Gute-Besserung-Karten-Vorlage",
      description:
        "Wenn ein Besuch schwer ist, sagt eine handgeschriebene Karte alles.",
      text: "Ich habe gehört, du bist im Krankenhaus — ich denke an dich.\nDu musst dich nicht beeilen; schlaf, so viel du brauchst.\nZu Hause kümmern wir uns um alles. Ruhe dich aus.\nWenn du rauskommst: gleicher Ort, ich lade ein.",
    },
    fr: {
      title: "Modèle de carte de rétablissement",
      description:
        "Quand la visite est difficile, une carte manuscrite dit tout.",
      text: "J'ai appris que tu es à l'hôpital — je pense à toi.\nNe te presse pas de guérir ; dors autant que nécessaire.\nÀ la maison tout est géré. Repose-toi.\nQuand tu sortiras, même endroit, c'est moi qui invite.",
    },
    pt: {
      title: "Modelo de cartão de melhoras",
      description:
        "Quando visitar é difícil, um cartão escrito à mão diz tudo.",
      text: "Soube que você está hospitalizado — estou pensando em você.\nNão se apresse em melhorar; durma o quanto precisar.\nEm casa está tudo encaminhado. Só descanse.\nQuando sair, mesmo lugar, eu convido.",
    },
  },
  "wedding-congratulations": {
    de: {
      title: "Hochzeitskarten-Vorlage: Wünsche für das Brautpaar",
      description:
        "Über den Umschlag hinaus — eine herzliche Zeile, an die man sich erinnert.",
      text: "Herzlichen Glückwunsch zur Hochzeit!\nIch habe das Ungeschick und den Ernst eurer Liebe gesehen.\nIch vertraue darauf, dass ihr aus normalen Tagen Poesie macht.\nMögen die kommenden Jahre jeden Tag gut würzen.",
    },
    fr: {
      title: "Modèle de félicitations de mariage : pour les mariés",
      description:
        "Au-delà de l'enveloppe — une ligne sincère dont on se souviendra.",
      text: "Félicitations pour votre mariage !\nJ'ai vu la maladresse et le sérieux de votre amour.\nJe vous crois capables de transformer les jours ordinaires en poésie.\nQue les années à venir assaisonnent bien chaque jour.",
    },
    pt: {
      title: "Modelo de felicitações de casamento: para os noivos",
      description:
        "Além do envelope — uma frase sincera que vão lembrar.",
      text: "Felicidades pelo casamento!\nVi a torpeza e a seriedade do amor de vocês.\nConfio que vão transformar dias comuns em poesia.\nQue os anos que vêm tempere bem cada dia.",
    },
  },
  "letter-from-santa": {
    de: {
      title: "Brief-vom-Weihnachtsmann-Vorlage (handschriftlich, druckbar)",
      description:
        "Ein handschriftlicher Brief vom Nordpol: warme Worte in Santas Schrift auf festlichem Papier. Eine Zeile ändern, drucken, am Heiligabend unter den Baum legen.",
      text: "Frohe Weihnachten!\nHo ho ho! Ich bin’s, der Weihnachtsmann. Die Elfen und Rentiere haben abgestimmt: Du stehst offiziell auf der Braven-Liste (doppelt überprüft).\nAn Heiligabend bitte ein Plätzchen für mich und ein paar Karotten für die Rentiere dalassen.\nMach weiter so — neugierig und freundlich.\nDer Weihnachtsmann, Nordpol",
    },
    fr: {
      title: "Modèle de lettre du Père Noël (imprimable)",
      description:
        "Une lettre manuscrite du pôle Nord : des mots chaleureux en écriture du Père Noël sur papier festif. Modifiez une ligne, imprimez, déposez sous le sapin le réveillon.",
      text: "Joyeux Noël !\nHo ho ho ! C’est moi, le Père Noël. Les lutins et les rennes ont voté : tu es officiellement sur la liste des sages (vérifiée deux fois).\nLe réveillon, laisse-moi un cookie et quelques carottes pour les rennes.\nContinue d’être curieux et gentil.\nLe Père Noël, pôle Nord",
    },
    pt: {
      title: "Modelo de carta do Papai Noel (imprimível)",
      description:
        "Uma carta manuscrita do Polo Norte: palavras carinhosas na letra do Papai Noel em papel festivo. Edite, imprima e deixe sob a árvore na véspera de Natal.",
      text: "Feliz Natal!\nHo ho ho! Sou eu, o Papai Noel. Os elfos e as renas votaram: você está oficialmente na lista dos bonzinhos (checada duas vezes).\nNa véspera, deixe um biscoito para mim e cenouras para as renas.\nContinue curioso e gentil.\nPapai Noel, Polo Norte",
    },
  },
};

/** 将后补语言的 i18n 合并进目标数组(Post[] / Template[]) */
export function mergeI18n(
  items: Array<{ slug: string; i18n: Record<string, unknown> }>,
  extra: Record<string, Partial<Record<Locale, unknown>>>,
): void {
  for (const item of items) {
    Object.assign(item.i18n, extra[item.slug] ?? {});
  }
}
