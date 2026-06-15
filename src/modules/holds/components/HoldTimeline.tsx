import { CheckCircle2, Clock, RefreshCw, Unlock, TrendingUp, IndianRupee, StickyNote } from 'lucide-react';
import type { HoldHistoryEvent } from '../types';

interface HoldTimelineProps {
  events: HoldHistoryEvent[];
}

const actionIconMap: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  created:   { icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary' },
  extended:  { icon: RefreshCw, color: 'text-purple-600', bg: 'bg-purple-500' },
  released:  { icon: Unlock, color: 'text-destructive', bg: 'bg-destructive' },
  converted: { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-500' },
  expired:   { icon: Clock, color: 'text-warning', bg: 'bg-warning' },
  token:     { icon: IndianRupee, color: 'text-primary', bg: 'bg-primary' },
  note:      { icon: StickyNote, color: 'text-muted-foreground', bg: 'bg-muted-foreground' },
};

export function HoldTimeline({ events }: HoldTimelineProps) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        No history events yet.
      </div>
    );
  }

  return (
    <div className="relative pl-5 space-y-5 before:absolute before:inset-y-0 before:left-[18px] before:w-px before:bg-border/50">
      {events.map((event, i) => {
        const config = actionIconMap[event.actionType] ?? actionIconMap.note;
        const Icon = config.icon;
        return (
          <div key={event.id ?? i} className="relative flex items-start gap-4 z-10">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 border-background ${config.bg} mt-0.5`}>
              <Icon className="w-2.5 h-2.5 text-white" />
            </div>
            <div className="flex-1 pb-1">
              <p className="text-sm font-semibold text-foreground leading-snug">{event.action}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-muted-foreground">{event.performedBy}</p>
                <span className="text-muted-foreground/50">·</span>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {event.metadata && Object.keys(event.metadata).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {Object.entries(event.metadata).map(([k, v]) => (
                    <span key={k} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full font-medium capitalize">
                      {k}: {v}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
