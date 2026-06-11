import { useState } from 'react';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';

interface ScheduleVisitSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScheduleVisitSheet({ open, onOpenChange }: ScheduleVisitSheetProps) {
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
    <BottomSheet open={open} onOpenChange={onOpenChange} title="Schedule Site Visit" height="90%">
      {success ? (
        <div className="flex flex-col items-center justify-center py-16 animate-in zoom-in">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h3 className="font-bold text-2xl text-foreground mb-2">Visit Scheduled!</h3>
          <p className="text-muted-foreground text-center">Calendar invite has been sent to the client.</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-6 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <span className="font-semibold text-muted-foreground text-sm">Fill in the visit details below</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select Lead</label>
            <Select>
              <SelectTrigger className="w-full h-14 rounded-input border-border/50 bg-secondary/30">
                <SelectValue placeholder="Search or select lead..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L-1001">Rajesh Kumar (New)</SelectItem>
                <SelectItem value="L-1002">Priya Sharma (Site Visit)</SelectItem>
                <SelectItem value="L-1004">Sneha Desai (Negotiation)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select Project</label>
            <Select>
              <SelectTrigger className="w-full h-14 rounded-input border-border/50 bg-secondary/30">
                <SelectValue placeholder="Which project to visit?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="P-1">Skyline Residences (Andheri West)</SelectItem>
                <SelectItem value="P-2">Zenith Towers (Worli)</SelectItem>
                <SelectItem value="P-3">Oasis Greens (Bandra)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="date" className="pl-9 h-14 rounded-input bg-secondary/30 border-border/50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="time" className="pl-9 h-14 rounded-input bg-secondary/30 border-border/50" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location (Auto-filled)</label>
            <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-input border border-border/50">
              <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground">Select a project to auto-fill location</span>
            </div>
          </div>

          <Button className="w-full h-14 rounded-button text-lg font-bold shadow-lg" onClick={handleAction} disabled={loading}>
            {loading ? 'Confirming...' : 'Confirm Schedule'}
          </Button>
        </div>
      )}
    </BottomSheet>
  );
}
