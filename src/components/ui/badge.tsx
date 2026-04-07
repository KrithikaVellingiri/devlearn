import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-surface text-text-primary border border-border",
      success: "bg-green-500/15 text-green-500 border border-green-500/20",
      warning: "bg-yellow-500/15 text-yellow-500 border border-yellow-500/20",
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";
