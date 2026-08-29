import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight, Code2, Sparkles, Terminal, Search } from 'lucide-react';

const HeroSection = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    setTilt({ x: -y * 0.04, y: x * 0.04 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Main 2-Column Grid Matching Reference Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio, Underline & CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 text-left space-y-6"
          >
            {/* Small Top Label */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Eswar S</span>
            </div>

            {/* Large Bold Two-Line Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
                Eswar S
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                Java Backend Developer
              </h2>

              {/* Thin Cyan Underline Accent Line */}
              <div className="w-44 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full shadow-[0_0_12px_#22d3ee] mt-3" />
            </div>

            {/* 2-3 Line Description */}
            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-xl">
              I build scalable, secure backend systems using Java, Spring Boot, and Microservices architecture.
            </p>

            {/* Two Pill CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 hover:from-blue-500 hover:to-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.65)] transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2 group"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-8 py-3.5 rounded-full font-bold text-sm text-cyan-300 border-2 border-cyan-500/60 hover:border-cyan-400 bg-navy-950/60 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D Floating Code Editor Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 flex justify-center lg:justify-end relative"
          >
            <div
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-lg"
            >
              {/* Continuous Slow Float Motion Wrapper */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative glass-panel rounded-3xl p-6 border border-cyan-500/40 shadow-[0_0_50px_rgba(10,14,26,0.9)] hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] transition-shadow duration-500"
              >
                {/* Window Header (macOS Dots + Search Capsule) */}
                <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-4">
                  {/* macOS Dots */}
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </div>

                  {/* Search Bar Pill */}
                  <div className="flex items-center space-x-2 px-3.5 py-1 rounded-full bg-navy-950/80 border border-cyan-500/30 text-xs text-slate-400 w-44">
                    <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate font-mono">Developer.java</span>
                  </div>
                </div>

                {/* Code Body with IDE Syntax Highlighting */}
                <div className="font-mono text-xs sm:text-sm text-slate-200 space-y-1.5 text-left overflow-x-auto p-4 bg-navy-950/80 rounded-xl border border-cyan-500/20 leading-relaxed shadow-inner">
                  <div>
                    <span className="text-purple-400 font-semibold">public class</span>{' '}
                    <span className="text-amber-300 font-bold">EswarDev</span> &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-cyan-300">String</span> role ={' '}
                    <span className="text-teal-300">"Java Backend Developer"</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-cyan-300">String[]</span> skills = &#123; <span className="text-teal-300">"Java"</span>, <span className="text-teal-300">"Spring Boot"</span>, <span className="text-teal-300">"MySQL"</span> &#125;;
                  </div>
                  <div className="my-1 border-t border-cyan-500/10" />
                  <div className="pl-4">
                    <span className="text-purple-400 font-semibold">void</span>{' '}
                    <span className="text-amber-300">build</span>() &#123;
                  </div>
                  <div className="pl-8">
                    <span className="text-cyan-400">System</span>.out.println(<span className="text-teal-300">"Building Scalable Backend Systems"</span>);
                  </div>
                  <div className="pl-4">&#125;</div>
                  <div>&#125;</div>
                </div>

                {/* Floating UI Accents around Card */}
                {/* 1. Floating Percentage Badge ("93.0%") */}
                <div className="absolute -bottom-4 -right-4 px-3.5 py-1.5 rounded-xl glass-panel border border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center space-x-1.5 animate-pulse z-20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="font-mono text-xs font-bold text-cyan-300">93.0%</span>
                </div>

                {/* 2. Small White Glass Chip */}
                <div className="absolute -top-3 -right-3 w-8 h-4 rounded-md bg-white/20 backdrop-blur-md border border-white/40 shadow-lg z-20" />

                {/* 3. Small Floating Cyan Glow Dot */}
                <div className="absolute -bottom-2 -left-3 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] z-20" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
