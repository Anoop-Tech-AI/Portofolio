export const STYLE = `
:host{all:initial}
*{box-sizing:border-box}
.bg{position:absolute;inset:0;opacity:0;transition:opacity .5s ease,background-color .3s ease}
.bg.on{opacity:1}
.layer,.port{position:absolute;overflow:hidden;pointer-events:none}
.layer{inset:0}
.world{position:absolute;left:0;top:0;will-change:transform}
.it{position:absolute;left:0;top:0;transform-origin:0 0}
.it.settle{transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.r{background-color:var(--ph,#D9D9D9);transition:background-color .22s ease,border-radius .22s ease}
.r.st{background-color:transparent}
.r>.f{position:absolute;inset:0;opacity:0;transition:opacity .22s ease,background-color .35s ease,border-radius .35s ease,box-shadow .35s ease,border-color .35s ease}
.r.st>.f{opacity:1}
.m{background-color:var(--ph,#D9D9D9);overflow:hidden}
.m>.ph{position:absolute;left:50%;top:50%;width:22px;height:22px;transform:translate(-50%,-50%);opacity:.7;transition:opacity .2s}
.m>.md{position:absolute;inset:0;width:100%;height:100%;opacity:0;clip-path:inset(0 0 100% 0);transition:opacity .35s ease,clip-path .6s cubic-bezier(.2,.75,.2,1)}
.m.st{background-color:transparent;transition:background-color .3s ease .3s}
.m.st>.ph{opacity:0}
.m.st>.md{opacity:1;clip-path:inset(0 0 0 0)}
.m>.md.swap{animation:swap .45s ease}
@keyframes swap{from{opacity:0;filter:blur(6px)}}
.m>.fr{position:absolute;inset:0;pointer-events:none}
.l svg{position:absolute;left:0;top:0;overflow:visible}
.bd{position:absolute;opacity:0;-webkit-backdrop-filter:saturate(180%) blur(14px);backdrop-filter:saturate(180%) blur(14px);box-shadow:0 1px 0 rgba(0,0,0,.06);pointer-events:none}
.caret{display:inline-block;width:1.5px;height:1.1em;margin-left:1px;margin-right:-2.5px;vertical-align:text-bottom;background:currentColor;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.sa{background-color:rgba(13,153,255,.28)!important}
.ov{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.badges,.cursors,.trails{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.badge{position:absolute;transform:translate(-50%);padding:2px 6px;border-radius:4px;color:#fff;font:600 11px/16px Inter,system-ui,-apple-system,"Segoe UI",sans-serif;white-space:nowrap;font-variant-numeric:tabular-nums;box-shadow:0 2px 6px rgba(0,0,0,.35);letter-spacing:.01em}
.cursor{position:absolute;left:0;top:0;will-change:transform}
.cursor svg{position:absolute;overflow:visible;filter:drop-shadow(0 2px 4px rgba(0,0,0,.32))}
.cursor .c-name{position:absolute;left:14px;top:14px;padding:1px 6px;border-radius:4px;color:#fff;font:600 10px/14px Inter,system-ui,-apple-system,sans-serif;white-space:nowrap;pointer-events:none;box-shadow:0 2px 6px rgba(0,0,0,0.35);letter-spacing:0.02em;opacity:0;transform:scale(0.85);transition:opacity .2s ease,transform .2s cubic-bezier(.2,.8,.2,1)}
.cursor.show-name .c-name{opacity:0.95;transform:scale(1)}
.rulers{position:absolute;inset:0;pointer-events:none}
.ruler{position:absolute;background:#1e1e24;pointer-events:none}
.ruler svg{display:block}
.ruler-top{top:0;left:0;right:0;height:20px;border-bottom:1px solid #2d2d38}
.ruler-left{top:0;left:0;bottom:0;width:20px;border-right:1px solid #2d2d38}
.ruler-corner{position:absolute;top:0;left:0;width:20px;height:20px;background:#1e1e24}
.rtext{font:500 9px Inter,system-ui,-apple-system,sans-serif;fill:#8c8c9a}
.rsel{fill:#00f0ff}
.intro{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(.92);opacity:0;transition:opacity .35s ease,transform .45s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.intro.on{opacity:1;transform:translate(-50%,-50%)}
.intro.gone{opacity:0;transform:translate(-50%,-50%) scale(.9)}
.intro img{display:block;width:64px;height:64px;object-fit:contain;filter:grayscale(1) drop-shadow(0 4px 12px rgba(0,0,0,.4));opacity:.52;border-radius:16px}
.intro .mono{width:64px;height:64px;border-radius:18px;background:#2a2b36;color:#fff;font:700 32px/64px Inter,system-ui,sans-serif;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,.4)}
.hud{position:absolute;left:50%;bottom:22px;transform:translate(-50%,18px);opacity:0;display:flex;align-items:center;gap:10px;padding:7px 8px 7px 12px;background:rgba(20,20,26,.94);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);color:#fff;border-radius:14px;box-shadow:0 12px 36px rgba(0,0,0,.45),inset 0 0 0 1px rgba(255,255,255,.09);font:500 12px/1 Inter,system-ui,-apple-system,"Segoe UI",sans-serif;pointer-events:auto;transition:opacity .45s ease,transform .45s cubic-bezier(.2,.8,.2,1);white-space:nowrap;user-select:none;z-index:5}
.hud.on{opacity:1;transform:translate(-50%,0)}
.hud .dots{display:flex;padding-left:5px}
.hud .dots i{display:block;width:20px;height:20px;margin-left:-6px;border-radius:50%;border:2px solid #14141a;font:700 9px/16px Inter,system-ui,sans-serif;font-style:normal;text-align:center;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:background .3s}
.hud .txt,.hud .status{display:flex;align-items:center;gap:7px;color:#cfcfdf;font-variant-numeric:tabular-nums}
.hud .txt b{color:#fff;font-weight:600}
.hud .sep{width:1px;height:12px;background:#383848}
.hud .bar{width:68px;height:4px;border-radius:2px;background:#2c2c3a;overflow:hidden}
.hud .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#00F0FF,#FF0055);transition:width .35s ease}
.hud button{all:unset;cursor:pointer;padding:7px 11px;border-radius:8px;background:#262633;color:#fff;font:500 12px/1 Inter,system-ui,-apple-system,sans-serif;transition:background .15s,box-shadow .15s}
.hud button:hover{background:#343446}
.hud button.pri{background:linear-gradient(135deg,#0070F3,#00DF89);font-weight:600}
.hud button.pri:hover{background:linear-gradient(135deg,#1A85FF,#00F59B);box-shadow:0 0 12px rgba(0,223,137,.35)}
.hud button.on{background:rgba(0,240,255,.18);color:#8feaff}
.hud button[hidden]{display:none}
.hud .x{padding:7px 10px;color:#9a9ab0}
.hud .x:hover{color:#fff}
.hud button.snd{display:flex;align-items:center;gap:6px;padding:6px 9px}
.hud button.snd.off{color:#76768a}
.hud button.snd.tap{background:#FF0055;animation:hudpulse 1.6s ease-in-out infinite}
@keyframes hudpulse{50%{box-shadow:0 0 0 5px rgba(255,0,85,.35)}}
`;
