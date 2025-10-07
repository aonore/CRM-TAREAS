#!/bin/bash

# Script de deployment para GitHub Pages

echo "🚀 Iniciando deployment para GitHub Pages..."

# 1. Limpiar build anterior
echo "📁 Limpiando build anterior..."
rm -rf dist

# 2. Hacer build para producción
echo "🔨 Generando build para producción..."
npm run build

# 3. Verificar que el build fue exitoso
if [ ! -d "dist" ]; then
    echo "❌ Error: No se generó la carpeta dist"
    exit 1
fi

echo "✅ Build completado exitosamente"

# 4. Mostrar archivos generados
echo "📦 Archivos generados:"
ls -la dist/

# 5. Instrucciones para deployment manual
echo ""
echo "📋 Próximos pasos para deployment:"
echo "1. Ir a la configuración del repositorio en GitHub"
echo "2. En 'Pages', seleccionar 'Deploy from a branch'"
echo "3. Seleccionar la rama 'main' y carpeta '/ (root)'"
echo "4. O copiar el contenido de 'dist/' a la rama 'gh-pages'"
echo ""
echo "🌐 La aplicación estará disponible en:"
echo "   https://aonore.github.io/CRM-TAREAS/"
echo ""
echo "✅ Deployment preparado exitosamente!"