import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface HoldCountdownTimerProps {
  expiryDate: string;
  size?: 'compact' | 'full';
}

function getTimeLeft(expiryDate: string) {
  const diff = new Date(expiryDate).getTime() - Date.now();
  if (diff <= 0) return { h: 0, m: 0, s: 0, totalSeconds: 0, expired: true };
  const totalSeconds = Math.floor(diff / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return { h, m, s, totalSeconds, expired: false };
}

export function HoldCountdownTimer({ expiryDate, size = 'compact' }: HoldCountdownTimerProps) {
  const [timeData, setTimeData] = useState(() => getTimeLeft(expiryDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeData(getTimeLeft(expiryDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const isUrgent = timeData.totalSeconds < 3 * 3600; // less than 3 hours

  if (size === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg ${timeData.expired ? 'bg-destructive/10 text-destructive' : isUrgent ? 'bg-warning/15 text-warning' : 'bg-primary/10 text-primary'}`}>
        <Clock className="w-3.5 h-3.5" />
        {timeData.expired ? 'Expired' : `${pad(timeData.h)}:${pad(timeData.m)}:${pad(timeData.s)}`}
      </div>
    );
  }

  // Full circular timer
  const totalDuration = 48 * 3600; // Assume 48h for display purposes
  const progress = timeData.expired ? 0 : Math.max(0, timeData.totalSeconds / totalDuration);
  const circumference = 2 * Math.PI * 88;
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 192 192">
          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-secondary" />
          <circle
            cx="96" cy="96" r="88"
            stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ${timeData.expired ? 'text-destructive' : isUrgent ? 'text-warning' : 'text-primary'}`}
          />
        </svg>
        <div className="text-center z-10 flex flex-col items-center">
          <Clock className={`w-5 h-5 mb-2 ${timeData.expired ? 'text-destructive' : isUrgent ? 'text-warning' : 'text-primary'}`} />
          <h2 className="text-2xl font-bold font-mono tracking-tighter text-foreground">
            {timeData.expired ? 'Expired' : `${pad(timeData.h)}:${pad(timeData.m)}:${pad(timeData.s)}`}
          </h2>
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">Remaining</p>
        </div>
      </div>
      {isUrgent && !timeData.expired && (
        <p className="text-xs font-semibold text-warning mt-3 animate-pulse">⚠ Expiring Soon — Take Action!</p>
      )}
    </div>
  );
}
