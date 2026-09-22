import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Downloads" };

export default function Downloads() {
  return (
    <main className="text-page downloads-page">
      <Link href="/">← Back to Findex</Link>
      <h1>Downloads</h1>
      <p>
        Use the web app directly, install it as a PWA, or install the browser companion manually while store listings are
        prepared.
      </p>
      <div className="download-grid">
        <a className="download-card" href="/downloads/iwas-findex-extension-chromium.zip" download>
          <strong>Chromium extension</strong>
          <span>Chrome, Edge, Brave and Opera</span>
        </a>
        <a className="download-card" href="/downloads/iwas-findex-extension-firefox.zip" download>
          <strong>Firefox extension</strong>
          <span>Manual installation package</span>
        </a>
        <div className="download-card muted">
          <strong>Google Play</strong>
          <span>Coming soon — requires signed store release</span>
        </div>
        <div className="download-card muted">
          <strong>Apple App Store</strong>
          <span>Coming soon — requires Apple developer signing and review</span>
        </div>
      </div>
      <h2>Install the PWA now</h2>
      <p>
        Open the main site in a supported browser and use its install option. This gives you a dedicated app window on
        desktop and an app icon on supported mobile devices without a separate store build.
      </p>
    </main>
  );
}
