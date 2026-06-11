import type { SiteVisit, VisitChecklistItem } from '../types';

export const mockVisits: SiteVisit[] = [
  {
    id: 'V-001',
    leadId: 'L-1002',
    leadName: 'Priya Sharma',
    projectId: 'P-1',
    projectName: 'Skyline Residences',
    date: '2026-06-05',
    time: '14:30',
    status: 'Scheduled',
    assignedTo: 'Mike Ross',
    location: 'Skyline Sales Gallery, Andheri West'
  },
  {
    id: 'V-002',
    leadId: 'L-1004',
    leadName: 'Sneha Desai',
    projectId: 'P-2',
    projectName: 'Zenith Towers',
    date: '2026-06-05',
    time: '16:00',
    status: 'Scheduled',
    assignedTo: 'Harvey Specter',
    location: 'Zenith Site Office, Worli'
  },
  {
    id: 'V-003',
    leadId: 'L-1001',
    leadName: 'Rajesh Kumar',
    projectId: 'P-3',
    projectName: 'Oasis Greens',
    date: '2026-06-06',
    time: '11:00',
    status: 'Scheduled',
    assignedTo: 'Sarah Jenkins',
    location: 'Oasis Show Flat, Bandra'
  }
];

export const mockChecklist: VisitChecklistItem[] = [
  { id: 'C-1', task: 'Greet client & offer refreshments', isCompleted: false },
  { id: 'C-2', task: 'Present project overview & master plan', isCompleted: false },
  { id: 'C-3', task: 'Conduct show flat tour', isCompleted: false },
  { id: 'C-4', task: 'Explain payment plans & ROI', isCompleted: false },
  { id: 'C-5', task: 'Handover physical brochure', isCompleted: false }
];
