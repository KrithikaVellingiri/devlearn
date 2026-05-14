"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function CourseError({
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
    <div className="flex-grow flex items-center justify-center p-8 bg-background min-h-[50vh]">
      <div className="max-w-md w-full bg-surface/30 border border-border/50 rounded-2xl p-8 text-center shadow-xl">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-extrabold text-text-primary mb-2 tracking-tight">Failed to load courses</h2>
        <p className="text-text-secondary mb-8 leading-relaxed">
          We encountered an unexpected error while loading the catalog. Please try again.
        </p>
        <div className="flex flex-col gap-4 justify-center">
          <Button 
            onClick={() => reset()} 
            className="font-bold flex items-center justify-center gap-2"
            variant="primary"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}
