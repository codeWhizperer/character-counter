import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Providers} from "./providers"


const GMSans = localFont({
  variable: "--font-dm-sans",
  src: [
    {
      path: "../../public/fonts/DM_Sans/static/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/DM_Sans/static/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/DM_Sans/static/DMSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    }
  ]
});


export const metadata: Metadata = {
  title: "Character Analyzer",
  description: "Analyze your text in real-time. Get letter density, character count, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
     <body className={`${GMSans.variable} antialiased`}>

      <Providers>{children}</Providers> 
      </body>
    </html>
  );
}
