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
  Flame,
  Network
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

  // Connected architecture mapping for contextual highlighting
  const techConnections = {
    'React.js': ['JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 & CSS3', 'Node.js'],
    'JavaScript (ES6+)': ['React.js', 'Node.js', 'HTML5 & CSS3'],
    'HTML5 & CSS3': ['React.js', 'Tailwind CSS', 'JavaScript (ES6+)'],
    'Tailwind CSS': ['React.js', 'HTML5 & CSS3'],
    'Node.js': ['Express.js', 'REST APIs', 'MongoDB', 'React.js'],
    'Express.js': ['Node.js', 'REST APIs', 'MongoDB'],
    'REST APIs': ['Node.js', 'Express.js', 'React.js'],
    'MongoDB': ['Node.js', 'Express.js'],
    'MySQL': ['Node.js', 'Database Management Systems (DBMS)'],
    'Java': ['Object-Oriented Programming (OOP)', 'Data Structures & Algorithms'],
    'Python': ['Data Structures & Algorithms', 'REST APIs'],
    'C++': ['Data Structures & Algorithms', 'C'],
    'C': ['C++', 'Computer Networks & OS Basics'],
    'Git & GitHub': ['React.js', 'Node.js', 'Vite & Modern Tooling'],
    'Vite & Modern Tooling': ['React.js', 'Tailwind CSS'],
    'Postman': ['REST APIs', 'Express.js'],
    'Data Structures & Algorithms': ['C++', 'Java', 'Python'],
    'Object-Oriented Programming (OOP)': ['Java', 'C++'],
    'Database Management Systems (DBMS)': ['MySQL', 'MongoDB'],
    'Computer Networks & OS Basics': ['C', 'Node.js', 'REST APIs']
  };

  const filteredSkills = skillsData.items.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const activeConnections = hoveredSkill ? techConnections[hoveredSkill] || [] : [];

  return (
    <section id="skills" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-champagne-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-3">
            <Cpu size={12} />
            <span>Interactive Technology Universe</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Technical Architecture & <br />
            <span className="text-gradient-metallic">Connected Ecosystem</span>
          </h2>
        </div>

        <p className="text-silver-400 text-sm max-w-md font-light leading-relaxed">
          Hover over any technology node to reveal architectural connections and real-world system integrations. Strictly verified competencies without fabricated percentage bars.
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
                  ? 'bg-gradient-to-r from-silver-100 to-champagne-300 text-obsidian-950 font-semibold shadow-lg shadow-champagne-300/10'
                  : 'bg-obsidian-900/80 hover:bg-obsidian-800 text-silver-300 border border-white/[0.08] hover:border-white/20'
              }`}
            >
              <Icon size={14} />
              <span>{category.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive
                    ? 'bg-obsidian-950/20 text-obsidian-950'
                    : 'bg-obsidian-800 text-silver-400'
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

      {/* Dynamic Connection Indicator Banner (When Hovering) */}
      <div className="min-h-12 mb-6 flex items-center">
        {hoveredSkill ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 text-xs font-mono text-silver-300 px-4 py-2 rounded-xl bg-obsidian-900/90 border border-champagne-400/30"
          >
            <Network size={14} className="text-champagne-300" />
            <span className="text-white font-semibold">{hoveredSkill}</span>
            <span className="text-silver-500">connects with:</span>
            {activeConnections.length > 0 ? (
              activeConnections.map((c, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-obsidian-800 text-[11px] text-champagne-300 border border-white/5"
                >
                  {c}
                </span>
              ))
            ) : (
              <span className="text-silver-500">Universal Foundation</span>
            )}
          </motion.div>
        ) : (
          <div className="text-xs font-mono text-silver-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne-400/60 animate-ping" />
            <span>Hover any node to inspect connected architectures across the stack.</span>
          </div>
        )}
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <AnimatePresence>
          {filteredSkills.map((skill) => {
            const isHovered = hoveredSkill === skill.name;
            const isConnected = activeConnections.includes(skill.name);

            return (
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
                className={`group glass-card rounded-2xl p-5 sm:p-6 border relative overflow-hidden transition-all duration-300 ${
                  isHovered
                    ? 'border-champagne-400 bg-obsidian-850 shadow-[0_0_30px_rgba(238,215,161,0.15)] -translate-y-1.5'
                    : isConnected
                    ? 'border-champagne-400/40 bg-obsidian-900/90 shadow-[0_0_20px_rgba(238,215,161,0.08)]'
                    : 'border-white/[0.07] hover:border-white/20'
                }`}
              >
                {/* Top Row: Name and Level */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <h3
                      className={`font-display text-lg font-bold transition-colors ${
                        isHovered || isConnected
                          ? 'text-champagne-300'
                          : 'text-white group-hover:text-champagne-200'
                      }`}
                    >
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

                  <span className="text-[11px] font-mono text-silver-400 px-2.5 py-1 rounded-md bg-obsidian-950/60 border border-white/5">
                    {skill.level}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-silver-400 leading-relaxed font-light mb-4">
                  {skill.description}
                </p>

                {/* Category Badge Footer */}
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
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Core Computer Science Highlight Showcase Box */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-champagne-400/20 p-6 sm:p-8 relative overflow-hidden">
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
              Practicing and applying optimal time and space complexity approaches across arrays, linked lists, trees, graphs, dynamic programming, heaps, and recursion on LeetCode and GeeksforGeeks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-5 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-center">
              <div className="font-display text-2xl font-bold text-champagne-300">350+</div>
              <div className="text-[10px] font-mono text-silver-400 uppercase tracking-wider">Problems Solved</div>
            </div>
            <div className="px-5 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-center">
              <div className="font-display text-2xl font-bold text-white">O(n) / O(log n)</div>
              <div className="text-[10px] font-mono text-silver-400 uppercase tracking-wider">Optimization Focus</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
