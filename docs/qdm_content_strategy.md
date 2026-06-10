QDM · Estrategia de contenido y voz de marca
quediriamimadre.com · 
Rol: Este documento define cómo habla QDM, qué dice, cómo lo dice y por qué.
Para: Redacción web, fichas de producto, blog, redes sociales, emails.
Principio rector: Clara compra desde la emoción, el significado y la aspiración.
Cada palabra tiene que hacer una de tres cosas: conectarla emocionalmente, darle información para confiar, o proyectarla hacia quien quiere ser.


1. IDENTIDAD DE VOZ
El núcleo
QDM habla como una amiga que sabe lo que quiere y no pide permiso para decirlo.
No es una marca corporativa. No es un catálogo. Es una conversación entre iguales.

"Qué diría mi madre" no es una pregunta que hacemos con miedo.
Es la pregunta que hacemos justo antes de hacer lo que queremos hacer de todas formas.


Los cuatro tonos de QDM
Tono
Cuándo
Cómo suena
Íntimo
About, Manifiesto, Joyas adaptadas
Primera persona. Vulnerable sin ser débil. 
Poético-directo
Fichas de producto, Hero, Statement
Frases cortas. Imágenes concretas. Sin adjetivos vacíos.
Técnico-humano
Materiales, FAQ, Proceso, Guías
Datos precisos + por qué importan. Nunca frío.
Defiant suave
Marquee, Campañas, Redes
Una actitud. No agresiva, pero tampoco disculpándose.



Lo que QDM DICE vs lo que NO dice
❌ Nunca decimos
✅ Decimos esto 
"exclusivo"
"curado" / "seleccionado" / "elegido con intención"
"de alta gama"
"de plata de ley 925 certificada"
"premium"
"hecha para durar más que una temporada"
"perfecta para regalar"
"para alguien que merece algo con historia"
"joya para personas con hipoacusia"
"diseñada para quien lo vive de otra manera"
"calidad garantizada"
"certificada por AIDIMME · plata 925"
"somos una marca joven"
[no se menciona la edad de la marca]
"lo mejor del mercado"
[nunca hacemos comparaciones directas]
"¡Oferta!"
"disponible por tiempo limitado"
"lujo accesible"
[no usamos "lujo" — es una palabra vacía para este público]



Construcción gramatical
Tú, siempre. Nunca "usted". Nunca "vosotros" (funciona mal en Argentina).
Nosotras cuando hablamos de la marca (no "nosotros"). QDM es femenino.
Frases cortas. Si una frase tiene más de 20 palabras, partirla.
Punto final incluso en frases sueltas. Le da peso.
Sin signos de exclamación en el copy principal. La emoción viene del contenido, no de la puntuación.
Emojis: nunca en web copy. Solo ocasionalmente en Instagram stories.
Mayúsculas: solo en nombres propios y siglas. Nunca en medio de frase para "enfatizar".


2. PALETA LINGÜÍSTICA
Palabras que construyen el universo de QDM. Usarlas con criterio, no acumularlas.
Palabras QDM 
alma          símbolo       intención     historia      significado

resilencia    silencio      fuerza        identidad     memoria

construir     transformar   elegir        atreverse     llevar puesto

antes y después   raíces    distinto/a    vínculo       reconocer

curaduría     artesanal     certificada   reciclada     hecha en España

objeto        pieza         permanente    diferente     propio/a
Palabras prohibidas 
exclusivo     premium       lujo          moda          tendencia

accesorio     complemento   colección cápsula          viral

increíble     espectacular  único en su clase           top ventas

ideal para    perfecto para calidad-precio              asequible


3. PALETA DE COLORES — TOKENS CSS
/* QDM Design Tokens · Desde brand guide oficial */

