'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import dynamic from 'next/dynamic';
const Title = dynamic(() => import('@/components/common/Title/Title'), { ssr: false });
import { faqs } from '@/src/data/data';




const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[150px] opacity-10" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Section Header */}
        <Title isInView={isInView} title="Questions & Answers" subtitle1="Frequently Asked" subtitle2='Questions' description="Everything you need to know about working with me" />


        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left glass-strong p-6 rounded-2xl hover:border-[var(--accent-soft)] transition-all duration-300 group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Question */}
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {faq.question}
                      </h3>

                      {/* Answer */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            id={`faq-answer-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="text-[var(--text-secondary)] leading-relaxed mt-4 pr-8">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Toggle Icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-soft)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-white transition-colors"
                    >
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-[var(--accent)] group-hover:text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-[var(--accent)] group-hover:text-white" />
                      )}
                    </motion.div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-strong p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              Still have questions?
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Feel free to reach out directly. I typically respond within 24 hours.
            </p>
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-8 py-3 bg-[var(--accent)] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;