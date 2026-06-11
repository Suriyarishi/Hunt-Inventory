export type BookingPipelineStatus = 'Pending KYC' | 'Pending Payment' | 'Under Review' | 'Confirmed' | 'Rejected';

export interface BookingApplication {
  id: string;
  unitNumber: string;
  projectId: string;
  projectName: string;
  primaryApplicant: string;
  bookingDate: string;
  status: BookingPipelineStatus;
  tokenAmount: string;
  totalValue: string;
}

export interface ApplicantData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pan: string;
  aadhaar: string;
}
