import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockClients } from '../constants/mockData';
import { Search, Filter, Phone, Mail, ChevronRight, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ClientListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredClients = mockClients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Platinum': return 'bg-slate-800 text-slate-100';
      case 'Gold': return 'bg-yellow-500/20 text-yellow-700';
      case 'Silver': return 'bg-slate-200 text-slate-700';
      case 'VIP': return 'bg-purple-500/20 text-purple-700';
      default: return 'bg-secondary text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-safe flex flex-col">
      <div className="p-4 bg-background z-20 sticky top-0 border-b border-border/50 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Client Portfolio</h1>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search clients..." 
              className="pl-9 bg-secondary/50 border-none rounded-button h-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="secondary" size="icon" className="rounded-button w-11 h-11 bg-secondary/50">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3 animate-slide-up-fade">
        {filteredClients.map(client => (
          <Card key={client.id} className="p-4 rounded-card border-none shadow-xs hover:shadow-md transition-all cursor-pointer bg-card" onClick={() => navigate(`/clients/${client.id}`)}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl relative">
                  {client.name.charAt(0)}
                  {client.tier === 'Platinum' && (
                    <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1 border-2 border-card">
                      <Crown className="w-3 h-3 text-yellow-500" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{client.name}</h3>
                  <Badge variant="secondary" className={`mt-1 border-none text-[10px] font-bold ${getTierColor(client.tier)}`}>
                    {client.tier}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">LTV</p>
                <p className="font-bold text-primary">{client.lifetimeValue}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {client.phone}</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {client.email.split('@')[0]}...</span>
            </div>

            <div className="flex justify-between items-center border-t border-border/50 pt-3">
               <span className="text-xs font-medium text-foreground">Invested: {client.totalInvested}</span>
               <div className="flex items-center gap-1 text-xs font-bold text-primary">
                 View Profile <ChevronRight className="w-4 h-4" />
               </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
