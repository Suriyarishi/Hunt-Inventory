import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function CompareProjectsPage() {
  const navigate = useNavigate();

  const projects = [
    { name: 'Skyline Residences', builder: 'Apex Group', status: 'Under Construction', price: '₹1.2 Cr', area: '1200 - 1800 sq.ft', pool: true, gym: true, club: true },
    { name: 'Aurora Heights', builder: 'Zenith', status: 'Ready to Move', price: '₹1.5 Cr', area: '1400 - 2000 sq.ft', pool: true, gym: true, club: false }
  ];

  return (
    <div className="min-h-screen bg-background pt-safe flex flex-col">
      <div className="p-4 border-b border-border/50 flex items-center gap-4 bg-background z-10 sticky top-0">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">Compare Projects</h1>
      </div>

      <ScrollArea className="flex-1 w-full whitespace-nowrap">
        <div className="flex w-max p-6 gap-6">
          {/* Label Column */}
          <div className="w-24 space-y-8 pt-32 text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky left-0 bg-background/90 backdrop-blur-sm z-10 p-2 shadow-[4px_0_12px_rgba(0,0,0,0.02)]">
             <div className="h-6 flex items-center">Developer</div>
             <div className="h-6 flex items-center">Status</div>
             <div className="h-6 flex items-center">Price From</div>
             <div className="h-6 flex items-center">Carpet Area</div>
             <div className="h-6 flex items-center">Swimming Pool</div>
             <div className="h-6 flex items-center">Gymnasium</div>
             <div className="h-6 flex items-center">Club House</div>
          </div>

          {/* Project Columns */}
          {projects.map((p, i) => (
            <div key={i} className="w-64 flex flex-col">
              <div className="h-32 bg-secondary rounded-t-card mb-4 overflow-hidden relative">
                 <img src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80&sig=${i+10}`} alt={p.name} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                   <h3 className="text-white font-bold truncate">{p.name}</h3>
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="h-6 flex items-center text-sm font-medium">{p.builder}</div>
                 <div className="h-6 flex items-center text-sm"><span className="bg-success/10 text-success px-2 py-0.5 rounded-full text-[10px] font-bold">{p.status}</span></div>
                 <div className="h-6 flex items-center text-sm font-bold">{p.price}</div>
                 <div className="h-6 flex items-center text-sm text-muted-foreground">{p.area}</div>
                 <div className="h-6 flex items-center">{p.pool ? <Check className="w-5 h-5 text-success" /> : <X className="w-5 h-5 text-destructive" />}</div>
                 <div className="h-6 flex items-center">{p.gym ? <Check className="w-5 h-5 text-success" /> : <X className="w-5 h-5 text-destructive" />}</div>
                 <div className="h-6 flex items-center">{p.club ? <Check className="w-5 h-5 text-success" /> : <X className="w-5 h-5 text-destructive" />}</div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
