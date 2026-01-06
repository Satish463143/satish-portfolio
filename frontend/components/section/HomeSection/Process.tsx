'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Lightbulb,
  Palette,
  Code,
  TestTube,
  Rocket,
  type LucideIcon
} from 'lucide-react';
import Title from '@/components/common/Title/Title';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Planning',
    description: 'Understanding requirements, defining scope, and creating technical architecture with detailed documentation.',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description: 'Creating wireframes, high-fidelity designs, and interactive prototypes for stakeholder approval.',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    title: 'Agile Development',
    description: 'Sprint-based development with continuous integration, code reviews, and iterative improvements.',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '04',
    title: 'Testing & QA',
    description: 'Comprehensive testing including unit tests, integration tests, performance audits, and accessibility checks.',
    icon: TestTube,
    color: 'from-green-500 to-emerald-500',
  },
  {
    number: '05',
    title: 'Deployment & Support',
    description: 'CI/CD pipeline setup, cloud deployment, monitoring, and ongoing maintenance with documentation.',
    icon: Rocket,
    color: 'from-red-500 to-rose-500',
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
      aria-label="Development process and methodology"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-10" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <Title isInView={isInView} title="How I Work" subtitle1="Development" subtitle2='Process' description="A structured approach ensuring quality, transparency, and timely delivery" />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent)] via-[var(--accent-soft)] to-transparent" />

          {/* Steps */}
          <div className="space-y-16">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.2,
                  }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-16`}
                >
                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full md:w-[calc(50%-4rem)] ${
                      isEven ? 'md:text-right' : 'md:text-left'
                    } text-left`}
                  >
                    <div className="glass-strong p-8 rounded-2xl hover:border-[var(--accent-soft)] transition-all duration-300 group">
                      {/* Number badge */}
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} text-white font-bold text-lg mb-4 shadow-lg`}
                      >
                        {step.number}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {step.description}
                      </p>

                      {/* Bottom accent line */}
                      <div
                        className={`mt-6 h-1 rounded-full bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />
                    </div>
                  </motion.div>

                  {/* Center Icon Circle */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2 + 0.3,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10"
                  >
                    <div className="relative">
                      {/* Outer glow ring */}
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} blur-xl opacity-50`}
                      />
                      
                      {/* Icon container */}
                      <div className="relative w-16 h-16 rounded-full bg-[var(--bg-main)] border-4 border-[var(--accent)] flex items-center justify-center shadow-lg">
                        <step.icon className="w-7 h-7 text-[var(--accent)]" strokeWidth={2} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Spacer for mobile */}
                  <div className="hidden md:block w-[calc(50%-4rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-strong rounded-full">
            <span className="text-[var(--text-secondary)]">
              Average project timeline:
            </span>
            <span className="text-[var(--accent)] font-bold">
              4-8 weeks
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;