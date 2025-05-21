
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: [
        'react-native-svg',
        'react-native',
        '@react-navigation/native',
        '@react-navigation/native-stack',
        '@react-navigation/bottom-tabs',
        'react-native-safe-area-context',
        'expo-status-bar',
        'expo-router',
        '@react-native-async-storage/async-storage'
      ]
    }
  }
}));
