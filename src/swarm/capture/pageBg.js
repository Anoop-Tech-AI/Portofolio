/**
 * Swarm Rebuild - Page Background and Box Style Detection
 * Tribute to Joel Califa (https://califa.github.io/swarm-site/)
 * Adapted from Dhvanil Patel (https://github.com/DhvanilPatel/swarm-cursors)
 */

import { alphaOf } from "../core/constants.js";

export function boxyStyle(st) {
  if (alphaOf(st.backgroundColor) > 0.02) return true;
  if (st.backgroundImage && st.backgroundImage !== "none") return true;
  if (st.boxShadow && st.boxShadow !== "none") return true;
  for (const s of ["Top", "Right", "Bottom", "Left"]) {
    if (
      parseFloat(st["border" + s + "Width"]) > 0 &&
      st["border" + s + "Style"] !== "none" &&
      alphaOf(st["border" + s + "Color"]) > 0.02
    )
      return true;
  }
  return false;
}

export function pageBackground() {
  const h = document.documentElement;
  const b = document.body;
  const hs = getComputedStyle(h);
  const bs = b ? getComputedStyle(b) : null;
  const pick = (cs) => ({
    color: cs.backgroundColor,
    image: cs.backgroundImage,
    size: cs.backgroundSize,
    position: cs.backgroundPosition,
    repeat: cs.backgroundRepeat,
  });
  if (alphaOf(hs.backgroundColor) > 0.01 || hs.backgroundImage !== "none")
    return { ...pick(hs), from: h };
  if (bs && (alphaOf(bs.backgroundColor) > 0.01 || bs.backgroundImage !== "none"))
    return { ...pick(bs), from: b };
  const dark =
    /dark/.test(hs.colorScheme) &&
    typeof matchMedia === "function" &&
    matchMedia("(prefers-color-scheme: dark)").matches;
  return {
    color: dark ? "rgb(18, 18, 18)" : "rgb(255, 255, 255)",
    image: "none",
    from: null,
  };
}

