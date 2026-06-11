import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function CompareUnitsPage() {
  const navigate = useNavigate();

  const units = [
    { num: 'A-402', project: 'Skyline Residences', floor: '4th Floor', price: '₹1.25 Cr', area: '1200 sq.ft', facing: 'North-East', commission: '₹2.5L (2%)', parking: '1 Covered' },
    { num: 'B-605', project: 'Skyline Residences', floor: '6th Floor', price: '₹1.28 Cr', area: '1200 sq.ft', facing: 'South-West', commission: '₹2.5L (2%)', parking: '1 Open' }
  ];

  return (
    <div className="h-full bg-background flex flex-col relative overflow-hidden">
      <div className="p-4 border-b border-border/50 flex items-center gap-4 bg-background z-10 shrink-0">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">Compare Units</h1>
      </div>

      <ScrollArea className="flex-1 w-full whitespace-nowrap overflow-hidden">
        <div className="flex w-max p-6 gap-6">
          {/* Label Column */}
          <div className="w-24 space-y-8 pt-16 text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky left-0 bg-background/90 backdrop-blur-sm z-10 p-2 shadow-[4px_0_12px_rgba(0,0,0,0.02)]">
             <div className="h-6 flex items-center">Project</div>
             <div className="h-6 flex items-center">Floor</div>
             <div className="h-6 flex items-center">Price</div>
             <div className="h-6 flex items-center">Carpet Area</div>
             <div className="h-6 flex items-center">Facing</div>
             <div className="h-6 flex items-center">Brokerage</div>
             <div className="h-6 flex items-center">Parking</div>
          </div>

          {/* Unit Columns */}
          {units.map((u, i) => (
            <div key={i} className="w-48 flex flex-col">
              <div className="h-16 bg-primary/10 rounded-card mb-4 flex items-center justify-center border-2 border-primary/20">
                 <h3 className="text-xl font-bold text-primary">{u.num}</h3>
              </div>
              <div className="space-y-8">
                 <div className="h-6 flex items-center text-sm font-medium truncate">{u.project}</div>
                 <div className="h-6 flex items-center text-sm">{u.floor}</div>
                 <div className="h-6 flex items-center text-sm font-bold">{u.price}</div>
                 <div className="h-6 flex items-center text-sm text-muted-foreground">{u.area}</div>
                 <div className="h-6 flex items-center text-sm">{u.facing}</div>
                 <div className="h-6 flex items-center text-sm font-semibold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full">{u.commission}</div>
                 <div className="h-6 flex items-center text-sm">{u.parking}</div>
              </div>
              <div className="mt-8">
                 <Button className="w-full rounded-button shadow-md">Reserve</Button>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
