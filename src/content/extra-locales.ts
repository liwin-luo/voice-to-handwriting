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
