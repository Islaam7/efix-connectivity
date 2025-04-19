
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeStore, ThemeColor, themeColors } from '../constants/theme';

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  const themeOptions: { value: ThemeColor; label: string }[] = [
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
    { value: 'purple', label: 'Purple Theme' },
    { value: 'oceanic', label: 'Oceanic Theme' },
    { value: 'sunset', label: 'Sunset Theme' },
    { value: 'dark-blue', label: 'Dark Blue' },
    { value: 'dark-emerald', label: 'Dark Emerald' },
    { value: 'dark-rose', label: 'Dark Rose' },
    { value: 'system', label: 'System Default' },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColors[theme].text }]}>
        Theme Settings
      </Text>
      <View style={styles.optionsContainer}>
        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.themeButton,
              {
                backgroundColor: themeColors[option.value].background,
                borderColor: themeColors[option.value].border || themeColors[option.value].secondary,
                borderWidth: theme === option.value ? 2 : 1,
              },
            ]}
            onPress={() => setTheme(option.value)}
          >
            <Text
              style={[
                styles.buttonText,
                { color: themeColors[option.value].text },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  themeButton: {
    padding: 12,
    borderRadius: 8,
    minWidth: 150,
    marginBottom: 8,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ThemeSelector;
