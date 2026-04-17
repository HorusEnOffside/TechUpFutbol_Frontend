import apiClient from './api';
import type { PaymentRespondDTO, PaymentStatus } from '../types/payment';

const PaymentService = {
  /** GET /payments */
  getAllPayments: async (): Promise<PaymentRespondDTO[]> => {
    const { data } = await apiClient.get<PaymentRespondDTO[]>('/payments');
    return data;
  },

  /** GET /payments/filter-by-status?status=STATUS */
  getPaymentsByStatus: async (status: PaymentStatus): Promise<PaymentRespondDTO[]> => {
    const { data } = await apiClient.get<PaymentRespondDTO[]>('/payments/filter-by-status', {
      params: { status },
    });
    return data;
  },

  /** GET /payments/{id} */
  getPaymentById: async (id: string): Promise<PaymentRespondDTO> => {
    const { data } = await apiClient.get<PaymentRespondDTO>(`/payments/${id}`);
    return data;
  },

  /**
   * POST /payments — multipart/form-data
   * No se pone Content-Type manual; axios lo establece con el boundary correcto.
   */
  createPayment: async (formData: FormData): Promise<PaymentRespondDTO> => {
    const { data } = await apiClient.post<PaymentRespondDTO>('/payments', formData);
    return data;
  },

  /** PATCH /payments/{id}/status?status=STATUS */
  updatePaymentStatus: async (id: string, status: PaymentStatus): Promise<PaymentRespondDTO> => {
    const { data } = await apiClient.patch<PaymentRespondDTO>(`/payments/${id}/status`, null, {
      params: { status },
    });
    return data;
  },

  /** GET /payments/{id}/voucher — devuelve el blob de la imagen */
  getVoucher: async (id: string): Promise<Blob> => {
    const { data } = await apiClient.get(`/payments/${id}/voucher`, { responseType: 'blob' });
    return data;
  },

  /** DELETE /payments/{id} */
  deletePayment: async (id: string): Promise<void> => {
    await apiClient.delete(`/payments/${id}`);
  },
};

export default PaymentService;
