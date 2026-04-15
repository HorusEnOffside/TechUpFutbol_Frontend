import type { ReactNode } from 'react';

interface FilterLabelProps {
  label: string;
  children: ReactNode;
}

export function FilterLabel({ label, children }: FilterLabelProps) {
  return (
    <div className="flex flex-col gap-1">
      <span style={{ fontFamily: 'Russo One, sans-serif', fontSize: 16, color: '#fff' }}>
        {label}
      </span>
      {children}
    </div>
  );
}
