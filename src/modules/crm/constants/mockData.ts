import type { Lead, LeadActivity, LeadFollowup } from '../types';

export const mockLeads: Lead[] = [
  {
    id: 'L-1001',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.k@example.com',
    stage: 'New',
    score: 85,
    budget: '₹1.5 - 2.0 Cr',
    preferredLocations: ['Andheri West', 'Bandra'],
    assignedTo: 'Sarah Jenkins',
    createdAt: '2026-06-01T10:00:00Z',
    lastContactedAt: '2026-06-04T14:30:00Z',
  },
  {
    id: 'L-1002',
    name: 'Priya Sharma',
    phone: '+91 98765 43211',
    email: 'priya.s@example.com',
    stage: 'Site Visit',
    score: 92,
    budget: '₹2.5 - 3.0 Cr',
    preferredLocations: ['South Mumbai'],
    assignedTo: 'Mike Ross',
    createdAt: '2026-05-28T09:15:00Z',
    lastContactedAt: '2026-06-05T11:00:00Z',
  },
  {
    id: 'L-1003',
    name: 'Amit Patel',
    phone: '+91 98765 43212',
    email: 'amit.p@example.com',
    stage: 'Contacted',
    score: 45,
    budget: '₹80L - 1.2 Cr',
    preferredLocations: ['Thane', 'Mulund'],
    assignedTo: 'Sarah Jenkins',
    createdAt: '2026-06-03T16:45:00Z',
    lastContactedAt: '2026-06-03T17:00:00Z',
  },
  {
    id: 'L-1004',
    name: 'Sneha Desai',
    phone: '+91 98765 43213',
    email: 'sneha.d@example.com',
    stage: 'Negotiation',
    score: 98,
    budget: '₹4.0 - 5.0 Cr',
    preferredLocations: ['Juhu', 'Worli'],
    assignedTo: 'Harvey Specter',
    createdAt: '2026-05-15T10:00:00Z',
    lastContactedAt: '2026-06-05T09:30:00Z',
  }
];

export const mockActivities: Record<string, LeadActivity[]> = {
  'L-1001': [
    { id: 'A-1', leadId: 'L-1001', type: 'Call', title: 'Initial Discovery Call', description: 'Discussed budget and preferred locations. Client is looking for a 3BHK ready to move.', timestamp: '2026-06-04T14:30:00Z', performedBy: 'Sarah Jenkins' },
    { id: 'A-2', leadId: 'L-1001', type: 'Status Change', title: 'Lead Stage Updated', description: 'Moved from Unassigned to New', timestamp: '2026-06-01T10:05:00Z', performedBy: 'System' }
  ],
  'L-1002': [
    { id: 'A-3', leadId: 'L-1002', type: 'Site Visit', title: 'Skyline Residences Visit', description: 'Client loved the 4BHK show flat. Expressed concern over maintenance charges.', timestamp: '2026-06-05T11:00:00Z', performedBy: 'Mike Ross' },
    { id: 'A-4', leadId: 'L-1002', type: 'Email', title: 'Sent Project Brochure', description: 'Emailed Skyline Residences digital brochure and pricing sheet.', timestamp: '2026-06-01T09:30:00Z', performedBy: 'Mike Ross' }
  ]
};

export const mockFollowups: Record<string, LeadFollowup[]> = {
  'L-1001': [
    { id: 'F-1', leadId: 'L-1001', title: 'Send curated property list for Andheri', dueDate: '2026-06-06T10:00:00Z', completed: false }
  ],
  'L-1002': [
    { id: 'F-2', leadId: 'L-1002', title: 'Follow up on maintenance charge negotiation', dueDate: '2026-06-07T14:00:00Z', completed: false },
    { id: 'F-3', leadId: 'L-1002', title: 'Schedule 2nd site visit with spouse', dueDate: '2026-06-05T18:00:00Z', completed: true }
  ]
};
