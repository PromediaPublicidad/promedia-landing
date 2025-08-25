// src/sections/Alianzas.jsx
import React from "react";
import { motion } from "framer-motion";

const logos = [
  "/alliances/Paul.png",
  "/alliances/HM.png",
  "/alliances/Parfois.png",
  "/alliances/CH.png",
  "/alliances/Aldo.png",
  "/alliances/Purificacion.png",
  "/alliances/Alma.png",
  "/alliances/Bruttito.png",
  "/alliances/Valentino.png",
  "/alliances/Decathlon.png",
  "/alliances/Aliss.png",
  "/alliances/Kids.png",
  "/alliances/Kors.png",
  "/alliances/Pacific.png",
  "/alliances/Azahar.png",
  "/alliances/Fendi.png",
  "/alliances/Tods.png",
  "/alliances/Kate.png",
  "/alliances/Megapolis.png",
  "/alliances/Fantastic.png",
  "/alliances/Bruttito.png",
  "/alliances/Panama.png",
  "/alliances/Furia.png",
  "/alliances/Texas.png",
  "/alliances/Helly.png",
  "/alliances/AlBasha.png",
  "/alliances/Ramada.png",
  "/alliances/Rocky.png",
];

/** Row: marquee sin mask-image (evita glitches a 90% de zoom) */
function Row({ items, reverse = false, speed = 30 }) {
  const track = [...items, ...items]; // duplicado para loop seamless
  const anim = reverse ? ["-50%", "0%"] : ["0%", "-50%"];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{ x: anim }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {track.map((src, i) => (
          <div key={i} className="mx-8 md:mx-10 flex items-center shrink-0">
            <img
              src={src}
              alt={`Alianza ${i + 1}`}
              /* Alto fijo 2 cm; ancho proporcional */
              style={{ height: "2cm", width: "auto" }}
              className="block object-contain opacity-90 drop-shadow-[0_0_6px_rgba(0,0,0,0.25)] transition duration-300 hover:opacity-100"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Alianzas() {
  return (
    <motion.section
      id="alianzas"
      className="relative overflow-x-clip"
      initial={{ backgroundColor: "#0f5e67" }}
      whileInView={{ backgroundColor: "#167c88" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.4 }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-20 text-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Nuestras alianzas
        </h2>

        <Row items={logos} speed={28} />
        <div className="h-8 md:h-10" />
        <Row items={logos} reverse speed={36} />
      </div>
    </motion.section>
  );
}