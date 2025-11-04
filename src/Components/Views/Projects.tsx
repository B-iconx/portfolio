import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Eye, Sparkles, Code2, Rocket } from 'lucide-react';
import Dawncrownpop from '../../assets/project1.png';
import ecommerce from '../../assets/project2.png';
import smsgateway from '../../assets/project3.png';
import vtu from '../../assets/vtu site.png';
import defaultImg from '../../assets/project1.png';



interface ProjectItem {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  category: string;
  codeLink?: string;
  demoLink?: string;
  gradient: string;
}

const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

const getPlaceholderImage = () => {
  return project.image === 'Dawncrownpop' ? Dawncrownpop :
         project.image === 'ecommerce' ? ecommerce :
         project.image === 'smsgateway' ? smsgateway :
         project.image === 'vtu' ? vtu :
         defaultImg;
};

  return (
    <div
      ref={cardRef}
      className={`mb-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className={`relative overflow-hidden h-80 md:h-auto ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
            <div className="absolute inset-0">
              <img
                src={getPlaceholderImage()}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 transition-opacity duration-500`}></div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-6 left-6 z-10">
              <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-900 shadow-lg flex items-center gap-2">
                <Sparkles size={16} className="text-slate-600" />
                {project.category}
              </span>
            </div>

            {/* Overlay Content on Hover */}
            <div className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center gap-4 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  className="p-4 bg-white rounded-full hover:bg-slate-700 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                  
                >
                  <Github size={24} />
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  className="p-4 bg-white rounded-full hover:bg-indigo-700 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                  
                >
                  <ExternalLink size={24} />
                </a>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className={`p-8 md:p-10 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-slate-700 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Features */}
            {project.features.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Rocket size={16} className="text-slate-700" />
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-slate-600 mt-1">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Code2 size={16} className="text-indigo-700" />
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold border border-gray-200 hover:bg-slate-700 hover:text-white hover:border-slate-700 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-700 to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-2"
                  
                >
                  <Eye size={18} />
                  Live Demo
                </a>
              )}
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-200 hover:shadow-md flex items-center justify-center gap-2"
                  
                >
                  <Github size={18} />
                  Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Projects Section Component
const ProjectsSection: React.FC = () => {
  const projects: ProjectItem[] = [
    {
      title: "Construction Company website- Interactive Decor Portfolio",
      description: "Created a visually stunning landing page for a pop decoration company, showcasing their services, portfolio, and contact information with an engaging and modern design.",
      image: "Dawncrownpop",
      category: "Web Design",
      technologies: ["React", "Tailwind", "Typescript", "RestfulAPI"],
      features: [
        "Responsive design for all devices",
        "Interactive image gallery",
        "Contact form integration",
        "Smooth scroll animations"
      ],
      codeLink: "https://github.com/B-iconx",
      demoLink: "https://www.dawncrownpop.com/",
      gradient: "from-slate-700 to-slate-900"
    },
    {
      title: "E-Commerce Platform",
      description: "Built a complete e-commerce solution with advanced product catalog, intelligent search, shopping cart, secure authentication, order processing, and integrated payment system.",
      image: "ecommerce",
      category: "Web App",
      technologies: ["React", "Tailwind", "Typescript", "Django", "MySQL"],
      features: [
        "Dynamic product filtering and search",
        "Real-time inventory management",
        "Order tracking system",
        "Admin dashboard with analytics"
      ],
      codeLink: "https://github.com/B-iconx",
      demoLink: "#",
      gradient: "from-indigo-700 to-indigo-900"
    },
    {
        title: "SMS Gateway Web Application",
        description: "Built a comprehensive SMS gateway platform that enables businesses to send bulk messages, manage contacts, and track delivery status with an intuitive web interface.",
        image: "smsgateway",
        category: "Web App",
        technologies: ["React", "TailwindCss", "Django", "Onbuka API", "MySQL"],
        features: [
          "Bulk SMS sending capabilities",
          "Contact list management",
          "Real-time delivery tracking",
          "SMS scheduling and automation"
        ],
        codeLink: "https://github.com/B-iconx",
        demoLink: "#",
        gradient: "from-indigo-700 to-indigo-900"
      },
      {
        title: "VTU Services Platform",
        description: "Developed a virtual top-up platform that allows users to purchase airtime, data bundles, pay bills, and manage subscriptions with seamless payment integration.",
        image: "vtu",
        category: "FinTech",
        technologies: ["React", "TypeScript", "Django", "MySQL", "Payment API"],
        features: [
          "Airtime and data bundle purchases",
          "Bill payment (electricity, cable TV)",
          "Automated transaction processing",
          "Wallet system with transaction history"
        ],
        codeLink: "https://github.com/B-iconx",
        demoLink: "#",
        gradient: "from-teal-700 to-teal-900"
      },
  ];

  return (
    <section id="projects" className="relative py-10 px-4 md:px-10  overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
              <span className="text-white text-xl">🚀</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1">
                Portfolio Showcase
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-gray-200 to-slate-600 ">
                Featured Projects
              </h2>
            </div>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-gray-900 via-gray-400 to-transparent ml-15"></div>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            A showcase of my best work - real-world solutions that solve complex problems and deliver exceptional user experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-block bg-white rounded-2xl shadow-xl p-8 max-w-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to see more?
            </h3>
            <p className="text-gray-600 mb-6">
              Check out my GitHub for more projects and open-source contributions
            </p>
            <a
              href="https://github.com/B-iconx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-700 to-gray-800 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
            >
              <Github size={20} />
              Visit GitHub Profile
            </a>
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
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;