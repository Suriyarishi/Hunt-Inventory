export type VisitStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Rescheduled' | 'Cancelled' | 'No Show';

export interface SiteVisit {
  id: string;
  leadId: string;
  leadName: string;
  projectId: string;
  projectName: string;
  date: string;
  time: string;
  status: VisitStatus;
  assignedTo: string;
  location: string;
}

export interface VisitChecklistItem {
  id: string;
  task: string;
  isCompleted: boolean;
}

export interface VisitFeedback {
  visitId: string;
  clientSentiment: 'Positive' | 'Neutral' | 'Negative';
  budgetConfirmed: boolean;
  notes: string;
  nextSteps: string;
}
