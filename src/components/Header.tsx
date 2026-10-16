import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ABOUT', href: '#about', hasCircle: true },
    { label: 'WORK', href: '#work', hasCircle: true },
    { label: 'HOW I LEAD', href: '#how-i-lead', hasCircle: true },
    { label: 'EXPERIENCE', href: '#experience', hasCircle: true },
    { label: 'CONTACT', href: '#contact', hasCircle: true },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 px-4 md:px-10 transition-all duration-500 ${isScrolled ? 'bg-ink/80 backdrop-blur-xl border-b border-line-dark py-4' : 'bg-transparent py-8 md:py-10'} flex items-center`}
      >
        <div className="flex items-center w-full">
          {/* Logo and first line */}
          <div className="flex items-center gap-4 min-w-max">
            <a href="/" aria-label="Umer, home" className="t-display-m flex items-center gap-1">
              <span>UMER</span>
            </a>
          </div>
          
          <div className="flex-1 flex items-center">
            <div className="h-px bg-white/40 w-full mx-4" />
            
            <nav className="hidden lg:flex items-center gap-0 flex-1">
              {navItems.map((item, index) => (
                <a key={index} href={item.href} className="flex flex-1 items-center gap-4 group h-10 no-underline">
                  {item.hasCircle && (
                    <div className="w-1.5 h-1.5 rounded-full border border-white group-hover:bg-white transition-colors" />
                  )}
                  {item.label && (
                    <span className="t-label text-white whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                  <div className="h-px bg-white/40 flex-1" />
                </a>
              ))}
            </nav>
          </div>

          {/* Menu Toggle (//) */}
          <div className="flex items-center pl-4 md:pl-12">
            <button 
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              className="flex items-center gap-1 group"
            >
              <div className="w-7 h-5 border-r-2 border-white transform -skew-x-[20deg] group-hover:opacity-100 transition-opacity" />
              <div className="w-2 h-5 border-r-2 border-white transform -skew-x-[20deg] group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="t-display-m text-white">UMER</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="text-white hover:rotate-90 transition-transform duration-300"
              >
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="t-display-l text-white hover:underline"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto border-t border-white/10 pt-12">
              <p className="t-label text-muted-dark mb-6">Let's Connect</p>
              <div className="flex gap-8">
                <a href="https://www.linkedin.com/in/umar-khalid1/" target="_blank" rel="noopener noreferrer" className="t-heading text-white border-b border-white pb-1">LinkedIn</a>
                <a href="https://www.instagram.com/umar_khalid1" target="_blank" rel="noopener noreferrer" className="t-heading text-white border-b border-white pb-1">Instagram</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
