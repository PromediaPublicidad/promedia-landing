import { useState } from 'react';
import { motion } from 'framer-motion';
import TitleSweep from '../components/TitleSweep';

const ROLES = [
  'Project Manager',
  'Community Manager',
  'Diseñador(a) Gráfico',
  'Operador de Imprenta',
  'Instalador',
  'Productor Audiovisual',
  'Asesor(a) de Ventas',
];

export default function TrabajaConNosotros() {
  const [status, setStatus] = useState({ type: 'idle', msg: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'Enviando…' });

    const form = new FormData(e.currentTarget);
    // Construimos payload simple (sin archivos) para el endpoint
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Error al enviar el formulario');
      setStatus({ type: 'success', msg: '¡Postulación enviada! Te contactaremos pronto.' });
      e.currentTarget.reset();
    } catch (err) {
      setStatus({ type: 'error', msg: 'No se pudo enviar. Intenta de nuevo en unos minutos.' });
    }
  };

  return (
    <section className="relative bg-[#0f1f25] text-white overflow-x-clip">
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#167c88]/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-24 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">
            <TitleSweep color="#167c88" dir="rtl" duration={1.0} textFrom="#167c88" textTo="#ffffff">
              Trabaja con Nosotros
            </TitleSweep>
          </h1>
          <p className="text-white/85 mt-4 max-w-3xl mx-auto">
            Cuéntanos sobre ti y a qué rol deseas postularte. Nos encantará conocer tu talento. 💼
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* Col 1 */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <label className="block text-sm text-white/80 mb-1">Nombre completo *</label>
              <input name="name" required className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#167c88]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">Email *</label>
                <input type="email" name="email" required className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#167c88]" />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Teléfono / WhatsApp</label>
                <input name="phone" className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#167c88]" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Rol al que postulas *</label>
              <select name="role" required className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#167c88]">
                <option value="">Selecciona un rol</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Portafolio / LinkedIn / CV (URL)</label>
              <input type="url" name="portfolio" placeholder="https://..." className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#167c88]" />
            </div>
          </div>

          {/* Col 2 */}
          <div className="lg:col-span-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">¿Reside en Panamá? *</label>
                <select name="residesPanama" required className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#167c88]">
                  <option value="">Selecciona</option>
                  <option>Sí</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Años de experiencia</label>
                <input type="number" min="0" name="experienceYears" className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#167c88]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">Disponibilidad</label>
                <select name="availability" className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#167c88]">
                  <option value="">Selecciona</option>
                  <option>Inmediata</option>
                  <option>2 semanas</option>
                  <option>1 mes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Modalidad preferida</label>
                <select name="modality" className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#167c88]">
                  <option value="">Selecciona</option>
                  <option>Presencial</option>
                  <option>Híbrido</option>
                  <option>Remoto</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Pretensión salarial (USD)</label>
              <input name="salary" className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#167c88]" />
            </div>
          </div>

          {/* Mensaje col-12 */}
          <div className="lg:col-span-12">
            <label className="block text-sm text-white/80 mb-1">Mensaje</label>
            <textarea name="message" rows="5" className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 outline-none focus:ring-2 focus:ring-[#167c88]" placeholder="Háblanos de tu experiencia, logros o lo que te gustaría aportar en Promedia." />
          </div>

          {/* Consent + submit */}
          <div className="lg:col-span-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <label className="inline-flex items-start gap-3 text-white/85">
              <input type="checkbox" name="consent" required className="mt-1 accent-[#167c88]" />
              <span className="text-sm">
                Acepto que Promedia procese mis datos para fines de reclutamiento. Puedo solicitar su eliminación cuando quiera.
              </span>
            </label>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-6 h-12 rounded-xl bg-[#167c88] text-white font-semibold hover:bg-[#125f66] transition"
              disabled={status.type === 'loading'}
            >
              {status.type === 'loading' ? 'Enviando…' : 'Enviar postulación'}
            </motion.button>
          </div>

          {/* Alertas */}
          {status.type === 'success' && (
            <div className="lg:col-span-12 text-sm text-emerald-300">
              {status.msg}
            </div>
          )}
          {status.type === 'error' && (
            <div className="lg:col-span-12 text-sm text-rose-300">
              {status.msg}
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}