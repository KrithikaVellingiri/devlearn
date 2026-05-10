"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Trophy,
  Map,
} from "lucide-react";

/* ── Navigation items ──────────────────────────────────────── */
const MAIN_NAV_ITEMS = [
  { label: "Learning Path", href: "/learning-path", icon: Map },
  { label: "Overview",      href: "/overview",      icon: LayoutGrid },
  { label: "Achievements",  href: "/achievements",  icon: Trophy },
];

/**
 * Shared sidebar used across dashboard-style pages.
 * Uses `usePathname()` for automatic active state detection.
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] border-r border-border/20 bg-[#06080C] hidden md:flex flex-col flex-shrink-0 relative">
      {/* Header */}
      <div className="pt-8 pb-6 px-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-[#5A4AF4] flex items-center justify-center shadow-[0_0_15px_rgba(90,74,244,0.4)] flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-text-primary">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-sm tracking-tight text-text-primary leading-tight truncate">
            DevLearn
          </span>
          <span className="text-[10px] text-text-primary/40 tracking-wider">v2.4.0</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 space-y-1">
        {MAIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (isActive) {
            return (
              <div key={item.href} className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5A4AF4] rounded-r-md shadow-[0_0_10px_rgba(90,74,244,0.8)]"></div>
                <Link href={item.href} className="flex items-center gap-4 px-8 py-3 bg-[#1A1E2E]/50 text-text-primary transition-colors">
                  <Icon className="w-4 h-4 text-[#5A4AF4]" />
                  <span className="text-xs font-bold tracking-widest uppercase text-text-primary truncate">
                    {item.label}
                  </span>
                </Link>
              </div>
            );
          }

          return (
            <Link key={item.href} href={item.href} className="flex items-center gap-4 px-8 py-3 text-text-primary/50 hover:text-text-primary transition-colors">
              <Icon className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase truncate">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
