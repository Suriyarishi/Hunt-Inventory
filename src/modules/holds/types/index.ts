export type HoldStatus = 'Created' | 'Active' | 'Expiring' | 'Extended' | 'Released' | 'Converted';
export type HoldPriority = 'Standard' | 'High' | 'VIP';
export type HoldDuration = 24 | 48 | 72;

export interface UnitHold {
  id: string;           // Hold ID
  unitId: string;       // Unit ID
  unitNumber: string;
  projectId: string;    // Project ID
  projectName: string;
  builderId: string;    // Builder ID
  builderName: string;
  clientId: string;     // Client ID
  clientName: string;
  clientPhone: string;
  userId: string;       // User ID (broker/agent who created)
  brokerName: string;
  holdDuration: HoldDuration; // Hold Duration in hours
  createdDate: string;  // Created Date
  expiryDate: string;   // Expiry Date
  status: HoldStatus;
  priority: HoldPriority;
  remarks: string;
  tokenPaid: boolean;
  tokenAmount: string;
  extensionsUsed: number;
  maxExtensions: number;
  unitPrice: string;
  unitConfig: string;   // e.g., "3 BHK"
  floorNumber: number;
  towerName: string;
}

export interface WaitlistEntry {
  id: string;
  holdId?: string;
  unitId: string;
  unitNumber: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  brokerName: string;
  priority: HoldPriority;
  queuePosition: number;
  addedAt: string;
  notes: string;
}

export interface HoldHistoryEvent {
  id: string;
  holdId: string;
  action: string;
  actionType: 'created' | 'extended' | 'released' | 'converted' | 'expired' | 'token' | 'note';
  performedBy: string;
  performedById: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export interface HoldNotification {
  id: string;
  holdId: string;
  type: 'expiring' | 'extended' | 'released' | 'converted' | 'waitlist' | 'new';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  urgency: 'low' | 'medium' | 'high';
  unitNumber: string;
  projectName: string;
}

export interface HoldAnalytics {
  totalHolds: number;
  activeHolds: number;
  expiringHolds: number;
  convertedHolds: number;
  releasedHolds: number;
  avgHoldDuration: number;
  conversionRate: number;
  extensionRate: number;
  waitlistCount: number;
  topProject: string;
  revenueAtRisk: string;
  thisWeekHolds: number;
  lastWeekHolds: number;
}

export interface CreateHoldFormData {
  unitId: string;
  unitNumber: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  holdDuration: HoldDuration;
  priority: HoldPriority;
  remarks: string;
  tokenPaid: boolean;
  tokenAmount: string;
}
