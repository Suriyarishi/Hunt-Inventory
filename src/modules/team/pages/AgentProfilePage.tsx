import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTeam } from '../constants/mockData';
import { ArrowLeft, Target, Percent, ShieldCheck, Mail, Phone, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export default function AgentProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const agent = mockTeam.find(a => a.id === id) || mockTeam[0];

  const [agencySplit, setAgencySplit] = useState(agent.commissionSplit.agency);
  const agentSplit = 100 - agencySplit;

  const [permissions, setPermissions] = useState(agent.permissions);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const targetProgress = Math.min((agent.performance.monthlyAchieved / agent.performance.monthlyTarget) * 100, 100);

  return (
    <div className="min-h-screen bg-background pb-32 pt-safe flex flex-col">
      <div className="p-4 flex items-center justify-between z-10 sticky top-0 bg-background/90 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-bold">Agent Profile</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings2 className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4 animate-slide-up-fade space-y-6">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
           <div className="relative">
             <img src={agent.avatarUrl} alt={agent.name} className="w-24 h-24 rounded-full bg-secondary border-4 border-background shadow-md mb-3" />
             <div className="absolute bottom-2 right-0 w-6 h-6 bg-success border-2 border-background rounded-full" />
           </div>
           <h2 className="text-2xl font-bold">{agent.name}</h2>
           <p className="text-muted-foreground">{agent.role}</p>
           
           <div className="flex gap-2 mt-4">
              <Button variant="outline" size="icon" className="rounded-full shadow-xs"><Phone className="w-4 h-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full shadow-xs"><Mail className="w-4 h-4" /></Button>
           </div>
        </div>

        {/* Performance & Targets */}
        <Card className="p-5 rounded-card border border-border/50 bg-card space-y-4">
           <div className="flex items-center gap-2 pb-2 border-b border-border/50">
             <Target className="w-5 h-5 text-primary" />
             <h3 className="font-bold text-sm">Monthly Target</h3>
           </div>
           
           <div>
              <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-2">
                <span>Achieved: {formatCurrency(agent.performance.monthlyAchieved)}</span>
                <span>Goal: {formatCurrency(agent.performance.monthlyTarget)}</span>
              </div>
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full transition-all duration-1000 ${targetProgress >= 100 ? 'bg-success' : 'bg-primary'}`} 
                  style={{ width: `${targetProgress}%` }} 
                />
              </div>
              {targetProgress >= 100 && <p className="text-[10px] text-success font-bold">Target Achieved! 🎯</p>}
           </div>

           <div className="grid grid-cols-2 gap-3 pt-2">
             <div className="bg-secondary/30 p-3 rounded-lg text-center">
               <p className="text-xs text-muted-foreground">Active Leads</p>
               <h4 className="text-xl font-bold">{agent.performance.activeLeads}</h4>
             </div>
             <div className="bg-secondary/30 p-3 rounded-lg text-center">
               <p className="text-xs text-muted-foreground">Conversion</p>
               <h4 className="text-xl font-bold text-accent-blue">{agent.performance.conversionRate}%</h4>
             </div>
           </div>
        </Card>

        {/* Commission Sharing Engine */}
        <Card className="p-5 rounded-card border border-border/50 bg-card space-y-4">
           <div className="flex items-center gap-2 pb-2 border-b border-border/50">
             <Percent className="w-5 h-5 text-warning" />
             <h3 className="font-bold text-sm">Commission Sharing</h3>
           </div>
           
           <div className="space-y-4">
              <p className="text-xs text-muted-foreground">Drag to adjust the revenue split between the Master Agency and the Sub-Agent.</p>
              
              <div className="flex justify-between font-bold text-lg">
                 <div className="flex flex-col">
                   <span className="text-sm text-muted-foreground">Agency</span>
                   <span className="text-primary">{agencySplit}%</span>
                 </div>
                 <div className="flex flex-col text-right">
                   <span className="text-sm text-muted-foreground">Agent</span>
                   <span className="text-success">{agentSplit}%</span>
                 </div>
              </div>

              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                value={agencySplit} 
                onChange={(e) => setAgencySplit(parseInt(e.target.value))}
                className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
              />
           </div>
        </Card>

        {/* Permissions */}
        <Card className="p-5 rounded-card border border-border/50 bg-card space-y-4">
           <div className="flex items-center gap-2 pb-2 border-b border-border/50">
             <ShieldCheck className="w-5 h-5 text-destructive" />
             <h3 className="font-bold text-sm">Permissions</h3>
           </div>
           
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-semibold">Export Leads</p>
                   <p className="text-[10px] text-muted-foreground">Allow downloading lead data to CSV/Excel.</p>
                 </div>
                 <Switch 
                   checked={permissions.exportLeads}
                   onCheckedChange={(c: boolean) => setPermissions(p => ({...p, exportLeads: c}))}
                 />
              </div>
              
              <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-semibold">View All Inventory</p>
                   <p className="text-[10px] text-muted-foreground">Allow viewing all project availability.</p>
                 </div>
                 <Switch 
                   checked={permissions.viewAllInventory}
                   onCheckedChange={(c: boolean) => setPermissions(p => ({...p, viewAllInventory: c}))}
                 />
              </div>

              <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-semibold">Manage Holds</p>
                   <p className="text-[10px] text-muted-foreground">Allow creating and releasing unit holds.</p>
                 </div>
                 <Switch 
                   checked={permissions.manageHolds}
                   onCheckedChange={(c: boolean) => setPermissions(p => ({...p, manageHolds: c}))}
                 />
              </div>
           </div>
        </Card>

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border/50 pb-safe z-30">
        <Button className="w-full h-14 rounded-button font-bold text-lg shadow-lg">
          Save Configuration
        </Button>
      </div>

    </div>
  );
}
