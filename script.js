/* =========================================================
   GYMTECH — script.js
   Menú móvil, scroll header, nav activo, reveal on scroll,
   formulario -> WhatsApp, back to top
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Preloader ---------- */
  window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function () { preloader.classList.add('is-hidden'); }, 250);
    }
  });

  /* ---------- Video del hero: respeta prefers-reduced-motion ---------- */
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var heroVideo = document.querySelector('.hero__video');
      if (heroVideo) heroVideo.remove();
    }
  } catch (e) {}

  /* ---------- Año dinámico en footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: sombra/fondo al hacer scroll ---------- */
  var header = document.getElementById('header');
  var backToTop = document.getElementById('back-to-top');

  function onScroll() {
    var scrolled = window.scrollY > 40;
    if (header) header.classList.toggle('is-scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil (hamburguesa) ---------- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Nav activo según sección visible ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active-link', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------- Animaciones al hacer scroll (reveal) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, (i % 6) * 70);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Botón "volver arriba" ---------- */
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Formulario de contacto -> WhatsApp ---------- */
  var WHATSAPP_NUMBER = '5492610000000'; // TODO: reemplazar por el número real (código de país + área + número, sin + ni espacios)

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var motivo = form.motivo.value;
      var message = form.message.value.trim();

      if (!name || !phone || !message) return;

      var text =
        'Hola Gymtech! Mi nombre es ' + name + '.\n' +
        'Motivo de consulta: ' + motivo + '.\n' +
        'Mensaje: ' + message + '\n' +
        'Mi teléfono de contacto: ' + phone;

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
      form.reset();
    });
  }

  /* ---------- Cerrar menú móvil al agrandar ventana ---------- */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeMenu();
  });

  /* ---------- Carruseles (Fox / Movement) ----------
     Swipe: scroll nativo con scroll-snap (funciona solo en mobile, sin JS).
     Flechas: desplazan el track un "card + gap" por click.
     Teclado: flechas izq/der cuando el track tiene foco.
     Sin autoplay. */
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('.carousel__track');
    var prevBtn = root.querySelector('.carousel__btn--prev');
    var nextBtn = root.querySelector('.carousel__btn--next');
    if (!track) return;

    function cardStep() {
      var card = track.querySelector('.carousel-card');
      if (!card) return track.clientWidth * 0.8;
      var trackStyle = window.getComputedStyle(track);
      var gap = parseFloat(trackStyle.columnGap || trackStyle.gap || '0') || 0;
      return card.getBoundingClientRect().width + gap;
    }

    function scrollByDir(dir) {
      track.scrollBy({ left: dir * cardStep(), behavior: 'smooth' });
    }

    function updateButtons() {
      var maxScroll = track.scrollWidth - track.clientWidth - 1;
      if (prevBtn) prevBtn.disabled = track.scrollLeft <= 0;
      if (nextBtn) nextBtn.disabled = maxScroll <= 0 || track.scrollLeft >= maxScroll;
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByDir(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByDir(1); });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollByDir(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByDir(-1); }
    });

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
  });

})();
