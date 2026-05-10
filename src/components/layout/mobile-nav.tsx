"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Map,
  LayoutDashboard,
  Settings,
  Trophy,
  BarChart2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/courses", label: "Courses", icon: BookOpen },
  {
    label: "Learning Path",
    icon: Map,
    children: [
      { href: "/learning-path", label: "Learning Path", icon: Map },
      { href: "/overview", label: "Overview", icon: BarChart2 },
      { href: "/achievements", label: "Achievements", icon: Trophy },
    ],
  },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function MobileNav({ sessionEmail }: { sessionEmail?: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [lpOpen, setLpOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // We need `mounted` to safely call createPortal (SSR guard)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open; prevent horizontal scroll always
  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  /*
   * WHY PORTAL?
   * The Navbar uses `backdrop-blur-md` (backdrop-filter).
   * The CSS spec states: any `position: fixed` element whose nearest ancestor
   * has a backdrop-filter is positioned relative to THAT ANCESTOR, not the
   * viewport. This causes the drawer to scroll with the page or mis-position.
   *
   * By portaling the overlay+panel to document.body we guarantee they are
   * children of the root element — no backdrop-filter ancestor exists there —
   * so `position: fixed` correctly targets the real viewport.
   */
  const drawerPortal = mounted
    ? createPortal(
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Slide-over panel — mounted at body level, truly viewport-fixed */}
          <div
            className={`fixed top-0 right-0 z-[9999] w-72 h-[100dvh] flex flex-col border-l shadow-2xl transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              backgroundColor: "var(--color-surface, #0F172A)",
              borderColor: "var(--color-border, #1E293B)",
            }}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >
            {/* Panel header */}
            <div
              className="flex items-center justify-between p-4 border-b shrink-0"
              style={{ borderColor: "var(--color-border, #1E293B)" }}
            >
              <span className="font-bold text-xl tracking-tight text-text-primary flex items-center gap-1">
                <span className="text-primary font-black">Dev</span>Learn
              </span>
              <button
                onClick={closeMenu}
                className="p-2 text-text-primary/70 hover:text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto flex flex-col">
              {/* Primary nav */}
              <nav className="flex flex-col py-4 px-3 gap-0.5">
                {NAV.map((item) => {
                  if (item.children) {
                    const isParentActive = item.children.some((c) =>
                      pathname.startsWith(c.href)
                    );
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() => setLpOpen((p) => !p)}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                            isParentActive
                              ? "bg-primary/10 text-primary"
                              : "text-text-primary/70 hover:text-text-primary hover:bg-text-primary/5"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <item.icon className="w-4 h-4 shrink-0" />
                            {item.label}
                          </span>
                          {lpOpen ? (
                            <ChevronUp className="w-4 h-4 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 shrink-0" />
                          )}
                        </button>
                        {lpOpen && (
                          <div className="ml-7 mt-0.5 flex flex-col gap-0.5">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={closeMenu}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  pathname === child.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-text-primary/60 hover:text-text-primary hover:bg-text-primary/5"
                                }`}
                              >
                                <child.icon className="w-4 h-4 shrink-0" />
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href!}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-text-primary/70 hover:text-text-primary hover:bg-text-primary/5"
                      }`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Spacer — pushes auth section to bottom */}
              <div className="flex-1" />

              {/* Auth section — pinned to bottom */}
              <div
                className="px-3 pb-6 pt-4 border-t flex flex-col gap-3 shrink-0"
                style={{ borderColor: "var(--color-border, #1E293B)" }}
              >
                {sessionEmail ? (
                  <>
                    <div
                      className="flex items-center gap-3 p-3 rounded-lg border"
                      style={{
                        backgroundColor: "var(--color-background, #020617)",
                        borderColor: "var(--color-border, #1E293B)",
                      }}
                    >
                      <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.35)]">
                        <span className="text-sm font-bold text-white leading-none">
                          {sessionEmail[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-text-primary/80 truncate">
                        {sessionEmail}
                      </span>
                    </div>
                    <Link onClick={closeMenu} href="/auth/signout" className="w-full">
                      <Button variant="secondary" className="w-full">
                        Logout
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link onClick={closeMenu} href="/auth/signin">
                      <Button variant="ghost" className="w-full justify-center">
                        Login
                      </Button>
                    </Link>
                    <Link onClick={closeMenu} href="/auth/signin">
                      <Button variant="primary" className="w-full justify-center">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <div className="md:hidden flex items-center">
      {/* Toggle button — stays in the navbar DOM tree (just the button) */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="p-2 -mr-2 text-text-primary/70 hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Drawer + backdrop rendered at document.body via portal */}
      {drawerPortal}
    </div>
  );
}
