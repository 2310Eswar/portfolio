import React from 'react';
import { X, Award, CheckCircle2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CertificatesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const certificates = [
    {
      title: 'Java Programming Internship Certification',
      issuer: 'CODTECH IT Solutions Pvt. Ltd',
      date: '2023',
      description: 'Hands-on experience developing Java backend services, Spring Boot REST APIs, and relational MySQL database integrations.',
    },
    {
      title: 'Java for Beginners Certification',
      issuer: 'Infosys Springboard',
      date: '2023',
      description: 'Certified core proficiency in Object-Oriented Programming (OOP), Java Collections framework, and Exception handling.',
    },
    {
      title: 'B.E. Computer Science & Engineering',
      issuer: 'Dhaanish Ahmed College of Engineering (Anna University)',
      date: '2023 - 2027',
      description: 'NAAC A+ Accredited Degree program focusing on Software Architecture, Data Structures, Operating Systems, and DBMS.',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl glass-panel neon-corner-bracket p-6 sm:p-8 rounded-2xl border border-cyan-500/40 shadow-[0_0_50px_rgba(34,211,238,0.3)] max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <Award className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]" />
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Verified Credentials & Certifications
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* List of Certificates */}
          <div className="space-y-4">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-navy-900/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <h4 className="text-base font-semibold text-slate-100">{cert.title}</h4>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {cert.date}
                  </span>
                </div>
                <div className="text-xs font-mono text-cyan-300/80 mt-1 pl-6">
                  {cert.issuer}
                </div>
                <p className="text-xs text-slate-300 mt-2 pl-6 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>

          {/* Modal Footer */}
          <div className="mt-6 pt-4 border-t border-cyan-500/20 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CertificatesModal;
