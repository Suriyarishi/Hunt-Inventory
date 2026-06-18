import { useState } from 'react';
import type { ComponentType } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, BadgeCheck, Building2, Calendar, CheckCircle2, ChevronRight,
  Clock, Download, FileText, IndianRupee, ShieldCheck, User, XCircle,
  FileSignature, MoreVertical, Users, MapPin, ScrollText, Receipt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  mockBookingAudit, mockBookingDocuments, mockBookings,
  mockAgreements, mockRegistrations,
} from '../constants/mockData';

const STATUS_COLOR: Record<string, string> = {
  'Draft': 'bg-secondary text-muted-foreground',
  'Submitted': 'bg-accent-blue/10 text-accent-blue',
  'Under Review': 'bg-warning/10 text-warning',
  'Approved': 'bg-primary/10 text-primary',
  'Agreement Pending': 'bg-purple-100 text-purple-700',
  'Registered': 'bg-primary/15 text-primary',
  'Completed': 'bg-emerald-100 text-emerald-700',
  'Cancelled': 'bg-destructive/10 text-destructive',
  'Sold': 'bg-emerald-100 text-emerald-700',
  'Confirmed': 'bg-primary/10 text-primary',
  'Pending KYC': 'bg-warning/10 text-warning',
  'Verified': 'bg-primary/10 text-primary',
  'Pending': 'bg-warning/10 text-warning',
  'Uploaded': 'bg-primary/10 text-primary',
  'Generated': 'bg-accent-blue/10 text-accent-blue',
  'Rejected': 'bg-destructive/10 text-destructive',
};

