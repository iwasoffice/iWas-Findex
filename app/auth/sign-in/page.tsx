import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { signIn, signInWithGoogle } from "../actions";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const value = (input: string | string[] | undefined) => Array.isArray(input) ? input[0] : input;

export const dynamic = "force-dynamic";

export default async function SignInPage({ searchParams }: Props) {
  const params = await searchParams;
  const error = value(params.error);
  const message = value(params.message);
  const next = value(params.next) ?? "/account";

  return <section className="auth-card">
    <h1>Sign in</h1>
    <p>Access your cloud-synced watchlist and preferences from any device.</p>
    {!isSupabaseConfigured && <div className="auth-message warning">Account service is awaiting configuration.</div>}
    {error && <div className="auth-message error">{error}</div>}
    {message && <div className="auth-message">{message}</div>}

    <form className="auth-form" action={signIn}>
      <input type="hidden" name="next" value={next} />
      <div className="auth-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="auth-field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required /></div>
      <button className="auth-submit" type="submit" disabled={!isSupabaseConfigured}>Sign in</button>
    </form>

    <div className="auth-divider">or</div>
    <form action={signInWithGoogle}>
      <button className="auth-google" type="submit" disabled={!isSupabaseConfigured} style={{width:"100%"}}>Continue with Google</button>
    </form>

    <div className="auth-links"><Link href="/auth/sign-up">Create account</Link><Link href="/auth/forgot-password">Forgot password?</Link></div>
  </section>;
}
