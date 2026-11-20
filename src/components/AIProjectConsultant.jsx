import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Workflow, 
  Database, 
  Code2, 
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function AIProjectConsultant() {
  const [ideaText, setIdeaText] = useState('');
  const [serviceType, setServiceType] = useState('Full Stack Application');
  const [isGenerating, setIsGenerating] = useState(false);
  const [consultation, setConsultation] = useState(null);
  const [error, setError] = useState('');

  const sampleIdeas = [
    "A real-time telehealth platform connecting rural clinics with specialist doctors.",
    "A luxury lifestyle e-commerce boutique with 3D product visualizer and dynamic lookbook.",
    "A high-frequency auction engine with live bidding and transactional database guarantees."
  ];

  const handleConsult = async (textToUse) => {
    const input = (textToUse || ideaText).trim();
    if (!input) {
      setError('Please provide a brief description of your project concept.');
      return;
    }

    setError('');
    setIsGenerating(true);
    soundManager.playClick();

    try {
      const res = await fetch('/api/project-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: input, serviceType })
      });

      if (!res.ok) throw new Error('Failed to generate consultation.');

      const data = await res.json();
      setConsultation(data);
      setIsGenerating(false);
      soundManager.playChime();
    } catch {
      setIsGenerating(false);
      setError('Unable to connect to AI Consultant. Please try again.');
    }
  };

  const handleJumpToConversion = () => {
    soundManager.playClick();
    const el = document.querySelector('#client-conversion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="ai-consultant" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-champagne-400/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-3">
            <Cpu size={12} />
            <span>AI Project Architect & Consultant</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Describe Your Vision. <br />
            <span className="text-gradient-champagne">Generate an Instant Technical Scope.</span>
          </h2>
        </div>

        <p className="text-silver-400 text-sm max-w-md font-light leading-relaxed">
          Input your product concept. Our integrated AI architecture engine analyzes your requirements, recommends optimal tech stacks, outlines features, and formulates a 3-phase development roadmap.
        </p>
      </div>

      {/* Input Form & Sample Chips */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 mb-12 shadow-2xl">
        <div className="space-y-4">
          <label className="block text-xs font-mono uppercase tracking-wider text-silver-400">
            Describe Your Product or Business Idea
          </label>

          <textarea
            rows={3}
            value={ideaText}
            onChange={(e) => setIdeaText(e.target.value)}
            placeholder="e.g. An AI-powered patient triage portal with real-time queueing and doctor matching..."
            className="w-full px-4 py-3 rounded-2xl bg-obsidian-950/80 border border-white/10 text-white placeholder-silver-600 text-sm focus:outline-none focus:border-champagne-400/60 transition-colors resize-none"
          />

          {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}

          {/* Sample Prompts */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-silver-500">Or try a sample concept:</span>
            {sampleIdeas.map((sample, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setIdeaText(sample);
                  handleConsult(sample);
                }}
                className="px-3 py-1 rounded-lg bg-obsidian-900 hover:bg-obsidian-800 text-[11px] font-mono text-silver-400 hover:text-champagne-300 border border-white/5 transition-colors cursor-pointer text-left truncate max-w-xs"
              >
                {sample}
              </button>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-silver-400">Target Deliverable:</span>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-obsidian-950 border border-white/10 text-xs font-mono text-silver-200 focus:outline-none"
              >
                <option value="Full Stack Application">Full Stack Application</option>
                <option value="Frontend & React Single Page App">Frontend & React SPA</option>
                <option value="E-Commerce Architecture">E-Commerce Architecture</option>
                <option value="Real-Time System">Real-Time System</option>
              </select>
            </div>

            <button
              onClick={() => handleConsult()}
              disabled={isGenerating}
              onMouseEnter={() => soundManager.playHover()}
              className="shimmer-btn px-6 py-3 rounded-xl bg-gradient-to-r from-silver-100 to-champagne-200 text-obsidian-950 text-xs font-semibold tracking-wide flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Architecture...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Generate Architecture Scope</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Consultation Scope Output */}
      <AnimatePresence>
        {consultation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-card rounded-3xl p-6 sm:p-10 border border-champagne-400/40 relative overflow-hidden shadow-2xl space-y-8"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-champagne-400/10 text-champagne-300 border border-champagne-400/20">
                  AI Architecture Blueprint
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-2">
                  System Specification & Scope
                </h3>
              </div>

              <button
                onClick={handleJumpToConversion}
                className="px-5 py-2.5 rounded-xl bg-champagne-300 hover:bg-champagne-200 text-obsidian-950 text-xs font-semibold tracking-wide flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <span>Hire Tannu to Implement</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Project Summary */}
            <p className="text-sm sm:text-base text-silver-300 font-light leading-relaxed">
              {consultation.projectSummary}
            </p>

            {/* Recommended Stack Matrix */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-silver-400 mb-3 flex items-center gap-2">
                <Code2 size={14} className="text-champagne-300" />
                <span>Recommended Technical Stack</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/5">
                  <span className="text-[10px] font-mono text-silver-500 block">Frontend</span>
                  <span className="font-mono text-silver-200">{consultation.recommendedStack.frontend}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/5">
                  <span className="text-[10px] font-mono text-silver-500 block">Backend</span>
                  <span className="font-mono text-silver-200">{consultation.recommendedStack.backend}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/5">
                  <span className="text-[10px] font-mono text-silver-500 block">Database</span>
                  <span className="font-mono text-silver-200">{consultation.recommendedStack.database}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/5">
                  <span className="text-[10px] font-mono text-silver-500 block">Tooling</span>
                  <span className="font-mono text-silver-200">{consultation.recommendedStack.tooling}</span>
                </div>
              </div>
            </div>

            {/* Recommended Features */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-silver-400 mb-3 flex items-center gap-2">
                <Layers size={14} className="text-champagne-300" />
                <span>Recommended Core Features</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {consultation.keyFeatures.map((f, i) => (
                  <div key={i} className="p-3 rounded-xl bg-obsidian-950/60 border border-white/5 flex items-start gap-2.5 text-xs text-silver-300">
                    <CheckCircle2 size={15} className="text-champagne-300 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Roadmap */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-silver-400 mb-3 flex items-center gap-2">
                <Workflow size={14} className="text-champagne-300" />
                <span>Phased Development Roadmap</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {consultation.developmentRoadmap.map((p, i) => (
                  <div key={i} className="p-4 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono text-champagne-400 font-semibold uppercase">{p.phase}</span>
                    <p className="text-xs text-silver-300 font-light leading-relaxed">{p.deliverables}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-silver-400 font-light">
                {consultation.nextSteps}
              </span>
              <button
                onClick={handleJumpToConversion}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-silver-100 to-champagne-200 text-obsidian-950 text-xs font-bold tracking-wide flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Partner With Tannu on This Scope</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
