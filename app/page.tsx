import Script from "next/script";
import CardBeamSection from "./components/CardBeamSection";
import MatrixBackground from "./components/MatrixBackground";
import ScrollReveal from "./components/ScrollReveal";
import TiltCard from "./components/TiltCard";
import ServicesTabs from "./components/ServicesTabs";
import PortfolioCards from "./components/PortfolioCards";
import PortfolioShowcase from "./components/PortfolioShowcase";
import ContactForm from "./components/ContactForm";
import MobileNav from "./components/MobileNav";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://luxcor.tech/#organization",
  name: "LuxCor AI",
  url: "https://luxcor.tech",
  description:
    "Custom AI automation agency building voice agents, workflow automation, and intelligent systems for growing businesses. 10+ client projects delivered. Starting at $997.",
  founder: {
    "@type": "Person",
    name: "Charles Cooper III",
    alternateName: "Trey Cooper",
    jobTitle: "Founder & AI Systems Architect",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Stay Starving Holdings LLC",
    url: "https://staystarving.com",
  },
  serviceType: "AI Automation Consulting",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Automation Services",
    itemListElement: [
      {
        "@type": "Offer",
        name: "AI Workflow Audit",
        price: "997",
        priceCurrency: "USD",
        description: "Comprehensive audit of business processes with automation roadmap",
      },
      {
        "@type": "Offer",
        name: "Growth Retainer",
        price: "4500",
        priceCurrency: "USD",
        unitText: "MONTH",
        description: "Ongoing AI automation development, deployment, and optimization",
      },
      {
        "@type": "Offer",
        name: "Enterprise Build",
        price: "30000",
        priceCurrency: "USD",
        description: "Full-scale AI system architecture and deployment",
      },
    ],
  },
  sameAs: [
    "https://staystarving.com/portfolio/luxcor-ai",
    "https://x.com/treythesavage3",
    "https://www.youtube.com/@TreyCooper.",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does AI automation cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LuxCor AI offers three tiers: AI Workflow Audit starting at $997, Growth Retainer at $4,500/month for ongoing automation, and Enterprise Build projects from $30,000-$50,000 for full-scale AI system deployment.",
      },
    },
    {
      "@type": "Question",
      name: "What is the WAT Framework?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The WAT Framework (Workflows, Agents, Tools) is LuxCor AI's proprietary architecture for building reliable AI systems. Workflows are markdown SOPs. Agents are AI decision-makers. Tools are deterministic scripts. This separation achieves near 100% execution accuracy by keeping AI focused on reasoning while code handles execution.",
      },
    },
    {
      "@type": "Question",
      name: "What AI automation services does LuxCor AI offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LuxCor AI builds custom AI agents, voice agents for lead qualification and support, workflow automation using n8n and Python, business process optimization, and provides monthly retainer support. We've delivered 10+ client projects including websites, apps, and automation systems.",
      },
    },
    {
      "@type": "Question",
      name: "Who founded LuxCor AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LuxCor AI was founded by Charles 'Trey' Cooper III, a mechanical engineer (NC A&T, BS) with a Master's in Management (University of Florida). He built the WAT Framework for production-grade AI automation and runs LuxCor AI as a division of Stay Starving Holdings LLC.",
      },
    },
  ],
};

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
        <a href="#" className="flex items-center gap-3">
          <img src="/luxcor-icon.svg" alt="LuxCor AI" className="h-9 w-9" />
          <span className="hidden sm:flex items-baseline gap-1">
            <span className="text-3xl font-serif font-bold tracking-[0.15em] luxury-gradient">LUXCOR</span>
            <span className="text-xs font-sans font-light tracking-widest text-muted">
              AI
            </span>
          </span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#services"
            className="nav-link text-sm text-muted transition-colors hover:text-foreground"
          >
            Services
          </a>
          <a
            href="#portfolio"
            className="nav-link text-sm text-muted transition-colors hover:text-foreground"
          >
            Portfolio
          </a>
          <a
            href="#our-work"
            className="nav-link text-sm text-muted transition-colors hover:text-foreground"
          >
            Our Work
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
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
          >
            Get in Touch
          </a>
          <MobileNav
            links={[
              { href: "#services", label: "Services" },
              { href: "#portfolio", label: "Portfolio" },
              { href: "#our-work", label: "Our Work" },
            ]}
            ctaUrl={CALENDLY_URL}
          />
        </div>
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
        <h1 className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Stop Losing Revenue
          <br />
          <span className="luxury-gradient">To Manual Workflows</span>
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
            className="cta-button rounded-full bg-gold px-8 py-4 text-base font-semibold text-black hover:bg-gold-light"
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
        <ScrollReveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent-gold">
            The Problem
          </p>
          <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">
            Manual Work Is <span className="luxury-gradient">Costing You Money</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted">
            Missed follow-ups. Hours wasted on repetitive tasks. Phone calls that
            go unanswered. Leads slipping through the cracks. You know AI could
            fix this, but where do you start?
          </p>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((item, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <TiltCard className="glass-card-interactive rounded-2xl p-8 text-left h-full">
                <div className="mb-4 text-gold">{item.icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
              </TiltCard>
            </ScrollReveal>
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
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent-gold">
              Services
            </p>
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              Simple Pricing. <span className="luxury-gradient">Serious Results.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted">
              From a quick audit to a full AI overhaul. We meet you where you are.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <ServicesTabs tiers={tiers} calendlyUrl={CALENDLY_URL} />
        </ScrollReveal>
      </div>
    </section>
  );
}

const caseStudies = [
  {
    client: "Financial Aid Network",
    type: "AI Voice Agent",
    tagline: "24/7 AI receptionist at $0.15/call",
    problem:
      "Overwhelmed staff spending hours on repetitive calls. Students waiting on hold or going to competitors.",
    solution:
      'Built "Dominique" — an AI voice agent on VAPI that handles inbound calls 24/7, qualifies callers, verifies identity, books appointments, and warm-transfers complex cases.',
    result:
      "Zero missed calls. $0.15/call vs $40K/year receptionist. Staff freed to focus on enrolled students.",
    features: ["24/7 Call Handling", "Lead Qualification", "Calendar Booking", "Warm Transfer"],
  },
  {
    client: "Clicking with Carissa",
    type: "Website & Booking System",
    tagline: "Portfolio site that books sessions on autopilot",
    problem:
      "Growing photography brand with no web presence. All bookings through Instagram DMs with zero pricing transparency.",
    solution:
      "Multi-page animated website with filterable portfolio gallery, transparent 3-tier pricing, and integrated booking calendar with automated email notifications.",
    result:
      "Professional presence converting visitors to booked sessions in under 2 minutes. Inbound leads on autopilot.",
    features: ["Portfolio Gallery", "Booking Calendar", "Tiered Pricing", "Auto Notifications"],
  },
  {
    client: "TnD Mechanical",
    type: "Full Digital Transformation",
    tagline: "Website + AI voice agent + auto proposals in 60 seconds",
    problem:
      "Commercial HVAC contractor with no digital presence. Missed calls during jobs, manual follow-up, losing bids to faster competitors.",
    solution:
      "Full-stack build: website + AI voice receptionist + 9-node CRM automation that generates branded proposal decks in under 60 seconds.",
    result:
      "Every lead gets a custom proposal before the competition responds. 24/7 call coverage at $0.10/call.",
    features: ["AI Voice Agent", "9-Node CRM", "Auto Proposals", "60-Second Turnaround"],
  },
  {
    client: "C&C Contracting",
    type: "Brand Identity & Website",
    tagline: "Professional brand for a general contractor",
    problem:
      "Licensed general contractor with no online presence. Property managers and GCs Googling them and finding nothing.",
    solution:
      "Custom brand identity + professional website with project portfolio, service areas, and lead capture form with automated routing.",
    result:
      "Credible digital presence that wins bids. Professional brand matching the quality of their work.",
    features: ["Brand Identity", "Logo Design", "Lead Capture", "Automated Routing"],
  },
  {
    client: "KayphoriaX",
    type: "Luxury Fashion E-Commerce",
    tagline: "Editorial redesign + Shopify for NYFW designer",
    problem:
      "Luxury fashion brand with NYFW and LAFW credentials, but an outdated website that didn't match the runway presence.",
    solution:
      "Editorial-grade website redesign with Shopify integration for 4 collections, AI-generated brand assets, and Aura Wear app marketing hub.",
    result:
      "NYFW-ready digital storefront. Seamless brand-to-commerce pipeline driving Shopify sales.",
    features: ["Editorial Design", "Shopify Integration", "AI Brand Assets", "Aura Wear Hub"],
  },
  {
    client: "SurgicalFX",
    type: "Trading Platform",
    tagline: "Live ticker + transparent track record for forex",
    problem:
      "Forex signal provider with growing Discord but no web presence. Hard to establish credibility in a space full of scams.",
    solution:
      "Professional trading platform with live currency ticker, transparent trade log with chart screenshots, lightbox gallery, and Discord integration.",
    result:
      "Professional credibility platform driving Discord signups. Transparent results building trust instantly.",
    features: ["Live Ticker", "Track Record", "Chart Gallery", "Discord Integration"],
  },
];

function CaseStudies() {
  return (
    <section id="portfolio" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent-gold">
              Portfolio
            </p>
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              What We&apos;ve <span className="luxury-gradient">Built</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted">
              We don&apos;t just talk about AI. We build it and ship it.
              Here&apos;s what we&apos;ve done for our clients.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <PortfolioCards caseStudies={caseStudies} calendlyUrl={CALENDLY_URL} />
        </ScrollReveal>
      </div>
    </section>
  );
}

const showcaseItems = [
  {
    client: "Stay Starving",
    type: "Media & Digital Agency",
    image: "/portfolio/staystarving.png",
    url: "https://staystarving.com",
  },
  {
    client: "KayphoriaX",
    type: "Luxury Fashion E-Commerce",
    image: "/portfolio/kayphoriax.png",
    url: "https://kayphoriax.style",
  },
  {
    client: "SurgicalFX",
    type: "Trading Platform",
    image: "/portfolio/surgicalfx.png",
    url: "https://surgicalfx.vercel.app",
  },
  {
    client: "Financial Aid Network",
    type: "Website & AI Voice Agent",
    image: "/portfolio/financial-aid-network.png",
    url: "https://financialaidnetwork.net",
  },
  {
    client: "TnD Mechanical",
    type: "Full Digital Transformation",
    image: "/portfolio/tnd-mechanical.png",
    url: "https://tndmechanical.com",
  },
  {
    client: "C&C Contracting",
    type: "Brand Identity & Website",
    image: "/portfolio/cc-contracting.png",
    url: "https://www.candcontracting.com",
  },
  {
    client: "Clicking with Carissa",
    type: "Website & Booking",
    image: "/portfolio/clicking-with-carissa.png",
    url: "https://clickingwithcarissa.netlify.app",
  },
];

function Showcase() {
  return (
    <section id="our-work" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent-gold">
              Our Work
            </p>
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              Built. Shipped. <span className="luxury-gradient">Delivering.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted">
              Real projects. Real clients. Real results.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <PortfolioShowcase items={showcaseItems} />
        </ScrollReveal>
      </div>
    </section>
  );
}

function ContactFormSection() {
  return (
    <section className="px-6 py-20 bg-gradient-to-b from-transparent via-blue-50/10 to-transparent">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              Not Ready to Book?
            </h2>
            <p className="text-lg text-muted">
              Tell us about your project. We&apos;ll review it and reach out with next steps.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <ContactForm />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function CTAFooter() {
  return (
    <section className="hero-gradient px-6 py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-5xl">
            Ready to Put <span className="luxury-gradient">AI to Work?</span>
          </h2>
          <p className="mb-10 text-lg text-muted">
            Book a free strategy call. We&apos;ll audit your workflows, show you
            where AI fits, and give you a clear roadmap. No strings attached.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-block rounded-full bg-gold px-10 py-4 text-lg font-semibold text-black hover:bg-gold-light"
          >
            Get in Touch
          </a>
          <p className="mt-6 text-sm text-muted">
            15 minutes. No pressure. Just clarity on how AI can help your
            business.
          </p>
        </div>
      </ScrollReveal>
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
            className="nav-link transition-colors hover:text-foreground"
          >
            Services
          </a>
          <a
            href="#portfolio"
            className="nav-link transition-colors hover:text-foreground"
          >
            Portfolio
          </a>
          <a
            href="#our-work"
            className="nav-link transition-colors hover:text-foreground"
          >
            Our Work
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link transition-colors hover:text-accent-gold"
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
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />
      <Hero />
      <Problem />
      <CardBeamSection />
      <Services />
      <CaseStudies />
      <Showcase />
      <ContactFormSection />
      <CTAFooter />
      <Footer />
    </>
  );
}
