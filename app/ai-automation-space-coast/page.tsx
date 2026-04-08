import type { Metadata } from "next";
import SEOLandingPage from "../components/SEOLandingPage";
import type { SEOPageData } from "../components/SEOLandingPage";

export const metadata: Metadata = {
  title: "AI Automation on the Space Coast | Melbourne FL | LuxCor AI",
  description:
    "Space Coast's premier AI automation agency. LuxCor AI builds custom voice agents, workflow automation, and AI systems for Brevard County businesses. Based in Melbourne, FL. 6+ projects delivered.",
  keywords: [
    "AI automation Space Coast",
    "AI services Space Coast",
    "AI agency Melbourne FL",
    "AI automation Brevard County",
    "Space Coast technology",
    "Melbourne Florida AI",
    "Brevard County automation",
    "AI consulting Space Coast",
    "Space Coast AI company",
    "AI voice agents Brevard",
  ],
  alternates: {
    canonical: "https://luxcor.tech/ai-automation-space-coast",
  },
  openGraph: {
    title: "AI Automation on the Space Coast | LuxCor AI",
    description:
      "Space Coast's premier AI automation agency. Custom voice agents, workflow automation, and AI systems for Brevard County businesses.",
    url: "https://luxcor.tech/ai-automation-space-coast",
  },
};

