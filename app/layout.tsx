
import "./globals.css";
import { Inter, Caveat } from "next/font/google";
import { cn } from "@/lib/utils";
import {Layout} from "@/components/Layout";

import type { Metadata } from "next";


type RootLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Brickbloom",
  description: "Generate Lego inspired AI images",
};


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "min-h-screen antialiased",
        inter.variable,
        caveat.variable
      )}
    >
      <head />
      <body className="flex h-full flex-col">
        <div className="flex min-h-full flex-col">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}


{/* <html lang="en" suppressHydrationWarning>
  <head />
  <body
    className={cn("min-h-screen antialiased", inter.variable, caveat.variable)}
  >
    <div className="px-4 md:px-8">
      <div className="pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto flex justify-between">
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            <a href="/">brickbloom</a>
          </h1>
          <div className="h-6">
            <UserId />
          </div>
        </div>
      </div>
      <main className="flex min-h-full flex-col">{children}</main>
    </div>
  </body>
</html>; */}
