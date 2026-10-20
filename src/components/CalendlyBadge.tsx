import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';

const URL = 'https://calendly.com/umerkhalid-design/30min';
const CSS = 'https://assets.calendly.com/assets/external/widget.css';
const JS = 'https://assets.calendly.com/assets/external/widget.js';

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (o: { url: string }) => void };
  }
}

let loading: Promise<void> | null = null;

/** Load Calendly's popup script and styles once, the first time they're needed */
function loadCalendly() {
  if (window.Calendly) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS;
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => { loading = null; reject(); };
    document.body.appendChild(script);
  });
  return loading;
}

/**
 * Floating "Schedule time with me" button. Stays out of the way on the first screen,
 * springs in once the visitor scrolls past it, and opens Calendly in a popup.
 */
export function CalendlyBadge() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Warm up the script as soon as the button shows, so the click opens instantly
  useEffect(() => {
    if (visible) loadCalendly().catch(() => {});
  }, [visible]);

  const open = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await loadCalendly();
      window.Calendly?.initPopupWidget({ url: URL });
    } catch {
      // Script blocked or offline: fall back to the booking page itself
      window.open(URL, '_blank', 'noopener');
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="calendly"
          href={URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={open}
          data-cursor-label="Book a call"
          className="group fixed right-4 bottom-4 md:right-6 md:bottom-6 z-[60] flex items-center gap-3 rounded-full bg-black text-white pl-2 pr-5 py-2 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] ring-1 ring-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.6, rotate: -6 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
        >
          <span className="relative w-9 h-9 rounded-full bg-accent text-ink flex items-center justify-center shrink-0">
            {!reduce && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-accent"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.1, repeat: 2, delay: 0.4, ease: 'easeOut' }}
              />
            )}
            <CalendarDays size={18} aria-hidden="true" className="relative" />
          </span>
          <motion.span
            className="text-sm font-semibold whitespace-nowrap"
            initial={reduce ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            Schedule time with me
          </motion.span>
          <span className="sr-only">(opens a booking window)</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
