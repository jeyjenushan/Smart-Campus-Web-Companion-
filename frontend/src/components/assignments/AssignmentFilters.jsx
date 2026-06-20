import { STATUS_FILTERS } from '@/data/seedData';
import { cn } from '@/lib/cn';

export function AssignmentFilters({ filter, setFilter, stats }) {
  function getCount(value) {
    if (value === 'pending') return stats.pending;
    if (value === 'in-progress') return stats.inProgress;
    if (value === 'completed') return stats.completed;
    if (value === 'overdue') return stats.overdue;

    return '';
  }

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {STATUS_FILTERS.map(item => (
        <button
          key={item.value}
          onClick={() => setFilter(item.value)}
          className={cn(
            'badge whitespace-nowrap flex-shrink-0 min-h-[36px] px-3 transition-all',
            filter === item.value
              ? 'bg-brand-600 text-white'
              : 'bg-surface border border-surface-border text-ink-muted'
          )}
        >
          {item.label}

          {item.value !== 'all' && (
            <span
              className={cn(
                'ml-1 px-1.5 rounded-full text-[10px] font-bold',
                filter === item.value ? 'bg-white/25' : 'bg-surface-muted'
              )}
            >
              {getCount(item.value)}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}