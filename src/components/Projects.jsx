import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Sparkles, 
  TrendingUp, 
  Cpu, 
  ArrowUpRight, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  X, 
  Clock, 
  Layers, 
  Terminal, 
  Radio, 
  Zap,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import CaseStudyModal from './CaseStudyModal';
import ProjectDemoModal from './ProjectDemoModal';
import { GithubIcon } from './Icons';
import { soundManager } from '../utils/sound';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  // Natural Language Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [activeMatchNotice, setActiveMatchNotice] = useState('');

  // 1. MEDISHARE Embedded Interactive Simulation State
  const [medSortMode, setMedSortMode] = useState('expiry');
  const [medSimulatedMatch, setMedSimulatedMatch] = useState(false);

  // 2. AURELLE Embedded Stage State
  const [aurelleLookIndex, setAurelleLookIndex] = useState(0);

  // 3. REALTIMEBID Embedded Auction Terminal State
  const [bidAmount, setBidAmount] = useState(520);
  const [bidLog, setBidLog] = useState([
    { id: 1, user: 'Bidder_842', val: 520, time: 'Just now' },
    { id: 2, user: 'Bidder_319', val: 495, time: '14s ago' },
    { id: 3, user: 'Bidder_105', val: 460, time: '38s ago' }
  ]);
  const [auctionClock, setAuctionClock] = useState(38);

  // 4. DISASTER RELIEF Embedded Allocator State
  const [reliefAlgorithm, setReliefAlgorithm] = useState('priority'); // 'priority' | 'fcfs'

  useEffect(() => {
    const timer = setInterval(() => {
      setAuctionClock((prev) => (prev > 1 ? prev - 1 : 45));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePlaceDemoBid = (increment) => {
    soundManager.playClick();
    const nextVal = bidAmount + increment;
    setBidAmount(nextVal);
    setBidLog((prev) => [
      { id: Date.now(), user: 'You (Demo Bidder)', val: nextVal, time: 'Just now' },
      ...prev.slice(0, 3)
    ]);
  };

  const handleSmartSearch = (query) => {
    const q = (query !== undefined ? query : searchQuery).trim().toLowerCase();
    if (!q) {
      setFilteredProjects(projectsData);
      setActiveMatchNotice('');
      return;
    }

    soundManager.playClick();
    const matched = projectsData.filter((p) => {
      const text = `${p.title} ${p.subtitle} ${p.tagline} ${p.techStack.join(' ')} ${p.category}`.toLowerCase();
      return text.includes(q) ||
        (q.includes('react') && text.includes('react')) ||
        (q.includes('algo') && (p.id === 'disaster-relief' || p.id === 'medishare')) ||
        (q.includes('real-time') && p.id === 'realtimebid') ||
        (q.includes('e-com') && p.id === 'aurelle');
    });

    setFilteredProjects(matched.length > 0 ? matched : projectsData);
    setActiveMatchNotice(matched.length > 0 ? `Targeted ${matched.length} Project Universe(s)` : 'No direct keyword match; showing all projects.');
  };

  const handleOpenCaseStudy = (project) => {
    soundManager.playClick();
    setActiveProject(project);
    setCaseStudyOpen(true);
  };

  const handleOpenDemo = (project) => {
    soundManager.playClick();
    setActiveProject(project);
    setDemoOpen(true);
  };

  return (
    <section id="projects" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-champagne-400/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-900 border border-white/10 text-xs font-mono text-champagne-300 uppercase tracking-widest mb-3">
            <Radio size={12} className="text-emerald-400 animate-pulse" />
            <span>Cinematic Thriller Project Experiences</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Digital Craftsmanship & <br />
            <span className="text-gradient-metallic">Mission-Critical Systems</span>
          </h2>
        </div>

        <p className="text-silver-400 text-sm max-w-md font-light leading-relaxed">
          Step into 4 distinct digital worlds: from algorithmic medicine redistribution to luxury atelier e-commerce, live auction command floors, and crisis triage intelligence.
        </p>
      </div>

      {/* AI Smart Search Input */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-champagne-400/30 mb-16 shadow-2xl space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-champagne-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSmartSearch()}
              placeholder="Search by architecture: 'React & Node.js', 'DSA priority queue', 'Live bidding', 'E-commerce'..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-silver-500 text-xs sm:text-sm focus:outline-none focus:border-champagne-400/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilteredProjects(projectsData);
                  setActiveMatchNotice('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-silver-400 hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <button
            onClick={() => handleSmartSearch()}
            className="px-5 py-2.5 rounded-xl bg-champagne-300 hover:bg-champagne-200 text-obsidian-950 text-xs font-semibold font-mono tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles size={13} />
            <span>Filter Universe</span>
          </button>
        </div>

        {activeMatchNotice && (
          <div className="text-xs font-mono text-champagne-300 flex items-center justify-between pt-1">
            <span>{activeMatchNotice}</span>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilteredProjects(projectsData);
                setActiveMatchNotice('');
              }}
              className="underline text-silver-400 hover:text-white"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          PROJECT 01 — MEDISHARE: THE RESOURCE INTELLIGENCE SYSTEM
          Atmosphere: Deep Emerald Black • Sci-Fi Medical Signals • Priority Queuing
         ========================================================================= */}
      {filteredProjects.some((p) => p.id === 'medishare') && (
        <div className="space-y-16 mb-20">
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/50 via-obsidian-900 to-obsidian-950 p-6 sm:p-12 relative overflow-hidden shadow-2xl group">
            {/* Glowing Scanline & Signal Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-75 animate-pulse" />
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Mission Telemetry Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-emerald-500/20 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Activity size={15} className="animate-pulse" />
                <span className="tracking-widest uppercase font-bold">PROJECT 01 // THE RESOURCE INTELLIGENCE SYSTEM</span>
              </div>
              <div className="flex items-center gap-3 text-silver-400 text-[11px]">
                <span>SYS::DSA_PRIORITY_ACTIVE</span>
                <span>•</span>
                <span className="text-emerald-300">~25% RESOURCE GAIN</span>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 inline-block mb-3">
                    Healthcare Logistics & Algorithmic Allocation
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    MEDISHARE
                  </h3>
                  <p className="text-base text-champagne-300 font-medium mt-1">
                    Real-Time Medicine-Sharing & NGO Redistribution Network
                  </p>
                </div>

                <p className="text-sm text-silver-300 font-light leading-relaxed">
                  Connecting pharmacies, hospitals, and charitable NGOs to eliminate medical expiry waste. Engineered with custom DSA-based earliest-expiry prioritization sorting and availability matching across 500+ medicine records.
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Node.js', 'REST APIs', 'DSA Sorting', 'MongoDB/Express'].map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-obsidian-950 border border-emerald-500/20 text-xs font-mono text-silver-200">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Primary Action Suite */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => handleOpenCaseStudy(projectsData.find((p) => p.id === 'medishare'))}
                    className="shimmer-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-silver-100 to-champagne-200 text-obsidian-950 text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <button
                    onClick={() => handleOpenDemo(projectsData.find((p) => p.id === 'medishare'))}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Play size={12} className="fill-emerald-300" />
                    <span>Launch Full Simulation</span>
                  </button>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-obsidian-950 hover:bg-obsidian-850 border border-white/10 text-xs font-mono text-silver-300 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Right Side: Interactive Live Resource Intelligence Terminal */}
              <div className="lg:col-span-6 w-full">
                <div className="rounded-2xl bg-obsidian-950/90 border border-emerald-500/30 p-5 sm:p-6 space-y-4 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                    <span className="text-[11px] font-mono text-emerald-300 font-semibold flex items-center gap-1.5">
                      <Zap size={13} className="text-emerald-400" />
                      LIVE RESOURCE INTELLIGENCE ENGINE
                    </span>
                    <span className="text-[10px] font-mono text-silver-500">[Demonstration Mode]</span>
                  </div>

                  {/* Simulated Matching Live Matrix */}
                  <div className="space-y-2.5 text-xs">
                    {[
                      { name: 'Amoxicillin 500mg', batch: 'BX-994', expiry: '18 Days (Urgent)', ngo: 'Aarogya Foundation (2.4 km)', status: 'Matched via DSA' },
                      { name: 'Metformin 850mg', batch: 'BX-102', expiry: '34 Days', ngo: 'CareLife NGO (4.1 km)', status: 'In Transit' },
                      { name: 'Paracetamol 650mg', batch: 'BX-305', expiry: '52 Days', ngo: 'Hope Health Dispensary (1.8 km)', status: 'Allocated' }
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-xl bg-obsidian-900/90 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>{item.name}</span>
                            <span className="text-[10px] font-mono text-emerald-400">{item.expiry}</span>
                          </div>
                          <div className="text-[11px] text-silver-400">Recipient: {item.ngo}</div>
                        </div>
                        <span className="text-[10px] font-mono text-champagne-300 px-2 py-0.5 rounded bg-obsidian-950 border border-white/10 shrink-0 self-start sm:self-center">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Real-time Metric Banner */}
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-300">Measured Utilization Boost:</span>
                    <span className="text-white font-bold text-sm">~25% Waste Reduction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cinematic Mission Transition 01 -> 02 */}
          <div className="relative py-4 flex items-center justify-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-champagne-400/30 to-transparent" />
            <div className="absolute px-4 py-1 rounded-full bg-obsidian-950 border border-white/10 text-[10px] font-mono text-silver-400 tracking-widest uppercase">
              SECTOR 01 // TRANSITIONING TO ATELIER LUXURY
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PROJECT 02 — AURELLE: THE DIGITAL LUXURY EXPERIENCE
          Atmosphere: Haute-Couture Champagne • Editorial Staging • Lookbook Staging
         ========================================================================= */}
      {filteredProjects.some((p) => p.id === 'aurelle') && (
        <div className="space-y-16 mb-20">
          <div className="rounded-3xl border border-champagne-400/30 bg-gradient-to-br from-amber-950/30 via-obsidian-900 to-obsidian-950 p-6 sm:p-12 relative overflow-hidden shadow-2xl group">
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-champagne-400/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Mission Telemetry Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-champagne-400/20 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-champagne-300">
                <Sparkles size={15} />
                <span className="tracking-widest uppercase font-bold">PROJECT 02 // THE DIGITAL LUXURY EXPERIENCE</span>
              </div>
              <div className="flex items-center gap-3 text-silver-400 text-[11px]">
                <span>HAUTE_COUTURE_UI</span>
                <span>•</span>
                <span className="text-champagne-300">GPU ACCELERATED</span>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-champagne-400 font-semibold px-3 py-1 rounded-full bg-champagne-400/10 border border-champagne-400/20 inline-block mb-3">
                    Creative Frontend & Brand Storytelling
                  </span>
                  <h3 className="font-editorial italic text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                    AURELLE
                  </h3>
                  <p className="text-base text-champagne-300 font-medium mt-1">
                    Premium Lifestyle & Fashion Digital Flagship
                  </p>
                </div>

                <p className="text-sm text-silver-300 font-light leading-relaxed">
                  A bespoke luxury e-commerce experience marrying cinematic product storytelling, fluid micro-interactions, responsive grid layouts, and haute-couture typography to communicate prestige without friction.
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Modern Web Animations', 'Responsive UI'].map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-obsidian-950 border border-champagne-400/20 text-xs font-mono text-silver-200">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Primary Action Suite */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => handleOpenCaseStudy(projectsData.find((p) => p.id === 'aurelle'))}
                    className="shimmer-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-silver-100 to-champagne-200 text-obsidian-950 text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <button
                    onClick={() => handleOpenDemo(projectsData.find((p) => p.id === 'aurelle'))}
                    className="px-4 py-2.5 rounded-xl bg-champagne-400/15 hover:bg-champagne-400/25 border border-champagne-400/40 text-champagne-300 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Play size={12} className="fill-champagne-300" />
                    <span>Explore Lookbook Showcase</span>
                  </button>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-obsidian-950 hover:bg-obsidian-850 border border-white/10 text-xs font-mono text-silver-300 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Right Side: Interactive Luxury Lookbook Staging */}
              <div className="lg:col-span-6 w-full">
                <div className="rounded-2xl bg-obsidian-950/90 border border-champagne-400/30 p-6 space-y-5 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-champagne-400/20 pb-3">
                    <span className="text-[11px] font-mono text-champagne-300 uppercase tracking-widest font-semibold">
                      ATELIER LOOKBOOK STAGING
                    </span>
                    <div className="flex items-center gap-1.5">
                      {['01', '02', '03'].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setAurelleLookIndex(idx)}
                          className={`w-7 h-7 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            aurelleLookIndex === idx
                              ? 'bg-champagne-300 text-obsidian-950 font-bold'
                              : 'bg-obsidian-900 border border-white/10 text-silver-400'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="aspect-video rounded-xl bg-obsidian-900 border border-white/10 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-300 mb-2">
                      CURATED RUNWAY SILHOUETTES
                    </span>
                    <h4 className="font-editorial italic text-2xl sm:text-3xl font-bold text-white mb-2">
                      {aurelleLookIndex === 0 && 'The Minimalist Cashmere Silhouette'}
                      {aurelleLookIndex === 1 && 'Architectural Monolith Evening Wear'}
                      {aurelleLookIndex === 2 && 'Structured Metallic Outerwear Series'}
                    </h4>
                    <p className="text-xs text-silver-400 font-light max-w-sm">
                      GPU-accelerated smooth transitions, fluid typography scales, and modular React view state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cinematic Mission Transition 02 -> 03 */}
          <div className="relative py-4 flex items-center justify-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
            <div className="absolute px-4 py-1 rounded-full bg-obsidian-950 border border-white/10 text-[10px] font-mono text-silver-400 tracking-widest uppercase">
              SECTOR 02 // TRANSITIONING TO AUCTION COMMAND
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PROJECT 03 — REALTIMEBID ENGINE: THE LIVE AUCTION COMMAND CENTER
          Atmosphere: Cyber Blue Trading Floor • Ticking Clock • Atomic Monotonic Bidding
         ========================================================================= */}
      {filteredProjects.some((p) => p.id === 'realtimebid') && (
        <div className="space-y-16 mb-20">
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-obsidian-900 to-obsidian-950 p-6 sm:p-12 relative overflow-hidden shadow-2xl group">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Mission Telemetry Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-blue-500/20 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-blue-400">
                <Terminal size={15} />
                <span className="tracking-widest uppercase font-bold">PROJECT 03 // LIVE AUCTION COMMAND CENTER</span>
              </div>
              <div className="flex items-center gap-3 text-silver-400 text-[11px]">
                <span className="text-red-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  AUCTION CLOSING: {auctionClock}s
                </span>
                <span>•</span>
                <span className="text-blue-300">ATOMIC TRANSACTIONS</span>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-blue-400 font-semibold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-3">
                    Full Stack & Real-Time Engineering
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    REALTIMEBID ENGINE
                  </h3>
                  <p className="text-base text-champagne-300 font-medium mt-1">
                    Live Bidding & Real-Time Interactive Auction Room
                  </p>
                </div>

                <p className="text-sm text-silver-300 font-light leading-relaxed">
                  Interactive auction system built to solve latency race conditions and prevent stale bid registrations. Enforces monotonic database transaction integrity and real-time bid stream synchronization.
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'JavaScript', 'PHP', 'MySQL', 'REST Endpoints'].map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-obsidian-950 border border-blue-500/20 text-xs font-mono text-silver-200">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Primary Action Suite */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => handleOpenCaseStudy(projectsData.find((p) => p.id === 'realtimebid'))}
                    className="shimmer-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-silver-100 to-champagne-200 text-obsidian-950 text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <button
                    onClick={() => handleOpenDemo(projectsData.find((p) => p.id === 'realtimebid'))}
                    className="px-4 py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-400/40 text-blue-300 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Play size={12} className="fill-blue-300" />
                    <span>Launch Bidding Floor</span>
                  </button>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-obsidian-950 hover:bg-obsidian-850 border border-white/10 text-xs font-mono text-silver-300 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Right Side: Embedded Live Bidding Terminal */}
              <div className="lg:col-span-6 w-full">
                <div className="rounded-2xl bg-obsidian-950/90 border border-blue-500/30 p-6 space-y-5 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
                    <span className="text-[11px] font-mono text-blue-300 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <Clock size={13} className="text-blue-400" />
                      LIVE BIDDING TERMINAL // LOT #402
                    </span>
                    <span className="text-[10px] font-mono text-red-400 font-bold">{auctionClock}s remaining</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10 space-y-3">
                      <span className="text-[10px] font-mono text-silver-400 uppercase">Current Top Bid</span>
                      <div className="font-display text-3xl font-extrabold text-white">${bidAmount}</div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePlaceDemoBid(25)}
                          className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-obsidian-950 text-xs font-mono font-bold transition-colors cursor-pointer"
                        >
                          +$25 Bid
                        </button>
                        <button
                          onClick={() => handlePlaceDemoBid(50)}
                          className="px-3 py-1.5 rounded-lg bg-champagne-300 hover:bg-champagne-200 text-obsidian-950 text-xs font-mono font-bold transition-colors cursor-pointer"
                        >
                          +$50 Bid
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs font-mono">
                      <span className="text-[10px] text-silver-400 block mb-1">Monotonic Bid Feed:</span>
                      {bidLog.map((b) => (
                        <div key={b.id} className="p-2 rounded bg-obsidian-900 border border-white/5 flex items-center justify-between text-[11px]">
                          <span className="text-silver-300">{b.user}</span>
                          <span className="text-emerald-400 font-bold">${b.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cinematic Mission Transition 03 -> 04 */}
          <div className="relative py-4 flex items-center justify-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-rose-400/30 to-transparent" />
            <div className="absolute px-4 py-1 rounded-full bg-obsidian-950 border border-white/10 text-[10px] font-mono text-silver-400 tracking-widest uppercase">
              SECTOR 03 // TRANSITIONING TO CRISIS INTELLIGENCE
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PROJECT 04 — DISASTER RELIEF RESOURCE ALLOCATOR: CRISIS RESPONSE INTELLIGENCE
          Atmosphere: Emergency Crimson • Priority Queue Triage • ~30% Evaluated Gain
         ========================================================================= */}
      {filteredProjects.some((p) => p.id === 'disaster-relief') && (
        <div className="space-y-16">
          <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/40 via-obsidian-900 to-obsidian-950 p-6 sm:p-12 relative overflow-hidden shadow-2xl group">
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Mission Telemetry Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-rose-500/20 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-rose-400">
                <Cpu size={15} />
                <span className="tracking-widest uppercase font-bold">PROJECT 04 // CRISIS RESPONSE INTELLIGENCE</span>
              </div>
              <div className="flex items-center gap-3 text-silver-400 text-[11px]">
                <span className="text-rose-300">TRIAGE PRIORITY MODEL</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">~30% BOOST OVER FCFS</span>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-rose-400 font-semibold px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 inline-block mb-3">
                    Algorithmic Optimization & Systems Design
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    DISASTER RELIEF ALLOCATOR
                  </h3>
                  <p className="text-base text-champagne-300 font-medium mt-1">
                    Priority-Based Humanitarian Crisis Resource Dispatcher
                  </p>
                </div>

                <p className="text-sm text-silver-300 font-light leading-relaxed">
                  Engineered to replace inefficient First-Come, First-Served supply dispatch during natural catastrophes. Utilizes a priority-weighted max-heap algorithmic model that yielded approximately 30% improvement in critical need fulfillment during project evaluation.
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2">
                  {['Algorithmic Optimization', 'Data Structures', 'Priority Queues', 'React.js', 'Node.js'].map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-obsidian-950 border border-rose-500/20 text-xs font-mono text-silver-200">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Primary Action Suite */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => handleOpenCaseStudy(projectsData.find((p) => p.id === 'disaster-relief'))}
                    className="shimmer-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-silver-100 to-champagne-200 text-obsidian-950 text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <button
                    onClick={() => handleOpenDemo(projectsData.find((p) => p.id === 'disaster-relief'))}
                    className="px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/40 text-rose-300 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Play size={12} className="fill-rose-300" />
                    <span>Launch Crisis Simulator</span>
                  </button>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-obsidian-950 hover:bg-obsidian-850 border border-white/10 text-xs font-mono text-silver-300 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Right Side: Embedded Algorithmic Triage Comparison Terminal */}
              <div className="lg:col-span-6 w-full">
                <div className="rounded-2xl bg-obsidian-950/90 border border-rose-500/30 p-6 space-y-5 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                    <span className="text-[11px] font-mono text-rose-300 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <Cpu size={13} className="text-rose-400" />
                      ALGORITHMIC TRIAGE MODEL // EVALUATION
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setReliefAlgorithm('priority')}
                        className={`px-2.5 py-1 text-[10px] font-mono rounded transition-colors ${
                          reliefAlgorithm === 'priority'
                            ? 'bg-rose-500 text-white font-bold'
                            : 'bg-obsidian-900 text-silver-400'
                        }`}
                      >
                        Priority Queue
                      </button>
                      <button
                        onClick={() => setReliefAlgorithm('fcfs')}
                        className={`px-2.5 py-1 text-[10px] font-mono rounded transition-colors ${
                          reliefAlgorithm === 'fcfs'
                            ? 'bg-rose-500 text-white font-bold'
                            : 'bg-obsidian-900 text-silver-400'
                        }`}
                      >
                        Baseline FCFS
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10 space-y-1">
                      <span className="text-[10px] font-mono text-silver-400 uppercase">Triage Survival Rate</span>
                      <div className="font-display text-3xl font-extrabold text-white">
                        {reliefAlgorithm === 'priority' ? '92.4%' : '62.1%'}
                      </div>
                      <span className="text-[10px] text-silver-500 block">
                        {reliefAlgorithm === 'priority' ? 'Urgent zones saved first' : 'Stockouts in distant sectors'}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10 space-y-1">
                      <span className="text-[10px] font-mono text-silver-400 uppercase">Measured Project Gain</span>
                      <div className="font-display text-3xl font-extrabold text-emerald-400">
                        ~30% Boost
                      </div>
                      <span className="text-[10px] text-silver-500 block">
                        Over standard FCFS baseline
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Case Study Full-Screen Modal */}
      <CaseStudyModal
        project={activeProject}
        isOpen={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
      />

      {/* Interactive Project Simulation Modal */}
      <ProjectDemoModal
        project={activeProject}
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
      />
    </section>
  );
}
