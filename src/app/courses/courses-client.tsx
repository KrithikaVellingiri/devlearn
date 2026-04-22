"use client";
import React, { useState, useMemo, useEffect } from "react";
import { CourseCard } from "@/components/layout/course-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Course } from "@/types/course";
const CATEGORIES = ["Cloud Infrastructure", "System Design", "Security Architecture", "Distributed Systems"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = ["Popular", "Newest", "Price", "Rating"];

export const CoursesClient = ({ courses }: { courses: Course[] }) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [level, setLevel] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [rating, setRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("Popular");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const COURSES_PER_PAGE = 6;

  const toggleCategory = (cat: string) => {
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const handleReset = () => {
    setSearch("");
    setCategories([]);
    setLevel("");
    setPriceRange(5000);
    setRating(0);
    setSortBy("Popular");
  };

  const filteredCourses = useMemo(() => {
    let result = [...(courses || [])];

    if (search.trim() !== "") {
      result = result.filter(c => c.title?.toLowerCase().includes(search.toLowerCase()));
    }
    if (categories.length > 0) {
      result = result.filter(c => categories.map(cat => cat.toLowerCase()).includes(c.category?.toLowerCase()));
    }
    if (level) {
      result = result.filter(c => c.level?.toLowerCase() === level.toLowerCase());
    }
    result = result.filter(c => {
      const price = typeof c.numericPrice === "string" ? parseFloat(c.numericPrice) : c.numericPrice;
      return (price || 0) <= priceRange;
    });

    if (rating > 0) {
      result = result.filter(c => {
        const r = typeof c.rating === "string" ? parseFloat(c.rating) : c.rating;
        return (r || 0) >= rating;
      });
    }

    switch (sortBy) {
      case "Popular":
        result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case "Newest":
        result.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
        break;
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
  }, [search, categories, level, priceRange, rating, sortBy, courses]);

  // Reset pagination to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, categories, level, priceRange, rating, sortBy]);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * COURSES_PER_PAGE, currentPage * COURSES_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 flex flex-col lg:flex-row gap-10">

      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-10 lg:pr-6 border-r-0 lg:border-r border-border/40">

        {/* Search */}
        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary/50 mb-3 block">Search Infrastructure</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-primary/50"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <Input
              className="pl-10 h-11 bg-surface/40 border-border/60 text-sm w-full placeholder:text-text-primary/40 focus:bg-surface/80 transition-colors"
              placeholder="Search architecture..."
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary/50 mb-4 block">Categories</label>
          <div className="space-y-3.5">
            {CATEGORIES.map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all ${categories.includes(cat) ? 'bg-primary border-primary shadow-[0_0_8px_rgba(91,69,255,0.4)]' : 'border-text-primary/20 bg-surface group-hover:border-primary/50'}`}>
                  {categories.includes(cat) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-sm tracking-wide ${categories.includes(cat) ? 'text-white font-medium' : 'text-text-primary/70 group-hover:text-text-primary'}`}>
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Level */}
        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary/50 mb-4 block">Level</label>
          <div className="flex flex-wrap gap-2.5">
            {LEVELS.map(l => (
              <button
                key={l}
                onClick={() => setLevel(level === l ? "" : l)}
                className={`px-3 py-1.5 rounded-md border text-xs font-semibold tracking-wide transition-all ${level === l
                  ? 'bg-primary/10 border-primary text-primary shadow-sm'
                  : 'bg-surface/50 border-border/50 text-text-primary/60 hover:text-text-primary hover:border-text-primary/30'
                  }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary/50">Price Range</h3>
            <span className="text-[11px] font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20">$0 - ${(priceRange).toLocaleString()}</span>
          </div>
          <input
            type="range" min="0" max="5000" step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-1 bg-surface rounded-full appearance-none outline-none accent-primary cursor-pointer hover:accent-primary/80 transition-all"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary/50 mb-4 block">Rating</label>
          <div className="space-y-4">
            {[4.5, 4.0].map(r => (
              <label key={r} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${rating === r ? 'border-primary bg-primary/10' : 'border-text-primary/20 bg-surface group-hover:border-primary/50'}`}>
                  {rating === r && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_rgba(91,69,255,0.6)]" />}
                </div>
                <span className={`text-sm ${rating === r ? 'text-white font-medium' : 'text-text-primary/70 group-hover:text-text-primary'}`}>
                  {r.toFixed(1)} & up <span className="text-yellow-500 ml-1">★</span>
                </span>
              </label>
            ))}
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
            <h1 className="text-3xl md:text-[2.5rem] font-extrabold text-white mb-3 tracking-tight">Cloud Learning Paths</h1>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-text-primary/60 font-medium tracking-wide">Engineered pathways for the modern developer.</p>
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
                  : 'text-text-primary/60 hover:text-white hover:bg-surface'
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
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary/50"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">No courses found</h3>
            <p className="text-text-primary/60 mb-8 max-w-sm leading-relaxed">We couldn't find any structural paths matching your exacting filter constraints.</p>
            <Button size="lg" variant="secondary" className="font-bold px-8" onClick={handleReset}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8">
              {paginatedCourses.map((course) => (
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
                />
              ))}
            </div>

            {/* Dynamic Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-md border border-border/50 flex items-center justify-center text-text-primary/50 hover:bg-surface hover:text-white transition-colors bg-surface/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button 
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-md border flex items-center justify-center font-semibold transition-colors ${
                        currentPage === page 
                          ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" 
                          : "border-border/50 text-text-primary/70 hover:bg-surface hover:text-white bg-surface/30"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-md border border-border/50 flex items-center justify-center text-text-primary/50 hover:bg-surface hover:text-white transition-colors bg-surface/30 disabled:opacity-50 disabled:cursor-not-allowed"
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
