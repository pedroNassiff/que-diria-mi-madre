# Barra de campaña — Guía de activación

Sección: `sections/qdm-campaign-bar.liquid` ("QDM · Barra de campaña")

Barra de anuncio para lanzamientos y descuentos. Vive en el **header** del tema, así que aparece en todas las páginas del sitio. Se activa y desactiva desde el editor de temas — no requiere tocar código para cada campaña.

## Cómo activarla

1. Andá a **Tienda online → Personalizar** (theme editor).
2. En la parte superior del panel izquierdo, hacé click en **Header** (el grupo de secciones que incluye el logo y el menú).
3. Click en **Agregar sección** y elegí **QDM · Barra de campaña**.
4. Arrastrala **arriba del header** para que quede como la primera fila del sitio.
5. Completá los campos (ver abajo) y guardá.

## Cómo desactivarla cuando termina la campaña

- En el mismo panel del Header, hacé click en el ícono del ojo (👁) al lado de "QDM · Barra de campaña" para ocultarla sin borrarla — así la próxima campaña solo hay que reactivarla y cambiar el texto.
- Si la campaña no vuelve, se puede eliminar la sección directamente (ícono de tacho).

## Campos de configuración

| Campo | Qué hace |
|---|---|
| **Mensaje** | Texto que se muestra en la barra. Ej: `LANZAMIENTO \| 30% OFF`. |
| **Código de descuento** | Opcional. Si se completa, al hacer click en la barra el visitante recibe el descuento aplicado automáticamente (vía `/discount/CODIGO`) y es redirigido. |
| **Link** | Opcional. A dónde va el visitante al hacer click. Si hay código de descuento, este link se usa como destino *después* de aplicar el descuento (por defecto, el home). |

## Flujo típico de campaña (con descuento)

1. **Crear el descuento en Shopify**: `Tienda online → Descuentos → Crear descuento`. Definí el código (ej: `LANZAMIENTO30`), el porcentaje y las fechas de vigencia.
   - Tip: si configurás la fecha de fin del descuento, Shopify deja de aplicarlo automáticamente ese día — pero la barra en el sitio hay que ocultarla manualmente (paso siguiente), porque el tema no lee el estado del descuento en tiempo real.
2. **Activar la barra**: seguí los pasos de arriba. En **Código de descuento** poné el mismo código que creaste (ej: `LANZAMIENTO30`). En **Link** dejalo vacío para que redirija al home, o poné una colección puntual (ej: `/collections/drop-1`).
3. **Probar el flujo end-to-end** antes de anunciar la campaña:
   - Abrí el sitio en una ventana privada/incógnito.
   - Confirmá que la barra se ve arriba de todo.
   - Hacé click en la barra → confirmá que redirige a la página esperada.
   - Agregá un producto al carrito y andá a checkout → confirmá que el descuento aparece aplicado.
4. **Al terminar la campaña**: ocultá o eliminá la sección de la barra (ver "Cómo desactivarla" arriba). El descuento en sí se desactiva solo si le pusiste fecha de fin, o hay que desactivarlo manualmente en `Tienda online → Descuentos`.

## Notas

- El link de descuento automático (`/discount/CODIGO?redirect=...`) es una funcionalidad nativa de Shopify — no depende de ninguna app.
- La barra no verifica si el descuento sigue vigente: si el código vence y la barra queda activa, el link deja de aplicar el descuento pero el mensaje se sigue mostrando. Por eso el paso de ocultarla manualmente al cerrar la campaña es importante.
- Los colores (fondo ámbar, texto carbón) usan los tokens de marca de `assets/qdm-motion.css` (`--qdm-amber`, `--qdm-carbon`), no son configurables desde el editor para mantener consistencia visual.
