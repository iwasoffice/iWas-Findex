# Architecture

The web app uses Next.js App Router. The browser calls `GET /api/market?symbol=...`; the server validates the ticker and retrieves Alpha Vantage data when a server-only key is configured. If the provider is unavailable or no key is set, the API returns deterministic demo data with an explicit demo label.

The client stores only theme and watchlist preferences locally. The browser extension stores its target web-app URL locally.

The PWA service worker caches navigation/static assets only; it intentionally does not cache `/api/market` responses.
