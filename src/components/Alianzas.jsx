import React from "react";
import { motion } from "framer-motion";

const logos = [
  "/alliances/Paul.png",
  "/alliances/HM.png",
  "/alliances/Parfois.png",
  "/alliances/CH.png",
  "/alliances/Aldo.png",
  "/alliances/Purificacion.png",
  "/alliances/Valentino.png",
  "/alliances/Decathlon.png",
  "/alliances/Honda.png",
  "/alliances/Aliss.png",
  "/alliances/Hooters.png",
  "/alliances/Kids.png",
  "/alliances/Kors.png",
  "/alliances/Bijoux.png",
  "/alliances/Pacific.png",
  "/alliances/Azahar.png",
  "/alliances/Flow.png",
  "/alliances/Fendi.png",
  "/alliances/Tods.png",
  "/alliances/Kate.png",
  "/alliances/Helly.png",
  "/alliances/Ramada.png",
  "/alliances/Coach.png",
  "/alliances/Rocky.png",
  "/alliances/Dip.png",
];

function Row({ items, reverse = false, speed = 22 }) {
  const track = [...items, ...items]; // loop infinito
  return (
    <div
      className={`marquee group ${reverse ? "marquee--reverse" : ""}`}
      style={{ "--speed": `${speed}s` }}
    >
      <div className="marquee__track">
        {track.map((src, i) => (
          <div key={i} className="mx-10 flex items-center">
            <img
              src={src}
              alt={`Alianza ${i + 1}`}
              className="h-14 md:h-16 xl:h-20 object-contain opacity-90
                         drop-shadow-[0_0_6px_rgba(0,0,0,0.25)]
                         transition duration-300 group-hover:opacity-100"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Alianzas() {
  return (
    <motion.section
      id="alianzas"
      className="py-20 px-6 md:px-12 text-white"
      initial={{ backgroundColor: "#0f5e67" }}     // tono cercano para el fade
      whileInView={{ backgroundColor: "#167c88" }} // tu color
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.4 }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Nuestras alianzas
        </h2>

        <Row items={logos} speed={10} />
        <div className="h-8 md:h-10" />
        <Row items={logos} reverse speed={12} />
      </div>
    </motion.section>
  );
}