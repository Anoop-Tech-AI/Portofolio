import { clamp, easeInOut, easeOut, rand, bump } from "../core/constants.js";

export function* wait(t) {
  let n = 0;
  while (n < t) n += (yield) * this.tempo;
}

export function* moveTo(c, target, o = {}) {
  const get = typeof target === "function" ? target : () => target;
  const x0 = c.x;
  const y0 = c.y;
  const p0 = get();
  const dist = Math.hypot(p0.x - x0, p0.y - y0);
  if (dist < 0.5) {
    c.x = p0.x;
    c.y = p0.y;
    if (o.onStep) o.onStep();
    return;
  }
  const dur = clamp(0.12 + Math.sqrt(dist) * 0.021, 0.14, 0.9) / (o.speed || 1);
  const bend =
    (o.bend != null ? o.bend : (Math.random() < 0.5 ? -1 : 1) * rand(0.04, 0.14)) *
    Math.min(dist, 600);
  let t = 0;
  while (t < dur) {
    t += (yield) * this.tempo;
    const k = Math.min(1, t / dur);
    const e = o.drag || k < 0.15 ? easeInOut(k) : easeOut(k);
    const p = get();
    const dx = p.x - x0;
    const dy = p.y - y0;
    const L = Math.hypot(dx, dy) || 1;
    const off = Math.sin(Math.PI * e) * bend;
    c.x = x0 + dx * e + (-dy / L) * off;
    c.y = y0 + dy * e + (dx / L) * off;
    if (o.onStep) o.onStep();
  }
  const p = get();
  c.x = p.x;
  c.y = p.y;
  if (o.onStep) o.onStep();
}

export function* click(c) {
  c.press = 1;
  if (this.sfx) this.sfx.press(this.scr(c).x, this.vp.vw);
  yield* this.wait(0.07);
}

export function* type(it, c) {
  const N = it.total;
  const k = clamp(70 / Math.max(1, N), 0.06, 1);
  let budget = 0;
  let i = it.shown;
  while (i < N) {
    budget += (yield) * this.tempo;
    while (i < N && budget > 0) {
      const ch = it.seq[i];
      let d = rand(0.012, 0.04);
      if (ch === " ") d += rand(0, 0.03);
      if (ch === "\n") d += 0.1;
      if (Math.random() < 0.025) d += rand(0.08, 0.2);
      budget -= d * k;
      i++;
    }
    if (c && this.sfx && i > it.shown) {
      this.sfx.key(
        this.scr(c).x,
        this.vp.vw,
        c.id,
        i - it.shown,
        /\s/.test(it.seq.slice(it.shown, i)) ? 1 : 0
      );
    }
    it.shown = i;
    bump(it);
  }
}

export function* idle(c) {
  for (;;) {
    const vp = this.vp;
    const top = this.viewTop;
    const bot = this.viewBot;
    const p = {
      x: rand(vp.sx + vp.vw * 0.17, vp.sx + vp.vw * 0.83),
      y: rand(top + (bot - top) * 0.2, top + (bot - top) * 0.8),
    };
    yield* this.moveTo(c, p, { speed: 0.35 });
    let w = rand(0.4, 1.4);
    while (w > 0) {
      w -= yield;
      if (c.y < this.viewTop || c.y > this.viewBot) break;
    }
  }
}

export function* leave(c) {
  const right = c.x > this.vp.sx + this.vp.vw / 2;
  yield* this.moveTo(
    c,
    () => {
      const vp = this.vp;
      return this.fromViewport(
        right ? vp.ox + vp.vw + 60 : vp.ox - 60,
        c.y - this.viewTop + vp.oy
      );
    },
    { speed: 0.8 }
  );
}

