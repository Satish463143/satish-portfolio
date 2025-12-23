'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-[var(--bg-glass-strong)] backdrop-blur-xl border border-[var(--border-soft)]" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="toggle_button w-16 h-8 rounded-full bg-[var(--bg-glass-strong)] backdrop-blur-xl border border-[var(--border-soft)] cursor-pointer transition-all duration-300 hover:scale-105"
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        boxShadow: `
          0 2px 4px rgba(0, 0, 0, 0.05),
          0 4px 8px rgba(0, 0, 0, 0.08),
          0 8px 16px rgba(0, 0, 0, 0.1),
          inset 0 -2px 4px rgba(255, 255, 255, 0.1)
        `
      }}
    >
      {/* Sliding background pill */}
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-glow)]"
        animate={{
          x: isDark ? 32 : 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        style={{
          boxShadow: '0 2px 8px rgba(255, 112, 0, 0.4)'
        }}
      />

      {/* Sun icon */}
      <motion.div
        className="absolute left-2 top-1/2 -translate-y-1/2"
        animate={{
          scale: isDark ? 0.8 : 1,
          opacity: isDark ? 0.5 : 1,
          rotate: isDark ? -90 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <Sun 
          className={`w-4 h-4 ${isDark ? 'text-[var(--text-muted)]' : 'text-[var(--accent)]'}`}
          strokeWidth={2.5}
        />
      </motion.div>

      {/* Moon icon */}
      <motion.div
        className="absolute right-2 top-1/2 -translate-y-1/2"
        animate={{
          scale: isDark ? 1 : 0.8,
          opacity: isDark ? 1 : 0.5,
          rotate: isDark ? 0 : 90,
        }}
        transition={{ duration: 0.3 }}
      >
        <Moon 
          className={`w-4 h-4 ${isDark ? 'text-white' : 'text-[var(--text-muted)]'}`}
          strokeWidth={2.5}
          fill={isDark ? 'currentColor' : 'none'}
        />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;

