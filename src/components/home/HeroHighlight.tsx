import React from "react";

interface HeroHighlightProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

export function HeroHighlight({ text, icon, className = "" }: HeroHighlightProps) {
  return (
    <div
      className={`inline-flex w-auto bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2.5 rounded-full text-sm font-bold items-center gap-2 ${className}`}
      style={{ width: 'fit-content', maxWidth: '100%' }}
    >
      {icon}
      <span className="truncate">{text}</span>
    </div>
  );
}
