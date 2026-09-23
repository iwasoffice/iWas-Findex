import { updatePassword } from "../actions";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const value = (input: string | string[] | undefined) => Array.isArray(input) ? input[0] : input;

export const dynamic = "force-dynamic";

export default async function UpdatePasswordPage({ searchParams }: Props) {
  const params = await searchParams;
  const error = value(params.error);

  return <section className="auth-card">
    <h1>Choose a new password</h1>
    <p>Use at least eight characters.</p>
    {error && <div className="auth-message error">{error}</div>}
    <form className="auth-form" action={updatePassword}>
      <div className="auth-field"><label htmlFor="password">New password</label><input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required /></div>
      <div className="auth-field"><label htmlFor="confirmPassword">Confirm password</label><input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required /></div>
      <button className="auth-submit" type="submit">Update password</button>
    </form>
  </section>;
}
