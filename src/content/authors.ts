import type { Locale } from "@/i18n/routing";

/**
 * 博客作者角色(笔名+桌位署名,不是可验证的真实个人身份)。
 * 每个角色的写作风格、选题边界与禁区见 docs/personas/ 对应角色卡;
 * 新文章必须在 posts.ts 的 Post.author 里从这些 id 中选一个(TS 类型强制)。
 * 全语言共用同一套角色:笔名不翻译,role/bio 按语言给,缺省回退 en。
 */
export type AuthorId =
  | "clara-hartley" // 课堂桌:儿童书写教育(家长/老师)
  | "wes-morales" // 练习桌:成人自我提升
  | "mara-voss" // 科学桌:研究与科普
  | "june-park" // 信纸桌:贺卡/信件/仪式感
  | "theo-lindgren"; // 工具桌:产品教程与玩法(默认回退)

export interface AuthorI18n {
  /** 署名栏角色行,控制在 6 词以内 */
  role: string;
  /** 作者简介(作者页/悬浮提示用),一两句,第三人称 */
  bio: string;
}

export interface Author {
  id: AuthorId;
  /** 署名笔名:全语言一致,便于读者跨语言认出同一角色 */
  name: string;
  i18n: Partial<Record<Locale, AuthorI18n>>;
}

