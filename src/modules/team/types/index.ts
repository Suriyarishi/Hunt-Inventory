export type AgentStatus = 'Active' | 'Inactive' | 'Onboarding';
export type AgentTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  tier: AgentTier;
  avatarUrl: string;
  joinDate: string;
  phone: string;
  email: string;
  performance: {
    ytdRevenue: number;
    monthlyTarget: number;
    monthlyAchieved: number;
    activeLeads: number;
    conversionRate: number; // Percentage
  };
  commissionSplit: {
    agency: number; // Percentage
    agent: number; // Percentage
  };
  permissions: {
    exportLeads: boolean;
    viewAllInventory: boolean;
    manageHolds: boolean;
    issueRefunds: boolean;
  };
}
