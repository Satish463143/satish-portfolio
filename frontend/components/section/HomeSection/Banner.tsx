'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import {useRouter} from 'next/navigation'
import Hero3D from '@/components/common/Hero3D/Hero3D';

// Floating Particles Background - Optimized with dynamic particle count
const ParticlesBackground = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [particleCount, setParticleCount] = useState(50);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      
      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });
      setParticleCount(isMobile ? 15 : 50); // 70% reduction on mobile
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Create particles based on device
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 112, 0, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions.width, dimensions.height, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4, willChange: 'auto' }}
    />
  );
});

ParticlesBackground.displayName = 'ParticlesBackground';

// Animated Gradient Orb - Optimized with GPU hints
const GradientOrb = React.memo(({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay }}
      className="absolute w-96 h-96 rounded-full blur-3xl bg-[var(--accent-soft)] opacity-50"
      style={{ willChange: 'transform, opacity' }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full rounded-full bg-[var(--accent-soft)]"
        style={{ willChange: 'transform, opacity' }}
      />
    </motion.div>
  );
});

GradientOrb.displayName = 'GradientOrb';

const Banner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const router = useRouter()

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const rotateX = useTransform(smoothMouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-10, 10]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Throttled mouse move with RAF
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return; // Skip 3D effects on mobile
    
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
      rafRef.current = undefined as unknown as number | undefined;
    });
  }, [mouseX, mouseY, isMobile]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[var(--bg-main)]"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <ParticlesBackground />
        <div className="absolute top-1/4 right-1/4">
          <GradientOrb delay={0.3} />
        </div>
        <div className="absolute bottom-1/4 left-1/4">
          <GradientOrb delay={0.6} />
        </div>
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-20 grid-pattern" />

      <div className="container mx-auto max-w-7xl  relative z-10">
        <div className="grid lg:grid-cols-2 gap-5 items-center justify-center  min-h-screen py-20">
          {/* Left Column - Content */}
          <div className="space-y-10">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--border-soft)]"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[var(--accent)]"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(255, 112, 0, 0.4)',
                    '0 0 0 6px rgba(255, 112, 0, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ willChange: 'box-shadow' }}
              />
              <span className="text-sm text-[var(--text-secondary)]">Available for new projects</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
              >
                <span className="text-[var(--text-primary)] lg:text-5xl md:text-4xl text-3xl" >Crafting Exceptional</span> <br />
                <span className="text-[var(--text-primary)] ">                  
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[var(--accent)] via-orange-500 to-[var(--accent)] bg-clip-text text-transparent">
                      Web Experiences
                    </span>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="absolute bottom-2 left-0 right-0 h-3 bg-[var(--accent-soft)] -z-0"
                      style={{ originX: 0, willChange: 'transform' }}
                    />
                  </span>
                </span>
                <span className="text-[var(--text-primary)] block opacity-90 lg:text-5xl md:text-4xl text-3xl">Powered by AI</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl"
              >
                I’m <span className="text-[var(--accent)] font-semibold">Satish Mahato</span>, a Full-stack MERN developer & CEO of{' '}
                <span  className="text-[var(--accent)]  cursor-pointer" onClick={()=>router.push('https://bleedingtech.com.np')}>Bleeding Tech</span>.
                Building high-performance systems with Next.js, AI integrations, and
                modern cloud infrastructure.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-[var(--accent)] cursor-pointer text-white rounded-2xl font-semibold overflow-hidden shadow-premium"
                style={{ willChange: 'transform' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ willChange: 'transform' }}
                />
              </motion.button>

              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 cursor-pointer glass border border-[var(--border-soft)] text-[var(--text-primary)] rounded-2xl font-semibold hover:border-[var(--accent)]/50 transition-all"
                style={{ willChange: 'transform' }}
              >
                <span className="flex items-center gap-2">
                  Let's Talk
                  <Sparkles className="w-5 h-5" />
                </span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-[var(--border-soft)]"
            >
              {[
                { label: 'Projects', value: '50+' },
                { label: 'Uptime', value: '99.9%' },
                { label: 'Performance', value: '95+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Hero3D />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-3 sm:bottom-10 lg:bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[var(--text-muted)]"
          style={{ willChange: 'transform' }}
        >
          <span className="text-xs">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-[var(--border-strong)] flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-[var(--accent)] rounded-full"
              style={{ willChange: 'transform' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;