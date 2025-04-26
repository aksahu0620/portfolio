import React, { useState, useEffect } from 'react';
import { ArrowDownCircle, Github, Linkedin } from 'lucide-react';
import Button from '../ui/Button';

const Hero = () => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = 'Full Stack Developer';
  
  useEffect(() => {
    let currentIndex = 0;
    let interval;
    
    if (isTyping) {
      interval = setInterval(() => {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        
        if (currentIndex === fullText.length) {
          clearInterval(interval);
          setTimeout(() => setIsTyping(false), 1000);
        }
      }, 100); 
    } else {
      interval = setInterval(() => {
        setText(fullText.slice(0, currentIndex));
        currentIndex--;
        
        if (currentIndex === 0) {
          clearInterval(interval);
          setTimeout(() => setIsTyping(true), 300);
        }
      }, 50);
    }
    
    return () => clearInterval(interval);
  }, [isTyping]);
  
  const scrollToNextSection = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-16 pb-12 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0a192f] dark:to-[#112240] z-0"></div>
      
      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-teal-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-600 rounded-full filter blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="mb-6 inline-block">
            <span className="inline-block py-1 px-3 text-sm font-medium text-teal-400 dark:text-teal-400 border border-teal-400 rounded-full animate-fadeIn">
              Hello, my name is
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-4 animate-slideUp">
           Akshay Kumar Sahu
          </h1>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-600 dark:text-gray-400 mb-6 h-[72px]">
            {text}<span className="animate-blink">|</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed animate-fadeIn">
          As an MCA final year student, I'm eager to step into the professional world and apply my skills. I've built several robust projects using the MERN stack, and I'm ready to take on new challenges as I pursue opportunities for a job or internship.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12 animate-fadeIn">
            <Button 
              variant="primary"
              size="lg"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </Button>
          </div>
          
          <div className="flex items-center space-x-6 animate-fadeIn">
            <a 
              href="https://github.com/aksahu0620" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-400 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/aksahu0620/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-400 transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDownCircle size={32} />
      </button>
    </section>
  );
};

export default Hero;
