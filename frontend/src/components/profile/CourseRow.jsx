import { Badge } from '@/components/ui';
import { COURSES, GRADE_POINTS } from '@/data/seedData';
import { CheckCircle2, Circle } from 'lucide-react';

export function CourseRow({ course, completed, onToggleComplete }) {
  const color = completed
    ? '#22c55e'
    : COURSES.find(c => c.code === course.code)?.color ?? '#94a3b8';

  const gradePoint = GRADE_POINTS[course.grade] ?? 0;

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-surface-border last:border-0">
      {onToggleComplete && !completed && (
        <button
          type="button"
          onClick={() => onToggleComplete(course.code)}
          className="flex-shrink-0 text-ink-muted hover:text-brand-600 transition-colors"
          title="Mark as completed"
        >
          <Circle className="w-4 h-4" />
        </button>
      )}

      {onToggleComplete && completed && (
        <button
          type="button"
          onClick={() => onToggleComplete(course.code)}
          className="flex-shrink-0 text-success hover:text-danger transition-colors"
          title="Mark as not completed"
        >
          <CheckCircle2 className="w-4 h-4" />
        </button>
      )}

      {!onToggleComplete && (
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: color }}
        />
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink truncate">{course.name}</p>
        <p className="text-xs text-ink-muted">
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