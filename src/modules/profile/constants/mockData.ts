import type { Achievement, ConnectedDevice, AuditLogEvent } from '../types';

export const mockAchievements: Achievement[] = [
  { id: 'ACH-1', title: 'Top Closer Q1', icon: 'Trophy', color: 'bg-yellow-500/20 text-yellow-600', dateEarned: '2026-03-31T00:00:00Z' },
  { id: 'ACH-2', title: '100+ Leads', icon: 'Users', color: 'bg-primary/20 text-primary', dateEarned: '2026-05-15T00:00:00Z' },
  { id: 'ACH-3', title: 'KYC Verified', icon: 'ShieldCheck', color: 'bg-success/20 text-success', dateEarned: '2025-01-10T00:00:00Z' },
  { id: 'ACH-4', title: 'Flawless Rating', icon: 'Star', color: 'bg-orange-500/20 text-orange-600', dateEarned: '2026-06-01T00:00:00Z' }
];

export const mockDevices: ConnectedDevice[] = [
  { id: 'DEV-1', deviceName: 'iPhone 15 Pro Max', location: 'Mumbai, IN', lastActive: new Date().toISOString(), isCurrent: true, os: 'iOS' },
  { id: 'DEV-2', deviceName: 'Chrome on Windows', location: 'Pune, IN', lastActive: new Date(Date.now() - 86400000).toISOString(), isCurrent: false, os: 'Windows' },
  { id: 'DEV-3', deviceName: 'iPad Air', location: 'Delhi, IN', lastActive: new Date(Date.now() - 86400000 * 5).toISOString(), isCurrent: false, os: 'iOS' }
];

export const mockAuditLogs: AuditLogEvent[] = [
  { id: 'LOG-1', action: 'Lead Data Exported (CSV)', ipAddress: '49.36.12.88', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'Warning' },
  { id: 'LOG-2', action: 'Login Successful', ipAddress: '49.36.12.88', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), status: 'Success' },
  { id: 'LOG-3', action: 'Failed Login Attempt', ipAddress: '185.12.44.2', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), status: 'Failed' },
  { id: 'LOG-4', action: 'Wallet Withdrawal (₹14.5L)', ipAddress: '49.36.12.88', timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), status: 'Success' }
];
