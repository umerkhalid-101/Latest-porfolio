import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/**
 * The visitor is a collaborator in the file, like the teammates in the hero.
 * The native orange arrow stays the pointer (zero lag); this layer adds a "You" tag,
 * a Figma-style selection frame with a size label on anything clickable,
 * and cursor chat: press / to say something.
 */

const CLICKABLE = 'a, button, [role="button"], [role="radio"], label, summary, select, [data-cursor]';
const PAD = 6;
const EDGE = 6;
const HINT_KEY = 'cursor-chat-hint-seen';

type Target = { el: Element; name: string; w: number; h: number };
type Chat = { mode: 'off' } | { mode: 'typing' } | { mode: 'said'; text: string };
type Reply = { id: number; x: number; y: number; text: string };

function nameFor(el: Element) {
  return el.getAttribute('data-cursor-label') ?? '';
}

function replyTo(text: string) {
  const t = text.toLowerCase();
  if (/hire|hiring|job|role|position|opportunit|work together|interview|recruit/.test(t)) return "Love that. My inbox is open: umerkhalid141@gmail.com";
  if (/\b(hi|hey|hello|yo|salam|salaam|sup)\b/.test(t)) return 'Hey! 👋 Thanks for dropping into the file.';
  if (/nice|love|cool|great|amazing|wow|beautiful|clean|sick|fire|awesome/.test(t)) return 'Thank you! That made my day 🧡';
  if (/\?$/.test(t)) return "Good question. Let's talk, the email's in the footer.";
  return 'Ha, noted 😄 Say hi in the footer anytime.';
}

/** Fine pointers only. Touch screens keep their native behavior. */
function useFinePointer() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => setOn(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return on;
}

