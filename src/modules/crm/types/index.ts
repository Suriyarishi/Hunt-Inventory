export type LeadStage = 'New' | 'Contacted' | 'Site Visit' | 'Negotiation' | 'Won' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  stage: LeadStage;
  score: number; // 0 - 100
  budget: string;
  preferredLocations: string[];
  assignedTo: string;
  createdAt: string;
  lastContactedAt: string;
}

export type ActivityType = 'Call' | 'Email' | 'Meeting' | 'Site Visit' | 'Note' | 'Status Change';

export interface LeadActivity {
  id: string;
  leadId: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  performedBy: string;
}

export interface LeadFollowup {
  id: string;
  leadId: string;
  title: string;
  dueDate: string;
  completed: boolean;
}
