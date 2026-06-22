import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';

/**
 * ThemeToggle Component
 * Provides a button to switch between light and dark themes
 * 
 * Features:
 * - Icon changes based on current theme
 * - Smooth transition between themes
 * - Tooltip on hover
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-lg transition-colors duration-200
        ${isDark 
          ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
          : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
        }
      `}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Toggle ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun size={20} className="transition-transform hover:rotate-180 duration-300" />
      ) : (
        <Moon size={20} className="transition-transform hover:rotate-180 duration-300" />
      )}
    </button>
  );
}
