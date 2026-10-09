/** /letter-tracing 与 /letter-tracing/[letter]：印刷体单字母描红。
 *  Phase 0 仅英文。文案放这里而不是 messages/，避免为单语内容扩 8 语言 key。
 *  每页的落笔、走笔、和邻字母的差别必须不同，不能只换一个字母。 */

export interface PrintLetter {
  slug: string;
  /** 铅笔从哪落下 */
  start: string;
  /** 这一笔怎么走完 */
  motion: string;
  /** 和哪个字母容易写混，差在哪 */
  watch: string;
  /** 圈或竖在三线格里停在哪 */
  seat: string;
  words: [string, string, string, string];
}

export const PRINT_LETTERS: PrintLetter[] = [
  {
    slug: "a",
    start: "Start at one o'clock on the circle, not at the bottom and not on the stick.",
    motion: "Circle left and down until the circle closes, then pull a straight stick down the right side to the baseline.",
    watch: "If the stick leans away from the circle, a opens into a u. The stick has to touch the circle.",
    seat: "The circle fills the space from the baseline up to the dashed middle line. The stick does not rise above that line.",
    words: ["apple", "ant", "cat", "hand"],
  },
  {
    slug: "b",
    start: "Start at the top line, not at the circle.",
    motion: "Pull a straight stick down to the baseline, then bump back up and circle right to close the belly.",
    watch: "A b is a tall stick first. Starting with the circle makes a d, which faces the other way.",
    seat: "The stick touches the top line. The belly sits between the baseline and the dashed middle line.",
    words: ["ball", "bird", "baby", "club"],
  },
  {
    slug: "c",
    start: "Start at one o'clock, the same place as a, but do not close it.",
    motion: "Circle left and down and stop at about four o'clock, leaving the right side open.",
    watch: "Closing the circle turns c into an o. Stopping too early leaves a shape that reads as a backwards c.",
    seat: "The whole curve stays between the baseline and the dashed middle line. No tall stick.",
    words: ["cat", "cup", "ice", "circle"],
  },
  {
    slug: "d",
    start: "Start the circle at one o'clock, the same as a.",
    motion: "Close the circle, then pull a tall stick up the right side all the way to the top line.",
    watch: "The tall stick is on the right. Put it on the left and you have written b.",
    seat: "The circle stays under the dashed middle line. Only the stick reaches the top line.",
    words: ["dog", "door", "and", "hand"],
  },
  {
    slug: "e",
    start: "Start on the dashed middle line, not at the top of a circle.",
    motion: "Slide right a short way, then loop left, around, and close back into that middle line.",
    watch: "Starting at the top, like c, makes a closed c. The little slide along the middle line is what makes e.",
    seat: "Everything stays between the baseline and the dashed middle line.",
    words: ["egg", "red", "tree", "see"],
  },
  {
    slug: "f",
    start: "Start just under the top line, not on the baseline.",
    motion: "Curve over the top, pull a straight stick down through the baseline, hook left, then cross the stick on the dashed middle line.",
    watch: "A crossbar up near the top line makes f look like t. Cross on the middle line.",
    seat: "The stick starts near the top line and the hook drops below the baseline. The cross sits on the middle line.",
    words: ["fish", "fan", "leaf", "off"],
  },
  {
    slug: "g",
    start: "Start the circle at one o'clock, the same as a.",
    motion: "Close the circle, pull the stick down below the baseline, and hook left.",
    watch: "A hook to the right is q, not g. The g hook turns back under the circle.",
    seat: "The circle stays under the dashed middle line. Only the hook goes below the baseline.",
    words: ["goat", "egg", "big", "flag"],
  },
  {
    slug: "h",
    start: "Start at the top line.",
    motion: "Pull a straight stick to the baseline, then retrace halfway up and hump over to the right, landing on the baseline.",
    watch: "A hump that starts at the top line is a printed n stacked on a stick, not an h. The hump begins at the middle line.",
    seat: "The stick touches the top line. The hump stays between the middle line and the baseline.",
    words: ["hat", "hand", "the", "ship"],
  },
  {
    slug: "i",
    start: "Start on the dashed middle line.",
    motion: "Pull a short straight stick down to the baseline, then dot above the stick.",
    watch: "Forget the dot and i becomes an l that is too short, or a bare stick. The dot sits above the middle line, not on it.",
    seat: "The stick stops at the middle line. It does not reach the top line. That height belongs to l and t.",
    words: ["igloo", "sit", "milk", "in"],
  },
  {
    slug: "j",
    start: "Start on the dashed middle line, like i.",
    motion: "Pull the stick down past the baseline and hook left, then dot above the stick.",
    watch: "A hook to the right, or no hook, is not j. Without the dot it reads as a stray g tail.",
    seat: "The stick starts at the middle line, not the top line. The hook is the only part below the baseline.",
    words: ["jam", "jump", "jar", "enjoy"],
  },
  {
    slug: "k",
    start: "Start at the top line.",
    motion: "Pull a straight stick to the baseline. From the middle line, diagonal in to the stick, then diagonal out and down to the baseline.",
    watch: "If the two diagonals miss the stick, k falls apart into a stick plus an x. Both diagonals touch the stick.",
    seat: "The stick reaches the top line. The join of the two diagonals sits on the dashed middle line.",
    words: ["kite", "kick", "book", "ask"],
  },
  {
    slug: "l",
    start: "Start at the top line.",
    motion: "Pull one straight stick down to the baseline. No crossbar, no dot.",
    watch: "Add a crossbar and it is t. Stop at the middle line and it is i without a dot.",
    seat: "The stick runs from the top line to the baseline and does not go below the baseline.",
    words: ["lion", "leg", "ball", "all"],
  },
  {
    slug: "m",
    start: "Start on the dashed middle line.",
    motion: "Pull down to the baseline, retrace, hump over once, then hump over again. Two humps.",
    watch: "One hump is n. A third hump is no longer m. Count the humps before you lift the pencil.",
    seat: "Both humps stay between the middle line and the baseline. Nothing reaches the top line.",
    words: ["moon", "map", "mom", "swim"],
  },
  {
    slug: "n",
    start: "Start on the dashed middle line.",
    motion: "Pull down to the baseline, retrace to the middle line, and hump over once to the baseline.",
    watch: "A second hump makes m. Starting the hump at the top line makes h.",
    seat: "The single hump stays between the middle line and the baseline.",
    words: ["nest", "nut", "sun", "and"],
  },
  {
    slug: "o",
    start: "Start at one o'clock, the same place as c and a.",
    motion: "Circle left all the way around until the line meets itself. Do not add a stick.",
    watch: "Leaving the right side open makes c. Adding a stick on the right makes a or d.",
    seat: "The circle fills the space from the baseline to the dashed middle line and does not rise above it.",
    words: ["octopus", "on", "dog", "book"],
  },
  {
    slug: "p",
    start: "Start on the dashed middle line.",
    motion: "Pull a stick down below the baseline, retrace up to the middle line, and circle right to close the belly.",
    watch: "The belly is on the right. A belly on the left, or a hook instead of a closed belly, is not p. q has the circle first and a kick to the right.",
    seat: "The belly sits between the baseline and the middle line. The stick is the part that drops below the baseline.",
    words: ["pig", "pen", "map", "up"],
  },
  {
    slug: "q",
    start: "Start the circle at one o'clock, the same as a and g.",
    motion: "Close the circle, pull the stick down below the baseline, and kick right.",
    watch: "A hook to the left is g. The q tail leaves to the right, away from the circle.",
    seat: "The circle stays under the middle line. Only the kick goes below the baseline.",
    words: ["queen", "quiet", "quilt", "equal"],
  },
  {
    slug: "r",
    start: "Start on the dashed middle line.",
    motion: "Pull down to the baseline, retrace to the middle line, and make a short hook that does not touch the baseline again.",
    watch: "If the hook comes all the way down to the baseline, r becomes n. Keep the hook small.",
    seat: "The hook stays up at the middle line. The only part on the baseline is the first stick.",
    words: ["rain", "red", "car", "are"],
  },
  {
    slug: "s",
    start: "Start just under the dashed middle line, slightly to the right.",
    motion: "Curve left across the top, swing back right through the middle, and curve left again to sit on the baseline.",
    watch: "A curve that only bends once is c. s has to change direction in the middle.",
    seat: "The whole letter stays between the baseline and the dashed middle line.",
    words: ["sun", "sit", "bus", "yes"],
  },
  {
    slug: "t",
    start: "Start below the top line, taller than i and shorter than l.",
    motion: "Pull a straight stick to the baseline, then cross it on the dashed middle line.",
    watch: "A stick that touches the top line and has no cross is l. A cross up in the sky, above the stick, does not read as t.",
    seat: "The top of the stick stops between the top line and the middle line. The cross sits on the middle line.",
    words: ["top", "tree", "cat", "it"],
  },
  {
    slug: "u",
    start: "Start on the dashed middle line.",
    motion: "Pull down, curve along the baseline, come back up to the middle line, and pull a short stick straight down to the baseline.",
    watch: "Skip the last stick and u looks like an unfinished smile. That last downstroke is what separates u from a v laid on its side.",
    seat: "Nothing rises above the middle line, and nothing drops below the baseline.",
    words: ["umbrella", "up", "sun", "cup"],
  },
  {
    slug: "v",
    start: "Start on the dashed middle line.",
    motion: "Diagonal down to the baseline, then diagonal back up to the middle line. Lift the pencil. No extra stick.",
    watch: "Adding a stick at the end makes u. A second pair of diagonals makes w.",
    seat: "The point sits on the baseline. Both tops stop at the middle line.",
    words: ["van", "vet", "give", "over"],
  },
  {
    slug: "w",
    start: "Start on the dashed middle line.",
    motion: "Down to the baseline, up to the middle line, down to the baseline again, and up once more. Two points on the baseline.",
    watch: "One point is v. Rounding the bottoms instead of making points turns w into a bumpy u.",
    seat: "Both points touch the baseline. All four tops stop at the middle line.",
    words: ["web", "win", "swim", "two"],
  },
  {
    slug: "x",
    start: "Start on the dashed middle line, at the left.",
    motion: "Diagonal down to the right until you hit the baseline. Lift. From the right side of the middle line, diagonal down to the left.",
    watch: "If the two strokes miss each other, x is just two separate slashes. They cross near the center of the middle-to-baseline space.",
    seat: "Both strokes stay between the middle line and the baseline.",
    words: ["fox", "box", "six", "ax"],
  },
  {
    slug: "y",
    start: "Start on the dashed middle line, like v.",
    motion: "Diagonal down to the baseline and back up, then pull the right side down below the baseline and hook left.",
    watch: "Stop at the baseline and you have written v. The descender is the part that makes y.",
    seat: "The v-shape stays above the baseline. Only the right stroke continues below it.",
    words: ["yak", "yes", "my", "play"],
  },
  {
    slug: "z",
    start: "Start on the dashed middle line, at the left.",
    motion: "Straight across the middle line, diagonal down to the left side of the baseline, then straight across the baseline to the right.",
    watch: "A diagonal that does not connect both bars leaves a floating line. The diagonal has to touch the end of the top bar and the start of the bottom bar.",
    seat: "The top bar rides the middle line. The bottom bar rides the baseline. Nothing is tall, nothing descends.",
    words: ["zoo", "zip", "buzz", "quiz"],
  },
];

