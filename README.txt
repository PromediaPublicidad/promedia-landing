Promedia Landing – README

Landing corporativa de Promedia construida con React + Vite, Tailwind CSS y Framer Motion. Incluye hero con video, secciones de “Nosotros”, “Equipo”, “Servicios” con galería dinámica sin 404, alianzas en marquee fluido, collage de trabajos, “Conócenos” y footer con mapa. Diseño responsive, header sticky con efecto al hacer scroll y logo flotante animado.

Tecnologías

React 18 + Vite

Tailwind CSS

Framer Motion

Lucide-React y react-icons (iconografía)

Despliegue recomendado: Vercel

Requisitos

Node.js 18 o 20 (recomendado usar nvm)

npm / pnpm / yarn

# sugerido
nvm use 20

Instalar y correr
# instalar dependencias
npm install

# entorno local
npm run dev

# build producción
npm run build
npm run preview

Estructura del proyecto (resumen)
src/
  components/
    Header.jsx
    Hero.jsx
    Nosotros.jsx
    Equipo.jsx
    Servicios.jsx
    Alianzas.jsx
    CollageTrabajos.jsx
    Conocenos.jsx
    Footer.jsx
    WhatsAppButton.jsx
    SocialSticky.jsx
    TitleSweep.jsx
  assets/
    fonts/
      Avenir-Light.ttf
public/
  hero-video.mp4
  logos/
  team/
  services/
    <slug>/
      1.jpg, 2.jpg, ...
  alliances/
  works/
index.css
App.jsx

Comportamiento global y CSS

Resets y “guardrails” en index.css:

Sin scroll horizontal global (overflow-x: clip).

Anclas con offset para header sticky (scroll-margin-top: var(--header-h)).

Medios no rompen layout (img,video,svg { max-width:100% }).

Imágenes no “abribles” accidentalmente:

Global: img, video { pointer-events: none; -webkit-user-drag: none; user-select: none; }

Nota: esto dificulta abrir/arrastrar, pero no impide capturas o inspección.

Logo flotante animado en App.jsx (cambia tamaño/posición con scroll).

Header sticky (Header.jsx): blur, sombra y fondo al hacer scroll. Menú móvil con drawer (portal).

Sección: Hero (Hero.jsx)

Video de fondo (cover), capa oscura y título con barra animada.

En móvil el video se escala para verse más atractivo (ajustes CSS/condicionales).

El bloque de texto puede desplazarse verticalmente con márgenes utilitarios (ej. mt-14, md:mt-24). Ya está aplicado un offset adicional para evitar choque con el logo en horizontal.

Editar video: reemplaza /public/hero-video.mp4.
Texto/Botón: editar strings dentro del componente.

Sección: Nosotros (Nosotros.jsx)

Layout dos columnas, título animado y párrafos justificados.

Imagen desde /public/nosotros.jpg.

Sección: Equipo (Equipo.jsx)
Categorías

Tabs: Marketing, Asesoras, Producción, Gerencia (Cristel movida a Gerencia).

Marketing y Asesoras se muestran en grid centrado (1–3 columnas).

Producción usa marquee infinito horizontal (loop suave, sin scrollbar visible).

CEO Spotlight: tarjeta destacada; solo la IMAGEN del CEO se desplaza hacia arriba (shiftY = -10) para evitar corte.

Ajuste fino de recortes (dev)

INITIAL_TWEAKS mapea id → { shiftY, zoom } por persona.

Activa el editor visual agregando ?tuneTeam=1 a la URL.

Permite variar shiftY (mueve imagen dentro del marco) y zoom.

Botón “Copiar JSON” genera el bloque para pegar de vuelta en INITIAL_TWEAKS.

// ejemplo dentro de INITIAL_TWEAKS
{
  1: { shiftY: 18, zoom: 1.00 }, // CEO (además se fuerza -10 en el spotlight)
  6: { shiftY: 4,  zoom: 0.96 }, // Giuli...
}


Tip: shiftY en %: positivo baja la foto, negativo la sube. zoom < 1 aleja.

Sección: Servicios (Servicios.jsx)

Galería sin 404 usando descubrimiento de imágenes en /public/services/<slug>/.

Cómo agregar/editar un servicio

Crear carpeta con el slug (p. ej. instalaciones) en public/services/instalaciones/.

Agregar imágenes numeradas (1.jpg, 2.jpg, …).

O define la lista exacta en KNOWN_PUBLIC_FILES para ese slug si no quieres seguir numeración.

Agregar entrada en el array servicios:

{ icon: <Wrench size={28} />, title: 'Instalaciones', desc: '...', slug: 'instalaciones' }


Agregar meta (descripción y tags) en meta:

instalaciones: {
  descripcion: 'Montaje profesional en sitio: medición, fijación segura y acabados limpios para que tus piezas luzcan perfectas.',
  tags: ['Levantamiento','Vinilos','Backlights','Estructuras','Altura','Garantía']
}

Control de recorte de imágenes del collage

Por defecto, cada Tile usa object-cover (rellena manteniendo proporción).
Si prefieres que no recorte, pasa contain={true} al Tile.

Avanzado (opcional): puedes añadir un mapa SHIFTY_SERVICIOS por slug/índice para “subir/bajar” una imagen específica del collage (similar a Equipo). Si te interesa, te dejo snippet listo para pegar.

Sección: Alianzas (Alianzas.jsx)

Marquee infinito con Framer Motion (sin mask-image para evitar glitches a 90% zoom).

Altura controlada de logos (h-12 / h-14 / h-16 responsive).
Para otro alto (p. ej. ~2 cm en desktop), ajusta clases h-*.

Sección: CollageTrabajos (CollageTrabajos.jsx)

Tres tiras horizontales en bucle (izq→der / der→izq).

Cada tarjeta usa object-contain para mostrar la imagen completa.

Sección: Conócenos (Conocenos.jsx)

Título con sweep RTL (coincide exacto con ancho del texto).

Párrafos centrados y justificados.

Footer (Footer.jsx)

Datos de contacto, botones a WhatsApp y Google Maps.

Mapa embebido (iframe) con ubicación de la empresa.

Accesos directos útiles

Editor de Equipo: https://tu-sitio.com/?tuneTeam=1

Anclas con offset: los ids de sección (#servicios, #conocenos, #contacto, etc.) se corrigen con scroll-margin-top para no quedar detrás del header.

Deploy (Vercel)

Conecta el repo (GitHub).

Elige framework Vite (auto-detecta).

Build command: vite build (por defecto).

Output: dist.

Variables de entorno: no requeridas actualmente (WhatsApp/Map están hardcodeadas). Si piensas parametrizarlas, pásalas como VITE_*.

Troubleshooting

Línea blanca al lado/scroll lateral: ya está mitigado con overflow-x: clip global y contenedores con padding consistente.

Header solapando anclas: se usa scroll-margin-top: var(--header-h).

Logos/imagenes gigantes: controlar con clases h-* y object-contain.

Video en móvil “cortado”: se aplican escalas/posición responsive; si cambias el video, verifica el encuadre en móvil horizontal.

Mantenimiento / Hand-off

Mantén /public completo (logos, videos, services, team, alliances, works).

Documenta versiones en README (este archivo) y considera agregar .nvmrc:

# .nvmrc
20

Licencia

Proyecto interno de Promedia. Uso privado.