import { useParams, useNavigate } from 'react-router-dom';
import { mockTransactions, mockCommissionBreakdown } from '../constants/mockData';
import { ArrowLeft, Calculator, Receipt, TrendingUp, Download, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CommissionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const transaction = mockTransactions.find(t => t.id === id) || mockTransactions[0];
  const breakdown = mockCommissionBreakdown[transaction.id];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!breakdown) {
     return <div className="p-4 pt-safe">Breakdown not available for this transaction.</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-32 pt-safe flex flex-col">
      <div className="p-4 flex items-center justify-between z-10 sticky top-0 bg-background/90 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-bold">Commission Breakdown</h1>
        <div className="w-9" />
      </div>

      <div className="p-6 animate-slide-up-fade space-y-6">
        
        {/* Header summary */}
        <div className="text-center space-y-2 mb-2">
           <Badge variant="secondary" className="bg-success/10 text-success border-none mb-2">{transaction.status}</Badge>
           <h2 className="text-4xl font-bold text-success">{formatCurrency(breakdown.netAmount)}</h2>
           <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Net Payout Credited</p>
        </div>

        {/* Math Breakdown */}
        <Card className="p-4 rounded-card border border-border/50 bg-card space-y-4">
           <div className="flex items-center gap-2 pb-3 border-b border-border/50">
             <Calculator className="w-5 h-5 text-primary" />
             <h3 className="font-bold text-sm">Calculation Details</h3>
           </div>

           <div className="space-y-3">
              <div className="flex justify-between items-center">
                 <div className="text-xs text-muted-foreground">Unit Value <span className="block mt-0.5 text-foreground font-semibold flex items-center gap-1"><Building2 className="w-3 h-3 text-muted-foreground"/> {transaction.subtitle}</span></div>
                 <div className="text-sm font-bold">{formatCurrency(breakdown.unitValue)}</div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                 <div className="text-xs text-muted-foreground">Base Commission <span className="block mt-0.5 text-foreground font-semibold">@ {breakdown.basePercentage}%</span></div>
                 <div className="text-sm font-bold">{formatCurrency(breakdown.baseAmount)}</div>
              </div>

              {breakdown.volumeBonusAmount > 0 && (
                <div className="flex justify-between items-center pt-2">
                   <div className="text-xs text-muted-foreground">Volume Bonus Kicker <span className="block mt-0.5 text-accent-blue font-semibold flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +{breakdown.volumeBonusPercentage}%</span></div>
                   <div className="text-sm font-bold text-accent-blue">{formatCurrency(breakdown.volumeBonusAmount)}</div>
                </div>
              )}
           </div>

           <div className="pt-3 border-t border-dashed border-border/50 flex justify-between items-center">
               <div className="text-sm font-semibold">Gross Commission</div>
               <div className="text-base font-bold">{formatCurrency(breakdown.grossAmount)}</div>
           </div>
        </Card>

        {/* Tax Deductions */}
        <Card className="p-4 rounded-card border border-border/50 bg-card space-y-4">
           <div className="flex items-center gap-2 pb-3 border-b border-border/50">
             <Receipt className="w-5 h-5 text-destructive" />
             <h3 className="font-bold text-sm">Deductions</h3>
           </div>

           <div className="space-y-3">
              <div className="flex justify-between items-center">
                 <div className="text-xs text-muted-foreground">TDS <span className="block mt-0.5 text-foreground font-semibold">@ {breakdown.tdsPercentage}%</span></div>
                 <div className="text-sm font-bold text-destructive">-{formatCurrency(breakdown.tdsAmount)}</div>
              </div>
           </div>
           
           <div className="pt-3 border-t border-dashed border-border/50 flex justify-between items-center bg-success/5 p-3 rounded-lg -mx-4 -mb-4 mt-2">
               <div className="text-sm font-bold text-success">Net Final Payout</div>
               <div className="text-lg font-bold text-success">{formatCurrency(breakdown.netAmount)}</div>
           </div>
        </Card>

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border/50 pb-safe z-30">
        <Button variant="outline" className="w-full h-14 rounded-button font-bold text-lg shadow-sm gap-2">
          <Download className="w-5 h-5" /> Download Invoice
        </Button>
      </div>

    </div>
  );
}