export function run(c, t) {
  const s = t.spec;
  switch (s.type) {
    case "rect":
      return this.drawBox(c, s.it, false);
    case "image":
      return this.drawBox(c, s.it, true);
    case "line":
      return this.drawLine(c, s.it);
    case "text":
      return this.drawText(c, s.it, s.snap || null, !!s.grow);
    case "guide":
      return this.dragGuide(c, s.g);
    case "dup":
      return this.duplicate(c, s.g, s.k);
    case "edit":
      return this.editText(c, s.it);
    case "restyle":
    case "swap":
      return this.restyle(c, s.it);
  }
  return this.wait(0.1);
}

export function dragEnd(c, it) {
  const vp = this.vp;
  const screen = c.sticky;
  const right = screen ? vp.ox + vp.vw : vp.sx + vp.vw;
  const bot = screen ? vp.oy + vp.vh : this.viewBot;
  const x =
    it.x + it.w > right - 16
      ? Math.max(it.x + Math.min(it.w, 40), right - 30)
      : it.x + it.w;
  const y =
    it.y + it.h > bot - 16
      ? Math.max(it.y + Math.min(it.h, 40), bot - 40)
      : it.y + it.h;
  return { x: Math.min(x, it.x + it.w), y: Math.min(y, it.y + it.h) };
}

export function* drawBox(c, it, isImg) {
  c.shape = "cross";
  yield* this.moveTo(c, { x: it.x, y: it.y });
  c.press = 1;
  it.vis = true;
  if (it.big) it.styled = true;
  it.draw = { w: 0, h: 0 };
  bump(it);
  c.ov = () => [this.selection(it)];
  const end = this.dragEnd(c, it);
  yield* this.moveTo(c, end, {
    speed: 0.75,
    drag: true,
    bend: 0,
    onStep: () => {
      it.draw = { w: Math.max(0, c.x - it.x), h: Math.max(0, c.y - it.y) };
      bump(it);
    },
  });
  if (end.x < it.x + it.w - 0.5 || end.y < it.y + it.h - 0.5) {
    const w0 = it.draw.w;
    const h0 = it.draw.h;
    let k = 0;
    while (k < 1) {
      k = Math.min(1, k + ((yield) * this.tempo) / 0.5);
      const e = easeOut(k);
      it.draw = { w: w0 + (it.w - w0) * e, h: h0 + (it.h - h0) * e };
      bump(it);
    }
  }
  it.draw = null;
  bump(it);
  c.shape = "arrow";
  yield* this.wait(rand(0.18, 0.3));
  it.styled = true;
  bump(it);
  this.sfxPlace(isImg ? "image" : "rect", it);
  yield* this.wait(isImg ? 0.5 : 0.35);
  c.ov = null;
  it.done = true;
  bump(it);
}

export function* drawLine(c, it) {
  c.shape = "pen-add";
  yield* this.moveTo(c, it.pts[0]);
  yield* this.click(c);
  it.vis = true;
  it.edit = true;
  it.placed = 1;
  it.owner = c;
  bump(it);
  this.editLines.add(it);
  c.shape = "pen";
  for (let i = 1; i < it.pts.length; i++) {
    yield* this.moveTo(c, it.pts[i], { bend: rand(-0.03, 0.03) });
    yield* this.click(c);
    it.placed = i + 1;
    bump(it);
    yield* this.wait(rand(0.04, 0.12));
  }
  it.owner = null;
  bump(it);
  yield* this.moveTo(c, { x: c.x + rand(14, 30), y: c.y + rand(10, 24) }, { speed: 1.4 });
  yield* this.wait(0.3);
  it.edit = false;
  this.editLines.delete(it);
  it.done = true;
  bump(it);
  this.sfxPlace("line", it);
}

