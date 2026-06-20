import { Bell, BellOff } from 'lucide-react';
import { cn } from '@/lib/cn';

export function NotificationCard({ notifStatus, toggleNotifications }) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
            notifStatus === 'granted' ? 'bg-success/10' : 'bg-surface-muted'
          )}
        >
          {notifStatus === 'granted' ? (
            <Bell className="w-5 h-5 text-success" />
          ) : (
            <BellOff className="w-5 h-5 text-ink-muted" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-ink">Deadline Reminders</p>
          <p className="text-xs text-ink-muted">
            {notifStatus === 'granted'
              ? 'Active — alerts 24h before deadlines'
              : notifStatus === 'denied'
                ? 'Blocked in browser settings'
                : 'Enable to get notified before deadlines'}
          </p>
        </div>

        <button
          onClick={toggleNotifications}
          disabled={notifStatus === 'denied'}
          className={cn(
            'relative w-12 h-6 rounded-full transition-colors flex-shrink-0',
            notifStatus === 'granted' ? 'bg-success' : 'bg-surface-border',
            notifStatus === 'denied' && 'opacity-50 cursor-not-allowed'
          )}
          role="switch"
          aria-checked={notifStatus === 'granted'}
          aria-label="Toggle notifications"
        >
          <span
            className={cn(
              'absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all',
              notifStatus === 'granted' ? 'left-7' : 'left-1'
            )}
          />
        </button>
      </div>
    </div>
  );
}