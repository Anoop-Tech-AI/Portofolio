/**
 * Swarm Rebuild - Procedural Web Audio API Synthesizer
 * Tribute to Joel Califa (https://califa.github.io/swarm-site/)
 * Adapted from Dhvanil Patel (https://github.com/DhvanilPatel/swarm-cursors)
 */

import { clamp, rand } from "../core/constants.js";

// A glass piano in E. Every finished piece of the page plays one note of the
// E major pentatonic, quantized to a soft 16th-note grid, so a busy swarm comes
// out as a generative melody: big sections low, small things high, pitch rising
// left to right, panned to where the cursor is. Typing and clicks are quiet
// paper ticks underneath. All synthesized; no audio files.
export const PENTA = [0, 2, 4, 7, 9]; // E F# G# B C#
export const E2 = 40;
export const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
export let soundPref = true;

export const SPK_ICON =
  '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6v4h2.5l3.5 3V3L5 6z" fill="currentColor"/>';

export class Sound {
  constructor() {
    this.on = soundPref;
    this.ctx = null;
    this.bpm = 104;
    this.slots = new Map();
    this.lastKey = new Map();
    this.keyTimes = [];
    this.pressTimes = [];
    this.ends = []; // when each sounding piano voice dies out
    this.fakeNow = null; // offline renders drive the clock explicitly
  }

