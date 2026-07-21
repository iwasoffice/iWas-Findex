import assert from "node:assert/strict";
import test from "node:test";
import { linearTrendForecast } from "./forecast.ts";

test("linearTrendForecast extrapolates a linear sequence", () => {
  const result = linearTrendForecast([10, 12, 14, 16, 18]);
  assert.equal(result.nextClose, 20);
  assert.equal(result.slope, 2);
  assert.equal(result.rSquared, 1);
  assert.equal(result.direction, "up");
});

test("linearTrendForecast rejects insufficient data", () => {
  assert.throws(() => linearTrendForecast([1, 2]), /At least three/);
});
