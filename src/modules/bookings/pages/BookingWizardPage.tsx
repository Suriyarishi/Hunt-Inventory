import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, IndianRupee, User, FileText, UploadCloud,
  ShieldCheck, Users, Building2, ClipboardList, Eye, Sparkles,
  CreditCard, Phone, Mail, MapPin, Briefcase, BadgeCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockHolds } from '@/modules/holds/constants/mockData';
import type { BookingWizardFormData } from '../types';

// ─── Step config ────────────────────────────────────────────────────────────────

type StepKey = 'eoi' | 'kyc' | 'buyer' | 'coapplicant' | 'details' | 'documents' | 'payment' | 'review' | 'success';

const STEPS: { key: StepKey; label: string; shortLabel: string; icon: React.ElementType }[] = [
  { key: 'eoi', label: 'EOI Form', shortLabel: 'EOI', icon: ClipboardList },
  { key: 'kyc', label: 'Buyer KYC', shortLabel: 'KYC', icon: CreditCard },
  { key: 'buyer', label: 'Buyer Details', shortLabel: 'Details', icon: User },
  { key: 'coapplicant', label: 'Co-Applicant', shortLabel: 'Co-App', icon: Users },
  { key: 'details', label: 'Booking Details', shortLabel: 'Booking', icon: Building2 },
  { key: 'documents', label: 'Documents', shortLabel: 'Docs', icon: FileText },
  { key: 'payment', label: 'Payment Summary', shortLabel: 'Payment', icon: IndianRupee },
  { key: 'review', label: 'Review', shortLabel: 'Review', icon: Eye },
];

const initialForm: BookingWizardFormData = {
  unitId: '', unitNumber: '', projectId: '', projectName: '',
  tokenAmount: '', paymentMode: '', paymentReference: '', eoiDate: '',
  pan: '', aadhaar: '', dob: '', nationality: 'Indian', sourceOfFunds: '',
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', pincode: '', occupation: '', annualIncome: '',
  hasCoApplicant: false,
  coApplicant: { firstName: '', lastName: '', relationship: 'Spouse', pan: '', aadhaar: '' },
  bookingAmount: '', gstPercent: '1.2', plc: '', maintenance: '', parkingCharges: '', paymentSchedule: '',
  docs: {},
};

function fmtCr(num: number) {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
  return `₹${num.toLocaleString('en-IN')}`;
}

function parseAmt(s: string) {
  const n = parseFloat(s.replace(/[^0-9.]/g, ''));
  return isNaN(n) ? 0 : n;
}

