// src/sections/Conocenos.jsx
import { motion } from 'framer-motion';

export default function Conocenos() {
  return (
    <section id="conocenos" className="relative bg-white overflow-x-clip">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-20 text-[#167c88]">
        {/* Título centrado con sweep RTL que ajusta EXACTO al ancho */}
        <div className="mb-10 text-center">
          <span className="relative inline-block align-middle">
            {/* Rectángulo detrás (derecha → izquierda) */}
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-y-0 right-0 my-auto h-[2.8em] rounded-md bg-[#167c88] z-10 origin-right"
              aria-hidden
            />
            {/* Texto (inline-block para que el rect copie su ancho exacto) */}
            <motion.h2
              initial={{ color: '#167c88' }}
              whileInView={{ color: '#ffffff' }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="relative z-20 inline-block px-3 py-1 text-3xl md:text-4xl font-bold"
            >
              Conócenos un poco más
            </motion.h2>
          </span>
        </div>

        {/* Contenido */}
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            En <strong>Promedia</strong> llevamos años desarrollando soluciones visuales efectivas para marcas que
            buscan destacar. Desde la creatividad gráfica hasta la ejecución técnica, nuestro enfoque es ofrecer un
            servicio completo, rápido y con calidad garantizada.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            Nuestro equipo está conformado por diseñadores, productores, técnicos y estrategas con experiencia en
            publicidad, impresión y marketing digital. Nos apasiona lo que hacemos, y eso se refleja en cada proyecto
            que entregamos.
          </p>
        </div>
      </div>
    </section>
  );
}