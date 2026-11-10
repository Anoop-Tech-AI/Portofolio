/**
 * Swarm Rebuild - Application Controller and Orchestrator
 * Tribute to Joel Califa (https://califa.github.io/swarm-site/)
 * Adapted from Dhvanil Patel (https://github.com/DhvanilPatel/swarm-cursors)
 */

import { sleep, nextFrame, MIN_AGENTS } from "../core/constants.js";
import { detectEnv } from "../core/env.js";
import { captureModel } from "../capture/captureModel.js";
import { Sound, SPK_ICON } from "../audio/Sound.js";
import { View } from "./View.js";
import { Engine } from "../engine/Engine.js";

let lastShot = null;

export function getLastShot() {
  return lastShot;
}

export function setLastShot(shot) {
  lastShot = shot;
}

// background.js may have hidden everything but media for its screenshot;
// put the page back once our canvas covers it (or if we bail out early).
export async function unhidePage() {
  if (!window.__swarmHidden) return;
  window.__swarmHidden = false;
  try {
    if (
      typeof chrome !== "undefined" &&
      chrome.runtime &&
      chrome.runtime.sendMessage
    ) {
      await chrome.runtime.sendMessage({ type: "swarm:unhide" });
    }
  } catch (_) {}
  if (typeof window.__swarmUnhide === "function") {
    try {
      window.__swarmUnhide();
    } catch (_) {}
  }
  await nextFrame();
}

export class App {
  constructor(callbacks = {}) {
    this.dead = false;
    this.t0 = performance.now();
    this.tour = true;
    this.tourV = 0;
    this.tourAcc = 0;
    this.speeds = [1.5, 2, 3];
    this.speedIx = 0;
    this.complete = false;
    this.timing = {};
    this.callbacks = callbacks;
  }

  async loadShot() {
    let src = window.__swarmShot;
    window.__swarmShot = null;
    if (src) lastShot = { src, at: this.env.geom() };
    else if (lastShot) src = lastShot.src;
    if (!src) return null;
    const img = new Image();
    img.src = src;
    try {
      await img.decode();
    } catch (_) {
      return null;
    }
    const g = lastShot && lastShot.src === src ? lastShot.at : this.env.geom();
    return {
      img,
      sx: g.sx,
      sy: g.sy,
      scale: img.naturalWidth / innerWidth,
      valid: false,
    };
  }

  async run() {
    this.env = detectEnv();
    const shotP = this.loadShot();
    this.view = new View(this.env);
    this.engine = new Engine(this.view);
    this.engine.speed = 1.5;
    this.sfx = new Sound();
    this.sfx.init();
    this.engine.sfx = this.sfx;
    this.engine.onStart = () => this.view.intro.classList.add("gone");
    this.engine.onComplete = () => this.onComplete();
    this.bind();
    this.last = performance.now();
    this.raf = requestAnimationFrame((t) => this.frame(t));
    await nextFrame();
    this.renderSoundBtn();
    this.sfx.intro();
    this.view.bg.classList.add("on");
    this.view.intro.classList.add("on");
    this.view.hud.classList.add("on");
    const mark = (k) => (this.timing[k] = Math.round(performance.now() - this.t0));
    await sleep(520);
    await unhidePage();
    mark("blank");
    if (this.dead) return;
    await this.scan();
    mark("scan");
    if (this.dead) return;
    try {
      await Promise.race([document.fonts.ready, sleep(1200)]);
    } catch (_) {}
    mark("fonts");
    this.view.measure();
    const shot = await shotP;
    if (shot) {
      const g = this.env.geom();
      shot.valid = Math.abs(g.sx - shot.sx) < 1 && Math.abs(g.sy - shot.sy) < 1;
    }
    let model;
    try {
      model = captureModel(this.env, shot);
    } catch (err) {
      console.error("[swarm-rebuild] capture failed", err);
      model = { items: [], tasks: [], groups: [], guides: [], docW: 0, docH: 0 };
    }
    mark("capture");
    if (this.dead) return;
    this.view.mount(model);
    this.engine.setModel(model);
    this.model = model;
    mark("mount");
    const wait = 1500 - (performance.now() - this.t0);
    if (wait > 0) await sleep(wait);
    if (this.dead) return;
    this.engine.start();
  }

