import React from "react";

export default function LoadingLesson() {
  return (
    <div className="flex h-screen bg-background text-text-primary overflow-hidden font-sans">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex flex-col w-80 bg-surface/30 border-r border-border/50 shrink-0">
        <div className="p-4 border-b border-border/50 h-[57px] flex items-center bg-surface/50">
          <div className="h-4 w-32 bg-surface/80 rounded animate-pulse"></div>
        </div>
        <div className="p-5 border-b border-border/50">
          <div className="h-6 w-3/4 bg-surface rounded animate-pulse mb-4"></div>
          <div className="flex justify-between items-center mb-2">
            <div className="h-3 w-16 bg-surface/50 rounded animate-pulse"></div>
            <div className="h-3 w-10 bg-surface/50 rounded animate-pulse"></div>
          </div>
          <div className="h-1.5 w-full bg-surface/50 rounded-full animate-pulse"></div>
        </div>
        <div className="flex-1 overflow-y-hidden p-5 space-y-6">
          {[1, 2, 3].map((i) => (
             <div key={i}>
                <div className="h-4 w-1/4 bg-surface rounded animate-pulse mb-3"></div>
                <div className="h-4 w-full bg-surface/50 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-5/6 bg-surface/50 rounded animate-pulse"></div>
             </div>
          ))}
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        <header className="h-16 border-b border-border/50 bg-surface/30 flex items-center px-4 md:px-8 justify-between shrink-0">
           <div className="h-4 w-32 bg-surface/50 rounded animate-pulse hidden sm:block"></div>
           <div className="flex gap-2">
              <div className="h-8 w-24 bg-surface rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-surface rounded animate-pulse"></div>
           </div>
        </header>
        <div className="flex-1 overflow-y-hidden p-4 md:p-8 lg:p-12">
           <div className="max-w-4xl mx-auto w-full">
              <div className="w-full aspect-video bg-surface/50 border border-border/50 rounded-2xl mb-8 animate-pulse"></div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
                 <div className="flex-1">
                    <div className="h-8 w-3/4 bg-surface rounded animate-pulse mb-4"></div>
                    <div className="h-4 w-40 bg-surface/50 rounded animate-pulse"></div>
                 </div>
                 <div className="shrink-0 flex items-center">
                    <div className="h-12 w-40 bg-surface rounded animate-pulse"></div>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="h-4 w-full bg-surface/50 rounded animate-pulse"></div>
                 <div className="h-4 w-full bg-surface/50 rounded animate-pulse"></div>
                 <div className="h-4 w-3/4 bg-surface/50 rounded animate-pulse"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
