import type { BookingApplication } from '../types';

export const mockBookings: BookingApplication[] = [
  {
    id: 'B-001',
    unitNumber: 'A-1402',
    projectId: 'P-1',
    projectName: 'Skyline Residences',
    primaryApplicant: 'Vikram Malhotra',
    bookingDate: '2026-06-05T10:00:00Z',
    status: 'Pending KYC',
    tokenAmount: '₹5,00,000',
    totalValue: '₹4.2 Cr'
  },
  {
    id: 'B-002',
    unitNumber: 'B-2101',
    projectId: 'P-2',
    projectName: 'Zenith Towers',
    primaryApplicant: 'Ananya Singh',
    bookingDate: '2026-06-04T14:30:00Z',
    status: 'Under Review',
    tokenAmount: '₹2,00,000',
    totalValue: '₹4.3 Cr'
  },
  {
    id: 'B-003',
    unitNumber: 'C-805',
    projectId: 'P-3',
    projectName: 'Oasis Greens',
    primaryApplicant: 'Rajesh Kumar',
    bookingDate: '2026-05-20T09:00:00Z',
    status: 'Confirmed',
    tokenAmount: '₹5,00,000',
    totalValue: '₹2.8 Cr'
  }
];
