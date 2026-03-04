"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface CaseStudy {
  client: string;
  type: string;
  tagline: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FlipCard({
  study,
  calendlyUrl,
}: {
  study: CaseStudy;
  calendlyUrl: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window);
  }, []);

  const handleClick = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const nextFlipped = !isFlipped;
    const targetRotation = nextFlipped ? 180 : 0;

    inner.style.transition = "transform 0.15s ease-out";
    inner.style.transform = `rotateY(${targetRotation}deg) scale(1.05)`;

    setTimeout(() => {
      inner.style.transition =
        "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      inner.style.transform = `rotateY(${targetRotation}deg) scale(1)`;
      setIsFlipped(nextFlipped);
    }, 150);
  }, [isFlipped]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch) return;
      const card = cardRef.current;
      const inner = innerRef.current;
      if (!card || !inner) return;

      const rect = card.getBoundingClientRect();
      const posX = event.clientX - rect.left;
      const posY = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((posY - centerY) / centerY) * -8;
      const tiltY = ((posX - centerX) / centerX) * 8;
      const baseRotate = isFlipped ? 180 : 0;

      inner.style.transition = "transform 0.1s ease-out";
      inner.style.transform = `rotateY(${baseRotate}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    },
    [isFlipped, isTouch]
  );

  const handleMouseLeave = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const baseRotate = isFlipped ? 180 : 0;
    inner.style.transition =
      "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    inner.style.transform = `rotateY(${baseRotate}deg) rotateX(0deg) rotateY(0deg)`;
  }, [isFlipped]);

  return (
    <div
      ref={cardRef}
      className="portfolio-card-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div ref={innerRef} className="portfolio-card">
        {/* Front Face */}
        <div className="portfolio-card-face">
          <div>
            <span className="mb-3 inline-block rounded-full bg-accent-gold/10 px-3 py-1 text-xs font-medium text-accent-gold">
              {study.type}
            </span>
            <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
              {study.client}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-accent-gold-light">
              {study.tagline}
            </p>
            <p className="text-sm leading-relaxed text-muted">
              {study.problem}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-2">
              {study.features.map((feature, featureIndex) => (
                <span
                  key={featureIndex}
                  className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-muted/60">
            Tap to see details
          </p>
        </div>

        {/* Back Face */}
        <div className="portfolio-card-face portfolio-card-back">
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-accent-gold">
              {study.client}
            </h3>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-accent-gold">
                Solution
              </p>
              <p className="text-xs leading-relaxed text-muted">
                {study.solution}
              </p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-accent-gold">
                Result
              </p>
              <p className="text-xs leading-relaxed text-foreground">
                {study.result}
              </p>
            </div>
            <ul className="space-y-1.5">
              {study.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="flex items-center gap-2 text-xs text-muted"
                >
                  <span className="text-gold">
                    <CheckIcon />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="cta-button mt-4 block w-full rounded-full bg-gold py-2.5 text-center text-xs font-semibold text-black transition-all hover:bg-gold-light"
          >
            Get Results Like This
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioCards({
  caseStudies,
  calendlyUrl,
}: {
  caseStudies: CaseStudy[];
  calendlyUrl: string;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {caseStudies.map((study, index) => (
        <FlipCard key={index} study={study} calendlyUrl={calendlyUrl} />
      ))}
    </div>
  );
}
