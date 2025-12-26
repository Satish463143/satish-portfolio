import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const ServiceCard = ({
  service,
  isInView,
  index,
}: {
  service: any;
  isInView: boolean;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 45 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative h-full"
      >
        {/* Card with layers */}
        <div className="relative h-full p-8 glass-strong rounded-3xl border border-[var(--border-soft)] overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${x}px ${y}px, var(--accent-soft), transparent 40%)`,
            }}
          />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          {/* Floating icon container */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: index * 0.15 + 0.2,
              type: 'spring',
              stiffness: 200,
            }}
            className="relative z-10 mb-6"
          >
            <motion.div
              animate={
                isHovered
                  ? {
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1.1, 1.1, 1],
                    }
                  : {}
              }
              transition={{ duration: 0.6 }}
              className="relative inline-block"
            >
              {/* Icon glow */}
              <motion.div
                className="absolute inset-0 bg-[var(--accent)] rounded-2xl blur-xl opacity-0 group-hover:opacity-50"
                animate={
                  isHovered
                    ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Icon background */}
              <div className="relative w-16 h-16 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center border border-[var(--accent)]/20 group-hover:border-[var(--accent)]/50 transition-all duration-300">
                <service.icon
                  className="w-8 h-8 text-[var(--accent)]"
                  strokeWidth={2}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="relative z-10 space-y-4">
            {/* Title with reveal animation */}
            <div className="overflow-hidden">
              <motion.h3
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15 + 0.3,
                }}
                className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300"
              >
                {service.title}
              </motion.h3>
            </div>

            {/* Description with fade-in */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15 + 0.4,
              }}
              className="text-[var(--text-secondary)] leading-relaxed"
            >
              {service.description}
            </motion.p>

            {/* Deliverables with stagger */}
            <div className="space-y-2 pt-4">
              {service.deliverables.map((item: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15 + 0.5 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-3 text-sm text-[var(--text-secondary)] group/item"
                >
                  {/* Animated bullet */}
                  <motion.div
                    whileHover={{ scale: 1.5, rotate: 180 }}
                    className="relative mt-1.5 flex-shrink-0"
                  >
                    <motion.span
                      className="block w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
                      animate={
                        isHovered
                          ? {
                              boxShadow: [
                                '0 0 0 0 rgba(255, 112, 0, 0.4)',
                                '0 0 0 4px rgba(255, 112, 0, 0)',
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  </motion.div>
                  <span className="group-hover/item:text-[var(--text-primary)] transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            animate={
              isHovered
                ? {
                    background: [
                      'linear-gradient(135deg, transparent 0%, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%, transparent 100%)',
                      'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%, transparent 100%)',
                      'linear-gradient(135deg, transparent 100%, transparent 100%, transparent 100%, transparent 100%, transparent 100%)',
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Corner accents */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)]/0 group-hover:border-[var(--accent)]/50 transition-all duration-500 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)]/0 group-hover:border-[var(--accent)]/50 transition-all duration-500 rounded-bl-lg" />

          {/* Bottom gradient indicator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
            style={{ originX: 0.5 }}
          />
        </div>

        {/* 3D Shadow layer */}
        <div
          className="absolute inset-0 -z-10 bg-[var(--accent)]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            transform: 'translateZ(-50px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;