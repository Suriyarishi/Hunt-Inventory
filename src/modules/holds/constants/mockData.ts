import type { UnitHold, WaitlistEntry, HoldHistoryEvent } from '../types';

export const mockHolds: UnitHold[] = [
  {
    id: 'H-001',
    unitNumber: 'A-1402',
    projectId: 'P-1',
    projectName: 'Skyline Residences',
    leadId: 'L-1002',
    leadName: 'Priya Sharma',
    brokerName: 'Mike Ross',
    holdStartDate: '2026-06-05T09:00:00Z',
    holdExpiresAt: '2026-06-06T09:00:00Z', // 24 hours from now
    status: 'Active',
    tokenPaid: true,
    tokenAmount: '₹50,000',
    extensionsUsed: 0
  },
  {
    id: 'H-002',
    unitNumber: 'B-2101',
    projectId: 'P-2',
    projectName: 'Zenith Towers',
    leadId: 'L-1004',
    leadName: 'Sneha Desai',
    brokerName: 'Harvey Specter',
    holdStartDate: '2026-06-04T10:00:00Z',
    holdExpiresAt: '2026-06-05T10:00:00Z', // Expiring very soon
    status: 'Active',
    tokenPaid: false,
    tokenAmount: '₹0',
    extensionsUsed: 1
  },
  {
    id: 'H-003',
    unitNumber: 'C-805',
    projectId: 'P-3',
    projectName: 'Oasis Greens',
    leadId: 'L-1001',
    leadName: 'Rajesh Kumar',
    brokerName: 'Sarah Jenkins',
    holdStartDate: '2026-06-03T10:00:00Z',
    holdExpiresAt: '2026-06-04T10:00:00Z', 
    status: 'Expired',
    tokenPaid: false,
    tokenAmount: '₹0',
    extensionsUsed: 0
  }
];

export const mockWaitlist: WaitlistEntry[] = [
  { id: 'W-001', unitNumber: 'A-1402', projectName: 'Skyline Residences', leadName: 'Vikram Malhotra', brokerName: 'Louis Litt', queuePosition: 1, addedAt: '2026-06-05T09:30:00Z' },
  { id: 'W-002', unitNumber: 'B-2101', projectName: 'Zenith Towers', leadName: 'Ananya Singh', brokerName: 'Rachel Zane', queuePosition: 1, addedAt: '2026-06-04T11:00:00Z' }
];

export const mockHoldHistory: Record<string, HoldHistoryEvent[]> = {
  'H-002': [
    { id: 'HH-1', holdId: 'H-002', action: 'Hold Extended (24h) by Manager Approval', performedBy: 'System', timestamp: '2026-06-04T10:00:00Z' },
    { id: 'HH-2', holdId: 'H-002', action: 'Initial Hold Created', performedBy: 'Harvey Specter', timestamp: '2026-06-03T10:00:00Z' }
  ],
  'H-001': [
    { id: 'HH-3', holdId: 'H-001', action: 'Token Received (₹50,000)', performedBy: 'Accounts', timestamp: '2026-06-05T09:15:00Z' },
    { id: 'HH-4', holdId: 'H-001', action: 'Initial Hold Created', performedBy: 'Mike Ross', timestamp: '2026-06-05T09:00:00Z' }
  ]
};
