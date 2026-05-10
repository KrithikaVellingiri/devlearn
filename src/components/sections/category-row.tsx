import React from "react";

interface CategoryRowProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const CategoryRow: React.FC<CategoryRowProps> = ({ 
  selectedCategory = "All Topics", 
  onSelectCategory 
}) => {
  const categories = [
    "All Topics",
    "DSA",
    "Web Dev",
    "System Design",
    "Machine Learning",
    "DevOps",
    "Frontend",
    "Cloud Arch",
  ];

  return (
    <section className="container mx-auto px-4 py-6 mb-8">
      <div className="flex items-center justify-start xl:justify-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat, idx) => {
          const isActive = cat === selectedCategory;
          return (
            <button 
              key={idx} 
              onClick={() => onSelectCategory?.(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                isActive 
                  ? "bg-primary text-text-primary" 
                  : "bg-surface text-text-primary/80 border border-border hover:bg-surface/80"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
};
