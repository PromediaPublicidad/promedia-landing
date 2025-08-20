// src/sections/CollageTrabajos.jsx
import React from "react";
import { motion } from "framer-motion";

// Repite o mezcla a tu gusto. Se muestran completas (object-contain)
const ROW1 = [
  "/works/work1.jpg",
  "/works/work2.jpg",
  "/works/work3.jpg",
  "/works/work4.jpg",
  "/works/work5.jpg",
];
const ROW2 = [
  "/works/work6.jpg",
  "/works/work7.jpg",
  "/works/work8.jpg",
  "/works/work9.jpg",
  "/works/work10.jpg",
];
const ROW3 = [
  "/works/work11.jpg",
  "/works/work12.jpg",
  "/works/work13.jpg",
  "/works/work14.jpg",
  "/works/work15.jpg",
];

/** Strip: marquee con Framer (loop infinito), sin mask-image */
function Strip({ items, reverse = false, speed = 40, h = "h-44 md:h-56 xl:h-64" }) {
  const track = [...items, ...items]; // duplicado para loop seamless
  const anim = reverse ? ["-50%", "0%"] : ["0%", "-50%"]; // ida y vuelta lineal

  return (
    <div className="relative overflow-hidden">
      {/* Si quieres fade en bordes, descomenta:
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0f1f25] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0f1f25] to-transparent z-10" />
      */}
      <motion.div
        className="flex w-max"
        animate={{ x: anim }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {track.map((src, i) => (
          <div
            key={i}
            className={`group mx-3 md:mx-4 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm
                        shadow-[0_6px_16px_rgba(0,0,0,0.15)] ${h} aspect-[16/10] overflow-hidden shrink-0`}
          >
            <img
              src={src}
              alt={`Trabajo ${i + 1}`}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function CollageTrabajos() {
  return (
    <section id="trabajos" className="bg-[#0f1f25] overflow-x-clip">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-20 text-[#167c88]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trabajos destacados
        </h2>

        {/* Tira 1 (izq→der) */}
        <Strip items={ROW1} speed={42} h="h-40 md:h-52 xl:h-60" />

        <div className="h-6" />

        {/* Tira 2 (der→izq) un poco más alta */}
        <Strip items={ROW2} reverse speed={45} h="h-48 md:h-64 xl:h-72" />

        <div className="h-6" />

        {/* Tira 3 (izq→der) más compacta */}
        <Strip items={ROW3} speed={50} h="h-36 md:h-48 xl:h-56" />
      </div>
    </section>
  );
}