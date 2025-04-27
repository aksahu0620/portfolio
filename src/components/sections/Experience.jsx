import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { useTheme } from '../../context/ThemeContext';

const Experience = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="experience" className={`py-20 ${isDark ? 'bg-[#0d1d36]' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle
          title="Education & Certifications"
          subtitle="My academic and professional learning journey"
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-[#112240]' : 'bg-white'}`}>
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-teal-400 bg-opacity-70 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v6"></path>
                  <path d="M18 12v6"></path>
                  <path d="M12 19v-9"></path>
                </svg>
              </div>
              <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                MCA (MASTER IN COMPUTER APPLICATIONS)
              </h4>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              Maulana Azad National Intitute Of Technology Bhopal M.P. • 2026 - 2023
            </p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Specialized in computer application with web development and software engineering.
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-[#112240]' : 'bg-white'}`}>
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-teal-400 bg-opacity-70 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                  <path d="M12 6v8"></path>
                  <path d="M9 10h6"></path>
                </svg>
              </div>
              <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                BSc in Computer Science
              </h4>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              Guru Ghasidas Vishwavidyalaya Bilasput C.G. • 2021 - 2018
            </p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Graduated with honors. Specialized in web development and software engineering.
            </p>
          </div>

          {/* <div className="bg-white dark:bg-[#112240] p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              AWS Certified Developer
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Amazon Web Services • 2021
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Expertise in developing, deploying, and debugging cloud-based applications using AWS.
            </p>
          </div> */}

          {/* <div className="bg-white dark:bg-[#112240] p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              MongoDB Certified Developer
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              MongoDB Inc. • 2020
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced knowledge of MongoDB database design, queries, and optimization.
            </p>
          </div> */}

          {/* <div className="bg-white dark:bg-[#112240] p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              React Developer Certification
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Frontend Masters • 2019
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced React patterns, performance optimization, and state management.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Experience;