:root {

  /* Fondos */

  --qdm-cream:    #FFFEF7; /* Fondo principal — blanco crema cálido */

  --qdm-sand:     #E0DED7; /* Fondo secundario — secciones alternadas */

  --qdm-nude:     #CFBFB3; /* Bordes, separadores suaves */

  /* Tierra */

  --qdm-camel:    #C9A787; /* Hover states, iconos, detalles cálidos */

  --qdm-amber:    #EBB86E; /* ★ Acento principal — CTAs, badges, highlights */

  /* Texto */

  --qdm-carbon:   #262522; /* Texto principal — negro carbón cálido */

  --qdm-carbon-60: rgba(38, 37, 34, 0.6); /* Texto secundario */

  --qdm-carbon-30: rgba(38, 37, 34, 0.3); /* Placeholders, borders */

  /* Tipografía */

  --qdm-font-heading: 'Work Sans', sans-serif;

  --qdm-font-body:    'Source Sans 3', sans-serif;

  /* Uso específico */

  --qdm-bg:         var(--qdm-cream);    /* Background de página */

  --qdm-bg-alt:     var(--qdm-sand);     /* Secciones alternadas */

  --qdm-text:       var(--qdm-carbon);   /* Texto principal */

  --qdm-accent:     var(--qdm-amber);    /* Botones, badges, links activos */

  --qdm-border:     var(--qdm-nude);     /* Bordes de cards y separadores */

}
Uso por componente
Elemento
Color
Background página
#FFFEF7 crema
Secciones alternadas (materiales, FAQ)
#E0DED7 arena
Texto principal
#262522 carbón
Texto secundario / metadatos
carbón al 60%
CTA primario (fondo)
#EBB86E ámbar
CTA primario (texto)
#262522 carbón
CTA secundario (outline)
borde #262522 + texto carbón
Hover de CTA
#C9A787 camel
Badge "Adaptada para audífonos"
#EBB86E ámbar + carbón
Badge material
#E0DED7 arena + carbón
Separadores / marquee border
#CFBFB3 nude
Nav scrolled background
#FFFEF7 al 95% + backdrop blur



4. TIPOGRAFÍA — SISTEMA
WORK SANS — Headings

├── Display (Hero): 600 weight · 56–72px desktop · 36–48px mobile

│   letter-spacing: -0.02em

│   Uso: H1 del hero, titulares de sección grandes

│

├── Heading 1: 500 weight · 40–48px desktop

│   letter-spacing: -0.01em

│   Uso: Títulos de página

│

├── Heading 2: 500 weight · 28–32px desktop

│   letter-spacing: 0

│   Uso: Títulos de sección

│

└── Heading 3: 400 weight · 20–24px desktop

    Uso: Nombres de producto, subtítulos de componente

SOURCE SANS 3 — Body

├── Body largo: 400 weight · 16px · line-height 1.7

│   Uso: Descripciones, textos editoriales, blog

│

├── Body corto: 400 weight · 15px · line-height 1.5

│   Uso: Cards, snippets, FAQ

│

└── Label / Badge: 500 weight · 12–13px

    letter-spacing: 0.06em · text-transform: uppercase

    Uso: Badges de material, breadcrumbs, metadatos


5. COPY REAL — SECCIÓN POR SECCIÓN
5.1 NAVEGACIÓN
Colecciones    Joyas adaptadas    Manifiesto    Journal    [carrito]

Nota: "Joyas adaptadas" en el nav principal — no escondida. Es el diferenciador.


5.2 HERO — HOMEPAGE
Versión 1 (más poética):

H1:   Objetos con alma.

      Para quien sabe quién es.

SUB:  Joyería de plata 925 con significado. Hecha en Europa

      para mujeres que construyen su propia versión de éxito.

CTA1: Explorar colecciones

CTA2: Nuestra historia

Versión 2 (más directa, GEO-friendly):

H1:   Joyería artesanal con significado.

      Diseñada para durar.

SUB:  Plata de ley 925 certificada. Fabricada en Europa.

      Para quien elige piezas que cuentan algo.

CTA1: Ver la colección

CTA2: Qué es QDM

Versión 3 (más defiant — más arriesgada pero más QDM):

H1:   Qué diría mi madre

      si supiera lo bien que me queda.

SUB:  Joyería con intención. Plata 925 certificada.

      Para quien ya dejó de pedirle permiso al qué dirán.

