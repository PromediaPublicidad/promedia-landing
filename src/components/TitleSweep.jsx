import { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * TitleSweep v2
 * Props:
 * - color: color del rectángulo (#167c88 por defecto)
 * - dir: "rtl" (derecha→izquierda) | "ltr" (izquierda→derecha)
 * - duration: duración del sweep en segundos (default 0.9)
 * - textFrom: color inicial del texto (ej. "#167c88")
 * - textTo: color final del texto cuando el rectángulo se ubica detrás (ej. "#ffffff")
 * - className: clases extra para el texto (tamaños, peso, etc.)
 */
export default function TitleSweep({
  color = "#167c88",
  dir = "rtl",
  duration = 0.9,
  textFrom = "#111111",
  textTo = "#ffffff",
  className = "",
  children,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const rectCtrl = useAnimation();
  const textCtrl = useAnimation();

  useEffect(() => {
    if (!inView) return;
    // Empieza el barrido
    rectCtrl.start({
      x: 0,
      transition: { duration, ease: "easeOut" },
    });
    // Cambia el color del texto cuando el rectángulo ya casi llegó
    textCtrl.start({
      color: textTo,
      transition: { duration: 0.2, delay: Math.max(0, duration * 0.65) },
    });
  }, [inView, rectCtrl, textCtrl, duration, textTo]);

  const startX = dir === "rtl" ? "100%" : "-100%";

  return (
    <span ref={ref} className="relative inline-block align-middle">
      {/* Rectángulo que barre detrás */}
      <motion.span
        initial={{ x: startX }}
        animate={rectCtrl}
        className="absolute top-1/2 left-0 w-full h-[1.4em] -translate-y-1/2 rounded-md"
        style={{ backgroundColor: color, opacity: 0.85, zIndex: 10 }}
        aria-hidden
      />
      {/* Texto con transición de color */}
      <motion.span
        initial={{ color: textFrom }}
        animate={textCtrl}
        className={`relative z-20 px-3 py-1 ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}