import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC<{ isNavVisible?: boolean }> = ({ isNavVisible = true }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (name: string) => {
    setActiveSection(name);
    setIsNavOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled 
          ? 'shadow-lg' 
          : 'shadow-md'
      }`}
      style={{ backgroundColor: isNavOpen ? 'white' : 'rgba(2,7,27,0.90)' }}
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a 
            href="#" 
            className="relative z-50 group"
            onClick={() => handleNavClick('Home')}
          >
            <div className="flex items-center gap-2">
              <div className={`w-20 h-10 rounded-lg bg-gradient-to-br ${
                isNavOpen ? 'from-gray-900 to-gray-700' : 'from-gray-700 to-gray-900'
              } flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                <span className="text-white font-bold text-lg">B-iconx</span>
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                isNavOpen ? 'text-gray-900' : 'text-white'
              }`}>
                .dev
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={() => handleNavClick(item.name)}
                    className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      activeSection === item.name
                        ? 'text-white bg-white/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                    {activeSection === item.name && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="px-6 py-2.5 bg-white text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden z-50 p-2 rounded-lg transition-all duration-300 ${
              isNavOpen 
                ? 'text-white hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Toggle menu"
          >
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isNavOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ${
            isNavOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsNavOpen(false)}
        ></div>

        {/* Menu Panel */}
        <nav
          className={`absolute right-0 top-0 h-screen w-[280px] shadow-2xl transition-transform duration-300 ${
            isNavOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ backgroundColor: 'rgba(2,7,27,0.95)' }}
        >
          <div className="flex flex-col h-full p-6 pt-24">
            <ul className="space-y-2 flex-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={() => handleNavClick(item.name)}
                    className={`block px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === item.name
                        ? 'bg-white/10 text-white'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <div className="pt-6 border-t border-white/10">
              <a
                href="#contact"
                className="block w-full px-6 py-3 bg-white text-gray-900 text-center rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                Let's Talk
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;