import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockHolds, mockHoldHistory } from '../constants/mockData';
import { ArrowLeft, Clock, History, AlertCircle, Building2, User, Unlock, CalendarClock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HoldDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const hold = mockHolds.find(h => h.id === id) || mockHolds[0];
  const history = mockHoldHistory[hold.id] || [];

  const [timeLeft, setTimeLeft] = useState('14:22:10');
  
  // Fake countdown for effect
  useEffect(() => {
    const timer = setInterval(() => {
      const [h, m, s] = timeLeft.split(':').map(Number);
      let totalSeconds = h * 3600 + m * 60 + s - 1;
      if (totalSeconds < 0) totalSeconds = 0;
      
      const newH = Math.floor(totalSeconds / 3600);
      const newM = Math.floor((totalSeconds % 3600) / 60);
      const newS = totalSeconds % 60;
      
      setTimeLeft(
        `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}:${newS.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-background pb-32 flex flex-col pt-safe">
      <div className="p-4 flex items-center justify-between z-10 sticky top-0 bg-background/90 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Active Hold</Badge>
        <div className="w-9" />
      </div>

      <div className="p-6 animate-slide-up-fade space-y-6">
        
        {/* The Timer Dial */}
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative w-48 h-48 flex items-center justify-center">
             {/* Background Circle */}
             <svg className="absolute inset-0 w-full h-full transform -rotate-90">
               <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-secondary" />
               <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="553" strokeDashoffset="200" className="text-warning transition-all duration-1000" />
             </svg>
             <div className="text-center z-10 flex flex-col items-center">
               <Clock className="w-6 h-6 text-warning mb-2" />
               <h2 className="text-3xl font-bold font-mono tracking-tighter text-foreground">{timeLeft}</h2>
               <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">Remaining</p>
             </div>
          </div>
        </div>

        {/* Hold Details Context */}
        <Card className="p-4 rounded-card border border-border/50 shadow-xs space-y-4 bg-card">
           <div className="flex justify-between items-start pb-4 border-b border-border/50">
             <div>
               <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Building2 className="w-3 h-3" /> {hold.projectName}</p>
               <h3 className="font-bold text-xl">{hold.unitNumber}</h3>
             </div>
             <div className="text-right">
               <p className="text-xs text-muted-foreground flex items-center justify-end gap-1 mb-1"><User className="w-3 h-3" /> Client</p>
               <h3 className="font-bold text-sm">{hold.leadName}</h3>
             </div>
           </div>

           <div className="flex justify-between items-center text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Token Status</span>
                {hold.tokenPaid ? (
                  <span className="font-bold text-success flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Paid ({hold.tokenAmount})</span>
                ) : (
                  <span className="font-bold text-warning flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Pending</span>
                )}
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-muted-foreground">Extensions</span>
                <span className="font-bold">{hold.extensionsUsed} Used</span>
              </div>
           </div>
        </Card>

        {/* Hold History */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <History className="w-4 h-4" /> Hold History
          </h3>
          <div className="relative pl-4 space-y-6 before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-border/50">
            {history.map((event, i) => (
              <div key={i} className="relative flex items-start gap-4 z-10">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 border-2 border-background bg-primary mt-1" />
                <div className="w-full">
                  <p className="text-sm font-bold text-foreground">{event.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.performedBy} • {new Date(event.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Persistent Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border/50 pb-safe z-30">
        <div className="flex gap-2 mb-2">
          <Button variant="outline" className="flex-1 h-12 rounded-button border-destructive/30 text-destructive hover:bg-destructive/10 font-semibold gap-2">
            <Unlock className="w-4 h-4" /> Release
          </Button>
          <Button variant="outline" className="flex-1 h-12 rounded-button bg-secondary/50 font-semibold gap-2" disabled={hold.extensionsUsed > 0}>
            <CalendarClock className="w-4 h-4" /> Extend
          </Button>
        </div>
        <Button className="w-full h-12 rounded-button font-bold text-lg shadow-lg">
          Convert to Booking
        </Button>
      </div>

    </div>
  );
}
