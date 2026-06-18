# QDM · Dev Workflow
> Guía de patrones para crear secciones, snippets y páginas en el tema Heritage.
> Leer antes de tocar cualquier archivo nuevo.

---

## 1. Arquitectura de conexión

```
layout/theme.liquid
  │
  ├── CDN: GSAP 3.12 + ScrollTrigger + SplitText   (defer, global)
  ├── CDN: Lenis 1.1.14                             (defer, global)
  ├── assets/qdm-motion.css  → custom properties + estados reveal
  └── assets/qdm-motion.js   → Lenis init, IntersectionObserver, GSAP fns
            │
            ↓ se inicializa en DOMContentLoaded y en shopify:section:load
            
sections/qdm-*.liquid         ← markup + {% stylesheet %} + {% schema %}
snippets/qdm-*.liquid         ← componentes reutilizables sin schema propio
```

**Regla de carga:** Los CDN se cargan una sola vez en `theme.liquid`. Las secciones nunca importan librerías propias — usan lo que ya está disponible globalmente.

---

## 2. Anatomía de una sección QDM

Toda sección `sections/qdm-*.liquid` sigue esta estructura en orden:

```liquid
{%- comment -%}
  QDM · Nombre — posición en el flow (ej: S4 Homepage)
  Descripción breve de qué hace y cómo anima
  data-attributes que usa
{%- endcomment -%}

<!-- 1. MARKUP HTML -->
<section class="qdm-[nombre]">
  <div class="qdm-[nombre]__inner page-width">
    <!-- contenido con data-reveal -->
  </div>
</section>

<!-- 2. SCHEMA JSON-LD (solo si aplica: FAQ, Product, etc.) -->
<script type="application/ld+json">...</script>

<!-- 3. CSS scoped con {% stylesheet %} -->
{% stylesheet %}
  .qdm-[nombre] { ... }
{% endstylesheet %}

<!-- 4. SCHEMA Shopify (siempre al final) -->
{% schema %}
{ "name": "QDM · Nombre", ... }
{% endschema %}
```

### Por qué este orden

| Bloque | Razón |
|--------|-------|
| Comentario descriptivo | Documentación en el archivo, visible al editar |
| Markup primero | El HTML define la estructura antes del estilo |
| `{% stylesheet %}` | Shopify lo deduplica y optimiza por sección |
| `{% schema %}` al final | Convención de Heritage, el editor lo requiere así |

---

## 3. Sistema de CSS

### 3.1 Dónde va cada tipo de CSS

| Tipo | Archivo | Cuándo |
|------|---------|--------|
| Design tokens (colores, easing, timing) | `assets/qdm-motion.css` `:root` | Una sola vez, global |
| Estados de animación (`[data-reveal]`, `.is-revealed`) | `assets/qdm-motion.css` | Una sola vez, global |
| Estilos de una sección específica | `{% stylesheet %}` dentro del `.liquid` | Por sección |
| Reset puntual de Heritage | `{% stylesheet %}` de esa sección | Solo cuando Heritage interfiere |

### 3.2 Custom properties disponibles (tokens)

```css
/* Colores */
var(--qdm-cream,   #FFFEF7)   /* fondo principal */
var(--qdm-sand,    #E0DED7)   /* fondos secundarios */jaja
var(--qdm-nude,    #CFBFB3)   /* bordes */
var(--qdm-camel,   #C9A787)   /* hover states */
var(--qdm-amber,   #EBB86E)   /* acento principal, CTAs */
var(--qdm-carbon,  #262522)   /* texto principal */

/* Tipografía */
var(--qdm-font-heading, 'Work Sans', sans-serif)
var(--qdm-font-body,    'Source Sans 3', sans-serif)

/* Easing */
var(--qdm-ease-enter)   /* expo out — entradas de contenido */
var(--qdm-ease-hover)   /* ease out — hover suave */
var(--qdm-ease-ui)      /* material — nav, drawers */

/* Duraciones */
var(--qdm-dur-reveal)   /* 700ms scroll reveal */
var(--qdm-dur-hover)    /* 450ms hover imagen */
var(--qdm-dur-page)     /* 180ms transición de página */
var(--qdm-dur-ui)       /* 300ms elementos UI */
```

**Nunca hardcodear colores.** Siempre `var(--qdm-*)` con el valor literal como fallback: `var(--qdm-carbon, #262522)`.

### 3.3 Reglas de CSS en secciones

