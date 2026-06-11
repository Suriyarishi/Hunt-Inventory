import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, TrendingUp } from 'lucide-react';

export function InsightsAndLeaderboard() {
  return (
    <div className="px-6 pb-6 animate-slide-up-fade" style={{ animationDelay: '250ms' }}>
      
      {/* Market Insights */}
      <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Market Insights</h3>
      <Card className="border-none shadow-xs rounded-card p-5 mb-6 bg-gradient-to-br from-secondary to-white dark:from-secondary dark:to-background">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Avg. Closing Time</p>
            <h4 className="text-2xl font-bold text-foreground">14 Days</h4>
          </div>
          <div className="flex items-center gap-1 text-success text-xs font-medium bg-success/10 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            <span>-2 days</span>
          </div>
        </div>
        <Progress value={65} className="h-2 bg-secondary-foreground/10 [&>div]:bg-primary" />
        <p className="text-[10px] text-muted-foreground mt-2 text-right">Faster than 65% of market</p>
      </Card>

      {/* Leaderboard */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-semibold text-foreground">Top Brokers</h3>
        <Trophy className="w-4 h-4 text-warning drop-shadow-sm" />
      </div>
      <Card className="border-none shadow-xs rounded-card p-1">
        {[1, 2, 3].map((rank) => (
          <div key={rank} className="flex items-center justify-between p-3 border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold w-4 text-center text-muted-foreground">#{rank}</span>
              <Avatar className="h-8 w-8 ring-1 ring-border shadow-xs">
                <AvatarImage src={`https://i.pravatar.cc/150?img=${rank + 20}`} />
                <AvatarFallback>B{rank}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">Broker {rank}</span>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">{15 - rank} Sales</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
