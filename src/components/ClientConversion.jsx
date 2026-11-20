import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Layout, 
  Database, 
  ShoppingBag, 
  Workflow, 
  Layers,
  ArrowUpRight,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function ClientConversion() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Full Stack Applications',
    budget: '$1,000 – $3,000',
    timeline: '1–2 Months',
    description: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const services = [
    {
      title: 'Full Stack Applications',
      icon: Database,
      desc: 'End-to-end web applications built with React, Node.js, Express, and high-performance databases.'
    },
    {
      title: 'Frontend & React Engineering',
      icon: Code2,
      desc: 'Interactive, fast-rendering Single Page Applications (SPAs) with state architecture and micro-interactions.'
    },
    {
      title: 'E-Commerce Development',
      icon: ShoppingBag,
      desc: 'Editorial and conversion-optimized retail platforms with fluid catalogs and checkout workflows.'
    },
    {
      title: 'UI/UX Design Implementation',
      icon: Layout,
      desc: 'Translating Figma or design mockups into pixel-perfect, accessible, responsive code with Tailwind CSS.'
    },
    {
      title: 'REST API & Systems Integration',
      icon: Workflow,
      desc: 'Designing scalable, secure API endpoints with authentication, rate limiting, and third-party webhooks.'
    },
    {
      title: 'Modern Website Development',
      icon: Layers,
      desc: 'Cinematic corporate landing pages, brand showcases, and portfolios with 3D elements and smooth animations.'
    }
  ];

  const projectTypes = [
    'Full Stack Applications',
    'Frontend & React',
    'E-Commerce Experience',
    'Website Development',
    'API & Backend System',
    'UI/UX Implementation'
  ];

  const budgetOptions = [
    '< $1,000',
    '$1,000 – $3,000',
    '$3,000 – $5,000',
    '$5,000+',
    'Flexible / Discuss'
  ];

  const timelineOptions = [
    'Immediate (< 2 weeks)',
    '1–2 Months',
    '2–3 Months',
    'Flexible / Retainer'
  ];

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();

    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      setErrorMessage('Please provide your name, email, and a brief project description.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
      soundManager.playChime();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#eed7a1', '#cbd5e1', '#ffffff']
      });
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: 'Full Stack Applications',
      budget: '$1,000 – $3,000',
      timeline: '1–2 Months',
      description: ''
    });
    setStatus('idle');
  };

  return (
    <section id="client-conversion" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-champagne-400/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-4">
          <Briefcase size={12} />
          <span>Collaboration & Engineering Services</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
          Have a Vision? <br />
          <span className="text-gradient-champagne">Let's Make It Real.</span>
        </h2>
        <p className="text-silver-300/90 text-base sm:text-lg font-light leading-relaxed">
          I partner with founders, engineering teams, and businesses to build high-performance web products that scale seamlessly.
        </p>
      </div>

      {/* Service Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-champagne-400/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-obsidian-850 border border-white/10 flex items-center justify-center mb-4 group-hover:border-champagne-400/40 group-hover:scale-105 transition-all">
                <Icon size={22} className="text-champagne-300" />
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-champagne-200 transition-colors">
                {service.title}
              </h3>

              <p className="text-xs text-silver-400 font-light leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Conversion Form & Direct Communication Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Commercial Assurance & Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Why Partner With Me?
            </h3>
            <p className="text-sm text-silver-300/90 font-light leading-relaxed mb-6">
              I combine algorithmic rigor (350+ DSA problems solved) with high-craft frontend aesthetics. Every application is built with clean architecture, verified performance, and attention to detail.
            </p>

            <div className="space-y-3.5 mb-8">
              {[
                'Strict adherence to deadlines and milestone deliverables.',
                'Clean, documented React.js & Node.js code ready for scale.',
                'Direct, transparent communication without intermediaries.',
                'End-to-end responsiveness across mobile, tablet, and desktop.'
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-silver-300">
                  <CheckCircle2 size={16} className="text-champagne-300 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Quick Email Box */}
            <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase text-silver-500">Direct Inquiries</div>
                <div className="text-xs font-mono text-silver-200">{personalInfo.email}</div>
              </div>
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundManager.playHover()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-silver-300 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
              >
                {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="glass-card rounded-2xl p-4 border border-white/10 hover:border-champagne-400/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <GithubIcon size={18} className="text-silver-300 group-hover:text-champagne-300 transition-colors" />
                <span className="font-display font-semibold text-xs text-white">GitHub</span>
              </div>
              <ArrowUpRight size={14} className="text-silver-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="glass-card rounded-2xl p-4 border border-white/10 hover:border-champagne-400/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon size={18} className="text-silver-300 group-hover:text-champagne-300 transition-colors" />
                <span className="font-display font-semibold text-xs text-white">LinkedIn</span>
              </div>
              <ArrowUpRight size={14} className="text-silver-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Project Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-champagne-400/20 border border-champagne-400/40 flex items-center justify-center mx-auto text-champagne-300">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Project Inquiry Transmitted!
                </h3>
                <p className="text-sm text-silver-300 font-light max-w-md mx-auto">
                  Thank you, {formData.name}. I have received your project specifications and will reply within 24 hours with an architectural breakdown and proposal.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-silver-200 text-xs font-mono transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Start Your Project Inquiry
                  </h3>
                  <p className="text-xs text-silver-400 font-light">
                    Share your requirements to receive a detailed estimate and technical roadmap.
                  </p>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Lin"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-white placeholder-silver-600 text-sm focus:outline-none focus:border-champagne-400/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. maya@company.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-white placeholder-silver-600 text-sm focus:outline-none focus:border-champagne-400/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Company (Optional) */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Studio Acme or Early-Stage Startup"
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-white placeholder-silver-600 text-sm focus:outline-none focus:border-champagne-400/60 transition-colors"
                  />
                </div>

                {/* Project Type Selector Pills */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2.5">
                    Project Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => {
                      const isSelected = formData.projectType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setFormData({ ...formData, projectType: type });
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-champagne-300 text-obsidian-950 font-semibold shadow-md'
                              : 'bg-obsidian-900 border border-white/10 text-silver-300 hover:border-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Estimated Budget Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2.5">
                    Estimated Budget (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetOptions.map((budget) => {
                      const isSelected = formData.budget === budget;
                      return (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setFormData({ ...formData, budget: budget });
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-champagne-300 text-obsidian-950 font-semibold shadow-md'
                              : 'bg-obsidian-900 border border-white/10 text-silver-300 hover:border-white/20'
                          }`}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Expected Timeline Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2.5">
                    Expected Timeline (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timelineOptions.map((timeline) => {
                      const isSelected = formData.timeline === timeline;
                      return (
                        <button
                          key={timeline}
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setFormData({ ...formData, timeline: timeline });
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-champagne-300 text-obsidian-950 font-semibold shadow-md'
                              : 'bg-obsidian-900 border border-white/10 text-silver-300 hover:border-white/20'
                          }`}
                        >
                          {timeline}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">
                    Project Description & Goals *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your vision, core features, or what problem you are solving..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-white placeholder-silver-600 text-sm focus:outline-none focus:border-champagne-400/60 transition-colors resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-400 font-mono">
                    {errorMessage}
                  </p>
                )}

                {/* Primary High-Impact CTA Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  onMouseEnter={() => soundManager.playHover()}
                  data-cursor="SUBMIT"
                  className="shimmer-btn w-full py-4 rounded-xl bg-gradient-to-r from-silver-100 via-champagne-200 to-white text-obsidian-950 font-semibold text-sm tracking-wide shadow-lg hover:shadow-[0_0_35px_rgba(238,215,161,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </span>
                  ) : (
                    <>
                      <span>Start Your Project</span>
                      <ArrowUpRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
