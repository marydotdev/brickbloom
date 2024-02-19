"use client"
import "./globals.css";
import { Inter as FontSans, Caveat } from "next/font/google";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getUserId } from '@/lib/utils';

type RootLayoutProps = {
  children: React.ReactNode;
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});
export default function RootLayout({ children }: RootLayoutProps) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = getUserId();
    console.log(`User ID: ${userId}`);
    setUserId(userId);
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          caveat.variable
        )}
      >
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              <a href="/">brickbloom</a>
            </h1>
            <p className="text-lg">Generate Lego inspired AI images</p>
            <p>
              <a href={`/gallery/${userId}`}>{userId}</a>
            </p>
          </div>
        </div>
        <main className="flex min-h-full flex-col">{children}</main>
      </body>
    </html>
  );
}
