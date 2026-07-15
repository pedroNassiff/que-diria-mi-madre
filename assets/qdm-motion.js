/**
 * QDM · Motion System v1.0
 * Heritage theme · GSAP + CSS custom animations
 *
 * Filosofía: quiet luxury — el movimiento sirve a la joya, no compite con ella.
 * - Solo transform + opacity (zero layout thrashing)
 * - Respeta prefers-reduced-motion
 * - Parallax desactivado en mobile
 * - Carga diferida de GSAP (solo si JS está disponible)
 */

// ─────────────────────────────────────────────────────────
// 0. CONSTANTS
// ─────────────────────────────────────────────────────────

const EASE_ENTER   = 'cubic-bezier(0.16, 1, 0.3, 1)';     // expo out — entradas de contenido
const EASE_HOVER   = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // ease out — hover suave
const EASE_UI      = 'cubic-bezier(0.4, 0, 0.2, 1)';       // material — nav, drawers
const DUR_REVEAL   = 700;   // ms — scroll reveal
const DUR_HERO     = 900;   // ms — hero text
const DUR_HOVER    = 450;   // ms — image zoom
const DUR_PAGE     = 180;   // ms — page fade out
const PARALLAX_Y   = 0.25;  // ratio — hero parallax (25% del scroll)
const STAGGER_GRID = 80;    // ms — stagger entre cards

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const IS_MOBILE = window.matchMedia('(max-width: 768px)').matches;

// ─────────────────────────────────────────────────────────
// 1. LENIS SMOOTH SCROLL
// ─────────────────────────────────────────────────────────

let lenis;

function initLenis() {
  if (REDUCED || IS_MOBILE) return; // scroll nativo en móvil y cuando se pide reducción

  // Lenis debe estar cargado via CDN antes de este script
  if (typeof Lenis === 'undefined') return;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  // Conectar con GSAP ticker si está disponible
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Pausar en transición de página
  document.addEventListener('qdm:page-leave', () => lenis.stop());
  document.addEventListener('qdm:page-enter', () => lenis.start());
}

// ─────────────────────────────────────────────────────────
// 2. SCROLL REVEAL — IntersectionObserver + data attributes
// ─────────────────────────────────────────────────────────
// Uso en Liquid:
//   <div data-reveal="fade-up" data-reveal-delay="0">...</div>
//   <div data-reveal="fade-up" data-reveal-delay="100">...</div>
//   <div data-reveal="fade-in">...</div>
//   <div data-reveal="fade-left">...</div>

function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  if (REDUCED) {
    // Sin animación — simplemente mostrar todo
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const delay = parseInt(el.dataset.revealDelay || 0, 10);

      setTimeout(() => {
        el.classList.add('is-revealed');
        observer.unobserve(el); // Trigger solo una vez
      }, delay);
    });
  }, {
    threshold: 0.08,      // Empieza al 8% visible
    rootMargin: '0px 0px -40px 0px', // Un poco antes del borde inferior
  });

  elements.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────────────────────
// 3. HERO ANIMATIONS — GSAP + SplitText + parallax
// ─────────────────────────────────────────────────────────

