import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { applyThemeStyles, setThemeDirectly } from '../utils/themeUtils';

// Create the theme context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Function to get stored theme or set default
const getStoredTheme = () => {
  try {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light'; // Default fallback
  } catch (err) {
    console.error('Error reading theme from localStorage:', err);
    return 'light'; // Safe fallback
  }
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Initialize with the saved theme from localStorage
  const [theme, setTheme] = useState(getStoredTheme());
  
  // On mount, apply the theme immediately
  useEffect(() => {
    try {
      // Apply theme immediately to prevent flash
      const htmlElement = document.documentElement;
      
      // Remove both classes first
      htmlElement.classList.remove('light', 'dark');
      
      // Add the current theme class
      htmlElement.classList.add(theme);
      
      // Apply theme styles
      applyThemeStyles(theme);
      
      // Save to localStorage for persistence
      localStorage.setItem('theme', theme);
      
      console.log(`Theme initialized to: ${theme}`);
    } catch (err) {
      console.error('Error applying initial theme:', err);
    }
  }, []);
  
  // Update the DOM and localStorage when theme changes
  useEffect(() => {
    try {
      // Use setThemeDirectly to handle all DOM updates and localStorage
      setThemeDirectly(theme);
      
      console.log('Theme updated to:', theme);
    } catch (err) {
      console.error('Error applying theme:', err);
    }
  }, [theme]);
  
  // Toggle the theme
  const toggleTheme = () => {
    console.log('Toggling theme from', theme);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Value to provide to consumers
  const value = { theme, toggleTheme };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export both the Provider and the Context
export default ThemeContext;