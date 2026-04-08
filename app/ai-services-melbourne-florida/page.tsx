import type { Metadata } from "next";
import SEOLandingPage from "../components/SEOLandingPage";
import type { SEOPageData } from "../components/SEOLandingPage";

export const metadata: Metadata = {
  title: "AI Services in Melbourne, FL | AI Automation Agency | LuxCor AI",
  description:
    "LuxCor AI is Melbourne, Florida's AI automation agency. We build custom AI voice agents, workflow automation, and intelligent systems for local businesses. Headquartered in Melbourne, FL. Starting at $997.",
  keywords: [
    "AI services Melbourne FL",
    "AI automation Melbourne Florida",
    "AI agency Melbourne FL",
    "Melbourne FL AI company",
    "AI consulting Melbourne Florida",
    "AI voice agents Melbourne",
    "business automation Melbourne FL",
    "Melbourne Florida technology",
    "AI solutions Melbourne",
    "custom AI Melbourne FL",
  ],
  alternates: {
    canonical: "https://luxcor.tech/ai-services-melbourne-florida",
  },
  openGraph: {
    title: "AI Services in Melbourne, FL | LuxCor AI",
    description:
      "Melbourne, Florida's AI automation agency. Custom voice agents, workflow automation, and AI systems. Headquartered locally. Starting at $997.",
    url: "https://luxcor.tech/ai-services-melbourne-florida",
  },
};

