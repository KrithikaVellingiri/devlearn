import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  category: string;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  price: string;
  imageUrl: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  category,
  title,
  instructor,
  rating,
  reviews,
  price,
  imageUrl,
}) => {
  return (
    <Card className="group overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
      <div className="relative aspect-video w-full overflow-hidden bg-background">
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="default">{category}</Badge>
        </div>
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <CardContent className="flex flex-col flex-grow p-5 space-y-4">
        <div>
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight">{title}</h3>
          <p className="text-sm text-text-primary/70 mt-1">By {instructor}</p>
        </div>
        
        <div className="flex items-center space-x-1.5 text-sm">
          <span className="text-yellow-500">★</span>
          <span className="font-medium">{rating}</span>
          <span className="text-text-primary/50">({reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <span className="font-bold text-lg">{price}</span>
          <Button variant="ghost" size="icon" aria-label="Add to cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
