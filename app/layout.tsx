import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ServiceWorkerRegister } from "@/components/sw-register";

const description="Cross-platform market intelligence with transparent trend forecasting.";

export const metadata:Metadata={
  title:{default:"iWas Findex | Market Intelligence",template:"%s | iWas Findex"},
  description,
  manifest:"/manifest.webmanifest",
  icons:{icon:"/icons/favicon.png",apple:"/icons/apple-touch-icon.png"},
  openGraph:{
    title:"iWas Findex",
    description,
    type:"website",
    images:[{url:"/brand-mark.png",width:512,height:512,alt:"iWas Findex"}]
  },
  twitter:{card:"summary",title:"iWas Findex",description,images:["/brand-mark.png"]}
};

export const viewport:Viewport={themeColor:"#06100d",colorScheme:"dark light"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en" data-theme="dark" suppressHydrationWarning><body><ThemeProvider><ServiceWorkerRegister/>{children}</ThemeProvider></body></html>
}
