import json, pathlib

texts = {
 "en": {"title": "Word Work Worksheet Generator", "intro": "Paste your weekly spelling list and get two printable activities: write each word three times, and fill in the missing letter. Deterministic, no watermark, free PDF.",
   "wordsLabel": "Spelling words (one per line)", "wordsPlaceholder": "cat\ndog\nsun\nball", "font": "Font", "showTrace": "Traceable first copy", "downloadPdf": "Download PDF",
   "a1Title": "Write each word three times.", "a2Title": "Fill in the missing letter.",
   "emptyTitle": "No words yet", "emptyHint": "Paste your weekly spelling list — the worksheet builds itself.",
   "seoTitle": "Free word work worksheets from any spelling list",
   "seoText": "Teachers are drowning in AI-generated worksheets full of errors. This generator is deterministic: the same list always produces the same clean, printable pages — write-it-three-times plus a fill-in-the-missing-letter activity, in your choice of handwriting fonts, at exact letter size with no watermark."},
 "zh": {"title": "拼写练习工作表生成器", "intro": "粘贴每周拼写清单,自动生成两种可打印活动页:每个单词写三遍 + 补全缺失字母。确定性输出、无水印、免费 PDF。",
   "wordsLabel": "拼写单词(每行一个)", "wordsPlaceholder": "苹果\n香蕉\n太阳\n球", "font": "字体", "showTrace": "第一遍描红", "downloadPdf": "下载 PDF",
   "a1Title": "每个单词写三遍。", "a2Title": "填上缺失的字母。",
   "emptyTitle": "还没有单词", "emptyHint": "粘贴每周拼写清单,工作表自动生成。",
   "seoTitle": "任意拼写清单 → 免费 Word Work 练习页",
   "seoText": "老师们已经被错误百出的 AI 工作表淹没了。这个生成器是确定性的:同样的清单永远生成同样干净的页面——写三遍 + 缺字母填空,可选手写字体,精确 Letter 尺寸、无水印。"},
 "ja": {"title": "単語ワークシート生成器", "intro": "今週の単語リストを貼り付けると、2 種類のプリントを自動生成:各単語を 3 回書く+欠けている文字を補う。確定的出力、透かしなし、無料 PDF。",
   "wordsLabel": "単語(1 行に 1 つ)", "wordsPlaceholder": "猫\n犬\n太陽\nボール", "font": "フォント", "showTrace": "1 つ目はなぞり書き", "downloadPdf": "PDF をダウンロード",
   "a1Title": "各単語を 3 回ずつ書きましょう。", "a2Title": "抜けている文字を入れよう。",
   "emptyTitle": "単語がまだありません", "emptyHint": "今週の単語リストを貼り付けると、プリントが自動で組み上がります。",
   "seoTitle": "任意の単語リストから無料のワークシートを",
   "seoText": "教師は誤りだらけの AI ワークシートに困っています。このジェネレーターは決定論的:同じリストから常に同じきれいなページが生成されます。"},
 "ko": {"title": "단어 워크시트 생성기", "intro": "이번 주 단어장을 붙여넣으면 두 가지 활동지가 자동 생성: 단어당 세 번 쓰기 + 빠진 글자 채우기. 결정론적 출력, 워터마크 없음, 무료 PDF.",
   "wordsLabel": "단어 (한 줄에 하나)", "wordsPlaceholder": "고양이\n강아지\n해\n공", "font": "글꼴", "showTrace": "첫 번째 따라 쓰기", "downloadPdf": "PDF 다운로드",
   "a1Title": "각 단어를 세 번씩 쓰세요.", "a2Title": "빠진 글자를 채워 넣으세요.",
   "emptyTitle": "아직 단어가 없어요", "emptyHint": "이번 주 단어장을 붙여넣으면 워크시트가 저절로 만들어져요.",
   "seoTitle": "아무 단어장이나 무료 워크시트로",
   "seoText": "교사들은 오류 투성이 AI 워크시트에 시달리고 있어요. 이 생성기는 결정론적입니다: 같은 목록은 항상 같은 깨끗한 페이지를 만들어냅니다."},
 "es": {"title": "Generador de fichas de ortografía", "intro": "Pega tu lista semanal de palabras y obtén dos fichas imprimibles: escribe cada palabra tres veces y completa la letra que falta. Determinístico, sin marca de agua, PDF gratis.",
   "wordsLabel": "Palabras (una por línea)", "wordsPlaceholder": "gato\nperro\nsol\npelota", "font": "Fuente", "showTrace": "Primera copia para repasar", "downloadPdf": "Descargar PDF",
   "a1Title": "Escribe cada palabra tres veces.", "a2Title": "Completa la letra que falta.",
   "emptyTitle": "Aún no hay palabras", "emptyHint": "Pega tu lista semanal — la ficha se crea sola.",
   "seoTitle": "Fichas de ortografía gratis desde cualquier lista",
   "seoText": "Los maestros están hartos de fichas de IA llenas de errores. Este generador es determinístico: la misma lista produce siempre las mismas páginas limpias e imprimibles."},
 "de": {"title": "Wortarbeit-Arbeitsblatt-Generator", "intro": "Wortliste der Woche einfügen und zwei druckbare Übungen erhalten: jedes Wort dreimal schreiben und den fehlenden Buchstaben ergänzen. Deterministisch, ohne Wasserzeichen, kostenloser PDF.",
   "wordsLabel": "Wörter (eines pro Zeile)", "wordsPlaceholder": "Katze\nHund\nSonne\nBall", "font": "Schrift", "showTrace": "Erste Kopie zum Nachspuren", "downloadPdf": "PDF herunterladen",
   "a1Title": "Schreibe jedes Wort drei Mal.", "a2Title": "Ergänze den fehlenden Buchstaben.",
   "emptyTitle": "Noch keine Wörter", "emptyHint": "Wortliste der Woche einfügen — das Arbeitsblatt entsteht von selbst.",
   "seoTitle": "Kostenlose Wortarbeit-Arbeitsblätter aus jeder Wortliste",
   "seoText": "Lehrkräfte ertrinken in KI-Arbeitsblättern voller Fehler. Dieser Generator ist deterministisch: dieselbe Liste erzeugt immer dieselben sauberen, druckbaren Seiten — in deiner Wahl der Schreibschrift, in exaktem Letter-Format ohne Wasserzeichen."},
 "fr": {"title": "Générateur de fiches de mots", "intro": "Colle ta liste de mots de la semaine et obtiens deux fiches imprimables : écris chaque mot trois fois et complète la lettre manquante. Déterministe, sans filigrane, PDF gratuit.",
   "wordsLabel": "Mots (un par ligne)", "wordsPlaceholder": "chat\nchien\nsoleil\nballon", "font": "Police", "showTrace": "Première copie à repasser", "downloadPdf": "Télécharger le PDF",
   "a1Title": "Écris chaque mot trois fois.", "a2Title": "Complète la lettre manquante.",
   "emptyTitle": "Pas encore de mots", "emptyHint": "Colle ta liste de la semaine — la fiche se crée toute seule.",
   "seoTitle": "Fiches de mots gratuites à partir de ta liste",
   "seoText": "Les enseignants croulent sous les fiches IA pleines d'erreurs. Ce générateur est déterministe : la même liste produit toujours les mêmes pages propres et imprimables — dans la police manuscrite de ton choix, au format Letter exact, sans filigrane."},
 "pt": {"title": "Gerador de fichas de palavras", "intro": "Cole a lista semanal de palavras e receba duas fichas imprimíveis: escreva cada palavra três vezes e complete a letra que falta. Determinístico, sem marca d'água, PDF grátis.",
   "wordsLabel": "Palavras (uma por linha)", "wordsPlaceholder": "gato\nCão\nsol\nbola", "font": "Fonte", "showTrace": "Primeira cópia para repassar", "downloadPdf": "Baixar PDF",
   "a1Title": "Escreva cada palavra três vezes.", "a2Title": "Complete a letra que falta.",
   "emptyTitle": "Ainda sem palavras", "emptyHint": "Cole a lista da semana — a ficha se monta sozinha.",
   "seoTitle": "Fichas de palavras grátis a partir de qualquer lista",
   "seoText": "Professores estão afogados em fichas de IA cheias de erros. Este gerador é determinístico: a mesma lista sempre produz as mesmas páginas limpas e imprimíveis."},
}
metas = {
 "en": {"title": "Free Word Work Worksheet Generator (Spelling List → PDF)", "description": "Turn any spelling list into printable word work: write-each-word-three-times plus missing-letter activities. Free PDF, no watermark, deterministic output."},
 "zh": {"title": "免费拼写练习工作表生成器(清单 → PDF)", "description": "把任意拼写清单变成可打印的 Word Work:每个单词写三遍 + 缺字母填空。免费 PDF、无水印、确定性输出。"},
 "ja": {"title": "無料単語ワークシート生成器(リスト→PDF)", "description": "任意の単語リストを印刷可能なワークシートに:3 回書き+文字補充アクティビティ。無料 PDF、透かしなし。"},
 "ko": {"title": "무료 단어 워크시트 생성기(목록→PDF)", "description": "아무 단어장이나 인쇄 가능한 워크시트로: 세 번 쓰기 + 빠진 글자 활동. 무료 PDF, 워터마크 없음."},
 "es": {"title": "Generador gratis de fichas de ortografía (lista → PDF)", "description": "Convierte cualquier lista de palabras en fichas imprimibles: escribir tres veces + completar letras. PDF gratis, sin marca de agua."},
 "de": {"title": "Kostenloser Wortarbeit-Arbeitsblatt-Generator (Liste → PDF)", "description": "Verwandle jede Wortliste in druckbare Wortarbeit: dreimal schreiben + fehlende Buchstaben ergänzen. Kostenloser PDF, ohne Wasserzeichen."},
 "fr": {"title": "Générateur gratuit de fiches de mots (liste → PDF)", "description": "Transforme n'importe quelle liste de mots en fiches imprimables : écrire trois fois + lettres manquantes. PDF gratuit, sans filigrane."},
 "pt": {"title": "Gerador grátis de fichas de palavras (lista → PDF)", "description": "Transforme qualquer lista de palavras em fichas imprimíveis: escrever três vezes + completar letras. PDF grátis, sem marca d'água."},
}
navs = {
 "en": "Word Work", "zh": "拼写练习", "ja": "単語ワークシート", "ko": "단어 워크시트",
 "es": "Fichas de ortografía", "de": "Wortarbeit", "fr": "Fiches de mots", "pt": "Fichas de palavras",
}

for lang in texts:
    p = pathlib.Path(f"messages/{lang}.json")
    d = json.loads(p.read_text())
    d["wordwork"] = texts[lang]
    d["meta"]["wordwork"] = metas[lang]
    d["nav"]["wordwork"] = navs[lang]
    p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n")
    print("applied", lang)

# 校验
ok = True
need = ["title","intro","wordsLabel","wordsPlaceholder","font","showTrace","downloadPdf","a1Title","a2Title","emptyTitle","emptyHint","seoTitle","seoText"]
for lang in texts:
    d = json.loads(pathlib.Path(f"messages/{lang}.json").read_text())
    miss = [k for k in need if not d["wordwork"].get(k)]
    if miss:
        ok = False
        print(lang, "MISSING", miss)
print("✓ all complete" if ok else "✗ incomplete")
pathlib.Path("ww_apply.py").unlink()
