// src/sections/Equipo.jsx
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import TitleSweep from "../components/TitleSweep";

/* ================ Ajustes globales ================ */
const CARD_H_MOBILE = 300;
const CARD_H_DESKTOP = 320;
const DEFAULT_ZOOM  = 1.0;

/* ================ Datos del equipo ================ */
const MEMBERS = [
  // CEO
  { id: 1,  name: "Bashar Yassin",      role: "CEO",                      category: "CEO",        img: "/team/team1.png" },

  // Asesoras
  { id: 2,  name: "Gina Alexio",        role: "Ventas y Logística",       category: "Asesoras",   img: "/team/team2.png" },
  { id: 3,  name: "Claudia Collantes",  role: "Ventas y Logística",       category: "Asesoras",   img: "/team/team3.png" },

  // Marketing
  { id: 6,  name: "Giuli Santa",        role: "Project Manager",          category: "Marketing",  img: "/team/team6.png" },
  { id: 7,  name: "Dasly Peralta",      role: "Community Manager",        category: "Marketing",  img: "/team/team7.png" },
  { id: 8,  name: "Dionmer Esaa",       role: "Productor Audiovisual",    category: "Marketing",  img: "/team/team8.png" },
  { id: 4,  name: "Thais Soto",         role: "Diseñadora Grafica",       category: "Marketing",  img: "/team/team4.png" },
  { id: 5,  name: "Yerimar Ryfkogel",   role: "Diseñadora Grafica",       category: "Marketing",  img: "/team/team5.png" },

  // Producción
  { id: 17, name: "Oswaldo Figueroa",   role: "Jefe de Producción",       category: "Producción", img: "/team/team17.png" },
  { id: 11, name: "Andy Sideregts",     role: "Operador Gran Formato",    category: "Producción", img: "/team/team11.png" },
  { id: 12, name: "Javier Hawkins",     role: "Operador Gran Formato",    category: "Producción", img: "/team/team12.png" },
  { id: 13, name: "Johan Guevara",      role: "Operador Gran Formato",    category: "Producción", img: "/team/team13.png" },
  { id: 10, name: "Raquel Castillero",  role: "Operadora de Papeleria",   category: "Producción", img: "/team/team10.png" },
  { id: 9,  name: "Cristel Brassfield", role: "Administradora",           category: "Producción", img: "/team/team9.png" },
  { id: 16, name: "Yonner Silva",       role: "Instalador (Eso cree el)", category: "Producción", img: "/team/team16.png" },
  { id: 14, name: "Enrique Ortega",     role: "Instalador",               category: "Producción", img: "/team/team14.png" },
  { id: 15, name: "Xiomara Sevilla",    role: "Personal de Limpieza",     category: "Producción", img: "/team/team15.png" },
];

const CATEGORIES = ["Marketing", "Asesoras", "Producción"];
const SUBFILTERS = {
  Marketing: ["Todos", "Project Manager", "Community Manager", "Productor Audiovisual", "Diseñadora Grafica"],
};

/* ================ Tweaks (shiftY/zoom) ================ */
const INITIAL_TWEAKS = {
  1:  { shiftY: 18, zoom: 1.00 }, // CEO
  2:  { shiftY: -4, zoom: 1.00 },
  3:  { shiftY:  1, zoom: 1.00 },
  4:  { shiftY:  4, zoom: 1.00 },
  5:  { shiftY:  3, zoom: 0.95 },
  6:  { shiftY:  4, zoom: 0.96 },
  7:  { shiftY:  4, zoom: 0.96 },
  8:  { shiftY:  2, zoom: 1.00 },
  9:  { shiftY:  5, zoom: 0.95 },
  10: { shiftY:  3, zoom: 1.00 },
  11: { shiftY:  4, zoom: 1.00 },
  12: { shiftY:  2, zoom: 1.00 },
  13: { shiftY:  6, zoom: 1.00 },
  14: { shiftY:  2, zoom: 1.00 },
  15: { shiftY:  1, zoom: 1.00 },
  16: { shiftY:  5, zoom: 1.00 },
  17: { shiftY:  2, zoom: 1.00 },
};

/* ================ Helper: frame fijo + imagen absoluta ================ */
function CropFrame({ height, src, alt, shiftY = 0, zoom = 1, eager = false, children }) {
  return (
    <div className="relative overflow-hidden select-none" style={{ height }}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          transform: `translateY(${shiftY}%) scale(${zoom})`,
          transformOrigin: "50% 50%"
        }}
        loading={eager ? "eager" : "lazy"}
        draggable={false}
      />
      {children}
    </div>
  );
}

