import { KEY } from "./core/constants.js";
import { App, getLastShot } from "./ui/App.js";
import { captureModel } from "./capture/captureModel.js";
import { detectEnv } from "./core/env.js";
import { Sound } from "./audio/Sound.js";

let app = null;

export function startSwarm() {
  if (app) return;
  app = new App({ stop: stopSwarm, restart: restartSwarm });
  app.run().catch((err) => console.error("[swarm-rebuild]", err));
}

export function stopSwarm(reveal = true) {
  if (!app) return;
  const a = app;
  app = null;
  a.destroy(reveal);
}

export function restartSwarm() {
  if (app) {
    const a = app;
    app = null;
    a.dead = true;
    cancelAnimationFrame(a.raf);
    for (const u of a.unbinds || []) u();
    a.view.host.remove();
    if (a.sfx) a.sfx.close(0.1);
    const lastShot = getLastShot();
    if (lastShot) a.env.scrollTo(lastShot.at.sy, lastShot.at.sx);
  }
  startSwarm();
}

export function toggleSwarm() {
  if (app) stopSwarm(true);
  else startSwarm();
}

export function initSwarm({ autoStart = true } = {}) {
  if (typeof window === "undefined") return;

  window[KEY] = {
    toggle: toggleSwarm,
    start: startSwarm,
    stop: stopSwarm,
    restart: restartSwarm,
    get app() {
      return app;
    },
    debug: { captureModel, detectEnv, Sound },
  };

  window.addEventListener("keydown", (e) => {
    if (e.altKey && e.shiftKey && (e.key === "S" || e.key === "s")) {
      e.preventDefault();
      toggleSwarm();
    }
  });

  if (autoStart) {
    let shouldBuild = true;
    try {
      if (sessionStorage.getItem("portfolio_swarm_rebuilt")) {
        shouldBuild = false;
      }
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries.length > 0 && navEntries[0].type === "reload") {
        shouldBuild = false;
      }
      if (performance.navigation && performance.navigation.type === 1) {
        shouldBuild = false;
      }
    } catch (_) {}

    if (shouldBuild) {
      try {
        sessionStorage.setItem("portfolio_swarm_rebuilt", "true");
      } catch (_) {}
      setTimeout(() => {
        if (!app) startSwarm();
      }, 450);
    }
  }
}
