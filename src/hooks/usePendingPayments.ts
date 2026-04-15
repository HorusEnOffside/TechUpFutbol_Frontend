import { useEffect, useState } from 'react';
import PaymentService from '../services/payment.service';
import type { PaymentRespondDTO } from '../types/payment';

export function usePendingPayments() {
  const [payments, setPayments] = useState<PaymentRespondDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    PaymentService.getPaymentsByStatus('PENDING')
      .then((data) => setPayments(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudo cargar la lista de pagos pendientes.'))
      .finally(() => setLoading(false));
  }, []);

  return { payments, loading, error };
}
