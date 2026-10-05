# Serenia Inicio VR

Aplicación web estática en español con soporte de instalación como Progressive Web App (PWA).

## Publicación

El workflow de GitHub Pages publica el sitio automáticamente al enviar cambios a `main` o al ejecutarlo manualmente desde GitHub Actions. En la configuración del repositorio, selecciona **Settings > Pages > Build and deployment > Source > GitHub Actions**.

## PWA y modo sin conexión

El manifiesto y el Service Worker permiten instalar la aplicación y guardar su estructura principal en caché. Los recursos externos de A-Frame y las imágenes se guardan cuando se cargan con el Service Worker activo; después de que se registre, vuelve a cargar la página con conexión antes de probarla sin conexión.

Para probar localmente, sirve el sitio desde `localhost` (por ejemplo, con la extensión Live Server). En producción, debe servirse mediante HTTPS para que el navegador permita instalar la PWA y registrar el Service Worker.
