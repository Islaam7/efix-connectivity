
import { create } from 'zustand';
import { toast } from 'sonner';

export type ThemeColor = 'light' | 'dark' | 'purple' | 'oceanic' | 'sunset';

interface ThemeState {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (typeof localStorage !== 'undefined' && localStorage.getItem('theme') as ThemeColor) || 'light',
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
    
    // Force update CSS variables for specific elements that might not inherit properly
    // This helps fix the background color issue in some components
    document.querySelectorAll('.theme-aware').forEach(element => {
      if (element instanceof HTMLElement) {
        element.dataset.theme = theme;
        element.style.transition = "background-color 0.3s ease, color 0.3s ease";
      }
    });
    
    // Show toast notification
    const themeNames = {
      light: 'Light Mode',
      dark: 'Dark Mode',
      purple: 'Purple Theme',
      oceanic: 'Oceanic Theme',
      sunset: 'Sunset Theme'
    };
    
    toast.success(`${themeNames[theme]} enabled`, {
      duration: 1500,
      position: 'top-center',
      style: {
        borderRadius: '8px',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        border: '1px solid var(--border)'
      }
    });
    
    set({ theme });
  },
}));

// Apply the theme from local storage on initialization
export const initializeTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as ThemeColor || 'light';
    useThemeStore.getState().setTheme(savedTheme);
    
    // Add MutationObserver to monitor DOM changes and apply theme to new elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              // Apply current theme to any new elements with the theme-aware class
              if (node.classList.contains('theme-aware')) {
                node.dataset.theme = savedTheme;
              }
              
              // Also check children of the added node
              node.querySelectorAll('.theme-aware').forEach(element => {
                if (element instanceof HTMLElement) {
                  element.dataset.theme = savedTheme;
                }
              });
            }
          });
        }
      });
    });
    
    // Start observing the document
    observer.observe(document.body, { childList: true, subtree: true });
  }
};
