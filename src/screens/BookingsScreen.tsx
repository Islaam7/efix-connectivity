
import React from 'react';
import { useThemeStore } from '../lib/theme';

const BookingsScreen = () => {
  const { theme } = useThemeStore();
  const isDark = theme.startsWith('dark');

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="p-5">
        <h1 className="text-2xl font-bold">
          My Bookings
        </h1>
      </div>
    </div>
  );
};

export default BookingsScreen;
