/** 数字描红与通用练习纸的预填行。一行一个练习项。 */

export function numberLines(count: number): string {
  const n = Math.min(20, Math.max(1, Math.floor(count)));
  return Array.from({ length: n }, (_, i) => String(i + 1)).join("\n");
}

/** 通用练习纸的预填词表：星期是各语言都成立的练字素材，短词、高频、不依赖课程进度。 */
const WORKSHEET_STARTERS: Record<string, string> = {
  en: "Monday\nTuesday\nWednesday\nThursday\nFriday\nSaturday\nSunday",
  es: "lunes\nmartes\nmiércoles\njueves\nviernes\nsábado\ndomingo",
  fr: "lundi\nmardi\nmercredi\njeudi\nvendredi\nsamedi\ndimanche",
  de: "Montag\nDienstag\nMittwoch\nDonnerstag\nFreitag\nSamstag\nSonntag",
  pt: "segunda\nterça\nquarta\nquinta\nsexta\nsábado\ndomingo",
  zh: "星期一\n星期二\n星期三\n星期四\n星期五\n星期六\n星期日",
  ja: "月曜日\n火曜日\n水曜日\n木曜日\n金曜日\n土曜日\n日曜日",
  ko: "월요일\n화요일\n수요일\n목요일\n금요일\n토요일\n일요일",
};

export function worksheetStarterLines(locale: string): string {
  return WORKSHEET_STARTERS[locale] ?? WORKSHEET_STARTERS.en;
}
