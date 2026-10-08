import type { Locale } from "@/i18n/routing";

/** /cursive/letter/[letter] 长尾矩阵:单字母教学内容页。
 *  Phase 0 仅英文(其他语言访问 404,sitemap 只输出 en 变体)。
 *  文案全部放在本模块而非 messages/:矩阵页是 EN-only 内容层,
 *  且 standards.test.ts 强制 messages 八语言 key 一致,不应为单语内容扩 key。
 *  质量红线:每页必须有真实增量信息(笔顺/错误点/FAQ),不得模板化灌水。 */

export interface LetterFaq {
  q: string;
  a: string;
}

export interface LetterCopy {
  h1: string;
  intro: string;
  steps: string[];
  mistakes: string[];
  words: string[];
  faqs: LetterFaq[];
}

export interface LetterMeta {
  title: string;
  description: string;
}

export interface CursiveLetterPage {
  /** URL 段:小写 "f",大写 "capital-g" */
  slug: string;
  /** 展示字形(单字符) */
  letter: string;
  /** 列表里的称呼,如 "f" / "G" */
  name: string;
  form: "lowercase" | "capital";
  meta: Partial<Record<Locale, LetterMeta>>;
  copy: Partial<Record<Locale, LetterCopy>>;
}

/** Phase 0 批次:12 个最难字母(小写 f/g/j/q/z + 大写 F/G/J/Q/S/T/Z)。
 *  后续批次按字母表补齐,数组顺序即 prev/next 导航与 hub 展示顺序。 */
