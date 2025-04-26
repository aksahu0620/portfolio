import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import './styles/animations.css';

function App() {
  useEffect(() => {
    document.title = 'Akshay Kumar Sahu | Full Stack Developer';
  }, []);
  

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-[#0a192f] text-gray-800 dark:text-white min-h-screen">
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
    </ThemeProvider>
  );
}

export default App;