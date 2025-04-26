import React from 'react';
import SectionTitle from '../ui/SectionTitle';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-[#0a192f]">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle
          title="About Me"
          subtitle="Get to know more about me and my journey as a developer."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative max-w-150 max-h-150 animate-fadeIn">
            <div className="aspect-square rounded-md overflow-hidden border-2 border-teal-200 relative z-10">
              <img
                src="/akshay.jpg"
                alt="Akshay Kumar Sahu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 w-full h-full bg-purple-600 rounded-md -z-10"></div>
          </div>

          {/* Content */}
          <div className="animate-slideUp">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Full Stack Developer | MCA Final Year Student | Ready for Internship or Job Opportunities
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              I’m a passionate Full Stack Developer currently in my final year of MCA, with extensive experience building applications using the MERN stack (MongoDB, Express, React, and Node.js). My journey in web development began with a keen interest in frontend technologies, and since then, I've honed my skills to become proficient in both frontend and backend development.
            </p>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Throughout my academic journey and personal projects, I've built several applications that focus on creating robust, scalable, and user-friendly solutions. I'm always striving to learn and grow, and I'm excited to apply my skills in a professional setting as I explore job or internship opportunities.
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Key Focus Areas:
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {[
                  'React', 'Node.js', 'MongoDB', 'MySQL', 'Express',
                  'TypeScript', 'RESTful APIs', 'Responsive Design'
                ].map((skill) => (
                  <li key={skill} className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="mr-2 text-teal-400">•</span> {skill}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, experimenting with creative projects, or engaging in activities like hiking and cooking. I'm also passionate about contributing to open-source communities and improving the web development ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
