import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SelectedHoldingsProvider } from "@/Context/SelectedHoldingsContext";
import ThemeProvider from "@/theme/theme-provider";


export const metadata: Metadata = {
  title: "KoinX: Trusted Crypto Tax Software and Portfolio Tracker",
  description: "Monitor your crypto portfolio's growth effortlessly. Track holdings from all your wallets and accounts under a unified dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#F1F5F9] dark:bg-[#0A0A12] dark:text-[#FFFFFF]">
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <SelectedHoldingsProvider >
        <Navbar/>
        {children}
        </SelectedHoldingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
