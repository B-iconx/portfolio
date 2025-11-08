import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Linkedin, Github, ExternalLink } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
      
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          phone: formData.phone,
          message: formData.message,
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '', 
          subject: '',
          phone: '',
          message: ''
        });
        
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'Reach me via LinkedIn',
      link: 'https://www.linkedin.com/in/ifeanyi-o-52407037a',
      ariaLabel: 'Contact via LinkedIn'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+234 808 380 8146',
      link: 'tel:+2348083808146',
      ariaLabel: 'Call phone number'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Lagos, Nigeria',
      link: 'https://maps.app.goo.gl/AdXMKUKcNBE2hqvz7',
      ariaLabel: 'View location on map'
    }
  ];

  const socialLinks = [
    { 
      icon: Github, 
      label: 'GitHub', 
      link: 'https://github.com/B-iconx',
      ariaLabel: 'Visit GitHub profile'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      link: 'https://www.linkedin.com/in/ifeanyi-o-52407037a',
      ariaLabel: 'Visit LinkedIn profile'
    },
    { 
      icon: ExternalLink, 
      label: 'Upwork', 
      link: 'https://www.upwork.com/freelancers/~010f010fe2080bb585',
      ariaLabel: 'Hire on Upwork'
    },
  ];

  return (
    <section 
      id="contact" 
      className="relative py-20 px-4 md:px-10 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-10 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4" aria-hidden="true">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
              <span className="text-white text-xl">📧</span>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Get In Touch
          </p>
          <h2 
            id="contact-heading" 
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-gray-200 to-slate-600"
          >
            Let's Work Together
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-gray-900 via-gray-400 to-transparent mx-auto mt-3" aria-hidden="true"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-2 leading-relaxed">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
        </header>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info & Social Links */}
          <aside className="lg:col-span-2 space-y-6" aria-label="Contact information">
            {/* Contact Cards */}
            <address className="not-italic space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-slate-300 group"
                  aria-label={info.ariaLabel}
                  {...(info.link.startsWith('http') && {
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  })}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center group-hover:from-slate-700 group-hover:to-gray-800 transition-all duration-300">
                      <info.icon className="text-slate-700 group-hover:text-white transition-colors" size={24} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 mb-1">{info.label}</p>
                      <p className="text-gray-900 font-medium">{info.value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </address>

            {/* Social Links */}
            <nav className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200" aria-label="Social media links">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Connect With Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-gray-200 hover:from-slate-700 hover:to-gray-800 flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                    aria-label={social.ariaLabel}
                  >
                    <social.icon className="text-slate-700 group-hover:text-white transition-colors" size={20} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>

            {/* Availability Badge */}
            <div className="bg-gradient-to-br from-slate-700 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></div>
                <span className="font-semibold">Available for work</span>
              </div>
              <p className="text-gray-200 text-sm">
                Currently accepting new projects and collaborations. Let's create something amazing together!
              </p>
            </div>
          </aside>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="space-y-6">
                {/* Loading Toast */}
                {isSubmitting && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3" role="status" aria-live="polite">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" aria-hidden="true"></div>
                    <div>
                      <p className="font-semibold text-blue-900">Sending your message...</p>
                      <p className="text-sm text-blue-700">Please wait while we process your request.</p>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3" role="alert" aria-live="assertive">
                    <CheckCircle className="text-green-600" size={24} aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-green-900">Message sent successfully!</p>
                      <p className="text-sm text-green-700">I'll get back to you as soon as possible.</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && Object.keys(errors).length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3" role="alert" aria-live="assertive">
                    <AlertCircle className="text-red-600" size={24} aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-red-900">Please fix the errors below</p>
                    </div>
                  </div>
                )}

                <fieldset disabled={isSubmitting} className="contents">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name <span aria-label="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                        placeholder="Enter your name..."
                      />
                      {errors.name && <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Email <span aria-label="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                        placeholder="Enter your email..."
                      />
                      {errors.email && <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject <span aria-label="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                        placeholder="Project Inquiry..."
                      />
                      {errors.subject && <p id="subject-error" className="text-red-600 text-sm mt-1" role="alert">{errors.subject}</p>}
                    </div>
                    
                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                      />
                      {errors.phone && <p id="phone-error" className="text-red-600 text-sm mt-1" role="alert">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message <span aria-label="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                      } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed`}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && <p id="message-error" className="text-red-600 text-sm mt-1" role="alert">{errors.message}</p>}
                  </div>
                </fieldset>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-slate-700 to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 transform flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;