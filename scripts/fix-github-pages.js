#!/usr/bin/env node

/**
 * Script de post-build para corregir rutas en GitHub Pages
 * Este script se ejecuta después de `npm run build` para asegurar
 * que todas las rutas estén correctas para el deployment
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = 'dist';
const BASE_PATH = '/CRM-TAREAS';

console.log('🔧 Iniciando corrección de rutas para GitHub Pages...');

// Función para corregir rutas en index.html
function fixIndexHtml() {
  const indexPath = path.join(DIST_DIR, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ No se encontró dist/index.html');
    return;
  }
  
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Corregir rutas de favicon y manifest
  content = content.replace(/href="\.\/favicon\./g, `href="${BASE_PATH}/favicon.`);
  content = content.replace(/href="\.\/manifest\.json"/g, `href="${BASE_PATH}/manifest.json"`);
  content = content.replace(/content="\.\/favicon-/g, `content="${BASE_PATH}/favicon-`);
  
  // Asegurar que todas las rutas de favicon sean consistentes
  content = content.replace(/href="\.\/favicon-/g, `href="${BASE_PATH}/favicon-`);
  content = content.replace(/href="favicon-/g, `href="${BASE_PATH}/favicon-`);
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ index.html corregido');
}

// Función para corregir rutas en manifest.json
function fixManifest() {
  const manifestPath = path.join(DIST_DIR, 'manifest.json');
  
  if (!fs.existsSync(manifestPath)) {
    console.error('❌ No se encontró dist/manifest.json');
    return;
  }
  
  let content = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(content);
  
  // Corregir start_url y scope
  manifest.start_url = `${BASE_PATH}/`;
  manifest.scope = `${BASE_PATH}/`;
  
  // Corregir rutas de iconos
  manifest.icons = manifest.icons.map(icon => ({
    ...icon,
    src: icon.src.replace(/^\.\//, `${BASE_PATH}/`)
  }));
  
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ manifest.json corregido');
}

// Función para actualizar .htaccess
function fixHtaccess() {
  const htaccessPath = path.join(DIST_DIR, '.htaccess');
  
  let content = `# Configuración de MIME types
AddType application/javascript .js
AddType text/css .css
AddType application/json .json
AddType image/svg+xml .svg

# Configuración para SPA (Single Page Application)
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Manejar rutas del cliente (React Router)
  RewriteBase ${BASE_PATH}/
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . ${BASE_PATH}/index.html [L]
</IfModule>

# Configuración de caché
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Cache para assets
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  
  # Cache para HTML (corto)
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Compresión GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Headers de seguridad
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options nosniff
  Header always set X-Frame-Options DENY
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>`;

  fs.writeFileSync(htaccessPath, content);
  console.log('✅ .htaccess actualizado');
}

// Ejecutar todas las correcciones
try {
  fixIndexHtml();
  fixManifest();
  fixHtaccess();
  console.log('🎉 ¡Corrección de rutas completada exitosamente!');
  console.log(`📦 Archivos listos para deployment en: ${DIST_DIR}/`);
} catch (error) {
  console.error('❌ Error durante la corrección:', error.message);
  process.exit(1);
}