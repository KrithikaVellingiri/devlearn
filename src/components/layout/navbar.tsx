import React from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-8">
          <a href="/" className="font-bold text-xl tracking-tight text-text-primary flex items-center gap-1">
            <span className="text-primary font-black">Dev</span>Learn
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-text-primary/70 hover:text-text-primary transition-colors">Courses</a>
            <a href="#" className="text-sm font-medium text-text-primary/70 hover:text-text-primary transition-colors">Learning Paths</a>
            <a href="#" className="text-sm font-medium text-text-primary/70 hover:text-text-primary transition-colors">Curriculum</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block w-64">
             <SearchBar />
          </div>
          
          <Button variant="ghost" size="icon" className="relative hidden sm:flex text-text-primary/70 hover:text-text-primary" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full"></span>
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button variant="primary" size="sm">Get Started</Button>
          </div>
        </div>

      </div>
    </header>
  );
};
