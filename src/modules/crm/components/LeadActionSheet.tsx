import { useState } from 'react';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import type { Lead } from '../types';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LeadActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead;
}

export function LeadActionSheet({ open, onOpenChange, lead }: LeadActionSheetProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onOpenChange(false); }, 1500);
    }, 1500);
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title="Update Lead" height="auto">
      {success ? (
        <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <p className="font-bold text-lg text-foreground">Successfully Updated!</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-8 pb-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Lead Conversion</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex flex-col gap-1 border-2 hover:border-success hover:bg-success/5" onClick={handleAction}>
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-xs">Mark as Won</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-1 border-2 hover:border-destructive hover:bg-destructive/5" onClick={handleAction}>
                <XCircle className="w-5 h-5 text-destructive" />
                <span className="text-xs">Mark as Lost</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Change Stage</h3>
            <Select defaultValue={lead.stage}>
              <SelectTrigger className="w-full h-14 rounded-input border-border/50 bg-secondary/30">
                <SelectValue placeholder="Select Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Site Visit">Site Visit</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Assign To Team</h3>
            <Select defaultValue={lead.assignedTo}>
              <SelectTrigger className="w-full h-14 rounded-input border-border/50 bg-secondary/30">
                <SelectValue placeholder="Select Team Member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sarah Jenkins">Sarah Jenkins</SelectItem>
                <SelectItem value="Mike Ross">Mike Ross</SelectItem>
                <SelectItem value="Harvey Specter">Harvey Specter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full h-14 rounded-button text-lg font-bold shadow-lg" onClick={handleAction} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}
    </BottomSheet>
  );
}
