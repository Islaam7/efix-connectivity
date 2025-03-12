
import React from 'react';
import { Palette, Sun, Moon } from 'lucide-react';
import { useThemeStore, ThemeColor } from '@/lib/theme';

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  const themeOptions: { value: ThemeColor; label: string; icon: React.ReactNode; className: string }[] = [
    { value: 'light', label: 'Light Mode', icon: <Sun className="w-4 h-4" />, className: "bg-white" },
    { value: 'dark', label: 'Dark Mode', icon: <Moon className="w-4 h-4" />, className: "bg-gray-900 text-white" },
    { value: 'purple', label: 'Purple Theme', icon: <div className="w-4 h-4 rounded-full bg-purple-500" />, className: "bg-purple-50 dark:bg-purple-900/20" },
    { value: 'oceanic', label: 'Oceanic Theme', icon: <div className="w-4 h-4 rounded-full bg-blue-500" />, className: "bg-blue-50 dark:bg-blue-900/20" },
    { value: 'sunset', label: 'Sunset Theme', icon: <div className="w-4 h-4 rounded-full bg-orange-500" />, className: "bg-orange-50 dark:bg-orange-900/20" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-4 animate-fade-in">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold mb-3 flex items-center">
          <Palette className="w-5 h-5 mr-2 text-primary" />
          Theme Settings
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-300 ${
                theme === option.value
                  ? 'border-primary bg-primary/10 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700'
              } hover-lift`}
            >
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${option.className}`}>
                  {option.icon}
                </div>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
