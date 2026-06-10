QDM · Arquitectura de producto — Ecommerce
quediriamimadre.com · Shopify Heritage · v1.0
Para: Diseño (Pencil/Figma) + Desarrollo (Shopify Heritage)
Estado: Borrador arquitectural — base para mockup
Contexto de marca: Joyería identitaria con significado. Dos líneas: joyería tradicional curada + joyería adaptada para audífonos. Primer drop: 15–18 piezas. Target: Clara, 25–50 años, ciudad, compra desde la emoción y el significado.


1. MAPA DEL SITIO

graph TD


   HOME["/\nHomepage"] --> COL["/collections\nColecciones"]


   HOME --> ABOUT["/pages/sobre-nosotras\nSobre nosotras"]


   HOME --> MANIFEST["/pages/manifiesto\nManifiesto"]


   HOME --> BLOG["/blogs/journal\nJournal"]


   COL --> ANILLOS["/collections/anillos\nAnillos"]


   COL --> AROS["/collections/aros\nAros"]


   COL --> COLLARES["/collections/collares\nCollares"]


   COL --> PULSERAS["/collections/pulseras\nPulseras"]


   COL --> ADAPTADA["/collections/joyas-adaptadas\n★ Joyería adaptada\npara audífonos"]


   ANILLOS --> PROD["/products/[handle]\nFicha de producto"]


   AROS --> PROD


   COLLARES --> PROD


   PULSERAS --> PROD


   ADAPTADA --> PROD


   HOME --> PROCESO["/pages/proceso\nNuestro proceso"]


   HOME --> MATERIALES["/pages/materiales\nMateriales"]


   PROD --> CART["Cart drawer\n(overlay)"]


   CART --> CHECKOUT["/checkout\nShopify nativo"]


   HOME --> FAQ["/pages/faq\nFAQ"]


   HOME --> CONTACT["/pages/contacto\nContacto"]


   HOME --> SHIPPING["/pages/envios\nEnvíos y devoluciones"]


   style ADAPTADA fill:#f0e6ff,stroke:#7c3aed,color:#4c1d95


   style HOME fill:#e0f2fe,stroke:#0284c7,color:#0c4a6e


   style CHECKOUT fill:#dcfce7,stroke:#16a34a,color:#14532d




2. FLUJOS DE USUARIO PRINCIPALES
2.1 Flujo de compra — compradora directa


flowchart LR


   A([Descubre QDM\nIG / ChatGPT / boca a boca])


   --> B[Homepage\nHero + manifiesto]


   --> C{¿Qué le llama\nla atención?}


   C --> D[Colección\npor categoría]


   C --> E[Joyería adaptada\ncuriosidad / identificación]


   C --> F[About / Manifiesto\nquiere saber quién es QDM]


   D --> G[Ficha de producto\nnarración de la pieza]


   E --> G


   F --> G


   G --> H{¿Confía?}


   H -- No --> I[Lee materiales\nlee proceso\nlee reviews]


   I --> G


   H -- Sí --> J[Add to cart\nCart drawer]


   J --> K[Checkout Shopify\nPago]


   K --> L([Email confirmación\nPedido en camino])


   style E fill:#f0e6ff,stroke:#7c3aed


   style L fill:#dcfce7,stroke:#16a34a



2.2 Flujo de regalo


flowchart LR


   A([Quiere regalar\nalgo con significado])


   --> B[Homepage\n¿Qué es QDM?]


   --> C[Manifiesto / About\nentiendo la marca]


   --> D[Blog: guía de regalos\no FAQ: ¿cómo elegir?]


   --> E[Colección\nfiltro por precio o tipo]


   --> F[Ficha de producto\nhistoria de la pieza]


   --> G[¿Es personalizable?\n¿Hay packaging de regalo?]


   --> H[Cart + nota de regalo\nCheckout]


   --> I([Regalo enviado\ncon significado])


   style I fill:#dcfce7,stroke:#16a34a



2.3 Flujo de descubrimiento vía IA / GEO


