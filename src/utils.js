// Utilidades para el CRM

/**
 * Crea URLs para las páginas del CRM
 * @param {string} pageName - Nombre de la página
 * @param {object} params - Parámetros adicionales
 * @returns {string} - URL completa
 */
export function createPageUrl(pageName, params = {}) {
  const routes = {
    Dashboard: '/',
    Clientes: '/clientes',
    ClienteDetalle: '/clientes',
    Tareas: '/tareas',
    Cobros: '/cobros',
    Configuracion: '/configuracion'
  };

  let baseUrl = routes[pageName] || '/';
  
  // Si hay parámetros, los agregamos como query string
  if (Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    baseUrl += `?${searchParams.toString()}`;
  }
  
  return baseUrl;
}

/**
 * Navega a una página específica
 * @param {string} pageName - Nombre de la página
 * @param {object} params - Parámetros adicionales
 */
export function navigateToPage(pageName, params = {}) {
  const url = createPageUrl(pageName, params);
  window.location.href = url;
}

/**
 * Formatea números como moneda
 * @param {number} amount - Cantidad a formatear
 * @param {string} currency - Código de moneda (default: 'USD')
 * @returns {string} - Cantidad formateada
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

/**
 * Formatea fechas
 * @param {string|Date} date - Fecha a formatear
 * @param {string} locale - Locale (default: 'es-ES')
 * @returns {string} - Fecha formateada
 */
export function formatDate(date, locale = 'es-ES') {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formatea fechas en formato corto
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada en formato corto
 */
export function formatDateShort(date) {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('es-ES', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * Calcula días entre dos fechas
 * @param {string|Date} startDate - Fecha de inicio
 * @param {string|Date} endDate - Fecha de fin (default: hoy)
 * @returns {number} - Número de días
 */
export function daysBetween(startDate, endDate = new Date()) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  const timeDiff = end.getTime() - start.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * Trunca texto a una longitud específica
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} text - Texto a capitalizar
 * @returns {string} - Texto capitalizado
 */
export function capitalizeWords(text) {
  if (!text) return '';
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Genera un color basado en el estado de la tarea
 * @param {string} estado - Estado de la tarea
 * @returns {object} - Objeto con clases CSS para el estado
 */
export function getEstadoStyles(estado) {
  const styles = {
    iniciada: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-200'
    },
    en_proceso: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200'
    },
    finalizada: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200'
    },
    cobrada: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
      border: 'border-emerald-200'
    }
  };
  
  return styles[estado] || styles.iniciada;
}

/**
 * Genera un ID único
 * @param {string} prefix - Prefijo para el ID
 * @returns {string} - ID único generado
 */
export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Valida email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Debounce function para optimizar búsquedas
 * @param {Function} func - Función a debounce
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función debounced
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}