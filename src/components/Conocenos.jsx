import { motion } from 'framer-motion';

export default function Conocenos() {
  return (
    <section id="conocenos" className="py-16 bg-white text-[#167c88]">
      <div className="max-w-6xl mx-auto px-6">
       {/* Título centrado con sweep RTL que ajusta EXACTO al ancho */}
<div className="mb-8 text-center">
  <span className="relative inline-block w-fit align-middle">
    {/* Rectángulo detrás (derecha → izquierda) */}
    <motion.span
      initial={{ width: 0 }}
      whileInView={{ width: '100%' }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="absolute top-1/2 right-0 -translate-y-1/2 h-[3.2em] rounded-md bg-[#167c88] z-10 origin-right"
      aria-hidden
    />
    {/* Texto (inline-block para que el rect copie su ancho exacto) */}
    <motion.h2
      initial={{ color: '#167c88' }}
      whileInView={{ color: '#ffffff' }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ delay: 0.35, duration: 0.3 }}
      className="relative z-20 inline-block px-3 py-1 text-3xl md:text-4xl font-bold"
    >
      Conócenos un poco más
    </motion.h2>
  </span>
</div>


        {/* Contenido justificado */}
        <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto text-justify">
          En Promedia llevamos años desarrollando soluciones visuales efectivas para marcas que buscan destacar.
          Desde la creatividad gráfica hasta la ejecución técnica, nuestro enfoque es ofrecer un servicio completo,
          rápido y con calidad garantizada.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-justify">
          Nuestro equipo está conformado por diseñadores, productores, técnicos y estrategas con experiencia en
          publicidad, impresión y marketing digital. Nos apasiona lo que hacemos, y eso se refleja en cada proyecto
          que entregamos.
        </p>
      </div>
    </section>
  );
}