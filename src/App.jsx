import React, { useState } from 'react';
import ParticleGridBackground from './components/ParticleGridBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import CertificatesModal from './components/CertificatesModal';

function App() {
  const [certModalOpen, setCertModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Shared Fixed 3D Particle & Grid Floor Background */}
      <ParticleGridBackground />

      {/* Top Floating Glass Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section (#home) */}
        <HeroSection />

        {/* Section 1: About Me */}
        <AboutSection onOpenCertificates={() => setCertModalOpen(true)} />

        {/* Section 2: Technical Skills (3D Orbital Layout) */}
        <SkillsSection />

        {/* Section 3: Featured Projects (3D Coverflow Carousel) */}
        <ProjectsSection />

        {/* Section 4: Contact (Glass Form + 3 Social Pills) */}
        <ContactSection />
      </main>

      {/* Certificates Modal */}
      <CertificatesModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/20 py-8 bg-navy-950/90 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 <span className="text-white font-semibold">Eswar S</span>. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
