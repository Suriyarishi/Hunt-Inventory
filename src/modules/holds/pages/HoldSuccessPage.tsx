import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Lock, Clock, ChevronRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { CreateHoldFormData } from '../types';

export default function HoldSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const form = (location.state?.hold as CreateHoldFormData) ?? {
    unitNumber: 'A-1402', projectName: 'Skyline Residences',
    clientName: 'Demo Client', holdDuration: 48, priority: 'Standard',
  };

  const holdId = `H-${Math.floor(Math.random() * 900 + 100)}`;
  const now = new Date();
  const expiry = new Date(now.getTime() + (form.holdDuration ?? 48) * 3600 * 1000);

  const formatDate = (d: Date) => d.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pb-safe pt-safe">
      {/* Success Animation */}
      <div className="flex flex-col items-center text-center mb-8 animate-in zoom-in duration-500">
        {/* Concentric rings */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping" />
          <div className="absolute inset-3 rounded-full bg-primary/10" />
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2 font-headings">Unit Locked! 🔒</h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
          The hold timer has started. All brokers have been blocked from this unit.
        </p>
      </div>

      {/* Hold Summary Card */}
      <Card className="w-full rounded-card border border-border/50 shadow-xs overflow-hidden bg-card mb-6 animate-in slide-in-from-bottom-4 duration-500 delay-200">
        {/* Header */}
        <div className="bg-primary/5 px-5 py-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Hold ID</p>
              <p className="font-bold text-foreground font-mono text-lg">{holdId}</p>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
              form.priority === 'VIP' ? 'bg-purple-100 text-purple-700' :
              form.priority === 'High' ? 'bg-warning/15 text-warning' :
              'bg-primary/10 text-primary'
            }`}>
              {form.priority}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="px-5 py-4 space-y-3.5">
          {[
            { label: 'Unit', value: form.unitNumber },
            { label: 'Project', value: form.projectName },
            { label: 'Client', value: form.clientName },
            { label: 'Duration', value: `${form.holdDuration}h` },
          ].map(item => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
          <div className="pt-3 border-t border-border/50">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium text-foreground text-xs">{formatDate(now)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Expires</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-warning" />
                <span className="font-bold text-warning text-xs">{formatDate(expiry)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Next steps hint — Zeigarnik Effect */}
      <div className="w-full flex items-center gap-3 p-4 bg-secondary/40 rounded-2xl border border-border/50 mb-6 animate-in slide-in-from-bottom-4 duration-500 delay-300">
        <Lock className="w-5 h-5 text-primary shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Next step:</strong> Convert this hold to a booking before expiry, or extend if client needs more time.
        </p>
      </div>

      {/* Actions */}
      <div className="w-full space-y-3 animate-in slide-in-from-bottom-4 duration-500 delay-400">
        <Button
          className="w-full h-14 rounded-button font-bold text-base shadow-lg"
          onClick={() => navigate(`/holds/${holdId}`)}
        >
          View Hold Details <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-12 rounded-button border-border/50 font-semibold gap-2"
            onClick={() => navigate('/holds')}
          >
            Back to Holds
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-button border-border/50 font-semibold gap-2"
            onClick={() => navigate('/holds/new')}
          >
            <Share2 className="w-4 h-4" /> New Hold
          </Button>
        </div>
      </div>
    </div>
  );
}
