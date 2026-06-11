import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Square, Compass, Clock, Wallet, Info, History, Share2, Scale, UserPlus, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { mockUnits, mockProjects } from '../constants/mockData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HistoryTimelineSheet } from '../components/HistoryTimelineSheet';
import { HoldUnitSheet } from '../components/HoldUnitSheet';
import { toast } from 'sonner';

export default function UnitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [holdOpen, setHoldOpen] = useState(false);
  const unit = mockUnits.find(u => u.id === id) || mockUnits[0];
  const project = mockProjects.find(p => p.id === unit.projectId) || mockProjects[0];

  const totalPrice = unit.basePrice + unit.plc + unit.maintenance + unit.clubCharges + unit.parking;
  const commission = (totalPrice * unit.commissionPercent) / 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-status-available text-white border-none';
      case 'Held': return 'bg-status-held text-white border-none';
      case 'Reserved': return 'bg-status-reserved text-white border-none';
      case 'Blocked': return 'bg-status-blocked text-white border-none';
      case 'Sold': return 'bg-status-sold text-white border-none';
      default: return 'bg-secondary text-foreground border-none';
    }
  };

  const shareUnitInfo = () => {
    toast.success('Share link copied to clipboard! Ready to send to customer.');
  };

  return (
    <div className="h-full bg-background flex flex-col relative overflow-hidden">
      
      {/* Sticky Header */}
      <div className="bg-background border-b border-border/50 p-4 shrink-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="icon" className="rounded-full shadow-xs bg-card shrink-0" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-extrabold text-foreground">Unit {unit.number}</h1>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase">{project.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" className="rounded-full shadow-xs bg-card" onClick={() => setHistoryOpen(true)}>
              <History className="w-5 h-5 text-primary" />
            </Button>
            <Badge className={`${getStatusColor(unit.status)} text-[10px] font-extrabold px-2.5 py-0.5`}>
              {unit.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto pb-36 p-4 space-y-6">
        {/* Main Spec Panels */}
        <div className="grid grid-cols-3 gap-2.5">
          <Card className="border-none shadow-xs rounded-card p-3.5 flex flex-col items-center justify-center text-center bg-card">
            <MapPin className="w-5 h-5 text-primary mb-1 shrink-0" />
            <span className="text-[9px] text-muted-foreground font-bold uppercase">Tower / Floor</span>
            <span className="text-xs font-bold text-foreground mt-0.5">T1 / {unit.floor}</span>
          </Card>
          <Card className="border-none shadow-xs rounded-card p-3.5 flex flex-col items-center justify-center text-center bg-card">
            <Square className="w-5 h-5 text-accent-blue mb-1 shrink-0" />
            <span className="text-[9px] text-muted-foreground font-bold uppercase">Carpet Area</span>
            <span className="text-xs font-bold text-foreground mt-0.5">{unit.area} sqft</span>
          </Card>
          <Card className="border-none shadow-xs rounded-card p-3.5 flex flex-col items-center justify-center text-center bg-card">
            <Compass className="w-5 h-5 text-warning mb-1 shrink-0" />
            <span className="text-[9px] text-muted-foreground font-bold uppercase">Unit Facing</span>
            <span className="text-xs font-bold text-foreground mt-0.5">{unit.facing}</span>
          </Card>
        </div>

        {/* Pricing Summary */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Financial Metrics</h3>
          <Card className="bg-gradient-to-br from-primary-soft/50 to-white dark:from-primary-soft/20 dark:to-background border-none shadow-sm rounded-card p-5 mb-3">
            <p className="text-[10px] text-muted-foreground font-bold uppercase">Total Estimated Outflow</p>
            <h3 className="text-2xl font-extrabold text-foreground mb-4">{formatCurrency(totalPrice)}</h3>
            
            <Accordion type="single" collapsible className="w-full bg-card/60 rounded-card p-2 border border-border/40">
              <AccordionItem value="breakdown" className="border-none">
                <AccordionTrigger className="hover:no-underline py-2 px-2 text-xs font-bold text-foreground">
                  View Cost Parameters
                </AccordionTrigger>
                <AccordionContent className="px-2 pt-2.5 pb-0">
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Flat Cost</span>
                      <span className="font-semibold">{formatCurrency(unit.basePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location Preferential (PLC)</span>
                      <span className="font-semibold">{formatCurrency(unit.plc)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">1-Year Maintenance Advance</span>
                      <span className="font-semibold">{formatCurrency(unit.maintenance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Clubhouse Registration</span>
                      <span className="font-semibold">{formatCurrency(unit.clubCharges)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Covered Parking Reservation</span>
                      <span className="font-semibold">{formatCurrency(unit.parking)}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          {/* Broker Compensation */}
          <Card className="border-none shadow-xs rounded-card p-4 flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Estimated Commission ({unit.commissionPercent}%)</p>
                <p className="text-base font-extrabold text-foreground mt-0.5">{formatCurrency(commission)}</p>
              </div>
            </div>
            <Info className="w-4 h-4 text-muted-foreground shrink-0" />
          </Card>
        </div>

        {/* Listing Log */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Inventory Log</h3>
          <Card className="border-none shadow-xs rounded-card p-4 flex items-center gap-3 bg-card">
            <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs font-bold text-foreground">Listed as Available</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Oct 24, 2025 • System Import</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Thumb-friendly Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 p-4 bg-background/80 backdrop-blur-xl border-t border-border/50 flex flex-col gap-2.5">
        
        {/* Compare / Share / Add Client Grid */}
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            className="flex-1 h-11 rounded-button font-bold text-[11px] gap-1 shadow-xs border-border bg-card"
            onClick={() => navigate('/inventory/compare-units')}
          >
            <Scale className="w-3.5 h-3.5 text-slate-500" /> Compare
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 h-11 rounded-button font-bold text-[11px] gap-1 shadow-xs border-border bg-card"
            onClick={shareUnitInfo}
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" /> Share Unit
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 h-11 rounded-button font-bold text-[11px] gap-1 shadow-xs border-border bg-card"
            onClick={() => navigate('/crm')}
          >
            <UserPlus className="w-3.5 h-3.5 text-slate-500" /> Add Client
          </Button>
        </div>

        {/* Main conversion CTA (Hold Unit) */}
        <Button 
          className="w-full h-14 rounded-button shadow-md font-bold bg-primary text-white hover:bg-primary/95 text-base flex items-center justify-center gap-2"
          onClick={() => setHoldOpen(true)}
        >
          <Lock className="w-5 h-5" /> Hold / Reserve Unit
        </Button>

      </div>

      <HistoryTimelineSheet open={historyOpen} onOpenChange={setHistoryOpen} unit={unit} />
      <HoldUnitSheet open={holdOpen} onOpenChange={setHoldOpen} unitNumber={unit.number} />
    </div>
  );
}
