import { useNavigate } from 'react-router-dom';
import { Building2, User, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { UnitHold } from '../types';
import { HoldStatusBadge } from './HoldStatusBadge';
import { HoldCountdownTimer } from './HoldCountdownTimer';

interface HoldCardProps {
  hold: UnitHold;
  compact?: boolean;
}

export function HoldCard({ hold, compact = false }: HoldCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="p-4 rounded-card border-none shadow-xs hover:shadow-md active:scale-[0.99] transition-all cursor-pointer bg-card"
      onClick={() => navigate(`/holds/${hold.id}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-bold text-foreground text-base leading-none">{hold.unitNumber}</h3>
            <span className="text-[10px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{hold.unitConfig}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Building2 className="w-3 h-3 shrink-0" />
            <span className="truncate">{hold.projectName}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0 ml-2">
          <HoldStatusBadge status={hold.status} size="sm" />
          {hold.priority === 'VIP' && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">VIP</span>
          )}
        </div>
      </div>

      {/* Timer — only for active/expiring/extended */}
      {(hold.status === 'Active' || hold.status === 'Expiring' || hold.status === 'Extended') && !compact && (
        <div className="mb-3">
          <HoldCountdownTimer expiryDate={hold.expiryDate} size="compact" />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground leading-none">{hold.clientName}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{hold.unitPrice}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </Card>
  );
}
