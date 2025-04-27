import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { getCurrentTheme } from '../../utils/themeUtils';

const Footer = () => {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  
  // Check for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const theme = getCurrentTheme();
      if (theme !== currentTheme) {
        setCurrentTheme(theme);
      }
    };
    
    const interval = setInterval(checkTheme, 300);
    
    return () => clearInterval(interval);
  }, [currentTheme]);
  
  const isDark = currentTheme === 'dark';
  
  return (
    <footer 
      className="py-12"
      style={{ 
        backgroundColor: isDark ? '#0d1d36' : '#f9fafb' // gray-50 for light mode
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Copyright */}
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-bold text-teal-400 mb-2">
              My<span className="text-purple-600">Portfolio</span>
            </div>
            <p style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a 
              href="https://github.com/aksahu0620" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-colors duration-300"
              style={{ 
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                color: isDark ? '#d1d5db' : '#374151'
              }}
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/aksahu0620" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-colors duration-300"
              style={{ 
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                color: isDark ? '#d1d5db' : '#374151'
              }}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://x.com/aksahu0620" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-colors duration-300"
              style={{ 
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                color: isDark ? '#d1d5db' : '#374151'
              }}
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="mailto:aksahu0620@gmail.com" 
              className="p-2 rounded-full transition-colors duration-300"
              style={{ 
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                color: isDark ? '#d1d5db' : '#374151'
              }}
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div 
          className="mt-8 pt-8 text-center text-sm"
          style={{ 
            borderTopColor: isDark ? '#374151' : '#e5e7eb',
            borderTopWidth: '1px',
            color: isDark ? '#9ca3af' : '#6b7280'
          }}
        >
          <p>Designed and built with React, Tailwind CSS, and ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
