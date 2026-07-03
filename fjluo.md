# QDM · Flujo de trabajo

## IDs de temas
# Development (tu tema de trabajo): 188752331116
# Heritage (publicado / producción): 188752134508

---

## 1. Arrancar el día

cd ~/Desktop/proyectos/qdm-theme

# ⚠️  OBLIGATORIO antes de cada `theme dev` — sin excepción:
# shopify theme dev hace un push inicial de todos los archivos locales al servidor.
# Si el local tiene un index.json desactualizado, sobreescribe las secciones que
# hayas configurado en el editor. Esto sincroniza el local ANTES de que eso pase.
shopify theme pull --theme=188752331116 --store=qdm-dev.myshopify.com --only "templates/*.json"

# Commitear si hubo cambios:
git add templates/ && git commit -m "chore: sync templates" || true

# Luego arrancar el server:
shopify theme dev --store=qdm-dev.myshopify.com
# → abre http://127.0.0.1:9292 — password: malefica

---

## 2. Desarrollar

# Editás archivos en VS Code normalmente:
#   sections/qdm-*.liquid   → secciones nuevas
#   snippets/qdm-*.liquid   → componentes reutilizables
#   assets/qdm-motion.*     → CSS y JS de animaciones
#   layout/theme.liquid     → estructura global

# El servidor detecta los cambios y los sube solo al tema Development.
# Validás en http://127.0.0.1:9292

---

## 3. Validar en el editor de Shopify

# Para ver/configurar las secciones desde el panel visual:
# https://admin.shopify.com/store/qdm-dev/themes/188752331116/editor
#
# Cualquier cambio de configuración que hagas en el editor (orden de secciones,
# textos, imágenes) baja automáticamente al local via el CLI que está corriendo.

---

## 4. Checkpoint en git (antes de cerrar o al terminar una feature)

git add .
git commit -m "feat: descripción corta en presente"
# Convenciones: feat/ fix/ style/ content/ chore/

---

## 5. Subir al tema Heritage (producción)

# Solo cuando los cambios están validados en local y en el editor dev.
shopify theme push --theme=188752134508
# → sube TODOS los archivos locales al tema Heritage (el publicado)
# → incluye templates/index.json con las secciones configuradas
# ⚠️  Confirmar que templates/index.json tiene las secciones correctas antes de hacer esto

---

## Comandos útiles

shopify theme list --store=qdm-dev.myshopify.com   # ver todos los temas y sus IDs
git status                                          # ver qué cambió localmente
git diff templates/index.json                      # ver cambios en el template
