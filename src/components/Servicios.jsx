// src/sections/Servicios.jsx
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Palette, Printer, Building2, FileText, Package, Shirt, Rocket, Smartphone, Target } from 'lucide-react';

/* =================== Catálogo exacto (sin 404) =================== */
const KNOWN_PUBLIC_FILES = {
  branding: ["1.jpeg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"], // lo que tienes hoy
};

/* Orden de extensiones por categoría (solo para probes de otros slugs) */
const DEFAULT_EXTS = ['webp','jpg','jpeg','png'];
const EXT_ORDER = {
  branding: ['jpg','jpeg','png'], // no se usa si está en KNOWN_PUBLIC_FILES, lo dejo por claridad
};

/* ============ Ajustes visuales por imagen (edítame) ============ */
/* Por slug → por **nombre de archivo** (recomendado) o por **índice** (0-based) */
const GALLERY_TWEAKS = {
  // 👉 BRANDING: por NOMBRE
  branding: {
    "1.jpeg": { shiftY: -12 },
    "2.jpg":  { shiftY: -6 },
    "3.jpg":  { shiftY: 0 },
    "4.jpg":  { shiftY: -15 },
    "5.jpg":  { shiftY: -3 },
    "6.jpg":  { shiftY: 0 },
    // Ejemplos:
    // "3.jpg": { shiftY: -8 },  // sube 8%
    // "5.jpg": { shiftY: 12 },  // baja 12%
  },

  // 👉 RESTO DE CATEGORÍAS: por ÍNDICE (ajusta los que uses)
  gigantografia: {
    "1.jpeg": { shiftY: 0 }, "2.jpg": { shiftY: 0 }, "3.jpg": { shiftY: 0 },
    "4.jpg": { shiftY: 0 }, "5.jpg": { shiftY: 0 }, "6.jpg": { shiftY: 0 },
    // Ejemplo: 2: { shiftY: -10 }
  },
  'produccion-visual': {
    "1.jpeg": { shiftY: 0 }, "2.jpg": { shiftY: 0 }, "3.jpg": { shiftY: 0 },
    "4.jpg": { shiftY: 0 }, "5.jpg": { shiftY: 0 }, "6.jpg": { shiftY: 0 },
  },
  'digital-offset': {
    "1.jpeg": { shiftY: 0 }, "2.jpg": { shiftY: 0 }, "3.jpg": { shiftY: 0 },
    "4.jpg": { shiftY: 0 }, "5.jpg": { shiftY: 0 }, "6.jpg": { shiftY: 0 },
  },
  rigidos: {
    "1.jpeg": { shiftY: 0 }, "2.jpg": { shiftY: 0 }, "3.jpg": { shiftY: 0 },
    "4.jpg": { shiftY: 0 }, "5.jpg": { shiftY: 0 }, "6.jpg": { shiftY: 0 },
  },
  estampados: {
    "1.jpeg": { shiftY: 0 }, "2.jpg": { shiftY: 0 }, "3.jpg": { shiftY: 0 },
    "4.jpg": { shiftY: 0 }, "5.jpg": { shiftY: 0 }, "6.jpg": { shiftY: 0 },
  },
  btl: {
    "1.jpeg": { shiftY: 0 }, "2.jpg": { shiftY: 0 }, "3.jpg": { shiftY: 0 },
    "4.jpg": { shiftY: 0 }, "5.jpg": { shiftY: 0 }, "6.jpg": { shiftY: 0 },
  },
  redes: {
    "1.jpeg": { shiftY: -15 }, "2.jpeg": { shiftY: -8 }, "3.jpeg": { shiftY: -19 },
    "4.jpeg": { shiftY: -12 }, "5.jpeg": { shiftY: -19 }, "6.jpg": { shiftY: -3 },
  },
  personalizados: {
    "1.jpeg": { shiftY: -10 }, "2.jpeg": { shiftY: -15 }, "3.jpeg": { shiftY: 0 },
    "4.jpg": { shiftY: -17 }, "5.jpg": { shiftY: -14 }, "6.jpg": { shiftY: -6 },
  },
};

function basenameFromUrl(url) {
  const last = url.split('/').pop() || '';
  return last.split('?')[0];
}
function getTileTweaks(slug, url, index) {
  const map = GALLERY_TWEAKS[slug] || {};
  const name = basenameFromUrl(url);
  // Prioridad: nombre de archivo > índice
  return map[name] ?? map[index] ?? {};
}

/* =================== Descubrimiento con HEAD (solo si NO hay KNOWN_PUBLIC_FILES[slug]) =================== */
async function probePublic(slug, { maxN = 8, exts = ['jpg','jpeg','png'] } = {}) {
  const found = [];
  let seenAny = false;
  for (let n = 1; n <= maxN; n++) {
    let hit = null;
    for (const ext of exts) {
      const url = `/services/${slug}/${n}.${ext}`;
      try {
        const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        if (res.ok) { hit = url; break; }
      } catch { /* ignore */ }
    }
    if (hit) {
      found.push(hit);
      seenAny = true;
    } else if (seenAny) {
      break;
    }
  }
  return found;
}

