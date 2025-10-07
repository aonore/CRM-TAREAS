#!/bin/bash

echo "==============================================="
echo "      CRM TAREAS - INICIANDO SISTEMA"
echo "==============================================="
echo ""
echo "Iniciando el servidor del CRM Tareas..."
echo ""

# Verificar si Node.js esta instalado
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js no esta instalado"
    echo ""
    echo "Por favor ejecute primero ./instalar.sh"
    echo ""
    exit 1
fi

# Verificar si las dependencias estan instaladas
if [ ! -d "node_modules" ]; then
    echo "❌ ERROR: Dependencias no instaladas"
    echo ""
    echo "Por favor ejecute primero ./instalar.sh"
    echo ""
    exit 1
fi

echo "✅ Iniciando servidor de desarrollo..."
echo ""
echo "==============================================="
echo "    SERVIDOR CRM TAREAS ACTIVO"
echo "==============================================="
echo ""
echo "El sistema esta ejecutandose en:"
echo "🌐 http://localhost:5173/CRM-TAREAS/"
echo ""
echo "✅ El navegador se abrira automaticamente"
echo ""
echo "Para DETENER el servidor:"
echo "- Presione Ctrl + C"
echo ""
echo "==============================================="
echo ""

# Abrir el navegador automaticamente (con delay para que el servidor inicie)
if command -v xdg-open &> /dev/null; then
    # Linux
    (sleep 3 && xdg-open "http://localhost:5173/CRM-TAREAS/") &
elif command -v open &> /dev/null; then
    # macOS
    (sleep 3 && open "http://localhost:5173/CRM-TAREAS/") &
fi

# Ejecutar el servidor de desarrollo
npm run dev

echo ""
echo "==============================================="
echo "    SERVIDOR DETENIDO"
echo "==============================================="
echo ""
echo "El CRM Tareas ha sido cerrado."
echo "Para volver a usarlo, ejecute este archivo nuevamente."
echo ""