import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Building2, User, Clock, Search, Star, Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { mockAvailableUnits, mockClients } from '../constants/mockData';
import type { CreateHoldFormData, HoldDuration, HoldPriority } from '../types';

type WizardStep = 'unit' | 'client' | 'config' | 'review';

const STEPS: { key: WizardStep; label: string; num: number }[] = [
  { key: 'unit', label: 'Unit', num: 1 },
  { key: 'client', label: 'Client', num: 2 },
  { key: 'config', label: 'Config', num: 3 },
  { key: 'review', label: 'Review', num: 4 },
];

const initialFormData: CreateHoldFormData = {
  unitId: '', unitNumber: '', projectId: '', projectName: '',
  clientId: '', clientName: '',
  holdDuration: 24, priority: 'Standard',
  remarks: '', tokenPaid: false, tokenAmount: '',
};

export default function HoldWizardPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<WizardStep>('unit');
  const [form, setForm] = useState<CreateHoldFormData>(initialFormData);
  const [unitSearch, setUnitSearch] = useState('');
  const [clientSearch, setClientSearch] = useState('');

  const currentStepIndex = STEPS.findIndex(s => s.key === step);

  const filteredUnits = mockAvailableUnits.filter(u =>
    u.number.toLowerCase().includes(unitSearch.toLowerCase()) ||
    u.project.toLowerCase().includes(unitSearch.toLowerCase())
  );
  const filteredClients = mockClients.filter(c =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.phone.includes(clientSearch)
  );

  const goNext = () => {
    const idx = STEPS.findIndex(s => s.key === step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].key);
    else navigate('/holds/success', { state: { hold: form } });
  };

  const goBack = () => {
    const idx = STEPS.findIndex(s => s.key === step);
    if (idx === 0) navigate('/holds');
    else setStep(STEPS[idx - 1].key);
  };

  const canProceed = () => {
    if (step === 'unit') return !!form.unitId;
    if (step === 'client') return !!form.clientId;
    return true;
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2 w-10 h-10" onClick={goBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="font-bold text-sm text-foreground leading-none font-headings">Create Hold</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Step {currentStepIndex + 1} of {STEPS.length}</p>
        </div>
        <div className="w-10" />
      </div>

      {/* Progress Bar */}
      <div className="px-4 pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2 flex-1">
              <button
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < currentStepIndex ? 'bg-primary text-white' :
                  i === currentStepIndex ? 'bg-primary text-white ring-4 ring-primary/20' :
                  'bg-secondary text-muted-foreground'
                }`}
                onClick={() => i < currentStepIndex && setStep(s.key)}
              >
                {i < currentStepIndex ? '✓' : s.num}
              </button>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 rounded-full overflow-hidden bg-secondary">
                  <div className={`h-full bg-primary transition-all duration-500 ${i < currentStepIndex ? 'w-full' : 'w-0'}`} />
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground font-medium">{STEPS[currentStepIndex].label}</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">

        {/* ── STEP 1: Unit Selection ── */}
        {step === 'unit' && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">Select Unit</h2>
              <p className="text-sm text-muted-foreground">Choose an available unit to hold</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={unitSearch}
                onChange={e => setUnitSearch(e.target.value)}
                placeholder="Search unit or project..."
                className="pl-10 h-12 rounded-input bg-secondary/30 border-border/50 text-sm"
              />
            </div>
            <div className="space-y-3">
              {filteredUnits.map(unit => (
                <Card
                  key={unit.id}
                  className={`p-4 rounded-card border-2 cursor-pointer transition-all active:scale-[0.99] ${
                    form.unitId === unit.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border/50 bg-card shadow-xs hover:shadow-md'
                  }`}
                  onClick={() => setForm(f => ({
                    ...f, unitId: unit.id, unitNumber: unit.number,
                    projectId: unit.projectId, projectName: unit.project
                  }))}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground">{unit.number}</h3>
                        <span className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded font-medium">{unit.config}</span>
                        <span className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded font-medium">Fl {unit.floor}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        {unit.project}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{unit.tower} · {unit.area}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground text-sm">{unit.price}</p>
                      {form.unitId === unit.id && (
                        <div className="mt-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center ml-auto">
                          <span className="text-white text-[10px] font-bold">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: Client Selection ── */}
        {step === 'client' && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">Select Client</h2>
              <p className="text-sm text-muted-foreground">Which client is holding this unit?</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/20">
              <Building2 className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-xs font-bold text-primary">{form.unitNumber}</p>
                <p className="text-[11px] text-muted-foreground">{form.projectName}</p>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={clientSearch}
                onChange={e => setClientSearch(e.target.value)}
                placeholder="Search client name or phone..."
                className="pl-10 h-12 rounded-input bg-secondary/30 border-border/50 text-sm"
              />
            </div>
            <div className="space-y-3">
              {filteredClients.map(client => (
                <Card
                  key={client.id}
                  className={`p-4 rounded-card border-2 cursor-pointer transition-all active:scale-[0.99] ${
                    form.clientId === client.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border/50 bg-card shadow-xs hover:shadow-md'
                  }`}
                  onClick={() => setForm(f => ({ ...f, clientId: client.id, clientName: client.name }))}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0 font-bold text-sm text-foreground">
                      {client.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-foreground">{client.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Phone className="w-3 h-3" />
                        {client.phone}
                      </div>
                      <p className="text-[11px] text-muted-foreground">{client.city}</p>
                    </div>
                    {form.clientId === client.id && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">✓</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 3: Hold Configuration ── */}
        {step === 'config' && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">Hold Configuration</h2>
              <p className="text-sm text-muted-foreground">Set duration, priority, and notes</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full">
                <Building2 className="w-3 h-3 text-primary" />
                <span className="text-xs font-semibold text-primary">{form.unitNumber}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full">
                <User className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">{form.clientName}</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                <Clock className="w-3 h-3 inline mr-1.5" />Hold Duration
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {([24, 48, 72] as HoldDuration[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setForm(f => ({ ...f, holdDuration: d }))}
                    className={`py-4 rounded-xl border-2 flex flex-col items-center transition-all ${
                      form.holdDuration === d
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 bg-card hover:border-primary/40'
                    }`}
                  >
                    <span className={`text-2xl font-bold font-headings ${form.holdDuration === d ? 'text-primary' : 'text-foreground'}`}>{d}</span>
                    <span className="text-[11px] text-muted-foreground font-medium">hours</span>
                    {d === 48 && <span className="text-[9px] font-bold text-primary mt-1 bg-primary/10 px-1.5 rounded">DEFAULT</span>}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                <Star className="w-3 h-3 inline mr-1.5" />Priority Level
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['Standard', 'High', 'VIP'] as HoldPriority[]).map(p => {
                  const colors: Record<HoldPriority, string> = {
                    Standard: 'border-primary bg-primary/10 text-primary',
                    High: 'border-warning bg-warning/10 text-warning',
                    VIP: 'border-purple-500 bg-purple-50 text-purple-700',
                  };
                  const inactive = 'border-border/50 bg-card text-muted-foreground hover:border-primary/40';
                  return (
                    <button
                      key={p}
                      onClick={() => setForm(f => ({ ...f, priority: p }))}
                      className={`py-3.5 rounded-xl border-2 text-sm font-bold transition-all ${form.priority === p ? colors[p] : inactive}`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-4 bg-secondary/40 rounded-2xl border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-foreground">Token Payment Received?</p>
                <button
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${form.tokenPaid ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                  onClick={() => setForm(f => ({ ...f, tokenPaid: !f.tokenPaid, tokenAmount: '' }))}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${form.tokenPaid ? 'translate-x-6' : ''}`} />
                </button>
              </div>
              {form.tokenPaid && (
                <div className="animate-in slide-in-from-top-2 duration-200">
                  <Input
                    type="number"
                    placeholder="Token amount (₹)"
                    value={form.tokenAmount}
                    onChange={e => setForm(f => ({ ...f, tokenAmount: e.target.value }))}
                    className="h-12 rounded-input bg-background border-border/50"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Remarks / Notes</label>
              <Textarea
                placeholder="Add any notes about this hold..."
                value={form.remarks}
                onChange={e => setForm(f => ({ ...f, remarks: e.target.value }))}
                className="rounded-xl bg-secondary/30 border-border/50 text-sm resize-none min-h-[80px]"
              />
            </div>
          </div>
        )}

        {/* ── STEP 4: Review ── */}
        {step === 'review' && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-foreground font-headings mb-1">Review & Confirm</h2>
              <p className="text-sm text-muted-foreground">Verify all details before locking this unit</p>
            </div>
            <Card className="rounded-card border border-border/50 shadow-xs overflow-hidden bg-card">
              <div className="bg-primary/5 p-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground font-headings">{form.unitNumber}</h3>
                    <p className="text-sm text-muted-foreground">{form.projectName}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: 'Client', value: form.clientName },
                  { label: 'Hold Duration', value: `${form.holdDuration} Hours` },
                  { label: 'Priority', value: form.priority },
                  { label: 'Token Paid', value: form.tokenPaid ? `Yes (${form.tokenAmount ? '₹' + form.tokenAmount : 'Amount TBD'})` : 'No' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
                {form.remarks && (
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Remarks</p>
                    <p className="text-sm text-foreground">{form.remarks}</p>
                  </div>
                )}
              </div>
            </Card>
            <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-2xl border border-warning/20">
              <span className="text-lg">⚠️</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Locking this unit will <strong>block it across all brokers</strong> for {form.holdDuration} hours. This cannot be undone without a Release.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CTA — shrink-0 keeps it inside the phone frame */}
      <div className="shrink-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-md border-t border-border/50">
        <Button
          className="w-full h-14 rounded-button text-base font-bold shadow-lg disabled:opacity-50"
          onClick={goNext}
          disabled={!canProceed()}
        >
          {step === 'unit' && 'Select Unit & Continue'}
          {step === 'client' && 'Select Client & Continue'}
          {step === 'config' && 'Review Hold Details'}
          {step === 'review' && '🔒 Lock Unit Now'}
        </Button>
      </div>
    </div>
  );
}
