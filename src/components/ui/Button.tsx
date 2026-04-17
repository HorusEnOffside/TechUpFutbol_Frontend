import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ loading, children, className = "", ...props }) => (
  <button
    className={`px-6 py-3 rounded-full font-semibold text-sm shadow-sm transition ${className}`}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading ? "Cargando..." : children}
  </button>
);