function Arrow({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow">
      <path d="M3 2 L3 18 L7.5 13.8 L10.5 20.5 L13.5 19.2 L10.6 12.6 L16.8 12.6 Z" fill={fill} stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function CustomCursor() {
  const enabled = useFinePointer();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState<Target | null>(null);
  const [labelInside, setLabelInside] = useState(false);
  const [chat, setChat] = useState<Chat>({ mode: 'off' });
  const [draft, setDraft] = useState('');
  const [hint, setHint] = useState(false);
  const [reply, setReply] = useState<Reply | null>(null);
  const targetRef = useRef<Element | null>(null);
  const pointer = useRef({ x: -100, y: -100 });
  const chatRef = useRef<Chat>(chat);
  chatRef.current = chat;

  // The tag rides the pointer exactly; the selection frame glides between targets
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const glide = reduce ? { stiffness: 2000, damping: 100 } : { stiffness: 520, damping: 42, mass: 0.6 };
  const fx = useSpring(0, glide);
  const fy = useSpring(0, glide);
  const fw = useSpring(0, glide);
  const fh = useSpring(0, glide);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const retarget = () => {
      const { x: px, y: py } = pointer.current;
      const hit = document.elementFromPoint(px, py)?.closest(CLICKABLE) ?? null;
      if (hit === targetRef.current) return;
      const fresh = !targetRef.current;
      targetRef.current = hit;
      if (!hit) return setTarget(null);
      const r = hit.getBoundingClientRect();
      // A fresh selection appears in place; moving between targets glides
      if (fresh) {
        fx.jump(r.left - PAD);
        fy.jump(r.top - PAD);
        fw.jump(r.width + PAD * 2);
        fh.jump(r.height + PAD * 2);
      }
      setTarget({ el: hit, name: nameFor(hit), w: Math.round(r.width), h: Math.round(r.height) });
    };

    let hinted = false;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      retarget();
      if (!hinted) {
        hinted = true;
        let seen = false;
        try { seen = sessionStorage.getItem(HINT_KEY) === '1'; sessionStorage.setItem(HINT_KEY, '1'); } catch { /* private mode */ }
        if (!seen) {
          setTimeout(() => setHint(true), 1200);
          setTimeout(() => setHint(false), 6200);
        }
      }
    };

    // Keep the frame on its element through scrolls and hover animations, clamped to the screen
    let raf = 0;
    let inside = false;
    const tick = () => {
      const el = targetRef.current;
      if (el && el.isConnected) {
        const r = el.getBoundingClientRect();
        const left = Math.max(EDGE, r.left - PAD);
        const top = Math.max(EDGE, r.top - PAD);
        const right = Math.min(window.innerWidth - EDGE, r.right + PAD);
        const bottom = Math.min(window.innerHeight - EDGE, r.bottom + PAD);
        fx.set(left);
        fy.set(top);
        fw.set(Math.max(0, right - left));
        fh.set(Math.max(0, bottom - top));
        const nowInside = bottom > window.innerHeight - 34;
        if (nowInside !== inside) { inside = nowInside; setLabelInside(nowInside); }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Cursor chat, like Figma: / opens it, Escape closes it
    const key = (e: KeyboardEvent) => {
      const typingElsewhere = (e.target as HTMLElement | null)?.closest?.('input, textarea, select, [contenteditable="true"]');
      if (e.key === '/' && !typingElsewhere && chatRef.current.mode !== 'typing' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setHint(false);
        setDraft('');
        setChat({ mode: 'typing' });
      }
    };

    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', retarget, { passive: true });
    window.addEventListener('keydown', key);
    root.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', retarget);
      window.removeEventListener('keydown', key);
      root.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y, fx, fy, fw, fh]);

  const send = () => {
    const text = draft.trim();
    if (!text) return setChat({ mode: 'off' });
    setChat({ mode: 'said', text });
    const { x: px, y: py } = pointer.current;
    const id = Date.now();
    // Umer's cursor drops in nearby to answer, staying on screen
    setTimeout(() => {
      setReply({
        id,
        x: Math.min(px + 70, window.innerWidth - 300),
        y: Math.min(py + 70, window.innerHeight - 90),
        text: replyTo(text),
      });
    }, 900);
    setTimeout(() => setChat((c) => (c.mode === 'said' ? { mode: 'off' } : c)), 4500);
    setTimeout(() => setReply((r) => (r?.id === id ? null : r)), 6500);
  };

  if (!enabled) return null;

  const layer = 'pointer-events-none fixed left-0 top-0 z-[9999]';
  const sizeLabel = target ? `${target.name ? `${target.name} · ` : ''}${target.w} × ${target.h}` : '';

  return (
    <>
      {/* Selection frame */}
      <AnimatePresence>
        {target && (
          <motion.div
            aria-hidden="true"
            className={layer}
            style={{ x: fx, y: fy, width: fw, height: fh }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <div className="absolute inset-0 border-[1.5px] border-accent shadow-[0_0_0_1px_rgba(255,255,255,0.7)]" />
            {['-left-[4px] -top-[4px]', '-right-[4px] -top-[4px]', '-left-[4px] -bottom-[4px]', '-right-[4px] -bottom-[4px]'].map((pos) => (
              <span key={pos} className={`absolute h-2 w-2 border-[1.5px] border-accent bg-white ${pos}`} />
            ))}
            <span
              className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-accent px-1.5 py-[3px] font-sans text-[11px] font-medium leading-none tabular-nums text-white ${labelInside ? 'bottom-2' : '-bottom-[26px]'}`}
            >
              {sizeLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Your tag, or your chat bubble */}
      <motion.div className={layer} style={{ x, y, opacity: visible || chat.mode === 'typing' ? 1 : 0 }}>
        <div className="absolute left-[13px] top-[18px]">
          {chat.mode === 'typing' ? (
            <form
              className="pointer-events-auto"
              onSubmit={(e) => { e.preventDefault(); send(); }}
            >
              <input
                autoFocus
                value={draft}
                maxLength={60}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setChat({ mode: 'off' }); }}
                onBlur={() => { if (!draft.trim()) setChat({ mode: 'off' }); }}
                placeholder="Say something"
                aria-label="Cursor chat message, press Enter to send"
                size={Math.max(12, draft.length + 1)}
                className="rounded-[14px] rounded-tl-sm bg-accent px-3 py-2 font-sans text-[14px] text-white placeholder:text-white/75 outline-none ring-1 ring-white/70 shadow-lg"
              />
            </form>
          ) : (
            <motion.div
              layout
              aria-hidden={chat.mode !== 'said'}
              className="w-max max-w-[260px] rounded-[14px] rounded-tl-sm bg-accent px-2.5 py-1 text-white ring-1 ring-white/70 shadow-md"
              transition={{ type: 'spring', stiffness: 500, damping: 36 }}
            >
              {chat.mode === 'said' ? (
                <span className="block py-1 font-sans text-[14px] leading-snug" role="status">{chat.text}</span>
              ) : (
                <span className="t-label whitespace-nowrap">
                  You
                  <AnimatePresence>
                    {hint && (
                      <motion.span
                        className="inline-block overflow-hidden align-bottom font-medium normal-case tracking-normal"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                      >
                        &nbsp;· Press / to chat
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Umer's reply */}
      <AnimatePresence>
        {reply && <ReplyCursor key={reply.id} reply={reply} />}
      </AnimatePresence>
    </>
  );
}

function ReplyCursor({ reply }: { reply: Reply }) {
  return (
    <motion.div
      role="status"
      className="pointer-events-none fixed left-0 top-0 z-[9998]"
      initial={{ x: reply.x + 160, y: reply.y + 80, opacity: 0 }}
      animate={{ x: reply.x, y: reply.y, opacity: 1 }}
      exit={{ x: reply.x + 120, y: reply.y + 60, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 20 }}
    >
      <Arrow fill="var(--color-ink)" stroke="var(--color-white)" />
      <div className="absolute left-4 top-5 w-max max-w-[260px] rounded-[14px] rounded-tl-sm bg-ink px-2.5 py-1.5 text-white shadow-lg ring-1 ring-white/30">
        <span className="t-label block text-muted-dark">Umer</span>
        <span className="block font-sans text-[14px] leading-snug">{reply.text}</span>
      </div>
    </motion.div>
  );
}
