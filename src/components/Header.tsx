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
    { label: 'WORKS', href: '#work', hasCircle: true },
    { label: 'SERVICES', href: '#services', hasCircle: true },
    { label: 'PROCESS', href: '#process', hasCircle: true },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 px-4 md:px-10 transition-all duration-500 ${isScrolled ? 'bg-black/10 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8 md:py-10'} flex items-center`}
      >
        <div className="flex items-center w-full">
          {/* Logo and first line */}
          <div className="flex items-center gap-4 min-w-max">
            <a href="#" className="font-display text-3xl tracking-tighter flex items-center gap-1">
              <span>UMER</span>
            </a>
          </div>
          
          <div className="flex-1 flex items-center">
            <div className="h-[1px] bg-white/40 w-full mx-4" />
            
            <nav className="hidden lg:flex items-center gap-0 flex-1">
              {navItems.map((item, index) => (
                <a key={index} href={item.href} className="flex flex-1 items-center gap-4 group cursor-pointer h-10 no-underline">
                  {item.hasCircle && (
                    <div className="w-1.5 h-1.5 rounded-full border-[1px] border-white group-hover:bg-white transition-colors" />
                  )}
                  {item.label && (
                    <span className="text-[10px] font-bold tracking-[0.25em] text-white/90 group-hover:text-white transition-colors whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                  <div className="h-[1px] bg-white/40 flex-1" />
                </a>
              ))}
            </nav>
          </div>

          {/* Menu Toggle (//) */}
          <div className="flex items-center pl-4 md:pl-12">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-[4px] cursor-pointer group"
            >
              <div className="w-7 h-[20px] border-r-2 border-white transform skew-x-[-20deg] group-hover:opacity-100 transition-opacity" />
              <div className="w-2 h-[20px] border-r-2 border-white transform skew-x-[-20deg] group-hover:opacity-100 transition-opacity" />
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
            className="fixed inset-0 z-[100] bg-black flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-display text-3xl tracking-tighter text-white">UMER</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
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
                  className="font-display text-5xl md:text-7xl text-white uppercase tracking-tighter hover:text-[#FF6B35] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto border-t border-white/10 pt-12">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-6">Let's Connect</p>
              <div className="flex gap-8">
                <a href="https://www.linkedin.com/in/umar-khalid1/" target="_blank" rel="noopener noreferrer" className="text-white text-xl font-bold border-b border-white pb-1">LinkedIn</a>
                <a href="https://www.instagram.com/umar_khalid1" target="_blank" rel="noopener noreferrer" className="text-white text-xl font-bold border-b border-white pb-1">Instagram</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
