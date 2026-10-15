import type { ReactNode } from 'react';
import { RevealText } from './RevealText';

/**
 * The one section header used across the homepage:
 * dot + label, a two-tone Anton headline at a single size, and an optional note on the right.
 */
export function SectionHeader({
  label,
  title,
  muted,
  note,
  dark = false,
  className = '',
}: {
  label: string;
  title: string;
  muted?: string;
  note?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-10 mb-10 lg:mb-[clamp(24px,4.5vh,48px)] ${className}`}>
      <div>
        <div className="flex items-center gap-3 mb-4 md:mb-5">
          <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-brand" aria-hidden="true" />
          <span className="text-base md:text-xl font-medium tracking-tight">{label}</span>
        </div>
        <h2 className="font-display text-[11vw] md:text-[60px] lg:text-[clamp(44px,6.6vh,68px)] leading-[0.95] uppercase tracking-tighter">
          <RevealText text={title} />
          {muted && (
            <>
              <br />
              <RevealText text={muted} className={dark ? 'text-white/45' : 'text-[#6F6F6F]'} delay={0.12} />
            </>
          )}
        </h2>
      </div>
      {note && (
        <div className={`text-[15px] md:text-[16px] leading-[1.6] max-w-[360px] lg:pb-2 ${dark ? 'text-white/65' : 'text-[#555555]'}`}>{note}</div>
      )}
    </div>
  );
}
