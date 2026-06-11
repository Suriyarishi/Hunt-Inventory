import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockHolds, mockWaitlist } from '../constants/mockData';
import { Lock, Clock, Plus, BarChart3, Users, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CreateHoldSheet } from '../components/CreateHoldSheet';

export default function HoldHubPage() {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);

  const activeHolds = mockHolds.filter(h => h.status === 'Active');

  return (
    <div className="min-h-screen bg-background pb-24 pt-safe flex flex-col">
      <div className="p-4 bg-background z-20 sticky top-0 border-b border-border/50 flex items-center justify-between gap-2">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2 shrink-0" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 flex-1">
           <Lock className="w-6 h-6 text-primary" /> Holds
        </h1>
        <Button size="icon" className="rounded-full shadow-md w-10 h-10 shrink-0" onClick={() => setCreateOpen(true)}>
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50 rounded-button p-1 h-12 mb-6">
            <TabsTrigger value="active" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs px-1">Active ({activeHolds.length})</TabsTrigger>
            <TabsTrigger value="waitlist" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs px-1">Waitlist</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs px-1">Analytics</TabsTrigger>
          </TabsList>

          {/* Active Holds Tab */}
          <TabsContent value="active" className="space-y-4 animate-slide-up-fade">
            {activeHolds.map(hold => (
              <Card 
                key={hold.id} 
                className="p-4 rounded-card border-none shadow-xs hover:shadow-md transition-all cursor-pointer bg-card"
                onClick={() => navigate(`/holds/${hold.id}`)}
              >
                 <div className="flex justify-between items-start mb-3">
                   <div>
                     <h3 className="font-bold text-foreground text-lg">{hold.unitNumber}</h3>
                     <p className="text-xs text-muted-foreground">{hold.projectName}</p>
                   </div>
                   <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                     {hold.status}
                   </Badge>
                 </div>
                 
                 <div className="flex items-center gap-2 text-xs font-semibold text-warning bg-warning/10 p-2 rounded-lg mb-4 w-fit">
                    <Clock className="w-4 h-4" /> Expires in 14h 22m
                 </div>

                 <div className="flex justify-between items-center border-t border-border/50 pt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                        {hold.leadName.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-foreground">{hold.leadName}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                 </div>
              </Card>
            ))}
          </TabsContent>

          {/* Waitlist Tab */}
          <TabsContent value="waitlist" className="space-y-4 animate-slide-up-fade">
            {mockWaitlist.map(entry => (
              <Card key={entry.id} className="p-4 rounded-card border-none shadow-xs bg-card flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-secondary flex flex-col items-center justify-center shrink-0 border-2 border-border/50">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase leading-none">Pos</span>
                    <span className="font-bold text-lg leading-none mt-0.5 text-foreground">{entry.queuePosition}</span>
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-sm text-foreground">{entry.unitNumber}</h4>
                    <p className="text-xs text-muted-foreground">{entry.projectName}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs font-medium text-primary bg-primary/5 w-fit px-2 py-0.5 rounded-md">
                      <Users className="w-3 h-3" /> {entry.leadName}
                    </div>
                 </div>
              </Card>
            ))}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4 animate-slide-up-fade">
            <div className="grid grid-cols-2 gap-3">
               <Card className="p-4 rounded-card border-none shadow-xs bg-primary/10">
                 <p className="text-xs text-muted-foreground mb-1">Avg Hold Duration</p>
                 <p className="text-xl font-bold text-primary">18.5h</p>
               </Card>
               <Card className="p-4 rounded-card border-none shadow-xs bg-success/10">
                 <p className="text-xs text-muted-foreground mb-1">Conversion Rate</p>
                 <p className="text-xl font-bold text-success flex items-center gap-1">
                   <BarChart3 className="w-4 h-4" /> 42%
                 </p>
               </Card>
               <Card className="p-4 rounded-card border-none shadow-xs bg-destructive/10">
                 <p className="text-xs text-muted-foreground mb-1">Expired Holds</p>
                 <p className="text-xl font-bold text-destructive">14</p>
               </Card>
               <Card className="p-4 rounded-card border-none shadow-xs bg-warning/10">
                 <p className="text-xs text-muted-foreground mb-1">Extensions</p>
                 <p className="text-xl font-bold text-warning">8</p>
               </Card>
            </div>
            
            <Card className="p-4 rounded-card border border-border/50 bg-secondary/20 mt-6">
              <h3 className="font-semibold text-sm mb-2">Notice</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Units that expire are automatically released back into the global inventory pool. Waitlisted brokers will be notified instantly via push notifications.</p>
            </Card>
          </TabsContent>

        </Tabs>
      </div>

      <CreateHoldSheet open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
