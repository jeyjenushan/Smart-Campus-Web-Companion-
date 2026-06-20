import { Shield } from 'lucide-react';

export function AppInfoCard() {
  return (
    <div className="card p-4 space-y-2">
      <h3 className="font-semibold text-ink flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-brand-500" /> App Info
      </h3>

      {[
        ['App', 'CampusSync'],
        ['Version', '1.0.0'],
      ].map(([key, value]) => (
        <div key={key} className="flex justify-between text-sm">
          <span className="text-ink-muted">{key}</span>
          <span className="font-medium text-ink">{value}</span>
        </div>
      ))}
    </div>
  );
}