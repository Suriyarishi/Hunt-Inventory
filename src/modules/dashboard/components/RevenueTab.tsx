import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

export function RevenueTab() {
  const ledger = [
    { id: 1, title: 'Commission Clear - Orchid Heights', amount: '₹3,50,000', status: 'Cleared', date: 'June 10, 2026', type: 'Credit' },
    { id: 2, title: 'Commission Process - Emerald Meadows', amount: '₹4,50,000', status: 'Processing', date: 'June 08, 2026', type: 'Credit' },
    { id: 3, title: 'Withdrawal Settlement', amount: '₹5,00,000', status: 'Processing', date: 'June 05, 2026', type: 'Debit' }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Cleared': return 'bg-primary-soft text-primary hover:bg-primary-soft border-none';
      case 'Processing': return 'bg-warning/10 text-warning hover:bg-warning/15 border-none';
      default: return 'bg-slate-100 text-slate-600 border-none';
    }
  };

  return (
    <div className="space-y-6 animate-slide-up-fade">
      
      {/* Premium Balance Card */}
      <Card className="p-5 rounded-[28px] border-none shadow-md bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-blue/20 rounded-full blur-xl -ml-5 -mb-5" />

        <div className="relative z-10">
          <p className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider mb-1">Available Payout Balance</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">₹14,50,000</h2>
          
          <div className="flex gap-4 border-t border-white/10 pt-3 mt-2">
            <div className="flex-1">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Pending Clearance</p>
              <p className="font-bold text-sm text-warning">₹8,50,000</p>
            </div>
            <div className="flex-1 text-right">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Total Earned (YTD)</p>
              <p className="font-bold text-sm text-white">₹32,00,000</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Target tracker card */}
      <Card className="p-4 rounded-card border border-border/40 bg-card space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Q2 Volume Milestone</span>
          <Target className="w-4.5 h-4.5 text-primary" />
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span>₹12.4 Cr Sold</span>
            <span className="text-primary">83%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '83%' }} />
          </div>
        </div>
      </Card>

      {/* SVG Interactive Earnings Chart */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Earnings Trend</h3>
        <Card className="p-4 rounded-card border-none shadow-xs bg-card flex flex-col items-center">
          <div className="w-full h-32 flex items-end justify-between gap-1 px-2 pt-4">
            {[35, 48, 62, 55, 80, 95].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full h-24 flex items-end relative">
                  <div 
                    className="w-full bg-primary/20 hover:bg-primary transition-all duration-300 rounded-t-md relative group cursor-pointer"
                    style={{ height: `${val}%` }}
                  >
                    {/* Tooltip */}
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-25">
                      ₹{(val/10).toFixed(1)}L
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-muted-foreground">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][idx]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Ledger */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Recent Ledger</h3>
        <div className="space-y-2">
          {ledger.map((item) => (
            <Card key={item.id} className="p-3.5 rounded-card border-none shadow-xs bg-card flex items-center justify-between">
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-foreground truncate pr-2">{item.title}</h4>
                <span className="text-[9px] font-bold text-muted-foreground">{item.date}</span>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-extrabold ${item.type === 'Credit' ? 'text-primary' : 'text-slate-800'}`}>
                  {item.type === 'Credit' ? '+' : '-'}{item.amount}
                </p>
                <Badge className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded mt-1 ${getStatusStyle(item.status)}`}>
                  {item.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
