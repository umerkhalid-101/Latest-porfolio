import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/#work' },
  { label: 'How I lead', href: '/#how-i-lead' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '#contact' },
];

/**
 * A quiet header: the logo, one "Let's talk" button and a menu.
 * It floats as a compact bar once you scroll, tucks away while scrolling down, and returns on the way up.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 60);
    setHidden(y > 400 && y > prev + 2);
  });

  // Lock the page while the menu is open, close it with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.documentElement.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden && !open ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: scrolled ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 px-3 md:px-6 pt-3 md:pt-4"
      >
        <div
          className={`mx-auto flex items-center justify-between gap-4 rounded-full pl-5 pr-2 py-2 transition-[background-color,max-width,box-shadow] duration-500 ${
            scrolled ? 'max-w-[760px] bg-ink/85 backdrop-blur-xl text-white shadow-[0_10px_30px_-12px_rgba(11,11,11,0.5)]' : 'max-w-[1800px] bg-transparent text-white'
          }`}
        >
          <a href="/" aria-label="Umer, home" className="t-display-m leading-none">UMER<span className="text-ink">.</span></a>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white text-ink pl-4 pr-1.5 py-1.5 t-label group"
            >
              Let's talk
              <span className="w-7 h-7 rounded-full bg-accent text-ink flex items-center justify-center motion-safe:transition-transform group-hover:rotate-45" aria-hidden="true">
                <ArrowUpRight size={14} />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`h-10 rounded-full pl-4 pr-3 flex items-center gap-3 t-label ${scrolled ? 'bg-white/10 hover:bg-white/20' : 'bg-ink text-white hover:bg-ink-soft'} motion-safe:transition-colors`}
            >
              Menu
              <span className="flex flex-col gap-1" aria-hidden="true">
                <span className="block w-4 h-0.5 bg-current" />
                <span className="block w-4 h-0.5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 60px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 60px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 60px) 40px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-ink text-white flex flex-col px-6 md:px-14 pt-5 pb-8"
          >
            <div className="flex items-center justify-between">
              <span className="t-display-m">UMER<span className="text-accent">.</span></span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="h-10 rounded-full bg-white/10 hover:bg-white/20 pl-4 pr-3 flex items-center gap-3 t-label"
              >
                Close
                <span className="relative w-4 h-4" aria-hidden="true">
                  <span className="absolute top-1/2 left-0 w-4 h-0.5 bg-current rotate-45" />
                  <span className="absolute top-1/2 left-0 w-4 h-0.5 bg-current -rotate-45" />
                </span>
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center" aria-label="Sections">
              <ol>
                {navItems.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-line-dark">
                    <motion.a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-baseline gap-5 py-3 md:py-4"
                    >
                      <span className="t-label text-muted-dark tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <span className="t-display-l group-hover:text-accent group-hover:translate-x-3 motion-safe:transition-[color,transform] motion-safe:duration-300">{item.label}</span>
                    </motion.a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 t-label">
              <a href="mailto:umerkhalid141@gmail.com" className="hover:text-accent">umerkhalid141@gmail.com</a>
              <div className="flex gap-6">
                <a href="https://www.linkedin.com/in/umar-khalid1/" target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn ↗</a>
                <a href="https://www.instagram.com/umar_khalid1" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Instagram ↗</a>
                <a href="https://x.com/designsbyumer" target="_blank" rel="noopener noreferrer" className="hover:text-accent">X ↗</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
