/** 全站配置:可用环境变量覆盖,默认值即生产域名 */
export const SITE = {
  name: "声音转手写",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://voicetohandwriting.online",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@voicetohandwriting.online",
  description:
    "对着网页说一段话,实时转成文字并渲染成逼真手写体,一键导出 PNG / PDF。免费在线手写体生成工具。",
};
