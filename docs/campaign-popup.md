# Popup de campaña — Guía de activación

Sección: `sections/qdm-campaign-popup.liquid` ("QDM · Popup de campaña")

Modal de bienvenida/descuento con captura de email (foto a la izquierda, texto + formulario a la derecha). Vive en el **header** del tema, así que puede aparecer en todas las páginas. Se activa y desactiva desde el editor de temas, igual que la [barra de campaña](./campaign-bar.md).

## Cómo activarlo

1. Andá a **Tienda online → Personalizar** (theme editor).
2. En la parte superior del panel izquierdo, hacé click en **Header**.
3. Click en **Agregar sección** y elegí **QDM · Popup de campaña**.
4. Completá los campos (ver abajo) y guardá.
5. El popup no se ve en el editor hasta que se cumple el delay configurado — abrí el sitio en una pestaña normal para probarlo (ver "Cómo probarlo" más abajo).

## Cómo desactivarlo cuando termina la campaña

- En el panel del Header, click en el ícono del ojo (👁) al lado de "QDM · Popup de campaña" para ocultarlo sin perder la configuración.
- Si no se va a reutilizar, se puede eliminar directamente.

## Campos de configuración

| Campo | Qué hace |
|---|---|
| **Imagen** | Foto del lado izquierdo del popup. Si se deja vacía, el popup muestra solo el panel de texto. |
| **Título** | Encabezado principal. Default: `LANZAMIENTO`. |
| **Subtítulo** | Texto debajo del título. Default: `30% OFF en tu primer pedido`. |
| **Texto pequeño** | Línea chica debajo del subtítulo. Default: `No te lo pierdas :)`. |
| **Placeholder del email** | Texto de ejemplo dentro del campo de email. |
| **Texto del botón** | Texto del botón de envío (ej: `Obtener 30% off`). |
| **Código de descuento** | Código de Shopify que se aplica automáticamente cuando el visitante hace click en el botón de la pantalla de "gracias" (después de dejar el email). |
| **Título / Mensaje / Texto del botón (después de suscribirse)** | Lo que ve el visitante justo después de dejar su email. |
| **Link del botón (después de suscribirse)** | A dónde va el visitante al hacer click en ese botón (por defecto, el home). |
| **Segundos antes de aparecer** | Delay del trigger. Default: 5 segundos después de cargar la página. |
| **Días para volver a mostrarse** | Si el visitante cierra el popup sin dejar el email, cuántos días pasan antes de que se le vuelva a mostrar. Default: 7. |

## Cómo funciona el email (sin apps)

El formulario usa el sistema nativo de Shopify (el mismo que el newsletter del footer): al enviar el email, Shopify crea o actualiza el cliente y lo suscribe a marketing. No depende de Klaviyo, Mailchimp ni ninguna app externa.

- Los emails capturados aparecen en **Clientes** en el admin de Shopify, y en la lista de suscriptos de **Marketing → Suscriptores**.
- Un mismo visitante no vuelve a ver el popup una vez que dejó su email (se guarda en su navegador).

## Flujo típico de campaña (con descuento)

1. **Crear el descuento en Shopify**: `Tienda online → Descuentos → Crear descuento`. Definí el código (ej: `LANZAMIENTO30`), el porcentaje y las fechas de vigencia.
2. **Configurar el popup**: activalo (ver arriba) y en **Código de descuento** poné el mismo código (ej: `LANZAMIENTO30`).
3. **Probarlo end-to-end** antes de anunciar la campaña (ver siguiente sección).
4. **Al terminar la campaña**: ocultá la sección del popup. El descuento se desactiva solo si le pusiste fecha de fin, o hay que desactivarlo manualmente en `Tienda online → Descuentos`.

## Cómo probarlo

El navegador recuerda si ya cerraste el popup o dejaste tu email, así que para volver a verlo en pruebas:

1. Abrí el sitio en una ventana **privada/incógnito** (o borrá el `localStorage` del sitio desde las herramientas de desarrollador).
2. Esperá los segundos configurados en "Segundos antes de aparecer".
3. Confirmá que se ve la imagen (si configuraste una), el título, subtítulo y el campo de email.
4. Cargá un email de prueba y enviá el formulario.
5. Confirmá que aparece la pantalla de "gracias" con el código de descuento.
6. Click en el botón de esa pantalla → confirmá que redirige y que el descuento queda aplicado (probalo agregando un producto al carrito y yendo a checkout).
7. Volvé a abrir el sitio (misma sesión) → confirmá que el popup **ya no aparece** (porque ese navegador ya quedó marcado como suscripto).

## Notas

- Los colores (fondo crema, botón carbón) usan los tokens de marca de `assets/qdm-motion.css` — no son configurables desde el editor para mantener consistencia visual con el resto del sitio.
- En mobile, la imagen se oculta automáticamente y el popup muestra solo el panel de texto para no ocupar toda la pantalla.
- El popup respeta la preferencia de "reducir movimiento" del sistema operativo del visitante (no anima si está activada).
