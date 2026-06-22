import { BookOpen, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { cn } from '@/lib/cn';
import { CourseRow } from './CourseRow';
import { DEGREES } from '@/data/seedData';
import { useProfileStore } from '@/store/useProfileStore';

export function CourseTabsCard({
  profile,
  tab,
  setTab,
  completedCourses,
  cgpa,
  totalCreditsDone,
}) {
  const updateProfile = useProfileStore(s => s.updateProfile);

  // Get current degree info and its courses
  const currentDegree = DEGREES.find(d => d.name === profile.degree);
  const degreeCourseCodes = currentDegree?.courses || [];
  
  // Filter completed courses to show only those in current degree
  const degreeLevelCompletedCourses = completedCourses.filter(cc =>
    degreeCourseCodes.includes(cc.code)
  );

  async function handleToggleComplete(courseCode) {
    const isCompleted = profile.completedCourses?.some(c => c.code === courseCode);

    if (isCompleted) {
      // Remove from completed
      const updated = profile.completedCourses.filter(c => c.code !== courseCode);
      await updateProfile({ completedCourses: updated });
      toast.success('Course marked as current');
    } else {
      // Add to completed with default grade A-
      const courseToAdd = profile.courses.find(c => c.code === courseCode);
      if (courseToAdd) {
        const updated = [
          ...(profile.completedCourses || []),
          { ...courseToAdd, grade: 'A-', completedAt: new Date().toISOString() }
        ];
        await updateProfile({ completedCourses: updated });
        toast.success('Course marked as completed!');
      }
    }
  }

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
            <>
              <p className="text-xs text-ink-muted mb-3">
                💡 Click the circle to mark a course as completed
              </p>
              {profile.courses.map(course => (
                <CourseRow 
                  key={course.code} 
                  course={course} 
                  completed={false}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </>
          ) : (
            <p className="text-sm text-ink-muted text-center py-4">
              Select a degree program first to see courses
            </p>
          ))}

        {tab === 'completed' &&
          (degreeLevelCompletedCourses.length ? (
            <>
              <p className="text-xs text-ink-muted mb-3">
                💡 Click the checkmark to mark a course as current again
              </p>
              {degreeLevelCompletedCourses.map(course => (
                <CourseRow 
                  key={course.code} 
                  course={course} 
                  completed
                  onToggleComplete={handleToggleComplete}
                />
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