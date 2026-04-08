import type { Metadata } from "next";
import SEOLandingPage from "../components/SEOLandingPage";
import type { SEOPageData } from "../components/SEOLandingPage";

export const metadata: Metadata = {
  title: "AI Automation for Contractors | HVAC, GC, Trade | LuxCor AI",
  description:
    "Custom AI automation for contractors — HVAC, general contracting, plumbing, electrical, and trades. AI voice agents, auto proposals, CRM automation, and websites that win bids. Built by LuxCor AI in Melbourne, FL.",
  keywords: [
    "AI automation contractors",
    "AI for HVAC contractors",
    "contractor automation",
    "AI voice agent contractors",
    "HVAC automation",
    "general contractor AI",
    "automated proposals contractors",
    "contractor CRM automation",
    "AI for trade businesses",
    "contractor lead automation",
    "construction business automation",
    "AI answering service contractors",
  ],
  alternates: {
    canonical: "https://luxcor.tech/ai-automation-contractors",
  },
  openGraph: {
    title: "AI Automation for Contractors | LuxCor AI",
    description:
      "AI voice agents, auto proposals, and CRM automation built for contractors. HVAC, GC, plumbing, electrical. Real results from real contractor clients.",
    url: "https://luxcor.tech/ai-automation-contractors",
  },
};

