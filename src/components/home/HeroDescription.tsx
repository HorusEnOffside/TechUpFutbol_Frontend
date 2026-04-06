import React from "react";

interface HeroDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroDescription({ children, className = "" }: HeroDescriptionProps) {
  return (
    <p className={`text-2xl lg:text-3xl font-bold text-white/95 ${className}`}>
      {children}
    </p>
  );
}
