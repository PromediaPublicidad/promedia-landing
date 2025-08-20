// Nosotros.jsx
import { motion } from 'framer-motion';

export default function Nosotros() {
  return (
    <section id="nosotros" className="relative bg-[#0f1f25] overflow-x-clip">
      {/* Contenedor centrado */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-24">
        <div className="grid md:grid-cols-12 items-center gap-10 md:gap-12">
          
          {/* Texto */}
          <motion.div
            className="md:col-span-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-[#167c88] mb-6 text-center md:text-left">
              ¿Quiénes somos?
            </h2>
            <p
              className="text-lg text-white leading-relaxed text-justify md:text-left"
              style={{ fontFamily: 'Avenir Light, sans-serif' }}
            >
              En <strong>Promedia</strong> combinamos creatividad, diseño y producción para
              impulsar marcas con soluciones visuales de alto impacto. Desde el concepto hasta
              la ejecución, somos tu aliado estratégico en publicidad y comunicación visual.
            </p>
          </motion.div>

          {/* Imagen */}
          <motion.div
            className="md:col-span-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative w-full max-w-xl mx-auto rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <img
                src="/nosotros.jpg" /* sin /public */
                alt="Imagen institucional"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}