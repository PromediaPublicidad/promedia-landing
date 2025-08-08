import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id = "hero"  className="relative h-screen w-full overflow-hidden bg-black text-white">

      {/* Video de fondo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/src/assets/hero-video.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Contenedor de texto + animación */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6 mt-16">

        {/* Contenedor alineado del título y fondo */}
        <div className="relative inline-block">
          {/* Rectángulo animado detrás del texto */}
          <motion.div
            className="absolute bg-[#167c88] h-full w-full rounded-md opacity-70"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ zIndex: 10 }}
          />

          {/* Texto principal */}
          <motion.h1
            className="relative text-4xl md:text-6xl font-bold tracking-tight text-white z-20 px-4 py-2"
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
          className="text-lg md:text-xl max-w-2xl text-white/90 z-30 relative mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Diseño, producción, impresión y estrategia visual que hace que tu marca hable por sí sola.
        </motion.p>
      </div>
    </section>
  );
}