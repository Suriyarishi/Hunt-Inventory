export type TransactionType = 'Commission' | 'Bonus' | 'Referral' | 'Withdrawal' | 'Tax Deduction';
export type TransactionStatus = 'Cleared' | 'Pending' | 'Processing' | 'Failed';

export interface WalletTransaction {
  id: string;
  title: string;
  subtitle: string; // e.g., "Skyline Residences - A-1402"
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  date: string;
  isCredit: boolean;
}

export interface CommissionBreakdown {
  transactionId: string;
  unitValue: number;
  basePercentage: number;
  baseAmount: number;
  volumeBonusPercentage: number;
  volumeBonusAmount: number;
  grossAmount: number;
  tdsPercentage: number;
  tdsAmount: number;
  netAmount: number;
}
