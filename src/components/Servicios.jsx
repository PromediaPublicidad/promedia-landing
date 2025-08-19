import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Palette, Printer, Building2, FileText, Package, Shirt, Rocket, Smartphone, Target } from 'lucide-react';

/* =================== Descubrimiento SIN 404 (public/services/<slug>/) =================== */
/* Cache simple por sesión (slug -> string[]) */
const discoveryCache = new Map();

/* Orden de extensiones por categoría. Para "branding" NO probamos webp. */
const DEFAULT_EXTS = ['webp','jpg','jpeg','png'];
const EXT_ORDER = {
  branding: ['jpg','jpeg','png'],
  // gigantografia: ['webp','jpg','jpeg','png'],
  // produccion-visual: ['webp','jpg','jpeg','png'],
  // ...
};

/* (Opcional) Si agregas un manifest en public/services/<slug>/manifest.json,
   lo leemos primero. Ejemplo de manifest:
   ["1.jpg","2.png","3.jpeg"]
*/
async function fetchManifest(slug) {
  try {
    const res = await fetch(`/services/${slug}/manifest.json`, { cache: 'no-store' });
    if (!res.ok) return null;
    const list = await res.json();
    if (!Array.isArray(list)) return null;
    return list.map((name) => `/services/${slug}/${name}`);
  } catch {
    return null;
  }
}

/* Explora 1..maxN probando exts en orden, sin spamear la consola.
   Corta si hay 3 misses seguidos. Usa HEAD para no “romper” la vista. */
async function probePublic(slug, { maxN = 8, exts = ['jpg','jpeg','png'] } = {}) {
  const found = [];
  let misses = 0;
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
      misses = 0;
    } else {
      misses++;
      if (misses >= 3) break; // no encontramos nada por un rato: paramos
    }
  }
  return found;
}

function usePublicGallery(slug, { maxN = 8, exts = DEFAULT_EXTS } = {}) {
  const [urls, setUrls] = useState(() => discoveryCache.get(slug) || []);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const fromManifest = await fetchManifest(slug);
      const result = (fromManifest && fromManifest.length > 0)
        ? fromManifest
        : await probePublic(slug, { maxN, exts });
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
function Tile({ url, alt, eager = false, contain = false }) {
  if (!url) return null;
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-white/10 bg-gray-200">
      <img
        src={url}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={contain
          ? 'block w-auto h-auto max-w-full max-h-full object-contain mx-auto my-auto'
          : 'h-full w-full object-cover'}
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
    <section id="servicios" className="relative bg-[#0f1f25] py-24 px-6 md:px-10 xl:pl-[96px] 2xl:pl-[112px]">
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

            {/* Collage: solo renderiza las URLs reales */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {urls.map((url, i) => (
                <Tile key={url} url={url} alt={`${activo.title} ${i + 1}`} eager={i < 3} contain={false} />
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