# iWas Findex

iWas Findex is a cross-platform market-intelligence dashboard with an inspectable linear-trend baseline, daily OHLCV data, watchlists, PWA installation and browser-extension companions.

## Included

- Next.js web app ready for Vercel
- Dark mode by default, with Light and System options
- Server-side Alpha Vantage integration with a clearly-labelled deterministic demo fallback
- Responsive desktop, tablet and mobile UI
- Installable PWA and offline fallback
- Local watchlist persistence
- Chromium extension for Chrome, Edge, Brave and Opera
- Firefox extension
- Downloads page with store-release placeholders
- Optional Python polling core
- GitHub Actions CI

## Run locally

Node.js 22+:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The app works in demo mode without credentials. To use live provider data, copy `.env.example` to `.env.local` and set:

```env
ALPHA_VANTAGE_API_KEY=your_real_key
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Framework: Next.js.
4. Root directory: repository root.
5. Install command: `npm install --no-audit --no-fund`.
6. Build command: `npm run build`.
7. Node.js: 22.
8. Add `ALPHA_VANTAGE_API_KEY` if live provider data is required.

No secret is required for demo mode.

## Deploy to Render

For a GitHub-connected Render Web Service use Node.js, `npm install --no-audit --no-fund && npm run build`, `npm start`, and health check path `/api/health`. The same optional `ALPHA_VANTAGE_API_KEY` enables live provider data.

## Browser extensions

Ready-to-download packages are in `public/downloads/` and source code is in `platforms/browser-extension/`.

The extension's Settings page lets you change the deployed Findex URL after Vercel assigns the final domain.

## Mobile and desktop

The web application is an installable PWA. It can run in a dedicated app window on supported desktop and mobile browsers. Google Play and Apple App Store listings are marked as coming soon because store publishing requires developer accounts, signed builds and review.

## Forecast limitations

The forecast is a one-step ordinary least-squares trend extrapolation using recent closing prices. It is a transparent baseline, not a trading recommendation or guarantee.
