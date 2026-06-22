import { useEffect, useState } from 'react';

/**
 * Hook to detect and respond to dark mode changes
 * Listens to class changes on document.documentElement
 * Used by Select, DatePicker, and other components that need real-time theme responsiveness
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    // Create a MutationObserver to watch for class changes on html element
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}