export default function BookingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showIdPanel, setShowIdPanel] = useState(false);

  const booking = mockBookings.find((item) => item.id === id) || mockBookings[0];
  const documents = mockBookingDocuments[booking.id] || [];
  const audit = mockBookingAudit[booking.id] || [];
  const agreement = booking.agreementId ? mockAgreements[booking.agreementId] : null;
  const registration = booking.registrationId ? mockRegistrations[booking.registrationId] : null;

  const bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  const canConvertToAgreement = booking.status === 'Approved';

  return (
    <div className="flex flex-col h-full bg-background">

      {/* ── Sticky Header ── */}
      <div className="px-4 pt-4 pb-3 shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-20">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0 text-center">
            <h1 className="font-bold text-base text-foreground leading-tight font-headings">{booking.unitNumber}</h1>
            <p className="text-xs text-muted-foreground truncate">{booking.bookingNumber}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge className={`border-none text-[10px] ${STATUS_COLOR[booking.status]}`}>{booking.status}</Badge>
            <button className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* ── Hero Financial Card ── */}
        <div className="p-4 pb-0">
          <Card className="p-4 rounded-card border-none shadow-xs bg-card">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Net Payable</p>
                <p className="text-3xl font-bold text-primary mt-1 font-headings">{booking.netPayable || booking.totalValue}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InfoTile icon={User} label="Primary Buyer" value={booking.primaryApplicant} />
              <InfoTile icon={Calendar} label="Booked On" value={bookingDate} />
              <InfoTile icon={Building2} label="Project" value={booking.projectName} />
              <InfoTile icon={ShieldCheck} label="Token" value={booking.tokenAmount} />
            </div>
            {booking.hasCoApplicant && (
              <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border/40">
                <Users className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Co-Applicant: <span className="font-bold text-foreground">{booking.coApplicantName}</span></p>
              </div>
            )}
          </Card>
        </div>

        {/* ── Quick Action Chips ── */}
        <div className="px-4 py-3 flex gap-2 overflow-x-auto">
          <button
            className="flex items-center gap-1.5 px-3 py-2 bg-card rounded-xl border border-border/50 shadow-xs text-xs font-semibold text-foreground shrink-0"
            onClick={() => navigate(`/bookings/${booking.id}/timeline`)}
          >
            <Clock className="w-3.5 h-3.5 text-primary" /> Timeline
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-2 bg-card rounded-xl border border-border/50 shadow-xs text-xs font-semibold text-foreground shrink-0"
            onClick={() => navigate(`/bookings/${booking.id}/receipt`)}
          >
            <Receipt className="w-3.5 h-3.5 text-primary" /> Receipt
          </button>
          {agreement && (
            <button
              className="flex items-center gap-1.5 px-3 py-2 bg-card rounded-xl border border-border/50 shadow-xs text-xs font-semibold text-foreground shrink-0"
              onClick={() => navigate(`/bookings/${booking.id}/agreement`)}
            >
              <ScrollText className="w-3.5 h-3.5 text-purple-600" /> Agreement
            </button>
          )}
          {registration && (
            <button
              className="flex items-center gap-1.5 px-3 py-2 bg-card rounded-xl border border-border/50 shadow-xs text-xs font-semibold text-foreground shrink-0"
              onClick={() => navigate(`/bookings/${booking.id}/registration`)}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Registration
            </button>
          )}
          <button
            className="flex items-center gap-1.5 px-3 py-2 bg-card rounded-xl border border-border/50 shadow-xs text-xs font-semibold text-foreground shrink-0"
            onClick={() => setShowIdPanel((p) => !p)}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" /> IDs
          </button>
        </div>

        {/* IDs Panel */}
        {showIdPanel && (
          <div className="mx-4 mb-3 bg-card rounded-2xl shadow-xs overflow-hidden animate-in slide-in-from-top-2 duration-200">
            {[
              { label: 'Booking ID', value: booking.id },
              { label: 'Booking No.', value: booking.bookingNumber },
              { label: 'Unit ID', value: booking.unitId },
              { label: 'Project ID', value: booking.projectId },
              { label: 'Builder ID', value: booking.builderId || '—' },
              { label: 'Hold ID', value: booking.holdId || '—' },
              { label: 'Buyer ID', value: booking.buyerId || '—' },
            ].map((row, i, arr) => (
              <div key={row.label} className={`flex items-center justify-between px-4 py-2.5 ${i < arr.length - 1 ? 'border-b border-border/40' : ''}`}>
                <span className="text-xs text-muted-foreground">{row.label}</span>
                <span className="text-xs font-mono font-bold text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="px-4 pb-4">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4 bg-secondary/50 rounded-button p-1 h-10 mb-4">
              <TabsTrigger value="overview" className="rounded-button text-[10px]">Overview</TabsTrigger>
              <TabsTrigger value="financials" className="rounded-button text-[10px]">Financials</TabsTrigger>
              <TabsTrigger value="docs" className="rounded-button text-[10px]">Docs</TabsTrigger>
              <TabsTrigger value="audit" className="rounded-button text-[10px]">Audit</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-3 animate-in slide-in-from-bottom-2 duration-200">
              <StatusRow label="KYC Verification" value={booking.kycStatus} />
              <StatusRow label="Document Status" value={booking.documentStatus} />
              <StatusRow label="Payment Status" value={booking.paymentStatus} />
              <StatusRow label="Builder Approval" value={booking.builderApprovalStatus} />

              {agreement && (
                <Card className="p-4 rounded-card border-none shadow-xs bg-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Agreement</p>
                      <p className="text-sm font-bold text-foreground">{agreement.agreementNumber}</p>
                    </div>
                    <Badge className={`border-none text-[10px] ${
                      agreement.status === 'Registered' ? 'bg-emerald-100 text-emerald-700' :
                      agreement.status === 'Signed' ? 'bg-primary/10 text-primary' :
                      agreement.status === 'Sent' ? 'bg-accent-blue/10 text-accent-blue' :
                      'bg-secondary text-muted-foreground'
                    }`}>{agreement.status}</Badge>
                  </div>
                </Card>
              )}

              <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-3">
                <DetailRow label="Payment Mode" value={booking.paymentMode} />
                <DetailRow label="Reference No." value={booking.paymentReference || '—'} />
                <DetailRow label="Phone" value={booking.phone} />
                <DetailRow label="Email" value={booking.email} />
              </Card>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-11 rounded-button text-xs" onClick={() => navigate(`/clients/${booking.clientId}`)}>
                  View Client
                </Button>
                {booking.soldDealId && (
                  <Button className="h-11 rounded-button text-xs" onClick={() => navigate(`/sold/${booking.soldDealId}`)}>
                    View Sold Deal
                  </Button>
                )}
              </div>
            </TabsContent>

            {/* Financials Tab */}
            <TabsContent value="financials" className="space-y-3 animate-in slide-in-from-bottom-2 duration-200">
              <Card className="rounded-card border-none shadow-xs bg-card overflow-hidden">
                {[
                  { label: 'Booking Amount', value: booking.bookingAmount || booking.totalValue },
                  { label: 'GST', value: booking.gst || '—' },
                  { label: 'PLC', value: booking.plc || '—' },
                  { label: 'Maintenance', value: booking.maintenance || '—' },
                  { label: 'Parking Charges', value: booking.parkingCharges || '—' },
                  { label: 'Total Cost', value: booking.totalCost || booking.totalValue },
                  { label: 'Token Paid', value: booking.tokenAmount },
                ].map((row, i, arr) => (
                  <div key={row.label} className={`flex justify-between px-4 py-3 ${i < arr.length - 1 ? 'border-b border-border/40' : ''}`}>
                    <span className="text-sm text-muted-foreground">{row.label}</span>
                    <span className="text-sm font-bold text-foreground">{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between px-4 py-4 bg-primary/5 border-t-2 border-primary/20">
                  <span className="text-sm font-bold text-foreground">Net Payable</span>
                  <span className="text-lg font-bold text-primary">{booking.netPayable || booking.totalValue}</span>
                </div>
              </Card>
            </TabsContent>

            {/* Docs Tab */}
            <TabsContent value="docs" className="space-y-3 animate-in slide-in-from-bottom-2 duration-200">
              {documents.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-8 h-8 text-border mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No documents uploaded</p>
                </div>
              )}
              {documents.map((doc) => (
                <Card key={doc.id} className="p-3 rounded-card border-none shadow-xs bg-card flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">{doc.type}{doc.fileSize ? ` · ${doc.fileSize}` : ''}</p>
                  </div>
                  <Badge className={`border-none shrink-0 text-[10px] ${STATUS_COLOR[doc.status] || 'bg-secondary text-muted-foreground'}`}>
                    {doc.status}
                  </Badge>
                </Card>
              ))}
              <Button variant="outline" className="w-full h-11 rounded-button gap-2">
                <Download className="w-4 h-4" /> Download All
              </Button>
            </TabsContent>

            {/* Audit Tab */}
            <TabsContent value="audit" className="space-y-3 animate-in slide-in-from-bottom-2 duration-200">
              {audit.map((event, i) => (
                <div key={event.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {i < audit.length - 1 && <div className="w-px flex-1 bg-border/50 mt-1 mb-0.5 min-h-[20px]" />}
                  </div>
                  <div className="pb-3 flex-1">
                    <p className="font-bold text-sm text-foreground leading-tight">{event.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {event.actor} · {new Date(event.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* ── Action Bar ── */}
      <div className="shrink-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-md border-t border-border/50 space-y-2.5">
        {canConvertToAgreement && (
          <Button
            className="w-full h-13 rounded-button font-bold text-sm shadow-lg gap-2"
            onClick={() => navigate(`/bookings/${booking.id}/agreement`)}
          >
            <FileSignature className="w-4 h-4" /> Initiate Agreement
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Button>
        )}
        {booking.status !== 'Cancelled' && booking.status !== 'Completed' && booking.status !== 'Registered' && !canConvertToAgreement && (
          <Button
            variant="outline"
            className="w-full h-11 rounded-button font-semibold text-sm border-destructive/30 text-destructive hover:bg-destructive/5 gap-2"
            onClick={() => navigate(`/bookings/${booking.id}/reversal`)}
          >
            Request Reversal
          </Button>
        )}
        {booking.status === 'Registered' && (
          <Button
            className="w-full h-13 rounded-button font-bold text-sm shadow-lg gap-2"
            onClick={() => navigate(`/bookings/${booking.id}/receipt`)}
          >
            <BadgeCheck className="w-4 h-4" /> View Completion Receipt
          </Button>
        )}
      </div>
    </div>
  );
}

function InfoTile({ icon: Icon, label, value }: { icon: ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="bg-secondary/40 rounded-2xl p-3 min-w-0">
      <Icon className="w-3.5 h-3.5 text-muted-foreground mb-1.5" />
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
      <p className="text-xs font-bold text-foreground truncate mt-0.5">{value}</p>
    </div>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  const Icon = value === 'Verified' || value === 'Uploaded' ? CheckCircle2 : value === 'Rejected' ? XCircle : Clock;
  return (
    <Card className="p-3.5 rounded-card border-none shadow-xs bg-card flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-bold text-sm text-foreground">{value}</p>
      </div>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${STATUS_COLOR[value] || 'bg-secondary text-muted-foreground'}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-2.5 last:border-b-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-bold text-foreground text-right">{value}</span>
    </div>
  );
}
