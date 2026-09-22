"use client";
import { useEffect, useState } from "react";
export type ThemeChoice="dark"|"light"|"system";
const KEY="iwas-findex-theme";
function resolve(choice:ThemeChoice){if(choice!=="system")return choice;return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
export function ThemeProvider({children}:{children:React.ReactNode}){
  const [choice,setChoice]=useState<ThemeChoice>("dark");
  useEffect(()=>{const stored=localStorage.getItem(KEY) as ThemeChoice|null;const initial=stored&&["dark","light","system"].includes(stored)?stored:"dark";setChoice(initial);document.documentElement.dataset.theme=resolve(initial);},[]);
  useEffect(()=>{const media=window.matchMedia("(prefers-color-scheme: dark)");const handler=()=>{if(choice==="system")document.documentElement.dataset.theme=resolve("system");};media.addEventListener("change",handler);return()=>media.removeEventListener("change",handler);},[choice]);
  const update=(next:ThemeChoice)=>{setChoice(next);localStorage.setItem(KEY,next);document.documentElement.dataset.theme=resolve(next);};
  return <div data-theme-choice={choice}><ThemeContext.Provider value={{choice,update}}>{children}</ThemeContext.Provider></div>;
}
import { createContext, useContext } from "react";
const ThemeContext=createContext<{choice:ThemeChoice;update:(v:ThemeChoice)=>void}>({choice:"dark",update:()=>{}});
export const useTheme=()=>useContext(ThemeContext);
