/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#e6fffa',
            100: '#b3fff0',
            200: '#80ffe7',
            300: '#4dffdd',
            400: '#1affd3',
            500: '#00e6b8',
            600: '#00b392',
            700: '#00806c',
            800: '#004d41',
            900: '#001a16',
          },
          secondary: {
            50: '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            300: '#c4b5fd',
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
          },
        },
        fontFamily: {
          sans: [
            'Inter',
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
          ],
        },
        animation: {
          fadeIn: 'fadeIn 1s ease-in-out',
          slideUp: 'slideUp 0.8s ease-in-out',
          slideIn: 'slideIn 0.8s ease-in-out',
          scaleIn: 'scaleIn 0.6s ease-in-out',
          bounce: 'bounce 1.5s infinite',
          blink: 'blink 1s infinite',
        },
        transitionTimingFunction: {
          'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
          'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        },
        boxShadow: {
          'custom-light': '0 0 30px rgba(0, 0, 0, 0.08)',
          'custom-dark': '0 0 30px rgba(0, 0, 0, 0.2)',
          'inner-light': 'inset 0 0 10px rgba(0, 0, 0, 0.05)',
          'inner-dark': 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
        },
        backgroundColor: {
          'dark-primary': '#0a192f',
          'dark-secondary': '#112240',
          'dark-tertiary': '#1e3a8a',
        },
        gridTemplateColumns: {
          'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
          'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))',
        },
      },
    },
    plugins: [],
  };