const pageData: SEOPageData = {
  eyebrow: "Melbourne, Florida's AI Agency",
  headline: "Melbourne's Own",
  headlineAccent: "AI Automation Agency",
  subheadline:
    "LuxCor AI is headquartered right here in Melbourne, FL. We build custom AI voice agents, workflow automations, and intelligent systems for local businesses that want to grow faster with less overhead.",
  painPoints: [
    {
      title: "Melbourne Is Growing Fast",
      description:
        "Melbourne's economy is booming with aerospace, defense, tech, and service businesses. But growth means more calls, more leads, and more manual work. Without AI, you're leaving money on the table.",
    },
    {
      title: "Your Team Is Stretched Thin",
      description:
        "You're answering phones, following up on leads, generating proposals, and managing operations — all manually. That's not sustainable. AI handles the repetitive work so you can focus on what matters.",
    },
    {
      title: "Work with Someone Local",
      description:
        "We're not a faceless agency in another state. LuxCor AI is right here in Melbourne. Same city, same community, same understanding of the local market.",
    },
  ],
  serviceHighlights: [
    {
      title: "AI Voice Agents",
      description:
        "Your phone rings at 2 AM and AI answers it. Qualifies the lead, books the appointment, sends a confirmation email — all before your competitor wakes up. Starting at $0.15/call.",
    },
    {
      title: "CRM & Workflow Automation",
      description:
        "Automated lead capture, proposal generation, follow-up sequences, and invoicing. We connect your tools into one intelligent system using n8n and custom Python integrations.",
    },
    {
      title: "Professional Websites with AI",
      description:
        "Not just a pretty site — a conversion machine. AI chatbots, dynamic proposals, automated booking, and lead capture built into every page.",
    },
    {
      title: "Full Business Transformation",
      description:
        "Website + voice agent + CRM + proposals + ongoing optimization. We've taken Melbourne-area businesses from zero digital presence to fully automated operations.",
    },
  ],
  caseStudies: [
    {
      name: "TnD Mechanical",
      tagline: "Local HVAC contractor — zero to fully automated",
      problem:
        "Melbourne-area HVAC contractor with no website, no digital presence, and missing calls during jobs. Losing bids to competitors who respond faster.",
      solution:
        "Built everything: professional website, AI voice receptionist, and 9-node CRM automation that generates branded proposals in under 60 seconds.",
      result:
        "Every lead gets a custom proposal before competitors respond. 24/7 call coverage. Winning more bids with less manual effort.",
      features: ["AI Voice Agent", "CRM Automation", "Auto Proposals", "60-Second Turnaround"],
    },
    {
      name: "C&C Contracting",
      tagline: "Melbourne contractor goes from invisible to credible",
      problem:
        "Licensed general contractor with no online presence. Property managers and GCs Googling them and finding nothing — losing opportunities.",
      solution:
        "Custom brand identity, professional website with portfolio and service areas, and automated lead capture with intelligent routing.",
      result:
        "Credible digital presence that wins bids. Landed a major hotel contract within weeks of launch.",
      features: ["Brand Identity", "Lead Capture", "Portfolio Site", "Automated Routing"],
    },
    {
      name: "Financial Aid Network",
      tagline: "$0.15/call AI receptionist replacing $40K role",
      problem:
        "Staff overwhelmed by repetitive calls. Students going to competitors because no one picks up the phone.",
      solution:
        'AI voice agent "Dominique" answering every call 24/7 — qualifying, booking appointments, and transferring complex cases to staff.',
      result:
        "Zero missed calls at $0.15/call. Staff freed for high-value work. Students get instant service.",
      features: ["24/7 Coverage", "Lead Qualification", "Calendar Booking", "Warm Transfer"],
    },
  ],
  faqs: [
    {
      question: "Is LuxCor AI actually based in Melbourne, FL?",
      answer:
        "Yes. LuxCor AI is headquartered in Melbourne, Florida. Our founder, Trey Cooper, lives and works in Melbourne. We're a division of Stay Starving Holdings LLC, a Melbourne-based holding company.",
    },
    {
      question: "What Melbourne businesses have you worked with?",
      answer:
        "We've worked with local contractors including TnD Mechanical (HVAC) and C&C Contracting (general contracting), plus businesses across Florida and nationwide. Our case studies include AI voice agents, full digital transformations, and e-commerce builds.",
    },
    {
      question: "How quickly can you start a project?",
      answer:
        "We can start within days of booking a strategy call. Voice agents go live in 1–2 weeks. Full digital transformations take 4–8 weeks. Our $997 AI Workflow Audit is the fastest way to get started.",
    },
    {
      question: "Do you work with small businesses or just large companies?",
      answer:
        "We work with businesses of all sizes. Our $997 Starter audit is designed for small businesses exploring AI. Our Growth retainer ($4,500/mo) serves growing companies. Enterprise builds ($30K–$50K) handle large-scale transformations.",
    },
    {
      question: "What makes LuxCor AI different from agencies in Orlando or Miami?",
      answer:
        "We're local. We understand Melbourne's business community. And we're engineering-led — our founder has a mechanical engineering degree and built our proprietary WAT Framework for near-100% execution accuracy. We build custom systems, not templates.",
    },
  ],
  localSchema: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "LuxCor AI",
    description:
      "Melbourne, Florida's AI automation agency building custom voice agents, workflow automation, and intelligent systems for local businesses.",
    url: "https://luxcor.tech/ai-services-melbourne-florida",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "FL",
      postalCode: "32901",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.0836",
      longitude: "-80.6081",
    },
    areaServed: {
      "@type": "City",
      name: "Melbourne",
      containedInPlace: {
        "@type": "State",
        name: "Florida",
      },
    },
    founder: {
      "@type": "Person",
      name: "Charles Cooper III",
      alternateName: "Trey Cooper",
    },
    priceRange: "$997 - $50,000",
    serviceType: ["AI Automation", "AI Voice Agents", "Workflow Automation", "AI Consulting"],
  },
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is LuxCor AI actually based in Melbourne, FL?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. LuxCor AI is headquartered in Melbourne, Florida. A division of Stay Starving Holdings LLC.",
        },
      },
      {
        "@type": "Question",
        name: "What Melbourne businesses have you worked with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Local clients include TnD Mechanical (HVAC) and C&C Contracting (general contracting), plus businesses across Florida and nationwide.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly can you start a project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Voice agents go live in 1–2 weeks. Full transformations take 4–8 weeks. The $997 audit is the fastest way to start.",
        },
      },
      {
        "@type": "Question",
        name: "What makes LuxCor AI different from agencies in Orlando or Miami?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We're local to Melbourne, engineering-led with a proprietary WAT Framework, and build custom systems instead of templates.",
        },
      },
    ],
  },
  ctaHeadline: "Melbourne's AI Partner Is",
  ctaAccent: "Ready When You Are",
  ctaDescription:
    "Book a free 15-minute strategy call with a local AI expert. We'll show you where AI fits in your business and map out a clear path forward.",
};

export default function AIServicesMelbourneFLPage() {
  return <SEOLandingPage data={pageData} />;
}
