import { Clock, CheckSquare, AlertCircle, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/ui';

export function DashboardStats({ stats, profile }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard label="Pending" value={stats.pending} icon={Clock} color="yellow" />
      <StatCard label="Completed" value={stats.completed} icon={CheckSquare} color="green" />
      <StatCard label="Overdue" value={stats.overdue} icon={AlertCircle} color="red" />
      <StatCard
        label="Credits"
        value={`${profile?.completedCredits ?? 0}/${profile?.totalCredits ?? 120}`}
        icon={TrendingUp}
        color="blue"
      />
    </div>
  );
}