import CardBeamSection from "./components/CardBeamSection";
import MatrixBackground from "./components/MatrixBackground";

const CALENDLY_URL = "https://calendly.com/treycooper333/onboarding-meeting";

function CheckIcon({ className }: { className?: string }) {
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
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-2xl font-bold tracking-wider">
          <span className="gold-gradient">LUXCOR</span>
          <span className="ml-1 text-sm font-light tracking-widest text-muted">
            AI
          </span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#services"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Services
          </a>
          <a
            href="#portfolio"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Portfolio
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
          >
            Get in Touch
          </a>
        </div>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gold-light md:hidden"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero-gradient relative flex min-h-screen items-center justify-center px-6 pt-20">
      <MatrixBackground />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
          AI Solutions for Growing Businesses
        </p>
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Stop Losing Revenue
          <br />
          <span className="gold-gradient">To Manual Workflows</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          Your team is buried in repetitive tasks, missed follow-ups, and
          unanswered calls. We build custom AI systems that handle the busywork
          so you can focus on growth.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-8 py-4 text-base font-semibold text-black transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]"
          >
            Get in Touch
          </a>
          <a
            href="#services"
            className="rounded-full border border-white/20 px-8 py-4 text-base font-medium text-foreground transition-colors hover:border-white/40 hover:bg-white/5"
          >
            See Our Services
          </a>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
          <div className="flex items-center gap-2">
            <CheckIcon className="text-gold" /> Custom-built for your business
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="text-gold" /> Results in weeks, not months
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="text-gold" /> Ongoing support included
          </div>
        </div>
      </div>
    </section>
  );
}

const LightningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const GrowthIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

