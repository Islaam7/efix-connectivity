
import React from 'react';
import { View, Text } from '../lib/rncompat';
import { useThemeStore } from '../lib/theme';

const HomeScreen = () => {
  const { theme } = useThemeStore();
  const isDark = theme.startsWith('dark');

  return (
    <View style={{ 
      flex: 1, 
      padding: 16, 
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000'
    }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Home Screen
      </Text>
      <Text>Welcome to the home screen!</Text>
    </View>
  );
};

export default HomeScreen;
