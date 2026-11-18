/**
 * Cookie 同意状态的共享读写(仅客户端)。
 * ConsentBanner 负责写入并广播,广告组件(AdNativeBanner 等)读取并监听;
 * 收敛到一处是为了避免各组件自行解析 localStorage、同意后互相无法通知。
 */
export const CONSENT_KEY = "vth-consent";

/** 用户点"接受"后广播的事件;在同意之前就挂载的组件监听它补注广告脚本 */
export const CONSENT_ACCEPTED_EVENT = "vth-consent-accepted";

export type ConsentChoice = "accepted" | "rejected";

/** 读取当前同意选择;未选择或值异常时返回 null */
export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(CONSENT_KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

/** 写入"接受"并广播事件,让页面上已挂载的广告组件立即注入脚本 */
export function storeConsentAccepted(): void {
  localStorage.setItem(CONSENT_KEY, "accepted");
  window.dispatchEvent(new Event(CONSENT_ACCEPTED_EVENT));
}
