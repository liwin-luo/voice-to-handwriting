export type TokenKind = "cjk" | "word" | "space" | "newline";
export interface Token {
  text: string;
  kind: TokenKind;
}

// CJK 统一表意 + 扩展A + 兼容表意 + CJK符号标点(。〈〉)+ 全角形式(,!:?)
const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\u3000-\u303f\uff00-\uffef]/;

/** 文本 → 渲染单元:中文逐字抖动,拉丁词整词抖动(避免单词内部散架) */
export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let word = "";
  const flush = () => {
    if (word) {
      tokens.push({ text: word, kind: "word" });
      word = "";
    }
  };
  for (const ch of text) {
    if (ch === "\n") {
      flush();
      tokens.push({ text: ch, kind: "newline" });
    } else if (/\s/.test(ch)) {
      flush();
      tokens.push({ text: " ", kind: "space" });
    } else if (CJK.test(ch)) {
      flush();
      tokens.push({ text: ch, kind: "cjk" });
    } else {
      word += ch;
    }
  }
  flush();
  return tokens;
}
