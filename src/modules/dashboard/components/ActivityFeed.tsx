import { Card } from '@/components/ui/card';
import { Megaphone, CheckCircle2, History } from 'lucide-react';

export function ActivityFeed() {
  return (
    <div className="px-6 pb-6 animate-slide-up-fade space-y-6" style={{ animationDelay: '200ms' }}>
      
      {/* Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-semibold text-foreground">Tasks</h3>
          <span className="text-xs font-medium text-primary cursor-pointer hover:underline">View All</span>
        </div>
        <div className="flex flex-col gap-3">
          <Card className="border-none shadow-xs rounded-card p-3 flex items-center gap-4 hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate">Follow up with Sarah</h4>
              <p className="text-xs text-muted-foreground truncate">Regarding Unit 402 hold</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">Due Today</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Builder Updates Section */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-semibold text-foreground">Builder Updates</h3>
        </div>
        <div className="flex flex-col gap-3">
          <Card className="border-none shadow-xs rounded-card p-3 flex items-center gap-4 hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
              <Megaphone className="w-5 h-5 text-warning" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate">New Incentive Structure</h4>
              <p className="text-xs text-muted-foreground truncate">Earn +2% on early bookings for Skyline</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-muted-foreground">5h ago</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
        </div>
        <div className="flex flex-col gap-3">
          <Card className="border-none shadow-xs rounded-card p-3 flex items-center gap-4 hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center shrink-0">
              <History className="w-5 h-5 text-accent-purple" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate">Unit 102 Reserved</h4>
              <p className="text-xs text-muted-foreground truncate">Apex Horizon project</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-muted-foreground">Yesterday</span>
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
