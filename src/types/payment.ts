export type PaymentStatus = 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';

export interface PaymentRespondDTO {
  id: string;
  status: PaymentStatus;
  description: string;
  paymentDate: string; // ISO string
  urlComprobante: string;
}
