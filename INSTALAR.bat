@echo off
echo ===============================================
echo    CRM TAREAS - INSTALACION AUTOMATICA
echo ===============================================
echo.
echo Instalando el sistema CRM Tareas...
echo Por favor espere, esto puede tomar unos minutos.
echo.

REM Verificar si Node.js esta instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js no esta instalado
    echo.
    echo Por favor:
    echo 1. Vaya a https://nodejs.org/
    echo 2. Descargue la version LTS
    echo 3. Instale Node.js
    echo 4. Ejecute este script nuevamente
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js detectado correctamente
echo.

REM Instalar dependencias
echo 📦 Instalando dependencias del proyecto...
call npm install
if %errorlevel% neq 0 (
    echo ❌ ERROR: Fallo la instalacion de dependencias
    echo.
    echo Posibles soluciones:
    echo 1. Verificar conexion a internet
    echo 2. Ejecutar como administrador
    echo 3. Limpiar cache: npm cache clean --force
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Instalacion completada exitosamente!
echo.
echo ===============================================
echo    INSTALACION COMPLETA
echo ===============================================
echo.
echo El CRM Tareas ha sido instalado correctamente.
echo.
echo Para ejecutar el sistema:
echo - Haga doble clic en "EJECUTAR.bat"
echo - O ejecute el comando: npm run dev
echo.
echo El sistema se abrira en: http://localhost:5173/CRM-TAREAS/
echo.
echo ===============================================

pause