"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function SignOutPage() {
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
        </div>

        {/* Sign Out Card */}
        <div className="bg-surface/40 border border-border/50 rounded-2xl p-8 shadow-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <LogOut className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-text-primary mb-2">Sign out?</h1>
          <p className="text-sm text-text-primary/60 mb-8">
            Are you sure you want to sign out of your DevLearn account?
          </p>
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full py-3 shadow-md border-transparent font-bold tracking-wider text-xs"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              SIGN OUT
            </Button>
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full py-3 font-bold tracking-wider text-xs text-text-primary/60 hover:text-text-primary border-transparent">
                CANCEL
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-text-primary/40 mt-6">
          <Link href="/" className="hover:text-text-primary transition-colors">← Back to DevLearn</Link>
        </p>
      </div>
    </div>
  );
}
