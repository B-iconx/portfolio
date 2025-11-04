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
      // Send email via Resend API
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
        
        // Auto-hide success message after 5 seconds
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
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'Reach me via LinkedIn',
      link: '#contact'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+2348083808146',
      link: 'tel:+2348083808146'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Lagos, Nigeria',
      link: 'https://maps.app.goo.gl/AdXMKUKcNBE2hqvz7'
    }
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', link: 'https://github.com/B-iconx' },
    { icon: Linkedin, label: 'LinkedIn', link: 'https://www.linkedin.com/in/ifeanyi-o-52407037a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { icon: ExternalLink, label: 'Upwork', text: 'Hire on Upwork', link: 'https://www.upwork.com/freelancers/~01a705b6a1bd8a779d' },
  ];

  return (
    <section id="contact" className="relative py-20 px-4 md:px-10 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
              <span className="text-white text-xl">📧</span>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-gray-600 to-slate-700">
            Let's Work Together
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-gray-900 via-gray-400 to-transparent mx-auto mt-3"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-2 leading-relaxed">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info & Social Links */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-slate-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center group-hover:from-slate-700 group-hover:to-gray-800 transition-all duration-300">
                    <info.icon className="text-slate-700 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 mb-1">{info.label}</p>
                    <p className="text-gray-900 font-medium">{info.value}</p>
                  </div>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Connect With Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-gray-200 hover:from-slate-700 hover:to-gray-800 flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                    aria-label={social.label}
                  >
                    <social.icon className="text-slate-700 group-hover:text-white transition-colors" size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="bg-gradient-to-br from-slate-700 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">Available for work</span>
              </div>
              <p className="text-gray-200 text-sm">
                Currently accepting new projects and collaborations. Let's create something amazing together!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="space-y-6">
                {/* Loading Toast */}
                {isSubmitting && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <div>
                      <p className="font-semibold text-blue-900">Sending your message...</p>
                      <p className="text-sm text-blue-700">Please wait while we process your request.</p>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <div>
                      <p className="font-semibold text-green-900">Message sent successfully!</p>
                      <p className="text-sm text-green-700">I'll get back to you as soon as possible.</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && Object.keys(errors).length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                    <AlertCircle className="text-red-600" size={24} />
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
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                        placeholder="Enter your name..."
                      />
                      {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                        placeholder="Enter your email..."
                      />
                      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                        placeholder="Project Inquiry..."
                      />
                      {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
                    </div>
                    
                    {/* Phone Field */}
                    <div className="min-w-0">
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
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                      />
                      {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                      } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed`}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                  </div>
                </fieldset>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-slate-700 to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 transform flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
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