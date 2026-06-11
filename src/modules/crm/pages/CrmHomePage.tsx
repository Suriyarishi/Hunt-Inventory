import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLeads } from '../constants/mockData';
import { Filter, Search, Phone, LayoutList, KanbanSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

const stages = ['New', 'Contacted', 'Site Visit', 'Negotiation', 'Won', 'Lost'];

export default function CrmHomePage() {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'pipeline'>('pipeline');
  const [search, setSearch] = useState('');

  const filteredLeads = mockLeads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search));

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success bg-success/10';
    if (score >= 50) return 'text-warning bg-warning/10';
    return 'text-destructive bg-destructive/10';
  };

  return (
    <div className="flex-1 flex flex-col bg-background pb-24 pt-safe relative">
      <div className="p-4 bg-background z-20 sticky top-0 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">CRM Pipeline</h1>
          <div className="bg-secondary/50 rounded-button p-1 flex">
            <button 
              className={`p-2 rounded-[12px] transition-all ${view === 'list' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
              onClick={() => setView('list')}
            >
              <LayoutList className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded-[12px] transition-all ${view === 'pipeline' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
              onClick={() => setView('pipeline')}
            >
              <KanbanSquare className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search leads..." 
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

      {view === 'list' ? (
        <div className="p-4 space-y-3 animate-slide-up-fade">
          {filteredLeads.map(lead => (
            <Card key={lead.id} className="p-4 rounded-card border-none shadow-xs hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/crm/lead/${lead.id}`)}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{lead.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" /> {lead.phone}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-[10px] font-bold ${getScoreColor(lead.score)}`}>
                  {lead.score} Score
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <Badge variant="secondary" className="font-medium bg-secondary text-muted-foreground border-none">
                  {lead.stage}
                </Badge>
                <div className="text-muted-foreground font-medium">{lead.budget}</div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <ScrollArea className="flex-1 w-full whitespace-nowrap bg-secondary/20">
          <div className="flex w-max p-4 gap-4 h-[calc(100vh-200px)] min-h-[500px]">
            {stages.map(stage => {
              const stageLeads = filteredLeads.filter(l => l.stage === stage);
              return (
                <div key={stage} className="w-72 flex flex-col bg-background/50 rounded-card border border-border/50 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                  <div className="p-3 border-b border-border/50 flex justify-between items-center bg-card rounded-t-card">
                    <h3 className="font-bold text-sm text-foreground">{stage}</h3>
                    <Badge variant="secondary" className="rounded-full bg-secondary text-muted-foreground">{stageLeads.length}</Badge>
                  </div>
                  <ScrollArea className="flex-1 p-2">
                    <div className="space-y-2 pb-4">
                      {stageLeads.map(lead => (
                        <Card key={lead.id} className="p-3 rounded-[16px] border border-border/50 shadow-sm cursor-pointer hover:shadow-md hover:border-primary/30 transition-all bg-card" onClick={() => navigate(`/crm/lead/${lead.id}`)}>
                           <div className="flex justify-between items-start mb-2">
                             <h4 className="font-bold text-sm truncate pr-2">{lead.name}</h4>
                             <div className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${getScoreColor(lead.score)}`}>
                               {lead.score}
                             </div>
                           </div>
                           <p className="text-xs text-muted-foreground mb-3 truncate">{lead.preferredLocations.join(', ')}</p>
                           <div className="flex justify-between items-center border-t border-border/50 pt-2">
                             <span className="text-[10px] font-bold text-foreground">{lead.budget}</span>
                             <ChevronRight className="w-4 h-4 text-muted-foreground" />
                           </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
}
