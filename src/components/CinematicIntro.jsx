import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function CinematicIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if intro was already seen in current session
    if (sessionStorage.getItem('obsidian_intro_seen') === 'true') {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            handleFinish();
          }, 400);
          return 100;
        }
        // Organic acceleration curve
        const step = prev < 40 ? 3 : prev < 85 ? 5 : 2;
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleFinish = () => {
    setIsExiting(true);
    sessionStorage.setItem('obsidian_intro_seen', 'true');
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const handleSkip = () => {
    soundManager.playClick();
    handleFinish();
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-14 bg-[#030305] text-[#cbd5e1] overflow-hidden select-none"
        >
          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-silver-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne-300 animate-pulse" />
              <span className="text-silver-300 font-semibold">OBSIDIAN X</span>
              <span className="text-silver-600">//</span>
              <span>DEV ARCHIVE 2026</span>
            </div>

            <button
              onClick={handleSkip}
              className="px-3 py-1 rounded-full border border-white/10 hover:border-champagne-300 text-silver-400 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              Skip Intro ↗
            </button>
          </div>

          {/* Center Monogram & Wordmark */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mb-6"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-obsidian-850 border border-white/15 flex items-center justify-center shadow-2xl relative overflow-hidden">
                <span className="font-display font-black text-3xl sm:text-4xl text-gradient-metallic tracking-tight">
                  TP
                </span>
                <div className="absolute inset-0 bg-gradient-to-tr from-champagne-400/10 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase mb-2"
            >
              Tannu Priya
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs sm:text-sm font-mono text-champagne-300 tracking-wider uppercase"
            >
              Engineering Digital Experiences
            </motion.p>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="w-full max-w-xl mx-auto space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-silver-500">INITIALIZING SYSTEM</span>
              <span className="text-white font-bold">{progress}%</span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-1 bg-obsidian-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-silver-300 via-champagne-300 to-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-silver-600">
              <span>REACT.JS • THREE.JS • FULL STACK</span>
              <span>VERIFIED METRICS</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
