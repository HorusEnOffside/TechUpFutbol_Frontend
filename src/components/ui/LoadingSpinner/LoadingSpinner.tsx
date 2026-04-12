export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  fullScreen?: boolean;
}

const sizeMap = { sm: 20, md: 36, lg: 56 };

export function LoadingSpinner({
  size = 'md',
  label = 'Cargando...',
  fullScreen = false,
}: LoadingSpinnerProps) {
  const px = sizeMap[size];

  const spinner = (
    <div className="spinner-container" role="status" aria-label={label}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        className="spinner-svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="10"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="spinner-overlay" aria-live="polite">
        {spinner}
      </div>
    );
  }

  return spinner;
}
