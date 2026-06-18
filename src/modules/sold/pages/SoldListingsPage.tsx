import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSoldDeals } from '../constants/mockData';
import type { SoldDeal } from '../constants/mockData';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Calendar,
  IndianRupee,
  ShieldCheck,
  User,
  FilterX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function SoldListingsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique projects
  const uniqueProjects = Array.from(new Set(mockSoldDeals.map(d => d.projectName)));
  // Unique registration statuses
  const uniqueStatuses = Array.from(new Set(mockSoldDeals.map(d => d.registrationStatus)));

  // Filter deals
  const filteredDeals = mockSoldDeals.filter(deal => {
    const matchesSearch =
      deal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.unitNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || deal.registrationStatus === statusFilter;
    const matchesProject = projectFilter === 'All' || deal.projectName === projectFilter;

    return matchesSearch && matchesStatus && matchesProject;
  });

  const getStatusBadge = (status: SoldDeal['registrationStatus']) => {
    switch(status) {
      case 'Possession Handed Over':
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-semibold text-[10px]">Possession</Badge>;
      case 'Registered':
        return <Badge className="bg-primary/10 text-primary border-none font-semibold text-[10px]">Registered</Badge>;
      case 'Agreement Signed':
        return <Badge className="bg-accent-blue/10 text-accent-blue border-none font-semibold text-[10px]">Agreement</Badge>;
      default:
        return <Badge className="bg-warning/10 text-warning border-none font-semibold text-[10px]">Pending</Badge>;
    }
  };

  const clearFilters = () => {
    setStatusFilter('All');
    setProjectFilter('All');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-background pb-24 flex flex-col font-sans">
      {/* ── Sticky Navigation Header ── */}
      <div className="sticky top-0 z-20 bg-background border-b border-border/50 px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/60 -ml-2 shrink-0 h-10 w-10"
          onClick={() => navigate('/sold')}
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Button>
        
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-foreground truncate font-headings">Sold Transactions</h1>
          <p className="text-[10px] text-muted-foreground">{filteredDeals.length} properties closed</p>
        </div>

        {/* ── Filters Slide Drawer ── */}
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-input h-10 w-10 shrink-0 border-border/60">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-bottom-sheet p-6 max-h-[70vh] outline-none">
            <SheetHeader className="mb-4">
              <SheetTitle className="text-base font-bold text-foreground font-headings">Filter Transactions</SheetTitle>
            </SheetHeader>

            <div className="space-y-4">
              {/* Project Filter */}
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Project</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setProjectFilter('All')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                      projectFilter === 'All' ? 'bg-primary border-primary text-white' : 'bg-secondary border-border/50 text-muted-foreground'
                    }`}
                  >
                    All Projects
                  </button>
                  {uniqueProjects.map(proj => (
                    <button
                      key={proj}
                      onClick={() => setProjectFilter(proj)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                        projectFilter === proj ? 'bg-primary border-primary text-white' : 'bg-secondary border-border/50 text-muted-foreground'
                      }`}
                    >
                      {proj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Status</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter('All')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                      statusFilter === 'All' ? 'bg-primary border-primary text-white' : 'bg-secondary border-border/50 text-muted-foreground'
                    }`}
                  >
                    All Statuses
                  </button>
                  {uniqueStatuses.map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                        statusFilter === status ? 'bg-primary border-primary text-white' : 'bg-secondary border-border/50 text-muted-foreground'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button variant="outline" className="flex-1 rounded-button" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button className="flex-1 rounded-button" onClick={() => setIsFilterOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ── Search Bar ── */}
      <div className="px-4 pt-3 pb-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by ID, buyer or unit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-secondary-surface border border-border/60 rounded-input h-10 pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-primary placeholder:text-muted-foreground/60 transition-colors"
          />
        </div>
      </div>

      {/* ── Listings Display (Progressive Disclosure) ── */}
      <div className="flex-1 px-4 pt-3 space-y-3">
        {filteredDeals.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-card border border-border/30">
            <FilterX className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm font-semibold text-muted-foreground">No matches found</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Try adjusting your filters or search query</p>
            <Button variant="outline" className="mt-4 rounded-button h-9 text-xs" onClick={clearFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          filteredDeals.map(deal => (
            <Card
              key={deal.id}
              onClick={() => navigate(`/sold/${deal.id}`)}
              className="p-4 bg-card border-none shadow-xs rounded-card hover:shadow-sm transition-all active:scale-[0.99] cursor-pointer flex flex-col gap-3.5"
            >
              {/* Unit, Project & Status */}
              <div className="flex justify-between items-start">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-foreground">{deal.unitNumber}</span>
                    <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-md border border-border/40 font-medium truncate">
                      {deal.projectName}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">ID: {deal.id}</p>
                </div>
                {getStatusBadge(deal.registrationStatus)}
              </div>

              {/* Transaction Values & Client Details */}
              <div className="grid grid-cols-2 gap-2 bg-secondary/50 p-2.5 rounded-xl text-[11px]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="font-semibold text-foreground truncate">{deal.buyerName}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <IndianRupee className="w-3.5 h-3.5 text-primary" />
                  <span className="font-bold text-foreground">{deal.saleValue}</span>
                </div>
              </div>

              {/* Commission and Timeline */}
              <div className="flex justify-between items-center text-[10px] text-muted-foreground border-t border-border/40 pt-2.5">
                <div className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Comm: <strong className="text-foreground">{deal.commissionValue}</strong> ({deal.commissionPercentage}%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{new Date(deal.soldDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
