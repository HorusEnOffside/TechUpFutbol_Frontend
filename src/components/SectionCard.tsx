import React from "react";

export function SectionCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mb-8 p-6 rounded-2xl bg-white/10 border border-[#144C9F]/30 shadow">
      <h3 className="font-bold text-lg mb-4 text-[#144C9F]">{title}</h3>
      {children}
    </div>
  );
}
