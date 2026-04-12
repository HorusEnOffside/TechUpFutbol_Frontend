import type { ReactNode } from 'react';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title = 'Sin resultados',
  description = 'No se encontraron elementos para mostrar.',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state" role="status" aria-label={title}>
      {icon && <div className="empty-state__icon" aria-hidden="true">{icon}</div>}
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
