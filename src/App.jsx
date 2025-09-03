import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from './components/Header';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Conocenos from './components/Conocenos';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Equipo from './components/Equipo.jsx';
import SocialSticky from './components/SocialSticky';
import Nosotros from './components/Nosotros.jsx';
import Alianzas from './components/Alianzas';
import CollageTrabajos from './components/CollageTrabajos';

// Página nueva
import TrabajaConNosotros from './pages/TrabajaConNosotros';

import './index.css';

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
  const [logoScrolled, setLogoScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setLogoScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Logo flotante animado (persistente en todas las rutas) */}
      <motion.img
        src={logoScrolled ? '/logos/logo-dark.png' : '/logos/logo.png'}
        alt="Logo Promedia"
        className="fixed z-50 top-0 left-1/2 -translate-x-1/2"
        animate={{
          top: logoScrolled ? 1 : 100,
          width: logoScrolled ? 260 : 400,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        draggable={false}
      />

      {/* Header fijo (persistente) */}
      <motion.div
        className="fixed top-0 left-0 w-full z-40"
        initial={{ y: -100 }}
        animate={{ y: logoScrolled ? 0 : -100 }}
        transition={{ duration: 0.4 }}
      >
        <Header logoScrolled={logoScrolled} />
      </motion.div>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trabaja" element={<TrabajaConNosotros />} />
      </Routes>
    </>
  );
}