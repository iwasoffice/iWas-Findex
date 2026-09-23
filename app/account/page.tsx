import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { signOut, updateProfile } from "@/app/auth/actions";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const value = (input: string | string[] | undefined) => Array.isArray(input) ? input[0] : input;

export const dynamic = "force-dynamic";

export default async function AccountPage({ searchParams }: Props) {
  const params = await searchParams;
  const message = value(params.message);
  const error = value(params.error);

  if (!isSupabaseConfigured) {
    return <main className="account-page">
      <div className="account-top"><div><p className="section-kicker">Account</p><h1>Account service</h1></div><Link className="secondary-action" href="/">Back home</Link></div>
      <section className="card account-card"><p>Account sync is built into iWas Findex, but the Supabase project credentials still need to be added to this deployment.</p></section>
    </main>;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in?next=/account");

  const [{ data: profile }, { data: watchlist }] = await Promise.all([
    supabase.from("profiles").select("display_name,theme,created_at").eq("id", user.id).maybeSingle(),
    supabase.from("watchlist").select("symbol").order("created_at", { ascending: true }),
  ]);

  const displayName = profile?.display_name ?? user.user_metadata?.display_name ?? "";
  const theme = profile?.theme ?? "dark";
  const created = new Date(profile?.created_at ?? user.created_at).toLocaleDateString();

  return <main className="account-page">
    <div className="account-top">
      <div><p className="section-kicker">Personal workspace</p><h1>Your account</h1></div>
      <Link className="secondary-action" href="/">Open market workspace</Link>
    </div>
    {message && <div className="auth-message">{message}</div>}
    {error && <div className="auth-message error">{error}</div>}

    <div className="account-grid">
      <section className="card account-card">
        <h2>Profile & preferences</h2>
        <form className="auth-form" action={updateProfile}>
          <div className="auth-field"><label htmlFor="displayName">Display name</label><input id="displayName" name="displayName" defaultValue={displayName} maxLength={80} /></div>
          <div className="auth-field"><label htmlFor="theme">Theme</label><select id="theme" name="theme" defaultValue={theme}><option value="dark">Dark</option><option value="light">Light</option><option value="system">System</option></select></div>
          <button className="auth-submit" type="submit">Save profile</button>
        </form>
        <div className="account-actions"><form action={signOut}><button className="danger-button" type="submit">Sign out</button></form></div>
      </section>

      <aside className="card account-card">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}><Image src="/brand-mark.png" alt="" width={36} height={36}/><strong>iWas Findex account</strong></div>
        <dl className="account-meta">
          <div><dt>Email</dt><dd>{user.email}</dd></div>
          <div><dt>Member since</dt><dd>{created}</dd></div>
          <div><dt>Cloud watchlist</dt><dd>{watchlist?.length ?? 0} symbols</dd></div>
        </dl>
        <h2 style={{marginTop:24}}>Synced instruments</h2>
        <div className="account-watchlist">{watchlist?.length ? watchlist.map(row=><span key={row.symbol}>{row.symbol}</span>) : <span>No saved symbols yet</span>}</div>
      </aside>
    </div>
  </main>;
}
