import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockNotifications } from '../constants/mockData';
import { Bell, CheckCheck, Clock, Key, Building2, TrendingUp, Megaphone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function NotificationHubPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');
  const [notifications, setNotifications] = useState(mockNotifications);

  const categories = ['All', 'Builder', 'Hold', 'Booking', 'Commission', 'Announcement'];

  const filteredNotifications = filter === 'All' 
    ? notifications 
    : notifications.filter(n => n.category === filter);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'Builder': return <Building2 className="w-5 h-5 text-primary" />;
      case 'Hold': return <Key className="w-5 h-5 text-warning" />;
      case 'Booking': return <CheckCheck className="w-5 h-5 text-success" />;
      case 'Commission': return <TrendingUp className="w-5 h-5 text-accent-blue" />;
      case 'Announcement': return <Megaphone className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getIconBg = (category: string) => {
    switch (category) {
      case 'Builder': return 'bg-primary/10';
      case 'Hold': return 'bg-warning/10';
      case 'Booking': return 'bg-success/10';
      case 'Commission': return 'bg-accent-blue/10';
      case 'Announcement': return 'bg-purple-500/10';
      default: return 'bg-secondary';
    }
  };

  const timeAgo = (dateStr: string) => {
    const minutes = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-safe flex flex-col">
      <div className="p-4 bg-background z-20 sticky top-0 border-b border-border/50 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 relative">
             <Bell className="w-6 h-6 text-primary" /> 
             Alerts
             {unreadCount > 0 && (
               <span className="absolute -top-1 -left-1 w-3 h-3 bg-destructive rounded-full border-2 border-background" />
             )}
          </h1>
          <Button variant="ghost" size="sm" className="text-xs font-semibold text-primary" onClick={markAllRead}>
             Mark all read
          </Button>
        </div>

        {/* Filter Chips */}
        <ScrollArea className="w-full whitespace-nowrap -mx-4 px-4 pb-2">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  filter === cat 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="p-4 space-y-3">
         {filteredNotifications.length === 0 ? (
           <div className="text-center py-12 text-muted-foreground flex flex-col items-center">
             <Bell className="w-12 h-12 mb-4 opacity-20" />
             <p className="font-semibold text-sm">No new alerts</p>
             <p className="text-xs">You're all caught up!</p>
           </div>
         ) : (
           filteredNotifications.map((notification) => (
             <Card 
               key={notification.id} 
               className={`p-4 rounded-card border-none flex gap-4 transition-all relative ${
                 !notification.isRead ? 'bg-card shadow-sm' : 'bg-transparent opacity-70'
               }`}
               onClick={() => {
                 if (notification.link) navigate(notification.link);
               }}
             >
                {!notification.isRead && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full" />
                )}
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getIconBg(notification.category)}`}>
                  {getIcon(notification.category)}
                </div>
                
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className={`text-sm mb-0.5 truncate ${!notification.isRead ? 'font-bold' : 'font-semibold text-muted-foreground'}`}>
                    {notification.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between mt-1">
                     <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                       <Clock className="w-3 h-3" /> {timeAgo(notification.timestamp)}
                     </span>
                     
                     {notification.link && (
                       <span className="text-[10px] font-bold text-primary flex items-center gap-0.5">
                         View Details <ChevronRight className="w-3 h-3" />
                       </span>
                     )}
                  </div>
                </div>
             </Card>
           ))
         )}
      </div>

    </div>
  );
}
