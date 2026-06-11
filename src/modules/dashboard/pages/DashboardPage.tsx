import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Phone, 
  TrendingUp, 
  Bell, 
  Activity,
  ShieldCheck
} from 'lucide-react';

// Tab Component Imports
import { HomeOverviewTab } from '../components/HomeOverviewTab';
import { TasksTab } from '../components/TasksTab';
import { HoldsTab } from '../components/HoldsTab';
import { FollowupsTab } from '../components/FollowupsTab';
import { RevenueTab } from '../components/RevenueTab';
import { NotificationsTab } from '../components/NotificationsTab';
import { ActivityTimelineTab } from '../components/ActivityTimelineTab';

type TabType = 'overview' | 'tasks' | 'holds' | 'followups' | 'revenue' | 'notifications' | 'activity';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'tasks', label: 'Tasks', icon: CheckCircle2 },
    { id: 'holds', label: 'Holds', icon: Lock },
    { id: 'followups', label: 'Followups', icon: Phone },
    { id: 'revenue', label: 'Revenue', icon: TrendingUp },
    { id: 'notifications', label: 'Alerts', icon: Bell },
    { id: 'activity', label: 'Timeline', icon: Activity }
  ] as const;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <HomeOverviewTab onTabChange={(tab) => setActiveTab(tab as TabType)} />;
      case 'tasks':
        return <TasksTab />;
      case 'holds':
        return <HoldsTab />;
      case 'followups':
        return <FollowupsTab />;
      case 'revenue':
        return <RevenueTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'activity':
        return <ActivityTimelineTab />;
      default:
        return <HomeOverviewTab onTabChange={(tab) => setActiveTab(tab as TabType)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col pb-24">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" />

      {/* Dynamic Header */}
      <div className="flex items-center justify-between p-4 pb-2 relative z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-11 w-11 ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-sm">
              <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" alt="Profile" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            {/* Trust rating indicator */}
            <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-background">
              98%
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-sm font-extrabold text-foreground leading-none">Arjun Mehta</h1>
              <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
            </div>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block mt-0.5">CP ID: CP-8042</span>
          </div>
        </div>

        {/* Dynamic Alerts Indicator */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={`rounded-full shadow-xs ${activeTab === 'notifications' ? 'bg-primary text-white hover:bg-primary/95' : 'bg-card text-foreground hover:bg-secondary/50'}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell className="h-4.5 w-4.5" />
        </Button>
      </div>

      {/* Segmented Horizontal Navigation Control */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 shrink-0 scrollbar-none z-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                isActive 
                  ? 'bg-primary text-white border-primary shadow-xs' 
                  : 'bg-card text-muted-foreground border-border/50 hover:bg-secondary/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Screen Content */}
      <div className="flex-1 overflow-y-auto px-4 mt-2 relative z-10">
        {renderActiveTab()}
      </div>
    </div>
  );
}
