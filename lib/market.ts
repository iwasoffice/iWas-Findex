import { createDemoCandles } from "./demo-data.ts";
import { linearTrendForecast, round } from "./forecast.ts";
import type { Candle, MarketSnapshot } from "./types.ts";
const URL="https://www.alphavantage.co/query"; const SYMBOL=/^[A-Z0-9][A-Z0-9.\-]{0,14}$/;
interface AV { [key:string]:unknown; "Time Series (Daily)"?:Record<string,{"1. open":string;"2. high":string;"3. low":string;"4. close":string;"5. volume":string}>; }
export function normalizeSymbol(raw:string|null){const s=(raw??"AAPL").trim().toUpperCase();if(!SYMBOL.test(s))throw new Error("Use a valid ticker containing letters, numbers, dots or hyphens.");return s;}
export function parseAlphaVantageSeries(series:NonNullable<AV["Time Series (Daily)"]>):Candle[]{
  const candles=Object.entries(series).map(([date,r])=>({date,open:Number(r["1. open"]),high:Number(r["2. high"]),low:Number(r["3. low"]),close:Number(r["4. close"]),volume:Number(r["5. volume"])}));
  if(candles.some(c=>!/^\d{4}-\d{2}-\d{2}$/.test(c.date)||![c.open,c.high,c.low,c.close,c.volume].every(Number.isFinite))) throw new Error("The provider response contained malformed market data."); return candles;
}
export function buildSnapshot(symbol:string,candles:Candle[],mode:"live"|"demo",message?:string):MarketSnapshot{
  if(candles.length<3)throw new Error("The data provider returned too few observations."); const ordered=[...candles].sort((a,b)=>a.date.localeCompare(b.date)),latest=ordered.at(-1)!,prev=ordered.at(-2)!,change=latest.close-prev.close,changePercent=prev.close===0?0:change/prev.close*100;
  return {symbol,currency:"USD",mode,source:mode==="live"?"Alpha Vantage":"Built-in deterministic demo series",generatedAt:new Date().toISOString(),message,latest:{date:latest.date,close:round(latest.close,2),change:round(change,2),changePercent:round(changePercent,2),dayHigh:round(latest.high,2),dayLow:round(latest.low,2),volume:latest.volume},forecast:linearTrendForecast(ordered.slice(-30).map(c=>c.close)),candles:ordered.slice(-60)};
}
export async function getMarketSnapshot(symbol:string,forceDemo=false):Promise<MarketSnapshot>{
  const key=process.env.ALPHA_VANTAGE_API_KEY?.trim(); if(forceDemo||!key)return buildSnapshot(symbol,createDemoCandles(symbol),"demo",key?"Demo mode was requested.":"Add ALPHA_VANTAGE_API_KEY for provider data.");
  try{const u=new globalThis.URL(URL);u.searchParams.set("function","TIME_SERIES_DAILY");u.searchParams.set("symbol",symbol);u.searchParams.set("outputsize","compact");u.searchParams.set("apikey",key);const response=await fetch(u,{next:{revalidate:300},signal:AbortSignal.timeout(10_000),headers:{Accept:"application/json"}});if(!response.ok)throw new Error(`Provider returned HTTP ${response.status}.`);const payload=await response.json() as AV;const msg=payload.Note??payload.Information??payload["Error Message"];if(typeof msg==="string")throw new Error(msg);const series=payload["Time Series (Daily)"];if(!series)throw new Error("No daily time series was returned for this symbol.");return buildSnapshot(symbol,parseAlphaVantageSeries(series),"live");}
  catch{return buildSnapshot(symbol,createDemoCandles(symbol),"demo","Live provider data is temporarily unavailable or the provider quota has been reached, so demo data is shown.");}
}
