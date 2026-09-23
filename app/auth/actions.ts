"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const text = (value: FormDataEntryValue | null) => String(value ?? "").trim();
const safeNext = (value: FormDataEntryValue | null, fallback = "/account") => {
  const next = text(value);
  return next.startsWith("/") && !next.startsWith("//") ? next : fallback;
};
const target = (path: string, key: "error" | "message", value: string) =>
  `${path}?${key}=${encodeURIComponent(value)}`;

async function origin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const protocol = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

function requireConfig(path: string) {
  if (!isSupabaseConfigured) {
    redirect(target(path, "error", "Account service is not configured yet."));
  }
}

export async function signIn(formData: FormData) {
  requireConfig("/auth/sign-in");
  const email = text(formData.get("email")).toLowerCase();
  const password = text(formData.get("password"));
  const next = safeNext(formData.get("next"));

  if (!email || !password) {
    redirect(target("/auth/sign-in", "error", "Enter your email and password."));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(target("/auth/sign-in", "error", error.message));
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signUp(formData: FormData) {
  requireConfig("/auth/sign-up");
  const displayName = text(formData.get("displayName")).slice(0, 80);
  const email = text(formData.get("email")).toLowerCase();
  const password = text(formData.get("password"));
  const confirmPassword = text(formData.get("confirmPassword"));

  if (!email || !password) {
    redirect(target("/auth/sign-up", "error", "Email and password are required."));
  }
  if (password.length < 8) {
    redirect(target("/auth/sign-up", "error", "Use a password with at least 8 characters."));
  }
  if (password !== confirmPassword) {
    redirect(target("/auth/sign-up", "error", "The passwords do not match."));
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
      emailRedirectTo: `${await origin()}/auth/callback?next=/account`,
    },
  });

  if (error) {
    redirect(target("/auth/sign-up", "error", error.message));
  }

  revalidatePath("/", "layout");
  if (data.session) redirect("/account");
  redirect(target("/auth/sign-in", "message", "Check your email to confirm your account, then sign in."));
}

export async function signInWithGoogle() {
  requireConfig("/auth/sign-in");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${await origin()}/auth/callback?next=/account` },
  });

  if (error || !data.url) {
    redirect(target("/auth/sign-in", "error", error?.message ?? "Google sign-in could not start."));
  }
  redirect(data.url);
}

export async function requestPasswordReset(formData: FormData) {
  requireConfig("/auth/forgot-password");
  const email = text(formData.get("email")).toLowerCase();
  if (!email) redirect(target("/auth/forgot-password", "error", "Enter your email address."));

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await origin()}/auth/callback?next=/auth/update-password`,
  });
  if (error) redirect(target("/auth/forgot-password", "error", error.message));

  redirect(target("/auth/sign-in", "message", "Password reset instructions have been sent if that account exists."));
}

export async function updatePassword(formData: FormData) {
  requireConfig("/auth/update-password");
  const password = text(formData.get("password"));
  const confirmPassword = text(formData.get("confirmPassword"));
  if (password.length < 8) {
    redirect(target("/auth/update-password", "error", "Use a password with at least 8 characters."));
  }
  if (password !== confirmPassword) {
    redirect(target("/auth/update-password", "error", "The passwords do not match."));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect(target("/auth/update-password", "error", error.message));

  revalidatePath("/", "layout");
  redirect(target("/account", "message", "Password updated."));
}

export async function updateProfile(formData: FormData) {
  requireConfig("/account");
  const displayName = text(formData.get("displayName")).slice(0, 80);
  const themeRaw = text(formData.get("theme"));
  const theme = ["dark", "light", "system"].includes(themeRaw) ? themeRaw : "dark";

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    display_name: displayName,
    theme,
    updated_at: new Date().toISOString(),
  });

  if (error) redirect(target("/account", "error", error.message));
  revalidatePath("/account");
  redirect(target("/account", "message", "Profile saved."));
}

export async function signOut() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/");
}
