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
