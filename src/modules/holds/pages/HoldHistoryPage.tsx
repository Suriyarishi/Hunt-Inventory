import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockHolds } from '../constants/mockData';
import { HoldStatusBadge } from '../components/HoldStatusBadge';
import type { HoldStatus } from '../types';

const STATUS_FILTERS: { label: string; value: HoldStatus | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Active', value: 'Active' },
  { label: 'Released', value: 'Released' },
  { label: 'Converted', value: 'Converted' },
  { label: 'Extended', value: 'Extended' },
  { label: 'Expiring', value: 'Expiring' },
];

export default function HoldHistoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<HoldStatus | 'All'>('All');

  const filtered = mockHolds.filter(h => {
    const matchStatus = statusFilter === 'All' || h.status === statusFilter;
    const matchSearch = h.unitNumber.toLowerCase().includes(search.toLowerCase()) ||
      h.clientName.toLowerCase().includes(search.toLowerCase()) ||
      h.projectName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  }).sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background pb-8 pt-safe">
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-md border-b border-border/50 z-10">
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="font-bold text-sm font-headings">Hold History</h1>
          <p className="text-[11px] text-muted-foreground">{filtered.length} records</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search unit, client, project..."
            className="pl-10 h-11 rounded-input bg-secondary/30 border-border/50 text-sm"
          />
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                statusFilter === f.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground border border-border/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* History List */}
        <div className="space-y-2.5">
          {filtered.map(hold => (
            <Card
              key={hold.id}
              className="p-4 rounded-card border-none shadow-xs bg-card cursor-pointer hover:shadow-md active:scale-[0.99] transition-all"
              onClick={() => navigate(`/holds/${hold.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-foreground">{hold.unitNumber}</span>
                    <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded font-mono">{hold.id}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{hold.projectName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{hold.clientName} · {hold.brokerName}</p>
                </div>
                <div className="flex flex-col items-end gap-2 ml-3 shrink-0">
                  <HoldStatusBadge status={hold.status} size="sm" />
                  <span className="text-[10px] text-muted-foreground">{formatDate(hold.createdDate)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{hold.holdDuration}h hold</span>
                  <span>·</span>
                  <span>{hold.unitPrice}</span>
                  {hold.extensionsUsed > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-purple-600 font-medium">{hold.extensionsUsed}× extended</span>
                    </>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Card>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm font-semibold text-muted-foreground">No holds found</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
