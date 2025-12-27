'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Convert scroll progress (0-1) to percentage (0-100)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const percent = Math.round(latest * 100);
      setPercentage(percent);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left z-[100]"
        style={{
          scaleX,
          boxShadow: '0 0 10px var(--accent-glow)',
        }}
      />

      {/* Circular progress indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50 hidden lg:block"
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          className="rotate-[-90deg]"
        >
          {/* Background circle */}
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="var(--border-soft)"
            strokeWidth="3"
            fill="var(--bg-glass-strong)"
            style={{
              backdropFilter: 'blur(12px)',
            }}
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            stroke="var(--accent)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress,
              filter: 'drop-shadow(0 0 6px var(--accent-glow))',
            }}
            strokeDasharray="0 1"
          />
        </svg>
        
        {/* Percentage text */}
        <div
          className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--text-primary)]"
          style={{
            fontSize: '11px',
          }}
        >
          {percentage}%
        </div>
      </motion.div>
    </>
  );
};

export default ScrollProgress;

