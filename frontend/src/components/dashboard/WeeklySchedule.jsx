import { Calendar } from 'lucide-react';
import { cn } from '@/lib/cn';
import { WEEK_MAP } from '@/data/seedData';
import { ScheduleCard } from './ScheduleCard';

export function WeeklySchedule({ selectedDay, setSelectedDay, selectedSchedule }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-ink">Weekly Schedule</h3>
      </div>

      <div className="flex gap-1 mb-3 overflow-x-auto no-scrollbar">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => {
          const isSelected = selectedDay === i;
          const isTodayDay = new Date().getDay() === i;

          return (
            <button
              key={d}
              onClick={() => setSelectedDay(i)}
              className={cn(
                'flex flex-col items-center px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0 min-w-[44px] transition-all',
                isSelected
                  ? 'bg-brand-600 text-white'
                  : 'bg-surface text-ink-muted border border-surface-border'
              )}
            >
              <span>{d}</span>

              {isTodayDay && (
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full mt-0.5',
                    isSelected ? 'bg-white' : 'bg-brand-500'
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {selectedSchedule.length === 0 ? (
        <div className="card p-6 text-center">
          <Calendar className="w-8 h-8 text-ink-faint mx-auto mb-2" />
          <p className="text-sm text-ink-muted">
            No classes on {WEEK_MAP[selectedDay]}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {selectedSchedule.map(item => (
            <ScheduleCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}