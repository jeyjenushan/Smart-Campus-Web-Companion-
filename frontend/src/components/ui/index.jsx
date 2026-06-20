// Button
import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';

export function Button({ children, variant = 'primary', size = 'md', loading, className, ...props }) {
  const base = 'btn';
  const variants = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    ghost:     'btn-ghost',
    danger:    'btn-danger',
  };
  const sizes = {
    sm: 'h-10 px-3 text-xs',
    md: 'min-h-[48px] px-5 text-sm',
    lg: 'h-14 px-7 text-base',
    icon: 'min-h-[48px] min-w-[48px] p-0',
  };
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

// Input
export function Input({ label, error, helper, className, containerClassName, ...props }) {
  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      {label && <label className="text-xs font-semibold text-ink-muted uppercase tracking-wide">{label}</label>}
      <input className={cn('input', error && 'border-danger ring-1 ring-danger', className)} {...props} />
      {error  && <p className="text-xs text-danger">{error}</p>}
      {helper && !error && <p className="text-xs text-ink-faint">{helper}</p>}
    </div>
  );
}

// Textarea
export function Textarea({ label, error, className, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-ink-muted uppercase tracking-wide">{label}</label>}
      <textarea
        className={cn('input min-h-[100px] resize-none', error && 'border-danger', className)}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

// Select
export function Select({ label, error, options = [], className, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-ink-muted uppercase tracking-wide">{label}</label>}
      <select className={cn('input appearance-none', error && 'border-danger', className)} {...props}>
        {options.map(o =>
          typeof o === 'string'
            ? <option key={o} value={o}>{o}</option>
            : <option key={o.value} value={o.value}>{o.label}</option>
        )}
      </select>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

// Badge
export function Badge({ children, color = 'blue', className }) {
  const colors = {
    blue:   'bg-info/10 text-info',
    green:  'bg-success/10 text-success',
    yellow: 'bg-warning/10 text-warning',
    red:    'bg-danger/10 text-danger',
    purple: 'bg-purple-100 text-purple-700',
    pink:   'bg-pink-100 text-pink-700',
    gray:   'bg-surface-muted text-ink-muted',
  };
  return (
    <span className={cn('badge', colors[color] ?? colors.gray, className)}>
      {children}
    </span>
  );
}

// Card
export function Card({ children, className, onClick }) {
  return (
    <div
      className={cn('card p-4', onClick && 'cursor-pointer active:scale-[0.99] transition-transform', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Spinner
export function Spinner({ size = 'md', className }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' };
  return (
    <Loader2 className={cn('animate-spin text-brand-500', sizes[size], className)} />
  );
}

// Empty state
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-3">
      {Icon && <div className="w-14 h-14 rounded-2xl bg-surface-muted flex items-center justify-center">
        <Icon className="w-7 h-7 text-ink-faint" />
      </div>}
      <div>
        <p className="font-semibold text-ink">{title}</p>
        {description && <p className="text-sm text-ink-muted mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

// Progress bar
export function ProgressBar({ value, max = 100, color = 'brand', className }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const colors = {
    brand:   'bg-brand-500',
    green:   'bg-success',
    yellow:  'bg-warning',
    red:     'bg-danger',
  };
  return (
    <div className={cn('h-2 bg-surface-muted rounded-full overflow-hidden', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-500', colors[color] ?? colors.brand)}
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
      />
    </div>
  );
}

// Avatar
export function Avatar({ src, name, size = 'md', className }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-16 h-16 text-lg', xl: 'w-24 h-24 text-2xl' };
  const initials = name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) ?? '?';
  return src ? (
    <img src={src} alt={name} className={cn('rounded-full object-cover', sizes[size], className)} />
  ) : (
    <div className={cn('rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold', sizes[size], className)}>
      {initials}
    </div>
  );
}

// Divider
export function Divider({ label, className }) {
  return label ? (
    <div className={cn('flex items-center gap-3 my-2', className)}>
      <div className="flex-1 h-px bg-surface-border" />
      <span className="text-xs text-ink-faint font-medium">{label}</span>
      <div className="flex-1 h-px bg-surface-border" />
    </div>
  ) : (
    <hr className={cn('border-surface-border', className)} />
  );
}

// Stat card
export function StatCard({ label, value, icon: Icon, color = 'blue', trend }) {
  const colors = {
    blue:   { bg: 'bg-info/10',    icon: 'text-info' },
    green:  { bg: 'bg-success/10', icon: 'text-success' },
    yellow: { bg: 'bg-warning/10', icon: 'text-warning' },
    red:    { bg: 'bg-danger/10',  icon: 'text-danger' },
    purple: { bg: 'bg-purple-100', icon: 'text-purple-600' },
  };
  const c = colors[color] ?? colors.blue;
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', c.bg)}>
        <Icon className={cn('w-5 h-5', c.icon)} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-ink-muted font-medium truncate">{label}</p>
        <p className="text-xl font-bold text-ink">{value}</p>
        {trend && <p className="text-xs text-ink-faint">{trend}</p>}
      </div>
    </div>
  );
}
