import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";


const clash = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brickbloom",
  description:
    "Generate Lego Inspired AI Art",
  metadataBase: new URL("https://brickbloom.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(clash.variable, inter.variable)}>
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
        <main className="flex w-full flex-col items-center">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
