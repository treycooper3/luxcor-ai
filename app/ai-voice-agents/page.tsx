import type { Metadata } from "next";
import SEOLandingPage from "../components/SEOLandingPage";
import type { SEOPageData } from "../components/SEOLandingPage";

export const metadata: Metadata = {
  title: "AI Voice Agents for Business | 24/7 AI Receptionist | LuxCor AI",
  description:
    "Custom AI voice agents that answer calls 24/7, qualify leads, book appointments, and transfer complex cases — starting at $0.15/call. Replace your $40K receptionist with AI that never sleeps. Built by LuxCor AI in Melbourne, FL.",
  keywords: [
    "AI voice agents",
    "AI receptionist",
    "AI phone answering",
    "AI call answering service",
    "VAPI voice agent",
    "automated phone system",
    "AI appointment booking",
    "24/7 AI phone",
    "AI lead qualification",
    "voice AI for business",
    "AI answering service",
    "virtual receptionist AI",
  ],
  alternates: {
    canonical: "https://luxcor.tech/ai-voice-agents",
  },
  openGraph: {
    title: "AI Voice Agents for Business | LuxCor AI",
    description:
      "24/7 AI receptionists that answer calls, qualify leads, and book appointments. Starting at $0.15/call. Built by LuxCor AI.",
    url: "https://luxcor.tech/ai-voice-agents",
  },
};