flowchart LR


   A([ChatGPT / Perplexity:\n'joyería para audífonos España'])


   --> B[QDM citada\ncomo referencia]


   --> C[Click a URL directa\nde producto o colección]


   --> D[Ficha de producto\ncon schema completo]


   --> E[Primera compra\no guardado para después]


   style A fill:#fef3c7,stroke:#d97706


   style B fill:#fef3c7,stroke:#d97706





3. ARQUITECTURA POR PÁGINA

3.1 HOMEPAGE /
Por qué existe: Primera impresión. Convierte el "¿qué es QDM?" en "quiero saber más / quiero comprar". No es un catálogo — es una declaración de identidad.

Para quién: Clara llega de Instagram o de una recomendación. Tiene 8 segundos. El hero tiene que hacer que se quede.

Principio de diseño: Cada sección tiene una sola pregunta que responde. Hero → "¿qué es QDM?". Colecciones → "¿qué venden?". Historia → "¿en quién confío?". Productos → "¿quiero esto?". FAQ → "¿tengo dudas?".

graph TD

    HP[HOMEPAGE] --> S1[S1 · HERO\nPrimera pantalla completa]

    HP --> S2[S2 · MARQUEE\nManifiesto en loop]

    HP --> S3[S3 · COLECCIONES\nGrid editorial 2×2]

    HP --> S4[S4 · STATEMENT\nUn párrafo. La marca en 5 líneas]

    HP --> S5[S5 · PRODUCTOS DESTACADOS\nGrid 3 col · piezas estrella]

    HP --> S6[S6 · JOYERÍA ADAPTADA\nSección separada · el diferenciador]

    HP --> S7[S7 · MATERIALES + PROCESO\n2 columnas · foto + texto]

    HP --> S8[S8 · INSTAGRAM / UGC\nFeed o fotos de personas reales]

    HP --> S9[S9 · FAQ CORTA\n3 preguntas · schema activo]

    HP --> S10[S10 · FOOTER]
Componentes detallados:
S1 · HERO

Layout: full-viewport, imagen/ video  editorial fondo
Contenido: H1 GEO-optimizado + subtítulo en 2 líneas + CTA doble
H1 ejemplo: "Joyería con alma. Hecha para quien sabe quién es."
pensemos mas opciones de textos contenidos
CTA primario: "Explorar colección" → /collections
CTA secundario: "Nuestra historia" → /pages/manifiesto
Animación: text reveal por palabras (GSAP SplitText) + parallax en imagen
Mobile: imagen centrada en pieza estrella, texto abajo
GEO: el H1 debe contener material + origen + propósito
Nota Pencil: full-width, ratio 16:9 desktop, 9:16 mobile

S2 · MARQUEE

Texto en loop continuo con frases del manifiesto
Separador: · o símbolo propio de QDM
Contenido: "Objetos con alma · Plata de ley 925 · Hecho en Europa · Para quien se atreve · Joyería con significado · QDM ·"
Velocidad: 35s loop, pausa en hover
Tipografía: ligeramente más grande que el body, tracking amplio
Función: paleta lingüística de la marca, transición visual entre secciones
Accesibilidad: aria-hidden="true"

S3 · COLECCIONES

Grid 2×2 desktop, scroll horizontal mobile
Cada card: foto editorial full-bleed + nombre colección encima (overlay oscuro)
Hover: zoom suave + desaparece el overlay → aparece el nombre con tipografía grande
Las 4 colecciones: Anillos · Aros · Collares · Joyas adaptadas (esta tiene tratamiento especial: badge "★ Exclusivo QDM")
Sin precios en este nivel — es una invitación, no un catálogo

S4 · STATEMENT

Sección minimalista: solo texto centrado, mucho espacio en blanco
Un párrafo corto del manifiesto
Ejemplo: "No creemos en la joyería como accesorio. Creemos en la joyería como símbolo. Creamos piezas que cuentan historias."
Link: "Leer el manifiesto completo →" → /pages/manifiesto
Función: pausa visual + profundidad de marca antes del catálogo

S5 · PRODUCTOS DESTACADOS

Grid 3 columnas desktop, 2 mobile
6 productos seleccionados (piezas estrella del primer drop)
Cada card: imagen principal + swap a segunda imagen en hover + nombre + precio + material visible
Stagger entrance al llegar al viewport
No es "todos los productos" — es una curaduría editorial
CTA: "Ver toda la colección →" al final

