import { useState } from 'react';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface HoldUnitSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unitNumber: string;
}

export function HoldUnitSheet({ open, onOpenChange, unitNumber }: HoldUnitSheetProps) {
  const [clientName, setClientName] = useState('Aarav & Priya Sharma');
  const [clientPhone, setClientPhone] = useState('+91 98xxxx 4421');
  const [expectedClosure, setExpectedClosure] = useState('26 May 2026');
  const [tokenAmount, setTokenAmount] = useState('₹ 1,00,000');
  const [holdReason, setHoldReason] = useState('site-visit');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success(`Unit ${unitNumber} is now held for ${clientName}.`);
      setTimeout(() => {
        setSuccess(false);
        onOpenChange(false);
      }, 1500);
    }, 1200);
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title="Hold this unit for 24 hours" height="auto">
      {success ? (
        <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h3 className="font-bold text-xl text-foreground mb-1">Unit Locked!</h3>
          <p className="text-muted-foreground text-xs text-center mb-6">The 24-hour hold timer has started.</p>
          <Button variant="outline" className="rounded-button h-11 px-6 font-bold" onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      ) : (
        <div className="flex flex-col space-y-5">
          <p className="text-xs text-muted-foreground -mt-3.5 leading-relaxed">
            Auto-releases at <span className="font-bold text-foreground">26 May, 10:42 AM</span> if not converted to a Sold.
          </p>

          {/* Yellow warning banner */}
          <div className="bg-[#FFFDF0] border border-dashed border-warning p-4 rounded-xl flex items-start gap-3 shadow-xs">
            <Clock className="w-5 h-5 text-warning shrink-0 mt-0.5 animate-pulse" />
            <div>
              <h4 className="font-bold text-xs text-foreground">23h 59m left after confirmation</h4>
              <p className="text-[10px] text-muted-foreground font-medium mt-0.5">You can extend only once — 12 hrs</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Client Name *</label>
              <Input 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)} 
                className="h-12 rounded-input border-border bg-card font-semibold text-xs text-foreground px-4"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Client Phone *</label>
              <Input 
                value={clientPhone} 
                onChange={(e) => setClientPhone(e.target.value)} 
                className="h-12 rounded-input border-border bg-card font-semibold text-xs text-foreground px-4"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Expected Closure</label>
                <Input 
                  value={expectedClosure} 
                  onChange={(e) => setExpectedClosure(e.target.value)} 
                  className="h-12 rounded-input border-border bg-card font-semibold text-xs text-foreground px-4"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Token Amount</label>
                <Input 
                  value={tokenAmount} 
                  onChange={(e) => setTokenAmount(e.target.value)} 
                  className="h-12 rounded-input border-border bg-card font-semibold text-xs text-foreground px-4"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Hold Reason</label>
              <Select value={holdReason} onValueChange={setHoldReason}>
                <SelectTrigger className="w-full h-12 rounded-input border-border bg-card font-semibold text-xs text-foreground px-4">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="site-visit">Site visit scheduled</SelectItem>
                  <SelectItem value="token-pending">Token confirmation pending</SelectItem>
                  <SelectItem value="doc-verification">Document verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-3 border-t border-border/50">
            <Button 
              variant="outline" 
              className="flex-1 h-12 rounded-button font-bold text-xs border-border hover:bg-secondary/40 text-foreground"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-[1.4] h-12 rounded-button font-bold text-xs bg-primary hover:bg-primary/95 text-white flex items-center justify-center gap-1.5"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? 'Confirming...' : 'Confirm Hold'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
