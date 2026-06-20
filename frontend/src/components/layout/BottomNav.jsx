import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, User, Camera } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useAssignmentStore } from '@/store/useAssignmentStore';

const NAV_ITEMS = [
  { to: '/',            label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/assignments', label: 'Assignments', icon: CheckSquare, badge: true },
  { to: '/camera',      label: 'Notes',       icon: Camera },
  { to: '/profile',     label: 'Profile',     icon: User },
];

export function BottomNav() {
  const getStats = useAssignmentStore(s => s.getStats);
  const stats    = getStats();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur-lg border-t border-surface-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-0.5 py-2 px-3',
                'min-h-[60px] flex-1 text-xs font-medium transition-colors',
                isActive ? 'text-brand-600' : 'text-ink-faint hover:text-ink-muted'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon className={cn('w-5 h-5 transition-all', isActive && 'scale-110')} />
                  {badge && stats.overdue > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {stats.overdue > 9 ? '9+' : stats.overdue}
                    </span>
                  )}
                </div>
                <span className={cn('transition-all', isActive && 'font-semibold')}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
