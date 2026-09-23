"use client";

import { useEffect, useState } from "react";
import { tryCreateClient } from "@/lib/supabase/client";
import { useTheme, type ThemeChoice } from "./theme-provider";

const validTheme = (value: unknown): value is ThemeChoice =>
  value === "dark" || value === "light" || value === "system";

export function UserPreferenceSync() {
  const { choice, update } = useTheme();
  const [userId, setUserId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const supabase = tryCreateClient();
    if (!supabase) return;
    let active = true;

    const load = async () => {
      setHydrated(false);
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      setUserId(user?.id ?? null);
      if (!user) {
        setHydrated(true);
        return;
      }

      const { data } = await supabase.from("profiles").select("theme").eq("id", user.id).maybeSingle();
      if (!active) return;
      if (validTheme(data?.theme)) update(data.theme);
      setHydrated(true);
    };

    void load();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      void load();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [update]);

  useEffect(() => {
    if (!hydrated || !userId) return;
    const supabase = tryCreateClient();
    if (!supabase) return;
    void supabase.from("profiles").upsert({
      id: userId,
      theme: choice,
      updated_at: new Date().toISOString(),
    });
  }, [choice, hydrated, userId]);

  return null;
}
