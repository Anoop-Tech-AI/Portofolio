/**
 * Swarm Rebuild - Swarm Multi-Agent Engine and Kinematics
 * Tribute to Joel Califa (https://califa.github.io/swarm-site/)
 * Adapted from Dhvanil Patel (https://github.com/DhvanilPatel/swarm-cursors)
 */

import {
  NAMES,
  COLORS,
  MIN_AGENTS,
  MAX_AGENTS,
  FLOCK_AGENTS,
  INTRO_AGENTS,
  rand,
  clamp,
} from "../core/constants.js";
import { attachPrimitives } from "./primitives.js";

export class Engine {
  constructor(view) {
    this.view = view;
    this.vp = view.vp;
    this.items = null;
    this.tasks = [];
    this.groups = [];
    this.guides = [];
    this.editLines = new Set();
    this.cursors = [];
    this.started = false;
    this.ready = false;
    this.frontier = 0;
    this.vel = 0;
    this.tempo = 1.5;
    this.speed = 1.5;
    this.time = 0;
    this.rulers = { want: 0, t: 0, lastNeed: -10 };
    this.lastScroll = null;
    this.nextId = 0;
    this.spawnCooldown = 0;
    this.flocking = false;
    this.lastT = null;
    this.tv = { x: 0, y: 0 };
    this.mouse = null;
    this.retired = 0;
    this.doneCount = 0;
    this.waitCount = 0;
    const vp = this.vp;
    for (let n = 0; n < INTRO_AGENTS; n++) {
      const side = n % 2 === 0;
      const p = this.fromViewport(
        side ? vp.ox - 40 - rand(0, 200) : vp.ox + vp.vw + 40 + rand(0, 200),
        vp.oy + rand(0.05, 0.95) * vp.vh
      );
      const c = this.makeCursor(p.x, p.y, n < MIN_AGENTS);
      c.follow = true;
      this.cursors.push(c);
    }
  }

  setModel(m) {
    this.items = m.items;
    this.tasks = m.tasks;
    this.groups = m.groups;
    this.guides = m.guides;
    this.guideDeps = new Map(m.guides.map((g) => [g, g.deps || []]));
    this.waitCount = m.tasks.length;
    this.ready = true;
  }

  makeCursor(x, y, home = false) {
    const id = this.nextId++;
    const fast = Math.random() < 0.25;
    return {
      id,
      x,
      y,
      home,
      name: NAMES[id % NAMES.length],
      color: COLORS[id % COLORS.length],
      shape: "arrow",
      press: 0,
      task: null,
      gen: null,
      ov: null,
      idleFor: 0,
      leaving: false,
      worked: false,
      sticky: false,
      vx: 0,
      vy: 0,
      angle: 0,
      speed: fast ? rand(1000, 1500) : rand(300, 750),
      force: fast ? rand(3500, 6000) : rand(700, 1800),
      spin: fast ? rand(2.2, 3.4) : rand(0.8, 1.8),
      curl: rand(-1, 1),
      orbit: rand(70, 170),
      follow: false,
      trail: [],
      showName: false,
    };
  }

  get viewTop() {
    return this.vp.sy;
  }

  get viewBot() {
    return this.vp.sy + this.vp.vh;
  }

  fromViewport(x, y) {
    const vp = this.vp;
    return { x: x - vp.ox + vp.sx, y: y - vp.oy + vp.sy };
  }

  taskY(t) {
    return t.layer === "world" ? t.y : this.viewTop + t.y;
  }

  scr(c) {
    const vp = this.vp;
    return c.sticky
      ? { x: c.x, y: c.y }
      : { x: c.x - vp.sx + vp.ox, y: c.y - vp.sy + vp.oy };
  }

