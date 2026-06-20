import { useEffect, useRef, useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isBefore,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/cn';
import { registerOpen, unregisterOpen } from '@/hooks/useOpenManager';

export function CustomDatePicker({ label, value, onChange, error, min }) {
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);

  const selectedDate = value ? new Date(value) : null;
  const minDate = min ? new Date(min) : null;
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  function closeCalendar() {
    setOpen(false);
    unregisterOpen(closeCalendar);
  }

  function handleToggle() {
    if (!open) {
      registerOpen(closeCalendar); // closes any other open select/datepicker
      setOpen(true);
    } else {
      closeCalendar();
    }
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeCalendar();
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside, true);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside, true);
  }, [open]);

  function selectDate(date) {
    if (minDate && isBefore(date, minDate)) return;
    onChange(format(date, 'yyyy-MM-dd'));
    closeCalendar();
  }

  return (
    <div ref={containerRef} className="relative space-y-1">
      {label && (
        <label className="text-xs font-semibold text-ink-muted uppercase">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className="w-full min-h-[48px] px-4 rounded-xl border border-surface-border bg-white text-left text-sm text-ink flex items-center justify-between"
      >
        <span className={cn(!selectedDate && 'text-ink-faint')}>
          {selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Select date'}
        </span>
        <Calendar className="w-4 h-4 text-ink-muted" />
      </button>

      {open && (
        <div className="absolute left-0 top-full  mt-2 w-[280px] max-w-[calc(100vw-3rem)] rounded-2xl border border-surface-border bg-white p-3 shadow-xl">
          <div className="flex items-center justify-between mb-3 ">
            <button
              type="button"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <p className="text-sm font-bold text-ink">
              {format(currentMonth, 'MMMM yyyy')}
            </p>

            <button
              type="button"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="text-[11px] font-semibold text-ink-muted py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map(date => {
              const disabled = minDate && isBefore(date, minDate);
              const selected = selectedDate && isSameDay(date, selectedDate);
              const muted    = !isSameMonth(date, currentMonth);

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDate(date)}
                  className={cn(
                    'h-8 w-8 rounded-lg text-xs flex items-center justify-center transition-colors',
                    'hover:bg-surface-muted',
                    muted    && 'text-ink-faint',
                    disabled && 'opacity-30 cursor-not-allowed hover:bg-transparent',
                    selected && 'bg-brand-600 text-white hover:bg-brand-700'
                  )}
                >
                  {format(date, 'd')}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </div>
  );
}