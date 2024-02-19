import "./globals.css";
import { Inter as FontSans, Caveat } from "next/font/google";
import { cn } from "@/lib/utils";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable, caveat.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
