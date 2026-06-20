import { Megaphone } from 'lucide-react';
import { Badge, Spinner } from '@/components/ui';

export function CourseAnnouncements({ announcements, loading }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-ink">Course Announcements</h3>
        <Megaphone className="w-4 h-4 text-ink-faint" />
      </div>

      <div className="card overflow-hidden p-0">
        {loading ? (
          <div className="p-6 flex items-center justify-center">
            <Spinner />
          </div>
        ) : announcements.length === 0 ? (
          <p className="p-4 text-sm text-ink-muted text-center">
            No announcements
          </p>
        ) : (
          announcements.map(a => (
            <div key={a.id} className="p-3 border-b border-surface-border last:border-0">
              <div className="flex items-start gap-2">
                <Badge color="blue" className="mt-0.5 flex-shrink-0">
                  {a.course}
                </Badge>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink line-clamp-1">
                    {a.title}
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5 line-clamp-2">
                    {a.body}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}