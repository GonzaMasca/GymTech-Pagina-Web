# Notas del proyecto — GymTech

Resumen de referencias, decisiones y pendientes usados para armar el sitio.
No es documentación de código (eso está en `DESIGN.md` y en los propios
archivos); esto es el "por qué" y el "con qué" detrás de las decisiones.

## Qué es GymTech

Local de equipamiento de gimnasio (líneas **Fox** y **Movement**) en Gran
Mendoza. El sitio es una landing de una sola página: hero, nosotros,
catálogo Fox, catálogo Movement, "Próximamente: servicio técnico a
domicilio", formulario de contacto y footer.

**Servicio técnico a domicilio: todavía no existe** (lo confirmó el
cliente). Por eso la página no promete reparaciones ni visitas; solo lo
anuncia como "Próximamente". La versión completa, con todo lo del servicio
(pasos, zonas de cobertura, garantía, respuesta en 24 hs, franja de datos
del hero, sección "Por qué confían"), está guardada en
`BACKUP-VERSION-COMPLETA-SERVICIOTECN/` (solo local, abre sola en el
navegador) y en la rama `version-completa-servicio-tecnico` del repo
(commit `a4756dc`). Los estilos de esos bloques
siguen en `style.css` para que reactivarlos sea volver a pegar el HTML.

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

- **Hero**: video de fondo `Videos/hero-gymtech-1080.mp4` (1920×1080,
  H.264, 4.3 MB, sin audio, con el índice al inicio para que arranque
  rápido), con poster de imagen si el navegador tiene
  `prefers-reduced-motion` activado. Se generó con ffmpeg desde la fuente
  original `Videos/hero-gymtech.mp4` (1080p en H.265, 16.6 MB, que Chrome,
  Edge y Firefox no reproducen de forma confiable):
  `ffmpeg -i hero-gymtech.mp4 -an -c:v libx264 -preset slow -crf 24 -profile:v high -level 4.0 -pix_fmt yuv420p -color_primaries bt709 -color_trc bt709 -colorspace bt709 -movflags +faststart hero-gymtech-1080.mp4`.
  Se usa el mismo archivo en celular: en vertical el video cubre toda la
  altura de la pantalla, así que una versión de 720p se vería peor.
- **Catálogo Fox** (`Imagenes/fox/`): Cinta Runner PRO, Bicicleta Fija
  FX-55, Prensa 45°, Súper Squat, Sillón de Cuádriceps FX-MAX, Multipress
  Rotativo FX. Termina con tarjeta "Catálogo completo Fox" + botón de
  WhatsApp con mensaje prearmado.
- **Catálogo Movement** (`Imagenes/movement/`): Up Run+, Up Run, X 4.6
  TSI+, Aria iLED 3.0, T300i Connect, T300 Connect. Misma tarjeta final,
  adaptada a "Movement".
- Bajo cada descripción de sección: línea "Esta es una selección de
  modelos. Consultá por el resto de la línea" con link a WhatsApp.
- **Próximamente** (`#proximamente`): tarjeta azul que anuncia el servicio
  técnico a domicilio. No figura en la navbar.
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
2. **El logo dice "SERVICIO TÉCNICO"** (y tiene una llave inglesa). Es la
   imagen `Imagenes/Logo GYMTechRecortado.jpeg`, usada en el header, el
   preloader, el footer y como imagen al compartir el link. Mientras el
   servicio no exista, conviene que el cliente decida si usar una versión
   del logo sin esa leyenda.
3. **Video con `prefers-reduced-motion` apagado**: si el visitante tiene
   desactivadas las animaciones del sistema, ve el poster en vez del
   video (comportamiento de accesibilidad intencional). Si se prefiere
   que casi todos vean el video igual, se puede agregar un botón de
   pausa visible y mostrar el video siempre.

## Qué no se subió al repo (y por qué)

Ver `.gitignore`:
- `node_modules/` — se regenera con `npm install` (dependencia:
  `@playwright/test`, usada para verificar el sitio, no para producción).
- `.claude/` — configuración local de Claude Code, no es parte del sitio.
- `Videos/hero-gymtech.mp4` — fuente original en H.265 (16.6 MB); la
  página usa la versión convertida `hero-gymtech-1080.mp4`.
- `Videos/hero-gymyech1.mp4` — video anterior del hero (1024×576). Ya no
  lo usa `main`; sigue en la rama `version-completa-servicio-tecnico` y en
  el backup local.
- `BACKUP-VERSION-COMPLETA-SERVICIOTECN/` — copia local de la versión con
  servicio técnico; en el repo esa versión está en la rama
  `version-completa-servicio-tecnico`.
- Grabación de pantalla de 77 MB dentro de `Videos/` — no es un asset del
  sitio.

## Repo

`https://github.com/GonzaMasca/GymTech-Pagina-Web`. Esta misma carpeta
(`C:\Users\gonza\Documents\GONZALO\GYMTECH`) es el repo local, ya
conectada a ese remoto. Dos ramas:

- `main` — versión actual, la que se publica: sin servicio técnico, con
  el apartado "Próximamente".
- `version-completa-servicio-tecnico` — versión completa con el servicio
  técnico a domicilio, congelada para cuando se lance. No mergearla a
  `main` (ignorar el aviso de GitHub de crear un pull request).
