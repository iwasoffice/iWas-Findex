import type { ForecastResult } from "./types.ts";
const EPS=1e-9;
export function round(value:number,digits=2){const f=10**digits;return Math.round((value+Number.EPSILON)*f)/f;}
export function linearTrendForecast(values:number[]):ForecastResult{
  const clean=values.filter(Number.isFinite); if(clean.length<3) throw new Error("At least three valid prices are required for forecasting.");
  const n=clean.length, meanX=(n-1)/2, meanY=clean.reduce((a,b)=>a+b,0)/n;
  let num=0,den=0; clean.forEach((v,i)=>{num+=(i-meanX)*(v-meanY);den+=(i-meanX)**2;});
  const slope=den===0?0:num/den, intercept=meanY-slope*meanX, fitted=clean.map((_,i)=>intercept+slope*i), nextClose=Math.max(0,intercept+slope*n);
  const tss=clean.reduce((s,v)=>s+(v-meanY)**2,0), rss=clean.reduce((s,v,i)=>s+(v-fitted[i])**2,0), rSquared=tss<=EPS?1:Math.max(0,Math.min(1,1-rss/tss));
  const residualError=Math.sqrt(rss/Math.max(1,n-2));
  const returns=clean.slice(1).map((v,i)=>(v-clean[i])/Math.max(EPS,clean[i])*100); const rm=returns.reduce((a,b)=>a+b,0)/Math.max(1,returns.length);
  const volatility=Math.sqrt(returns.reduce((s,v)=>s+(v-rm)**2,0)/Math.max(1,returns.length-1));
  const relativeSlope=Math.abs(slope)/Math.max(EPS,Math.abs(meanY)); const direction=relativeSlope<0.0001?"flat":slope>0?"up":"down";
  return {nextClose:round(nextClose,4),slope:round(slope,6),rSquared:round(rSquared,4),residualError:round(residualError,4),direction,pointsUsed:n,volatility:round(volatility,2)};
}
