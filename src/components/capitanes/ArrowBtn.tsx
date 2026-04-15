interface ArrowBtnProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}

export function ArrowBtn({ direction, onClick, disabled = false }: ArrowBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
      className="cap-arrow-btn flex items-center justify-center rounded text-white shadow-lg transition-all active:scale-90 disabled:opacity-40 hover:brightness-110"
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  );
}
