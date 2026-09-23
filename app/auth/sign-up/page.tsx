import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { signUp } from "../actions";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const value = (input: string | string[] | undefined) => Array.isArray(input) ? input[0] : input;

export const dynamic = "force-dynamic";

export default async function SignUpPage({ searchParams }: Props) {
  const params = await searchParams;
  const error = value(params.error);

  return <section className="auth-card">
    <h1>Create account</h1>
    <p>Create one account for iWas Findex on web, installed PWA and supported browsers.</p>
    {!isSupabaseConfigured && <div className="auth-message warning">Account service is awaiting configuration.</div>}
    {error && <div className="auth-message error">{error}</div>}

    <form className="auth-form" action={signUp}>
      <div className="auth-field"><label htmlFor="displayName">Display name</label><input id="displayName" name="displayName" autoComplete="name" maxLength={80} /></div>
      <div className="auth-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="auth-field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required /></div>
      <div className="auth-field"><label htmlFor="confirmPassword">Confirm password</label><input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required /></div>
      <button className="auth-submit" type="submit" disabled={!isSupabaseConfigured}>Create account</button>
    </form>
    <div className="auth-links"><span>Already registered?</span><Link href="/auth/sign-in">Sign in</Link></div>
  </section>;
}
