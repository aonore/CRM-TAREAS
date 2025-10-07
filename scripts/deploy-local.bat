@echo off
echo 🚀 Iniciando deployment local a GitHub Pages...

echo.
echo 📦 Instalando dependencias...
call npm install

echo.
echo 🏗️ Construyendo proyecto para GitHub Pages...
call npm run build:gh-pages

if %errorlevel% neq 0 (
    echo ❌ Error en el build
    pause
    exit /b 1
)

echo.
echo ✅ Build completado exitosamente!
echo.
echo 📁 Los archivos están listos en la carpeta 'dist'
echo.
echo 🔗 Para hacer push a GitHub Pages:
echo    1. Asegúrate de que los cambios estén en el branch principal
echo    2. Haz push al repositorio: git push origin main
echo    3. GitHub Actions se encargará del deployment automático
echo.
echo 🌐 La aplicación estará disponible en:
echo    https://aonore.github.io/CRM-TAREAS/
echo.

pause