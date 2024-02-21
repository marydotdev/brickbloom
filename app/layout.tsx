"use client"
import "./globals.css";
import { Inter, Caveat } from "next/font/google";
import { cn } from "@/lib/utils";
import UserId from "@/components/UserId";

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
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen antialiased",
          inter.variable,
          caveat.variable
        )}
      >
        <div className="pt-8 max-w-md mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              <a href="/">brickbloom</a>
            </h1>
            <p className="text-lg">Generate Lego inspired AI images</p>
            <div className='h-6'>
              {/* <a href={`/gallery/${userId}`}>{userId}</a> */}
              <UserId />
            </div>
          </div>
        </div>
        <main className="flex min-h-full flex-col">{children}</main>
      </body>
    </html>
  );
}
