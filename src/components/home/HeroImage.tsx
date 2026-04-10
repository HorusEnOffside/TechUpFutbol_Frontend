import React from "react";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function HeroImage({ src, alt, className = "" }: HeroImageProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-150"></div>
      <img src={src} alt={alt} className={`relative w-full max-w-sm lg:max-w-md xl:max-w-lg drop-shadow-2xl ${className}`} />
    </div>
  );
}
