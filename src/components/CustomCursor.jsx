import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is touch-based
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const clickable = target.closest('a, button, [role="button"], input, textarea, select');
      const customAction = target.closest('[data-cursor]');

      if (customAction) {
        setCursorVariant('action');
        setCursorText(customAction.getAttribute('data-cursor') || 'VIEW');
      } else if (clickable) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      width: 32,
      height: 32,
      backgroundColor: 'rgba(238, 215, 161, 0.08)',
      borderColor: 'rgba(238, 215, 161, 0.4)',
      borderWidth: '1px',
      mixBlendMode: 'difference',
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: '1.5px',
      scale: 1.1,
    },
    action: {
      x: mousePosition.x - 36,
      y: mousePosition.y - 36,
      width: 72,
      height: 72,
      backgroundColor: 'rgba(238, 215, 161, 0.95)',
      borderColor: 'rgba(238, 215, 161, 1)',
      borderWidth: '1px',
    }
  };

  return (
    <>
      {/* Outer Spring Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center font-mono text-[10px] tracking-widest text-charcoal-950 font-bold uppercase transition-transform duration-75 ease-out shadow-2xl"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      >
        {cursorText && (
          <span className="select-none animate-fadeIn">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-1.5 h-1.5 rounded-full bg-champagne-300 shadow-[0_0_8px_rgba(238,215,161,0.8)]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 800, mass: 0.1 }}
      />
    </>
  );
}