const discoveryCache = new Map(); // slug -> string[]

function usePublicGallery(slug, { maxN = 12, exts = DEFAULT_EXTS } = {}) {
  const [urls, setUrls] = useState(() => discoveryCache.get(slug) || []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (KNOWN_PUBLIC_FILES[slug]?.length) {
        const list = KNOWN_PUBLIC_FILES[slug].map(name => `/services/${slug}/${name}`);
        if (!cancelled) {
          discoveryCache.set(slug, list);
          setUrls(list);
        }
        return;
      }
      const result = await probePublic(slug, { maxN, exts });
      if (!cancelled) {
        discoveryCache.set(slug, result);
        setUrls(result);
      }
    })();
    return () => { cancelled = true; };
  }, [slug, maxN, exts]);

  return urls;
}

/* =================== UI helpers =================== */
function Tile({ url, alt, eager = false, contain = false, tweak = {} }) {
  if (!url) return null;
  const {
    shiftY = 0,  // % vertical (negativo = sube)
    shiftX = 0,  // % horizontal
    zoom   = 1,  // 1 = igual
    contain: containOverride
  } = tweak || {};

  const useContain = typeof containOverride === 'boolean' ? containOverride : contain;
  const transformNeeded = shiftX || shiftY || zoom !== 1;

  return (
    <div className="aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-white/10 bg-gray-200">
      <img
        src={url}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        className={
          useContain
            ? 'block w-auto h-auto max-w-full max-h-full object-contain mx-auto my-auto select-none pointer-events-none'
            : 'h-full w-full object-cover select-none pointer-events-none will-change-transform'
        }
        style={
          transformNeeded
            ? { transform: `translate(${shiftX}%, ${shiftY}%) scale(${zoom})`, transformOrigin: '50% 50%' }
            : undefined
        }
      />
    </div>
  );
}

/* =================== Data =================== */
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

const meta = {
  branding:            { descripcion: 'Identidad clara y coherente.',         tags: ['Logo', 'Manual', 'Papelería', 'Plantillas'] },
  gigantografia:       { descripcion: 'Impacto en gran formato.',             tags: ['Lona', 'Vinilo', 'Gran Formato', 'Roll-up'] },
  'produccion-visual': { descripcion: 'Montajes y displays listos.',          tags: ['Display', 'Habladores', 'Stands', 'Backings'] },
  'digital-offset':    { descripcion: 'Impresión nítida y confiable.',        tags: ['Volantes', 'Tarjetas', 'Catálogos', 'Revistas'] },
  rigidos:             { descripcion: 'Soportes durables y rígidos.',         tags: ['PVC', 'Foamboard', 'Acrílico', 'MDF'] },
  estampados:          { descripcion: 'Estampado preciso en textil.',         tags: ['Camisetas', 'Gorras', 'Bolsos', 'Uniformes'] },
  btl:                 { descripcion: 'Experiencias de marca reales.',        tags: ['Activación', 'Sampling', 'Trade', 'Eventos'] },
  redes:               { descripcion: 'Contenido que conecta.',               tags: ['IG', 'FB', 'Reels', 'Ads'] },
  personalizados:      { descripcion: 'Soluciones a tu medida.',              tags: ['Prototipo', 'Iterativo', 'Acompañamiento', 'Entrega guiada'] }
};

/* =================== Componente =================== */
export default function Servicios() {
  const [active, setActive] = useState(servicios[0].slug);
  const activo = useMemo(() => servicios.find(s => s.slug === active), [active]);
  const info = meta[active] || { descripcion: '', tags: [] };

  const exts = EXT_ORDER[active] ?? DEFAULT_EXTS;
  const urls = usePublicGallery(active, { maxN: 12, exts });

  return (
    <section id="servicios" className="relative bg-[#0f1f25] overflow-x-clip">
      {/* Glow de fondo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#167c88]/10 blur-3xl"/>
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"/>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-24 relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4 text-[#167c88]">Nuestros Servicios</h3>
          <p className="text-lg text-white/90">Soluciones gráficas integrales que combinan creatividad, técnica y estrategia.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Lista izquierda */}
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

          {/* Detalle + collage */}
          <div className="md:col-span-8 lg:col-span-8">
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

            {/* Collage: solo URLs reales (sin 404 jamás) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {urls.map((url, i) => (
                <Tile
                  key={url}
                  url={url}
                  alt={`${activo.title} ${i + 1}`}
                  eager={i < 3}
                  contain={false}
                  tweak={getTileTweaks(active, url, i)}
                />
              ))}
              {urls.length === 0 && (
                <div className="col-span-2 md:col-span-3 text-white/60 text-sm">
                  No se encontraron imágenes en <code>/public/services/{active}</code>.
                </div>
              )}
            </div>

            {/* Descripción corta */}
            <p className="text-white/85 mt-6">{info.descripcion}</p>

            {/* Tags */}
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h5 className="text-white font-semibold mb-3">Tags</h5>
              <div className="flex flex-wrap gap-2">
                {info.tags.map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-sm bg-[#167c88]/15 text-[#b9e6eb] ring-1 ring-[#167c88]/30">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}