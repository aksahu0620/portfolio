import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCurrentTheme } from '../../utils/themeUtils';

const Button = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const [theme, setTheme] = useState(getCurrentTheme());
  const isDark = theme === 'dark';
  
  // Update theme when it changes
  useEffect(() => {
    const checkTheme = () => {
      const currentTheme = getCurrentTheme();
      if (currentTheme !== theme) {
        setTheme(currentTheme);
      }
    };
    
    // Check initially
    checkTheme();
    
    // Set up interval to periodically check
    const interval = setInterval(checkTheme, 300);
    
    // Setup mutation observer to watch for theme class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' && 
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          checkTheme();
        }
      });
    });
    
    // Start observing the html element for class changes
    observer.observe(document.documentElement, { 
      attributes: true 
    });
    
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [theme]);
  
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const getLightVariant = () => {
    switch (variant) {
      case 'primary':
        return 'bg-teal-400 hover:bg-teal-500 text-gray-900 focus:ring-teal-400';
      case 'secondary':
        return 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-600';
      case 'outline':
        return 'border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900 focus:ring-teal-400';
      default:
        return 'bg-teal-400 hover:bg-teal-500 text-gray-900 focus:ring-teal-400';
    }
  };
  
  const getDarkVariant = () => {
    switch (variant) {
      case 'primary':
        return 'bg-teal-400 hover:bg-teal-500 text-gray-900 focus:ring-teal-400';
      case 'secondary':
        return 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-600';
      case 'outline':
        return 'border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900 focus:ring-teal-400';
      default:
        return 'bg-teal-400 hover:bg-teal-500 text-gray-900 focus:ring-teal-400';
    }
  };
  
  const variantClasses = isDark ? getDarkVariant() : getLightVariant();
  
  const sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };
  
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses[size]} ${widthClasses} ${className}`;
  
  return (
    <button className={buttonClasses} {...props}>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;