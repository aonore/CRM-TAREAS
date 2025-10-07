/**
 * Utilidades para manejo de fechas en formato dd/mm/aaaa
 */

// Convertir fecha de formato ISO (yyyy-mm-dd) a dd/mm/aaaa
export function formatDateForDisplay(dateString) {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    return '';
  }
}

// Convertir fecha de formato dd/mm/aaaa a ISO (yyyy-mm-dd) para inputs type="date"
export function formatDateForInput(dateString) {
  if (!dateString) return '';
  
  try {
    // Si ya está en formato ISO, devolverla tal como está
    if (dateString.includes('-') && dateString.length === 10) {
      return dateString;
    }
    
    // Si está en formato dd/mm/aaaa, convertir a yyyy-mm-dd
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      if (day && month && year) {
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }
    
    // Si es una fecha de JavaScript, convertir
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    return '';
  }
}

// Convertir fecha de input (yyyy-mm-dd) a dd/mm/aaaa para mostrar
export function convertInputDateToDisplay(inputDate) {
  if (!inputDate) return '';
  
  try {
    const [year, month, day] = inputDate.split('-');
    if (year && month && day) {
      return `${day}/${month}/${year}`;
    }
    return '';
  } catch (error) {
    return '';
  }
}

// Obtener fecha actual en formato dd/mm/aaaa
export function getCurrentDateForDisplay() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  
  return `${day}/${month}/${year}`;
}

// Obtener fecha actual en formato yyyy-mm-dd para inputs
export function getCurrentDateForInput() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

// Validar si una fecha está en formato dd/mm/aaaa válido
export function isValidDisplayDate(dateString) {
  if (!dateString) return false;
  
  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = dateString.match(regex);
  
  if (!match) return false;
  
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1900 || year > 2100) return false;
  
  // Verificar si la fecha es válida
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && 
         date.getMonth() === month - 1 && 
         date.getDate() === day;
}

// Comparar dos fechas en formato dd/mm/aaaa
export function compareDates(date1, date2) {
  const d1 = new Date(formatDateForInput(date1));
  const d2 = new Date(formatDateForInput(date2));
  
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

// Calcular diferencia en días entre dos fechas
export function daysDifference(startDate, endDate) {
  const start = new Date(formatDateForInput(startDate));
  const end = new Date(formatDateForInput(endDate));
  
  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}