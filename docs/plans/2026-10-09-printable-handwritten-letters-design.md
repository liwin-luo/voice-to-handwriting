# 可打印手写信

- 日期:2026-10-09
- 状态:已按此实现

用户自己打印再寄。不做真人书写、邮局投递、CRM 或 API。

一个工具页 `/printable-handwritten-letters`。五类短笺:会后感谢、请转介绍、开发新客、重新联系、通知。正文里的 `{name}` 换成收件人名字,回信地址的第一行作为 `{from}`。

名单粘贴为 CSV,表头 `name, street, city, region, postal`,可选 `message` 列整封替换模板。一次最多 30 人。预览当前一位:信纸加信封。下载两个 PDF,信件和信封分开,方便分别打印。

英文用 US Letter 和 #10 信封,其余语言用 A4 和 DL 信封。字是现有手写字体加轻微抖动。解析、套名和分页是纯函数,测试在 `src/engine/bulkLetters.test.ts`。分页按字宽单位约一页,超长段落硬切。
