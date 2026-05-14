"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-surface/30 border border-border/50 rounded-2xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-text-primary mb-2 tracking-tight">Something went wrong</h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            We encountered an unexpected error. Please try again or return to the home page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => reset()} 
              className="font-bold flex items-center justify-center gap-2"
              variant="primary"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </Button>
            <Button 
              onClick={() => window.location.href = "/"}
              className="font-bold flex items-center justify-center gap-2"
              variant="secondary"
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
