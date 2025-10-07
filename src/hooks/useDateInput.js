import { useState } from 'react';
import { formatDateForInput, formatDateForDisplay, getCurrentDateForInput } from '@/utils/dateUtils';

/**
 * Hook personalizado para manejar inputs de fecha con formato dd/mm/aaaa
 */
export function useDateInput(initialValue = '') {
  const [value, setValue] = useState(formatDateForInput(initialValue));
  
  const setDateValue = (newValue) => {
    setValue(formatDateForInput(newValue));
  };
  
  const getDisplayValue = () => {
    return formatDateForDisplay(value);
  };
  
  const getInputValue = () => {
    return value;
  };
  
  const reset = () => {
    setValue('');
  };
  
  const setToday = () => {
    setValue(getCurrentDateForInput());
  };
  
  return {
    value,
    setValue: setDateValue,
    inputValue: getInputValue(),
    displayValue: getDisplayValue(),
    reset,
    setToday
  };
}

/**
 * Hook para manejar rangos de fecha (desde - hasta)
 */
export function useDateRange(initialStart = '', initialEnd = '') {
  const startDate = useDateInput(initialStart);
  const endDate = useDateInput(initialEnd);
  
  const isValidRange = () => {
    if (!startDate.value || !endDate.value) return true;
    return new Date(startDate.value) <= new Date(endDate.value);
  };
  
  const reset = () => {
    startDate.reset();
    endDate.reset();
  };
  
  const setCurrentMonth = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    startDate.setValue(firstDay.toISOString().split('T')[0]);
    endDate.setValue(lastDay.toISOString().split('T')[0]);
  };
  
  return {
    startDate,
    endDate,
    isValidRange: isValidRange(),
    reset,
    setCurrentMonth
  };
}