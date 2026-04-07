import React from "react";
import { Button } from "@/components/ui/button";

export const EnterpriseBanner = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-[#4A35ED] relative">
        {/* Subtle texture overlay for visual interest without hardcoded images */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="flex flex-col md:flex-row items-center relative z-10">
          <div className="flex-1 p-10 md:p-16 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Elevate Your Team</h2>
            <p className="text-white/80 text-lg max-w-md leading-relaxed">
              Specialized enterprise training programs for engineering organizations. Scalable learning for growing teams.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Contact Enterprise Sales
            </Button>
          </div>
          <div className="flex-1 w-full h-64 md:h-full min-h-[350px] relative overflow-hidden bg-black/20 mix-blend-overlay">
             {/* Robot face abstract representation via CSS since we can't guarantee image URL rendering perfectly match */}
             <img 
               src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1565" 
               alt="AI abstract" 
               className="absolute inset-0 w-full h-full object-cover opacity-60"
             />
          </div>
        </div>
      </div>
    </section>
  );
};
