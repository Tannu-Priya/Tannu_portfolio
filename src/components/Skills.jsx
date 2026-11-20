import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Code2, 
  Server, 
  Database, 
  Wrench, 
  Binary, 
  Sparkles, 
  Layers, 
  CheckCircle,
  ExternalLink,
  Flame
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const categoryIcons = {
    all: Sparkles,
    frontend: Code2,
    backend: Server,
    languages: Binary,
    databases: Database,
    tools: Wrench,
    core_cs: Cpu
  };

  const filteredSkills = skillsData.items.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="skills" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-champagne-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-3">
            <Cpu size={12} />
            <span>Interactive Skill Universe</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Technical Architecture & <br />
            <span className="text-gradient-metallic">Engineering Arsenal</span>
          </h2>
        </div>

        <p className="text-silver-400 text-sm max-w-md font-light leading-relaxed">
          Crafted across algorithmic problem solving, modern frontend frameworks, and robust backend systems. Zero boilerplate progress bars — built for real-world engineering depth.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {skillsData.categories.map((category) => {
          const Icon = categoryIcons[category.id] || Sparkles;
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(category.id);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-silver-100 to-champagne-300 text-charcoal-950 font-semibold shadow-lg shadow-champagne-300/10'
                  : 'bg-charcoal-900/80 hover:bg-charcoal-800 text-silver-300 border border-white/[0.08] hover:border-white/20'
              }`}
            >
              <Icon size={14} />
              <span>{category.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive
                    ? 'bg-charcoal-950/20 text-charcoal-950'
                    : 'bg-charcoal-800 text-silver-400'
                }`}
              >
                {category.id === 'all'
                  ? skillsData.items.length
                  : skillsData.items.filter((i) => i.category === category.id).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <AnimatePresence>
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => {
                soundManager.playHover();
                setHoveredSkill(skill.name);
              }}
              onMouseLeave={() => setHoveredSkill(null)}
              className="group glass-card rounded-2xl p-5 sm:p-6 border border-white/[0.07] hover:border-champagne-400/40 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top Row: Name and Level */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-champagne-200 transition-colors">
                    {skill.name}
                  </h3>
                  {skill.highlight && (
                    <span
                      title="Key Core Strength"
                      className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-champagne-400/10 text-champagne-300 border border-champagne-400/20"
                    >
                      <Flame size={10} className="fill-champagne-300" />
                      CORE
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-mono text-silver-400 px-2.5 py-1 rounded-md bg-charcoal-950/60 border border-white/5">
                  {skill.level}
                </span>
              </div>

              {/* Description / Architecture Details */}
              <p className="text-xs text-silver-400 leading-relaxed font-light mb-4">
                {skill.description}
              </p>

              {/* Subtle Category Badge Footer */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-silver-500">
                <span className="uppercase tracking-wider">
                  {skill.category.replace('_', ' ')}
                </span>
                <span className="text-champagne-400/80 group-hover:text-champagne-300 transition-colors">
                  Production Ready
                </span>
              </div>

              {/* Ambient Hover Backlight */}
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-champagne-400/10 rounded-full blur-2xl group-hover:bg-champagne-400/20 transition-all pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Core Computer Science Highlight Showcase Box */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-champagne-400/20 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-noise opacity-30 pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-2">
              <Binary size={14} />
              <span>Algorithmic Rigor & Core Foundations</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              350+ Data Structures & Algorithms Problems Solved
            </h3>
            <p className="text-sm text-silver-300/90 font-light leading-relaxed">
              Consistently practicing and applying optimal time and space complexity approaches across arrays, linked lists, trees, graphs, dynamic programming, heaps, and recursion on LeetCode and GeeksforGeeks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-5 py-3 rounded-xl bg-charcoal-950/80 border border-white/10 text-center">
              <div className="font-display text-2xl font-bold text-champagne-300">350+</div>
              <div className="text-[10px] font-mono text-silver-400 uppercase tracking-wider">Problems Solved</div>
            </div>
            <div className="px-5 py-3 rounded-xl bg-charcoal-950/80 border border-white/10 text-center">
              <div className="font-display text-2xl font-bold text-white">O(n) / O(log n)</div>
              <div className="text-[10px] font-mono text-silver-400 uppercase tracking-wider">Optimization Focus</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
