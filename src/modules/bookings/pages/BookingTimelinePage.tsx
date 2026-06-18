import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockBookingTimeline, mockBookings } from '../constants/mockData';
import type { BookingTimelineEvent } from '../types';

export default function BookingTimelinePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const booking = mockBookings.find((b) => b.id === id) || mockBookings[0];
  const timeline: BookingTimelineEvent[] = mockBookingTimeline[booking.id] || mockBookingTimeline['B-001'];

  const completedCount = timeline.filter((e) => e.status === 'completed').length;
  const totalCount = timeline.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="flex flex-col h-full bg-background">

      {/* Header */}
      <div className="px-4 pt-4 pb-3 shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h1 className="font-bold text-sm text-foreground font-headings">Booking Timeline</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{booking.bookingNumber}</p>
          </div>
          <div className="w-8" />
        </div>

        {/* Overall progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs font-bold text-primary shrink-0">{completedCount}/{totalCount} Done</span>
        </div>
      </div>

      {/* Scrollable timeline */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-border/60" />

          <div className="space-y-0">
            {timeline.map((event, i) => {
              const isLast = i === timeline.length - 1;
              const isCompleted = event.status === 'completed';
              const isActive = event.status === 'active';

              return (
                <div key={event.id} className="flex gap-4 relative">
                  {/* Node */}
                  <div className="shrink-0 flex flex-col items-center z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
                      isCompleted ? 'bg-primary border-primary shadow-md shadow-primary/20' :
                      isActive ? 'bg-primary/10 border-primary animate-pulse' :
                      'bg-background border-border/50'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : isActive ? (
                        <span className="text-base">{event.icon || '●'}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">{event.icon || '○'}</span>
                      )}
                    </div>
                    {!isLast && (
                      <div className={`w-0.5 h-8 ${isCompleted ? 'bg-primary' : 'bg-border/50'}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-2 ${isLast ? '' : ''}`}>
                    <div className={`p-3.5 rounded-2xl border transition-all ${
                      isCompleted ? 'bg-primary/5 border-primary/20' :
                      isActive ? 'bg-warning/5 border-warning/25 shadow-xs' :
                      'bg-card border-border/40 opacity-60'
                    }`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold leading-tight ${
                            isCompleted ? 'text-foreground' :
                            isActive ? 'text-foreground' :
                            'text-muted-foreground'
                          }`}>{event.step}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{event.description}</p>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-full shrink-0 ${
                          isCompleted ? 'bg-primary/15 text-primary' :
                          isActive ? 'bg-warning/15 text-warning' :
                          'bg-secondary text-muted-foreground'
                        }`}>
                          {isCompleted ? 'Done' : isActive ? 'Active' : 'Pending'}
                        </span>
                      </div>

                      {isCompleted && event.actor && (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-primary/10">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary">
                            {event.actor.charAt(0)}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {event.actor} · {event.timestamp ? new Date(event.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''}
                          </p>
                        </div>
                      )}

                      {isActive && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
                          <p className="text-xs font-semibold text-warning">In progress — action needed</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="shrink-0 px-4 pb-5 pt-3 bg-background/95 backdrop-blur-md border-t border-border/50">
        <Button variant="outline" className="w-full h-11 rounded-button font-semibold" onClick={() => navigate(-1)}>
          Back to Booking
        </Button>
      </div>
    </div>
  );
}
