# Configuración para GitHub Pages

## Instrucciones de deployment:

1. **Build del proyecto:**
   ```bash
   npm run build
   ```

2. **Los archivos se generan en la carpeta `dist/`**

3. **Para GitHub Pages, copiar todo el contenido de `dist/` a la rama `gh-pages` o configurar desde la rama `main`**

## Configuración actual:

- ✅ Base URL configurada para GitHub Pages: `/CRM-TAREAS/`
- ✅ Rutas relativas en lugar de absolutas
- ✅ PWA manifest configurado correctamente
- ✅ Meta tags optimizados para móviles

## URLs del proyecto en GitHub Pages:

- **Producción:** https://aonore.github.io/CRM-TAREAS/
- **Repositorio:** https://github.com/aonore/CRM-TAREAS

## Archivos importantes:

- `vite.config.js` - Configuración con `base: '/CRM-TAREAS/'`
- `index.html` - Rutas relativas para recursos
- `manifest.json` - PWA configurado para subdirectorio
- `public/.htaccess` - Configuración para Apache (si se usa)

## Verificación post-deployment:

- [ ] ✅ Favicon carga correctamente
- [ ] ✅ Manifest.json accesible
- [ ] ✅ Aplicación carga sin errores 404
- [ ] ✅ Rutas internas funcionan
- [ ] ✅ PWA installable