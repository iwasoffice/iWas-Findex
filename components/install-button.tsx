"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type PromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function subscribeStandalone(callback: () => void) {
  const media = window.matchMedia("(display-mode: standalone)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getStandaloneSnapshot() {
  return window.matchMedia("(display-mode: standalone)").matches;
}

export function InstallButton() {
  const standalone = useSyncExternalStore(subscribeStandalone, getStandaloneSnapshot, () => false);
  const [prompt, setPrompt] = useState<PromptEvent | null>(null);
  const [installedByEvent, setInstalledByEvent] = useState(false);

  useEffect(() => {
    const beforeInstall = (event: Event) => {
      event.preventDefault();
      setPrompt(event as PromptEvent);
    };
    const installed = () => {
      setInstalledByEvent(true);
      setPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", beforeInstall);
    window.addEventListener("appinstalled", installed);
    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstall);
      window.removeEventListener("appinstalled", installed);
    };
  }, []);

  if (standalone || installedByEvent) return <span className="installed-badge">Installed</span>;

  return (
    <button
      className="install-btn"
      disabled={!prompt}
      title={prompt ? "Install iWas Findex" : "Install becomes available when your browser supports it"}
      onClick={async () => {
        if (!prompt) return;
        await prompt.prompt();
        const result = await prompt.userChoice;
        if (result.outcome === "accepted") setPrompt(null);
      }}
    >
      Install app
    </button>
  );
}
