# Architecture

## Web application

The deployable application uses Next.js App Router.

1. The browser renders `components/dashboard.tsx`.
2. The dashboard calls `GET /api/market?symbol=AAPL`.
3. The server route validates the symbol and reads `ALPHA_VANTAGE_API_KEY` only on the server.
4. `lib/market.ts` requests Alpha Vantage daily data, validates the payload and creates a normalized snapshot.
5. `lib/forecast.ts` calculates a transparent one-step linear trend projection from the latest 30 closing prices.
6. When no key is present, or the provider is unavailable, a deterministic demo series is returned with an explicit demo label.

## Python analytics core

The Python package is optional and independent of the Vercel deployment.

- `src/config.py` loads validated environment settings.
- `src/data_fetcher.py` handles provider requests and structured errors.
- `src/ai_agent.py` stores bounded price history and fits the same linear baseline concept.
- `src/realtime_stream.py` coordinates rate-conscious polling with a stop mechanism.
- `run.py --once` performs one polling cycle.

## Security boundaries

- The market API key is never exposed through a `NEXT_PUBLIC_` variable.
- Symbols are allow-pattern validated before provider requests.
- Provider requests have a ten-second timeout.
- API responses are cached at the edge for five minutes.
