import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight,  MapPin, Briefcase, User, Download, ExternalLink } from 'lucide-react';
import dp1 from '../../assets/dp1.jpeg';
import dp2 from '../../assets/dp2.png';
import dp3 from '../../assets/dp3.png';

interface CarouselSlide {
  image: string;
  caption: string;
}

const AboutSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: CarouselSlide[] = [
    {
      image: dp1,
      caption: 'Design-driven frontend developer focused on performance, precision, and experience.'
    },
    {
      image: dp2,
      caption: 'Innovative, Interactive and Impactful; That\'s my code philosophy.'
    },
    {
      image: dp3,
      caption: 'Creating web experiences that don\'t just look good, they feel good.'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-10 px-4 md:px-10 ">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-gray-500 flex items-center justify-center">
              <span className="text-white text-xl">👤</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1">
                Introduction
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-gray-200 to-slate-600">
                About Me
              </h2>
            </div>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-gray-900 via-gray-400 to-transparent ml-15"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Carousel */}
          <div className="relative">
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group">
              {/* Carousel Images */}
              <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                        {slide.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white w-8'
                        : 'bg-white/50 hover:bg-white/75 w-1.5'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-500 mb-4">
                Dedicated Frontend Specialist
              </h3>
              
              <div className="space-y-4 text-gray-400 text-base leading-relaxed">
                <p>
                  I'm a Frontend Developer with expertise in crafting responsive, user-friendly, and visually engaging web applications. While my primary focus is frontend technologies, I also have hands-on experience with Django for backend development, enabling me to integrate complete solutions.
                </p>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <User size={16} className="text-gray-700" />
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Name</span>
                </div>
                <p className="text-gray-900 font-semibold ml-11">Ifeanyi Caleb Okoye</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <ExternalLink size={16} className="text-gray-700" />
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Upwork</span>
                </div>
                 <a className="text-gray-900 font-semibold text-sm ml-11 underline" href="https://www.upwork.com/freelancers/~01a705b6a1bd8a779d" target="_blank" rel="noopener noreferrer">Hire me on Upwork</a>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <MapPin size={16} className="text-gray-700" />
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Location</span>
                </div>
                <p className="text-gray-900 font-semibold ml-11">Lagos, Nigeria</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <Briefcase size={16} className="text-gray-700" />
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Experience</span>
                </div>
                <p className="text-gray-900 font-semibold ml-11">1+ Years</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
                <Download size={18} />
                Download CV
              </button>
              <a 
                href="#contact"
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-lg font-semibold border-2 border-gray-900 transition-all duration-300 hover:shadow-lg"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Stats Bar */}

         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { number: '10+', label: 'Projects Done' },
            { number: '10+', label: 'Technologies' },
            { number: '98%', label: 'Satisfaction' },
            { number: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;