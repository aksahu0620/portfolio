import React, { useState, useEffect } from 'react';
import { ArrowDownCircle, Github, Linkedin } from 'lucide-react';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

const Hero = () => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const { theme } = useTheme();
  const fullText = 'Full Stack Developer';
  const typingSpeed = 80; // speed of typing in ms
  const deletingSpeed = 80; // speed of deleting in ms
  const delayBeforeDeleting = 2500; // delay before starting to delete text in ms
  const delayBeforeTyping = 2500; // delay before starting to type text in ms
  
  useEffect(() => {
    let timer;
    
    // If we're currently in typing mode
    if (isTyping && !isDeleting) {
      if (text.length < fullText.length) {
        // Continue typing
        timer = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, wait before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBeforeDeleting);
      }
    } 
    // If we're in deleting mode
    else if (isDeleting) {
      if (text.length > 0) {
        // Continue deleting
        timer = setTimeout(() => {
          setText(fullText.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, increment loop and start typing again
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        // Wait before starting to type again
        timer = setTimeout(() => {
          setIsTyping(true);
        }, delayBeforeTyping);
      }
    }
    
    return () => clearTimeout(timer);
  }, [text, isTyping, isDeleting, loopNum]);
  
  const scrollToNextSection = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const isDark = theme === 'dark';
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-16 pb-12 overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(to bottom right, #0a192f, #112240)'
          : 'linear-gradient(to bottom right, #f7fafc, #edf2f7)'
      }}
    >
      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-teal-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-600 rounded-full filter blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="mb-6 inline-block">
            <span className="inline-block py-1 px-3 text-sm font-medium text-teal-400 border border-teal-400 rounded-full animate-fadeIn">
              Hello, my name is
            </span>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold mb-4 animate-slideUp"
            style={{ color: isDark ? 'white' : '#1a202c' }}
          >
           Akshay Kumar Sahu
          </h1>
          
          <h2 
            className="text-4xl md:text-6xl font-bold mb-6 h-[72px]"
            style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
          >
            {text}<span className="animate-blink">|</span>
          </h2>
          
          <p 
            className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed animate-fadeIn"
            style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
          >
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
              className="text-gray-500 dark:text-gray-300 hover:text-teal-400 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/aksahu0620/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-300 hover:text-teal-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-colors duration-300 hover:text-teal-400 animate-bounce"
        style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
        aria-label="Scroll down"
      >
        <ArrowDownCircle size={32} />
      </button>
    </section>
  );
};

export default Hero;
