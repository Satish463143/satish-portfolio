"use client"
import { motion } from 'framer-motion'

const Title = ({isInView, title, subtitle1,	subtitle2,  description}: {isInView: boolean, title: string, subtitle1: string, subtitle2: string, description: string}) => {
  return (
    <div className="text-center mb-20 space-y-6">
    {/* Badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--border-soft)]"
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-2 h-2 rounded-full bg-[var(--accent)]"
      />
      <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
       {title}
      </span>
    </motion.div>

    {/* Title with word reveal */}
    <div className="overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)]"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {subtitle1} {' '}
        <span className="relative inline-block">
          <span className="relative z-10 bg-gradient-to-r from-[var(--accent)] to-orange-500 bg-clip-text text-transparent">
            {subtitle2}
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-2 left-0 right-0 h-3 bg-[var(--accent-soft)] -z-0"
            style={{ originX: 0 }}
          />
        </span>
      </motion.h2>
    </div>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
    >
      {description}
    </motion.p>

    {/* Decorative line */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mx-auto rounded-full"
    />
  </div>
  )
}

export default Title