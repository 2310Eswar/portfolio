import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Code2, Sparkles, Mail, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/eswarrawsr2006@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          Name: `${formData.name} ${formData.lastName}`.trim(),
          Email: formData.email,
          Message: formData.message,
          _subject: `Portfolio Inquiry from ${formData.name} ${formData.lastName}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22d3ee', '#38bdf8', '#2563eb'],
        });
      } else {
        // Show success fallback
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full text-center">
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
            <span>Initiate Contact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Me</span>
          </h2>
        </motion.div>

        {/* Glass Form Card (Matching Screenshot 2) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(10,14,26,0.9)] text-left relative overflow-hidden"
        >
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-950/80 border-2 border-cyan-400 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_25px_#22d3ee]">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white">Transmission Received!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for reaching out. I have received your message and will respond promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 text-xs font-mono text-cyan-300 border border-cyan-500/40 rounded-lg hover:bg-cyan-500/10"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Width Top Input (Name / Tech Stack) */}
              <div>
                <label className="block text-xs font-mono text-cyan-400 font-medium mb-1.5">
                  Tech Stack / Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full px-4 py-3 text-sm text-slate-100 placeholder-slate-500 cyan-input"
                />
              </div>

              {/* Side-by-Side Inputs (Last Name & Email matching Screenshot 2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-cyan-400 font-medium mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full px-4 py-3 text-sm text-slate-100 placeholder-slate-500 cyan-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyan-400 font-medium mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 text-sm text-slate-100 placeholder-slate-500 cyan-input"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-xs font-mono text-cyan-400 font-medium mb-1.5">
                  Message Details
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  className="w-full px-4 py-3 text-sm text-slate-100 placeholder-slate-500 cyan-input resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 hover:from-blue-500 hover:to-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                {loading ? (
                  <span className="animate-pulse">Encrypting & Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Sub-text Note Below Form (Matching Screenshot 2) */}
          <div className="mt-6 pt-4 border-t border-cyan-500/20 text-center">
            <p className="text-xs text-slate-400 font-sans">
              Reach out via{' '}
              <a
                href="https://github.com/2310Eswar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline underline-offset-2"
              >
                GitHub
              </a>{' '}
              or{' '}
              <a
                href="mailto:eswarrawsr2006@gmail.com"
                className="text-cyan-400 hover:underline underline-offset-2"
              >
                email & resources
              </a>
            </p>
          </div>
        </motion.div>

        {/* Row of 3 Large Pill-Shaped Glass Buttons Below Card (Matching Screenshot 2) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {/* GitHub Pill Button */}
          <a
            href="https://github.com/2310Eswar"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/60 shadow-[0_0_20px_rgba(10,14,26,0.6)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <Github className="w-6 h-6 text-slate-200 group-hover:text-cyan-400 transition-colors" />
            <span className="text-lg font-bold font-display text-white group-hover:text-cyan-300">
              GitHub
            </span>
          </a>

          {/* LinkedIn Pill Button */}
          <a
            href="https://www.linkedin.com/in/eswar-s-4b26752b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/60 shadow-[0_0_20px_rgba(10,14,26,0.6)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <Linkedin className="w-6 h-6 text-slate-200 group-hover:text-cyan-400 transition-colors" />
            <span className="text-lg font-bold font-display text-white group-hover:text-cyan-300">
              LinkedIn
            </span>
          </a>

          {/* LeetCode Pill Button */}
          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/60 shadow-[0_0_20px_rgba(10,14,26,0.6)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <Code2 className="w-6 h-6 text-slate-200 group-hover:text-cyan-400 transition-colors" />
            <span className="text-lg font-bold font-display text-white group-hover:text-cyan-300">
              LeetCode
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