  sfxPlace(kind, it, b) {
    if (!this.sfx) return;
    const vp = this.vp;
    b = b || this.bounds(it);
    let x = b.x + b.w / 2;
    let y = b.y + b.h / 2;
    if (!it || it.layer === "world") {
      x += vp.ox - vp.sx;
      y += vp.oy - vp.sy;
    }
    this.sfx.place(kind, x, y, b.w, b.h, vp.vw, vp.vh, (it && it.fs) || 0);
  }

  start() {
    if (this.started || !this.ready) return;
    this.started = true;
    this.startTime = this.time;
    for (const c of this.cursors) {
      c.follow = false;
      c.gen = null;
      c.angle = ((((c.angle + 180) % 360) + 360) % 360) - 180;
    }
    if (this.sfx) this.sfx.start();
    if (this.onStart) this.onStart();
  }

  bounds(it) {
    if (it.kind === "text") {
      let h = it.tb.h;
      if (it.editing && !it.selAll && it.total) {
        const lines = Math.max(1, Math.round(it.tb.h / it.lh));
        h = Math.min(
          it.tb.h,
          Math.max(it.lh, Math.ceil((it.shown / it.total) * lines) * it.lh)
        );
      }
      const s = it.scale;
      const ax =
        it.align === "center"
          ? (it.tb.w * (1 - s)) / 2
          : it.align === "right" || it.align === "end"
          ? it.tb.w * (1 - s)
          : 0;
      return { x: it.tb.x + it.dx + ax, y: it.tb.y + it.dy, w: it.tb.w * s, h: h * s };
    }
    if (it.kind === "line") {
      return { x: it.x + it.dx, y: it.y + it.dy, w: it.w, h: it.h };
    }
    return {
      x: it.x + it.dx,
      y: it.y + it.dy,
      w: it.draw ? it.draw.w : it.w,
      h: it.draw ? it.draw.h : it.h,
    };
  }

  unionBounds(list) {
    const bs = list.map((it) => this.bounds(it));
    const x = Math.min(...bs.map((b) => b.x));
    const y = Math.min(...bs.map((b) => b.y));
    return {
      x,
      y,
      w: Math.max(...bs.map((b) => b.x + b.w)) - x,
      h: Math.max(...bs.map((b) => b.y + b.h)) - y,
    };
  }

  underline(it, b) {
    return {
      x: b.x,
      y: b.y + (it.lh * 0.5 + it.fs * 0.42) * it.scale,
      w: Math.min(b.w, it.tb.w * it.scale),
      h: 0,
    };
  }

  selection(it, extra) {
    const b = this.bounds(it);
    return Object.assign(
      {
        t: "box",
        b,
        handles: true,
        badge: `${Math.round(b.w)} × ${Math.round(b.h)}`,
        rulerLines: true,
        underline: it.kind === "text" ? this.underline(it, b) : undefined,
      },
      extra
    );
  }

  available() {
    const out = [];
    for (const t of this.tasks) {
      if (t.state !== "wait") continue;
      if (t.layer === "world" && t.gate > this.frontier) continue;
      let ok = true;
      for (const d of t.deps)
        if (d.state !== "done") {
          ok = false;
          break;
        }
      if (ok) out.push(t);
    }
    return out;
  }

  pick(c, list) {
    let best = null;
    let bestS = Infinity;
    const top = this.viewTop - 40;
    const bot = this.viewBot;
    const cy = c.sticky ? c.y + this.viewTop : c.y;
    for (const t of list) {
      const y = this.taskY(t);
      const u = y >= top && y <= bot ? 0 : y < top ? 1 : 2;
      const s =
        u * 1e6 +
        (u === 1 ? top - y : y) * 0.6 +
        Math.abs(y - cy) * 0.4 -
        (t.spec.type === "guide" ? 5e5 : 0);
      if (s < bestS) {
        bestS = s;
        best = t;
      }
    }
    return best;
  }

  backlog() {
    let n = 0;
    for (const t of this.tasks)
      if (t.state !== "done" && (t.layer !== "world" || t.gate <= this.frontier)) n++;
    return n;
  }