```css
/* ✅ Correcto — solo transform + opacity en animaciones */
.qdm-card:hover .qdm-card__img {
  transform: scale(1.04);
}

/* ❌ Incorrecto — animar layout properties */
.qdm-card:hover {
  width: 110%;
  top: -5px;
}

/* ✅ Correcto — mobile check con media query */
@media (max-width: 767px) {
  .qdm-section { padding-block: 3.5rem; }
}

/* ✅ Correcto — respetar prefers-reduced-motion (qdm-motion.css ya lo hace global,
   pero si defines keyframes propios en la sección, agregar esto) */
@media (prefers-reduced-motion: reduce) {
  .qdm-marquee-track { animation: none; }
}

/* ❌ Nunca usar !important */
```

---

## 4. Sistema de animaciones

### 4.1 Scroll Reveal (el más usado)

Agrega `data-reveal` al elemento HTML. `qdm-motion.js` observa con IntersectionObserver y agrega `.is-revealed` al entrar en viewport. El CSS en `qdm-motion.css` hace la transición.

```html
<!-- Variantes disponibles -->
<div data-reveal="fade-up">...</div>      <!-- sube desde abajo (default) -->
<div data-reveal="fade-in">...</div>      <!-- solo opacity -->
<div data-reveal="fade-left">...</div>    <!-- entra desde la derecha -->
<div data-reveal="fade-right">...</div>   <!-- entra desde la izquierda -->

<!-- Delay en ms para stagger manual -->
<div data-reveal="fade-up" data-reveal-delay="0">primero</div>
<div data-reveal="fade-up" data-reveal-delay="100">segundo</div>
<div data-reveal="fade-up" data-reveal-delay="200">tercero</div>

<!-- Stagger automático en un loop Liquid -->
{%- for product in products -%}
  <li data-reveal="fade-up" data-reveal-delay="{{ forloop.index0 | times: 80 }}">
    ...
  </li>
{%- endfor -%}
```

**Thresholds del observer:** `threshold: 0.08`, `rootMargin: '0px 0px -40px 0px'`
El elemento empieza a revelar cuando el 8% está visible, con 40px de margen inferior.

### 4.2 Hero (GSAP + SplitText)

Solo para `sections/qdm-hero.liquid`. Los data attributes disparan `initHero()` en `qdm-motion.js`:

```html
<section data-hero>
  <div data-hero-image>imagen</div>    <!-- parallax (desktop only) -->
  <h1 data-hero-title>título</h1>     <!-- SplitText por palabras -->
  <p data-hero-subtitle>sub</p>        <!-- fade-in con delay -->
  <div data-hero-cta>botones</div>     <!-- fade-in final -->
</section>
```

### 4.3 Marquee (CSS puro)

Definir `animation: qdm-marquee` en el track. El keyframe está en `qdm-motion.css`. El JS (`initMarquee()`) solo agrega pausa en hover/focus:

```html
<div data-marquee>
  <div data-marquee-track class="qdm-marquee-track">
    <!-- Duplicar contenido 2 veces para loop perfecto (translateX -50%) -->
    {%- for i in (1..2) -%}
      <span>items...</span>
    {%- endfor -%}
  </div>
</div>
```

### 4.4 Parallax con GSAP ScrollTrigger

Solo para imágenes en desktop. Verificar siempre `!IS_MOBILE` y `typeof gsap !== 'undefined'`. El patrón está en `initHero()` y puede copiarse para otras secciones si se agrega la función correspondiente en `qdm-motion.js`.

---

## 5. Schema Shopify (configuración desde el Admin)

### 5.1 Estructura mínima del schema

```json
{% schema %}
{
  "name": "QDM · Nombre de la Sección",
  "tag": "section",
  "class": "shopify-section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Título",
      "default": "Valor por defecto"
    }
  ],
  "presets": [
    {
      "name": "QDM · Nombre de la Sección"
    }
  ]
}
{% endschema %}
```

### 5.2 Tipos de settings más usados

| type | Cuándo usarlo |
|------|--------------|
| `text` | Textos cortos (títulos, etiquetas) |
| `textarea` | Textos largos (manifiesto, descripciones) |
| `richtext` | Cuerpo con formato HTML (párrafos, negrita) |
| `image_picker` | Imágenes de la sección |
| `url` | Links de CTAs |
| `color` | Solo si el color no puede cubrirlo un token |
| `range` | Velocidades, alturas ajustables |
| `checkbox` | Activar/desactivar elementos opcionales |
| `select` | Opciones predefinidas (alineación, variantes) |

### 5.3 Blocks (para contenido repetido)

Usar cuando el número de items es variable (bullets, FAQs, features):

```json
"blocks": [
  {
    "type": "item",
    "name": "Item",
    "settings": [
      { "type": "text", "id": "heading", "label": "Título" },
      { "type": "textarea", "id": "body", "label": "Descripción" }
    ]
  }
],
"max_blocks": 6
```

En Liquid: `{% for block in section.blocks %}` con `{{ block.shopify_attributes }}` en el elemento para que sea seleccionable en el editor.

---

