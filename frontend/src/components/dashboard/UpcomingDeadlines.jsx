import { Link } from 'react-router-dom';
import { ChevronRight, CheckSquare } from 'lucide-react';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/cn';
import { getCourseColor, getDueLabel, getPriorityColor } from '../../lib/dashboard';


export function UpcomingDeadlines({ upcoming, today }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-ink">Upcoming Deadlines</h3>

        <Link
          to="/assignments"
          className="text-xs text-brand-600 font-semibold flex items-center gap-1"
        >
          All <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {upcoming.length === 0 ? (
        <div className="card p-6 text-center">
          <CheckSquare className="w-8 h-8 text-success mx-auto mb-2" />
          <p className="text-sm text-ink-muted">
            All caught up! No pending assignments.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {upcoming.map(a => {
            const due = getDueLabel(a.dueDate, today);

            return (
              <div
                key={a.id}
                className="card p-4 flex items-center gap-3 active:scale-[0.99] transition-transform"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: getCourseColor(a.course) }}
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink truncate">
                    {a.title}
                  </p>
                  <p className="text-xs text-ink-muted">{a.course}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className={cn('text-xs font-medium', due.color)}>
                    {due.label}
                  </p>
                  <Badge color={getPriorityColor(a.priority)} className="mt-1">
                    {a.priority}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}