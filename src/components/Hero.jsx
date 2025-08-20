import { motion } from 'framer-motion';

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
          <source src="/hero-video.mp4" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      </div>

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Contenido centrado y limitado */}
      <div className="relative z-30 mx-auto max-w-7xl w-full px-6 sm:px-8 lg:px-10 min-h-[inherit] flex flex-col items-center justify-center text-center">
        {/* 🔽 Baja el bloque ~3.5 cm */}
        <div style={{ marginTop: '3.5cm' }}>
          {/* Wrapper del título con clip para la animación */}
          <div className="relative inline-block overflow-hidden rounded-md">
            {/* Rectángulo animado detrás del texto */}
            <motion.div
              className="absolute inset-0 bg-[#167c88] opacity-70"
              initial={{ x: '101%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            {/* Texto principal */}
            <motion.h1
              className="relative z-10 px-4 py-2 text-4xl md:text-6xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              ¡POTENCIA TU PRESENCIA!
            </motion.h1>
          </div>

          {/* Subtítulo */}
          <motion.p
            className="relative z-10 mt-6 text-lg md:text-xl max-w-2xl text-white/90 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Diseño, producción, impresión y estrategia visual que hace que tu marca hable por sí sola.
          </motion.p>

          {/* Botón WhatsApp */}
          <motion.a
            href="https://wa.me/50768940670?text=Hola%20quiero%20saber%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Promedia"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 mt-8 inline-block bg-[#167c88] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-[#125f66] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Quiero saber más información
          </motion.a>
        </div>
      </div>

      {/* Máscara suave opcional */}
      <div className="pointer-events-none absolute inset-0 z-20 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_85%)]" />
    </section>
  );
}