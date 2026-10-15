import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-1 pb-10 px-6 md:px-20 overflow-hidden">
      {/* Multi-line Border Top */}
      <div className="flex flex-col gap-[2px] mb-20 md:mb-24 -mx-6 md:-mx-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[1px] w-full bg-white opacity-100" />
        ))}
      </div>

      <div className="max-w-screen-2xl mx-auto">
        {/* Top Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm tracking-widest uppercase">CONTACT</h3>
            <div className="space-y-2 text-sm opacity-80 font-medium">
              <p>Dubai, UAE</p>
              <p>
                <a href="mailto:umerkhalid141@gmail.com" className="hover:underline underline-offset-4">
                  umerkhalid141@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+971521345139" className="hover:underline underline-offset-4">
                  +971 52 134 5139
                </a>
              </p>
            </div>
          </div>

          {/* Socials */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm tracking-widest uppercase">FOLLOW</h3>
            <ul className="space-y-3 text-sm opacity-80 font-medium uppercase">
              <li><a href="https://www.linkedin.com/in/umar-khalid1/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/umar_khalid1" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Instagram</a></li>
            </ul>
          </div>

          {/* Pages 1 */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm tracking-widest uppercase">SECTIONS</h3>
            <ul className="space-y-3 text-sm opacity-80 font-medium">
              <li><a href="/" className="hover:opacity-100 transition-opacity">HOME</a></li>
              <li><a href="#about" className="hover:opacity-100 transition-opacity">ABOUT</a></li>
              <li><a href="#how-i-lead" className="hover:opacity-100 transition-opacity">HOW I LEAD</a></li>
              <li><a href="#work" className="hover:opacity-100 transition-opacity">WORK</a></li>
              <li><a href="#what-i-do" className="hover:opacity-100 transition-opacity">WHAT I DO</a></li>
              <li><a href="#process" className="hover:opacity-100 transition-opacity">PROCESS</a></li>
            </ul>
          </div>

        </div>

        {/* Massive Name Display */}
        <div className="relative pointer-events-none select-none py-10">
          <p aria-hidden="true" className="font-display text-[25vw] md:text-[400px] leading-[0.75] tracking-tighter uppercase flex items-baseline">
            <span className="bg-gradient-to-b from-white via-white/50 to-transparent bg-clip-text text-transparent opacity-80">
              UMER
            </span>
          </p>
        </div>

        {/* Copyright */}
        <div className="flex justify-end pt-10 border-t border-white/5">
          <p className="text-[10px] md:text-xs tracking-widest text-white/60 uppercase">
            © 2026 UMER. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
