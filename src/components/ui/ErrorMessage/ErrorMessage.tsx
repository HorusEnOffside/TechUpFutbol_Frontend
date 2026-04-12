import type { AppError } from '../../../types/api.types';

export interface ErrorMessageProps {
  error: AppError | string | null;
  onRetry?: () => void;
}

function resolveMessage(error: AppError | string | null): string {
  if (!error) return '';
  if (typeof error === 'string') return error;
  return error.message;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const message = resolveMessage(error);

  if (!message) return null;

  return (
    <div className="error-message" role="alert" aria-live="assertive">
      <span className="error-message__icon" aria-hidden="true">⚠</span>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button type="button" className="error-message__retry btn btn-ghost btn-sm" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
