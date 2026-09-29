import React from 'react';
import { motion } from 'framer-motion';

interface ServiceItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  deliverables: string[];
}

const ServiceCard = React.memo(({
  service,
  isInView,
  index,
}: {
  service: ServiceItem;
  isInView: boolean;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.1, 0.5),
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative h-full"
    >
      {/* Main Glass Card with CSS Hardware-Accelerated Hover */}
      <div className="relative h-full p-8 glass-strong rounded-3xl border border-[var(--border-soft)] hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden flex flex-col justify-between">
        
        {/* Subtle Radial Glow on Hover - Pure CSS */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(400px circle at 50% 0%, var(--accent-soft), transparent 70%)',
          }}
        />

        {/* Grid pattern overlay - Pure CSS */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div>
          {/* Icon container */}
          <div className="relative z-10 mb-6 inline-block">
            {/* Ambient icon glow on hover */}
            <div className="absolute inset-0 bg-[var(--accent)] rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
            
            {/* Icon background */}
            <div className="relative w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center border border-[var(--accent)]/20 group-hover:border-[var(--accent)]/50 group-hover:scale-105 transition-all duration-300">
              <service.icon
                className="w-7 h-7 text-[var(--accent)]"
                strokeWidth={2}
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-3">
            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>

        {/* Deliverables */}
        <div className="relative z-10 space-y-2 pt-6 mt-6 border-t border-[var(--border-soft)]">
          {service.deliverables.map((item: string, i: number) => (
            <div
              key={i}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] group/item"
            >
              <div className="relative mt-1.5 flex-shrink-0">
                <span className="block w-1.5 h-1.5 rounded-full bg-[var(--accent)] group-hover:scale-125 transition-transform" />
              </div>
              <span className="group-hover/item:text-[var(--text-primary)] transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Corner accents - Pure CSS */}
        <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-transparent group-hover:border-[var(--accent)]/40 transition-all duration-300 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-transparent group-hover:border-[var(--accent)]/40 transition-all duration-300 rounded-bl-lg pointer-events-none" />

        {/* Bottom accent indicator line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center pointer-events-none" />
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;