// src/pages/TrabajaConNosotros.jsx
import { useState } from "react";
import { motion } from "framer-motion";

const brand = "#167c88";

function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold uppercase tracking-wider text-slate-700"
    >
      {children}
    </label>
  );
}

function Input({ id, type = "text", ...props }) {
  return (
    <input
      id={id}
      type={type}
      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none ring-0 focus:border-transparent focus:ring-4"
      style={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)", "--tw-ring-color": brand }}
      {...props}
    />
  );
}

function Select({ id, children, ...props }) {
  return (
    <select
      id={id}
      className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-transparent focus:ring-4"
      style={{ "--tw-ring-color": brand }}
      {...props}
    >
      {children}
    </select>
  );
}

function TextArea({ id, rows = 5, ...props }) {
  return (
    <textarea
      id={id}
      rows={rows}
      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-transparent focus:ring-4"
      style={{ "--tw-ring-color": brand }}
      {...props}
    />
  );
}

function FileUpload({ id, onChange }) {
  return (
    <div className="mt-2">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-slate-300 bg-white/70 px-4 py-3 text-slate-700 hover:border-slate-400 hover:bg-white transition"
      >
        <span className="inline-flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.59 2.59a2 2 0 012.82 0l4 4a2 2 0 010 2.82l-9 9A5.002 5.002 0 016 21H5a1 1 0 110-2h1a3 3 0 002.12-.88l9-9-2.12-2.12-6.88 6.88a1 1 0 11-1.41-1.41l7.88-7.88z"/>
          </svg>
          <span className="font-medium">Adjuntar CV (PDF / DOCX)</span>
        </span>
        <span className="text-xs text-slate-500">Tamaño máx. 10MB</span>
      </label>
      <input id={id} type="file" className="sr-only" onChange={onChange} />
    </div>
  );
}

export default function TrabajaConNosotros() {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    // TODO: envía a tu backend o servicio de forms
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setDone(true);
    e.currentTarget.reset();
    setTimeout(() => setDone(false), 2500);
  }

  return (
    <div className="relative min-h-[calc(100vh-var(--header-h))]">
      {/* Fondo “wow” */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#167c88]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 mx-auto h-24 w-[70%] rounded-b-[40px] bg-white/60 backdrop-blur-md" />
      </div>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto mb-8 max-w-3xl text-center"
        >
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Trabaja con <span className="text-[#167c88]">Nosotros</span>
          </h1>
          <p className="mt-3 text-slate-600">
            Cuéntanos quién eres y en qué te gustaría sumar. Amamos el talento con iniciativa.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl p-5 sm:p-6 lg:p-8 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
        >
          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" name="name" placeholder="Tu nombre y apellidos" required />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="tucorreo@ejemplo.com" required />
            </div>

            <div>
              <Label htmlFor="phone">Teléfono / WhatsApp</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+507 ..." />
            </div>

            <div>
              <Label htmlFor="area">Área de interés</Label>
              <Select id="area" name="area" defaultValue="" required>
                <option value="" disabled>Selecciona un área</option>
                <option>Marketing</option>
                <option>Asesoras</option>
                <option>Producción</option>
                <option>Gerencia</option>
                <option>Otra</option>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="portfolio">Portafolio / LinkedIn</Label>
              <Input id="portfolio" name="portfolio" type="url" placeholder="https://..." />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="cv">Currículum</Label>
              <FileUpload id="cv" onChange={() => {}} />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="message">¿Qué te gustaría aportar al equipo?</Label>
              <TextArea id="message" name="message" placeholder="Cuéntanos brevemente tu motivación, logros y metas…" />
            </div>

            {/* Checkbox simple de consentimiento */}
            <div className="sm:col-span-2">
              <label className="inline-flex items-start gap-3 select-none">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#167c88] focus:ring-[#167c88]"
                  required
                />
                <span className="text-sm text-slate-600">
                  Acepto que Promedia trate estos datos para fines de selección (puedo revocar cuando quiera).
                </span>
              </label>
            </div>
          </div>

          {/* Botón */}
          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center rounded-xl bg-[#167c88] px-5 py-3 text-white font-semibold uppercase tracking-wider shadow-lg shadow-[#167c88]/30 hover:shadow-[#167c88]/40 hover:brightness-110 active:scale-[.98] transition disabled:opacity-60"
            >
              {sending ? (
                <>
                  <svg className="mr-2 animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity=".25"/>
                    <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3"/>
                  </svg>
                  Enviando…
                </>
              ) : (
                "Enviar Postulación"
              )}
            </button>

            {done && (
              <span className="text-sm font-medium text-[#167c88]">
                ¡Listo! Te contactaremos si tu perfil encaja.
              </span>
            )}
          </div>
        </motion.form>

        {/* Footer pequeño de la página */}
        <p className="mt-6 text-center text-xs text-slate-500">
          *Esta página no solicita disponibilidad, años de experiencia, modalidad preferida ni pretensión salarial.
        </p>
      </section>
    </div>
  );
}