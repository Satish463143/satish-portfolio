'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { services } from '@/src/data/data';
import dynamic from 'next/dynamic';
const Title = dynamic(() => import('@/components/common/Title/Title'), { ssr: false });
const ServiceCard = dynamic(() => import('@/components/common/ServiceCard/ServiceCard'), { ssr: false });

const Service = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(false);
  const [particleCount, setParticleCount] = useState(30);

  // Detect mobile and adjust particle count
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setParticleCount(mobile ? 8 : 30); // Reduce particles significantly on mobile
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-32 px-4 overflow-hidden bg-[var(--bg-main)]"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glowing orbs with movement */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 -right-32 w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-[100px]"
          style={{ willChange: 'transform, opacity' }}
        />
        
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-10 -left-32 w-[600px] h-[600px] bg-[var(--accent)] rounded-full blur-[120px]"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Medium accent orb - Skip on mobile */}
        {!isMobile && (
          <motion.div
            animate={{
              x: [0, -60, 0],
              y: [0, 40, 0],
              scale: [1, 1.4, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-orange-500 rounded-full blur-[80px]"
            style={{ willChange: 'transform, opacity' }}
          />
        )}

        {/* Floating particles - Dynamic count based on device */}
        {[...Array(particleCount)].map((_, i) => {
          // Generate deterministic "random" values based on index to avoid hydration mismatch
          const seed = i * 137.508; // Golden angle for good distribution
          const left = ((seed * 9301 + 49297) % 233280) / 2332.8;
          const top = ((seed * 5323 + 71253) % 233280) / 2332.8;
          const xOffset = ((i * 12.34) % 80) - 40;
          const duration = 3 + ((i * 7.89) % 5);
          const delay = (i * 3.21) % 5;
          
          return (
            <motion.div
              key={i}
              animate={{
                y: [0, -40, 0],
                x: [0, xOffset, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
              }}
              className="absolute w-1.5 h-1.5 bg-[var(--accent)] rounded-full shadow-lg shadow-[var(--accent)]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                willChange: 'transform, opacity',
              }}
            />
          );
        })}

        {/* Animated grid pattern - Use CSS animation for better performance */}
        <div
          className="absolute inset-0 animate-pulse-slow"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--accent) 1px, transparent 1px),
              linear-gradient(to bottom, var(--accent) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 80%)',
            opacity: 0.1,
            willChange: 'opacity',
          }}
        />

        {/* Animated SVG waves - Skip on mobile for performance */}
        {!isMobile && (
          <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            <motion.path
              d="M 0,200 Q 400,100 800,200 T 1600,200"
              stroke="url(#waveGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            <motion.path
              d="M 0,400 Q 600,300 1200,400 T 2400,400"
              stroke="url(#waveGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.5,
              }}
            />

            <motion.path
              d="M 0,600 Q 300,500 600,600 T 1200,600"
              stroke="url(#waveGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 3,
              }}
            />
          </svg>
        )}

        {/* Subtle vignette */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg-main) 95%)',
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <Title isInView={isInView} description = "Comprehensive solutions for modern web applications, from concept to deployment" title="What I do" subtitle1="Services &" subtitle2="Expertise"/>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, index: number) => (
            <ServiceCard
              key={index}
              service={service}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA or decoration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <p className="text-[var(--text-muted)] text-sm">
            Need something specific?{' '}
            <a
              href="#contact"
              className="text-[var(--accent)] font-semibold hover:underline"
            >
              Let's discuss your project →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Service;