import Image from "next/image";
import Link from "next/link";

export default function Offline() {
  return (
    <main className="center-page">
      <Image src="/brand-mark.svg" alt="iWas Findex" width={76} height={76} />
      <h1>You are offline</h1>
      <p>The installed app can reopen cached screens, but fresh market data needs an internet connection.</p>
      <Link href="/">Try again</Link>
    </main>
  );
}
