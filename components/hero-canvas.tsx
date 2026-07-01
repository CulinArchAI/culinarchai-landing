"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  glyph: "0" | "1";
  delay: number;
};

const COLORS = {
  panel: "#20352f",
  panelDeep: "#182a25",
  grid: "rgba(235, 232, 220, 0.08)",
  text: "rgba(252, 251, 247, 0.88)",
  muted: "rgba(252, 251, 247, 0.42)",
  accent: "#c57c54",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    let animationFrame = 0;
    let startTime = performance.now();
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    const buildTargets = () => {
      const offscreen = document.createElement("canvas");
      const offscreenContext = offscreen.getContext("2d");
      if (!offscreenContext) return [];

      offscreen.width = Math.max(480, Math.floor(width));
      offscreen.height = Math.max(220, Math.floor(height));

      const fontSize = clamp(width * 0.115, 44, 84);
      offscreenContext.clearRect(0, 0, offscreen.width, offscreen.height);
      offscreenContext.fillStyle = "#ffffff";
      offscreenContext.textAlign = "center";
      offscreenContext.textBaseline = "middle";
      offscreenContext.font = `650 ${fontSize}px Manrope, Arial, sans-serif`;
      offscreenContext.fillText("CulinArchAI", offscreen.width / 2, offscreen.height / 2);

      const image = offscreenContext.getImageData(
        0,
        0,
        offscreen.width,
        offscreen.height,
      );
      const targets: Array<{ x: number; y: number }> = [];
      const step = width < 520 ? 9 : 7;

      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const alpha = image.data[(y * offscreen.width + x) * 4 + 3];
          if (alpha > 140) targets.push({ x, y });
        }
      }

      return targets;
    };

    const createParticles = () => {
      const targets = buildTargets();
      const maxParticles = width < 520 ? 320 : 620;
      const sampledTargets = targets
        .sort(() => Math.random() - 0.5)
        .slice(0, maxParticles);

      particles = sampledTargets.map((target, index) => {
        const edge = index % 4;
        const origin =
          edge === 0
            ? { x: Math.random() * width, y: -24 - Math.random() * height * 0.25 }
            : edge === 1
              ? { x: width + 24 + Math.random() * width * 0.2, y: Math.random() * height }
              : edge === 2
                ? { x: Math.random() * width, y: height + 24 + Math.random() * height * 0.2 }
                : { x: -24 - Math.random() * width * 0.2, y: Math.random() * height };

        return {
          x: origin.x,
          y: origin.y,
          originX: origin.x,
          originY: origin.y,
          targetX: target.x,
          targetY: target.y,
          glyph: Math.random() > 0.5 ? "1" : "0",
          delay: Math.random() * 0.22,
        };
      });
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
      startTime = performance.now();
    };

    const drawGrid = () => {
      const spacing = width < 520 ? 28 : 34;
      context.strokeStyle = COLORS.grid;
      context.lineWidth = 1;

      for (let x = spacing; x < width; x += spacing) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = spacing; y < height; y += spacing) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    };

    const drawStaticIdentity = () => {
      const fontSize = clamp(width * 0.115, 44, 84);
      context.fillStyle = COLORS.text;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = `650 ${fontSize}px Manrope, Arial, sans-serif`;
      context.fillText("CulinArchAI", width / 2, height / 2);
    };

    const draw = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      context.clearRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, COLORS.panel);
      gradient.addColorStop(1, COLORS.panelDeep);
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      drawGrid();

      if (reducedMotion) {
        drawStaticIdentity();
      } else {
        const globalProgress = clamp((elapsed - 450) / 2250, 0, 1);

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = `${width < 520 ? 9 : 10}px IBM Plex Mono, monospace`;

        particles.forEach((particle) => {
          const localProgress = clamp(
            (globalProgress - particle.delay) / (1 - particle.delay),
            0,
            1,
          );
          const eased = easeOutCubic(localProgress);
          const drift = Math.sin(elapsed * 0.0014 + particle.delay * 18) * (1 - eased) * 5;

          particle.x = particle.originX + (particle.targetX - particle.originX) * eased;
          particle.y = particle.originY + (particle.targetY - particle.originY) * eased + drift;

          context.fillStyle =
            localProgress > 0.92 ? COLORS.text : COLORS.muted;
          context.fillText(particle.glyph, particle.x, particle.y);
        });

        if (globalProgress > 0.82) {
          const lineAlpha = clamp((globalProgress - 0.82) / 0.18, 0, 1);
          context.strokeStyle = `rgba(197, 124, 84, ${lineAlpha * 0.78})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(width * 0.18, height * 0.74);
          context.lineTo(width * 0.82, height * 0.74);
          context.stroke();
        }
      }

      context.fillStyle = COLORS.muted;
      context.textAlign = "left";
      context.textBaseline = "alphabetic";
      context.font = `${width < 520 ? 9 : 10}px IBM Plex Mono, monospace`;
      context.fillText("SIGNAL / STRUCTURE / TASTE", 18, height - 18);

      animationFrame = window.requestAnimationFrame(draw);
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    motionQuery.addEventListener("change", handleMotionChange);
    resize();
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <figure className="hero-instrument" aria-label="CulinArchAI identity forming from structured signals">
      <canvas ref={canvasRef} aria-hidden="true" />
      <figcaption>
        <span>Working identity study</span>
        <span>Motion becomes structure</span>
      </figcaption>
    </figure>
  );
}
