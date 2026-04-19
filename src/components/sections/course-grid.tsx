import React from "react";
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
}

export const CourseGrid: React.FC<CourseGridProps> = ({ title, courses, showIcon }) => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8 pb-4">
        <div className="flex items-center gap-3">
          {showIcon && (
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          )}
          <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        {!showIcon && (
          <a href="#" className="text-sm font-medium text-text-primary/70 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider text-xs">
            View all <span>&rarr;</span>
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course, idx) => (
          <CourseCard key={course.id || idx} id={course.id} {...course} />
        ))}
      </div>
    </section>
  );
};

