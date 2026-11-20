import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart, Sparkles, Clock, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Indian Standard Time (IST)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-charcoal-950 pt-16 pb-12 px-6 sm:px-8 overflow-hidden text-silver-400">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Tier: Monogram & Live Clock */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-charcoal-900 border border-white/15 flex items-center justify-center font-display font-extrabold text-white text-xs">
              TP
            </div>
            <div>
              <span className="font-display font-bold text-white text-sm tracking-wide">
                {personalInfo.name}
              </span>
              <span className="block text-[10px] font-mono text-silver-500 uppercase tracking-wider">
                Full Stack Developer & Creative Technologist
              </span>
            </div>
          </div>

          {/* Real-time IST Clock & Status */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal-900 border border-white/10 text-silver-300">
              <Clock size={13} className="text-champagne-300" />
              <span>{time || 'Loading...'} IST</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal-900 border border-emerald-500/20 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire</span>
            </div>

            <button
              onClick={scrollToTop}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-silver-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Return to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Design Manifesto */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-silver-500">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            <span>Built with React, Three.js, Tailwind CSS & Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
