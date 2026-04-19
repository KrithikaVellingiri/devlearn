"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-center flex flex-col items-center justify-center p-8">
      <div className="bg-surface/50 p-6 rounded-full border border-border/50 mb-6 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      </div>
      <h2 className="text-2xl font-extrabold text-white mb-3 tracking-tight">Something went wrong!</h2>
      <p className="text-text-primary/60 mb-8 max-w-sm leading-relaxed">{error.message || "Failed to load the learning paths."}</p>
      <Button size="lg" variant="secondary" className="font-bold px-8" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
