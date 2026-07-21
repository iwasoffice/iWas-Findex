"use client";

import type { Candle } from "@/lib/types";

interface LineChartProps {
  candles: Candle[];
  forecast?: number;
}

const WIDTH = 900;
const HEIGHT = 310;
const PADDING_X = 32;
const PADDING_Y = 28;

export function LineChart({ candles, forecast }: LineChartProps) {
  if (candles.length < 2) {
    return <div className="chart-empty">Not enough observations to draw a chart.</div>;
  }

  const plotted = candles.slice(-45);
  const values = plotted.map((candle) => candle.close);
  const forecastValue = forecast ?? values.at(-1)!;
  const min = Math.min(...values, forecastValue);
  const max = Math.max(...values, forecastValue);
  const range = Math.max(0.01, max - min);
  const chartWidth = WIDTH - PADDING_X * 2;
  const chartHeight = HEIGHT - PADDING_Y * 2;

  const point = (value: number, index: number, length = plotted.length) => {
    const x = PADDING_X + (index / Math.max(1, length - 1)) * chartWidth;
    const y = PADDING_Y + ((max - value) / range) * chartHeight;
    return { x, y };
  };

  const points = values.map((value, index) => point(value, index));
  const path = points.map(({ x, y }, index) => `${index === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area = `${path} L${points.at(-1)!.x},${HEIGHT - PADDING_Y} L${points[0].x},${HEIGHT - PADDING_Y} Z`;
  const last = points.at(-1)!;
  const projected = { x: WIDTH - 4, y: point(forecastValue, plotted.length).y };

  return (
    <div className="chart-wrap" role="img" aria-label="Closing price chart with one-step trend projection">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" className="chart-svg">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
          const y = PADDING_Y + chartHeight * fraction;
          return <line key={fraction} x1={PADDING_X} y1={y} x2={WIDTH - PADDING_X} y2={y} className="chart-grid" />;
        })}
        <path d={area} fill="url(#areaGradient)" className="chart-area" />
        <path d={path} className="chart-line" />
        <line x1={last.x} y1={last.y} x2={projected.x} y2={projected.y} className="chart-projection" />
        <circle cx={last.x} cy={last.y} r="5" className="chart-dot" />
        <circle cx={projected.x} cy={projected.y} r="5" className="chart-forecast-dot" />
      </svg>
      <div className="chart-axis">
        <span>{formatDate(plotted[0].date)}</span>
        <span>{formatDate(plotted.at(-1)!.date)}</span>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
    new Date(`${value}T00:00:00Z`),
  );
}
