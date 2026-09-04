import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Github, ChevronLeft, ChevronRight, Sparkles, ExternalLink, Code2 } from 'lucide-react';

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with middle card focused

  const projects = [
    {
      id: 1,
      title: 'Campus Complaint & Resolution System',
      category: 'Full-Stack / Spring Boot & React',
      image: '/assets/campus_complaint.jpg',
      techStack: 'Spring Boot, React, JWT, Docker, MySQL, Render, Vercel',
      description: 'Campus issue management platform supporting 4 user roles, issue lifecycles, OTP recovery, and analytics.',
      demoUrl: 'https://complient-management-frontend-i75f.vercel.app/',
      githubUrl: 'https://github.com/2310Eswar/Complient_Managent_Backend.git',
    },
    {
      id: 2,
      title: 'Online Bus Booking Portal',
      category: 'Full-Stack / Java',
      image: '/assets/project1.webp',
      techStack: 'Java, Spring Boot, MySQL, REST API',
      description: 'End-to-end booking engine with seat selection, user auth, and automated ticket generation.',
      demoUrl: 'https://bus-booking-demo.vercel.app',
      githubUrl: 'https://github.com/2310Eswar/Online-Bus-Booking-System.git',
    },
    {
      id: 3,
      title: 'Rent Vehicle Management System',
      category: 'Backend Architecture',
      image: '/assets/ecommerce_backend.png',
      techStack: 'Java 17, Spring Boot, MySQL, Hibernate',
      description: 'Enterprise vehicle rental APIs with automated availability check and reservation workflow.',
      demoUrl: 'https://rent-vehicle-api.herokuapp.com',
      githubUrl: 'https://github.com/2310Eswar/RENT-OF-VECHICLE-RESTAPI.git',
    },
    {
      id: 4,
      title: 'E-Commerce Microservices Engine',
      category: 'Distributed Microservices',
      image: '/assets/project2.webp',
      techStack: 'Java, Spring Boot, MySQL, Docker',
      description: 'Scalable REST backend supporting shopping cart, JWT role-based access control, and Swagger docs.',
      demoUrl: 'https://ecommerce-engine-demo.vercel.app',
      githubUrl: 'https://github.com/2310Eswar/E_COMMERCE_BACKEND',
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-center overflow-hidden">
      


      <div className="max-w-7xl mx-auto w-full text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2 font-sans">
            3D Coverflow carousel showcasing production-ready backend & full-stack systems.
          </p>
        </motion.div>

        {/* 3D Perspective Coverflow Carousel Row (Matching Screenshot 3) */}
        <div className="relative w-full h-[460px] sm:h-[500px] flex items-center justify-center perspective-1500 my-4">
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center transform-style-3d">
            {projects.map((project, index) => {
              // Calculate offset relative to active card
              const offset = index - activeIndex;
              const isCenter = offset === 0;

              // Coverflow 3D Transform calculations
              let rotateY = offset * -25;
              let translateX = offset * 180;
              let translateZ = isCenter ? 100 : -140;
              let opacity = isCenter ? 1 : Math.max(0.2, 0.8 - Math.abs(offset) * 0.4);
              let scale = isCenter ? 1.02 : 0.82;

              // Hide far cards on smaller screens
              if (Math.abs(offset) > 1) opacity = 0;

              return (
                <motion.div
                  key={project.id}
                  onClick={() => setActiveIndex(index)}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  className={`absolute w-[280px] sm:w-[340px] max-w-[85vw] glass-panel rounded-2xl overflow-hidden cursor-pointer border transition-colors duration-300 ${
                    isCenter
                      ? 'border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.4)] z-30'
                      : 'border-cyan-500/20 hover:border-cyan-400/60 z-10 pointer-events-auto'
                  }`}
                >
                  {/* Card Thumbnail / Mockup Image */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-navy-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/project1.webp';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-navy-900/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 text-left space-y-3 bg-navy-950/70">
                    <h3 className="text-base sm:text-lg font-bold font-display text-white line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Tech Stack Label & Line */}
                    <div>
                      <span className="text-[11px] font-mono text-cyan-400/90 font-semibold block">
                        Tech Stack:
                      </span>
                      <p className="text-xs font-mono text-slate-300 truncate mt-0.5">
                        {project.techStack}
                      </p>
                    </div>

                    {/* Pill Action Buttons (Globe Icon + GitHub Icon) */}
                    <div className="pt-2 flex items-center space-x-2">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 truncate"
                      >
                        <Globe className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center p-2 rounded-full text-slate-200 bg-navy-900 border border-cyan-500/30 hover:text-cyan-300 hover:border-cyan-400 transition-all duration-300"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Navigation Arrow Controls */}
        <div className="flex items-center justify-center space-x-6 mt-6">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full glass-panel text-slate-300 hover:text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all transform hover:scale-110"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex space-x-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-8 bg-cyan-400 shadow-[0_0_10px_#22d3ee]'
                    : 'bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full glass-panel text-slate-300 hover:text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all transform hover:scale-110"
            aria-label="Next Project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
