# iWas Findex

A full-stack financial market dashboard with daily price analytics, a transparent trend forecast, a tested Python polling core and a Vercel-ready Next.js frontend.

![iWas Findex banner](assets/banner.png)

## What was rebuilt

The original repository was a small Python prototype with no web frontend. It also contained a placeholder API key, an uncontrolled polling loop, fragile field assumptions, unused heavy dependencies, inaccurate API documentation and tests that could not import the `src` package reliably.

This version provides:

- A responsive Next.js and TypeScript dashboard
- A server-side `/api/market` endpoint
- Alpha Vantage integration without exposing the API key to the browser
- Automatic, clearly labelled demo mode when no key is configured
- Daily OHLCV history, latest-session metrics and a one-step linear trend projection
- A repaired Python package with bounded history, structured errors, timeouts and graceful stopping
- JavaScript and Python tests
- GitHub Actions checks for linting, tests and production builds
- A production multi-stage Docker image

## Technology

- Next.js 16 and React 19
- TypeScript
- Native SVG charting, with no chart library dependency
- Python 3.11 or newer for the optional polling engine
- Alpha Vantage for provider data

## Run the web application

Requirements: Node.js 22 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The dashboard starts in demo mode. For provider data, add this to `.env.local`:

```env
ALPHA_VANTAGE_API_KEY=your_real_key
```

Restart the development server after changing environment variables.

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

Run every web check:

```bash
npm run check
```

## Optional Python poller

Create an environment and install the small Python dependency set:

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt -r requirements-dev.txt
copy .env.example .env
python run.py --once
pytest
```

macOS or Linux:

```bash
source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
cp .env.example .env
python run.py --once
pytest
```

The Python poller requires `ALPHA_VANTAGE_API_KEY`. The web interface does not, because it can use demo mode.

## Deploy to Vercel

1. Replace the files in your GitHub repository with this rebuilt project, or push it to a new repository.
2. In Vercel, select **Add New > Project** and import the GitHub repository.
3. Leave the framework preset as **Next.js** and the root directory as the repository root.
4. In **Settings > Environment Variables**, add `ALPHA_VANTAGE_API_KEY` for Production, Preview and Development when provider data is required.
5. Deploy. When an environment variable is added or changed later, redeploy so the new value is applied.

No `vercel.json` file or custom build command is required.

## Docker

```bash
docker build -t iwas-findex .
docker run --rm -p 3000:3000 --env-file .env iwas-findex
```

Then open `http://localhost:3000`.

## API

```http
GET /api/market?symbol=AAPL
```

Force demo mode:

```http
GET /api/market?symbol=AAPL&demo=1
```

See `docs/api/` for response details.

## Forecast limitations

The displayed forecast is a one-step ordinary least-squares linear trend extrapolation using the latest 30 closing prices. The dashboard reports model fit and residual error so users can inspect the baseline rather than treating it as a certainty. It does not account for news, fundamentals, volatility regimes, transaction costs or market microstructure.

This project is for research and demonstration. It is not financial advice.

## Project structure

```text
app/                 Next.js pages and API route
components/          Dashboard and SVG chart
lib/                 Data normalization, demo generator and forecast logic
src/                 Optional Python analytics core
tests/               Python tests
docs/                Architecture and API documentation
.github/workflows/    Combined web and Python CI
```

## License

MIT License. See `LICENSE`.
