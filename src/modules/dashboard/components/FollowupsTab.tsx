import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export function FollowupsTab() {
  const [followups, setFollowups] = useState([
    { id: 1, name: 'Rohit Sen', time: '10:00 AM', text: 'Call to collect booking documents for Orchid Heights Block B.', type: 'Call', phone: '+91 98765 43210', status: 'Today' },
    { id: 2, name: 'Swati Gupta', time: '12:30 PM', text: 'Send updated floor plan brochure for 3BHK unit.', type: 'WhatsApp', phone: '+91 99988 87766', status: 'Today' },
    { id: 3, name: 'Kapil Kapoor', time: '04:00 PM', text: 'Accompany client for physical site visit check-in.', type: 'Visit', phone: '+91 88877 66554', status: 'Today' },
    { id: 4, name: 'Aditya Birla', time: 'Tomorrow', text: 'Follow up on price quote approval for Emerald Meadows.', type: 'Call', phone: '+91 77766 55443', status: 'Upcoming' }
  ]);

  const completeFollowup = (id: number) => {
    setFollowups(followups.filter(f => f.id !== id));
    toast.success('Followup logged successfully');
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'Call': return <Phone className="w-4 h-4 text-primary" />;
      case 'WhatsApp': return <MessageSquare className="w-4 h-4 text-accent-blue" />;
      default: return <Calendar className="w-4 h-4 text-accent-purple" />;
    }
  };

  return (
    <div className="space-y-6 animate-slide-up-fade">
      
      {/* Daily schedule tracker */}
      <Card className="p-4 rounded-card border-none shadow-xs bg-card">
        <h4 className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-2">Today's Schedule</h4>
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-foreground">You have 3 customer calls/visits scheduled today.</p>
        </div>
      </Card>

      {/* Followups timeline list */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Upcoming Events</h3>
        <div className="space-y-3">
          {followups.map((item) => (
            <Card key={item.id} className="p-4 rounded-card border-none shadow-xs bg-card space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-soft flex items-center justify-center">
                    {getActionIcon(item.type)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-foreground">{item.name}</h4>
                    <span className="text-[9px] font-bold text-muted-foreground block">{item.time}</span>
                  </div>
                </div>
                <Badge className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                  item.status === 'Today' ? 'bg-primary-soft text-primary hover:bg-primary-soft' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.status}
                </Badge>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {item.text}
              </p>

              {/* Action triggers */}
              <div className="flex justify-between items-center border-t border-border/30 pt-3 mt-1">
                <span className="text-[10px] font-semibold text-muted-foreground">{item.phone}</span>
                <div className="flex gap-1.5">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-[10px] font-bold text-slate-600 hover:bg-slate-100 h-7 px-2.5 rounded-lg border-border"
                    onClick={() => completeFollowup(item.id)}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Log Done
                  </Button>
                  <Button 
                    size="sm" 
                    className="text-[10px] font-bold bg-primary text-white hover:bg-primary/95 h-7 px-2.5 rounded-lg shadow-sm flex items-center gap-1"
                  >
                    {item.type === 'Call' ? 'Call' : item.type === 'WhatsApp' ? 'WhatsApp' : 'Check-In'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
