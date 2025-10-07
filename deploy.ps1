# Script de deployment para GitHub Pages (PowerShell)

Write-Host "🚀 Iniciando deployment para GitHub Pages..." -ForegroundColor Green

# 1. Limpiar build anterior
Write-Host "📁 Limpiando build anterior..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}

# 2. Hacer build para producción
Write-Host "🔨 Generando build para producción..." -ForegroundColor Yellow
npm run build

# 3. Verificar que el build fue exitoso
if (-not (Test-Path "dist")) {
    Write-Host "❌ Error: No se generó la carpeta dist" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completado exitosamente" -ForegroundColor Green

# 4. Mostrar archivos generados
Write-Host "📦 Archivos generados:" -ForegroundColor Cyan
Get-ChildItem "dist" | Format-Table Name, Length, LastWriteTime

# 5. Instrucciones para deployment manual
Write-Host ""
Write-Host "📋 Próximos pasos para deployment:" -ForegroundColor Cyan
Write-Host "1. Ir a la configuración del repositorio en GitHub"
Write-Host "2. En 'Pages', seleccionar 'Deploy from a branch'"
Write-Host "3. Seleccionar la rama 'main' y carpeta '/ (root)'"
Write-Host "4. O copiar el contenido de 'dist/' a la rama 'gh-pages'"
Write-Host ""
Write-Host "🌐 La aplicación estará disponible en:" -ForegroundColor Green
Write-Host "   https://aonore.github.io/CRM-TAREAS/"
Write-Host ""
Write-Host "✅ Deployment preparado exitosamente!" -ForegroundColor Green