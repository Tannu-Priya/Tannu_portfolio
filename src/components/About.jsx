import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Compass, 
  Workflow, 
  GraduationCap, 
  Briefcase, 
  Binary, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

export default function About() {
  const [activeStoryChapter, setActiveStoryChapter] = useState(0);
  const [activeThinkTab, setActiveThinkTab] = useState('philosophy');

  const storyChapters = [
    {
      num: "01",
      title: "THE THINKER",
      subtitle: "Analytical Foundations & Problem-Solving",
      content:
        "My journey began with a curiosity for algorithmic logic and computing fundamentals. Having solved 350+ problems across LeetCode and GeeksforGeeks, I view software engineering through a lens of computational efficiency, space-time trade-offs, and first-principles reasoning.",
      metrics: "350+ DSA Problems Solved • Algorithmic Optimization"
    },
    {
      num: "02",
      title: "THE BUILDER",
      subtitle: "Full-Stack Execution & Systems Design",
      content:
        "Ideas reach their true value only when translated into resilient, working software. Leveraging React.js, modern JavaScript, Node.js, Express, and databases (MongoDB & MySQL), I architect responsive, component-driven platforms engineered to handle real-world user flows.",
      metrics: "4 Major Production Projects • React.js Specialist"
    },
    {
      num: "03",
      title: "THE EXPLORER",
      subtitle: "AI Horizons & Interactive Web Aesthetics",
      content:
        "The frontier of modern software is dynamic and intelligent. I actively investigate artificial intelligence, real-time protocols, 3D WebGL interfaces, and modern micro-interactions, crafting software that feels effortless, tactile, and visually unforgettable.",
      metrics: "AI-Assisted Architectures • Three.js & Modern Web"
    },
    {
      num: "04",
      title: "THE CONTINUOUS LEARNER",
      subtitle: "Iterative Mastery & Disciplined Growth",
      content:
        "Technology evolves relentlessly, and so does my commitment to craft. From completing my Web Developer Internship at Ediglobe to pursuing my B.Tech in Computer Science and Engineering, I approach every sprint with humility, curiosity, and an appetite for deep technical mastery.",
      metrics: "Ediglobe Intern Experience • B.Tech CSE Background"
    }
  ];

  const thinkTabs = [
    {
      id: 'philosophy',
      label: 'Engineering Philosophy',
      icon: BrainCircuit,
      content: {
        title: 'Algorithmic Precision Meets Aesthetic Craft',
        description:
          'Software should never be a compromise between speed and beauty. I believe in writing modular, deterministic code that performs with low latency while delivering an unforgettable sensory user experience.',
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
          'With 350+ DSA problems solved across LeetCode and GeeksforGeeks, I break large, ambiguous bottlenecks into verifiable, discrete subproblems. I choose data structures based on empirical complexity profiles rather than guesswork.',
        principles: [
          'Mastery over time and space complexity trade-offs in real-time execution.',
          'Data-driven decision making when choosing data structures and query schemas.',
          'Tenacious debugging that identifies systemic failure modes rather than patching symptoms.'
        ]
      }
    },
    {
      id: 'creative',
      label: 'Creative Technology',
      icon: Sparkles,
      content: {
        title: 'Emotional Resonance & Interactive Dimension',
        description:
          'A web application is a digital environment. By integrating 3D WebGL geometries, smooth physics-driven motion, and tactile acoustic feedback, I transform ordinary functional tools into memorable digital experiences.',
        principles: [
          'Harnessing Three.js and shader lighting for atmospheric depth.',
          'Fluid viewport transitions using Framer Motion and GSAP.',
          'Accessible, semantic code structures honoring user intent across devices.'
        ]
      }
    }
  ];

  const engineeringJourney = [
    {
      year: "2023 - Present",
      title: "Core Computer Science & Algorithmic Rigor",
      desc: "Pursuing B.Tech in CSE; solved 350+ DSA problems across arrays, trees, graphs, heaps, and DP.",
      badge: "Academic & Competitive"
    },
    {
      year: "April 2025 – July 2025",
      title: "Web Developer Intern — Ediglobe",
      desc: "Engineered responsive React.js components, integrated asynchronous RESTful endpoints, and conducted sprint code reviews.",
      badge: "Industry Proven"
    },
    {
      year: "Production Milestone",
      title: "Architecting 4 Flagship Production Systems",
      desc: "Engineered Medishare (~25% resource boost), Aurelle (luxury e-commerce), RealTimeBid Engine, and Disaster Relief Allocator (~30% boost).",
      badge: "Full Stack Execution"
    }
  ];

  return (
    <section id="about" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-champagne-400/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-4">
          <Sparkles size={12} />
          <span>The Human Behind The Code</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          I Don't Just Write Code. <br />
          <span className="text-gradient-champagne">I Engineer Experiences.</span>
        </h2>
        <p className="text-silver-300/90 text-base sm:text-lg font-light max-w-2xl leading-relaxed">
          Driven by logic. Inspired by creativity. Focused on building technology that solves meaningful problems.
        </p>
      </div>

      {/* PART 3: PREMIUM SPLIT-SCREEN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start mb-24">
        {/* LEFT SIDE: Interactive Personal Identity Card */}
        <div className="lg:col-span-5 w-full">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-champagne-400/20 via-white/5 to-obsidian-800 blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative rounded-2xl bg-obsidian-900 border border-white/10 p-5 sm:p-6 overflow-hidden shadow-2xl space-y-5">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] font-mono text-silver-400">
                <span className="flex items-center gap-1.5 text-champagne-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-300 animate-pulse" />
                  ID: DEV-TP-2026
                </span>
                <span className="text-emerald-400 font-semibold">ACTIVELY SEEKING OPPORTUNITIES</span>
              </div>

              {/* Portrait Placeholder with Animated Monogram */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-obsidian-800 to-obsidian-950 flex flex-col items-center justify-center border border-white/5 group-hover:border-champagne-400/30 transition-all">
                <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />

                {/* Animated Metallic Monogram */}
                <div className="relative z-10 flex flex-col items-center text-center p-6">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-obsidian-850 via-obsidian-750 to-champagne-400/20 border-2 border-champagne-300/30 flex items-center justify-center mb-4 shadow-2xl group-hover:scale-105 transition-transform">
                    <span className="font-display font-black text-4xl text-gradient-metallic tracking-tight">
                      TP
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    Tannu Priya
                  </h3>
                  <p className="text-xs font-mono text-champagne-300 tracking-wider uppercase mb-3">
                    Full Stack Developer • React.js Specialist
                  </p>
                  <span className="px-3.5 py-1 rounded-full bg-obsidian-950/80 border border-white/10 text-[11px] font-mono text-silver-300">
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

              {/* Verified Badges Strip */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-obsidian-950 border border-white/5">
                  <span className="text-champagne-300 font-bold block text-sm">350+ Solved</span>
                  <span className="text-[10px] text-silver-400">DSA on LeetCode & GFG</span>
                </div>
                <div className="p-2.5 rounded-xl bg-obsidian-950 border border-white/5">
                  <span className="text-white font-bold block text-sm">Ediglobe</span>
                  <span className="text-[10px] text-silver-400">Web Developer Intern</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: 4 Chapters of Personal Story */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-silver-400 mb-2">
            Interactive Story Chapters (Click to Explore)
          </div>

          {storyChapters.map((chapter, idx) => {
            const isSelected = activeStoryChapter === idx;
            return (
              <div
                key={chapter.num}
                onClick={() => {
                  soundManager.playClick();
                  setActiveStoryChapter(idx);
                }}
                className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-obsidian-900 border-champagne-400/50 shadow-xl shadow-champagne-400/5'
                    : 'bg-obsidian-950/60 border-white/5 hover:border-white/20 hover:bg-obsidian-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-champagne-300 text-obsidian-950'
                          : 'bg-obsidian-800 text-silver-400'
                      }`}
                    >
                      {chapter.num}
                    </span>
                    <h4 className="font-display font-bold text-base sm:text-lg text-white">
                      {chapter.title}
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-champagne-300/80 hidden sm:inline">
                    {chapter.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-silver-300/90 font-light leading-relaxed mb-3">
                  {chapter.content}
                </p>

                <div className="text-[11px] font-mono text-silver-500 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span>{chapter.metrics}</span>
                  <span className="text-champagne-300 font-semibold">{isSelected ? 'Active Chapter' : 'Read Chapter →'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PART 4: HOW I THINK (Interactive Tabs) */}
      <div className="pt-8 border-t border-white/10 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-champagne-300 uppercase tracking-widest mb-2 flex items-center gap-2">
              <BrainCircuit size={14} />
              <span>Cognitive Approach & Craft</span>
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white">
              HOW I THINK
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-silver-400 max-w-md font-light">
            Select a dimension below to explore my engineering philosophy, analytical problem-solving habits, and creative technical instincts.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {thinkTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeThinkTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveThinkTab(tab.id);
                }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-champagne-300 text-obsidian-950 font-bold shadow-lg'
                    : 'bg-obsidian-900 border border-white/10 text-silver-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Active Content Panel */}
        {thinkTabs
          .filter((t) => t.id === activeThinkTab)
          .map((tab) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="glass-card rounded-3xl p-6 sm:p-10 border border-champagne-400/30 relative overflow-hidden space-y-6"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400">
                  Core Tenet
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  {tab.content.title}
                </h4>
              </div>

              <p className="text-sm sm:text-base text-silver-300 font-light leading-relaxed max-w-3xl">
                {tab.content.description}
              </p>

              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-silver-400 block mb-2">
                  Operating Principles
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {tab.content.principles.map((pr, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-1">
                      <CheckCircle2 size={15} className="text-champagne-300 mb-1" />
                      <p className="text-xs text-silver-300 font-light leading-relaxed">{pr}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* INTERACTIVE ENGINEERING TIMELINE */}
      <div className="pt-8 border-t border-white/10">
        <div className="text-xs font-mono text-champagne-300 uppercase tracking-widest mb-2 flex items-center gap-2">
          <Workflow size={14} />
          <span>Milestones & Industry Progression</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">
          Interactive Engineering Timeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engineeringJourney.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-champagne-400/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-champagne-300 font-semibold">{item.year}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-champagne-400/10 text-champagne-400 border border-champagne-400/20">
                  {item.badge}
                </span>
              </div>
              <h4 className="font-display text-base font-bold text-white">
                {item.title}
              </h4>
              <p className="text-xs text-silver-400 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
