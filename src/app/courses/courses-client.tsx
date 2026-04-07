"use client";
import React, { useState, useMemo } from "react";
import { CourseCard } from "@/components/layout/course-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MOCK_COURSES = [
  {
    id: "1",
    category: "System Design",
    level: "Intermediate",
    title: "Architecting Scalable Microservices with Go",
    instructor: "Sarah Chen",
    rating: 4.9,
    reviews: 1024,
    price: "$1,299.00",
    numericPrice: 1299,
    popularity: 100,
    date: "2024-01-10",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: "2",
    category: "Security Architecture",
    level: "Intermediate",
    title: "Hardening Kubernetes: The Zero-Trust Framework",
    instructor: "Marcus Thorne",
    rating: 4.7,
    reviews: 846,
    price: "$849.00",
    numericPrice: 849,
    popularity: 85,
    date: "2023-11-20",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: "3",
    category: "Cloud Infrastructure",
    level: "Advanced",
    title: "Serverless Patterns for High-Throughput APIs",
    instructor: "Elena R.",
    rating: 4.8,
    reviews: 1530,
    price: "$599.00",
    numericPrice: 599,
    popularity: 95,
    date: "2024-02-01",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: "4",
    category: "Distributed Systems",
    level: "Advanced",
    title: "Observability Engineering: Tracing the Void",
    instructor: "Adrian Kos",
    rating: 4.6,
    reviews: 620,
    price: "$720.00",
    numericPrice: 720,
    popularity: 75,
    date: "2023-09-15",
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1488"
  },
  {
    id: "5",
    category: "System Design",
    level: "Advanced",
    title: "Designing Data-Intensive Cloud Applications",
    instructor: "Martin K.",
    rating: 5.0,
    reviews: 3000,
    price: "$2,500.00",
    numericPrice: 2500,
    popularity: 110,
    date: "2024-03-01",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1472"
  },
  {
    id: "6",
    category: "Cloud Infrastructure",
    level: "Beginner",
    title: "AWS Cloud Native Architectures",
    instructor: "John D.",
    rating: 4.4,
    reviews: 450,
    price: "$199.00",
    numericPrice: 199,
    popularity: 60,
    date: "2023-05-15",
    imageUrl: "https://images.unsplash.com/photo-1667375085698-fa3ebaf0a049?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: "7",
    category: "Security Architecture",
    level: "Advanced",
    title: "Implementing OAuth 2.0 and OIDC",
    instructor: "Jane Smith",
    rating: 4.5,
    reviews: 890,
    price: "$499.00",
    numericPrice: 499,
    popularity: 80,
    date: "2023-12-10",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1634"
  },
  {
    id: "8",
    category: "Distributed Systems",
    level: "Beginner",
    title: "Introduction to Event Streaming",
    instructor: "Alice B.",
    rating: 4.2,
    reviews: 320,
    price: "$150.00",
    numericPrice: 150,
    popularity: 50,
    date: "2024-01-25",
    imageUrl: "https://images.unsplash.com/photo-1614064010375-715bd7f818cc?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: "9",
    category: "Cloud Infrastructure",
    level: "Intermediate",
    title: "Terraform Masterclass for Production",
    instructor: "Bob M.",
    rating: 4.7,
    reviews: 1100,
    price: "$850.00",
    numericPrice: 850,
    popularity: 90,
    date: "2023-10-05",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1472"
  },
];

const CATEGORIES = ["Cloud Infrastructure", "System Design", "Security Architecture", "Distributed Systems"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = ["Popular", "Newest", "Price", "Rating"];

export const CoursesClient = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [level, setLevel] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [rating, setRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("Popular");

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
    let result = [...MOCK_COURSES];

    if (search.trim() !== "") {
      result = result.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (categories.length > 0) {
      result = result.filter(c => categories.includes(c.category));
    }
    if (level) {
      result = result.filter(c => c.level === level);
    }
    result = result.filter(c => c.numericPrice <= priceRange);
    
    if (rating > 0) {
      result = result.filter(c => c.rating >= rating);
    }

    switch (sortBy) {
      case "Popular":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case "Newest":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "Price":
        result.sort((a, b) => a.numericPrice - b.numericPrice);
        break;
      case "Rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [search, categories, level, priceRange, rating, sortBy]);

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
                className={`px-3 py-1.5 rounded-md border text-xs font-semibold tracking-wide transition-all ${
                  level === l 
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
              <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-[4px] text-[10px] tracking-widest py-0.5 px-2 font-bold shadow-sm">
                {filteredCourses.length} RESULTS
              </Badge>
            </div>
          </div>
          
          <div className="flex bg-surface/60 border border-border/50 rounded-lg p-1.5 shadow-inner shrink-0 w-max">
            {SORT_OPTIONS.map(s => (
              <button 
                key={s} 
                onClick={() => setSortBy(s)}
                className={`px-5 py-1.5 text-[11px] uppercase tracking-wider font-bold rounded-md transition-all ${
                  sortBy === s 
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
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

            {/* Pagination Mock */}
            <div className="mt-16 flex items-center justify-center gap-2">
               <button className="w-10 h-10 rounded-md border border-border/50 flex items-center justify-center text-text-primary/50 hover:bg-surface hover:text-white transition-colors bg-surface/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
               </button>
               <button className="w-10 h-10 rounded-md border border-primary bg-primary text-white font-bold flex items-center justify-center shadow-lg shadow-primary/20">
                  1
               </button>
               <button className="w-10 h-10 rounded-md border border-border/50 flex items-center justify-center text-text-primary/70 hover:bg-surface hover:text-white font-semibold transition-colors bg-surface/30">
                  2
               </button>
               <button className="w-10 h-10 rounded-md border border-border/50 flex items-center justify-center text-text-primary/70 hover:bg-surface hover:text-white font-semibold transition-colors bg-surface/30">
                  3
               </button>
               <span className="w-8 flex items-center justify-center text-text-primary/40 font-bold tracking-widest">
                  ...
               </span>
               <button className="w-10 h-10 rounded-md border border-border/50 flex items-center justify-center text-text-primary/70 hover:bg-surface hover:text-white font-semibold transition-colors bg-surface/30">
                  12
               </button>
               <button className="w-10 h-10 rounded-md border border-border/50 flex items-center justify-center text-text-primary/50 hover:bg-surface hover:text-white transition-colors bg-surface/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
               </button>
            </div>
          </>
        )}

      </main>
    </div>
  );
};
