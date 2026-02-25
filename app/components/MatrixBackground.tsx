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

function r(from: number, to: number) {
  return ~~(Math.random() * (to - from + 1) + from);
}

function pick<T>(...args: T[]): T {
  return args[r(0, args.length - 1)];
}

function getChar(): string {
  // 15% chance to pull a character from custom strings
  if (Math.random() < 0.15) {
    const word = CUSTOM_STRINGS[r(0, CUSTOM_STRINGS.length - 1)];
    return word[r(0, word.length - 1)];
  }
  return String.fromCharCode(
    pick(r(0x3041, 0x30ff), r(0x2000, 0x206f), r(0x0020, 0x003f))
  );
}

function loop(fn: () => void, delay: number): () => void {
  let stamp = Date.now();
  let running = true;
  function _loop() {
    if (!running) return;
    if (Date.now() - stamp >= delay) {
      fn();
      stamp = Date.now();
    }
    requestAnimationFrame(_loop);
  }
  requestAnimationFrame(_loop);
  return () => {
    running = false;
  };
}

class Char {
  element: HTMLSpanElement;
  private cleanup?: () => void;

  constructor() {
    this.element = document.createElement("span");
    this.element.style.display = "block";
    this.element.style.width = "2vmax";
    this.element.style.height = "2vmax";
    this.element.style.fontSize = "2vmax";
    this.element.style.color = "rgba(14, 165, 233, 0.04)";
    this.element.style.textAlign = "center";
    this.element.style.fontFamily =
      '"Helvetica Neue", Helvetica, sans-serif';
    this.element.style.pointerEvents = "none";
    this.mutate();
  }

  mutate() {
    this.element.textContent = getChar();
  }

  startMutating() {
    if (Math.random() < 0.5) {
      this.cleanup = loop(() => this.mutate(), r(1000, 5000));
    }
  }

  destroy() {
    this.cleanup?.();
  }
}

class Trail {
  list: Char[];
  options: { size: number; offset: number };
  body: (Char | undefined)[];

  constructor(list: Char[], options?: { size?: number; offset?: number }) {
    this.list = list;
    this.options = { size: 10, offset: 0, ...options };
    this.body = [];
    this.move();
  }

  traverse(fn: (c: Char, i: number, last: boolean) => void) {
    this.body.forEach((n, i) => {
      const last = i === this.body.length - 1;
      if (n) fn(n, i, last);
    });
  }

  move() {
    this.body = [];
    const { offset, size } = this.options;
    for (let i = 0; i < size; ++i) {
      const item = this.list[offset + i - size + 1];
      this.body.push(item);
    }
    this.options.offset = (offset + 1) % (this.list.length + size - 1);
  }
}

class Rain {
  element: HTMLParagraphElement;
  trail!: Trail;
  private chars: Char[] = [];
  private cleanup?: () => void;

  constructor(row: number) {
    this.element = document.createElement("p");
    this.element.style.lineHeight = "1";
    this.element.style.margin = "0";
    this.element.style.pointerEvents = "none";
    this.build(row);
    this.drop();
  }

  build(row: number) {
    const root = document.createDocumentFragment();
    const chars: Char[] = [];
    for (let i = 0; i < row; ++i) {
      const c = new Char();
      root.appendChild(c.element);
      chars.push(c);
      c.startMutating();
    }
    this.chars = chars;
    this.trail = new Trail(chars, {
      size: r(10, 30),
      offset: r(0, 100),
    });
    this.element.appendChild(root);
  }

  drop() {
    const trail = this.trail;
    const len = trail.body.length;
    const delay = r(10, 100);
    this.cleanup = loop(() => {
      trail.move();
      trail.traverse((c, i, last) => {
        c.element.style.color = `hsl(199, 100%, ${(85 / len) * (i + 1) * 0.12}%)`;
        if (last) {
          c.mutate();
          c.element.style.color = `hsl(199, 100%, 10%)`;
          c.element.style.textShadow = `0 0 .5em rgba(14, 165, 233, 0.15), 0 0 .5em currentColor`;
        } else {
          c.element.style.textShadow = "none";
        }
      });
    }, delay);
  }

  destroy() {
    this.cleanup?.();
    this.chars.forEach((c) => c.destroy());
  }
}

export default function MatrixBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rains: Rain[] = [];
    const isMobile = window.innerWidth < 768;
    const columnCount = isMobile ? 20 : 50;
    const rowCount = isMobile ? 30 : 50;

    for (let i = 0; i < columnCount; ++i) {
      const rain = new Rain(rowCount);
      container.appendChild(rain.element);
      rains.push(rain);
    }

    return () => {
      rains.forEach((rain) => {
        rain.destroy();
        rain.element.remove();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        touchAction: "auto",
        zIndex: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    />
  );
}
