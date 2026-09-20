import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KISANIQ — AI-Powered Farmer Decision Support System",
  description:
    "Don't just detect the problem. Decide what to do next. KISANIQ helps farmers make better decisions using AI-powered crop analysis, weather intelligence, and actionable recommendations.",
  keywords: [
    "agriculture",
    "AI",
    "crop disease",
    "farming",
    "decision support",
    "weather",
    "crop recommendation",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
