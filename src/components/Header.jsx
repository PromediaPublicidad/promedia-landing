import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ logoScrolled }) {
  const [open, setOpen] = useState(false);

  // Bloquea el scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const linkClass =
    "block px-4 py-3 text-lg font-medium uppercase tracking-wider hover:underline";

  return (
    <header
      className={`transition-all duration-500 fixed top-0 w-full z-40 ${
        logoScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-end px-4 sm:px-6">
        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-wider text-[#167c88]">
          <a href="#servicios" className="hover:underline">Servicios</a>
          <a href="#conocenos" className="hover:underline">Conócenos</a>
          <a href="#contacto" className="hover:underline">Contáctanos</a>
        </nav>

        {/* Mobile: botón hamburguesa */}
        <button
          className="md:hidden ml-2 inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#167c88]/40 text-[#167c88] hover:bg-[#167c88]/10 transition"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          {/* ícono hamburguesa */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6h18v2H3V6zm0 5.5h18v2H3v-2zM3 17h18v2H3v-2z" />
          </svg>
        </button>
      </div>

      {/* Mobile menu (drawer) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <motion.aside
              className={`fixed right-0 top-0 h-full w-72 max-w-[80%] z-[60] md:hidden
                          ${logoScrolled ? "bg-white/95 backdrop-blur" : "bg-white/95 backdrop-blur"}
                          border-l border-black/5 shadow-xl`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-[#167c88] font-semibold tracking-wide uppercase">
                  Menú
                </span>
                <button
                  aria-label="Cerrar menú"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#167c88] hover:bg-[#167c88]/10 transition"
                  onClick={() => setOpen(false)}
                >
                  {/* ícono cerrar */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.3 5.71L12 12.01l-6.3-6.3-1.4 1.41 6.3 6.29-6.3 6.3 1.4 1.41 6.3-6.3 6.29 6.3 1.41-1.41-6.3-6.3 6.3-6.29z"/>
                  </svg>
                </button>
              </div>

              <nav className="mt-2 text-[#167c88]">
                <a href="#servicios" className={linkClass} onClick={() => setOpen(false)}>
                  Servicios
                </a>
                <a href="#conocenos" className={linkClass} onClick={() => setOpen(false)}>
                  Conócenos
                </a>
                <a href="#contacto" className={linkClass} onClick={() => setOpen(false)}>
                  Contáctanos
                </a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}