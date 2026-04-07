import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl tracking-tight text-text-primary flex items-center gap-1">
            <span className="text-primary font-black">Dev</span>Learn
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-text-primary/70 hover:text-text-primary transition-colors">Courses</Link>
            <Link href="#" className="text-sm font-medium text-text-primary/70 hover:text-text-primary transition-colors">Learning Paths</Link>
            <Link href="#" className="text-sm font-medium text-text-primary/70 hover:text-text-primary transition-colors">Curriculum</Link>
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

          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-4 ml-2">
                <span className="text-sm font-semibold text-text-primary/80 hidden sm:inline-block">
                  {session.user?.email}
                </span>
                <Link href="/api/auth/signout">
                  <Button variant="secondary" size="sm">Logout</Button>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/api/auth/signin">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Login</Button>
                </Link>
                <Link href="/api/auth/signin">
                  <Button variant="primary" size="sm">Signup</Button>
                </Link>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
