import React from "react";

export const StatsBanner = () => {
  const stats = [
    { value: "10,000+", label: "STUDENTS ENROLLED" },
    { value: "4.9/5", label: "AVERAGE RATING" },
    { value: "500+", label: "PARTNER COMPANIES" },
    { value: "24/7", label: "INSTRUCTOR SUPPORT" },
  ];

  return (
    <section className="border-y border-border/70 my-12 bg-surface/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-x-0 lg:divide-x divide-border">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center px-4">
              <p className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">{stat.value}</p>
              <p className="text-xs font-bold tracking-[0.2em] text-text-primary/60 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
