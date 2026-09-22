import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ServiceWorkerRegister } from "@/components/sw-register";
export const metadata:Metadata={title:{default:"iWas Findex | Market Intelligence",template:"%s | iWas Findex"},description:"Cross-platform market intelligence with transparent trend forecasting.",manifest:"/manifest.webmanifest",icons:{icon:"/icons/favicon.png",apple:"/icons/apple-touch-icon.png"},openGraph:{title:"iWas Findex",description:"Inspectable market intelligence across web, mobile and browser extension.",type:"website"}};
export const viewport:Viewport={themeColor:"#06100d",colorScheme:"dark light"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-theme="dark" suppressHydrationWarning><body><ThemeProvider><ServiceWorkerRegister/>{children}</ThemeProvider></body></html>}
