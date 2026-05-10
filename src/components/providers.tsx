"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "@/lib/query-client";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Client-side providers wrapper.
 *
 * Wraps all client providers in one place so layout.tsx stays a
 * clean Server Component.
 *
 * Usage in layout.tsx:
 *   <Providers>{children}</Providers>
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
