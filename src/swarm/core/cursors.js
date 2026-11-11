export const ARROW_D =
  "M4.6 3.9 C4.2 3.1 4.9 2.4 5.7 2.8 L20.6 9.4 C21.5 9.8 21.4 11.1 20.4 11.3 L13.9 12.9 C13.4 13 13 13.4 12.9 13.9 L11.3 20.4 C11.1 21.4 9.8 21.5 9.4 20.6 Z";

export const ARROW_INNER =
  "M6 4.8 L18.8 10.4 L13.6 11.7 C13.1 11.8 12.8 12.1 12.7 12.6 L11.4 17.8 Z";

export const HOT = {
  arrow: [5, 3.5],
  dup: [5, 3.5],
  pen: [3, 3],
  "pen-add": [3, 3],
  "pen-close": [3, 3],
  cross: [12, 12],
  ibeam: [12, 12],
  ew: [12, 12],
  ns: [12, 12],
};

export function cursorSVG(shape, c) {
  const st = 'stroke="#ffffff" stroke-width="1.6" stroke-linejoin="round"';
  const glow = `style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.32));"`;

  switch (shape) {
    case "arrow":
      return (
        `<g ${glow}>` +
        `<path d="${ARROW_D}" fill="${c}" ${st}/>` +
        `<path d="${ARROW_INNER}" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="0.8" stroke-linejoin="round"/>` +
        `</g>`
      );
    case "dup":
      return (
        `<g ${glow}>` +
        `<path d="${ARROW_D}" transform="translate(4 3.5)" fill="rgba(255,255,255,0.92)" stroke="${c}" stroke-width="1.4" stroke-linejoin="round"/>` +
        `<path d="${ARROW_D}" fill="${c}" ${st}/>` +
        `<path d="${ARROW_INNER}" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>` +
        `</g>`
      );
    case "pen":
    case "pen-add":
    case "pen-close": {
      let s =
        `<g ${glow}>` +
        `<path d="M17.4 10.6 L20.6 13.8 L13.8 20.6 L10.6 17.4 Z" fill="${c}" ${st}/>` +
        `<path d="M3 3 L13.1 6.3 L17.4 10.6 L10.6 17.4 L6.3 13.1 Z" fill="${c}" ${st}/>` +
        `<path d="M3.6 3.6 L8.9 8.9" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>` +
        `<circle cx="10.2" cy="10.2" r="1.8" fill="none" stroke="#fff" stroke-width="1.3"/>`;
      if (shape === "pen-add")
        s +=
          `<g stroke-linecap="round"><path d="M23 19.5 V26.5 M19.5 23 H26.5" stroke="#fff" stroke-width="3.4"/>` +
          `<path d="M23 19.5 V26.5 M19.5 23 H26.5" stroke="#1E1E1E" stroke-width="1.4"/></g>`;
      if (shape === "pen-close")
        s +=
          `<circle cx="23" cy="23" r="2.8" fill="none" stroke="#fff" stroke-width="3.4"/>` +
          `<circle cx="23" cy="23" r="2.8" fill="none" stroke="#1E1E1E" stroke-width="1.4"/>`;
      s += `</g>`;
      return s;
    }
    case "cross":
      return (
        `<g ${glow} stroke-linecap="round">` +
        `<path d="M12 3 V21 M3 12 H21" stroke="#fff" stroke-width="3.6"/>` +
        `<path d="M12 3 V21 M3 12 H21" stroke="${c}" stroke-width="1.6"/>` +
        `<circle cx="12" cy="12" r="2.2" fill="none" stroke="#fff" stroke-width="1.2"/>` +
        `</g>`
      );
    case "ibeam": {
      const d =
        "M8.5 4.5 H10.5 Q12 4.5 12 6 Q12 4.5 13.5 4.5 H15.5 M12 6 V18 M8.5 19.5 H10.5 Q12 19.5 12 18 Q12 19.5 13.5 19.5 H15.5";
      return (
        `<g ${glow} fill="none" stroke-linecap="round">` +
        `<path d="${d}" stroke="#fff" stroke-width="3.8"/>` +
        `<path d="${d}" stroke="${c}" stroke-width="1.6"/>` +
        `</g>`
      );
    }
    case "ew":
    case "ns":
      return (
        `<g ${glow}>` +
        `<path d="M2.5 12 L7 7.5 V10.4 H17 V7.5 L21.5 12 L17 16.5 V13.6 H7 V16.5 Z"${
          shape === "ns" ? ' transform="rotate(90 12 12)"' : ""
        } fill="${c}" ${st}/>` +
        `</g>`
      );
  }
  return "";
}

export const IMG_ICON =
  '<svg class="ph" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M4 18 L10 13 L14 16 L17 13.5 L21 17"/></svg>';
