// src/components/Header.jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

/* ============= Drawer móvil ============= */
function MobileMenu({ open, onClose, linkClass }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 h-screen bg-black/50 z-[998] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 h-screen w-72 max-w-[80%] z-[999] lg:hidden bg-[#167c88] shadow-xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="flex items-center justify-between px-4 py-4 text-white shrink-0"
              style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top))" }}
            >
              <span className="font-semibold tracking-wide uppercase">Menú</span>
              <button
                aria-label="Cerrar menú"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 transition leading-none"
                onClick={onClose}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.3 5.71L12 12.01l-6.3-6.3-1.4 1.41 6.3 6.29-6.3 6.3 1.4 1.41 6.3-6.3 6.29 6.3 1.41-1.41-6.3-6.3 6.3-6.29z"/>
                </svg>
              </button>
            </div>

            <div className="bg-white flex-1 overflow-y-auto">
              <nav className="divide-y divide-[#167c88]/15">
                <a href="/#inicio"     className={`${linkClass} text-[#167c88] hover:bg-[#167c88]/5`} onClick={onClose}>Inicio</a>
                <a href="/#servicios"  className={`${linkClass} text-[#167c88] hover:bg-[#167c88]/5`} onClick={onClose}>Servicios</a>
                <a href="/#conocenos"  className={`${linkClass} text-[#167c88] hover:bg-[#167c88]/5`} onClick={onClose}>Conócenos</a>
                <a href="/#contacto"   className={`${linkClass} text-[#167c88] hover:bg-[#167c88]/5`} onClick={onClose}>Contáctanos</a>
                <Link to="/trabaja"    className={`${linkClass} text-[#167c88] hover:bg-[#167c88]/5`} onClick={onClose}>Trabaja con Nosotros</Link>
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ============= Header fijo (Home: oculto al inicio; Internas: siempre visible) ============= */
export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const [headerH, setHeaderH] = useState(96);

  // Scroll (solo en home)
  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // ESC cierra drawer
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Medir altura y setear --header-h
  useLayoutEffect(() => {
    const measure = () => {
      const h = headerRef.current?.offsetHeight || 96;
      setHeaderH(h);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  // Lock scroll cuando el drawer abre
  useEffect(() => {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = sbw ? `${sbw}px` : "";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => { document.body.style.overflow = ""; document.body.style.paddingRight = ""; };
  }, [open]);

  const active = isHome ? scrolled : true;
  const atTop = isHome ? !active : false;

  // Alturas (logo en fila 1 SIEMPRE; menú en fila 2)
  const row1H = isHome ? (active ? "h-14 lg:h-16" : "h-16 lg:h-20") : "h-14";
  const row2H = isHome ? (active ? "h-10" : "h-12") : "h-12";

  const navItemClass =
    "inline-flex items-center h-full px-2 text-sm font-semibold uppercase tracking-wider text-[#167c88] hover:opacity-80";
  const linkClass =
    "block px-5 py-4 text-lg font-semibold uppercase tracking-wider leading-none";

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "fixed top-0 left-0 right-0 z-[70] w-full transition-all duration-300",
          active ? "bg-white/90 backdrop-blur-md shadow-md opacity-100 translate-y-0"
                 : "bg-transparent opacity-0 -translate-y-3 pointer-events-none"
        ].join(" ")}
        style={{ paddingTop: "max(0px, env(safe-area-inset-top))" }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
          {/* Fila 1: LOGO DARK centrado (link a inicio) */}
          <div className={`grid grid-cols-[1fr_auto_1fr] items-center ${row1H}`}>
            <div />
            <Link to="/#inicio" className="justify-self-center inline-flex items-center gap-2" aria-label="Ir al inicio">
              <img
                src="/logos/logo-dark.png"
                alt="Promedia"
                className="block w-auto select-none"
    style={{ height: "44px" }}   // <- fuerza 28px sin importar Tailwind
                draggable={false}
              />
            </Link>
            <div className="justify-self-end">
              {/* Botón móvil */}
              <button
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#167c88]/60 text-[#167c88] hover:bg-[#167c88]/10 transition leading-none"
                aria-label="Abrir menú"
                aria-expanded={open}
                onClick={() => setOpen(true)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 6h18v2H3V6zm0 5.5h18v2H3v-2zM3 17h18v2H3v-2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Fila 2: NAV centrado */}
          <nav className={`hidden lg:flex items-center justify-center gap-8 ${row2H}`}>
            <a href="/#inicio"     className={navItemClass}>Inicio</a>
            <a href="/#servicios"  className={navItemClass}>Servicios</a>
            <a href="/#conocenos"  className={navItemClass}>Conócenos</a>
            <a href="/#contacto"   className={navItemClass}>Contáctanos</a>
            <Link to="/trabaja"    className={navItemClass}>Trabaja con Nosotros</Link>
          </nav>
        </div>
      </header>

      {/* Spacer: 0 al inicio del Home; en demás casos = altura del header */}
      <div aria-hidden style={{ height: atTop ? 0 : headerH }} />

      <MobileMenu open={open} onClose={() => setOpen(false)} linkClass={linkClass} />
    </>
  );
}