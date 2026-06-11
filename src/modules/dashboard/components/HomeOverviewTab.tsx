import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Lock, 
  Building2, 
  ChevronRight, 
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomeOverviewTabProps {
  onTabChange: (tab: string) => void;
}

export function HomeOverviewTab({ onTabChange }: HomeOverviewTabProps) {
  const navigate = useNavigate();

  const snapshots = [
    { label: 'Pending KYC Tasks', count: 2, color: 'text-danger bg-danger/10', tab: 'tasks' },
    { label: 'Active Holds', count: 4, color: 'text-status-held bg-status-held/10', tab: 'holds' },
    { label: 'Followups Today', count: 3, color: 'text-accent-blue bg-accent-blue/10', tab: 'followups' },
  ];

  const quickActions = [
    { icon: Plus, label: 'Add Lead', onClick: () => navigate('/crm') },
    { icon: Lock, label: 'Place Hold', onClick: () => onTabChange('holds') },
    { icon: ArrowUpRight, label: 'Book Unit', onClick: () => navigate('/bookings') },
    { icon: Calendar, label: 'Schedule Visit', onClick: () => navigate('/visits') },
  ];

  const pinnedProjects = [
    { id: 'proj-1', name: 'Orchid Heights', location: 'Whitefield', price: '₹1.2 Cr - 2.4 Cr', commission: '2.5%', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150&auto=format&fit=crop&q=60' },
    { id: 'proj-2', name: 'Emerald Meadows', location: 'Sarjapur Rd', price: '₹85 L - 1.6 Cr', commission: '3.0%', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=150&auto=format&fit=crop&q=60' }
  ];

  const builderUpdates = [
    { builder: 'Sobha Developers', message: 'Launched Block C at Sobha Sentosa. Special 1% commission kicker for next 5 bookings.', date: '1h ago' },
    { builder: 'Prestige Group', message: 'Prestige Lavender Fields RERA certificate received. All units unlocked.', date: '4h ago' }
  ];

  return (
    <div className="space-y-6 animate-slide-up-fade">
      
      {/* Daily Snapshot */}
      <div>
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Daily Snapshot</h3>
        <div className="grid grid-cols-3 gap-2.5">
          {snapshots.map((snap, idx) => (
            <Card 
              key={idx} 
              className="p-3 rounded-card border-none shadow-xs bg-card flex flex-col justify-between h-[85px] cursor-pointer hover:shadow-sm active:scale-95 transition-all"
              onClick={() => onTabChange(snap.tab)}
            >
              <span className="text-[10px] font-bold text-muted-foreground leading-snug">{snap.label}</span>
              <span className={`text-2xl font-bold w-fit px-2 py-0.5 rounded-lg ${snap.color}`}>
                {snap.count}
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-2.5">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button 
                key={idx}
                onClick={action.onClick}
                className="flex flex-col items-center justify-center gap-2 p-3 bg-card border border-border/50 rounded-card shadow-xs hover:shadow-sm active:scale-95 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-foreground text-center leading-none">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pinned Projects */}
      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pinned Projects</h3>
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 gap-0.5 p-0 h-auto" onClick={() => navigate('/inventory')}>
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto -mx-6 px-6 pb-2 scrollbar-none">
          {pinnedProjects.map((project) => (
            <Card 
              key={project.id} 
              className="w-[200px] shrink-0 overflow-hidden border-none shadow-xs rounded-project-card cursor-pointer bg-card hover:shadow-sm transition-all"
              onClick={() => navigate(`/inventory/project/${project.id}`)}
            >
              <img src={project.image} alt={project.name} className="w-full h-24 object-cover" />
              <div className="p-3">
                <h4 className="font-bold text-xs text-foreground truncate">{project.name}</h4>
                <p className="text-[10px] text-muted-foreground">{project.location}</p>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/30">
                  <span className="text-[10px] font-extrabold text-foreground">{project.price}</span>
                  <Badge className="bg-primary-soft text-primary hover:bg-primary-soft border-none text-[9px] font-bold px-1.5 py-0.5">
                    {project.commission} Comm.
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Builder Updates */}
      <div>
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Builder Updates</h3>
        <div className="space-y-2.5">
          {builderUpdates.map((update, idx) => (
            <Card key={idx} className="p-3.5 rounded-card border-none shadow-xs bg-card space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-foreground flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-primary" /> {update.builder}
                </span>
                <span className="text-[9px] text-muted-foreground">{update.date}</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {update.message}
              </p>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
