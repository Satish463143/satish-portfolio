'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import { 
  Home, 
  Briefcase, 
  FolderOpen, 
  FileText, 
  BookOpen, 
  Mail 
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Service', href: '/service', icon: Briefcase },
  { label: 'Portfolio', href: '/portfolio', icon: FolderOpen },
  { label: 'Case Studies', href: '/case-studies', icon: FileText },
  { label: 'Blog', href: '/blog', icon: BookOpen },
  { label: 'Contact', href: '/contact', icon: Mail },
];


const Navbar = () => {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string>(pathname);
  
  // Sync activeMenu with pathname on route change
  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);
  
  const isActive = (href: string) => {
    setActiveMenu(href);
  }
  

  return (
    <nav 
      className="mobile_navbar"
      aria-label="Mobile navigation"
    >
      <div className='navbar_container_mobile'>
        {navItems.map((item) => (
          <Link 
            href={item.href} 
            key={item.href} 
            onClick={() => isActive(item.href)}
            className={activeMenu === item.href ? 'activeMenuWrapper' : 'menuWrapper'}
          >
            {activeMenu === item.href && (
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
                  // animate={{
                  //   x: '-50%',
                  //   y: '-100%'
                  // }}
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
            
            <div className={activeMenu === item.href ? 'activeMenu' : 'menu'}>
              <item.icon className="menu_icon" />
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;