const pageData: SEOPageData = {
  eyebrow: "Space Coast's AI Automation Agency",
  headline: "AI Automation Built on",
  headlineAccent: "Florida's Space Coast",
  subheadline:
    "LuxCor AI is headquartered in Melbourne, FL — right in the heart of Brevard County's growing tech corridor. We build custom AI systems for Space Coast businesses that need to compete smarter, not harder.",
  painPoints: [
    {
      title: "The Space Coast Is Booming",
      description:
        "With SpaceX, L3Harris, Northrop Grumman, and hundreds of growing businesses, the Space Coast economy is accelerating. But most local businesses still operate with manual workflows, missed calls, and disconnected systems.",
    },
    {
      title: "Your Competitors Are Automating",
      description:
        "Contractors, service businesses, and professional firms across Brevard County are starting to adopt AI. The businesses that move first win the leads, close faster, and scale without hiring.",
    },
    {
      title: "You Deserve a Local AI Partner",
      description:
        "Skip the Silicon Valley agencies and overpriced consultants. LuxCor AI is right here in Melbourne — same timezone, same market, same understanding of what Space Coast businesses need.",
    },
  ],
  serviceHighlights: [
    {
      title: "AI Voice Agents for Local Businesses",
      description:
        "Never miss a call again. Our AI receptionists answer 24/7, qualify leads, book appointments, and warm-transfer — all for a fraction of the cost of a human receptionist.",
    },
    {
      title: "Workflow Automation",
      description:
        "Connect your CRM, scheduling, invoicing, and follow-up into one intelligent system. No more jumping between 5 different apps or losing leads between the cracks.",
    },
    {
      title: "AI-Powered Websites & Proposals",
      description:
        "Websites that work as hard as you do — with AI chatbots, auto-generated proposals, and lead capture that converts visitors into customers while you're on the job.",
    },
    {
      title: "Full Digital Transformation",
      description:
        "From zero web presence to a complete AI-powered operation: website, voice agent, CRM, automated proposals, and ongoing optimization. We've done this for Space Coast contractors already.",
    },
  ],
  caseStudies: [
    {
      name: "TnD Mechanical",
      tagline: "Space Coast HVAC contractor — full digital transformation",
      problem:
        "Commercial HVAC contractor based on the Space Coast with no digital presence. Missed calls during jobs, manual proposals, losing bids to faster competitors.",
      solution:
        "Full-stack build: professional website + AI voice receptionist + 9-node CRM automation generating branded proposals in under 60 seconds.",
      result:
        "Every lead gets a custom proposal before the competition responds. 24/7 call coverage at $0.10/call. Winning more bids with less effort.",
      features: ["AI Voice Agent", "9-Node CRM", "Auto Proposals", "60-Second Turnaround"],
    },
    {
      name: "C&C Contracting",
      tagline: "General contractor brand built from scratch",
      problem:
        "Licensed general contractor with no online presence. Property managers and GCs Googling them and finding nothing.",
      solution:
        "Custom brand identity + professional website with project portfolio, service areas, and automated lead capture with routing.",
      result:
        "Credible digital presence that wins bids. First contract landed with a major hotel chain within weeks of launch.",
      features: ["Brand Identity", "Logo Design", "Lead Capture", "Automated Routing"],
    },
    {
      name: "Financial Aid Network",
      tagline: "24/7 AI receptionist replacing $40K/year role",
      problem:
        "Staff overwhelmed by repetitive inbound calls. Students waiting on hold or going to competitors.",
      solution:
        'AI voice agent "Dominique" handling all inbound calls — qualifying callers, verifying identity, booking appointments, warm-transferring complex cases.',
      result:
        "Zero missed calls. $0.15/call vs. $40K/year receptionist. Staff freed for higher-value work.",
      features: ["24/7 Call Handling", "Lead Qualification", "Calendar Booking", "Warm Transfer"],
    },
  ],
  faqs: [
    {
      question: "Where on the Space Coast is LuxCor AI located?",
      answer:
        "LuxCor AI is headquartered in Melbourne, Florida — right in the center of Brevard County's Space Coast. We're local to the area and serve businesses throughout the Space Coast, including Cocoa Beach, Titusville, Palm Bay, Viera, Satellite Beach, and beyond.",
    },
    {
      question: "What types of Space Coast businesses do you work with?",
      answer:
        "We've built AI systems for contractors, HVAC companies, financial services, e-commerce brands, and professional service firms. If your business is on the Space Coast and has manual processes, missed calls, or disconnected tools, we can help.",
    },
    {
      question: "How much does AI automation cost for a small business?",
      answer:
        "Our AI Workflow Audit starts at $997 — a one-time investment to identify where AI fits in your business. Ongoing automation builds start at $4,500/month. Enterprise transformations range from $30,000–$50,000.",
    },
    {
      question: "Can I meet with LuxCor AI in person?",
      answer:
        "Absolutely. We're based in Melbourne, FL and happy to meet locally. We also work with clients remotely across the state and nationwide. Book a free strategy call to get started.",
    },
    {
      question: "How is LuxCor AI different from other AI agencies?",
      answer:
        "We're local, engineering-led, and results-focused. Our founder has a mechanical engineering background and built our proprietary WAT Framework for near-100% execution accuracy. We don't sell templates — we build custom systems that fit your business.",
    },
  ],
  localSchema: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "LuxCor AI",
    description:
      "Space Coast AI automation agency based in Melbourne, FL. Custom voice agents, workflow automation, and AI systems for Brevard County businesses.",
    url: "https://luxcor.tech/ai-automation-space-coast",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.0836",
      longitude: "-80.6081",
    },
    areaServed: [
      { "@type": "City", name: "Melbourne, FL" },
      { "@type": "City", name: "Palm Bay, FL" },
      { "@type": "City", name: "Cocoa Beach, FL" },
      { "@type": "City", name: "Titusville, FL" },
      { "@type": "City", name: "Viera, FL" },
      { "@type": "City", name: "Satellite Beach, FL" },
      { "@type": "AdministrativeArea", name: "Brevard County, FL" },
    ],
    founder: {
      "@type": "Person",
      name: "Charles Cooper III",
      alternateName: "Trey Cooper",
    },
    priceRange: "$997 - $50,000",
    serviceType: ["AI Automation", "AI Voice Agents", "Workflow Automation"],
  },
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where on the Space Coast is LuxCor AI located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "LuxCor AI is headquartered in Melbourne, Florida — right in the center of Brevard County's Space Coast.",
        },
      },
      {
        "@type": "Question",
        name: "What types of Space Coast businesses do you work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We work with contractors, HVAC companies, financial services, e-commerce brands, and professional service firms across the Space Coast.",
        },
      },
      {
        "@type": "Question",
        name: "How much does AI automation cost for a small business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI Workflow Audit starts at $997. Ongoing builds start at $4,500/month. Enterprise transformations range from $30,000–$50,000.",
        },
      },
      {
        "@type": "Question",
        name: "How is LuxCor AI different from other AI agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We're local, engineering-led, and results-focused with a proprietary WAT Framework for near-100% execution accuracy.",
        },
      },
    ],
  },
  ctaHeadline: "Ready to Bring AI to Your",
  ctaAccent: "Space Coast Business?",
  ctaDescription:
    "Book a free 15-minute strategy call. We'll show you exactly where AI fits in your business and give you a clear roadmap. No pressure, no strings.",
};

export default function AIAutomationSpaceCoastPage() {
  return <SEOLandingPage data={pageData} />;
}
