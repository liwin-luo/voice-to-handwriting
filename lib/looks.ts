export const TEMPLATES = {
  letter: { id: "letter", label: "Letter", width: 816, height: 1056, maxChars: 42, lines: 16, paper: "#f4ecd8", ruled: false, grid: false, margin: 72 },
  note: { id: "note", label: "Note", width: 720, height: 960, maxChars: 34, lines: 18, paper: "#fbfaf6", ruled: true, grid: false, margin: 64 },
  card: { id: "card", label: "Card", width: 640, height: 800, maxChars: 26, lines: 10, paper: "#fffdf8", ruled: false, grid: false, margin: 56 },
  grid: { id: "grid", label: "Grid", width: 816, height: 1056, maxChars: 36, lines: 16, paper: "#f7f4ea", ruled: false, grid: true, margin: 64 },
} as const;

export const HANDS = {
  casual: { id: "casual", label: "Casual", font: "Caveat", size: 40 },
  cursive: { id: "cursive", label: "Cursive", font: "Cedarville Cursive", size: 26 },
  messy: { id: "messy", label: "Messy", font: "Homemade Apple", size: 24 },
} as const;

export const SIZES = {
  small: { id: "small", label: "Small", scale: 0.85 },
  medium: { id: "medium", label: "Medium", scale: 1 },
  large: { id: "large", label: "Large", scale: 1.15 },
} as const;

export const INKS = {
  blue: { id: "blue", label: "Blue", color: "#1a2744" },
  black: { id: "black", label: "Black", color: "#1c1915" },
  pencil: { id: "pencil", label: "Pencil", color: "#5e6872" },
} as const;
