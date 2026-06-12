import Script from "next/script";
import ScrollReveal from "./ScrollReveal";
import MatrixBackground from "./MatrixBackground";
import MobileNav from "./MobileNav";

const CALENDLY_URL = "https://calendly.com/treycooper333/onboarding-meeting";

export interface CaseStudyData {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOPageData {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  painPoints: { title: string; description: string }[];
  caseStudies: CaseStudyData[];
  faqs: FAQItem[];
  localSchema: Record<string, unknown>;
  faqSchema: Record<string, unknown>;
  ctaHeadline: string;
  ctaAccent: string;
  ctaDescription: string;
  serviceHighlights?: { title: string; description: string }[];
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-3xl font-serif font-bold tracking-[0.15em]">
          <span className="luxury-gradient">LUXCOR</span>
          <span className="ml-1 text-xs font-sans font-light tracking-widest text-muted">
            AI
          </span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/#services"
            className="nav-link text-sm text-muted transition-colors hover:text-foreground"
          >
            Services
          </a>
          <a
            href="/#portfolio"
            className="nav-link text-sm text-muted transition-colors hover:text-foreground"
          >
            Portfolio
          </a>
          <a
            href="/#our-work"
            className="nav-link text-sm text-muted transition-colors hover:text-foreground"
          >
            Our Work
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
          >
            Get in Touch
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light"
          >
            Get in Touch
          </a>
          <MobileNav
            links={[
              { href: "/#services", label: "Services" },
              { href: "/#portfolio", label: "Portfolio" },
              { href: "/#our-work", label: "Our Work" },
            ]}
            ctaUrl={CALENDLY_URL}
          />
        </div>
      </div>
    </nav>
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
            href="/#services"
            className="nav-link transition-colors hover:text-foreground"
          >
            Services
          </a>
          <a
            href="/#portfolio"
            className="nav-link transition-colors hover:text-foreground"
          >
            Portfolio
          </a>
          <a
            href="/#our-work"
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

export default function SEOLandingPage({ data }: { data: SEOPageData }) {
  const localSchemaJson = JSON.stringify(data.localSchema);
  const faqSchemaJson = JSON.stringify(data.faqSchema);

  return (
    <>
      <Script id="local-schema" type="application/ld+json">{localSchemaJson}</Script>
      <Script id="faq-schema" type="application/ld+json">{faqSchemaJson}</Script>
      <Nav />

      {/* Hero */}
      <section className="hero-gradient relative flex min-h-[80vh] items-center justify-center px-6 pt-20">
        <MatrixBackground />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
            {data.eyebrow}
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {data.headline}
            <br />
            <span className="luxury-gradient">{data.headlineAccent}</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {data.subheadline}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button rounded-full bg-gold px-8 py-4 text-base font-semibold text-black hover:bg-gold-light"
            >
              Book a Free Strategy Call
            </a>
            <a
              href="/#services"
              className="rounded-full border border-white/20 px-8 py-4 text-base font-medium text-foreground transition-colors hover:border-white/40 hover:bg-white/5"
            >
              See Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
                The Problem We <span className="luxury-gradient">Solve</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            {data.painPoints.map((point, index) => (
              <ScrollReveal key={point.title} delay={index * 150}>
                <div className="glass-card-interactive rounded-2xl p-6 md:p-8">
                  <h3 className="mb-3 text-xl font-bold text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights (optional) */}
      {data.serviceHighlights && (
        <section className="border-t border-white/5 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="mx-auto mb-16 max-w-2xl text-center">
                <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
                  What We <span className="luxury-gradient">Build</span>
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-2">
              {data.serviceHighlights.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 100}>
                  <div className="glass-card rounded-2xl p-6 md:p-8">
                    <h3 className="mb-2 text-lg font-bold text-gold">
                      {item.title}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies */}
      <section className="border-t border-white/5 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
                Real <span className="luxury-gradient">Results</span>
              </h2>
              <p className="text-muted">
                See how we&apos;ve helped businesses like yours.
              </p>
            </div>
          </ScrollReveal>
          <div className={`grid gap-6 md:gap-8 ${data.caseStudies.length <= 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"}`}>
            {data.caseStudies.map((study, index) => (
              <ScrollReveal key={study.name} delay={index * 100}>
                <div className="glass-card-interactive flex h-full flex-col rounded-2xl p-6 md:p-8">
                  <p className="mb-2 text-sm font-medium text-gold">
                    {study.tagline}
                  </p>
                  <h3 className="mb-4 text-xl font-bold text-foreground">
                    {study.name}
                  </h3>
                  <p className="mb-2 text-sm text-muted">
                    <span className="font-semibold text-foreground">Problem:</span>{" "}
                    {study.problem}
                  </p>
                  <p className="mb-2 text-sm text-muted">
                    <span className="font-semibold text-foreground">Solution:</span>{" "}
                    {study.solution}
                  </p>
                  <p className="mb-4 text-sm text-muted">
                    <span className="font-semibold text-foreground">Result:</span>{" "}
                    {study.result}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {study.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Summary */}
      <section className="border-t border-white/5 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
                Simple, Transparent{" "}
                <span className="luxury-gradient">Pricing</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-6 md:p-8 text-center">
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  Starter
                </h3>
                <p className="mb-4 text-3xl font-bold text-gold">$997</p>
                <p className="text-sm text-muted">
                  Full AI workflow audit with custom automation roadmap and
                  60-minute strategy call.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="glass-card popular-glow rounded-2xl p-6 md:p-8 text-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  Most Popular
                </p>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  Growth
                </h3>
                <p className="mb-4 text-3xl font-bold text-gold">$4,500/mo</p>
                <p className="text-sm text-muted">
                  Monthly AI automation builds, voice agent setup, priority
                  support, and ongoing optimization.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="glass-card rounded-2xl p-6 md:p-8 text-center">
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  Enterprise
                </h3>
                <p className="mb-4 text-3xl font-bold text-gold">$30K–$50K</p>
                <p className="text-sm text-muted">
                  Full-stack AI buildout with custom integrations, dedicated
                  strategist, and white-glove onboarding.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/5 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
                Frequently Asked{" "}
                <span className="luxury-gradient">Questions</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="space-y-6">
            {data.faqs.map((faq, index) => (
              <ScrollReveal key={faq.question} delay={index * 100}>
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="mb-3 text-lg font-bold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-muted leading-relaxed">{faq.answer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="hero-gradient px-6 py-16 md:py-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-5xl">
              {data.ctaHeadline}{" "}
              <span className="luxury-gradient">{data.ctaAccent}</span>
            </h2>
            <p className="mb-10 text-lg text-muted">{data.ctaDescription}</p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-block rounded-full bg-gold px-10 py-4 text-lg font-semibold text-black hover:bg-gold-light"
            >
              Book a Free Strategy Call
            </a>
            <p className="mt-6 text-sm text-muted">
              15 minutes. No pressure. Just clarity on how AI can help your
              business.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
