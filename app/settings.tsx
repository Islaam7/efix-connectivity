
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from "expo-router";
import ThemeSelector from '../components/ThemeSelector';
import { useThemeStore, themeColors } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { theme } = useThemeStore();
  const colors = themeColors[theme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }} 
      />
      <View style={styles.content}>
        <ThemeSelector />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});
