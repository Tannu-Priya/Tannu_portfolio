import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles, Briefcase, Bot, Radio } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { portfolioNarrator } from '../utils/narrator';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'AI Architect', href: '#ai-consultant' },
    { name: 'AI Resume', href: '#ai-resume-analyzer' },
    { name: 'Services', href: '#client-conversion' },
    { name: 'Experience', href: '#experience' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'projects', 'ai-consultant', 'ai-resume-analyzer', 'client-conversion', 'experience', 'roadmap', 'resume', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [narratorStatus, setNarratorStatus] = useState('idle');

  useEffect(() => {
    const unsub = portfolioNarrator.subscribe((state) => {
      setNarratorStatus(state.status);
    });
    return unsub;
  }, []);

  const handleSoundToggle = () => {
    soundManager.playClick();
    portfolioNarrator.toggle();
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    soundManager.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-obsidian-950/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/80'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            onMouseEnter={() => soundManager.playHover()}
            className="group flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-obsidian-800 to-obsidian-900 border border-white/15 flex items-center justify-center overflow-hidden group-hover:border-champagne-400/50 transition-colors shadow-inner">
              <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-tr from-champagne-300 to-white text-base">
                TP
              </span>
              <div className="absolute inset-0 bg-champagne-300/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-silver-100 group-hover:text-champagne-300 transition-colors">
                Tannu Priya
              </span>
              <span className="text-[10px] font-mono text-silver-400 tracking-wider uppercase flex items-center gap-1">
                <span>OBSIDIAN X</span>
                <span className="text-champagne-300 font-bold">AI</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-obsidian-900/70 border border-white/[0.08] rounded-full px-3 py-1.5 backdrop-blur-lg shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-all rounded-full ${
                    isActive
                      ? 'text-white'
                      : 'text-silver-400 hover:text-silver-200'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 bg-white/[0.08] border border-champagne-400/30 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Availability, Sound, Conversion CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Availability Pill */}
            <div className="hidden 2xl:flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-900/60 border border-emerald-500/20 text-xs font-mono text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Actively Seeking Opportunities</span>
            </div>

            {/* AI Portfolio Voice Narrator Toggle */}
            <button
              onClick={handleSoundToggle}
              title={narratorStatus === 'playing' ? 'Pause AI Voice Narrator' : 'Start AI Voice Narrator'}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                narratorStatus === 'playing'
                  ? 'bg-champagne-400/20 border-champagne-400 text-champagne-300 shadow-[0_0_15px_rgba(238,215,161,0.3)]'
                  : narratorStatus === 'paused'
                  ? 'bg-obsidian-850 border-champagne-400/40 text-champagne-300'
                  : 'bg-obsidian-900/60 border-white/[0.08] text-silver-400 hover:text-white hover:border-white/20'
              }`}
            >
              {narratorStatus === 'playing' ? (
                <div className="flex items-center gap-0.5 h-4 px-0.5">
                  <span className="w-0.5 h-3 rounded-full bg-champagne-300 animate-pulse" />
                  <span className="w-0.5 h-4 rounded-full bg-champagne-300 animate-pulse delay-75" />
                  <span className="w-0.5 h-2 rounded-full bg-champagne-300 animate-pulse delay-150" />
                </div>
              ) : (
                <Volume2 size={16} />
              )}
              <span className="hidden lg:inline text-[10px] font-mono font-semibold uppercase tracking-wider text-silver-300">
                {narratorStatus === 'playing' ? 'Narrating' : 'Voice Intro'}
              </span>
            </button>

            {/* Start Project CTA Button */}
            <a
              href="#client-conversion"
              onClick={(e) => handleNavClick(e, '#client-conversion')}
              onMouseEnter={() => soundManager.playHover()}
              className="shimmer-btn flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-silver-100 to-champagne-200 text-obsidian-950 text-xs font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(238,215,161,0.35)] transition-all cursor-pointer"
            >
              <Briefcase size={13} />
              <span>Start Project</span>
            </a>
          </div>

          {/* Mobile Menu Button & Voice Narrator */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-lg border transition-colors ${
                narratorStatus === 'playing'
                  ? 'bg-champagne-400/20 border-champagne-400 text-champagne-300'
                  : 'bg-obsidian-900 border-white/10 text-silver-300'
              }`}
              title="Toggle AI Voice Narrator"
            >
              {narratorStatus === 'playing' ? <Volume2 size={16} className="text-champagne-300 animate-pulse" /> : <Volume2 size={16} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-obsidian-900 border border-white/10 text-silver-200 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sliding Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] z-30 p-6 bg-obsidian-950/95 backdrop-blur-2xl border-b border-white/10 flex flex-col gap-3 xl:hidden"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Actively Seeking Opportunities</span>
            </div>

            <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2.5 rounded-xl bg-obsidian-900/60 border border-white/5 text-sm font-medium text-silver-200 hover:text-champagne-300 hover:border-champagne-400/30 transition-all flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={14} className="text-silver-500" />
                </a>
              ))}
            </div>

            <a
              href="#client-conversion"
              onClick={(e) => handleNavClick(e, '#client-conversion')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-silver-100 to-champagne-200 text-obsidian-950 text-center font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <Briefcase size={15} />
              <span>Start Your Project</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
