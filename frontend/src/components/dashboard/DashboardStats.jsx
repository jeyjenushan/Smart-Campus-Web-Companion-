import { Clock, CheckSquare, AlertCircle, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/ui';
import { DEGREES } from '@/data/seedData';

export function DashboardStats({ stats, profile }) {
  // Calculate completed credits from actual completed courses
  const completedCourses = profile?.completedCourses ?? [];
  const currentDegree = DEGREES.find(d => d.name === profile?.degree);
  
  const completedCredits = completedCourses
    .filter(c => currentDegree?.courses?.includes(c.code))
    .reduce((sum, course) => sum + (course.credits || 0), 0);
  
  const totalCredits = currentDegree?.totalCredits || profile?.totalCredits || 120;

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard label="Pending" value={stats.pending} icon={Clock} color="yellow" />
      <StatCard label="Completed" value={stats.completed} icon={CheckSquare} color="green" />
      <StatCard label="Overdue" value={stats.overdue} icon={AlertCircle} color="red" />
      <StatCard
        label="Credits"
        value={`${completedCredits}/${totalCredits}`}
        icon={TrendingUp}
        color="blue"
      />
    </div>
  );
}