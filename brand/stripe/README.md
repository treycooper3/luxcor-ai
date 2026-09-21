# Stripe checkout branding — LuxCor

These two PNGs make `buy.stripe.com` checkouts show LuxCor instead of a bare
"Stay Starving LLC" text line.

| File | Size | Where it shows |
|---|---|---|
| `luxcor-stripe-icon.png` | 1024×1024 | The square icon beside the business name on the checkout page, the customer portal, and receipt emails. **This is the one clients see on the payment link.** |
| `luxcor-stripe-logo.png` | 1200×320 | Invoices and receipts. |

Both are the site's own `brand/luxcor-icon.svg` and `brand/luxcor-logo-horizontal-light.svg`
rendered onto LuxCor's `#0a0a0a` ground. The source marks are built for dark backgrounds — the
cream `#E8D5B7` nodes nearly disappear on Stripe's white checkout panel — so they ship as
self-contained dark tiles rather than transparent cutouts.

## Applying them (Dashboard only)

Stripe's API refuses branding writes to your own account (`You cannot use this method on your
own account: you may only use it on connected accounts`), so this cannot be scripted. Upload by
hand at **https://dashboard.stripe.com/settings/branding**:

- **Icon** → `luxcor-stripe-icon.png`
- **Logo** → `luxcor-stripe-logo.png`

Branding is **account-wide** on `acct_1Rz7MMBcX2V5esgr` (Stay Starving LLC). Every checkout on
that account gets this icon, not just LuxCor's. That was safe as of 2026-09-21: branding was
unset and the last charge was September 2025 (apparel). Revisit if Kayphoria X starts selling
through this same account.

## Regenerating

Render the source SVG onto a tile with Playwright and screenshot the tile with
`omitBackground: true`. The horizontal lockup's declared viewBox (`0 0 380 60`) is wider than
its ink (`getBBox()` → `x=11.25 w=299.3`), so it renders left-of-centre unless you tighten the
viewBox first.

Keep both files under Stripe's 512 KB limit.
