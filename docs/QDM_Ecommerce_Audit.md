# QDM · Audit de estado — Junio 2026
> Revisión completa de lo construido vs. lo que falta para tener un ecommerce con todos los estándares.
> Última actualización: 30 junio 2026

---

## CÓDIGO / FRONTEND — Lo construido

| Componente | Estado |
|---|---|
| Hero slider (3 slides, GSAP, autoplay) | ✅ |
| Marquee de manifiesto | ✅ |
| Statement section | ✅ |
| Joyas adaptadas — sección homepage (split layout) | ✅ |
| Materiales + proceso | ✅ |
| FAQ corta (homepage) | ✅ |
| Drop header (página de colección) | ✅ |
| Footer con newsletter rediseñado | ✅ |
| Journal — listing + article template | ✅ |
| Manifiesto — sección y template | ✅ |
| Product story | ✅ |
| Schema Organization (theme.liquid) | ✅ |
| Tokens CSS + sistema de animaciones (qdm-motion) | ✅ |

### Lo que falta en código

- `blog.json` → sigue con `main-blog` del Heritage, nunca quedó activo `qdm-journal-list`
- Página completa de **Joyas Adaptadas** — la sección homepage existe, pero falta la landing page dedicada con FAQ, materiales y copy completo de la doc
- Página **Sobre Nosotras** — el copy está en `QDM_Content_Strategy.md`, la sección no existe todavía
- **Schema JSON-LD de producto** (`qdm-schema-product.liquid`) — mencionado en CLAUDE.md como pendiente
- **Schema JSON-LD FAQPage** — en fichas de producto y páginas de colección
- **Schema JSON-LD Article** — en posts del Journal
- **Guía de tallas** — modal o página independiente
- **404 personalizado** — ahora usa el Heritage genérico
- Fondo transparente en product cards — en proceso

---

## SHOPIFY ADMIN / CONFIGURACIÓN

| Punto | Estado |
|---|---|
| Menús de navegación configurados (Piezas / Joyas adaptadas / Conócenos / Journal) | ❓ |
| Dominio `quediriamimadre.com` conectado | ❓ |
| Payment gateway activo (Stripe / PayPal) | ❓ |
| Shipping zones y tarifas | ❓ |
| Taxes configurados (España / Argentina) | ❓ |
| Moneda configurada | ❓ |
| Políticas legales cargadas (envíos, devoluciones, privacidad) | ❓ |
| Email templates de Shopify con tono QDM | ❌ |
| Checkout branding (logo, colores QDM) | ❓ |

> Los `❓` son cosas que no se pueden ver desde el código — hay que verificarlos en el admin.
> Los emails transaccionales son especialmente importantes: la estrategia tiene redactados el de confirmación de pedido y el de envío con el tono QDM. Ver sección 9 de `QDM_Content_Strategy.md`.

---

## CONTENIDO — El déficit más grande

| Punto | Estado |
|---|---|
| Productos cargados con copy completo (4 bloques según doc) | ❓ |
| Títulos de producto en formato poético (ej. "Anillo Luna · Plata 925 con piedra luna") | ❓ |
| Colecciones / Drops creadas con imagen de header y descripción | ❓ |
| Imágenes de producto profesionales | Parcial |
| Imágenes hero (3 slides con personas reales) | ❓ |
| Copy completo del manifiesto en la página | ❓ |
| Copy completo de Sobre Nosotras | ❌ (falta la sección) |
| Posts del Journal — mínimo 3-4 para lanzamiento | ❌ |
| Alt text en todas las imágenes | ❓ |
| Meta titles y meta descriptions en cada página | ❓ |

> El contenido es **el mayor gap antes de lanzar**. Sin los posts del Journal y los productos cargados con el copy de la doc, el trabajo de código y diseño no tiene donde aterrizar.

### Estructura de copy por ficha de producto (referencia rápida)
Ver `QDM_Content_Strategy.md` sección 6 para el template completo. Resumen:

1. **Título** — `[Nombre poético] · [Material]` → ej. "Anillo Garnet · Plata 925 con granate natural"
2. **Bloque 1 — Qué es** — 50 palabras max, emocional-funcional
3. **Bloque 2 — Materiales** — técnico, preciso, breve (bullets)
4. **Bloque 3 — Proceso** — humano, breve
5. **Bloque 4 — Para quién** — aspiracional, identitario
6. **FAQ del producto** — 3-5 preguntas según tipo (anillo / joya adaptada)

---

## SEO / GEO

