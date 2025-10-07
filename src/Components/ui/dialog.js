import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// Context para el Dialog
const DialogContext = React.createContext();

export function Dialog({ children, open, onOpenChange, defaultOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(open !== undefined ? open : defaultOpen);
  
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

  // Prevenir scroll del body cuando el dialog está abierto
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar con Escape
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <DialogContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, asChild = false, ...props }) {
  const { onOpenChange } = React.useContext(DialogContext);
  
  const handleClick = () => {
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      ...props
    });
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export function DialogPortal({ children }) {
  const { isOpen } = React.useContext(DialogContext);
  
  if (!isOpen) return null;

  return createPortal(children, document.body);
}

export function DialogOverlay({ className = '', ...props }) {
  const { onOpenChange } = React.useContext(DialogContext);
  
  return (
    <div
      className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ${className}`}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  );
}

export function DialogContent({ 
  children, 
  className = '', 
  ...props 
}) {
  const { isOpen, onOpenChange } = React.useContext(DialogContext);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Content */}
      <div 
        className={`
          relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 
          data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 
          data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 
          data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] 
          data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] 
          sm:rounded-lg md:w-full ${className}
        `}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}

export function DialogHeader({ 
  children, 
  className = '', 
  ...props 
}) {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogFooter({ 
  children, 
  className = '', 
  ...props 
}) {
  return (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ 
  children, 
  className = '', 
  ...props 
}) {
  return (
    <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function DialogDescription({ 
  children, 
  className = '', 
  ...props 
}) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
      {children}
    </p>
  );
}

export function DialogClose({ 
  children, 
  className = '', 
  asChild = false,
  ...props 
}) {
  const { onOpenChange } = React.useContext(DialogContext);
  
  const handleClick = () => {
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      ...props
    });
  }

  return (
    <button onClick={handleClick} className={className} {...props}>
      {children}
    </button>
  );
}