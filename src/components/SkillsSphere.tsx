import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

const skills = [
  { label: "Design Leadership", color: "#FF6B35", text: "#000" },
  { label: "Team Mentoring", color: "#DFFF2B", text: "#000" },
  { label: "Design Critique", color: "#FFFFFF", text: "#000" },
  { label: "Hiring", color: "#E94336", text: "#fff" },
  { label: "Roadmap Planning", color: "#4338CA", text: "#fff" },
  { label: "Design Ops", color: "#E5E1DA", text: "#000" },
  { label: "Stakeholder Management", color: "#137A63", text: "#fff" },
  { label: "Design Systems", color: "#FF6B35", text: "#000" },
  { label: "UX Research", color: "#DFFF2B", text: "#000" },
  { label: "Product Discovery", color: "#FFFFFF", text: "#000" },
  { label: "Information Architecture", color: "#5D22B1", text: "#fff" },
  { label: "Interaction Design", color: "#E94336", text: "#fff" },
  { label: "Usability Testing", color: "#E5E1DA", text: "#000" },
  { label: "Prototyping", color: "#009BB8", text: "#000" },
  { label: "A/B Testing", color: "#FF6B35", text: "#000" },
  { label: "Figma", color: "#FFFFFF", text: "#000" },
  { label: "React", color: "#DFFF2B", text: "#000" },
  { label: "AI Workflows", color: "#D91B87", text: "#fff" },
];

// Evenly spread points over a unit sphere
const points = skills.map((_, i) => {
  const n = skills.length;
  const y = 1 - (i / (n - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const theta = Math.PI * (3 - Math.sqrt(5)) * i;
  return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
});

export function SkillsSphere() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (reduce) return;
    const stage = stageRef.current;
    if (!stage) return;

    let radius = 300;
    let rotX = 0, rotY = 0;
    let velX = 0.0012, velY = 0.004; // idle spin
    let targetX = velX, targetY = velY;
    let dragging = false, lastX = 0, lastY = 0;
    let paused = false, visible = true, raf = 0;

    const resize = () => {
      const r = stage.getBoundingClientRect();
      radius = Math.min(r.width * 0.46, r.height * 0.45);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); });
    io.observe(stage);

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      if (dragging) {
        targetY = (e.clientX - lastX) * 0.0006;
        targetX = -(e.clientY - lastY) * 0.0006;
        lastX = e.clientX; lastY = e.clientY;
        return;
      }
      if (e.pointerType !== 'mouse') return;
      // Steer the spin toward the cursor
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      targetY = Math.max(-1, Math.min(1, dx)) * 0.012;
      targetX = -Math.max(-1, Math.min(1, dy)) * 0.012;
    };
    const onDown = (e: PointerEvent) => { dragging = true; lastX = e.clientX; lastY = e.clientY; stage.setPointerCapture(e.pointerId); };
    const onUp = () => { dragging = false; targetX = 0.0012; targetY = 0.004; };
    const onLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') { targetX = 0.0012; targetY = 0.004; } };
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);
    stage.addEventListener('pointerleave', onLeave);
    const pause = (e: Event) => { paused = e.type === 'pointerover' && (e.target as Element).closest('li') !== null; };
    stage.addEventListener('pointerover', pause);
    stage.addEventListener('pointerout', pause);

    function loop() {
      cancelAnimationFrame(raf);
      if (!visible) return;
      velX += (targetX - velX) * 0.05;
      velY += (targetY - velY) * 0.05;
      if (!paused) { rotX += velX; rotY += velY; }
      const cx = Math.cos(rotX), sx = Math.sin(rotX), cy = Math.cos(rotY), sy = Math.sin(rotY);
      points.forEach((p, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        // Rotate around Y, then X
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back, 1 front
        const scale = 0.55 + depth * 0.65;
        el.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${scale})`;
        el.style.opacity = String(0.25 + depth * 0.75);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = depth < 0.35 ? `blur(${(0.35 - depth) * 6}px)` : 'none';
      });
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onUp);
      stage.removeEventListener('pointerleave', onLeave);
      stage.removeEventListener('pointerover', pause);
      stage.removeEventListener('pointerout', pause);
    };
  }, [reduce]);

  return (
    <section className="relative w-full bg-black text-white overflow-hidden py-20 md:py-28">
      {/* Glow */}
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[900px] aspect-square rounded-full bg-[#FF6B35]/20 blur-[120px] pointer-events-none" />

      <div className="relative z-0 text-center px-6 mb-4 md:mb-0 md:absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center pointer-events-none">
        <h2 className="font-display uppercase tracking-tighter leading-[0.85] text-[18vw] md:text-[200px]">
          Skills <span className="block text-[#FF6B35]">I know</span>
        </h2>
        <p className="hidden md:block mt-6 text-[12px] font-semibold uppercase tracking-[0.3em] text-white/70">Move your cursor to spin</p>
      </div>

      {reduce ? (
        <ul className="relative flex flex-wrap justify-center gap-3 max-w-[900px] mx-auto px-6">
          {skills.map((s) => (
            <li key={s.label} className="px-5 py-3 rounded-full text-[14px] font-bold uppercase tracking-tight" style={{ background: s.color, color: s.text }}>{s.label}</li>
          ))}
        </ul>
      ) : (
        <motion.div
          ref={stageRef}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto w-full max-w-[1200px] h-[90vw] max-h-[820px] md:h-[88vh] touch-pan-y cursor-grab active:cursor-grabbing select-none"
          data-cursor="hover"
        >
          <ul aria-label="Skills">
            {skills.map((s, i) => (
              <li
                key={s.label}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="absolute left-1/2 top-1/2 whitespace-nowrap px-4 py-2 md:px-6 md:py-3 rounded-full text-[11px] md:text-[17px] font-bold uppercase tracking-tight shadow-[0_10px_30px_rgba(0,0,0,0.4)] will-change-transform transition-[box-shadow] hover:ring-4 hover:ring-white/60"
                style={{ background: s.color, color: s.text }}
              >
                {s.label}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </section>
  );
}
