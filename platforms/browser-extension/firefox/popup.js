const api=globalThis.browser||globalThis.chrome;const DEFAULT_URL="https://iwas-findex.vercel.app";
function clean(v){return String(v||"").trim().toUpperCase().replace(/[^A-Z0-9.-]/g,"").slice(0,15)||"AAPL"}
document.getElementById("form").addEventListener("submit",async e=>{e.preventDefault();const symbol=clean(document.getElementById("symbol").value);const data=await api.storage.local.get(["appUrl"]);const base=(data.appUrl||DEFAULT_URL).replace(/\/$/,"");await api.tabs.create({url:`${base}/?symbol=${encodeURIComponent(symbol)}`});});
document.getElementById("settings").addEventListener("click",e=>{e.preventDefault();api.runtime.openOptionsPage();});
