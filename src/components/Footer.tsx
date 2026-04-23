import { motion } from 'framer-motion';

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-bold text-sm tracking-widest uppercase">CONTACT</h4>
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
            <h4 className="font-bold text-sm tracking-widest uppercase">FOLLOW</h4>
            <ul className="space-y-3 text-sm opacity-60 font-medium uppercase">
              <li><a href="https://www.linkedin.com/in/umar-khalid1/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/umar_khalid1" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Instagram</a></li>
            </ul>
          </div>

          {/* Pages 1 */}
          <div className="space-y-6">
            <h4 className="font-bold text-sm tracking-widest uppercase">SECTION</h4>
            <ul className="space-y-3 text-sm opacity-60 font-medium">
              <li><a href="#" className="hover:opacity-100 transition-opacity">HOME</a></li>
              <li><a href="#about" className="hover:opacity-100 transition-opacity">ABOUT</a></li>
              <li><a href="#services" className="hover:opacity-100 transition-opacity">SERVICES</a></li>
              <li><a href="#work" className="hover:opacity-100 transition-opacity">WORK</a></li>
            </ul>
          </div>

          {/* Pages 2 */}
          <div className="space-y-6">
            <h4 className="font-bold text-sm tracking-widest uppercase">RESOURCES</h4>
            <ul className="space-y-3 text-sm opacity-60 font-medium">
              <li><a href="#process" className="hover:opacity-100 transition-opacity">PROCESS</a></li>
              <li><a href="#testimonials" className="hover:opacity-100 transition-opacity">TESTIMONIALS</a></li>
            </ul>
          </div>
        </div>

        {/* Massive Name Display */}
        <div className="relative pointer-events-none select-none py-10">
          <h2 className="font-display text-[25vw] md:text-[400px] leading-[0.75] tracking-tighter uppercase flex items-baseline">
            <span className="bg-gradient-to-b from-white via-white/50 to-transparent bg-clip-text text-transparent opacity-80">
              UMER
            </span>
          </h2>
        </div>

        {/* Copyright */}
        <div className="flex justify-end pt-10 border-t border-white/5">
          <p className="text-[10px] md:text-xs tracking-widest text-white/40 uppercase">
            © 2026 Umert. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
