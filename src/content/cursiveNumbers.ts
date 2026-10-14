import type { Locale } from "@/i18n/routing";
import type { LetterCopy, LetterFaq, LetterMeta } from "./cursiveLetters";

/** /cursive/number/[number] 长尾矩阵:连笔数字课页(0–9,en-only,理由同 cursiveLetters.ts)。
 *  内容结构复用字母课的 LetterCopy/LetterMeta。质量红线同字母矩阵:
 *  每页必须有真实增量(字形要点/易错/FAQ),不得模板化灌水。
 *  诚实口径:字形数据只有字母,数字没有入笔点——练习条无绿点,笔顺按常规教法
 *  描述并在 fontNote 写明不是课程规定顺序;字形描述以 Cedarville Cursive 实核。 */

export interface CursiveNumberPage {
  /** URL 段:"0".."9" */
  slug: string;
  /** 展示字形(单字符) */
  digit: string;
  /** 英文读法,如 "zero" */
  name: string;
  meta: Partial<Record<Locale, LetterMeta>>;
  copy: Partial<Record<Locale, LetterCopy>>;
}

export interface NumberUi {
  backToCursive: string;
  stepsTitle: string;
  mistakesTitle: string;
  wordsTitle: string;
  ctaTitle: string;
  ctaButton: string;
  ctaHint: string;
  faqTitle: string;
  fontNote: string;
  prevNumber: string;
  nextNumber: string;
  hubNumbers: string;
  hubCta: string;
  numbersNav: string;
  sheetButton: string;
}

const NUMBER_UI: Partial<Record<Locale, NumberUi>> = {
  en: {
    backToCursive: "Cursive generator & all letters",
    stepsTitle: "Write it step by step",
    mistakesTitle: "Common mistakes to avoid",
    wordsTitle: "Practice numbers",
    ctaTitle: "Turn this number into a practice sheet",
    ctaButton: "Make a practice sheet",
    ctaHint:
      "Opens a cursive tracing sheet with this lesson's numbers filled in. Download the PDF and print it. Digits don't get the green start dots — those exist for letters only.",
    faqTitle: "Frequently asked questions",
    fontNote:
      "The numerals on this page are rendered in Cedarville Cursive, an open-source font — school styles and other handwriting fonts differ in details. The steps describe the usual way to draw each digit, not a mandated stroke order; without start-dot data for numerals, let the sample show you the target shape.",
    prevNumber: "Previous number guide",
    nextNumber: "Next number guide",
    hubNumbers: "Numbers",
    hubCta: "Read the full numbers-in-cursive guide",
    numbersNav: "All cursive number lessons",
    sheetButton: "Number sheet PDF",
  },
};

export function getNumberUi(locale: Locale): NumberUi | undefined {
  return NUMBER_UI[locale];
}

export function numberQueryTitle(page: { digit: string }): string {
  return `${page.digit} in Cursive: How to Write It`;
}

export function getNumberPage(
  slug: string,
  locale: Locale,
): { page: CursiveNumberPage; copy: LetterCopy; meta: LetterMeta } | undefined {
  const page = CURSIVE_NUMBERS.find((n) => n.slug === slug);
  const copy = page?.copy[locale];
  if (!page || !copy) return undefined;
  return { page, copy, meta: page.meta[locale] ?? page.meta.en! };
}

export function numbersForLocale(locale: Locale): CursiveNumberPage[] {
  return CURSIVE_NUMBERS.filter((n) => Boolean(n.copy[locale]));
}

/** 描红预填:这一课的数字词,一行一个 */
export function numberPracticeWords(copy: LetterCopy): string {
  return copy.words.join("\n");
}

const faq = (q: string, a: string): LetterFaq => ({ q, a });

