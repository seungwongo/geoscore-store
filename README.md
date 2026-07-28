# GeoScore Store

Next.js (App Router) marketing + commerce site for the **GeoScore** Chrome extension.
No login, no database. Purchase runs through **Paddle**; after a verified payment the buyer
gets a gated download page and an email with the extension zip attached.

## Features

- Landing page recreated from `landing.html`, componentized in React.
- **i18n**: Korean browsers get `/ko`, everyone else gets `/en` (middleware reads `Accept-Language`).
- Footer legal pages: Privacy / Terms / Refund (`/[locale]/privacy|terms|refund`).
- Install guide for loading the unpacked extension via `chrome://extensions`.
- Paddle overlay checkout with a required email input.
- Payment verified **server-side** against the Paddle API (`/api/verify`).
- Download gated by an **HMAC-signed token** (`/api/download` streams `secure/geo-score-0.1.0.zip`,
  which is never exposed under `public/`).
- Customer email (sleek HTML template + zip attachment) and a purchase notification to `NOTIFY_EMAIL`,
  both via Nodemailer/Gmail SMTP.

## Setup

1. `npm install`
2. Copy `.env.example` → `.env.local` and fill in values (see below).
3. `npm run dev` (or `npm run build && npm run start`).

## Environment variables

| Variable | Purpose |
|----------|---------|
| `SMTP_HOST`, `SMTP_PORT`, `GOOGLE_MAIL`, `GOOGLE_PASSWORD` | Gmail SMTP for Nodemailer |
| `NOTIFY_EMAIL` | Owner address that receives purchase notifications |
| `NEXT_PUBLIC_APP_URL` | Public base URL (used in email links) |
| `PADDLE_ENV` | `sandbox` or `production` (must match your API key/token) |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | Paddle client-side token (sandbox tokens start with `test_`) |
| `NEXT_PUBLIC_PADDLE_PRICE_ID` | Price ID for the one-time purchase (`pri_...`) |
| `PADDLE_API_KEY` | Paddle server API key (keep secret) |
| `DOWNLOAD_TOKEN_SECRET` | Long random string used to sign download tokens |

> **Important:** `PADDLE_ENV` must match your credentials. A `pdl_live_...` API key and a client token
> without the `test_` prefix are **production**; sandbox uses a `test_...` client token and a sandbox
> API key. A mismatch (e.g. `PADDLE_ENV=sandbox` with a live key) makes `/api/verify` fail.

## Payment → download flow

1. Buy button → email modal (required).
2. Paddle overlay checkout opens (email prefilled).
3. `checkout.completed` → `POST /api/verify` with the transaction id.
4. Server verifies with Paddle, emails the customer (zip attached), notifies the owner, and returns
   a signed token.
5. Browser redirects to `/[locale]/download?token=...`; the token also works from the email link
   for 30 days.

The extension zip lives in `secure/` (server-only) and is served only through the token-guarded
`/api/download` route.
