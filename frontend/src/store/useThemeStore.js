import { create } from 'zustand';
import { useEffect } from 'react';

const THEME_KEY = 'campus-sync-theme';

/**
 * Theme Store using Zustand
 * Manages application dark/light theme preferences
 * Persists theme selection to localStorage
 */
export const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem(THEME_KEY) || 'dark', // 'light' or 'dark'
  
  /**
   * Set theme and persist to localStorage
   * Also updates document root element class
   */
  setTheme: (newTheme) => {
    localStorage.setItem(THEME_KEY, newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    set({ theme: newTheme });
  },
  
  /**
   * Toggle between light and dark themes
   */
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    get().setTheme(newTheme);
  },
  
  /**
   * Initialize theme from localStorage on app start
   */
  initializeTheme: () => {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    
    // Check system preference if no saved theme
    if (!localStorage.getItem(THEME_KEY)) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'dark';
      localStorage.setItem(THEME_KEY, systemTheme);
    }
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    set({ theme: savedTheme });
  }
}));

/**
 * Hook to handle theme initialization on component mount
 */
export function useThemeInitializer() {
  useEffect(() => {
    useThemeStore.getState().initializeTheme();
  }, []);
}
