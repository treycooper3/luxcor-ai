"use client";

import { useEffect, useRef, useCallback } from "react";

const CARD_IMAGES = [
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
];

const CARDS_COUNT = 12;

function generateCode(width: number, height: number): string {
  const library = [
    "// compiled preview - scanner demo",
    "const SCAN_WIDTH = 8;",
    "const FADE_ZONE = 35;",
    "const MAX_PARTICLES = 2500;",
    "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
    "function lerp(a, b, t) { return a + (b - a) * t; }",
    "const now = () => performance.now();",
    "class Particle {",
    "  constructor(x, y, vx, vy, r, a) {",
    "    this.x = x; this.y = y;",
    "    this.vx = vx; this.vy = vy;",
    "  }",
    "  step(dt) { this.x += this.vx * dt; this.y += this.vy * dt; }",
    "}",
    "const scanner = {",
    "  x: Math.floor(window.innerWidth / 2),",
    "  width: SCAN_WIDTH,",
    "  glow: 3.5,",
    "};",
    "function drawParticle(ctx, p) {",
    "  ctx.globalAlpha = clamp(p.a, 0, 1);",
    "}",
    "function tick(t) {",
    "  const dt = 0.016;",
    "}",
    "ctx.globalCompositeOperation = 'lighter';",
  ];

  const randInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < 40; i++) {
    const n1 = randInt(1, 9);
    const n2 = randInt(10, 99);
    library.push(`const v${i} = (${n1} + ${n2}) * 0.${randInt(1, 9)};`);
  }

  let flow = library.join(" ").replace(/\s+/g, " ").trim();
  const totalChars = width * height;
  while (flow.length < totalChars + width) {
    flow +=
      " " +
      library[randInt(0, library.length - 1)].replace(/\s+/g, " ").trim();
  }

  let out = "";
  let offset = 0;
  for (let row = 0; row < height; row++) {
    let line = flow.slice(offset, offset + width);
    if (line.length < width) line = line + " ".repeat(width - line.length);
    out += line + (row < height - 1 ? "\n" : "");
    offset += width;
  }
  return out;
}

function calculateCodeDimensions(cardWidth: number, cardHeight: number) {
  const fontSize = 11;
  const lineHeight = 13;
  const charWidth = 6;
  const width = Math.floor(cardWidth / charWidth);
  const height = Math.floor(cardHeight / lineHeight);
  return { width, height, fontSize, lineHeight };
}

interface FloatingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

interface ScanParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  originalAlpha: number;
  life: number;
  time: number;
  decay: number;
  twinkleSpeed: number;
  twinkleAmount: number;
}

