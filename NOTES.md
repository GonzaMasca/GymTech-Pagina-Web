# Notas del proyecto — GymTech

Resumen de referencias, decisiones y pendientes usados para armar el sitio.
No es documentación de código (eso está en `DESIGN.md` y en los propios
archivos); esto es el "por qué" y el "con qué" detrás de las decisiones.

## Qué es GymTech

Local de equipamiento de gimnasio (líneas **Fox** y **Movement**) y servicio
técnico, en Gran Mendoza. El sitio es una landing de una sola página:
hero, catálogo Fox, catálogo Movement, servicio técnico, formulario de
contacto y footer.

## Material de referencia usado

- **`Prototipo Inicial GymTech.pdf`** — brief/prototipo inicial con la idea
  original del sitio.
- **`FireShot/Pagina DeporAr GYM.pdf`** y **`FireShot/Pagina FOX GYM.pdf`** —
  capturas de páginas de competidores/proveedores, usadas como referencia
  de contenido y presentación de catálogo.
- **`DESIGN.md`** — sistema de diseño de referencia (colores, tipografía)
  basado en un análisis del sitio de Nike. Se usó como guía de estilo
  (contraste tipográfico, paleta casi monocromática con acentos), no es
  contenido propio de GymTech.

## Estructura de contenido del sitio (`index.html`)

- **Hero**: video de fondo `Videos/hero-gymyech1.mp4` (3.6 MB, con poster
  de imagen si el navegador tiene `prefers-reduced-motion` activado).
- **Catálogo Fox** (`Imagenes/fox/`): Cinta Runner PRO, Bicicleta Fija
  FX-55, Prensa 45°, Súper Squat, Sillón de Cuádriceps FX-MAX, Multipress
  Rotativo FX. Termina con tarjeta "Catálogo completo Fox" + botón de
  WhatsApp con mensaje prearmado.
- **Catálogo Movement** (`Imagenes/movement/`): Up Run+, Up Run, X 4.6
  TSI+, Aria iLED 3.0, T300i Connect, T300 Connect. Misma tarjeta final,
  adaptada a "Movement".
- Bajo cada descripción de sección: línea "Esta es una selección de
  modelos. Consultá por el resto de la línea" con link a WhatsApp.
- **Servicio técnico**: pasos (contacto → diagnóstico → reparación in
  situ → garantía) y zona de cobertura (Gran Mendoza).
- **Formulario de contacto**: envía por WhatsApp (no hay backend).
- **Footer** y **botón flotante de contacto**: al tocarlo despliega dos
  opciones, WhatsApp y Email (`mailto:gymtech@gmail.com`). Se cierra con
  la X, tocando afuera o con Escape.
- **Menú móvil (hamburguesa)**: oscurece el resto de la pantalla y se
  cierra tocando cualquier lugar fuera del panel, con la X o eligiendo
  una sección.

## Pendientes conocidos

1. **Número de WhatsApp real.** Hoy todo el sitio usa el placeholder
   `+54 9 261 000-0000` (`wa.me/5492610000000`) en 7 lugares: formulario,
   botón flotante, footer, y los 2 links de "catálogo completo" + las 2
   líneas "consultá por el resto de la línea" (Fox y Movement).
2. **Video sin usar**: `Videos/hero-gymtech.mp4` (16.6 MB) quedó
   reemplazado por `hero-gymyech1.mp4` y no se usa. No se subió al repo
   (ver `.gitignore`).
3. **Nombre de archivo con typo**: `hero-gymyech1.mp4` (dice "yech" en vez
   de "tech"). Se dejó así a propósito para no romper el link; renombrar
   si se quiere prolijidad.
4. **Calidad del video**: es 1024×576, se ve algo blando en pantallas
   grandes (el degradado oscuro del hero lo disimula). Ideal: 1920×1080
   de peso similar.
5. **Video con `prefers-reduced-motion` apagado**: si el visitante tiene
   desactivadas las animaciones del sistema, ve el poster en vez del
   video (comportamiento de accesibilidad intencional). Si se prefiere
   que casi todos vean el video igual, se puede agregar un botón de
   pausa visible y mostrar el video siempre.

## Qué no se subió al repo (y por qué)

Ver `.gitignore`:
- `node_modules/` — se regenera con `npm install` (dependencia:
  `@playwright/test`, usada para verificar el sitio, no para producción).
- `.claude/` — configuración local de Claude Code, no es parte del sitio.
- `Videos/hero-gymtech.mp4` — video viejo sin uso (16.6 MB).
- Grabación de pantalla de 77 MB dentro de `Videos/` — no es un asset del
  sitio.

## Repo

`https://github.com/GonzaMasca/GymTech-Pagina-Web` — rama `main`. Esta
misma carpeta (`C:\Users\gonza\Documents\GONZALO\GYMTECH`) es el repo
local, ya conectada a ese remoto.
