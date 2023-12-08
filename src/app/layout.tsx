import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brickbloom",
  description: "Generate Lego Inspired AI Art",
  metadataBase: new URL("https://brickbloom.com"),
  other: {
    "google-ad-sense": "ca-pub-1553587147774243",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        <div className="w-full">
          <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
            <Link href="/" className="flex items-center font-display text-2xl">
              <Image
                src="/logo.png"
                alt="Logo image"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
                unoptimized
              />
              <p className="font-bold tracking-[-0.02em]">Brickbloom</p>
            </Link>
          </div>
        </div>
        <main className="flex w-full flex-col items-center pb-12">
          {children}
        </main>
        <footer className="w-full py-4 lg:py-12">
          <p className="text-center text-zinc-600">
            made by <a href="https://twitter.com/marydotdev" target='_blank' rel="noreferrer" className='hover:text-sky-500'>mary</a>{" "}
          </p>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
