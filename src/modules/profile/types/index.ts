export interface Achievement {
  id: string;
  title: string;
  icon: string; // We'll map this to a Lucide icon
  color: string;
  dateEarned: string;
}

export interface ConnectedDevice {
  id: string;
  deviceName: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  os: 'iOS' | 'Android' | 'Windows' | 'Mac';
}

export interface AuditLogEvent {
  id: string;
  action: string;
  ipAddress: string;
  timestamp: string;
  status: 'Success' | 'Failed' | 'Warning';
}