S6 · JOYERÍA ADAPTADA — sección hero propia

Layout: 2 columnas (texto izquierda, imagen derecha) desktop / stack mobile
Es la sección más única de QDM y tiene que notarse
Titular: "Joyería que se adapta a ti" o "Para quien lo escucha diferente"
Copy: breve (3-4 líneas), emotivo, sin sobreexplicar
Imagen: persona real con audífono usando la pieza — foto auténtica
CTA: "Ver la línea adaptada →" → /collections/joyas-adaptadas
Badge: "Fabricada en España · Plata reciclada 925"
Función: educación + conexión emocional + diferenciación de mercado
Nota: esta sección puede hacer llorar. Tiene que ser así.

S7 · MATERIALES + PROCESO

Layout: 2 columnas / imagen de proceso (detalle de pieza, manos trabajando)
Columna texto: 3 bullets cortos con iconos simples
"Plata de ley 925 certificada por AIDIMME"
"Plata reciclada en línea adaptada"
"Fabricación en Europa con pequeños talleres"
CTA doble: "Nuestros materiales →" y "Cómo los hacemos →"
Función: construye confianza y autoridad GEO/E-E-A-T

S8 · INSTAGRAM / UGC * esto a analizar si lo implementamos*

Pre-launch: 6 fotos curadas del proceso / producto (no grid de Instagram — fotos fijas)
Post-launch: feed real de Instagram o fotos UGC enviadas por clientes
Función: prueba social visual, "personas reales usando QDM"
Copy: "Cada pieza tiene dueña. ¿La tuya?" + "@quediriamimadre"

S9 · FAQ CORTA

Solo 3 preguntas (las más frecuentes en joyería online):
"¿De qué material están hechas las piezas?"
"¿Cómo funcionan las joyas para audífonos?"
"¿Puedo personalizar una pieza?"
Schema FAQPage activo
CTA: "Ver todas las preguntas →" → /pages/faq


3.2 COLECCIÓN /collections/[handle]
Por qué existe: Permite explorar y filtrar. El paso entre el interés general y la decisión específica.

Para quién: Clara ya sabe que quiere algo de QDM. Ahora quiere encontrar su pieza.

Principio: Curaduría visible. Primer drop tiene 10-15 piezas en catálogo — no es Amazon, no necesita filtros complejos. Pero sí necesita que cada pieza se vea como lo que es: especial.



graph TD

    COL_PAGE[PÁGINA DE COLECCIÓN] --> COL_HERO[HERO DE COLECCIÓN\nFoto full-width + nombre + descripción corta]

    COL_PAGE --> COL_FILTER[FILTROS\nMaterial · Precio · Personalizable]

    COL_PAGE --> COL_GRID[GRID DE PRODUCTOS\nStagger entrance · 3 col desktop · 2 mobile]

    COL_PAGE --> COL_SCHEMA[SCHEMA\nItemList + FAQPage colección]

    COL_PAGE --> COL_MORE[EDITORIAL SNIPPET\nTexto sobre la colección · GEO]
Componentes:
Hero de colección

Foto full-width con overlay: nombre colección grande + descripción 1 línea
Descripción es GEO-friendly: "Anillos artesanales de plata de ley 925 con piedras naturales, diseñados con intención"
Breadcrumb: Inicio > Colecciones > Anillos

Filtros (sidebar en desktop, drawer en mobile)

Material: Plata 925 / Latón + baño de oro / Acero
Precio: hasta €80 / €80–150 / €150–220 / +€220
Personalizable: Sí / No
Para audífonos: Sí (solo en joyas adaptadas)
Ordenar por: Novedades / Precio asc / Precio desc

Grid de productos

3 columnas desktop, 2 mobile
Card: foto principal + swap a foto 2 en hover + nombre + precio + material badge
Stagger entrance: cada card fade-up con delay +80ms
Badge especial en joyas adaptadas: "★ Adaptada para audífonos"

Editorial snippet al final

