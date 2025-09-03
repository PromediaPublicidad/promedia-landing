// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Servicios from "./components/Servicios";
import Conocenos from "./components/Conocenos";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Equipo from "./components/Equipo.jsx";
import SocialSticky from "./components/SocialSticky";
import Nosotros from "./components/Nosotros.jsx";
import Alianzas from "./components/Alianzas";
import CollageTrabajos from "./components/CollageTrabajos";
import TrabajaConNosotros from "./pages/TrabajaConNosotros";

import "./index.css";

function Landing() {
  return (
    <>
      <Hero />
      <Nosotros />
      <Equipo />
      <Servicios />
      <Alianzas />
      <CollageTrabajos />
      <Conocenos />
      <Footer />
      <WhatsAppButton />
      <SocialSticky />
    </>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Controla la visibilidad del logo flotante en el home
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Ocultamos el logo flotante apenas el header aparece (umbral = 8px)
  const HIDE_AT = 8;
  const showFloating = isHome && scrollY <= HIDE_AT;

  return (
    <>
      {/* Header fijo (tu Header ya se oculta al inicio del home y aparece al scrollear) */}
      <Header />

      {/* Logo flotante SOLO en home y SOLO antes de que aparezca el header */}
      <AnimatePresence>
        {showFloating && (
          <motion.img
            key="float-logo"
            src="/logos/logo.png"         // si prefieres usa /logos/Pro.png
            alt="Promedia"
            className="fixed z-50 top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0, top: 100, width: 420 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            draggable={false}
          />
        )}
      </AnimatePresence>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trabaja" element={<TrabajaConNosotros />} />
        {/* alias opcional que ya usas en el header */}
        <Route path="/unete" element={<TrabajaConNosotros />} />
      </Routes>
    </>
  );
}