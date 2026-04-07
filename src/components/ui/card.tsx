import React from "react";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-xl border border-border bg-surface text-text-primary shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";
