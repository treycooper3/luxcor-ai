"use client";

import { useEffect, useRef } from "react";

const CUSTOM_STRINGS = [
  "Trey Cooper",
  "Stay Starving",
  "LUXCOR AI",
  "CEO",
  "CFO",
  "CTO",
  "COO",
  "VP",
  "Director",
  "Founder",
  "Revenue",
  "Growth",
  "Scale",
  "Automate",
  "Pipeline",
  "Workflow",
  "Execute",
  "Deploy",
  "Optimize",
  "Transform",
];

function randInt(from: number, to: number) {
  return ~~(Math.random() * (to - from + 1) + from);
}

function getChar(): string {
  if (Math.random() < 0.15) {
    const word = CUSTOM_STRINGS[randInt(0, CUSTOM_STRINGS.length - 1)];
    return word[randInt(0, word.length - 1)];
  }
  const ranges = [
    [0x3041, 0x30ff],
    [0x2000, 0x206f],
    [0x0020, 0x003f],
  ];
  const range = ranges[randInt(0, ranges.length - 1)];
  return String.fromCharCode(randInt(range[0], range[1]));
}

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mounted = true;
    let isVisible = true;

    const isMobile = window.innerWidth < 768;
    const columnCount = isMobile ? 20 : 40;
    const fontSize = isMobile ? 10 : 12;
    let width = canvas.parentElement?.clientWidth ?? window.innerWidth;
    let height = canvas.parentElement?.clientHeight ?? window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const columnWidth = width / columnCount;
    const drops = new Float32Array(columnCount);
    const speeds = new Float32Array(columnCount);
    const trailLengths = new Int32Array(columnCount);
    const opacityMult = new Float32Array(columnCount);

    for (let i = 0; i < columnCount; i++) {
      drops[i] = Math.random() * -height;
      speeds[i] = randInt(30, 80);
      trailLengths[i] = randInt(8, 20);
      opacityMult[i] = 0.6 + Math.random() * 0.4;
    }

    let lastTime = 0;
    let animId = 0;

    const render = (time: number) => {
      if (!mounted) return;
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const delta = lastTime === 0 ? 0.016 : (time - lastTime) / 1000;
      lastTime = time;

      ctx.fillStyle = "rgba(10, 10, 10, 0.18)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "Helvetica Neue", Helvetica, sans-serif`;
      ctx.textAlign = "center";

      const jitterRange = columnWidth * 0.2;

      for (let col = 0; col < columnCount; col++) {
        drops[col] += speeds[col] * delta;

        if (drops[col] > height + trailLengths[col] * fontSize) {
          drops[col] = Math.random() * -200;
          speeds[col] = randInt(30, 80);
        }

        const headY = drops[col];
        const colMult = opacityMult[col];

        for (let row = 0; row < trailLengths[col]; row++) {
          const charY = headY - row * fontSize;
          if (charY < -fontSize || charY > height + fontSize) continue;

          const brightness =
            (row === 0 ? 0.18 : 0.07 * (1 - row / trailLengths[col])) *
            colMult;
          if (brightness <= 0) continue;

          const jitterX = (Math.random() - 0.5) * 2 * jitterRange;

          ctx.fillStyle = `rgba(14, 165, 233, ${brightness})`;
          ctx.fillText(
            getChar(),
            col * columnWidth + columnWidth / 2 + jitterX,
            charY
          );
        }
      }
    };

    animId = requestAnimationFrame(render);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onResize = () => {
      width = canvas.parentElement?.clientWidth ?? window.innerWidth;
      height = canvas.parentElement?.clientHeight ?? window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
