
import React from 'react';
import { useThemeStore } from '../lib/theme';

const HomeScreen = () => {
  const { theme } = useThemeStore();
  const isDark = theme.startsWith('dark');

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="p-5">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Hi there! 👋
          </h1>
          <p className="text-base opacity-75">
            Welcome to eFix
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
