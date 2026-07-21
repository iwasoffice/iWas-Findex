import { createDemoCandles } from "./demo-data";
import { linearTrendForecast, round } from "./forecast";
import type { Candle, MarketSnapshot } from "./types";

const ALPHA_VANTAGE_URL = "https://www.alphavantage.co/query";
const SYMBOL_PATTERN = /^[A-Z0-9][A-Z0-9.\-]{0,14}$/;

interface AlphaVantagePayload {
  [key: string]: unknown;
  "Time Series (Daily)"?: Record<
    string,
    {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    }
  >;
}

export function normalizeSymbol(raw: string | null): string {
  const symbol = (raw ?? "AAPL").trim().toUpperCase();
  if (!SYMBOL_PATTERN.test(symbol)) {
    throw new Error("Use a valid ticker containing letters, numbers, dots or hyphens.");
  }
  return symbol;
}

export function buildSnapshot(
  symbol: string,
  candles: Candle[],
  mode: "live" | "demo",
  message?: string,
): MarketSnapshot {
  if (candles.length < 3) {
    throw new Error("The data provider returned too few observations.");
  }

  const ordered = [...candles].sort((a, b) => a.date.localeCompare(b.date));
  const latest = ordered.at(-1)!;
  const previous = ordered.at(-2)!;
  const change = latest.close - previous.close;
  const changePercent = previous.close === 0 ? 0 : (change / previous.close) * 100;
  const trainingWindow = ordered.slice(-30).map((candle) => candle.close);

  return {
    symbol,
    currency: "USD",
    mode,
    source: mode === "live" ? "Alpha Vantage" : "Built-in deterministic demo series",
    generatedAt: new Date().toISOString(),
    message,
    latest: {
      date: latest.date,
      close: round(latest.close, 2),
      change: round(change, 2),
      changePercent: round(changePercent, 2),
      dayHigh: round(latest.high, 2),
      dayLow: round(latest.low, 2),
      volume: latest.volume,
    },
    forecast: linearTrendForecast(trainingWindow),
    candles: ordered.slice(-60),
  };
}

export async function getMarketSnapshot(
  symbol: string,
  forceDemo = false,
): Promise<MarketSnapshot> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY?.trim();
  if (forceDemo || !apiKey) {
    return buildSnapshot(
      symbol,
      createDemoCandles(symbol),
      "demo",
      apiKey ? "Demo mode was requested." : "Add ALPHA_VANTAGE_API_KEY for provider data.",
    );
  }

  try {
    const url = new URL(ALPHA_VANTAGE_URL);
    url.searchParams.set("function", "TIME_SERIES_DAILY");
    url.searchParams.set("symbol", symbol);
    url.searchParams.set("outputsize", "compact");
    url.searchParams.set("apikey", apiKey);

    const response = await fetch(url, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(10_000),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Provider returned HTTP ${response.status}.`);
    }

    const payload = (await response.json()) as AlphaVantagePayload;
    const providerMessage = payload.Note ?? payload.Information ?? payload["Error Message"];
    if (typeof providerMessage === "string") {
      throw new Error(providerMessage);
    }

    const series = payload["Time Series (Daily)"];
    if (!series) {
      throw new Error("No daily time series was returned for this symbol.");
    }

    const candles = parseAlphaVantageSeries(series);
    return buildSnapshot(symbol, candles, "live");
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown provider error.";
    return buildSnapshot(
      symbol,
      createDemoCandles(symbol),
      "demo",
      `Live data was unavailable, so demo data is shown. ${detail}`,
    );
  }
}

export function parseAlphaVantageSeries(
  series: NonNullable<AlphaVantagePayload["Time Series (Daily)"]>,
): Candle[] {
  const candles = Object.entries(series).map(([date, raw]) => ({
    date,
    open: Number(raw["1. open"]),
    high: Number(raw["2. high"]),
    low: Number(raw["3. low"]),
    close: Number(raw["4. close"]),
    volume: Number(raw["5. volume"]),
  }));

  const invalid = candles.find(
    (candle) =>
      !/^\d{4}-\d{2}-\d{2}$/.test(candle.date) ||
      ![candle.open, candle.high, candle.low, candle.close, candle.volume].every(Number.isFinite),
  );
  if (invalid) {
    throw new Error("The provider response contained malformed market data.");
  }
  return candles;
}
