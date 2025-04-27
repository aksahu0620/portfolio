import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { getCurrentTheme } from '../../utils/themeUtils';
import emailjs from '@emailjs/browser';

// Removed initialization - we'll use the recommended pattern instead

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  
  // Check for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const theme = getCurrentTheme();
      if (theme !== currentTheme) {
        setCurrentTheme(theme);
      }
    };
    
    const interval = setInterval(checkTheme, 300);
    
    return () => clearInterval(interval);
  }, [currentTheme]);
  
  const isDark = currentTheme === 'dark';

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Map EmailJS field names to our state properties
    const stateMapping = {
      'user_name': 'name',
      'user_email': 'email'
    };
    
    // Use the mapped name or the original name if no mapping exists
    const stateName = stateMapping[name] || name;
    
    setFormData(prev => ({
      ...prev,
      [stateName]: value,
    }));

    if (errors[stateName]) {
      setErrors(prev => ({
        ...prev,
        [stateName]: undefined,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Using EmailJS's recommended method with environment variables
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_kl4wt2s',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_kkz8064',
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Po6evgEsCXtc0wF-j'
    )
    .then((result) => {
      console.log('SUCCESS!', result.text);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    })
    .catch((error) => {
      console.error('Email error:', error);
      setIsSubmitting(false);
      setSubmitError('Failed to send message. Please try again or contact directly via email.');
    });
  };

  return (
    <section 
      id="contact" 
      className="py-20"
      style={{ 
        backgroundColor: isDark ? '#0a192f' : 'white'
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind? Let's discuss how I can help."
          align="center"
        />

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="md:col-span-2">
              <div 
                className="rounded-lg p-6 shadow-md h-full"
                style={{
                  backgroundColor: isDark ? '#112240' : '#f9fafb', // gray-50
                  boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h3 
                  className="text-xl font-bold mb-6"
                  style={{ color: isDark ? 'white' : '#1a202c' }}
                >
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-2 bg-teal-400 bg-opacity-20 rounded-full text-teal-400 mr-4">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 
                        className="text-sm font-semibold mb-1"
                        style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
                      >
                        Email
                      </h4>
                      <a
                        href="mailto:akshaykumarsahu0620@gmail.com"
                        className="hover:text-teal-400 transition-colors duration-300 break-all text-sm sm:text-base"
                        style={{ color: isDark ? 'white' : '#1a202c' }}
                      >
                        aksahu0620@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 bg-teal-400 bg-opacity-20 rounded-full text-teal-400 mr-4">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 
                        className="text-sm font-semibold mb-1"
                        style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
                      >
                        Mobile
                      </h4>
                      <a
                        href="tel:+916264492250"
                        className="hover:text-teal-400 transition-colors duration-300"
                        style={{ color: isDark ? 'white' : '#1a202c' }}
                      >
                        +91 6264492250
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 bg-teal-400 bg-opacity-20 rounded-full text-teal-400 mr-4">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 
                        className="text-sm font-semibold mb-1"
                        style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
                      >
                        Location
                      </h4>
                      <p style={{ color: isDark ? 'white' : '#1a202c' }}>
                        Bhopal M.P., India
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className="mt-8 p-4 rounded-md"
                  style={{
                    backgroundColor: isDark ? '#1e293b' : '#f3f4f6', // gray-800 : gray-100
                    color: isDark ? '#9ca3af' : '#4b5563'
                  }}
                >
                  <p className="text-sm">
                    I'm a final-year MCA student actively seeking full-time roles or internship opportunities in web development.
                    If you're hiring or have a project that aligns with my skills, feel free to reach out — I'd love to connect and contribute!
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                {submitSuccess && (
                  <div className="p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-md mb-6 animate-fadeIn">
                    Your message has been sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitError && (
                  <div className="p-4 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-md mb-6 animate-fadeIn">
                    {submitError}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium mb-1"
                      style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors duration-300"
                      style={{
                        borderColor: errors.name ? '#ef4444' : isDark ? '#374151' : '#e5e7eb',
                        backgroundColor: isDark ? '#1e293b' : 'white',
                        color: isDark ? 'white' : '#1a202c',
                        ringColor: errors.name ? '#ef4444' : 'rgb(45, 212, 191)'
                      }}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium mb-1"
                      style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors duration-300"
                      style={{
                        borderColor: errors.email ? '#ef4444' : isDark ? '#374151' : '#e5e7eb',
                        backgroundColor: isDark ? '#1e293b' : 'white',
                        color: isDark ? 'white' : '#1a202c',
                        ringColor: errors.email ? '#ef4444' : 'rgb(45, 212, 191)'
                      }}
                      placeholder="Your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors duration-300"
                    style={{
                      borderColor: errors.subject ? '#ef4444' : isDark ? '#374151' : '#e5e7eb',
                      backgroundColor: isDark ? '#1e293b' : 'white',
                      color: isDark ? 'white' : '#1a202c',
                      ringColor: errors.subject ? '#ef4444' : 'rgb(45, 212, 191)'
                    }}
                    placeholder="Subject of your message"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors duration-300"
                    style={{
                      borderColor: errors.message ? '#ef4444' : isDark ? '#374151' : '#e5e7eb',
                      backgroundColor: isDark ? '#1e293b' : 'white',
                      color: isDark ? 'white' : '#1a202c',
                      ringColor: errors.message ? '#ef4444' : 'rgb(45, 212, 191)'
                    }}
                    placeholder="Your message"
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
