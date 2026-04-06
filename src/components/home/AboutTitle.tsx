import React from "react";

interface AboutTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function AboutTitle({ children, className = "", style }: AboutTitleProps) {
  return (
    <h2
      className={`text-4xl lg:text-6xl font-black text-[#071F4A] mb-6 font-montserrat ${className}`}
      style={style}
    >
      {children}
    </h2>
  );
}
export default AboutTitle;
