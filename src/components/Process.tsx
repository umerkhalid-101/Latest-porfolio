import { motion } from 'motion/react';

const steps = [
  { id: '01', title: 'DISCOVER' },
  { id: '02', title: 'ARCHITECT' },
  { id: '03', title: 'DESIGN' },
  { id: '04', title: 'SHIP & LEARN' }
];

export function Process() {
  return (
    <section id="process" className="px-4 py-20 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto bg-[#FAFAFA] border border-black/5 rounded-[40px] md:rounded-[60px] py-20 md:py-32 px-6 md:px-20 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-[80px] uppercase tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-[1] text-black"
        >
          ASSESS, DEPLOY, <br className="hidden md:block" /> AND OPERATE
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#6F6F6F] text-base md:text-xl mb-16 md:mb-24 max-w-xl mx-auto font-medium"
        >
          We’re with you all the way from the pilot to beyond.
        </motion.p>

        {/* Process Visual */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connector Line */}
          <div className="absolute top-[11.5px] left-[12.5%] right-[12.5%] h-px border-t-[1.5px] border-dashed border-black/10 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                {/* Pentagon Icon */}
                <div className="relative mb-12 z-10 hidden md:block">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                    <path d="M12 2L21 8.5L17.5 19H6.5L3 8.5L12 2Z" />
                  </svg>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                  }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: idx * 0.15,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="bg-white hover:bg-black rounded-[30px] md:rounded-[40px] p-8 md:p-14 w-full aspect-[4/3] md:aspect-auto md:h-[260px] flex flex-col items-center justify-center shadow-sm transition-all duration-300 cursor-default group"
                >
                  <span className="text-[10px] md:text-[13px] font-semibold tracking-[0.2em] text-[#888888] group-hover:text-white/40 mb-3 md:mb-5 block uppercase transition-colors">
                    STEP {step.id}
                  </span>
                  <h3 className="font-display text-xl md:text-[34px] uppercase tracking-tight text-black group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
