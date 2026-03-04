"use client";

import Image from "next/image";

interface ShowcaseItem {
  client: string;
  type: string;
  image: string | null;
  url: string | null;
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent-gold"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function BrowserFrame({ item }: { item: ShowcaseItem }) {
  const content = item.image ? (
    <Image
      src={item.image}
      alt={`${item.client} website screenshot`}
      width={1280}
      height={800}
      className="block h-full w-full object-cover object-top"
    />
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a]">
      <PhoneIcon />
      <p className="text-sm font-medium text-accent-gold">AI Voice Agent</p>
      <p className="text-xs text-muted">24/7 Automated Call Handling</p>
    </div>
  );

  const wrapper = item.url ? (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="showcase-card group block"
    >
      <div className="showcase-browser-bar">
        <span className="showcase-dot bg-[#ff5f57]" />
        <span className="showcase-dot bg-[#febc2e]" />
        <span className="showcase-dot bg-[#28c840]" />
        <span className="ml-3 truncate text-[10px] text-muted/50">
          {item.url.replace(/^https?:\/\//, "")}
        </span>
      </div>
      <div className="showcase-viewport">{content}</div>
      <div className="showcase-label">
        <h3 className="text-sm font-semibold text-foreground">
          {item.client}
        </h3>
        <span className="rounded-full bg-accent-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-accent-gold">
          {item.type}
        </span>
      </div>
    </a>
  ) : (
    <div className="showcase-card group">
      <div className="showcase-browser-bar">
        <span className="showcase-dot bg-[#ff5f57]" />
        <span className="showcase-dot bg-[#febc2e]" />
        <span className="showcase-dot bg-[#28c840]" />
      </div>
      <div className="showcase-viewport">{content}</div>
      <div className="showcase-label">
        <h3 className="text-sm font-semibold text-foreground">
          {item.client}
        </h3>
        <span className="rounded-full bg-accent-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-accent-gold">
          {item.type}
        </span>
      </div>
    </div>
  );

  return wrapper;
}

export default function PortfolioShowcase({
  items,
}: {
  items: ShowcaseItem[];
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <BrowserFrame key={index} item={item} />
      ))}
    </div>
  );
}
