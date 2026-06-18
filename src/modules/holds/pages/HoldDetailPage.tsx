import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockHolds, mockHoldHistory } from '../constants/mockData';
import {
  ArrowLeft, MoreVertical, ShieldCheck, AlertCircle,
  CalendarClock, Unlock, TrendingUp, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoldStatusBadge } from '../components/HoldStatusBadge';
import { HoldTimeline } from '../components/HoldTimeline';

/* ── Live countdown hook ── */
function useCountdown(expiryDate: string) {
  const calc = () => {
    const diff = new Date(expiryDate).getTime() - Date.now();
    if (diff <= 0) return { h: 0, m: 0, s: 0, expired: true, totalSeconds: 0 };
    const t = Math.floor(diff / 1000);
    return { h: Math.floor(t / 3600), m: Math.floor((t % 3600) / 60), s: t % 60, expired: false, totalSeconds: t };
  };
  const [data, setData] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setData(calc()), 1000);
    return () => clearInterval(id);
  }, [expiryDate]);
  return data;
}

export default function HoldDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'details' | 'log'>('details');

  const hold = mockHolds.find(h => h.id === id) || mockHolds[0];
  const history = mockHoldHistory[hold.id] || [];
  const countdown = useCountdown(hold.expiryDate);

  const isLive    = ['Active', 'Expiring', 'Extended'].includes(hold.status);
  const canExtend = isLive && hold.extensionsUsed < hold.maxExtensions;
  const canConvert = hold.status === 'Active' || hold.status === 'Extended';

  const pad = (n: number) => n.toString().padStart(2, '0');
  const isUrgent = countdown.totalSeconds < 3 * 3600;

  const expiryFormatted = new Date(hold.expiryDate).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });

  const createdFormatted = new Date(hold.createdDate).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <div className="flex flex-col h-full bg-background">

      {/* ── Header ── */}
      <div className="px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground font-headings leading-none">{hold.unitNumber}</h1>
              <p className="text-xs text-muted-foreground font-medium mt-0.5 uppercase tracking-wider">
                {hold.towerName} · Floor {hold.floorNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HoldStatusBadge status={hold.status} />
            <button className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Priority / sub-status label */}
        <div className="mt-3">
          {hold.priority === 'VIP' && (
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">⭐ VIP Priority Hold</span>
          )}
          {hold.priority === 'High' && (
            <span className="text-xs font-bold text-warning bg-warning/15 px-2.5 py-1 rounded-full">🔥 High Priority Hold</span>
          )}
          {hold.priority === 'Standard' && (
            <span className="text-xs font-medium text-muted-foreground">Held by {hold.brokerName}</span>
          )}
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">

        {/* ── COUNTDOWN CARD ── */}
        {isLive && (
          <div className={`rounded-3xl border-2 p-5 text-center ${
            countdown.expired
              ? 'border-destructive/30 bg-destructive/5'
              : isUrgent
              ? 'border-warning/40 bg-warning/8'
              : 'border-primary/30 bg-primary/5'
          }`}
          style={isUrgent && !countdown.expired ? { backgroundColor: 'rgba(255,181,71,0.07)' } : {}}>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${
              countdown.expired ? 'text-destructive' : isUrgent ? 'text-warning' : 'text-primary'
            }`}>
              {countdown.expired ? 'Hold Expired' : 'Locked Until'}
            </p>
            {!countdown.expired && (
              <p className="text-base font-bold text-foreground mb-3">{expiryFormatted}</p>
            )}
            {/* Big time remaining */}
            <div className={`text-5xl font-bold font-headings mb-1 tracking-tight ${
              countdown.expired ? 'text-destructive' : isUrgent ? 'text-warning' : 'text-foreground'
            }`}>
              {countdown.expired
                ? 'Expired'
                : `${pad(countdown.h)}h ${pad(countdown.m)}m`}
            </div>
            {!countdown.expired && (
              <p className={`text-xs font-semibold mb-3 ${isUrgent ? 'text-warning' : 'text-muted-foreground'}`}>
                {countdown.s}s left
              </p>
            )}
            {!countdown.expired && (
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {isUrgent
                  ? '⚠ Expiring soon — extend or convert immediately.'
                  : 'If not converted by then, this unit returns to the available pool.'}
              </p>
            )}
          </div>
        )}

        {/* Non-live status banner */}
        {!isLive && (
          <div className={`rounded-2xl px-4 py-3 flex items-center gap-3 ${
            hold.status === 'Converted' ? 'bg-emerald-50 border border-emerald-200' :
            hold.status === 'Released' ? 'bg-secondary border border-border/50' :
            'bg-secondary border border-border/50'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              hold.status === 'Converted' ? 'bg-emerald-100' : 'bg-secondary'
            }`}>
              <TrendingUp className={`w-4 h-4 ${hold.status === 'Converted' ? 'text-emerald-600' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <p className={`text-sm font-bold ${hold.status === 'Converted' ? 'text-emerald-700' : 'text-foreground'}`}>
                {hold.status === 'Converted' ? 'Converted to Booking' : `Hold ${hold.status}`}
              </p>
              <p className="text-xs text-muted-foreground">Expired on {expiryFormatted}</p>
            </div>
          </div>
        )}

        {/* ── DETAILS TABLE ── */}
        <div className="bg-card rounded-3xl shadow-xs overflow-hidden">
          {[
            { label: 'Configuration', value: `${hold.unitConfig} · ${hold.towerName}` },
            { label: 'Price', value: hold.unitPrice, bold: true },
            { label: 'Held by', value: hold.brokerName },
            { label: 'Client', value: hold.clientName },
            { label: 'Duration', value: `${hold.holdDuration} hours` },
            { label: 'Hold ID', value: hold.id, mono: true },
            { label: 'Created', value: createdFormatted },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={`flex items-center justify-between px-5 py-3.5 ${i < arr.length - 1 ? 'border-b border-border/40' : ''}`}
            >
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className={`text-sm text-right ${row.bold ? 'font-bold text-foreground' : row.mono ? 'font-mono font-semibold text-foreground text-xs' : 'font-semibold text-foreground'}`}>
                {row.value}
              </span>
            </div>
          ))}

          {/* Token row — with icon */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-border/40">
            <span className="text-sm text-muted-foreground">Token paid</span>
            <div className={`flex items-center gap-1.5 text-sm font-bold ${hold.tokenPaid ? 'text-primary' : 'text-warning'}`}>
              {hold.tokenPaid
                ? <><ShieldCheck className="w-4 h-4" /> Yes ({hold.tokenAmount})</>
                : <><AlertCircle className="w-4 h-4" /> Pending</>
              }
            </div>
          </div>

          {/* Extensions row */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-border/40">
            <span className="text-sm text-muted-foreground">Extensions</span>
            <div className="flex items-center gap-2">
              {Array.from({ length: hold.maxExtensions }).map((_, i) => (
                <div key={i} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-bold ${
                  i < hold.extensionsUsed
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : 'border-border/50 text-muted-foreground'
                }`}>
                  {i < hold.extensionsUsed ? '✓' : i + 1}
                </div>
              ))}
              <span className="text-xs text-muted-foreground ml-1">{hold.extensionsUsed}/{hold.maxExtensions}</span>
            </div>
          </div>
        </div>

        {/* Remarks */}
        {hold.remarks && (
          <div className="bg-card rounded-3xl px-5 py-4 shadow-xs">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Remarks</p>
            <p className="text-sm text-foreground leading-relaxed">{hold.remarks}</p>
          </div>
        )}

        {/* ── WAITLIST NUDGE (non-VIP / non-owner context) ── */}
        <div className="bg-primary/5 border border-primary/20 rounded-3xl px-5 py-4">
          <div className="flex items-start gap-3">
            <Users className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-bold text-primary">Waitlist this unit.</span>{' '}
              You'll get a push the moment it is released back to the pool.
            </p>
          </div>
          <button
            className="mt-3 w-full py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-bold hover:bg-primary/10 transition-all active:scale-[0.98]"
            onClick={() => navigate('/holds/waitlist')}
          >
            Join Waitlist
          </button>
        </div>

        {/* ── TAB: Details / Activity Log ── */}
        <div className="flex gap-2 bg-secondary/50 p-1 rounded-2xl">
          {[{ key: 'details', label: 'Hold IDs' }, { key: 'log', label: 'Activity Log' }].map(t => (
            <button
              key={t.key}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                tab === t.key ? 'bg-card shadow-xs text-foreground' : 'text-muted-foreground'
              }`}
              onClick={() => setTab(t.key as 'details' | 'log')}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'details' && (
          <div className="bg-card rounded-3xl shadow-xs overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
            {[
              { label: 'Hold ID', value: hold.id },
              { label: 'Unit ID', value: hold.unitId },
              { label: 'Project ID', value: hold.projectId },
              { label: 'Builder ID', value: hold.builderId },
              { label: 'Client ID', value: hold.clientId },
              { label: 'User ID', value: hold.userId },
            ].map((row, i, arr) => (
              <div key={row.label} className={`flex items-center justify-between px-5 py-3 ${i < arr.length - 1 ? 'border-b border-border/40' : ''}`}>
                <span className="text-xs text-muted-foreground">{row.label}</span>
                <span className="text-xs font-mono font-bold text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'log' && (
          <div className="animate-in slide-in-from-bottom-2 duration-200">
            <HoldTimeline events={history} />
          </div>
        )}
      </div>

      {/* ── Action Bar ── */}
      <div className="shrink-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-md border-t border-border/50 space-y-2.5">
        {isLive && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 h-11 rounded-button border-destructive/30 text-destructive hover:bg-destructive/10 font-bold gap-1.5 text-sm"
              disabled={!isLive}
              onClick={() => navigate(`/holds/${hold.id}/release`)}
            >
              <Unlock className="w-4 h-4" /> Release
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-11 rounded-button font-bold gap-1.5 text-sm"
              disabled={!canExtend}
              onClick={() => navigate(`/holds/${hold.id}/extend`)}
            >
              <CalendarClock className="w-4 h-4" /> Extend
            </Button>
          </div>
        )}
        <Button
          className="w-full h-13 rounded-button font-bold text-base shadow-lg gap-2 py-3.5"
          disabled={!canConvert}
          onClick={() => navigate('/bookings/new', { state: { holdId: hold.id } })}
        >
          <TrendingUp className="w-5 h-5" /> Convert to Booking
        </Button>
      </div>
    </div>
  );
}
