// Simulador de base de datos en localStorage
class Tarea {
  static storageKey = 'crm_tareas';

  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.cliente_id = data.cliente_id || '';
    this.titulo = data.titulo || '';
    this.descripcion = data.descripcion || '';
    this.estado = data.estado || 'iniciada';
    this.monto = data.monto || 0;
    this.fecha_inicio = data.fecha_inicio || new Date().toISOString().split('T')[0];
    this.fecha_finalizacion = data.fecha_finalizacion || null;
    this.fecha_cobro = data.fecha_cobro || null;
    this.fecha_creacion = data.fecha_creacion || new Date().toISOString();
    this.ultima_actualizacion = data.ultima_actualizacion || new Date().toISOString();
  }

  generateId() {
    return 'tarea_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Método para validar los datos
  validate() {
    const errors = [];
    
    if (!this.cliente_id.trim()) {
      errors.push('El ID del cliente es requerido');
    }
    
    if (!this.titulo.trim()) {
      errors.push('El título es requerido');
    }
    
    if (!['iniciada', 'en_proceso', 'finalizada', 'cobrada'].includes(this.estado)) {
      errors.push('El estado debe ser: iniciada, en_proceso, finalizada o cobrada');
    }
    
    if (this.monto < 0) {
      errors.push('El monto no puede ser negativo');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Convertir a objeto plano
  toJSON() {
    return {
      id: this.id,
      cliente_id: this.cliente_id,
      titulo: this.titulo,
      descripcion: this.descripcion,
      estado: this.estado,
      monto: this.monto,
      fecha_inicio: this.fecha_inicio,
      fecha_finalizacion: this.fecha_finalizacion,
      fecha_cobro: this.fecha_cobro,
      fecha_creacion: this.fecha_creacion,
      ultima_actualizacion: this.ultima_actualizacion
    };
  }

  // Métodos estáticos para CRUD
  
  // Obtener todos los datos del localStorage
  static getStorage() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Guardar datos en localStorage
  static setStorage(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // CREATE - Crear una nueva tarea
  static async create(tareaData) {
    return new Promise((resolve, reject) => {
      try {
        const tarea = new Tarea(tareaData);
        const validation = tarea.validate();
        
        if (!validation.isValid) {
          reject(new Error(validation.errors.join(', ')));
          return;
        }

        const tareas = this.getStorage();
        tareas.push(tarea.toJSON());
        this.setStorage(tareas);
        
        resolve(tarea.toJSON());
      } catch (error) {
        reject(error);
      }
    });
  }

  // READ - Obtener todas las tareas
  static async list(orderBy = '-ultima_actualizacion') {
    return new Promise((resolve) => {
      try {
        let tareas = this.getStorage();
        
        // Ordenar según el parámetro
        if (orderBy.startsWith('-')) {
          const field = orderBy.substring(1);
          tareas.sort((a, b) => {
            if (a[field] < b[field]) return 1;
            if (a[field] > b[field]) return -1;
            return 0;
          });
        } else {
          tareas.sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return -1;
            if (a[orderBy] > b[orderBy]) return 1;
            return 0;
          });
        }
        
        resolve(tareas);
      } catch (error) {
        resolve([]);
      }
    });
  }

  // READ - Obtener una tarea por ID
  static async findById(id) {
    return new Promise((resolve, reject) => {
      try {
        const tareas = this.getStorage();
        const tarea = tareas.find(t => t.id === id);
        
        if (tarea) {
          resolve(tarea);
        } else {
          reject(new Error('Tarea no encontrada'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  // READ - Filtrar tareas
  static async filter(criteria, orderBy = '-ultima_actualizacion') {
    return new Promise((resolve) => {
      try {
        let tareas = this.getStorage();
        
        // Aplicar filtros
        Object.keys(criteria).forEach(key => {
          const value = criteria[key];
          tareas = tareas.filter(tarea => {
            if (typeof value === 'string') {
              return tarea[key] && tarea[key].toString().toLowerCase().includes(value.toLowerCase());
            }
            return tarea[key] === value;
          });
        });
        
        // Ordenar
        if (orderBy.startsWith('-')) {
          const field = orderBy.substring(1);
          tareas.sort((a, b) => {
            if (a[field] < b[field]) return 1;
            if (a[field] > b[field]) return -1;
            return 0;
          });
        } else {
          tareas.sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return -1;
            if (a[orderBy] > b[orderBy]) return 1;
            return 0;
          });
        }
        
        resolve(tareas);
      } catch (error) {
        resolve([]);
      }
    });
  }

  // UPDATE - Actualizar una tarea
  static async update(id, updateData) {
    return new Promise((resolve, reject) => {
      try {
        const tareas = this.getStorage();
        const index = tareas.findIndex(t => t.id === id);
        
        if (index === -1) {
          reject(new Error('Tarea no encontrada'));
          return;
        }

        // Manejar cambios de estado automáticamente
        const tareaActual = tareas[index];
        const nuevaData = { ...updateData };

        // Auto-completar fechas según el estado
        if (nuevaData.estado === 'finalizada' && !nuevaData.fecha_finalizacion) {
          nuevaData.fecha_finalizacion = new Date().toISOString().split('T')[0];
        }
        
        if (nuevaData.estado === 'cobrada' && !nuevaData.fecha_cobro) {
          nuevaData.fecha_cobro = new Date().toISOString().split('T')[0];
          // Si no estaba finalizada, también marcar como finalizada
          if (!tareaActual.fecha_finalizacion) {
            nuevaData.fecha_finalizacion = nuevaData.fecha_cobro;
          }
        }

        // Crear instancia para validar
        const tareaActualizada = new Tarea({
          ...tareaActual,
          ...nuevaData,
          ultima_actualizacion: new Date().toISOString()
        });
        
        const validation = tareaActualizada.validate();
        if (!validation.isValid) {
          reject(new Error(validation.errors.join(', ')));
          return;
        }

        tareas[index] = tareaActualizada.toJSON();
        this.setStorage(tareas);
        
        resolve(tareas[index]);
      } catch (error) {
        reject(error);
      }
    });
  }

  // DELETE - Eliminar una tarea
  static async delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const tareas = this.getStorage();
        const index = tareas.findIndex(t => t.id === id);
        
        if (index === -1) {
          reject(new Error('Tarea no encontrada'));
          return;
        }

        const tareaEliminada = tareas[index];
        tareas.splice(index, 1);
        this.setStorage(tareas);
        
        resolve(tareaEliminada);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Obtener tareas por cliente
  static async getByClienteId(clienteId) {
    return this.filter({ cliente_id: clienteId });
  }

  // Método para buscar tareas por texto
  static async search(searchTerm, fields = ['titulo', 'descripcion']) {
    return new Promise((resolve) => {
      try {
        const tareas = this.getStorage();
        const term = searchTerm.toLowerCase();
        
        const filtered = tareas.filter(tarea => {
          return fields.some(field => 
            tarea[field] && tarea[field].toLowerCase().includes(term)
          );
        });
        
        resolve(filtered);
      } catch (error) {
        resolve([]);
      }
    });
  }

  // Obtener estadísticas
  static async getStats() {
    return new Promise((resolve) => {
      try {
        const tareas = this.getStorage();
        
        const stats = {
          total: tareas.length,
          iniciadas: tareas.filter(t => t.estado === 'iniciada').length,
          en_proceso: tareas.filter(t => t.estado === 'en_proceso').length,
          finalizadas: tareas.filter(t => t.estado === 'finalizada').length,
          cobradas: tareas.filter(t => t.estado === 'cobrada').length,
          total_cobrado: tareas.filter(t => t.estado === 'cobrada').reduce((sum, t) => sum + (t.monto || 0), 0),
          total_pendiente: tareas.filter(t => t.estado === 'finalizada').reduce((sum, t) => sum + (t.monto || 0), 0)
        };
        
        resolve(stats);
      } catch (error) {
        resolve({
          total: 0,
          iniciadas: 0,
          en_proceso: 0,
          finalizadas: 0,
          cobradas: 0,
          total_cobrado: 0,
          total_pendiente: 0
        });
      }
    });
  }

  // Inicializar con datos de ejemplo
  static async initializeWithSampleData() {
    const tareas = this.getStorage();
    if (tareas.length === 0) {
      // Necesitamos obtener clientes existentes
      const { Cliente } = await import('./Cliente.js');
      const clientes = await Cliente.list();
      
      if (clientes.length > 0) {
        const sampleTareas = [
          {
            cliente_id: clientes[0].id,
            titulo: "Configuración sistema contable",
            descripcion: "Instalación y configuración del nuevo sistema contable para la empresa",
            estado: "en_proceso",
            monto: 1500.00,
            fecha_inicio: "2024-10-01"
          },
          {
            cliente_id: clientes[0].id,
            titulo: "Capacitación equipo",
            descripcion: "Capacitación del equipo en el uso del nuevo sistema",
            estado: "finalizada",
            monto: 800.00,
            fecha_inicio: "2024-09-15",
            fecha_finalizacion: "2024-09-30"
          },
          {
            cliente_id: clientes[1]?.id || clientes[0].id,
            titulo: "Consultoría fiscal",
            descripcion: "Asesoramiento fiscal para el cierre del ejercicio",
            estado: "cobrada",
            monto: 2200.00,
            fecha_inicio: "2024-09-01",
            fecha_finalizacion: "2024-09-20",
            fecha_cobro: "2024-09-25"
          },
          {
            cliente_id: clientes[2]?.id || clientes[0].id,
            titulo: "Auditoría interna",
            descripcion: "Auditoría de procesos internos y recomendaciones de mejora",
            estado: "iniciada",
            monto: 3500.00,
            fecha_inicio: "2024-10-05"
          }
        ];

        for (const tareaData of sampleTareas) {
          await this.create(tareaData);
        }
      }
    }
  }
}

export { Tarea };