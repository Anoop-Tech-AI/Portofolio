import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useReducedMotion } from "../hooks/useAnimations";

export default function ThreeBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollOffsetY, setScrollOffsetY] = useState(0);

  const isDark =
    theme === "dark" ||
    (typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"));

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let targetScroll = 0;
    let currentX = 0;
    let currentY = 0;
    let currentScroll = 0;
    let frameId = null;

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleScroll = () => {
      targetScroll = window.scrollY * 0.15;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      currentScroll += (targetScroll - currentScroll) * 0.05;

      setMouseOffset({ x: currentX, y: currentY });
      setScrollOffsetY(currentScroll);

      frameId = requestAnimationFrame(updateParallax);
    };

    frameId = requestAnimationFrame(updateParallax);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const emberCount = 55;
    const embers = [];
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.5 + Math.random() * 1.8,
        radius: 1.0 + Math.random() * 2.2,
        vx: 0.15 + Math.random() * 0.45,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: 0.25 + Math.random() * 0.65,
        twinkleSpeed: 0.0015 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
        colorType: Math.random() > 0.4 ? "gold" : "cyan",
      });
    }

    let shootingStar = null;
    let lastStarTime = 0;

    let shipX = width * 0.24;
    let shipY = height * 0.54;
    let shipVx = 0;
    let shipVy = 0;
    let shipAngle = -0.12;

    let animId = null;
    let isRunning = true;

    const render = (now) => {
      if (!isRunning) return;
      animId = requestAnimationFrame(render);

      if (document.hidden) return;

      ctx.clearRect(0, 0, width, height);

      const darkNow =
        theme === "dark" ||
        document.documentElement.classList.contains("dark");

      embers.forEach((em) => {
        if (!shouldReduceMotion) {
          em.x += em.vx / em.z;
          em.y += em.vy / em.z;
        }

        if (em.x > width + 20) em.x = -20;
        if (em.y < -20) em.y = height + 20;
        if (em.y > height + 20) em.y = -20;

        const posX = em.x + (mouseOffset.x * 35) / em.z;
        const posY = em.y + (mouseOffset.y * 25) / em.z - scrollOffsetY * 0.08;

        const twinkle =
          0.5 + 0.5 * Math.sin(now * em.twinkleSpeed + em.phase);
        const a = em.alpha * twinkle * (darkNow ? 0.9 : 0.6);

        if (em.colorType === "gold") {
          ctx.fillStyle = darkNow
            ? `rgba(251, 191, 36, ${a})`
            : `rgba(217, 119, 6, ${a * 0.85})`;
        } else {
          ctx.fillStyle = darkNow
            ? `rgba(56, 189, 248, ${a})`
            : `rgba(2, 132, 199, ${a * 0.85})`;
        }

        ctx.beginPath();
        ctx.arc(posX, posY, em.radius / em.z, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!shootingStar && now - lastStarTime > 5500) {
        if (Math.random() < 0.35) {
          shootingStar = {
            startX: Math.random() * width * 0.85,
            startY: Math.random() * height * 0.45,
            length: 140 + Math.random() * 100,
            angle: Math.PI / 4.2 + (Math.random() - 0.5) * 0.35,
            speed: 18 + Math.random() * 12,
            progress: 0,
          };
          lastStarTime = now;
        }
      }

      if (shootingStar) {
        shootingStar.progress += shootingStar.speed;
        const hx =
          shootingStar.startX +
          Math.cos(shootingStar.angle) * shootingStar.progress;
        const hy =
          shootingStar.startY +
          Math.sin(shootingStar.angle) * shootingStar.progress;
        const tx =
          hx - Math.cos(shootingStar.angle) * shootingStar.length;
        const ty =
          hy - Math.sin(shootingStar.angle) * shootingStar.length;

        const starGrad = ctx.createLinearGradient(tx, ty, hx, hy);
        starGrad.addColorStop(0, "rgba(251, 191, 36, 0)");
        starGrad.addColorStop(
          1,
          darkNow ? "rgba(255, 255, 255, 0.9)" : "rgba(217, 119, 6, 0.85)",
        );

        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        if (hx > width + 120 || hy > height + 120) {
          shootingStar = null;
        }
      }

      const targetShipX =
        width * 0.24 +
        mouseOffset.x * 55 +
        Math.sin(now * 0.0007) * 40;
      const targetShipY =
        height * 0.52 +
        mouseOffset.y * 38 +
        Math.cos(now * 0.0009) * 30 -
        scrollOffsetY * 0.14;

      shipVx += (targetShipX - shipX) * 0.02;
      shipVy += (targetShipY - shipY) * 0.02;
      shipVx *= 0.88;
      shipVy *= 0.88;
      shipX += shipVx;
      shipY += shipVy;

      const targetAngle =
        -0.18 + (shipVy / 16) * 0.22 + (shipVx / 22) * 0.18;
      shipAngle += (targetAngle - shipAngle) * 0.05;

      ctx.save();
      ctx.translate(shipX, shipY);
      ctx.rotate(shipAngle);

      const thrusterGrad = ctx.createLinearGradient(-26, 0, -85, 0);
      thrusterGrad.addColorStop(0, "rgba(56, 189, 248, 0.95)");
      thrusterGrad.addColorStop(0.35, "rgba(14, 165, 233, 0.65)");
      thrusterGrad.addColorStop(0.7, "rgba(245, 158, 11, 0.35)");
      thrusterGrad.addColorStop(1, "rgba(245, 158, 11, 0)");

      ctx.fillStyle = thrusterGrad;
      const flicker = 0.82 + Math.sin(now * 0.04) * 0.18;

      ctx.beginPath();
      ctx.moveTo(-16, -5);
      ctx.lineTo(-16 - 48 * flicker, -2);
      ctx.lineTo(-16, 0);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-16, 2);
      ctx.lineTo(-16 - 48 * flicker, 5);
      ctx.lineTo(-16, 7);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = darkNow ? "#1a1d26" : "#334155";
      ctx.strokeStyle = darkNow
        ? "rgba(251, 191, 36, 0.7)"
        : "rgba(217, 119, 6, 0.65)";
      ctx.lineWidth = 1.4;

      ctx.beginPath();
      ctx.moveTo(34, 0);
      ctx.lineTo(8, -12);
      ctx.lineTo(-16, -24);
      ctx.lineTo(-18, -10);
      ctx.lineTo(-24, -8);
      ctx.lineTo(-24, 8);
      ctx.lineTo(-18, 10);
      ctx.lineTo(-16, 24);
      ctx.lineTo(8, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = darkNow ? "#282c37" : "#475569";
      ctx.beginPath();
      ctx.moveTo(22, 0);
      ctx.lineTo(0, -6);
      ctx.lineTo(-14, -6);
      ctx.lineTo(-14, 6);
      ctx.lineTo(0, 6);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = darkNow
        ? "rgba(56, 189, 248, 0.95)"
        : "rgba(2, 132, 199, 0.9)";
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(6, -2.5);
      ctx.lineTo(6, 2.5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [theme, shouldReduceMotion, mouseOffset, scrollOffsetY]);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] select-none pointer-events-none transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 24}px, ${
            mouseOffset.y * 18 - scrollOffsetY * 0.16
          }px, 0)`,
        }}
      >
        <img
          src="/interstellar-gargantua.jpg"
          alt="Interstellar Universe"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            isDark ? "opacity-85" : "opacity-0"
          }`}
          style={{
            filter: "contrast(1.15) brightness(0.95)",
          }}
        />

        <img
          src="/interstellar-gargantua-light.jpg"
          alt="Interstellar Universe Light"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            isDark ? "opacity-0" : "opacity-75"
          }`}
          style={{
            filter: "contrast(1.08) brightness(1.02)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F8F5]/80 via-transparent to-[#F8F8F5]/40 dark:from-[#0c0d10]/90 dark:via-transparent dark:to-[#0c0d10]/50" />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
    </div>
  );
}
