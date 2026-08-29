import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Award, MapPin, Mail, Sparkles } from 'lucide-react';

const AboutSection = ({ onOpenCertificates }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    setRotate({ x: -y * 0.03, y: x * 0.03 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 z-10 bg-[#050b14]">
      <div className="max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="relative glass-panel neon-corner-bracket p-5 sm:p-12 rounded-2xl border border-cyan-500/30 shadow-[0_0_40px_rgba(10,14,26,0.8)] hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] transition-shadow duration-500"
        >
          {/* Internal Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Side — Profile Image */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group">
                {/* Glowing cyan ring effect with pulse */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500 group-hover:blur-lg animate-pulse" />
                
                <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-cyan-400/60 bg-navy-900 shadow-[0_0_25px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] transition-all duration-300">
                  <img
                    src="/image.jpeg"
                    alt="Eswar S Profile"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/profile.webp';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  
                  {/* Pill Badge overlapping bottom edge with pulsing live indicator dot */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center space-x-2 px-3 py-1.5 rounded-full bg-navy-900/90 backdrop-blur-md border border-cyan-500/40 shadow-lg">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
                    </span>
                    <span className="text-xs font-semibold font-mono text-cyan-300">Java Full-Stack Developer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side — Content */}
            <div className="md:col-span-7 space-y-5 text-left">
              {/* Kicker & Heading */}
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>✦ DEVELOPER OVERVIEW</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">Me</span>
                </h2>
                <p className="text-sm font-mono text-cyan-300/90 mt-1">
                  Java Backend Developer — Java, Spring Boot, MySQL
                </p>
              </div>

              {/* Side by side Info Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-navy-900/60 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/50 transition-colors duration-300">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Based In:</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-100 mt-1 font-sans">
                    Chennai, Tamil Nadu, India
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-900/60 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/50 transition-colors duration-300">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Available At:</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-100 mt-1 font-sans truncate" title="eswarrawsr2006@gmail.com">
                    eswarrawsr2006@gmail.com
                  </div>
                </div>
              </div>

              {/* Body Text */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                I am a dedicated Java Full-Stack Developer specializing in building high-performance backend microservices, robust RESTful APIs, and database architectures using Java, Spring Boot, and MySQL. I leverage clean OOP principles, enterprise design patterns, and modern Web interfaces to deliver scalable, secure software solutions.
              </p>

              {/* Animated Gradient Shimmer Divider Line */}
              <div className="relative h-[1px] w-full overflow-hidden bg-cyan-500/20 my-4">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer" />
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-wrap items-center gap-4">
                <a
                  href="/ESWAR S.pdf"
                  download="Eswar_S_Resume.pdf"
                  className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 shadow-[0_0_25px_rgba(34,211,238,0.45)] hover:shadow-[0_0_35px_rgba(34,211,238,0.75)] transition-all duration-300 transform hover:-translate-y-0.5 group active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform shrink-0" />
                  <span>Download Resume</span>
                </a>

                <button
                  onClick={onOpenCertificates}
                  className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-xl font-bold text-sm text-cyan-300 hover:text-white border-2 border-cyan-500/60 hover:border-cyan-400 bg-navy-950/80 hover:bg-cyan-500/15 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 group active:scale-95 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-transform shrink-0" />
                  <span>View Certificates</span>
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