/* ================ Card de persona ================ */
function PersonCard({ m, tweaks, layout = "carousel", heightClamp }) {
  const t = tweaks[m.id] || {};
  const zoom = typeof t.zoom === "number" ? t.zoom : DEFAULT_ZOOM;
  const shiftY = typeof t.shiftY === "number" ? t.shiftY : 0;

  const clamp = heightClamp || `clamp(${CARD_H_MOBILE}px, 28vw, ${CARD_H_DESKTOP}px)`;
  const wrapperClass =
    layout === "carousel"
      ? "snap-start min-w-[220px] md:min-w-[240px] lg:min-w-[260px]"
      : "w-full";

  return (
    <motion.article
      key={m.id}
      aria-label={`${m.name} – ${m.role}`}
      className={`${wrapperClass} relative group rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-white`}
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
    >
      <CropFrame height={clamp} src={m.img} alt={m.name} shiftY={shiftY} zoom={zoom}>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div
            className="rounded-xl px-3 py-2"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.70), rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.15))",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <h3 className="text-white text-base md:text-lg font-semibold leading-tight drop-shadow">
              {m.name}
            </h3>
            <p className="text-white/85 text-xs md:text-sm">{m.role}</p>
          </div>
        </div>

        <div className="absolute top-3 right-3 rounded-full bg-white/85 backdrop-blur px-2 py-1 text-[10px] font-medium text-neutral-700 opacity-0 group-hover:opacity-100 transition">
          Team
        </div>
      </CropFrame>
    </motion.article>
  );
}