  step(dt) {
    dt = Math.min(dt, 0.05);
    this.time += dt;
    const vp = (this.vp = this.view.vp);
    const sv =
      Math.abs(vp.sy - (this.lastScroll == null ? vp.sy : this.lastScroll)) /
      Math.max(dt, 0.001);
    this.lastScroll = vp.sy;
    this.vel = Math.max(this.vel * Math.exp(-dt * 1.2), this.vel * 0.7 + sv * 0.3);
    if (this.started) this.frontier = Math.max(this.frontier, this.viewBot);
    const avail = this.started ? this.available() : [];
    this.tempo =
      clamp(
        2.1 +
          this.vel / 900 +
          (avail.length / Math.max(1, this.cursors.length)) * 0.5,
        2.1,
        4.5
      ) * this.speed;

    if (this.rulers.want > 0) this.rulers.lastNeed = this.time;
    const rt = this.time - this.rulers.lastNeed < 0.7 ? 1 : 0;
    this.rulers.t += (rt - this.rulers.t) * Math.min(1, dt * 10);
    if (Math.abs(rt - this.rulers.t) < 0.002) this.rulers.t = rt;

    for (const g of this.guides) {
      if (!g.vis) continue;
      if (g.flash > 0) g.flash = Math.max(0, g.flash - dt * 1.5);
      const deps = this.guideDeps.get(g) || [];
      if (g.shownAt == null) g.shownAt = this.time;
      if (
        !g.dragging &&
        g.op > 0 &&
        this.time - g.shownAt > 7 &&
        !deps.some((t) => t.state === "active")
      )
        g.op = Math.max(0, g.op - dt * 1.2);
      else if (!g.dragging && deps.every((t) => t.state === "done")) {
        const last = Math.max(0, ...deps.map((t) => t.doneAt));
        if (this.time - last > 1.2 && g.op > 0) g.op = Math.max(0, g.op - dt * 1.2);
      }
    }

    if (!this.flocking && this.started && this.waitCount === 0) {
      for (const c of this.cursors)
        if (!c.task && !c.follow) {
          c.follow = true;
          c.gen = null;
          c.leaving = false;
          c.ov = null;
          c.shape = "arrow";
        }
      if (this.cursors.every((c) => c.follow)) {
        this.flocking = true;
        this.endTime = this.time;
        if (this.onComplete) this.onComplete();
      }
    }
    if (this.flocking) {
      this.flock(dt);
      return;
    }
    if (!this.started) {
      const center = this.fromViewport(vp.ox + vp.vw / 2, vp.oy + vp.vh / 2);
      if (this.follow(dt, this.cursors, center, 0.7) && this.ready) this.start();
      return;
    }
    if (this.cursors.some((c) => c.follow))
      this.follow(
        dt,
        this.cursors.filter((c) => c.follow)
      );

    this.spawnCooldown -= dt;
    const want = clamp(
      MIN_AGENTS + Math.floor(this.vel / 40) + Math.floor(avail.length / 2),
      MIN_AGENTS,
      MAX_AGENTS
    );
    const active = this.cursors.filter((c) => !c.leaving).length;
    const busy = this.cursors.filter((c) => c.task).length;
    if (active < want && avail.length > active - busy && this.spawnCooldown <= 0) {
      const left = Math.random() < 0.5;
      const p = this.fromViewport(
        left ? vp.ox - 40 : vp.ox + vp.vw + 40,
        vp.oy + rand(0.2, 0.8) * vp.vh
      );
      this.cursors.push(this.makeCursor(p.x, p.y));
      this.spawnCooldown = 0.035;
    }

    for (const c of this.cursors) {
      if (c.task || c.leaving || c.follow) continue;
      const t = this.pick(c, avail);
      if (!t) continue;
      avail.splice(avail.indexOf(t), 1);
      t.state = "active";
      this.waitCount--;
      c.task = t;
      c.worked = true;
      c.idleFor = 0;
      if (t.layer !== "world") {
        c.sticky = true;
        c.x += vp.ox - vp.sx;
        c.y += vp.oy - vp.sy;
      }
      c.gen = this.run(c, t);
    }

    for (const c of [...this.cursors]) {
      if (c.follow) continue;
      c.press = Math.max(0, c.press - dt * 6);
      if (c.angle !== 0)
        c.angle = Math.abs(c.angle) < 0.5 ? 0 : c.angle * (1 - Math.min(1, dt * 10));
      if (!c.task) {
        c.idleFor += dt;
        if (
          !c.leaving &&
          c.idleFor > 2.5 &&
          this.cursors.filter((m) => !m.leaving).length > MIN_AGENTS &&
          !c.home
        ) {
          c.leaving = true;
          c.gen = this.leave(c);
        }
        if (!c.gen) c.gen = this.idle(c);
      }
      if (c.gen.next(dt).done) {
        if (c.task) {
          c.task.state = "done";
          c.task.doneAt = this.time;
          this.doneCount++;
          c.task = null;
          c.ov = null;
          if (c.sticky) {
            c.sticky = false;
            c.x -= vp.ox - vp.sx;
            c.y -= vp.oy - vp.sy;
          }
          c.shape = "arrow";
        }
        c.gen = null;
        if (c.leaving) {
          if (c.worked) this.retired++;
          this.cursors.splice(this.cursors.indexOf(c), 1);
        }
      }
    }

    for (const c of this.cursors) {
      if (!c.trail) c.trail = [];
      const speed = Math.hypot(c.vx, c.vy);
      if (speed > 50 || c.task) {
        c.trail.push({ x: c.x, y: c.y, t: this.time });
      }
      if (c.trail.length > 5) c.trail.shift();
      c.trail = c.trail.filter((p) => this.time - p.t < 0.22);

      if (this.mouse) {
        const m = this.fromViewport(this.mouse.x, this.mouse.y);
        const d = Math.hypot(c.x - m.x, c.y - m.y);
        c.showName = d < 90 || this.flocking || !this.started;
      } else {
        c.showName = this.flocking || !this.started;
      }
    }
  }

