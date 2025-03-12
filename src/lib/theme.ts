
import { create } from 'zustand';
import { toast } from 'sonner';

export type ThemeColor = 'light' | 'dark' | 'purple' | 'oceanic' | 'sunset';

interface ThemeState {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem('theme') as ThemeColor || 'light',
  setTheme: (theme) => {
    // Remove all theme classes
    document.documentElement.classList.remove('light', 'dark', 'theme-purple', 'theme-oceanic', 'theme-sunset');
    
    // Add the selected theme class
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.classList.add(theme);
    } else {
      // For custom themes, add both a base (light/dark) and the theme class
      document.documentElement.classList.add('light');
      document.documentElement.classList.add(`theme-${theme}`);
    }
    
    // Save to local storage
    localStorage.setItem('theme', theme);
    
    // Show toast notification
    const themeNames = {
      light: 'Light Mode',
      dark: 'Dark Mode',
      purple: 'Purple Theme',
      oceanic: 'Oceanic Theme',
      sunset: 'Sunset Theme'
    };
    
    toast.success(`${themeNames[theme]} enabled`);
    set({ theme });
  },
}));

// Apply the theme from local storage on initialization
export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') as ThemeColor || 'light';
  useThemeStore.getState().setTheme(savedTheme);
};
