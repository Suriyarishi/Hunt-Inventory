import type { HoldStatus } from '../types';

interface HoldStatusBadgeProps {
  status: HoldStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<HoldStatus, { label: string; className: string }> = {
  Created:   { label: 'Created',   className: 'bg-blue-100 text-blue-700' },
  Active:    { label: 'Active',    className: 'bg-primary/10 text-primary' },
  Expiring:  { label: 'Expiring',  className: 'bg-warning/15 text-warning' },
  Extended:  { label: 'Extended',  className: 'bg-purple-100 text-purple-700' },
  Released:  { label: 'Released',  className: 'bg-secondary text-muted-foreground' },
  Converted: { label: 'Converted', className: 'bg-emerald-100 text-emerald-700' },
};

export function HoldStatusBadge({ status, size = 'md' }: HoldStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1 font-semibold rounded-full border-none ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'} ${config.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-primary animate-pulse' : status === 'Expiring' ? 'bg-warning animate-pulse' : 'bg-current opacity-60'}`} />
      {config.label}
    </span>
  );
}
