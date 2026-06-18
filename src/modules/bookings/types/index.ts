// ─── Status Types ──────────────────────────────────────────────────────────────

export type BookingPipelineStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Agreement Pending'
  | 'Registered'
  | 'Completed'
  | 'Cancelled'
  // Legacy statuses kept for backward compat
  | 'Pending KYC'
  | 'Pending Payment'
  | 'Confirmed'
  | 'Rejected'
  | 'Sold';

export type VerificationStatus = 'Pending' | 'Verified' | 'Rejected' | 'Uploaded';
export type DocumentUploadStatus = 'Pending' | 'Uploaded' | 'Verified' | 'Rejected' | 'Generated';
export type AgreementStageStatus = 'Draft' | 'Sent' | 'Signed' | 'Registered';
export type RegistrationStageStatus = 'Pending' | 'Scheduled' | 'Completed';
export type ReversalReasonType = 'Buyer Request' | 'Unit Issue' | 'Price Change' | 'Documentation' | 'Other';

// ─── Core Booking ──────────────────────────────────────────────────────────────

export interface BookingApplication {
  id: string;
  bookingNumber: string;
  unitNumber: string;
  unitId: string;
  projectId: string;
  projectName: string;
  builderId?: string;
  holdId?: string;
  clientId: string;
  buyerId?: string;
  primaryApplicant: string;
  phone: string;
  email: string;
  bookingDate: string;
  status: BookingPipelineStatus;

  // Financial parameters
  tokenAmount: string;
  tokenAmountNum?: number;
  bookingAmount?: string;
  bookingAmountNum?: number;
  totalCost?: string;
  totalCostNum?: number;
  gst?: string;
  gstNum?: number;
  plc?: string;
  plcNum?: number;
  maintenance?: string;
  maintenanceNum?: number;
  parkingCharges?: string;
  parkingChargesNum?: number;
  netPayable?: string;
  netPayableNum?: number;

  // Legacy field
  totalValue: string;

  // Sub-statuses
  kycStatus: VerificationStatus;
  documentStatus: VerificationStatus;
  paymentStatus: VerificationStatus;
  builderApprovalStatus: VerificationStatus;

  // Payment info
  paymentMode: string;
  paymentReference: string;

  // Co-applicant
  hasCoApplicant?: boolean;
  coApplicantName?: string;

  // Linked records
  soldDealId?: string;
  commissionTransactionId?: string;
  agreementId?: string;
  registrationId?: string;
}

// ─── Applicant & KYC ──────────────────────────────────────────────────────────

export interface BuyerKYC {
  pan: string;
  aadhaar: string;
  dob?: string;
  nationality?: string;
  sourceOfFunds?: string;
  occupation?: string;
  annualIncome?: string;
}

export interface ApplicantData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pan: string;
  aadhaar: string;
  dob?: string;
  address?: string;
  city?: string;
  pincode?: string;
  occupation?: string;
  annualIncome?: string;
}

export interface CoApplicant {
  id?: string;
  firstName: string;
  lastName: string;
  relationship: 'Spouse' | 'Parent' | 'Sibling' | 'Child' | 'Partner' | 'Other';
  pan: string;
  aadhaar: string;
  phone?: string;
  email?: string;
}

// ─── Documents ────────────────────────────────────────────────────────────────

export interface BookingDocument {
  id: string;
  bookingId: string;
  title: string;
  type: 'KYC' | 'Token Receipt' | 'Agreement' | 'Builder Form' | 'Income Proof' | 'Photo' | 'Stamp Duty' | 'Other';
  status: DocumentUploadStatus;
  uploadedAt: string;
  fileSize?: string;
}

// ─── Audit & Timeline ─────────────────────────────────────────────────────────

export interface AuditEvent {
  id: string;
  entityType: 'Hold' | 'Booking' | 'Sold' | 'Wallet' | 'Agreement' | 'Registration';
  entityId: string;
  action: string;
  actor: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export interface BookingTimelineEvent {
  id: string;
  bookingId: string;
  step: string;
  stepKey: string;
  description: string;
  actor: string;
  timestamp: string;
  status: 'completed' | 'active' | 'pending';
  icon?: string;
}

// ─── Receipt ──────────────────────────────────────────────────────────────────

export interface BookingReceipt {
  id: string;
  bookingId: string;
  bookingNumber: string;
  receiptNumber: string;
  generatedAt: string;
  buyerName: string;
  unitNumber: string;
  projectName: string;
  lineItems: ReceiptLineItem[];
  totalNetPayable: number;
  paymentMode: string;
  paymentReference: string;
}

export interface ReceiptLineItem {
  label: string;
  amount: number;
  type: 'debit' | 'credit' | 'subtotal' | 'total';
  highlight?: boolean;
}

// ─── Agreement ────────────────────────────────────────────────────────────────

export interface AgreementRecord {
  id: string;
  bookingId: string;
  agreementNumber: string;
  status: AgreementStageStatus;
  draftedAt?: string;
  sentAt?: string;
  buyerSignedAt?: string;
  builderSignedAt?: string;
  registeredAt?: string;
  documentUrl?: string;
  stampDuty?: number;
  registrationFee?: number;
  sroOffice?: string;
}

// ─── Registration ─────────────────────────────────────────────────────────────

export interface RegistrationRecord {
  id: string;
  bookingId: string;
  agreementId: string;
  registrationNumber?: string;
  status: RegistrationStageStatus;
  scheduledDate?: string;
  completedDate?: string;
  sroOffice?: string;
  stampDuty?: number;
  registrationFee?: number;
  stampDutyPaid?: boolean;
}

// ─── Reversal ─────────────────────────────────────────────────────────────────

export interface ReversalRequest {
  id: string;
  bookingId: string;
  reason: ReversalReasonType;
  notes: string;
  requestedAt: string;
  requestedBy: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  refundAmount?: number;
  approvedAt?: string;
  rejectedReason?: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface BookingAnalytics {
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  avgTicketSize: number;
  thisMonthBookings: number;
  lastMonthBookings: number;
  conversionRate: number; // holds → bookings
  agreementPendingCount: number;
  registrationPendingCount: number;
  statusDistribution: Record<string, number>;
  monthlyTrend: MonthlyTrendItem[];
  projectBreakdown: ProjectBreakdownItem[];
  funnelData: FunnelItem[];
}

export interface MonthlyTrendItem {
  month: string;
  count: number;
  revenue: number;
}

export interface ProjectBreakdownItem {
  projectId: string;
  projectName: string;
  bookings: number;
  revenue: number;
}

export interface FunnelItem {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

// ─── Wizard Form ──────────────────────────────────────────────────────────────

export interface BookingWizardFormData {
  // EOI
  unitId: string;
  unitNumber: string;
  projectId: string;
  projectName: string;
  tokenAmount: string;
  paymentMode: string;
  paymentReference: string;
  eoiDate: string;

  // KYC
  pan: string;
  aadhaar: string;
  dob: string;
  nationality: string;
  sourceOfFunds: string;

  // Buyer Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  occupation: string;
  annualIncome: string;

  // Co-applicant
  hasCoApplicant: boolean;
  coApplicant: CoApplicant;

  // Booking details
  bookingAmount: string;
  gstPercent: string;
  plc: string;
  maintenance: string;
  parkingCharges: string;
  paymentSchedule: string;

  // Documents (file references)
  docs: Record<string, File | null>;
}
