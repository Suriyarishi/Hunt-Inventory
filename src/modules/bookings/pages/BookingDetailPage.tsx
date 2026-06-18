import { useNavigate, useParams } from 'react-router-dom';
import type { ComponentType } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileText,
  IndianRupee,
  ShieldCheck,
  User,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockBookingAudit, mockBookingDocuments, mockBookings } from '../constants/mockData';

const statusTone: Record<string, string> = {
  Sold: 'bg-success/10 text-success',
  Confirmed: 'bg-success/10 text-success',
  'Pending KYC': 'bg-warning/10 text-warning',
  'Pending Payment': 'bg-warning/10 text-warning',
  'Under Review': 'bg-accent-blue/10 text-accent-blue',
  Rejected: 'bg-destructive/10 text-destructive',
  Verified: 'bg-success/10 text-success',
  Pending: 'bg-warning/10 text-warning',
  Uploaded: 'bg-success/10 text-success',
  Generated: 'bg-accent-blue/10 text-accent-blue',
};

export default function BookingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = mockBookings.find((item) => item.id === id) || mockBookings[0];
  const documents = mockBookingDocuments[booking.id] || [];
  const audit = mockBookingAudit[booking.id] || [];
  const soldDealId = booking.soldDealId || 'S-001';

  const bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background pb-8 pt-safe flex flex-col">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost" size="icon" className="rounded-full -ml-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-foreground leading-tight">{booking.unitNumber}</h1>
            <p className="text-xs text-muted-foreground truncate">{booking.projectName} booking</p>
          </div>
          <Badge className={`border-none ${statusTone[booking.status]}`}>
            {booking.status}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto">
        <Card className="p-4 rounded-card border-none shadow-xs bg-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Agreement value</p>
              <p className="text-3xl font-bold text-primary mt-1">{booking.totalValue}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <InfoTile icon={User} label="Applicant" value={booking.primaryApplicant} />
            <InfoTile icon={Calendar} label="Booked on" value={bookingDate} />
            <InfoTile icon={Building2} label="Hold ID" value={booking.holdId || 'Direct'} />
            <InfoTile icon={ShieldCheck} label="Token" value={booking.tokenAmount} />
          </div>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50 rounded-button p-1 h-11">
            <TabsTrigger value="overview" className="rounded-button text-xs">Overview</TabsTrigger>
            <TabsTrigger value="docs" className="rounded-button text-xs">Docs</TabsTrigger>
            <TabsTrigger value="audit" className="rounded-button text-xs">Audit</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-3 mt-4 animate-slide-up-fade">
            <StatusRow label="KYC" value={booking.kycStatus} />
            <StatusRow label="Documents" value={booking.documentStatus} />
            <StatusRow label="Payment" value={booking.paymentStatus} />
            <StatusRow label="Builder approval" value={booking.builderApprovalStatus} />

            <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-3">
              <DetailRow label="Payment mode" value={booking.paymentMode} />
              <DetailRow label="Reference" value={booking.paymentReference} />
              <DetailRow label="Client phone" value={booking.phone} />
              <DetailRow label="Client email" value={booking.email} />
            </Card>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-11 rounded-button" onClick={() => navigate(`/clients/${booking.clientId}`)}>
                Client
              </Button>
              <Button className="h-11 rounded-button" onClick={() => navigate(`/sold/${soldDealId}`)}>
                View Sold
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="space-y-3 mt-4 animate-slide-up-fade">
            {documents.map((doc) => (
              <Card key={doc.id} className="p-4 rounded-card border-none shadow-xs bg-card flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">{doc.type}</p>
                  </div>
                </div>
                <Badge className={`border-none shrink-0 ${statusTone[doc.status] || 'bg-secondary text-muted-foreground'}`}>
                  {doc.status}
                </Badge>
              </Card>
            ))}
            <Button variant="outline" className="w-full h-11 rounded-button gap-2">
              <Download className="w-4 h-4" /> Download docs
            </Button>
          </TabsContent>

          <TabsContent value="audit" className="space-y-3 mt-4 animate-slide-up-fade">
            {audit.map((event) => (
              <Card key={event.id} className="p-4 rounded-card border-none shadow-xs bg-card">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">{event.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.actor} - {new Date(event.timestamp).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {booking.status !== 'Sold' && (
          <Button className="w-full h-13 rounded-button font-bold gap-2" onClick={() => navigate('/sold/S-001')}>
            <BadgeCheck className="w-5 h-5" /> Confirm and mark sold
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Button>
        )}
      </div>
    </div>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-secondary/40 rounded-2xl p-3 min-w-0">
      <Icon className="w-4 h-4 text-muted-foreground mb-2" />
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
      <p className="text-sm font-bold text-foreground truncate">{value}</p>
    </div>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  const Icon = value === 'Verified' ? CheckCircle2 : value === 'Rejected' ? XCircle : Clock;
  return (
    <Card className="p-4 rounded-card border-none shadow-xs bg-card flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-bold text-foreground">{value}</p>
      </div>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${statusTone[value] || 'bg-secondary text-muted-foreground'}`}>
        <Icon className="w-4 h-4" />
      </div>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-bold text-foreground text-right">{value}</span>
    </div>
  );
}