  flockTarget() {
    if (this.mouse) return this.fromViewport(this.mouse.x, this.mouse.y);
    const t = this.time;
    const vp = this.vp;
    return this.fromViewport(
      vp.ox + vp.vw * (0.5 + 0.28 * Math.sin(t * 0.37)),
      vp.oy + vp.vh * (0.5 + 0.25 * Math.sin(t * 0.53 + 1))
    );
  }

  flock(dt) {
    this.spawnCooldown -= dt;
    if (
      this.cursors.length < FLOCK_AGENTS &&
      this.spawnCooldown <= 0 &&
      !this.releasing
    ) {
      const vp = this.vp;
      const left = Math.random() < 0.5;
      const p = this.fromViewport(
        left ? vp.ox - 30 : vp.ox + vp.vw + 30,
        vp.oy + rand(0.1, 0.9) * vp.vh
      );
      const c = this.makeCursor(p.x, p.y);
      c.follow = true;
      this.cursors.push(c);
      this.spawnCooldown = 0.04;
    }
    if (this.releasing) {
      for (const c of [...this.cursors]) {
        if (!c.gen) c.gen = this.leave(c);
        if (c.gen.next(dt).done) this.cursors.splice(this.cursors.indexOf(c), 1);
      }
      return;
    }
    this.follow(dt, this.cursors);
  }

