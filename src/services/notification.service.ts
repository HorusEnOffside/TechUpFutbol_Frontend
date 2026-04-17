import apiClient from './api';
import type { UUID } from '../types/common';

export type NotificationType =
  | 'WELCOME'
  | 'INVITATION'
  | 'MATCH_REMINDER'
  | 'PAYMENT_UPLOADED';

export interface NotificationDTO {
  id: UUID;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string; // ISO datetime
}

const NotificationService = {
  /** GET /notifications/{userId} — lista de notificaciones del usuario */
  getNotifications: async (userId: UUID): Promise<NotificationDTO[]> => {
    const { data } = await apiClient.get<NotificationDTO[]>(`/notifications/${userId}`);
    return data;
  },

  /** GET /notifications/has/{userId} — true si hay notificaciones no leídas */
  hasUnread: async (userId: UUID): Promise<boolean> => {
    const { data } = await apiClient.get<boolean>(`/notifications/has/${userId}`);
    return data;
  },

  /** PATCH /notifications/{id}/read — marca una notificación como leída */
  markAsRead: async (id: UUID): Promise<void> => {
    await apiClient.patch(`/notifications/${id}/read`);
  },
};

export default NotificationService;
