import apiClient from './api';
import type { PaymentRespondDTO, PaymentStatus } from '../types/payment';

const PaymentService = {
  /**
   * Obtener todos los pagos
   * GET /payments
   */
  getAllPayments: async (): Promise<PaymentRespondDTO[]> => {
    const response = await apiClient.get<PaymentRespondDTO[]>('/payments');
    return response.data;
  },

  /**
   * Obtener pagos por estado
   * GET /payments/{state}
   */
  getPaymentsByStatus: async (status: PaymentStatus): Promise<PaymentRespondDTO[]> => {
    const response = await apiClient.get<PaymentRespondDTO[]>(`/payments/${status}`);
    return response.data;
  },
};

export default PaymentService;
