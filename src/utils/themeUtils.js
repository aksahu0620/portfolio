/**
 * Directly toggles the theme in both localStorage and DOM
 * This can be used as a backup when the React context isn't working
 */
export const toggleThemeDirectly = () => {
  try {
    // Get the HTML element
    const htmlElement = document.documentElement;
    
    // Check current theme
    const isDark = htmlElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    console.log(`Manual theme toggle: ${isDark ? 'dark → light' : 'light → dark'}`);
    
    // Remove both classes first
    htmlElement.classList.remove('light', 'dark');
    
    // Add the new theme class
    htmlElement.classList.add(newTheme);
    
    // Update localStorage
    localStorage.setItem('theme', newTheme);
    
    // Apply direct styles to force immediate visual feedback
    applyThemeStyles(newTheme);
    
    return newTheme;
  } catch (err) {
    console.error('Error toggling theme directly:', err);
    return null;
  }
};

/**
 * Apply theme styles directly to important elements
 */
export const applyThemeStyles = (theme) => {
  const isDark = theme === 'dark';
  
  // Force body background and text color
  document.body.style.backgroundColor = isDark ? '#0a192f' : 'white';
  document.body.style.color = isDark ? 'white' : '#1a202c';
  
  // Fix header styling in light mode
  const header = document.querySelector('header');
  if (header) {
    if (isDark) {
      header.style.backgroundColor = window.scrollY > 10 ? '#0a192f' : 'transparent';
      header.style.color = 'white';
    } else {
      header.style.backgroundColor = window.scrollY > 10 ? 'white' : 'transparent';
      header.style.color = '#1a202c';
    }
  }
  
  // Fix hero section background
  const heroSection = document.querySelector('#home');
  if (heroSection) {
    if (isDark) {
      heroSection.style.background = 'linear-gradient(to bottom right, #0a192f, #112240)';
    } else {
      heroSection.style.background = 'linear-gradient(to bottom right, #f7fafc, #edf2f7)';
    }
    
    // Fix hero section icons hover effect
    const socialIcons = heroSection.querySelectorAll('a[class*="text-gray"]');
    socialIcons.forEach(icon => {
      icon.style.transition = 'color 0.3s ease';
      icon.onmouseenter = () => {
        icon.style.color = 'rgb(45, 212, 191)'; // teal-400
      };
      
      icon.onmouseleave = () => {
        if (isDark) {
          icon.style.color = 'rgb(209, 213, 219)'; // gray-300
        } else {
          icon.style.color = 'rgb(75, 85, 99)'; // gray-600
        }
      };
    });
  }
  
  // Fix filter buttons in Skills, Projects and other sections
  document.querySelectorAll('button[class*="rounded-full"]').forEach(button => {
    if (button.textContent.includes('All') || 
        button.textContent.includes('Frontend') || 
        button.textContent.includes('Backend') ||
        button.textContent.includes('React') ||
        button.textContent.includes('Node')) {
      
      // Check if this is an active filter
      const isActive = button.classList.contains('bg-teal-400') || 
                      window.getComputedStyle(button).backgroundColor === 'rgb(45, 212, 191)' ||
                      button.style.backgroundColor === 'rgb(45, 212, 191)';
      
      if (isActive) {
        // Active filter styling
        button.style.backgroundColor = 'rgb(45, 212, 191)'; // teal-400
        button.style.color = 'rgb(17, 24, 39)'; // gray-900
      } else {
        // Inactive filter styling
        if (isDark) {
          button.style.backgroundColor = '#112240';
          button.style.color = 'rgb(209, 213, 219)'; // gray-300
        } else {
          button.style.backgroundColor = 'rgb(243, 244, 246)'; // gray-100
          button.style.color = 'rgb(55, 65, 81)'; // gray-700
        }
        
        // Enforce hover effect
        button.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Add hover effect
        button.onmouseenter = () => {
          if (isDark) {
            button.style.backgroundColor = 'rgb(55, 65, 81)'; // gray-700
          } else {
            button.style.backgroundColor = 'rgb(229, 231, 235)'; // gray-200
          }
        };
        
        button.onmouseleave = () => {
          if (!button.classList.contains('active-filter')) {
            if (isDark) {
              button.style.backgroundColor = '#112240';
            } else {
              button.style.backgroundColor = 'rgb(243, 244, 246)'; // gray-100
            }
          }
        };
      }
      
      // Add click handler to mark as active
      button.addEventListener('click', () => {
        // Reset all buttons in this container
        const container = button.closest('div');
        if (container) {
          container.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active-filter');
            if (isDark) {
              btn.style.backgroundColor = '#112240';
              btn.style.color = 'rgb(209, 213, 219)'; // gray-300
            } else {
              btn.style.backgroundColor = 'rgb(243, 244, 246)'; // gray-100
              btn.style.color = 'rgb(55, 65, 81)'; // gray-700
            }
          });
        }
        
        // Mark this button as active
        button.classList.add('active-filter');
        button.style.backgroundColor = 'rgb(45, 212, 191)'; // teal-400
        button.style.color = 'rgb(17, 24, 39)'; // gray-900
      });
    }
  });
  
  // Special case for "All" buttons - they should be active by default
  document.querySelectorAll('button').forEach(button => {
    if (button.textContent.trim() === 'All' && 
        !button.classList.contains('active-filter') && 
        !button.style.backgroundColor) {
      button.classList.add('active-filter');
      button.style.backgroundColor = 'rgb(45, 212, 191)'; // teal-400
      button.style.color = 'rgb(17, 24, 39)'; // gray-900
    }
  });
  
  // Fix icons in light mode
  document.querySelectorAll('svg').forEach(icon => {
    // Skip icons in the theme toggle component
    if (icon.parentElement && 
       (icon.parentElement.classList.contains('w-5') || 
        icon.parentElement.classList.contains('hover:text-teal-400'))) {
      
      // For icons in social links and other places
      if (!isDark && 
          icon.parentElement.classList.contains('transition-colors') && 
          !icon.parentElement.style.color) {
        icon.parentElement.style.color = 'rgb(75, 85, 99)'; // gray-600
      }
    }
  });
  
  // Fix footer icons in light mode
  document.querySelectorAll('footer a[class*="rounded-full"]').forEach(link => {
    if (isDark) {
      link.style.backgroundColor = 'rgb(55, 65, 81)'; // gray-700
      link.style.color = 'rgb(209, 213, 219)'; // gray-300
    } else {
      link.style.backgroundColor = 'rgb(243, 244, 246)'; // gray-100 - lighter background
      link.style.color = 'rgb(55, 65, 81)'; // gray-700
    }
    
    // Add hover effect
    link.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    link.onmouseenter = () => {
      link.style.backgroundColor = 'rgb(45, 212, 191)'; // teal-400
      link.style.color = 'white';
    };
    
    link.onmouseleave = () => {
      if (isDark) {
        link.style.backgroundColor = 'rgb(55, 65, 81)'; // gray-700
        link.style.color = 'rgb(209, 213, 219)'; // gray-300
      } else {
        link.style.backgroundColor = 'rgb(243, 244, 246)'; // gray-100
        link.style.color = 'rgb(55, 65, 81)'; // gray-700
      }
    };
  });
  
  // Fix Get In Touch section - contact info icons
  document.querySelectorAll('.p-2.bg-teal-400.bg-opacity-20').forEach(iconContainer => {
    // Make sure teal icons are visible in both modes
    iconContainer.style.backgroundColor = 'rgba(45, 212, 191, 0.2)';
    
    const icon = iconContainer.querySelector('svg');
    if (icon) {
      icon.style.color = 'rgb(45, 212, 191)'; // teal-400
    }
  });
  
  // Fix buttons
  document.querySelectorAll('button').forEach(button => {
    // Only modify buttons that don't have special styling already
    if (button.classList.contains('bg-teal-400') || 
        button.classList.contains('hover:bg-teal-500') ||
        button.classList.contains('border-teal-400')) {
      // Keep the teal styling for buttons
    } else if (!button.classList.contains('p-2')) { // Exclude theme toggle button
      if (isDark) {
        button.style.color = 'white';
        button.style.backgroundColor = 'transparent';
      } else {
        button.style.color = '#1a202c';
        button.style.backgroundColor = 'transparent';
      }
    }
  });
  
  // Fix navigation menu items
  document.querySelectorAll('nav a').forEach(link => {
    if (isDark) {
      link.style.color = 'rgb(229, 231, 235)';
    } else {
      link.style.color = 'rgb(31, 41, 55)';
    }
    
    // Make sure hover state is preserved
    link.style.transition = 'color 0.3s ease';
    link.onmouseenter = () => {
      link.style.color = 'rgb(45, 212, 191)'; // teal-400
    };
    
    link.onmouseleave = () => {
      if (isDark) {
        link.style.color = 'rgb(229, 231, 235)';
      } else {
        link.style.color = 'rgb(31, 41, 55)';
      }
    };
  });
  
  // Target major containers and apply theme styles
  document.querySelectorAll('.bg-white, [class*="bg-"]').forEach(el => {
    // Skip elements with specific backgrounds we want to preserve
    if (el.classList.contains('bg-teal-400') || 
        el.classList.contains('bg-purple-600') ||
        el.classList.contains('hover:bg-teal-500') ||
        el.classList.contains('hover:bg-teal-400')) {
      return;
    }
    
    if (isDark) {
      el.style.backgroundColor = el.classList.contains('bg-transparent') ? 'transparent' : '#0a192f';
    } else {
      el.style.backgroundColor = el.classList.contains('bg-transparent') ? 'transparent' : 'white';
    }
  });
  
  // Fix text colors for specific elements
  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
    if (isDark) {
      heading.style.color = 'white';
    } else {
      heading.style.color = '#1a202c';
    }
  });
  
  document.querySelectorAll('p').forEach(paragraph => {
    if (isDark) {
      paragraph.style.color = 'rgb(156, 163, 175)'; // gray-400
    } else {
      paragraph.style.color = 'rgb(75, 85, 99)'; // gray-600
    }
  });
  
  // Fix mobile menu
  const mobileMenu = document.querySelector('.md\\:hidden.bg-white');
  if (mobileMenu) {
    if (isDark) {
      mobileMenu.style.backgroundColor = '#0a192f';
    } else {
      mobileMenu.style.backgroundColor = 'white';
    }
  }
  
  // Fix filter buttons if they exist
  document.querySelectorAll('[role="tab"]').forEach(tab => {
    if (isDark) {
      tab.style.backgroundColor = tab.classList.contains('active') ? '#1e3a8a' : 'transparent';
      tab.style.color = 'white';
    } else {
      tab.style.backgroundColor = tab.classList.contains('active') ? '#e5e7eb' : 'transparent';
      tab.style.color = '#1a202c';
    }
  });
  
  // Handle shadow elements 
  document.querySelectorAll('[class*="shadow"]').forEach(el => {
    el.style.boxShadow = isDark ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)';
  });
  
  console.log(`Direct styles applied for ${theme} theme`);
};

