import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Palette, Printer, Building2, FileText, Package, Shirt, Rocket, Smartphone, Target } from 'lucide-react';

// Ajuste lateral según tu barra:
// Izquierda => xl:pl-[96px] | Derecha => xl:pr-[96px]

const servicios = [
  { icon: <Palette size={28} />, title: 'Branding & Diseño',        desc: 'Diseño de piezas gráficas publicitarias.', slug: 'branding' },
  { icon: <Printer size={28} />, title: 'Impresión Gigantográfica', desc: 'Lonas, vinilos y gran formato.',          slug: 'gigantografia' },
  { icon: <Building2 size={28} />, title: 'Producción Visual',      desc: 'Displays, habladores y estructuras.',     slug: 'produccion-visual' },
  { icon: <FileText size={28} />, title: 'Digital & Offset',        desc: 'Alta calidad en distintos formatos.',     slug: 'digital-offset' },
  { icon: <Package size={28} />, title: 'Impresión sobre rígidos',  desc: 'PVC, foamboard, acrílicos.',              slug: 'rigidos' },
  { icon: <Shirt size={28} />,   title: 'Estampados térmicos',      desc: 'Textiles y materiales rígidos.',          slug: 'estampados' },
  { icon: <Rocket size={28} />,  title: 'Activaciones BTL',         desc: 'Azafatas, modelos y eventos.',            slug: 'btl' },
  { icon: <Smartphone size={28} />, title: 'Redes Sociales',        desc: 'Gestión de contenido y estrategia.',      slug: 'redes' },
  { icon: <Target size={28} />,  title: 'Soluciones Personalizadas',desc: 'A tu medida.',                             slug: 'personalizados' },
];

// Descripción corta + tags por servicio
const meta = {
  branding:         { descripcion: 'Identidad clara y coherente.',         tags: ['Logo', 'Manual', 'Papelería', 'Plantillas'] },
  gigantografia:    { descripcion: 'Impacto en gran formato.',             tags: ['Lona', 'Vinilo', 'Gran Formato', 'Roll-up'] },
  'produccion-visual': { descripcion: 'Montajes y displays listos.',       tags: ['Display', 'Habladores', 'Stands', 'Backings'] },
  'digital-offset': { descripcion: 'Impresión nítida y confiable.',        tags: ['Volantes', 'Tarjetas', 'Catálogos', 'Revistas'] },
  rigidos:          { descripcion: 'Soportes durables y rígidos.',         tags: ['PVC', 'Foamboard', 'Acrílico', 'MDF'] },
  estampados:       { descripcion: 'Estampado preciso en textil.',         tags: ['Camisetas', 'Gorras', 'Bolsos', 'Uniformes'] },
  btl:              { descripcion: 'Experiencias de marca reales.',        tags: ['Activación', 'Sampling', 'Trade', 'Eventos'] },
  redes:            { descripcion: 'Contenido que conecta.',               tags: ['IG', 'FB', 'Reels', 'Ads'] },
  personalizados:   { descripcion: 'Soluciones a tu medida.',              tags: ['Prototipo', 'Iterativo', 'Acompañamiento', 'Entrega guiada'] }
};

