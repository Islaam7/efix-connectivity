
import React from 'react';
import { View, Text } from '../lib/rncompat';
import { useThemeStore } from '../lib/theme';

const ServicesScreen = () => {
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
        Services Screen
      </Text>
      <Text>Browse available services here.</Text>
    </View>
  );
};

export default ServicesScreen;
