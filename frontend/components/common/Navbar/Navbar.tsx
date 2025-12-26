'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import './Navbar.css';
import { 
  Home, 
  Briefcase, 
  FolderOpen, 
  GitBranch, 
  Layers, 
  MessageCircle 
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  isSection?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: Home, isSection: true },
  { label: 'Services', href: '#services', icon: Briefcase, isSection: true },
  { label: 'Projects', href: '#portfolio', icon: FolderOpen, isSection: true },
  { label: 'Process', href: '#process', icon: GitBranch, isSection: true },
  { label: 'Stack', href: '#stack', icon: Layers, isSection: true },
  { label: 'Contact', href: '#contact', icon: MessageCircle, isSection: true },
];

const Navbar = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('home');
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ['home', 'services', 'portfolio', 'process', 'stack', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const handleClick = (href: string, isSection?: boolean) => {
    if (isSection && isHomePage) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  

  return (
    <nav 
      className="mobile_navbar"
      aria-label="Mobile navigation"
    >
      <div className='navbar_container_mobile'>
        {navItems.map((item) => {
          const isActive = isHomePage && item.isSection 
            ? activeSection === item.href.replace('#', '')
            : pathname === item.href;

          return item.isSection && isHomePage ? (
            <button
              key={item.href}
              onClick={() => handleClick(item.href, item.isSection)}
              className={isActive ? 'activeMenuWrapper' : 'menuWrapper'}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <>
                  {/* Left curve cutout */}
                  <motion.div
                    layoutId="leftCurve"
                    className="activeMenuWrapper-before"
                    initial={false}
                    animate={{
                      rotate: 177
                    }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      },
                      rotate: {
                        duration: 0
                      }
                    }}
                  />
                  
                  {/* Right curve cutout */}
                  <motion.div
                    layoutId="rightCurve"
                    className="activeMenuWrapper-after"
                    initial={false}
                    animate={{
                      rotate: 90
                    }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      },
                      rotate: {
                        duration: 0
                      }
                    }}
                  />
                  
                  {/* Circle background */}
                  <motion.div
                    layoutId="activeCircle"
                    className="activeMenu-circle"
                    initial={false}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      },
                      x: {
                        duration: 0
                      },
                      y: {
                        duration: 0
                      }
                    }}
                  />
                </>
              )}
              
              <div className={isActive ? 'activeMenu' : 'menu'}>
                <item.icon className="menu_icon" />
              </div>
            </button>
          ) : (
            <Link 
              href={item.href} 
              key={item.href} 
              className={isActive ? 'activeMenuWrapper' : 'menuWrapper'}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <>
                  {/* Left curve cutout */}
                  <motion.div
                    layoutId="leftCurve"
                    className="activeMenuWrapper-before"
                    initial={false}
                    animate={{
                      rotate: 177
                    }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      },
                      rotate: {
                        duration: 0
                      }
                    }}
                  />
                  
                  {/* Right curve cutout */}
                  <motion.div
                    layoutId="rightCurve"
                    className="activeMenuWrapper-after"
                    initial={false}
                    animate={{
                      rotate: 90
                    }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      },
                      rotate: {
                        duration: 0
                      }
                    }}
                  />
                  
                  {/* Circle background */}
                  <motion.div
                    layoutId="activeCircle"
                    className="activeMenu-circle"
                    initial={false}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      },
                      x: {
                        duration: 0
                      },
                      y: {
                        duration: 0
                      }
                    }}
                  />
                </>
              )}
              
              <div className={isActive ? 'activeMenu' : 'menu'}>
                <item.icon className="menu_icon" />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;