const NUMBERS: CursiveNumberPage[] = [
  {
    slug: "0",
    digit: "0",
    name: "zero",
    meta: {
      en: {
        title: "0 in Cursive: How to Write It + Practice Sheet",
        description:
          "The cursive 0 is one slanted oval that never joins its neighbours. Where to start, why an upright circle reads as print, and a free practice sheet for 0, 10, 20 and 100.",
      },
    },
    copy: {
      en: {
        h1: "How to write the number 0 in cursive",
        intro:
          "Zero is the gentlest introduction to cursive numbers: one oval, one motion, no joins. It leans the way the rest of your writing leans, and in this font it is a little taller than a round print zero. Like every numeral, it never connects to the digit beside it.",
        steps: [
          "Start at the top of the digit, just under the headline.",
          "Sweep counterclockwise — left, down, around — and close the oval back where you started.",
          "Keep it a tall oval rather than a circle. The slant is what makes it cursive.",
        ],
        mistakes: [
          "Drawing an upright, perfectly round circle. It reads as print and breaks the slant of the whole number.",
          "Leaving a gap where the oval closes. The stroke should meet itself cleanly at the top.",
          "Forgetting that 0 is full height. A shrunken zero between 1 and 0 is how 10 starts looking like 16.",
        ],
        words: ["0", "10", "20", "100", "1000"],
        faqs: [
          faq(
            "Does a cursive 0 connect to the next digit?",
            "No. Numerals stand alone even inside a multi-digit number — 10 is a one and a zero with a small gap, not a joined pair. Only letters join in cursive.",
          ),
          faq(
            "Is a cursive 0 the same shape as the letter o?",
            "Close. Both are ovals drawn counterclockwise; the zero just sits at full digit height. If your o and your 0 match slant and size, the number line stays easy to read.",
          ),
        ],
      },
    },
  },
  {
    slug: "1",
    digit: "1",
    name: "one",
    meta: {
      en: {
        title: "1 in Cursive: How to Write It + Practice Sheet",
        description:
          "The cursive 1 is a slanted downstroke with a small entry tick — no base bar in this style. Why simple is hard, the print habits to drop, and a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write the number 1 in cursive",
        intro:
          "One is the plainest numeral in cursive and, for exactly that reason, an easy one to get wrong. There is no base serif in this style: a small entry tick at the top, one slanted downstroke, stop. With so little on the page, slant and height do all the work.",
        steps: [
          "Start just under the headline with a small entry tick to the right.",
          "Pull one slanted downstroke to the baseline.",
          "Stop. No foot, no base bar, no tail.",
        ],
        mistakes: [
          "Adding the base bar from print handwriting. In this cursive style a 1 with a foot reads as a capital I with a serif.",
          "Making the stroke perfectly vertical. Let it lean with the rest of the number.",
          "Curving or hooking the end of the stroke. The 1 ends where the baseline says so.",
        ],
        words: ["1", "11", "17", "21", "100"],
        faqs: [
          faq(
            "Why does the cursive 1 look like a plain line?",
            "Because it is one. Cursive simplifies numerals the way it simplifies capitals — the flag some print styles add is dropped, and the slant carries the style. In this font there is no base serif either.",
          ),
          faq(
            "Will a cursive 1 be confused with a capital I?",
            "Rarely on a practice sheet, because context carries it. If it matters — forms, grades — the base bar from print is the standard fix. Just don't mix both styles in the same number.",
          ),
        ],
      },
    },
  },
  {
    slug: "2",
    digit: "2",
    name: "two",
    meta: {
      en: {
        title: "2 in Cursive: How to Write It + Practice Sheet",
        description:
          "The cursive 2 keeps the print curve on top and gains a small wave on the baseline. How the base should move, why slant is the real difference, and a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write the number 2 in cursive",
        intro:
          "Two keeps the print skeleton everyone knows — curve over the top, slant down to the baseline — and its cursive life happens on the base, which eases off in a small wave instead of a rigid line. In Cedarville Cursive the base loop is modest; in fancier fonts it grows into a full loop.",
        steps: [
          "Start at the top left, just under the headline.",
          "Curve up and over to the right, the way the print 2 starts.",
          "Slant down to the baseline.",
          "Run the base to the right with one gentle wave, and let it ease off flat.",
        ],
        mistakes: [
          "Closing the base into a full loop that circles back on itself. A wave, not a knot.",
          "Dropping the slant. An upright 2 is the single biggest tell that the digits are still print.",
          "Straightening the base into a hard bar. The wave is where the cursive flavor lives.",
        ],
        words: ["2", "12", "20", "23", "2026"],
        faqs: [
          faq(
            "Does the loop at the bottom of a cursive 2 close?",
            "Not in this font. The base is an open wave. Some loop-heavy styles close it into a small loop — both are legible, but pick one style and keep the whole number in it.",
          ),
          faq(
            "Why does my cursive 2 look almost like my print 2?",
            "Because the shapes really are close. The slant and the moving base are the difference, and they matter most in a line of digits: 2, 12, 22 should all lean the same way.",
          ),
        ],
      },
    },
  },
  {
    slug: "3",
    digit: "3",
    name: "three",
    meta: {
      en: {
        title: "3 in Cursive: How to Write It + Practice Sheet",
        description:
          "The cursive 3 is two stacked bowls, top one smaller. Where the two curves should meet, why the middle joint matters, and a free practice sheet for 3, 13, 30 and 33.",
      },
    },
    copy: {
      en: {
        h1: "How to write the number 3 in cursive",
        intro:
          "Three is two bowls stacked — a smaller one on top, a fuller one below — and in cursive it simply leans. It is one of the numerals that changes least from print, which makes it a good early win when a class starts slanting numbers.",
        steps: [
          "Start at the top left, just under the headline.",
          "Draw the upper bowl: curve right, then back in toward the middle.",
          "Without lifting, draw the lower bowl — fuller than the top one — and close it back toward the start.",
          "Keep both openings facing left, the way print 3 does.",
        ],
        mistakes: [
          "Making both bowls the same size. The top bowl is the smaller of the two.",
          "Letting the middle joint drift right. The two curves should meet near the center of the digit.",
          "Flattening the bowls into angles. Three is curves all the way down.",
        ],
        words: ["3", "13", "30", "33", "300"],
        faqs: [
          faq(
            "Is a cursive 3 written in one stroke?",
            "Usually, yes — top bowl and bottom bowl in one motion, without lifting. Some writers touch down briefly at the middle; that is a style choice, not an error, as long as the joint lands in the same place.",
          ),
          faq(
            "Why does my 3 look childish in cursive?",
            "Almost always the middle joint. When the two bowls meet cleanly at the center and the whole digit leans with the line, a 3 that felt scribbly suddenly reads as cursive.",
          ),
        ],
      },
    },
  },
  {
    slug: "4",
    digit: "4",
    name: "four",
    meta: {
      en: {
        title: "4 in Cursive: How to Write It + Practice Sheet",
        description:
          "The cursive 4 stays open at the top and leans like the rest of the line. How the two strokes meet, why closed-top 4s cause trouble, and a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write the number 4 in cursive",
        intro:
          "Four barely changes in cursive: an open top, a slanted frame, a crossbar — the same skeleton as print, drawn with a lean. What varies between styles is small but visible, so this is a digit where copying one sample consistently matters more than usual.",
        steps: [
          "Start at the top and draw a slanted downstroke, then curve right along the baseline — like a print 4's first stroke.",
          "Lift, and make the crossing stroke: a slanted line from the top right down past the first stroke.",
          "Cross both with the horizontal bar, sitting just above the baseline.",
        ],
        mistakes: [
          "Closing the top into a triangle. In this style the 4 stays open, like print.",
          "Letting the crossbar drift below the baseline. It crosses near the bottom, it doesn't land on the line.",
          "Two 4s in one number leaning different ways — 44 should look like twins.",
        ],
        words: ["4", "14", "40", "44", "400"],
        faqs: [
          faq(
            "Is the cursive 4 written with one stroke or two?",
            "Two, in the usual school order: the frame first, then the crossbar. Some adults write it in one continuous motion. Either is fine on a practice sheet — the finished shape is what carries the meaning.",
          ),
          faq(
            "Why does my cursive 4 look exactly like my print 4?",
            "Because the shapes are nearly identical, and that is fine. The slant is the only real difference, which is why 4 is one of the easier digits to move into a cursive number line.",
          ),
        ],
      },
    },
  },
  {
    slug: "5",
    digit: "5",
    name: "five",
    meta: {
      en: {
        title: "5 in Cursive: How to Write It + Practice Sheet",
        description:
          "The cursive 5 keeps the flag and the open bowl — the bowl never closes. Stroke order, the closed-bowl mistake, and a free practice sheet for 5, 15, 50 and 55.",
      },
    },
    copy: {
      en: {
        h1: "How to write the number 5 in cursive",
        intro:
          "Five is the digit people expect to turn loopiest in cursive, and in this style it doesn't: flag on top, a bowl that stays open, a lean to the right. The cursive signal is the slant and the relaxed bowl mouth, not an added loop.",
        steps: [
          "Start at the top left with a short flag running to the right.",
          "From the flag's end, pull a slanted downstroke, then curve right and up into an open bowl.",
          "Lift, and lay the flag: a short horizontal bar across the top, from the left edge to where the bowl began.",
        ],
        mistakes: [
          "Closing the bowl into a loop. In this font the 5's mouth stays open — a closed 5 starts reading like a 6.",
          "Starting the downstroke from the flag's left end instead of its right, which shaves the digit's width.",
          "Drawing the flag first and the bowl second with no lift between — the two strokes cross where they shouldn't.",
        ],
        words: ["5", "15", "50", "55", "500"],
        faqs: [
          faq(
            "Does a cursive 5 join to the next digit?",
            "No — numerals never join in cursive. In 55 the two fives sit side by side with a small gap, each with its own open bowl.",
          ),
          faq(
            "Why does my cursive 5 keep turning into a 6?",
            "The bowl closed. Keep the mouth of the 5 open and the top flag flat and horizontal; a 6 has a rounded head that leans back, not a bar.",
          ),
        ],
      },
    },
  },
  {
    slug: "6",
    digit: "6",
    name: "six",
    meta: {
      en: {
        title: "6 in Cursive: How to Write It + Practice Sheet",
        description:
          "The cursive 6 curves down and closes into a loop at the baseline. Where the loop should sit, why the stem slant matters, and a free practice sheet for 6, 16 and 60.",
      },
    },
    copy: {
      en: {
        h1: "How to write the number 6 in cursive",
        intro:
          "Six is one motion: a tall curve that leans right on the way down and closes into a loop at the bottom. It is the mirror twin of 9, which is exactly why the two get practiced together once the slant arrives.",
        steps: [
          "Start at the top of the digit, just under the headline.",
          "Sweep down and slightly right in one curve — this is the stem, and it leans the way the number line leans.",
          "At the baseline, curl counterclockwise into a closed loop and finish where the curve began its turn.",
        ],
        mistakes: [
          "A straight vertical stem. The 6's height is a curve, not a ruler line.",
          "A loop that stays open at the bottom. The loop closes; that is what separates a 6 from a slanted 2.",
          "Starting the stem from the far right, which tips the whole digit backwards.",
        ],
        words: ["6", "16", "60", "66", "600"],
        faqs: [
          faq(
            "Does a cursive 6 have a loop at the bottom?",
            "Yes — that is the digit's signature. The loop sits on the baseline and closes. In print many people write 6 with a plain hook; cursive rounds it into a full loop.",
          ),
          faq(
            "How is a cursive 6 different from a cursive 9?",
            "They share one shape flipped: the 6 loops at the bottom with its tail rising, the 9 loops at the top with its tail descending. Same motion, opposite ends — practise them as a pair.",
          ),
        ],
      },
    },
  },
  {
    slug: "7",
    digit: "7",
    name: "seven",
    meta: {
      en: {
        title: "7 in Cursive: How to Write It + Practice Sheet",
        description:
          "The cursive 7 is a top arm and a slanted downstroke — no crossbar in this font. Why styles disagree about the bar, and a free practice sheet for 7, 17 and 70.",
      },
    },
    copy: {
      en: {
        h1: "How to write the number 7 in cursive",
        intro:
          "Seven is two straight ideas: a short arm across the top and a slanted downstroke. In Cedarville Cursive there is no crossbar. Some handwriting styles and many European habits add one — that is a style difference, not a right-or-wrong one.",
        steps: [
          "Start at the top left and draw a short arm to the right, along the headline.",
          "From the arm's right end, pull one slanted downstroke to the baseline.",
          "Stop — no foot, no curl, and in this font no crossbar.",
        ],
        mistakes: [
          "Adding a crossbar out of print habit and then switching styles mid-number. 77 with one crossed and one bare 7 looks like a mistake even though both are readable.",
          "Curving the downstroke. Seven is the straightest digit in the set; the slant does the styling.",
          "Making the top arm sag. It runs flat along the headline before the drop.",
        ],
        words: ["7", "17", "70", "77", "700"],
        faqs: [
          faq(
            "Should a cursive 7 have a crossbar through it?",
            "In this font, no. In some handwriting styles and in much of Europe, yes. Neither is wrong — but a page of numbers should commit to one style, especially on worksheets and tests.",
          ),
          faq(
            "Why does my 7 look like my 1?",
            "Both are slanted downstrokes; the arm across the top is the whole difference. If they blur together, lengthen the arm and keep the 1's entry tick small.",
          ),
        ],
      },
    },
  },
  {
    slug: "8",
    digit: "8",
    name: "eight",
    meta: {
      en: {
        title: "8 in Cursive: How to Write It + Practice Sheet",
        description:
          "The cursive 8 is the only digit drawn as two stacked loops, usually in one motion. Where the loops cross, why the top loop stays small, and a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write the number 8 in cursive",
        intro:
          "Eight is the show-off of the digit set: two loops stacked and crossed at the waist, usually in one motion, and it is the only numeral that really earns the word cursive. The classic proportion to aim for is a smaller loop on top and a fuller one below.",
        steps: [
          "Start at the middle of the digit height, a little right of center.",
          "Sweep counterclockwise into the top loop first, keeping it the smaller of the two.",
          "Cross your own path at the waist and swing clockwise into the lower loop, fuller than the top.",
          "Close the lower loop back near the starting point.",
        ],
        mistakes: [
          "Two circles that touch instead of two loops that cross. The waist crossing is what makes the figure read as 8.",
          "Equal loops. Top smaller, bottom fuller — the other way round reads top-heavy.",
          "Drawing it as two separate strokes with a lift at the waist while learning. Fine at first; fold it into one motion as the shape settles.",
        ],
        words: ["8", "18", "80", "88", "800"],
        faqs: [
          faq(
            "Is a cursive 8 written in one stroke?",
            "Traditionally yes — one continuous motion crossing itself at the waist. Two strokes is a common beginner's scaffold; move to one motion once the loops hold their shapes.",
          ),
          faq(
            "Why do my 8s come out lopsided?",
            "Almost always the top loop. Keep it deliberately small — about a third of the digit's height — and the bottom loop has room to round out below the waist.",
          ),
        ],
      },
    },
  },
  {
    slug: "9",
    digit: "9",
    name: "nine",
    meta: {
      en: {
        title: "9 in Cursive: How to Write It + Practice Sheet",
        description:
          "The cursive 9 is a loop on top and a tail that drops to the baseline — the 6 flipped. How the loop should close, the tail habits to avoid, and a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write the number 9 in cursive",
        intro:
          "Nine is the six turned upside down: a closed loop at the top, a tail that drops to the baseline. Drawn well it is one of the most elegant digits in a cursive number line; drawn carelessly it turns into an unreadable 4, so the loop and the tail each have one job.",
        steps: [
          "Start at the top of the digit, just under the headline.",
          "Sweep counterclockwise into a closed loop that fills the upper half.",
          "Without lifting, drop the tail straight down — a slanted line, not a curve — to the baseline.",
        ],
        mistakes: [
          "An open loop at the top. If the loop doesn't close, the 9 starts reading as a 4.",
          "A curly, hooked tail. The tail is the digit's straightest part; the slant does the styling.",
          "A loop that dwarfs the tail. Aim for the loop to fill roughly the upper half of the digit's height.",
        ],
        words: ["9", "19", "90", "99", "900"],
        faqs: [
          faq(
            "Why does my cursive 9 look like a 4?",
            "The loop didn't close, so only the diagonal tail registers. Close the loop fully at the top before the tail drops, and the two digits separate immediately.",
          ),
          faq(
            "Does the tail of a cursive 9 connect to the next digit?",
            "No. Like every numeral, the 9 stands alone — in 99 the two tails run parallel with a small gap, never joined.",
          ),
        ],
      },
    },
  },
];

export const CURSIVE_NUMBERS: CursiveNumberPage[] = NUMBERS.sort(
  (a, b) => Number(a.slug) - Number(b.slug),
);
