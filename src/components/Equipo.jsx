// src/sections/Equipo.jsx
import { motion, useAnimationFrame } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import TitleSweep from "../components/TitleSweep";

// ========= DATA (tu lista exacta) =========
const MEMBERS = [
  // CEO
  { id: 1,  name: "Bashar Yassin",      role: "CEO",                      category: "CEO",        img: "/team/team1.png" },

  // Asesoras
  { id: 2,  name: "Gina Alexio",        role: "Ventas y Logística",       category: "Asesoras",   img: "/team/team2.png" },
  { id: 3,  name: "Claudia Collantes",  role: "Ventas y Logística",       category: "Asesoras",   img: "/team/team3.png" },

  // Marketing
  { id: 6,  name: "Giuli Santa",        role: "Project Manager",          category: "Marketing",  img: "/team/team6.png" },
  { id: 7,  name: "Dasly Peralta",      role: "Community Manager",        category: "Marketing",  img: "/team/team7.png" },
  { id: 8,  name: "Dionmer Esaa",       role: "Productor Audiovisual",    category: "Marketing",  img: "/team/team8.png" }, // Ojo: misma ruta que Claudia
  { id: 4,  name: "Thais Soto",         role: "Diseñadora Grafica",       category: "Marketing",  img: "/team/team4.png" },
  { id: 5,  name: "Yerimar Ryfkogel",   role: "Diseñadora Grafica",       category: "Marketing",  img: "/team/team5.png" },

  // Producción
  { id: 17, name: "Oswaldo Figueroa",   role: "Jefe de Producción",       category: "Producción", img: "/team/team17.png" },
  { id: 11, name: "Andy Sideregts",     role: "Operador Gran Formato",    category: "Producción", img: "/team/team11.png" },
  { id: 12, name: "Javier Hawkins",     role: "Operador Gran Formato",    category: "Producción", img: "/team/team12.png" },
  { id: 13, name: "Johan Guevara",      role: "Operador Gran Formato",    category: "Producción", img: "/team/team13.png" },
  { id: 10, name: "Raquel Castillero",  role: "Operadora de Papeleria",   category: "Producción", img: "/team/team10.png" },
  { id: 9,  name: "Cristel Brassfield", role: "Administradora",           category: "Producción", img: "/team/team9.png" },
  { id: 16, name: "Yonner Silva",       role: "Instalador (Eso cree él)", category: "Producción", img: "/team/team16.png" },
  { id: 14, name: "Enrique Ortega",     role: "Instalador",               category: "Producción", img: "/team/team14.png" },
  { id: 15, name: "Xiomara Sevilla",    role: "Personal de Limpieza",     category: "Producción", img: "/team/team15.png" },
];

const CATEGORIES = ["Marketing", "Asesoras", "Producción"]; // CEO va en spotlight arriba
const SUBFILTERS = {
  Marketing: ["Todos", "Project Manager", "Community Manager", "Productor Audiovisual", "Diseñadora Grafica"],
};

// ========= Hooks de marquee =========
function useMarquee(ref, { speed = 0.6, paused }) {
  useAnimationFrame(() => {
    const el = ref.current;
    if (!el || paused) return;
    const half = el.scrollWidth / 2;
    el.scrollLeft += speed;
    if (speed > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
    if (speed < 0 && el.scrollLeft <= 0) el.scrollLeft += half;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setStart = () => {
      const half = el.scrollWidth / 2;
      if (speed < 0) el.scrollLeft = Math.max(half - el.clientWidth, 1);
    };
    const t = setTimeout(setStart, 0);
    window.addEventListener("resize", setStart);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", setStart);
    };
  }, [ref, speed]);
}

function Row({ items, reverse = false, paused, cardHeight = 260 }) {
  const scrollerRef = useRef(null);
  useMarquee(scrollerRef, { speed: reverse ? -0.55 : 0.6, paused });
  const loopItems = useMemo(() => [...items, ...items], [items]);

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
      <div
        ref={scrollerRef}
        className="w-full overflow-x-scroll scrollbar-hide"
      >
        <div className="flex gap-8 w-max px-8 py-4">
          {loopItems.map((m, i) => (
            <motion.article
              key={`${m.id}-${i}`}
              className="min-w-[220px] md:min-w-[240px] lg:min-w-[260px] flex-shrink-0 relative group rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-white"
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
            >
              <img
                src={m.img}
                alt={`${m.name} – ${m.role}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ height: `${cardHeight}px` }}
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="pointer-events-none rounded-xl bg-gradient-to-t from-black/70 via-black/40 to-transparent p-3">
                  <h3 className="text-white text-base md:text-lg font-semibold leading-tight drop-shadow">
                    {m.name}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm">{m.role}</p>
                </div>
              </div>
            </motion.article>
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

// ========= Spotlight CEO =========
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
            className="w-full h-[360px] md:h-[420px] object-cover"
            loading="eager"
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
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs">
              Dirección
            </span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs">
              Estrategia
            </span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs">
              Innovación
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Equipo() {
  const [category, setCategory] = useState("Marketing");
  const [subfilter, setSubfilter] = useState("Todos");
  const [paused, setPaused] = useState(false);

  const CEO = useMemo(() => MEMBERS.find((m) => m.category === "CEO"), []);
  const filtered = useMemo(() => {
    const base = MEMBERS.filter(
      (m) => m.category !== "CEO" && CATEGORIES.includes(m.category)
    ).filter((m) => m.category === category);

    if (category !== "Marketing" || subfilter === "Todos") return base;
    return base.filter((m) => m.role === subfilter);
  }, [category, subfilter]);

  const [rowA, rowB] = useMemo(() => chunkInTwo(filtered), [filtered]);

  const countsByCat = useMemo(() => {
    const map = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
    for (const m of MEMBERS) {
      if (map[m.category] !== undefined) map[m.category]++;
    }
    return map;
  }, []);

  return (
    <section
      id="equipo"
      className="py-24 px-6 md:px-24 bg-white select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 className="text-4xl font-bold text-center mb-10">
        <TitleSweep
          color="#167c88"
          dir="rtl"
          duration={1.0}
          textFrom="#167c88"
          textTo="#ffffff"
        >
          Nuestro equipo
        </TitleSweep>
      </h2>

      {/* CEO primero, destacado */}
      <CEOSpotlight person={CEO} />

      {/* Tabs por categoría (sin incluir CEO) */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          const count = countsByCat[cat] ?? 0;
          return (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSubfilter("Todos");
              }}
              className={[
                "px-4 py-2 rounded-full text-sm font-medium transition",
                active
                  ? "bg-[#167c88] text-white shadow"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
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
                subfilter === f
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
              ].join(" ")}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Carrusel dinámico */}
      {filtered.length === 0 ? (
        <div className="text-center text-neutral-500 py-16">
          No hay personas en este filtro.
        </div>
      ) : (
        <div className="space-y-8">
          <Row items={rowA} paused={paused} />
          {rowB.length > 0 && <Row items={rowB} paused={paused} reverse />}
        </div>
      )}
    </section>
  );
}