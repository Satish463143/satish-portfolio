'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FileText, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

const ProjectCard = ({
  project,
  isInView,
  index,
}: {
  project: any;
  isInView: boolean;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative h-[500px]"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsMobileExpanded(!isMobileExpanded)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Main Card Container */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[var(--border-soft)] group-hover:border-[var(--accent)]/50 transition-all duration-500 shadow-premium-strong">
          {/* Background Image with Zoom Effect */}
          <motion.div
            className="absolute inset-0"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
            )}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Animated shine effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  'linear-gradient(135deg, transparent 0%, rgba(255,112,0,0.1) 50%, transparent 100%)',
              }}
              animate={
                isHovered
                  ? {
                      backgroundPosition: ['0% 0%', '200% 200%'],
                    }
                  : {}
              }
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Content Layer - Default View (hidden on hover) */}
          <motion.div
            className="relative z-10 h-full flex flex-col pointer-events-none"
            animate={
              isHovered || isMobileExpanded
                ? { opacity: 0 }
                : { opacity: 1 }
            }
            transition={{ duration: 0.3 }}
          >
            {/* Title at Bottom */}
            <div className="mt-auto p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {project.title}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag: string, i: number) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.3 + i * 0.1 }}
                    className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-md text-white rounded-full border border-white/20"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Hover Overlay - Details Reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isHovered || isMobileExpanded
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 bg-[var(--bg-main)]/98 backdrop-blur-xl p-8 flex flex-col justify-between overflow-y-auto pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileExpanded(false);
            }}
          >
            {/* Close indicator */}
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 90 }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--accent)]/20 hover:bg-[var(--accent)]/30 cursor-pointer transition-colors md:hidden"
            >
              <div className="w-4 h-0.5 bg-white rotate-45 absolute" />
              <div className="w-4 h-0.5 bg-white -rotate-45 absolute" />
            </motion.div>

            {/* Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isHovered || isMobileExpanded
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">
                  {project.title}
                </h3>

                {/* Challenge */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[var(--text-muted)]" />
                    <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      CHALLENGE
                    </p>
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Result - Highlighted */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={
                    isHovered || isMobileExpanded
                      ? { scale: 1 }
                      : { scale: 0.95 }
                  }
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="mb-6 p-4 bg-[var(--accent-soft)] rounded-2xl border border-[var(--accent)]/30 relative overflow-hidden"
                >
                  {/* Animated background */}
                  <motion.div
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'linear-gradient(45deg, transparent 30%, rgba(255,112,0,0.3) 50%, transparent 70%)',
                      backgroundSize: '200% 200%',
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
                      <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                        RESULT
                      </p>
                    </div>
                    <p className="text-[var(--text-primary)] font-semibold">
                      {project.result}
                    </p>
                  </div>
                </motion.div>

                {/* All Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag: string, i: number) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        isHovered || isMobileExpanded
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      className="px-3 py-1.5 text-xs font-medium bg-[var(--accent-soft)] text-[var(--accent)] rounded-full border border-[var(--accent)]/20"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHovered || isMobileExpanded
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[var(--accent)]/40 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                Case Study
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-6 py-3 glass border border-[var(--border-soft)] text-[var(--text-primary)] rounded-xl font-semibold hover:border-[var(--accent)] transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Live
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Accent border on hover */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
            initial={{ scaleX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Corner accents that grow on hover */}
          <motion.div
            className="absolute top-0 right-0 w-12 h-12"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-[var(--accent)] to-transparent" />
            <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-[var(--accent)] to-transparent" />
          </motion.div>

          {/* Mobile tap hint */}
          {!isMobileExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full md:hidden pointer-events-none"
            >
              Tap to view
            </motion.div>
          )}
        </div>

        {/* 3D Floating shadow */}
        <motion.div
          className="absolute inset-0 -z-10 bg-[var(--accent)]/20 rounded-3xl blur-2xl"
          animate={
            isHovered
              ? { scale: 1.05, opacity: 0.6 }
              : { scale: 0.95, opacity: 0 }
          }
          transition={{ duration: 0.4 }}
        />

        {/* Glow effect on corners */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)]/20 via-purple-500/20 to-[var(--accent)]/20 rounded-3xl blur-xl -z-20"
          animate={
            isHovered
              ? { opacity: 0.8, scale: 1.02 }
              : { opacity: 0, scale: 0.98 }
          }
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;