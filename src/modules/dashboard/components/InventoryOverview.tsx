import { Card } from '@/components/ui/card';
import { Building2, Key, CalendarCheck } from 'lucide-react';

export function InventoryOverview() {
  const metrics = [
    { label: 'Available', value: '450', icon: Building2, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'My Holds', value: '12', icon: Key, color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Bookings', value: '34', icon: CalendarCheck, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
  ];

  return (
    <div className="px-6 pb-6 animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
      <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Inventory Overview</h3>
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((metric, i) => (
          <Card key={i} className="border-none shadow-xs rounded-button p-3 flex flex-col items-center text-center hover:shadow-sm transition-shadow">
            <div className={`w-10 h-10 rounded-full ${metric.bg} flex items-center justify-center mb-2`}>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            <p className="text-xl font-bold text-foreground leading-none mb-1">{metric.value}</p>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{metric.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
