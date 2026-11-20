import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  BrainCircuit, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  ExternalLink,
  Cpu,
  Workflow
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

export default function About() {
  const [activeTab, setActiveTab] = useState('philosophy');

  const tabs = [
    {
      id: 'philosophy',
      label: 'Development Philosophy',
      icon: BrainCircuit,
      content: {
        title: 'Algorithmic Precision Meets Aesthetic Craft',
        description:
          'I believe that the best software lives at the intersection of mathematical clarity and human intuition. Code is not just instructions for a machine; it is a medium for crafting resilient systems that empower people effortlessly.',
        principles: [
          'Design for deterministic performance and low latency from day one.',
          'Value modularity, clean component boundaries, and reusable design primitives.',
          'Obsess over micro-interactions that communicate intent without friction.'
        ]
      }
    },
    {
      id: 'mindset',
      label: 'Problem-Solving Mindset',
      icon: Cpu,
      content: {
        title: 'Root-Cause Engineering & Systematic Deconstruction',
        description:
          'Having solved over 350+ problems across LeetCode and GeeksforGeeks, I approach software challenges with an analytical, complexity-aware mindset. I systematically break large ambiguous bottlenecks into verifiable, discrete subproblems.',
        principles: [
          'Mastery over time and space complexity trade-offs in real-time execution.',
          'Data-driven decision making when choosing data structures and query schemas.',
          'Tenacious debugging that identifies systemic failure modes rather than patching symptoms.'
        ]
      }
    },
    {
      id: 'vision',
      label: 'AI & Next-Gen Architecture',
      icon: Workflow,
      content: {
        title: 'Scalable Systems & Intelligent Interfaces',
        description:
          'The future of the web belongs to dynamic, intelligent interfaces that adapt contextually to user needs. I am enthusiastic about integrating AI capabilities, real-time sync engines, and 3D web experiences into production systems.',
        principles: [
          'Architecting scalable REST and event-driven backend services.',
          'Pioneering AI-assisted workflows and context-aware client interfaces.',
          'Creating accessible, high-performance web experiences for diverse viewports.'
        ]
      }
    }
  ];

  return (
    <section id="about" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-champagne-400/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-3">
          <Sparkles size={12} />
          <span>Editorial Narrative</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          A Discipline of Logic, Craft & <br className="hidden sm:inline" />
          <span className="font-editorial italic font-normal text-gradient-champagne">Continuous Evolution</span>
        </h2>
      </div>

      {/* Main Split-Screen Grid: Left Visual Portrait & Right Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start mb-20">
        {/* Left Column: Portrait Frame / Parallax Container */}
        <div className="lg:col-span-5 w-full">
          <div className="relative group">
            {/* Outer Decorative Glow Border */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-champagne-400/20 via-white/5 to-obsidian-800 blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Inner Editorial Frame */}
            <div className="relative rounded-2xl bg-obsidian-900 border border-white/10 p-4 sm:p-5 overflow-hidden shadow-2xl">
              {/* Top Meta Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] text-[11px] font-mono text-silver-400">
                <span className="flex items-center gap-1.5 text-champagne-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-300 animate-pulse" />
                  ID: DEV-TP-2026
                </span>
                <span>STATUS: ACTIVE</span>
              </div>

              {/* Photo Canvas / Stylized Architectural Placeholder */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-obsidian-800 to-obsidian-950 flex flex-col items-center justify-center border border-white/5 group-hover:border-champagne-400/30 transition-all">
                {/* Tech grid texture in placeholder */}
                <div className="absolute inset-0 bg-noise opacity-60" />
                
                {/* Visual Avatar / Stylized Identity */}
                <div className="relative z-10 flex flex-col items-center text-center p-6">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-obsidian-850 via-obsidian-750 to-champagne-400/20 border-2 border-champagne-300/30 flex items-center justify-center mb-4 shadow-2xl group-hover:scale-105 transition-transform">
                    <span className="font-display font-black text-4xl text-gradient-metallic tracking-tight">
                      TP
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    Tannu Priya
                  </h3>
                  <p className="text-xs font-mono text-silver-400 tracking-wider uppercase mb-3">
                    Full Stack Developer
                  </p>
                  <span className="px-3 py-1 rounded-full bg-obsidian-950/80 border border-white/10 text-[11px] font-mono text-champagne-300">
                    B.Tech CSE • Software Engineer
                  </span>
                </div>

                {/* Corner Technical Telemetry */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-silver-500">
                  LAT: 28.61° N
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-silver-500">
                  NODE: IN-DEL
                </div>
              </div>

              {/* Photo Replacement Note */}
              <div className="mt-3 text-center">
                <p className="text-[11px] font-mono text-silver-500">
                  [Portrait slot: easily customized with photographic asset]
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Tabs */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-4 mb-8 text-silver-300/95 text-base sm:text-lg leading-relaxed font-light">
            <p>
              {personalInfo.bio[0]}
            </p>
            <p>
              {personalInfo.bio[1]}
            </p>
            <p>
              {personalInfo.bio[2]}
            </p>
          </div>

          {/* Interactive Philosophy / Mindset Tabs */}
          <div className="bg-obsidian-900/60 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
            {/* Tab Selector Buttons */}
            <div className="flex flex-wrap gap-2 pb-4 mb-5 border-b border-white/[0.08]">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab(tab.id);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? 'bg-champagne-300 text-obsidian-950 font-semibold shadow-md'
                        : 'bg-obsidian-800/60 text-silver-400 hover:text-white hover:bg-obsidian-800'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content Display */}
            {tabs
              .filter((tab) => tab.id === activeTab)
              .map((tab) => (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <h4 className="font-display text-base font-semibold text-white tracking-wide">
                    {tab.content.title}
                  </h4>
                  <p className="text-sm text-silver-400 leading-relaxed font-light">
                    {tab.content.description}
                  </p>
                  <div className="pt-2 space-y-2">
                    {tab.content.principles.map((principle, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-silver-300">
                        <CheckCircle2 size={14} className="text-champagne-300 mt-0.5 shrink-0" />
                        <span>{principle}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* Interactive Statistics Dashboard */}
      <div className="pt-6">
        <div className="text-xs font-mono text-silver-400 uppercase tracking-widest mb-6">
          Verified Academic & Technical Credentials
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {personalInfo.stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-champagne-400/40 relative overflow-hidden group"
            >
              <div className="text-[10px] font-mono tracking-wider uppercase text-champagne-400 font-semibold mb-3">
                {stat.badge}
              </div>

              <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 group-hover:text-champagne-200 transition-colors">
                {stat.value}
              </div>

              <div className="text-sm font-semibold text-silver-200 mb-1">
                {stat.label}
              </div>

              <div className="text-xs text-silver-400 font-light">
                {stat.subtext}
              </div>

              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-champagne-400/10 rounded-full blur-xl group-hover:bg-champagne-400/20 transition-all pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
