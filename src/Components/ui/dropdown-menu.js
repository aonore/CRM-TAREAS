import React from 'react';
import { ChevronRight } from 'lucide-react';

// Context para el DropdownMenu
const DropdownMenuContext = React.createContext();

export function DropdownMenu({ children, open, onOpenChange }) {
  const [isOpen, setIsOpen] = React.useState(open || false);
  
  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  // Cerrar al hacer click fuera
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('[data-dropdown-menu]')) {
        handleOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      <div className="relative" data-dropdown-menu>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ children, asChild = false, ...props }) {
  const { isOpen, onOpenChange } = React.useContext(DropdownMenuContext);
  
  const handleClick = () => {
    onOpenChange(!isOpen);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      'aria-expanded': isOpen,
      'aria-haspopup': true,
      ...props
    });
  }

  return (
    <button
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-haspopup="true"
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({ 
  children, 
  className = '', 
  align = 'center',
  side = 'bottom',
  sideOffset = 4,
  ...props 
}) {
  const { isOpen } = React.useContext(DropdownMenuContext);
  
  if (!isOpen) return null;

  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0'
  };

  const sideClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  };

  return (
    <div 
      className={`
        absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95
        ${alignmentClasses[align]} ${sideClasses[side]} ${className}
      `}
      style={{ marginTop: side === 'bottom' ? sideOffset : undefined }}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ 
  children, 
  className = '', 
  inset = false,
  onClick,
  ...props 
}) {
  const { onOpenChange } = React.useContext(DropdownMenuContext);
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    onOpenChange(false);
  };

  return (
    <div
      className={`
        relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors
        focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50
        ${inset ? 'pl-8' : ''} ${className}
      `}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuCheckboxItem({ 
  children, 
  className = '', 
  checked = false,
  onCheckedChange,
  ...props 
}) {
  const { onOpenChange } = React.useContext(DropdownMenuContext);
  
  const handleClick = () => {
    if (onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <div
      className={`
        relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors
        focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}
      `}
      onClick={handleClick}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <div className="h-2 w-2 bg-current rounded-sm" />}
      </span>
      {children}
    </div>
  );
}

export function DropdownMenuRadioItem({ 
  children, 
  className = '', 
  value,
  ...props 
}) {
  return (
    <div
      className={`
        relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors
        focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}
      `}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <div className="h-2 w-2 fill-current rounded-full" />
      </span>
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ 
  children, 
  className = '', 
  inset = false,
  ...props 
}) {
  return (
    <div
      className={`px-2 py-1.5 text-sm font-semibold ${inset ? 'pl-8' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className = '', ...props }) {
  return (
    <div className={`-mx-1 my-1 h-px bg-muted ${className}`} {...props} />
  );
}

export function DropdownMenuShortcut({ 
  children, 
  className = '', 
  ...props 
}) {
  return (
    <span className={`ml-auto text-xs tracking-widest opacity-60 ${className}`} {...props}>
      {children}
    </span>
  );
}

export function DropdownMenuGroup({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function DropdownMenuPortal({ children }) {
  return children;
}

export function DropdownMenuSub({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function DropdownMenuSubContent({ 
  children, 
  className = '', 
  ...props 
}) {
  return (
    <div 
      className={`
        z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg animate-in slide-in-from-left-1
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuSubTrigger({ 
  children, 
  className = '', 
  inset = false,
  ...props 
}) {
  return (
    <div
      className={`
        flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none
        focus:bg-accent hover:bg-accent data-[state=open]:bg-accent
        ${inset ? 'pl-8' : ''} ${className}
      `}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </div>
  );
}