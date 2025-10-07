// Simulador de base de datos en localStorage
class Cliente {
  static storageKey = 'crm_clientes';

  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.nombre_completo = data.nombre_completo || '';
    this.empresa = data.empresa || '';
    this.email = data.email || '';
    this.telefono = data.telefono || '';
    this.direccion = data.direccion || '';
    this.ciudad = data.ciudad || '';
    this.pais = data.pais || '';
    this.notas = data.notas || '';
    this.dias_alerta = data.dias_alerta || 7;
    this.fecha_creacion = data.fecha_creacion || new Date().toISOString();
    this.ultima_actualizacion = data.ultima_actualizacion || new Date().toISOString();
  }

  generateId() {
    return 'cli_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Método para validar los datos
  validate() {
    const errors = [];
    
    if (!this.nombre_completo.trim()) {
      errors.push('El nombre completo es requerido');
    }
    
    if (!this.email.trim()) {
      errors.push('El email es requerido');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push('El email no tiene un formato válido');
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
      nombre_completo: this.nombre_completo,
      empresa: this.empresa,
      email: this.email,
      telefono: this.telefono,
      direccion: this.direccion,
      ciudad: this.ciudad,
      pais: this.pais,
      notas: this.notas,
      dias_alerta: this.dias_alerta,
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

  // CREATE - Crear un nuevo cliente
  static async create(clienteData) {
    return new Promise((resolve, reject) => {
      try {
        const cliente = new Cliente(clienteData);
        const validation = cliente.validate();
        
        if (!validation.isValid) {
          reject(new Error(validation.errors.join(', ')));
          return;
        }

        // Verificar email único
        const clientes = this.getStorage();
        const emailExists = clientes.some(c => c.email === cliente.email);
        if (emailExists) {
          reject(new Error('Ya existe un cliente con este email'));
          return;
        }

        clientes.push(cliente.toJSON());
        this.setStorage(clientes);
        
        resolve(cliente.toJSON());
      } catch (error) {
        reject(error);
      }
    });
  }

  // READ - Obtener todos los clientes
  static async list(orderBy = 'nombre_completo') {
    return new Promise((resolve) => {
      try {
        let clientes = this.getStorage();
        
        // Ordenar según el parámetro
        if (orderBy.startsWith('-')) {
          const field = orderBy.substring(1);
          clientes.sort((a, b) => {
            if (a[field] < b[field]) return 1;
            if (a[field] > b[field]) return -1;
            return 0;
          });
        } else {
          clientes.sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return -1;
            if (a[orderBy] > b[orderBy]) return 1;
            return 0;
          });
        }
        
        resolve(clientes);
      } catch (error) {
        resolve([]);
      }
    });
  }

  // READ - Obtener un cliente por ID
  static async findById(id) {
    return new Promise((resolve, reject) => {
      try {
        const clientes = this.getStorage();
        const cliente = clientes.find(c => c.id === id);
        
        if (cliente) {
          resolve(cliente);
        } else {
          reject(new Error('Cliente no encontrado'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  // READ - Filtrar clientes
  static async filter(criteria, orderBy = 'nombre_completo') {
    return new Promise((resolve) => {
      try {
        let clientes = this.getStorage();
        
        // Aplicar filtros
        Object.keys(criteria).forEach(key => {
          const value = criteria[key];
          clientes = clientes.filter(cliente => {
            if (typeof value === 'string') {
              return cliente[key] && cliente[key].toLowerCase().includes(value.toLowerCase());
            }
            return cliente[key] === value;
          });
        });
        
        // Ordenar
        if (orderBy.startsWith('-')) {
          const field = orderBy.substring(1);
          clientes.sort((a, b) => {
            if (a[field] < b[field]) return 1;
            if (a[field] > b[field]) return -1;
            return 0;
          });
        } else {
          clientes.sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return -1;
            if (a[orderBy] > b[orderBy]) return 1;
            return 0;
          });
        }
        
        resolve(clientes);
      } catch (error) {
        resolve([]);
      }
    });
  }

  // UPDATE - Actualizar un cliente
  static async update(id, updateData) {
    return new Promise((resolve, reject) => {
      try {
        const clientes = this.getStorage();
        const index = clientes.findIndex(c => c.id === id);
        
        if (index === -1) {
          reject(new Error('Cliente no encontrado'));
          return;
        }

        // Crear instancia para validar
        const clienteActualizado = new Cliente({
          ...clientes[index],
          ...updateData,
          ultima_actualizacion: new Date().toISOString()
        });
        
        const validation = clienteActualizado.validate();
        if (!validation.isValid) {
          reject(new Error(validation.errors.join(', ')));
          return;
        }

        // Verificar email único (excluyendo el cliente actual)
        if (updateData.email) {
          const emailExists = clientes.some(c => c.email === updateData.email && c.id !== id);
          if (emailExists) {
            reject(new Error('Ya existe un cliente con este email'));
            return;
          }
        }

        clientes[index] = clienteActualizado.toJSON();
        this.setStorage(clientes);
        
        resolve(clientes[index]);
      } catch (error) {
        reject(error);
      }
    });
  }

  // DELETE - Eliminar un cliente
  static async delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const clientes = this.getStorage();
        const index = clientes.findIndex(c => c.id === id);
        
        if (index === -1) {
          reject(new Error('Cliente no encontrado'));
          return;
        }

        const clienteEliminado = clientes[index];
        clientes.splice(index, 1);
        this.setStorage(clientes);
        
        resolve(clienteEliminado);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Método para buscar clientes por texto
  static async search(searchTerm, fields = ['nombre_completo', 'empresa', 'email']) {
    return new Promise((resolve) => {
      try {
        const clientes = this.getStorage();
        const term = searchTerm.toLowerCase();
        
        const filtered = clientes.filter(cliente => {
          return fields.some(field => 
            cliente[field] && cliente[field].toLowerCase().includes(term)
          );
        });
        
        resolve(filtered);
      } catch (error) {
        resolve([]);
      }
    });
  }

  // Inicializar con datos de ejemplo si no hay datos
  static async initializeWithSampleData() {
    const clientes = this.getStorage();
    if (clientes.length === 0) {
      const sampleClientes = [
        {
          nombre_completo: "Juan Pérez",
          empresa: "Tecnologías Avanzadas S.A.",
          email: "juan.perez@tecavanzadas.com",
          telefono: "+1234567890",
          direccion: "Av. Libertad 123",
          ciudad: "Buenos Aires",
          pais: "Argentina",
          notas: "Cliente desde 2020, muy puntual con los pagos",
          dias_alerta: 5
        },
        {
          nombre_completo: "María García",
          empresa: "Consultoría García",
          email: "maria@consultoriagarcia.com",
          telefono: "+1234567891",
          direccion: "Calle Principal 456",
          ciudad: "Madrid",
          pais: "España",
          notas: "Requiere atención personalizada",
          dias_alerta: 7
        },
        {
          nombre_completo: "Carlos Rodríguez",
          empresa: "Emprendimientos CR",
          email: "carlos.rodriguez@empcr.com",
          telefono: "+1234567892",
          direccion: "Zona Industrial 789",
          ciudad: "Monterrey",
          pais: "México",
          notas: "Cliente nuevo, potencial alto volumen",
          dias_alerta: 10
        }
      ];

      for (const clienteData of sampleClientes) {
        await this.create(clienteData);
      }
    }
  }
}

export { Cliente };