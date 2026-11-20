import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Binary,
  ArrowRight
} from 'lucide-react';
import { roadmapData, certificationsData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

export default function LearningRoadmap() {
  const [selectedMilestone, setSelectedMilestone] = useState(roadmapData[0]);

  return (
    <section id="roadmap" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-champagne-400/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-3">
            <Compass size={12} />
            <span>Interactive Learning Path</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Architectural Evolution & <br />
            <span className="text-gradient-metallic">Mastery Milestones</span>
          </h2>
        </div>

        <p className="text-silver-400 text-sm max-w-md font-light leading-relaxed">
          A continuous engineering progression from core programming primitives and algorithmic rigor to full-stack production systems and AI horizons.
        </p>
      </div>

      {/* Futuristic Interactive Winding Milestone Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
        {/* Left Column: Visual Milestone Navigator */}
        <div className="lg:col-span-6 space-y-3">
          {roadmapData.map((milestone) => {
            const isSelected = selectedMilestone.id === milestone.id;
            const isCompleted = milestone.status === 'Completed';

            return (
              <div
                key={milestone.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedMilestone(milestone);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-charcoal-800/90 border-champagne-400/50 shadow-lg shadow-champagne-400/5'
                    : 'bg-charcoal-900/50 border-white/[0.07] hover:bg-charcoal-850 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold border transition-colors ${
                      isSelected
                        ? 'bg-champagne-300 text-charcoal-950 border-champagne-200'
                        : isCompleted
                        ? 'bg-charcoal-800 text-silver-300 border-white/10'
                        : 'bg-charcoal-950 text-silver-500 border-white/5'
                    }`}
                  >
                    0{milestone.id}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-silver-400">
                        {milestone.phase}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                            : 'bg-champagne-400/10 text-champagne-300 border border-champagne-400/20'
                        }`}
                      >
                        {milestone.status}
                      </span>
                    </div>

                    <h4 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-champagne-200 transition-colors">
                      {milestone.title}
                    </h4>
                  </div>
                </div>

                <ArrowRight
                  size={16}
                  className={`transition-transform ${
                    isSelected
                      ? 'text-champagne-300 translate-x-1'
                      : 'text-silver-600 group-hover:text-silver-400'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Milestone Display Panel */}
        <div className="lg:col-span-6 sticky top-28">
          <motion.div
            key={selectedMilestone.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass-card rounded-3xl p-6 sm:p-10 border border-champagne-400/30 relative overflow-hidden shadow-2xl"
          >
            {/* Ambient Backlight */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-champagne-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <span className="text-xs font-mono text-champagne-300 uppercase tracking-widest font-semibold">
                {selectedMilestone.phase} Insight
              </span>
              <span className="text-xs font-mono text-silver-400">
                Milestone 0{selectedMilestone.id} of 07
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              {selectedMilestone.title}
            </h3>

            <p className="text-sm sm:text-base text-silver-300 font-light leading-relaxed mb-8">
              {selectedMilestone.description}
            </p>

            <div>
              <div className="text-xs font-mono text-silver-400 uppercase tracking-widest mb-3">
                Core Competencies & Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedMilestone.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-charcoal-800/80 border border-white/10 text-xs font-mono text-silver-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-silver-400">
              <span>Status:</span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-champagne-300" />
                {selectedMilestone.status}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Verified Certifications & Credentials Section (Strictly Separated from Roadmap) */}
      <div className="pt-8 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-3">
          <Award size={14} />
          <span>Verified Certifications & Formal Credentials</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
          Academic & Industry Recognitions
        </h3>
        <p className="text-xs sm:text-sm text-silver-400 mb-8 max-w-xl font-light">
          Only verified, authentic achievements without exaggeration or fabricated test scores.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificationsData.map((cert, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-champagne-400/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-champagne-400 px-2.5 py-1 rounded-md bg-champagne-400/10 border border-champagne-400/20">
                  {cert.category}
                </span>
                <CheckCircle2 size={16} className="text-emerald-400" />
              </div>

              <h4 className="font-display text-base font-bold text-white mb-2 group-hover:text-champagne-200 transition-colors">
                {cert.title}
              </h4>

              <div className="text-xs font-mono text-silver-400 mb-3">
                Issuer: <span className="text-silver-200">{cert.issuer}</span>
              </div>

              <p className="text-xs text-silver-400 font-light leading-relaxed">
                {cert.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
