"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Tier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
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

export default function ServicesTabs({
  tiers,
  calendlyUrl,
}: {
  tiers: Tier[];
  calendlyUrl: string;
}) {
  const defaultIndex = tiers.findIndex((tier) => tier.popular);
  const [activeIndex, setActiveIndex] = useState(
    defaultIndex >= 0 ? defaultIndex : 0
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    const tab = tabRefs.current[activeIndex];
    if (tab) {
      setIndicatorStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const activeTier = tiers[activeIndex];

  return (
    <div>
      {/* Tab Bar */}
      <div className="relative mx-auto mb-10 flex max-w-md rounded-full border border-white/10 bg-white/5 p-1">
        {/* Sliding Indicator */}
        <div
          className="tab-indicator absolute top-1 bottom-1 rounded-full bg-accent-gold/20 border border-accent-gold/30"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
        {tiers.map((tier, index) => (
          <button
            key={tier.name}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            onClick={() => setActiveIndex(index)}
            className={`relative z-10 flex-1 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
              activeIndex === index
                ? "text-accent-gold"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tier.name}
            {tier.popular && (
              <span className="ml-2 inline-block rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase text-black">
                Popular
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content Panel */}
      <div
        key={activeIndex}
        className="tab-content-enter glass-card-interactive mx-auto max-w-lg rounded-2xl p-8"
      >
        {activeTier.popular && (
          <div className="mb-4 inline-block rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-black">
            Most Popular
          </div>
        )}
        <h3 className="mb-2 font-serif text-2xl font-bold">
          {activeTier.name}
        </h3>
        <div className="mb-1">
          <span className="text-4xl font-bold luxury-gradient">
            {activeTier.price}
          </span>
        </div>
        <p className="mb-4 text-sm text-muted">{activeTier.period}</p>
        <p className="mb-6 text-sm leading-relaxed text-muted">
          {activeTier.description}
        </p>
        <ul className="mb-8 space-y-3">
          {activeTier.features.map((feature, featureIndex) => (
            <li
              key={featureIndex}
              className="flex items-start gap-2 text-sm text-foreground"
            >
              <span className="mt-0.5 text-gold">
                <CheckIcon />
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button block w-full rounded-full bg-gold py-3 text-center text-sm font-semibold text-black transition-all hover:bg-gold-light"
        >
          {activeTier.cta}
        </a>
      </div>
    </div>
  );
}