| Punto | Estado |
|---|---|
| Schema Organization en `<head>` | ✅ |
| Schema Product en fichas de producto | ❌ (snippet pendiente) |
| Schema FAQPage en fichas y colecciones | ❌ |
| Schema Article en posts del Journal | ❌ |
| Meta descriptions únicas por página | ❓ |
| H1 único por página | ✅ en secciones QDM |
| URLs / handles limpios (ej. `/collections/anillos-plata-925`) | ❓ |
| Snippets GEO en páginas de colección (texto informativo para LLMs) | ❌ |
| Open Graph / Social preview tags | Shopify los genera, sin imagen custom todavía |
| Google Search Console verificado | ❌ |
| Sitemap XML | ✅ automático por Shopify |

> El GEO (optimización para motores de IA como ChatGPT, Perplexity, Gemini) es un diferenciador clave de la estrategia.
> Ver `QDM_Content_Strategy.md` sección 10 — los snippets de texto GEO para colecciones ya están redactados, falta insertarlos.

---

## CONVERSIÓN / UX

| Punto | Estado |
|---|---|
| App de reseñas/reviews instalada (Loox / Judge.me) | ❌ |
| Productos relacionados / upsell en ficha de producto | ❓ |
| Pop-up / captura de email (entrada o exit intent) | ❌ |
| WhatsApp o chat flotante para consultas | ❌ |
| Wishlist / guardar para después | ❌ |
| Checkout flow testado end-to-end | ❌ |
| UX mobile testada en iPhone real | ❓ |
| Velocidad de carga (Lighthouse > 80 en mobile) | ❓ |

> Las **reseñas son críticas para lanzar** — sin ellas el trust social es cero.
> 5-10 reseñas de beta testers antes de la apertura oficial marcan la diferencia.

---

## MARKETING / ADQUISICIÓN

| Punto | Estado |
|---|---|
| Meta Pixel instalado | ❌ |
| Google Analytics 4 instalado | ❌ |
| Google Tag Manager | ❌ |
| Email marketing configurado (Klaviyo / Shopify Email) | ❌ |
| Welcome email flow | ❌ |
| Abandoned cart flow | ❌ |
| Post-purchase flow (pedir reseña, siguiente compra) | ❌ |
| Instagram Shopping configurado | ❌ |
| Contenido de lanzamiento preparado (3-5 posts) | ❓ |

---

## LEGAL / COMPLIANCE — Crítico para España

| Punto | Estado |
|---|---|
| Política de privacidad (RGPD) | ❌ |
| Términos y condiciones | ❌ |
| Aviso legal (NIF, dirección, responsable) | ❌ |
| Cookie consent banner | ❌ |
| Política de devoluciones (14 días mínimo por ley UE) | ❌ |
| Información de envíos y plazos | ❌ |

> **Esto es bloqueante para lanzar en España.**
> El RGPD exige cookie banner, política de privacidad y aviso legal antes de abrir al público.
> Shopify tiene plantillas de políticas en el admin — se pueden adaptar al tono QDM.

---

## OPERACIONES

| Punto | Estado |
|---|---|
| Stock actualizado en Shopify | ❓ |
| Proveedor / fulfillment integrado | ❓ |
| Empaque / unboxing experience definido | ❓ |
| Política de cambios y guía de tallas | ❌ |
| Proceso para pedidos de personalización | ❓ |

---

## Prioridad — Orden de ejecución sugerido

### Bloqueantes para lanzar
1. **Legal** — política de privacidad + aviso legal + cookie banner (RGPD)
2. **Contenido** — cargar productos con copy completo (estructura en `QDM_Content_Strategy.md` sección 6)
3. **Admin** — payment gateway + shipping + checkout testado end-to-end
4. **Reviews** — instalar app + conseguir primeras 5-10 reseñas de beta testers

### Primera semana post-lanzamiento
5. Schema markup de producto y FAQ
6. GA4 + Meta Pixel
7. Journal — primeros 3 posts (títulos sugeridos en `QDM_Content_Strategy.md` sección 7)
8. Email marketing — welcome flow + abandoned cart

### Siguiente fase
9. Página Sobre Nosotras + landing completa de Joyas Adaptadas
10. GEO snippets en páginas de colección
11. Guía de tallas
12. Instagram Shopping
13. Upsell / productos relacionados en ficha

---

## Resumen ejecutivo

El código y la estética están en muy buen estado.
El gap principal está en tres áreas:

- **Contenido** — productos, colecciones, journal y páginas secundarias sin copy final
- **Legal** — sin políticas no se puede abrir al público en España
- **Configuración de admin** — payment, shipping y emails transaccionales

Una vez resueltos esos tres frentes, el ecommerce está en condiciones de lanzar.
