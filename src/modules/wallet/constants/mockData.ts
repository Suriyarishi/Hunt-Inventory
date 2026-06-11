import type { WalletTransaction, CommissionBreakdown } from '../types';

export const mockTransactions: WalletTransaction[] = [
  {
    id: 'TXN-9001',
    title: 'Commission Payout',
    subtitle: 'Skyline Residences • A-1402',
    amount: 1450000,
    type: 'Commission',
    status: 'Cleared',
    date: '2026-06-01T10:00:00Z',
    isCredit: true
  },
  {
    id: 'TXN-9002',
    title: 'Q2 Volume Bonus',
    subtitle: 'Tier 2 Achieved (> ₹10Cr Sales)',
    amount: 250000,
    type: 'Bonus',
    status: 'Cleared',
    date: '2026-06-02T10:00:00Z',
    isCredit: true
  },
  {
    id: 'TXN-9003',
    title: 'Bank Withdrawal',
    subtitle: 'To HDFC Bank **** 4552',
    amount: 1000000,
    type: 'Withdrawal',
    status: 'Processing',
    date: '2026-06-04T14:30:00Z',
    isCredit: false
  },
  {
    id: 'TXN-9004',
    title: 'Commission Payout',
    subtitle: 'Zenith Towers • B-2101',
    amount: 850000,
    type: 'Commission',
    status: 'Pending',
    date: '2026-06-05T09:00:00Z',
    isCredit: true
  }
];

export const mockCommissionBreakdown: Record<string, CommissionBreakdown> = {
  'TXN-9001': {
    transactionId: 'TXN-9001',
    unitValue: 42000000, // 4.2 Cr
    basePercentage: 3.0,
    baseAmount: 1260000,
    volumeBonusPercentage: 0.5,
    volumeBonusAmount: 210000,
    grossAmount: 1470000,
    tdsPercentage: 10.0,
    tdsAmount: 147000,
    netAmount: 1323000 // Simplified for mock
  },
  'TXN-9004': {
    transactionId: 'TXN-9004',
    unitValue: 28000000, // 2.8 Cr
    basePercentage: 3.0,
    baseAmount: 840000,
    volumeBonusPercentage: 0.0,
    volumeBonusAmount: 0,
    grossAmount: 840000,
    tdsPercentage: 10.0,
    tdsAmount: 84000,
    netAmount: 756000
  }
};