/**
 * Set a specific theme directly in both localStorage and DOM
 */
export const setThemeDirectly = (theme) => {
  if (theme !== 'dark' && theme !== 'light') {
    console.error('Invalid theme value. Must be "dark" or "light"');
    return;
  }
  
  try {
    // Get the HTML element
    const htmlElement = document.documentElement;
    
    // Remove both classes first
    htmlElement.classList.remove('light', 'dark');
    
    // Add the specified theme class
    htmlElement.classList.add(theme);
    
    // Update localStorage
    localStorage.setItem('theme', theme);
    
    // Apply direct styles
    applyThemeStyles(theme);
    
    console.log(`Theme set directly to: ${theme}`);
  } catch (err) {
    console.error('Error setting theme directly:', err);
  }
};

/**
 * Get the current theme from the DOM
 */
export const getCurrentTheme = () => {
  try {
    const htmlElement = document.documentElement;
    return htmlElement.classList.contains('dark') ? 'dark' : 'light';
  } catch (err) {
    console.error('Error getting current theme:', err);
    return 'light'; // Default fallback
  }
};

/**
 * Initialize theme on page load
 * This should be called as early as possible in your app
 */
export const initializeTheme = () => {
  try {
    // Check if there's a theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Check for system preference if no saved theme
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine which theme to use
    const themeToUse = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply the theme
    setThemeDirectly(themeToUse);
    
    console.log(`Theme initialized to: ${themeToUse}`);
    
    // Return the theme that was applied
    return themeToUse;
  } catch (err) {
    console.error('Error initializing theme:', err);
    return 'light'; // Safe fallback
  }
}; 