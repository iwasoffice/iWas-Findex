import assert from "node:assert/strict";
import test from "node:test";
import { buildSnapshot, normalizeSymbol, parseAlphaVantageSeries } from "./market.ts";

test("normalizeSymbol validates and uppercases symbols", () => {
  assert.equal(normalizeSymbol(" msft "), "MSFT");
  assert.throws(() => normalizeSymbol("bad symbol"), /valid ticker/);
});

test("parseAlphaVantageSeries converts provider fields", () => {
  const candles = parseAlphaVantageSeries({
    "2026-07-17": {
      "1. open": "100",
      "2. high": "105",
      "3. low": "99",
      "4. close": "104",
      "5. volume": "1200",
    },
  });
  assert.deepEqual(candles[0], {
    date: "2026-07-17",
    open: 100,
    high: 105,
    low: 99,
    close: 104,
    volume: 1200,
  });
});

test("buildSnapshot calculates daily change and forecast", () => {
  const snapshot = buildSnapshot(
    "TEST",
    [
      { date: "2026-07-15", open: 9, high: 10, low: 8, close: 9, volume: 100 },
      { date: "2026-07-16", open: 10, high: 11, low: 9, close: 10, volume: 110 },
      { date: "2026-07-17", open: 11, high: 12, low: 10, close: 11, volume: 120 },
    ],
    "demo",
  );
  assert.equal(snapshot.latest.change, 1);
  assert.equal(snapshot.latest.changePercent, 10);
  assert.equal(snapshot.forecast.nextClose, 12);
});
