import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const ServiceCard = React.memo(({
  service,
  isInView,
  index,
}: {
  service: any;
  isInView: boolean;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rafRef = useRef<number | undefined>(undefined);
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Throttled mouse move with RAF for smooth performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Skip 3D on mobile
    
    if (rafRef.current) return; // Skip if already scheduled
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
      rafRef.current = undefined;
    });
  }, [x, y, isMobile]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
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
        perspective: isMobile ? 'none' : 1000,
        transformStyle: isMobile ? 'flat' : 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: isMobile ? 'flat' : 'preserve-3d',
          willChange: 'transform',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative h-full"
      >
        {/* Card with layers */}
        <div className="relative h-full p-8 glass-strong rounded-3xl border border-[var(--border-soft)] overflow-hidden">
          {/* Animated gradient background - CSS only on mobile */}
          {!isMobile ? (
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(600px circle at ${x}px ${y}px, var(--accent-soft), transparent 40%)`,
                willChange: 'opacity',
              }}
            />
          ) : (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--accent-soft)] to-transparent" />
          )}

          {/* Grid pattern overlay - Pure CSS */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            style={{
              backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              willChange: 'opacity',
            }}
          />

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
            style={{ willChange: 'transform' }}
          >
            <motion.div
              animate={
                isHovered && !isMobile
                  ? {
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1.1, 1.1, 1],
                    }
                  : {}
              }
              transition={{ duration: 0.6 }}
              className="relative inline-block"
              style={{ willChange: isHovered ? 'transform' : 'auto' }}
            >
              {/* Icon glow - Simplified on mobile */}
              {!isMobile && isHovered ? (
                <motion.div
                  className="absolute inset-0 bg-[var(--accent)] rounded-2xl blur-xl opacity-0 group-hover:opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--accent)] rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
              )}
              
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
                  style={{ willChange: isInView ? 'transform, opacity' : 'auto' }}
                >
                  {/* Animated bullet - Simplified on mobile */}
                  {!isMobile ? (
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
                  ) : (
                    <div className="relative mt-1.5 flex-shrink-0">
                      <span className="block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    </div>
                  )}
                  <span className="group-hover/item:text-[var(--text-primary)] transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Shine effect on hover - Skip on mobile */}
          {!isMobile && (
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
          )}

          {/* Corner accents - Pure CSS */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)]/0 group-hover:border-[var(--accent)]/50 transition-all duration-500 rounded-tr-lg" style={{ willChange: 'border-color' }} />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)]/0 group-hover:border-[var(--accent)]/50 transition-all duration-500 rounded-bl-lg" style={{ willChange: 'border-color' }} />

          {/* Bottom gradient indicator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
            style={{ originX: 0.5, willChange: isHovered ? 'transform' : 'auto' }}
          />
        </div>

        {/* 3D Shadow layer - Skip on mobile */}
        {!isMobile && (
          <div
            className="absolute inset-0 -z-10 bg-[var(--accent)]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              transform: 'translateZ(-50px)',
              willChange: 'opacity',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;