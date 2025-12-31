'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
} from 'framer-motion';
import { projects } from '@/src/data/data';

const Title = dynamic(
  () => import('@/components/common/Title/Title'),
  { ssr: false }
);
const ProjectCard = dynamic(
  () => import('@/components/common/ProjectCard/ProjectCard'),
  { ssr: false }
);

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative py-32 px-4 overflow-hidden bg-[var(--bg-main)]"
    >
      <LazyMotion features={domAnimation}>
        {/* ===== BACKGROUND EFFECTS ===== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* ORB 1 */}
          <m.div
            animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[90px]"
          />

          {/* ORB 2 */}
          <m.div
            animate={{ x: [0, 90, 0], y: [0, -70, 0] }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/3 -right-24 w-[520px] h-[520px] bg-cyan-500/25 rounded-full blur-[100px]"
          />

          {/* ORB 3 */}
          <m.div
            animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-0 left-1/4 w-[480px] h-[480px] bg-pink-500/25 rounded-full blur-[85px]"
          />

          {/* SPARKLES */}
          {[...Array(14)].map((_, i) => (
            <m.span
              key={i}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -40, 0],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              style={{
                left: `${(i * 73) % 100}%`,
                top: `${(i * 47) % 100}%`,
              }}
            />
          ))}

          {/* VIGNETTE */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-main)]" />
        </div>

        {/* ===== CONTENT ===== */}
        <div className="container mx-auto max-w-7xl relative z-10">
          <Title
            isInView={isInView}
            title="Featured Work"
            subtitle1="Project"
            subtitle2="Showcase"
            description="Real-world solutions delivering measurable results"
          />

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </LazyMotion>
    </section>
  );
};

export default Portfolio;
