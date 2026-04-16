import React from "react";

export interface ResumenCardProps {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  color?: string;
}

export function ResumenCard({ label, value, icon, color = "" }: ResumenCardProps) {
  return (
    <div className="flex-1 min-w-[180px] bg-white rounded-2xl p-5 flex flex-col items-center shadow border border-gray-100">
      <span className="text-gray-500 text-sm mb-2">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
        {icon}
      </div>
    </div>
  );
}
