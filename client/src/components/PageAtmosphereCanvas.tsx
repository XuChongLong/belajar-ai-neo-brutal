// Decorative canvas layer: quiet Paper Playground doodles that make every route feel inhabited without competing with lesson content.

import { useEffect, useMemo, useRef } from "react";

type Scene = "home" | "catalogue" | "lesson" | "progress" | "review" | "glossary" | "files" | "profile" | "about" | "default";

const palettes: Record<Scene, string[]> = {
  home: ["#FF2D78", "#FFD45C", "#6EDC9A"],
  catalogue: ["#FF2D78", "#FFD45C", "#8CC9FF"],
  lesson: ["#FF2D78", "#FFD45C", "#6EDC9A"],
  progress: ["#FF2D78", "#6EDC9A", "#FFD45C"],
  review: ["#FF2D78", "#FFD45C", "#8CC9FF"],
  glossary: ["#FF2D78", "#FFD45C", "#6EDC9A"],
  files: ["#6EDC9A", "#FFD45C", "#FF2D78"],
  profile: ["#FF2D78", "#6EDC9A", "#FFD45C"],
  about: ["#FF2D78", "#FFD45C", "#8CC9FF"],
  default: ["#FF2D78", "#FFD45C", "#6EDC9A"],
};

export function getAtmosphereScene(path: string): Scene {
  if (path === "/") return "home";
  if (path.startsWith("/materi/")) return "lesson";
  if (path === "/materi") return "catalogue";
  if (path === "/progress") return "progress";
  if (path === "/review" || path === "/flashcards") return "review";
  if (path === "/glosarium") return "glossary";
  if (path === "/files") return "files";
  if (path === "/profil") return "profile";
  if (path === "/tentang") return "about";
  return "default";
}

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function pathSeed(path: string) {
  return Array.from(path).reduce((seed, character) => ((seed << 5) - seed + character.charCodeAt(0)) | 0, 2781);
}

function drawDot(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawSticker(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.strokeStyle = "#1A1A1A";
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.28;
  ctx.fillRect(-size / 2, -size / 2, size, size * 0.72);
  ctx.globalAlpha = 0.4;
  ctx.strokeRect(-size / 2, -size / 2, size, size * 0.72);
  ctx.restore();
}

function drawOrbit(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, phase: number) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.globalAlpha = 0.44;
  ctx.beginPath();
  ctx.ellipse(x, y, radius, radius * 0.42, phase, 0, Math.PI * 2);
  ctx.stroke();
  drawDot(ctx, x + Math.cos(phase) * radius, y + Math.sin(phase) * radius * 0.42, 2.7, color);
  ctx.restore();
}

function drawRouteDoodles(ctx: CanvasRenderingContext2D, scene: Scene, path: string, width: number, height: number, drift: number) {
  ctx.clearRect(0, 0, width, height);
  const random = seededRandom(pathSeed(path));
  const colors = palettes[scene];
  const mobile = width < 700;
  const edgeWidth = mobile ? width * 0.19 : width * 0.26;
  const count = mobile ? 13 : 26;

  for (let index = 0; index < count; index += 1) {
    const leftEdge = index % 2 === 0;
    const x = leftEdge ? edgeWidth * (0.1 + random() * 0.7) : width - edgeWidth * (0.15 + random() * 0.7);
    const y = 70 + random() * Math.max(120, height - 130);
    const color = colors[index % colors.length];
    const wobble = Math.sin(drift + index * 1.3) * (mobile ? 2 : 4);

    if (index % 5 === 0) {
      drawSticker(ctx, x + wobble, y, mobile ? 18 : 27, color, (random() - 0.5) * 0.45);
    } else if (index % 5 === 1) {
      drawOrbit(ctx, x, y + wobble, mobile ? 14 : 23, color, drift * 0.16 + index * 0.31);
    } else if (index % 5 === 2) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = 0.38;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(x - 18, y - 15);
      ctx.quadraticCurveTo(x + wobble, y + 5, x + 18, y + 17);
      ctx.stroke();
      ctx.restore();
      drawDot(ctx, x + 18, y + 17, mobile ? 2 : 3, color);
    } else if (index % 5 === 3) {
      ctx.save();
      ctx.translate(x, y + wobble);
      ctx.rotate((random() - 0.5) * 0.6);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      ctx.globalAlpha = 0.44;
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.lineTo(7, 0);
      ctx.lineTo(2, -5);
      ctx.moveTo(7, 0);
      ctx.lineTo(2, 5);
      ctx.stroke();
      ctx.restore();
    } else {
      drawDot(ctx, x + wobble, y, mobile ? 3 : 4.5, color);
      drawDot(ctx, x + 10, y + 8, mobile ? 1.6 : 2.4, "#1A1A1A");
    }
  }

  if (scene === "home" || scene === "progress") {
    ctx.save();
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 1.3;
    ctx.globalAlpha = 0.16;
    ctx.setLineDash([2, 7]);
    for (let index = 0; index < 4; index += 1) {
      const y = height * (0.2 + index * 0.19);
      ctx.beginPath();
      ctx.moveTo(width * 0.03, y);
      ctx.bezierCurveTo(width * 0.23, y - 35, width * 0.76, y + 35, width * 0.97, y - 8);
      ctx.stroke();
    }
    ctx.restore();
  }
}

export default function PageAtmosphereCanvas({ path }: { path: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = useMemo(() => getAtmosphereScene(path), [path]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let lastPaint = 0;
    let width = 0;
    let height = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.round(nextWidth * ratio);
      canvas.height = Math.round(nextHeight * ratio);
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawRouteDoodles(context, scene, path, width, height, 0);
    };

    const animate = (time: number) => {
      if (!reducedMotion.matches && !document.hidden && time - lastPaint > 90) {
        drawRouteDoodles(context, scene, path, width, height, time / 3000);
        lastPaint = time;
      }
      if (!reducedMotion.matches) frame = window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    if (!reducedMotion.matches) frame = window.requestAnimationFrame(animate);
    const onMotionChange = () => {
      window.cancelAnimationFrame(frame);
      drawRouteDoodles(context, scene, path, width, height, 0);
      if (!reducedMotion.matches) frame = window.requestAnimationFrame(animate);
    };
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", onMotionChange);
      window.cancelAnimationFrame(frame);
    };
  }, [path, scene]);

  return <canvas ref={canvasRef} className={`page-atmosphere-canvas atmosphere-${scene}`} aria-hidden="true" />;
}
