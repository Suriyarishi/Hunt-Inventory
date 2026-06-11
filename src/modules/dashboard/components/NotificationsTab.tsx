import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Clock, CheckCircle2, Check } from 'lucide-react';
import { toast } from 'sonner';

export function NotificationsTab() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Booking Cleared', text: 'Booking for Orchid Heights Unit 102 was processed and cleared successfully.', time: '5m ago', type: 'Booking', read: false },
    { id: 2, title: 'Hold Expiry Alert', text: 'Your hold on Emerald Meadows Unit 503 expires in less than 2 hours.', time: '2h ago', type: 'Alert', read: false },
    { id: 3, title: 'Commission Deposited', text: '₹3,50,000 has been credited to your available payout balance.', time: '5h ago', type: 'System', read: true },
    { id: 4, title: 'Target Milestone Unlocked', text: 'Congratulations! You unlocked the Q2 Volume Tier 1 bonus kicker.', time: '1d ago', type: 'System', read: true }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All marked as read');
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'Booking': return <CheckCircle2 className="w-4 h-4 text-primary" />;
      case 'Alert': return <Clock className="w-4 h-4 text-warning" />;
      default: return <Bell className="w-4 h-4 text-accent-blue" />;
    }
  };

  return (
    <div className="space-y-6 animate-slide-up-fade">
      
      {/* Mark read header */}
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Feed</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-primary hover:text-primary/80 gap-0.5 p-0 h-auto"
          onClick={markAllRead}
        >
          <Check className="w-3.5 h-3.5" /> Mark all read
        </Button>
      </div>

      {/* Notifications feed list */}
      <div className="space-y-2.5">
        {notifications.map((notif) => (
          <Card 
            key={notif.id} 
            className={`p-3.5 rounded-card border-none shadow-xs transition-colors flex gap-3 ${
              notif.read ? 'bg-card opacity-80' : 'bg-[#F0FFF6] border border-primary/15'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              notif.read ? 'bg-slate-100' : 'bg-primary-soft'
            }`}>
              {getNotifIcon(notif.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-extrabold text-xs text-foreground truncate pr-2">{notif.title}</h4>
                <span className="text-[9px] text-muted-foreground whitespace-nowrap">{notif.time}</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {notif.text}
              </p>
            </div>
          </Card>
        ))}

        {notifications.length === 0 && (
          <Card className="p-8 rounded-card border border-dashed border-border/70 bg-secondary/15 flex flex-col items-center justify-center text-center">
            <Bell className="w-8 h-8 text-muted-foreground/50 mb-2" />
            <p className="text-xs font-bold text-muted-foreground">All caught up</p>
            <p className="text-[10px] text-muted-foreground mt-1">You have no new notifications.</p>
          </Card>
        )}
      </div>

    </div>
  );
}
