import CardBeamSection from "./components/CardBeamSection";

const CALENDLY_URL = "https://calendly.com/treycooper333/onboarding-meeting";

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
            href="#work"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Work
          </a>
          <a
            href="#about"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            About
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
          >
            Book a Call
          </a>
        </div>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gold-light md:hidden"
        >
          Book a Call
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero-gradient relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
          Premium AI Solutions
        </p>
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          AI That Works
          <br />
          <span className="gold-gradient">As Hard As You Do</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          We build custom AI automations, voice agents, and intelligent
          workflows that eliminate busywork and unlock growth — so you can focus
          on what matters.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-8 py-4 text-base font-semibold text-black transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            Book Your Free Strategy Call
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
            <span className="text-gold">&#10003;</span> Custom-built for your
            business
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gold">&#10003;</span> Results in weeks, not
            months
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gold">&#10003;</span> No cookie-cutter
            templates
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
          The Problem
        </p>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Your Team Is Drowning in Manual Work
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted">
          Missed follow-ups. Hours wasted on repetitive tasks. Phone calls that
          go unanswered. Leads slipping through the cracks. You know AI could
          fix this — but where do you start?
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "⚡",
              title: "Automate the Repetitive",
              desc: "We identify workflows eating your team's time and build AI systems that handle them 24/7.",
            },
            {
              icon: "🎧",
              title: "Never Miss a Lead",
              desc: "AI voice agents and chatbots that answer calls, qualify prospects, and book appointments — while you sleep.",
            },
            {
              icon: "🚀",
              title: "Scale Without Hiring",
              desc: "Custom automations that grow with your business. Do more with less overhead, more margin, more freedom.",
            },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-2xl p-8 text-left">
              <div className="mb-4 text-3xl">{item.icon}</div>
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
    price: "$497",
    period: "one-time",
    description: "Perfect for businesses that know AI is the answer but don't know where to start.",
    features: [
      "Full AI workflow audit",
      "Custom automation roadmap",
      "Prioritized action plan",
      "Recorded Loom walkthrough",
      "30-minute strategy call",
    ],
    cta: "Get Your Roadmap",
    popular: false,
  },
  {
    name: "Growth",
    price: "$1,500 - $2,500",
    period: "per project",
    description: "For businesses ready to build. We design and deploy 1-2 custom automations.",
    features: [
      "Everything in Starter",
      "1-2 custom AI automations built",
      "Voice agent or chatbot setup",
      "Full documentation & training",
      "30 days post-launch support",
    ],
    cta: "Start Building",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$3,000 - $5,000",
    period: "per month",
    description: "Your dedicated AI partner. Ongoing builds, optimization, and strategic support.",
    features: [
      "Everything in Growth",
      "Dedicated AI strategist",
      "Monthly automation builds",
      "Priority support & SLA",
      "Quarterly strategy reviews",
    ],
    cta: "Partner With Us",
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
            Choose Your Level of AI Transformation
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            From a quick audit to a full AI overhaul — we meet you where you
            are.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`glass-card relative rounded-2xl p-8 ${
                tier.popular
                  ? "popular-glow border-gold/30"
                  : ""
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
                    <span className="mt-0.5 text-gold">&#10003;</span>
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
                    ? "bg-gold text-black hover:bg-gold-light hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
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
      "Overwhelmed staff couldn't keep up with inbound calls. Prospective students were waiting on hold or getting voicemail — and going to competitors.",
    solution:
      "Built an AI voice agent that handles inbound calls 24/7, qualifies leads by asking key questions, and books appointments directly on the team's calendar.",
    result:
      "Zero missed calls. Faster lead qualification. Staff freed up to focus on enrolled students instead of answering phones.",
  },
  {
    client: "Clicking with Carissa",
    type: "Website & Digital Presence",
    problem:
      "A growing photography brand with no professional web presence. Leads came from word-of-mouth only — no way to showcase work, capture inquiries, or book sessions online.",
    solution:
      "Designed and built a full brand website with portfolio gallery, service packages, client testimonials, and an integrated booking/inquiry flow.",
    result:
      "Professional online presence that converts visitors into booked sessions. Portfolio showcases work 24/7, generating inbound leads on autopilot.",
  },
  {
    client: "TnD Mechanical",
    type: "Website & Lead Generation",
    problem:
      "An established HVAC and mechanical contracting business with no online presence. All business came from referrals — missing a massive channel for new customer acquisition.",
    solution:
      "Built a professional services website with clear service descriptions, service area coverage, customer reviews, and a streamlined contact/quote request form.",
    result:
      "Credible online presence that ranks for local searches. New lead channel generating quote requests from homeowners and property managers.",
  },
];

function CaseStudies() {
  return (
    <section id="work" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Our Work
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Real Results for Real Businesses
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            We don&apos;t just talk about AI — we build it and ship it. Here&apos;s
            what we&apos;ve done for our clients.
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

function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_2fr]">
            <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-transparent mx-auto md:mx-0">
              <span className="text-6xl font-bold gold-gradient">TC</span>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-gold">
                The Founder
              </p>
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                Trey Cooper
              </h2>
              <p className="mb-4 leading-relaxed text-muted">
                Systems engineer by day, AI builder by obsession. I&apos;ve spent
                years at the intersection of engineering, automation, and
                business operations — building everything from AI voice agents
                to full production pipelines.
              </p>
              <p className="mb-6 leading-relaxed text-muted">
                Luxcor AI was born from a simple belief: every business deserves
                access to the same AI tools that Fortune 500 companies use. I
                build custom, not cookie-cutter. Every solution is designed for
                your specific workflow, your specific pain points, your specific
                goals.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                {[
                  "Systems Engineering",
                  "AI & Automation",
                  "Voice Agents",
                  "Web Development",
                  "Business Operations",
                ].map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5 text-gold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
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
          Book a free strategy call. We&apos;ll audit your workflows, identify
          where AI fits, and give you a clear roadmap — no strings attached.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-gold px-10 py-4 text-lg font-semibold text-black transition-all hover:bg-gold-light hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
        >
          Book Your Free Strategy Call
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
          <a href="#work" className="transition-colors hover:text-foreground">
            Work
          </a>
          <a href="#about" className="transition-colors hover:text-foreground">
            About
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
      <About />
      <CTAFooter />
      <Footer />
    </>
  );
}
