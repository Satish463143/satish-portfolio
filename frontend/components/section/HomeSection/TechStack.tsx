'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
const Title = dynamic(() => import('@/components/common/Title/Title'), { ssr: false });
import { technologies, categories } from '@/src/data/data';



const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTech =
    activeCategory === 'All'
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <section
      id="stack"
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500 rounded-full blur-[150px] opacity-10" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <Title isInView={isInView} title="Tech Stack" subtitle1="My" subtitle2='Toolbox' description="Modern tools and frameworks I use to build exceptional products" />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: 0.3 + index * 0.05,
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'text-white'
                  : 'text-[var(--text-secondary)] glass hover:text-[var(--accent)]'
              }`}
            >
              {/* Active background */}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-[var(--accent)] rounded-full"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                  style={{
                    boxShadow: '0 0 20px var(--accent-glow)',
                  }}
                />
              )}
              
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.3,
                delay: index * 0.02,
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <div className="h-full p-6 glass-strong rounded-xl hover:border-[var(--accent-soft)] transition-all duration-300 text-center relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-soft)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-[var(--text-primary)] font-semibold group-hover:text-[var(--accent)] transition-colors">
                    {tech.name}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {tech.category}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass-strong rounded-full">
            <span className="text-[var(--text-secondary)]">
              {filteredTech.length} technologies
            </span>
            {activeCategory !== 'All' && (
              <>
                <span className="text-[var(--text-muted)]">in</span>
                <span className="text-[var(--accent)] font-bold">
                  {activeCategory}
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--text-muted)] text-sm">
            Always learning and adapting to new technologies
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;