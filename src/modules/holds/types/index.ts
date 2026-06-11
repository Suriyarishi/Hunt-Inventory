export type HoldStatus = 'Active' | 'Expired' | 'Converted' | 'Released';

export interface UnitHold {
  id: string;
  unitNumber: string;
  projectId: string;
  projectName: string;
  leadId: string;
  leadName: string;
  brokerName: string;
  holdStartDate: string;
  holdExpiresAt: string;
  status: HoldStatus;
  tokenPaid: boolean;
  tokenAmount: string;
  extensionsUsed: number;
}

export interface WaitlistEntry {
  id: string;
  unitNumber: string;
  projectName: string;
  leadName: string;
  brokerName: string;
  queuePosition: number;
  addedAt: string;
}

export interface HoldHistoryEvent {
  id: string;
  holdId: string;
  action: string;
  performedBy: string;
  timestamp: string;
}
