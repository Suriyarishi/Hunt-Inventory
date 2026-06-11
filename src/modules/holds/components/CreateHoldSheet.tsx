import { useState } from 'react';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Key, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';

interface CreateHoldSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateHoldSheet({ open, onOpenChange }: CreateHoldSheetProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onOpenChange(false); }, 1500);
    }, 1500);
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title="Create Unit Hold" height="90%">
      {success ? (
        <div className="flex flex-col items-center justify-center py-16 animate-in zoom-in">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h3 className="font-bold text-2xl text-foreground mb-2">Unit Locked!</h3>
          <p className="text-muted-foreground text-center mb-6">The 24-hour hold timer has started.</p>
          <Button variant="outline" className="rounded-button" onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      ) : (
        <div className="flex flex-col space-y-6 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-5 h-5 text-primary" />
            <span className="font-semibold text-muted-foreground text-sm">Fill in the details below to block a unit</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select Unit</label>
            <Select>
              <SelectTrigger className="w-full h-14 rounded-input border-border/50 bg-secondary/30">
                <SelectValue placeholder="Search or select available unit..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="U-1">A-1402 • Skyline Residences (₹4.2 Cr)</SelectItem>
                <SelectItem value="U-2">B-2101 • Zenith Towers (₹4.3 Cr)</SelectItem>
                <SelectItem value="U-3">C-805 • Oasis Greens (₹2.8 Cr)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assign Lead</label>
            <Select>
              <SelectTrigger className="w-full h-14 rounded-input border-border/50 bg-secondary/30">
                <SelectValue placeholder="Which lead is holding this?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L-1001">Rajesh Kumar</SelectItem>
                <SelectItem value="L-1002">Priya Sharma</SelectItem>
                <SelectItem value="L-1004">Sneha Desai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-primary/5 rounded-card border border-primary/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-sm">Token Payment Received?</h4>
              </div>
              <div
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${hasToken ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                onClick={() => setHasToken(!hasToken)}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${hasToken ? 'translate-x-6' : ''}`} />
              </div>
            </div>
            {hasToken && (
              <div className="pt-2 animate-in slide-in-from-top-2 fade-in">
                <label className="text-xs text-muted-foreground mb-1 block">Token Amount (₹)</label>
                <Input type="number" placeholder="e.g. 50000" className="h-12 rounded-input bg-background" />
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-border/50">
            <div className="flex items-start gap-3 mb-6">
              <Lock className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">Holding this unit will block it across all brokers for exactly 24 hours. Ensure you have confirmed intent.</p>
            </div>
            <Button className="w-full h-14 rounded-button text-lg font-bold shadow-lg" onClick={handleAction} disabled={loading}>
              {loading ? 'Locking Unit...' : 'Lock Unit Now'}
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
