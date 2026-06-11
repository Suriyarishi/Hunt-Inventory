export type ClientTier = 'Silver' | 'Gold' | 'Platinum' | 'VIP';

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  tier: ClientTier;
  lifetimeValue: string; // e.g. "₹4.5 Cr"
  joinDate: string;
  
  // Preferences
  preferredLocations: string[];
  preferredPropertyTypes: string[];
  budgetRange: string;
  
  // Investment Profile
  totalInvested: string;
  roi: string;
  riskAppetite: 'Low' | 'Medium' | 'High';
}

export interface Booking {
  id: string;
  clientId: string;
  projectId: string;
  projectName: string;
  unitNumber: string;
  purchasePrice: string;
  bookingDate: string;
  status: 'Active' | 'Completed' | 'Cancelled';
  paymentCompleted: number; // percentage 0-100
}

export interface ClientDocument {
  id: string;
  clientId: string;
  title: string;
  type: 'KYC' | 'Agreement' | 'Receipt' | 'Other';
  uploadDate: string;
  url: string;
}

export interface ClientTimelineEvent {
  id: string;
  clientId: string;
  title: string;
  description: string;
  date: string;
  type: 'Meeting' | 'Site Visit' | 'Call' | 'Milestone';
}
