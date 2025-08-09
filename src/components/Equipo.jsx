import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';
import TitleSweep from '../components/TitleSweep';

const team = [...Array(10)].map((_, i) => ({
  name: `Nombre ${i + 1}`,
  role: `Cargo ${i + 1}`,
  img: `/team/team${i + 1}.png`,
}));

export default function Equipo() {
  const scrollerRef = useRef(null);     // ← el viewport que scrollea
  const [paused, setPaused] = useState(false);
  const speed = 0.6; // ajusta la velocidad

  // Loop infinito: al llegar a la mitad del contenido, “teletransporta” atrás
  useAnimationFrame(() => {
    const el = scrollerRef.current;
    if (!el || paused) return;
    el.scrollLeft += speed;
    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
  });

  const items = [...team, ...team]; // duplicado para loop seamless

  return (
    <section id="equipo" className="py-24 px-6 md:px-24 bg-white">
      <h2 className="text-4xl font-bold text-center mb-16">
        <TitleSweep
          color="#167c88"
          dir="rtl"
          duration={1.0}
          textFrom="#167c88"
          textTo="#ffffff"
        >
          Nuestro equipo
        </TitleSweep>
      </h2>

      {/* Wrapper con márgenes simétricos + mask fade en lados */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)',
        }}
      >
        {/* Viewport scrollable (ocupa 100%) */}
        <div
          ref={scrollerRef}
          className="w-full overflow-x-scroll scrollbar-hide"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Track más ancho que el viewport */}
          <div className="flex gap-8 w-max px-8">
            {items.map((member, i) => (
              <motion.div
                key={`${member.name}-${i}`}
                className="min-w-[240px] flex-shrink-0 relative"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-[300px] object-contain"
                />
                <div className="absolute bottom-0 w-full bg-black/60 text-white p-4">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}