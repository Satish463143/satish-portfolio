'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/src/data/data';
const Title = dynamic(() => import('@/components/common/Title/Title'), { ssr: false });
const ProjectCard = dynamic(() => import('@/components/common/ProjectCard/ProjectCard'), { ssr: false });

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative py-32 px-4 overflow-hidden bg-[var(--bg-main)]"
    >
      {/* Unique Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glowing orbs with different colors */}
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-20 -left-20 w-[550px] h-[550px] bg-purple-600 rounded-full blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, 120, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
          className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -90, 0],
            y: [0, 70, 0],
            scale: [1, 1.5, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-pink-500 rounded-full blur-[100px]"
        />

        {/* Diagonal animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="diagonalGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="purple" stopOpacity="0" />
              <stop offset="50%" stopColor="purple" stopOpacity="0.8" />
              <stop offset="100%" stopColor="purple" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="diagonalGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="cyan" stopOpacity="0" />
              <stop offset="50%" stopColor="cyan" stopOpacity="0.8" />
              <stop offset="100%" stopColor="cyan" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Animated diagonal lines */}
          <motion.line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="url(#diagonalGradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke="url(#diagonalGradient2)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </svg>

        {/* Sparkle particles with different colors */}
        {[...Array(25)].map((_, i) => {
          // Generate deterministic "random" values based on index
          const seed = i * 137.508;
          const left = ((seed * 9301 + 49297) % 233280) / 2332.8;
          const top = ((seed * 5323 + 71253) % 233280) / 2332.8;
          const xOffset = ((i * 15.5) % 120) - 60;
          const duration = 3 + ((i * 8.23) % 5);
          const delay = (i * 4.71) % 8;
          const size = ((i * 6.78) % 3) + 2;
          const colors = ['purple', 'cyan', 'pink', 'violet'];
          const colorIndex = i % colors.length;
          const shadowSize = ((i * 7.34) % 10) + 5;
          
          return (
            <motion.div
              key={i}
              animate={{
                y: [0, -50, 0],
                x: [0, xOffset, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'easeOut',
                delay,
              }}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: colors[colorIndex],
                boxShadow: `0 0 ${shadowSize}px currentColor`,
              }}
            />
          );
        })}

        {/* Hexagonal pattern */}
        <motion.div
          animate={{
            opacity: [0.03, 0.1, 0.03],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23a855f7' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 10%, transparent 85%)',
          }}
        />

        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, var(--bg-main) 92%)',
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <Title
          isInView={isInView}
          description="Real-world solutions delivering measurable results for clients worldwide"
          title="Featured Work"
          subtitle1="Project"
          subtitle2="Showcase"
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project: any, index: number) => (
            <ProjectCard
              key={project.id}
              project={project}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-[var(--accent)]/30 transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;