# 🏢 CRM Tareas - Instalación Local para Cliente

## 🎯 **Instalación Súper Fácil - Solo 3 Pasos**

### **Para Windows:**

#### **Paso 1: Instalar Node.js**
1. Ir a: **https://nodejs.org/**
2. Descargar la versión **LTS** (botón verde)
3. Ejecutar el instalador (.msi)
4. Hacer clic en "Next" hasta terminar
5. **✅ ¡Listo!**

#### **Paso 2: Instalar CRM Tareas**
1. **Doble clic** en `INSTALAR.bat`
2. Esperar a que termine (2-3 minutos)
3. **✅ ¡Listo!**

#### **Paso 3: Usar el CRM**
1. **Doble clic** en `EJECUTAR.bat`
2. Se abrirá automáticamente en el navegador
3. **✅ ¡A trabajar!**

---

### **Para Mac/Linux:**

#### **Paso 1: Instalar Node.js**
```bash
# Mac (con Homebrew)
brew install node

# Ubuntu/Debian
sudo apt install nodejs npm

# O descargar desde: https://nodejs.org/
```

#### **Paso 2: Instalar CRM Tareas**
```bash
chmod +x instalar.sh
./instalar.sh
```

#### **Paso 3: Usar el CRM**
```bash
chmod +x ejecutar.sh
./ejecutar.sh
```

---

## 🖥️ **Uso Diario**

### **Para abrir el CRM:**
- **Windows**: Doble clic en `EJECUTAR.bat`
- **Mac/Linux**: `./ejecutar.sh`

### **Para cerrar el CRM:**
- Cerrar la ventana negra (terminal)
- O presionar `Ctrl + C`

### **El CRM se abre en:**
🌐 **http://localhost:5173/CRM-TAREAS/**

---

## 📱 **Características del Sistema**

### **✅ Lo que puede hacer:**
- ✅ **Gestionar clientes** (crear, editar, eliminar)
- ✅ **Administrar tareas** por cliente
- ✅ **Controlar cobros** y pagos
- ✅ **Ver estadísticas** en el dashboard
- ✅ **Filtrar y buscar** información
- ✅ **Funciona sin internet** (después de la instalación)

### **📊 Funcionalidades principales:**
- **Dashboard**: Vista general con gráficos y estadísticas
- **Clientes**: Base de datos completa de clientes
- **Tareas**: Seguimiento de proyectos y trabajos
- **Cobros**: Control de pagos y facturación
- **Configuración**: Personalización del sistema

---

## 🔒 **Seguridad y Privacidad**

### **✅ Ventajas de la instalación local:**
- 🔒 **Datos privados**: Todo se guarda en tu computadora
- 🚫 **Sin internet**: No envía información a servidores externos
- ⚡ **Rápido**: No depende de conexión a internet
- 💾 **Backup fácil**: Solo copiar la carpeta del proyecto

---

## 🆘 **Solución de Problemas**

### **❌ No se instala Node.js:**
- Descargar desde: https://nodejs.org/
- Reiniciar la computadora después de instalar
- Ejecutar como administrador

### **❌ Error al instalar dependencias:**
- Verificar conexión a internet
- Ejecutar `INSTALAR.bat` como administrador
- O ejecutar manualmente: `npm cache clean --force && npm install`

### **❌ No abre en el navegador:**
- Abrir manualmente: http://localhost:5173/CRM-TAREAS/
- Verificar que no haya otro programa usando el puerto 5173
- Probar con otro navegador (Chrome, Firefox, Edge)

### **❌ Se cierra solo:**
- No cerrar la ventana negra (terminal)
- Si se cerró, ejecutar `EJECUTAR.bat` nuevamente

---

## 📞 **Soporte Técnico**

### **Para obtener ayuda:**
1. **Verificar** que Node.js esté instalado: abrir terminal y escribir `node --version`
2. **Reintentar** ejecutando `INSTALAR.bat` como administrador
3. **Contactar** al desarrollador si persisten los problemas

---

## 🎉 **¡Todo Listo!**

Una vez instalado, el CRM Tareas funcionará como cualquier programa de escritorio:
- **Doble clic para abrir**
- **Funciona sin internet**
- **Datos seguros en tu PC**
- **Actualizaciones cuando las necesites**

**¡Disfruta usando tu CRM Tareas! 🚀**