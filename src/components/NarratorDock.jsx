import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';
import { portfolioNarrator, NARRATION_STAGES } from '../utils/narrator';
import { soundManager } from '../utils/sound';

export default function NarratorDock() {
  const [narratorState, setNarratorState] = useState({
    status: 'idle',
    currentStageIndex: 0,
    currentStage: NARRATION_STAGES[0],
    stageProgress: 0
  });

  useEffect(() => {
    const unsubscribe = portfolioNarrator.subscribe((state) => {
      setNarratorState(state);
    });
    return unsubscribe;
  }, []);

  const isVisible = narratorState.status === 'playing' || narratorState.status === 'paused';

  if (!isVisible) return null;

  const { status, currentStage, currentStageIndex, stageProgress } = narratorState;

  const handleTogglePlay = () => {
    soundManager.playClick();
    portfolioNarrator.toggle();
  };

  const handleReplay = () => {
    soundManager.playClick();
    portfolioNarrator.replay();
  };

  const handleClose = () => {
    soundManager.playClick();
    portfolioNarrator.stop();
  };

  const handleJumpToSection = () => {
    if (currentStage?.targetSection) {
      soundManager.playClick();
      const el = document.querySelector(currentStage.targetSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94vw] sm:w-[620px] max-w-full"
      >
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-champagne-400/40 bg-obsidian-950/95 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex flex-col gap-3 relative overflow-hidden">
          {/* Top Progress Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-obsidian-800">
            <div
              className="h-full bg-gradient-to-r from-silver-300 via-champagne-300 to-white transition-all duration-200"
              style={{
                width: `${((currentStageIndex + (stageProgress / 100)) / NARRATION_STAGES.length) * 100}%`
              }}
            />
          </div>

          {/* Header Row: Waveform, Stage Indicator, Controls */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2.5">
              {/* Animated Waveform */}
              <div className="flex items-center gap-1 h-5 px-2 py-1 rounded-md bg-champagne-400/10 border border-champagne-400/20">
                <span className={`w-0.5 rounded-full bg-champagne-300 ${status === 'playing' ? 'animate-pulse h-3' : 'h-1.5'}`} />
                <span className={`w-0.5 rounded-full bg-champagne-300 ${status === 'playing' ? 'animate-pulse h-4 delay-75' : 'h-2'}`} />
                <span className={`w-0.5 rounded-full bg-champagne-300 ${status === 'playing' ? 'animate-pulse h-2 delay-150' : 'h-1'}`} />
                <span className={`w-0.5 rounded-full bg-champagne-300 ${status === 'playing' ? 'animate-pulse h-3.5 delay-100' : 'h-1.5'}`} />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-champagne-300 font-semibold flex items-center gap-1.5">
                  <span>AI Voice Narrator</span>
                  <span className="text-silver-500">•</span>
                  <span>{currentStage.label}</span>
                </span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleJumpToSection}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-[10px] font-mono text-silver-300 hover:text-white transition-colors cursor-pointer"
                title="Scroll to narrated section"
              >
                <span>Follow Section</span>
                <ArrowUpRight size={11} />
              </button>

              <button
                onClick={handleReplay}
                className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-silver-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="Replay from beginning"
              >
                <RotateCcw size={13} />
              </button>

              <button
                onClick={handleTogglePlay}
                className="p-1.5 rounded-lg bg-champagne-300 hover:bg-champagne-200 text-obsidian-950 font-bold transition-colors cursor-pointer"
                title={status === 'playing' ? 'Pause voice narration' : 'Resume voice narration'}
              >
                {status === 'playing' ? <Pause size={13} /> : <Play size={13} />}
              </button>

              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-silver-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="Stop narration"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Subtitles Box */}
          <div className="p-3 rounded-xl bg-obsidian-900/90 border border-white/5">
            <p className="font-sans text-xs sm:text-sm text-white/95 font-light leading-relaxed select-none">
              "{currentStage.text}"
            </p>
          </div>

          {/* Stage Progress Indicators */}
          <div className="flex items-center justify-between text-[10px] font-mono text-silver-500 px-1">
            <div className="flex items-center gap-3">
              {NARRATION_STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => portfolioNarrator.start(idx)}
                  className={`transition-colors cursor-pointer ${
                    currentStageIndex === idx
                      ? 'text-champagne-300 font-bold underline'
                      : 'hover:text-silver-300'
                  }`}
                >
                  0{s.id} {s.title}
                </button>
              ))}
            </div>
            <span>{currentStageIndex + 1} of {NARRATION_STAGES.length}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
