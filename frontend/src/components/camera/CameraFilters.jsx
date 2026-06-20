import { COURSES } from '@/data/seedData';
import { cn } from '@/lib/cn';

export function CameraFilters({ notes, filterCourse, setFilterCourse }) {
  if (notes.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      <button
        onClick={() => setFilterCourse('')}
        className={cn(
          'badge whitespace-nowrap flex-shrink-0 min-h-[36px] px-3',
          !filterCourse
            ? 'bg-brand-600 text-white'
            : 'bg-surface border border-surface-border text-ink-muted'
        )}
      >
        All
      </button>

      {COURSES.filter(c => notes.some(n => n.course === c.code)).map(c => (
        <button
          key={c.code}
          onClick={() => setFilterCourse(c.code)}
          className={cn(
            'badge whitespace-nowrap flex-shrink-0 min-h-[36px] px-3',
            filterCourse === c.code
              ? 'bg-brand-600 text-white'
              : 'bg-surface border border-surface-border text-ink-muted'
          )}
        >
          {c.code}
        </button>
      ))}
    </div>
  );
}