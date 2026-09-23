"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { tryCreateClient } from "@/lib/supabase/client";

export function AuthNav() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = tryCreateClient();
    if (!supabase) return;

    let active = true;
    const read = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (active) setEmail(user?.email ?? null);
    };
    void read();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setEmail(session?.user.email ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return email
    ? <Link className="auth-link account" href="/account" title={email}>Account</Link>
    : <Link className="auth-link" href="/auth/sign-in">Sign in</Link>;
}
