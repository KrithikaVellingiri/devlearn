"use client";

import { BookOpen, Menu, X } from "lucide-react";
import { useUIStore } from "@/store/ui-store";

/**
 * Navbar — demonstrates:
 *   1. lucide-react icon imports
 *   2. Zustand store consumption (sidebar toggle)
 *
 * This is a shell component — replace content when building real UI.
 */
export function Navbar() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <header className="h-14 border-b border-border bg-surface flex items-center px-4 gap-4">
      {/* Sidebar toggle — Lucide icons used here */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className="text-text-secondary hover:text-text-primary transition-colors"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Brand */}
      <div className="flex items-center gap-2 text-text-primary font-semibold">
        <BookOpen size={20} className="text-primary" />
        <span>DevLearn</span>
      </div>
    </header>
  );
}
