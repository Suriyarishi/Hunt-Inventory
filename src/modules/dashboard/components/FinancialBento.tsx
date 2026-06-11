import { Card } from '@/components/ui/card';
import { IndianRupee, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FinancialBento() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4 p-6 pt-2 animate-slide-up-fade" style={{ animationDelay: '50ms' }}>
      {/* Revenue Card (Spans full width) */}
      <Card className="col-span-2 relative overflow-hidden bg-gradient-to-br from-primary-light to-white dark:from-primary-light dark:to-background border-none shadow-sm rounded-card p-5 group">
        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
          <IndianRupee className="w-24 h-24 text-primary" />
        </div>
        <div className="relative z-10">
          <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
          <h3 className="text-3xl font-bold text-foreground mb-2">$124,500<span className="text-lg text-muted-foreground font-normal">.00</span></h3>
          <div className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 w-fit px-2 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.5% from last month</span>
          </div>
        </div>
      </Card>

      {/* Commission Card */}
      <Card className="p-4 rounded-[24px] border-none shadow-xs bg-success/10 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/wallet')}>
        <div className="flex justify-between items-start mb-2">
          <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground font-medium mb-0.5">Commission</p>
        <h3 className="text-xl font-bold text-success">₹14.5L</h3>
      </Card>

      {/* Trust Score Card */}
      <Card className="bg-card border-none shadow-xs rounded-card p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mb-3">
          <ShieldCheck className="w-5 h-5 text-success" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Trust Score</p>
          <p className="text-lg font-bold text-foreground">98 / 100</p>
        </div>
      </Card>

      {/* Performance Card */}
      <Card className="bg-card border-none shadow-xs rounded-card p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mb-3">
          <Zap className="w-5 h-5 text-warning" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Performance</p>
          <p className="text-lg font-bold text-foreground">Top 5%</p>
        </div>
      </Card>
    </div>
  );
}
