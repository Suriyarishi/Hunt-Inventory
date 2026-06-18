export type SoldPaymentStatus = 'Paid' | 'Partial' | 'Pending' | 'Refund Requested';
export type SoldDocumentStatus = 'Complete' | 'Pending' | 'Needs Review';
export type CommissionStatus = 'Pending' | 'Credited' | 'Withdrawable' | 'Disputed';

export interface SoldDeal {
  id: string;
  bookingId: string;
  holdId?: string;
  unitId: string;
  unitNumber: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  agentId: string;
  agentName: string;
  builderId: string;
  builderName: string;
  soldDate: string;
  agreementValue: string;
  tokenAmount: string;
  commissionAmount: string;
  commissionStatus: CommissionStatus;
  paymentStatus: SoldPaymentStatus;
  documentStatus: SoldDocumentStatus;
  paymentMode: string;
  paymentReference: string;
  type: string;
  tag?: string;
  walletTransactionId?: string;
}
