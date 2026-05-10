import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { CartButton } from "./cart-button";
import { Settings } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

function UserInitialAvatar({ email }: { email: string }) {
  const initial = (email?.[0] || "U").toUpperCase();
  return (
    <div
      className="h-8 w-8 rounded-full bg-[#5A4AF4] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(90,74,244,0.3)]"
      aria-label={`Avatar for ${email}`}
    >
      <span className="text-xs font-bold text-white leading-none">{initial}</span>
    </div>
  );
}

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
            <Link href="/learning-path" className="text-sm font-medium text-text-primary/70 hover:text-text-primary transition-colors">Learning Paths</Link>
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
              <div className="flex items-center gap-3 ml-2">
                <Link
                  href="/settings"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-primary/50 hover:text-text-primary hover:bg-surface/50 transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-2">
                  <UserInitialAvatar email={session.user?.email || ""} />
                  <span className="text-sm font-semibold text-text-primary/80 hidden sm:inline-block max-w-[140px] truncate">
                    {session.user?.email}
                  </span>
                </div>
                <Link href="/auth/signout">
                  <Button variant="secondary" size="sm">Logout</Button>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Login</Button>
                </Link>
                <Link href="/auth/signin">
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
