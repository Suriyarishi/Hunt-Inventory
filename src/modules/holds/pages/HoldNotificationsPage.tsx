import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, AlertTriangle, CheckCircle2, TrendingUp, Users, Plus, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockHoldNotifications } from '../constants/mockData';
import type { HoldNotification } from '../types';

const notifIcons: Record<HoldNotification['type'], { icon: React.ElementType; color: string; bg: string }> = {
  expiring:  { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/15' },
  extended:  { icon: Clock, color: 'text-purple-600', bg: 'bg-purple-100' },
  released:  { icon: CheckCircle2, color: 'text-muted-foreground', bg: 'bg-secondary' },
  converted: { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  waitlist:  { icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  new:       { icon: Plus, color: 'text-primary', bg: 'bg-primary/10' },
};

const urgencyBorder: Record<HoldNotification['urgency'], string> = {
  high:   'border-l-warning',
  medium: 'border-l-blue-400',
  low:    'border-l-transparent',
};

export default function HoldNotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockHoldNotifications);

  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);

  const markAllRead = () => setNotifications(n => n.map(notif => ({ ...notif, read: true })));
  const markRead = (id: string) => setNotifications(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif));

  const timeAgo = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    if (days > 0) return `${days}d ago`;
    if (hrs > 0) return `${hrs}h ago`;
    return `${mins}m ago`;
  };

  const NotifCard = ({ notif }: { notif: HoldNotification }) => {
    const cfg = notifIcons[notif.type];
    const Icon = cfg.icon;
    return (
      <Card
        className={`p-4 rounded-card border-none shadow-xs bg-card cursor-pointer border-l-4 ${urgencyBorder[notif.urgency]} ${!notif.read ? 'bg-card' : 'bg-secondary/30'} active:scale-[0.99] transition-all`}
        onClick={() => {
          markRead(notif.id);
          navigate(`/holds/${notif.holdId}`);
        }}
      >
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-4.5 h-4.5 ${cfg.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className={`text-sm leading-snug ${!notif.read ? 'font-bold text-foreground' : 'font-semibold text-foreground/80'}`}>
                {notif.title}
              </p>
              <div className="flex items-center gap-1.5 shrink-0">
                {!notif.read && <div className="w-2 h-2 rounded-full bg-primary" />}
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{timeAgo(notif.timestamp)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{notif.message}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{notif.unitNumber}</span>
              <span className="text-[10px] text-muted-foreground">{notif.projectName}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-8 pt-safe">
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-md border-b border-border/50 z-10">
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="font-bold text-sm font-headings">Hold Notifications</h1>
          <p className="text-[11px] text-muted-foreground">{unread.length} unread</p>
        </div>
        {unread.length > 0 && (
          <Button variant="ghost" className="text-xs font-semibold text-primary h-9 px-3" onClick={markAllRead}>
            Mark all read
          </Button>
        )}
      </div>

      <div className="px-4 pt-4 space-y-5">

        {/* Notification Settings Banner */}
        <div className="flex items-center gap-3 p-3.5 bg-primary/5 rounded-2xl border border-primary/15">
          <Bell className="w-4 h-4 text-primary shrink-0" />
          <p className="text-xs text-muted-foreground flex-1">
            Real-time push notifications are <strong className="text-foreground">enabled</strong>. You'll be alerted 2h before any hold expires.
          </p>
        </div>

        {/* Unread */}
        {unread.length > 0 && (
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              New · {unread.length}
            </p>
            <div className="space-y-2.5">
              {unread.map(n => <NotifCard key={n.id} notif={n} />)}
            </div>
          </div>
        )}

        {/* Read */}
        {read.length > 0 && (
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Earlier</p>
            <div className="space-y-2.5">
              {read.map(n => <NotifCard key={n.id} notif={n} />)}
            </div>
          </div>
        )}

        {notifications.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm font-semibold text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
