import { BookOpen, CheckCircle2 } from 'lucide-react';

import { cn } from '@/lib/cn';
import { CourseRow } from './CourseRow';

export function CourseTabsCard({
  profile,
  tab,
  setTab,
  completedCourses,
  cgpa,
  totalCreditsDone,
}) {
  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex border-b border-surface-border">
        {[
          { key: 'current', label: 'Current', icon: BookOpen },
          { key: 'completed', label: 'Completed', icon: CheckCircle2 },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold transition-colors',
              tab === key
                ? 'text-brand-600 border-b-2 border-brand-600'
                : 'text-ink-muted'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tab === 'current' &&
          (profile.courses?.length ? (
            profile.courses.map(course => (
              <CourseRow key={course.code} course={course} completed={false} />
            ))
          ) : (
            <p className="text-sm text-ink-muted text-center py-4">
              No current courses
            </p>
          ))}

        {tab === 'completed' &&
          (completedCourses.length ? (
            <>
              {completedCourses.map(course => (
                <CourseRow key={course.code} course={course} completed />
              ))}

              <p className="text-xs text-ink-muted text-center mt-3 pt-3 border-t border-surface-border">
                CGPA: <span className="font-bold text-ink">{cgpa}</span> over{' '}
                {totalCreditsDone} credits
              </p>
            </>
          ) : (
            <p className="text-sm text-ink-muted text-center py-4">
              No completed courses yet
            </p>
          ))}
      </div>
    </div>
  );
}