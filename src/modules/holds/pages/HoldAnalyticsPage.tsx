import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, Clock, Zap, Target, RefreshCw, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockHoldAnalytics, mockHolds } from '../constants/mockData';

export default function HoldAnalyticsPage() {
  const navigate = useNavigate();
  const a = mockHoldAnalytics;

  const weekGrowth = ((a.thisWeekHolds - a.lastWeekHolds) / a.lastWeekHolds * 100).toFixed(1);
  const isGrowth = a.thisWeekHolds >= a.lastWeekHolds;

  // Status distribution for mini bar chart
  const statusCounts = {
    Active: mockHolds.filter(h => h.status === 'Active').length,
    Expiring: mockHolds.filter(h => h.status === 'Expiring').length,
    Extended: mockHolds.filter(h => h.status === 'Extended').length,
    Converted: mockHolds.filter(h => h.status === 'Converted').length,
    Released: mockHolds.filter(h => h.status === 'Released').length,
  };
  const maxCount = Math.max(...Object.values(statusCounts));

  const barColors: Record<string, string> = {
    Active: 'bg-primary',
    Expiring: 'bg-warning',
    Extended: 'bg-purple-500',
    Converted: 'bg-emerald-500',
    Released: 'bg-muted-foreground/50',
  };

  return (
    <div className="min-h-screen bg-background pb-8 pt-safe">
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-md border-b border-border/50 z-10">
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-bold text-sm font-headings">Hold Analytics</h1>
        <div className="w-10" />
      </div>

      <div className="px-4 pt-5 space-y-4">

        {/* This Week vs Last Week */}
        <Card className="p-5 rounded-card border-none shadow-xs bg-card overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">This Week</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-foreground font-headings">{a.thisWeekHolds}</span>
            <div className={`flex items-center gap-1 mb-2 text-sm font-bold ${isGrowth ? 'text-primary' : 'text-destructive'}`}>
              {isGrowth ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {weekGrowth}%
            </div>
          </div>
          <p className="text-xs text-muted-foreground">vs {a.lastWeekHolds} last week · {a.totalHolds} total</p>
        </Card>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Target, label: 'Conversion Rate', value: `${a.conversionRate}%`, sub: 'holds → bookings', color: 'text-primary', bg: 'bg-primary/10' },
            { icon: Clock, label: 'Avg Duration', value: `${a.avgHoldDuration}h`, sub: 'per hold', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: RefreshCw, label: 'Extension Rate', value: `${a.extensionRate}%`, sub: 'holds extended', color: 'text-purple-600', bg: 'bg-purple-50' },
            { icon: Zap, label: 'Revenue at Risk', value: a.revenueAtRisk, sub: 'live holds value', color: 'text-warning', bg: 'bg-warning/10' },
          ].map(m => {
            const Icon = m.icon;
            return (
              <Card key={m.label} className="p-4 rounded-card border-none shadow-xs bg-card">
                <div className={`w-9 h-9 rounded-xl ${m.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${m.color}`} />
                </div>
                <p className={`text-xl font-bold font-headings ${m.color}`}>{m.value}</p>
                <p className="text-[11px] font-semibold text-foreground mt-0.5">{m.label}</p>
                <p className="text-[10px] text-muted-foreground">{m.sub}</p>
              </Card>
            );
          })}
        </div>

        {/* Status Distribution Bar Chart */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-bold text-foreground">Status Distribution</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground w-16 shrink-0">{status}</span>
                <div className="flex-1 h-6 bg-secondary rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${barColors[status]} rounded-lg transition-all duration-700 flex items-center justify-end pr-2`}
                    style={{ width: `${Math.max((count / maxCount) * 100, 8)}%` }}
                  >
                    <span className="text-[10px] font-bold text-white">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Conversion Funnel */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Conversion Funnel
          </h3>
          <div className="space-y-2">
            {[
              { label: 'Holds Created', value: a.totalHolds, pct: 100, color: 'bg-foreground/10' },
              { label: 'Active / In Progress', value: a.activeHolds + a.expiringHolds, pct: Math.round(((a.activeHolds + a.expiringHolds) / a.totalHolds) * 100), color: 'bg-primary/40' },
              { label: 'Converted to Booking', value: a.convertedHolds, pct: Math.round((a.convertedHolds / a.totalHolds) * 100), color: 'bg-primary' },
            ].map((step, i) => (
              <div key={step.label} className="relative">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-medium">{i + 1}. {step.label}</span>
                  <span className="font-bold text-foreground">{step.value} ({step.pct}%)</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${step.color} rounded-full transition-all duration-700`} style={{ width: `${step.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Unlock, label: 'Released', value: a.releasedHolds, color: 'text-muted-foreground' },
            { icon: Zap, label: 'Waitlisted', value: a.waitlistCount, color: 'text-purple-600' },
            { icon: BarChart3, label: 'Top Project', value: 'Skyline', color: 'text-primary' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card rounded-2xl p-3 text-center border border-border/50 shadow-xs">
                <Icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
                <p className={`text-base font-bold font-headings ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
