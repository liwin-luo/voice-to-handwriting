/**
 * 站内广告位配置(2026-11 接入,Adsterra 风格联盟 zone)。
 * 联盟后台下发的代码是按 zone 不可拆分的整串,故硬编码于此(Clarity ID 同款先例);
 * 轮换或下线直接改本文件,对应值置空字符串即关闭该广告位。
 * 约束:除 Direct Link(纯导航链接,无脚本)外都是 Cookie 类脚本,
 * 必须经 ConsentBanner 同意(src/lib/consent.ts)后才注入,不得预加载。
 */

/** 原生横幅(NativeBanner zone):容器 div id 与 invoke 脚本共用同一 hash */
export const NATIVE_BANNER = {
  containerId: "container-7dbf1de9c120d35ae76ecadb01f728fc",
  scriptSrc: "https://bauval.org/21/7dbf1de9c120d35ae76ecadb01f728fc",
} as const;

/** Social Bar 悬浮条(全站脚本,无容器) */
export const SOCIAL_BAR_SCRIPT_SRC = "https://bauval.org/14/d122c6339ca2aa5dc8a3b672b07e939e";

/** Direct Link(Smartlink):页脚 Sponsored 位使用的纯导航链接,不注入脚本 */
export const DIRECT_LINK_URL = "https://araplhn.org/4/7df9b443dbd11a7696916ec7c875d9c2";

/** 是否存在需要同意门控的脚本类广告;与 NEXT_PUBLIC_ADSENSE_CLIENT 一起决定 ConsentBanner 是否显示 */
export const AD_SCRIPTS_CONFIGURED = Boolean(NATIVE_BANNER.scriptSrc || SOCIAL_BAR_SCRIPT_SRC);

/**
 * 向 head 注入一条联盟广告脚本(幂等:同 id 不重复注入)。
 * data-cfasync="false" 是联盟代码的原始属性,防止 Cloudflare Rocket Loader 改写执行时机。
 */
export function injectAdScript(id: string, src: string): void {
  if (!src || document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.dataset.cfasync = "false";
  s.src = src;
  document.head.appendChild(s);
}