export default function CardBeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardLineRef = useRef<HTMLDivElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const stateRef = useRef({
    position: 0,
    velocity: 120,
    direction: -1,
    isAnimating: true,
    isDragging: false,
    lastTime: 0,
    lastMouseX: 0,
    mouseVelocity: 0,
    containerWidth: 0,
    cardLineWidth: 0,
    scanningActive: false,
  });
  const scannerStateRef = useRef<{
    ctx: CanvasRenderingContext2D;
    particles: ScanParticle[];
    floatingParticles: FloatingParticle[];
    w: number;
    h: number;
    lightBarX: number;
    lightBarWidth: number;
    fadeZone: number;
    baseIntensity: number;
    baseMaxParticles: number;
    baseFadeZone: number;
    currentIntensity: number;
    currentMaxParticles: number;
    currentFadeZone: number;
    currentGlowIntensity: number;
    gradientCanvas: HTMLCanvasElement;
    floatingGradientCanvas: HTMLCanvasElement;
  } | null>(null);
  const asciiIntervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const createCards = useCallback(() => {
    const cardLine = cardLineRef.current;
    if (!cardLine) return;
    // Clear existing children safely
    while (cardLine.firstChild) {
      cardLine.removeChild(cardLine.firstChild);
    }

    for (let i = 0; i < CARDS_COUNT; i++) {
      const wrapper = document.createElement("div");
      wrapper.className = "cb-card-wrapper";

      const normalCard = document.createElement("div");
      normalCard.className = "cb-card cb-card-normal";

      const cardImage = document.createElement("img");
      cardImage.className = "cb-card-image";
      cardImage.src = CARD_IMAGES[i % CARD_IMAGES.length];
      cardImage.alt = "Card";
      cardImage.onerror = () => {
        const fallbackCanvas = document.createElement("canvas");
        fallbackCanvas.width = 400;
        fallbackCanvas.height = 250;
        const fallbackCtx = fallbackCanvas.getContext("2d")!;
        const gradient = fallbackCtx.createLinearGradient(0, 0, 400, 250);
        gradient.addColorStop(0, "#667eea");
        gradient.addColorStop(1, "#764ba2");
        fallbackCtx.fillStyle = gradient;
        fallbackCtx.fillRect(0, 0, 400, 250);
        cardImage.src = fallbackCanvas.toDataURL();
      };
      normalCard.appendChild(cardImage);

      const asciiCard = document.createElement("div");
      asciiCard.className = "cb-card cb-card-ascii";
      const asciiContent = document.createElement("div");
      asciiContent.className = "cb-ascii-content";
      const { width, height, fontSize, lineHeight } =
        calculateCodeDimensions(400, 250);
      asciiContent.style.fontSize = fontSize + "px";
      asciiContent.style.lineHeight = lineHeight + "px";
      asciiContent.textContent = generateCode(width, height);
      asciiCard.appendChild(asciiContent);

      wrapper.appendChild(normalCard);
      wrapper.appendChild(asciiCard);
      cardLine.appendChild(wrapper);
    }
  }, []);

  const updateCardClipping = useCallback(() => {
    const cardLine = cardLineRef.current;
    if (!cardLine) return;

    const scannerX = window.innerWidth / 2;
    const scannerWidth = 8;
    const scannerLeft = scannerX - scannerWidth / 2;
    const scannerRight = scannerX + scannerWidth / 2;
    let anyScanningActive = false;

    cardLine.querySelectorAll(".cb-card-wrapper").forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const cardLeft = rect.left;
      const cardRight = rect.right;
      const cardWidth = rect.width;

      const normalCard = wrapper.querySelector(
        ".cb-card-normal"
      ) as HTMLElement;
      const asciiCard = wrapper.querySelector(".cb-card-ascii") as HTMLElement;
      if (!normalCard || !asciiCard) return;

      if (cardLeft < scannerRight && cardRight > scannerLeft) {
        anyScanningActive = true;
        const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
        const scannerIntersectRight = Math.min(
          scannerRight - cardLeft,
          cardWidth
        );
        const normalClipRight = (scannerIntersectLeft / cardWidth) * 100;
        const asciiClipLeft = (scannerIntersectRight / cardWidth) * 100;

        normalCard.style.setProperty("--clip-right", `${normalClipRight}%`);
        asciiCard.style.setProperty("--clip-left", `${asciiClipLeft}%`);

        if (
          !wrapper.hasAttribute("data-scanned") &&
          scannerIntersectLeft > 0
        ) {
          wrapper.setAttribute("data-scanned", "true");
          const scanEffect = document.createElement("div");
          scanEffect.className = "cb-scan-effect";
          wrapper.appendChild(scanEffect);
          setTimeout(() => scanEffect.remove(), 600);
        }
      } else {
        if (cardRight < scannerLeft) {
          normalCard.style.setProperty("--clip-right", "100%");
          asciiCard.style.setProperty("--clip-left", "100%");
        } else if (cardLeft > scannerRight) {
          normalCard.style.setProperty("--clip-right", "0%");
          asciiCard.style.setProperty("--clip-left", "0%");
        }
        wrapper.removeAttribute("data-scanned");
      }
    });

    stateRef.current.scanningActive = anyScanningActive;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = scannerCanvasRef.current;
    const cardLine = cardLineRef.current;
    if (!container || !canvas || !cardLine) return;

    let mounted = true;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup visibility observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0, rootMargin: "100px" }
    );
    observer.observe(container);

    // Init state
    const state = stateRef.current;
    state.containerWidth = window.innerWidth;
    const cardWidth = 400;
    const cardGap = 60;
    state.cardLineWidth = (cardWidth + cardGap) * CARDS_COUNT;
    state.position = state.containerWidth;
    state.lastTime = performance.now();

    // Create cards
    createCards();

    // Setup scanner canvas
    const canvasWidth = window.innerWidth;
    const canvasHeight = 300;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Create gradient cache for scanner particles
    const gradientCanvas = document.createElement("canvas");
    gradientCanvas.width = 16;
    gradientCanvas.height = 16;
    const gCtx = gradientCanvas.getContext("2d")!;
    const gHalf = 8;
    const gGrad = gCtx.createRadialGradient(
      gHalf,
      gHalf,
      0,
      gHalf,
      gHalf,
      gHalf
    );
    gGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    gGrad.addColorStop(0.3, "rgba(196, 181, 253, 0.8)");
    gGrad.addColorStop(0.7, "rgba(139, 92, 246, 0.4)");
    gGrad.addColorStop(1, "transparent");
    gCtx.fillStyle = gGrad;
    gCtx.beginPath();
    gCtx.arc(gHalf, gHalf, gHalf, 0, Math.PI * 2);
    gCtx.fill();

    // Create gradient cache for floating particles (replacing Three.js)
    const floatingGradientCanvas = document.createElement("canvas");
    floatingGradientCanvas.width = 32;
    floatingGradientCanvas.height = 32;
    const fCtx = floatingGradientCanvas.getContext("2d")!;
    const fHalf = 16;
    const fGrad = fCtx.createRadialGradient(
      fHalf,
      fHalf,
      0,
      fHalf,
      fHalf,
      fHalf
    );
    fGrad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    fGrad.addColorStop(0.15, "rgba(100, 130, 220, 0.5)");
    fGrad.addColorStop(0.4, "rgba(80, 100, 180, 0.2)");
    fGrad.addColorStop(1, "transparent");
    fCtx.fillStyle = fGrad;
    fCtx.beginPath();
    fCtx.arc(fHalf, fHalf, fHalf, 0, Math.PI * 2);
    fCtx.fill();

    const rf = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const lightBarX = canvasWidth / 2;
    const lightBarWidth = 3;
    const baseMaxParticles = 300;

    const createScanParticle = (): ScanParticle => ({
      x: lightBarX + rf(-lightBarWidth / 2, lightBarWidth / 2),
      y: rf(0, canvasHeight),
      vx: rf(0.2, 1.0),
      vy: rf(-0.15, 0.15),
      radius: rf(0.4, 1),
      alpha: rf(0.6, 1),
      originalAlpha: rf(0.6, 1),
      life: 1.0,
      time: 0,
      decay: rf(0.005, 0.025),
      twinkleSpeed: rf(0.02, 0.08),
      twinkleAmount: rf(0.1, 0.25),
    });

    const scanParticles: ScanParticle[] = [];
    for (let i = 0; i < baseMaxParticles; i++) {
      scanParticles.push(createScanParticle());
    }

    // Create floating particles (replacement for Three.js)
    const floatingParticles: FloatingParticle[] = [];
    for (let i = 0; i < 50; i++) {
      floatingParticles.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        vx: rf(0.3, 1.5),
        vy: rf(-0.3, 0.3),
        alpha: rf(0.2, 0.8),
        size: rf(2, 6),
      });
    }

    scannerStateRef.current = {
      ctx,
      particles: scanParticles,
      floatingParticles,
      w: canvasWidth,
      h: canvasHeight,
      lightBarX,
      lightBarWidth,
      fadeZone: 60,
      baseIntensity: 0.5,
      baseMaxParticles,
      baseFadeZone: 60,
      currentIntensity: 0.5,
      currentMaxParticles: baseMaxParticles,
      currentFadeZone: 60,
      currentGlowIntensity: 1,
      gradientCanvas,
      floatingGradientCanvas,
    };

    // Single unified animation loop
    const tick = () => {
      if (!mounted) return;
      animFrameRef.current = requestAnimationFrame(tick);
      if (!isVisibleRef.current) return;

      const scanner = scannerStateRef.current;
      if (!scanner) return;

      // --- Card carousel ---
      const currentTime = performance.now();
      const deltaTime = (currentTime - state.lastTime) / 1000;
      state.lastTime = currentTime;

      if (state.isAnimating && !state.isDragging) {
        if (state.velocity > 30) {
          state.velocity *= 0.95;
        } else {
          state.velocity = Math.max(30, state.velocity);
        }

        state.position += state.velocity * state.direction * deltaTime;

        if (state.position < -state.cardLineWidth) {
          state.position = state.containerWidth;
        } else if (state.position > state.containerWidth) {
          state.position = -state.cardLineWidth;
        }

        if (cardLine) {
          cardLine.style.transform = `translateX(${state.position}px)`;
        }
        updateCardClipping();
      }

      // --- Scanner rendering ---
      const scanning = state.scanningActive;
      const transitionSpeed = 0.05;
      const targetIntensity = scanning ? 1.8 : scanner.baseIntensity;
      const targetMaxParticles = scanning ? 800 : scanner.baseMaxParticles;
      const targetFadeZone = scanning ? 35 : scanner.baseFadeZone;
      const targetGlow = scanning ? 3.5 : 1;

      scanner.currentIntensity +=
        (targetIntensity - scanner.currentIntensity) * transitionSpeed;
      scanner.currentMaxParticles +=
        (targetMaxParticles - scanner.currentMaxParticles) * transitionSpeed;
      scanner.currentFadeZone +=
        (targetFadeZone - scanner.currentFadeZone) * transitionSpeed;
      scanner.currentGlowIntensity +=
        (targetGlow - scanner.currentGlowIntensity) * transitionSpeed;

      scanner.ctx.globalCompositeOperation = "source-over";
      scanner.ctx.clearRect(0, 0, scanner.w, scanner.h);

      // Draw floating particles first (background layer)
      scanner.ctx.globalCompositeOperation = "lighter";
      for (const fp of scanner.floatingParticles) {
        fp.x += fp.vx;
        fp.y += fp.vy + Math.sin(currentTime * 0.001 + fp.x * 0.01) * 0.3;

        if (fp.x > scanner.w + 20) {
          fp.x = -20;
          fp.y = Math.random() * scanner.h;
        }

        let fadeAlpha = 1;
        if (fp.y < 30) fadeAlpha = fp.y / 30;
        else if (fp.y > scanner.h - 30) fadeAlpha = (scanner.h - fp.y) / 30;
        fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

        scanner.ctx.globalAlpha = fp.alpha * fadeAlpha;
        scanner.ctx.drawImage(
          scanner.floatingGradientCanvas,
          fp.x - fp.size,
          fp.y - fp.size,
          fp.size * 2,
          fp.size * 2
        );
      }

      // Draw light bar
      const vGrad = scanner.ctx.createLinearGradient(0, 0, 0, scanner.h);
      vGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      vGrad.addColorStop(
        scanner.currentFadeZone / scanner.h,
        "rgba(255, 255, 255, 1)"
      );
      vGrad.addColorStop(
        1 - scanner.currentFadeZone / scanner.h,
        "rgba(255, 255, 255, 1)"
      );
      vGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

      scanner.ctx.globalCompositeOperation = "lighter";
      const gl = scanner.currentGlowIntensity;
      const lw = scanner.lightBarWidth;

      // Core bar
      const coreGrad = scanner.ctx.createLinearGradient(
        scanner.lightBarX - lw / 2,
        0,
        scanner.lightBarX + lw / 2,
        0
      );
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      coreGrad.addColorStop(0.3, `rgba(255, 255, 255, ${0.9 * gl})`);
      coreGrad.addColorStop(0.5, `rgba(255, 255, 255, ${1 * gl})`);
      coreGrad.addColorStop(0.7, `rgba(255, 255, 255, ${0.9 * gl})`);
      coreGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      scanner.ctx.globalAlpha = 1;
      scanner.ctx.fillStyle = coreGrad;
      scanner.ctx.beginPath();
      scanner.ctx.roundRect(
        scanner.lightBarX - lw / 2,
        0,
        lw,
        scanner.h,
        15
      );
      scanner.ctx.fill();

      // Glow 1
      const g1 = scanner.ctx.createLinearGradient(
        scanner.lightBarX - lw * 2,
        0,
        scanner.lightBarX + lw * 2,
        0
      );
      g1.addColorStop(0, "rgba(139, 92, 246, 0)");
      g1.addColorStop(0.5, `rgba(196, 181, 253, ${0.8 * gl})`);
      g1.addColorStop(1, "rgba(139, 92, 246, 0)");
      scanner.ctx.globalAlpha = scanning ? 1.0 : 0.8;
      scanner.ctx.fillStyle = g1;
      scanner.ctx.beginPath();
      scanner.ctx.roundRect(
        scanner.lightBarX - lw * 2,
        0,
        lw * 4,
        scanner.h,
        25
      );
      scanner.ctx.fill();

      // Glow 2
      const g2 = scanner.ctx.createLinearGradient(
        scanner.lightBarX - lw * 4,
        0,
        scanner.lightBarX + lw * 4,
        0
      );
      g2.addColorStop(0, "rgba(139, 92, 246, 0)");
      g2.addColorStop(0.5, `rgba(139, 92, 246, ${0.4 * gl})`);
      g2.addColorStop(1, "rgba(139, 92, 246, 0)");
      scanner.ctx.globalAlpha = scanning ? 0.8 : 0.6;
      scanner.ctx.fillStyle = g2;
      scanner.ctx.beginPath();
      scanner.ctx.roundRect(
        scanner.lightBarX - lw * 4,
        0,
        lw * 8,
        scanner.h,
        35
      );
      scanner.ctx.fill();

      // Mask with vertical gradient
      scanner.ctx.globalCompositeOperation = "destination-in";
      scanner.ctx.globalAlpha = 1;
      scanner.ctx.fillStyle = vGrad;
      scanner.ctx.fillRect(0, 0, scanner.w, scanner.h);

      // Draw scanner particles
      scanner.ctx.globalCompositeOperation = "lighter";
      const maxParticles = Math.floor(scanner.currentMaxParticles);
      for (let i = scanner.particles.length - 1; i >= 0; i--) {
        const p = scanner.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.time++;
        p.alpha =
          p.originalAlpha * p.life +
          Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
        p.life -= p.decay;

        if (p.x > scanner.w + 10 || p.life <= 0) {
          Object.assign(p, createScanParticle());
          continue;
        }

        let fadeAlpha = 1;
        if (p.y < scanner.currentFadeZone)
          fadeAlpha = p.y / scanner.currentFadeZone;
        else if (p.y > scanner.h - scanner.currentFadeZone)
          fadeAlpha = (scanner.h - p.y) / scanner.currentFadeZone;
        fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

        scanner.ctx.globalAlpha = p.alpha * fadeAlpha;
        scanner.ctx.drawImage(
          scanner.gradientCanvas,
          p.x - p.radius,
          p.y - p.radius,
          p.radius * 2,
          p.radius * 2
        );
      }

      // Spawn new scan particles based on intensity
      if (
        Math.random() < scanner.currentIntensity &&
        scanner.particles.length < maxParticles
      ) {
        scanner.particles.push(createScanParticle());
      }

      // Trim excess
      if (scanner.particles.length > maxParticles + 200) {
        scanner.particles.splice(
          maxParticles,
          scanner.particles.length - maxParticles
        );
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    // Periodic ASCII updates
    asciiIntervalRef.current = setInterval(() => {
      if (!isVisibleRef.current) return;
      const cl = cardLineRef.current;
      if (!cl) return;
      cl.querySelectorAll(".cb-ascii-content").forEach((content) => {
        if (Math.random() < 0.1) {
          const { width, height } = calculateCodeDimensions(400, 250);
          content.textContent = generateCode(width, height);
        }
      });
    }, 2000);

    // Drag handlers
    const startDrag = (clientX: number) => {
      state.isDragging = true;
      state.isAnimating = false;
      state.lastMouseX = clientX;
      state.mouseVelocity = 0;
      const transform = window.getComputedStyle(cardLine).transform;
      if (transform !== "none") {
        const matrix = new DOMMatrix(transform);
        state.position = matrix.m41;
      }
    };

    const onDrag = (clientX: number) => {
      if (!state.isDragging) return;
      const deltaX = clientX - state.lastMouseX;
      state.position += deltaX;
      state.mouseVelocity = deltaX * 60;
      state.lastMouseX = clientX;
      cardLine.style.transform = `translateX(${state.position}px)`;
      updateCardClipping();
    };

    const endDrag = () => {
      if (!state.isDragging) return;
      state.isDragging = false;
      if (Math.abs(state.mouseVelocity) > 30) {
        state.velocity = Math.abs(state.mouseVelocity);
        state.direction = state.mouseVelocity > 0 ? 1 : -1;
      } else {
        state.velocity = 120;
      }
      state.isAnimating = true;
    };

    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      startDrag(event.clientX);
    };
    const onMouseMove = (event: MouseEvent) => {
      if (state.isDragging) {
        event.preventDefault();
        onDrag(event.clientX);
      }
    };
    const onMouseUp = () => endDrag();
    const onTouchStart = (event: TouchEvent) => {
      startDrag(event.touches[0].clientX);
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!state.isDragging) return;
      event.preventDefault();
      onDrag(event.touches[0].clientX);
    };
    const onTouchEnd = () => endDrag();

    cardLine.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    cardLine.addEventListener("touchstart", onTouchStart, { passive: true });
    cardLine.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);

    const onResize = () => {
      state.containerWidth = window.innerWidth;
      const newWidth = window.innerWidth;
      if (scannerStateRef.current) {
        scannerStateRef.current.w = newWidth;
        scannerStateRef.current.lightBarX = newWidth / 2;
        canvas.width = newWidth;
        canvas.height = canvasHeight;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      cancelAnimationFrame(animFrameRef.current);
      if (asciiIntervalRef.current) clearInterval(asciiIntervalRef.current);
      scannerStateRef.current = null;
      observer.disconnect();
      cardLine.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      cardLine.removeEventListener("touchstart", onTouchStart);
      cardLine.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, [createCards, updateCardClipping]);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-4xl px-6 text-center mb-12">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
          Stop Burning Cash
        </p>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Tired of Throwing Money at AI That{" "}
          <span className="gold-gradient">Doesn&apos;t Deliver?</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted">
          Most agencies sell you templates and dashboards. We build systems that
          actually work. Custom AI that pays for itself.
        </p>
      </div>

      <div ref={containerRef} className="cb-container">
        <canvas ref={scannerCanvasRef} className="cb-scanner-canvas" />
        <div className="cb-card-stream">
          <div ref={cardLineRef} className="cb-card-line" />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center mt-12">
        <a
          href="#services"
          className="inline-block rounded-full border border-gold/30 bg-gold/10 px-8 py-4 text-base font-semibold text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]"
        >
          See What Real AI Looks Like &rarr;
        </a>
      </div>
    </section>
  );
}
