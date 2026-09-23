import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { requestPasswordReset } from "../actions";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const value = (input: string | string[] | undefined) => Array.isArray(input) ? input[0] : input;

export const dynamic = "force-dynamic";

export default async function ForgotPasswordPage({ searchParams }: Props) {
  const params = await searchParams;
  const error = value(params.error);

  return <section className="auth-card">
    <h1>Reset password</h1>
    <p>Enter your email and we will send a secure password-reset link.</p>
    {error && <div className="auth-message error">{error}</div>}
    <form className="auth-form" action={requestPasswordReset}>
      <div className="auth-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <button className="auth-submit" type="submit" disabled={!isSupabaseConfigured}>Send reset link</button>
    </form>
    <div className="auth-links"><Link href="/auth/sign-in">Back to sign in</Link></div>
  </section>;
}