/* ================ Row con snap (Marketing / Asesoras) ================ */
function Row({ items, tweaks }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
      }}
    >
      <div className="w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory snap-always">
        <div className="flex gap-6 w-max px-6 py-4">
          {items.map((m) => (
            <PersonCard key={m.id} m={m} tweaks={tweaks} layout="carousel" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================ Grid (Producción: 3 por fila, MISMA altura) ================ */
function Grid({ items, tweaks }) {
  // misma altura/clamp que el resto
  const clamp = `clamp(${CARD_H_MOBILE}px, 28vw, ${CARD_H_DESKTOP}px)`;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((m) => (
        <PersonCard
          key={m.id}
          m={m}
          tweaks={tweaks}
          layout="grid"
          heightClamp={clamp}
        />
      ))}
    </div>
  );
}

/* ================ CEO Spotlight (altura según tu versión) ================ */
function CEOSpotlight({ person, tweaks }) {
  if (!person) return null;
  const t = tweaks[person.id] || {};
  const zoom = typeof t.zoom === "number" ? t.zoom : 1.0;
  const shiftY = typeof t.shiftY === "number" ? t.shiftY : 0;

  return (
    <motion.div
      className="relative mb-14 rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-lg bg-white"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative">
          <CropFrame
            height={`calc(clamp(${CARD_H_MOBILE + 80}px, 36vw, ${CARD_H_DESKTOP + 120}px) + 0in)`}
            src={person.img}
            alt={person.name}
            shiftY={shiftY}
            zoom={zoom}
            eager
          >
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#167c88] text-white shadow">
                {person.role}
              </span>
            </div>
          </CropFrame>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-10">
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900">
            {person.name}
          </h3>
          <p className="mt-2 text-neutral-600">
            Liderando la visión y la calidad de Promedia.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs">Dirección</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs">Estrategia</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs">Innovación</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================ Team Tuner oculto (?tuneTeam=1) ================ */
function TeamTuner({ members, tweaks, setTweaks }) {
  const [filter, setFilter] = useState("Todos");

  const list = useMemo(() => {
    if (filter === "Todos") return members;
    return members.filter((m) => m.category === filter || (filter === "CEO" && m.category === "CEO"));
  }, [members, filter]);

  const toJSON = () => {
    const out = {};
    for (const m of members) {
      const t = tweaks[m.id];
      if (!t) continue;
      if (typeof t.shiftY === "number" && t.shiftY !== 0) out[m.id] = { ...(out[m.id] || {}), shiftY: t.shiftY };
      if (typeof t.zoom === "number" && t.zoom !== DEFAULT_ZOOM) out[m.id] = { ...(out[m.id] || {}), zoom: Number(t.zoom.toFixed(2)) };
    }
    return JSON.stringify(out, null, 2);
  };

  const copyJSON = async () => {
    try { await navigator.clipboard.writeText(toJSON()); alert("PHOTO_TWEAKS copiado ✨"); }
    catch { prompt("Copia el JSON:", toJSON()); }
  };

  return (
    <div className="mt-12 border rounded-2xl p-4 md:p-6 bg-neutral-50">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-sm font-medium">Editor de recorte (dev):</span>
        {["Todos", "CEO", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={[
              "px-3 py-1.5 rounded-full text-xs font-medium",
              filter === c ? "bg-black text-white" : "bg-white text-neutral-700 border",
            ].join(" ")}
          >
            {c}
          </button>
        ))}
        <button onClick={copyJSON} className="ml-auto px-3 py-1.5 rounded-md text-xs font-semibold bg-[#167c88] text-white">
          Copiar JSON
        </button>
      </div>

      {/* preview de ajustes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((m) => {
          const t = tweaks[m.id] || {};
          const shiftY = typeof t.shiftY === "number" ? t.shiftY : 0;
          const zoom = typeof t.zoom === "number" ? t.zoom : DEFAULT_ZOOM;

          return (
            <div key={m.id} className="rounded-xl border bg-white p-3">
              <div className="text-sm font-semibold mb-2">
                {m.name} <span className="opacity-60">({m.role})</span>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full object-cover select-none"
                  style={{
                    height: 260,
                    transform: `translateY(${shiftY}%) scale(${zoom})`,
                    transformOrigin: "50% 50%",
                  }}
                  draggable={false}
                />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div
                    className="rounded-lg px-3 py-1.5"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.70), rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.15))",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="text-white text-xs font-medium leading-tight">{m.name}</div>
                    <div className="text-white/85 text-[11px]">{m.role}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3">
                <label className="text-xs">
                  shiftY: <b>{shiftY}%</b>
                  <input
                    type="range" min={-20} max={20} step={1} value={shiftY}
                    onChange={(e) => setTweaks((prev) => ({ ...prev, [m.id]: { ...(prev[m.id] || {}), shiftY: parseInt(e.target.value, 10) } }))}
                    className="w-full"
                  />
                </label>
                <label className="text-xs">
                  zoom: <b>{zoom.toFixed(2)}x</b>
                  <input
                    type="range" min={0.90} max={1.10} step={0.01} value={zoom}
                  onChange={(e) => setTweaks((prev) => ({ ...prev, [m.id]: { ...(prev[m.id] || {}), zoom: parseFloat(e.target.value) } }))}
                    className="w-full"
                  />
                </label>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setTweaks((prev) => { const c = { ...prev }; delete c[m.id]; return c; })}
                  className="text-xs px-2 py-1 rounded-md border"
                >
                  Reset
                </button>
                <div className="text-[11px] text-neutral-500 self-center">
                  id {m.id} • {m.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-xs text-neutral-600">Ver JSON actual</summary>
        <pre className="mt-2 text-[11px] bg-white p-3 rounded-md overflow-auto">{toJSON()}</pre>
      </details>
    </div>
  );
}

/* ================ Componente principal ================ */
export default function Equipo() {
  const [category, setCategory] = useState("Marketing");
  const [subfilter, setSubfilter] = useState("Todos");
  const [tweaks, setTweaks] = useState(INITIAL_TWEAKS);

  const CEO = useMemo(() => MEMBERS.find((m) => m.category === "CEO"), []);

  const filtered = useMemo(() => {
    const base = MEMBERS
      .filter((m) => m.category !== "CEO" && CATEGORIES.includes(m.category))
      .filter((m) => m.category === category);
    if (category !== "Marketing" || subfilter === "Todos") return base;
    return base.filter((m) => m.role === subfilter);
  }, [category, subfilter]);

  // Asesoras: una fila horizontal; Marketing: 2 filas con snap; Producción: grid (3 por fila, misma altura)
  const [rowA, rowB] = useMemo(() => {
    if (category === "Asesoras") return [filtered, []];
    const mid = Math.ceil(filtered.length / 2);
    return [filtered.slice(0, mid), filtered.slice(mid)];
  }, [filtered, category]);

  const tunerOn =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("tuneTeam");

  return (
    <section id="equipo" className="py-24 px-6 md:px-24 bg-white select-none">
      <h2 className="text-4xl font-bold text-center mb-10">
        <TitleSweep color="#167c88" dir="rtl" duration={1.0} textFrom="#167c88" textTo="#ffffff">
          Nuestro equipo
        </TitleSweep>
      </h2>

      {/* CEO destacado */}
      <CEOSpotlight person={CEO} tweaks={tweaks} />

      {/* Tabs por categoría (sin conteos) */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setSubfilter("Todos"); }}
              className={[
                "px-4 py-2 rounded-full text-sm font-medium transition",
                active ? "bg-[#167c88] text-white shadow" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
              ].join(" ")}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Subfiltros solo para Marketing */}
      {category === "Marketing" && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SUBFILTERS.Marketing.map((f) => (
            <button
              key={f}
              onClick={() => setSubfilter(f)}
              className={[
                "px-3 py-1.5 rounded-full text-xs font-medium transition",
                subfilter === f ? "bg-black text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
              ].join(" ")}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Vista por categoría */}
      {filtered.length === 0 ? (
        <div className="text-center text-neutral-500 py-16">No hay personas en este filtro.</div>
      ) : category === "Producción" ? (
        <Grid items={filtered} tweaks={tweaks} />
      ) : (
        <div className="space-y-8">
          <Row items={rowA} tweaks={tweaks} />
          {rowB.length > 0 && <Row items={rowB} tweaks={tweaks} />}
        </div>
      )}

      {/* Editor oculto (activar con ?tuneTeam=1) */}
      {tunerOn && <TeamTuner members={MEMBERS} tweaks={tweaks} setTweaks={setTweaks} />}
    </section>
  );
}