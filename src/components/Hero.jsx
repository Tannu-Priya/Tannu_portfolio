import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowUpRight, Sparkles, Download, Layers, ArrowDown } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

export default function Hero() {
  const headlineRef = useRef(null);
  const nameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP Cinematic Entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 px-6 sm:px-8 bg-[#030305]"
    >
      {/* 3D WebGL Canvas Layer */}
      <HeroCanvas />

      {/* Atmospheric Ambient Lighting / Cinematic Spotlights */}
      <div className="absolute top-1/4 -left-28 w-[450px] h-[450px] bg-champagne-400/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-35 pointer-events-none" />

      {/* Radial vignette mask to preserve text readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(3,3,5,0.4)_0%,_rgba(3,3,5,0.85)_80%)] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-obsidian-850/80 border border-white/10 backdrop-blur-md mb-8 shadow-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-silver-300">
            Available for Opportunities
          </span>
          <span className="text-obsidian-700">|</span>
          <span className="text-[11px] font-mono text-champagne-300 tracking-wide">
            OBSIDIAN X
          </span>
        </motion.div>

        {/* Oversized Name Typography */}
        <div ref={nameRef} className="relative mb-3">
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-gradient-metallic uppercase select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
            TANNU PRIYA
          </h1>
          {/* Subtle reflection bar */}
          <div className="hidden sm:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-champagne-400/40 to-transparent blur-xs" />
        </div>

        {/* Primary Headline */}
        <h2
          ref={headlineRef}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 max-w-3xl leading-tight"
        >
          Turning Ideas Into <br className="hidden sm:inline" />
          <span className="text-gradient-champagne">Exceptional Digital Experiences.</span>
        </h2>

        {/* Professional Title Sub-label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-wider text-silver-400 mb-6"
        >
          <span className="text-champagne-300 font-semibold">Full Stack Developer</span>
          <span>•</span>
          <span className="text-silver-200">React.js Developer</span>
          <span>•</span>
          <span className="text-silver-300">Creative Problem Solver</span>
        </motion.div>

        {/* Short Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-base sm:text-lg text-silver-300/90 max-w-2xl font-light leading-relaxed mb-10"
        >
          {personalInfo.introduction}
        </motion.p>

        {/* High-Conversion CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Let's Work Together CTA (High-Priority Conversion) */}
          <button
            onClick={() => handleScrollTo('#client-conversion')}
            onMouseEnter={() => soundManager.playHover()}
            data-cursor="CONNECT"
            className="shimmer-btn group w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-silver-100 via-champagne-200 to-white text-obsidian-950 font-semibold text-sm tracking-wide shadow-[0_0_35px_rgba(238,215,161,0.25)] hover:shadow-[0_0_50px_rgba(238,215,161,0.45)] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Let's Work Together</span>
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </button>

          {/* Explore My Work CTA */}
          <button
            onClick={() => handleScrollTo('#projects')}
            onMouseEnter={() => soundManager.playHover()}
            data-cursor="WORK"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-obsidian-900/80 hover:bg-obsidian-800 text-silver-200 hover:text-white border border-white/10 hover:border-champagne-400/40 backdrop-blur-md font-medium text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
          >
            <Layers size={16} className="text-champagne-300" />
            <span>Explore My Work</span>
          </button>
        </motion.div>

        {/* Micro-Metrics Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-3xl"
        >
          <div className="text-center sm:text-left">
            <div className="font-display text-2xl font-bold text-white tracking-tight">350+</div>
            <div className="text-[11px] font-mono text-silver-400 tracking-wider uppercase mt-0.5">
              DSA Solved (LeetCode & GFG)
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-display text-2xl font-bold text-white tracking-tight">4+</div>
            <div className="text-[11px] font-mono text-silver-400 tracking-wider uppercase mt-0.5">
              Major Projects
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-display text-2xl font-bold text-champagne-300 tracking-tight">Ediglobe</div>
            <div className="text-[11px] font-mono text-silver-400 tracking-wider uppercase mt-0.5">
              Web Developer Intern
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-display text-2xl font-bold text-white tracking-tight">B.Tech</div>
            <div className="text-[11px] font-mono text-silver-400 tracking-wider uppercase mt-0.5">
              Computer Science & Engg.
            </div>
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
