import { motion } from 'framer-motion';

const servicios = [
  { icon: '🧠', title: 'Branding & Diseño', desc: 'Diseño de piezas gráficas publicitarias.' },
  { icon: '🖨️', title: 'Impresión Gigantográfica', desc: 'Lonas, vinilos y gran formato.' },
  { icon: '🏗️', title: 'Producción Visual', desc: 'Displays, habladores y estructuras visuales.' },
  { icon: '🧾', title: 'Digital & Offset', desc: 'Alta calidad en diferentes formatos.' },
  { icon: '📦', title: 'Impresión sobre rígidos', desc: 'PVC, foamboard, acrílicos.' },
  { icon: '👕', title: 'Estampados térmicos', desc: 'Textiles y materiales rígidos.' },
  { icon: '🚀', title: 'Activaciones BTL', desc: 'Azafatas, modelos y eventos para marcas.' },
  { icon: '📱', title: 'Redes Sociales', desc: 'Gestión de contenido y estrategia digital.' },
  { icon: '🎯', title: 'Soluciones Personalizadas', desc: 'Servicios ajustados a tus necesidades.' }
];

export default function Servicios() {
  return (
    <section id="servicios" className="bg-[#0f1f25] py-24 px-6 md:pl-20 lg:pl-24">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-4xl font-bold mb-4 text-[#167c88]">Nuestros Servicios</h3>
        <p className="text-lg text-white/90 mb-12">
          Soluciones gráficas integrales que combinan creatividad, técnica y estrategia.
        </p>

        {/* Grid con tarjetas del mismo tamaño */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {servicios.map((servicio, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center text-center
                         w-72 h-48 px-6 py-5 rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-sm
                         shadow-sm hover:shadow-md hover:border-white/30 transition"
            >
              <div className="text-5xl mb-3">{servicio.icon}</div>
              <h4 className="text-lg font-semibold mb-2 text-[#167c88]">
                {servicio.title}
              </h4>
              <p className="text-sm text-white/85 leading-relaxed">
                {servicio.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}