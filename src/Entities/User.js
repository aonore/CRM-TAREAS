// Simulador de base de datos en localStorage para configuración de usuario
class User {
  static storageKey = 'crm_user_config';

  constructor(data = {}) {
    this.id = data.id || 'user_1';
    this.nombre = data.nombre || 'Usuario';
    this.email = data.email || 'usuario@crm.com';
    this.empresa = data.empresa || 'Mi Empresa';
    this.dias_alerta_global = data.dias_alerta_global || 7;
    this.tema = data.tema || 'light';
    this.idioma = data.idioma || 'es';
    this.notificaciones_email = data.notificaciones_email !== undefined ? data.notificaciones_email : true;
    this.fecha_creacion = data.fecha_creacion || new Date().toISOString();
    this.ultima_actualizacion = data.ultima_actualizacion || new Date().toISOString();
  }

  // Método para validar los datos
  validate() {
    const errors = [];
    
    if (!this.nombre.trim()) {
      errors.push('El nombre es requerido');
    }
    
    if (!this.email.trim()) {
      errors.push('El email es requerido');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push('El email no tiene un formato válido');
    }
    
    if (this.dias_alerta_global < 1 || this.dias_alerta_global > 365) {
      errors.push('Los días de alerta deben estar entre 1 y 365');
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
      nombre: this.nombre,
      email: this.email,
      empresa: this.empresa,
      dias_alerta_global: this.dias_alerta_global,
      tema: this.tema,
      idioma: this.idioma,
      notificaciones_email: this.notificaciones_email,
      fecha_creacion: this.fecha_creacion,
      ultima_actualizacion: this.ultima_actualizacion
    };
  }

  // Métodos estáticos para manejo de configuración de usuario
  
  // Obtener configuración del localStorage
  static getStorage() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  // Guardar configuración en localStorage
  static setStorage(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // Obtener datos del usuario actual
  static async me() {
    return new Promise((resolve) => {
      try {
        let userData = this.getStorage();
        
        if (!userData) {
          // Crear usuario por defecto si no existe
          userData = new User().toJSON();
          this.setStorage(userData);
        }
        
        resolve(userData);
      } catch (error) {
        // Si hay error, devolver usuario por defecto
        const defaultUser = new User().toJSON();
        resolve(defaultUser);
      }
    });
  }

  // Actualizar datos del usuario
  static async updateMyUserData(updateData) {
    return new Promise((resolve, reject) => {
      try {
        let userData = this.getStorage();
        
        if (!userData) {
          userData = new User().toJSON();
        }

        // Crear instancia para validar
        const usuarioActualizado = new User({
          ...userData,
          ...updateData,
          ultima_actualizacion: new Date().toISOString()
        });
        
        const validation = usuarioActualizado.validate();
        if (!validation.isValid) {
          reject(new Error(validation.errors.join(', ')));
          return;
        }

        const updatedData = usuarioActualizado.toJSON();
        this.setStorage(updatedData);
        
        resolve(updatedData);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Actualizar configuración específica
  static async updateConfig(configData) {
    return new Promise((resolve, reject) => {
      try {
        let userData = this.getStorage();
        
        if (!userData) {
          userData = new User().toJSON();
        }

        const allowedFields = [
          'dias_alerta_global',
          'tema',
          'idioma',
          'notificaciones_email'
        ];

        const updateData = {};
        Object.keys(configData).forEach(key => {
          if (allowedFields.includes(key)) {
            updateData[key] = configData[key];
          }
        });

        // Actualizar solo campos permitidos
        const usuarioActualizado = new User({
          ...userData,
          ...updateData,
          ultima_actualizacion: new Date().toISOString()
        });
        
        const validation = usuarioActualizado.validate();
        if (!validation.isValid) {
          reject(new Error(validation.errors.join(', ')));
          return;
        }

        const updatedData = usuarioActualizado.toJSON();
        this.setStorage(updatedData);
        
        resolve(updatedData);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Actualizar perfil de usuario
  static async updateProfile(profileData) {
    return new Promise((resolve, reject) => {
      try {
        let userData = this.getStorage();
        
        if (!userData) {
          userData = new User().toJSON();
        }

        const allowedFields = [
          'nombre',
          'email',
          'empresa'
        ];

        const updateData = {};
        Object.keys(profileData).forEach(key => {
          if (allowedFields.includes(key)) {
            updateData[key] = profileData[key];
          }
        });

        // Actualizar solo campos de perfil
        const usuarioActualizado = new User({
          ...userData,
          ...updateData,
          ultima_actualizacion: new Date().toISOString()
        });
        
        const validation = usuarioActualizado.validate();
        if (!validation.isValid) {
          reject(new Error(validation.errors.join(', ')));
          return;
        }

        const updatedData = usuarioActualizado.toJSON();
        this.setStorage(updatedData);
        
        resolve(updatedData);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Obtener configuración específica
  static async getConfig() {
    return new Promise((resolve) => {
      try {
        const userData = this.getStorage();
        
        if (!userData) {
          const defaultUser = new User();
          resolve({
            dias_alerta_global: defaultUser.dias_alerta_global,
            tema: defaultUser.tema,
            idioma: defaultUser.idioma,
            notificaciones_email: defaultUser.notificaciones_email
          });
          return;
        }
        
        resolve({
          dias_alerta_global: userData.dias_alerta_global,
          tema: userData.tema,
          idioma: userData.idioma,
          notificaciones_email: userData.notificaciones_email
        });
      } catch (error) {
        const defaultUser = new User();
        resolve({
          dias_alerta_global: defaultUser.dias_alerta_global,
          tema: defaultUser.tema,
          idioma: defaultUser.idioma,
          notificaciones_email: defaultUser.notificaciones_email
        });
      }
    });
  }

  // Resetear configuración a valores por defecto
  static async resetToDefaults() {
    return new Promise((resolve) => {
      try {
        const defaultUser = new User().toJSON();
        this.setStorage(defaultUser);
        resolve(defaultUser);
      } catch (error) {
        const defaultUser = new User().toJSON();
        resolve(defaultUser);
      }
    });
  }

  // Exportar configuración
  static async exportConfig() {
    return new Promise((resolve) => {
      try {
        const userData = this.getStorage();
        resolve(userData || new User().toJSON());
      } catch (error) {
        resolve(new User().toJSON());
      }
    });
  }

  // Importar configuración
  static async importConfig(configData) {
    return new Promise((resolve, reject) => {
      try {
        const usuario = new User(configData);
        const validation = usuario.validate();
        
        if (!validation.isValid) {
          reject(new Error(validation.errors.join(', ')));
          return;
        }

        const userData = usuario.toJSON();
        this.setStorage(userData);
        
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Inicializar con datos por defecto si no existe
  static async initialize() {
    const userData = this.getStorage();
    if (!userData) {
      const defaultUser = new User({
        nombre: 'Usuario CRM',
        email: 'admin@crm.local',
        empresa: 'Mi Empresa CRM',
        dias_alerta_global: 7,
        tema: 'light',
        idioma: 'es',
        notificaciones_email: true
      });
      
      this.setStorage(defaultUser.toJSON());
      return defaultUser.toJSON();
    }
    return userData;
  }
}

export { User };