export function* drawText(c, it, guide, grow) {
  if (guide) {
    if (guide.axis === "x") {
      it.dx = rand(28, 64);
      it.dy = rand(-8, 8);
    } else {
      it.dx = rand(-8, 8);
      it.dy = rand(18, 34) * (Math.random() < 0.5 ? -1 : 1);
    }
  }
  if (grow) it.scale = Math.min(1, 18 / it.fs);
  const b0 = this.bounds(it);
  c.shape = "cross";
  yield* this.moveTo(c, { x: b0.x, y: b0.y });
  const lineH = Math.min(b0.h, it.lh * it.scale);
  if (b0.w < 140 && it.tb.h < it.lh * 1.6) {
    yield* this.click(c);
  } else {
    c.press = 1;
    const ghost = { x: b0.x, y: b0.y, w: 0, h: 0 };
    c.ov = () => [
      {
        t: "box",
        b: ghost,
        handles: true,
        badge: `${Math.round(ghost.w)} × ${Math.round(ghost.h)}`,
        rulerLines: true,
      },
    ];
    yield* this.moveTo(
      c,
      { x: b0.x + b0.w, y: b0.y + lineH },
      {
        speed: 0.9,
        drag: true,
        bend: 0,
        onStep: () => {
          ghost.w = Math.max(0, c.x - b0.x);
          ghost.h = Math.max(0, c.y - b0.y);
        },
      }
    );
  }
  it.vis = true;
  it.editing = true;
  it.shown = 0;
  bump(it);
  c.shape = "ibeam";
  c.ov = () => [{ t: "box", b: this.bounds(it) }];
  yield* this.moveTo(c, { x: c.x + rand(-30, 10), y: c.y + rand(10, 30) }, { speed: 1.5 });
  yield* this.type(it, c);
  yield* this.wait(0.12);
  it.editing = false;
  bump(it);
  this.sfxPlace("text", it);
  c.shape = "arrow";
  c.ov = () => [this.selection(it)];
  if (grow) {
    const steps = [24, 32, 40, 48, 56, 64, 72, 88, 104].filter((s) => s < it.fs && s > 18);
    let k = 0;
    for (const s of [...steps, it.fs]) {
      yield* this.wait(0.06);
      it.scale = s / it.fs;
      bump(it);
      if (this.sfx) this.sfx.grow(k++, this.scr(c).x, this.vp.vw);
    }
    it.scale = 1;
    bump(it);
    yield* this.wait(0.15);
  }
  if (guide) {
    let waited = 0;
    while (guide.task.state !== "done" && waited < 1.6) waited += (yield) * this.tempo;
    if (guide.task.state !== "done") guide = null;
  }
  if (guide) {
    const u = this.bounds(it);
    const a = {
      x: u.x + Math.min(u.w * 0.4, 60) + rand(-6, 6),
      y: u.y + Math.min(u.h * 0.5, 22),
    };
    yield* this.moveTo(c, a);
    c.press = 1;
    const p = { x: a.x - it.dx, y: a.y - it.dy };
    const m = {
      x: p.x + (guide.axis === "x" ? -rand(2, 5) : rand(-6, 6)),
      y: p.y + (guide.axis === "y" ? -rand(2, 5) : rand(-3, 3)),
    };
    const drag = () => {
      let h = c.x - p.x;
      let v = c.y - p.y;
      if (guide.axis === "x" && Math.abs(h) < 9) {
        if (h !== 0 && it.dx !== 0) {
          if (guide.flash < 0.5 && this.sfx) this.sfx.snap(this.scr(c).x, this.vp.vw);
          guide.flash = 1;
        }
        h = 0;
      }
      if (guide.axis === "y" && Math.abs(v) < 9) {
        if (v !== 0 && it.dy !== 0) {
          if (guide.flash < 0.5 && this.sfx) this.sfx.snap(this.scr(c).x, this.vp.vw);
          guide.flash = 1;
        }
        v = 0;
      }
      it.dx = h;
      it.dy = v;
      bump(it);
    };
    yield* this.moveTo(c, m, { speed: 0.6, drag: true, onStep: drag });
    yield* this.wait(0.1);
    yield* this.moveTo(c, p, { speed: 2, onStep: drag });
    it.dx = 0;
    it.dy = 0;
    bump(it);
    yield* this.wait(0.25);
  } else if (it.dx || it.dy) {
    const dx0 = it.dx;
    const dy0 = it.dy;
    let k = 0;
    while (k < 1) {
      k = Math.min(1, k + ((yield) * this.tempo) / 0.3);
      const e = easeInOut(k);
      it.dx = dx0 * (1 - e);
      it.dy = dy0 * (1 - e);
      bump(it);
    }
    yield* this.wait(0.15);
  } else yield* this.wait(0.2);
  c.ov = null;
  it.done = true;
  bump(it);
}

