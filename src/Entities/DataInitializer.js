// Inicializador de datos de ejemplo para el CRM
import { Cliente } from './Cliente.js';
import { Tarea } from './Tarea.js';
import { User } from './User.js';

export class DataInitializer {
  // Inicializar todas las entidades con datos de ejemplo
  static async initializeAll() {
    try {
      console.log('Inicializando datos del CRM...');
      
      // Inicializar configuración de usuario
      await User.initialize();
      console.log('✓ Usuario inicializado');
      
      // Inicializar clientes con datos de ejemplo
      await Cliente.initializeWithSampleData();
      console.log('✓ Clientes inicializados');
      
      // Inicializar tareas con datos de ejemplo
      await Tarea.initializeWithSampleData();
      console.log('✓ Tareas inicializadas');
      
      console.log('Datos del CRM inicializados correctamente');
      
      return {
        success: true,
        message: 'Datos inicializados correctamente'
      };
    } catch (error) {
      console.error('Error al inicializar datos:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Limpiar todos los datos
  static async clearAllData() {
    try {
      localStorage.removeItem(Cliente.storageKey);
      localStorage.removeItem(Tarea.storageKey);
      localStorage.removeItem(User.storageKey);
      
      console.log('Todos los datos han sido eliminados');
      
      return {
        success: true,
        message: 'Datos eliminados correctamente'
      };
    } catch (error) {
      console.error('Error al limpiar datos:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Resetear datos (limpiar y volver a inicializar)
  static async resetData() {
    try {
      await this.clearAllData();
      await this.initializeAll();
      
      return {
        success: true,
        message: 'Datos reseteados correctamente'
      };
    } catch (error) {
      console.error('Error al resetear datos:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Verificar si hay datos existentes
  static checkExistingData() {
    const clientesData = localStorage.getItem(Cliente.storageKey);
    const tareasData = localStorage.getItem(Tarea.storageKey);
    const userData = localStorage.getItem(User.storageKey);

    const clientes = clientesData ? JSON.parse(clientesData) : [];
    const tareas = tareasData ? JSON.parse(tareasData) : [];
    const user = userData ? JSON.parse(userData) : null;

    return {
      hasClientes: clientes.length > 0,
      hasTareas: tareas.length > 0,
      hasUser: user !== null,
      clientesCount: clientes.length,
      tareasCount: tareas.length,
      isEmpty: clientes.length === 0 && tareas.length === 0 && user === null
    };
  }

  // Exportar todos los datos
  static async exportAllData() {
    try {
      const clientes = await Cliente.list();
      const tareas = await Tarea.list();
      const user = await User.me();

      const exportData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        data: {
          clientes,
          tareas,
          user
        }
      };

      return {
        success: true,
        data: exportData
      };
    } catch (error) {
      console.error('Error al exportar datos:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Importar datos desde un archivo de exportación
  static async importAllData(importData) {
    try {
      if (!importData.data) {
        throw new Error('Formato de datos inválido');
      }

      // Limpiar datos existentes
      await this.clearAllData();

      // Importar usuario
      if (importData.data.user) {
        await User.importConfig(importData.data.user);
      }

      // Importar clientes
      if (importData.data.clientes && Array.isArray(importData.data.clientes)) {
        for (const clienteData of importData.data.clientes) {
          await Cliente.create(clienteData);
        }
      }

      // Importar tareas
      if (importData.data.tareas && Array.isArray(importData.data.tareas)) {
        for (const tareaData of importData.data.tareas) {
          await Tarea.create(tareaData);
        }
      }

      return {
        success: true,
        message: 'Datos importados correctamente'
      };
    } catch (error) {
      console.error('Error al importar datos:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Generar reporte de estadísticas
  static async generateStats() {
    try {
      const clientes = await Cliente.list();
      const tareas = await Tarea.list();
      const tareasStats = await Tarea.getStats();

      const clientesConTareas = clientes.map(cliente => {
        const tareasCliente = tareas.filter(t => t.cliente_id === cliente.id);
        const totalCobrado = tareasCliente
          .filter(t => t.estado === 'cobrada')
          .reduce((sum, t) => sum + (t.monto || 0), 0);
        const totalPendiente = tareasCliente
          .filter(t => t.estado === 'finalizada')
          .reduce((sum, t) => sum + (t.monto || 0), 0);

        return {
          ...cliente,
          totalTareas: tareasCliente.length,
          totalCobrado,
          totalPendiente,
          totalGeneral: totalCobrado + totalPendiente
        };
      });

      const stats = {
        resumen: {
          totalClientes: clientes.length,
          totalTareas: tareas.length,
          ...tareasStats
        },
        clientesTop: clientesConTareas
          .sort((a, b) => b.totalGeneral - a.totalGeneral)
          .slice(0, 5),
        tareasRecientes: tareas
          .sort((a, b) => new Date(b.ultima_actualizacion) - new Date(a.ultima_actualizacion))
          .slice(0, 10),
        fecha_generacion: new Date().toISOString()
      };

      return {
        success: true,
        stats
      };
    } catch (error) {
      console.error('Error al generar estadísticas:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }
}

// Función helper para inicializar automáticamente al cargar la aplicación
export async function autoInitialize() {
  const dataStatus = DataInitializer.checkExistingData();
  
  if (dataStatus.isEmpty) {
    console.log('No hay datos existentes, inicializando...');
    return await DataInitializer.initializeAll();
  } else {
    console.log('Datos existentes encontrados:', dataStatus);
    // Solo inicializar usuario si no existe
    if (!dataStatus.hasUser) {
      await User.initialize();
    }
    return {
      success: true,
      message: 'Datos existentes cargados'
    };
  }
}