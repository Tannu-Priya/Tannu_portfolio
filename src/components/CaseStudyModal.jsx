import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  Cpu, 
  ArrowRight,
  TrendingUp,
  FileCode2
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { soundManager } from '../utils/sound';

export default function CaseStudyModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-charcoal-900 border border-white/15 rounded-3xl shadow-2xl overflow-y-auto z-10 custom-scrollbar text-silver-200"
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-charcoal-900/90 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-champagne-400/10 text-champagne-300 border border-champagne-400/20">
                  Case Study
                </span>
                <span className="text-xs font-mono text-silver-400 hidden sm:inline">
                  {project.category}
                </span>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="p-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-silver-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-10 space-y-10">
              {/* Title & Tagline */}
              <div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                  {project.title}
                </h2>
                <p className="text-lg text-champagne-300 font-medium mb-3">
                  {project.subtitle}
                </p>
                <p className="text-base text-silver-300/90 font-light leading-relaxed">
                  {project.tagline}
                </p>

                {/* Metric pill */}
                <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-charcoal-950/80 border border-champagne-400/30">
                  <TrendingUp size={16} className="text-champagne-300" />
                  <span className="text-xs font-mono text-white font-semibold">
                    {project.featuredMetric}
                  </span>
                  <span className="text-xs text-silver-400">
                    — {project.featuredMetricLabel}
                  </span>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div>
                <div className="text-xs font-mono text-silver-400 uppercase tracking-widest mb-3">
                  Technologies Utilized
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-charcoal-800 text-xs font-mono text-silver-200 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Overview */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10">
                <h3 className="font-display text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-champagne-300" />
                  <span>Project Overview</span>
                </h3>
                <p className="text-silver-300 text-sm sm:text-base leading-relaxed font-light">
                  {project.overview}
                </p>
              </div>

              {/* Problem vs Solution Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Problem Statement */}
                <div className="rounded-2xl p-6 bg-charcoal-950/60 border border-red-500/20">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-mono uppercase tracking-widest mb-3">
                    <AlertTriangle size={14} />
                    <span>The Problem Statement</span>
                  </div>
                  <p className="text-sm text-silver-300 leading-relaxed font-light">
                    {project.problemStatement}
                  </p>
                </div>

                {/* The Solution */}
                <div className="rounded-2xl p-6 bg-charcoal-950/60 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
                    <CheckCircle2 size={14} />
                    <span>The Engineered Solution</span>
                  </div>
                  <p className="text-sm text-silver-300 leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Features List */}
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Layers size={18} className="text-champagne-300" />
                  <span>Key Architecture & Features</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-charcoal-950/40 border border-white/5 flex items-start gap-3"
                    >
                      <CheckCircle2 size={16} className="text-champagne-300 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-silver-300 font-light">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* My Contribution */}
              <div className="p-6 rounded-2xl bg-charcoal-950/70 border border-white/10">
                <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <FileCode2 size={16} className="text-champagne-300" />
                  <span>My Engineering Contribution</span>
                </h3>
                <p className="text-sm text-silver-300 leading-relaxed font-light">
                  {project.contribution}
                </p>
              </div>

              {/* Technical Challenges & Solutions */}
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu size={18} className="text-champagne-300" />
                  <span>Technical Challenges & Breakthroughs</span>
                </h3>
                <div className="space-y-4">
                  {project.challengesAndSolutions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-charcoal-800/40 border border-white/10 space-y-2"
                    >
                      <div className="text-xs font-mono text-champagne-300 font-semibold">
                        Challenge {idx + 1}: {item.challenge}
                      </div>
                      <div className="text-xs sm:text-sm text-silver-300 font-light leading-relaxed pl-2 border-l-2 border-champagne-400/40">
                        <strong className="text-white font-medium">Engineered Fix: </strong>
                        {item.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* External Links / Actions */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-silver-200 hover:text-white border border-white/10 text-xs font-medium transition-colors"
                  >
                    <GithubIcon size={15} />
                    <span>View Repository</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-champagne-300 hover:bg-champagne-200 text-charcoal-950 text-xs font-semibold transition-colors"
                  >
                    <ExternalLink size={15} />
                    <span>Live Demonstration</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="text-xs font-mono text-silver-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
