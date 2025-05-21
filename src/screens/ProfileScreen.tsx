
import React from 'react';
import { View, Text } from '../lib/rncompat';
import { useThemeStore } from '../lib/theme';

const ProfileScreen = () => {
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
        Profile Screen
      </Text>
      <Text>Your profile information will appear here.</Text>
      <View style={{ marginTop: 20 }}>
        <Text 
          style={{ 
            color: '#9b87f5', 
            fontWeight: 'bold', 
            cursor: 'pointer' 
          }}
          onClick={() => alert('Theme settings would open here')}
        >
          Change Theme
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
