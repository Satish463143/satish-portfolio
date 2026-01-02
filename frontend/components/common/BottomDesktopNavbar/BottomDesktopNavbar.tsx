'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Briefcase, 
  FolderOpen, 
  GitBranch, 
  Layers, 
  MessageCircle 
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  isSection?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: Home, isSection: true },
  { label: 'Services', href: '#services', icon: Briefcase, isSection: true },
  { label: 'Projects', href: '#portfolio', icon: FolderOpen, isSection: true },
  { label: 'Process', href: '#process', icon: GitBranch, isSection: true },
  { label: 'Stack', href: '#stack', icon: Layers, isSection: true },
  { label: 'Contact', href: '#contact', icon: MessageCircle, isSection: true },
];

const BottomDesktopNavbar = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('home');
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ['home', 'services', 'portfolio', 'process', 'stack', 'faq', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const handleClick = (href: string, isSection?: boolean) => {
    if (isSection && isHomePage) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        delay: 0.2 
      }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 desktop_navbar" 
      aria-label="Main navigation"
    >
      <div className="relative">
        {/* Glass effect container with pill shape */}
        <div 
          className="navbar-container flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--bg-glass-strong)] backdrop-blur-xl border border-[var(--border-soft)]"
          style={{
            boxShadow: `
              0 2px 4px rgba(0, 0, 0, 0.05),
              0 4px 8px rgba(0, 0, 0, 0.08),
              0 8px 16px rgba(0, 0, 0, 0.1),
              0 16px 32px rgba(0, 0, 0, 0.12),
              0 32px 64px rgba(0, 0, 0, 0.15),
              inset 0 -2px 4px rgba(255, 255, 255, 0.1),
              inset 0 2px 4px rgba(0, 0, 0, 0.05)
            `
          }}
        >
          {navItems.map((item) => {
            const isActive = isHomePage && item.isSection 
              ? activeSection === item.href.replace('#', '')
              : pathname === item.href;
            const Icon = item.icon;

            return item.isSection && isHomePage ? (
              <button
                key={item.href}
                onClick={() => handleClick(item.href, item.isSection)}
                aria-current={isActive ? 'page' : undefined}
                className="relative cursor-pointer"
              >
                <motion.div
                  whileHover={{ 
                    y: -4,
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 400, 
                    damping: 17 
                  }}
                  className="relative px-4 py-3 rounded-full transition-colors duration-200"
                >
                  {/* Active indicator - animated pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-[var(--accent-soft)] rounded-full"
                      style={{
                        boxShadow: '0 0 20px rgba(255, 112, 0, 0.3)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Content container */}
                  <div className="relative flex items-center gap-1">
                    {/* Icon */}
                    <Icon 
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive 
                          ? 'text-[var(--accent)]' 
                          : 'text-[var(--text-secondary)] group-hover:text-[var(--accent)]'
                      }`}
                      strokeWidth={2}
                    />

                    {/* Label */}
                    <span 
                      className={`text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'text-[var(--accent)] font-semibold' 
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Hover glow effect */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[var(--highlight)]"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className="relative"
              >
                <motion.div
                  whileHover={{ 
                    y: -4,
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 400, 
                    damping: 17 
                  }}
                  className="relative px-4 py-3 rounded-full transition-colors duration-200"
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-[var(--accent-soft)] rounded-full"
                      style={{
                        boxShadow: '0 0 20px rgba(255, 112, 0, 0.3)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <div className="relative flex items-center gap-1">
                    <Icon 
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive 
                          ? 'text-[var(--accent)]' 
                          : 'text-[var(--text-secondary)] group-hover:text-[var(--accent)]'
                      }`}
                      strokeWidth={2}
                    />
                    <span 
                      className={`text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'text-[var(--accent)] font-semibold' 
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[var(--highlight)]"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Enhanced 3D glow effect underneath */}
        <div 
          className="absolute -inset-2 rounded-full -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)',
            filter: 'blur(20px)',
            opacity: 0.3
          }}
          aria-hidden="true"
        />
        <div 
          className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent rounded-full -z-10"
          aria-hidden="true"
        />
      </div>
    </motion.nav>
  );
};

export default BottomDesktopNavbar;

