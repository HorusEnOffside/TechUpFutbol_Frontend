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
      className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl font-semibold mb-2 transition-all duration-150 active:scale-95 focus:outline-none cursor-pointer
        ${primary
          ? "bg-gradient-to-r from-[#144C9F] to-[#17A65B] text-white hover:brightness-110 hover:shadow-lg"
          : "bg-white border border-gray-200 text-[#144C9F] hover:bg-gray-100 hover:shadow-md"}
      `}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
