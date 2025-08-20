// Header.jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ============= Drawer móvil ============= */
function MobileMenu({ open, onClose, linkClass }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 h-screen bg-black/50 z-[998] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            className="fixed right-0 top-0 h-screen w-72 max-w-[80%] z-[999] lg:hidden
                       bg-[#167c88] shadow-xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
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
                <a href="#servicios" className={`${linkClass} text-[#167c88] hover:bg-[#167c88]/5`} onClick={onClose}>Servicios</a>
                <a href="#conocenos" className={`${linkClass} text-[#167c88] hover:bg-[#167c88]/5`} onClick={onClose}>Conócenos</a>
                <a href="#contacto"  className={`${linkClass} text-[#167c88] hover:bg-[#167c88]/5`} onClick={onClose}>Contáctanos</a>
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ============= Header fijo con efecto on scroll ============= */
export default function Header({ logoScrolled }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const [spacerH, setSpacerH] = useState(68); // fallback

  // Efecto de scroll (bg + blur + sombra cuando bajas)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Medir altura y actualizar --header-h (para anchors)
  useLayoutEffect(() => {
    const measure = () => {
      const h = headerRef.current?.offsetHeight || 68;
      setSpacerH(h);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Lock scroll + compensar scrollbar
  useEffect(() => {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = sbw ? `${sbw}px` : "";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  const active = typeof logoScrolled === "boolean" ? logoScrolled : scrolled;
  const linkClass = "block px-5 py-4 text-lg font-semibold uppercase tracking-wider leading-none";

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "fixed top-0 left-0 right-0 z-[70] w-full transition-colors duration-500",
          // ⬇️ Altura actual - 5mm ≈ 19px (en móvil y desktop)
          "min-h-[calc(68px-19px)] lg:min-h-[calc(80px-19px)]",
          // Centrado vertical real de TODO el contenido
          "flex items-center"
        ].join(" ")}
        style={{ paddingTop: "max(0px, env(safe-area-inset-top))", ...(active ? {} : {}) }}
      >
        <div className="max-w-7xl mx-auto h-full w-full flex items-center justify-between px-4 sm:px-6">
          {/* Si tienes un logo, colócalo aquí (izquierda). 
              El contenedor ya centra verticalmente */}
          {/* <a href="#hero" className="flex items-center leading-none">
            <img src="/logo.svg" alt="Promedia" className="h-7 md:h-8" />
          </a> */}

          {/* Desktop nav (derecha) */}
          <nav className="hidden lg:flex h-full items-center space-x-10 text-sm font-medium uppercase tracking-wider text-[#167c88] leading-none">
            <a href="#servicios" className="hover:underline">Servicios</a>
            <a href="#conocenos" className="hover:underline">Conócenos</a>
            <a href="#contacto"  className="hover:underline">Contáctanos</a>
          </nav>

          {/* Botón móvil */}
          <button
            className="lg:hidden ml-auto inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#167c88]/60 text-[#167c88] hover:bg-[#167c88]/10 transition leading-none"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18v2H3V6zm0 5.5h18v2H3v-2zM3 17h18v2H3v-2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Spacer exacto (se recalcula solo) */}
      <div aria-hidden style={{ height: spacerH }} />

      <MobileMenu open={open} onClose={() => setOpen(false)} linkClass={linkClass} />
    </>
  );
}