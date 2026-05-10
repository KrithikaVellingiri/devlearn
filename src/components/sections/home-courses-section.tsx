"use client";

import React, { useState, useMemo } from "react";
import { CategoryRow } from "@/components/sections/category-row";
import { CourseGrid } from "@/components/sections/course-grid";

interface HomeCoursesSectionProps {
  courses: Array<{
    id?: string;
    category: string;
    title: string;
    instructor: string;
    rating: number;
    reviews: number;
    price: string;
    imageUrl: string;
    enrolled?: boolean;
  }>;
  fetchError: boolean;
}

export const HomeCoursesSection: React.FC<HomeCoursesSectionProps> = ({ courses, fetchError }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Topics");

  const filteredCourses = useMemo(() => {
    if (selectedCategory === "All Topics") return courses;
    return courses.filter(course => course.category === selectedCategory);
  }, [courses, selectedCategory]);

  return (
    <>
      <CategoryRow 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      {fetchError ? (
        <section className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <div className="bg-red-500/10 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2 tracking-tight">Something went wrong</h2>
          <p className="text-text-primary/60 mb-6 max-w-sm">We couldn't load the top rated courses. Please check your connection and try again.</p>
          <a href="/" className="inline-flex items-center gap-2 font-bold px-6 py-2.5 rounded-lg bg-surface hover:bg-surface/80 border border-border/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
            Try again
          </a>
        </section>
      ) : (
        <CourseGrid 
          title="Top Rated Courses" 
          courses={filteredCourses} 
          showSort={true} 
          emptyMessage={`No courses available under ${selectedCategory} yet.`}
        />
      )}
    </>
  );
};
