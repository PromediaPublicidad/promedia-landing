import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function SocialSticky() {
  const [whiteIcons, setWhiteIcons] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const alianzas = document.getElementById('alianzas');

    const check = () => {
      const y = window.innerHeight / 2; // centro de viewport
      const isIn = (el) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      };
      setWhiteIcons(isIn(hero) || isIn(alianzas));
    };

    check(); // evalúa al cargar
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  const icons = [
    { icon: <FaFacebookF size={20} />, link: 'https://facebook.com' },
    { icon: <FaTiktok size={20} />, link: 'https://tiktok.com' },
    { icon: <FaInstagram size={20} />, link: 'https://instagram.com' },
  ];

  const base =
    'p-3 rounded-full transition shadow-md hover:scale-110 bg-transparent';
  const light = 'border-2 border-white text-white';
  const teal = 'border-2 border-[#167c88] text-[#167c88]';

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed top-1/2 -translate-y-1/2 left-3 hidden md:flex flex-col gap-4 z-50"
    >
      {icons.map((item, i) => (
        <a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${whiteIcons ? light : teal}`}
        >
          {item.icon}
        </a>
      ))}
    </motion.div>
  );
}