export function* dragGuide(c, g) {
  this.rulers.want++;
  try {
    const r = rand(-0.15, 0.15);
    const from = () => {
      const vp = this.vp;
      return g.axis === "x"
        ? this.fromViewport(vp.ox + 10, vp.oy + vp.vh * (0.45 + r))
        : this.fromViewport(vp.ox + vp.vw * 0.3 + r * 200, vp.oy + 10);
    };
    c.shape = "arrow";
    yield* this.moveTo(c, from);
    while (this.rulers.t < 0.95) yield;
    yield* this.moveTo(c, from, { speed: 3 });
    c.press = 1;
    c.shape = g.axis === "x" ? "ew" : "ns";
    g.vis = true;
    g.dragging = true;
    g.op = 1;
    const upd = () => {
      g.cur = g.axis === "x" ? c.x : c.y;
    };
    upd();
    const to = () => {
      const s = from();
      return g.axis === "x" ? { x: g.pos, y: s.y + 40 } : { x: s.x + 30, y: g.pos };
    };
    yield* this.moveTo(c, to, { speed: 0.55, drag: true, onStep: upd });
    g.cur = g.pos;
    g.dragging = false;
    if (this.sfx) {
      const p = this.scr(c);
      this.sfx.place("guide", p.x, p.y, 1, 1, this.vp.vw, this.vp.vh, 0);
    }
    c.shape = "arrow";
    yield* this.wait(0.25);
  } finally {
    this.rulers.want--;
  }
}

export function* duplicate(c, g, k) {
  const dst = g.dst[k];
  let src = g.src;
  const cand = [g.src, ...g.dst.filter((d) => d.task.state === "done")];
  const dd = (a) => Math.hypot(a.box.x - dst.box.x, a.box.y - dst.box.y);
  for (const s of cand) if (dd(s) < dd(src)) src = s;
  const sb = this.unionBounds(src.items);
  c.shape = "arrow";
  const u = {
    x: sb.x + Math.min(sb.w * 0.45, 70) + rand(-8, 8),
    y: sb.y + Math.min(sb.h * 0.45, 30) + rand(-4, 4),
  };
  yield* this.moveTo(c, u);
  yield* this.click(c);
  c.ov = () => [
    { t: "box", b: sb, handles: true, badge: `${Math.round(sb.w)} × ${Math.round(sb.h)}` },
  ];
  yield* this.wait(rand(0.15, 0.3));
  c.shape = "dup";
  yield* this.wait(0.12);
  c.press = 1;
  const ox = src.box.x - dst.box.x;
  const oy = src.box.y - dst.box.y;
  for (const it of dst.items) {
    it.vis = true;
    it.mode = "master";
    it.dx = ox;
    it.dy = oy;
    if (it.kind === "rect" || it.kind === "image") {
      it.styled = true;
      it.draw = null;
    }
    if (it.kind === "line") {
      it.placed = it.pts.length;
    }
    bump(it);
  }
  const m = { x: u.x - ox, y: u.y - oy };
  c.ov = () => {
    const cb = this.unionBounds(dst.items);
    const h = [
      { t: "box", b: sb, color: "red" },
      { t: "box", b: cb, color: "red" },
    ];
    const sp = this.spacing(sb, cb);
    if (sp) h.push(sp);
    return h;
  };
  yield* this.moveTo(c, m, {
    speed: 0.6,
    drag: true,
    onStep: () => {
      for (const it of dst.items) {
        it.dx = ox + (c.x - u.x);
        it.dy = oy + (c.y - u.y);
        bump(it);
      }
    },
  });
  this.sfxPlace("dup", dst.items[0], this.unionBounds(dst.items));
  for (const it of dst.items) {
    it.dx = 0;
    it.dy = 0;
    it.settle = true;
    if (!it.editTask) it.mode = "own";
    if (it.kind === "text" && it.mode === "own") it.shown = it.total;
    bump(it);
  }
  yield* this.wait(0.1);
  c.shape = "arrow";
  c.ov = () => {
    const cb = this.unionBounds(dst.items);
    return [
      { t: "box", b: cb, handles: true, badge: `${Math.round(cb.w)} × ${Math.round(cb.h)}` },
    ];
  };
  yield* this.wait(0.35);
  for (const it of dst.items)
    if (!it.editTask) {
      it.done = true;
      bump(it);
    }
}

