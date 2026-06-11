import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTransactions } from '../constants/mockData';
import { Wallet, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, ChevronRight, FileText, Target, Receipt, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { WithdrawRequestSheet } from '../components/WithdrawRequestSheet';

export default function WalletHubPage() {
  const navigate = useNavigate();
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Cleared': return <CheckCircle2 className="w-3 h-3 text-success" />;
      case 'Pending': return <Clock className="w-3 h-3 text-warning" />;
      case 'Processing': return <Clock className="w-3 h-3 text-accent-blue" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-safe flex flex-col relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" />

      <div className="p-4 z-20 sticky top-0 bg-background/50 backdrop-blur-md border-b border-border/50 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2 shrink-0" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
           <Wallet className="w-6 h-6 text-primary" /> Wallet
        </h1>
      </div>

      <div className="p-4 relative z-10 space-y-6">
        
        {/* Premium Balance Card */}
        <Card className="p-6 rounded-[28px] border-none shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
           {/* Abstract shapes for premium feel */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10" />
           <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-blue/20 rounded-full blur-xl -ml-5 -mb-5" />

           <div className="relative z-10">
              <p className="text-sm text-slate-300 font-medium mb-1 uppercase tracking-wider">Available Balance</p>
              <h2 className="text-4xl font-bold tracking-tight mb-6">₹14,50,000</h2>
              
              <div className="flex gap-4">
                 <div className="flex-1">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">Pending Clearance</p>
                    <p className="font-semibold text-warning">₹8,50,000</p>
                 </div>
                 <div className="flex-1 text-right">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">Total Earned (YTD)</p>
                    <p className="font-semibold text-white">₹32,00,000</p>
                 </div>
              </div>
           </div>
        </Card>

        {/* Quick Action */}
        <Button 
          className="w-full h-14 rounded-button text-lg font-bold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => setWithdrawOpen(true)}
        >
          Withdraw Funds
        </Button>

        {/* Tabs */}
        <Tabs defaultValue="ledger" className="w-full mt-2">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-button p-1 h-12 mb-4">
            <TabsTrigger value="ledger" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs">Ledger</TabsTrigger>
            <TabsTrigger value="reports" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs">Bonuses & Tax</TabsTrigger>
          </TabsList>

          {/* Ledger Tab */}
          <TabsContent value="ledger" className="space-y-3 animate-slide-up-fade">
             {mockTransactions.map(txn => (
               <Card 
                 key={txn.id} 
                 className="p-4 rounded-card border-none shadow-xs hover:shadow-md transition-all cursor-pointer bg-card flex items-center gap-4"
                 onClick={() => txn.type === 'Commission' && navigate(`/wallet/commission/${txn.id}`)}
               >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${txn.isCredit ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                    {txn.isCredit ? <ArrowDownRight className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm text-foreground truncate pr-2">{txn.title}</h4>
                        <span className={`font-bold text-sm whitespace-nowrap ${txn.isCredit ? 'text-success' : 'text-foreground'}`}>
                          {txn.isCredit ? '+' : '-'}{formatCurrency(txn.amount)}
                        </span>
                     </div>
                     <p className="text-xs text-muted-foreground truncate">{txn.subtitle}</p>
                     
                     <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-muted-foreground">{new Date(txn.date).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-sm">
                           {getStatusIcon(txn.status)} {txn.status}
                        </div>
                     </div>
                  </div>
                  
                  {txn.type === 'Commission' && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
               </Card>
             ))}
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4 animate-slide-up-fade">
             
             {/* Bonus Tracker */}
             <Card className="p-4 rounded-card border border-border/50 bg-card space-y-4">
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center">
                        <Target className="w-4 h-4 text-accent-blue" />
                     </div>
                     <h3 className="font-bold text-sm">Q2 Volume Bonus</h3>
                   </div>
                   <span className="text-xs font-bold text-accent-blue">+1% Kicker</span>
                </div>
                
                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                      <span>₹8.5 Cr Sold</span>
                      <span>Target: ₹10 Cr</span>
                   </div>
                   <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-accent-blue transition-all duration-500" style={{ width: '85%' }} />
                   </div>
                   <p className="text-[10px] text-muted-foreground text-center pt-1">Sell ₹1.5 Cr more to unlock Tier 2 bonus!</p>
                </div>
             </Card>

             {/* Tax Documents */}
             <div className="space-y-3">
               <h3 className="text-sm font-bold text-muted-foreground px-1">Tax Documents</h3>
               <Card className="p-4 rounded-card border-none shadow-xs flex items-center justify-between group cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">TDS Certificate (Form 16A)</h4>
                      <p className="text-xs text-muted-foreground">FY 2025-26 • Q1</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <FileText className="w-4 h-4" />
                  </Button>
               </Card>
             </div>

          </TabsContent>

        </Tabs>
      </div>
      
      <WithdrawRequestSheet open={withdrawOpen} onOpenChange={setWithdrawOpen} availableBalance={1450000} />
    </div>
  );
}
