import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

const safeNext = (value: string | null) =>
  value?.startsWith("/") && !value.startsWith("//") ? value : "/account";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const next = safeNext(url.searchParams.get("next"));

  if (!isSupabaseConfigured || !tokenHash || !type) {
    return NextResponse.redirect(new URL("/auth/sign-in?error=Confirmation%20link%20is%20invalid.", url.origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
  if (error) {
    return NextResponse.redirect(new URL(`/auth/sign-in?error=${encodeURIComponent(error.message)}`, url.origin));
  }
  return NextResponse.redirect(new URL(next, url.origin));
}
