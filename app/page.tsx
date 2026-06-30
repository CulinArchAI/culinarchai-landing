"use client";

import { useEffect, useRef, useState } from "react";

const SYSTEMS = [
  {
    id: "arcos",
    label: "ArcOS",
    title: "Operational architecture",
    copy: "A structured operating layer for culinary systems, standards and execution.",
  },
  {
    id: "intelligence",
    label: "Culinary Intelligence",
    title: "Data into decisions",
    copy: "Culinary information translated into usable patterns, logic and action.",
  },
  {
    id: "archaeology",
    label: "Culinary Archaeology",
    title: "Origins and evolution",
    copy: "A research layer for tracing ingredients, techniques and culinary lineage.",
  },
  {
    id: "archsense",
    label: "ArchSense",
    title: "Perception and context",
    copy: "A sensory intelligence layer connecting preference, environment and intent.",
  },
] as const;

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
};

type Pointer = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  active: boolean;
};

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeSystemRef = useRef(0);
  const [activeSystem, setActiveSystem] = useState(0);

  const activateSystem = (index: number) => {
    activeSystemRef.current = index;
    setActiveSystem(index);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer: Pointer = {
      x: window.innerWidth * 0.72,
      y: window.innerHeight * 0.48,
      tx: window.innerWidth * 0.72,
      ty: window.innerHeight * 0.48,
      active: false,
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let frameId = 0;
    const start = performance.now();
    let nodes: Node[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 760 ? 34 : Math.min(82, Math.floor((width * height) / 22000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        size: 0.7 + Math.random() * 1.2,
        alpha: 0.18 + Math.random() * 0.42,
      }));
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.tx = width * 0.72;
      pointer.ty = height * 0.48;
    };

    const draw = (now: number) => {
      const elapsed = reduceMotion ? 0 : (now - start) * 0.00042;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(
        width * 0.74,
        height * 0.45,
        0,
        width * 0.74,
        height * 0.45,
        Math.max(width, height) * 0.62,
      );
      gradient.addColorStop(0, "rgba(86, 113, 118, 0.12)");
      gradient.addColorStop(0.45, "rgba(25, 32, 35, 0.04)");
      gradient.addColorStop(1, "rgba(5, 7, 8, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (const node of nodes) {
        if (!reduceMotion) {
          node.x += node.vx;
          node.y += node.vy;
        }

        if (node.x < -10) node.x = width + 10;
        if (node.x > width + 10) node.x = -10;
        if (node.y < -10) node.y = height + 10;
        if (node.y > height + 10) node.y = -10;

        const mouseDistance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        if (pointer.active && mouseDistance < 180) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.strokeStyle = `rgba(166, 203, 201, ${0.16 * (1 - mouseDistance / 180)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(187, 207, 205, ${node.alpha})`;
        ctx.fill();
      }

      const networkDistance = width < 760 ? 86 : 112;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > networkDistance) continue;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(137, 159, 158, ${0.035 * (1 - distance / networkDistance)})`;
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
      }

      const helixCenterX = width < 760 ? width * 0.66 : width * 0.76;
      const helixTop = height * 0.12;
      const helixHeight = height * 0.74;
      const radius = Math.min(width < 760 ? 58 : 118, width * 0.1);
      const segments = width < 760 ? 58 : 84;
      const strandA: Array<{ x: number; y: number; depth: number }> = [];
      const strandB: Array<{ x: number; y: number; depth: number }> = [];

      for (let i = 0; i <= segments; i += 1) {
        const progress = i / segments;
        const y = helixTop + progress * helixHeight;
        const angle = progress * Math.PI * 5.4 + elapsed;
        const perspective = 0.76 + Math.sin(progress * Math.PI) * 0.24;
        const wave = Math.sin(angle) * radius * perspective;
        const depth = (Math.cos(angle) + 1) / 2;
        strandA.push({ x: helixCenterX + wave, y, depth });
        strandB.push({ x: helixCenterX - wave, y, depth: 1 - depth });
      }

      const drawStrand = (strand: Array<{ x: number; y: number; depth: number }>) => {
        for (let i = 1; i < strand.length; i += 1) {
          const previous = strand[i - 1];
          const current = strand[i];
          ctx.beginPath();
          ctx.moveTo(previous.x, previous.y);
          ctx.lineTo(current.x, current.y);
          ctx.strokeStyle = `rgba(188, 211, 207, ${0.13 + current.depth * 0.34})`;
          ctx.lineWidth = 0.65 + current.depth * 0.9;
          ctx.stroke();
        }
      };

      drawStrand(strandA);
      drawStrand(strandB);

      for (let i = 3; i < strandA.length; i += 5) {
        const a = strandA[i];
        const b = strandB[i];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(143, 171, 168, 0.11)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      const anchorPositions = [0.18, 0.39, 0.61, 0.82];
      anchorPositions.forEach((position, anchorIndex) => {
        const point = strandA[Math.round(position * (strandA.length - 1))];
        const pulse = reduceMotion ? 1 : 1 + Math.sin(now * 0.0018 + anchorIndex) * 0.22;

        ctx.beginPath();
        ctx.arc(point.x, point.y, 3.2 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(199, 222, 217, 0.86)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, anchorIndex === activeSystemRef.current ? 14 * pulse : 9 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle =
          anchorIndex === activeSystemRef.current
            ? "rgba(185, 215, 210, 0.32)"
            : "rgba(155, 191, 186, 0.13)";
        ctx.lineWidth = anchorIndex === activeSystemRef.current ? 1 : 0.8;
        ctx.stroke();

        if (pointer.active) {
          const distance = Math.hypot(pointer.x - point.x, pointer.y - point.y);
          if (distance < 240) {
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.quadraticCurveTo(
              (pointer.x + point.x) / 2,
              Math.min(pointer.y, point.y) - 36,
              point.x,
              point.y,
            );
            ctx.strokeStyle = `rgba(174, 210, 205, ${0.3 * (1 - distance / 240)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      frameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  const selected = SYSTEMS[activeSystem];

  return (
    <main className="site-shell">
      <canvas ref={canvasRef} className="network-canvas" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="CulinArch.AI home">
          <span>CulinArch</span>
          <strong>.AI</strong>
        </a>
        <div className="header-status">
          <span className="status-dot" />
          Culinary intelligence architecture
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Structured culinary intelligence</p>
          <h1>
            A system.
            <br />
            A structure.
            <br />
            <span>A new language of taste.</span>
          </h1>
          <p className="intro">
            CulinArch.AI is an evolving architecture for culinary knowledge, operations and intelligent decision-making.
          </p>

          <div className="system-panel" aria-live="polite">
            <p className="panel-index">0{activeSystem + 1} / 04</p>
            <h2>{selected.title}</h2>
            <p>{selected.copy}</p>
          </div>
        </div>

        <nav className="system-nav" aria-label="CulinArch.AI systems">
          {SYSTEMS.map((system, index) => (
            <button
              key={system.id}
              type="button"
              className={index === activeSystem ? "system-link is-active" : "system-link"}
              onMouseEnter={() => activateSystem(index)}
              onFocus={() => activateSystem(index)}
              onClick={() => activateSystem(index)}
              aria-pressed={index === activeSystem}
            >
              <span>0{index + 1}</span>
              {system.label}
            </button>
          ))}
        </nav>
      </section>

      <footer className="site-footer">
        <span>Not a recipe platform.</span>
        <span>Architecture in progress.</span>
      </footer>
    </main>
  );
}
