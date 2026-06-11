import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Square, Compass, Clock, Wallet, Info, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { mockUnits, mockProjects } from '../constants/mockData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HistoryTimelineSheet } from '../components/HistoryTimelineSheet';

export default function UnitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [historyOpen, setHistoryOpen] = useState(false);
  const unit = mockUnits.find(u => u.id === id) || mockUnits[0];
  const project = mockProjects.find(p => p.id === unit.projectId) || mockProjects[0];

  const totalPrice = unit.basePrice + unit.plc + unit.maintenance + unit.clubCharges + unit.parking;
  const commission = (totalPrice * unit.commissionPercent) / 100;

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="icon" className="rounded-full shadow-xs bg-card shrink-0" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Unit {unit.number}</h1>
              <p className="text-xs text-muted-foreground">{project.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" className="rounded-full shadow-xs bg-card" onClick={() => setHistoryOpen(true)}>
              <History className="w-5 h-5 text-primary" />
            </Button>
            <Badge variant="secondary" className="bg-success/10 text-success border-none text-xs">{unit.status}</Badge>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 animate-slide-up-fade">
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-none shadow-xs rounded-card p-3 flex flex-col items-center justify-center text-center">
            <MapPin className="w-5 h-5 text-primary mb-1" />
            <span className="text-[10px] text-muted-foreground">Tower / Floor</span>
            <span className="text-sm font-bold text-foreground">T1 / {unit.floor}</span>
          </Card>
          <Card className="border-none shadow-xs rounded-card p-3 flex flex-col items-center justify-center text-center">
            <Square className="w-5 h-5 text-accent-blue mb-1" />
            <span className="text-[10px] text-muted-foreground">Area</span>
            <span className="text-sm font-bold text-foreground">{unit.area} sqft</span>
          </Card>
          <Card className="border-none shadow-xs rounded-card p-3 flex flex-col items-center justify-center text-center">
            <Compass className="w-5 h-5 text-warning mb-1" />
            <span className="text-[10px] text-muted-foreground">Facing</span>
            <span className="text-sm font-bold text-foreground">{unit.facing}</span>
          </Card>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Financial Overview</h3>
          <Card className="bg-gradient-to-br from-primary-light to-white dark:from-primary-light dark:to-background border-none shadow-sm rounded-card p-5 mb-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Unit Price</p>
            <h3 className="text-4xl font-bold text-foreground mb-4">${(totalPrice / 1000).toFixed(1)}k</h3>
            
            <Accordion type="single" collapsible className="w-full bg-card/50 rounded-card p-2">
              <AccordionItem value="breakdown" className="border-none">
                <AccordionTrigger className="hover:no-underline py-2 px-2 text-sm font-medium text-foreground">
                  View Price Breakdown
                </AccordionTrigger>
                <AccordionContent className="px-2 pt-2 pb-0">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-muted-foreground">Base Price</span><span className="font-semibold">${unit.basePrice.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">PLC</span><span className="font-semibold">${unit.plc.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Maintenance</span><span className="font-semibold">${unit.maintenance.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Club Charges</span><span className="font-semibold">${unit.clubCharges.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Parking</span><span className="font-semibold">${unit.parking.toLocaleString()}</span></div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Card className="border-none shadow-xs rounded-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-accent-blue" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Estimated Commission ({unit.commissionPercent}%)</p>
                <p className="text-lg font-bold text-foreground">${commission.toLocaleString()}</p>
              </div>
            </div>
            <Info className="w-4 h-4 text-muted-foreground" />
          </Card>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Inventory Timeline</h3>
          <Card className="border-none shadow-xs rounded-card p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Listed as Available</p>
              <p className="text-xs text-muted-foreground">Oct 24, 2025 • System</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/80 backdrop-blur-xl border-t border-border/50 max-w-md mx-auto flex gap-3" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        <Button variant="outline" className="flex-1 h-14 rounded-button font-bold border-2">Add to Waitlist</Button>
        <Button className="flex-1 h-14 rounded-button shadow-lg font-bold">Reserve Unit</Button>
      </div>

      <HistoryTimelineSheet open={historyOpen} onOpenChange={setHistoryOpen} unit={unit} />
    </div>
  );
}
