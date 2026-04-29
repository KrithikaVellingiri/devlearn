"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  BookOpen,
  LayoutGrid,
  Trophy,
  Terminal,
  Settings,
  HelpCircle,
  LogOut,
  GraduationCap,
  Map,
} from "lucide-react";

/* ── Navigation items ──────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Home",          href: "/",              icon: Home },
  { label: "Courses",       href: "/courses",       icon: BookOpen },
  { label: "Dashboard",     href: "/dashboard",     icon: GraduationCap },
  { label: "Learning Path", href: "/learning-path", icon: Map },
  { label: "Overview",      href: "/overview",      icon: LayoutGrid },
  { label: "Achievements",  href: "/achievements",  icon: Trophy },
  { label: "CloudLab",      href: "/cloudlab",      icon: Terminal },
  { label: "Settings",      href: "/settings",      icon: Settings },
];

/**
 * Shared sidebar used across dashboard-style pages.
 * Uses `usePathname()` for automatic active state detection.
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 border-r border-border bg-surface/50 hidden md:flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/100"
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-tight text-text-primary line-clamp-1">
            DevLearn Dashboard
          </span>
          <span className="text-xs text-text-primary/50">v2.4.0</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-text-primary/70 hover:text-text-primary hover:bg-surface"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              <span className={`text-sm font-medium ${isActive ? "text-primary" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 mt-auto">
        <Card className="bg-surface/80 border-border mb-6">
          <CardContent className="p-4 pt-5">
            <p className="text-xs font-bold text-text-primary/60 mb-2 tracking-wider">
              DEVLEARN PRO
            </p>
            <Button variant="primary" className="w-full shadow-md border-transparent">
              UPGRADE TO PRO
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-1">
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary/60 hover:text-text-primary transition-colors"
          >
            <HelpCircle className="w-4 h-4" /> Help Center
          </Link>
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary/60 hover:text-text-primary transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Link>
        </div>
      </div>
    </aside>
  );
}
