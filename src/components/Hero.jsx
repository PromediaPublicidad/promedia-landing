// src/components/Hero.jsx
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black text-white overflow-x-clip"
    >
      {/* Wrapper del video con escala SOLO en móvil */}
      <div className="absolute inset-0 origin-center transform scale-[1.06] sm:scale-100 will-change-transform">
        <video
          className="w-full h-full object-cover opacity-70 object-[50%_35%] md:object-center"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Hero-Video.webm" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      </div>

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Contenido */}
      <div className="relative z-30 mx-auto max-w-7xl w-full px-6 sm:px-8 lg:px-10 min-h-[inherit] flex flex-col items-center justify-center text-center">
        <div className="hero-offset">
          <div className="relative inline-block overflow-hidden rounded-md">
            <motion.div
              className="absolute inset-0 bg-[#167c88] opacity-70"
              initial={{ x: "101%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <motion.h1
              className="
                relative z-10 px-5 py-3
                font-heading font-extrabold uppercase
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                tracking-tight leading-[1.05]
                drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]
              "
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              ¡POTENCIA TU PRESENCIA!
            </motion.h1>
          </div>

          <motion.p
            className="
              relative z-10 mt-6
              font-body font-normal
              text-[17px] sm:text-lg md:text-xl
              leading-relaxed md:leading-[1.7]
              max-w-2xl text-white/90 mx-auto
              drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]
            "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Diseño, producción, impresión y estrategia visual que hace que tu marca hable por sí sola.
          </motion.p>

          <motion.a
            href="https://wa.me/50768940670?text=Hola%20quiero%20saber%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Promedia"
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative z-10 mt-8 inline-block
              bg-[#167c88] text-white
              px-7 py-3.5 rounded-full
              font-body font-semibold text-base sm:text-lg
              shadow-lg hover:bg-[#125f66]
              transition-colors
            "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Quiero saber más información
          </motion.a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_85%)]" />
    </section>
  );
}