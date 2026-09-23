import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="auth-page">
    <Link className="auth-brand" href="/">
      <Image src="/brand-mark.png" alt="iWas Findex" width={38} height={38} priority />
      <span>iWas Findex</span>
    </Link>
    {children}
  </main>;
}
