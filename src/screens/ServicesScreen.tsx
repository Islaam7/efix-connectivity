
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../lib/theme';

const ServicesScreen = () => {
  const { theme } = useThemeStore();
  const isDark = theme.startsWith('dark');

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }
    ]}>
      <Text style={[
        styles.title,
        { color: isDark ? '#ffffff' : '#000000' }
      ]}>
        Services
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ServicesScreen;