CTA1: Ver piezas

CTA2: Leer el manifiesto

Recomendación: Versión 3 para el lanzamiento. Es auténtica al nombre de la marca.
Versión 2 como alternativa A/B test si la conversión es baja en el primer mes.


5.3 MARQUEE
Objetos con alma · Plata 925 certificada · Fabricada en Europa · 

Para quien se atreve · Símbolo antes que tendencia · 

Hecha con intención · QDM · Qué Diría Mi Madre · 

Se repite dos veces en el HTML para loop perfecto. Separador: ·


5.4 STATEMENT (sección de texto solo)
No creemos en la joyería como accesorio.

Creemos en la joyería como símbolo.

Creamos piezas que no siguen tendencias: cuentan historias.

Cada diseño nace con intención, carácter y una identidad propia.

[Leer el manifiesto completo →]


5.5 SECCIÓN COLECCIONES
Cada colección necesita una línea descriptiva. Copy sugerido:

ANILLOS

"Para el dedo que ya decidió qué va a llevar puesto hoy."

AROS

"La pieza que más se ve. Que más se nota. Que más dice."

COLLARES

"Cerca del cuello. Cerca de todo lo que importa."

PULSERAS

"Lo que acompaña sin hacer ruido. Pero siempre está."

JOYAS ADAPTADAS ★

"Porque llevar un audífono no es un límite.

Es una parte de quien sos."


5.6 SECCIÓN JOYAS ADAPTADAS — HOMEPAGE
TÍTULO:

Diseñada desde adentro.

COPY:

Sabemos lo que es. No como tendencia, sino como experiencia vivida.

Creamos joyería adaptada para personas que usan audífonos

porque creemos que ningún dispositivo debería hacer que te

sintieras menos tú misma.

Plata 925 reciclada. Fabricada en España.

Para quien lo escucha diferente — y lo lleva con orgullo.

[Ver joyas adaptadas →]

BADGE: Fabricada en España · Plata reciclada 925


5.7 SECCIÓN MATERIALES + PROCESO
TÍTULO:

Lo que elegimos y por qué.

BULLETS:

· Plata de ley 925 certificada por AIDIMME

  92.5% plata pura. Sin níquel. Durable. Real.

· Plata reciclada en nuestra línea adaptada

  De objetos que completaron su ciclo. Transformados en algo nuevo.

· Fabricación en Europa con pequeños talleres

  No trabajamos con grandes volúmenes. Elegimos la curaduría.

[Nuestros materiales →]   [Cómo los hacemos →]


5.8 MANIFIESTO — PÁGINA COMPLETA
QDM · Qué Diría Mi Madre

Manifiesto

—

Nace como una respuesta al "qué dirán".

Una reivindicación de la libertad de ser uno mismo.

De hacer lo que uno desea. De mostrarse tal como es.

Más allá de las expectativas. De lo que se considera correcto,

atractivo o aceptable.

—

No creemos en la joyería como accesorio.

Creemos en la joyería como símbolo.

Creamos piezas originales que no siguen tendencias: cuentan historias.

Cada diseño nace con intención, carácter y una identidad propia.

No trabajamos con grandes volúmenes.

Elegimos la curaduría antes que la cantidad.

La calidad antes que la rotación.

El significado antes que la moda.

—

Nuestras piezas representan vínculos.

La conexión con la familia.

La complicidad con los amigos.

La relación más importante: la que tenemos con nosotras mismas.

—

Hablamos de resiliencia. De fuerza silenciosa.

De momentos que marcan un antes y un después.

De recuerdos que se transforman en símbolos.

—

No vendemos joyas.

Creamos objetos con alma.

Pequeños recordatorios de quién sos, de dónde venís

y de todo lo que sos capaz de sostener.

Porque lo que se lleva puesto también puede llevar significado.

—

[Explorar la colección →]


5.9 SOBRE NOSOTRAS
H1: QDM · Qué Diría Mi Madre

QDM nace de una pregunta. De esa pregunta específica

