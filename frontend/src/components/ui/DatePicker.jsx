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
import { useDarkMode } from '@/hooks/useDarkMode';

export function CustomDatePicker({ label, value, onChange, error, min }) {
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const isDark = useDarkMode();

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
        className={`w-full min-h-[48px] px-4 rounded-xl border text-left text-sm flex items-center justify-between transition-colors ${
          isDark 
            ? 'border-slate-700 bg-slate-800 text-slate-100' 
            : 'border-surface-border bg-white text-ink'
        }`}
      >
        <span className={cn(!selectedDate && (isDark ? 'text-slate-400' : 'text-ink-faint'))}>
          {selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Select date'}
        </span>
        <Calendar className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-ink-muted'}`} />
      </button>

      {open && (
        <div className={`absolute left-0 top-full mt-2 w-[280px] max-w-[calc(100vw-3rem)] rounded-2xl border shadow-xl p-3 transition-colors ${
          isDark 
            ? 'border-slate-700 bg-slate-800' 
            : 'border-surface-border bg-white'
        }`}>
          <div className="flex items-center justify-between mb-3 ">
            <button
              type="button"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-slate-700 text-slate-100' 
                  : 'hover:bg-slate-100 text-ink'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <p className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-ink'}`}>
              {format(currentMonth, 'MMMM yyyy')}
            </p>

            <button
              type="button"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-slate-700 text-slate-100' 
                  : 'hover:bg-slate-100 text-ink'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className={`text-[11px] font-semibold py-1 ${isDark ? 'text-slate-400' : 'text-ink-muted'}`}>
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
                    'h-8 w-8 rounded-lg text-xs flex items-center justify-center transition-colors text-ink dark:text-slate-100',
                    'hover:bg-slate-100 dark:hover:bg-slate-700',
                    muted    && 'text-ink-faint dark:text-slate-500',
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

      {error && <p className="text-xs text-danger dark:text-red-400 mt-1">{error}</p>}
    </div>
  );
}