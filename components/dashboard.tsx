"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { LineChart } from "./line-chart";
import type { MarketSnapshot } from "@/lib/types";

const WATCHLIST = ["AAPL", "MSFT", "NVDA", "SPY", "QQQ", "INDA", "EZA", "EWZ"];

export function Dashboard() {
  const [symbol, setSymbol] = useState("AAPL");
  const [query, setQuery] = useState("AAPL");
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (nextSymbol: string) => {
    setLoading(true);
    setError(null);
    try {
      const body = await requestSnapshot(nextSymbol);
      setSnapshot(body);
      setSymbol(body.symbol);
      setQuery(body.symbol);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load market data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    void requestSnapshot("AAPL")
      .then((body) => {
        if (cancelled) return;
        setSnapshot(body);
        setSymbol(body.symbol);
        setQuery(body.symbol);
      })
      .catch((caught: unknown) => {
        if (!cancelled) {
          setError(caught instanceof Error ? caught.message : "Unable to load market data.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void load(query.trim().toUpperCase());
  };

  const recentRows = useMemo(() => snapshot?.candles.slice(-8).reverse() ?? [], [snapshot]);
  const changeClass = snapshot && snapshot.latest.change >= 0 ? "positive" : "negative";
  const forecastDelta = snapshot ? snapshot.forecast.nextClose - snapshot.latest.close : 0;
  const forecastPercent = snapshot && snapshot.latest.close
    ? (forecastDelta / snapshot.latest.close) * 100
    : 0;

  return (
    <main>
      <section className="hero shell">
        <nav className="topbar">
          <a className="brand" href="#top" aria-label="iWas Findex home">
            <span className="brand-mark">IF</span>
            <span><strong>iWas</strong> Findex</span>
          </a>
          <div className="nav-meta">
            <span className="status-dot" />
            Market intelligence dashboard
          </div>
        </nav>

        <div className="hero-grid" id="top">
          <div>
            <p className="eyebrow">Transparent market analytics</p>
            <h1>Read the market signal, not the noise.</h1>
            <p className="hero-copy">
              Explore recent price action, daily market statistics and a clearly labelled linear trend projection from one deployable dashboard.
            </p>
          </div>
          <div className="hero-panel">
            <span className="hero-panel-label">Current instrument</span>
            <strong>{snapshot?.symbol ?? symbol}</strong>
            <span>{snapshot?.mode === "live" ? "Provider data" : "Safe demo data"}</span>
          </div>
        </div>
      </section>

      <section className="dashboard shell">
        <div className="toolbar card">
          <form onSubmit={submit} className="symbol-form">
            <label htmlFor="symbol">Ticker</label>
            <div className="input-row">
              <input
                id="symbol"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                maxLength={15}
                placeholder="AAPL"
                autoComplete="off"
                aria-describedby="symbol-help"
              />
              <button type="submit" disabled={loading || !query.trim()}>
                {loading ? "Loading" : "Analyse"}
              </button>
            </div>
            <small id="symbol-help">US-listed equity or ETF ticker</small>
          </form>
          <div className="watchlist" aria-label="Popular symbols">
            {WATCHLIST.map((item) => (
              <button
                key={item}
                className={item === symbol ? "watch active" : "watch"}
                onClick={() => void load(item)}
                disabled={loading}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error-banner" role="alert">{error}</div>}
        {snapshot?.message && <div className="info-banner">{snapshot.message}</div>}

        <div className="metrics-grid">
          <MetricCard label="Latest close" value={snapshot ? money(snapshot.latest.close) : "--"} sub={snapshot?.latest.date ?? "Awaiting data"} />
          <MetricCard
            label="Daily movement"
            value={snapshot ? `${signed(snapshot.latest.change)} (${signed(snapshot.latest.changePercent)}%)` : "--"}
            sub="Versus prior trading day"
            valueClass={snapshot ? changeClass : ""}
          />
          <MetricCard label="Session range" value={snapshot ? `${money(snapshot.latest.dayLow)} - ${money(snapshot.latest.dayHigh)}` : "--"} sub="Daily low to high" />
          <MetricCard label="Volume" value={snapshot ? compact(snapshot.latest.volume) : "--"} sub="Latest reported session" />
        </div>

        <div className="analysis-grid">
          <article className="card chart-card">
            <div className="card-heading">
              <div>
                <p className="section-label">Price history</p>
                <h2>{snapshot?.symbol ?? symbol} closing trend</h2>
              </div>
              <span className={`mode-badge ${snapshot?.mode ?? "demo"}`}>
                {snapshot?.mode === "live" ? "Live provider" : "Demo series"}
              </span>
            </div>
            {snapshot ? (
              <LineChart candles={snapshot.candles} forecast={snapshot.forecast.nextClose} />
            ) : (
              <div className="chart-skeleton" />
            )}
            <div className="chart-legend">
              <span><i className="legend-line" /> Historical close</span>
              <span><i className="legend-dash" /> One-step projection</span>
            </div>
          </article>

          <aside className="card forecast-card">
            <p className="section-label">Baseline model</p>
            <h2>Next-close projection</h2>
            <div className="forecast-number">{snapshot ? money(snapshot.forecast.nextClose) : "--"}</div>
            <div className={forecastDelta >= 0 ? "forecast-change positive" : "forecast-change negative"}>
              {snapshot ? `${signed(forecastDelta)} (${signed(forecastPercent)}%)` : "Awaiting data"}
            </div>
            <dl className="model-stats">
              <div><dt>Direction</dt><dd>{snapshot?.forecast.direction ?? "--"}</dd></div>
              <div><dt>Model fit, R²</dt><dd>{snapshot ? snapshot.forecast.rSquared.toFixed(3) : "--"}</dd></div>
              <div><dt>Residual error</dt><dd>{snapshot ? money(snapshot.forecast.residualError) : "--"}</dd></div>
              <div><dt>Training points</dt><dd>{snapshot?.forecast.pointsUsed ?? "--"}</dd></div>
            </dl>
            <p className="model-note">
              This is a simple linear trend extrapolation, not a guarantee or trading recommendation.
            </p>
          </aside>
        </div>

        <article className="card table-card">
          <div className="card-heading">
            <div>
              <p className="section-label">Recent sessions</p>
              <h2>Daily OHLCV data</h2>
            </div>
            <button className="refresh" onClick={() => void load(symbol)} disabled={loading}>Refresh</button>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th></tr>
              </thead>
              <tbody>
                {recentRows.map((row) => (
                  <tr key={row.date}>
                    <td>{row.date}</td><td>{money(row.open)}</td><td>{money(row.high)}</td><td>{money(row.low)}</td><td>{money(row.close)}</td><td>{compact(row.volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <footer className="shell footer">
        <span>iWas Findex</span>
        <span>For research and demonstration only. Not financial advice.</span>
      </footer>
    </main>
  );
}

function MetricCard({ label, value, sub, valueClass = "" }: { label: string; value: string; sub: string; valueClass?: string }) {
  return (
    <article className="card metric-card">
      <p>{label}</p>
      <strong className={valueClass}>{value}</strong>
      <span>{sub}</span>
    </article>
  );
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
}

function compact(value: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function signed(value: number) {
  const formatted = Math.abs(value).toFixed(2);
  return value > 0 ? `+${formatted}` : value < 0 ? `-${formatted}` : formatted;
}

async function requestSnapshot(symbol: string): Promise<MarketSnapshot> {
  const response = await fetch(`/api/market?symbol=${encodeURIComponent(symbol)}`);
  const body = (await response.json()) as MarketSnapshot | { error: string };
  if (!response.ok || "error" in body) {
    throw new Error("error" in body ? body.error : "Request failed.");
  }
  return body;
}
