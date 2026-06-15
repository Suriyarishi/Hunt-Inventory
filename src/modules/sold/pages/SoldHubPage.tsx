import { useNavigate } from 'react-router-dom';
import {
  BadgeCheck,
  TrendingUp,
  IndianRupee,
  Trophy,
  ChevronRight,
  Calendar,
  Building2,
  User,
  Star,
  ArrowUpRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// ── Mock Data ──────────────────────────────────────────────────────────────────
const soldDeals = [
  {
    id: 'S-001',
    unitNumber: 'C-805',
    projectName: 'Oasis Greens',
    clientName: 'Rajesh Kumar',
    soldDate: '2026-05-20T09:00:00Z',
    value: '₹2.8 Cr',
    commission: '₹5.6 L',
    type: '3 BHK',
    tag: 'Top Deal',
  },
  {
    id: 'S-002',
    unitNumber: 'A-1104',
    projectName: 'Skyline Residences',
    clientName: 'Priya Sharma',
    soldDate: '2026-05-10T11:00:00Z',
    value: '₹3.1 Cr',
    commission: '₹6.2 L',
    type: '4 BHK',
    tag: null,
  },
  {
    id: 'S-003',
    unitNumber: 'D-302',
    projectName: 'Zenith Towers',
    clientName: 'Arun Mehta',
    soldDate: '2026-04-28T15:00:00Z',
    value: '₹1.9 Cr',
    commission: '₹3.8 L',
    type: '2 BHK',
    tag: null,
  },
  {
    id: 'S-004',
    unitNumber: 'B-2201',
    projectName: 'Zenith Towers',
    clientName: 'Neha Kapoor',
    soldDate: '2026-04-15T10:30:00Z',
    value: '₹4.3 Cr',
    commission: '₹8.6 L',
    type: 'Penthouse',
    tag: 'Top Deal',
  },
  {
    id: 'S-005',
    unitNumber: 'E-501',
    projectName: 'Oasis Greens',
    clientName: 'Sandeep Rao',
    soldDate: '2026-03-30T14:00:00Z',
    value: '₹1.6 Cr',
    commission: '₹3.2 L',
    type: '2 BHK',
    tag: null,
  },
];

const thisMonthDeals = soldDeals.filter(
  (d) => new Date(d.soldDate).getMonth() === 4 // May
);
const topDeals = soldDeals.filter((d) => d.tag === 'Top Deal');

const stats = [
  {
    label: 'Total Sold',
    value: '₹13.7 Cr',
    sub: 'All time',
    icon: IndianRupee,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    label: 'This Month',
    value: `${thisMonthDeals.length} Units`,
    sub: '₹5.9 Cr value',
    icon: TrendingUp,
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
  },
  {
    label: 'Commission',
    value: '₹27.4 L',
    sub: 'Earned total',
    icon: Trophy,
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function SoldHubPage() {
  const navigate = useNavigate();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="min-h-screen bg-background pb-28 flex flex-col">
      {/* ── Header ── */}
      <div className="sticky top-0 z-20 bg-background border-b border-border/50 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BadgeCheck className="w-6 h-6 text-primary" />
              Sold
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {soldDeals.length} deals closed
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
            <Star className="w-3.5 h-3.5" />
            {topDeals.length} Top Deals
          </div>
        </div>

        {/* ── Stat Pills ── */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`rounded-2xl p-3 ${s.bg} flex flex-col gap-0.5`}
              >
                <Icon className={`w-4 h-4 ${s.color} mb-0.5`} />
                <p className={`text-sm font-bold ${s.color} leading-tight`}>
                  {s.value}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {s.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-4 flex-1">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-button p-1 h-11 mb-5">
            <TabsTrigger
              value="all"
              className="rounded-button text-sm data-[state=active]:bg-card data-[state=active]:shadow-xs"
            >
              All Deals
            </TabsTrigger>
            <TabsTrigger
              value="top"
              className="rounded-button text-sm data-[state=active]:bg-card data-[state=active]:shadow-xs"
            >
              Top Deals 🏆
            </TabsTrigger>
          </TabsList>

          {/* ── All Deals ── */}
          <TabsContent value="all" className="space-y-3 animate-slide-up-fade">
            {soldDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} formatDate={formatDate} />
            ))}
          </TabsContent>

          {/* ── Top Deals ── */}
          <TabsContent value="top" className="space-y-3 animate-slide-up-fade">
            {topDeals.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-10">
                No top deals yet.
              </p>
            ) : (
              topDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} formatDate={formatDate} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ── Deal Card ──────────────────────────────────────────────────────────────────
function DealCard({
  deal,
  formatDate,
}: {
  deal: (typeof soldDeals)[0];
  formatDate: (iso: string) => string;
}) {
  return (
    <Card className="p-4 rounded-card border-none shadow-xs bg-card">
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground text-base">
              {deal.unitNumber}
            </h3>
            {deal.tag && (
              <Badge className="bg-warning/10 text-warning border-none text-[10px] px-2 py-0">
                {deal.tag}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <Building2 className="w-3 h-3" />
            {deal.projectName} · {deal.type}
          </p>
        </div>
        <div className="text-right ml-3 shrink-0">
          <p className="text-base font-bold text-primary">{deal.value}</p>
          <p className="text-[11px] text-success font-medium">
            +{deal.commission}
          </p>
        </div>
      </div>

      {/* Info row */}
      <div className="flex items-center justify-between bg-secondary/40 rounded-xl px-3 py-2 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <User className="w-3.5 h-3.5" />
          <span className="font-medium text-foreground">{deal.clientName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(deal.soldDate)}
        </div>
      </div>

      {/* CTA */}
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-between mt-2 h-9 text-xs font-semibold hover:bg-secondary/50 text-muted-foreground"
      >
        View Deal Details
        <ArrowUpRight className="w-3.5 h-3.5" />
      </Button>
    </Card>
  );
}
