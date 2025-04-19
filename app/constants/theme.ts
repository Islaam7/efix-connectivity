import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from './colors';

export type ThemeColor = 'light' | 'dark' | 'purple' | 'oceanic' | 'sunset' | 'dark-blue' | 'dark-emerald' | 'dark-rose' | 'system';

export const themeColors = {
  light: {
    background: '#ffffff',
    text: '#000000',
    primary: '#9b87f5',
    secondary: '#e5e5e5',
  },
  dark: {
    background: '#1a1a1a',
    text: '#ffffff',
    primary: '#9b87f5',
    secondary: '#333333',
  },
  purple: {
    background: '#f0eafa',
    text: '#514d63',
    primary: '#a094fa',
    secondary: '#dcd6f7',
  },
  oceanic: {
    background: '#e0f7fa',
    text: '#263238',
    primary: '#4dd0e1',
    secondary: '#b2ebf2',
  },
  sunset: {
    background: '#fff3e0',
    text: '#212121',
    primary: '#ffb74d',
    secondary: '#ffe0b2',
  },
   'dark-blue': {
    background: '#0d1117',
    text: '#ffffff',
    primary: '#79b8ff',
    secondary: '#21262d',
  },
  'dark-emerald': {
    background: '#052e16',
    text: '#ffffff',
    primary: '#6fbb7b',
    secondary: '#153d25',
  },
  'dark-rose': {
    background: '#1e1014',
    text: '#ffffff',
    primary: '#e98074',
    secondary: '#321e22',
  },
  system: {
    background: '#ffffff',
    text: '#000000',
    primary: '#9b87f5',
    secondary: '#e5e5e5',
  },
};

interface ThemeStore {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'system',
  setTheme: async (newTheme) => {
    set({ theme: newTheme });
    try {
      await AsyncStorage.setItem('app-theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },
}));

export const initializeTheme = async () => {
  try {
    const savedTheme = await AsyncStorage.getItem('app-theme');
    if (savedTheme) {
      useThemeStore.getState().setTheme(savedTheme as ThemeColor);
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
};