que todos nos hacemos justo antes de ser completamente

honestos con nosotros mismos.

La marca surge de la experiencia personal de convivir

con la hipoacusia. De años de sentir que ciertas cosas

—la joyería incluida— no estaban pensadas para ti.

No como queja. Como punto de partida para hacer algo diferente.

—

Trabajamos con dos líneas de producto que responden

a procesos distintos pero comparten los mismos criterios:

diseño, calidad y funcionalidad.

Para la joyería tradicional: colaboramos con fabricantes

especializados y seleccionamos cada pieza con criterio.

No ponemos cualquier cosa. Ponemos lo que nos pondríamos.

Para la joyería adaptada: la desarrollamos nosotras.

Fabricada en España, con plata 925 procedente de materiales

reciclados. Porque creemos en las segundas oportunidades.

—

[Ver el manifiesto →]   [Explorar la colección →]


6. COPY DE FICHAS DE PRODUCTO
6.1 Estructura por bloque
TÍTULO del producto (H1): Formato: [Nombre poético] · [Material principal]

Ejemplos:

"Anillo Luna · Plata 925 con piedra luna arco iris"
"Aro Espiral · Plata 925 bañada en oro 18k"
"Anillo Garnet · Plata 925 con granate oval"

BLOQUE 1 — QUÉ ES (50 palabras max, emocional-funcional)

Template:

[Nombre de la pieza] está hecha para [ocasión/momento/tipo de persona].

[Material + especificación concreta]. [Una frase sobre su carácter o lo que transmite].

No es una pieza para todos los días. / Es la pieza de todos los días.

[Final que conecte con la narrativa de QDM].

Ejemplo para anillo con granate:

Un anillo que no pide permiso para notarse. Plata de ley 925

con granate oval natural. Facetado a mano. El granate es una

piedra de protección y arraigo. De las que se llevan cuando

necesitás recordar de qué estás hecha.

BLOQUE 2 — MATERIALES (técnico, preciso, breve)

Template:

· [Material principal] — [especificación] — [por qué importa]

· [Acabado] — [característica]

· [Certificación si aplica]

· [Información de compatibilidad si es pieza adaptada]

Ejemplo:

· Plata de ley 925 (92.5% plata pura) — sin níquel — apta para pieles sensibles

· Granate oval natural — talla facetada — color vino profundo

· Certificada por AIDIMME

· Baño de rodio disponible para mayor durabilidad

BLOQUE 3 — PROCESO (humano, breve)

Template:

Fabricada en colaboración con [descripción del fabricante, no nombre].

[Técnica o característica del proceso]. [Dato de origen].

[Tiempo aproximado o característica artesanal si aplica].

Ejemplo:

Fabricada en colaboración con un taller especializado en España.

Cada piedra se selecciona de forma individual: no hay dos iguales.

Producción en pequeñas series. Sin grandes volúmenes.

BLOQUE 4 — PARA QUIÉN (aspiracional, identitario)

Template:

Para [momento o tipo de persona]. Para cuando [emoción o situación].

Para llevar cuando [contexto significativo]. / El autorregalo que [acción significativa].

Ejemplos:

Para cuando decidiste que ya era hora de comprarte algo que durara

más que una temporada. Para la Clara que construye en silencio

pero no tiene miedo de que se note.

---

El autorregalo después de meses de esfuerzo.

El símbolo de un antes y un después que solo tú sabés cuál es.

---

Para regalar a quien lo hace todo sin que nadie lo vea.

Y que por eso mismo merece algo que dure.

FAQ DEL PRODUCTO (3-5 preguntas, directo)

Template de preguntas frecuentes por tipo:

Para anillos:

¿Cómo elijo mi talla?

Podés medir el diámetro interior de un anillo que ya tengas

o usar nuestra guía de tallas. Si estás entre dos, elegí la más grande.

Escribinos si tenés dudas — [contacto].

¿Con qué puedo combinar este anillo?

Con lo que quieras. No diseñamos para que "combine" —

diseñamos para que diga algo.

¿Se puede personalizar?

