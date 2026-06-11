import { GreetingHeader } from '../components/GreetingHeader';
import { FinancialBento } from '../components/FinancialBento';
import { InventoryOverview } from '../components/InventoryOverview';
import { QuickActions } from '../components/QuickActions';
import { ActivityFeed } from '../components/ActivityFeed';
import { InsightsAndLeaderboard } from '../components/InsightsAndLeaderboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Soft background glow for Apple/Linear feel */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-primary-light/60 via-primary-light/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 pb-6">
        <GreetingHeader />
        <FinancialBento />
        <InventoryOverview />
        <QuickActions />
        <ActivityFeed />
        <InsightsAndLeaderboard />
      </div>
    </div>
  );
}