Párrafo de 80-120 palabras describiendo la colección
Función pura GEO: texto semántico que los LLMs indexan
Invisible para el usuario distraído, valioso para el motor de IA


3.3 FICHA DE PRODUCTO /products/[handle]
Por qué existe: El momento de la decisión. "¿La compro o no?" Clara necesita ver, entender, confiar y sentir.

Para quién: Alguien que ya eligió esta pieza específica. Tiene curiosidad, puede tener dudas, y necesita un motivo para hacer clic en "añadir al carrito".

Principio: La pieza es el protagonista. La galería domina. El texto cuenta una historia, no solo características. El precio aparece cuando ya hay contexto emocional.

graph TD

    PROD_PAGE[FICHA DE PRODUCTO] --> BREAD[BREADCRUMB\nInicio > Colección > Nombre pieza]

    PROD_PAGE --> GALLERY[GALERÍA\nImagen sticky desktop · swipe mobile]

    PROD_PAGE --> INFO[INFORMACIÓN\nTítulo · Precio · Variantes · CTA]

    PROD_PAGE --> STORY[HISTORIA DE LA PIEZA\n4 bloques narrativos]

    PROD_PAGE --> TRUST[TRUST ICONS\n3 iconos de confianza]

    PROD_PAGE --> FAQ_PROD[FAQ DE PRODUCTO\n3–5 preguntas · schema]

    PROD_PAGE --> RELATED[PIEZAS RELACIONADAS\n3-4 cards]

    PROD_PAGE --> SCHEMA_PROD[SCHEMA\nProduct + FAQPage + BreadcrumbList]

    GALLERY --> G1[Imagen principal · grande]

    GALLERY --> G2[Thumbnails · min 3 fotos]

    GALLERY --> G3[Crossfade al cambiar]

    STORY --> ST1[Bloque 1: QUÉ ES\n50 palabras]

    STORY --> ST2[Bloque 2: MATERIALES\nEspecificaciones concretas]

    STORY --> ST3[Bloque 3: PROCESO\nCómo y dónde se hizo]

    STORY --> ST4[Bloque 4: PARA QUIÉN\nOcasión y significado]
Layout desktop: 2 columnas (60/40)
Columna izquierda — Galería sticky

Imagen principal: grande, alta resolución, zoom en click/tap
Thumbnails debajo: mínimo 3 (frontal, detalle, puesta en modelo)
Crossfade al cambiar thumbnail: 250ms opacity
GSAP ScrollTrigger: la galería queda fija mientras el texto de la derecha hace scroll
Mobile: swipe horizontal, full-width

Columna derecha — Información

Breadcrumb (pequeño, discreto, schema activo)
H1: nombre de la pieza — descriptivo para GEO + poético para la marca
Ejemplo: "Anillo Garnet · Plata 925 con granate oval"
Precio — visible, sin decoración excesiva. €150–220 para piezas estrella.
Selector de variantes — talla (para anillos), material o acabado si aplica. Nombres descriptivos nunca "Option 1".
CTA primario: "Añadir al carrito" — color de acento, full-width en mobile
Trust icons (3 iconos horizontales):
🔒 Plata 925 certificada AIDIMME
📦 Envío con seguro incluido
↩️ Devolución 14 días
Historia de la pieza (4 bloques con reveal progresivo):
Qué es: 50 palabras. Responde "qué tengo en mis manos".
Materiales: lista concreta. "Plata de ley 925 (92.5% plata pura). Sin níquel. Apto para pieles sensibles. Certificada por AIDIMME."
Proceso: dónde y cómo. "Fabricada en colaboración con un taller especializado en España."
Para quién: la emoción. "Para el momento en que decides que ya es hora de comprarte algo que te dure más que una temporada."
Cuidados: link a guía → /pages/materiales
FAQ del producto (accordion, 3-5 preguntas, schema FAQPage)


3.4 JOYERÍA ADAPTADA /collections/joyas-adaptadas
Por qué existe: Es el diferenciador más único de QDM en el mercado. Nadie más lo hace con esta narrativa y calidad. Necesita su propio universo visual y emocional.

