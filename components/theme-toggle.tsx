"use client";
import { useTheme, type ThemeChoice } from "./theme-provider";
const OPTIONS:{value:ThemeChoice;label:string;icon:string}[]=[{value:"light",label:"Light",icon:"☀"},{value:"dark",label:"Dark",icon:"☾"},{value:"system",label:"System",icon:"◐"}];
export function ThemeToggle(){const {choice,update}=useTheme();return <div className="theme-control" role="group" aria-label="Colour theme">{OPTIONS.map(o=><button key={o.value} className={`theme-option ${choice===o.value?"active":""}`} onClick={()=>update(o.value)} aria-pressed={choice===o.value}><span aria-hidden>{o.icon}</span><span className="theme-label">{o.label}</span></button>)}</div>;}
