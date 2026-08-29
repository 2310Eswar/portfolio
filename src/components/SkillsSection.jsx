import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Layers, Leaf, Database, Cable, Cpu, GitBranch, Github, Network, Sparkles } from 'lucide-react';

const SkillsSection = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  // 9 Symmetrically Arranged Skills (Clockwise starting from 12 o'clock = 270°, 40° intervals)
  const skills = [
    {
      id: 'git',
      name: 'Git',
      icon: GitBranch,
      color: '#f97316', // Git Orange
      angle: 270, // 12:00 (Top)
      description: 'Version Control, Branching Strategies, Merging, Rebase Workflow',
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      color: '#f8fafc', // White
      angle: 310, // ~1:20
      description: 'Code Hosting, Pull Requests, Actions CI/CD, Repository Management',
    },
    {
      id: 'rest-api',
      name: 'REST API',
      icon: Network,
      color: '#06b6d4', // Teal/Cyan
      angle: 350, // ~2:40
      description: 'JSON Endpoints, HTTP Methods, OpenAPI / Swagger Docs, Postman Testing',
    },
    {
      id: 'core-java',
      name: 'Core Java',
      icon: Coffee,
      color: '#f97316', // Java Orange
      angle: 30, // ~4:00
      description: 'OOP Principles, Multithreading, Collections Framework, Stream API',
    },
    {
      id: 'spring-boot',
      name: 'Spring Boot',
      icon: Layers,
      color: '#4ade80', // Spring Green
      angle: 70, // ~5:20
      description: 'Microservices, Dependency Injection, Spring Security, REST Controllers',
    },
    {
      id: 'spring',
      name: 'Spring',
      icon: Leaf,
      color: '#22c55e', // Leaf Green
      angle: 110, // ~6:40
      description: 'Spring Framework Core, IoC Container, AOP, Bean Lifecycle',
    },
    {
      id: 'hibernate',
      name: 'Hibernate',
      icon: Database,
      color: '#a855f7', // Purple
      angle: 150, // ~8:00
      description: 'ORM Mapping, JPA Queries, Entity State Management, Caching',
    },
    {
      id: 'jdbc',
      name: 'JDBC',
      icon: Cable,
      color: '#38bdf8', // Sky Blue
      angle: 190, // ~9:20
      description: 'Database Connectivity, PreparedStatements, Transaction Management',
    },
    {
      id: 'mysql',
      name: 'MySQL',
      icon: Cpu,
      color: '#22d3ee', // Cyan
      angle: 230, // ~10:40
      description: 'Relational DB Design, Indexing, Complex SQL Joins, ACID Compliance',
    },
  ];

  // Fixed Orbit Circle Radius in Pixels (Equal radius along X and Y axes)
  const orbitRadiusPx = 230;

  return (
    <section id="skills" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Skills</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2 font-sans">
            Interactive 3D orbital tech stack showcasing core backend & full-stack technologies.
          </p>
        </motion.div>

        {/* 3D Orbital Platform Container */}
        <div className="relative w-full max-w-4xl mx-auto h-[540px] sm:h-[640px] flex items-center justify-center">
          
          {/* SVG Orbit Ring & Radial Lines (Uses exact calc matching CSS node center points) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbit Circle (Fixed pixel radius passing exactly through every hexagon center) */}
            <circle
              cx="50%"
              cy="50%"
              r={orbitRadiusPx}
              fill="none"
              stroke="rgba(34, 211, 238, 0.3)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              className="hidden sm:block animate-[spin_60s_linear_infinite] origin-center"
            />

            {/* Straight Radial Connecting Lines from Center Orb to Each Hexagon Center */}
            {skills.map((skill) => {
              const rad = (skill.angle * Math.PI) / 180;
              const dx = Math.round(orbitRadiusPx * Math.cos(rad));
              const dy = Math.round(orbitRadiusPx * Math.sin(rad));
              const isActive = activeSkill === skill.id;

              return (
                <line
                  key={skill.id}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${dx}px)`}
                  y2={`calc(50% + ${dy}px)`}
                  stroke={isActive ? '#22d3ee' : 'rgba(56, 189, 248, 0.25)'}
                  strokeWidth={isActive ? '2.5' : '1.5'}
                  filter={isActive ? 'url(#glow)' : 'none'}
                  className="transition-all duration-300 hidden sm:block"
                />
              );
            })}
          </svg>

          {/* Central 3D Disc Platform */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* 3D Circular Disc Base */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-navy-800 to-navy-950 border-4 border-cyan-500/40 shadow-[0_0_50px_rgba(34,211,238,0.35)] flex items-center justify-center group transform transition-transform duration-500 hover:scale-105">
              {/* Outer Glowing Ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/60 animate-ping opacity-20" />
              <div className="absolute -inset-3 rounded-full border border-sky-400/30 animate-[spin_18s_linear_infinite]" />

              {/* Floating 3D Java Coffee Cup Icon */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex flex-col items-center justify-center cursor-pointer"
              >
                {/* Coffee steam glowing cyan/orange lines */}
                <div className="flex space-x-1.5 mb-1 opacity-90">
                  <motion.span
                    animate={{ y: [-4, -12, -4], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-3.5 rounded-full bg-gradient-to-t from-orange-500 to-cyan-400"
                  />
                  <motion.span
                    animate={{ y: [-2, -10, -2], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.3, repeat: Infinity, delay: 0.3 }}
                    className="w-1.5 h-4.5 rounded-full bg-gradient-to-t from-orange-400 to-cyan-300"
                  />
                  <motion.span
                    animate={{ y: [-5, -13, -5], opacity: [0.3, 0.9, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
                    className="w-1.5 h-3.5 rounded-full bg-gradient-to-t from-amber-500 to-cyan-400"
                  />
                </div>

                {/* Coffee Cup Graphic */}
                <Coffee className="w-12 h-12 sm:w-14 sm:h-14 text-cyan-400 drop-shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                <span className="mt-1 font-mono text-xs sm:text-sm font-extrabold text-cyan-300 tracking-widest uppercase">
                  JAVA
                </span>
              </motion.div>
            </div>
          </div>

          {/* 9 Hexagon Glass Tiles Positioned Symmetrically in Clockwise Order */}
          <div className="hidden sm:block absolute inset-0 pointer-events-none">
            {skills.map((skill, index) => {
              const rad = (skill.angle * Math.PI) / 180;
              const dx = Math.round(orbitRadiusPx * Math.cos(rad));
              const dy = Math.round(orbitRadiusPx * Math.sin(rad));
              const IconComp = skill.icon;
              const isActive = activeSkill === skill.id;

              return (
                <motion.div
                  key={skill.id}
                  style={{
                    left: `calc(50% + ${dx}px)`,
                    top: `calc(50% + ${dy}px)`,
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3.5 + (index % 4) * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  onMouseEnter={() => setActiveSkill(skill.id)}
                  onMouseLeave={() => setActiveSkill(null)}
                  className="absolute pointer-events-auto cursor-pointer group"
                >
                  <div
                    className={`-translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 glass-panel clip-hexagon flex flex-col items-center justify-center p-2.5 transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-950/95 border-cyan-400 scale-110 shadow-[0_0_35px_#22d3ee] z-30'
                        : 'hover:scale-105 hover:bg-navy-900/90 z-20'
                    }`}
                  >
                    <IconComp
                      className="w-6 h-6 sm:w-7 sm:h-7 mb-1 transition-transform duration-300 group-hover:scale-110 shrink-0"
                      style={{ color: skill.color }}
                    />
                    <span className="text-[11px] sm:text-xs font-bold font-display text-white tracking-wide text-center leading-tight max-w-[85px] break-words">
                      {skill.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Fallback Grid Layout */}
          <div className="sm:hidden grid grid-cols-2 gap-2.5 w-full mt-6 z-20">
            {skills.map((skill) => {
              const IconComp = skill.icon;
              return (
                <div
                  key={skill.id}
                  className="glass-panel p-2.5 rounded-xl flex items-center space-x-2.5 border border-cyan-500/30"
                >
                  <IconComp className="w-5 h-5 shrink-0" style={{ color: skill.color }} />
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">{skill.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{skill.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hover Info Tooltip Banner */}
        <div className="mt-6 min-h-[48px] flex items-center justify-center">
          {activeSkill ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-full glass-panel border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)] text-xs sm:text-sm text-cyan-200"
            >
              <span className="font-bold text-white">
                {skills.find((s) => s.id === activeSkill)?.name}:
              </span>
              <span>{skills.find((s) => s.id === activeSkill)?.description}</span>
            </motion.div>
          ) : (
            <span className="text-xs font-mono text-slate-500">
              [ Hover over tech tiles to inspect framework details ]
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;



