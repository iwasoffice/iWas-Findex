"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type ThemeChoice = "dark" | "light" | "system";

const KEY = "iwas-findex-theme";
const CHANGE_EVENT = "iwas-findex-theme-change";

function isThemeChoice(value: string | null): value is ThemeChoice {
  return value === "dark" || value === "light" || value === "system";
}

function getThemeSnapshot(): ThemeChoice {
  const stored = window.localStorage.getItem(KEY);
  return isThemeChoice(stored) ? stored : "dark";
}

function getServerThemeSnapshot(): ThemeChoice {
  return "dark";
}

function subscribeTheme(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function resolveTheme(choice: ThemeChoice): "dark" | "light" {
  if (choice !== "system") return choice;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const ThemeContext = createContext<{ choice: ThemeChoice; update: (value: ThemeChoice) => void }>({
  choice: "dark",
  update: () => undefined,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const choice = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      document.documentElement.dataset.theme = resolveTheme(choice);
    };
    apply();
    if (choice === "system") media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [choice]);

  const update = (next: ThemeChoice) => {
    window.localStorage.setItem(KEY, next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return <ThemeContext.Provider value={{ choice, update }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
