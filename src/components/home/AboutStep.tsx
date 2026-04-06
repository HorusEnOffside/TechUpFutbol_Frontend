import React from "react";

interface AboutStepProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

export function AboutStep({ number, title, description, className = "" }: AboutStepProps) {
  return (
    <div className={`flex items-start gap-3 mb-3 ${className}`}>
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <div className="font-semibold text-white">{title}</div>
        <div className="text-white/80 text-sm">{description}</div>
      </div>
    </div>
  );
}
export default AboutStep;
