import React from 'react';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Heart, ArrowUp, ExternalLink, } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    quickLinks: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' }
    ],
    services: [
      { name: 'Web Development', },
      { name: 'Single page App',},
      { name: 'UI/UX Implementation',  },
      { name: 'Consulting',  }
    ],
    // resources: [
    //   { name: 'Blog', href: '#' },
    //   { name: 'Portfolio', href: '#' },
    //   { name: 'Privacy Policy', href: '#' },
    //   { name: 'Terms of Service', href: '#' }
    // ]
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/B-iconx' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ifeanyi-o-52407037a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
     { icon: ExternalLink, label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01a705b6a1bd8a779d' },
  ];

  const contactInfo = [
    { icon: Linkedin, text: 'Connect on LinkedIn', href:'https://www.linkedin.com/in/ifeanyi-o-52407037a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'  },
    { icon: ExternalLink, text: 'Hire on Upwork', href: 'https://www.upwork.com/freelancers/~01a705b6a1bd8a779d' },
    { icon: MapPin, text: 'Lagos, Nigeria', href: '#' }
  ];

  return (
    <footer className="relative bg-[rgba(2,7,27,0.85)]  text-white overflow-hidden border-t border-white/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 md:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-900 text-xl font-bold">💻</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">B-iconx</h3>
                  <p className="text-sm text-gray-400">Developer & Designer</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Building digital experiences that make a difference. Specializing in modern web applications and creative solutions.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group border border-white/10"
                    aria-label={social.label}
                  >
                    <social.icon className="text-gray-400 group-hover:text-white transition-colors" size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-slate-400 to-gray-500 rounded-full"></span>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-slate-400 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-slate-400 to-gray-500 rounded-full"></span>
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a
                      // href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-slate-400 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-slate-400 to-gray-500 rounded-full"></span>
                Get In Touch
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index}>
                    <a
                      href={info.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-start gap-3 group"
                    >
                      <info.icon className="text-slate-400 group-hover:text-white transition-colors mt-1 flex-shrink-0" size={18} />
                      <span className="text-sm">{info.text}</span>
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 md:px-10 py-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© 2025 Portfolio. Made with</span>
                <Heart className="text-red-500 fill-red-500" size={16} />
                <span>All rights reserved.</span>
              </div>

              {/* Resources Links */}
              {/* <div className="flex flex-wrap justify-center gap-6 text-sm">
                {footerLinks.resources.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-slate-700 to-gray-800 hover:from-slate-600 hover:to-gray-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 z-50 group"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="group-hover:animate-bounce" />
      </button>

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
    </footer>
  );
};

export default Footer;