Para quién: Personas con hipoacusia que usan audífonos BTE/RIC y nunca encontraron joyería diseñada para ellos. También para familiares y amigos que quieren regalar algo que entiende su realidad. Y para cualquiera que quiera apoyar la inclusión comprando con intención.

Principio: Educación + Emoción + Funcionalidad. Primero explicar qué es y por qué importa. Luego mostrar la pieza. Nunca tratar este producto como "especial" en el sentido de separarlo — es simplemente joyería que piensa en más personas.

graph TD

    ADAPT[PÁGINA JOYAS ADAPTADAS] --> AH[HERO PROPIO\n'Para quien lo escucha diferente']

    ADAPT --> AED[SECCIÓN EDUCATIVA\nQué es un audífono BTE/RIC · cómo funciona la pieza]

    ADAPT --> AGRID[GRID DE PRODUCTO\nDe momento: 1 pieza principal]

    ADAPT --> ATEST[TESTIMONIO / UGC\nFoto real · historia real]

    ADAPT --> AFAQ[FAQ ESPECÍFICA\n'¿Se adapta a mi modelo?'\n'¿Es compatible con X marca?']

    ADAPT --> ASCHEMA[SCHEMA\nProduct + FAQPage especial]

    AED --> AED1[Ilustración o foto\nde cómo se usa la pieza]

    AED --> AED2[3 bullets funcionales\n'Compatible BTE y RIC'\n'Plata reciclada 925'\n'Fabricada en España']

    AED --> AED3[Link: 'Cómo saber si es compatible\ncon mi audífono']

Diferencia de diseño vs. otras colecciones:

El hero tiene una persona real con audífono — autenticidad antes que estética perfecta
La sección educativa no es un manual — es empática y directa
El copy usa "tú" y habla de experiencia real, no de características técnicas
El FAQ es más extenso porque las dudas de compra son más específicas


3.5 MANIFIESTO /pages/manifiesto
Por qué existe: El alma de la marca en una sola página. Para la compradora que quiere saber en qué está creyendo cuando compra QDM. Y para los motores de IA: es contenido E-E-A-T de alta densidad.

Para quién: Clara llega aquí cuando quiere más que un producto — quiere una marca en la que creer.

Componentes:

H1: "Por qué existe QDM" o el nombre completo de la marca desplegado
El manifiesto completo — dividido en párrafos cortos, con mucho espacio
Una cita por sección: fragmentos del texto entre líneas visuales
Imagen: foto del proceso / de las fundadoras / del taller
CTA al final: "Conocer la colección →" o "Ver las piezas →"
Schema: Organization + Person (las fundadoras)
Sin menú de navegación secundario — página de lectura inmersiva


3.6 SOBRE NOSOTRAS /pages/sobre-nosotras
Por qué existe: GEO — la IA necesita entender quiénes son las fundadoras. Confianza — la compradora quiere saber quién está detrás. Autoridad — la hipoacusia no es una estrategia de marketing: es una historia real.

Componentes:

H1: "QDM · Qué Diría Mi Madre" + tagline descriptivo
Historia de las fundadoras: primero personas, luego marca
Por qué la joyería adaptada nació de una necesidad real
El taller / proceso de selección de piezas
Fotos: reales, no de estudio. Proceso, personas, lugar.
Schema: Person × 2 (fundadoras) + Organization
CTA: "Ver el manifiesto" + "Explorar las colecciones"


3.7 BLOG — JOURNAL /blogs/journal
Por qué existe: GEO puro. Contenido semántico que los LLMs indexan y citan. Cada post es una respuesta a una pregunta real de la audiencia.

Nombre del canal: "Journal" — no "Blog". Es más coherente con la identidad de la marca.

Primeros 6 posts (ya planificados en estrategia GEO):

"Qué es la plata de ley 925 y por qué importa"
"Cómo elegir la talla de anillo correcta"
"Joyería para audífonos: cómo funciona y qué buscar"
"Diferencia entre plata bañada y plata de ley"
"Cómo cuidar tus joyas de plata"
"Guía de regalos con significado"

Componentes del listing:

Grid de 2 columnas (editorial, no blog estándar)
Cada card: imagen + categoría tag + titular + fecha + tiempo de lectura

