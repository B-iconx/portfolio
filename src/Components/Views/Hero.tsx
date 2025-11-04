import { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import banner from '../../assets/banner.jpeg';

const roles = [
  "Frontend Developer",
  "UI/UX Enthusiast",
  "Django Developer",
  "JavaScript Specialist",
  "React Developer"
];

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setDisplayText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <div id="home" className="min-h-screen w-full relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={banner}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[rgba(2,7,27,0.90)]"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 md:px-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
             

              {/* Main Heading */}
              <div className="space-y-4 ">
                <h1 className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                  <span className="block text-gray-400 text-lg md:text-xl font-medium mb-2 mt-20">
                    Hello, I'm
                  </span>
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    B-iconx
                  </span>
                  <span className="block text-2xl md:text-3xl font-semibold text-gray-300 leading-tight">Ifeanyi Caleb Okoye</span>
                </h1>

                {/* Typing animation */}
                <div className="animate-fadeInUp opacity-0 flex items-center gap-2" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                  <div className="h-1 w-12 bg-gradient-to-r from-gray-600 to-gray-400"></div>
                  <p className="text-2xl md:text-3xl text-gray-300 font-light">A_
                    {displayText}
                    <span className="inline-block w-0.5 h-7 bg-gray-400 ml-1 animate-pulse"></span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-400 leading-relaxed max-w-xl animate-fadeInUp opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                Detail-oriented frontend developer specializing in creating responsive web applications 
                and seamless user interfaces with modern technologies and best practices.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 animate-fadeInUp opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-100 hover:shadow-xl hover:scale-105"
                >
                  View My Work
                  <ArrowRight size={18} />
                </a>
               
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 animate-fadeInUp opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
                <span className="text-gray-500 text-sm font-medium">Connect:</span>
                <div className="flex gap-3">
                  <a 
                    href="https://github.com/B-iconx" 
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ifeanyi-o-52407037a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    href="#contact" 
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Visual Element */}
            <div className="hidden lg:block">
              <div className="relative animate-fadeInUp opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                {/* Decorative Card */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
                    {/* Profile Highlight */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                          <span className="text-white font-bold text-xl">I</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">Ifeanyi Caleb Okoye</h3>
                          <p className="text-gray-400 text-sm">Front-end Developer</p>
                        </div>
                      </div>
                      
                      <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent"></div>
                      
                      {/* Quick Info */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                            <span className="text-lg">📍</span>
                          </div>
                          <div>
                            <p className="text-gray-400">Based in</p>
                            <p className="text-white font-medium">Lagos, Nigeria</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                            <span className="text-lg">💼</span>
                          </div>
                          <div>
                            <p className="text-gray-400">Currently at</p>
                            <p className="text-white font-medium">Devnex</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                            <span className="text-lg">🎯</span>
                          </div>
                          <div>
                            <p className="text-gray-400">Focus</p>
                            <p className="text-white font-medium">Frontend Web Development</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent"></div>
                    
                    {/* Quote/Motto */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="text-gray-300 text-sm italic leading-relaxed">
                        "Building digital experiences that combine beautiful design with powerful functionality."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>

      {/* Custom keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;