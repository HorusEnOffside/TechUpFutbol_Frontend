import React from "react";

export interface QuickActionButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}

export function QuickActionButton({ label, icon, onClick, primary = false }: QuickActionButtonProps) {
  return (
    <button
      className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl font-semibold mb-2 ${primary ? "bg-gradient-to-r from-[#144C9F] to-[#17A65B] text-white" : "bg-white border border-gray-200 text-[#144C9F]"}`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
