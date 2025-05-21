
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './lib/theme';

// Import web versions of screens
import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import BookingsScreen from './screens/BookingsScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';

// Simple navigation component to replace the React Native tabs
const Navigation = () => {
  const { theme } = useThemeStore();
  const isDark = theme.startsWith('dark');
  
  const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '1rem',
    backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    borderTop: `1px solid ${isDark ? '#333333' : '#e5e5e5'}`,
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100
  };
  
  const linkStyle = {
    color: '#9b87f5',
    textDecoration: 'none'
  };
  
  return (
    <div style={navStyle}>
      <a href="/" style={linkStyle}>Home</a>
      <a href="/services" style={linkStyle}>Services</a>
      <a href="/bookings" style={linkStyle}>Bookings</a>
      <a href="/messages" style={linkStyle}>Messages</a>
      <a href="/profile" style={linkStyle}>Profile</a>
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ paddingBottom: '60px' }}>
      {children}
      <Navigation />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomeScreen /></Layout>} />
        <Route path="/services" element={<Layout><ServicesScreen /></Layout>} />
        <Route path="/bookings" element={<Layout><BookingsScreen /></Layout>} />
        <Route path="/messages" element={<Layout><MessagesScreen /></Layout>} />
        <Route path="/profile" element={<Layout><ProfileScreen /></Layout>} />
      </Routes>
    </Router>
  );
}
