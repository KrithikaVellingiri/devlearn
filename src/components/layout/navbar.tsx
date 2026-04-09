import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { CartButton } from "./cart-button";
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
            <Link href="/courses" className="text-sm font-medium text-text-primary/70 hover:text-text-primary transition-colors">Courses</Link>
            <Link href="#" className="text-sm font-medium text-text-primary/70 hover:text-text-primary transition-colors">Learning Paths</Link>
            <Link href="/dashboard" className="text-sm font-medium text-text-primary/70 hover:text-text-primary transition-colors">Curriculum</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block w-64">
             <SearchBar />
          </div>
          
          <CartButton />

          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-4 ml-2">
                <div className="flex items-center gap-2">
                  <img 
                    src="https://i.pravatar.cc/100" 
                    alt="User avatar" 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-text-primary/80 hidden sm:inline-block">
                    {session.user?.email}
                  </span>
                </div>
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
