# QDM · CLAUDE.md
> Instrucciones para el agente de VS Code. Leer antes de cualquier tarea.

## Qué es este proyecto

Ecommerce de joyería artesanal para la marca **QDM (Qué Diría Mi Madre)**.
Plataforma: **Shopify · tema Heritage** con animaciones custom (GSAP + CSS).
Dev store: `que-diria-mi-madre.myshopify.com` (cuenta post client-transfer)
Dominio final: `quediriamimadre.com`

Contexto completo en:
- `docs/QDM_Architecture.md` → estructura de páginas, componentes, wireframes, schema markup
- `docs/QDM_Content_Strategy.md` → voz de marca, copy, paleta, tipografía, tokens CSS

---

## Stack

```
Shopify Heritage theme (base)
GSAP 3 + ScrollTrigger + SplitText  (animaciones avanzadas)
Lenis                                (smooth scroll)
CSS custom properties                (design tokens QDM)
Work Sans + Source Sans 3            (Google Fonts)
Liquid                               (templates y snippets)
Vanilla JS                           (sin frameworks)
```

Archivos propios del proyecto:
- `assets/qdm-motion.js` → sistema de animaciones completo
- `assets/qdm-motion.css` → estados CSS, tokens, keyframes
- `snippets/qdm-*.liquid` → componentes reutilizables

---

## Estructura de archivos

```
qdm-theme/
├── assets/
│   ├── qdm-motion.js       ← sistema de animaciones
│   └── qdm-motion.css      ← tokens y CSS custom
├── layout/
│   └── theme.liquid        ← inyectar CDN libs + qdm-motion aquí
├── sections/
│   ├── qdm-hero.liquid
│   ├── qdm-marquee.liquid
│   └── qdm-adapted-feature.liquid
├── snippets/
│   ├── qdm-product-card.liquid
│   ├── qdm-badge.liquid
│   ├── qdm-schema-product.liquid
│   ├── qdm-schema-org.liquid
│   └── qdm-schema-faq.liquid
├── templates/
└── docs/
    ├── QDM_Architecture.md
    └── QDM_Content_Strategy.md
```

---

## Reglas de desarrollo

**Liquid**
- Snippets reutilizables van en `snippets/qdm-*.liquid`
- Secciones editables desde el admin van en `sections/qdm-*.liquid`
- Todo snippet nuevo necesita su schema si acepta configuración

**CSS**
- Usar siempre los custom properties de `qdm-motion.css` — nunca hardcodear colores
- Solo `transform` y `opacity` para animaciones — nunca `width`, `height`, `top`, `left`
- Respetar `prefers-reduced-motion` en toda animación
- Sin parallax en mobile (`IS_MOBILE` check en JS)

**JavaScript**
- Vanilla JS — sin frameworks
- Cada función tiene su sección numerada en `qdm-motion.js`
- Verificar que GSAP esté cargado antes de usarlo: `if (typeof gsap !== 'undefined')`
- Re-inicializar en `shopify:section:load` para compatibilidad con el editor

**Schema markup**
- Todo producto necesita schema JSON-LD completo (ver `snippets/qdm-schema-product.liquid`)
- FAQPage schema en fichas de producto y colecciones
- Organization schema en `layout/theme.liquid`
- Validar con Google Rich Results Test antes de marcar como done

**Git**
```
feat/     nueva funcionalidad
fix/      corrección de bug
style/    cambios visuales sin lógica
content/  copy o contenido
chore/    config, dependencias
```

Commits en inglés, cortos, en presente: `feat: add hero parallax animation`

---

## Paleta (tokens ya definidos en qdm-motion.css)

```
--qdm-cream:   #FFFEF7   fondo principal
--qdm-sand:    #E0DED7   fondos secundarios
--qdm-nude:    #CFBFB3   bordes
--qdm-camel:   #C9A787   hover states
--qdm-amber:   #EBB86E   acento principal (CTAs, badges)
--qdm-carbon:  #262522   texto principal
```

---

## Componentes prioritarios (orden de desarrollo)

1. `layout/theme.liquid` → inyección de libs y schema org
2. `assets/qdm-motion.css` + `assets/qdm-motion.js` → sistema base
3. `sections/qdm-hero.liquid` → hero con parallax y text reveal
4. `snippets/qdm-product-card.liquid` → card con stagger y swap
5. `sections/qdm-marquee.liquid` → marquee de manifiesto
6. `sections/qdm-adapted-feature.liquid` → sección joyas adaptadas
7. `snippets/qdm-schema-*.liquid` → schema markup GEO

---

## Lo que NO hacer

- No instalar librerías npm — todo via CDN en `theme.liquid`
- No modificar archivos del tema Heritage directamente si hay alternativa en snippet
- No usar `!important` en CSS
- No hardcodear strings de copy — usar variables de sección o metafields
- No commitear a `main` directamente — PR desde rama de feature