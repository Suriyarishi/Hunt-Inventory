import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, TrendingUp, TrendingDown, BarChart3, IndianRupee,
  Target, FileSignature, MapPin, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockBookingAnalytics } from '../constants/mockData';

function fmtCr(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

const STATUS_COLORS: Record<string, string> = {
  'Draft': 'bg-secondary',
  'Submitted': 'bg-accent-blue/70',
  'Under Review': 'bg-warning/70',
  'Approved': 'bg-primary/70',
  'Agreement Pending': 'bg-purple-400',
  'Registered': 'bg-primary',
  'Cancelled': 'bg-destructive/60',
  'Completed': 'bg-emerald-500',
};

export default function BookingAnalyticsPage() {
  const navigate = useNavigate();
  const a = mockBookingAnalytics;

  const monthGrowth = ((a.thisMonthBookings - a.lastMonthBookings) / Math.max(a.lastMonthBookings, 1) * 100).toFixed(0);
  const isGrowth = a.thisMonthBookings >= a.lastMonthBookings;

  const maxMonthCount = Math.max(...a.monthlyTrend.map((m) => m.count));
  const maxStatusCount = Math.max(...Object.values(a.statusDistribution));

  return (
    <div className="flex flex-col h-full bg-background">

      {/* Header */}
      <div className="px-4 pt-4 pb-3 shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-sm font-headings">Booking Analytics</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* ── This Month Hero ── */}
        <Card className="p-5 rounded-card border-none shadow-xs bg-card overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-10 translate-x-10" />
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">This Month</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-foreground font-headings">{a.thisMonthBookings}</span>
            <div className={`flex items-center gap-1 mb-2 text-sm font-bold ${isGrowth ? 'text-primary' : 'text-destructive'}`}>
              {isGrowth ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {monthGrowth}%
            </div>
          </div>
          <p className="text-xs text-muted-foreground">vs {a.lastMonthBookings} last month · {a.totalBookings} total all time</p>
        </Card>

        {/* ── KPI Grid ── */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: IndianRupee, label: 'Total Revenue', value: fmtCr(a.totalRevenue), sub: 'all bookings', color: 'text-primary', bg: 'bg-primary/10' },
            { icon: Target, label: 'Avg Ticket Size', value: fmtCr(a.avgTicketSize), sub: 'per booking', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: FileSignature, label: 'Agmt. Pending', value: a.agreementPendingCount, sub: 'needs attention', color: 'text-purple-600', bg: 'bg-purple-50' },
            { icon: MapPin, label: 'Registration', value: a.registrationPendingCount, sub: 'scheduled / pending', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((m) => {
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

        {/* ── Monthly Trend Bar Chart ── */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              Monthly Trend
            </h3>
            <span className="text-[10px] text-muted-foreground">Bookings / month</span>
          </div>
          <div className="flex items-end gap-2 h-20">
            {a.monthlyTrend.map((item) => {
              const h = Math.max((item.count / maxMonthCount) * 100, 8);
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[9px] font-bold text-muted-foreground">{item.count}</span>
                  <div
                    className="w-full bg-primary rounded-t-md transition-all duration-700 relative overflow-hidden"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-t-md" />
                  </div>
                  <span className="text-[9px] text-muted-foreground font-medium">{item.month}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── Status Distribution ── */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <h3 className="text-sm font-bold text-foreground mb-4">Status Distribution</h3>
          <div className="space-y-3">
            {Object.entries(a.statusDistribution).map(([status, count]) => (
              <div key={status} className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground w-28 shrink-0">{status}</span>
                <div className="flex-1 h-5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${STATUS_COLORS[status] || 'bg-secondary'} rounded-full transition-all duration-700 flex items-center justify-end pr-2`}
                    style={{ width: `${Math.max((count / maxStatusCount) * 100, 12)}%` }}
                  >
                    <span className="text-[9px] font-bold text-white">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Conversion Funnel ── */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Booking Funnel
          </h3>
          <div className="space-y-2">
            {a.funnelData.map((step, i) => (
              <div key={step.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-medium">{i + 1}. {step.label}</span>
                  <span className="font-bold text-foreground">{step.count} <span className="text-muted-foreground font-normal">({step.percentage}%)</span></span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${step.color} rounded-full transition-all duration-700`}
                    style={{ width: `${step.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">
            Conversion: {a.conversionRate}% of holds convert to bookings
          </p>
        </Card>

        {/* ── Project Breakdown ── */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <h3 className="text-sm font-bold text-foreground mb-3">Project Breakdown</h3>
          <div className="space-y-0">
            {a.projectBreakdown.map((proj, i, arr) => (
              <div key={proj.projectId} className={`flex items-center justify-between py-3 ${i < arr.length - 1 ? 'border-b border-border/40' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{proj.bookings}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{proj.projectName}</p>
                    <p className="text-xs text-muted-foreground">{proj.bookings} booking{proj.bookings !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-primary">{fmtCr(proj.revenue)}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Quick Stats ── */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: CheckCircle2, label: 'Completed', value: a.completedBookings, color: 'text-emerald-600' },
            { icon: AlertCircle, label: 'Cancelled', value: a.cancelledBookings, color: 'text-destructive' },
            { icon: BarChart3, label: 'Active', value: a.activeBookings, color: 'text-primary' },
          ].map((s) => {
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
