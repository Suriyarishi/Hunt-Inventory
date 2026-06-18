import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle2, Clock, Calendar, UploadCloud, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockRegistrations, mockBookings } from '../constants/mockData';

function fmtINR(n: number) { return `₹${n.toLocaleString('en-IN')}`; }
function fmtDate(d?: string) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}
function fmtDateTime(d?: string) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function RegistrationStatusPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const booking = mockBookings.find((b) => b.id === id) || mockBookings[2];
  const registration = booking.registrationId
    ? mockRegistrations[booking.registrationId]
    : mockRegistrations['REG-003'];

  if (!registration) {
    return (
      <div className="flex flex-col h-full bg-background items-center justify-center p-6 text-center">
        <MapPin className="w-12 h-12 text-border mb-4" />
        <h2 className="text-lg font-bold text-foreground font-headings mb-2">No Registration Yet</h2>
        <p className="text-sm text-muted-foreground mb-6">Registration will begin after the agreement is signed and stamp duty is paid.</p>
        <Button className="w-full h-12 rounded-button font-bold" onClick={() => navigate(-1)}>Back to Booking</Button>
      </div>
    );
  }

  const isCompleted = registration.status === 'Completed';
  const isScheduled = registration.status === 'Scheduled';
  const isPending = registration.status === 'Pending';

  return (
    <div className="flex flex-col h-full bg-background">

      {/* Header */}
      <div className="px-4 pt-4 pb-3 shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="font-bold text-sm text-foreground font-headings">Registration Status</h1>
          <Badge className={`border-none text-[10px] ${
            isCompleted ? 'bg-emerald-100 text-emerald-700' :
            isScheduled ? 'bg-accent-blue/10 text-accent-blue' :
            'bg-secondary text-muted-foreground'
          }`}>{registration.status}</Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Status Hero */}
        <Card className={`p-5 rounded-card border-none shadow-xs overflow-hidden relative ${
          isCompleted ? 'bg-emerald-50' : isScheduled ? 'bg-accent-blue/5' : 'bg-secondary/40'
        }`}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-6 translate-x-6 bg-current" />
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              isCompleted ? 'bg-emerald-100' : isScheduled ? 'bg-accent-blue/15' : 'bg-secondary'
            }`}>
              {isCompleted ? <BadgeCheck className="w-6 h-6 text-emerald-600" /> :
               isScheduled ? <Calendar className="w-6 h-6 text-accent-blue" /> :
               <Clock className="w-6 h-6 text-muted-foreground" />}
            </div>
            <div className="flex-1">
              <p className={`text-xs font-bold uppercase tracking-wider ${
                isCompleted ? 'text-emerald-600' : isScheduled ? 'text-accent-blue' : 'text-muted-foreground'
              }`}>{registration.status}</p>
              {isCompleted && registration.registrationNumber && (
                <>
                  <p className="text-xs text-muted-foreground mt-0.5">Registration Number</p>
                  <p className="text-base font-bold text-foreground font-mono mt-0.5">{registration.registrationNumber}</p>
                </>
              )}
              {isScheduled && (
                <>
                  <p className="text-xs text-muted-foreground mt-0.5">Scheduled For</p>
                  <p className="text-base font-bold text-foreground mt-0.5">{fmtDateTime(registration.scheduledDate)}</p>
                </>
              )}
              {isPending && (
                <p className="text-sm font-semibold text-foreground mt-1">Registration appointment pending</p>
              )}
            </div>
          </div>
        </Card>

        {/* SRO Details */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">SRO Details</p>
          </div>
          <div className="space-y-2.5">
            {[
              { label: 'Sub-Registrar Office', value: registration.sroOffice || '—' },
              { label: 'Scheduled Date', value: fmtDate(registration.scheduledDate) },
              { label: 'Completed Date', value: isCompleted ? fmtDate(registration.completedDate) : '—' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="text-sm font-bold text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Stamp Duty & Fees */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Stamp Duty & Fees</p>
          <div className="space-y-2.5">
            {[
              { label: 'Stamp Duty', value: registration.stampDuty ? fmtINR(registration.stampDuty) : '—', highlight: true },
              { label: 'Registration Fee', value: registration.registrationFee ? fmtINR(registration.registrationFee) : '—', highlight: false },
              {
                label: 'Stamp Duty Payment',
                value: registration.stampDutyPaid ? 'Paid ✓' : 'Pending',
                status: registration.stampDutyPaid,
              },
            ].map((row) => (
              <div key={row.label} className="flex justify-between border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className={`text-sm font-bold ${
                  'status' in row ? (row.status ? 'text-primary' : 'text-warning') :
                  row.highlight ? 'text-foreground' : 'text-foreground'
                }`}>{row.value}</span>
              </div>
            ))}
          </div>
          {!registration.stampDutyPaid && (
            <div className="mt-3 p-3 bg-warning/8 border border-warning/25 rounded-xl">
              <p className="text-xs text-muted-foreground leading-relaxed">
                ⚠️ <span className="font-bold text-foreground">Stamp duty must be paid</span> before the registration appointment.
              </p>
            </div>
          )}
        </Card>

        {/* Checklist */}
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Registration Checklist</p>
          <div className="space-y-2.5">
            {[
              { item: 'Original Agreement (2 copies)', done: isCompleted || isScheduled },
              { item: 'Stamp Duty Paid Receipt', done: registration.stampDutyPaid },
              { item: 'Buyer PAN & Aadhaar (original)', done: false },
              { item: 'Passport size photos (4 each)', done: false },
              { item: 'Witness documents (2 witnesses)', done: false },
            ].map((check) => (
              <div key={check.item} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 ${
                  check.done ? 'bg-primary border-primary' : 'border-border'
                }`}>
                  {check.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <p className={`text-sm ${check.done ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{check.item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CTAs */}
      <div className="shrink-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-md border-t border-border/50 space-y-2">
        {!registration.stampDutyPaid && (
          <Button className="w-full h-12 rounded-button font-bold gap-2">
            <UploadCloud className="w-4 h-4" /> Upload Stamp Duty Receipt
          </Button>
        )}
        {isCompleted && (
          <Button className="w-full h-12 rounded-button font-bold gap-2 bg-[#0F2E2A] text-white hover:bg-[#0F2E2A]/90">
            <BadgeCheck className="w-4 h-4" /> View Registered Document
          </Button>
        )}
        <Button variant="outline" className="w-full h-11 rounded-button font-semibold" onClick={() => navigate(-1)}>
          Back to Booking
        </Button>
      </div>
    </div>
  );
}
