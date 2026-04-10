import React from "react";

interface HeroTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroTitle({ children, className = "" }: HeroTitleProps) {
  return (
    <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight ${className}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {children}
    </h1>
  );
}
