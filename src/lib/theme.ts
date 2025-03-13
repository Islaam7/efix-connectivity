
import { create } from 'zustand';
import { toast } from 'sonner';

export type ThemeColor = 'light' | 'dark' | 'purple' | 'oceanic' | 'sunset' | 'dark-blue' | 'dark-emerald' | 'dark-rose';

interface ThemeState {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (typeof localStorage !== 'undefined' && localStorage.getItem('theme') as ThemeColor) || 'light',
  setTheme: (theme) => {
    // Remove all theme classes
    document.documentElement.classList.remove(
      'light', 'dark', 
      'theme-purple', 'theme-oceanic', 'theme-sunset',
      'theme-dark-blue', 'theme-dark-emerald', 'theme-dark-rose'
    );
    
    // Add the selected theme class
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.classList.add(theme);
    } else if (theme.startsWith('dark-')) {
      // For dark custom themes, add both dark and the theme class
      document.documentElement.classList.add('dark');
      document.documentElement.classList.add(`theme-${theme}`);
    } else {
      // For light custom themes, add both light and the theme class
      document.documentElement.classList.add('light');
      document.documentElement.classList.add(`theme-${theme}`);
    }
    
    // Save to local storage
    localStorage.setItem('theme', theme);
    
    // Apply theme to all elements with theme-aware class
    const applyThemeToElements = () => {
      document.querySelectorAll('.theme-aware').forEach(element => {
        if (element instanceof HTMLElement) {
          element.dataset.theme = theme;
          element.style.transition = "all 0.3s ease";
        }
      });
    };
    
    // Apply theme immediately and again after page is fully loaded
    applyThemeToElements();
    setTimeout(applyThemeToElements, 100);
    
    // Show toast notification
    const themeNames = {
      light: 'Light Mode',
      dark: 'Dark Mode',
      purple: 'Purple Theme',
      oceanic: 'Oceanic Theme',
      sunset: 'Sunset Theme',
      'dark-blue': 'Dark Blue Theme',
      'dark-emerald': 'Dark Emerald Theme',
      'dark-rose': 'Dark Rose Theme'
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
    
    // Add observer for DOM changes to apply theme to new elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              // Apply current theme to any new elements
              if (node.classList.contains('theme-aware')) {
                node.dataset.theme = savedTheme;
              }
              
              // Also check child elements of the added element
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
    
    // Update theme on window resize (to handle mobile device issues)
    window.addEventListener('resize', () => {
      setTimeout(() => {
        document.querySelectorAll('.theme-aware').forEach(element => {
          if (element instanceof HTMLElement) {
            element.dataset.theme = savedTheme;
          }
        });
      }, 100);
    });
    
    // Set body background based on theme
    const setBodyBackground = () => {
      if (savedTheme.startsWith('dark-')) {
        switch(savedTheme) {
          case 'dark-blue':
            document.body.style.backgroundColor = '#0f1528';
            break;
          case 'dark-emerald':
            document.body.style.backgroundColor = '#081512';
            break;
          case 'dark-rose':
            document.body.style.backgroundColor = '#1a0c11';
            break;
          default:
            document.body.style.backgroundColor = 'var(--background)';
        }
      } else if (savedTheme !== 'light' && savedTheme !== 'dark') {
        switch(savedTheme) {
          case 'purple':
            document.body.style.backgroundColor = document.documentElement.classList.contains('dark') ? '#1e1333' : '#f9f7ff';
            break;
          case 'oceanic':
            document.body.style.backgroundColor = document.documentElement.classList.contains('dark') ? '#042a3a' : '#f0f9ff';
            break;
          case 'sunset':
            document.body.style.backgroundColor = document.documentElement.classList.contains('dark') ? '#331a03' : '#fff9f0';
            break;
          default:
            document.body.style.backgroundColor = 'var(--background)';
        }
      } else {
        document.body.style.backgroundColor = 'var(--background)';
      }
    };
    
    setBodyBackground();
    // Update background when theme changes
    window.addEventListener('storage', (e) => {
      if (e.key === 'theme') {
        setBodyBackground();
      }
    });
  }
};
