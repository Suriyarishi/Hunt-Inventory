import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { History, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

interface HistoryTimelineSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unit: any;
}

const priceData = [
  { month: 'Jan', price: 12000000 },
  { month: 'Feb', price: 12100000 },
  { month: 'Mar', price: 12250000 },
  { month: 'Apr', price: 12500000 },
  { month: 'May', price: 12600000 },
  { month: 'Jun', price: 12850000 },
];

const timeline = [
  { status: 'Available', date: '05 Jun, 2026', user: 'System', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
  { status: 'Hold Expired', date: '04 Jun, 2026', user: 'Auto-release', icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
  { status: 'Held', date: '01 Jun, 2026', user: 'Sarah Jenkins', icon: History, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
  { status: 'Listed', date: '15 May, 2026', user: 'Admin', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
];

export function HistoryTimelineSheet({ open, onOpenChange }: HistoryTimelineSheetProps) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title="Unit History" height="90%">
      <div className="space-y-8 pb-6">
        {/* Price History Chart */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground">Price Appreciation</h3>
            <p className="text-xs text-muted-foreground">+7.08% over last 6 months</p>
          </div>
          <div className="h-48 w-full bg-card rounded-card border border-border/50 p-4 shadow-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#19C37D" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#19C37D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  formatter={(value: number) => [`₹${(value / 10000000).toFixed(2)} Cr`, 'Price']}
                  labelStyle={{ color: '#0F172A' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="price" stroke="#19C37D" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Availability Timeline */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Availability Timeline</h3>
          <div className="relative pl-4 space-y-6 before:absolute before:inset-y-0 before:left-[27px] before:w-px before:bg-border/50">
            {timeline.map((item, i) => (
              <div key={i} className="relative flex items-start gap-4 z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-background ${item.bg}`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="pt-1">
                  <h4 className="text-sm font-semibold text-foreground">{item.status}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.date} • by {item.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