Consultanos. Trabajamos en personalización según disponibilidad.

Para joyas adaptadas:

¿Es compatible con mi audífono?

Esta pieza está diseñada para modelos BTE y RIC, que son

los más comunes. Si tenés otro modelo, escribinos con las

medidas y lo evaluamos.

¿Qué incluye la pieza?

Aro + adaptador de silicona + tubo. Todo lo necesario para usarla

sin modificar tu audífono.

¿De qué material es el adaptador?

Silicona médica hipoalergénica. El aro es plata 925 reciclada.


7. COPY DEL JOURNAL (BLOG)
7.1 Titulares optimizados GEO + tono QDM
Título GEO (para LLMs)
Título QDM (para Clara)
Qué es la plata de ley 925 y por qué importa
La plata que dura. Lo que tenés que saber antes de comprar.
Joyería para audífonos: cómo funciona y qué buscar
Para quien lo escucha diferente: cómo elegir una joya que te entienda.
Diferencia entre plata bañada y plata de ley
Por qué tu joya se oscureció (y no es culpa tuya).
Cómo elegir la talla de anillo correcta
El anillo que querés. En la talla que necesitás.
Guía de regalos con significado
No otro regalo olvidable. Una guía para regalar algo que importe.
Cómo cuidar tus joyas de plata
Tus joyas duran lo que las cuidás. Guía sin complicaciones.


Usar el título QDM en el H1 de la página. Usar el título GEO en el meta title y en la URL.
7.2 Estructura de un post QDM
[TÍTULO QDM — emocional]

[Párrafo de entrada — pirámide invertida: la respuesta primero]

[Máx 3 líneas. Responde la pregunta del título en 40-60 palabras.]

---

[Desarrollo — tan largo como sea necesario, no más]

[H2 descriptivos para LLMs]

[Tablas comparativas cuando aplica]

[Siempre en segunda persona: "si tenés un anillo de plata"]

---

[Cierre — una frase del universo QDM]

[No un resumen. Una idea que se lleven.]

[CTA: pieza relacionada con el tema del post]


8. COPY PARA LA LÍNEA ADAPTADA — GUÍA ESPECIAL
Principios de comunicación para joyas adaptadas
Esta sección tiene principios propios porque el terreno es más sensible.

1. La persona primero, el dispositivo después
No "joya para personas con audífono" → "joya diseñada para quienes usan audífono"
La diferencia es sutil pero real: el primero define a la persona por su dispositivo.

2. Empoderar, no acomodar
No "adaptamos nuestra joyería para incluir" → "diseñamos pensando en quienes siempre quedaron afuera"
Una activa. La otra pasiva.

3. Sin dramatismo ni superación
No "a pesar de su audífono, lleva joyas hermosas" → esto no es una historia de superación.
Es simplemente un producto bien pensado.

4. La experiencia vivida como autoridad
Mencionar que la marca nace de la experiencia personal con hipoacusia.
Pero una vez. No repetir en cada pieza.
Copy específico para la página de joyas adaptadas
H1: Diseñada para quien lo vive de verdad.

INTRO:

Esta línea no nació de una investigación de mercado.

Nació de años de buscar una joya que funcionara bien

con un audífono y no encontrarla.

Así que la hicimos.

---

SECCIÓN EDUCATIVA:

¿Cómo funciona?

Los modelos BTE (Behind The Ear) y RIC (Receiver In Canal)

son los audífonos más comunes. Se colocan detrás de la oreja.

La mayoría de los aros estándar no están pensados para convivir

con ellos — se enganchan, se caen, o simplemente no se ven bien.

Nuestra pieza está compuesta por un aro, un adaptador de silicona

y un tubo. Todo diseñado para que la joya y el audífono coexistan

con naturalidad. Sin que uno quite protagonismo al otro.

---

MATERIALES:

Plata 925 procedente de materiales reciclados.

Fabricada en España, en colaboración con talleres especializados.

Porque creemos en las segundas oportunidades.

En la posibilidad de transformar lo que parecía haber perdido

