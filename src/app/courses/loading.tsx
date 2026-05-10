import React from 'react';
import { Navbar } from "@/components/layout/navbar";


export default function LoadingCourses() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow pt-4">
        <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="mb-10 flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-6 border-b border-border/40">
                <div>
                   <div className="h-12 w-64 md:w-96 bg-surface rounded-md animate-pulse mb-3"></div>
                   <div className="h-4 w-48 md:w-64 bg-surface/50 rounded-md animate-pulse"></div>
                </div>
                <div className="h-8 w-40 bg-surface/50 rounded-md animate-pulse hidden xl:block"></div>
            </div>
            
            <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8">
               {[1, 2, 3, 4, 5, 6].map((i) => (
                   <div key={i} className="rounded-2xl overflow-hidden bg-surface/40 border border-border/50 animate-pulse flex flex-col h-full ring-1 ring-white/5">
                      <div className="aspect-[16/9] bg-surface/80"></div>
                      <div className="p-6 flex-grow flex flex-col">
                         <div className="h-6 w-3/4 bg-surface rounded-md mb-4 mt-2"></div>
                         <div className="h-4 w-full bg-surface/50 rounded-md mb-2"></div>
                         <div className="h-4 w-5/6 bg-surface/50 rounded-md mb-6"></div>
                         <div className="mt-auto flex justify-between items-center pt-5 border-t border-border/50">
                            <div className="flex gap-2">
                               <div className="h-5 w-12 bg-surface/80 rounded-md"></div>
                               <div className="h-5 w-12 bg-surface/80 rounded-md"></div>
                            </div>
                            <div className="h-7 w-20 bg-surface rounded-md"></div>
                         </div>
                      </div>
                   </div>
               ))}
            </div>
        </div>
      </main>

    </div>
  );
}