Componentes del artículo:

H1 + fecha + tiempo de lectura
Foto hero
Cuerpo: pirámide invertida (respuesta directa primero)
Article schema con dateModified
CTA al final: pieza relacionada con el tema del post


3.8 FAQ /pages/faq
Por qué existe: Reduce fricciones de compra. Y es una de las páginas más citadas por LLMs para queries de intención.

Grupos de preguntas:

Materiales y calidad (5 preguntas)
Joyería adaptada para audífonos (5 preguntas — las más específicas)
Tallas y medidas (3 preguntas)
Envíos y entregas (4 preguntas)
Devoluciones (3 preguntas)
Cuidado de las piezas (3 preguntas)
Personalización (2 preguntas)

Schema: FAQPage completo


3.9 FOOTER
Componentes:

[LOGO + tagline corto]    [COLECCIONES]           [MARCA]              [AYUDA]

                          Anillos                  Manifiesto           FAQ

                          Aros                     Sobre nosotras       Envíos y devoluciones

                          Collares                 Proceso              Contacto

                          Pulseras                 Materiales           

                          Joyas adaptadas          Journal              

[RRSS: IG + Pinterest]   [NEWSLETTER: "Una pieza al mes. Nada más."]

[Copyright · Privacidad · Términos · Cookies · Made with ♥ in España]


4. INVENTARIO DE COMPONENTES
4.1 Componentes globales
Componente
Archivo
Propósito
Animación
Header/Nav
sections/header.liquid
Navegación global, cart trigger
Transparente → sólido en scroll
Cart drawer
sections/cart-drawer.liquid
Carrito lateral sin salir de página
Slide-in desde derecha
Footer
sections/footer.liquid
Links, RRSS, newsletter
—
Cookie banner
sections/cookie-banner.liquid
RGPD compliance
Fade-in desde abajo

4.2 Componentes de página
Componente
Dónde se usa
Propósito
Notas
qdm-hero
Homepage, Colecciones, Manifiesto
Primera impresión
Parallax, text reveal
qdm-marquee
Homepage
Frases de manifiesto en loop
CSS puro
qdm-product-card
Homepage, Colecciones
Preview de producto
Swap imagen en hover
qdm-collection-grid
Colecciones
Lista de colecciones editoriales
Grid 2×2
qdm-statement
Homepage
Texto del manifiesto
Fade-in centrado
qdm-adapted-feature
Homepage, Joyas adaptadas
Sección del diferenciador
Especial
qdm-materials-row
Homepage, About
Materiales en 2 col
—
qdm-ugc-grid
Homepage
Instagram / fotos reales
—
qdm-faq-accordion
Homepage, FAQ, Producto
Preguntas frecuentes
Accordion animado
qdm-trust-icons
Producto, Footer
Certificaciones y confianza
—
qdm-related-products
Producto
Cross-sell curado
—
qdm-journal-grid
Blog listing
Grid editorial de posts
—

4.3 Snippets reutilizables
Snippet
Propósito
qdm-product-card.liquid
Card de producto (usado en múltiples secciones)
qdm-badge.liquid
Badge de material / "adaptada" / "nuevo"
qdm-breadcrumb.liquid
Breadcrumb con schema
qdm-schema-product.liquid
JSON-LD Product schema
qdm-schema-faq.liquid
JSON-LD FAQPage schema
qdm-schema-org.liquid
JSON-LD Organization + Person schema



5. SISTEMA DE DISEÑO — TOKENS BASE
5.1 Estructura visual
QDM Design System

├── Paleta ✅ CONFIRMADA (brand guide Mariela Caro)

│   ├── #FFFEF7 Crema — fondo principal

│   ├── #E0DED7 Arena — fondos secundarios

│   ├── #CFBFB3 Nude — bordes suaves

│   ├── #C9A787 Camel — detalles cálidos

│   ├── #EBB86E Ámbar — ACENTO PRINCIPAL (CTAs)

│   └── #262522 Carbón — texto principal

│   ├── color-primary (fondo principal)

│   ├── color-accent (CTAs, badges)

│   ├── color-text-primary

│   ├── color-text-secondary

