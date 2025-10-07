#!/bin/bash

echo "🚀 Iniciando deployment local a GitHub Pages..."

echo ""
echo "📦 Instalando dependencias..."
npm install

echo ""
echo "🏗️ Construyendo proyecto para GitHub Pages..."
npm run build:gh-pages

if [ $? -ne 0 ]; then
    echo "❌ Error en el build"
    exit 1
fi

echo ""
echo "✅ Build completado exitosamente!"
echo ""
echo "📁 Los archivos están listos en la carpeta 'dist'"
echo ""
echo "🔗 Para hacer push a GitHub Pages:"
echo "   1. Asegúrate de que los cambios estén en el branch principal"
echo "   2. Haz push al repositorio: git push origin main"
echo "   3. GitHub Actions se encargará del deployment automático"
echo ""
echo "🌐 La aplicación estará disponible en:"
echo "   https://aonore.github.io/CRM-TAREAS/"
echo ""