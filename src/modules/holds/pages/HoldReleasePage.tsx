import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Unlock, AlertTriangle, Building2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { mockHolds } from '../constants/mockData';
import { HoldCountdownTimer } from '../components/HoldCountdownTimer';

const RELEASE_REASONS = [
  'Client changed their mind',
  'Client chose a different unit',
  'Budget constraints',
  'Home loan rejected',
  'Found better project',
  'Other',
];

export default function HoldReleasePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hold = mockHolds.find(h => h.id === id) || mockHolds[0];

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleRelease = () => {
    if (!confirmed) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  if (success) {
    return (
      <div className="flex flex-col h-full bg-background items-center justify-center p-6 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
          <Unlock className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground font-headings mb-2">Hold Released</h1>
        <p className="text-muted-foreground text-sm mb-2">{hold.unitNumber} is now available to all brokers.</p>
        <p className="text-xs text-muted-foreground mb-8">Waitlisted clients will be notified automatically.</p>
        <Button className="w-full h-14 rounded-button font-bold shadow-lg" onClick={() => navigate('/holds')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-bold text-sm font-headings">Release Hold</h1>
        <div className="w-10" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-4 space-y-5 animate-in slide-in-from-bottom-2 duration-300">

        {/* Warning Banner */}
        <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-2xl border border-destructive/20">
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-destructive">This action is irreversible</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Releasing will immediately make the unit available. Waitlisted clients will be auto-notified.
            </p>
          </div>
        </div>

        {/* Hold Context */}
        <Card className="p-4 rounded-card border border-destructive/20 shadow-xs bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <Unlock className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">{hold.unitNumber}</h2>
              <p className="text-xs text-muted-foreground">{hold.projectName}</p>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" /> {hold.clientName}
            </div>
            <div className="flex items-center gap-1">
              <Building2 className="w-3 h-3" /> {hold.unitPrice}
            </div>
          </div>
          <HoldCountdownTimer expiryDate={hold.expiryDate} size="compact" />
        </Card>

        {/* Release Reason */}
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
            Reason for Release <span className="text-destructive">*</span>
          </label>
          <div className="space-y-2">
            {RELEASE_REASONS.map(reason => (
              <button
                key={reason}
                onClick={() => setSelectedReason(reason)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  selectedReason === reason
                    ? 'border-destructive/50 bg-destructive/5 text-destructive'
                    : 'border-border/50 bg-card text-foreground hover:border-destructive/30'
                }`}
              >
                {selectedReason === reason && <span className="mr-2">✓</span>}
                {reason}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Additional Notes</label>
          <Textarea
            placeholder="Any additional details..."
            value={customNote}
            onChange={e => setCustomNote(e.target.value)}
            className="rounded-xl bg-secondary/30 border-border/50 text-sm resize-none min-h-[70px]"
          />
        </div>

        {/* Confirmation Checkbox */}
        <button
          onClick={() => setConfirmed(!confirmed)}
          className={`w-full flex items-start gap-3 p-4 rounded-2xl border-2 transition-all ${
            confirmed ? 'border-destructive bg-destructive/5' : 'border-border/50 bg-secondary/30'
          }`}
        >
          <div className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${confirmed ? 'bg-destructive border-destructive' : 'border-muted-foreground/50'}`}>
            {confirmed && <span className="text-white text-[10px] font-bold">✓</span>}
          </div>
          <p className="text-xs text-muted-foreground text-left leading-relaxed">
            I confirm client consent to release the hold on <strong className="text-foreground">{hold.unitNumber}</strong>.
          </p>
        </button>
      </div>

      {/* Action Bar — shrink-0 */}
      <div className="shrink-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-md border-t border-border/50">
        <Button
          className="w-full h-14 rounded-button font-bold text-base shadow-lg bg-destructive hover:bg-destructive/90 gap-2 disabled:opacity-40"
          onClick={handleRelease}
          disabled={loading || !selectedReason || !confirmed}
        >
          {loading ? (
            <><span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Releasing...</>
          ) : (
            <><Unlock className="w-5 h-5" /> Release Hold</>
          )}
        </Button>
        <Button variant="ghost" className="w-full h-10 rounded-button mt-2 text-muted-foreground" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
