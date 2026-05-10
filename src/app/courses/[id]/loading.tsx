import React from 'react';
import { Navbar } from "@/components/layout/navbar";


export default function LoadingCourseDetail() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="min-h-screen bg-background text-text-primary">
          <div className="border-b border-border bg-surface/30">
            <div className="container mx-auto px-4 py-8 lg:py-12 flex flex-col lg:flex-row gap-12">
              {/* Left Column Skeleton */}
              <div className="flex-1 min-w-0 lg:pr-6">
                <div className="flex gap-3 mb-6">
                  <div className="h-5 w-20 bg-surface rounded animate-pulse"></div>
                  <div className="h-5 w-20 bg-surface rounded animate-pulse"></div>
                </div>
                <div className="h-12 w-3/4 bg-surface rounded animate-pulse mb-6"></div>
                
                <div className="flex gap-6 mb-10">
                   <div className="h-4 w-24 bg-surface/50 rounded animate-pulse"></div>
                   <div className="h-4 w-24 bg-surface/50 rounded animate-pulse"></div>
                   <div className="h-4 w-24 bg-surface/50 rounded animate-pulse"></div>
                </div>
                
                <div className="mb-12">
                   <div className="h-6 w-40 bg-surface rounded animate-pulse mb-4"></div>
                   <div className="space-y-2">
                       <div className="h-4 w-full bg-surface/50 rounded animate-pulse"></div>
                       <div className="h-4 w-full bg-surface/50 rounded animate-pulse"></div>
                       <div className="h-4 w-3/4 bg-surface/50 rounded animate-pulse"></div>
                   </div>
                </div>
              </div>

              {/* Right Column Skeleton */}
              <div className="w-full lg:w-[450px] shrink-0">
                <div className="rounded-xl bg-surface/20 border border-border overflow-hidden">
                   <div className="aspect-video bg-surface/50 animate-pulse"></div>
                   <div className="p-6">
                      <div className="h-10 w-32 bg-surface rounded animate-pulse mb-6"></div>
                      <div className="h-14 w-full bg-surface rounded animate-pulse mb-3"></div>
                      <div className="h-14 w-full bg-surface rounded animate-pulse mb-6"></div>
                      <div className="h-4 w-48 mx-auto bg-surface/50 rounded animate-pulse"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
