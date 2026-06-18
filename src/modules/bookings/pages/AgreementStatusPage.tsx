import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileSignature, CheckCircle2, Clock, Send, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockAgreements, mockBookings } from '../constants/mockData';
import type { AgreementStageStatus } from '../types';

const AGREEMENT_STAGES: { key: AgreementStageStatus; label: string; description: string; icon: React.ElementType }[] = [
  { key: 'Draft', label: 'Agreement Drafted', description: 'Legal team prepares the sale agreement', icon: FileSignature },
  { key: 'Sent', label: 'Sent to Parties', description: 'Shared with buyer and builder for review', icon: Send },
  { key: 'Signed', label: 'All Parties Signed', description: 'Buyer and builder sign the agreement', icon: CheckCircle2 },
  { key: 'Registered', label: 'Registered at SRO', description: 'Agreement registered at Sub-Registrar Office', icon: CheckCircle2 },
];

const STATUS_ORDER: AgreementStageStatus[] = ['Draft', 'Sent', 'Signed', 'Registered'];

function fmtINR(n: number) { return `₹${n.toLocaleString('en-IN')}`; }
function fmtDate(d?: string) {
  if (!d) return null;
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function AgreementStatusPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const booking = mockBookings.find((b) => b.id === id) || mockBookings[0];
  const agreement = booking.agreementId ? mockAgreements[booking.agreementId] : mockAgreements['AGR-002'];

  if (!agreement) {
    return (
      <div className="flex flex-col h-full bg-background items-center justify-center p-6 text-center">
        <FileSignature className="w-12 h-12 text-border mb-4" />
        <h2 className="text-lg font-bold text-foreground font-headings mb-2">No Agreement Yet</h2>
        <p className="text-sm text-muted-foreground mb-6">Agreement will be initiated once booking is approved.</p>
        <Button className="w-full h-12 rounded-button font-bold" onClick={() => navigate(-1)}>Back to Booking</Button>
      </div>
    );
  }

  const currentStageIdx = STATUS_ORDER.indexOf(agreement.status);

  const stageTimestamps: Record<AgreementStageStatus, string | undefined> = {
    Draft: agreement.draftedAt,
    Sent: agreement.sentAt,
    Signed: agreement.buyerSignedAt,
    Registered: agreement.registeredAt,
  };

  return (
    <div className="flex flex-col h-full bg-background">

      {/* Header */}
      <div className="px-4 pt-4 pb-3 shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h1 className="font-bold text-sm text-foreground font-headings">Agreement Status</h1>
            <p className="text-xs text-muted-foreground">{agreement.agreementNumber}</p>
          </div>
          <Badge className={`border-none text-[10px] ${
            agreement.status === 'Registered' ? 'bg-emerald-100 text-emerald-700' :
            agreement.status === 'Signed' ? 'bg-primary/10 text-primary' :
            agreement.status === 'Sent' ? 'bg-accent-blue/10 text-accent-blue' :
            'bg-secondary text-muted-foreground'
          }`}>{agreement.status}</Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Progress steps */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Agreement Progress</p>
          <div className="space-y-0">
            {AGREEMENT_STAGES.map((stage, i) => {
              const isCompleted = i <= currentStageIdx;
              const isActive = i === currentStageIdx;
              const ts = stageTimestamps[stage.key];
              const Icon = stage.icon;

              return (
                <div key={stage.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted ? 'bg-primary border-primary' :
                      isActive ? 'bg-primary/10 border-primary' :
                      'bg-background border-border/50'
                    }`}>
                      <Icon className={`w-4 h-4 ${isCompleted ? 'text-white' : isActive ? 'text-primary' : 'text-muted-foreground/40'}`} />
                    </div>
                    {i < AGREEMENT_STAGES.length - 1 && (
                      <div className={`w-0.5 h-8 ${isCompleted ? 'bg-primary' : 'bg-border/40'}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between gap-2 mt-1.5">
                      <div>
                        <p className={`text-sm font-bold ${isCompleted || isActive ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                          {stage.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{stage.description}</p>
                        {ts && isCompleted && (
                          <p className="text-[10px] text-primary font-semibold mt-1">✓ {fmtDate(ts)}</p>
                        )}
                        {isActive && !ts && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
                            <p className="text-[10px] text-warning font-semibold">In progress</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Signatories */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Signatories</p>
          <div className="space-y-3">
            {[
              {
                party: 'Primary Buyer',
                name: booking.primaryApplicant,
                signed: !!agreement.buyerSignedAt,
                signedAt: agreement.buyerSignedAt,
              },
              {
                party: 'Builder / Developer',
                name: 'Skyline Developer Pvt. Ltd.',
                signed: !!agreement.builderSignedAt,
                signedAt: agreement.builderSignedAt,
              },
            ].map((sig) => (
              <div key={sig.party} className="flex items-center justify-between p-3 bg-secondary/40 rounded-xl">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">{sig.party}</p>
                  <p className="text-sm font-bold text-foreground">{sig.name}</p>
                  {sig.signedAt && (
                    <p className="text-[10px] text-primary mt-0.5">{fmtDate(sig.signedAt)}</p>
                  )}
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${sig.signed ? 'bg-primary/15' : 'bg-secondary'}`}>
                  {sig.signed ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Financial details */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Registration Details</p>
          <div className="space-y-2.5">
            {[
              { label: 'SRO Office', value: agreement.sroOffice || '—' },
              { label: 'Stamp Duty', value: agreement.stampDuty ? fmtINR(agreement.stampDuty) : '—' },
              { label: 'Registration Fee', value: agreement.registrationFee ? fmtINR(agreement.registrationFee) : '—' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="text-sm font-bold text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CTAs */}
      <div className="shrink-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-md border-t border-border/50 space-y-2">
        {agreement.status === 'Draft' || agreement.status === 'Sent' ? (
          <Button className="w-full h-12 rounded-button font-bold gap-2">
            <Eye className="w-4 h-4" /> Preview Agreement
          </Button>
        ) : (
          <Button className="w-full h-12 rounded-button font-bold gap-2">
            <Download className="w-4 h-4" /> Download Signed Copy
          </Button>
        )}
        {agreement.status === 'Signed' && (
          <Button
            className="w-full h-12 rounded-button font-bold bg-[#0F2E2A] text-white hover:bg-[#0F2E2A]/90"
            onClick={() => navigate(`/bookings/${booking.id}/registration`)}
          >
            Proceed to Registration →
          </Button>
        )}
      </div>
    </div>
  );
}
