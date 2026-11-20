import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  Cpu 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';
import CaseStudyModal from './CaseStudyModal';
import { soundManager } from '../utils/sound';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenCaseStudy = (project) => {
    soundManager.playClick();
    setActiveProject(project);
    setModalOpen(true);
  };

  // Custom visual background accents per project
  const projectAesthetics = {
    medishare: {
      gradient: 'from-emerald-950/40 via-charcoal-900 to-charcoal-950',
      badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
      accentGlow: 'bg-emerald-500/10',
      icon: Activity,
    },
    aurelle: {
      gradient: 'from-amber-950/30 via-charcoal-900 to-charcoal-950',
      badgeColor: 'border-champagne-400/30 text-champagne-300 bg-champagne-400/10',
      accentGlow: 'bg-champagne-400/10',
      icon: Sparkles,
    },
    realtimebid: {
      gradient: 'from-blue-950/40 via-charcoal-900 to-charcoal-950',
      badgeColor: 'border-blue-400/30 text-blue-300 bg-blue-500/10',
      accentGlow: 'bg-blue-500/10',
      icon: TrendingUp,
    },
    'disaster-relief': {
      gradient: 'from-rose-950/30 via-charcoal-900 to-charcoal-950',
      badgeColor: 'border-rose-400/30 text-rose-300 bg-rose-500/10',
      accentGlow: 'bg-rose-500/10',
      icon: Cpu,
    },
  };

  return (
    <section id="projects" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-champagne-400/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-3">
            <FolderGit2 size={12} />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Engineering Rigor & <br />
            <span className="text-gradient-metallic">Digital Craftsmanship</span>
          </h2>
        </div>

        <p className="text-silver-400 text-sm max-w-md font-light leading-relaxed">
          Deep-dive into production systems built around algorithmic optimization, real-time architectures, and high-fashion editorial interfaces.
        </p>
      </div>

      {/* Featured Projects List */}
      <div className="space-y-12">
        {projectsData.map((project, index) => {
          const aesthetic = projectAesthetics[project.id] || projectAesthetics.medishare;
          const ProjectIcon = aesthetic.icon;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl border border-white/10 bg-gradient-to-br ${aesthetic.gradient} p-6 sm:p-10 relative overflow-hidden group hover:border-champagne-400/40 transition-all duration-500 shadow-2xl`}
            >
              {/* Corner Ambient Glow */}
              <div
                className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none ${aesthetic.accentGlow}`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left/Main Column: Project Details */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Category & Status Bar */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-silver-400 px-3 py-1 rounded-full bg-charcoal-950/60 border border-white/10">
                        {project.category}
                      </span>
                      <span className={`text-[11px] font-mono px-3 py-1 rounded-full border ${aesthetic.badgeColor}`}>
                        {project.featuredMetric}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 group-hover:text-champagne-200 transition-colors">
                      {project.title}
                    </h3>

                    {/* Subtitle / Tagline */}
                    <p className="text-sm sm:text-base text-champagne-300 font-medium mb-4">
                      {project.subtitle}
                    </p>

                    {/* Short Description */}
                    <p className="text-sm text-silver-300/90 font-light leading-relaxed mb-6 line-clamp-3">
                      {project.overview}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-charcoal-900/80 border border-white/5 text-[11px] font-mono text-silver-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
                    <button
                      onClick={() => handleOpenCaseStudy(project)}
                      onMouseEnter={() => soundManager.playHover()}
                      data-cursor="CASE"
                      className="shimmer-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-silver-100 to-champagne-200 text-charcoal-950 text-xs font-semibold tracking-wide flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight size={14} />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-charcoal-900/80 hover:bg-charcoal-800 text-silver-300 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-2 transition-colors"
                    >
                      <GithubIcon size={14} />
                      <span>Code</span>
                    </a>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-charcoal-900/80 hover:bg-charcoal-800 text-silver-300 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Architectural Visual Mockup Panel */}
                <div className="lg:col-span-5 w-full">
                  <div
                    onClick={() => handleOpenCaseStudy(project)}
                    className="relative aspect-video lg:aspect-square rounded-2xl bg-charcoal-950/80 border border-white/10 p-5 flex flex-col justify-between overflow-hidden cursor-pointer group/preview shadow-inner"
                  >
                    {/* Top Bar inside mockup */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="text-[10px] font-mono text-silver-500">
                        sys::{project.id}.manifest
                      </div>
                    </div>

                    {/* Center Graphic */}
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <div className="w-16 h-16 rounded-2xl bg-charcoal-900 border border-white/15 flex items-center justify-center mb-3 group-hover/preview:scale-110 group-hover/preview:border-champagne-400/50 transition-all shadow-xl">
                        <ProjectIcon size={28} className="text-champagne-300" />
                      </div>
                      <div className="font-display font-bold text-white text-base mb-1">
                        {project.title}
                      </div>
                      <div className="text-xs font-mono text-silver-400">
                        {project.featuredMetricLabel}: <span className="text-champagne-300">{project.featuredMetric}</span>
                      </div>
                    </div>

                    {/* Bottom Status Feed */}
                    <div className="rounded-lg bg-charcoal-900/90 border border-white/5 p-3 flex items-center justify-between text-[11px] font-mono text-silver-400">
                      <span>VERIFIED METRIC</span>
                      <span className="text-emerald-400">OPTIMIZED</span>
                    </div>

                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity">
                      <span className="px-4 py-2 rounded-xl bg-champagne-300 text-charcoal-950 text-xs font-semibold font-mono tracking-wide flex items-center gap-1.5 shadow-xl">
                        <span>CLICK TO EXPAND CASE STUDY</span>
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
