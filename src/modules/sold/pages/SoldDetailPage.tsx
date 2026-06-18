import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockSoldDeals } from '../constants/mockData';
import {
  ArrowLeft,
  User,
  IndianRupee,
  FileText,
  FileCheck,
  Trophy,
  History,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Info,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function SoldDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const deal = mockSoldDeals.find(d => d.id === id);

  const [activeTab, setActiveTab] = useState<'buyer' | 'payment' | 'registration' | 'commission' | 'documents' | 'timeline'>('buyer');

  if (!deal) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mb-3" />
        <h2 className="text-base font-bold text-foreground font-headings">Deal Not Found</h2>
        <p className="text-xs text-muted-foreground mt-1">The transaction ID might be invalid or deleted.</p>
        <Button className="mt-4 rounded-button font-bold text-xs" onClick={() => navigate('/sold/listings')}>
          Go back to Listings
        </Button>
      </div>
    );
  }

  // Parse paid amount or use mock representation
  const paidPct = deal.paymentStatus === 'Fully Paid' ? 100 : deal.paymentStatus === 'Partially Paid' ? 45 : 10;

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Registered':
      case 'Possession Handed Over':
      case 'Released':
      case 'Fully Paid':
        return <CheckCircle className="w-4 h-4 text-primary" />;
      case 'Processing':
      case 'Partially Paid':
      case 'Agreement Signed':
        return <Clock className="w-4 h-4 text-accent-blue" />;
      default:
        return <AlertCircle className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'Closed':
      case 'Registered':
      case 'Possession Handed Over':
      case 'Released':
      case 'Fully Paid':
        return 'bg-primary/10 text-primary border-none';
      case 'Active':
      case 'Agreement Signed':
      case 'Processing':
      case 'Partially Paid':
        return 'bg-accent-blue/10 text-accent-blue border-none';
      default:
        return 'bg-warning/10 text-warning border-none';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28 flex flex-col font-sans">
      {/* ── Top Header Navbar ── */}
      <div className="sticky top-0 z-20 bg-background border-b border-border/50 px-4 pt-4 pb-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/60 -ml-2 shrink-0 h-10 w-10"
          onClick={() => navigate('/sold/listings')}
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-bold text-foreground font-headings">{deal.unitNumber}</h1>
            <Badge className={`${getStatusBadgeClass(deal.dealStatus)} text-[9px] px-1.5 py-0`}>
              {deal.dealStatus}
            </Badge>
          </div>
          <p className="text-[10px] text-muted-foreground truncate">{deal.projectName} · {deal.tower}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-bold text-primary">{deal.saleValue}</p>
          <p className="text-[9px] text-muted-foreground">Sale Value</p>
        </div>
      </div>

      {/* ── Transaction Brief Card (Jakob's Law) ── */}
      <div className="p-4">
        <Card className="p-4 bg-card border-none shadow-xs rounded-card space-y-3">
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
            <div>
              <p className="text-[10px] text-muted-foreground">Sold Transaction ID</p>
              <p className="font-semibold text-foreground mt-0.5">{deal.id}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Booking ID</p>
              <p className="font-semibold text-foreground mt-0.5">{deal.bookingId}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Unit Configuration</p>
              <p className="font-semibold text-foreground mt-0.5">{deal.floor}th Floor · {deal.tower}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Sold Date</p>
              <p className="font-semibold text-foreground mt-0.5">{new Date(deal.soldDate).toLocaleDateString('en-IN')}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Horizontal Sub-Navigation Tabs (Miller's Law) ── */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-2 select-none scrollbar-none border-b border-border/30">
        {[
          { id: 'buyer', label: 'Buyer Profile', icon: User },
          { id: 'payment', label: 'Payment Track', icon: IndianRupee },
          { id: 'registration', label: 'Registration', icon: FileCheck },
          { id: 'commission', label: 'Commission', icon: Trophy },
          { id: 'documents', label: 'Documents', icon: FileText },
          { id: 'timeline', label: 'Timeline', icon: History }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                activeTab === tab.id
                  ? 'bg-primary/10 border-primary/20 text-primary'
                  : 'bg-card border-border/40 text-muted-foreground hover:bg-secondary/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Sub-Views Content (Progressive Disclosure) ── */}
      <div className="p-4 flex-1">
        {/* 1. BUYER PROFILE SUB-VIEW */}
        {activeTab === 'buyer' && (
          <div className="space-y-4 animate-slide-up-fade">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Primary Applicant</h3>
            <Card className="p-4 bg-card border-none shadow-xs rounded-card space-y-3">
              <div className="flex items-center gap-3 border-b border-border/40 pb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {deal.buyerName.split(' ').map(n => n.charAt(0)).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">{deal.buyerName}</h4>
                  <p className="text-[10px] text-muted-foreground">{deal.buyerOccupation}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 text-muted-foreground/80" />
                  <span className="text-foreground font-medium">{deal.buyerPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-muted-foreground/80" />
                  <span className="text-foreground font-medium">{deal.buyerEmail}</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-muted-foreground/80 mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium leading-relaxed">{deal.buyerAddress}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card border-none shadow-xs rounded-card space-y-3">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">Identity & Compliance</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[10px] text-muted-foreground">PAN Number</p>
                  <p className="font-semibold text-foreground mt-0.5">{deal.buyerPAN}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Aadhaar Card</p>
                  <p className="font-semibold text-foreground mt-0.5">{deal.buyerAadhaar}</p>
                </div>
              </div>
            </Card>

            {deal.coApplicant && (
              <>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-2">Co-Applicant Details</h3>
                <Card className="p-4 bg-card border-none shadow-xs rounded-card space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-foreground">{deal.coApplicant.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Relationship: {deal.coApplicant.relationship}</p>
                    </div>
                    <Badge variant="secondary" className="bg-secondary border-none text-[10px]">
                      PAN: {deal.coApplicant.pan}
                    </Badge>
                  </div>
                </Card>
              </>
            )}
          </div>
        )}

        {/* 2. PAYMENT TRACK SUB-VIEW */}
        {activeTab === 'payment' && (
          <div className="space-y-4 animate-slide-up-fade">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Progression</h3>
            <Card className="p-4 bg-card border-none shadow-xs rounded-card space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Paid vs Outstanding</span>
                <span className="text-xs font-bold text-primary">{paidPct}% Cleared</span>
              </div>
              <Progress value={paidPct} className="h-2 bg-secondary" />

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/40 text-xs">
                <div>
                  <p className="text-[10px] text-muted-foreground">Paid Amount</p>
                  <p className="font-bold text-primary text-sm mt-0.5">{deal.paidAmount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Pending Amount</p>
                  <p className="font-bold text-warning text-sm mt-0.5">{deal.pendingAmount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Token Received</p>
                  <p className="font-semibold text-foreground mt-0.5">{deal.tokenAmount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Booking Deposit</p>
                  <p className="font-semibold text-foreground mt-0.5">{deal.bookingAmount}</p>
                </div>
              </div>
            </Card>

            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-2">Payment Milestones</h3>
            <div className="space-y-2.5">
              {deal.paymentSchedule.map(milestone => (
                <Card key={milestone.milestone} className="p-3.5 bg-card border-none shadow-xs rounded-card flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-foreground truncate">{milestone.milestone}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Due: {new Date(milestone.dueDate).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-xs text-foreground">{milestone.amount}</p>
                    <span className={`text-[10px] font-semibold flex items-center gap-1 justify-end mt-0.5 ${
                      milestone.status === 'Paid' ? 'text-primary' : 'text-warning'
                    }`}>
                      {milestone.status === 'Paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 3. REGISTRATION STATUS SUB-VIEW */}
        {activeTab === 'registration' && (
          <div className="space-y-4 animate-slide-up-fade">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Registry & Possession</h3>
            <Card className="p-4 bg-card border-none shadow-xs rounded-card space-y-4">
              <div className="flex items-center gap-3 border-b border-border/40 pb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {getStatusIcon(deal.registrationStatus)}
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Registry Status</p>
                  <p className="font-bold text-sm text-foreground mt-0.5">{deal.registrationStatus}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Agreement Sign Date</span>
                  <span className="font-semibold text-foreground">{deal.agreementDate ? new Date(deal.agreementDate).toLocaleDateString('en-IN') : 'Not Signed'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Registration Date</span>
                  <span className="font-semibold text-foreground">{deal.registrationDate ? new Date(deal.registrationDate).toLocaleDateString('en-IN') : 'Pending Registry'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Registry Registration Number</span>
                  <span className="font-semibold text-foreground">{deal.registryNumber || 'Pending'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Expected Possession Date</span>
                  <span className="font-semibold text-foreground">{deal.possessionDate ? new Date(deal.possessionDate).toLocaleDateString('en-IN') : 'TBD'}</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 4. COMMISSION STATUS SUB-VIEW */}
        {activeTab === 'commission' && (
          <div className="space-y-4 animate-slide-up-fade">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Commission Breakdown</h3>
            <Card className="p-4 bg-card border-none shadow-xs rounded-card space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-muted-foreground">Total Payout ({deal.commissionPercentage}%)</p>
                  <p className="text-lg font-bold text-primary font-headings mt-0.5">{deal.commissionValue}</p>
                </div>
                <Badge className={`${getStatusBadgeClass(deal.commissionStatus)} px-2 py-1`}>
                  {deal.commissionStatus}
                </Badge>
              </div>

              <div className="space-y-3 text-xs pt-3 border-t border-border/40">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Expected Release Date</span>
                  <span className="font-semibold text-foreground">{new Date(deal.commissionExpectedDate).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Released Date</span>
                  <span className="font-semibold text-foreground">{deal.commissionReleasedDate ? new Date(deal.commissionReleasedDate).toLocaleDateString('en-IN') : 'In Process'}</span>
                </div>
              </div>
            </Card>

            <Card className="p-3 bg-secondary border border-border/50 rounded-card flex gap-2">
              <Info className="w-4.5 h-4.5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Commissions are calculated based on base sale values, excluding VAT/Service Taxes. The broker payouts are processed within 15 working days post property registration confirmation.
              </p>
            </Card>
          </div>
        )}

        {/* 5. DOCUMENTS CENTER SUB-VIEW */}
        {activeTab === 'documents' && (
          <div className="space-y-3 animate-slide-up-fade">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Uploaded Documents</h3>
            {deal.documents.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">No documents uploaded yet.</p>
            ) : (
              deal.documents.map(doc => (
                <Card key={doc.id} className="p-3 bg-card border-none shadow-xs rounded-card flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-foreground truncate">{doc.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{doc.size} · Uploaded {new Date(doc.uploadedAt).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-full hover:bg-secondary shrink-0 h-9 w-9">
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </Card>
              ))
            )}
          </div>
        )}

        {/* 6. TIMELINE & AUDIT LOG SUB-VIEW */}
        {activeTab === 'timeline' && (
          <div className="space-y-4 animate-slide-up-fade">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Deal Progress Timeline</h3>
            <div className="relative pl-6 border-l border-border/80 space-y-5 ml-2">
              {deal.activities.map((act, idx) => (
                <div key={act.id} className="relative">
                  {/* Timeline dot */}
                  <span className={`absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full border-2 border-background flex items-center justify-center ${
                    idx === 0 ? 'bg-primary' : 'bg-muted-foreground/40'
                  }`}>
                    {idx === 0 && <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />}
                  </span>
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-xs text-foreground leading-none">{act.title}</h4>
                      <span className="text-[9px] text-muted-foreground shrink-0">{new Date(act.timestamp).toLocaleDateString('en-IN')}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5">{act.description}</p>
                    <p className="text-[9px] text-muted-foreground/80 mt-1 font-medium">Logged by: {act.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
