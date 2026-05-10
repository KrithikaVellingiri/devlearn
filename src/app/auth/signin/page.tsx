"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="font-bold text-2xl tracking-tight text-text-primary">
              <span className="text-primary font-black">Dev</span>Learn
            </span>
          </Link>
          <p className="text-xs text-text-primary/50 uppercase tracking-widest font-semibold mt-3">
            Sign in to continue
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-surface/40 border border-border/50 rounded-2xl p-8 shadow-xl">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold text-sm rounded-xl px-4 py-3.5 hover:bg-gray-100 transition-colors shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border/50"></div>
            <span className="text-[10px] font-bold text-text-primary/40 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border/50"></div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                callbackUrl: "/dashboard",
              });
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary/50 mb-2 block">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full h-11 bg-background border border-border/60 rounded-lg px-3 text-sm text-text-primary placeholder:text-text-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary/50 mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full h-11 bg-background border border-border/60 rounded-lg px-3 text-sm text-text-primary placeholder:text-text-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full py-3 mt-2 shadow-md border-transparent font-bold tracking-wider text-xs">
              SIGN IN
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-text-primary/40 mt-6">
          <Link href="/" className="hover:text-text-primary transition-colors">← Back to DevLearn</Link>
        </p>
      </div>
    </div>
  );
}
