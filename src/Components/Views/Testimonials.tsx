import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import mayor from '../../assets/mayor.png';
import dawnAi from '../../assets/dawnAi.jpeg';
import roman from '../../assets/roman.jpeg';



interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials: Testimonial[] = [
    {
      name: "Mayowa Isaac",
      role: "CEO",
      company: "Devnex",
      content: "Working with this developer was an absolute pleasure. They delivered our project ahead of schedule and exceeded all expectations. The attention to detail and commitment to quality was outstanding.",
      rating: 5,
      image: mayor,
    },
    {
      name: "David Dawncrown",
      role: "Site Engineer",
      company: "Dawncrownpop decor",
      content: "Our new website is beautiful and functional. It perfectly captures our brand essence and has significantly increased our client inquiries. Worth every penny!",
      rating: 5,
      image: dawnAi,
    },
    {
      name: "Romans chinonso",
      role: "CEO",
      company: "R-Tech ",
      content: "The E-commerce platform has revolutionized our business operations. It's user-friendly, reliable, and our customers love it. The developer was professional and responsive throughout the entire process.",
      rating: 5,
      image: roman,
    },
    // {
    //   name: "David Williams",
    //   role: "Founder",
    //   company: "Event Planners Pro",
    //   content: "Our new website is beautiful and functional. It perfectly captures our brand essence and has significantly increased our client inquiries. Worth every penny!",
    //   rating: 5,
    //   image: "1560250097-0b93528c311a"
    // }
  ];

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-10 px-4 md:px-10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-900 text-xl">💬</span>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Client Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-gray-300 to-slate-700">
            What Clients Say
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-gray-900 via-gray-400 to-transparent mx-auto mt-3"></div>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-500 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-slate-700 to-gray-800 rounded-full flex items-center justify-center shadow-lg">
              <Quote className="text-white" size={24} />
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Client Info */}
              <div className="text-center md:text-left">
                <div className="relative inline-block mb-4">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0 border-4 border-slate-100 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-slate-700 to-gray-800 rounded-full flex items-center justify-center border-4 border-white">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {currentTestimonial.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {currentTestimonial.role}
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {currentTestimonial.company}
                </p>

                {/* Star Rating */}
                <div className="flex justify-center md:justify-start gap-1 mt-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="md:col-span-2">
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  "{currentTestimonial.content}"
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white hover:bg-slate-700 text-gray-700 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white hover:bg-slate-700 text-gray-700 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
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

export default TestimonialSection;