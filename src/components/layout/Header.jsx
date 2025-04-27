import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled 
          ? isDark ? 'bg-[#0a192f] py-3 shadow-md' : 'bg-white py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
      style={{
        backgroundColor: scrolled 
          ? (isDark ? '#0a192f' : 'white') 
          : 'transparent',
        boxShadow: scrolled ? (isDark ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)') : 'none'
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            className="text-2xl font-bold text-teal-400 hover:text-teal-500 transition-colors duration-300"
          >
            My<span className="text-purple-600">Portfolio</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="font-medium transition-colors duration-300 hover:text-teal-400"
                style={{
                  color: isDark ? 'rgb(229, 231, 235)' : 'rgb(31, 41, 55)'
                }}
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none"
              style={{
                color: isDark ? 'white' : '#1a202c'
              }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden shadow-lg animate-slideDown"
          style={{
            backgroundColor: isDark ? '#0a192f' : 'white',
            boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="block py-2 px-4 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-300"
                  style={{
                    color: isDark ? 'white' : '#1a202c',
                    backgroundColor: 'transparent'
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
