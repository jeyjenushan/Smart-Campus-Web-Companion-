import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useProfileStore } from '@/store/useProfileStore';
import { useAuthStore } from '@/store/useAuthStore';
import { ThemeToggle } from './ThemeToggle';
import { Avatar } from '@/components/ui';

export function TopHeader({ title, subtitle, actions, className }) {
  const navigate = useNavigate();
  const profile = useProfileStore(s => s.profile);
  const signout = useAuthStore(s => s.signout);

  const handleSignout = () => {
    signout();
    navigate('/signin');
  };

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 bg-surface/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-surface-border dark:border-slate-800', className)}>
      <div className="flex items-center gap-3 px-4 h-14 max-w-lg mx-auto">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {title ? (
            <div className="min-w-0">
              <h1 className="text-base font-bold text-ink dark:text-slate-100 truncate">{title}</h1>
              {subtitle && <p className="text-xs text-ink-muted dark:text-slate-400 truncate">{subtitle}</p>}
            </div>
          ) : (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
                 <img src="/UniversityTitleIcon.png" className='w-4 h-4 ' />
              </div>
              <span className="font-bold text-ink dark:text-slate-100 text-base">CampusSync</span>
            </Link>
          )}
        </div>
        <div className="flex items-center gap-1">
          {actions}
          <ThemeToggle />
          <button
            onClick={handleSignout}
            className="touch-target w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-muted dark:hover:bg-slate-700 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-5 h-5 text-ink-muted dark:text-slate-400" />
          </button>
          <Link to="/profile" className="touch-target w-9 h-9 flex items-center justify-center">
            <Avatar src={profile?.avatar} name={profile?.name} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
}