export default function BookingWizardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { holdId?: string } | null;
  const selectedHold = mockHolds.find((h) => h.id === state?.holdId);

  const [step, setStep] = useState<StepKey>('eoi');
  const [form, setForm] = useState<BookingWizardFormData>({
    ...initialForm,
    unitId: selectedHold?.unitId || '',
    unitNumber: selectedHold?.unitNumber || '',
    projectId: selectedHold?.projectId || '',
    projectName: selectedHold?.projectName || '',
  });
  const [loading, setLoading] = useState(false);

  const currentIdx = STEPS.findIndex((s) => s.key === step);

  const setF = (patch: Partial<BookingWizardFormData>) => setForm((f) => ({ ...f, ...patch }));

  const goNext = (next: StepKey) => setStep(next);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('success'); }, 1800);
  };

  // Computed financials
  const basePrice = parseAmt(form.bookingAmount);
  const gstAmt = basePrice * (parseAmt(form.gstPercent) / 100);
  const plcAmt = parseAmt(form.plc);
  const maintAmt = parseAmt(form.maintenance);
  const parkAmt = parseAmt(form.parkingCharges);
  const tokenAmt = parseAmt(form.tokenAmount);
  const totalCost = basePrice + gstAmt + plcAmt + maintAmt + parkAmt;
  const netPayable = totalCost - tokenAmt;

  // ── SUCCESS ──────────────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div className="flex flex-col h-full bg-background overflow-y-auto pb-8">
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-6 text-center">
          {/* Animated success ring */}
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground font-headings mb-2">Booking Submitted!</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Your booking has been submitted for review. You'll receive a confirmation once the builder approves.
          </p>

          {/* Booking Summary Card */}
          <Card className="w-full p-4 rounded-card border border-border/50 bg-card text-left space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Booking Number</span>
              <span className="font-bold font-mono text-primary">BK-2026-007</span>
            </div>
            <div className="flex justify-between text-sm border-t border-border/40 pt-3">
              <span className="text-muted-foreground">Unit</span>
              <span className="font-bold">{form.unitNumber || 'A-1402'}, {form.projectName || 'Skyline'}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-border/40 pt-3">
              <span className="text-muted-foreground">Buyer</span>
              <span className="font-bold">{form.firstName || 'Vikram'} {form.lastName || 'Malhotra'}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-border/40 pt-3">
              <span className="text-muted-foreground">Token Paid</span>
              <span className="font-bold text-primary">₹{tokenAmt > 0 ? tokenAmt.toLocaleString('en-IN') : '5,00,000'}</span>
            </div>
            {netPayable > 0 && (
              <div className="flex justify-between text-sm border-t border-border/40 pt-3">
                <span className="text-muted-foreground">Net Payable</span>
                <span className="font-bold text-lg text-foreground">{fmtCr(netPayable)}</span>
              </div>
            )}
          </Card>

          {/* Status progression hint */}
          <div className="w-full flex items-center justify-between px-2 mb-8">
            {['Submitted', 'Review', 'Approved', 'Agreement', 'Registered'].map((s, i, arr) => (
              <div key={s} className="flex items-center gap-1">
                <div className={`flex flex-col items-center gap-1 ${i === 0 ? '' : ''}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${i === 0 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                    {i === 0 ? '✓' : i + 1}
                  </div>
                  <span className="text-[8px] text-muted-foreground font-medium text-center w-12 leading-tight">{s}</span>
                </div>
                {i < arr.length - 1 && <div className="w-4 h-px bg-border/60 mb-3" />}
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-2">
          <Button className="w-full h-13 rounded-button text-base font-bold shadow-lg" onClick={() => navigate('/bookings/B-001')}>
            View Booking
          </Button>
          <Button variant="outline" className="w-full h-11 rounded-button font-semibold" onClick={() => navigate('/bookings')}>
            Back to Bookings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">

      {/* ── Header ── */}
      <div className="px-4 pt-4 pb-3 shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => currentIdx === 0 ? navigate(-1) : setStep(STEPS[currentIdx - 1].key)}
            className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div className="text-center">
            <h1 className="font-bold text-sm text-foreground leading-none font-headings">New Booking</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Step {currentIdx + 1} of {STEPS.length}</p>
          </div>
          <div className="w-8" />
        </div>

        {/* Step progress dots */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center gap-1.5 flex-1">
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i < currentIdx ? 'bg-primary' : i === currentIdx ? 'bg-primary/60' : 'bg-border'
              }`} />
            </div>
          ))}
        </div>
        <p className="text-xs font-semibold text-primary mt-1.5">
          {STEPS[currentIdx]?.label}
        </p>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4">

        {/* Hold conversion banner */}
        {selectedHold && (
          <Card className="p-3 rounded-2xl border-none shadow-xs bg-primary/5 mb-4 flex items-center gap-3">
            <BadgeCheck className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-primary font-bold">Converted from Hold</p>
              <p className="text-sm font-bold text-foreground">{selectedHold.unitNumber} · {selectedHold.projectName}</p>
            </div>
          </Card>
        )}

        {/* ── STEP 0: EOI Form ── */}
        {step === 'eoi' && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">EOI & Token Details</h2>
              <p className="text-sm text-muted-foreground">Expression of Interest with token payment confirmation</p>
            </div>

            {!selectedHold && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Unit</label>
                <Select onValueChange={(v) => setF({ unitId: v, unitNumber: v === 'U-1402' ? 'A-1402' : 'B-2101', projectName: v === 'U-1402' ? 'Skyline Residences' : 'Zenith Towers' })}>
                  <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                    <SelectValue placeholder="Select inventory unit..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="U-1402">A-1402 · Skyline Residences · ₹4.2 Cr</SelectItem>
                    <SelectItem value="U-2101">B-2101 · Zenith Towers · ₹4.3 Cr</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Token Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">₹</span>
                  <Input
                    placeholder="5,00,000"
                    value={form.tokenAmount}
                    onChange={(e) => setF({ tokenAmount: e.target.value })}
                    className="h-12 rounded-input bg-secondary/30 border-border/50 pl-7"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">EOI Date</label>
                <Input
                  type="date"
                  value={form.eoiDate}
                  onChange={(e) => setF({ eoiDate: e.target.value })}
                  className="h-12 rounded-input bg-secondary/30 border-border/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Mode</label>
              <Select onValueChange={(v) => setF({ paymentMode: v })}>
                <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEFT / RTGS">NEFT / RTGS</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                  <SelectItem value="IMPS">IMPS</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Demand Draft">Demand Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Reference Number</label>
              <Input
                placeholder="UTR / Cheque / DD number"
                value={form.paymentReference}
                onChange={(e) => setF({ paymentReference: e.target.value })}
                className="h-12 rounded-input bg-secondary/30 border-border/50"
              />
            </div>

            {/* EOI info banner */}
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-2xl">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-bold text-primary">EOI (Expression of Interest)</span> confirms buyer intent with a token amount. This secures the unit until builder approval.
              </p>
            </div>
          </div>
        )}

        {/* ── STEP 1: Buyer KYC ── */}
        {step === 'kyc' && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">Buyer KYC</h2>
              <p className="text-sm text-muted-foreground">Identity verification for compliance</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">PAN Number</label>
                <Input
                  placeholder="ABCDE1234F"
                  value={form.pan}
                  onChange={(e) => setF({ pan: e.target.value.toUpperCase() })}
                  maxLength={10}
                  className="h-12 rounded-input bg-secondary/30 border-border/50 uppercase font-mono tracking-widest"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Date of Birth</label>
                <Input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setF({ dob: e.target.value })}
                  className="h-12 rounded-input bg-secondary/30 border-border/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Aadhaar Number</label>
              <Input
                placeholder="0000 0000 0000"
                value={form.aadhaar}
                onChange={(e) => setF({ aadhaar: e.target.value })}
                maxLength={14}
                className="h-12 rounded-input bg-secondary/30 border-border/50 font-mono tracking-widest"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Nationality</label>
              <Select defaultValue="Indian" onValueChange={(v) => setF({ nationality: v })}>
                <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Indian">Indian</SelectItem>
                  <SelectItem value="NRI">NRI (Non-Resident Indian)</SelectItem>
                  <SelectItem value="Foreign National">Foreign National</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Source of Funds</label>
              <Select onValueChange={(v) => setF({ sourceOfFunds: v })}>
                <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                  <SelectValue placeholder="Select source..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salary">Salary / Employment Income</SelectItem>
                  <SelectItem value="Business">Business Income</SelectItem>
                  <SelectItem value="Investment">Investment Returns</SelectItem>
                  <SelectItem value="Inheritance">Inheritance / Gift</SelectItem>
                  <SelectItem value="Loan">Bank Loan / Home Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* KYC compliance notice */}
            <div className="p-3 bg-warning/8 border border-warning/25 rounded-2xl flex gap-2">
              <ShieldCheck className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                KYC information is collected as per <span className="font-bold text-foreground">PMLA & RERA compliance</span>. All data is encrypted and securely stored.
              </p>
            </div>
          </div>
        )}

        {/* ── STEP 2: Buyer Details ── */}
        {step === 'buyer' && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">Buyer Details</h2>
              <p className="text-sm text-muted-foreground">Primary applicant information</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">First Name</label>
                <Input placeholder="First Name" value={form.firstName} onChange={(e) => setF({ firstName: e.target.value })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Name</label>
                <Input placeholder="Last Name" value={form.lastName} onChange={(e) => setF({ lastName: e.target.value })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3 h-3" />Email Address
              </label>
              <Input type="email" placeholder="email@example.com" value={form.email} onChange={(e) => setF({ email: e.target.value })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3 h-3" />Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">+91</span>
                <Input placeholder="98200 11223" value={form.phone} onChange={(e) => setF({ phone: e.target.value })} className="h-12 rounded-input bg-secondary/30 border-border/50 pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />Address
              </label>
              <Input placeholder="Street address, locality" value={form.address} onChange={(e) => setF({ address: e.target.value })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">City</label>
                <Input placeholder="Mumbai" value={form.city} onChange={(e) => setF({ city: e.target.value })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pincode</label>
                <Input placeholder="400001" maxLength={6} value={form.pincode} onChange={(e) => setF({ pincode: e.target.value })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />Occupation
                </label>
                <Select onValueChange={(v) => setF({ occupation: v })}>
                  <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Salaried">Salaried</SelectItem>
                    <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                    <SelectItem value="Business Owner">Business Owner</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Annual Income</label>
                <Select onValueChange={(v) => setF({ annualIncome: v })}>
                  <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                    <SelectValue placeholder="Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<10L">Below ₹10 L</SelectItem>
                    <SelectItem value="10-25L">₹10 – 25 L</SelectItem>
                    <SelectItem value="25-50L">₹25 – 50 L</SelectItem>
                    <SelectItem value="50L-1Cr">₹50 L – 1 Cr</SelectItem>
                    <SelectItem value=">1Cr">Above ₹1 Cr</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Co-Applicant ── */}
        {step === 'coapplicant' && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">Co-Applicant</h2>
              <p className="text-sm text-muted-foreground">Add a joint holder if applicable</p>
            </div>

            {/* Toggle */}
            <div className="flex items-center justify-between p-4 bg-secondary/40 rounded-2xl border border-border/50">
              <div>
                <p className="text-sm font-bold text-foreground">Include Co-Applicant?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Joint holder for this unit</p>
              </div>
              <button
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 ${form.hasCoApplicant ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                onClick={() => setF({ hasCoApplicant: !form.hasCoApplicant })}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${form.hasCoApplicant ? 'translate-x-6' : ''}`} />
              </button>
            </div>

            {/* Progressive disclosure — co-applicant form */}
            {form.hasCoApplicant && (
              <div className="space-y-4 animate-in slide-in-from-top-3 duration-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">First Name</label>
                    <Input placeholder="First Name" value={form.coApplicant.firstName} onChange={(e) => setF({ coApplicant: { ...form.coApplicant, firstName: e.target.value } })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Name</label>
                    <Input placeholder="Last Name" value={form.coApplicant.lastName} onChange={(e) => setF({ coApplicant: { ...form.coApplicant, lastName: e.target.value } })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Relationship</label>
                  <Select onValueChange={(v) => setF({ coApplicant: { ...form.coApplicant, relationship: v as 'Spouse' } })}>
                    <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                      <SelectValue placeholder="Relationship to primary..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spouse">Spouse</SelectItem>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Sibling">Sibling</SelectItem>
                      <SelectItem value="Child">Child</SelectItem>
                      <SelectItem value="Partner">Business Partner</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">PAN Number</label>
                    <Input placeholder="ABCDE1234F" maxLength={10} value={form.coApplicant.pan} onChange={(e) => setF({ coApplicant: { ...form.coApplicant, pan: e.target.value.toUpperCase() } })} className="h-12 rounded-input bg-secondary/30 border-border/50 uppercase font-mono" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Aadhaar</label>
                    <Input placeholder="0000 0000 0000" maxLength={14} value={form.coApplicant.aadhaar} onChange={(e) => setF({ coApplicant: { ...form.coApplicant, aadhaar: e.target.value } })} className="h-12 rounded-input bg-secondary/30 border-border/50 font-mono" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone</label>
                    <Input placeholder="+91 ..." value={form.coApplicant.phone || ''} onChange={(e) => setF({ coApplicant: { ...form.coApplicant, phone: e.target.value } })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email</label>
                    <Input placeholder="email@..." value={form.coApplicant.email || ''} onChange={(e) => setF({ coApplicant: { ...form.coApplicant, email: e.target.value } })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
                  </div>
                </div>
              </div>
            )}

            {!form.hasCoApplicant && (
              <div className="flex flex-col items-center py-8 text-center">
                <Users className="w-10 h-10 text-border mb-3" />
                <p className="text-sm font-semibold text-muted-foreground">No co-applicant</p>
                <p className="text-xs text-muted-foreground mt-1">Enable the toggle above to add a joint holder</p>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 4: Booking Details ── */}
        {step === 'details' && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">Booking Details</h2>
              <p className="text-sm text-muted-foreground">Financial terms and booking configuration</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Booking Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">₹</span>
                <Input placeholder="4,20,00,000" value={form.bookingAmount} onChange={(e) => setF({ bookingAmount: e.target.value })} className="h-12 rounded-input bg-secondary/30 border-border/50 pl-7" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">GST %</label>
                <Select defaultValue="1.2" onValueChange={(v) => setF({ gstPercent: v })}>
                  <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1% (Affordable)</SelectItem>
                    <SelectItem value="1.2">1.2%</SelectItem>
                    <SelectItem value="5">5% (Standard)</SelectItem>
                    <SelectItem value="12">12% (Commercial)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">PLC (₹)</label>
                <Input placeholder="3,50,000" value={form.plc} onChange={(e) => setF({ plc: e.target.value })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Maintenance (₹)</label>
                <Input placeholder="1,20,000" value={form.maintenance} onChange={(e) => setF({ maintenance: e.target.value })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Parking (₹)</label>
                <Input placeholder="5,00,000" value={form.parkingCharges} onChange={(e) => setF({ parkingCharges: e.target.value })} className="h-12 rounded-input bg-secondary/30 border-border/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Schedule</label>
              <Select onValueChange={(v) => setF({ paymentSchedule: v })}>
                <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                  <SelectValue placeholder="Select payment plan..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CLP">Construction Linked Plan (CLP)</SelectItem>
                  <SelectItem value="TLP">Time Linked Plan (TLP)</SelectItem>
                  <SelectItem value="Down Payment">Down Payment (10:90)</SelectItem>
                  <SelectItem value="Flexi">Flexi Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Live preview of net payable */}
            {basePrice > 0 && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl animate-in slide-in-from-bottom-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Live Estimate</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Base Price</span><span className="font-semibold">{fmtCr(basePrice)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">+ GST ({form.gstPercent}%)</span><span className="font-semibold">{fmtCr(gstAmt)}</span></div>
                  {plcAmt > 0 && <div className="flex justify-between"><span className="text-muted-foreground">+ PLC</span><span className="font-semibold">{fmtCr(plcAmt)}</span></div>}
                  {maintAmt > 0 && <div className="flex justify-between"><span className="text-muted-foreground">+ Maintenance</span><span className="font-semibold">{fmtCr(maintAmt)}</span></div>}
                  {parkAmt > 0 && <div className="flex justify-between"><span className="text-muted-foreground">+ Parking</span><span className="font-semibold">{fmtCr(parkAmt)}</span></div>}
                  <div className="flex justify-between pt-2 border-t border-primary/20 font-bold text-foreground">
                    <span>Net Payable</span><span className="text-primary text-sm">{fmtCr(netPayable)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 5: Documents ── */}
        {step === 'documents' && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">Document Upload</h2>
              <p className="text-sm text-muted-foreground">Required for KYC and booking compliance</p>
            </div>

            {/* Document progress */}
            <div className="flex items-center gap-2 p-3 bg-secondary/40 rounded-2xl">
              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '33%' }} />
              </div>
              <span className="text-xs font-bold text-muted-foreground shrink-0">2 / 6 uploaded</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'pan', label: 'PAN Card', required: true, status: 'uploaded' },
                { key: 'aadhaar', label: 'Aadhaar Card', required: true, status: 'uploaded' },
                { key: 'income', label: 'Income Proof', required: true, status: 'pending' },
                { key: 'photo', label: 'Passport Photo', required: true, status: 'pending' },
              ].map((doc) => (
                <div
                  key={doc.key}
                  className={`flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-card cursor-pointer transition-all active:scale-[0.98] ${
                    doc.status === 'uploaded'
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border/50 bg-secondary/30 hover:border-primary/30'
                  }`}
                >
                  {doc.status === 'uploaded' ? (
                    <CheckCircle2 className="w-6 h-6 text-primary mb-2" />
                  ) : (
                    <UploadCloud className="w-6 h-6 text-muted-foreground mb-2" />
                  )}
                  <span className="text-xs font-bold text-foreground text-center">{doc.label}</span>
                  {doc.required && <span className="text-[9px] text-muted-foreground mt-0.5">Required</span>}
                  <span className={`text-[9px] font-bold mt-1.5 px-2 py-0.5 rounded-full ${
                    doc.status === 'uploaded' ? 'bg-primary/15 text-primary' : 'bg-border text-muted-foreground'
                  }`}>
                    {doc.status === 'uploaded' ? 'Uploaded' : 'Tap to upload'}
                  </span>
                </div>
              ))}
            </div>

            {/* Full-width docs */}
            {[
              { key: 'token_receipt', label: 'Token Payment Receipt / Cheque', required: true, status: 'pending' },
              { key: 'booking_form', label: 'Builder Booking Form', required: false, status: 'pending' },
            ].map((doc) => (
              <div
                key={doc.key}
                className="flex items-center gap-4 p-4 border-2 border-dashed border-border/50 rounded-card bg-secondary/30 cursor-pointer hover:border-primary/30 transition-all"
              >
                <UploadCloud className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{doc.label}</p>
                  {!doc.required && <p className="text-xs text-muted-foreground">Optional</p>}
                </div>
                <span className="text-[10px] font-bold text-muted-foreground bg-border/50 px-2 py-1 rounded-lg">Upload</span>
              </div>
            ))}
          </div>
        )}

        {/* ── STEP 6: Payment Summary ── */}
        {step === 'payment' && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">Payment Summary</h2>
              <p className="text-sm text-muted-foreground">Full cost breakdown for this booking</p>
            </div>

            {/* Unit context pill */}
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                <Building2 className="w-3 h-3 text-primary" />
                <span className="text-xs font-semibold text-primary">{form.unitNumber || 'A-1402'}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
                <User className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">{form.firstName || 'Vikram'} {form.lastName || 'Malhotra'}</span>
              </div>
            </div>

            {/* Breakdown card */}
            <Card className="rounded-card border-none shadow-xs bg-card overflow-hidden">
              {[
                { label: 'Base / Booking Price', amount: basePrice || 42000000, type: 'debit' },
                { label: `GST @ ${form.gstPercent || '1.2'}%`, amount: gstAmt || 504000, type: 'debit', sub: 'Goods & Services Tax' },
                { label: 'PLC — Preferential Location', amount: plcAmt || 350000, type: 'debit', sub: 'Floor / view premium' },
                { label: 'Maintenance Deposit', amount: maintAmt || 120000, type: 'debit' },
                { label: 'Parking Charges', amount: parkAmt || 500000, type: 'debit' },
              ].map((item, i) => (
                <div key={item.label} className={`flex items-start justify-between px-4 py-3 ${i > 0 ? 'border-t border-border/40' : ''}`}>
                  <div>
                    <p className="text-sm text-foreground font-medium">{item.label}</p>
                    {item.sub && <p className="text-xs text-muted-foreground">{item.sub}</p>}
                  </div>
                  <p className="text-sm font-bold text-foreground shrink-0 ml-3">
                    {fmtCr(item.amount)}
                  </p>
                </div>
              ))}

              {/* Subtotal */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/40">
                <p className="text-sm font-bold text-foreground">Total Cost</p>
                <p className="text-sm font-bold text-foreground">{fmtCr(totalCost || 43474000)}</p>
              </div>

              {/* Token deduction */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
                <p className="text-sm text-primary font-medium">Token Amount (Paid)</p>
                <p className="text-sm font-bold text-primary">− {fmtCr(tokenAmt || 500000)}</p>
              </div>

              {/* Net Payable Hero */}
              <div className="p-4 bg-primary/5 border-t-2 border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Net Payable</p>
                    <p className="text-[10px] text-muted-foreground">Balance due to builder</p>
                  </div>
                  <p className="text-2xl font-bold text-primary font-headings">{fmtCr(netPayable || 42974000)}</p>
                </div>
              </div>
            </Card>

            <div className="p-3 bg-secondary/40 rounded-2xl border border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">Payment Mode:</span> {form.paymentMode || 'NEFT / RTGS'} · Ref: {form.paymentReference || 'UTR-8842-1X'}
              </p>
            </div>
          </div>
        )}

        {/* ── STEP 7: Review ── */}
        {step === 'review' && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">Final Review</h2>
              <p className="text-sm text-muted-foreground">Verify all details before submitting the booking</p>
            </div>

            {/* Review sections */}
            {[
              {
                title: 'Unit & Token',
                rows: [
                  { label: 'Unit', value: form.unitNumber || 'A-1402' },
                  { label: 'Project', value: form.projectName || 'Skyline Residences' },
                  { label: 'Token Paid', value: `₹${tokenAmt > 0 ? tokenAmt.toLocaleString('en-IN') : '5,00,000'}` },
                  { label: 'Payment Mode', value: form.paymentMode || 'NEFT / RTGS' },
                ],
              },
              {
                title: 'Buyer',
                rows: [
                  { label: 'Name', value: `${form.firstName || 'Vikram'} ${form.lastName || 'Malhotra'}` },
                  { label: 'Email', value: form.email || 'vikram.m@wealthcorp.in' },
                  { label: 'Phone', value: form.phone || '+91 98200 11223' },
                  { label: 'PAN', value: form.pan || 'ABCDE1234F' },
                  { label: 'Co-Applicant', value: form.hasCoApplicant ? `${form.coApplicant.firstName} ${form.coApplicant.lastName}` : 'None' },
                ],
              },
              {
                title: 'Financials',
                rows: [
                  { label: 'Booking Amount', value: fmtCr(basePrice || 42000000) },
                  { label: 'GST', value: fmtCr(gstAmt || 504000) },
                  { label: 'Net Payable', value: fmtCr(netPayable || 42974000) },
                ],
              },
            ].map((section) => (
              <Card key={section.title} className="rounded-card border-none shadow-xs bg-card overflow-hidden">
                <div className="px-4 py-2.5 bg-secondary/60 border-b border-border/40">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{section.title}</p>
                </div>
                <div className="divide-y divide-border/40">
                  {section.rows.map((row) => (
                    <div key={row.label} className="flex justify-between items-center px-4 py-2.5">
                      <span className="text-sm text-muted-foreground">{row.label}</span>
                      <span className="text-sm font-bold text-foreground text-right max-w-[160px] truncate">{row.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            <div className="p-4 bg-warning/8 border border-warning/25 rounded-2xl flex gap-3">
              <span className="text-base">⚠️</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Submitting this booking will <strong>lock the unit</strong> and create a formal booking record. The builder will review and approve within 2–3 business days.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ── CTA Footer ── */}
      <div className="shrink-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-md border-t border-border/50">
        <Button
          className="w-full h-14 rounded-button text-base font-bold shadow-lg disabled:opacity-50"
          onClick={() => {
            if (step === 'eoi') goNext('kyc');
            else if (step === 'kyc') goNext('buyer');
            else if (step === 'buyer') goNext('coapplicant');
            else if (step === 'coapplicant') goNext('details');
            else if (step === 'details') goNext('documents');
            else if (step === 'documents') goNext('payment');
            else if (step === 'payment') goNext('review');
            else if (step === 'review') handleSubmit();
          }}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </span>
          ) : step === 'eoi' ? 'Next: Buyer KYC →'
          : step === 'kyc' ? 'Next: Buyer Details →'
          : step === 'buyer' ? 'Next: Co-Applicant →'
          : step === 'coapplicant' ? 'Next: Booking Details →'
          : step === 'details' ? 'Next: Documents →'
          : step === 'documents' ? 'Next: Payment Summary →'
          : step === 'payment' ? 'Next: Review & Confirm →'
          : '✅ Submit Booking'}
        </Button>
      </div>
    </div>
  );
}
