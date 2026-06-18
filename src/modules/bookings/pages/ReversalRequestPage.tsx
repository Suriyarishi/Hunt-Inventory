import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockBookings } from '../constants/mockData';
import type { ReversalReasonType } from '../types';

const REVERSAL_REASONS: { key: ReversalReasonType; label: string; description: string; emoji: string }[] = [
  { key: 'Buyer Request', label: 'Buyer Request', description: 'Client has voluntarily decided to cancel', emoji: '👤' },
  { key: 'Unit Issue', label: 'Unit Issue', description: 'Issue with the unit (floor plan, specifications)', emoji: '🏠' },
  { key: 'Price Change', label: 'Price Change', description: 'Significant change in pricing or terms', emoji: '💰' },
  { key: 'Documentation', label: 'Documentation Issue', description: 'KYC or document verification failed', emoji: '📄' },
  { key: 'Other', label: 'Other', description: 'Other reason (provide details below)', emoji: '💬' },
];

function fmtINR(n: number) { return `₹${n.toLocaleString('en-IN')}`; }

export default function ReversalRequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState<ReversalReasonType | null>(null);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const booking = mockBookings.find((b) => b.id === id) || mockBookings[0];

  // Refund policy: 90% of token on buyer request, 0% after certain statuses
  const tokenNum = booking.tokenAmountNum || 500000;
  const refundPolicies: Record<ReversalReasonType, { pct: number; label: string }> = {
    'Buyer Request': { pct: 90, label: '90% of token refundable (standard policy)' },
    'Unit Issue': { pct: 100, label: '100% refund (builder fault)' },
    'Price Change': { pct: 100, label: '100% refund (material change in terms)' },
    'Documentation': { pct: 80, label: '80% refund (processing fees deducted)' },
    'Other': { pct: 50, label: 'Subject to review' },
  };

  const policy = selectedReason ? refundPolicies[selectedReason] : null;
  const refundAmt = policy ? Math.round(tokenNum * policy.pct / 100) : 0;

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col h-full bg-background items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-warning/15 flex items-center justify-center mb-5">
          <AlertTriangle className="w-10 h-10 text-warning" />
        </div>
        <h1 className="text-xl font-bold text-foreground font-headings mb-2">Reversal Submitted</h1>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          Your reversal request has been submitted for management approval. You'll receive an update within 24 hours.
        </p>
        <p className="text-xs text-muted-foreground mb-8">Reference: REV-{Date.now().toString().slice(-6)}</p>
        <div className="w-full space-y-2">
          <Button className="w-full h-12 rounded-button font-bold" onClick={() => navigate(`/bookings/${booking.id}`)}>
            Back to Booking
          </Button>
          <Button variant="outline" className="w-full h-11 rounded-button font-semibold" onClick={() => navigate('/bookings')}>
            All Bookings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">

      {/* Header */}
      <div className="px-4 pt-4 pb-3 shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h1 className="font-bold text-sm text-foreground font-headings">Reversal Request</h1>
            <p className="text-xs text-muted-foreground">{booking.bookingNumber}</p>
          </div>
          <div className="w-8" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Warning banner */}
        <div className="flex gap-3 p-4 bg-destructive/8 border border-destructive/25 rounded-2xl">
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-destructive">Booking Reversal — Irreversible Action</p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              Reversing a booking will cancel the application and initiate the refund process. This action requires management approval.
            </p>
          </div>
        </div>

        {/* Booking summary */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Booking Being Reversed</p>
          <div className="space-y-2">
            {[
              { label: 'Unit', value: booking.unitNumber },
              { label: 'Project', value: booking.projectName },
              { label: 'Buyer', value: booking.primaryApplicant },
              { label: 'Token Paid', value: booking.tokenAmount },
              { label: 'Current Status', value: booking.status },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-bold text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Reason Selection */}
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Reason for Reversal</p>
          <div className="space-y-2.5">
            {REVERSAL_REASONS.map((reason) => (
              <button
                key={reason.key}
                onClick={() => setSelectedReason(reason.key)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all active:scale-[0.99] ${
                  selectedReason === reason.key
                    ? 'border-destructive/40 bg-destructive/5'
                    : 'border-border/50 bg-card hover:border-destructive/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{reason.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{reason.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{reason.description}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    selectedReason === reason.key ? 'bg-destructive border-destructive' : 'border-border'
                  }`}>
                    {selectedReason === reason.key && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Refund preview */}
        {policy && (
          <Card className="p-4 rounded-card border-none shadow-xs bg-card animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <IndianRupee className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Estimated Refund</p>
                <p className="text-2xl font-bold text-primary font-headings mt-0.5">{fmtINR(refundAmt)}</p>
                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{policy.label}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Notes */}
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Additional Notes</p>
          <textarea
            placeholder="Provide context for the reversal request..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full p-3.5 rounded-2xl bg-secondary/30 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Policy notice */}
        <div className="p-3 bg-secondary/40 border border-border/40 rounded-2xl">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Reversal requests are subject to management approval within 24 hours. Refunds are processed within 5–7 business days after approval.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-md border-t border-border/50">
        <Button
          className="w-full h-13 rounded-button font-bold bg-destructive hover:bg-destructive/90 text-white disabled:opacity-50"
          disabled={!selectedReason || loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            'Submit Reversal Request'
          )}
        </Button>
      </div>
    </div>
  );
}