function initHero() {
  const hero = document.querySelector('[data-hero]');
  if (!hero || REDUCED || typeof gsap === 'undefined') return;

  const title   = hero.querySelector('[data-hero-title]');
  const sub     = hero.querySelector('[data-hero-subtitle]');
  const cta     = hero.querySelector('[data-hero-cta]');
  const image   = hero.querySelector('[data-hero-image]');
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  // Text split en palabras si SplitText está disponible
  if (title && typeof SplitText !== 'undefined') {
    const split = new SplitText(title, { type: 'words', wordsClass: 'word' });
    tl.from(split.words, {
      opacity: 0,
      y: 22,
      duration: 0.9,
      stagger: 0.06,
    });
  } else if (title) {
    tl.from(title, { opacity: 0, y: 20, duration: 0.9 });
  }

  if (sub)  tl.from(sub,  { opacity: 0, y: 16, duration: 0.7 }, '-=0.5');
  if (cta)  tl.from(cta,  { opacity: 0, scale: 0.97, duration: 0.6 }, '-=0.4');

  // Parallax en la imagen hero — solo desktop
  if (image && !IS_MOBILE) {
    gsap.to(image, {
      yPercent: -(PARALLAX_Y * 100),
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}

// ─────────────────────────────────────────────────────────
// 4. PRODUCTO — Sticky gallery + scroll sections
// ─────────────────────────────────────────────────────────

function initProductPage() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const productLayout = document.querySelector('[data-product-layout]');
  if (!productLayout) return;

  const gallery     = productLayout.querySelector('[data-product-gallery]');
  const description = productLayout.querySelector('[data-product-description]');

  // Sticky gallery en desktop (el efecto jurijewelry)
  if (gallery && description && !IS_MOBILE && !REDUCED) {
    ScrollTrigger.create({
      trigger: description,
      start: 'top 80px',          // 80px = altura del nav
      end: () => `bottom ${gallery.offsetHeight + 80}px`,
      pin: gallery,
      pinSpacing: false,
    });
  }

  // Reveal por secciones en la descripción
  const infoBlocks = description?.querySelectorAll('[data-info-block]');
  if (infoBlocks && !REDUCED) {
    infoBlocks.forEach((block, i) => {
      gsap.from(block, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          once: true,
        },
      });
    });
  }

  // Crossfade de galería — thumbnails
  const thumbs = document.querySelectorAll('[data-gallery-thumb]');
  const mainImg = document.querySelector('[data-gallery-main]');

  if (thumbs.length && mainImg) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.dataset.src;
        const newSrcset = thumb.dataset.srcset;

        // Fade out → swap → fade in
        mainImg.style.transition = `opacity 250ms ${EASE_UI}`;
        mainImg.style.opacity = '0';

        setTimeout(() => {
          if (newSrc) mainImg.src = newSrc;
          if (newSrcset) mainImg.srcset = newSrcset;
          mainImg.style.opacity = '1';
        }, 260);

        // Active state en thumbnails
        thumbs.forEach(t => t.classList.remove('is-active'));
        thumb.classList.add('is-active');
      });
    });
  }
}

// ─────────────────────────────────────────────────────────
// 5. NAVEGACIÓN — scroll state + underline hover
// ─────────────────────────────────────────────────────────

function initNav() {
  const nav = document.querySelector('[data-header]');
  if (!nav) return;

  // Scroll state: transparent → solid
  let lastScroll = 0;
  const THRESHOLD = 80;

  const updateNav = () => {
    const current = window.scrollY;
    if (current > THRESHOLD) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
    // Hide/show en scroll (opcional — comentar si no se quiere)
    // if (current > lastScroll && current > 200) {
    //   nav.classList.add('is-hidden');
    // } else {
    //   nav.classList.remove('is-hidden');
    // }
    lastScroll = current;
  };

  // Passive para performance
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // Estado inicial

  // Underline hover en links de nav
  const navLinks = nav.querySelectorAll('[data-nav-link]');
  navLinks.forEach(link => {
    // El CSS maneja el underline — aquí solo asignamos la clase base
    link.classList.add('nav-link-animated');
  });
}

/**
 * Ancho/posición del panel del dropdown, medidos contra .menu-list
 * (grupo Shop→Journal) y expuestos en píxeles sobre #header-component
 * (el contenedor real de .menu-list__submenu).
 */
function initSubmenuWidthSync() {
  const header = document.querySelector('#header-component');
  const menuList = header?.querySelector('.menu-list');
  if (!header || !menuList) return;

  const sync = () => {
    const headerRect = header.getBoundingClientRect();
    const menuRect = menuList.getBoundingClientRect();
    header.style.setProperty('--menu-group-left', `${menuRect.left - headerRect.left}px`);
    header.style.setProperty('--menu-group-width', `${menuRect.width}px`);
  };

  sync();
  window.addEventListener('resize', sync);
}

// ─────────────────────────────────────────────────────────
// 6. MARQUEE — materiales y valores
// ─────────────────────────────────────────────────────────
// Se maneja principalmente en CSS (ver qdm-motion.css)
// Aquí solo iniciamos la pausa en hover/focus

