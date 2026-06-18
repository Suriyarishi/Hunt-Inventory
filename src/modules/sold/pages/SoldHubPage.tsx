import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  mockSoldDeals,
  mockProjectPerformance,
  mockBuilderPerformance
} from '../constants/mockData';
import {
  BadgeCheck,
  TrendingUp,
  IndianRupee,
  Trophy,
  ChevronRight,
  Filter,
  Building,
  FileSpreadsheet,
  Award,
  Briefcase,
  Search,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function SoldHubPage() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Filtered Deals (Recent Sales Section)
  const filteredDeals = mockSoldDeals.filter(deal => {
    const matchesFilter = selectedFilter === 'All' || deal.registrationStatus === selectedFilter;
    const matchesSearch = deal.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          deal.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          deal.unitNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate stats based on all deals
  const totalValueNum = mockSoldDeals.reduce((sum, d) => sum + d.saleValueRaw, 0);
  const totalCommissionNum = mockSoldDeals.reduce((sum, d) => sum + d.commissionValueRaw, 0);
  const releasedCommissionNum = mockSoldDeals
    .filter(d => d.commissionStatus === 'Released')
    .reduce((sum, d) => sum + d.commissionValueRaw, 0);

  const formatCr = (val: number) => `₹${(val / 10000000).toFixed(2)} Cr`;
  const formatL = (val: number) => `₹${(val / 100000).toFixed(2)} L`;

  return (
    <div className="min-h-screen bg-background pb-28 flex flex-col font-sans">
      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-4 bg-background z-20 sticky top-0 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BadgeCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-none font-headings">Sold Module</h1>
              <p className="text-[11px] text-muted-foreground mt-1">Property Sales & Analytics Cockpit</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full border-border/60 hover:bg-secondary text-xs flex items-center gap-1.5 h-9"
            onClick={() => navigate('/sold/analytics')}
          >
            <TrendingUp className="w-4 h-4 text-primary" />
            Analytics
          </Button>
        </div>

        {/* ── Goal Gradient Effect: Monthly Target progress ── */}
        <Card className="p-3.5 mb-4 bg-primary-soft/40 border border-primary/20 rounded-2xl">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-foreground uppercase tracking-wide">Q2 Sales Target Progress</span>
            <span className="text-xs font-bold text-primary">₹13.7 Cr / ₹15.0 Cr (91%)</span>
          </div>
          <Progress value={91} className="h-2 bg-secondary border border-border/10" />
          <p className="text-[10px] text-muted-foreground mt-1.5">Just ₹1.3 Cr more to hit target bonus tier! 🚀</p>
        </Card>

        {/* ── 3. Quick Search / Filter Bar ── */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by buyer, project or unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary-surface border border-border/60 rounded-input h-10 pl-10 pr-4 text-xs font-medium text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/60 transition-colors"
            />
          </div>
          <Button size="icon" variant="outline" className="rounded-input h-10 w-10 shrink-0 border-border/60">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* ── Sales, Revenue & Commission Summary (Miller's Law) ── */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="p-3 bg-card border-none shadow-xs rounded-card text-center flex flex-col justify-between">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Briefcase className="w-4.5 h-4.5 text-primary" />
            </div>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none">Total Sales</p>
            <p className="text-sm font-bold text-foreground font-headings mt-1">{mockSoldDeals.length} Deals</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">Closed pipeline</p>
          </Card>

          <Card className="p-3 bg-card border-none shadow-xs rounded-card text-center flex flex-col justify-between">
            <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center mx-auto mb-2">
              <IndianRupee className="w-4.5 h-4.5 text-accent-blue" />
            </div>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none">Revenue</p>
            <p className="text-sm font-bold text-foreground font-headings mt-1">{formatCr(totalValueNum)}</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">Booking volume</p>
          </Card>

          <Card className="p-3 bg-card border-none shadow-xs rounded-card text-center flex flex-col justify-between">
            <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-4.5 h-4.5 text-warning" />
            </div>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-none">Commission</p>
            <p className="text-sm font-bold text-foreground font-headings mt-1">{formatL(totalCommissionNum)}</p>
            <p className="text-[9px] text-success font-semibold mt-0.5">{formatL(releasedCommissionNum)} paid</p>
          </Card>
        </div>

        {/* ── Quick Filter Pills ── */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 select-none scrollbar-none">
          {['All', 'Registered', 'Agreement Signed', 'Possession Handed Over'].map(pill => (
            <button
              key={pill}
              onClick={() => setSelectedFilter(pill)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all active:scale-95 ${
                selectedFilter === pill
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'bg-card border-border/60 text-muted-foreground hover:bg-secondary/40'
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* ── Recent Sales (Progressive Disclosure) ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground font-headings">Recent Closed Sales</h2>
            <button
              onClick={() => navigate('/sold/listings')}
              className="text-xs font-bold text-primary flex items-center gap-0.5 hover:underline"
            >
              View Listings <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {filteredDeals.length === 0 ? (
            <div className="text-center py-8 bg-card rounded-card border border-border/40">
              <p className="text-xs text-muted-foreground">No recent sales match your filter</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDeals.slice(0, 3).map(deal => (
                <Card
                  key={deal.id}
                  className="p-3.5 bg-card border-none shadow-xs rounded-card hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
                  onClick={() => navigate(`/sold/${deal.id}`)}
                >
                  <div className="flex justify-between items-start mb-2.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-foreground">{deal.unitNumber}</span>
                        <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-md border border-border/40 font-medium">
                          {deal.projectName}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Buyer: {deal.buyerName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-primary">{deal.saleValue}</span>
                      <p className="text-[10px] text-success font-semibold mt-0.5">Comm: {deal.commissionValue}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/40 pt-2.5 mt-2.5 text-[11px]">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-success" />
                      <span>{deal.registrationStatus}</span>
                    </div>
                    <span className="text-muted-foreground/60">{new Date(deal.soldDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* ── Top Projects Performance (Miller's Law) ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground font-headings">Top Performing Projects</h2>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockProjectPerformance.slice(0, 2).map((proj, idx) => (
              <Card key={proj.name} className="p-3 bg-card border-none shadow-xs rounded-card relative overflow-hidden">
                <div className="absolute right-0 top-0 w-12 h-12 bg-primary/5 rounded-bl-[2.5rem] flex items-center justify-center pl-3 pb-3 text-xs font-bold text-primary">
                  #{idx + 1}
                </div>
                <Building className="w-5 h-5 text-muted-foreground mb-2" />
                <p className="font-bold text-xs text-foreground truncate pr-6">{proj.name}</p>
                <p className="text-sm font-bold text-primary mt-1">{proj.volume}</p>
                <div className="flex justify-between items-center mt-2 text-[10px] text-muted-foreground">
                  <span>{proj.deals} Deals</span>
                  <span className="text-success font-semibold">{proj.growth}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Top Builders (Miller's Law) ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground font-headings">Top Builder Partners</h2>
            <Award className="w-4 h-4 text-warning" />
          </div>
          <div className="space-y-2.5">
            {mockBuilderPerformance.slice(0, 2).map(builder => (
              <Card key={builder.name} className="p-3 bg-card border-none shadow-xs rounded-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-warning/10 flex items-center justify-center font-bold text-warning font-headings text-sm">
                    {builder.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-foreground">{builder.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{builder.projects} Projects active</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xs text-foreground">{builder.volume}</p>
                  <p className="text-[10px] text-success font-semibold">★ {builder.rating}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Quick Document Center Link ── */}
        <Card
          className="p-4 bg-secondary border border-border/60 rounded-card flex items-center justify-between cursor-pointer hover:bg-secondary/70 active:scale-[0.99] transition-all"
          onClick={() => navigate('/sold/listings')}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-card border border-border/40 flex items-center justify-center shadow-xs">
              <FileSpreadsheet className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-xs text-foreground leading-none">Bulk Report Export</p>
              <p className="text-[10px] text-muted-foreground mt-1.5">Generate spreadsheet audits for registration records</p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </Card>
      </div>
    </div>
  );
}
