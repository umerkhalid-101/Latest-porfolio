import { AnimatePresence, motion, useMotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/**
 * The visitor is a collaborator in the file, like the teammates in the hero.
 * The native orange arrow stays the pointer (zero lag); this layer adds a "You" tag
 * and cursor chat: press / to say something.
 */

const HINT_KEY = 'cursor-chat-hint-seen';

type Chat = { mode: 'off' } | { mode: 'typing' } | { mode: 'said'; text: string };
type Reply = { id: number; x: number; y: number; text: string };

const CALL_LINK = `mailto:umerkhalid141@gmail.com?subject=${encodeURIComponent("Let's set up a call")}`;
const REPLY_MS = 9000;

/** A short, personal opener. Every reply then ends with the same call to action. */
function replyTo(text: string) {
  const t = text.toLowerCase();
  if (/hire|hiring|job|role|position|opportunit|work together|interview|recruit/.test(t)) return "Love that, I'm open to Lead and Manager roles.";
  if (/\b(hi|hey|hello|yo|salam|salaam|sup)\b/.test(t)) return 'Hey! 👋 Thanks for dropping by the website.';
  if (/nice|love|cool|great|amazing|wow|beautiful|clean|sick|fire|awesome/.test(t)) return 'Thank you! That made my day 🧡';
  if (/\?$/.test(t)) return 'Good question, happy to walk you through it.';
  return 'Got it, thanks for the message 😄';
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
  const [visible, setVisible] = useState(false);
  const [chat, setChat] = useState<Chat>({ mode: 'off' });
  const [draft, setDraft] = useState('');
  const [hint, setHint] = useState(false);
  const [reply, setReply] = useState<Reply | null>(null);
  const pointer = useRef({ x: -100, y: -100 });
  const replyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const chatRef = useRef<Chat>(chat);
  chatRef.current = chat;

  // The tag rides the pointer exactly
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    let hinted = false;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
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

    // Hide the tag whenever the pointer is no longer on the page, so it never gets stranded:
    // leaving the window (pointerleave alone misses fast exits), switching apps, or hiding the tab
    const leave = () => setVisible(false);
    const out = (e: PointerEvent) => { if (!e.relatedTarget) leave(); };
    const hidden = () => { if (document.hidden) leave(); };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('keydown', key);
    root.addEventListener('pointerleave', leave);
    document.addEventListener('pointerout', out);
    window.addEventListener('blur', leave);
    document.addEventListener('visibilitychange', hidden);
    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('keydown', key);
      root.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerout', out);
      window.removeEventListener('blur', leave);
      document.removeEventListener('visibilitychange', hidden);
    };
  }, [enabled, x, y]);

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
        y: Math.min(py + 70, window.innerHeight - 130),
        text: replyTo(text),
      });
    }, 900);
    setTimeout(() => setChat((c) => (c.mode === 'said' ? { mode: 'off' } : c)), 4500);
    clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => setReply((r) => (r?.id === id ? null : r)), REPLY_MS);
  };

  if (!enabled) return null;

  const layer = 'pointer-events-none fixed left-0 top-0 z-[9999]';

  return (
    <>
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
        {reply && (
          <ReplyCursor
            key={reply.id}
            reply={reply}
            // Hovering the reply keeps it open, so there's time to click the email link
            onHold={() => clearTimeout(replyTimer.current)}
            onRelease={() => {
              clearTimeout(replyTimer.current);
              replyTimer.current = setTimeout(() => setReply(null), 3000);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ReplyCursor({ reply, onHold, onRelease }: { reply: Reply; onHold: () => void; onRelease: () => void }) {
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
      <div
        className="pointer-events-auto absolute left-4 top-5 w-max max-w-[280px] rounded-[14px] rounded-tl-sm bg-ink px-3 py-2 text-white shadow-lg ring-1 ring-white/30"
        onPointerEnter={onHold}
        onPointerLeave={onRelease}
      >
        <span className="t-label block text-muted-dark">Umer</span>
        <span className="block font-sans text-[14px] leading-snug">{reply.text}</span>
        <a
          href={CALL_LINK}
          data-cursor-label="Email"
          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 font-sans text-[13px] font-medium text-ink hover:bg-white motion-safe:transition-colors"
        >
          Email me and let's set up a call
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </motion.div>
  );
}
