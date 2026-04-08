import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luxcor.tech"),
  title: "Luxcor AI | Custom AI Automation for Growing Businesses",
  description:
    "Luxcor AI builds custom AI automations, voice agents, and intelligent workflows that save your business time and money. Starter audit from $997. Book a free strategy call today.",
  keywords: [
    "AI automation",
    "AI agency",
    "business automation",
    "voice agents",
    "AI workflows",
    "custom AI solutions",
    "AI automation agency",
    "custom AI agents",
  ],
  verification: {
    google: "wT55R7UEGuKH4kO6K1UmghyTnbuoPKHg5O2EFH4C6kg",
  },
  alternates: {
    canonical: "https://luxcor.tech",
  },
  openGraph: {
    title: "Luxcor AI | Custom AI Automation for Growing Businesses",
    description:
      "Custom AI automations, voice agents, and intelligent workflows that save your business time and money. 6+ client projects delivered.",
    type: "website",
    locale: "en_US",
    url: "https://luxcor.tech",
    siteName: "Luxcor AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxcor AI | Custom AI Automation for Growing Businesses",
    description:
      "Custom AI automations, voice agents, and intelligent workflows that save your business time and money.",
    creator: "@treythesavage3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="text/markdown" href="/index.md" />
        <link rel="help" type="text/plain" href="/llms.txt" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
