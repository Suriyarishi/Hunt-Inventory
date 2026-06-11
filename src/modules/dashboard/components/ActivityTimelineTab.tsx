import { Lock, UserPlus, PhoneCall, Sparkles, AlertCircle } from 'lucide-react';

export function ActivityTimelineTab() {
  const events = [
    { id: 1, title: 'Hold Placed', details: 'Placed unit lock hold on Orchid Heights Unit 402 for lead Rohit Sen.', time: '10m ago', icon: Lock, iconColor: 'text-warning bg-warning/10' },
    { id: 2, title: 'Call Completed', details: 'Logged telephone callback follow-up with Swati Gupta regarding floor plans.', time: '1h ago', icon: PhoneCall, iconColor: 'text-primary bg-primary/10' },
    { id: 3, title: 'New Lead Enrolled', details: 'Added Kapil Kapoor to CRM pipeline (Budget: ₹1.5 Cr, Sarjapur location).', time: '3h ago', icon: UserPlus, iconColor: 'text-accent-blue bg-accent-blue/10' },
    { id: 4, title: 'KYC Document Selfie Verified', details: 'Stripe Identity verification check cleared successfully.', time: '5h ago', icon: Sparkles, iconColor: 'text-success bg-primary-soft' },
    { id: 5, title: 'Hold Auto-Released', details: 'Unit 102 on Prestige Lavender Fields released back to global inventory.', time: 'Yesterday', icon: AlertCircle, iconColor: 'text-danger bg-danger/10' }
  ];

  return (
    <div className="space-y-6 animate-slide-up-fade">
      
      {/* Activity Timeline */}
      <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border/60">
        
        {events.map((ev) => {
          const Icon = ev.icon;
          return (
            <div key={ev.id} className="relative space-y-1.5">
              
              {/* Timeline marker icon wrapper */}
              <div className={`absolute -left-[27px] top-0 w-6 h-6 rounded-full border border-background flex items-center justify-center shadow-xs shrink-0 ${ev.iconColor}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              
              <div className="pl-2.5">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-extrabold text-xs text-foreground">{ev.title}</h4>
                  <span className="text-[9px] text-muted-foreground whitespace-nowrap">{ev.time}</span>
                </div>
                <p className="text-[10.5px] text-muted-foreground leading-relaxed mt-0.5">
                  {ev.details}
                </p>
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
