import { Badge } from '@/components/ui';
import { COURSES, GRADE_POINTS } from '@/data/seedData';
import { CheckCircle2, Circle } from 'lucide-react';

export function CourseRow({ course, completed, onToggleComplete }) {
  const color = completed
    ? '#22c55e'
    : COURSES.find(c => c.code === course.code)?.color ?? '#94a3b8';

  const gradePoint = GRADE_POINTS[course.grade] ?? 0;

  return (
    <div className={`flex items-center gap-3 py-3 px-3 rounded-lg mb-2 border transition-all ${
      completed 
        ? 'bg-success/5 border-success/20' 
        : 'border-surface-border hover:border-brand-200 dark:hover:border-brand-800'
    }`}>
      {onToggleComplete && !completed && (
        <button
          type="button"
          onClick={() => onToggleComplete(course.code)}
          className="flex-shrink-0 text-ink-muted hover:text-brand-600 transition-colors"
          title="Mark as completed"
        >
          <Circle className="w-5 h-5" />
        </button>
      )}

      {onToggleComplete && completed && (
        <div
          className="flex-shrink-0 text-success opacity-60 cursor-not-allowed"
          title="Course locked - completed courses cannot be reverted"
        >
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}

      {!onToggleComplete && (
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: color }}
        />
      )}

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate transition-all ${
          !completed 
            ? 'line-through text-ink-muted opacity-70' 
            : 'text-ink'
        }`}>
          {course.name}
        </p>
        <p className={`text-xs transition-all ${
          !completed
            ? 'line-through text-ink-faint opacity-60'
            : 'text-ink-muted'
        }`}>
          {course.code} · {course.credits} credits
        </p>
      </div>

      {completed && course.grade ? (
        <Badge color={gradePoint >= 3.7 ? 'green' : gradePoint >= 3.0 ? 'blue' : 'yellow'}>
          {course.grade}
        </Badge>
      ) : !completed && !onToggleComplete ? (
        <Badge color="blue">Current</Badge>
      ) : null}
    </div>
  );
}