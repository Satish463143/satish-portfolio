'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  FileText,
  Code,
} from 'lucide-react';

const ProjectCard = memo(function ProjectCard({
  project,
  isInView,
  index,
}: any) {
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [4, -4]);
  const rotateY = useTransform(mouseX, [-150, 150], [-4, 4]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.15 }}
        className="relative h-[500px] group"
        style={{ perspective: 1200 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
        onMouseMove={handleMove}
      >
        {/* CARD */}
        <m.div
          className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10"
          style={{ rotateX, rotateY, willChange: 'transform' }}
        >
          {/* IMAGE */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
            priority={index === 0}
          />

          {/* IMAGE OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* DEFAULT VIEW */}
          <m.div
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col justify-end p-8"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              {project.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-white/20 text-white rounded-full backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>
          </m.div>

          {/* HOVER VIEW (FULL DETAILS) */}
          <m.div
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 20,
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 bg-[var(--bg-main)]/95 backdrop-blur-xl p-8 flex flex-col justify-between overflow-y-auto"
            style={{ pointerEvents: hovered ? 'auto' : 'none' }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">
                {project.title}
              </h3>

              {/* CHALLENGE */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} />
                  <p className="text-xs font-bold uppercase tracking-wide">
                    Challenge
                  </p>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* RESULT */}
              <div className="mb-6 p-4 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent)]/30">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight size={14} />
                  <p className="text-xs font-bold uppercase tracking-wide">
                    Result
                  </p>
                </div>
                <p className="font-semibold">
                  {project.result}
                </p>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs bg-[var(--accent-soft)] text-[var(--accent)] rounded-full border border-[var(--accent)]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">
              {project.caseStudyLink ? (
                <button onClick={() => window.open(project.caseStudyLink, '_blank')} className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-[var(--accent)] text-white py-3 rounded-xl font-semibold">
                  <FileText size={16} />
                  Case Study
                  <ArrowRight size={16} />
                </button>
              ) : project.liveLink ? (
                <button onClick={() => window.open(project.liveLink, '_blank')} className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-[var(--accent)] text-white py-3 rounded-xl font-semibold">
                  <ExternalLink size={16} />
                  View Live
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button onClick={() => window.open(project.codeLink, '_blank')} className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-[var(--accent)] text-white py-3 rounded-xl font-semibold">
                  <Code size={16} />
                  View Code
                  <ArrowRight size={16} />
                </button>
              )}
              {project.liveLink && !project.caseStudyLink && (
                <button onClick={() => window.open(project.codeLink, '_blank')} className="px-5 cursor-pointer py-3 border border-white/20 rounded-xl">
                  <Code size={16} />
                </button>
              )}
              {project.caseStudyLink && (
                <>
                  {project.liveLink && (
                    <button onClick={() => window.open(project.liveLink, '_blank')} className="px-5 cursor-pointer py-3 border border-white/20 rounded-xl">
                      <ExternalLink size={16} />
                    </button>
                  )}
                  <button onClick={() => window.open(project.codeLink, '_blank')} className="px-5 cursor-pointer py-3 border border-white/20 rounded-xl">
                    <Code size={16} />
                  </button>
                </>
              )}
            </div>
            
          </m.div>

          {/* ACCENT BAR */}
          <m.div
            className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </m.div>

        {/* GLOW */}
        <m.div
          className="absolute -inset-2 bg-[var(--accent)]/30 blur-2xl rounded-3xl -z-10"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </m.div>
    </LazyMotion>
  );
});

export default ProjectCard;
