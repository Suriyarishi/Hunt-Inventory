import type { NotificationItem } from '../types';

export const mockNotifications: NotificationItem[] = [
  {
    id: 'NOT-001',
    title: 'Hold Expiring Soon',
    message: 'Your hold on Skyline Residences A-1402 expires in 1 hour.',
    category: 'Hold',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    isRead: false,
    link: '/holds/H-001'
  },
  {
    id: 'NOT-002',
    title: 'Commission Credited',
    message: '₹14,50,000 has been credited to your wallet for Zenith Towers B-2101.',
    category: 'Commission',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isRead: false,
    link: '/wallet'
  },
  {
    id: 'NOT-003',
    title: 'Price Revision Alert',
    message: 'Oasis Greens has announced a 5% price increase effective next Monday.',
    category: 'Builder',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: true,
    link: '/inventory/project/P-3'
  },
  {
    id: 'NOT-004',
    title: 'Booking Confirmed',
    message: 'KYC verified and booking confirmed for Rajesh Kumar.',
    category: 'Booking',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    isRead: true,
    link: '/bookings'
  },
  {
    id: 'NOT-005',
    title: 'System Maintenance',
    message: 'Hunt Inventory will be down for scheduled maintenance on Sunday at 2 AM.',
    category: 'Announcement',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    isRead: true
  }
];
