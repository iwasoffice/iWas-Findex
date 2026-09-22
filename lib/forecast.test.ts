import assert from "node:assert/strict"; import test from "node:test"; import { linearTrendForecast } from "./forecast.ts";
test("linear forecast extrapolates a sequence",()=>{const r=linearTrendForecast([10,12,14,16,18]);assert.equal(r.nextClose,20);assert.equal(r.slope,2);assert.equal(r.rSquared,1);assert.equal(r.direction,"up");});
test("rejects insufficient data",()=>assert.throws(()=>linearTrendForecast([1,2]),/At least three/));
