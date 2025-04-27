import React, { useState, useEffect, useRef } from 'react';
import { skills, SkillCategory } from '../../data/skills';
import SectionTitle from '../ui/SectionTitle';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';

// Define category icons with custom SVG paths for maximum visibility
const categoryIcons = {
  [SkillCategory.FRONTEND]: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  [SkillCategory.BACKEND]: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  ),
  [SkillCategory.DEVOPS]: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
    </svg>
  ),
  [SkillCategory.TESTING]: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2h6"></path>
      <path d="M12 14v7"></path>
      <path d="M8 4l.755.7a9 9 0 0 1 6.5 8.3H8V4z"></path>
    </svg>
  ),
};

// Teal color constants
const TEAL_BG = 'rgb(45, 212, 191)'; // teal-400
const ACTIVE_TEXT = 'rgb(17, 24, 39)'; // gray-900

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const filterButtonsRef = useRef({});
  
  // Apply styles to all buttons initially and when theme/activeCategory changes
  useEffect(() => {
    const setupFilterButtons = () => {
      const buttons = document.querySelectorAll('.skill-filter-btn');
      
      buttons.forEach(button => {
        const category = button.textContent;
        filterButtonsRef.current[category] = button;
        
        // Apply appropriate styling
        if (category === activeCategory) {
          // Active button gets teal background
          button.style.backgroundColor = TEAL_BG;
          button.style.color = ACTIVE_TEXT;
          button.classList.add('active-filter');
        } else {
          // Inactive buttons get theme-appropriate colors
          button.style.backgroundColor = isDark ? '#112240' : 'rgb(243, 244, 246)';
          button.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)';
          button.classList.remove('active-filter');
          
          // Add hover effects
          button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('active-filter')) {
              button.style.backgroundColor = isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)';
            }
          });
          
          button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('active-filter')) {
              button.style.backgroundColor = isDark ? '#112240' : 'rgb(243, 244, 246)';
            }
          });
        }
      });
    };
    
    // Run setup on mount and when dependencies change
    setupFilterButtons();
    
    // Clean up event listeners on unmount
    return () => {
      Object.values(filterButtonsRef.current).forEach(button => {
        if (button) {
          button.removeEventListener('mouseenter', () => {});
          button.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, [activeCategory, isDark]);
  
  const handleCategoryClick = (category) => {
    if (category === activeCategory) return;
    
    // Update the DOM immediately for a responsive feel
    Object.entries(filterButtonsRef.current).forEach(([buttonCategory, button]) => {
      if (buttonCategory === category) {
        // New active button
        button.style.backgroundColor = TEAL_BG;
        button.style.color = ACTIVE_TEXT;
        button.classList.add('active-filter');
      } else {
        // All other buttons
        button.style.backgroundColor = isDark ? '#112240' : 'rgb(243, 244, 246)';
        button.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)';
        button.classList.remove('active-filter');
      }
    });
    
    // Update state
    setActiveCategory(category);
  };
  
  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);
  
  const categories = ['All', ...Object.values(SkillCategory)];
  
  return (
    <section 
      id="skills" 
      style={{ 
        backgroundColor: isDark ? '#0d1d36' : '#f3f4f6' // gray-100 for light mode
      }}
      className="py-20"
    >
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle 
          title="Skills & Expertise" 
          subtitle="My technical skills and areas of expertise"
          align="center"
        />
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`skill-filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                category === activeCategory ? 'active-filter' : ''
              }`}
              style={{
                transition: 'background-color 0.3s ease, color 0.3s ease',
                backgroundColor: category === activeCategory 
                  ? TEAL_BG 
                  : (isDark ? '#112240' : 'rgb(243, 244, 246)'),
                color: category === activeCategory 
                  ? ACTIVE_TEXT 
                  : (isDark ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)')
              }}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div 
              key={skill.name}
              className="rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{
                backgroundColor: isDark ? '#112240' : 'white',
                boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-400 bg-opacity-70 flex items-center justify-center mr-3">
                  {skill.category in categoryIcons ? categoryIcons[skill.category] : null}
                </div>
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: isDark ? 'white' : '#1a202c' }}
                >
                  {skill.name}
                </h3>
              </div>
              
              <div className="mb-2 flex justify-between items-center">
                <span 
                  className="text-sm"
                  style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
                >
                  {skill.level}%
                </span>
                <span 
                  className="text-sm"
                  style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
                >
                  {skill.category}
                </span>
              </div>
              
              <div 
                className="w-full rounded-full h-2.5"
                style={{ backgroundColor: isDark ? '#374151' : '#e5e7eb' }}
              >
                <div 
                  className="bg-teal-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div 
          className="mt-12 p-6 rounded-lg shadow-md"
          style={{
            backgroundColor: isDark ? '#112240' : 'white',
            boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h3 
            className="text-xl font-semibold mb-4"
            style={{ color: isDark ? 'white' : '#1a202c' }}
          >
            Beyond Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 
                className="text-lg font-medium mb-2"
                style={{ color: isDark ? 'white' : '#1a202c' }}
              >
                Soft Skills
              </h4>
              <ul className="space-y-2">
                {['Problem Solving', 'Teamwork', 'Communication', 'Time Management', 'Adaptability'].map((skill) => (
                  <li 
                    key={skill} 
                    className="flex items-center"
                    style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
                  >
                    <span className="mr-2 text-teal-400">•</span> {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 
                className="text-lg font-medium mb-2"
                style={{ color: isDark ? 'white' : '#1a202c' }}
              >
                Languages
              </h4>
              <ul className="space-y-2">
                {[
                  { lang: 'Hindi', level: 'Native' },
                  { lang: 'English', level: 'Fluent' },
                ].map((item) => (
                  <li 
                    key={item.lang} 
                    className="flex items-center justify-between"
                    style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
                  >
                    <span>{item.lang}</span>
                    <span className="text-sm text-teal-400">{item.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Skills.propTypes = {
  // Add any props if needed
};

export default Skills;