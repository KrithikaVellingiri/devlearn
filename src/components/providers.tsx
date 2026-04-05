"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

/**
 * Client-side providers wrapper.
 *
 * Wraps all client providers in one place so layout.tsx stays a
 * clean Server Component. Add SessionProvider, ThemeProvider, etc. here.
 *
 * Usage in layout.tsx:
 *   <Providers>{children}</Providers>
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