  async scan() {
    const env = this.env;
    const g = env.geom();
    const H = env.scrollHeight();
    if (H <= g.vh * 1.25) return;
    this.view.frozen = { ...this.view.vp };
    const steps = Math.min(28, Math.ceil(H / (g.vh * 0.85)));
    for (let i = 1; i <= steps && !this.dead; i++) {
      env.scrollTo(Math.min(H, (H / steps) * i));
      await nextFrame();
      await sleep(30);
    }
    env.scrollTo(g.sy, g.sx);
    await nextFrame();
    await sleep(750);
    env.scrollTo(g.sy, g.sx);
    this.view.frozen = null;
  }

  bind() {
    const on = (t, ev, fn, o) => {
      t.addEventListener(ev, fn, o);
      (this.unbinds || (this.unbinds = [])).push(() => t.removeEventListener(ev, fn, o));
    };
    const scrollTarget = this.env.isRoot ? window : this.env.scroller;
    on(
      scrollTarget,
      "scroll",
      () => {
        if (!this.view.frozen) this.view.syncWorld();
      },
      { passive: true }
    );
    on(window, "resize", () => this.view.measure());
    on(
      window,
      "wheel",
      () => {
        if (this.engine.ready) this.engine.start();
      },
      { passive: true }
    );
    on(
      window,
      "pointermove",
      (e) => {
        this.engine.mouse = { x: e.clientX, y: e.clientY };
      },
      { passive: true }
    );
    on(document.documentElement, "pointerleave", () => {
      this.engine.mouse = null;
    });
    on(
      window,
      "keydown",
      (e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          if (this.callbacks.stop) this.callbacks.stop(false);
        } else if (
          (e.key === "m" || e.key === "M") &&
          !e.metaKey &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          this.sfx.setOn(!this.sfx.on);
          this.renderSoundBtn();
        }
        this.unlockSound();
      },
      true
    );
    on(window, "pointerdown", () => this.unlockSound(), true);
    if (!this.env.isRoot) {
      on(
        this.view.host,
        "wheel",
        (e) => {
          e.preventDefault();
          this.env.scroller.scrollBy({
            top: e.deltaY,
            left: e.deltaX,
            behavior: "instant",
          });
        },
        { passive: false }
      );
    }
    on(this.view.hud, "click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      const a = b.dataset.a;
      if (a === "close") {
        if (this.callbacks.stop) this.callbacks.stop(false);
      } else if (a === "live") {
        if (this.callbacks.stop) this.callbacks.stop(true);
      } else if (a === "replay") {
        if (this.callbacks.restart) this.callbacks.restart();
      } else if (a === "tour") {
        this.tour = !this.tour;
        b.classList.toggle("on", this.tour);
        b.textContent = this.tour ? "Touring" : "Tour";
        if (this.tour) this.engine.start();
      } else if (a === "sound") {
        if (this.sfx.on && this.sfx.blocked) this.sfx.resume();
        else this.sfx.setOn(!this.sfx.on);
        setTimeout(() => this.renderSoundBtn(), 60);
      } else if (a === "speed") {
        this.speedIx = (this.speedIx + 1) % this.speeds.length;
        this.engine.speed = this.speeds[this.speedIx];
        b.textContent = this.speeds[this.speedIx] + "×";
      }
    });
  }

  unlockSound() {
    if (this.dead || !this.sfx || !this.sfx.blocked) return;
    this.sfx.resume();
    setTimeout(() => this.renderSoundBtn(), 80);
  }

  renderSoundBtn() {
    const b = this.view.root.querySelector('[data-a="sound"]');
    if (!b || !this.sfx) return;
    const tap = this.sfx.on && this.sfx.blocked;
    const key = this.sfx.on ? (tap ? "tap" : "on") : "off";
    if (b._k === key) return;
    b._k = key;
    b.classList.toggle("off", key === "off");
    b.classList.toggle("tap", tap);
    const waves =
      '<path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.6a6 6 0 0 1 0 8.8"/>';
    const mute = '<path d="M11 6l4 4M15 6l-4 4"/>';
    b.innerHTML = `${SPK_ICON}${key === "off" ? mute : waves}</svg>${
      tap ? "<span>Tap for sound</span>" : ""
    }`;
    b.title = key === "off" ? "Sound off (M)" : "Sound on (M)";
  }

  frame(now) {
    if (this.dead) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    try {
      this.engine.step(dt);
      if (this.tour) this.tourStep(dt);
      this.view.render(this.engine);
      if (!this._hudT || now - this._hudT > 200) {
        this._hudT = now;
        this.updateHud();
        this.renderSoundBtn();
      }
    } catch (err) {
      console.error("[swarm-rebuild]", err);
    }
    this.raf = requestAnimationFrame((t) => this.frame(t));
  }

  tourStep(dt) {
    const E = this.engine;
    if (!E.started) return;
    const g = this.env.geom();
    const maxY = this.env.scrollHeight() - g.vh;
    if (g.sy >= maxY - 1) {
      this.tourV = 0;
      return;
    }
    const crew = Math.max(
      MIN_AGENTS,
      E.cursors.filter((c) => !c.leaving).length
    );
    const backlog = E.backlog();
    const baseTarget =
      backlog <= Math.max(4, crew * 0.6)
        ? 260
        : backlog <= crew * 1.5
        ? 120
        : 60;
    const target = baseTarget * (this.engine.speed || 1.5);
    this.tourV += (target - this.tourV) * Math.min(1, dt * 2.5);
    this.tourAcc += this.tourV * dt;
    if (this.tourAcc >= 1) {
      const d = Math.floor(this.tourAcc);
      this.tourAcc -= d;
      this.env.scrollBy(d);
    }
  }

  updateHud() {
    const E = this.engine;
    const v = this.view;
    if (!E.ready) return;
    const workers = E.cursors.filter((c) => c.worked).length + E.retired;
    const total = E.tasks.length;
    const done = E.doneCount;
    if (this.complete) return;
    if (!E.started)
      v.status.innerHTML = `<b>${
        E.cursors.length
      }</b> agents ready<span class="sep"></span>${total.toLocaleString()} layers`;
    else {
      const pend = E.tasks.length - done;
      const below = E.tasks.some(
        (t) => t.state === "wait" && t.layer === "world" && t.gate > E.frontier
      );
      v.status.innerHTML =
        `<b>${workers}</b> agents<span class="sep"></span><b>${done.toLocaleString()}</b> / ${total.toLocaleString()} layers` +
        (below && pend && !this.tour && E.backlog() === 0
          ? `<span class="sep"></span>scroll to keep building`
          : "");
    }
    v.barFill.style.width = total ? `${(done / total) * 100}%` : "0%";
    const busy = E.cursors.filter((c) => c.task).slice(-5);
    const key = busy.map((c) => c.id).join(",");
    if (key !== this._dots) {
      this._dots = key;
      v.dots.innerHTML = busy
        .map(
          (c) =>
            `<i style="background:${c.color}" title="${c.name}">${c.name[0]}</i>`
        )
        .join("");
    }
  }

  onComplete() {
    this.complete = true;
    if (this.sfx) this.sfx.finale();
    const E = this.engine;
    const v = this.view;
    const workers = E.cursors.filter((c) => c.worked).length + E.retired;
    const secs = (E.endTime - E.startTime).toFixed(1);
    v.status.innerHTML = `Rebuilt by <b>${workers}</b> agents in <b>${secs}s</b>`;
    v.barFill.style.width = "100%";
    v.dots.innerHTML = "";
    v.root.querySelector('[data-a="live"]').hidden = false;
    v.root.querySelector('[data-a="replay"]').hidden = false;
    v.root.querySelector('[data-a="tour"]').hidden = true;
    v.root.querySelector('[data-a="speed"]').hidden = true;
    this.tour = false;

    // Automatically fade out cursors and bottom dock after completion
    setTimeout(() => {
      if (!this.dead) {
        if (this.callbacks.stop) this.callbacks.stop(true);
        else this.destroy(true);
      }
    }, 750);
  }

  destroy(reveal) {
    unhidePage();
    if (this.sfx) {
      if (reveal) this.sfx.release();
      this.sfx.close(reveal ? 1.4 : 0.25);
    }
    const finish = () => {
      this.dead = true;
      cancelAnimationFrame(this.raf);
      for (const u of this.unbinds || []) u();
      if (this.view && this.view.themeObserver) this.view.themeObserver.disconnect();
      this.view.host.remove();
    };
    if (reveal) {
      this.engine.releasing = true;
      this.engine.flocking = true;
      for (const c of this.engine.cursors) {
        c.gen = null;
        c.follow = false;
      }
      this.view.hud.classList.remove("on");
      setTimeout(() => {
        this.view.host.style.setProperty("opacity", "0", "important");
      }, 450);
      setTimeout(finish, 1150);
    } else {
      this.view.host.style.setProperty(
        "transition",
        "opacity .25s ease",
        "important"
      );
      this.view.host.style.setProperty("opacity", "0", "important");
      this.dead = true;
      cancelAnimationFrame(this.raf);
      for (const u of this.unbinds || []) u();
      setTimeout(() => this.view.host.remove(), 260);
    }
  }
}

