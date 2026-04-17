import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block mb-1 text-white/80">{label}</label>}
      <input
        ref={ref}
        className={`w-full rounded px-3 py-2 bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-[#39D17D]/30 focus:border-[#39D17D]/30 transition ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && <div className="text-red-400 text-xs mt-1">{error}</div>}
    </div>
  )
);
Input.displayName = "Input";
