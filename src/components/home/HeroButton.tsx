import React from "react";

interface HeroButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export function HeroButton({ children, onClick, href, variant = "primary", className = "" }: HeroButtonProps) {
  const base = "px-8 py-4 rounded-2xl font-bold text-lg text-center flex items-center justify-center gap-2 transition-all duration-300";
  const variants = {
    primary: "bg-white text-[#071F4A] hover:bg-[#39D17D] hover:text-white shadow-2xl hover:shadow-[#39D17D]/50 hover:scale-105",
    secondary: "border-2 border-white/80 text-white hover:bg-white hover:text-[#071F4A] backdrop-blur-sm hover:scale-105"
  };
  const classes = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }
  return <button onClick={onClick} className={classes}>{children}</button>;
}