│   ├── color-border

│   └── color-adapted (exclusivo para línea de audífonos — sugerido: deep violet)

├── Tipografía

│   ├── heading: Work Sans (Google Fonts · libre)

│   ├── body: legible, neutro, 16px base

│   └── label: tracking amplio, uppercase para badges y categorías

├── Espaciado

│   └── escala 4px: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128

├── Radios

│   ├── sm: 4px

│   ├── md: 8px

│   └── lg: 16px · rounded para cards

└── Breakpoints

    ├── mobile: < 768px

    ├── tablet: 768–1024px

    └── desktop: > 1024px
5.2 Jerarquía tipográfica
Nivel
Uso
Tamaño desktop
Tamaño mobile
Display
Hero headline principal
56–72px
36–48px
H1
Títulos de página
40–48px
28–36px
H2
Títulos de sección
28–32px
22–26px
H3
Títulos de componente
20–24px
18–20px
Body
Texto de descripción
16px
15px
Small
Badges, labels, meta
12–13px
12px



6. SCHEMA MARKUP — MAPA DE IMPLEMENTACIÓN
graph LR

    subgraph GLOBAL["Todas las páginas (theme.liquid)"]

        ORG[Organization\nQDM · fundadoras · RRSS]

        WEB[WebSite\n+ SearchAction]

    end

    subgraph HOME_S["Homepage"]

        FAQHOME[FAQPage\n3 preguntas]

        ITEMLIST[ItemList\nproductos destacados]

    end

    subgraph COL_S["Colecciones"]

        ITEMLIST2[ItemList\nproductos de la colección]

        FAQCOL[FAQPage\n3 preguntas de categoría]

        BREADCOL[BreadcrumbList]

    end

    subgraph PROD_S["Ficha de producto"]

        PRODUCT[Product\nnombre · material · precio · SKU · imágenes]

        OFFER[Offer\nprecio · disponibilidad · envío]

        RATING[AggregateRating\ncuando haya reviews]

        FAQPROD[FAQPage\n3-5 preguntas del producto]

        BREADPROD[BreadcrumbList]

    end

    subgraph ABOUT_S["Sobre nosotras / Manifiesto"]

        PERSON[Person × 2\nlas fundadoras]

        ORG2[Organization\ncompleto aquí también]

    end

    subgraph BLOG_S["Blog / Journal"]

        ARTICLE[Article\nfecha · autor · modificado]

        HOWTO[HowTo\nen posts de proceso]

    end

    PRODUCT --> OFFER

    PRODUCT --> RATING

    PRODUCT --> FAQPROD

    style PROD_S fill:#e0f2fe,stroke:#0284c7

    style ABOUT_S fill:#f0fdf4,stroke:#16a34a


7. ESPECIFICACIONES PARA PENCIL — ANOTACIONES POR VISTA
7.1 Homepage — wireframe specs
VIEWPORT: 1440px desktop / 390px mobile

[NAV]

height: 72px desktop · 60px mobile

logo: izquierda · centrado mobile

links: derecha desktop · hamburger mobile

cart: ícono con counter siempre visible

estado scroll: transparente → fondo sólido a 80px

[S1 HERO]

height: 100vh

imagen: full-bleed, object-fit cover

overlay: gradiente sutil abajo (texto legible)

texto: centrado o alineado izquierda (definir en mockup)

H1: máximo 2 líneas en desktop, 3 en mobile

CTA group: 2 botones horizontales desktop, stack en mobile

padding texto: 80px horizontal desktop, 24px mobile

[S2 MARQUEE]

height: 56px

texto: single line, overflow hidden, loop

separador: · (punto centrado)

border top y bottom: 1px color-border

[S3 COLECCIONES]

height: auto (ratio imagen 4:5)

grid: 2 columnas × 2 filas desktop, scroll horizontal mobile

gap: 12px

overlay: semi-transparente, texto en bottom

hover: zoom imagen + texto se centra y agranda

[S4 STATEMENT]

padding: 120px vertical desktop, 64px mobile

max-width: 640px, centrado

tipografía: Display · texto centrado

[S5 PRODUCTOS DESTACADOS]

