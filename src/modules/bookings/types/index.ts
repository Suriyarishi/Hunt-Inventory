export type BookingPipelineStatus = 'Pending KYC' | 'Pending Payment' | 'Under Review' | 'Confirmed' | 'Rejected' | 'Sold';
export type VerificationStatus = 'Pending' | 'Verified' | 'Rejected';

export interface BookingApplication {
  id: string;
  unitNumber: string;
  unitId: string;
  projectId: string;
  projectName: string;
  holdId?: string;
  clientId: string;
  primaryApplicant: string;
  phone: string;
  email: string;
  bookingDate: string;
  status: BookingPipelineStatus;
  tokenAmount: string;
  totalValue: string;
  kycStatus: VerificationStatus;
  documentStatus: VerificationStatus;
  paymentStatus: VerificationStatus;
  builderApprovalStatus: VerificationStatus;
  paymentMode: string;
  paymentReference: string;
  soldDealId?: string;
  commissionTransactionId?: string;
}

export interface ApplicantData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pan: string;
  aadhaar: string;
}

export interface BookingDocument {
  id: string;
  bookingId: string;
  title: string;
  type: 'KYC' | 'Token Receipt' | 'Agreement' | 'Builder Form';
  status: 'Uploaded' | 'Generated' | 'Pending';
  uploadedAt: string;
}

export interface AuditEvent {
  id: string;
  entityType: 'Hold' | 'Booking' | 'Sold' | 'Wallet';
  entityId: string;
  action: string;
  actor: string;
  timestamp: string;
  metadata?: Record<string, string>;
}
