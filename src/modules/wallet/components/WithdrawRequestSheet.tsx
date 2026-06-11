import { useState } from 'react';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Building2, AlertCircle } from 'lucide-react';

interface WithdrawRequestSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance: number;
}

export function WithdrawRequestSheet({ open, onOpenChange, availableBalance }: WithdrawRequestSheetProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState<string>('');

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => { setSuccess(false); setAmount(''); onOpenChange(false); }, 2000);
    }, 1500);
  };

  const isInvalid = Number(amount) > availableBalance || Number(amount) <= 0;

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title="Withdraw Funds" height="75%">
      {success ? (
        <div className="flex flex-col items-center justify-center py-16 animate-in zoom-in">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h3 className="font-bold text-2xl text-foreground mb-2">Request Sent!</h3>
          <p className="text-muted-foreground text-center">Funds will be credited within 2-3 business days.</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-6 pb-4">
          <div className="p-4 bg-secondary/30 rounded-card border border-border/50 text-center">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Available to Withdraw</p>
            <h3 className="text-3xl font-bold text-primary">{formatCurrency(availableBalance)}</h3>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Withdrawal Amount (₹)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">₹</span>
              <Input
                type="number"
                className={`pl-10 h-16 text-2xl font-bold rounded-input bg-secondary/30 border-border/50 ${isInvalid && amount !== '' ? 'border-destructive/50 text-destructive' : ''}`}
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-full" onClick={() => setAmount((availableBalance * 0.5).toString())}>50%</Button>
              <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-full" onClick={() => setAmount(availableBalance.toString())}>Max</Button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Transfer To</label>
            <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-card border border-border/50">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 shadow-sm border border-border/50">
                <Building2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">HDFC Bank</h4>
                <p className="text-xs text-muted-foreground">**** **** **** 4552</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            {isInvalid && amount !== '' && (
              <div className="flex items-center gap-2 text-destructive text-xs font-semibold mb-3 bg-destructive/10 p-2 rounded-md">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Amount exceeds available balance.</span>
              </div>
            )}
            <Button className="w-full h-14 rounded-button text-lg font-bold shadow-lg" onClick={handleAction} disabled={loading || isInvalid || amount === ''}>
              {loading ? 'Processing...' : 'Confirm Withdrawal'}
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