## 6. Schema markup JSON-LD (SEO/GEO)

Agregar `<script type="application/ld+json">` **antes** del `{% stylesheet %}`, después del HTML.

### Cuándo agregar schema

| Sección | Schema |
|---------|--------|
| FAQ | `FAQPage` |
| Producto | `Product` (snippet `qdm-schema-product.liquid`) |
| Homepage | `Organization` (en `theme.liquid`, no en sección) |
| Página "Sobre nosotros" | `Organization` + `Person` |

### Patrón FAQ (el más frecuente en secciones)

```liquid
{%- assign faq_items = section.blocks | where: 'type', 'item' -%}
{%- if faq_items.size > 0 -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {%- for block in faq_items -%}
      {%- if block.settings.question != blank and block.settings.answer != blank -%}
        {
          "@type": "Question",
          "name": {{ block.settings.question | json }},
          "acceptedAnswer": {
            "@type": "Answer",
            "text": {{ block.settings.answer | json }}
          }
        }{% unless forloop.last %},{% endunless %}
      {%- endif -%}
    {%- endfor -%}
  ]
}
</script>
{%- endif -%}
```

**Usar siempre `| json`** para el output de variables en JSON-LD (escapa comillas y caracteres especiales automáticamente).

---

## 7. Patrones de layout CSS

### 7.1 Grid de 2 columnas (texto + imagen)

```css
/* Secciones tipo qdm-adapted, qdm-mat */
.qdm-[nombre]__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* o 55fr 45fr */
  gap: 4rem;
  align-items: center;
}

@media (max-width: 767px) {
  .qdm-[nombre]__inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
```

### 7.2 Grid de productos (3 col → 2 → 1)

```css
.qdm-[nombre]__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

@media (max-width: 900px) {
  .qdm-[nombre]__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .qdm-[nombre]__grid { grid-template-columns: 1fr; }
}
```

### 7.3 Stack centrado (statement, FAQ, CTA)

```css
.qdm-[nombre]__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 720px;
  margin-inline: auto;
}
```

### 7.4 Espaciado de secciones

```css
/* Desktop */
padding-block: 5rem;         /* estándar */
padding-block: 5rem 5.5rem;  /* con más espacio abajo */
padding-block: 7rem;         /* secciones hero o destacadas */

/* Mobile — siempre reducir en @media (max-width: 767px) */
padding-block: 3.5rem;
```

---

## 8. Tipografía

```css
/* Headings (H1–H3, eyebrows, nombres de sección) */
font-family: var(--qdm-font-heading, 'Work Sans', sans-serif);
font-weight: 400;  /* o 500 para énfasis */
letter-spacing: -0.01em;
line-height: 1.15;

/* Body (párrafos, descripciones, bullets) */
font-family: var(--qdm-font-body, 'Source Sans 3', sans-serif);
font-weight: 400;

/* Eyebrows / badges (texto pequeño uppercase) */
font-family: var(--qdm-font-body, 'Source Sans 3', sans-serif);
font-size: 0.75rem;
font-weight: 500;
letter-spacing: 0.12em;
text-transform: uppercase;

/* Tamaños fluidos con clamp */
font-size: clamp(1.25rem, 2.5vw + 0.5rem, 2rem);   /* H2 */
font-size: clamp(1rem, 1.5vw + 0.5rem, 1.375rem);  /* H3 */
font-size: clamp(0.875rem, 1vw + 0.4rem, 1rem);     /* body */
```

---

## 9. Botones (clases globales)

Dos variantes definidas en `qdm-motion.css`:

```html
<!-- Primario: fondo carbon, texto cream -->
<a href="..." class="qdm-btn qdm-btn--primary">Explorar colección</a>

<!-- Ghost: borde carbon, fondo transparente -->
<a href="..." class="qdm-btn qdm-btn--ghost">Ver el manifiesto</a>

<!-- CTA tipo texto con flecha (inline, sin fondo) -->
<a href="..." class="qdm-[nombre]__cta">
  <span class="qdm-[nombre]__cta-text">Ver más</span>
  <span class="qdm-[nombre]__cta-arrow" aria-hidden="true">→</span>
</a>
```

Para el CTA tipo texto, la flecha se anima en hover con:
```css
@media (hover: hover) {
  .qdm-[nombre]__cta:hover .qdm-[nombre]__cta-arrow {
    transform: translateX(5px);
  }
}
```

---

## 10. Imágenes con Liquid

