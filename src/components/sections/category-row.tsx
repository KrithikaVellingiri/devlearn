import React from "react";

export const CategoryRow = () => {
  const categories = [
    { name: "All Topics", active: true },
    { name: "DSA", active: false },
    { name: "Web Dev", active: false },
    { name: "System Design", active: false },
    { name: "Machine Learning", active: false },
    { name: "DevOps", active: false },
    { name: "Frontend", active: false },
    { name: "Cloud Arch", active: false },
  ];

  return (
    <section className="container mx-auto px-4 py-6 mb-8">
      <div className="flex items-center justify-start xl:justify-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat, idx) => (
          <button 
            key={idx} 
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              cat.active 
                ? "bg-primary text-white" 
                : "bg-surface text-text-primary/80 border border-border hover:bg-surface/80"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
};
