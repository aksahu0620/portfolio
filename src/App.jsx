import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import './styles/animations.css';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Set document title
  useEffect(() => {
    document.title = 'Akshay Kumar Sahu | Full Stack Developer';
  }, []);

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#0a192f] text-white' 
          : 'bg-white text-gray-800'
      }`}
      style={{
        backgroundColor: isDarkMode ? '#0a192f' : 'white',
        color: isDarkMode ? 'white' : '#1a202c'
      }}
    >
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;