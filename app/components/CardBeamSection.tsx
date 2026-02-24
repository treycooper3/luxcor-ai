"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

const CODE_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";

const CARD_IMAGES = [
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
];

const CARDS_COUNT = 30;

function generateCode(width: number, height: number): string {
  const randInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = <T,>(arr: T[]): T => arr[randInt(0, arr.length - 1)];

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

  for (let i = 0; i < 40; i++) {
    const n1 = randInt(1, 9);
    const n2 = randInt(10, 99);
    library.push(`const v${i} = (${n1} + ${n2}) * 0.${randInt(1, 9)};`);
  }

  let flow = library.join(" ").replace(/\s+/g, " ").trim();
  const totalChars = width * height;
  while (flow.length < totalChars + width) {
    flow += " " + pick(library).replace(/\s+/g, " ").trim();
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

export default function CardBeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
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
  const animFrameRef = useRef<number>(0);
  const particleSystemRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    particles: THREE.Points;
    velocities: Float32Array;
    particleCount: number;
  } | null>(null);
  const scannerRef = useRef<{
    ctx: CanvasRenderingContext2D;
    particles: Array<{
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
    }>;
    w: number;
    h: number;
    lightBarX: number;
    lightBarWidth: number;
    fadeZone: number;
    intensity: number;
    maxParticles: number;
    baseIntensity: number;
    baseMaxParticles: number;
    baseFadeZone: number;
    currentIntensity: number;
    currentMaxParticles: number;
    currentFadeZone: number;
    currentGlowIntensity: number;
    gradientCanvas: HTMLCanvasElement;
    animId: number;
  } | null>(null);
  const asciiIntervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const createCards = useCallback(() => {
    const cardLine = cardLineRef.current;
    if (!cardLine) return;
    cardLine.innerHTML = "";

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
        const canvas = document.createElement("canvas");
        canvas.width = 400;
        canvas.height = 250;
        const ctx = canvas.getContext("2d")!;
        const gradient = ctx.createLinearGradient(0, 0, 400, 250);
        gradient.addColorStop(0, "#667eea");
        gradient.addColorStop(1, "#764ba2");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 250);
        cardImage.src = canvas.toDataURL();
      };
      normalCard.appendChild(cardImage);

      const asciiCard = document.createElement("div");
      asciiCard.className = "cb-card cb-card-ascii";
      const asciiContent = document.createElement("div");
      asciiContent.className = "cb-ascii-content";
      const { width, height, fontSize, lineHeight } = calculateCodeDimensions(400, 250);
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

      const normalCard = wrapper.querySelector(".cb-card-normal") as HTMLElement;
      const asciiCard = wrapper.querySelector(".cb-card-ascii") as HTMLElement;
      if (!normalCard || !asciiCard) return;

      if (cardLeft < scannerRight && cardRight > scannerLeft) {
        anyScanningActive = true;
        const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
        const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);
        const normalClipRight = (scannerIntersectLeft / cardWidth) * 100;
        const asciiClipLeft = (scannerIntersectRight / cardWidth) * 100;

        normalCard.style.setProperty("--clip-right", `${normalClipRight}%`);
        asciiCard.style.setProperty("--clip-left", `${asciiClipLeft}%`);

        if (!wrapper.hasAttribute("data-scanned") && scannerIntersectLeft > 0) {
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
    if (scannerRef.current) {
      scannerRef.current.intensity = anyScanningActive ? 1.8 : scannerRef.current.baseIntensity;
    }
  }, []);

  const animate = useCallback(() => {
    const s = stateRef.current;
    const currentTime = performance.now();
    const deltaTime = (currentTime - s.lastTime) / 1000;
    s.lastTime = currentTime;

    if (s.isAnimating && !s.isDragging) {
      if (s.velocity > 30) {
        s.velocity *= 0.95;
      } else {
        s.velocity = Math.max(30, s.velocity);
      }

      s.position += s.velocity * s.direction * deltaTime;

      if (s.position < -s.cardLineWidth) {
        s.position = s.containerWidth;
      } else if (s.position > s.containerWidth) {
        s.position = -s.cardLineWidth;
      }

      if (cardLineRef.current) {
        cardLineRef.current.style.transform = `translateX(${s.position}px)`;
      }
      updateCardClipping();
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }, [updateCardClipping]);

  // Initialize particle system (Three.js)
  const initParticleSystem = useCallback(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const particleCount = 400;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2, window.innerWidth / 2, 125, -125, 1, 1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, 250);
    renderer.setClearColor(0x000000, 0);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const alphas = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount);

    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100;
    texCanvas.height = 100;
    const texCtx = texCanvas.getContext("2d")!;
    const half = 50;
    const gradient = texCtx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0.025, "#fff");
    gradient.addColorStop(0.1, "hsl(217, 61%, 33%)");
    gradient.addColorStop(0.25, "hsl(217, 64%, 6%)");
    gradient.addColorStop(1, "transparent");
    texCtx.fillStyle = gradient;
    texCtx.beginPath();
    texCtx.arc(half, half, half, 0, Math.PI * 2);
    texCtx.fill();
    const texture = new THREE.CanvasTexture(texCanvas);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
      positions[i * 3 + 2] = 0;
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
      alphas[i] = (Math.random() * 8 + 2) / 10;
      velocities[i] = Math.random() * 60 + 30;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture }, size: { value: 15.0 } },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        varying vec3 vColor;
        uniform float size;
        void main() {
          vAlpha = alpha;
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    particleSystemRef.current = { renderer, scene, camera, particles, velocities, particleCount };

    const animateParticles = () => {
      const sys = particleSystemRef.current;
      if (!sys) return;
      const pos = sys.particles.geometry.attributes.position.array as Float32Array;
      const alph = sys.particles.geometry.attributes.alpha.array as Float32Array;
      const time = Date.now() * 0.001;

      for (let i = 0; i < sys.particleCount; i++) {
        pos[i * 3] += sys.velocities[i] * 0.016;
        if (pos[i * 3] > window.innerWidth / 2 + 100) {
          pos[i * 3] = -window.innerWidth / 2 - 100;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 250;
        }
        pos[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
        const twinkle = Math.floor(Math.random() * 10);
        if (twinkle === 1 && alph[i] > 0) alph[i] -= 0.05;
        else if (twinkle === 2 && alph[i] < 1) alph[i] += 0.05;
        alph[i] = Math.max(0, Math.min(1, alph[i]));
      }

      sys.particles.geometry.attributes.position.needsUpdate = true;
      sys.particles.geometry.attributes.alpha.needsUpdate = true;
      sys.renderer.render(sys.scene, sys.camera);
      requestAnimationFrame(animateParticles);
    };
    animateParticles();
  }, []);

  // Initialize scanner particle system (2D Canvas)
  const initScanner = useCallback(() => {
    const canvas = scannerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = window.innerWidth;
    const h = 300;
    canvas.width = w;
    canvas.height = h;

    // Create gradient cache
    const gradientCanvas = document.createElement("canvas");
    gradientCanvas.width = 16;
    gradientCanvas.height = 16;
    const gCtx = gradientCanvas.getContext("2d")!;
    const gHalf = 8;
    const gGrad = gCtx.createRadialGradient(gHalf, gHalf, 0, gHalf, gHalf, gHalf);
    gGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    gGrad.addColorStop(0.3, "rgba(196, 181, 253, 0.8)");
    gGrad.addColorStop(0.7, "rgba(139, 92, 246, 0.4)");
    gGrad.addColorStop(1, "transparent");
    gCtx.fillStyle = gGrad;
    gCtx.beginPath();
    gCtx.arc(gHalf, gHalf, gHalf, 0, Math.PI * 2);
    gCtx.fill();

    const baseIntensity = 0.8;
    const baseMaxParticles = 800;
    const baseFadeZone = 60;

    type ScanParticle = {
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; originalAlpha: number;
      life: number; time: number; decay: number;
      twinkleSpeed: number; twinkleAmount: number;
    };

    const rf = (min: number, max: number) => Math.random() * (max - min) + min;

    const createParticle = (lightBarX: number, lightBarWidth: number): ScanParticle => ({
      x: lightBarX + rf(-lightBarWidth / 2, lightBarWidth / 2),
      y: rf(0, h),
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

    const particles: ScanParticle[] = [];
    const lightBarX = w / 2;
    const lightBarWidth = 3;
    for (let i = 0; i < baseMaxParticles; i++) {
      particles.push(createParticle(lightBarX, lightBarWidth));
    }

    const state = {
      ctx,
      particles,
      w, h,
      lightBarX,
      lightBarWidth,
      fadeZone: baseFadeZone,
      intensity: baseIntensity,
      maxParticles: baseMaxParticles,
      baseIntensity,
      baseMaxParticles,
      baseFadeZone,
      currentIntensity: baseIntensity,
      currentMaxParticles: baseMaxParticles,
      currentFadeZone: baseFadeZone,
      currentGlowIntensity: 1,
      gradientCanvas,
      animId: 0,
    };
    scannerRef.current = state;

    const transitionSpeed = 0.05;

    const render = () => {
      const s = scannerRef.current;
      if (!s) return;

      const scanning = stateRef.current.scanningActive;
      const targetIntensity = scanning ? 1.8 : s.baseIntensity;
      const targetMaxParticles = scanning ? 2500 : s.baseMaxParticles;
      const targetFadeZone = scanning ? 35 : s.baseFadeZone;
      const targetGlow = scanning ? 3.5 : 1;

      s.currentIntensity += (targetIntensity - s.currentIntensity) * transitionSpeed;
      s.currentMaxParticles += (targetMaxParticles - s.currentMaxParticles) * transitionSpeed;
      s.currentFadeZone += (targetFadeZone - s.currentFadeZone) * transitionSpeed;
      s.currentGlowIntensity += (targetGlow - s.currentGlowIntensity) * transitionSpeed;
      s.intensity = s.currentIntensity;
      s.maxParticles = Math.floor(s.currentMaxParticles);
      s.fadeZone = s.currentFadeZone;

      s.ctx.globalCompositeOperation = "source-over";
      s.ctx.clearRect(0, 0, s.w, s.h);

      // Draw light bar
      const vGrad = s.ctx.createLinearGradient(0, 0, 0, s.h);
      vGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      vGrad.addColorStop(s.fadeZone / s.h, "rgba(255, 255, 255, 1)");
      vGrad.addColorStop(1 - s.fadeZone / s.h, "rgba(255, 255, 255, 1)");
      vGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

      s.ctx.globalCompositeOperation = "lighter";
      const gl = s.currentGlowIntensity;
      const lw = s.lightBarWidth;

      // Core
      const coreGrad = s.ctx.createLinearGradient(s.lightBarX - lw / 2, 0, s.lightBarX + lw / 2, 0);
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      coreGrad.addColorStop(0.3, `rgba(255, 255, 255, ${0.9 * gl})`);
      coreGrad.addColorStop(0.5, `rgba(255, 255, 255, ${1 * gl})`);
      coreGrad.addColorStop(0.7, `rgba(255, 255, 255, ${0.9 * gl})`);
      coreGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      s.ctx.globalAlpha = 1;
      s.ctx.fillStyle = coreGrad;
      s.ctx.beginPath();
      s.ctx.roundRect(s.lightBarX - lw / 2, 0, lw, s.h, 15);
      s.ctx.fill();

      // Glow 1
      const g1 = s.ctx.createLinearGradient(s.lightBarX - lw * 2, 0, s.lightBarX + lw * 2, 0);
      g1.addColorStop(0, "rgba(139, 92, 246, 0)");
      g1.addColorStop(0.5, `rgba(196, 181, 253, ${0.8 * gl})`);
      g1.addColorStop(1, "rgba(139, 92, 246, 0)");
      s.ctx.globalAlpha = scanning ? 1.0 : 0.8;
      s.ctx.fillStyle = g1;
      s.ctx.beginPath();
      s.ctx.roundRect(s.lightBarX - lw * 2, 0, lw * 4, s.h, 25);
      s.ctx.fill();

      // Glow 2
      const g2 = s.ctx.createLinearGradient(s.lightBarX - lw * 4, 0, s.lightBarX + lw * 4, 0);
      g2.addColorStop(0, "rgba(139, 92, 246, 0)");
      g2.addColorStop(0.5, `rgba(139, 92, 246, ${0.4 * gl})`);
      g2.addColorStop(1, "rgba(139, 92, 246, 0)");
      s.ctx.globalAlpha = scanning ? 0.8 : 0.6;
      s.ctx.fillStyle = g2;
      s.ctx.beginPath();
      s.ctx.roundRect(s.lightBarX - lw * 4, 0, lw * 8, s.h, 35);
      s.ctx.fill();

      // Mask with vertical gradient
      s.ctx.globalCompositeOperation = "destination-in";
      s.ctx.globalAlpha = 1;
      s.ctx.fillStyle = vGrad;
      s.ctx.fillRect(0, 0, s.w, s.h);

      // Draw particles
      s.ctx.globalCompositeOperation = "lighter";
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.time++;
        p.alpha = p.originalAlpha * p.life + Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
        p.life -= p.decay;

        if (p.x > s.w + 10 || p.life <= 0) {
          Object.assign(p, createParticle(s.lightBarX, s.lightBarWidth));
          continue;
        }

        let fadeAlpha = 1;
        if (p.y < s.fadeZone) fadeAlpha = p.y / s.fadeZone;
        else if (p.y > s.h - s.fadeZone) fadeAlpha = (s.h - p.y) / s.fadeZone;
        fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

        s.ctx.globalAlpha = p.alpha * fadeAlpha;
        s.ctx.drawImage(s.gradientCanvas, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
      }

      // Spawn new particles based on intensity
      if (Math.random() < s.intensity && s.particles.length < s.maxParticles) {
        s.particles.push(createParticle(s.lightBarX, s.lightBarWidth));
      }

      // Trim excess
      if (s.particles.length > s.maxParticles + 200) {
        s.particles.splice(s.maxParticles, s.particles.length - s.maxParticles);
      }

      s.animId = requestAnimationFrame(render);
    };

    state.animId = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    const s = stateRef.current;
    s.containerWidth = window.innerWidth;
    const cardWidth = 400;
    const cardGap = 60;
    s.cardLineWidth = (cardWidth + cardGap) * CARDS_COUNT;
    s.position = s.containerWidth;
    s.lastTime = performance.now();

    createCards();
    initParticleSystem();
    initScanner();

    animFrameRef.current = requestAnimationFrame(animate);

    // Periodic ASCII updates
    asciiIntervalRef.current = setInterval(() => {
      const cardLine = cardLineRef.current;
      if (!cardLine) return;
      cardLine.querySelectorAll(".cb-ascii-content").forEach((content) => {
        if (Math.random() < 0.15) {
          const { width, height } = calculateCodeDimensions(400, 250);
          content.textContent = generateCode(width, height);
        }
      });
    }, 200);

    // Drag handlers
    const cardLine = cardLineRef.current;
    if (!cardLine) return;

    const startDrag = (e: MouseEvent | Touch) => {
      if (e instanceof MouseEvent) e.preventDefault();
      s.isDragging = true;
      s.isAnimating = false;
      s.lastMouseX = "clientX" in e ? e.clientX : 0;
      s.mouseVelocity = 0;
      const transform = window.getComputedStyle(cardLine).transform;
      if (transform !== "none") {
        const matrix = new DOMMatrix(transform);
        s.position = matrix.m41;
      }
    };

    const onDrag = (e: MouseEvent | Touch) => {
      if (!s.isDragging) return;
      if (e instanceof MouseEvent) e.preventDefault();
      const clientX = "clientX" in e ? e.clientX : 0;
      const deltaX = clientX - s.lastMouseX;
      s.position += deltaX;
      s.mouseVelocity = deltaX * 60;
      s.lastMouseX = clientX;
      cardLine.style.transform = `translateX(${s.position}px)`;
      updateCardClipping();
    };

    const endDrag = () => {
      if (!s.isDragging) return;
      s.isDragging = false;
      if (Math.abs(s.mouseVelocity) > 30) {
        s.velocity = Math.abs(s.mouseVelocity);
        s.direction = s.mouseVelocity > 0 ? 1 : -1;
      } else {
        s.velocity = 120;
      }
      s.isAnimating = true;
    };

    const onMouseDown = (e: MouseEvent) => startDrag(e);
    const onMouseMove = (e: MouseEvent) => onDrag(e);
    const onMouseUp = () => endDrag();
    const onTouchStart = (e: TouchEvent) => { e.preventDefault(); startDrag(e.touches[0]); };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); onDrag(e.touches[0]); };
    const onTouchEnd = () => endDrag();
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      s.position += e.deltaY > 0 ? 20 : -20;
      if (s.position < -s.cardLineWidth) s.position = s.containerWidth;
      else if (s.position > s.containerWidth) s.position = -s.cardLineWidth;
      cardLine.style.transform = `translateX(${s.position}px)`;
      updateCardClipping();
    };

    cardLine.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    cardLine.addEventListener("touchstart", onTouchStart, { passive: false });
    document.addEventListener("touchmove", onTouchMove as EventListener, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
    cardLine.addEventListener("wheel", onWheel, { passive: false });

    const onResize = () => {
      s.containerWidth = window.innerWidth;
      if (particleSystemRef.current) {
        const sys = particleSystemRef.current;
        sys.camera.left = -window.innerWidth / 2;
        sys.camera.right = window.innerWidth / 2;
        sys.camera.updateProjectionMatrix();
        sys.renderer.setSize(window.innerWidth, 250);
      }
      if (scannerRef.current) {
        const sc = scannerRef.current;
        sc.w = window.innerWidth;
        sc.lightBarX = window.innerWidth / 2;
        const canvas = scannerCanvasRef.current;
        if (canvas) {
          canvas.width = sc.w;
          canvas.height = sc.h;
        }
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (scannerRef.current) cancelAnimationFrame(scannerRef.current.animId);
      if (asciiIntervalRef.current) clearInterval(asciiIntervalRef.current);
      if (particleSystemRef.current) {
        particleSystemRef.current.renderer.dispose();
        particleSystemRef.current.particles.geometry.dispose();
        (particleSystemRef.current.particles.material as THREE.Material).dispose();
      }
      cardLine.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      cardLine.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove as EventListener);
      document.removeEventListener("touchend", onTouchEnd);
      cardLine.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, [createCards, animate, initParticleSystem, initScanner, updateCardClipping]);

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
          actually work — custom AI that pays for itself.
        </p>
      </div>

      <div ref={containerRef} className="cb-container">
        <canvas ref={particleCanvasRef} className="cb-particle-canvas" />
        <canvas ref={scannerCanvasRef} className="cb-scanner-canvas" />
        <div className="cb-card-stream">
          <div ref={cardLineRef} className="cb-card-line" />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center mt-12">
        <a
          href="#services"
          className="inline-block rounded-full border border-gold/30 bg-gold/10 px-8 py-4 text-base font-semibold text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
        >
          See What Real AI Looks Like &rarr;
        </a>
      </div>
    </section>
  );
}
