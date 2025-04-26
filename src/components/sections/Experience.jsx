import React from 'react';
import SectionTitle from '../ui/SectionTitle';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-100 dark:bg-[#0d1d36]">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle
          title="Education & Certifications"
          subtitle="My academic and professional learning journey"
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white dark:bg-[#112240] p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              MCA (MASTER IN COMPUTER APPLICATIONS)
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Maulana Azad National Intitute Of Technology Bhopal M.P. • 2026 - 2023
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Specialized in computer application with web development and software engineering.
            </p>
          </div>

          <div className="bg-white dark:bg-[#112240] p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              BSc in Computer Science
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Guru Ghasidas Vishwavidyalaya Bilasput C.G. • 2021 - 2018
            </p>
            <p className="text-gray-600 dark:text-gray-400">
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
