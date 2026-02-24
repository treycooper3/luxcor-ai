import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxcor AI | Premium AI Solutions for Business",
  description:
    "Luxcor AI builds custom AI automations, voice agents, and intelligent workflows that save your business time and money. Book a free strategy call today.",
  keywords: [
    "AI automation",
    "AI agency",
    "business automation",
    "voice agents",
    "AI workflows",
    "custom AI solutions",
  ],
  openGraph: {
    title: "Luxcor AI | Premium AI Solutions for Business",
    description:
      "Custom AI automations, voice agents, and intelligent workflows that save your business time and money.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxcor AI | Premium AI Solutions for Business",
    description:
      "Custom AI automations, voice agents, and intelligent workflows that save your business time and money.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