  follow(dt, list, target, scale = 1) {
    const m = this.mouse ? this.fromViewport(this.mouse.x, this.mouse.y) : null;
    const o = target || this.flockTarget();
    const time = this.time;
    if (m && this.lastT && dt > 0) {
      const k = Math.min(1, dt * 18);
      this.tv.x += ((m.x - this.lastT.x) / dt - this.tv.x) * k;
      this.tv.y += ((m.y - this.lastT.y) / dt - this.tv.y) * k;
    }
    this.lastT = m;
    const R = 135 * scale * (1 + 0.18 * Math.sin(time * 0.55));
    const swirl = Math.tanh(Math.cos(time * 0.11) * 3);
    const want = [];
    for (const c of list) {
      const vx = c.x - o.x;
      const vy = c.y - o.y;
      const d = Math.hypot(vx, vy) || 0.01;
      const nx = vx / d;
      const ny = vy / d;
      const ang = Math.atan2(vy, vx);
      const off = (c.orbit - 120) * 0.55 * scale;
      const rr = R * (1 + 0.3 * Math.sin(3 * ang + time * 0.7)) + off;
      const tang = 300 * (0.7 + c.spin * 0.2) * swirl;
      const rad = clamp((rr - d) * 4, -2600, 1400);
      const far = Math.min(1, Math.max(0, (d - rr) / 600));
      want.push([
        -ny * tang + nx * rad - ny * c.curl * 400 * far,
        nx * tang + ny * rad + nx * c.curl * 400 * far,
      ]);
    }
    for (let i = 0; i < list.length; i++) {
      const c = list[i];
      let ax = 0;
      let ay = 0;
      let wsum = 0;
      for (let j = 0; j < list.length; j++) {
        if (j === i) continue;
        const q = list[j];
        const d = Math.hypot(q.x - c.x, q.y - c.y);
        if (d > 90) continue;
        const w = 1 - d / 90;
        ax += q.vx * w;
        ay += q.vy * w;
        wsum += w;
      }
      let [fx, fy] = want[i];
      if (wsum > 0) {
        fx = fx * 0.7 + (ax / wsum) * 0.3;
        fy = fy * 0.7 + (ay / wsum) * 0.3;
      }
      const dist = Math.max(0, Math.hypot(c.x - o.x, c.y - o.y) - 180 * scale);
      const maxV = c.speed * (1.3 + Math.min(3.2, dist / 90));
      const L = Math.hypot(fx, fy);
      if (L > maxV) {
        fx *= maxV / L;
        fy *= maxV / L;
      }
      let gx = (fx - c.vx) * 6;
      let gy = (fy - c.vy) * 6;
      const maxF = c.force * (1.4 + Math.min(5, dist / 50));
      const G = Math.hypot(gx, gy);
      if (G > maxF) {
        gx *= maxF / G;
        gy *= maxF / G;
      }
      c.vx += gx * dt;
      c.vy += gy * dt;
      c.x += c.vx * dt;
      c.y += c.vy * dt;
    }
    const R0 = 48;
    let touched = false;
    if (m)
      for (const c of list) {
        const vx = c.x - m.x;
        const vy = c.y - m.y;
        const d = Math.hypot(vx, vy) || 0.01;
        if (d >= R0) continue;
        touched = true;
        const nx = vx / d;
        const ny = vy / d;
        c.x = m.x + nx * R0;
        c.y = m.y + ny * R0;
        const rel = (c.vx - this.tv.x) * nx + (c.vy - this.tv.y) * ny;
        if (rel < 0) {
          c.vx -= nx * rel * 1.6;
          c.vy -= ny * rel * 1.6;
        }
        c.vx += nx * 260;
        c.vy += ny * 260;
      }
    for (const c of list) {
      if (Math.hypot(c.vx, c.vy) < 30) continue;
      const d =
        ((((Math.atan2(c.vy, c.vx) * 180) / Math.PI + 128 - c.angle + 540) % 360) + 360) %
          360 -
        180;
      c.angle += d * Math.min(1, dt * 8);
      c.press = Math.max(0, c.press - dt * 6);
    }
    return touched;
  }
}

attachPrimitives(Engine);

