// src/App.jsx
import { Routes, Route } from 'react-router-dom';
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
  return (
    <>
      {/* Header fijo en todas las páginas */}
      <Header />

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trabaja" element={<TrabajaConNosotros />} />
      </Routes>
    </>
  );
}
