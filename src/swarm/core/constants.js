export const KEY = "__swarmRebuild";

export const NAMES = [
  "Ada", "Linus", "Grace", "Alan", "Margaret", "Ken", "Barbara", "Dennis",
  "Radia", "Guido", "Frances", "Bjarne", "Hedy", "Tim", "Katherine", "Edsger",
  "Joan", "Donald", "Sophie", "Niklaus", "Anita", "Brian", "Mary", "Rob",
  "Ida", "Yukihiro", "Shafi", "Leslie", "Jean", "Vint", "Lynn", "Bram",
];

export const FIGMA_PALETTE = [
  "#F24E1E", "#A259FF", "#1ABCFE", "#0ACF83", "#FF7262", "#FFC700",
  "#9747FF", "#E8467C", "#14AE5C", "#0D99FF", "#FF8A00", "#00B5CE",
];

export const CYBER_PALETTE = [
  "#FF0055", "#00F0FF", "#9D00FF", "#00FF88", "#FF6B00", "#FF007A",
  "#00E5FF", "#FFE600", "#7928CA", "#00DF89", "#FF3366", "#2E90FA",
];

export const PALETTES = {
  classic: FIGMA_PALETTE,
  cyber: CYBER_PALETTE,
};

export const COLORS = CYBER_PALETTE; 

export const BLUE = "#0D99FF";
export const RED = "#F24822";
export const CYAN_GLOW = "#00F0FF";
export const CRIMSON_GLOW = "#FF0055";
export const RULER = 20;

export const MIN_AGENTS = 8;
export const MAX_AGENTS = 48;
export const FLOCK_AGENTS = 36;
export const INTRO_AGENTS = 18;

export const MAX_ITEMS = 4000;
export const MAX_WORLD_H = 40000;
export const SVGNS = "http://www.w3.org/2000/svg";

export const rand = (a, b) => a + Math.random() * (b - a);
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);
export const bump = (it) => {
  it.v++;
};
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));
export const f1 = (n) => Math.round(n * 10) / 10;

export function alphaOf(c) {
  if (!c || c === "transparent") return 0;
  const slash = c.match(/\/\s*([\d.]+%?)\s*\)/);
  if (slash) return slash[1].endsWith("%") ? parseFloat(slash[1]) / 100 : parseFloat(slash[1]);
  const m = c.match(/^rgba\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(",");
    return p.length >= 4 ? parseFloat(p[3]) : 1;
  }
  return 1;
}

export function intersect(a, b) {
  if (!a || !b) return null;
  const l = Math.max(a.l, b.l);
  const t = Math.max(a.t, b.t);
  const r = Math.min(a.r, b.r);
  const bt = Math.min(a.b, b.b);
  return r > l && bt > t ? { l, t, r, b: bt } : null;
}

export const ltrb = (r) => ({ l: r.left, t: r.top, r: r.right, b: r.bottom });

export function sameColor(a, b) {
  return (a || "").replace(/\s/g, "") === (b || "").replace(/\s/g, "");
}
