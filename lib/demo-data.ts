import type { Candle } from "./types.ts";
import { round } from "./forecast.ts";
function hashSymbol(symbol:string){return [...symbol].reduce((h,c)=>(h*31+c.charCodeAt(0))>>>0,2166136261);}
function seededNoise(seed:number,index:number){const x=Math.sin(seed*0.0001+index*12.9898)*43758.5453;return (x-Math.floor(x))*2-1;}
export function createDemoCandles(symbol:string,count=90):Candle[]{
  const seed=hashSymbol(symbol),base=45+(seed%240),trend=((seed%17)-7)/120,vol=.8+(seed%9)/5,candles:Candle[]=[];
  const cursor=new Date(); cursor.setUTCHours(0,0,0,0); const dates:Date[]=[];
  while(dates.length<count){const day=cursor.getUTCDay(); if(day!==0&&day!==6) dates.push(new Date(cursor)); cursor.setUTCDate(cursor.getUTCDate()-1);} dates.reverse();
  let prev=base;
  dates.forEach((date,index)=>{const cycle=Math.sin(index/6+(seed%11))*vol,noise=seededNoise(seed,index)*vol,open=Math.max(1,prev+noise*.35),close=Math.max(1,open+trend+cycle*.18+noise*.42),spread=Math.abs(noise)*.45+vol*.3,high=Math.max(open,close)+spread,low=Math.max(.01,Math.min(open,close)-spread),volume=Math.round(800_000+(seed%4_000_000)+Math.abs(noise)*1_200_000);candles.push({date:date.toISOString().slice(0,10),open:round(open,4),high:round(high,4),low:round(low,4),close:round(close,4),volume});prev=close;});
  return candles;
}
