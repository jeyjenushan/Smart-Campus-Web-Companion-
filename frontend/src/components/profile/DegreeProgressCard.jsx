import { TrendingUp } from 'lucide-react';
import { ProgressBar } from '@/components/ui';

export function DegreeProgressCard({ profile, progressPct, semCredits }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-ink flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-brand-500" /> Degree Progress
        </h3>

        <span className="text-sm font-bold text-brand-600">
          {progressPct}%
        </span>
      </div>

      <ProgressBar
        value={profile.completedCredits}
        max={profile.totalCredits}
        color="brand"
        className="h-3"
      />

      <div className="flex justify-between mt-1.5 text-xs text-ink-muted">
        <span>{profile.completedCredits} completed</span>
        <span>{profile.totalCredits - profile.completedCredits} remaining</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-surface-border">
        <div className="bg-brand-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-brand-600">{semCredits}</p>
          <p className="text-xs text-ink-muted">This semester</p>
        </div>

        <div className="bg-success/10 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-success">
            {profile.totalCredits - profile.completedCredits - semCredits}
          </p>
          <p className="text-xs text-ink-muted">After this sem</p>
        </div>
      </div>
    </div>
  );
}