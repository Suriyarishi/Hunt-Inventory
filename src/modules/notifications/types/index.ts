export type NotificationCategory = 'Builder' | 'Hold' | 'Booking' | 'Commission' | 'Announcement';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  timestamp: string;
  isRead: boolean;
  link?: string; // Optional deep link to a specific module
}
