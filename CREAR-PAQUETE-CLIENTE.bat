@echo off
echo ===============================================
echo    CREANDO PAQUETE PARA CLIENTE
echo ===============================================
echo.

REM Crear carpeta de distribución
if exist "CRM-Cliente" rmdir /s /q "CRM-Cliente"
mkdir "CRM-Cliente"

echo 📦 Copiando archivos del proyecto...

REM Copiar archivos principales
xcopy /E /I "src" "CRM-Cliente\src"
xcopy /E /I "scripts" "CRM-Cliente\scripts"
xcopy /E /I ".github" "CRM-Cliente\.github"

REM Copiar archivos de configuración
copy "package.json" "CRM-Cliente\"
copy "vite.config.js" "CRM-Cliente\"
copy "tailwind.config.js" "CRM-Cliente\"
copy "postcss.config.js" "CRM-Cliente\"
copy "index.html" "CRM-Cliente\"
copy ".gitignore" "CRM-Cliente\"

REM Copiar archivos de instalación
copy "INSTALAR.bat" "CRM-Cliente\"
copy "EJECUTAR.bat" "CRM-Cliente\"
copy "instalar.sh" "CRM-Cliente\"
copy "ejecutar.sh" "CRM-Cliente\"
copy "LEEME-CLIENTE.md" "CRM-Cliente\README.md"

REM Copiar documentación
copy "README.md" "CRM-Cliente\README-DESARROLLADOR.md"
copy "LICENSE" "CRM-Cliente\"

REM Copiar archivos PWA
copy "manifest.json" "CRM-Cliente\"
copy "robots.txt" "CRM-Cliente\"
copy "favicon.svg" "CRM-Cliente\"
copy "favicon.ico" "CRM-Cliente\"
copy "favicon-192.png" "CRM-Cliente\"
copy "favicon-512.png" "CRM-Cliente\"

echo.
echo ✅ Archivos copiados correctamente
echo.

REM Crear archivo de instrucciones rápidas
echo # INSTRUCCIONES RAPIDAS > "CRM-Cliente\INSTRUCCIONES.txt"
echo. >> "CRM-Cliente\INSTRUCCIONES.txt"
echo 1. Instalar Node.js desde: https://nodejs.org/ >> "CRM-Cliente\INSTRUCCIONES.txt"
echo 2. Hacer doble clic en INSTALAR.bat >> "CRM-Cliente\INSTRUCCIONES.txt"
echo 3. Hacer doble clic en EJECUTAR.bat >> "CRM-Cliente\INSTRUCCIONES.txt"
echo 4. El CRM se abrira en: http://localhost:5173/CRM-TAREAS/ >> "CRM-Cliente\INSTRUCCIONES.txt"
echo. >> "CRM-Cliente\INSTRUCCIONES.txt"
echo Para mas detalles, leer README.md >> "CRM-Cliente\INSTRUCCIONES.txt"

echo 📝 Creando archivo de versión...
echo # CRM Tareas - Version para Cliente > "CRM-Cliente\VERSION.txt"
echo. >> "CRM-Cliente\VERSION.txt"
echo Fecha de creacion: %date% %time% >> "CRM-Cliente\VERSION.txt"
echo Version: 1.0.0 >> "CRM-Cliente\VERSION.txt"
echo Desarrollado por: aonore >> "CRM-Cliente\VERSION.txt"
echo Repository: https://github.com/aonore/CRM-TAREAS >> "CRM-Cliente\VERSION.txt"

echo.
echo ===============================================
echo    PAQUETE CREADO EXITOSAMENTE
echo ===============================================
echo.
echo 📁 El paquete esta listo en: CRM-Cliente\
echo.
echo 📋 Contenido del paquete:
echo ├── INSTALAR.bat (Windows)
echo ├── EJECUTAR.bat (Windows)  
echo ├── instalar.sh (Linux/Mac)
echo ├── ejecutar.sh (Linux/Mac)
echo ├── README.md (Instrucciones detalladas)
echo ├── INSTRUCCIONES.txt (Guía rápida)
echo ├── src\ (Código fuente)
echo └── [archivos de configuración]
echo.
echo 🎁 Para entregar al cliente:
echo 1. Comprimir la carpeta "CRM-Cliente" en ZIP
echo 2. Enviar el archivo ZIP al cliente
echo 3. El cliente solo necesita:
echo    - Instalar Node.js
echo    - Extraer el ZIP
echo    - Doble clic en INSTALAR.bat
echo    - Doble clic en EJECUTAR.bat
echo.
echo ===============================================

pause