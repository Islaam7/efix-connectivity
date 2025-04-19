
import { useThemeStore, themeColors } from '../constants/theme';
import { useColorScheme } from 'react-native';

export const useAppTheme = () => {
  const { theme, setTheme } = useThemeStore();
  const systemColorScheme = useColorScheme();
  const colors = themeColors[theme];

  const isDark = theme.startsWith('dark') || 
    (theme === 'system' && systemColorScheme === 'dark');

  return {
    theme,
    setTheme,
    colors,
    isDark,
  };
};
