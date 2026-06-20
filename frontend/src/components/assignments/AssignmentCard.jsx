import { format } from 'date-fns';
import {
  Trash2,
  Edit2,
  CheckCircle2,
  Circle,
  Clock,
} from 'lucide-react';

import { Badge } from '@/components/ui';
import { COURSES } from '@/data/seedData';
import { cn } from '@/lib/cn';
import {
  getDueLabel,
  priorityColor,
  statusColor,
} from '@/lib/assignments';

export function AssignmentCard({ assignment, onToggle, onEdit, onDelete }) {
  const due = getDueLabel(assignment.dueDate);

  const courseColor =
    COURSES.find(course => course.code === assignment.course)?.color ??
    '#94a3b8';

  return (
    <div
      className={cn(
        'card p-4 transition-all',
        assignment.status === 'completed' && 'opacity-70'
      )}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(assignment.id)}
          className="touch-target w-10 h-10 flex items-center justify-center flex-shrink-0 -ml-1"
          aria-label={
            assignment.status === 'completed'
              ? 'Mark incomplete'
              : 'Mark complete'
          }
        >
          {assignment.status === 'completed' ? (
            <CheckCircle2 className="w-6 h-6 text-success" />
          ) : (
            <Circle className="w-6 h-6 text-ink-faint" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
              style={{ background: courseColor }}
            />

            <p
              className={cn(
                'text-sm font-semibold text-ink leading-tight',
                assignment.status === 'completed' &&
                  'line-through text-ink-muted'
              )}
            >
              {assignment.title}
            </p>
          </div>

          <p className="text-xs text-ink-muted mt-0.5 ml-3.5">
            {assignment.course}
          </p>

          {assignment.description && (
            <p className="text-xs text-ink-muted mt-1.5 ml-3.5 line-clamp-2">
              {assignment.description}
            </p>
          )}

          <div className="flex items-center flex-wrap gap-1.5 mt-2 ml-3.5">
            <Badge color={statusColor(assignment.status)}>
              {assignment.status.replace('-', ' ')}
            </Badge>

            <Badge color={priorityColor(assignment.priority)}>
              {assignment.priority}
            </Badge>

            {assignment.type && <Badge color="gray">{assignment.type}</Badge>}

            {assignment.marks && (
              <Badge color="purple">{assignment.marks}%</Badge>
            )}
          </div>

          <div className="flex items-center gap-1 mt-1.5 ml-3.5">
            <Clock className="w-3 h-3 text-ink-faint" />
            <span className={cn('text-xs', due.cls)}>{due.text}</span>

            {assignment.dueDate && (
              <span className="text-xs text-ink-faint">
                · {format(new Date(assignment.dueDate), 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(assignment)}
            className="touch-target w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-muted transition-colors"
            aria-label="Edit"
          >
            <Edit2 className="w-4 h-4 text-ink-muted" />
          </button>

          <button
            onClick={() => onDelete(assignment)}
            className="touch-target w-9 h-9 flex items-center justify-center rounded-xl hover:bg-danger/10 transition-colors"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4 text-danger" />
          </button>
        </div>
      </div>
    </div>
  );
}