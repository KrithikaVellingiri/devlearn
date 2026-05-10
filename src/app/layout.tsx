import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans overflow-x-hidden">
        <Providers>{children}</Providers>
        <Toaster position="bottom-right" theme="dark" toastOptions={{
          style: { background: '#1c1c28', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
        }} />
      </body>
    </html>
  );
}
