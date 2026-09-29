'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { services } from '@/src/data/data';
import Title from '@/components/common/Title/Title';
import ServiceCard from '@/components/common/ServiceCard/ServiceCard';

const Service = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-28 lg:py-32 px-4 overflow-hidden bg-[var(--bg-main)]"
      aria-label="Services and expertise offered by Satish Mahato"
    >
      {/* Background Effects - Pure GPU-accelerated CSS (0 JS ticker loops, zero lag) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        
        {/* Top-Right Glowing Accent Orb */}
        <div 
          className="absolute top-10 -right-32 w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-[110px] opacity-25 animate-pulse-slow"
          style={{ willChange: 'opacity' }}
        />
        
        {/* Bottom-Left Glowing Accent Orb */}
        <div 
          className="absolute -bottom-20 -left-32 w-[550px] h-[550px] bg-[var(--accent)] rounded-full blur-[130px] opacity-20 animate-pulse-slow"
          style={{ willChange: 'opacity', animationDelay: '4s' }}
        />

        {/* Center-Top Subtle Glow */}
        <div 
          className="hidden md:block absolute top-1/3 left-1/3 w-[380px] h-[380px] bg-orange-500 rounded-full blur-[90px] opacity-15"
        />

        {/* Ambient Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.09]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--accent) 1px, transparent 1px),
              linear-gradient(to bottom, var(--accent) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 80%)',
          }}
        />

        {/* Elegant SVG Wave Accents */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <path
            d="M 0,200 Q 400,100 800,200 T 1600,200"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          
          <path
            d="M 0,400 Q 600,300 1200,400 T 2400,400"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />

          <path
            d="M 0,600 Q 300,500 600,600 T 1200,600"
            stroke="url(#waveGradient)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        </svg>

        {/* Floating starlight dots - Pure CSS */}
        {[
          { top: '15%', left: '10%', delay: '0s' },
          { top: '25%', left: '85%', delay: '1s' },
          { top: '45%', left: '20%', delay: '2s' },
          { top: '60%', left: '80%', delay: '1.5s' },
          { top: '75%', left: '15%', delay: '2.5s' },
          { top: '85%', left: '70%', delay: '0.5s' },
          { top: '35%', left: '50%', delay: '3s' },
          { top: '65%', left: '40%', delay: '2s' },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[var(--accent)] rounded-full opacity-40 animate-pulse-slow"
            style={{
              top: dot.top,
              left: dot.left,
              animationDelay: dot.delay,
              boxShadow: '0 0 6px var(--accent)',
            }}
          />
        ))}

        {/* Subtle Vignette */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg-main) 95%)',
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <Title 
          isInView={isInView} 
          description="Comprehensive solutions for modern web applications, from concept to deployment" 
          title="What I do" 
          subtitle1="Services &" 
          subtitle2="Expertise"
        />

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title || index}
              service={service}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--text-muted)] text-sm">
            Need something specific?{' '}
            <a
              href="#contact"
              className="text-[var(--accent)] font-semibold hover:underline"
            >
              Let&apos;s discuss your project →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Service;