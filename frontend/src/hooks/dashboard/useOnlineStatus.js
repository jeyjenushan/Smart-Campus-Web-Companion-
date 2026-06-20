import { useEffect, useState } from 'react';

export function useOnlineStatus() {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    const on = () => setOnlineStatus(true);
    const off = () => setOnlineStatus(false);

    window.addEventListener('online', on);
    window.addEventListener('offline', off);

    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  return onlineStatus;
}