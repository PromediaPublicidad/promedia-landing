// src/sections/Equipo.jsx
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import TitleSweep from "../components/TitleSweep";

// ===== Ajustes visuales globales =====
const CARD_H_MOBILE = 300;   // alto en px (mobile)
const CARD_H_DESKTOP = 320;  // alto en px (md+)
const OBJ_POS_Y = "60%";     // mueve la imagen verticalmente (50% = centro). Sube/baja según necesites.
const OVERLAY_REM = 6;       // alto del difuminado bajo el texto (rem aprox. 6 = h-24)

// ========= DATA (17 personas) =========
const MEMBERS = [
  // CEO
  { id: 1,  name: "Bashar Yassin",      role: "CEO",                      category: "CEO",        img: "/team/team1.png" },

  // Asesoras
  { id: 2,  name: "Gina Alexio",        role: "Ventas y Logística",       category: "Asesoras",   img: "/team/team2.png" },
  { id: 3,  name: "Claudia Collantes",  role: "Ventas y Logística",       category: "Asesoras",   img: "/team/team3.png" },

  // Marketing
  { id: 6,  name: "Giuli Santa",        role: "Project Manager",          category: "Marketing",  img: "/team/team6.png" },
  { id: 7,  name: "Dasly Peralta",      role: "Community Manager",        category: "Marketing",  img: "/team/team7.png" },
  { id: 8,  name: "Dionmer Esaa",       role: "Productor Audiovisual",    category: "Marketing",  img: "/team/team8.png" }, // actualizado
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

// ====== Card ======
function PersonCard({ m }) {
  return (
    <motion.article
      key={m.id}
      className="snap-start min-w-[220px] md:min-w-[240px] lg:min-w-[260px] relative group rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-white"
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
    >
      {/* IMG centrada y más abajo */}
      <img
        src={m.img}
        alt={`${m.name} – ${m.role}`}
        className="w-full object-cover object-center"
        style={{
          height: `clamp(${CARD_H_MOBILE}px, 28vw, ${CARD_H_DESKTOP}px)`,
          objectPosition: `50% ${OBJ_POS_Y}`,
        }}
        loading="lazy"
        draggable={false}
      />

      {/* Blur/gradient EXACTO a la altura del texto */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: `${OVERLAY_REM}rem`,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.35) 60%, rgba(0,0,0,0))",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Texto dentro del overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-white text-base md:text-lg font-semibold leading-tight drop-shadow">
          {m.name}
        </h3>
        <p className="text-white/85 text-xs md:text-sm">{m.role}</p>
      </div>

      {/* micro chip */}
      <div className="absolute top-3 right-3 rounded-full bg-white/85 backdrop-blur px-2 py-1 text-[10px] font-medium text-neutral-700 opacity-0 group-hover:opacity-100 transition">
        Team
      </div>
    </motion.article>
  );
}

// ====== Scroller con SNAP (sin auto-scroll) ======
function Row({ items }) {
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
            <PersonCard key={m.id} m={m} />
          ))}
        </div>
      </div>
    </div>
  );
}

function chunkInTwo(arr) {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

// ====== CEO Spotlight (mismo tratamiento de imagen y blur) ======
function CEOSpotlight({ person }) {
  if (!person) return null;
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
          <img
            src={person.img}
            alt={`${person.name} – ${person.role}`}
            className="w-full object-cover object-center"
            style={{
              height: `clamp(${CARD_H_MOBILE + 80}px, 36vw, ${CARD_H_DESKTOP + 120}px)`,
              objectPosition: `50% ${OBJ_POS_Y}`,
            }}
            loading="eager"
          />
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: `${OVERLAY_REM + 2}rem`,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.3) 60%, rgba(0,0,0,0))",
              backdropFilter: "blur(6px)",
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#167c88] text-white shadow">
              {person.role}
            </span>
          </div>
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

export default function Equipo() {
  const [category, setCategory] = useState("Marketing");
  const [subfilter, setSubfilter] = useState("Todos");

  const CEO = useMemo(() => MEMBERS.find((m) => m.category === "CEO"), []);
  const countsByCat = useMemo(() => {
    const map = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
    for (const m of MEMBERS) if (map[m.category] !== undefined) map[m.category]++;
    return map;
  }, []);

  const filtered = useMemo(() => {
    const base = MEMBERS.filter((m) => m.category !== "CEO" && CATEGORIES.includes(m.category))
                        .filter((m) => m.category === category);
    if (category !== "Marketing" || subfilter === "Todos") return base;
    return base.filter((m) => m.role === subfilter);
  }, [category, subfilter]);

  const [rowA, rowB] = useMemo(() => chunkInTwo(filtered), [filtered]);

  return (
    <section id="equipo" className="py-24 px-6 md:px-24 bg-white select-none">
      <h2 className="text-4xl font-bold text-center mb-10">
        <TitleSweep color="#167c88" dir="rtl" duration={1.0} textFrom="#167c88" textTo="#ffffff">
          Nuestro equipo
        </TitleSweep>
      </h2>

      {/* CEO spotlight */}
      <CEOSpotlight person={CEO} />

      {/* Tabs por categoría (sin CEO) */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          const count = countsByCat[cat] ?? 0;
          return (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setSubfilter("Todos"); }}
              className={[
                "px-4 py-2 rounded-full text-sm font-medium transition",
                active ? "bg-[#167c88] text-white shadow" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
              ].join(" ")}
            >
              {cat} <span className="opacity-70">({count})</span>
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

      {/* Carrusel con SNAP (dos filas) */}
      {filtered.length === 0 ? (
        <div className="text-center text-neutral-500 py-16">No hay personas en este filtro.</div>
      ) : (
        <div className="space-y-8">
          <Row items={rowA} />
          {rowB.length > 0 && <Row items={rowB} />}
        </div>
      )}
    </section>
  );
}