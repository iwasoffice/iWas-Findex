# Rebuild report

Date: 20 July 2026

## Main defects found in the downloaded repository

1. No frontend or web server existed, despite documentation describing a REST API.
2. The provider key in `src/config.py` was a hard-coded placeholder and `.env` was not actually loaded.
3. Tests failed during collection because the Python source package was incomplete.
4. The streaming process ran indefinitely with no programmatic stop mechanism.
5. Polling occurred every second, which was unsuitable for a rate-limited external provider.
6. Price parsing depended directly on the Alpha Vantage field name `05. price` throughout the model.
7. Network requests had no timeout and all failures were reduced to printed messages.
8. The model swallowed exceptions, which made failures difficult to diagnose or test.
9. TensorFlow, pandas, NumPy, aiohttp and schedule were installed but unused.
10. The documentation advertised endpoints, authentication and a hosted domain that were not implemented.
11. The original Docker image exposed port 8000 even though no HTTP server was running.
12. CI covered only the incomplete Python prototype and used older action versions.

## Implemented replacement

- Next.js 16 and React 19 frontend
- Responsive market dashboard
- Server-side `GET /api/market` route
- Server-only Alpha Vantage credential handling
- Deterministic demo fallback when a provider key is absent or unavailable
- Symbol validation, request timeout and edge-cache headers
- Normalized daily OHLCV response
- Transparent one-step linear trend forecast
- Model fit and residual error reporting
- Repaired Python package and optional command-line poller
- Bounded history and separate model state per symbol
- JavaScript and Python tests
- Combined GitHub Actions workflow
- Production Docker configuration
- Accurate architecture, API and deployment documentation

## Verification completed

The following commands passed in the rebuilt repository:

```bash
npm run lint
npm run test
npm run build
npm audit --omit=dev --audit-level=moderate
ruff check src tests run.py
pytest
```

Results at packaging time:

- JavaScript tests: 5 passed
- Python tests: 7 passed
- Next.js production build: passed
- ESLint: passed
- Ruff: passed
- Production dependency audit: 0 known vulnerabilities reported by npm audit
- Runtime demo endpoint: HTTP 200
- Runtime invalid-symbol endpoint: HTTP 400 with controlled JSON error

## Not verified

A live Alpha Vantage response was not tested because no real `ALPHA_VANTAGE_API_KEY` was supplied. The provider parser is covered by mocked tests, and the deployed application automatically uses clearly labelled demo data until a working key is configured.
