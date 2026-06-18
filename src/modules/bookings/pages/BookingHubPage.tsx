import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileSignature, Plus, ChevronRight, CheckCircle2, Clock, AlertCircle,
  ArrowLeft, BarChart3, TrendingUp, Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { mockBookings, mockBookingAnalytics } from '../constants/mockData';

const STATUS_COLOR: Record<string, string> = {
  'Draft': 'bg-secondary text-muted-foreground',
  'Submitted': 'bg-accent-blue/10 text-accent-blue',
  'Under Review': 'bg-warning/10 text-warning',
  'Approved': 'bg-primary/10 text-primary',
  'Agreement Pending': 'bg-purple-100 text-purple-700',
  'Registered': 'bg-primary/15 text-primary',
  'Completed': 'bg-emerald-100 text-emerald-700',
  'Cancelled': 'bg-destructive/10 text-destructive',
  'Pending KYC': 'bg-warning/10 text-warning',
  'Confirmed': 'bg-primary/10 text-primary',
  'Sold': 'bg-emerald-100 text-emerald-700',
  'Rejected': 'bg-destructive/10 text-destructive',
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  'Draft': <Clock className="w-3 h-3" />,
  'Submitted': <Clock className="w-3 h-3" />,
  'Under Review': <AlertCircle className="w-3 h-3" />,
  'Approved': <CheckCircle2 className="w-3 h-3" />,
  'Agreement Pending': <FileSignature className="w-3 h-3" />,
  'Registered': <CheckCircle2 className="w-3 h-3" />,
  'Completed': <CheckCircle2 className="w-3 h-3" />,
  'Cancelled': <AlertCircle className="w-3 h-3" />,
};

const ACTIVE_STATUSES = ['Draft', 'Submitted', 'Under Review', 'Approved', 'Agreement Pending', 'Pending KYC'];

