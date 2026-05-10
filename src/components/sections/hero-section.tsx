import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12">
      <div className="flex-1 space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
          Master Your <br />
          <span className="text-primary leading-[1.1]">Future</span>
        </h1>
        <p className="text-lg text-text-primary/70 max-w-lg leading-relaxed">
          Precision-engineered curriculum for the modern software architect. Deep dive into system design, cloud infrastructure, and advanced engineering patterns.
        </p>
        <div className="flex items-center gap-4 pt-4">
          <Link href="/courses">
            <Button size="lg" className="w-full sm:w-auto px-8">Browse Courses</Button>
          </Link>
        </div>
        <div className="flex items-center gap-10 pt-8 border-t border-border mt-8">
          <div>
            <p className="text-xs font-semibold text-text-primary/60 uppercase tracking-widest mb-1.5">Students</p>
            <p className="text-xl font-bold text-primary">128.4K</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-primary/60 uppercase tracking-widest mb-1.5">Labs</p>
            <p className="text-xl font-bold text-primary">450+</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-primary/60 uppercase tracking-widest mb-1.5">Version</p>
            <p className="text-xl font-bold text-primary">V2.4.0</p>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full relative">
        <div className="rounded-3xl bg-white p-2 shadow-2xl relative overflow-hidden aspect-[4/3] rotate-1 hover:rotate-0 transition-transform duration-500">
           <img 
             src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
             alt="Architecture Wireframe" 
             className="w-full h-full object-cover rounded-2xl opacity-90 grayscale"
           />
        </div>
      </div>
    </section>
  );
};
