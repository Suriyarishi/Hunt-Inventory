import type { Client, Booking, ClientDocument, ClientTimelineEvent } from '../types';

export const mockClients: Client[] = [
  {
    id: 'C-001',
    name: 'Vikram Malhotra',
    phone: '+91 98200 11223',
    email: 'vikram.m@wealthcorp.in',
    tier: 'Platinum',
    lifetimeValue: '₹8.5 Cr',
    joinDate: '2023-04-12T10:00:00Z',
    preferredLocations: ['Bandra West', 'Worli', 'Lower Parel'],
    preferredPropertyTypes: ['4BHK+', 'Penthouse'],
    budgetRange: '₹5.0 - 10.0 Cr',
    totalInvested: '₹6.2 Cr',
    roi: '+14.5%',
    riskAppetite: 'Medium'
  },
  {
    id: 'C-002',
    name: 'Ananya Singh',
    phone: '+91 98200 44556',
    email: 'ananya.s@example.com',
    tier: 'Gold',
    lifetimeValue: '₹2.8 Cr',
    joinDate: '2025-01-20T14:30:00Z',
    preferredLocations: ['Andheri West', 'Juhu'],
    preferredPropertyTypes: ['3BHK'],
    budgetRange: '₹2.5 - 4.0 Cr',
    totalInvested: '₹2.8 Cr',
    roi: '+8.2%',
    riskAppetite: 'Low'
  }
];

export const mockBookings: Record<string, Booking[]> = {
  'C-001': [
    { id: 'B-101', clientId: 'C-001', projectId: 'P-1', projectName: 'Skyline Residences', unitNumber: 'A-1402', purchasePrice: '₹4.2 Cr', bookingDate: '2023-05-15T10:00:00Z', status: 'Completed', paymentCompleted: 100 },
    { id: 'B-102', clientId: 'C-001', projectId: 'P-2', projectName: 'Zenith Towers', unitNumber: 'B-2101', purchasePrice: '₹4.3 Cr', bookingDate: '2026-02-10T11:00:00Z', status: 'Active', paymentCompleted: 35 }
  ],
  'C-002': [
    { id: 'B-103', clientId: 'C-002', projectId: 'P-3', projectName: 'Oasis Greens', unitNumber: 'C-805', purchasePrice: '₹2.8 Cr', bookingDate: '2025-02-05T09:00:00Z', status: 'Active', paymentCompleted: 80 }
  ]
};

export const mockDocuments: Record<string, ClientDocument[]> = {
  'C-001': [
    { id: 'D-1', clientId: 'C-001', title: 'Aadhaar Card', type: 'KYC', uploadDate: '2023-04-12T10:05:00Z', url: '#' },
    { id: 'D-2', clientId: 'C-001', title: 'PAN Card', type: 'KYC', uploadDate: '2023-04-12T10:05:00Z', url: '#' },
    { id: 'D-3', clientId: 'C-001', title: 'Sale Agreement - Skyline', type: 'Agreement', uploadDate: '2023-06-01T14:00:00Z', url: '#' }
  ]
};

export const mockTimeline: Record<string, ClientTimelineEvent[]> = {
  'C-001': [
    { id: 'T-1', clientId: 'C-001', title: 'Second Booking Confirmed', description: 'Booked B-2101 at Zenith Towers.', date: '2026-02-10T11:00:00Z', type: 'Milestone' },
    { id: 'T-2', clientId: 'C-001', title: 'Site Visit - Zenith Towers', description: 'Client visited the site with family. Very impressed with the amenities.', date: '2026-01-25T16:00:00Z', type: 'Site Visit' },
    { id: 'T-3', clientId: 'C-001', title: 'Portfolio Review Meeting', description: 'Discussed ROI of Skyline and upcoming pre-launches.', date: '2025-11-10T10:00:00Z', type: 'Meeting' }
  ]
};