  init(offline) {
    if (this.ctx) return true;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      this.ctx = offline || new Ctx({ latencyHint: "interactive" });
    } catch (_) {
      return false;
    }
    const ctx = this.ctx;
    const out = ctx.createGain();
    out.gain.value = this.on ? 1 : 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 14;
    comp.ratio.value = 5;
    comp.attack.value = 0.003;
    comp.release.value = 0.3;
    const master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(comp);
    comp.connect(out);
    out.connect(ctx.destination);
    const verb = ctx.createConvolver();
    verb.buffer = this.impulse(3.2, 2.4);
    const wet = ctx.createGain();
    wet.gain.value = 0.5;
    verb.connect(wet);
    wet.connect(master);
    this.out = out;
    this.master = master;
    this.verb = verb;
    this.noiseBuf = this.noise(1.5);
    this.t0 = this.now();
    return true;
  }

  now() {
    return this.fakeNow != null ? this.fakeNow : this.ctx.currentTime;
  }

  // Generated room: decaying stereo noise, darkened as it rings out.
  impulse(secs, decay) {
    const sr = this.ctx.sampleRate;
    const n = Math.floor(sr * secs);
    const b = this.ctx.createBuffer(2, n, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch);
      let lp = 0;
      for (let i = 0; i < n; i++) {
        const k = i / n;
        const a = 0.55 - 0.4 * k;
        lp += a * (Math.random() * 2 - 1 - lp);
        d[i] = lp * Math.pow(1 - k, decay) * (i < sr * 0.012 ? i / (sr * 0.012) : 1);
      }
    }
    return b;
  }

  noise(secs) {
    const sr = this.ctx.sampleRate;
    const b = this.ctx.createBuffer(1, Math.floor(sr * secs), sr);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }

  setOn(on) {
    this.on = soundPref = on;
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.out.gain.cancelScheduledValues(t);
    this.out.gain.setTargetAtTime(on ? 1 : 0, t, 0.05);
    if (on) this.resume();
  }

  resume() {
    if (this.ctx && this.ctx.state === "suspended" && this.ctx.resume) {
      this.ctx.resume().catch(() => {});
    }
  }

  get blocked() {
    return !!this.ctx && this.ctx.state !== "running" && this.fakeNow == null;
  }

  log(fn, args) {
    if (Array.isArray(window.__swarmSfxLog)) {
      window.__swarmSfxLog.push({ t: performance.now() / 1000, fn, args });
    }
  }

  ready() {
    return this.ctx && this.on && (this.fakeNow != null || this.ctx.state === "running");
  }

  grid(div = 4) {
    const step = 60 / this.bpm / div;
    const now = this.now() + 0.015;
    const k = Math.ceil((now - this.t0) / step);
    return { when: this.t0 + k * step, slot: `${div}:${k}` };
  }

  pan(x, vw) {
    return clamp((x / Math.max(1, vw)) * 1.6 - 0.8, -0.8, 0.8);
  }

  bus(when, pan, send) {
    const g = this.ctx.createGain();
    const p = this.ctx.createStereoPanner();
    p.pan.setValueAtTime(pan, when);
    g.connect(p);
    p.connect(this.master);
    if (send) {
      const s = this.ctx.createGain();
      s.gain.value = send;
      p.connect(s);
      s.connect(this.verb);
    }
    return g;
  }

  piano(midi, when, vel, pan, ring = 2.4) {
    const now = this.now();
    this.ends = this.ends.filter((e) => e > now);
    if (this.ends.length >= 28) return;
    const ctx = this.ctx;
    const f = mtof(midi);
    const v = this.bus(when, pan, 0.85);
    v.gain.value = 0.3 * vel;
    const hi = f > 900;
    const parts = [
      [1, 1, 1],
      [2, 0.38, 0.55],
      [3, 0.12, 0.32],
      [2.756, 0.16, 0.42],
      [5.4, 0.05, 0.16],
    ];
    let last = null;
    for (const [r, a, d] of parts) {
      if (f * r > 15000) continue;
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f * r * (1 + (Math.random() - 0.5) * 0.002);
      const g = ctx.createGain();
      const dec = ring * d * (hi ? 0.65 : 1);
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(a, when + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0006, when + dec);
      o.connect(g);
      g.connect(v);
      o.start(when);
      o.stop(when + dec + 0.05);
      last = o;
    }
    this.hammer(when, v, f, 0.5);
    this.ends.push(when + ring * (hi ? 0.65 : 1));
    if (last) last.onended = () => v.disconnect();
  }

  hammer(when, dest, f, amt) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = Math.min(9000, f * 4 + 1200);
    bp.Q.value = 1.2;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(0.25 * amt, when + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0005, when + 0.03);
    src.connect(bp);
    bp.connect(g);
    g.connect(dest);
    src.start(when, Math.random());
    src.stop(when + 0.05);
  }

  tick(when, pan, freq, q, vel, len) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = freq;
    bp.Q.value = q;
    const g = this.bus(when, pan, 0.06);
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vel, when + 0.0008);
    g.gain.exponentialRampToValueAtTime(0.0004, when + len);
    src.connect(bp);
    bp.connect(g);
    src.start(when, Math.random() * 1.2);
    src.stop(when + len + 0.02);
    src.onended = () => g.disconnect();
  }

  clack(when, pan, space, vel = 1) {
    this.tick(when, pan, rand(3600, 5600), 2.2, rand(0.2, 0.3) * vel, rand(0.006, 0.011));
    this.tick(
      when + rand(0.001, 0.005),
      pan,
      space ? rand(380, 560) : rand(850, 1500),
      1.6,
      (space ? 0.26 : rand(0.13, 0.2)) * vel,
      space ? 0.065 : rand(0.025, 0.042)
    );
  }

  key(x, vw, id, n = 1, space = 0) {
    this.log("key", [x, vw, id, n, space]);
    if (!this.ready()) return;
    const t = this.now();
    if (t - (this.lastKey.get(id) || -1) < 0.024) return;
    this.keyTimes = this.keyTimes.filter((k) => t - k < 1);
    if (this.keyTimes.length > 80) return;
    this.lastKey.set(id, t);
    const pan = this.pan(x, vw);
    let at = t + 0.004;
    for (let k = 0; k < Math.min(n, 3) && this.keyTimes.length <= 80; k++) {
      this.keyTimes.push(t);
      this.clack(at, pan, space && k === 0, rand(0.75, 1));
      at += rand(0.018, 0.032);
    }
  }

  press(x, vw) {
    this.log("press", [x, vw]);
    if (!this.ready()) return;
    const t = this.now();
    this.pressTimes = this.pressTimes.filter((k) => t - k < 1);
    if (this.pressTimes.length > 40) return;
    this.pressTimes.push(t);
    const pan = this.pan(x, vw);
    this.tick(t + 0.004, pan, rand(2100, 2700), 4, 0.32, 0.012);
    this.tick(t + 0.005, pan, rand(650, 850), 2, 0.16, 0.022);
    this.tick(t + rand(0.055, 0.075), pan, rand(2900, 3400), 4, 0.15, 0.008);
  }

  place(kind, x, y, w, h, vw, vh, fs) {
    this.log("place", [kind, x, y, w, h, vw, vh, fs]);
    if (!this.ready()) return;
    if (kind === "text" || kind === "edit" || kind === "line") return;
    const area = (w * h) / Math.max(1, vw * vh);
    let oct;
    if (kind === "text") oct = fs >= 40 ? 2 : fs >= 22 ? 3 : 4;
    else if (kind === "guide") oct = 5;
    else oct = area > 0.08 ? 1 : area > 0.015 ? 2 : area > 0.002 ? 3 : 4;
    const deg = Math.floor(clamp(x / Math.max(1, vw), 0, 0.999) * 5);
    const midi = E2 + oct * 12 + PENTA[deg];
    const { when, slot } = this.grid(2);
    const seen = this.slots.get(slot) || [];
    if (seen.length >= 1) return;
    seen.push(midi);
    this.slots.set(slot, seen);
    if (this.slots.size > 64) this.slots.delete(this.slots.keys().next().value);
    const off = y < -40 || y > vh + 40 ? 0.45 : 1;
    const pan = this.pan(x, vw);
    const vel =
      ({ rect: 0.55, image: 0.5, dup: 0.5, guide: 0.3, restyle: 0.34 }[kind] || 0.4) * 0.42;
    const ring = oct <= 1 ? 3.6 : oct >= 4 ? 1.6 : 2.4;
    this.piano(midi, when, vel * off, pan, ring);
    if (kind === "image")
      this.piano(
        midi + ((PENTA[(deg + 2) % 5] - PENTA[deg] + 12) % 12),
        when + 0.04,
        vel * 0.6 * off,
        pan,
        ring
      );
    if (kind === "dup")
      this.piano(E2 + 12 + (deg % 2 ? 7 : 0), when, 0.15 * off, pan * 0.5, 2.8);
  }

  grow(step, x, vw) {
    this.log("grow", [step, x, vw]);
    if (!this.ready()) return;
    const t = this.now() + 0.004;
    this.tick(t, this.pan(x, vw), 2400 + step * 260, 5, 0.12, 0.01);
  }

  snap(x, vw) {
    this.log("snap", [x, vw]);
    if (!this.ready()) return;
    const t = this.now() + 0.004;
    const pan = this.pan(x, vw);
    this.tick(t, pan, 4800, 3, 0.36, 0.012);
    this.tick(t + 0.002, pan, 1200, 2, 0.2, 0.03);
  }

  intro() {
    this.log("intro", []);
    if (!this.ready()) return;
    const ctx = this.ctx;
    const t = this.now() + 0.02;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 0.8;
    bp.frequency.setValueAtTime(260, t);
    bp.frequency.exponentialRampToValueAtTime(2400, t + 0.9);
    bp.frequency.exponentialRampToValueAtTime(900, t + 1.8);
    const g = this.bus(t, 0, 0.6);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.16, t + 0.7);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 2.2);
    src.connect(bp);
    bp.connect(g);
    src.start(t);
    src.stop(t + 2.3);
    src.onended = () => g.disconnect();
    for (const [m, d] of [
      [E2, 0],
      [E2 + 7, 0.08],
      [E2 + 12, 0.16],
    ])
      this.pad(m, t + 0.3 + d, 0.07, 2.6);
  }

  pad(midi, when, vel, len) {
    const ctx = this.ctx;
    const g = this.bus(when, 0, 0.9);
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vel, when + len * 0.4);
    g.gain.exponentialRampToValueAtTime(0.0005, when + len);
    for (const det of [-4, 4]) {
      const o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = mtof(midi);
      o.detune.value = det;
      o.connect(g);
      o.start(when);
      o.stop(when + len + 0.05);
    }
  }

  start() {
    this.log("start", []);
    if (!this.ready()) return;
    const { when } = this.grid(4);
    const step = 60 / this.bpm / 4;
    [E2 + 24, E2 + 28, E2 + 31, E2 + 36, E2 + 40].forEach((m, i) =>
      this.piano(m, when + i * step, 0.2, -0.5 + i * 0.25, 2)
    );
  }

  finale() {
    this.log("finale", []);
    if (!this.ready()) return;
    const { when } = this.grid(2);
    const chord = [
      E2,
      E2 + 7,
      E2 + 12,
      E2 + 16,
      E2 + 19,
      E2 + 26,
      E2 + 28,
      E2 + 31,
      E2 + 36,
      E2 + 43,
    ];
    chord.forEach((m, i) =>
      this.piano(
        m,
        when + i * 0.035,
        0.34 - i * 0.015,
        -0.6 + (i / chord.length) * 1.2,
        5.5
      )
    );
    this.pad(E2 + 12, when, 0.05, 5);
  }

  release() {
    this.log("release", []);
    if (!this.ready()) return;
    const ctx = this.ctx;
    const t = this.now() + 0.01;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1;
    bp.frequency.setValueAtTime(3000, t);
    bp.frequency.exponentialRampToValueAtTime(220, t + 1);
    const g = this.bus(t, 0, 0.5);
    g.gain.setValueAtTime(0.12, t);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 1.1);
    src.connect(bp);
    bp.connect(g);
    src.start(t);
    src.stop(t + 1.2);
    this.piano(E2 + 12, t + 0.05, 0.3, 0, 2.5);
  }

  close(after = 0) {
    if (!this.ctx || this.fakeNow != null) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this.out.gain.cancelScheduledValues(t);
    this.out.gain.setValueAtTime(this.out.gain.value, t);
    this.out.gain.linearRampToValueAtTime(0, t + Math.max(0.05, after));
    setTimeout(() => ctx.close().catch(() => {}), (after + 0.2) * 1000);
  }
}

