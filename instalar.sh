#!/bin/bash

echo "==============================================="
echo "    CRM TAREAS - INSTALACION AUTOMATICA"
echo "==============================================="
echo ""
echo "Instalando el sistema CRM Tareas..."
echo "Por favor espere, esto puede tomar unos minutos."
echo ""

# Verificar si Node.js esta instalado
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js no esta instalado"
    echo ""
    echo "Por favor instale Node.js:"
    echo "Ubuntu/Debian: sudo apt install nodejs npm"
    echo "macOS: brew install node"
    echo "O descargue desde: https://nodejs.org/"
    echo ""
    exit 1
fi

echo "✅ Node.js detectado correctamente"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias del proyecto..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Fallo la instalacion de dependencias"
    echo ""
    echo "Posibles soluciones:"
    echo "1. Verificar conexion a internet"
    echo "2. Ejecutar con sudo si es necesario"
    echo "3. Limpiar cache: npm cache clean --force"
    echo ""
    exit 1
fi

echo ""
echo "✅ Instalacion completada exitosamente!"
echo ""
echo "==============================================="
echo "    INSTALACION COMPLETA"
echo "==============================================="
echo ""
echo "El CRM Tareas ha sido instalado correctamente."
echo ""
echo "Para ejecutar el sistema:"
echo "- Ejecute: ./ejecutar.sh"
echo "- O ejecute: npm run dev"
echo ""
echo "El sistema se abrira en: http://localhost:5173/CRM-TAREAS/"
echo ""
echo "==============================================="