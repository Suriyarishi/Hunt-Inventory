import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockVisits, mockChecklist } from '../constants/mockData';
import { ArrowLeft, MapPin, Clock, CheckCircle2, Navigation, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

export default function VisitActivePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const visit = mockVisits.find(v => v.id === id) || mockVisits[0];
  const [checklist, setChecklist] = useState(mockChecklist);
  const [status, setStatus] = useState<'Pending' | 'Checked-In' | 'Feedback'>('Pending');

  const toggleTask = (taskId: string) => {
    setChecklist(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const progress = Math.round((checklist.filter(c => c.isCompleted).length / checklist.length) * 100);

  return (
    <div className="min-h-screen bg-background pb-32 pt-safe flex flex-col">
      <div className="p-4 flex items-center justify-between z-10 sticky top-0 bg-background/90 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-none">{status === 'Pending' ? 'Scheduled' : 'In Progress'}</Badge>
      </div>

      <div className="p-6 animate-slide-up-fade space-y-6">
        {/* Visit Context */}
        <div className="space-y-4">
           <h1 className="text-2xl font-bold">{visit.leadName}</h1>
           <div className="flex gap-2">
             <Button variant="secondary" className="flex-1 rounded-button bg-secondary/50 shadow-xs h-10 gap-2">
               <Phone className="w-4 h-4" /> Call Client
             </Button>
             <Button variant="secondary" className="flex-1 rounded-button bg-secondary/50 shadow-xs h-10 gap-2">
               <Navigation className="w-4 h-4" /> Navigate
             </Button>
           </div>
           <Card className="p-4 rounded-card border-none shadow-xs bg-card">
              <div className="flex items-start gap-3 mb-3">
                 <Clock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                 <div>
                   <p className="text-sm font-bold text-foreground">Today, {visit.time}</p>
                   <p className="text-xs text-muted-foreground">{visit.projectName}</p>
                 </div>
              </div>
              <div className="flex items-start gap-3 pt-3 border-t border-border/50">
                 <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                 <p className="text-sm text-foreground">{visit.location}</p>
              </div>
           </Card>
        </div>

        {status === 'Pending' && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 border-2 border-dashed border-border/50 rounded-card">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
               <MapPin className="w-8 h-8 text-primary animate-bounce" />
             </div>
             <div className="text-center">
               <h3 className="font-bold text-lg mb-1">Arrived at Site?</h3>
               <p className="text-xs text-muted-foreground">Check-in via GPS to start the visit protocol.</p>
             </div>
             <Button className="w-48 h-12 rounded-button font-bold text-md shadow-lg" onClick={() => setStatus('Checked-In')}>
               GPS Check-In
             </Button>
          </div>
        )}

        {status === 'Checked-In' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
             <div className="flex justify-between items-center">
               <h3 className="font-bold text-lg">Execution Checklist</h3>
               <span className="text-sm font-bold text-primary">{progress}%</span>
             </div>
             
             <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
             </div>

             <div className="space-y-3 pt-4">
               {checklist.map(task => (
                 <Card 
                   key={task.id} 
                   className={`p-4 rounded-card border-none shadow-xs flex items-center justify-between cursor-pointer transition-colors ${task.isCompleted ? 'bg-primary/5 border-primary/20' : 'bg-card hover:bg-secondary/50'}`}
                   onClick={() => toggleTask(task.id)}
                 >
                    <span className={`text-sm font-medium ${task.isCompleted ? 'text-primary line-through opacity-70' : 'text-foreground'}`}>{task.task}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${task.isCompleted ? 'border-primary bg-primary' : 'border-muted-foreground/30'}`}>
                      {task.isCompleted && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                    </div>
                 </Card>
               ))}
             </div>

             {progress === 100 && (
               <Button className="w-full h-14 rounded-button text-lg font-bold shadow-lg mt-8 animate-in zoom-in" onClick={() => setStatus('Feedback')}>
                 Complete Visit & Add Feedback
               </Button>
             )}
          </div>
        )}

        {status === 'Feedback' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
             <div className="flex items-center gap-3 text-success">
               <CheckCircle2 className="w-6 h-6" />
               <h3 className="font-bold text-lg">Visit Protocol Complete</h3>
             </div>
             
             <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Client Sentiment</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="rounded-button h-12 bg-success/10 border-success/30 hover:bg-success/20 text-success font-bold">Positive</Button>
                    <Button variant="outline" className="rounded-button h-12">Neutral</Button>
                    <Button variant="outline" className="rounded-button h-12">Negative</Button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Post-Visit Notes</label>
                  <Textarea 
                    placeholder="Enter objections, budget changes, or specific requests..." 
                    className="min-h-[120px] rounded-input resize-none bg-secondary/30 border-border/50"
                  />
                </div>
             </div>

             <Button className="w-full h-14 rounded-button text-lg font-bold shadow-lg mt-4" onClick={() => navigate('/visits')}>
               Submit & Close Visit
             </Button>
          </div>
        )}

      </div>
    </div>
  );
}
