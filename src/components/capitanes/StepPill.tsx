interface StepPillProps {
  num: number;
  label: string;
  active: boolean;
}

export function StepPill({ num, label, active }: StepPillProps) {
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div
        className={`flex items-center justify-center rounded-full select-none transition-all duration-300 w-12 h-10 sm:w-16 sm:h-12 md:w-[68px] md:h-[52px] cap-step-num${active ? ' cap-step-num--active' : ''}`}
      >
        {num}
      </div>
      <span
        className={`text-[10px] sm:text-xs md:text-[16px] cap-step-label${active ? ' cap-step-label--active' : ''}`}
      >
        {label}
      </span>
    </div>
  );
}
