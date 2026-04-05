import { QueryClient } from "@tanstack/react-query";

/**
 * Singleton QueryClient shared across the app.
 *
 * Stale time: 60s — data is considered fresh for 60 seconds,
 * reducing redundant network requests for stable data like course lists.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,      // 1 minute
      retry: 1,                   // retry failed requests once
      refetchOnWindowFocus: false, // avoid surprise re-fetches on tab switch
    },
  },
});
