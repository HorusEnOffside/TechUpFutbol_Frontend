import apiClient from './api';
import type { PaymentRespondDTO, PaymentStatus } from '../types/payment';


const PaymentService = {
  /**
   * Obtener todos los pagos
   * GET /api/payments
   */
  getAllPayments: async (): Promise<PaymentRespondDTO[]> => {
    const response = await apiClient.get<PaymentRespondDTO[]>('/api/payments');
    return response.data;
  },

  /**
   * Obtener pagos por estado
   * GET /api/payments/filter-by-status?status=STATUS
   */
  getPaymentsByStatus: async (status: PaymentStatus): Promise<PaymentRespondDTO[]> => {
    const response = await apiClient.get<PaymentRespondDTO[]>(`/api/payments/filter-by-status?status=${status}`);
    return response.data;
  },

  /**
   * Obtener pago por ID
   * GET /api/payments/{id}
   */
  getPaymentById: async (id: string): Promise<PaymentRespondDTO> => {
    const response = await apiClient.get<PaymentRespondDTO>(`/api/payments/${id}`);
    return response.data;
  },

  /**
   * Crear un nuevo pago
   * POST /api/payments (multipart/form-data)
   */
  createPayment: async (formData: FormData): Promise<PaymentRespondDTO> => {
    const response = await apiClient.post<PaymentRespondDTO>('/api/payments', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Actualizar estado del pago
   * PATCH /api/payments/{id}/status?status=STATUS
   */
  updatePaymentStatus: async (id: string, status: PaymentStatus): Promise<PaymentRespondDTO> => {
    const response = await apiClient.patch<PaymentRespondDTO>(`/api/payments/${id}/status?status=${status}`);
    return response.data;
  },

  /**
   * Obtener comprobante (imagen) de pago
   * GET /api/payments/{id}/voucher
   */
  getVoucher: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(`/api/payments/${id}/voucher`, { responseType: 'blob' });
    return response.data;
  },
};

export default PaymentService;
