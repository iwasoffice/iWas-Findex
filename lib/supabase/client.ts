import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabasePublishableKey, supabaseUrl } from "./config";

let browserClient: SupabaseClient | null = null;

export function createClient() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }
  browserClient ??= createBrowserClient(supabaseUrl, supabasePublishableKey);
  return browserClient;
}

export function tryCreateClient() {
  return isSupabaseConfigured ? createClient() : null;
}
