# Arrancar el día
cd ~/projects/qdm-theme
shopify theme dev --store=qdm-dev.myshopify.com
# → abre http://127.0.0.1:9292 en el browser

# Crear una nueva sección
touch sections/qdm-marquee.liquid
# → editás en VS Code, el servidor detecta el archivo nuevo

# Checkpoint antes de salir
git add .
git commit -m "feat: add marquee section with brand phrases"
shopify theme push --unpublished
# → queda guardado en el store como tema no publicado, no se borra