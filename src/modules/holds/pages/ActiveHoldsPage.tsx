import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockHolds } from '../constants/mockData';
import { HoldCard } from '../components/HoldCard';

export default function ActiveHoldsPage() {
  const navigate = useNavigate();
  const holds = mockHolds.filter(h => h.status === 'Active');

  return (
    <div className="min-h-screen bg-background pb-8 pt-safe">
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-md border-b border-border/50 z-10">
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="font-bold text-sm font-headings">Active Holds</h1>
          <p className="text-[11px] text-muted-foreground">{holds.length} holds</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {holds.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-bold text-muted-foreground/50 mb-2">No active holds</p>
            <Button className="rounded-button h-11 font-bold" onClick={() => navigate('/holds/new')}>
              <Plus className="w-4 h-4 mr-1.5" /> Create Hold
            </Button>
          </div>
        ) : (
          holds.map(hold => <HoldCard key={hold.id} hold={hold} />)
        )}
      </div>
    </div>
  );
}
