"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export const CartButton = () => {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative hidden sm:flex text-text-primary/70 hover:text-white transition-colors" aria-label="Cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {mounted && items.length > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white leading-none shadow-sm">
            {items.length}
          </span>
        )}
      </Button>
    </Link>
  );
};
