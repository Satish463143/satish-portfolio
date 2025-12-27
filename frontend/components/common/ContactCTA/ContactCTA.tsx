'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MapPin, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';
const Title = dynamic(() => import('@/components/common/Title/Title'), { ssr: false });

const ContactCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', phone: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:mahatosatish463@gmail.com',
      label: 'mahatosatish463@gmail.com',
      color: 'from-red-500 to-pink-500',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/satish463143',
      label: '@satish463',
      color: 'from-gray-700 to-gray-900',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/satish-mahato-233151257/',
      label: '/in/satish-mahato-233151257/',
      color: 'from-blue-600 to-blue-800',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)] rounded-full blur-[200px] opacity-10" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <Title isInView={isInView} title="Get in Touch" subtitle1="Let's Build" subtitle2=' Something Great' description="Have a project in mind? Let's discuss how we can work together" />

        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-strong p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-soft)] rounded-xl text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)] outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-soft)] rounded-xl text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)] outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-soft)] rounded-xl text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)] outline-none transition-all"
                    placeholder="+91 9876543210"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-soft)] rounded-xl text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)] outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[var(--accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-600 dark:text-green-400 text-center font-medium"
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Connect With Me
              </h3>

              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.03, x: 5 }}
                  className="flex items-center gap-4 p-4 glass-strong rounded-xl hover:border-[var(--accent-soft)] transition-all duration-300 group"
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${link.color}`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {link.name}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {link.label}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="glass-strong p-6 rounded-2xl space-y-4"
            >
              <h4 className="font-bold text-[var(--text-primary)] mb-4">
                Quick Info
              </h4>

              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Location</p>
                  <p className="text-[var(--text-secondary)]">Working remotely worldwide</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Response Time</p>
                  <p className="text-[var(--text-secondary)]">
                    Typically within 24 hours (Mon-Fri, 9 AM - 6 PM IST)
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-soft)]">
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  * All inquiries are reviewed personally. For urgent requests, please mention 
                  "URGENT" in your message subject.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;