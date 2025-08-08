export default function Header({ logoScrolled }) {
  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all ${
        logoScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-end items-center px-8">
        <nav className="space-x-8 text-sm font-medium uppercase tracking-wider text-[#167c88]">
          <a href="#servicios" className="hover:underline">Servicios</a>
          <a href="#conocenos" className="hover:underline">Conócenos</a>
          <a href="#contacto" className="hover:underline">Contáctanos</a>
        </nav>
      </div>
    </header>
  );
}