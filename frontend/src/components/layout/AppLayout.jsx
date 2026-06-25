import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { useProfileStore } from '@/store/useProfileStore';
import { useAuthStore } from '@/store/useAuthStore';

export function AppLayout() {
  const loadProfile = useProfileStore(s => s.loadProfile);
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user, loadProfile]);

  return (
    <div className="flex flex-col min-h-dvh bg-surface-subtle">
      <main className="flex-1 pb-safe overflow-x-hidden max-w-lg mx-auto w-full">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
