import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, Download, Code2, Terminal, Layers } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

export default function Hero() {
  const handleScrollTo = (id) => {
    soundManager.playClick();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 px-6 sm:px-8"
    >
      {/* 3D WebGL Canvas Layer */}
      <HeroCanvas />

      {/* Atmospheric Ambient Lighting Background */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-champagne-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-charcoal-900/80 border border-white/10 backdrop-blur-md mb-8 shadow-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-silver-300">
            {personalInfo.availability}
          </span>
          <span className="text-charcoal-700">|</span>
          <span className="text-[11px] font-mono text-champagne-300/90 tracking-wide">
            Portfolio '26
          </span>
        </motion.div>

        {/* Oversized Name Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-2"
        >
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-gradient-metallic uppercase select-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
            {personalInfo.name}
          </h1>
          {/* Subtle reflection under name */}
          <div className="hidden sm:block absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-champagne-400/40 to-transparent blur-sm" />
        </motion.div>

        {/* Professional Title Sub-label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-wider text-silver-400 mb-6"
        >
          <span className="text-champagne-300 font-semibold">Full Stack Developer</span>
          <span>•</span>
          <span className="text-silver-200">React.js Specialist</span>
          <span>•</span>
          <span className="text-silver-300">Software Engineer</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 max-w-3xl leading-tight"
        >
          {personalInfo.tagline}
        </motion.h2>

        {/* Short Introduction Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-silver-300/90 max-w-2xl font-light leading-relaxed mb-10"
        >
          {personalInfo.introduction}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Explore My Work CTA */}
          <button
            onClick={() => handleScrollTo('#projects')}
            onMouseEnter={() => soundManager.playHover()}
            data-cursor="WORK"
            className="shimmer-btn group w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-silver-100 via-champagne-200 to-white text-charcoal-950 font-semibold text-sm tracking-wide shadow-[0_0_35px_rgba(238,215,161,0.25)] hover:shadow-[0_0_50px_rgba(238,215,161,0.45)] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Explore My Work</span>
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </button>

          {/* Download Resume CTA */}
          <button
            onClick={() => handleScrollTo('#resume')}
            onMouseEnter={() => soundManager.playHover()}
            data-cursor="RESUME"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-charcoal-900/80 hover:bg-charcoal-800/90 text-silver-200 hover:text-white border border-white/10 hover:border-champagne-400/40 backdrop-blur-md font-medium text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
          >
            <Download size={16} className="text-champagne-300" />
            <span>Download Resume</span>
          </button>
        </motion.div>

        {/* Micro-Metrics Teaser Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-3xl"
        >
          <div className="text-center sm:text-left">
            <div className="font-display text-2xl font-bold text-white tracking-tight">350+</div>
            <div className="text-[11px] font-mono text-silver-400 tracking-wider uppercase mt-0.5">DSA Problems Solved</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-display text-2xl font-bold text-white tracking-tight">4+</div>
            <div className="text-[11px] font-mono text-silver-400 tracking-wider uppercase mt-0.5">Production Projects</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-display text-2xl font-bold text-champagne-300 tracking-tight">Ediglobe</div>
            <div className="text-[11px] font-mono text-silver-400 tracking-wider uppercase mt-0.5">Web Dev Intern</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-display text-2xl font-bold text-white tracking-tight">B.Tech</div>
            <div className="text-[11px] font-mono text-silver-400 tracking-wider uppercase mt-0.5">Computer Science</div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        onClick={() => handleScrollTo('#about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-silver-400 group-hover:text-champagne-300 transition-colors">
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-champagne-400/50 transition-colors">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-champagne-300"
          />
        </div>
      </motion.div>
    </section>
  );
}