const BY_SLUG = new Map(PRINT_LETTERS.map((letter) => [letter.slug, letter]));

export function getPrintLetter(slug: string): PrintLetter | undefined {
  return BY_SLUG.get(slug);
}

export function printLetterNeighbors(slug: string): { prev?: PrintLetter; next?: PrintLetter } {
  const index = PRINT_LETTERS.findIndex((letter) => letter.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? PRINT_LETTERS[index - 1] : undefined,
    next: index < PRINT_LETTERS.length - 1 ? PRINT_LETTERS[index + 1] : undefined,
  };
}

/** `?words=` 优先；否则单个拉丁字母 `?letter=a` 预填小写。认不出就不动输入框。 */
export function tracingPrefill(search: string): string | null {
  const params = new URLSearchParams(search);
  const words = params.get("words")?.trim();
  if (words) return words;
  const letter = params.get("letter")?.trim() ?? "";
  if (/^[a-z]$/i.test(letter)) return letter.toLowerCase();
  return null;
}

/** 一行里重复几次。再密就挤；宽字母在 PDF 里缩小字号，不减少个数。 */
export const LETTERS_PER_ROW = 8;

export function repeatedLetterLine(letter: string, count = LETTERS_PER_ROW): string {
  return Array.from({ length: count }, () => letter).join(" ");
}

