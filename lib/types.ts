export type MarketMode = "live" | "demo";

export interface Candle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ForecastResult {
  nextClose: number;
  slope: number;
  rSquared: number;
  residualError: number;
  direction: "up" | "down" | "flat";
  pointsUsed: number;
}

export interface MarketSnapshot {
  symbol: string;
  currency: string;
  mode: MarketMode;
  source: string;
  generatedAt: string;
  message?: string;
  latest: {
    date: string;
    close: number;
    change: number;
    changePercent: number;
    dayHigh: number;
    dayLow: number;
    volume: number;
  };
  forecast: ForecastResult;
  candles: Candle[];
}