function initMarquee() {
  const marquees = document.querySelectorAll('[data-marquee]');
  marquees.forEach(marquee => {
    const track = marquee.querySelector('[data-marquee-track]');
    if (!track) return;

    if (REDUCED) {
      track.style.animationPlayState = 'paused';
      return;
    }

    marquee.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
    marquee.addEventListener('focusin', () => {
      track.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('focusout', () => {
      track.style.animationPlayState = 'running';
    });
  });
}

// ─────────────────────────────────────────────────────────
// 7. CART DRAWER
// ─────────────────────────────────────────────────────────

function initCartDrawer() {
  const drawer  = document.querySelector('[data-cart-drawer]');
  const overlay = document.querySelector('[data-cart-overlay]');
  const opens   = document.querySelectorAll('[data-cart-open]');
  const closes  = document.querySelectorAll('[data-cart-close]');

  if (!drawer) return;

  const openCart = () => {
    drawer.classList.add('is-open');
    overlay?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    // Focus trap: primer elemento focuseable
    const firstFocusable = drawer.querySelector('a, button, input, [tabindex]');
    firstFocusable?.focus();
  };

  const closeCart = () => {
    drawer.classList.remove('is-open');
    overlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
  };

  opens.forEach(btn => btn.addEventListener('click', openCart));
  closes.forEach(btn => btn.addEventListener('click', closeCart));
  overlay?.addEventListener('click', closeCart);

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeCart();
  });
}

// ─────────────────────────────────────────────────────────
// 8. ACCORDION / FAQ
// ─────────────────────────────────────────────────────────

function initAccordion() {
  const accordions = document.querySelectorAll('[data-accordion]');

  accordions.forEach(accordion => {
    const trigger = accordion.querySelector('[data-accordion-trigger]');
    const content = accordion.querySelector('[data-accordion-content]');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = accordion.classList.contains('is-open');

      // Cerrar todos los acordeones del mismo grupo
      const group = accordion.closest('[data-accordion-group]');
      if (group) {
        group.querySelectorAll('[data-accordion].is-open').forEach(open => {
          if (open !== accordion) closeAccordion(open);
        });
      }

      isOpen ? closeAccordion(accordion) : openAccordion(accordion);
    });

    // Keyboard
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });

    // ARIA
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('role', 'button');
    content.setAttribute('role', 'region');
  });

  function openAccordion(el) {
    const content = el.querySelector('[data-accordion-content]');
    const trigger = el.querySelector('[data-accordion-trigger]');
    if (!content) return;

    el.classList.add('is-open');
    trigger?.setAttribute('aria-expanded', 'true');

    if (REDUCED) {
      content.style.maxHeight = 'none';
      return;
    }
    // Medir altura real
    content.style.maxHeight = '0';
    content.style.opacity = '0';
    content.style.overflow = 'hidden';
    content.style.transition = `max-height 320ms cubic-bezier(0.4, 0, 0.2, 1), opacity 280ms ease`;

    requestAnimationFrame(() => {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '1';
    });
  }

  function closeAccordion(el) {
    const content = el.querySelector('[data-accordion-content]');
    const trigger = el.querySelector('[data-accordion-trigger]');
    if (!content) return;

    el.classList.remove('is-open');
    trigger?.setAttribute('aria-expanded', 'false');

    if (REDUCED) {
      content.style.maxHeight = '0';
      return;
    }
    content.style.maxHeight = '0';
    content.style.opacity = '0';
  }
}

// ─────────────────────────────────────────────────────────
// 9. PAGE TRANSITIONS — View Transitions API + fallback
// ─────────────────────────────────────────────────────────

