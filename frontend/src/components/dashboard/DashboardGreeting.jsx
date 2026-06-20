import { format } from 'date-fns';

export function DashboardGreeting({ greeting, profile, today }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-ink">
        {greeting}, {profile?.name?.split(' ')[0] ?? 'Student'} 👋
      </h2>
      <p className="text-sm text-ink-muted mt-0.5">
        {format(today, 'EEEE, MMMM d, yyyy')}
      </p>
    </div>
  );
}