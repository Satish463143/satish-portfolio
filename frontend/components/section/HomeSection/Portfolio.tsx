'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  LazyMotion,
  domAnimation,
  m,
  motion,
  useInView,
} from 'framer-motion';
import { projects } from '@/src/data/data';
import { ArrowRight, ArrowLeft } from 'lucide-react';

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
  const [limit, setLimit] = useState(4)

  const showMoreProjects = () => {
    
    if(limit >= projects.length) {
      setLimit(Number(limit) - 4); // Reset to initial value
    }else{
      setLimit(Number(limit) + 4);
    }
  }

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative py-32 px-4 overflow-hidden bg-[var(--bg-main)]"
      aria-label="Portfolio showcasing web development projects"
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
            {projects.slice(0, limit).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
        <motion.button
          onClick={showMoreProjects}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative px-8 py-4 bg-[var(--accent)] cursor-pointer text-white rounded-2xl font-semibold overflow-hidden shadow-premium"
          style={{ willChange: 'transform', display: 'block', margin: '50px auto 0 auto' }}
        >
          <span className="relative z-10 flex items-center gap-2 ">
            {limit < projects.length ? 'View More Projects' : 'View Less Projects'}
            {limit < projects.length ? <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400"
            initial={{ x: '100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ willChange: 'transform' }}
          />
        </motion.button>
      </LazyMotion>
    </section>
  );
};

export default Portfolio;
