
import React from 'react';
import { Palette, Sun, Moon, Check } from 'lucide-react';
import { useThemeStore, ThemeColor } from '@/lib/theme';

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  const themeOptions: { value: ThemeColor; label: string; icon: React.ReactNode; className: string; description: string }[] = [
    { 
      value: 'light', 
      label: 'Light Mode', 
      icon: <Sun className="w-5 h-5" />, 
      className: "bg-white border-gray-200", 
      description: "Clear and bright interface for daytime use"
    },
    { 
      value: 'dark', 
      label: 'Dark Mode', 
      icon: <Moon className="w-5 h-5" />, 
      className: "bg-gray-900 text-white border-gray-700",
      description: "Reduce eye strain in low-light environments"
    },
    { 
      value: 'purple', 
      label: 'Purple Theme', 
      icon: <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
              {theme === 'purple' && <Check className="w-3 h-3 text-white" />}
            </div>, 
      className: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
      description: "Elegant purple accents for a royal feel"
    },
    { 
      value: 'oceanic', 
      label: 'Oceanic Theme', 
      icon: <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
              {theme === 'oceanic' && <Check className="w-3 h-3 text-white" />}
            </div>, 
      className: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      description: "Cool blue tones inspired by the ocean"
    },
    { 
      value: 'sunset', 
      label: 'Sunset Theme', 
      icon: <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
              {theme === 'sunset' && <Check className="w-3 h-3 text-white" />}
            </div>, 
      className: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
      description: "Warm orange hues like a beautiful sunset"
    },
  ];

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden mb-4 animate-fade-in border border-border">
      <div className="p-5 border-b border-border">
        <h2 className="font-semibold mb-3 flex items-center">
          <Palette className="w-5 h-5 mr-2 text-primary" />
          Theme Settings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`flex items-center p-4 rounded-xl border transition-all duration-300 ${
                theme === option.value
                  ? 'ring-2 ring-primary shadow-sm scale-[1.02]'
                  : 'hover:bg-accent'
              } ${option.className} hover-lift group`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                theme === option.value ? 'bg-primary/10' : 'bg-background/80'
              }`}>
                {option.icon}
              </div>
              
              <div className="ml-3 text-left">
                <div className="font-medium mb-0.5">{option.label}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{option.description}</div>
              </div>
              
              {theme === option.value && (
                <div className="ml-auto">
                  <Check className="w-4 h-4 text-primary" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="px-5 py-3 bg-muted/30 text-xs text-muted-foreground">
        Choose a theme that matches your style and improves your experience.
      </div>
    </div>
  );
};

export default ThemeSelector;
