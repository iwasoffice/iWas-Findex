import Link from "next/link";

export default function Privacy() {
  return (
    <main className="text-page">
      <Link href="/">← Back to Findex</Link>
      <h1>Privacy</h1>
      <p>
        iWas Findex stores theme and watchlist preferences locally in your browser. The market API receives only the
        ticker symbol you request. Provider credentials stay on the server and are not exposed to browser JavaScript.
      </p>
      <p>The browser extension stores its preferred web-app URL and recent ticker locally in the extension profile.</p>
    </main>
  );
}
