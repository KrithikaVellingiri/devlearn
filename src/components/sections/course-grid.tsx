"use client";

import React, { useState, useMemo } from "react";
import { CourseCard } from "@/components/layout/course-card";

interface CourseGridProps {
  title: string;
  courses: Array<{
    id?: string;
    category: string;
    title: string;
    instructor: string;
    rating: number;
    reviews: number;
    price: string;
    imageUrl: string;
  }>;
  showIcon?: boolean;
  showSort?: boolean;
  emptyMessage?: string;
}

export const CourseGrid: React.FC<CourseGridProps> = ({ title, courses, showIcon, showSort, emptyMessage }) => {
  const [sortBy, setSortBy] = useState("rating");

  const sortedCourses = useMemo(() => {
    if (!showSort) return courses;
    
    const result = [...courses];
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-low") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
        return priceA - priceB;
      });
    } else if (sortBy === "price-high") {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
        return priceB - priceA;
      });
    }
    return result;
  }, [courses, sortBy, showSort]);

  const SORT_OPTIONS = [
    { value: "rating", label: "Rating" },
    { value: "price-low", label: "Price (Low)" },
    { value: "price-high", label: "Price (High)" }
  ];

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 gap-4">
        <div className="flex items-center gap-3">
          {showIcon && (
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          )}
          <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        
        <div className="flex items-center gap-4">
          {showSort && (
            <div className="flex bg-surface/60 border border-border/50 rounded-lg p-1 shadow-inner shrink-0 w-max">
              {SORT_OPTIONS.map(s => (
                <button
                  key={s.value}
                  onClick={() => setSortBy(s.value)}
                  className={`px-4 py-1.5 text-[11px] uppercase tracking-wider font-bold rounded-md transition-all ${sortBy === s.value
                    ? 'bg-primary/20 text-primary shadow-sm ring-1 ring-primary/30'
                    : 'text-text-primary/60 hover:text-white hover:bg-surface'
                    }`}>
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {!showIcon && (
            <a href="/courses" className="text-sm font-medium text-text-primary/70 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider text-xs">
              View all <span>&rarr;</span>
            </a>
          )}
        </div>
      </div>
      
      {sortedCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-border/50 rounded-2xl bg-surface/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary/30 mb-4"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          <h3 className="text-xl font-medium text-white mb-2">{emptyMessage || "No courses found."}</h3>
          <p className="text-text-primary/60 max-w-md">Check back later or explore other topics.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedCourses.map((course, idx) => (
            <CourseCard key={course.id || idx} id={course.id} {...course} />
          ))}
        </div>
      )}
    </section>
  );
};

