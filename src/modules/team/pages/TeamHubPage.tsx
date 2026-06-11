import { useNavigate } from 'react-router-dom';
import { mockTeam } from '../constants/mockData';
import { Users, Crown, ChevronRight, Target, TrendingUp, UserPlus, Medal, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function TeamHubPage() {
  const navigate = useNavigate();

  // Sort team by revenue for leaderboard
  const leaderboard = [...mockTeam].sort((a, b) => b.performance.ytdRevenue - a.performance.ytdRevenue);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Platinum': return 'bg-slate-900 text-slate-100';
      case 'Gold': return 'bg-yellow-500/20 text-yellow-700';
      case 'Silver': return 'bg-slate-200 text-slate-700';
      case 'Bronze': return 'bg-amber-700/20 text-amber-800';
      default: return 'bg-secondary text-muted-foreground';
    }
  };

  const getRankMedal = (index: number) => {
    if (index === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Medal className="w-5 h-5 text-slate-400" />;
    if (index === 2) return <Medal className="w-5 h-5 text-amber-700" />;
    return <span className="w-5 text-center font-bold text-muted-foreground">{index + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-safe flex flex-col">
      <div className="p-4 bg-background z-20 sticky top-0 border-b border-border/50 flex items-center justify-between gap-2">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2 shrink-0" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 flex-1">
           <Users className="w-6 h-6 text-primary" /> My Team
        </h1>
        <Button size="icon" className="rounded-full shadow-md w-10 h-10 bg-primary/10 text-primary hover:bg-primary/20 shrink-0">
          <UserPlus className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4">
         {/* Team Performance Overview */}
         <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="col-span-2 p-4 rounded-card border-none shadow-xs bg-card flex items-center justify-between">
               <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Team Target (June)</p>
                  <h3 className="text-2xl font-bold text-foreground">₹2.5 Cr</h3>
               </div>
               <div className="text-right">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Achieved</p>
                  <h3 className="text-2xl font-bold text-success">₹2.65 Cr</h3>
               </div>
            </Card>
            <Card className="p-3 rounded-card border-none shadow-xs bg-secondary/30">
               <TrendingUp className="w-4 h-4 text-accent-blue mb-2" />
               <h4 className="text-lg font-bold">14.2%</h4>
               <p className="text-[10px] text-muted-foreground">Avg. Conversion</p>
            </Card>
            <Card className="p-3 rounded-card border-none shadow-xs bg-secondary/30">
               <Target className="w-4 h-4 text-warning mb-2" />
               <h4 className="text-lg font-bold">82</h4>
               <p className="text-[10px] text-muted-foreground">Active Leads</p>
            </Card>
         </div>

        <Tabs defaultValue="roster" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-button p-1 h-12 mb-6">
            <TabsTrigger value="roster" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs">Agent Roster</TabsTrigger>
            <TabsTrigger value="leaderboard" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Roster Tab */}
          <TabsContent value="roster" className="space-y-4 animate-slide-up-fade">
             {mockTeam.map(agent => (
               <Card 
                 key={agent.id} 
                 className="p-4 rounded-card border border-border/50 shadow-xs hover:shadow-md transition-all cursor-pointer bg-card flex items-center gap-4"
                 onClick={() => navigate(`/team/agent/${agent.id}`)}
               >
                  <img src={agent.avatarUrl} alt={agent.name} className="w-12 h-12 rounded-full bg-secondary shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-start mb-0.5">
                        <h4 className="font-bold text-sm text-foreground truncate">{agent.name}</h4>
                        <Badge variant="secondary" className={`border-none px-2 py-0 h-5 text-[10px] ${getTierColor(agent.tier)}`}>
                          {agent.tier}
                        </Badge>
                     </div>
                     <p className="text-xs text-muted-foreground truncate mb-1">{agent.role}</p>
                     
                     <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-semibold flex items-center gap-1 ${agent.status === 'Active' ? 'text-success' : 'text-warning'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Active' ? 'bg-success' : 'bg-warning'}`} />
                          {agent.status}
                        </span>
                     </div>
                  </div>
                  
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
               </Card>
             ))}
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-3 animate-slide-up-fade">
             {leaderboard.map((agent, index) => (
               <Card 
                 key={agent.id} 
                 className={`p-4 rounded-card border-none shadow-xs flex items-center gap-4 ${index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20' : 'bg-card'}`}
                 onClick={() => navigate(`/team/agent/${agent.id}`)}
               >
                  <div className="w-6 shrink-0 flex justify-center">
                    {getRankMedal(index)}
                  </div>
                  
                  <img src={agent.avatarUrl} alt={agent.name} className="w-10 h-10 rounded-full bg-secondary shrink-0 border border-border/50" />
                  
                  <div className="flex-1 min-w-0">
                     <h4 className="font-bold text-sm text-foreground truncate">{agent.name}</h4>
                     <p className="text-[10px] text-muted-foreground">YTD Revenue</p>
                  </div>

                  <div className="text-right">
                     <h4 className="font-bold text-sm text-primary">{formatCurrency(agent.performance.ytdRevenue)}</h4>
                     <p className="text-[10px] text-muted-foreground">{agent.performance.conversionRate}% Conv.</p>
                  </div>
               </Card>
             ))}
          </TabsContent>

        </Tabs>
      </div>

    </div>
  );
}
