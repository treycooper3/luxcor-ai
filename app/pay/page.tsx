import type { Metadata } from 'next'
import Link from 'next/link'

// ponytail: "hidden" = unlinked (no nav/footer entry) + noindexed here + absent from
// sitemap.ts. Deliberately NOT added to robots.ts disallow: blocking the crawl stops Google
// reading the noindex, and a blocked URL someone links to still gets indexed URL-only.
// Crawlable + noindex is what actually keeps a page out of search.
//
// No login. A payment page holds nothing sensitive; Stripe handles the money.
//
// Links live on the Stay Starving LLC Stripe account (acct_1Rz7MM...). The custom-amount one
// reuses the shared "Pay your balance" customer-chooses-price (price_1Tv5p5...), so it is not
// LuxCor-specific — if another entity ever needs a balance page, it shares this price.
const SETUP_LINK = 'https://buy.stripe.com/6oUdR8agI63N9G96iY2Ry00'
const MONTHLY_LINK = 'https://buy.stripe.com/dRmaEW88A2RB3hL5eU2Ry01'
const CUSTOM_LINK = 'https://buy.stripe.com/aFa9ASgF69fZg4xcHm2Ry02'

const CONTACT_PHONE = '+1-321-336-9693'
const CONTACT_PHONE_DISPLAY = '(321) 336-9693'

export const metadata: Metadata = {
  title: 'Pay LuxCor AI',
  description: 'Securely pay your LuxCor AI invoice online.',
  robots: { index: false, follow: false },
}

type Option = {
  eyebrow: string
  title: string
  amount: string
  unit?: string
  blurb: string
  cta: string
  href: string
  featured?: boolean
}

const options: Option[] = [
  {
    eyebrow: 'One-time',
    title: 'Founding Setup',
    amount: '$1,500',
    blurb:
      'Your 24/7 Front Desk build: voice agent configured, number provisioned, live in 14 days. Charged once.',
    cta: 'Pay now',
    href: SETUP_LINK,
  },
  {
    eyebrow: 'Recurring',
    title: 'Monthly Service',
    amount: '$500',
    unit: '/mo',
    blurb:
      'Sets up a recurring monthly subscription, billed automatically until you cancel. Starts the day your agent takes its first call. Cancel anytime.',
    cta: 'Start monthly',
    href: MONTHLY_LINK,
    featured: true,
  },
  {
    eyebrow: 'You choose',
    title: 'Custom Amount',
    amount: 'Your amount',
    blurb:
      'For anything quoted outside the standard plan: a partial payment, an add-on, or a project fee. Enter the exact amount we agreed on.',
    cta: 'Pay now',
    href: CUSTOM_LINK,
  },
]

export default function PayPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" aria-label="LuxCor AI home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/luxcor-logo-horizontal-light.svg"
              alt="LuxCor AI"
              className="h-6 w-auto"
            />
          </Link>
          <span className="text-sm text-slate-400">Secure payment</span>
        </div>
      </header>

      <section className="hero-gradient px-6 pt-16 pb-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Pay <span className="luxury-gradient">LuxCor AI</span>
          </h1>
          <p className="text-lg text-slate-300">
            Choose what you were quoted and check out securely by card or bank. Payments are
            processed by Stripe.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {options.map((option) => (
            <div
              key={option.title}
              className={`glass-card flex flex-col rounded-xl p-7 ${
                option.featured ? 'popular-glow' : ''
              }`}
            >
              <span className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A96E]">
                {option.eyebrow}
              </span>
              <h2 className="mb-4 font-serif text-2xl font-bold">{option.title}</h2>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{option.amount}</span>
                {option.unit && <span className="text-lg text-slate-400">{option.unit}</span>}
              </div>
              <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-400">{option.blurb}</p>
              <a
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button block rounded-lg px-6 py-3 text-center font-semibold text-[#0a0a0a]"
                style={{ background: 'linear-gradient(135deg, #C9A96E, #E8D5B7)' }}
              >
                {option.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8">
        <p className="mx-auto max-w-2xl text-center text-sm text-slate-400">
          Questions about your invoice? Call or text{' '}
          <a href={`tel:${CONTACT_PHONE}`} className="text-[#C9A96E] hover:text-[#E8D5B7]">
            {CONTACT_PHONE_DISPLAY}
          </a>{' '}
          before you pay.
        </p>
      </footer>
    </div>
  )
}
