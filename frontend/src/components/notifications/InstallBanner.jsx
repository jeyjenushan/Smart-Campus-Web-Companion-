import { Download, X } from 'lucide-react';
import { useState } from 'react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export function InstallBanner() {
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall();
  const [dismissed, setDismissed] = useState(
    localStorage.getItem('install-banner-dismissed') === '1'
  );

  if (!isInstallable || isInstalled || dismissed) return null;

  function dismiss() {
    localStorage.setItem('install-banner-dismissed', '1');
    setDismissed(true);
  }

  return (
    <div className="fixed bottom-[72px] left-4 right-4 max-w-lg mx-auto z-20 animate-in">
      <div className="card-md p-3 flex items-center gap-3 bg-brand-600 text-white border-brand-700">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <Download className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold">Install CampusSync</p>
          <p className="text-xs text-brand-200">Add to home screen for offline access</p>
        </div>
        <button
          onClick={() => promptInstall()}
          className="btn bg-white text-brand-700 h-9 px-3 text-xs font-bold rounded-xl"
        >
          Install
        </button>
        <button
          onClick={dismiss}
          className="touch-target w-8 h-8 flex items-center justify-center flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>
      </div>
    </div>
  );
}
