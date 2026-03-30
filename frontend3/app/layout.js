import "./globals.css";

export const metadata = {
  title: "iWas Findex Frontend",
  description: "Vercel-ready dashboard for iWas Findex"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
