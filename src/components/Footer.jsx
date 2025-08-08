import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import TitleSweep from "../components/TitleSweep";

export default function Footer() {
  const EMAIL = "promarketing@promediapublicidad.com";
  const PHONE = "+507 6894-0670";
  const PHONE_LINK = "tel:+50768940670";
  const ADDRESS = "Vía Brasil, Panamá, Provincia de Panamá";

  const WHATS_LINK =
    "https://wa.me/50768940670?text=Hola%20Promedia%2C%20quiero%20informaci%C3%B3n";
  const MAP_LINK = "https://maps.app.goo.gl/9LqSAwUkpeuq6YtFA";

  const MAP_EMBED =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7881.664953051242!2d-79.51385399999997!3d8.987558199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca9be6b09d0cd%3A0xac89c4e92d2e4218!2sPromedia%20Publicidad!5e0!3m2!1ses!2spa!4v1754685134154!5m2!1ses!2spa";

  return (
    <footer id="contacto" className="bg-[#0f1f25] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Columna de contacto */}
<div className="flex flex-col items-center md:items-start md:justify-center md:pl-24">
  <h3 className="text-center md:text-left text-2xl md:text-3xl font-bold mb-6">
    <TitleSweep
      color="#167c88"
      dir="ltr"
      duration={1.0}
      textFrom="#167c88"
      textTo="#ffffff"
    >
      Contáctanos
    </TitleSweep>
  </h3>

  <ul className="space-y-4 text-white/90">
    <li className="flex items-start gap-3">
      <MdEmail className="text-[#167c88] mt-1" size={22} />
      <a href={`mailto:${EMAIL}`} className="hover:underline">
        {EMAIL}
      </a>
    </li>
    <li className="flex items-start gap-3">
      <MdPhone className="text-[#167c88] mt-1" size={22} />
      <a href={PHONE_LINK} className="hover:underline">
        {PHONE}
      </a>
    </li>
    <li className="flex items-start gap-3">
      <MdLocationOn className="text-[#167c88] mt-1" size={22} />
      <span>{ADDRESS}</span>
    </li>
  </ul>

  {/* Botones */}
  <div className="mt-6 flex flex-wrap gap-3">
    <a
      href={WHATS_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[#167c88] text-[#167c88] hover:bg-[#167c88] hover:text-white transition"
    >
      WhatsApp
    </a>
    <a
      href={MAP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition"
    >
      Ver en Google Maps
     </a>
     </div>
    </div>
        {/* Columna de mapa */}
        <div className="w-full h-[300px] md:h-[350px] rounded-lg overflow-hidden shadow-lg ring-1 ring-white/10">
          <iframe
            title="Ubicación Promedia"
            src={MAP_EMBED}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-12 border-t border-white/20 pt-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} Promedia. Todos los derechos reservados.
      </div>
    </footer>
  );
}