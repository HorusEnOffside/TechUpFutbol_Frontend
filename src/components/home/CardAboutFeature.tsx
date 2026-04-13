import React from "react";

interface CardAboutFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  borderColor?: string;
  hoverColor?: string;
  iconBg?: string;
  className?: string;
}

export function CardAboutFeature({
  icon,
  title,
  description,
  borderColor = "border-gray-100",
  hoverColor = "hover:border-[#17A65B]",
  iconBg = "bg-gradient-to-br from-[#39D17D] to-[#17A65B]",
  className = "",
}: CardAboutFeatureProps) {
  return (
    <div
      className={`group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border-2 ${borderColor} ${hoverColor} hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16" style={{background: iconBg.includes('bg-') ? undefined : iconBg, backgroundBlendMode: 'multiply'}}></div>
      <div className="relative">
        <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-[#071F4A] mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default CardAboutFeature;