function initPageTransitions() {
  if (REDUCED) return;

  // View Transitions API nativa (Chrome 111+)
  if ('startViewTransition' in document) {
    document.addEventListener('click', async (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      // Solo links internos, sin #hash, sin _blank
      if (!href || href.startsWith('#') || href.startsWith('http') ||
          link.target === '_blank' || link.dataset.noTransition !== undefined) return;

      e.preventDefault();

      await document.startViewTransition(async () => {
        const response = await fetch(href);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMain = doc.querySelector('main') || doc.querySelector('[data-main]');
        const currentMain = document.querySelector('main') || document.querySelector('[data-main]');

        if (newMain && currentMain) {
          currentMain.innerHTML = newMain.innerHTML;
          window.history.pushState({}, '', href);
          document.title = doc.title;
          // Re-inicializar animaciones en el nuevo contenido
          setTimeout(initAll, 50);
        } else {
          window.location.href = href;
        }
      });
    });
    return;
  }

  // Fallback: fade manual para browsers sin View Transitions API
  const overlay = document.createElement('div');
  overlay.id = 'qdm-page-overlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: var(--color-page-bg, #fff);
    opacity: 0; pointer-events: none;
    transition: opacity ${DUR_PAGE}ms ease;
  `;
  document.body.appendChild(overlay);

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        link.target === '_blank') return;

    e.preventDefault();
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';

    setTimeout(() => { window.location.href = href; }, DUR_PAGE + 20);
  });

  // Fade in al cargar
  window.addEventListener('pageshow', () => {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  });
}

// ─────────────────────────────────────────────────────────
// 10. PRODUCT GRID — Image hover swap
// ─────────────────────────────────────────────────────────

function initProductGrid() {
  if (IS_MOBILE) return; // no hover real en touch

  const cards = document.querySelectorAll('[data-product-card]');

  cards.forEach(card => {
    const img1 = card.querySelector('[data-product-img-1]');
    const img2 = card.querySelector('[data-product-img-2]');

    if (!img1 || !img2) return;

    // img2 empieza invisible, posicionada sobre img1
    img2.style.cssText = `
      position: absolute; inset: 0;
      opacity: 0;
      transition: opacity ${DUR_HOVER}ms ${EASE_HOVER};
      object-fit: cover; width: 100%; height: 100%;
    `;
    img1.style.cssText = `
      transition: opacity ${DUR_HOVER}ms ${EASE_HOVER}, transform ${DUR_HOVER}ms ${EASE_HOVER};
      object-fit: cover; width: 100%; height: 100%;
    `;
    card.querySelector('[data-product-img-wrap]')?.style.setProperty('position', 'relative');

    if (REDUCED) return; // No animamos si se prefiere reducción

    card.addEventListener('mouseenter', () => {
      img2.style.opacity = '1';
      img1.style.opacity = '0';
    });
    card.addEventListener('mouseleave', () => {
      img2.style.opacity = '0';
      img1.style.opacity = '1';
    });
  });
}

function initFeaturedProductsCtaPosition() {
  const productLists = document.querySelectorAll('[data-testid="product-list"]');

  productLists.forEach(section => {
    const header = section.querySelector('.section-resource-list__header');
    const grid = section.querySelector('[data-testid="resource-list-grid"]');
    const content = section.querySelector('.section-resource-list__content');
    const ctaLink = header?.querySelector('.link');

    if (!header || !grid || !content || !ctaLink) return;

    // Solo reubicar el CTA de la sección "Ver toda la colección".
    if (!/ver\s+toda\s+la\s+colecci[oó]n/i.test(ctaLink.textContent || '')) return;

    if (!content.contains(ctaLink)) {
      content.appendChild(ctaLink);
    }
  });
}

// ─────────────────────────────────────────────────────────
// 11. PRELOADER — pantalla de carga inicial (una vez por sesión)
// ─────────────────────────────────────────────────────────
// Markup + lógica de "una vez por sesión" en snippets/qdm-preloader.liquid.
// Acá solo se maneja la animación de entrada/salida.

const PRELOADER_MIN_MS = 600;   // tiempo mínimo visible para que no "parpadee"
const PRELOADER_MAX_MS = 2500;  // red de seguridad: nunca deja al usuario bloqueado

function initPreloader() {
  const el = document.getElementById('qdm-preloader');
  if (!el) return;

  // Ya lo ocultó el script inline (sessionStorage) o el usuario pide reducir movimiento.
  if (el.style.display === 'none' || REDUCED) {
    el.remove();
    return;
  }

  el.classList.add('qdm-preloader--visible');

  let hidden = false;
  const hide = () => {
    if (hidden) return;
    hidden = true;
    el.classList.add('qdm-preloader--hidden');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
  };

  const startedAt = performance.now();
  const readyToHide = () => {
    const elapsed = performance.now() - startedAt;
    setTimeout(hide, Math.max(0, PRELOADER_MIN_MS - elapsed));
  };

  if (document.readyState === 'complete') {
    readyToHide();
  } else {
    window.addEventListener('load', readyToHide, { once: true });
  }

  // Si algo falla (CDN lenta, error de JS), el overlay igual se libera.
  setTimeout(hide, PRELOADER_MAX_MS);
}

// ─────────────────────────────────────────────────────────
// INIT — ejecutar todo
// ─────────────────────────────────────────────────────────

function initAll() {
  initPreloader();
  initLenis();
  initScrollReveal();
  initNav();
  initSubmenuWidthSync();
  initMarquee();
  initCartDrawer();
  initAccordion();
  initProductGrid();
  initFeaturedProductsCtaPosition();

  // GSAP-dependent (solo si se cargó)
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    initHero();
    initProductPage();
  }
}

// Esperar al DOM listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

// Re-inicializar en navegación Shopify (Section Rendering API)
document.addEventListener('shopify:section:load', () => {
  initScrollReveal();
  initSubmenuWidthSync();
  initMarquee();
  initProductGrid();
  initFeaturedProductsCtaPosition();
});