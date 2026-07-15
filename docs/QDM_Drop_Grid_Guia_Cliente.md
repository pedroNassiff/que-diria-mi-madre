# QDM · Cómo cargar productos en la grilla de un Drop
> Guía para el equipo de QDM (no técnica). Explica cómo agregar, editar y ordenar productos en la sección **"QDM · Drop Grid"** desde el editor de Shopify, sin tocar código.

Archivo técnico detrás de esta sección: `sections/qdm-drop-grid.liquid` (no hace falta abrirlo para nada de lo que sigue).

---

## 1. Qué es esta sección

Es la grilla editorial que se usa en las páginas de **Drops** (por ejemplo Desmadre, La Orilla): filas que alternan una ficha de producto (foto + nombre + precio) con una foto de producción a ancho completo que separa las filas. Todas las fotos —chicas o grandes— están linkeadas a la ficha de un producto.

Cada Drop tiene su propia página con su propia plantilla (`desmadre`, `la-orilla`, etc.), así que los cambios que hagas en la grilla de un Drop **no afectan a los otros**.

---

## 2. Cómo entrar a editar un Drop

1. Admin → **Tienda online → Temas → Personalizar** (tema **QDM Heritage**).
2. Arriba, cambiá el selector de página a **Colecciones** y elegí la colección del Drop que querés editar (ej. "Desmadre").
3. En el panel izquierdo vas a ver una o más secciones **"QDM · Drop Grid"**. Cada una es una grilla independiente — puede haber más de una en la misma página, una debajo de la otra.

---

## 3. Los dos tipos de bloque

Dentro de cada sección "QDM · Drop Grid" hay dos tipos de bloque que podés agregar, en el orden que quieras:

### 🟡 Bloque "Producto"
La ficha chica: foto + nombre + precio, tomados directo del producto.

Campos:
- **Producto** — elegís el producto de tu catálogo.
- **Foto de producción (opcional)** — una segunda foto del *mismo* producto (shooting/still, no la foto de ficha). Aparece al lado, en la columna siguiente, y también linkea a ese producto. Si la dejás vacía, no se muestra nada en esa columna.

### 🟣 Bloque "Foto ancho completo"
Una foto grande que corta la fila y separa un grupo de productos del siguiente. Ocupa todo el ancho de la grilla (achicado a un 55% centrado).

Campos:
- **Imagen** — la foto grande (de shooting/producción, no la ficha del producto).
- **Producto (opcional)** — si lo completás, al hacer click en la foto lleva a la ficha de ese producto. Si lo dejás vacío, la foto no es clickeable.
- **Texto alternativo** — descripción corta de la imagen para accesibilidad/SEO (ej. "Detalle del colgante Marta en plata con baño de rodio").

---

## 4. Cómo agregar / reordenar bloques

1. Dentro de la sección "QDM · Drop Grid", click en **"Agregar bloque"** al final de la lista.
2. Elegí **Producto** o **Foto ancho completo**.
3. Completá los campos (ver arriba).
4. Para reordenar, arrastrá los bloques desde el panel izquierdo — el orden ahí define el orden real en la página.
5. Guardá arriba a la derecha.

No hay una regla automática de "cada tantos productos, una foto" — el orden lo definís vos, bloque por bloque.

---

## 5. Tamaño y formato de las fotos

- **Foto de producto (ficha)**: la trae Shopify automáticamente del producto, no se sube acá.
- **Foto de producción (bloque Producto)**: se recorta en formato vertical (proporción 3:4). Subí fotos verticales o que se vean bien recortadas así.
- **Foto ancho completo**: se recorta en formato horizontal (proporción 4:3).

---

## 6. Título y bajada de la sección (opcional)

Cada sección "QDM · Drop Grid" tiene sus propios campos de configuración (no son bloques):
- **Eyebrow** — texto chico arriba del título (ej. "New La Orilla Drop, Verano '26").
- **Título** — opcional, título grande de la sección.

---

## 7. Crear un Drop nuevo desde cero (sin pedirle nada al equipo de desarrollo)

Shopify permite duplicar una plantilla directo desde el editor — no hace falta código para lanzar un Drop nuevo:

1. Creá la colección nueva: Admin → **Productos → Colecciones → Agregar colección** (nombre, productos, etc. — igual que cualquier colección).
2. Andá a **Personalizar** (Tema → Personalizar), seleccioná esa colección nueva en el selector de página de arriba.
3. Al lado del nombre de la plantilla actual (arriba del panel izquierdo, donde dice algo como "Plantilla: Colección predeterminada") hacé click en el menú desplegable.
4. Elegí **"Crear plantilla"** (o "Duplicar" según la versión) y elegí como base la plantilla de un Drop que ya tenga la grilla armada como te sirva de punto de partida (ej. `desmadre` o `la-orilla`).
5. Ponele un nombre a la plantilla nueva (ej. `desmadre-2`, o el nombre del drop). Shopify crea el archivo solo, con el mismo contenido que copiaste — vos podés borrar/reemplazar los bloques de producto y fotos como quieras.
6. Guardá. La colección queda usando esa plantilla nueva automáticamente.
7. A partir de ahí, toda la carga de productos y fotos (pasos 2 a 6 de esta guía) la hacés vos sola desde el editor.

**Cuándo sí hace falta pedirle algo al equipo de desarrollo:** solo si querés un diseño de grilla distinto al que ya existe (otra cantidad de columnas, otro tipo de bloque, otra animación) — ahí sí es un cambio de código. Para lanzar Drops nuevos con el mismo formato, no.

---

## 8. Importante — no se pisa con el código

Una vez que la plantilla del Drop está creada y asignada, todo lo que edites desde el Personalizador (Tema → Personalizar) queda guardado ahí mismo, en vivo. El equipo de desarrollo **no vuelve a tocar ese archivo** salvo que se lo pidas explícitamente — así evitamos que un cambio de código pise productos que hayas cargado vos desde el editor.
