import React, { useState } from 'react';
import { skills, SkillCategory } from '../../data/skills';
import SectionTitle from '../ui/SectionTitle';
import { Code, Server, Cloud, TestTube } from 'lucide-react';
import PropTypes from 'prop-types';

const categoryIcons = {
  [SkillCategory.FRONTEND]: <Code className="w-6 h-6" />,
  [SkillCategory.BACKEND]: <Server className="w-6 h-6" />,
  [SkillCategory.DEVOPS]: <Cloud className="w-6 h-6" />,
  [SkillCategory.TESTING]: <TestTube className="w-6 h-6" />,
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);
  
  const categories = ['All', ...Object.values(SkillCategory)];
  
  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-[#0d1d36]">
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
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-teal-400 text-gray-900'
                  : 'bg-white dark:bg-[#112240] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
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
              className="bg-white dark:bg-[#112240] rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-400 bg-opacity-20 flex items-center justify-center text-teal-400 mr-3">
                  {skill.category in categoryIcons ? categoryIcons[skill.category] : null}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {skill.name}
                </h3>
              </div>
              
              <div className="mb-2 flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{skill.category}</span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-teal-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-12 p-6 bg-white dark:bg-[#112240] rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Beyond Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                Soft Skills
              </h4>
              <ul className="space-y-2">
                {['Problem Solving', 'Teamwork', 'Communication', 'Time Management', 'Adaptability'].map((skill) => (
                  <li key={skill} className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="mr-2 text-teal-400">•</span> {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                Languages
              </h4>
              <ul className="space-y-2">
                {[
                  { lang: 'Hindi', level: 'Native' },
                  { lang: 'English', level: 'Fluent' },
                ].map((item) => (
                  <li key={item.lang} className="flex items-center justify-between text-gray-600 dark:text-gray-400">
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