# 🏢 CRM Tareas - Sistema de Gestión de Clientes y Proyectos

Un sistema CRM completo desarrollado en React para la gestión eficiente de clientes, tareas y cobros.

## 🌐 Demo en Vivo

**🔗 [Ver Demo](https://aonore.github.io/CRM-TAREAS/)**

## ✨ Características

### 📊 Dashboard Interactivo
- Vista general de estadísticas
- Gráficos de estado de tareas
- Top clientes por ingresos
- Alertas y notificaciones

### 👥 Gestión de Clientes
- CRUD completo de clientes
- Perfil detallado de cada cliente
- Historial de tareas por cliente
- Datos de contacto y facturación

### 📋 Gestión de Tareas
- Estados: Iniciada, En Proceso, Finalizada, Cobrada
- Seguimiento de fechas y montos
- Filtros y búsquedas avanzadas
- Asignación automática de fechas

### 💰 Control de Cobros
- Seguimiento de pagos pendientes
- Historial de cobros realizados
- Reportes de ingresos
- Filtros por períodos

### ⚙️ Configuración
- Configuración de usuario
- Personalización de alertas
- Temas y preferencias

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18 + Vite
- **Routing:** React Router DOM
- **Estilos:** Tailwind CSS
- **Iconos:** Lucide React
- **Animaciones:** Framer Motion
- **Gráficos:** Recharts
- **Almacenamiento:** LocalStorage
- **PWA:** Soporte completo

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/aonore/CRM-TAREAS.git

# Entrar al directorio
cd CRM-TAREAS

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir en el navegador: http://localhost:5173
```

### Build para Producción
```bash
# Generar build optimizado
npm run build

# Para deployment en GitHub Pages
npm run deploy  # (usando script personalizado)
```

## 📱 PWA (Progressive Web App)

El CRM es una PWA completa que se puede instalar en dispositivos móviles y de escritorio:

- ✅ Installable
- ✅ Responsive design
- ✅ Offline ready
- ✅ Fast loading

## 🗂️ Estructura del Proyecto

```
src/
├── Components/           # Componentes reutilizables
│   ├── ui/              # Componentes de interfaz
│   ├── clientes/        # Componentes de clientes
│   ├── tareas/          # Componentes de tareas
│   ├── cobros/          # Componentes de cobros
│   └── dashboard/       # Componentes del dashboard
├── Pages/               # Páginas principales
├── Entities/            # Clases de datos y CRUD
└── utils.js             # Utilidades generales
```

## 💾 Datos y Persistencia

- **LocalStorage:** Todos los datos se almacenan localmente
- **CRUD Completo:** Create, Read, Update, Delete
- **Validación:** Validación de datos en tiempo real
- **Datos de Ejemplo:** Se incluyen datos de muestra

## 🔧 Configuración para GitHub Pages

El proyecto está configurado para deployment automático en GitHub Pages:

- **Base URL:** `/CRM-TAREAS/`
- **Rutas relativas:** Compatibles con subdirectorios
- **GitHub Actions:** Deployment automático
- **PWA:** Funciona correctamente en GitHub Pages

## 📋 Scripts Disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Build para producción
npm run preview      # Preview del build
npm run deploy       # Deployment a GitHub Pages
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**aonore** - [GitHub](https://github.com/aonore)

## 🙏 Agradecimientos

- React Team por el excelente framework
- Tailwind CSS por el sistema de estilos
- Lucide por los iconos
- Toda la comunidad open source

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!