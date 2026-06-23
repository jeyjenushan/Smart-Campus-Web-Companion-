import {getCourseColor} from "@/lib/dashboard"
import { useDarkMode } from '@/hooks/useDarkMode';

import { cn } from '@/lib/cn';
import { SessionTypeBadge } from "./SessionTypeBadge";

export function ScheduleCard({ item }) {
  const isDark = useDarkMode();
  const now = new Date();
  const [startH, startM] = item.startTime.split(':').map(Number);
  const [endH,   endM]   = item.endTime.split(':').map(Number);
  const startDate = new Date(); startDate.setHours(startH, startM, 0);
  const endDate   = new Date(); endDate.setHours(endH, endM, 0);
  const isLive = now >= startDate && now <= endDate;
  const isPast = now > endDate;

  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-2xl border transition-all',
      isLive ? (isDark ? 'bg-brand-950 border-brand-800 shadow-card' : 'bg-brand-50 border-brand-200 shadow-card') :
      isPast ? 'bg-surface-subtle border-surface-border opacity-60' :
               'bg-surface border-surface-border'
    )}>
      <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-0.5">
        <span className="text-xs font-bold text-ink-muted w-10 text-center">{item.startTime}</span>
        <div className={cn('w-0.5 h-6 rounded-full', isLive ? 'bg-brand-400' : 'bg-surface-border')} />
        <span className="text-xs text-ink-faint w-10 text-center">{item.endTime}</span>
      </div>
      <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: getCourseColor(item.course) }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{item.course}</p>
            <p className="text-xs text-ink-muted truncate">{item.lecturer}</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {isLive && (
              <span className={cn(
                'flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full animate-pulse-soft',
                isDark 
                  ? 'text-brand-300 bg-brand-900' 
                  : 'text-brand-600 bg-brand-100'
              )}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />LIVE
              </span>
            )}
            <SessionTypeBadge type={item.type} />
          </div>
        </div>
        <p className="text-xs text-ink-faint mt-1">{item.room}</p>
      </div>
    </div>
  );
}