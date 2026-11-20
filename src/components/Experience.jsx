import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles, Building2, Terminal } from 'lucide-react';
import { experienceData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-champagne-400/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-3">
            <Briefcase size={12} />
            <span>Professional Journey</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Industry Experience & <br />
            <span className="text-gradient-champagne">Engineering Impact</span>
          </h2>
        </div>

        <p className="text-silver-400 text-sm max-w-md font-light leading-relaxed">
          Real-world collaborative development delivering responsive components, robust API integrations, and code reviews in professional agile sprints.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative pl-6 sm:pl-10 border-l border-white/10 space-y-12">
        {experienceData.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Pulsing Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-charcoal-950 border-2 border-champagne-400 flex items-center justify-center shadow-[0_0_15px_rgba(238,215,161,0.5)]">
              <div className="w-1.5 h-1.5 rounded-full bg-champagne-300 animate-ping" />
            </div>

            {/* Experience Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden group hover:border-champagne-400/40 transition-all duration-300">
              {/* Header: Role, Company, Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/[0.08]">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-champagne-300 uppercase tracking-wider mb-1">
                    <Building2 size={13} />
                    <span>{exp.company}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-champagne-200 transition-colors">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-950/80 border border-white/10 text-xs font-mono text-silver-300">
                    <Calendar size={13} className="text-champagne-400" />
                    <span>{exp.period}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-950/80 border border-white/10 text-xs font-mono text-silver-300">
                    <MapPin size={13} className="text-silver-400" />
                    <span>{exp.location}</span>
                  </div>

                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {exp.status}
                  </span>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-sm sm:text-base text-silver-300 font-light leading-relaxed mb-6">
                {exp.summary}
              </p>

              {/* Responsibilities & Achievements */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-mono text-silver-400 uppercase tracking-widest mb-3">
                  Key Responsibilities & Deliverables
                </div>
                {exp.responsibilities.map((item, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-champagne-300 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-silver-300/90 font-light leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technologies Applied */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-silver-400 mr-2">Technologies:</span>
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-lg bg-charcoal-950/80 border border-white/5 text-xs font-mono text-silver-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Atmospheric Glow */}
              <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-champagne-400/5 rounded-full blur-2xl group-hover:bg-champagne-400/15 transition-all pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
