import type { ForecastResult } from "./types";

const EPSILON = 1e-9;

export function linearTrendForecast(values: number[]): ForecastResult {
  const clean = values.filter(Number.isFinite);
  if (clean.length < 3) {
    throw new Error("At least three valid prices are required for forecasting.");
  }

  const n = clean.length;
  const meanX = (n - 1) / 2;
  const meanY = clean.reduce((sum, value) => sum + value, 0) / n;

  let numerator = 0;
  let denominator = 0;
  for (let index = 0; index < n; index += 1) {
    numerator += (index - meanX) * (clean[index] - meanY);
    denominator += (index - meanX) ** 2;
  }

  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = meanY - slope * meanX;
  const fitted = clean.map((_, index) => intercept + slope * index);
  const nextClose = Math.max(0, intercept + slope * n);

  const totalSquares = clean.reduce(
    (sum, value) => sum + (value - meanY) ** 2,
    0,
  );
  const residualSquares = clean.reduce(
    (sum, value, index) => sum + (value - fitted[index]) ** 2,
    0,
  );
  const rSquared =
    totalSquares <= EPSILON ? 1 : Math.max(0, Math.min(1, 1 - residualSquares / totalSquares));
  const residualError = Math.sqrt(residualSquares / Math.max(1, n - 2));
  const projectedMove = nextClose - clean.at(-1)!;
  const relativeMove = Math.abs(projectedMove) / Math.max(EPSILON, Math.abs(clean.at(-1)!));
  const direction = relativeMove < 0.0001 ? "flat" : projectedMove > 0 ? "up" : "down";

  return {
    nextClose: round(nextClose, 4),
    slope: round(slope, 6),
    rSquared: round(rSquared, 4),
    residualError: round(residualError, 4),
    direction,
    pointsUsed: n,
  };
}

export function round(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