const pageData: SEOPageData = {
  eyebrow: "AI Voice Agents That Actually Work",
  headline: "Never Miss a Call.",
  headlineAccent: "Never Lose a Lead.",
  subheadline:
    "Our custom AI voice agents answer every call 24/7 — qualifying leads, booking appointments, and warm-transferring complex cases. All for a fraction of what you'd pay a human receptionist. Starting at $0.15 per call.",
  painPoints: [
    {
      title: "Missed Calls = Lost Revenue",
      description:
        "80% of callers who reach voicemail hang up and call your competitor. Every missed call is a missed sale. AI voice agents answer instantly, every time, day or night.",
    },
    {
      title: "Receptionists Are Expensive",
      description:
        "A full-time receptionist costs $35K–$50K per year plus benefits. Our AI voice agents handle the same calls at $0.10–$0.15 per call — that's over 99% cost savings.",
    },
    {
      title: "Generic Bots Don't Cut It",
      description:
        'Customers can spot a bad phone tree in seconds. Our voice agents use natural language understanding, handle interruptions, and sound conversational — not robotic. We train them on your specific business.',
    },
  ],
  serviceHighlights: [
    {
      title: "Inbound Call Handling",
      description:
        "AI answers every inbound call instantly. Greets callers by name if they're in your CRM, understands their request, and routes them to the right action — appointment, transfer, or information.",
    },
    {
      title: "Lead Qualification",
      description:
        "Asks the right questions to qualify leads before they reach your team. Budget, timeline, project type, location — all captured and logged automatically.",
    },
    {
      title: "Appointment Booking",
      description:
        "Connected to your calendar (Google, Calendly, or custom). Books appointments in real-time, sends confirmations, and handles rescheduling — no human needed.",
    },
    {
      title: "Warm Transfer & Escalation",
      description:
        "Complex cases get transferred to a live person with full context. The AI briefs your team on who's calling and why before they pick up.",
    },
    {
      title: "Multi-Language Support",
      description:
        "Voice agents that speak English, Spanish, and more. Serve your entire customer base without hiring bilingual staff.",
    },
    {
      title: "CRM & Automation Integration",
      description:
        "Every call is logged, transcribed, and synced to your CRM. Triggers follow-up automations, sends recap emails, and updates your pipeline automatically.",
    },
  ],
  caseStudies: [
    {
      name: "Financial Aid Network",
      tagline: "$0.15/call replaces $40K/year receptionist",
      problem:
        "Overwhelmed staff spending hours answering repetitive calls. Students waiting on hold, going to competitors, or never calling back.",
      solution:
        'Built "Dominique" — a custom AI voice agent handling all inbound calls 24/7. Verifies caller identity, qualifies the inquiry, books appointments, and warm-transfers complex financial aid cases to counselors.',
      result:
        "Zero missed calls. $0.15 per call vs. $40,000/year for a receptionist. Staff freed to focus on enrolled students instead of answering phones.",
      features: ["24/7 Call Handling", "Identity Verification", "Calendar Booking", "Warm Transfer"],
    },
    {
      name: "TnD Mechanical",
      tagline: "HVAC contractor — AI answers while the team is on the job",
      problem:
        "Commercial HVAC contractor missing calls during jobs. By the time they called back, the customer had already booked with a competitor.",
      solution:
        "AI voice receptionist answering every call instantly — capturing job details, qualifying the lead, and triggering a 9-node CRM automation that generates a branded proposal in under 60 seconds.",
      result:
        "24/7 call coverage at $0.10/call. Every lead gets a custom proposal before competitors respond. More bids won with zero additional staff.",
      features: ["AI Voice Agent", "Auto Proposals", "CRM Integration", "60-Second Response"],
    },
  ],
  faqs: [
    {
      question: "How much does an AI voice agent cost?",
      answer:
        "Our AI voice agents cost between $0.10 and $0.15 per call, depending on complexity. Compare that to a human receptionist at $35K–$50K/year, or an answering service at $1–$3 per call. Setup is included in our Growth retainer ($4,500/month) or as part of an Enterprise engagement.",
    },
    {
      question: "Can AI really handle phone calls that well?",
      answer:
        "Yes. Modern voice AI uses natural language understanding and responds conversationally — not like a phone tree. Our agents handle interruptions, ask clarifying questions, and adapt to caller intent. We train each agent specifically on your business, your services, and your common call scenarios.",
    },
    {
      question: "What happens when the AI can't handle a call?",
      answer:
        "It transfers to a live person. Our voice agents are built with warm-transfer capability — they brief your team on who's calling and why before connecting. The caller never gets stuck in a loop.",
    },
    {
      question: "How long does it take to set up a voice agent?",
      answer:
        "Most voice agents go live in 1–2 weeks. We handle the entire build: call flow design, natural language training, calendar integration, CRM connection, and testing. You review and approve before it goes live.",
    },
    {
      question: "What phone systems do you integrate with?",
      answer:
        "We build on VAPI and integrate with Twilio, Google Voice, RingCentral, and most VoIP providers. If you have a phone number, we can connect an AI agent to it.",
    },
    {
      question: "Do callers know they're talking to AI?",
      answer:
        "We can configure the agent to disclose or not — depending on your preference and local regulations. Either way, the experience is conversational and professional. Most callers are simply happy someone answered.",
    },
  ],
  localSchema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Voice Agents by LuxCor AI",
    description:
      "Custom AI voice agents that answer business calls 24/7, qualify leads, book appointments, and warm-transfer complex cases. Starting at $0.15/call.",
    url: "https://luxcor.tech/ai-voice-agents",
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
    serviceType: "AI Voice Agent",
    areaServed: { "@type": "Country", name: "United States" },
    offers: {
      "@type": "Offer",
      description: "AI voice agent setup and operation",
      price: "0.15",
      priceCurrency: "USD",
      unitText: "per call",
    },
  },
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does an AI voice agent cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI voice agents cost $0.10–$0.15 per call. Compare to $35K–$50K/year for a receptionist or $1–$3/call for an answering service.",
        },
      },
      {
        "@type": "Question",
        name: "Can AI really handle phone calls?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Modern voice AI uses natural language understanding, handles interruptions, and responds conversationally. Each agent is trained specifically on your business.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to set up a voice agent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most voice agents go live in 1–2 weeks including call flow design, training, calendar integration, and CRM connection.",
        },
      },
      {
        "@type": "Question",
        name: "What happens when the AI can't handle a call?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It warm-transfers to a live person with full context — who's calling and why. The caller never gets stuck.",
        },
      },
    ],
  },
  ctaHeadline: "Stop Missing Calls.",
  ctaAccent: "Start Closing Leads.",
  ctaDescription:
    "Book a free 15-minute call and we'll show you exactly how an AI voice agent would work for your business — with real numbers on cost savings and lead capture.",
};

export default function AIVoiceAgentsPage() {
  return <SEOLandingPage data={pageData} />;
}
