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
    <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-10 mb-10 lg:mb-12 ${className}`}>
      <div>
        <div className="flex items-center gap-3 mb-4 md:mb-5">
          <span className={`w-2.5 h-2.5 rounded-full ${dark ? 'bg-white' : 'bg-ink'}`} aria-hidden="true" />
          <span className="t-label">{label}</span>
        </div>
        <h2 className="t-display-l">
          <RevealText text={title} />
          {muted && (
            <>
              <br />
              <RevealText text={muted} className={dark ? 'text-muted-dark' : 'text-muted'} delay={0.12} />
            </>
          )}
        </h2>
      </div>
      {note && (
        <div className={`t-body max-w-[360px] lg:pb-2 ${dark ? 'text-muted-dark' : 'text-muted'}`}>{note}</div>
      )}
    </div>
  );
}
