import { create } from "zustand";

/* ── Types ──────────────────────────────────────────────────── */
interface UIState {
  /** Global sidebar expanded/collapsed state */
  isSidebarOpen: boolean;
  /** Theme preference (kept in sync with next-themes or CSS) */
  theme: "dark" | "light";
  /** Global loading overlay — use sparingly */
  isGlobalLoading: boolean;

  /* Actions */
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: "dark" | "light") => void;
  setGlobalLoading: (loading: boolean) => void;
}

/* ── Store ──────────────────────────────────────────────────── */
/**
 * Global UI store — client-side only ephemeral UI state.
 *
 * Use this for:
 *   - Sidebar open/close
 *   - Modal visibility
 *   - Global loading states
 *
 * Do NOT use this for:
 *   - Server data (use React Query)
 *   - Auth state (use next-auth's useSession)
 *   - Form state (use react-hook-form or local useState)
 */
export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  theme: "dark",
  isGlobalLoading: false,

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setSidebarOpen: (open) => set({ isSidebarOpen: open }),

  setTheme: (theme) => set({ theme }),

  setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),
}));