export default function Servicios() {
  const [active, setActive] = useState(servicios[0].slug);
  const activo = useMemo(() => servicios.find(s => s.slug === active), [active]);
  const info = meta[active] || { descripcion: '', tags: [] };

  // 5 imágenes fijas
  const imgs = [1,2,3,4,5].map(n => `/services/${active}/${n}.jpeg`);

  // Clases de “mosaico” para 5 fotos (índice 0..4)
  const tile = (i) => [
    // 0: HERO grande (contain, sin recorte)
    'col-span-2 md:col-span-3 md:row-span-3 flex items-center justify-center p-2 bg-transparent ring-0',
    // 1: ancho arriba derecha
    'col-span-2 md:col-span-3 md:row-span-2',
    // 2: mediana abajo derecha
    'col-span-1 md:col-span-2 md:row-span-1',
    // 3: pequeña
    'col-span-1 md:col-span-1 md:row-span-1',
    // 4: alta y angosta
    'col-span-2 md:col-span-2 md:row-span-2'
  ][i] || 'col-span-1 md:col-span-2 md:row-span-1';

  return (
    <section
      id="servicios"
      className="relative bg-[#0f1f25] py-24 px-6 md:px-10 xl:pl-[96px] 2xl:pl-[112px]"
    >
      {/* Fondo decorativo sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#167c88]/10 blur-3xl"/>
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"/>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4 text-[#167c88]">Nuestros Servicios</h3>
          <p className="text-lg text-white/90">Soluciones gráficas integrales que combinan creatividad, técnica y estrategia.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Lista izquierda (sticky) */}
          <aside className="md:col-span-4 lg:col-span-4">
            <div className="md:sticky md:top-28 space-y-3 z-10">
              {servicios.map((s, i) => {
                const isActive = s.slug === active;
                return (
                  <motion.button
                    key={s.slug}
                    onClick={() => setActive(s.slug)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    aria-pressed={isActive}
                    className={[
                      'w-full text-left px-4 py-3 rounded-xl border transition flex items-center gap-3 group',
                      'bg-white/[0.04] backdrop-blur-sm',
                      isActive ? 'border-[#167c88] ring-1 ring-[#167c88]/40' : 'border-white/10 hover:border-white/25'
                    ].join(' ')}
                  >
                    <span className="text-[#167c88] transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_#167c88]">
                      {s.icon}
                    </span>
                    <span>
                      <span className="block text-white font-semibold">{s.title}</span>
                      <span className="block text-white/75 text-sm">{s.desc}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </aside>

          {/* Detalle + collage + descripción + tags */}
          <div className="md:col-span-8 lg:col-span-8">
            {/* Encabezado */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-2xl md:text-3xl font-semibold text-[#167c88]">{activo.title}</h4>
                <p className="text-white/85 mt-1 max-w-2xl">{activo.desc}</p>
              </div>
              <a
                href="https://wa.me/50768940670?text=Hola%20Promedia%2C%20quiero%20ver%20m%C3%A1s%20de%20este%20servicio"
                target="_blank" rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center h-11 px-4 rounded-lg bg-[#167c88] text-white hover:bg-[#125f66]"
              >
                Cotizar por WhatsApp
              </a>
            </div>

            {/* Collage profesional (5 imágenes) */}
            <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[120px] md:auto-rows-[140px] gap-4">
              {imgs.map((src, i) => (
                <div
                  key={src}
                  className={[
                    // Base visual (borde sutil sólo para las miniaturas, no el hero)
                    i === 0
                      ? 'rounded-xl overflow-hidden ' // hero sin ring ni bg
                      : 'rounded-xl overflow-hidden ring-1 ring-white/10 bg-gray-200',
                    tile(i)
                  ].join(' ')}
                >
                  <img
                    src={src}
                    alt={`${activo.title} ${i + 1}`}
                    className={
                      i === 0
                        ? 'block w-auto h-auto max-w-full max-h-full object-contain' // HERO limpio
                        : 'h-full w-full object-cover' // resto cubren su tile
                    }
                    decoding="async"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      const card = e.currentTarget.parentElement;
                      if (card) card.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Descripción corta */}
            <p className="text-white/85 mt-6">{info.descripcion}</p>

            {/* Tags */}
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h5 className="text-white font-semibold mb-3">Tags</h5>
              <div className="flex flex-wrap gap-2">
                {info.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm bg-[#167c88]/15 text-[#b9e6eb] ring-1 ring-[#167c88]/30"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-white/60 text-sm mt-4">
              Coloca tus imágenes en <code className="text-white/80">/public/services/{active}/1.jpg ... 5.jpg</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}