export const CURSIVE_LETTERS: CursiveLetterPage[] = [
  {
    slug: "f",
    letter: "f",
    name: "f",
    form: "lowercase",
    meta: {
      en: {
        title: "How to Write a Cursive F (Lowercase): Step-by-Step + Practice Sheet",
        description:
          "The cursive f trips up almost everyone — it's the only letter that swings both above and below the lines. Learn the four strokes, the classic mistakes, and print a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive f",
        intro:
          "The lowercase f is the classic cursive troublemaker: it's the only letter that lives both above the headline and below the baseline. Get the two loops and the crossbar in the right places and it becomes one of the most satisfying letters to write. The sample on this page is rendered in an open-source cursive font — your hand will develop its own version.",
        steps: [
          "Start on the baseline. Curve up and slightly back as you rise toward the headline — the upward stroke leans a little left.",
          "At the headline, loop over to the left and pull straight down. Keep going well past the baseline into descender territory — f is the only lowercase letter with a head loop and a tail loop.",
          "At the bottom of the tail, curl left, loop under, and swing back up to the baseline. End with a small exit stroke to the right — this is what connects f to the next letter.",
          "Finish with the crossbar: a short horizontal stroke through the stem around x-height, roughly midway between the baseline and the headline.",
        ],
        mistakes: [
          "Crossing too high. The crossbar belongs near x-height — cross near the top and the f reads like a fancy t.",
          "Shrinking the descender. If the bottom loop stays above the baseline, the tail has nowhere to form and the f looks like an unfinished l.",
          "Bulging the stem. The downstroke between the two loops should be straight; a wavy stem is the number one giveaway of an untrained f.",
        ],
        words: ["fluffy", "office", "careful", "before", "griffin"],
        faqs: [
          {
            q: "Why is the cursive f so hard?",
            a: "It's the only lowercase letter with both a head loop and a tail loop, so your hand has to run two opposite loops in one motion, then remember the crossbar. Slow repetition of the full stroke — up, down, under, cross — builds the muscle memory faster than writing whole words.",
          },
          {
            q: "Does a cursive f connect to the next letter?",
            a: "Yes. The under-loop at the bottom swings up to the baseline and exits to the right, so f connects to every letter that follows it. The connection out of f feels awkward at first because the exit comes from below the line — slow down for one or two words and it clicks.",
          },
          {
            q: "Should the crossbar be part of the main stroke?",
            a: "In most school styles the crossbar is a separate stroke added after the body. Some writers cross on the way up during the final under-loop — it saves a pen lift but produces a slanted, inconsistent bar. Pick one way and stay consistent across the page.",
          },
        ],
      },
    },
  },
  {
    slug: "g",
    letter: "g",
    name: "g",
    form: "lowercase",
    meta: {
      en: {
        title: "How to Write a Cursive G (Lowercase): Step-by-Step + Practice Sheet",
        description:
          "The cursive g hides its loop below the line — start it like an o, dive down, loop under, and climb back to the baseline. Strokes, mistakes, the g-vs-q test, and a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive g",
        intro:
          "The lowercase g belongs to the same family as o and a — it starts with the identical roll-over stroke — and then takes the plunge: the downstroke drops below the baseline and loops back up to connect. The closed under-loop is what separates a confident cursive g from a print g wearing a costume. The sample on this page is an open-source cursive font; your hand will round it into its own shape.",
        steps: [
          "Start on the baseline and curve up and over to the x-height line, rolling left into a round bowl — exactly the opening of a cursive o.",
          "From the right side of the bowl, pull straight down past the baseline. Keep the right side of the bowl firm so it doesn't collapse into a balloon.",
          "At the bottom of the descender, loop to the left, then under and back up — close the loop at the baseline and exit right, ready to connect.",
        ],
        mistakes: [
          "Closing the loop below the baseline. The under-loop must climb all the way back up to the baseline; a loop that closes mid-air breaks the connection to the next letter.",
          "Leaving the tail open. An open, print-style tail works in a pinch but slows the join — pick the closed loop or the open tail, and use the same one across the whole page.",
          "Round, sagging bowl. g starts like o, but the right side of the bowl feeds a long downstroke — if the bowl is too round, the letter tips over.",
        ],
        words: ["good", "egg", "magic", "garden", "struggle"],
        faqs: [
          {
            q: "How do you tell a cursive g from a cursive q?",
            a: "Look at what happens below the baseline: g closes into a full under-loop that climbs back to the line; q ends with a short tail that stays low. Quick test — if you could thread a pen through the bottom of the letter, it's a g.",
          },
          {
            q: "Does a cursive g connect to the next letter?",
            a: "Yes — that's the whole point of the under-loop. It exits at the baseline moving right, so g joins smoothly to every following letter. Words like egg and struggle are good drills because the g lands mid-word, not just at the start.",
          },
          {
            q: "Should the descender loop slant?",
            a: "Slightly, in the same direction as the rest of your writing. A perfectly vertical loop looks stiff; a backward-leaning one tangles with the letter behind it. Match the loop's lean to your slant and the whole word stays even.",
          },
        ],
      },
    },
  },
  {
    slug: "j",
    letter: "j",
    name: "j",
    form: "lowercase",
    meta: {
      en: {
        title: "How to Write a Cursive J (Lowercase): Step-by-Step + Practice Sheet",
        description:
          "A cursive j is an i with courage — same body, but the downstroke dives below the baseline and loops back up. Step-by-step strokes, the dot rule, and a free printable practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive j",
        intro:
          "The lowercase j is an i that commits: same compact body and the same dot, but the downstroke carries on below the baseline and loops back up to the line. Once the under-loop feels natural, j is one of the fastest letters to write. The sample here is set in an open-source cursive font — treat it as a reference, not a copy target.",
        steps: [
          "Start on the baseline and curve up to the x-height line — the same opening stroke you'd use for an i.",
          "Pull straight back down, past the baseline, into the descender zone.",
          "At the bottom, curl left, loop under, and swing back up so the stroke finishes on the baseline with a small exit to the right — that exit connects j to the next letter.",
          "Lift the pen and place the dot at x-height, directly above the body of the letter.",
        ],
        mistakes: [
          "Parking the dot at the baseline. The dot marks the top of the letter at x-height; a low dot makes the j read like a squashed i.",
          "Hooking the tail the wrong way. The descender loop mirrors g and y — under and to the left first, then back up right. A rightward hook closes off the connection.",
          "Skipping the exit stroke. If the under-loop ends in mid-air, the next letter starts disconnected and the word falls apart.",
        ],
        words: ["jump", "jelly", "enjoy", "major", "january"],
        faqs: [
          {
            q: "Does a cursive j connect to the next letter?",
            a: "Yes. The under-loop at the bottom of the descender swings back up to the baseline and exits right, ready for the next letter. If your j keeps ending disconnected, you're probably lifting the pen at the bottom instead of continuing through the loop.",
          },
          {
            q: "How is a cursive j different from a cursive i?",
            a: "Same body, same dot — the only difference is the downstroke. The i stops at the baseline; the j carries on below it and loops back up. Practise them as a pair so your hand learns the shared opening stroke once and reuses it.",
          },
          {
            q: "Where exactly does the dot go?",
            a: "At the x-height line, roughly above the middle of the letter's body — the same height as the tops of a, c and e. Dots placed too high or too low are one of the most common reasons handwriting looks untidy to readers.",
          },
        ],
      },
    },
  },
  {
    slug: "q",
    letter: "q",
    name: "q",
    form: "lowercase",
    meta: {
      en: {
        title: "How to Write a Cursive Q (Lowercase): Step-by-Step + Practice Sheet",
        description:
          "A cursive q starts like an o but finishes with the famous little tail — the flick that stops it being mistaken for a g. Step-by-step strokes, mistakes, and a free printable practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive q",
        intro:
          "The lowercase q is g's twin with a completely different ending: same roll-over start, same downstroke past the baseline — but instead of looping under, q finishes with a short tail that flicks right along the baseline. In many American school styles that tail curls just enough to resemble a tiny 2, which is exactly what keeps q from being read as g. The sample below is set in an open-source cursive font.",
        steps: [
          "Start on the baseline, curve up and over to x-height, and roll left into the round bowl — the shared opening of the o-family.",
          "Pull straight down from the right side of the bowl, past the baseline. Keep this stroke close to vertical — q's right side is straighter than o's.",
          "Just below the baseline, flick the tail to the right along the line of the baseline — short and flat, with the slight upward curl that gives the classic 2-like finish.",
          "Without lifting, let the tail run directly into the exit stroke — the flat tail is what connects q to the next letter.",
        ],
        mistakes: [
          "Turning the tail into a loop. The moment the tail loops under and back up, your q becomes a g. The tail stays low and moves right.",
          "Dropping the tail below the descender line. The flick happens at the baseline, not at g-depth — a low tail drags the whole word downward.",
          "Over-rounding the bowl. Because the downstroke feeds a flat tail instead of a loop, q's right side should be firmer and straighter than o's.",
        ],
        words: ["quick", "queen", "square", "quote", "liquid"],
        faqs: [
          {
            q: "Why does a cursive q look like the number 2?",
            a: "The tail that finishes q curls upward slightly, and in Palmer-style teaching that curl is exaggerated into a little 2 shape. It's a reading aid as much as a style choice: a q with no tail is indistinguishable from a sloppy g.",
          },
          {
            q: "Does the cursive q connect to the next letter?",
            a: "Yes — the flat tail runs along the baseline straight into the exit stroke. Quick is a good practice word because the q-to-i join shows immediately whether your tail is flat enough.",
          },
          {
            q: "What's the fastest way to stop confusing q and g?",
            a: "Drill them as a pair on the same line: g closes with an under-loop that climbs back up; q flicks right and stays low. Ten alternating repetitions build the contrast into your hand faster than practising either letter alone.",
          },
        ],
      },
    },
  },
  {
    slug: "z",
    letter: "z",
    name: "z",
    form: "lowercase",
    meta: {
      en: {
        title: "How to Write a Cursive Z (Lowercase): Step-by-Step + Practice Sheet",
        description:
          "A cursive z keeps the print shape on the line, then adds a surprise: a small loop below the baseline that swings the stroke back up to connect. Steps, mistakes, and a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive z",
        intro:
          "The lowercase z looks like print z for its first three strokes — across, diagonal, across — and then does something print never does: without lifting the pen, it dips into a small loop below the baseline and climbs back up to the line. That under-loop is what keeps z part of the cursive flow. The sample here is an open-source cursive font; your own version will tighten with practice.",
        steps: [
          "Start on the baseline with a light entry stroke rising to the x-height line, then draw the top bar: a short horizontal stroke moving right.",
          "Without lifting, pull the diagonal down-left to the baseline — keep it straight; this is the skeleton of the letter.",
          "Still without lifting, run the bottom bar to the right along the baseline.",
          "At the end of the bottom bar, keep going: dip below the baseline, curl left, loop under, and swing back up to close the small loop at the baseline with an exit stroke to the right.",
        ],
        mistakes: [
          "Skipping the under-loop. A z that stops at the bottom bar is a print z — it strands the pen off the line and breaks every word it sits in.",
          "A bowed diagonal. The diagonal carries the letter; if it curves, the z leans like it's falling. Two light dots marking the corners fix this fast.",
          "Oversized loop. The under-loop should be a whisper — a wide loop below the line drags attention down and gets read as a j.",
        ],
        words: ["zebra", "amazing", "puzzle", "size", "blizzard"],
        faqs: [
          {
            q: "Does a cursive z really go below the line?",
            a: "Yes — the small under-loop below the baseline is standard in looped cursive styles. It gives the pen somewhere to go between the bottom bar and the next letter. If your style keeps everything on the line, the bottom bar simply extends into the exit stroke instead.",
          },
          {
            q: "Is it wrong to write a print-style z in cursive?",
            a: "It's the most common z habit, and it costs you the connection: a flat-bottomed z forces a pen lift before the next letter. The looped z keeps the word unbroken — worth the two or three days of retraining it takes.",
          },
          {
            q: "How do I stop my cursive z looking like a g or j?",
            a: "Watch the proportions: z's below-line part is a small, flat loop hung off the end of the bottom bar; g's is a full loop closed at the line, and j's drops from a tall body. Keep the z loop shallow and it can't be misread.",
          },
        ],
      },
    },
  },
  {
    slug: "capital-f",
    letter: "F",
    name: "F",
    form: "capital",
    meta: {
      en: {
        title: "How to Write a Cursive Capital F: Step-by-Step + Practice Sheet",
        description:
          "The cursive capital F is a curved stem with two crossbars — top and middle — each falling gently with the slant. Step-by-step strokes, the classic mistakes, and a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive capital F",
        intro:
          "The cursive capital F takes the capital T's curved stem and adds the middle bar — two crossbars, one stem, no connections. It's a formal-looking letter that's easier than it appears: if you can write a cursive T, you are one bar away from an F. The sample on this page is an open-source cursive font.",
        steps: [
          "Start at the top line and pull a gently left-bowing stroke down to the baseline, finishing with a small rightward curl along the line.",
          "Lift and add the top bar: from the stem (or a hair left of it), a short stroke falling slightly to the right, just below the top line.",
          "Lift again and add the middle bar at x-height: the same gently falling stroke crossing the stem — slightly shorter than the top bar.",
        ],
        mistakes: [
          "Level bars. Both crossbars should fall gently to the right with the slant. Horizontal bars make the F look printed, not written.",
          "Middle bar too low. It belongs at x-height — the line your lowercase a, c and e reach. Any lower and the F sags into an odd two-bar pillar.",
          "Straight stem. A subtle leftward bow is what makes the letter cursive. Overdo it and the F leans; leave it out and the F stands at attention.",
        ],
        words: ["Friday", "Fiona", "Forest", "Frank", "Feather"],
        faqs: [
          {
            q: "Why does my cursive F look like a T?",
            a: "The middle bar is missing or too faint. It crosses the stem at x-height and should be clearly visible — when you speed up, the middle bar is always the first casualty, so slow down for F until the bar is automatic.",
          },
          {
            q: "Does a cursive capital F connect to the next letter?",
            a: "No — in school styles the F ends with the stem's decorative foot, and the next letter starts fresh. The F is one of the least connection-friendly capitals; forcing a join distorts the stem.",
          },
          {
            q: "Are the two bars the same length?",
            a: "Almost — the top bar is a touch longer, the middle bar slightly shorter and closer to the stem. Equal-length bars make the F look engineered; a small difference keeps it looking written.",
          },
        ],
      },
    },
  },
  {
    slug: "capital-g",
    letter: "G",
    name: "G",
    form: "capital",
    meta: {
      en: {
        title: "How to Write a Cursive Capital G: Step-by-Step + Practice Sheet",
        description:
          "A cursive capital G is a grand C plus the inward shelf that makes it a G. Learn the stroke order, the classic mistakes, and print a free capital-G practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive capital G",
        intro:
          "The cursive capital G is built from one grand sweep — a big open curve from the top line down to the baseline — plus the small inward shelf that turns a C into a G. It's a letter that rewards confidence: hesitant Gs collapse into Cs. The sample on this page is an open-source cursive font, so expect your hand to add its own character.",
        steps: [
          "Start at the top line, a little right of centre. Sweep left and down in one smooth counterclockwise curve, rounding the bottom and ending at the baseline — the big C sweep.",
          "At the baseline, curl the stroke up and inward toward the centre of the letter, finishing just inside the curve. Keep it small — the inward curl is a hook, not a second loop.",
          "Lift the pen and add the shelf: a short stroke entering from the right side, level with the middle of the letter, pushing toward the centre.",
        ],
        mistakes: [
          "Closing the curve. The sweep should stay open on the right — once it closes into a circle, the shelf has nowhere to land and the G reads as a fancy O.",
          "An oversized shelf. The crossbar is the shortest stroke in the letter; push it past the curve's right edge and the G starts looking over-engineered.",
          "Starting the sweep too low. Enter at the top line — a G that begins mid-height loses the room for the bottom curl and ends up half a line tall.",
        ],
        words: ["Grace", "Georgia", "Ginger", "Gabriel", "Gold"],
        faqs: [
          {
            q: "Does a cursive capital G connect to the next letter?",
            a: "In most school styles, no — capitals are left open at the bottom and the next letter starts fresh. Some writers extend the bottom curl into a join; it works, but it changes the letter's shape, so decide deliberately rather than by accident.",
          },
          {
            q: "What's the difference between cursive G and cursive C?",
            a: "Two things: the small inward curl at the bottom of the sweep, and the shelf entering from the right. C has neither. If you can't tell your capitals apart at a glance, the shelf is usually missing or too small.",
          },
          {
            q: "How big should a capital G be?",
            a: "Headline to baseline — the full body of the line, like all capitals. The most common size error is a G that starts below the top line and ends up dwarfed by the lowercase letters around it.",
          },
        ],
      },
    },
  },
  {
    slug: "capital-j",
    letter: "J",
    name: "J",
    form: "capital",
    meta: {
      en: {
        title: "How to Write a Cursive Capital J: Step-by-Step + Practice Sheet",
        description:
          "A cursive capital J sweeps below the baseline and loops back up — the only capital that dives. Learn the stroke order, the dot question, and print a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive capital J",
        intro:
          "The cursive capital J is the only capital that regularly ventures below the baseline: a grand curve from the top line, a long dive into descender territory, and an under-loop that swings back up to the line. It reads as dramatic on the page — which is why it's a favourite for signatures. The sample below is set in an open-source cursive font.",
        steps: [
          "Start at the top line, a little right of centre, and sweep left in a rounded top — a counterclockwise curve like the opening of a C.",
          "Feed the curve into a long, slightly left-leaning stroke that carries down past the baseline — the J's dive is what distinguishes it from most capitals.",
          "At the bottom, curl left, loop under, and swing back up toward the baseline, finishing inside the letter with a small upward tuck — one continuous motion from top to tuck.",
        ],
        mistakes: [
          "Stopping at the baseline. A capital J that turns back at the line loses its whole personality — let the stroke commit below the line.",
          "Adding a dot. Capital J takes no dot — that belongs to lowercase j. A dotted capital J survives from learning the lowercase first; it isn't standard.",
          "A closed, cramped bottom loop. The under-loop should open comfortably to the left before climbing; a tight knot at the bottom makes the letter look strangled.",
        ],
        words: ["January", "James", "Journey", "Julia", "Jungle"],
        faqs: [
          {
            q: "Does a cursive capital J go below the line?",
            a: "Yes — in most cursive styles the capital J descends below the baseline and loops back up, which makes it unusual among capitals. If your hand keeps stopping at the line, practise the dive separately: down past the baseline, loop, up.",
          },
          {
            q: "Should a capital J be dotted?",
            a: "No. The dot belongs to lowercase j. A dotted capital J is one of those habits that survives from learning the lowercase first — it isn't wrong enough to be unreadable, but it isn't standard.",
          },
          {
            q: "Does a cursive capital J connect to the next letter?",
            a: "Usually not. The under-loop finishes with an inward tuck rather than an exit stroke, so the next letter starts fresh. This is also why J works so well as a signature letter — it's self-contained.",
          },
        ],
      },
    },
  },
  {
    slug: "capital-q",
    letter: "Q",
    name: "Q",
    form: "capital",
    meta: {
      en: {
        title: "How to Write a Cursive Capital Q: Step-by-Step + Practice Sheet",
        description:
          "Yes, a cursive capital Q really looks like a 2 — that's the standard school form, not a mistake. Learn the stroke, why it's shaped that way, and print a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive capital Q",
        intro:
          "Yes — in the school cursive most of us were taught, a capital Q really does look like the number 2. The big curve from the top line, the sweep down to the baseline, and the flat tail running right are the standard Palmer-style form, and once you accept the resemblance, Q becomes one of the most fun capitals to write. The sample on this page is an open-source cursive font.",
        steps: [
          "Start at the top line, a little right of centre. Sweep left and down in a big counterclockwise curve toward the baseline — the same grand opening as a capital C or G.",
          "As the curve reaches the baseline, don't lift: flatten the stroke and run it to the right along the baseline.",
          "Finish the tail with a small upward flick at the right edge — this little kick is what completes the 2-like form.",
        ],
        mistakes: [
          "Closing the curve into an O with a tail. The sweep stays open on the right side all the way down; close it and the tail has nowhere to begin.",
          "A droopy tail. The tail runs flat along the baseline and kicks up at the end — a tail that dips below the line drags the whole letter into descender territory.",
          "Watering down the 2 shape. Beginners often shrink the tail-kick out of embarrassment; the result reads as neither Q nor O. Commit to the form — context does the disambiguating.",
        ],
        words: ["Queen", "Quinn", "Quartz", "Quill", "Quentin"],
        faqs: [
          {
            q: "Is a cursive Q supposed to look like a 2?",
            a: "In Palmer-style and most American school cursive, yes — the 2-like Q is the standard form, and generations of readers have parsed it from context. Some styles use a round O-form Q with a small tail instead; both are legitimate, but pick one and stay consistent.",
          },
          {
            q: "How do readers tell a cursive Q from a cursive G?",
            a: "G has the inward shelf or curl inside the bowl; Q has the flat baseline tail. In running text the surrounding letters do most of the work — which is why the tail matters: it's the only reliable signal.",
          },
          {
            q: "Does a cursive capital Q connect to the next letter?",
            a: "In the 2-form, no — the tail's upward flick is a finish, not an exit. The next letter starts fresh on its own entry stroke.",
          },
        ],
      },
    },
  },
  {
    slug: "capital-s",
    letter: "S",
    name: "S",
    form: "capital",
    meta: {
      en: {
        title: "How to Write a Cursive Capital S: Step-by-Step + Practice Sheet",
        description:
          "The cursive capital S is one continuous ribbon stroke — top curl, centre diagonal, bottom curl, no pen lifts. Learn the movement, the classic mistakes, and print a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive capital S",
        intro:
          "The cursive capital S is a single ribbon of a stroke: one continuous movement from the top curl through the centre diagonal to the bottom curl, without lifting the pen. Drawn in one motion it looks effortless; drawn print-first-and-decorated it looks stiff. The sample on this page is set in an open-source cursive font.",
        steps: [
          "Start at the top line with a small counterclockwise curl to the left — the top of the S rolls over like a wave cresting.",
          "Let the same motion continue: sweep down through the centre of the letter toward the baseline — one unbroken diagonal.",
          "At the baseline, round the stroke to the right and up in a bottom curl that mirrors the top one.",
          "Finish with a small inward flick that tucks the end inside the bottom curve — no pen lift anywhere in the letter.",
        ],
        mistakes: [
          "Drawing a print S and adding curves afterwards. The letter only looks relaxed when it's one continuous movement — three separate strokes make it look assembled, not written.",
          "An upright S. Cursive leans; an S that sits vertical breaks the slant rhythm of the whole word. Exaggerate the lean while practising — it will relax to normal on its own.",
          "Uneven curls. The top and bottom curls should mirror each other in size; a big top with a shy bottom makes the letter look top-heavy.",
        ],
        words: ["Sunday", "Summer", "Sarah", "Story", "Silver"],
        faqs: [
          {
            q: "How many strokes does a cursive capital S take?",
            a: "One, in most school styles — a single continuous movement from the top curl to the bottom flick. If you're lifting the pen, you're writing a decorated print S. Practise the motion in the air first; the pen version follows.",
          },
          {
            q: "Does a cursive capital S connect to lowercase letters?",
            a: "Usually not — like most capitals it ends with an inward tuck rather than an exit stroke, so the next letter begins fresh. A few writers stretch the bottom curl into a join; it's readable but non-standard.",
          },
          {
            q: "Why is my cursive S wider than everyone else's?",
            a: "Width comes from the curls. Tighten the top and bottom curls — think of the letter living in a tall, narrow ellipse — and the S slims down without losing its ribbon quality.",
          },
        ],
      },
    },
  },
  {
    slug: "capital-t",
    letter: "T",
    name: "T",
    form: "capital",
    meta: {
      en: {
        title: "How to Write a Cursive Capital T: Step-by-Step + Practice Sheet",
        description:
          "A cursive capital T is one curved stem and a swan-neck crossbar — and the fastest way to memorise it is as a capital F minus the middle bar. Steps, mistakes, free printable sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive capital T",
        intro:
          "The cursive capital T is a study in economy: one gently curved stem from the top line to the baseline, finished with a small rightward curl, plus a single crossbar near the top. Learn it as a capital F without the middle bar and you've got both letters for the price of one. The sample below uses an open-source cursive font.",
        steps: [
          "Start at the top line and pull a slightly curved stroke down to the baseline — the curve bows gently left as it falls.",
          "At the baseline, finish with a small rightward curl — the foot that keeps the stem from looking planted.",
          "Lift the pen and add the crossbar: a short stroke across the stem just below the top line, falling slightly as it moves right, in the direction of the slant.",
        ],
        mistakes: [
          "A dead-straight stem. Print T is a vertical post; cursive T curves. Keep the leftward bow subtle — a millimetre or two across the letter's height — but present.",
          "Crossbar at mid-height. The bar belongs near the top of the stem; drop it to the middle and the letter hovers unreadably between T and F.",
          "A horizontal crossbar. The bar should fall gently to the right, matching the slant — a perfectly level bar fights the rest of the word.",
        ],
        words: ["Tuesday", "Thomas", "Travel", "Taylor", "Truth"],
        faqs: [
          {
            q: "What's the difference between a cursive T and a cursive F?",
            a: "One stroke: F adds a second crossbar at mid-height. They share the curved stem and the top bar exactly, so teach your hand them as a pair — write a T, then drop the middle bar in and you've written an F.",
          },
          {
            q: "Does a cursive capital T connect to the next letter?",
            a: "Typically no. The stem's bottom curl is decorative, not an exit stroke, so the following lowercase letter starts on its own. Connecting from capitals is possible but changes the capital's shape.",
          },
          {
            q: "Should the crossbar cross the stem or start from it?",
            a: "Both appear in old penmanship books, but the school-standard form starts the bar on the stem (or just left of it) and moves right — it shouldn't poke out to the left of the stem.",
          },
        ],
      },
    },
  },
  {
    slug: "capital-z",
    letter: "Z",
    name: "Z",
    form: "capital",
    meta: {
      en: {
        title: "How to Write a Cursive Capital Z: Step-by-Step + Practice Sheet",
        description:
          "A cursive capital Z looks like a 3 wearing a flat hat — top bar, sweeping diagonal, bottom fold. Learn the three movements, the classic mistakes, and print a free practice sheet.",
      },
    },
    copy: {
      en: {
        h1: "How to write a cursive capital Z",
        intro:
          "The cursive capital Z has a reputation as the strangest letter in the alphabet — it looks like a 3 with a flat top bar — but its three movements are logical once you see them, and the bottom fold comes from the same family as the capital Q's tail. Written boldly it's a showpiece letter. The sample on this page is an open-source cursive font.",
        steps: [
          "Start at the top line and draw a gentle horizontal bar falling slightly as it moves right — the flat hat.",
          "Without lifting, sweep the stroke down and to the left in a long diagonal toward the baseline.",
          "At the baseline, curl right into a rounded bottom fold that echoes the number 3's lower half, finishing with a small upward flick at the right.",
        ],
        mistakes: [
          "A print Z with straight lines. The diagonal and the bottom fold should curve — a zigzag capital Z reads as printed, and the fold is what cursive readers expect.",
          "Confusing Z with Q. They're siblings: Q's tail runs flat along the baseline with a single kick, while Z's bottom is a full rounded fold. Exaggerate the difference while learning.",
          "A wimpy top bar. The bar anchors the letter; if it's short or faint, the whole Z reads as a stray 3. Give the bar its full width.",
        ],
        words: ["Zoe", "Zachary", "Zelda", "Zion", "Zara"],
        faqs: [
          {
            q: "Is the cursive capital Z really supposed to look like a 3?",
            a: "Yes — in Palmer-style cursive the capital Z's bottom fold gives it the 3 silhouette, with the top bar as the giveaway. It's one of the reasons cursive Z is rare in logos and common in riddles about handwriting.",
          },
          {
            q: "How is a cursive Z different from a cursive Q?",
            a: "Q is one curve plus a flat baseline tail. Z is a top bar, a diagonal, and a full rounded bottom fold. They sit in the same family of capitals that look like numbers, but Z's top bar and folded bottom are unmistakable once you've seen the pair side by side.",
          },
          {
            q: "Does a cursive capital Z connect to the next letter?",
            a: "No — the bottom fold finishes with a flick, not an exit stroke, so the following letter starts fresh. Like Q, Z is a self-contained capital; forcing a join breaks the fold.",
          },
        ],
      },
    },
  },
];

