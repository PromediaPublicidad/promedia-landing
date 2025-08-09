import { motion } from 'framer-motion';

export default function Nosotros() {
  return (
    <section
      id="nosotros"
      className="bg-[#0f1f25] py-24 px-6 md:px-24 flex flex-col md:flex-row items-center justify-between gap-12"
    >
      {/* Texto a la izquierda */}
      <motion.div
        className="md:w-1/2 mb-10 md:mb-0"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-[#167c88] mb-6">¿Quiénes somos?</h2>
        <p
          className="text-lg text-white leading-relaxed text-justify"
          style={{ fontFamily: 'Avenir Light, sans-serif' }}
        >
          En <strong>Promedia</strong> combinamos creatividad, diseño y producción para
          impulsar marcas con soluciones visuales de alto impacto. Desde el concepto hasta
          la ejecución, somos tu aliado estratégico en publicidad y comunicación visual.
        </p>
      </motion.div>

      {/* Imagen a la derecha */}
      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Aquí quitamos /public */}
        <img
          src="/nosotros.jpg"
          alt="Imagen institucional"
          className="w-full max-w-md mx-auto"
        />
      </motion.div>
    </section>
  );
}