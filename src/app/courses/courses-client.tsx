"use client";
import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CourseCard } from "@/components/layout/course-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Course } from "@/types/course";
const CATEGORIES = ["All Categories", "Cloud Infrastructure", "System Design", "Security Architecture", "Distributed Systems"];
const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = ["Rating", "Price"];

export const CoursesClient = ({ courses, enrolledIds = [] }: { courses: Course[], enrolledIds?: string[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ── URL is the single source of truth ──
  const urlSearch = searchParams?.get("search") || "";
  const urlPage = parseInt(searchParams?.get("page") || "1", 10);
  const currentPage = !isNaN(urlPage) ? urlPage : 1;

  // ── Local state only for the controlled input ──
  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState<string>("All Categories");
  const [level, setLevel] = useState<string>("All Levels");
  const [sortBy, setSortBy] = useState<string>("Rating");

  const COURSES_PER_PAGE = 6;

  // Ref to track what we last pushed to URL, preventing loops
  const lastPushedSearch = useRef(urlSearch);

  // Sync input from URL when URL changes externally (e.g. back/forward navigation)
  useEffect(() => {
    if (urlSearch !== lastPushedSearch.current) {
      // URL changed externally — sync input to match
      setSearch(urlSearch);
      lastPushedSearch.current = urlSearch;
    }
  }, [urlSearch]);

  // Debounce: push input value to URL after 300ms of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== urlSearch) {
        lastPushedSearch.current = search;
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        // Reset to page 1 on new search
        const newUrl = `/courses${params.toString() ? `?${params.toString()}` : ""}`;
        router.replace(newUrl, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search]); // Only depend on `search` — not on urlSearch/router to avoid re-triggers

  const handleReset = () => {
    setSearch("");
    setCategory("All Categories");
    setLevel("All Levels");
    setSortBy("Rating");
    lastPushedSearch.current = "";
    router.replace("/courses", { scroll: false });
  };

  // ── Filter and sort using urlSearch for stable reads ──
  const activeSearch = search; // Use the local state for immediate filtering feel
  const filteredCourses = useMemo(() => {
    let result = [...(courses || [])];

    if (activeSearch.trim() !== "") {
      result = result.filter(c => c.title?.toLowerCase().includes(activeSearch.toLowerCase()));
    }
    if (category !== "All Categories") {
      result = result.filter(c => c.category?.toLowerCase() === category.toLowerCase());
    }
    if (level !== "All Levels") {
      result = result.filter(c => c.level?.toLowerCase() === level.toLowerCase());
    }

    switch (sortBy) {
      case "Price":
        result.sort((a, b) => {
          const priceA = typeof a.numericPrice === "string" ? parseFloat(a.numericPrice) : a.numericPrice;
          const priceB = typeof b.numericPrice === "string" ? parseFloat(b.numericPrice) : b.numericPrice;
          return (priceA || 0) - (priceB || 0);
        });
        break;
      case "Rating":
        result.sort((a, b) => {
          const ratingA = typeof a.rating === "string" ? parseFloat(a.rating) : a.rating;
          const ratingB = typeof b.rating === "string" ? parseFloat(b.rating) : b.rating;
          return (ratingB || 0) - (ratingA || 0);
        });
        break;
    }

    return result;
  }, [activeSearch, category, level, sortBy, courses]);

  // Navigation Page handler
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (newPage > 1) params.set("page", newPage.toString());
    
    router.replace(`/courses${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * COURSES_PER_PAGE, currentPage * COURSES_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 flex flex-col lg:flex-row gap-10">

      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-10 lg:pr-6 border-r-0 lg:border-r border-border/40">

        {/* Search */}
        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary mb-3 block">Search Infrastructure</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <Input
              className="pl-10 h-11 bg-surface/40 border-border/60 text-sm w-full placeholder:text-text-secondary focus:bg-surface/80 transition-colors"
              placeholder="Search architecture..."
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Dropdown */}
        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary mb-4 block">Categories</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 bg-surface/40 border border-border/60 text-sm text-text-primary rounded-md pl-4 pr-10 appearance-none focus:outline-none focus:bg-surface/80 focus:border-primary/50 transition-colors cursor-pointer"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} className="bg-background text-text-primary py-2">{cat}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>

        {/* Level Dropdown */}
        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary mb-4 block">Level</label>
          <div className="relative">
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full h-11 bg-surface/40 border border-border/60 text-sm text-text-primary rounded-md pl-4 pr-10 appearance-none focus:outline-none focus:bg-surface/80 focus:border-primary/50 transition-colors cursor-pointer"
            >
              {LEVELS.map(l => (
                <option key={l} value={l} className="bg-background text-text-primary py-2">{l}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>

        <Button variant="secondary" className="w-full text-xs font-bold tracking-widest uppercase h-11 border-border/50 bg-background hover:bg-surface" onClick={handleReset}>
          Reset Filters
        </Button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">

        {/* Header Title + Sorting Bar */}
        <div className="mb-10 flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-6 border-b border-border/40">
          <div>
            <h1 className="text-3xl md:text-[2.5rem] font-extrabold text-text-primary mb-3 tracking-tight">Cloud Learning Paths</h1>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-text-secondary font-medium tracking-wide">Engineered pathways for the modern developer.</p>
              <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-[4px] text-[10px] tracking-widest py-0.5 px-2 font-bold shadow-sm">
                {filteredCourses.length} RESULTS
              </Badge>
            </div>
          </div>

          <div className="flex bg-surface/60 border border-border/50 rounded-lg p-1.5 shadow-inner shrink-0 w-max">
            {SORT_OPTIONS.map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-5 py-1.5 text-[11px] uppercase tracking-wider font-bold rounded-md transition-all ${sortBy === s
                  ? 'bg-primary/20 text-primary shadow-sm ring-1 ring-primary/30'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid Layout */}
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-border/50 rounded-2xl bg-surface/10">
            <div className="bg-surface/50 p-6 rounded-full border border-border/50 mb-6 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <h3 className="text-2xl font-extrabold text-text-primary mb-3 tracking-tight">No courses found</h3>
            <p className="text-text-secondary mb-8 max-w-sm leading-relaxed">Try adjusting your search or filters.</p>
            <Button size="lg" variant="secondary" className="font-bold px-8 flex items-center gap-2" onClick={handleReset}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8">
              {paginatedCourses.map((course) => {
                const totalLessons = course.curriculum?.reduce((acc, sec) => acc + (sec.lessons?.length || 0), 0) || 0;
                return (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    category={course.category || "General"}
                    title={course.title || "Untitled Course"}
                    instructor={course.instructor?.name || "Unknown"}
                    rating={course.rating ?? 0}
                    reviews={course.reviewsCount ?? 0}
                    price={course.price || "$0.00"}
                    imageUrl={course.image || "/placeholder.jpg"}
                    enrolled={enrolledIds.includes(course.id)}
                    totalLessons={totalLessons}
                  />
                );
              })}
            </div>

            {/* Dynamic Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <button 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-md border border-border/50 flex items-center justify-center text-text-secondary hover:bg-surface hover:text-text-primary transition-colors bg-surface/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button 
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-md border flex items-center justify-center font-semibold transition-colors ${
                        currentPage === page 
                          ? "border-primary bg-primary text-text-primary shadow-lg shadow-primary/20" 
                          : "border-border/50 text-text-secondary hover:bg-surface hover:text-text-primary bg-surface/30"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-md border border-border/50 flex items-center justify-center text-text-secondary hover:bg-surface hover:text-text-primary transition-colors bg-surface/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
};
