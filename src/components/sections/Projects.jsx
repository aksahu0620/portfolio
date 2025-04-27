import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../../data/projects';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Github, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Teal color constants
const TEAL_BG = 'rgb(45, 212, 191)'; // teal-400
const ACTIVE_TEXT = 'rgb(17, 24, 39)'; // gray-900

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(4);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const filterButtonsRef = useRef({});
  
  // Apply theme styles to all project cards
  useEffect(() => {
    // Function to apply styles to project cards
    const applyCardStyles = () => {
      document.querySelectorAll('.project-card').forEach(card => {
        // Card background
        const cardInner = card.querySelector('.card-inner');
        if (cardInner) {
          cardInner.style.backgroundColor = isDark ? '#112240' : 'white';
          cardInner.style.boxShadow = isDark 
            ? '0 4px 6px rgba(0, 0, 0, 0.5)' 
            : '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
        
        // Card title
        const cardTitle = card.querySelector('.card-title');
        if (cardTitle) {
          cardTitle.style.color = isDark ? 'white' : '#1a202c';
        }
        
        // Card description
        const cardDesc = card.querySelector('.card-desc');
        if (cardDesc) {
          cardDesc.style.color = isDark ? '#9ca3af' : '#4b5563';
        }
        
        // Tech tags
        card.querySelectorAll('.tech-tag').forEach(tag => {
          tag.style.backgroundColor = isDark ? '#374151' : '#f3f4f6';
          tag.style.color = isDark ? '#d1d5db' : '#4b5563';
        });
      });
    };
    
    // Apply theme to project links
    const applyLinkStyles = () => {
      document.querySelectorAll('.project-link').forEach(link => {
        // Set base color
        link.style.color = isDark ? '#d1d5db' : '#4b5563';
        link.style.transition = 'color 0.3s ease';
        
        // Remove existing listeners to prevent duplicates
        const oldEnter = link._mouseenterHandler;
        const oldLeave = link._mouseleaveHandler;
        
        if (oldEnter) link.removeEventListener('mouseenter', oldEnter);
        if (oldLeave) link.removeEventListener('mouseleave', oldLeave);
        
        // Create new handlers and store references
        link._mouseenterHandler = () => { link.style.color = TEAL_BG; };
        link._mouseleaveHandler = () => { link.style.color = isDark ? '#d1d5db' : '#4b5563'; };
        
        // Add new listeners
        link.addEventListener('mouseenter', link._mouseenterHandler);
        link.addEventListener('mouseleave', link._mouseleaveHandler);
      });
    };
    
    // Run styling with multiple attempts to ensure it catches any new DOM elements
    const applyAllStyles = () => {
      applyCardStyles();
      applyLinkStyles();
    };
    
    // Apply styling immediately
    applyAllStyles();
    
    // And also after a short delay to catch any elements added by React
    const timers = [
      setTimeout(applyAllStyles, 50),
      setTimeout(applyAllStyles, 150),
      setTimeout(applyAllStyles, 300)
    ];
    
    // Add a mutation observer to detect DOM changes and apply styles
    const observer = new MutationObserver((mutations) => {
      let shouldApplyStyles = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldApplyStyles = true;
        }
      });
      
      if (shouldApplyStyles) {
        applyAllStyles();
      }
    });
    
    // Start observing the projects container
    const projectsContainer = document.querySelector('.grid');
    if (projectsContainer) {
      observer.observe(projectsContainer, { 
        childList: true,
        subtree: true 
      });
    }
    
    // Clean up when unmounting or theme changes
    return () => {
      // Clear timers
      timers.forEach(timer => clearTimeout(timer));
      
      // Disconnect observer
      observer.disconnect();
      
      // Remove event listeners
      document.querySelectorAll('.project-link').forEach(link => {
        if (link._mouseenterHandler) link.removeEventListener('mouseenter', link._mouseenterHandler);
        if (link._mouseleaveHandler) link.removeEventListener('mouseleave', link._mouseleaveHandler);
      });
    };
  }, [isDark, activeFilter, visibleCount]); // Re-run when filters, visible count, or theme changes
  
  // Apply styles to all buttons initially and when theme/activeFilter changes
  useEffect(() => {
    const setupFilterButtons = () => {
      const buttons = document.querySelectorAll('.project-filter-btn');
      
      buttons.forEach(button => {
        const tech = button.textContent;
        filterButtonsRef.current[tech] = button;
        
        // Remove existing listeners to prevent duplicates
        const oldEnter = button._mouseenterHandler;
        const oldLeave = button._mouseleaveHandler;
        
        if (oldEnter) button.removeEventListener('mouseenter', oldEnter);
        if (oldLeave) button.removeEventListener('mouseleave', oldLeave);
        
        // Apply appropriate styling
        if (tech === activeFilter) {
          // Active button gets teal background
          button.style.backgroundColor = TEAL_BG;
          button.style.color = ACTIVE_TEXT;
          button.classList.add('active-filter');
        } else {
          // Inactive buttons get theme-appropriate colors
          button.style.backgroundColor = isDark ? '#112240' : 'rgb(243, 244, 246)';
          button.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)';
          button.classList.remove('active-filter');
          
          // Create and store new handlers
          button._mouseenterHandler = () => {
            if (!button.classList.contains('active-filter')) {
              button.style.backgroundColor = isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)';
            }
          };
          
          button._mouseleaveHandler = () => {
            if (!button.classList.contains('active-filter')) {
              button.style.backgroundColor = isDark ? '#112240' : 'rgb(243, 244, 246)';
            }
          };
          
          // Add hover effects with the new handlers
          button.addEventListener('mouseenter', button._mouseenterHandler);
          button.addEventListener('mouseleave', button._mouseleaveHandler);
        }
      });
    };
    
    // Run setup on mount and when dependencies change
    setupFilterButtons();
    
    // Clean up event listeners on unmount
    return () => {
      Object.values(filterButtonsRef.current).forEach(button => {
        if (button) {
          if (button._mouseenterHandler) button.removeEventListener('mouseenter', button._mouseenterHandler);
          if (button._mouseleaveHandler) button.removeEventListener('mouseleave', button._mouseleaveHandler);
        }
      });
    };
  }, [activeFilter, isDark]);
  
  const handleFilterClick = (tech) => {
    if (tech === activeFilter) return;
    
    // Update the DOM immediately for a responsive feel
    Object.entries(filterButtonsRef.current).forEach(([buttonTech, button]) => {
      if (buttonTech === tech) {
        // New active button
        button.style.backgroundColor = TEAL_BG;
        button.style.color = ACTIVE_TEXT;
        button.classList.add('active-filter');
        
        // Remove hover listeners from active button
        if (button._mouseenterHandler) button.removeEventListener('mouseenter', button._mouseenterHandler);
        if (button._mouseleaveHandler) button.removeEventListener('mouseleave', button._mouseleaveHandler);
      } else {
        // All other buttons
        button.style.backgroundColor = isDark ? '#112240' : 'rgb(243, 244, 246)';
        button.style.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)';
        button.classList.remove('active-filter');
        
        // Make sure hover events are attached
        if (!button._mouseenterHandler) {
          button._mouseenterHandler = () => {
            if (!button.classList.contains('active-filter')) {
              button.style.backgroundColor = isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)';
            }
          };
          button.addEventListener('mouseenter', button._mouseenterHandler);
        }
        
        if (!button._mouseleaveHandler) {
          button._mouseleaveHandler = () => {
            if (!button.classList.contains('active-filter')) {
              button.style.backgroundColor = isDark ? '#112240' : 'rgb(243, 244, 246)';
            }
          };
          button.addEventListener('mouseleave', button._mouseleaveHandler);
        }
      }
    });
    
    // Update state and reset visible count when changing filters
    setActiveFilter(tech);
    setVisibleCount(4); // Reset to initial count when changing filters
  };
  
  // Get unique technologies across all projects
  const allTechnologies = ['All', ...new Set(projects.flatMap(project => project.technologies))];
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.technologies.includes(activeFilter));
  
  // Visible projects based on count
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };
  
  return (
    <section 
      id="projects" 
      className="py-20"
      style={{ 
        backgroundColor: isDark ? '#0a192f' : 'white'
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle 
          title="My Projects" 
          subtitle="A selection of my recent work and personal projects"
          align="center"
        />
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => handleFilterClick(tech)}
              className={`project-filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                tech === activeFilter ? 'active-filter' : ''
              }`}
              style={{
                transition: 'background-color 0.3s ease, color 0.3s ease',
                backgroundColor: tech === activeFilter 
                  ? TEAL_BG 
                  : (isDark ? '#112240' : 'rgb(243, 244, 246)'),
                color: tech === activeFilter 
                  ? ACTIVE_TEXT 
                  : (isDark ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)')
              }}
            >
              {tech}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <Card key={project.id} hoverable className="flex flex-col h-full project-card">
              <div className="relative overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                {project.featured && (
                  <span className="absolute top-3 right-3 bg-teal-400 text-gray-900 text-xs font-medium px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow card-inner">
                <h3 
                  className="text-xl font-bold mb-2 card-title"
                  style={{ color: isDark ? 'white' : '#1a202c' }}
                >
                  {project.title}
                </h3>
                
                <p 
                  className="mb-4 flex-grow card-desc"
                  style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
                >
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs px-2 py-1 rounded-full tech-tag"
                      style={{
                        backgroundColor: isDark ? '#374151' : '#f3f4f6',
                        color: isDark ? '#d1d5db' : '#4b5563'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.githubLink} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link flex items-center"
                  >
                    <Github size={18} className="mr-1" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a 
                    href={project.demoLink} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link flex items-center"
                  >
                    <ExternalLink size={18} className="mr-1" />
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              onClick={handleLoadMore}
            >
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