export const AUTHORS: Record<AuthorId, Author> = {
  "clara-hartley": {
    id: "clara-hartley",
    name: "Clara Hartley",
    i18n: {
      en: {
        role: "Classroom desk · K–3",
        bio: "Writes the classroom-tested guides for parents and teachers — name tracing, three-line paper, first cursive lessons. Everything starts from what actually works with young writers.",
      },
      zh: {
        role: "课堂视角",
        bio: "写给家长和老师的课堂实战指南——名字描红、三线纸、第一堂连笔课。所有建议都以“对刚学写字的孩子真的管用”为标准。",
      },
      ja: {
        role: "教室の視点",
        bio: "名前のなぞり書き、3 線ノート、初めての筆記体レッスンなど、保護者と先生向けの実践ガイドを担当。子どもの教室で本当に効くことを基準に書いています。",
      },
      ko: {
        role: "교실의 시선",
        bio: "이름 쓰기 연습, 세 줄 공책, 첫 필기체 수업처럼 부모와 교사를 위한 실전 가이드를 담당합니다. 글씨를 배우는 아이들 교실에서 실제로 통하는 것을 기준으로 씁니다.",
      },
      es: {
        role: "Perspectiva de aula",
        bio: "Escribe las guías prácticas para familias y docentes: caligrafía de nombres, papel de tres líneas, primeras lecciones de cursiva. Todo parte de lo que funciona con niños que aprenden a escribir.",
      },
      de: {
        role: "Klassenzimmer-Perspektive",
        bio: "Schreibt die praxiserprobten Ratgeber für Eltern und Lehrkräfte: Namensvorlagen, Drei-Linien-Papier, erste Schreibschrift-Lektionen. Maßstab ist, was bei Schreinanfängern wirklich funktioniert.",
      },
      fr: {
        role: "Perspective classe",
        bio: "Signe les guides pratiques pour parents et enseignants : prénoms à reproduire, papier trois lignes, premières leçons de cursive. Tout part de ce qui marche vraiment avec les jeunes scripteurs.",
      },
      pt: {
        role: "Perspectiva de sala de aula",
        bio: "Escreve os guias práticos para pais e professores: treino de nomes, papel de três linhas, primeiras lições de cursiva. Tudo começa no que funciona de verdade com quem está aprendendo a escrever.",
      },
    },
  },
  "wes-morales": {
    id: "wes-morales",
    name: "Wes Morales",
    i18n: {
      en: {
        role: "Adult practice coach",
        bio: "Retrained his own handwriting as an adult and now writes the step-by-step improvement plans: diagnosis first, drills second, honest expectations throughout.",
      },
      zh: {
        role: "成人练字教练",
        bio: "成年后亲手把自己的字练了回来，现在专门写分步提升计划：先诊断、再练习，全程给诚实的预期。",
      },
      ja: {
        role: "大人の字練習コーチ",
        bio: "大人になってから自分の字を書き直した経験から、ステップ式の練習プランを執筆。診断→ドリル→誠実な期待値が基本です。",
      },
      ko: {
        role: "어른 글씨 연습 코치",
        bio: "성인이 되어 자신의 글씨를 다시 고쳐 쓴 경험으로 단계별 연습 계획을 집필합니다. 진단 먼저, 훈련은 다음, 기대치는 솔직하게.",
      },
      es: {
        role: "Entrenador de letra adulta",
        bio: "Recuperó su propia letra de adulto y ahora escribe planes de mejora paso a paso: primero diagnóstico, después ejercicios, y expectativas honestas de principio a fin.",
      },
      de: {
        role: "Coach für Erwachsenenschrift",
        bio: "Hat als Erwachsener seine eigene Schrift neu gelernt und schreibt jetzt Schritt-für-Schritt-Pläne: erst Diagnose, dann Übungen — mit ehrlichen Erwartungen.",
      },
      fr: {
        role: "Coach d'écriture adulte",
        bio: "A réappris à écrire à l'âge adulte et écrit aujourd'hui des plans de progrès étape par étape : diagnostic d'abord, exercices ensuite, attentes honnêtes partout.",
      },
      pt: {
        role: "Treinador de caligrafia adulta",
        bio: "Corrigiu a própria letra já adulto e hoje escreve planos de melhoria passo a passo: primeiro diagnóstico, depois exercícios, com expectativas honestas.",
      },
    },
  },
  "mara-voss": {
    id: "mara-voss",
    name: "Mara Voss",
    i18n: {
      en: {
        role: "Science desk",
        bio: "Separates what handwriting research shows from what headlines claim — reads the studies, cites them, and says plainly where the evidence stops.",
      },
      zh: {
        role: "科学编辑",
        bio: "把手写研究“实际显示了什么”和“标题党说显示了什么”分开——读原始论文、给出出处，并直说证据到哪里为止。",
      },
      ja: {
        role: "サイエンスデスク",
        bio: "手書き研究で「分かっていること」と「見出しが言いたいこと」を切り分けるのが仕事。論文を読み、出典を示し、証拠が及ぶ範囲を正直に書きます。",
      },
      ko: {
        role: "과학 데스크",
        bio: "손글씨 연구가 실제로 말하는 것과 헤드라인이 주장하는 것을 구분해 씁니다. 원문을 읽고, 출처를 밝히고, 증거가 닿는 곳까지를 정직하게 적습니다.",
      },
      es: {
        role: "Redacción de ciencia",
        bio: "Separa lo que muestra la investigación sobre la escritura a mano de lo que dicen los titulares: lee los estudios, cita las fuentes y señala dónde se acaba la evidencia.",
      },
      de: {
        role: "Wissenschaftsredaktion",
        bio: "Trennt, was die Forschung zur Handschrift zeigt, von dem, was Schlagzeilen behaupten: liest Studien, nennt Quellen und sagt klar, wo die Evidenz endet.",
      },
      fr: {
        role: "Desk sciences",
        bio: "Distingue ce que montre la recherche sur l'écriture manuscrite de ce que les titres racontent : lit les études, cite les sources et dit où la preuve s'arrête.",
      },
      pt: {
        role: "Redação de ciência",
        bio: "Separa o que a pesquisa sobre escrita à mão mostra do que as manchetes dizem: lê os estudos, cita as fontes e aponta onde a evidência termina.",
      },
    },
  },
  "june-park": {
    id: "june-park",
    name: "June Park",
    i18n: {
      en: {
        role: "Occasions & letters desk",
        bio: "Believes a handwritten note is the last luxury that costs nothing — writes the thank-you, wedding and seasonal letter guides for moments that deserve ink.",
      },
      zh: {
        role: "贺卡与信件",
        bio: "相信手写字条是最后一种不花钱的奢侈。负责感谢卡、婚礼与节日信件的指南，写给那些值得落在纸上的时刻。",
      },
      ja: {
        role: "カード・レターデスク",
        bio: "手書きのメモは、お金をかけない最後の贅沢だと思っています。お礼状、ウェディング、季節の手紙ガイドを担当。",
      },
      ko: {
        role: "카드·편지 데스크",
        bio: "손편지는 돈 들지 않는 마지막 사치라고 믿습니다. 감사 카드, 결혼, 계절 편지 가이드를 담당합니다.",
      },
      es: {
        role: "Tarjetas y cartas",
        bio: "Cree que una nota escrita a mano es el último lujo que no cuesta dinero. Firma las guías de notas de agradecimiento, bodas y cartas de temporada.",
      },
      de: {
        role: "Karten & Briefe",
        bio: "Findet: Eine handgeschriebene Notiz ist der letzte Luxus, der nichts kostet. Schreibt die Ratgeber zu Dankeskarten, Hochzeit und Saisonbriefen.",
      },
      fr: {
        role: "Cartes & lettres",
        bio: "Estime qu'un mot écrit à la main est le dernier luxe gratuit. Signe les guides de remerciements, de mariage et de lettres saisonnières.",
      },
      pt: {
        role: "Cartões e cartas",
        bio: "Acredita que um bilhete escrito à mão é o último luxo que não custa nada. Assina os guias de agradecimentos, casamento e cartas de temporada.",
      },
    },
  },
  "theo-lindgren": {
    id: "theo-lindgren",
    name: "Theo Lindgren",
    i18n: {
      en: {
        role: "Maker's desk",
        bio: "Builds the tools and writes the tutorials: workflows, tuning tips and honest limitations, tested on desktop Chrome before anything is published.",
      },
      zh: {
        role: "产品作者",
        bio: "工具的开发者，也写教程：工作流、调参技巧和诚实的局限，发布前都在桌面版 Chrome 上实测过。",
      },
      ja: {
        role: "メーカーデスク",
        bio: "ツールの開発者で、チュートリアルも執筆。ワークフロー、調整のコツ、正直な限界まで、公開前に必ず実測します。",
      },
      ko: {
        role: "메이커 데스크",
        bio: "도구를 만드는 개발자이자 튜토리얼 작성자입니다. 워크플로, 조정 팁, 솔직한 한계까지 공개 전에 데스크톱 Chrome에서 직접 테스트합니다.",
      },
      es: {
        role: "Taller del producto",
        bio: "Desarrolla las herramientas y escribe los tutoriales: flujos de trabajo, ajustes y limitaciones honestas, todo probado en Chrome de escritorio antes de publicar.",
      },
      de: {
        role: "Entwickler & Anleitungen",
        bio: "Baut die Tools und schreibt die Anleitungen: Workflows, Tipps und ehrliche Grenzen — alles vor der Veröffentlichung im Desktop-Chrome getestet.",
      },
      fr: {
        role: "Atelier produit",
        bio: "Développe les outils et écrit les tutoriels : flux de travail, réglages et limites honnêtes, tout testé sur Chrome desktop avant publication.",
      },
      pt: {
        role: "Oficina do produto",
        bio: "Constrói as ferramentas e escreve os tutoriais: fluxos, ajustes e limitações honestas, tudo testado no Chrome desktop antes de publicar.",
      },
    },
  },
};

/** 取署名信息;author 缺失或 id 非法时回退到工具桌(站方声音),保证署名栏永远不为空 */
export function getAuthor(id: AuthorId | undefined, locale: Locale): { name: string; role: string; bio: string } {
  const author = (id && AUTHORS[id]) || AUTHORS["theo-lindgren"];
  const t = author.i18n[locale] ?? author.i18n.en;
  return { name: author.name, role: t?.role ?? "", bio: t?.bio ?? "" };
}
