import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, Clock, ChevronRight, Plus, XCircle } from 'lucide-react';
import { mockHolds, mockWaitlist } from '../../holds/constants/mockData';
import { CreateHoldSheet } from '../../holds/components/CreateHoldSheet';

export function HoldsTab() {
  const [createOpen, setCreateOpen] = useState(false);
  const [holdsList, setHoldsList] = useState(mockHolds);

  const activeHolds = holdsList.filter(h => h.status === 'Active');

  const releaseHold = (id: string) => {
    setHoldsList(holdsList.map(h => 
      h.id === id ? { ...h, status: 'Released' } : h
    ));
  };

  return (
    <div className="space-y-6 animate-slide-up-fade">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Active Holds</p>
          <p className="text-2xl font-bold text-foreground">{activeHolds.length}</p>
        </Card>
        <Card className="p-4 rounded-card border-none shadow-xs bg-card flex flex-col justify-between">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Queue Enrolled</p>
          <p className="text-2xl font-bold text-foreground">{mockWaitlist.length}</p>
        </Card>
      </div>

      {/* Holds List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Hold Details</h3>
          <Button 
            size="sm" 
            className="rounded-full bg-primary text-white hover:bg-primary/95 text-[11px] font-bold px-3 py-1.5 h-auto flex items-center gap-1 shadow-sm"
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="w-3.5 h-3.5" /> New Hold
          </Button>
        </div>

        <div className="space-y-3.5">
          {activeHolds.map((hold) => (
            <Card key={hold.id} className="p-4 rounded-card border-none shadow-xs bg-card space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-extrabold text-foreground">{hold.unitNumber}</h4>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase">{hold.projectName}</p>
                </div>
                <Badge className="bg-primary-soft text-primary hover:bg-primary-soft border-none text-[10px] font-bold px-2.5 py-0.5">
                  {hold.status}
                </Badge>
              </div>

              {/* Countdown Alert */}
              <div className="flex items-center gap-2 text-xs font-semibold text-warning bg-warning/10 p-2.5 rounded-xl w-full">
                <Clock className="w-4 h-4 shrink-0" />
                <span className="text-[11px]">Expires in 14h 22m (Auto Release)</span>
              </div>

              {/* Lead detail */}
              <div className="flex items-center justify-between border-t border-border/30 pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-700">
                    {hold.leadName.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-foreground">{hold.leadName}</span>
                </div>
                
                {/* Micro Actions */}
                <div className="flex gap-1.5">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-[10px] font-bold text-destructive hover:bg-destructive/10 h-7 px-2.5 rounded-lg border-destructive/20"
                    onClick={() => releaseHold(hold.id)}
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Release
                  </Button>
                  <Button 
                    size="sm" 
                    className="text-[10px] font-bold bg-primary text-white hover:bg-primary/95 h-7 px-2.5 rounded-lg shadow-sm"
                  >
                    Book Unit <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {activeHolds.length === 0 && (
            <Card className="p-8 rounded-card border border-dashed border-border/70 bg-secondary/15 flex flex-col items-center justify-center text-center">
              <Lock className="w-8 h-8 text-muted-foreground/50 mb-2" />
              <p className="text-xs font-bold text-muted-foreground">No active holds</p>
              <p className="text-[10px] text-muted-foreground mt-1">Tap New Hold to place a lock on an inventory unit.</p>
            </Card>
          )}
        </div>
      </div>

      <CreateHoldSheet open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
