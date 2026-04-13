import React from "react";

interface AboutDescriptionProps {
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
}

export function AboutDescription({ children, className = "", textClassName = "text-base md:text-lg text-white/80" }: AboutDescriptionProps) {
  return (
    <p className={`${textClassName} mb-4 ${className}`}>
      {children}
    </p>
  );
}
export default AboutDescription;