/** 页面 UI 文案(与字母内容同语言,Phase 0 仅 en) */
export interface LetterUi {
  backToCursive: string;
  stepsTitle: string;
  mistakesTitle: string;
  wordsTitle: string;
  ctaTitle: string;
  ctaButton: string;
  ctaHint: string;
  faqTitle: string;
  fontNote: string;
  prevLetter: string;
  nextLetter: string;
  hubTitle: string;
  hubIntro: string;
  hubLowercase: string;
  hubCapital: string;
}

const LETTER_UI: Partial<Record<Locale, LetterUi>> = {
  en: {
    backToCursive: "Cursive generator & all letters",
    stepsTitle: "Write it step by step",
    mistakesTitle: "Common mistakes to avoid",
    wordsTitle: "Practice words",
    ctaTitle: "Turn this letter into a practice sheet",
    ctaButton: "Make a practice sheet",
    ctaHint: "Opens the workbook generator with these words pre-filled — add a name, pick a font, print the PDF.",
    faqTitle: "Frequently asked questions",
    fontNote:
      "The letterforms on this page are rendered in Cedarville Cursive, an open-source font — school styles like Zaner-Bloser or D'Nealian differ in details. Treat the steps as the source of truth for stroke order; let the sample show you one possible shape.",
    prevLetter: "Previous letter guide",
    nextLetter: "Next letter guide",
    hubTitle: "Cursive letters, step by step",
    hubIntro:
      "Step-by-step guides for the trickiest letters in the alphabet — stroke order, common mistakes, practice words, and a printable sheet for each one.",
    hubLowercase: "Lowercase",
    hubCapital: "Capital",
  },
};

export function getLetterUi(locale: Locale): LetterUi | undefined {
  return LETTER_UI[locale];
}

/** 当前语言有完整文案的字母页(slug → 内容);缺失返回 undefined(页面 404,不做语言回退,避免跨语言重复内容) */
export function getLetterPage(
  slug: string,
  locale: Locale,
): { page: CursiveLetterPage; copy: LetterCopy; meta: LetterMeta } | undefined {
  const page = CURSIVE_LETTERS.find((l) => l.slug === slug);
  const copy = page?.copy[locale];
  if (!page || !copy) return undefined;
  return { page, copy, meta: page.meta[locale] ?? page.meta.en! };
}

/** 某语言可用的字母页列表(hub/导航用) */
export function lettersForLocale(locale: Locale): CursiveLetterPage[] {
  return CURSIVE_LETTERS.filter((l) => Boolean(l.copy[locale]));
}

/** workbook 预填词表:字形 + 练习词 */
export function letterWorkbookWords(page: CursiveLetterPage, copy: LetterCopy): string {
  return [page.letter, ...copy.words].join(",");
}
