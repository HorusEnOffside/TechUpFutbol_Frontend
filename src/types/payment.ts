import type { UUID } from './common';

export type PaymentStatus = 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';

export interface PaymentRespondDTO {
  id: UUID;
  status: PaymentStatus;
  description: string;
  paymentDate: string;
  urlComprobante: string;
}
