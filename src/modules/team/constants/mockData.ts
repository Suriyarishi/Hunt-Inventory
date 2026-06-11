import type { TeamMember } from '../types';

export const mockTeam: TeamMember[] = [
  {
    id: 'AGT-001',
    name: 'Rohan Sharma',
    role: 'Senior Sub-Broker',
    status: 'Active',
    tier: 'Platinum',
    avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rohan',
    joinDate: '2023-01-15T00:00:00Z',
    phone: '+91 98765 43210',
    email: 'rohan.s@huntinventory.com',
    performance: {
      ytdRevenue: 125000000, // 12.5 Cr
      monthlyTarget: 15000000, // 1.5 Cr
      monthlyAchieved: 18000000, // 1.8 Cr
      activeLeads: 42,
      conversionRate: 8.5
    },
    commissionSplit: {
      agency: 40,
      agent: 60
    },
    permissions: {
      exportLeads: true,
      viewAllInventory: true,
      manageHolds: true,
      issueRefunds: false
    }
  },
  {
    id: 'AGT-002',
    name: 'Priya Patel',
    role: 'Property Consultant',
    status: 'Active',
    tier: 'Gold',
    avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya',
    joinDate: '2024-03-10T00:00:00Z',
    phone: '+91 91234 56789',
    email: 'priya.p@huntinventory.com',
    performance: {
      ytdRevenue: 65000000, // 6.5 Cr
      monthlyTarget: 10000000, // 1.0 Cr
      monthlyAchieved: 8500000, // 85 L
      activeLeads: 28,
      conversionRate: 5.2
    },
    commissionSplit: {
      agency: 50,
      agent: 50
    },
    permissions: {
      exportLeads: false,
      viewAllInventory: true,
      manageHolds: true,
      issueRefunds: false
    }
  },
  {
    id: 'AGT-003',
    name: 'Amit Verma',
    role: 'Trainee Agent',
    status: 'Onboarding',
    tier: 'Bronze',
    avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Amit',
    joinDate: '2026-05-20T00:00:00Z',
    phone: '+91 99887 76655',
    email: 'amit.v@huntinventory.com',
    performance: {
      ytdRevenue: 0,
      monthlyTarget: 2000000, // 20 L
      monthlyAchieved: 0,
      activeLeads: 12,
      conversionRate: 0
    },
    commissionSplit: {
      agency: 70,
      agent: 30
    },
    permissions: {
      exportLeads: false,
      viewAllInventory: false,
      manageHolds: false,
      issueRefunds: false
    }
  }
];
