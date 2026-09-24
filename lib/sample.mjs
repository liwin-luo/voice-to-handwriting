export function guessOccasion(transcript) {
  return /\bbirthday\b/i.test(transcript) ? "birthday" : "thanks";
}

export function guessWho(transcript) {
  const match = transcript.match(/\bto my ([a-z]+)/i);
  if (!match) return "friend";
  const word = match[1];
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function thanksLine(detail) {
  if (!detail) return "Thank you for showing up when it actually mattered.";
  const line = /^for /i.test(detail) ? `Thank you ${detail}` : detail;
  return line.endsWith(".") ? line : `${line}.`;
}

export function sampleLetter(input) {
  const said = input.transcript.replace(/\s+/g, " ").trim();
  const occasion = input.occasion ?? guessOccasion(said);
  const who = guessWho(said);
  const detail = said.replace(/^[Ww]rite (a |an )?(thank-you |birthday |short )?letter to my [a-z]+[.]?\s*/i, "").replace(/\.$/, "");

  if (occasion === "birthday") {
    return {
      greeting: `Dear ${who},`,
      paragraphs: [
        "I wanted this in ink, not in a text that disappears up the thread. Happy birthday.",
        detail
          ? `The part I keep is this: ${detail}.`
          : "I hope the next year has one ordinary day you will still want to tell me about.",
        "I am glad I get to say it on paper.",
      ],
      closing: "With love,",
      signature: "Alex",
    };
  }

  return {
    greeting: `Dear ${who},`,
    paragraphs: [
      "I am writing this by hand because a message felt too small.",
      thanksLine(detail),
      "I will not forget it.",
    ],
    closing: "Thank you,",
    signature: "Alex",
  };
}