```liquid
<!-- Imagen responsive estándar -->
{{
  section.settings.image
  | image_url: width: 960
  | image_tag:
    loading: 'lazy',
    widths: '480, 640, 800, 960',
    sizes: '(min-width: 768px) 50vw, 100vw',
    class: 'qdm-[nombre]__img',
    alt: section.settings.image.alt | escape
}}

<!-- Above the fold (hero) — eager + fetchpriority -->
{{
  section.settings.image
  | image_url: width: 1920
  | image_tag:
    loading: 'eager',
    fetchpriority: 'high',
    widths: '768, 1200, 1440, 1920',
    sizes: '100vw',
    class: 'qdm-hero__img'
}}

<!-- Placeholder cuando no hay imagen -->
{%- else -%}
  <div class="qdm-[nombre]__img-placeholder">
    {{ 'product-1' | placeholder_svg_tag }}
  </div>
{%- endif -%}
```

**Regla:** La primera imagen visible en la página usa `loading: 'eager'` + `fetchpriority: 'high'`. Todo lo demás `loading: 'lazy'`.

---

## 11. Compatibilidad con el editor de Shopify

```js
// En qdm-motion.js — re-inicializar animaciones cuando el editor carga una sección
document.addEventListener('shopify:section:load', (e) => {
  initScrollReveal();
  // Si la sección cargada tiene hero:
  if (e.target.querySelector('[data-hero]')) initHero();
  // Si tiene marquee:
  if (e.target.querySelector('[data-marquee]')) initMarquee();
});
```

En Liquid — siempre agregar `{{ block.shopify_attributes }}` en elementos de bloque:
```liquid
<li class="qdm-mat__bullet" {{ block.shopify_attributes }}>
```

---

## 12. Checklist — crear una sección nueva

```
[ ] 1. Crear sections/qdm-[nombre].liquid
[ ] 2. Comentario descriptivo al inicio (qué hace, data-attrs que usa)
[ ] 3. HTML con clases BEM: .qdm-[nombre]__[elemento]
[ ] 4. Agregar data-reveal="fade-up" a los elementos animables
[ ] 5. CSS en {% stylesheet %} — usar solo var(--qdm-*)
[ ] 6. Padding-block desktop + @media mobile
[ ] 7. {% schema %} con name "QDM · Nombre" y presets
[ ] 8. Si tiene FAQ/Product: agregar JSON-LD
[ ] 9. Verificar en mobile (stack, font sizes, espaciado)
[ ] 10. Verificar prefers-reduced-motion (el reveal global lo cubre,
        pero keyframes propios necesitan su @media)
[ ] 11. Si tiene parallax o GSAP custom: agregar handler en shopify:section:load
[ ] 12. Agregar la sección al template correspondiente en templates/
```

---

## 13. Checklist — crear un snippet nuevo

```
[ ] 1. Crear snippets/qdm-[nombre].liquid
[ ] 2. Documentar los parámetros que acepta en comentario inicial
[ ] 3. No incluir {% schema %} (los snippets no tienen schema propio)
[ ] 4. CSS va inline con <style> o en el {% stylesheet %} de la sección que lo incluye
[ ] 5. Llamar con {% render 'qdm-[nombre]', param: value %}
```

---

## 14. Templates y páginas

```
templates/
  index.json           ← Homepage — agregar secciones aquí en orden
  page.[handle].json   ← Páginas custom (manifiesto, materiales, etc.)
  collection.json      ← Página de colección
  product.json         ← Ficha de producto
```

Para agregar una sección QDM a una página:

1. Abrir el `.json` del template correspondiente.
2. Agregar la referencia en `"order"` y en `"sections"` con su configuración por defecto.
3. O hacerlo desde el editor visual de Shopify (Customize → Add section).

---

## 15. Git workflow

```bash
# Nueva sección o funcionalidad
git checkout -b feat/qdm-[nombre-seccion]

# Corrección de bug visual
git checkout -b fix/[descripcion-breve]

# Ajuste de copy o contenido
git checkout -b content/[descripcion-breve]

# Commits: inglés, presente, cortos
git commit -m "feat: add qdm-testimonials section with scroll reveal"
git commit -m "fix: marquee pause on hover not working in Safari"
git commit -m "style: adjust hero min-height on mobile"
```

**Nunca hacer push directo a `main`.** PR desde la rama de feature.

---

## Referencia rápida de secciones existentes

| Sección | Archivo | Descripción |
|---------|---------|-------------|
| Hero | `qdm-hero.liquid` | H1 SplitText + parallax imagen |
| Marquee | `qdm-marquee.liquid` | Texto en loop continuo |
| Statement | `qdm-statement.liquid` | Texto centrado + CTA con flecha |
| Productos destacados | `qdm-featured-products.liquid` | Grid 3 col + image swap hover |
| Joyería adaptada | `qdm-adapted-feature.liquid` | 2 col texto+imagen |
| Materiales | `qdm-materials.liquid` | Imagen 55% + bullets con íconos |
| FAQ corta | `qdm-faq-short.liquid` | Accordion nativo + FAQPage schema |
