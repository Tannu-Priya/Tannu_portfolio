import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Activity, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  Search, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function ProjectDemoModal({ project, isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  // MEDISHARE simulator state
  const [medFilter, setMedFilter] = useState('all');
  const [medSort, setMedSort] = useState('expiry');

  // REALTIMEBID simulator state
  const [currentBid, setCurrentBid] = useState(480);
  const [bidHistory, setBidHistory] = useState([
    { user: 'Bidder_749', amount: 480, time: 'Just now' },
    { user: 'Bidder_312', amount: 450, time: '12s ago' },
    { user: 'Bidder_108', amount: 420, time: '45s ago' }
  ]);
  const [timeLeft, setTimeLeft] = useState(45);

  // DISASTER RELIEF allocator simulator state
  const [allocatorMode, setAllocatorMode] = useState('priority'); // 'priority' | 'fcfs'

  // AURELLE lookbook stage
  const [aurelleStage, setAurelleStage] = useState(0);

  useEffect(() => {
    let timer;
    if (isOpen && isPlaying && project?.id === 'realtimebid') {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 1 ? prev - 1 : 60));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, project]);

  if (!project) return null;

  const handlePlaceBid = (increment) => {
    soundManager.playClick();
    const newBid = currentBid + increment;
    setCurrentBid(newBid);
    setBidHistory((prev) => [
      { user: 'You (Verified Buyer)', amount: newBid, time: 'Just now' },
      ...prev.slice(0, 4)
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-obsidian-950/90 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[92vh] bg-obsidian-900 border border-white/15 rounded-3xl shadow-2xl overflow-y-auto z-10 custom-scrollbar text-silver-200"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-obsidian-900/90 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-champagne-400/10 text-champagne-300 border border-champagne-400/20">
                  Interactive Demo Experience
                </span>
                <span className="text-xs font-mono text-silver-400">
                  {project.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 text-silver-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="p-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 text-silver-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-10 space-y-8">
              {/* Project Title & Highlight */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {project.title} Live Simulation
                </h3>
                <p className="text-sm text-silver-300 font-light">
                  {project.tagline}
                </p>
              </div>

              {/* SPECIFIC SIMULATOR BY PROJECT */}

              {/* 1. MEDISHARE SIMULATOR */}
              {project.id === 'medishare' && (
                <div className="rounded-2xl bg-obsidian-950/80 border border-emerald-500/30 p-6 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
                        DSA PRIORITY QUEUE ENGINE
                      </span>
                      <div className="text-base font-bold text-white">
                        Medicine Matching & Expiry Optimization
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-silver-400">Sorting:</span>
                      <button
                        onClick={() => setMedSort('expiry')}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          medSort === 'expiry'
                            ? 'bg-emerald-500 text-obsidian-950 font-bold'
                            : 'bg-obsidian-800 text-silver-300'
                        }`}
                      >
                        Earliest Expiry (DSA)
                      </button>
                      <button
                        onClick={() => setMedSort('proximity')}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          medSort === 'proximity'
                            ? 'bg-emerald-500 text-obsidian-950 font-bold'
                            : 'bg-obsidian-800 text-silver-300'
                        }`}
                      >
                        Nearest NGO
                      </button>
                    </div>
                  </div>

                  {/* Simulated Matching Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        name: 'Amoxicillin 500mg',
                        batch: 'BX-994',
                        expiry: '18 Days (Urgent)',
                        donor: 'Apex Pharmacy',
                        distance: '2.4 km',
                        matchedNgo: 'Aarogya Foundation',
                        status: 'Priority Matched'
                      },
                      {
                        name: 'Metformin 850mg',
                        batch: 'BX-102',
                        expiry: '34 Days',
                        donor: 'Metro Care Clinic',
                        distance: '4.1 km',
                        matchedNgo: 'CareLife NGO',
                        status: 'Dispatched'
                      },
                      {
                        name: 'Paracetamol 650mg',
                        batch: 'BX-305',
                        expiry: '52 Days',
                        donor: 'Central Dispensary',
                        distance: '1.8 km',
                        matchedNgo: 'Hope Health Camp',
                        status: 'Reserved'
                      }
                    ].map((med, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-obsidian-900 border border-white/5 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{med.name}</span>
                          <span className="text-[10px] font-mono text-emerald-400">{med.expiry}</span>
                        </div>
                        <div className="text-silver-400 text-[11px]">Donor: {med.donor}</div>
                        <div className="text-silver-400 text-[11px]">Matched: {med.matchedNgo} ({med.distance})</div>
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-silver-500">BATCH {med.batch}</span>
                          <span className="text-champagne-300 font-semibold">{med.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Real-time Metric Banner */}
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                    <span className="text-emerald-300 font-mono font-medium">
                      Algorithmic Waste Reduction Efficiency:
                    </span>
                    <span className="font-mono font-bold text-white text-sm">
                      ~25% Waste Reduction Achieved
                    </span>
                  </div>
                </div>
              )}

              {/* 2. AURELLE SIMULATOR */}
              {project.id === 'aurelle' && (
                <div className="rounded-2xl bg-obsidian-950/80 border border-champagne-400/30 p-6 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-champagne-300 tracking-wider">
                        EDITORIAL E-COMMERCE STAGING
                      </span>
                      <div className="text-base font-bold text-white">
                        Curated Product Architecture
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {['Lookbook 01', 'Lookbook 02', 'Lookbook 03'].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setAurelleStage(idx)}
                          className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
                            aurelleStage === idx
                              ? 'bg-champagne-300 text-obsidian-950 font-bold'
                              : 'bg-obsidian-800 text-silver-300'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lookbook Stage Showcase */}
                  <div className="aspect-video rounded-xl bg-obsidian-900 border border-white/10 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-40" />
                    <div className="relative z-10 space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-300">
                        AURELLE ATELIER EDITION
                      </span>
                      <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-white italic">
                        {aurelleStage === 0 && 'The Minimalist Cashmere Silhouette'}
                        {aurelleStage === 1 && 'Architectural Monolith Evening Wear'}
                        {aurelleStage === 2 && 'Structured Metallic Outerwear Series'}
                      </h4>
                      <p className="text-xs text-silver-400 max-w-md mx-auto font-light">
                        Engineered with fluid transitions, GPU-accelerated CSS transforms, and modular React state components.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. REALTIMEBID SIMULATOR */}
              {project.id === 'realtimebid' && (
                <div className="rounded-2xl bg-obsidian-950/80 border border-blue-500/30 p-6 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-blue-400 tracking-wider">
                        LIVE BIDDING ENGINE
                      </span>
                      <div className="text-base font-bold text-white">
                        Rare Horology Lot #402 — Auction Active
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs">
                      <Clock size={13} className="animate-spin" />
                      <span>{timeLeft}s remaining</span>
                    </div>
                  </div>

                  {/* Bid Interaction Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    <div className="p-6 rounded-xl bg-obsidian-900 border border-white/10 space-y-4">
                      <div className="text-xs font-mono text-silver-400">Current Highest Bid</div>
                      <div className="font-display text-4xl font-extrabold text-white">
                        ${currentBid.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePlaceBid(25)}
                          className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-obsidian-950 font-bold text-xs font-mono transition-colors cursor-pointer"
                        >
                          +$25 Bid
                        </button>
                        <button
                          onClick={() => handlePlaceBid(50)}
                          className="px-4 py-2 rounded-xl bg-champagne-300 hover:bg-champagne-200 text-obsidian-950 font-bold text-xs font-mono transition-colors cursor-pointer"
                        >
                          +$50 Bid
                        </button>
                      </div>
                    </div>

                    {/* Live Stream of Bids */}
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-silver-400 mb-2">Live Monotonic Bid Stream:</div>
                      {bidHistory.map((b, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-obsidian-900/60 border border-white/5 text-xs font-mono"
                        >
                          <span className="text-silver-300">{b.user}</span>
                          <span className="font-bold text-emerald-400">${b.amount}</span>
                          <span className="text-[10px] text-silver-500">{b.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. DISASTER RELIEF SIMULATOR */}
              {project.id === 'disaster-relief' && (
                <div className="rounded-2xl bg-obsidian-950/80 border border-rose-500/30 p-6 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-rose-400 tracking-wider">
                        CRISIS RESOURCE ALLOCATOR (ALGORITHMIC OPTIMIZATION)
                      </span>
                      <div className="text-base font-bold text-white">
                        Priority Queue vs. Standard FCFS Evaluation
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAllocatorMode('priority')}
                        className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                          allocatorMode === 'priority'
                            ? 'bg-rose-500 text-white font-bold'
                            : 'bg-obsidian-800 text-silver-300'
                        }`}
                      >
                        Priority Queue Algorithmic Model
                      </button>
                      <button
                        onClick={() => setAllocatorMode('fcfs')}
                        className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                          allocatorMode === 'fcfs'
                            ? 'bg-rose-500 text-white font-bold'
                            : 'bg-obsidian-800 text-silver-300'
                        }`}
                      >
                        Standard FCFS Baseline
                      </button>
                    </div>
                  </div>

                  {/* Visual Comparison Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl bg-obsidian-900 border border-white/10 space-y-2">
                      <div className="text-xs font-mono text-silver-400">Critical Needs Fulfill Rate</div>
                      <div className="font-display text-3xl font-extrabold text-white">
                        {allocatorMode === 'priority' ? '92.4%' : '62.1%'}
                      </div>
                      <div className="text-xs text-silver-400 font-light">
                        {allocatorMode === 'priority'
                          ? 'Prioritizes high casualty & critical triage regions first.'
                          : 'Unsorted dispatch leads to severe stockouts in remote disaster sectors.'}
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-obsidian-900 border border-white/10 space-y-2">
                      <div className="text-xs font-mono text-silver-400">Measured Project Improvement</div>
                      <div className="font-display text-3xl font-extrabold text-emerald-400">
                        ~30% Boost
                      </div>
                      <div className="text-xs text-silver-400 font-light">
                        Evaluation demonstrated an approximate 30% efficiency improvement over conventional FCFS approaches.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Close */}
              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 text-silver-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Close Demo Experience
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