export function spacing(a, b) {
  const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  if (oy > 0) {
    const y = Math.max(a.y, b.y) + oy / 2;
    const [l, r] = a.x < b.x ? [a, b] : [b, a];
    const gap = r.x - (l.x + l.w);
    if (gap > 0)
      return {
        t: "measure",
        a: { x: l.x + l.w, y },
        b: { x: r.x, y },
        label: String(Math.round(gap)),
      };
  } else if (ox > 0) {
    const x = Math.max(a.x, b.x) + ox / 2;
    const [t, btm] = a.y < b.y ? [a, b] : [b, a];
    const gap = btm.y - (t.y + t.h);
    if (gap > 0)
      return {
        t: "measure",
        a: { x, y: t.y + t.h },
        b: { x, y: btm.y },
        label: String(Math.round(gap)),
      };
  }
  return null;
}

export function* editText(c, it) {
  c.shape = "arrow";
  const b = this.bounds(it);
  yield* this.moveTo(c, {
    x: b.x + Math.min(b.w * 0.5, 50) + rand(-5, 5),
    y: b.y + Math.min(it.lh, b.h) * 0.55,
  });
  yield* this.click(c);
  yield* this.wait(0.08);
  yield* this.click(c);
  it.selAll = true;
  it.editing = true;
  bump(it);
  c.shape = "ibeam";
  c.ov = () => [{ t: "box", b: this.bounds(it) }];
  yield* this.wait(rand(0.2, 0.35));
  it.mode = "own";
  it.selAll = false;
  it.shown = 0;
  bump(it);
  yield* this.type(it, c);
  yield* this.wait(0.12);
  it.editing = false;
  bump(it);
  c.shape = "arrow";
  c.ov = () => [this.selection(it)];
  this.sfxPlace("edit", it);
  yield* this.wait(0.3);
  c.ov = null;
  it.done = true;
  bump(it);
}

export function* restyle(c, it) {
  c.shape = "arrow";
  const b = this.bounds(it);
  yield* this.moveTo(c, {
    x: b.x + Math.min(b.w * 0.5, 60) + rand(-6, 6),
    y: b.y + Math.min(b.h * 0.5, 30) + rand(-4, 4),
  });
  yield* this.click(c);
  c.ov = () => [this.selection(it)];
  yield* this.wait(rand(0.15, 0.3));
  it.mode = "own";
  bump(it);
  this.sfxPlace(it.kind === "image" ? "image" : "restyle", it);
  yield* this.wait(0.4);
  c.ov = null;
  it.done = true;
  bump(it);
}

export function attachPrimitives(EngineClass) {
  Object.assign(EngineClass.prototype, {
    wait,
    moveTo,
    click,
    type,
    idle,
    leave,
    run,
    dragEnd,
    drawBox,
    drawLine,
    drawText,
    dragGuide,
    duplicate,
    spacing,
    editText,
    restyle,
  });
}
