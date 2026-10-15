import Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Start smooth scrolling unless the visitor prefers reduced motion. */
export function startSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: { offset: -80 } });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

/** Jump to a position without easing, keeping Lenis in sync. */
export function scrollToImmediate(target: number | HTMLElement) {
  if (lenis) {
    lenis.resize(); // the page height may have just changed (route swap)
    lenis.scrollTo(target, { immediate: true, force: true });
  }
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'instant' });
  else target.scrollIntoView();
}

/** Wait for an element to mount (e.g. after a route transition), then jump to it. */
export function scrollToIdWhenReady(id: string, timeout = 3000) {
  const start = performance.now();
  const tick = () => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().height > 0) {
      requestAnimationFrame(() => scrollToImmediate(el));
    } else if (performance.now() - start < timeout) {
      setTimeout(tick, 50);
    }
  };
  tick();
}

/** Glide to a position (used by in-page controls like the timeline scrubber). */
export function scrollToSmooth(top: number) {
  if (lenis) lenis.scrollTo(top, { duration: 1.2 });
  else window.scrollTo({ top, behavior: 'smooth' });
}
