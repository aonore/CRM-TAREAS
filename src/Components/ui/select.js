import React from 'react';
import { ChevronDown, Check } from 'lucide-react';

// Context para el Select
const SelectContext = React.createContext();

export function Select({ children, value, onValueChange, defaultValue, ...props }) {
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || '');
  const [isOpen, setIsOpen] = React.useState(false);
  
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <SelectContext.Provider value={{ 
      selectedValue, 
      onValueChange: handleValueChange, 
      isOpen, 
      setIsOpen 
    }}>
      <div className="relative" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, className = '', ...props }) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext);
  
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

export function SelectValue({ placeholder = 'Select...', className = '' }) {
  const { selectedValue } = React.useContext(SelectContext);
  
  return (
    <span className={className}>
      {selectedValue || placeholder}
    </span>
  );
}

export function SelectContent({ children, className = '', ...props }) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext);
  
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('[data-select-content]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      data-select-content
      className={`absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectItem({ children, value, className = '', ...props }) {
  const { selectedValue, onValueChange } = React.useContext(SelectContext);
  const isSelected = selectedValue === value;
  
  return (
    <div
      onClick={() => onValueChange(value)}
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  );
}