function Problem() {
  const cards: { icon: React.ReactNode; title: string; desc: string }[] = [
    {
      icon: <LightningIcon />,
      title: "Automate the Repetitive",
      desc: "We identify workflows eating your team's time and build AI systems that handle them 24/7.",
    },
    {
      icon: <PhoneIcon />,
      title: "Never Miss a Lead",
      desc: "AI voice agents and chatbots that answer calls, qualify prospects, and book appointments while you sleep.",
    },
    {
      icon: <GrowthIcon />,
      title: "Scale Without Hiring",
      desc: "Custom automations that grow with your business. Do more with less overhead, more margin, more freedom.",
    },
  ];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
          The Problem
        </p>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Manual Work Is Costing You Money
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted">
          Missed follow-ups. Hours wasted on repetitive tasks. Phone calls that
          go unanswered. Leads slipping through the cracks. You know AI could
          fix this, but where do you start?
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((item, i) => (
            <div key={i} className="glass-card rounded-2xl p-8 text-left">
              <div className="mb-4 text-gold">{item.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const tiers = [
  {
    name: "Starter",
    price: "$997",
    period: "one-time",
    description:
      "A comprehensive AI audit and strategic roadmap built for serious operators ready to move.",
    features: [
      "Full AI workflow audit",
      "Custom automation roadmap",
      "Prioritized action plan",
      "Recorded Loom walkthrough",
      "60-minute strategy call",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "$4,500",
    period: "per month",
    description:
      "Dedicated AI builds, optimization, and support delivered monthly. Your growth engine on retainer.",
    features: [
      "Everything in Starter",
      "Monthly AI automation builds",
      "Voice agent or chatbot setup",
      "Priority Slack access",
      "Ongoing optimization & support",
    ],
    cta: "Apply Now",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$30,000 - $50,000",
    period: "per engagement",
    description:
      "End-to-end AI transformation for organizations ready to lead their industry.",
    features: [
      "Everything in Growth",
      "Full-stack AI buildout",
      "Custom integrations & APIs",
      "Dedicated AI strategist",
      "White-glove onboarding & QBRs",
    ],
    cta: "Let\u0027s Talk",
    popular: false,
  },
];

function Services() {
  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Services
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Simple Pricing. Serious Results.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            From a quick audit to a full AI overhaul. We meet you where you are.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`glass-card relative rounded-2xl p-8 ${
                tier.popular ? "popular-glow border-gold/30" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-black">
                  Most Popular
                </div>
              )}
              <h3 className="mb-2 text-xl font-bold">{tier.name}</h3>
              <div className="mb-1">
                <span className="text-3xl font-bold gold-gradient">
                  {tier.price}
                </span>
              </div>
              <p className="mb-4 text-sm text-muted">{tier.period}</p>
              <p className="mb-6 text-sm leading-relaxed text-muted">
                {tier.description}
              </p>
              <ul className="mb-8 space-y-3">
                {tier.features.map((feature, j) => (
                  <li
                    key={j}
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
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
                  tier.popular
                    ? "bg-gold text-black hover:bg-gold-light hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                    : "border border-white/20 text-foreground hover:border-white/40 hover:bg-white/5"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const caseStudies = [
  {
    client: "Financial Aid Network",
    type: "AI Voice Agent",
    problem:
      "Overwhelmed staff couldn't keep up with inbound calls. Prospective students were waiting on hold or getting voicemail, then going to competitors.",
    solution:
      "Built an AI voice agent that handles inbound calls 24/7, qualifies leads by asking key questions, and books appointments directly on the team's calendar.",
    result:
      "Zero missed calls. Faster lead qualification. Staff freed up to focus on enrolled students instead of answering phones.",
  },
  {
    client: "Clicking with Carissa",
    type: "Website & Digital Presence",
    problem:
      "A growing photography brand with no professional web presence. Leads came from word-of-mouth only, with no way to showcase work, capture inquiries, or book sessions online.",
    solution:
      "Designed and built a full brand website with portfolio gallery, service packages, client testimonials, and an integrated booking/inquiry flow.",
    result:
      "Professional online presence that converts visitors into booked sessions. Portfolio showcases work 24/7, generating inbound leads on autopilot.",
  },
  {
    client: "TnD Mechanical",
    type: "Website & Lead Generation",
    problem:
      "An established HVAC and mechanical contracting business with no online presence. All business came from referrals, missing a massive channel for new customer acquisition.",
    solution:
      "Built a professional services website with clear service descriptions, service area coverage, customer reviews, and a streamlined contact/quote request form.",
    result:
      "Credible online presence that ranks for local searches. New lead channel generating quote requests from homeowners and property managers.",
  },
];

function CaseStudies() {
  return (
    <section id="portfolio" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Portfolio
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            What We&apos;ve Built
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            We don&apos;t just talk about AI. We build it and ship it.
            Here&apos;s what we&apos;ve done for our clients.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {caseStudies.map((study, i) => (
            <div key={i} className="glass-card rounded-2xl p-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                  {study.type}
                </span>
              </div>
              <h3 className="mb-4 text-xl font-bold">{study.client}</h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">
                    Challenge
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    {study.problem}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">
                    Solution
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    {study.solution}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">
                    Result
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {study.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFooter() {
  return (
    <section className="hero-gradient px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">
          Ready to Put AI to Work?
        </h2>
        <p className="mb-10 text-lg text-muted">
          Book a free strategy call. We&apos;ll audit your workflows, show you
          where AI fits, and give you a clear roadmap. No strings attached.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-gold px-10 py-4 text-lg font-semibold text-black transition-all hover:bg-gold-light hover:shadow-[0_0_40px_rgba(14,165,233,0.3)]"
        >
          Get in Touch
        </a>
        <p className="mt-6 text-sm text-muted">
          15 minutes. No pressure. Just clarity on how AI can help your
          business.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Luxcor AI. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-muted">
          <a
            href="#services"
            className="transition-colors hover:text-foreground"
          >
            Services
          </a>
          <a
            href="#portfolio"
            className="transition-colors hover:text-foreground"
          >
            Portfolio
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <CardBeamSection />
      <Services />
      <CaseStudies />
      <CTAFooter />
      <Footer />
    </>
  );
}
