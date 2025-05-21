
import React from 'react';
import { View, Text } from '../lib/rncompat';
import { useThemeStore } from '../lib/theme';

const MessagesScreen = () => {
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
        Messages Screen
      </Text>
      <Text>Your messages will appear here.</Text>
    </View>
  );
};

export default MessagesScreen;
