import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Trophy, 
  Target, 
  Building2, 
  Sparkles, 
  Activity,
  Award
} from 'lucide-react';

export default function InsightsPage() {

  // High-fidelity mock data
  const marketStats = [
    { label: 'Avg. Closing Time', value: '14 Days', change: '-2 days', trend: 'up', color: 'bg-primary/15 text-primary' },
    { label: 'Active Buyers', value: '1,248', change: '+12%', trend: 'up', color: 'bg-accent-blue/15 text-accent-blue' },
    { label: 'Hot Project', value: 'Orchid Heights', change: '8.4x Demand', trend: 'neutral', color: 'bg-accent-purple/15 text-accent-purple' },
    { label: 'Market Velocity', value: 'High', change: '+18% MoM', trend: 'up', color: 'bg-warning/15 text-warning' }
  ];

  const trendingProjects = [
    { id: 1, name: 'Orchid Heights', location: 'Whitefield', velocity: 94, soldUnits: 42, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&auto=format&fit=crop&q=60' },
    { id: 2, name: 'Emerald Meadows', location: 'Sarjapur Road', velocity: 82, soldUnits: 29, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=120&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Cyber Park Towers', location: 'Electronic City', velocity: 78, soldUnits: 25, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=60' }
  ];

  const leaderboardList = [
    { rank: 1, name: 'Arjun Mehta (You)', sales: 15, volume: '₹12.4 Cr', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Admin' },
    { rank: 2, name: 'Priya Sharma', sales: 13, volume: '₹10.8 Cr', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya' },
    { rank: 3, name: 'Rohan Gupta', sales: 11, volume: '₹9.2 Cr', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rohan' },
    { rank: 4, name: 'Ananya Iyer', sales: 9, volume: '₹7.5 Cr', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ananya' },
    { rank: 5, name: 'Vikram Singh', sales: 8, volume: '₹6.8 Cr', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Vikram' }
  ];

  return (
    <div className="min-h-screen bg-background pb-24 pt-safe flex flex-col relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" />

      {/* Sticky Header */}
      <div className="p-4 z-20 sticky top-0 bg-background/50 backdrop-blur-md border-b border-border/50">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
             <Activity className="w-6 h-6 text-primary" /> Insights
          </h1>
          <Badge className="bg-primary-soft text-primary hover:bg-primary-soft border-none flex items-center gap-1 text-[11px] font-bold px-2.5 py-1">
            <Sparkles className="w-3 h-3" /> PRO MODE
          </Badge>
        </div>
      </div>

      <div className="p-4 relative z-10 flex-1 space-y-6">
        <Tabs defaultValue="market" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50 rounded-button p-1 h-12 mb-6">
            <TabsTrigger value="market" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs">Market</TabsTrigger>
            <TabsTrigger value="leaderboard" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs">Leaderboard</TabsTrigger>
            <TabsTrigger value="performance" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs">My Sales</TabsTrigger>
          </TabsList>

          {/* Market Tab */}
          <TabsContent value="market" className="space-y-6 animate-slide-up-fade">
            {/* Grid of Key Market Metrics */}
            <div className="grid grid-cols-2 gap-3">
              {marketStats.map((stat, index) => (
                <Card key={index} className="p-4 rounded-card border-none shadow-xs bg-card flex flex-col justify-between h-[115px]">
                  <span className="text-[11px] font-semibold text-muted-foreground leading-normal">{stat.label}</span>
                  <div className="mt-2">
                    <span className="text-xl font-extrabold text-foreground block">{stat.value}</span>
                    <div className="flex items-center gap-1 mt-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${stat.color}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Trending Projects Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-primary" /> Hot Properties
                </h3>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Demand Index</span>
              </div>

              <div className="space-y-3">
                {trendingProjects.map((project) => (
                  <Card key={project.id} className="p-3.5 rounded-card border-none shadow-xs bg-card flex items-center gap-3.5 hover:shadow-md transition-all">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-border/50 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-foreground truncate">{project.name}</h4>
                      <p className="text-xs text-muted-foreground">{project.location}</p>
                      
                      {/* Demand Progress Bar */}
                      <div className="mt-2 flex items-center gap-2">
                        <Progress value={project.velocity} className="h-1.5 bg-secondary [&>div]:bg-primary flex-1" />
                        <span className="text-[10px] font-bold text-primary whitespace-nowrap">{project.velocity}% velocity</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Market Advisory */}
            <Card className="p-4 rounded-card border border-border/50 bg-secondary/15">
              <h3 className="font-semibold text-xs text-foreground mb-1.5 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-primary" /> Market Advisory
              </h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Whitefield region has seen a +4.2% price expansion this quarter due to the newly opened metro extension. Leads showing high interest in 3BHK premium inventories.
              </p>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6 animate-slide-up-fade">
            {/* Visual Podium for Top 3 */}
            <div className="flex justify-center items-end gap-3 pt-6 pb-2">
              {/* #2 Rank */}
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <Avatar className="h-14 w-14 ring-2 ring-slate-300 shadow-md">
                    <AvatarImage src={leaderboardList[1].avatar} />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <span className="absolute -top-2.5 -right-1.5 bg-slate-300 text-slate-900 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-background">
                    2
                  </span>
                </div>
                <span className="text-xs font-bold text-foreground text-center truncate w-20">Priya</span>
                <span className="text-[10px] font-medium text-muted-foreground">13 Sales</span>
                <div className="h-16 w-16 bg-slate-200 dark:bg-slate-800/80 rounded-t-lg mt-2 flex items-center justify-center">
                  <span className="font-bold text-slate-400 text-lg">2nd</span>
                </div>
              </div>

              {/* #1 Rank (Center Podium) */}
              <div className="flex flex-col items-center z-10">
                <div className="relative mb-2">
                  <Avatar className="h-18 w-18 ring-4 ring-warning shadow-lg">
                    <AvatarImage src={leaderboardList[0].avatar} />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <span className="absolute -top-3 -right-2 bg-warning text-warning-foreground text-[10px] font-extrabold w-6 h-6 rounded-full flex items-center justify-center border-2 border-background animate-bounce">
                    <Trophy className="w-3 h-3 text-white" />
                  </span>
                </div>
                <span className="text-sm font-bold text-foreground text-center truncate w-24">Arjun (You)</span>
                <span className="text-xs font-bold text-primary">15 Sales</span>
                <div className="h-24 w-20 bg-primary/20 dark:bg-primary/10 border-t-2 border-primary rounded-t-lg mt-2 flex flex-col items-center justify-center">
                  <span className="font-extrabold text-primary text-xl">1st</span>
                </div>
              </div>

              {/* #3 Rank */}
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <Avatar className="h-12 w-12 ring-2 ring-amber-600/50 shadow-md">
                    <AvatarImage src={leaderboardList[2].avatar} />
                    <AvatarFallback>RG</AvatarFallback>
                  </Avatar>
                  <span className="absolute -top-2 -right-1 bg-amber-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-background">
                    3
                  </span>
                </div>
                <span className="text-xs font-bold text-foreground text-center truncate w-20">Rohan</span>
                <span className="text-[10px] font-medium text-muted-foreground">11 Sales</span>
                <div className="h-12 w-14 bg-amber-900/10 dark:bg-amber-950/20 rounded-t-lg mt-2 flex items-center justify-center">
                  <span className="font-bold text-amber-600/70 text-base">3rd</span>
                </div>
              </div>
            </div>

            {/* Rest of the leaderboard list */}
            <div className="space-y-2 mt-4">
              {leaderboardList.map((broker) => (
                <Card 
                  key={broker.rank} 
                  className={`p-3 rounded-card border-none shadow-xs flex items-center justify-between transition-all ${
                    broker.rank === 1 ? 'bg-primary-soft/30 ring-1 ring-primary/25' : 'bg-card'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-4 text-center">
                      #{broker.rank}
                    </span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={broker.avatar} />
                      <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-foreground truncate">{broker.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{broker.volume} Volume</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-secondary/80 text-foreground font-extrabold text-xs">
                    {broker.sales} Sales
                  </Badge>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6 animate-slide-up-fade">
            {/* Sales Target Card */}
            <Card className="p-5 rounded-card border-none shadow-md bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/25 rounded-full blur-3xl -mr-10 -mt-10" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Active Target (Q2)</p>
                    <h4 className="text-lg font-bold text-white">₹15.0 Cr Sales Volume</h4>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>₹12.4 Cr Achieved</span>
                    <span>83%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: '83%' }} />
                  </div>
                  <p className="text-[10px] text-slate-300 text-center">
                    Sell ₹2.6 Cr more to unlock Q2 bonus!
                  </p>
                </div>
              </div>
            </Card>

            {/* Performance Conversion Funnel */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 px-1">
                <Award className="w-4 h-4 text-primary" /> Sales Funnel Conversion
              </h3>
              
              <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-4">
                {/* Leads Contacted */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-foreground">Leads Contacted</span>
                    <span className="font-bold text-muted-foreground">212</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent-blue" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Site Visits Scheduled */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-foreground">Site Visits Scheduled</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-success bg-success/10 px-1 rounded-sm">28% conv.</span>
                      <span className="font-bold text-muted-foreground">60</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent-purple" style={{ width: '28%' }} />
                  </div>
                </div>

                {/* Holds Placed */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-foreground">Holds Placed</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-success bg-success/10 px-1 rounded-sm">42% conv.</span>
                      <span className="font-bold text-muted-foreground">25</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-warning" style={{ width: '12%' }} />
                  </div>
                </div>

                {/* Bookings Done */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-foreground">Final Bookings</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-success bg-success/10 px-1 rounded-sm">60% conv.</span>
                      <span className="font-bold text-muted-foreground">15</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '7%' }} />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
