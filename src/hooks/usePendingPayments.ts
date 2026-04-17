import { useEffect, useState } from 'react';
import PaymentService from '../services/payment.service';
import type { PaymentRespondDTO, PaymentStatus } from '../types/payment';
import type { UUID } from '../types/common';

// Hook para obtener todos los pagos
export function useAllPayments() {
  const [payments, setPayments] = useState<PaymentRespondDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    PaymentService.getAllPayments()
      .then((data) => setPayments(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudo cargar la lista de pagos.'))
      .finally(() => setLoading(false));
  }, []);

  return { payments, loading, error };
}

// Hook para obtener pagos por estado
export function usePaymentsByStatus(status: PaymentStatus) {
  const [payments, setPayments] = useState<PaymentRespondDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    PaymentService.getPaymentsByStatus(status)
      .then((data) => setPayments(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudo cargar la lista de pagos.'))
      .finally(() => setLoading(false));
  }, [status]);

  return { payments, loading, error };
}

// Hook para obtener un pago por id
export function usePaymentById(id: UUID | null) {
  const [payment, setPayment] = useState<PaymentRespondDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setPayment(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    PaymentService.getPaymentById(id)
      .then((data) => setPayment(data))
      .catch(() => setError('No se pudo cargar el pago.'))
      .finally(() => setLoading(false));
  }, [id]);

  return { payment, loading, error };
}
