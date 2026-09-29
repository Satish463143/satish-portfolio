'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Copy, 
  Check, 
  MapPin, 
  Briefcase, 
  Code2, 
  ExternalLink,
  Layers,
  Laptop
} from 'lucide-react';

export default function Banner() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'developer' | 'stack' | 'current'>('developer');

  const copyEmail = () => {
    navigator.clipboard.writeText('mahatosatish463@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[var(--bg-main)] py-20 lg:py-24"
      aria-label="Introduction to Satish Mahato"
    >
      {/* Lightweight, zero-lag ambient background glows (pure CSS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--accent)] opacity-10 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[420px] h-[420px] rounded-full bg-[var(--accent)] opacity-8 blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px]" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Human, authentic narrative */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Real status badge with human vibe */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--border-soft)] bg-[var(--bg-glass)] backdrop-blur-md shadow-xs text-xs sm:text-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-medium text-[var(--text-primary)]">Available for projects & roles</span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--text-secondary)] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" /> Nepal (Remote Worldwide)
              </span>
            </motion.div>

            {/* Main Headline - Natural, grounded & high-impact */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]"
              >
                Building scalable web apps that <span className="text-[var(--accent)] relative inline-block">
                  solve real problems
                  <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[var(--accent)]/30 rounded-full" />
                </span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl"
              >
                Hi, I&apos;m <strong className="text-[var(--text-primary)] font-semibold">Satish Mahato</strong> — Full-Stack Engineer &amp; Founder of{' '}
                <a
                  href="https://bleedingtech.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-4 hover:decoration-[var(--accent)] transition-all font-medium inline-flex items-center gap-0.5"
                >
                  Bleeding Tech <ExternalLink className="w-3.5 h-3.5 inline ml-0.5 opacity-80" />
                </a>.
                I craft clean MERN &amp; Next.js systems, high-throughput APIs, and pragmatic AI workflows tailored for real-world growth.
              </motion.p>
            </div>

            {/* CTAs & Quick Email Copy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={scrollToPortfolio}
                className="px-6 py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[#e06300] text-white font-semibold flex items-center gap-2.5 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer active:translate-y-0 text-sm sm:text-base"
              >
                View Shipped Work
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToContact}
                className="px-6 py-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-glass)] hover:border-[var(--accent)]/60 text-[var(--text-primary)] font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base"
              >
                Let&apos;s Talk
              </button>

              {/* Direct email copy button */}
              <button
                onClick={copyEmail}
                className="px-4 py-3.5 rounded-xl border border-dashed border-[var(--border-strong)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer group"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500 font-medium">Copied to clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Copy email</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Real Human Stats (Meaningful & grounded) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border-soft)] max-w-lg"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">8+</div>
                <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">Shipped Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] tracking-tight">MERN &amp; Next</div>
                <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">Core Stack</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">Founder</div>
                <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">At Bleeding Tech</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Real Developer Workspace Showcase Card (Instant load, 0 lag, high credibility) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 w-full"
          >
            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-glass-strong)] shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[var(--accent)]/40">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-soft)] bg-[var(--bg-main)]/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" /> satish.engineer.ts
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  active
                </div>
              </div>

              {/* Tab Selector for Interactive Feel */}
              <div className="flex border-b border-[var(--border-soft)] text-xs font-mono bg-[var(--bg-main)]/30">
                <button
                  onClick={() => setActiveTab('developer')}
                  className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'developer'
                      ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/5 font-semibold'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('stack')}
                  className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'stack'
                      ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/5 font-semibold'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Key Tech
                </button>
                <button
                  onClick={() => setActiveTab('current')}
                  className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'current'
                      ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/5 font-semibold'
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Highlights
                </button>
              </div>

              {/* Tab Body */}
              <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed">
                {activeTab === 'developer' && (
                  <div className="space-y-3">
                    <p className="text-[var(--text-muted)]">
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-400">developer</span> = &#123;
                    </p>
                    <div className="pl-4 space-y-1.5">
                      <p>
                        <span className="text-[var(--text-secondary)]">name:</span>{' '}
                        <span className="text-emerald-400">&quot;Satish Mahato&quot;</span>,
                      </p>
                      <p>
                        <span className="text-[var(--text-secondary)]">role:</span>{' '}
                        <span className="text-emerald-400">&quot;Full-Stack Engineer&quot;</span>,
                      </p>
                      <p>
                        <span className="text-[var(--text-secondary)]">agency:</span>{' '}
                        <span className="text-emerald-400">&quot;Bleeding Tech&quot;</span>,
                      </p>
                      <p>
                        <span className="text-[var(--text-secondary)]">focus:</span>{' '}
                        <span className="text-amber-400">[&quot;Next.js&quot;, &quot;React&quot;, &quot;Node.js&quot;, &quot;Express&quot;, &quot;MongoDB&quot;]</span>,
                      </p>
                      <p>
                        <span className="text-[var(--text-secondary)]">loves:</span>{' '}
                        <span className="text-emerald-400">&quot;Fast load times &amp; reliable architecture&quot;</span>,
                      </p>
                      <p>
                        <span className="text-[var(--text-secondary)]">status:</span>{' '}
                        <span className="text-emerald-400">&quot;Open to freelance &amp; contract roles&quot;</span>,
                      </p>
                    </div>
                    <p className="text-[var(--text-muted)]">&#125;;</p>

                    <div className="mt-4 pt-3 border-t border-[var(--border-soft)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1.5">
                        <Laptop className="w-3.5 h-3.5 text-[var(--accent)]" /> Full cycle engineering
                      </span>
                      <span className="text-[var(--accent)] font-medium">Ready to deploy</span>
                    </div>
                  </div>
                )}

                {activeTab === 'stack' && (
                  <div className="space-y-3.5">
                    <div className="text-xs text-[var(--text-muted)]">
                      {`// Core technologies used across production apps`}
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2.5 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-main)]/50">
                        <div className="font-semibold text-[var(--accent)]">Frontend</div>
                        <div className="text-xs text-[var(--text-secondary)] mt-1">Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion</div>
                      </div>
                      <div className="p-2.5 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-main)]/50">
                        <div className="font-semibold text-[var(--accent)]">Backend</div>
                        <div className="text-xs text-[var(--text-secondary)] mt-1">Node.js, Express, REST APIs, WebSockets, Python</div>
                      </div>
                      <div className="p-2.5 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-main)]/50">
                        <div className="font-semibold text-[var(--accent)]">Databases</div>
                        <div className="text-xs text-[var(--text-secondary)] mt-1">MongoDB, PostgreSQL, Redis</div>
                      </div>
                      <div className="p-2.5 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-main)]/50">
                        <div className="font-semibold text-[var(--accent)]">Cloud &amp; AI</div>
                        <div className="text-xs text-[var(--text-secondary)] mt-1">AWS S3, Docker, OpenAI, Gemini API, Vercel</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'current' && (
                  <div className="space-y-3">
                    <div className="text-xs text-[var(--text-muted)]">
                      {`// Recent work & real-world client builds`}
                    </div>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-main)]/50 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[var(--text-primary)]">Maya Wears</div>
                          <div className="text-xs text-[var(--text-muted)]">E-commerce platform with smooth checkout &amp; scaling</div>
                        </div>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Live</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-main)]/50 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[var(--text-primary)]">Bleeding Tech</div>
                          <div className="text-xs text-[var(--text-muted)]">Digital tech agency platform &amp; client acquisition</div>
                        </div>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-orange-500/10 text-[var(--accent)]">Live</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-main)]/50 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[var(--text-primary)]">PTE Sathi</div>
                          <div className="text-xs text-[var(--text-muted)]">AI-powered language learning &amp; mock testing system</div>
                        </div>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">AI Tool</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Contact Bar */}
              <div className="px-5 py-3 border-t border-[var(--border-soft)] bg-[var(--bg-main)]/40 flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" /> Let&apos;s build something great
                </span>
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="text-[var(--accent)] hover:underline font-medium flex items-center gap-1"
                >
                  Send a message <ArrowRight className="w-3 h-3" />
                </a>
              </div>

            </div>
          </motion.div>


        </div>
      </div>
    </section>
  );
}