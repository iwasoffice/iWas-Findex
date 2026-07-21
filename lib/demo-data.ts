import type { Candle } from "./types";
import { round } from "./forecast";

function hashSymbol(symbol: string): number {
  return [...symbol].reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) >>> 0;
  }, 2166136261);
}

function seededNoise(seed: number, index: number): number {
  const x = Math.sin(seed * 0.0001 + index * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

export function createDemoCandles(symbol: string, count = 90): Candle[] {
  const seed = hashSymbol(symbol);
  const base = 45 + (seed % 240);
  const dailyTrend = ((seed % 17) - 7) / 120;
  const volatility = 0.8 + (seed % 9) / 5;
  const candles: Candle[] = [];

  const cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);

  const dates: Date[] = [];
  while (dates.length < count) {
    const day = cursor.getUTCDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(cursor));
    }
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  dates.reverse();

  let previousClose = base;
  dates.forEach((date, index) => {
    const cycle = Math.sin(index / 6 + (seed % 11)) * volatility;
    const noise = seededNoise(seed, index) * volatility;
    const open = Math.max(1, previousClose + noise * 0.35);
    const close = Math.max(1, open + dailyTrend + cycle * 0.18 + noise * 0.42);
    const spread = Math.abs(noise) * 0.45 + volatility * 0.3;
    const high = Math.max(open, close) + spread;
    const low = Math.max(0.01, Math.min(open, close) - spread);
    const volume = Math.round(800_000 + (seed % 4_000_000) + Math.abs(noise) * 1_200_000);

    candles.push({
      date: date.toISOString().slice(0, 10),
      open: round(open, 4),
      high: round(high, 4),
      low: round(low, 4),
      close: round(close, 4),
      volume,
    });
    previousClose = close;
  });

  return candles;
}
