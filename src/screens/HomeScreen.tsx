
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../lib/theme';

const HomeScreen = () => {
  const { theme } = useThemeStore();
  const isDark = theme.startsWith('dark');

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }
    ]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={[
            styles.title,
            { color: isDark ? '#ffffff' : '#000000' }
          ]}>
            Hi there! 👋
          </Text>
          <Text style={[
            styles.subtitle,
            { color: isDark ? '#888888' : '#666666' }
          ]}>
            Welcome to eFix
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});

export default HomeScreen;
