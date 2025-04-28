import React from 'react';
import SectionTitle from '../ui/SectionTitle';

const About = () => {
  return (
    <section id="about" className="py-12 bg-white dark:bg-[#0a192f]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="About Me"
          subtitle="Get to know more about me and my journey as a developer."
        />

        <div className="grid md:grid-cols-2 gap-4 items-center mt-6">
          {/* Image with background effect */}
          <div className="relative w-full max-w-lg mx-auto md:mx-0">
            {/* Colored background */}
            <div 
              className="absolute rounded-md bg-purple-600" 
              style={{ 
                top: '12px', 
                left: '12px', 
                width: 'calc(100% - 12px)', 
                height: 'calc(100% - 12px)', 
                zIndex: 0 
              }}
            ></div>
            
            {/* Main image */}
            <div 
              className="relative rounded-md overflow-hidden border-2 border-teal-200 z-10"
              style={{ aspectRatio: '1/1' }}
            >
              <img
                src="/akshay.jpg"
                alt="Akshay Kumar Sahu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="animate-slideUp">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-3">
              Full Stack Developer | MCA Final Year Student | Ready for Internship or Job Opportunities
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
              I'm a passionate Full Stack Developer currently in my final year of MCA, with extensive experience building applications using the MERN stack (MongoDB, Express, React, and Node.js). My journey in web development began with a keen interest in frontend technologies, and since then, I've honed my skills to become proficient in both frontend and backend development.
            </p>

            <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
              Throughout my academic journey and personal projects, I've built several applications that focus on creating robust, scalable, and user-friendly solutions. I'm always striving to learn and grow, and I'm excited to apply my skills in a professional setting as I explore job or internship opportunities.
            </p>

            <div className="mb-3">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                Key Focus Areas:
              </h4>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                {[
                  'React', 'Node.js', 'MongoDB', 'MySQL', 'Express', 'RESTful APIs', 'Responsive Design'
                ].map((skill) => (
                  <li key={skill} className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="mr-1 text-teal-400">•</span> {skill}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              When I'm not coding, you'll find me exploring new technologies, experimenting with creative projects, or engaging in activities like hiking and cooking. I'm also passionate about contributing to open-source communities and improving the web development ecosystem.
            </p>
            
            {/* Resume Button */}
            <a 
              href="/akshay_resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900 transition-colors duration-300 rounded font-medium"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              View Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
