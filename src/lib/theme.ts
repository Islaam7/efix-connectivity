
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeColor = 'light' | 'dark' | 'purple' | 'oceanic' | 'sunset' | 'dark-blue' | 'dark-emerald' | 'dark-rose';

type ThemeStore = {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  setTheme: async (newTheme) => {
    set({ theme: newTheme });
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },
}));

export const initializeTheme = async () => {
  try {
    const savedTheme = await AsyncStorage.getItem('theme');
    if (savedTheme) {
      useThemeStore.getState().setTheme(savedTheme as ThemeColor);
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
};
