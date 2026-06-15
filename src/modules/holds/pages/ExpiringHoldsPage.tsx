import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, ChevronRight, CalendarClock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockHolds } from '../constants/mockData';
import { HoldCountdownTimer } from '../components/HoldCountdownTimer';
import { HoldStatusBadge } from '../components/HoldStatusBadge';

export default function ExpiringHoldsPage() {
  const navigate = useNavigate();
  // Include holds expiring within 6 hours or with Expiring status
  const holds = mockHolds.filter(h => h.status === 'Expiring' || h.status === 'Extended');

  return (
    <div className="min-h-screen bg-background pb-8 pt-safe">
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-md border-b border-border/50 z-10">
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="font-bold text-sm font-headings">Expiring Soon</h1>
          <p className="text-[11px] text-muted-foreground">{holds.length} holds need attention</p>
        </div>
        <div className="w-10" />
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Urgency Banner */}
        <div className="flex items-center gap-3 p-4 bg-warning/10 border border-warning/20 rounded-2xl">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
          <p className="text-sm text-warning font-bold leading-tight">
            {holds.length} hold{holds.length !== 1 ? 's' : ''} require immediate action to avoid losing client intent.
          </p>
        </div>

        {holds.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl mb-2">✅</p>
            <p className="text-sm font-semibold text-muted-foreground">No holds expiring soon!</p>
          </div>
        ) : (
          holds.map(hold => (
            <Card
              key={hold.id}
              className="rounded-card border border-warning/20 shadow-xs overflow-hidden bg-card cursor-pointer hover:shadow-md active:scale-[0.99] transition-all"
              onClick={() => navigate(`/holds/${hold.id}`)}
            >
              {/* Urgency stripe */}
              <div className="h-1 bg-gradient-to-r from-warning to-orange-400" />
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-base text-foreground">{hold.unitNumber}</h3>
                      <HoldStatusBadge status={hold.status} size="sm" />
                    </div>
                    <p className="text-xs text-muted-foreground">{hold.projectName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{hold.clientName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{hold.unitPrice}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{hold.extensionsUsed}/{hold.maxExtensions} ext.</p>
                  </div>
                </div>

                <HoldCountdownTimer expiryDate={hold.expiryDate} size="compact" />

                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-9 rounded-button border-warning/30 text-warning hover:bg-warning/10 font-semibold text-xs gap-1.5"
                    disabled={hold.extensionsUsed >= hold.maxExtensions}
                    onClick={(e) => { e.stopPropagation(); navigate(`/holds/${hold.id}/extend`); }}
                  >
                    <CalendarClock className="w-3.5 h-3.5" /> Extend
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 h-9 rounded-button font-semibold text-xs gap-1.5"
                    onClick={(e) => { e.stopPropagation(); navigate('/bookings/new'); }}
                  >
                    <TrendingUp className="w-3.5 h-3.5" /> Convert
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-button"
                    onClick={() => navigate(`/holds/${hold.id}`)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
