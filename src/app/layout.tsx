import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ── UI Font: Inter ────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

/* ── Code Font: JetBrains Mono ─────────────────────────────── */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false, // Only loaded when mono class is used
});

/* ── Site Metadata ─────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "DevLearn — Learn. Build. Grow.",
  description:
    "DevLearn is a premium developer learning platform built for modern engineers. Master frameworks, build real projects, and level up your career.",
};

/* ── Root Layout ───────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
