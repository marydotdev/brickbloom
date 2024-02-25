
import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import {Layout} from "@/components/Layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Metadata } from "next";


type RootLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const protest = localFont({
  src: "../public/fonts/ProtestRiot-Regular.ttf",
  variable: "--font-protest",
});


let title = "Brickbloom";
let description = "Generate Lego inspired AI imagess";
let url = "https://www.brickbloom.com";
let ogimage = "https://www.brickbloom.com/og-image.png";
let sitename = "brickbloom.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        "min-h-screen antialiased",
        inter.variable,
        protest.variable
      )}
    >
      <head />
      <body className="flex h-full flex-col">
        <div className="flex min-h-full flex-col">
          <Layout>{children}</Layout>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}