su lugar en algo nuevo y lleno de significado.

---

FAQ ESPECÍFICA:

¿Es compatible con todas las marcas de audífonos?

Está diseñada para los modelos más comunes BTE y RIC.

Si tenés un modelo específico, escribinos — lo evaluamos juntas.

¿Se adapta o hay que modificar el audífono?

No se modifica nada. La pieza se adapta al audífono, no al revés.

¿Es cómoda para uso diario?

Sí. El adaptador de silicona médica es hipoalergénico y está

pensado para llevarse todo el día sin molestia.

¿Solo viene en plata o hay más opciones?

Por ahora en plata 925 reciclada. Próximamente en más acabados.


9. EMAILS TRANSACCIONALES — TONO
Los emails de Shopify (confirmación de pedido, envío) también tienen que sonar a QDM.
Email de confirmación de pedido
ASUNTO: Tu pieza está en camino. 🖤

[sin emojis en la web, pero en email uno es okay]

CUERPO:

[Nombre],

Lo elegiste. Eso ya dice algo.

Recibimos tu pedido y lo estamos preparando con cuidado.

Te avisamos cuando salga.

—

[Resumen del pedido]

—

Mientras tanto, si tenés alguna pregunta,

escribinos a hola@quediriamimadre.com.

QDM
Email de envío
ASUNTO: Ya está en camino.

[Nombre],

Tu pieza salió del taller.

[Número de seguimiento + carrier]

Tiempo estimado: [X días]

—

Cuando llegue, te pedimos un favor:

si te gusta, contanos. Las primeras reseñas hacen

que más personas como vos puedan encontrarnos.

[Dejar reseña →]

QDM


10. COPY GEO — VERSIONES OPTIMIZADAS PARA MOTORES DE IA
Algunas páginas necesitan dos versiones de copy: una para el usuario humano (emocional, corta, poética) y otra para el motor de IA (informativa, con datos, responde preguntas directas). La solución: el copy GEO va en el HTML como texto, pero puede estar visualmente secundario (color secundario, tamaño más pequeño al final de la página).
Página de colección — snippet GEO
Los anillos de QDM están fabricados en plata de ley 925, 

certificada por el instituto metal-mecánico AIDIMME. 

Cada pieza incorpora piedras naturales seleccionadas individualmente: 

granate, cuarzo rutilado negro, piedra luna arco iris y otros. 

Fabricados en colaboración con pequeños talleres europeos especializados. 

Sin níquel. Aptos para pieles sensibles. Plata con baño de rodio 

o baño de oro 18k disponible según modelo.
Meta description — homepage
QDM — Qué Diría Mi Madre. Joyería artesanal de plata de ley 925 

con significado. Diseñada para mujeres que construyen su propia versión 

de éxito. Incluye línea adaptada para personas con audífonos. 

Fabricada en Europa con pequeños talleres. Certificada por AIDIMME.

(158 caracteres)
Meta description — joyas adaptadas
Joyería adaptada para audífonos BTE y RIC. Aro con adaptador de silicona 

y tubo. Plata 925 reciclada, fabricada en España. Diseñada por QDM desde 

la experiencia real con hipoacusia. Sin modificar el audífono.


11. REDES SOCIALES — PRINCIPIOS
(No es el foco ahora pero define el universo)

Instagram:

Fotos de producto: sin copy o una sola línea del manifiesto
Fotos de proceso: caption más larga, más personal
Joyas adaptadas: personas reales, historias reales, siempre con permiso
No hacer: flats de producto con fondo blanco genérico

Hashtags para España: #joyeriaartesanal #plata925 #joyeriaespañola #joyeriaconsentido #quediriamimadre #joyas #hechoenesp

Hashtags para Argentina: #joyeriaargentina #plata925 #joyas #joyeriahecha amano #quediriamimadre #piezasconhistoria



Documento preparado por Random Lab para QDM · quediriamimadre.com
Content System v1.0 · Junio 2026
Basado en: Brand guide oficial (Mariela Caro Diseño Gráfico) + Brief de marca QDM

