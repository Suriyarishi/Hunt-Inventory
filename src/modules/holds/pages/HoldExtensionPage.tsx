import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarClock, AlertTriangle, Building2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { mockHolds } from '../constants/mockData';
import { HoldCountdownTimer } from '../components/HoldCountdownTimer';

export default function HoldExtensionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hold = mockHolds.find(h => h.id === id) || mockHolds[0];

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [extensionHours, setExtensionHours] = useState<24 | 48>(24);
  const [reason, setReason] = useState('');

  const extensionsLeft = hold.maxExtensions - hold.extensionsUsed;

  const handleExtend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  if (success) {
    return (
      <div className="flex flex-col h-full bg-background items-center justify-center p-6 text-center animate-in zoom-in duration-500">
        <div className="relative w-28 h-28 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-purple-100 animate-ping opacity-50" />
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
            <CalendarClock className="w-10 h-10 text-purple-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground font-headings mb-2">Hold Extended!</h1>
        <p className="text-muted-foreground text-sm mb-2">{hold.unitNumber} extended by {extensionHours} hours.</p>
        <p className="text-xs text-muted-foreground mb-8">{extensionsLeft - 1} extension(s) remaining.</p>
        <Button className="w-full h-14 rounded-button font-bold shadow-lg" onClick={() => navigate(`/holds/${hold.id}`)}>
          Back to Hold
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
        <h1 className="font-bold text-sm font-headings">Extend Hold</h1>
        <div className="w-10" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-4 space-y-5 animate-in slide-in-from-bottom-2 duration-300">

        {/* Hold Context */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center">
              <CalendarClock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Extending</p>
              <h2 className="font-bold text-foreground">{hold.unitNumber} · {hold.projectName}</h2>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">{hold.clientName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">{hold.builderName}</span>
            </div>
          </div>
          <HoldCountdownTimer expiryDate={hold.expiryDate} size="compact" />
        </Card>

        {/* Extension Limit Warning */}
        {extensionsLeft <= 1 && (
          <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-2xl border border-warning/20">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-warning">Last Extension Available</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                After this, the unit must be converted or released.
              </p>
            </div>
          </div>
        )}

        {/* Extension Duration */}
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">Extend by</label>
          <div className="grid grid-cols-2 gap-3">
            {([24, 48] as const).map(h => (
              <button
                key={h}
                onClick={() => setExtensionHours(h)}
                className={`py-5 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                  extensionHours === h
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-border/50 bg-card hover:border-purple-200'
                }`}
              >
                <span className={`text-3xl font-bold font-headings ${extensionHours === h ? 'text-purple-700' : 'text-foreground'}`}>{h}</span>
                <span className="text-xs text-muted-foreground font-medium">hours</span>
                {h === 24 && <span className="text-[9px] font-bold text-purple-500 border border-purple-200 px-1.5 rounded">STANDARD</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">
            Reason for Extension <span className="text-destructive">*</span>
          </label>
          <Textarea
            placeholder="e.g., Client needs additional time for home loan approval..."
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="rounded-xl bg-secondary/30 border-border/50 text-sm resize-none min-h-[90px]"
          />
        </div>

        {/* Extension usage bar */}
        <div className="p-4 bg-secondary/40 rounded-2xl">
          <div className="flex justify-between text-xs mb-2">
            <span className="font-semibold text-foreground">Extensions Used</span>
            <span className="font-bold text-muted-foreground">{hold.extensionsUsed}/{hold.maxExtensions}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all"
              style={{ width: `${((hold.extensionsUsed + 1) / hold.maxExtensions) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">After this: {hold.extensionsUsed + 1}/{hold.maxExtensions} used</p>
        </div>
      </div>

      {/* Action Bar — shrink-0 */}
      <div className="shrink-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-md border-t border-border/50">
        <Button
          className="w-full h-14 rounded-button font-bold text-base shadow-lg bg-purple-600 hover:bg-purple-700 gap-2 disabled:opacity-50"
          onClick={handleExtend}
          disabled={loading || !reason.trim()}
        >
          {loading ? (
            <><span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Extending...</>
          ) : (
            <><CalendarClock className="w-5 h-5" /> Extend by {extensionHours}h</>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-2">Requires manager approval if flagged</p>
      </div>
    </div>
  );
}
