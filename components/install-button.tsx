"use client";
import { useEffect, useState } from "react";
type PromptEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:"accepted"|"dismissed"}>};
export function InstallButton(){const [prompt,setPrompt]=useState<PromptEvent|null>(null);const [installed,setInstalled]=useState(false);
useEffect(()=>{const before=(e:Event)=>{e.preventDefault();setPrompt(e as PromptEvent)};const done=()=>{setInstalled(true);setPrompt(null)};window.addEventListener("beforeinstallprompt",before);window.addEventListener("appinstalled",done);if(window.matchMedia("(display-mode: standalone)").matches)setInstalled(true);return()=>{window.removeEventListener("beforeinstallprompt",before);window.removeEventListener("appinstalled",done)};},[]);
if(installed)return <span className="installed-badge">Installed</span>;return <button className="install-btn" disabled={!prompt} title={prompt?"Install iWas Findex":"Install becomes available when your browser supports it"} onClick={async()=>{if(!prompt)return;await prompt.prompt();const result=await prompt.userChoice;if(result.outcome==="accepted")setPrompt(null);}}>Install app</button>}
