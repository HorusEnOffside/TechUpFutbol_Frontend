import React from "react";

interface AboutTournamentInfoProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}

export function AboutTournamentInfo({ label, value, icon, className = "" }: AboutTournamentInfoProps) {
  return (
    <div className={`flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2 mb-2 ${className}`}>
      {icon && <span className="text-green-400">{icon}</span>}
      <span className="font-medium text-white/90 mr-2">{label}:</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}
export default AboutTournamentInfo;
