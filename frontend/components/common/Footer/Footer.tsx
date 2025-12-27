'use client';

import { motion } from 'framer-motion';
import {  Heart, ExternalLink } from 'lucide-react';
import { socialLinks } from '../../../src/data/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '#home' },
        { label: 'Services', href: '#services' },
        { label: 'Projects', href: '#portfolio' },
        { label: 'Process', href: '#process' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Tech Stack', href: '#stack' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ]; 

  return (
    <footer className="relative border-t border-[var(--border-soft)] bg-[var(--bg-main)] mt-24">
      {/* Gradient decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-2"
              >
                <h1 className="text-4xl font-bold text-[var(--accent)]"> Satish Mahato</h1>
              </motion.div>
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-md">
                Building high-performance web products with cutting-edge technologies. 
                Full-stack MERN development, AI integrations, and cloud solutions.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 glass rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 group"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--accent-soft)] text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
              </span>
              <span className="text-[var(--text-secondary)]">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-[var(--text-primary)] font-bold mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300 inline-flex items-center gap-2 group"
                    >
                      {link.label}
                      {link.href.startsWith('http') && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mb-9 border-t border-[var(--border-soft)]">
          <div className=" flex-col flex md:flex-row justify-center items-center gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[var(--text-muted)] text-sm flex items-center gap-2"
            >
              © {currentYear} Satish Mahato. Made with
              <Heart className="w-4 h-4 text-[var(--accent)] fill-current animate-pulse" />
              and lots of coffee
            </motion.p>
            {/* Legal Links */}            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;