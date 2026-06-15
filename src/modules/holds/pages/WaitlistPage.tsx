import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Plus, ChevronRight, Star, Building2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockWaitlist } from '../constants/mockData';
import type { HoldPriority } from '../types';

const priorityColors: Record<HoldPriority, { badge: string; dot: string }> = {
  Standard: { badge: 'bg-secondary text-muted-foreground', dot: 'bg-muted-foreground' },
  High:     { badge: 'bg-warning/15 text-warning', dot: 'bg-warning' },
  VIP:      { badge: 'bg-purple-100 text-purple-700', dot: 'bg-purple-600' },
};

export default function WaitlistPage() {
  const navigate = useNavigate();
  const [showJoin, setShowJoin] = useState(false);

  // Group waitlist by unit
  const grouped = mockWaitlist.reduce<Record<string, typeof mockWaitlist>>((acc, entry) => {
    const key = `${entry.unitNumber}|${entry.projectName}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background pb-8 pt-safe">
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-md border-b border-border/50 z-10">
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="font-bold text-sm font-headings">Waitlist</h1>
          <p className="text-[11px] text-muted-foreground">{mockWaitlist.length} entries across {Object.keys(grouped).length} units</p>
        </div>
        <Button
          size="icon"
          className="rounded-full w-10 h-10 bg-primary hover:bg-primary/90"
          onClick={() => setShowJoin(true)}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="px-4 pt-5 space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Total', value: mockWaitlist.length, color: 'text-foreground' },
            { label: 'VIP', value: mockWaitlist.filter(w => w.priority === 'VIP').length, color: 'text-purple-600' },
            { label: 'Units', value: Object.keys(grouped).length, color: 'text-primary' },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-2xl p-3 text-center border border-border/50 shadow-xs">
              <p className={`text-xl font-bold font-headings ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Grouped by Unit */}
        {Object.entries(grouped).map(([key, entries]) => {
          const [unitNumber, projectName] = key.split('|');
          return (
            <div key={key}>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 flex-1">
                  <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm font-bold text-foreground">{unitNumber}</span>
                  <span className="text-xs text-muted-foreground">· {projectName}</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  {entries.length} waiting
                </span>
              </div>

              <div className="space-y-2">
                {entries.sort((a, b) => a.queuePosition - b.queuePosition).map(entry => (
                  <Card key={entry.id} className="p-3.5 rounded-card border-none shadow-xs bg-card">
                    <div className="flex items-center gap-3">
                      {/* Queue Position */}
                      <div className="w-10 h-10 rounded-full bg-secondary flex flex-col items-center justify-center shrink-0 border-2 border-border/50">
                        <span className="text-[9px] font-semibold text-muted-foreground uppercase leading-none">Pos</span>
                        <span className="font-bold text-base leading-none mt-0.5 text-foreground">{entry.queuePosition}</span>
                      </div>

                      {/* Client Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-bold text-sm text-foreground truncate">{entry.clientName}</p>
                          <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full shrink-0 ${priorityColors[entry.priority].badge}`}>
                            {entry.priority}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">via {entry.brokerName}</p>
                        <div className="flex items-center gap-1 mt-1 text-[11px] text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {new Date(entry.addedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>

                    {entry.notes && (
                      <p className="text-xs text-muted-foreground mt-2 ml-13 pl-[52px] border-t border-border/50 pt-2 leading-relaxed">
                        {entry.notes}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* Join Waitlist CTA */}
        <Button
          className="w-full h-12 rounded-button font-bold gap-2"
          onClick={() => setShowJoin(true)}
        >
          <Users className="w-4 h-4" /> Join Waitlist for a Unit
        </Button>
      </div>

      {/* Quick Join Sheet */}
      {showJoin && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-end"
          onClick={() => setShowJoin(false)}
        >
          <div
            className="bg-background w-full rounded-t-[2rem] p-6 space-y-5 animate-in slide-in-from-bottom-4 duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-border/50 mx-auto mb-2" />
            <h2 className="font-bold text-lg font-headings">Join Waitlist</h2>
            <p className="text-sm text-muted-foreground">
              Select the unit and specify your client to join the waitlist. You'll be notified when the hold is released.
            </p>
            <Button className="w-full h-12 rounded-button font-bold" onClick={() => setShowJoin(false)}>
              <Star className="w-4 h-4 mr-2" /> Add to Waitlist
            </Button>
            <Button variant="ghost" className="w-full h-10 rounded-button text-muted-foreground" onClick={() => setShowJoin(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
