
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
          // استخدام نمط انتقال لجميع المتغيرات
          element.style.transition = "all 0.3s ease";
        }
      });
    };
    
    // تطبيق السمة فوراً ثم مرة أخرى بعد تحميل الصفحة بالكامل
    applyThemeToElements();
    
    // تأخير لتطبيق السمة مرة ثانية لضمان أن جميع العناصر الجديدة تأخذ السمة
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
    
    // إضافة مراقب للتغييرات في DOM لتطبيق السمة على العناصر الجديدة
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              // تطبيق السمة الحالية على أي عناصر جديدة
              if (node.classList.contains('theme-aware')) {
                node.dataset.theme = savedTheme;
              }
              
              // التحقق أيضًا من العناصر الفرعية للعنصر المضاف
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
    
    // بدء مراقبة الصفحة
    observer.observe(document.body, { childList: true, subtree: true });
    
    // تحديث السمة عند تغيير حجم النافذة (لمعالجة مشكلات على الأجهزة المحمولة)
    window.addEventListener('resize', () => {
      setTimeout(() => {
        document.querySelectorAll('.theme-aware').forEach(element => {
          if (element instanceof HTMLElement) {
            element.dataset.theme = savedTheme;
          }
        });
      }, 100);
    });
  }
};
