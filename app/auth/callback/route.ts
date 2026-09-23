import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

const safeNext = (value: string | null) =>
  value?.startsWith("/") && !value.startsWith("//") ? value : "/account";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = safeNext(url.searchParams.get("next"));

  if (!isSupabaseConfigured || !code) {
    return NextResponse.redirect(new URL("/auth/sign-in?error=Authentication%20link%20is%20invalid.", url.origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL(`/auth/sign-in?error=${encodeURIComponent(error.message)}`, url.origin));
  }
  return NextResponse.redirect(new URL(next, url.origin));
}
