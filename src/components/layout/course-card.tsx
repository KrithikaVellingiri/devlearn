"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { toast } from "sonner";
import { formatPrice } from "@/lib/formatters";

interface CourseCardProps {
  id?: string;
  category: string;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  price: string | number;
  imageUrl: string;
  enrolled?: boolean;
  totalLessons?: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  category,
  title,
  instructor,
  rating,
  reviews,
  price,
  imageUrl,
  enrolled,
  totalLessons = 1,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const safeTitle = title || "Untitled Course";
  const safeInstructor = instructor || "Unknown Instructor";
  const safeCategory = category || "General";
  const safeRating = rating ?? 0;
  const safeReviews = reviews ?? 0;
  const numericPrice = typeof price === 'string' ? (parseFloat(price.replace(/[^0-9.]/g, "")) || 0) : (price || 0);
  const formattedPrice = numericPrice > 0 ? formatPrice(numericPrice) : "Free";
  const safeImage = imageUrl || "/placeholder.jpg";

  const itemId = id || safeTitle.replace(/\s+/g, '-').toLowerCase();
  
  const destination = enrolled && totalLessons > 0 ? `/courses/${itemId}/learn` : `/courses/${itemId}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const items = useCartStore.getState().items;
    const isAlreadyInCart = items.some(i => i.id === itemId);

    if (enrolled) {
      toast("Already enrolled", {
        description: "You already own this course.",
      });
      return;
    }

    if (isAlreadyInCart) {
      toast("Already in cart", {
        description: "This course is already in your archive.",
      });
      return;
    }
    
    addToCart({
      id: itemId,
      title: safeTitle,
      price: numericPrice,
      image: safeImage,
      instructor: safeInstructor
    });

    toast.success("Added to cart");
  };

  return (
    <Link href={destination} className="block h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
      <Card className="bg-surface border-border/50 shadow-none group h-full overflow-hidden flex flex-col hover:border-primary/50 hover:bg-surface-light transition-colors">
        <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="default">{safeCategory}</Badge>
        </div>
        {safeImage ? (
            <img 
              src={safeImage} 
              alt={safeTitle} 
              className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.jpg'; }}
            />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-surface to-background flex items-center justify-center">
            <span className="text-text-secondary text-sm font-bold tracking-widest uppercase">No Image</span>
          </div>
        )}
      </div>
      
      <CardContent className="flex flex-col flex-grow p-5 space-y-4">
        <div>
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight">{safeTitle}</h3>
          <p className="text-sm text-text-secondary mt-1">By {safeInstructor}</p>
        </div>
        
        <div className="flex items-center space-x-1.5 text-sm">
          <span className="text-yellow-500">★</span>
          <span className="font-medium">{safeRating}</span>
          <span className="text-text-secondary">({safeReviews})</span>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <span className="font-bold text-lg">{formattedPrice}</span>
          <Button variant="ghost" size="icon" aria-label="Add to cart" onClick={handleAddToCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </Button>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};