const pageData: SEOPageData = {
  eyebrow: "Built for Contractors, by Engineers",
  headline: "AI That Works as Hard",
  headlineAccent: "As You Do",
  subheadline:
    "You're on the job site. The phone rings. Nobody answers. That lead calls your competitor. We build AI systems that answer every call, send proposals in 60 seconds, and keep your pipeline full — while you focus on the work.",
  painPoints: [
    {
      title: "You're Missing Calls on the Job",
      description:
        "When you're up on a roof or under a unit, you can't answer the phone. By the time you call back, they've already booked someone else. 80% of callers who reach voicemail never call back.",
    },
    {
      title: "Proposals Take Too Long",
      description:
        "You get home at 7 PM and still have to write proposals. By the time you send them the next day, faster competitors have already closed. Your quality work means nothing if you can't respond fast enough.",
    },
    {
      title: "Too Many Tools, Nothing Connected",
      description:
        "Leads come from Google, Yelp, referrals, and your website — but nothing talks to each other. You're copy-pasting between apps, losing leads in the cracks, and doing admin work that should be automated.",
    },
  ],
  serviceHighlights: [
    {
      title: "AI Voice Agent — Your 24/7 Receptionist",
      description:
        "Answers every call instantly. Captures job details (location, issue, urgency). Qualifies the lead. Books an estimate on your calendar. Sends a confirmation text. All while you're on the job.",
    },
    {
      title: "60-Second Auto Proposals",
      description:
        "AI captures lead details from the call and triggers your CRM to generate a branded, professional proposal — complete with your logo, pricing, and scope — in under 60 seconds. Sent before your competitor even calls back.",
    },
    {
      title: "CRM & Pipeline Automation",
      description:
        "Every lead, call, proposal, and follow-up tracked automatically. No more spreadsheets. No more sticky notes. Your pipeline is always up to date and nothing falls through the cracks.",
    },
    {
      title: "Professional Website That Generates Leads",
      description:
        "A website that shows your work, lists your service areas, and captures leads with automated routing. Property managers and GCs Google you — make sure they find something impressive.",
    },
  ],
  caseStudies: [
    {
      name: "TnD Mechanical — HVAC Contractor",
      tagline: "From zero web presence to automated proposals in 60 seconds",
      problem:
        "Commercial HVAC contractor missing calls during jobs. Manual proposal process taking hours. Losing bids to competitors who respond faster.",
      solution:
        "Full digital transformation: professional website, AI voice receptionist answering 24/7, and 9-node CRM automation generating branded proposal decks in under 60 seconds from call data.",
      result:
        "Every lead gets a custom proposal before the competition responds. 24/7 call coverage at $0.10/call. More bids won with zero additional overhead.",
      features: ["AI Voice Agent", "9-Node CRM", "Auto Proposals", "60-Second Turnaround"],
    },
    {
      name: "C&C Contracting — General Contractor",
      tagline: "Invisible contractor to credible brand in weeks",
      problem:
        "Licensed general contractor with zero online presence. Property managers and commercial clients Googling them and finding nothing. Losing opportunities to contractors with better marketing.",
      solution:
        "Custom brand identity from scratch — logo, color system, professional website with project portfolio, service area pages, and automated lead capture with intelligent routing to the right team member.",
      result:
        "Credible digital presence that wins bids. Professional brand matching the quality of their work. Landed a major hotel chain contract within weeks of launch.",
      features: ["Brand Identity", "Logo Design", "Lead Capture", "Automated Routing"],
    },
  ],
  faqs: [
    {
      question: "How does an AI voice agent work for a contractor?",
      answer:
        "When a customer calls, AI answers instantly — even if you're on the job. It captures the caller's name, location, issue description, and urgency level. Then it books an estimate on your calendar, sends the customer a confirmation, and logs everything in your CRM. You get a notification with all the details. The whole call takes under 2 minutes.",
    },
    {
      question: "How much does this cost for a small contracting business?",
      answer:
        "AI voice agents run $0.10–$0.15 per call — a fraction of a receptionist or answering service. Our Growth retainer at $4,500/month includes voice agent setup, CRM automation, and ongoing optimization. For a full digital transformation (website + voice agent + proposals), Enterprise builds start at $30,000.",
    },
    {
      question: "Can AI generate proposals for my contracting business?",
      answer:
        "Yes. We build automated proposal systems that pull job details from your AI voice agent or web form, populate a branded template with your logo, pricing, and scope, and send it to the customer — all in under 60 seconds. We built this exact system for a commercial HVAC contractor.",
    },
    {
      question: "I'm not tech-savvy. Is this hard to use?",
      answer:
        "No. We handle the entire build, testing, and deployment. Once live, the system runs on its own. You get notifications on your phone when leads come in, and you can check your pipeline from any device. If anything needs adjusting, we handle it — that's what the retainer is for.",
    },
    {
      question: "What types of contractors do you work with?",
      answer:
        "We've built systems for HVAC contractors, general contractors, and are expanding into plumbing, electrical, roofing, and specialty trades. If you answer phones, send proposals, and manage a pipeline — we can automate it.",
    },
    {
      question: "Do I need a website first?",
      answer:
        "Not necessarily — we can start with just a voice agent and CRM automation. But having a professional website dramatically increases lead conversion. We build them as part of our full-stack packages, and we've taken contractors from zero to a complete digital presence in 4–6 weeks.",
    },
  ],
  localSchema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Automation for Contractors by LuxCor AI",
    description:
      "Custom AI automation for contractors: voice agents, automated proposals, CRM automation, and professional websites. Built for HVAC, general contracting, and trade businesses.",
    url: "https://luxcor.tech/ai-automation-contractors",
    provider: {
      "@type": "ProfessionalService",
      name: "LuxCor AI",
      url: "https://luxcor.tech",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Melbourne",
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
    serviceType: ["AI Automation for Contractors", "AI Voice Agents", "CRM Automation"],
    areaServed: { "@type": "Country", name: "United States" },
  },
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does an AI voice agent work for a contractor?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI answers calls instantly, captures job details, books estimates on your calendar, sends confirmations, and logs everything in your CRM — all while you're on the job.",
        },
      },
      {
        "@type": "Question",
        name: "How much does AI automation cost for contractors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Voice agents run $0.10–$0.15 per call. Growth retainer with voice agent and CRM is $4,500/month. Full digital transformations start at $30,000.",
        },
      },
      {
        "@type": "Question",
        name: "Can AI generate proposals for my contracting business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We build auto-proposal systems that generate branded proposals from call data in under 60 seconds — built for a commercial HVAC contractor.",
        },
      },
      {
        "@type": "Question",
        name: "What types of contractors do you work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HVAC, general contracting, plumbing, electrical, roofing, and specialty trades. If you answer phones and send proposals, we can automate it.",
        },
      },
    ],
  },
  ctaHeadline: "Stop Losing Jobs to",
  ctaAccent: "Slower Competitors",
  ctaDescription:
    "Book a free 15-minute call. We'll show you exactly how AI voice agents and automated proposals would work for your contracting business — with real numbers.",
};

export default function AIAutomationContractorsPage() {
  return <SEOLandingPage data={pageData} />;
}