/** 每个字母的 x 起点。排不下（间距小于 minGap）时返回 null，调用方缩小字号再试。 */
export function letterSlotOffsets(
  count: number,
  glyphWidth: number,
  innerWidth: number,
  minGap = 8,
): number[] | null {
  if (count < 1 || glyphWidth <= 0 || innerWidth <= 0) return null;
  if (count === 1) return glyphWidth <= innerWidth ? [0] : null;
  const gap = (innerWidth - count * glyphWidth) / (count - 1);
  if (gap < minGap) return null;
  return Array.from({ length: count }, (_, i) => i * (glyphWidth + gap));
}

export const LETTER_TRACING_UI = {
  hubTitle: "Letter tracing worksheets",
  hubH1: "Letter tracing worksheets",
  hubIntro:
    "Pick a letter and print a tracing sheet for that letter alone. Each page shows where the pencil starts, how the letter sits on the lines, and the mix-up with the letter next to it, then a solid example row and dashed tracing rows. The PDF downloads on that page.",
  hubMetaTitle: "Free Letter Tracing Worksheets (A–Z, Printable PDF)",
  hubMetaDescription:
    "Free letter tracing worksheets for a to z. See where each letter starts, print a dashed tracing sheet, and change the size. No signup.",
  back: "All letters",
  stepsTitle: "How this letter is formed",
  mistakesTitle: "The mix-up to watch",
  wordsTitle: "Words that use it",
  faqTitle: "Common questions",
  prev: "Previous letter",
  next: "Next letter",
  fontNote:
    "Rows use Patrick Hand, an open-source print font. It is not Zaner-Bloser or D'Nealian. Dashed rows are outlines of the whole letter, not numbered stroke arrows.",
  exampleRow: "Solid example row",
  dottedRow: "Dashed tracing row",
  cardLabel: "letter",
  sizeLead: "Need a different row height, or a whole word?",
  nameTracingLink: "Name tracing",
  nameTracingRest: "is the same sheet with any word typed in.",
};

export function letterTracingTitle(letter: PrintLetter): string {
  return `Letter ${letter.slug} tracing worksheet`;
}

export function letterTracingMetaTitle(letter: PrintLetter): string {
  return `Letter ${letter.slug.toUpperCase()} Tracing Worksheet (Free PDF)`;
}

export function letterTracingMetaDescription(letter: PrintLetter): string {
  return `Free letter ${letter.slug} tracing worksheet. ${letter.start} Print a dashed practice sheet and change the row height. No signup.`;
}

export function letterFaqs(letter: PrintLetter): { q: string; a: string }[] {
  return [
    { q: `Where do I start a lowercase ${letter.slug}?`, a: letter.start },
    { q: `How is ${letter.slug} different from the letter it gets mixed up with?`, a: letter.watch },
    {
      q: `Which words use a lowercase ${letter.slug}?`,
      a: `Start with ${letter.words.join(", ")}. Each word uses ${letter.slug} in a different spot, so the letter is not only practiced at the start of the word.`,
    },
  ];
}
