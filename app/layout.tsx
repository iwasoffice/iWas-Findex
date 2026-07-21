import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iWas Findex | Market Intelligence",
  description: "A transparent financial market dashboard with trend forecasting.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
