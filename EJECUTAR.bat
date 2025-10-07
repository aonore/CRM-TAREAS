@echo off
echo ===============================================
echo      CRM TAREAS - INICIANDO SISTEMA
echo ===============================================
echo.
echo Iniciando el servidor del CRM Tareas...
echo.

REM Verificar si Node.js esta instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js no esta instalado
    echo.
    echo Por favor ejecute primero "INSTALAR.bat"
    echo.
    pause
    exit /b 1
)

REM Verificar si las dependencias estan instaladas
if not exist "node_modules" (
    echo ❌ ERROR: Dependencias no instaladas
    echo.
    echo Por favor ejecute primero "INSTALAR.bat"
    echo.
    pause
    exit /b 1
)

echo ✅ Iniciando servidor de desarrollo...
echo.
echo ===============================================
echo    SERVIDOR CRM TAREAS ACTIVO
echo ===============================================
echo.
echo El sistema esta ejecutandose en:
echo 🌐 http://localhost:5173/CRM-TAREAS/
echo.
echo ✅ El navegador se abrira automaticamente
echo.
echo Para DETENER el servidor:
echo - Cierre esta ventana
echo - O presione Ctrl + C
echo.
echo ===============================================
echo.

REM Abrir el navegador automaticamente (con delay para que el servidor inicie)
start "" timeout /t 3 /nobreak >nul && start "" "http://localhost:5173/CRM-TAREAS/"

REM Ejecutar el servidor de desarrollo
call npm run dev

echo.
echo ===============================================
echo    SERVIDOR DETENIDO
echo ===============================================
echo.
echo El CRM Tareas ha sido cerrado.
echo Para volver a usarlo, ejecute este archivo nuevamente.
echo.
pause