grid: 3 columnas desktop, 2 mobile

gap: 24px desktop, 12px mobile

card height: auto (imagen ratio 3:4)

info: padding 12px · nombre · precio · badge material

[S6 JOYERÍA ADAPTADA]

layout: 2 col 50/50 desktop, stack mobile

padding: 96px vertical desktop

imagen: ratio 1:1, con persona real

texto: H2 + párrafo + CTA + badge materiales

background: distinto al resto de la página (color neutro suave)

[S7 MATERIALES + PROCESO]

layout: 2 col 40/60 desktop, stack mobile

imagen: proceso, no producto

texto: bullet list × 3 + 2 CTAs

[S8 UGC / IG]

grid: 6 fotos, 3 col desktop · 2 mobile

fotos: cuadradas (1:1), sin texto

caption: "@quediriamimadre" centrado abajo

[S9 FAQ]

max-width: 720px, centrado

3 preguntas accordion

CTA: link texto al final

[FOOTER]

4 columnas desktop, 2 mobile

altura: auto

newsletter: input + button en una línea

rrss: iconos simples (IG + Pinterest)

legal: fila inferior con separadores


8. CHECKLIST PRE-MOCKUP
Lo que tenemos confirmado ✅
Nombre de marca: QDM / Qué Diría Mi Madre
Dominio: quediriamimadre.com
Plataforma: Shopify Heritage
Logo en SVG
Paleta de colores (referencias disponibles)
Tipografía elegida
Manifiesto de marca completo
Definición de "Clara" (compradora)
Dos líneas de producto: joyería tradicional + adaptada
Primer drop: 15–18 piezas
Ticket medio: €150–220
Materiales: plata 925 + latón + baño de oro
Lo que necesitamos antes del mockup ⏳
Fotos de producto (mínimo 3 por pieza)
Foto de las fundadoras / taller (real, no de estudio)
Foto de persona con audífono usando la pieza
Nombres de las piezas (¿tienen nombre propio?)
Lista final de los 15–18 productos del primer drop con precios
Copy del hero (H1 aprobado)
Copy del statement de homepage (fragmento del manifiesto)
Confirmación: ¿el blog se llama "Journal"?
Confirmación: ¿hay sección de personalización en el primer drop?
Decisiones de diseño a tomar en primera sesión de Pencil 🎨
Orientación del hero: texto centrado o alineado izquierda
Background de la marca: ¿claro o oscuro como base?
Treatment de la sección de joyas adaptadas: ¿color diferenciador?
¿Hay página de manifiesto separada o se integra en About?
Nombre del blog: ¿Journal, Historia, o simplemente Blog?


9. NOTAS PARA DESARROLLO — SHOPIFY HERITAGE SPECIFICS
URLs definitivas en Shopify
/                                → Homepage

/collections/anillos             → Colección anillos

/collections/aros                → Colección aros

/collections/collares            → Colección collares

/collections/pulseras            → Colección pulseras

/collections/joyas-adaptadas     → ★ Joyería adaptada (ÚNICO)

/products/[handle]               → Ficha de producto

/pages/manifiesto                → Manifiesto (ÚNICO - no estándar)

/pages/sobre-nosotras            → About

/pages/proceso                   → Proceso

/pages/materiales                → Materiales

/pages/faq                       → FAQ

/pages/contacto                  → Contacto

/pages/envios-y-devoluciones     → Envíos

/blogs/journal/[slug]            → Blog posts

/policies/privacy-policy         → Shopify nativo

/policies/refund-policy          → Shopify nativo

/policies/shipping-policy        → Shopify nativo
Metafields de producto requeridos (Shopify)
custom.material         → String: "Plata de ley 925 + baño de rodio"

custom.dimensions       → String: "Diámetro 18mm · Peso 3g"

custom.process          → Text: párrafo del proceso de fabricación

custom.for_whom         → Text: párrafo "para quién es esta pieza"

custom.certified_by     → String: "AIDIMME"

custom.hearing_aid      → Boolean: para joyas adaptadas

custom.compatible_with  → String: "BTE · RIC"

custom.recycled_silver  → Boolean: plata reciclada sí/no


