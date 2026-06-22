import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useProfileStore } from '@/store/useProfileStore';
import { ThemeToggle } from './ThemeToggle';
import { Avatar } from '@/components/ui';

export function TopHeader({ title, subtitle, actions, className }) {
  const profile = useProfileStore(s => s.profile);

  return (
    <header className={cn('sticky top-0 z-20 bg-surface/95 backdrop-blur-lg border-b border-surface-border', className)}>
      <div className="flex items-center gap-3 px-4 h-14 max-w-lg mx-auto">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {title ? (
            <div className="min-w-0">
              <h1 className="text-base font-bold text-ink truncate">{title}</h1>
              {subtitle && <p className="text-xs text-ink-muted truncate">{subtitle}</p>}
            </div>
          ) : (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
                 <img src="/UniversityTitleIcon.png" className='w-4 h-4 ' />
              </div>
              <span className="font-bold text-ink text-base">CampusSync</span>
            </Link>
          )}
        </div>
        <div className="flex items-center gap-1">
          {actions}
          <ThemeToggle />
          <Link to="/profile" className="touch-target w-9 h-9 flex items-center justify-center">
            <Avatar src={profile?.avatar} name={profile?.name} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
}
