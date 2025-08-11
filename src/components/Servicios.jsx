import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Palette, Printer, Building2, FileText, Package, Shirt, Rocket, Smartphone, Target,
  CheckCircle2, Timer
} from 'lucide-react';

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

// Metadatos por servicio para relleno bajo la galería (sin PDF)
const meta = {
  branding: {
    incluye: ['Moodboard y paleta', 'Guía tipográfica', 'Aplicaciones base para redes'],
    tags: ['Logo', 'Manual', 'Papelería', 'Plantillas'],
    entrega: '5–7 días hábiles'
  },
  gigantografia: {
    incluye: ['Impresión HD', 'Protección UV', 'Corte a medida'],
    tags: ['Lona', 'Vinilo', 'Gran Formato', 'Roll-up'],
    entrega: '24–72 h'
  },
  'produccion-visual': {
    incluye: ['Estructuras livianas', 'Displays y habladores', 'Instalación opcional'],
    tags: ['Display', 'Habladores', 'Stands', 'Backings'],
    entrega: '3–5 días hábiles'
  },
  'digital-offset': {
    incluye: ['Tinta premium', 'Corte y doblez', 'Control de color'],
    tags: ['Volantes', 'Tarjetas', 'Catálogos', 'Revistas'],
    entrega: '24–72 h'
  },
  rigidos: {
    incluye: ['Impresión directa UV', 'Acabado mate/brillo', 'Perforado opcional'],
    tags: ['PVC', 'Foamboard', 'Acrílico', 'MDF'],
    entrega: '2–4 días hábiles'
  },
  estampados: {
    incluye: ['Transfer térmico', 'Vinilo textil', 'Pruebas de color'],
    tags: ['Camisetas', 'Gorras', 'Bolsos', 'Uniformes'],
    entrega: '2–3 días hábiles'
  },
  btl: {
    incluye: ['Staff (azafatas/modelos)', 'Guion de activación', 'Supervisión'],
    tags: ['Activación', 'Sampling', 'Trade', 'Eventos'],
    entrega: 'Planificación 5–10 días'
  },
  redes: {
    incluye: ['Calendario de contenido', 'Diseño y copy', 'Reporte mensual'],
    tags: ['IG', 'FB', 'Reels', 'Ads'],
    entrega: 'Inicio en 48 h'
  },
  personalizados: {
    incluye: ['Asesoría 1:1', 'Prototipo previo', 'Ajustes ilimitados (alcance)'],
    tags: ['A medida', 'Prototipo', 'Iterativo', 'Entrega guiada'],
    entrega: 'Según alcance'
  }
};

export default function Servicios() {
  const [active, setActive] = useState(servicios[0].slug);
  const [lightbox, setLightbox] = useState({ slug: null, index: null });
  const closeBtnRef = useRef(null);

  const activo = useMemo(() => servicios.find(s => s.slug === active), [active]);
  const info = meta[active] || { incluye: [], tags: [], entrega: '—' };

  useEffect(() => {
    function onKey(e){ if(e.key === 'Escape') setLightbox({ slug: null, index: null }); }
    document.addEventListener('keydown', onKey);

    const body = document.body;
    const open = lightbox.slug !== null;
    if(open){
      const prev = body.style.overflow;
      body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current && closeBtnRef.current.focus(), 50);
      return () => { body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  // 5 imágenes (hero + 4)
  const imgs = [1,2,3,4,5].map(n => `/services/${active}/${n}.jpeg`);

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

          {/* Detalle + galería + detalles del servicio */}
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

            {/* Galería (hero + 4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hero */}
              <button
                onClick={() => setLightbox({ slug: active, index: 0 })}
                className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-white/10 bg-gray-200"
                aria-label="Abrir imagen principal"
              >
                <img
                  src={imgs[0]}
                  alt={`${activo.title} 1`}
                  className="h-full w-full object-cover transition scale-100 group-hover:scale-[1.02]"
                  onError={(e) => { e.currentTarget.style.opacity = '0.35'; e.currentTarget.alt = 'Pendiente'; }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent text-white text-sm">
                  Vista principal
                </div>
              </button>

              {/* Thumbs */}
              <div className="grid grid-cols-2 gap-4 content-start">
                {imgs.slice(1).map((src, idx) => (
                  <button
                    key={src}
                    onClick={() => setLightbox({ slug: active, index: idx + 1 })}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-white/10 bg-gray-200"
                    aria-label={`Abrir imagen ${idx + 2}`}
                  >
                    <img
                      src={src}
                      alt={`${activo.title} ${idx + 2}`}
                      className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                      onError={(e) => {
                        const card = e.currentTarget.parentElement;
                        if (card) card.style.display = 'none';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Detalles del servicio (relleno del espacio) */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Incluye */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-[#167c88]" /> Incluye
                </h5>
                <ul className="space-y-2">
                  {info.incluye.map((item, i) => (
                    <li key={i} className="text-white/85 text-sm flex items-start gap-2">
                      <span className="mt-[3px]">
                        <CheckCircle2 size={16} className="text-[#167c88]" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
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

              {/* Entrega */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Timer size={18} className="text-[#167c88]" /> Entrega estimada
                </h5>
                <p className="text-white/85">{info.entrega}</p>
                <p className="text-white/60 text-sm mt-2">
                  *Sujeto a validación de archivos y volumen de producción.
                </p>
              </div>
            </div>

            <p className="text-white/60 text-sm mt-4">
              Coloca tus imágenes en <code className="text-white/80">/public/services/{active}/1.jpg ... 5.jpg</code>
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox (5 imágenes) */}
      <AnimatePresence>
        {lightbox.slug && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox({ slug: null, index: null })}
            />
            <motion.div
              className="fixed inset-0 z-[210] flex items-center justify-center p-4"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
            >
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-3 md:p-6">
                <button
                  ref={closeBtnRef}
                  onClick={() => setLightbox({ slug: null, index: null })}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center"
                  aria-label="Cerrar"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.3 5.7L12 12l-6.3-6.3-1.4 1.4L10.6 13 4.3 19.3l1.4 1.4L12 14.4l6.3 6.3 1.4-1.4L13.4 13l6.3-6.3z"/></svg>
                </button>

                <h4 className="text-2xl font-semibold mb-4 text-[#167c88] capitalize">{activo.title}</h4>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1,2,3,4,5].map((n) => (
                    <div key={n} className="aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-black/5 bg-gray-100">
                      <img
                        src={`/services/${active}/${n}.jpg`}
                        alt={`${active} ${n}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.opacity = '0.3'; e.currentTarget.alt = 'Pendiente'; }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <a
                    href="https://wa.me/50768940670?text=Hola%20Promedia%2C%20quiero%20ver%20m%C3%A1s%20de%20este%20servicio"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-[#167c88] text-white hover:bg-[#125f66] transition"
                  >
                    Solicitar más muestras por WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}