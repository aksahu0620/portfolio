import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${isDark 
        ? 'bg-gray-700 hover:bg-gray-600' 
        : 'bg-gray-100 hover:bg-gray-200'} 
        transition-colors duration-300`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        boxShadow: isDark ? '0 0 5px rgba(255,255,255,0.2)' : '0 0 5px rgba(0,0,0,0.1)'
      }}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-purple-600" />
      )}
    </button>
  );
};

export default ThemeToggle; 