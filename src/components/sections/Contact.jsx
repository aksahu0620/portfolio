import React, { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
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
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#0a192f]">
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
              <div className="bg-gray-100 dark:bg-[#112240] rounded-lg p-6 shadow-md h-full">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-2 bg-teal-400 bg-opacity-20 rounded-full text-teal-400 mr-4">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        Email
                      </h4>
                      <a
                        href="mailto:contact@example.com"
                        className="text-gray-800 dark:text-white hover:text-teal-400 transition-colors duration-300"
                      >
                        akshaykumarsahu0620@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 bg-teal-400 bg-opacity-20 rounded-full text-teal-400 mr-4">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        Mobile
                      </h4>
                      <a
                        href="tel:+1234567890"
                        className="text-gray-800 dark:text-white hover:text-teal-400 transition-colors duration-300"
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
                      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        Location
                      </h4>
                      <p className="text-gray-800 dark:text-white">
                        Bhopal M.P., India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-200 dark:bg-gray-700 rounded-md">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    I'm a final-year MCA student actively seeking full-time roles or internship opportunities in web development.
                    If you're hiring or have a project that aligns with my skills, feel free to reach out — I'd love to connect and contribute!
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitSuccess && (
                  <div className="p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-md mb-6 animate-fadeIn">
                    Your message has been sent successfully! I'll get back to you soon.
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${errors.name
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-teal-400 focus:border-teal-400'
                        } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 transition-colors duration-300`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border ${errors.email
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-teal-400 focus:border-teal-400'
                        } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 transition-colors duration-300`}
                      placeholder="Your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${errors.subject
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-teal-400 focus:border-teal-400'
                      } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 transition-colors duration-300`}
                    placeholder="Subject of your message"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 rounded-md border ${errors.message
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-teal-400 focus:border-teal-400'
                      } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 transition-colors duration-300`}
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
                    size="lg"
                    icon={<Send size={16} />}
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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
