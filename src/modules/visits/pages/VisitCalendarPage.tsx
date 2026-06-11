import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockVisits } from '../constants/mockData';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, ChevronLeft, ChevronRight, BarChart3, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ScheduleVisitSheet } from '../components/ScheduleVisitSheet';

const dates = [
  { day: 'Mon', date: '01' },
  { day: 'Tue', date: '02' },
  { day: 'Wed', date: '03' },
  { day: 'Thu', date: '04' },
  { day: 'Fri', date: '05', active: true },
  { day: 'Sat', date: '06' },
  { day: 'Sun', date: '07' },
];

export default function VisitCalendarPage() {
  const navigate = useNavigate();
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [view, setView] = useState<'calendar' | 'reports'>('calendar');

  const todayVisits = mockVisits.filter(v => v.date === '2026-06-05');

  return (
    <div className="min-h-screen bg-background pb-24 pt-safe flex flex-col relative">
      <div className="p-4 bg-background z-20 sticky top-0 border-b border-border/50">
        <div className="flex items-center justify-between mb-6 gap-2">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2 shrink-0" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground flex-1">Site Visits</h1>
          <div className="bg-secondary/50 rounded-button p-1 flex">
            <button 
              className={`p-2 rounded-[12px] transition-all ${view === 'calendar' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
              onClick={() => setView('calendar')}
            >
              <CalendarIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded-[12px] transition-all ${view === 'reports' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
              onClick={() => setView('reports')}
            >
              <BarChart3 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {view === 'calendar' && (
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold">June 2026</h2>
            <div className="flex gap-2 text-muted-foreground">
              <ChevronLeft className="w-5 h-5" />
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        )}
      </div>

      {view === 'calendar' ? (
        <div className="animate-slide-up-fade">
          {/* Horizontal Date Strip */}
          <ScrollArea className="w-full whitespace-nowrap bg-background border-b border-border/50 pb-2">
            <div className="flex w-max px-4 gap-3 py-2">
              {dates.map((d, i) => (
                <div key={i} className={`flex flex-col items-center justify-center w-14 h-16 rounded-[16px] cursor-pointer transition-all ${d.active ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}>
                  <span className="text-[10px] font-bold uppercase">{d.day}</span>
                  <span className="text-lg font-bold mt-0.5">{d.date}</span>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>

          {/* Visits List */}
          <div className="p-4 space-y-4 mt-2">
            <h3 className="text-sm font-bold text-muted-foreground">Today's Schedule ({todayVisits.length})</h3>
            
            <div className="relative pl-4 space-y-6 before:absolute before:inset-y-0 before:left-[27px] before:w-px before:bg-border/50">
              {todayVisits.map((visit, i) => (
                <div key={i} className="relative flex items-start gap-4 z-10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-background bg-primary/10 text-primary font-bold text-sm">
                    {visit.time.split(':')[0]}
                  </div>
                  <Card 
                    className="flex-1 p-4 rounded-card border-none shadow-xs hover:shadow-md cursor-pointer bg-card transition-all"
                    onClick={() => navigate(`/visits/${visit.id}/active`)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-foreground">{visit.leadName}</h4>
                      <Badge variant="secondary" className="bg-warning/10 text-warning border-none text-[10px]">{visit.status}</Badge>
                    </div>
                    <div className="space-y-2 mt-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {visit.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 shrink-0" /> <span className="truncate">{visit.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 shrink-0" /> <span className="truncate">For: {visit.projectName}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 animate-slide-up-fade space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground mb-4">Weekly Performance</h3>
          <div className="grid grid-cols-2 gap-3">
             <Card className="p-4 rounded-card border-none shadow-xs bg-primary/10">
               <p className="text-xs text-muted-foreground mb-1">Visits Conducted</p>
               <p className="text-2xl font-bold text-primary">14</p>
             </Card>
             <Card className="p-4 rounded-card border-none shadow-xs bg-success/10">
               <p className="text-xs text-muted-foreground mb-1">Conversions</p>
               <p className="text-2xl font-bold text-success">3</p>
             </Card>
             <Card className="p-4 rounded-card border-none shadow-xs bg-warning/10">
               <p className="text-xs text-muted-foreground mb-1">Rescheduled</p>
               <p className="text-2xl font-bold text-warning">2</p>
             </Card>
             <Card className="p-4 rounded-card border-none shadow-xs bg-destructive/10">
               <p className="text-xs text-muted-foreground mb-1">No Shows</p>
               <p className="text-2xl font-bold text-destructive">1</p>
             </Card>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {view === 'calendar' && (
        <Button 
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-lg z-30"
          onClick={() => setScheduleOpen(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      )}

      <ScheduleVisitSheet open={scheduleOpen} onOpenChange={setScheduleOpen} />
    </div>
  );
}
