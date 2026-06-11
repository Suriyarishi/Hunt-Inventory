import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Search, Key, Calendar, Building2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { label: 'Search', icon: Search, color: 'bg-primary', text: 'text-primary-foreground', path: '/inventory' },
  { label: 'Clients', icon: Users, color: 'bg-secondary', text: 'text-foreground', path: '/clients' },
  { label: 'Schedule Visit', icon: Calendar, color: 'bg-secondary', text: 'text-foreground', path: '/visits' },
  { label: 'Create Hold', icon: Key, color: 'bg-secondary', text: 'text-foreground', path: '/holds' },
  { label: 'Book Unit', icon: Building2, color: 'bg-secondary', text: 'text-foreground', path: '/bookings/new' },
  { label: 'My Team', icon: Users, color: 'bg-secondary', text: 'text-foreground', path: '/team' },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="pl-6 pb-6 animate-slide-up-fade" style={{ animationDelay: '150ms' }}>
      <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Quick Actions</h3>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex w-max space-x-4 pr-6">
          {actions.map((action, i) => (
            <button key={i} className="flex flex-col items-center gap-2 group" onClick={() => action.path !== '#' && navigate(action.path)}>
              <div className={`w-14 h-14 rounded-button ${action.color} ${action.text} flex items-center justify-center shadow-xs group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{action.label}</span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
}