export default function BookingHubPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('active');

  const a = mockBookingAnalytics;
  const allBookings = mockBookings.filter((b) =>
    b.primaryApplicant.toLowerCase().includes(search.toLowerCase()) ||
    b.unitNumber.toLowerCase().includes(search.toLowerCase()) ||
    b.projectName.toLowerCase().includes(search.toLowerCase()) ||
    b.bookingNumber?.toLowerCase().includes(search.toLowerCase())
  );
  const activeBookings = allBookings.filter((b) => ACTIVE_STATUSES.includes(b.status));
  const historyBookings = allBookings.filter((b) => !ACTIVE_STATUSES.includes(b.status));

  const monthGrowth = ((a.thisMonthBookings - a.lastMonthBookings) / Math.max(a.lastMonthBookings, 1) * 100).toFixed(0);
  const isGrowth = a.thisMonthBookings >= a.lastMonthBookings;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* ── Sticky Header ── */}
      <div className="px-4 py-3 flex items-center justify-between shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-20">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2 w-10 h-10" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <FileSignature className="w-5 h-5 text-primary" />
          <h1 className="font-bold text-base text-foreground font-headings">Bookings</h1>
        </div>
        <div className="flex items-center gap-1.5">
          <Button size="icon" variant="ghost" className="rounded-full w-9 h-9" onClick={() => navigate('/bookings/analytics')}>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button size="icon" className="rounded-full shadow-md w-9 h-9" onClick={() => navigate('/bookings/new')}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* ── KPI Stats Strip ── */}
        <div className="px-4 pt-4 pb-3">
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Total', value: a.totalBookings, color: 'text-foreground', bg: 'bg-card' },
              { label: 'Active', value: a.activeBookings, color: 'text-primary', bg: 'bg-primary/5' },
              { label: 'Agreement', value: a.agreementPendingCount, color: 'text-purple-700', bg: 'bg-purple-50' },
              { label: 'Registered', value: 1, color: 'text-emerald-700', bg: 'bg-emerald-50' },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} rounded-2xl p-3 text-center shadow-xs border border-border/40`}>
                <p className={`text-xl font-bold font-headings ${stat.color}`}>{stat.value}</p>
                <p className="text-[9px] text-muted-foreground font-medium leading-tight mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Revenue hero card ── */}
        <div className="px-4 pb-3">
          <Card className="p-4 rounded-card border-none shadow-xs bg-card overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">This Month</p>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-3xl font-bold text-foreground font-headings">{a.thisMonthBookings}</span>
                  <div className={`flex items-center gap-1 mb-1 text-xs font-bold ${isGrowth ? 'text-primary' : 'text-destructive'}`}>
                    <TrendingUp className="w-3 h-3" />
                    {monthGrowth}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">bookings vs {a.lastMonthBookings} last month</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Revenue</p>
                <p className="text-lg font-bold text-primary mt-1 font-headings">
                  ₹{(a.totalRevenue / 10000000).toFixed(1)} Cr
                </p>
                <p className="text-xs text-muted-foreground">Avg ₹{(a.avgTicketSize / 10000000).toFixed(1)} Cr / deal</p>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Search ── */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search buyer, unit, booking ID..."
              className="pl-10 h-11 rounded-input bg-secondary/30 border-border/50 text-sm"
            />
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="px-4">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-button p-1 h-11 mb-4">
              <TabsTrigger value="active" className="rounded-button text-xs font-semibold data-[state=active]:bg-card data-[state=active]:shadow-xs">
                Active Pipeline ({activeBookings.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-button text-xs font-semibold data-[state=active]:bg-card data-[state=active]:shadow-xs">
                History ({historyBookings.length})
              </TabsTrigger>
            </TabsList>

            {/* Active Tab */}
            <TabsContent value="active" className="space-y-3 animate-in slide-in-from-bottom-2 duration-200 pb-4">
              {activeBookings.length === 0 && (
                <div className="flex flex-col items-center py-12 text-center">
                  <FileSignature className="w-10 h-10 text-border mb-3" />
                  <p className="text-sm font-semibold text-muted-foreground">No active bookings</p>
                  <p className="text-xs text-muted-foreground mt-1">Convert a hold or start a new booking</p>
                </div>
              )}
              {activeBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} onClick={() => navigate(`/bookings/${booking.id}`)} />
              ))}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-3 animate-in slide-in-from-bottom-2 duration-200 pb-4">
              {historyBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} onClick={() => navigate(`/bookings/${booking.id}`)} muted />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// ── BookingCard Component ────────────────────────────────────────────────────────

function BookingCard({ booking, onClick, muted = false }: { booking: typeof mockBookings[0]; onClick: () => void; muted?: boolean }) {
  return (
    <Card
      className={`p-4 rounded-card border-none shadow-xs bg-card cursor-pointer active:scale-[0.99] transition-all hover:shadow-md ${muted ? 'opacity-75' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-bold text-foreground">{booking.unitNumber}</h3>
            <span className="text-[9px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{booking.bookingNumber}</span>
          </div>
          <p className="text-xs text-muted-foreground truncate">{booking.projectName}</p>
        </div>
        <Badge className={`border-none shrink-0 flex items-center gap-1 text-[10px] ${STATUS_COLOR[booking.status] || 'bg-secondary text-muted-foreground'}`}>
          {STATUS_ICON[booking.status]}
          {booking.status}
        </Badge>
      </div>

      <div className="flex items-center justify-between bg-secondary/50 px-3 py-2.5 rounded-xl mb-3">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase font-semibold">Buyer</p>
          <p className="text-sm font-bold text-foreground">{booking.primaryApplicant}</p>
          {booking.hasCoApplicant && (
            <p className="text-[10px] text-muted-foreground">+ {booking.coApplicantName}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground uppercase font-semibold">Net Payable</p>
          <p className="text-sm font-bold text-primary">{booking.netPayable || booking.totalValue}</p>
        </div>
      </div>

      {/* Sub-status indicators */}
      <div className="flex items-center gap-3 mb-3">
        {[
          { label: 'KYC', status: booking.kycStatus },
          { label: 'Docs', status: booking.documentStatus },
          { label: 'Payment', status: booking.paymentStatus },
          { label: 'Builder', status: booking.builderApprovalStatus },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${
              s.status === 'Verified' || s.status === 'Uploaded' ? 'bg-primary' :
              s.status === 'Rejected' ? 'bg-destructive' : 'bg-border'
            }`} />
            <span className="text-[9px] text-muted-foreground font-medium">{s.label}</span>
          </div>
        ))}
      </div>

      <button className="w-full flex items-center justify-between py-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
        View Application <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </Card>
  );
}
