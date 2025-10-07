import React from 'react';
import { X } from 'lucide-react';

// Context para el AlertDialog
const AlertDialogContext = React.createContext();

export function AlertDialog({ children, open, onOpenChange }) {
  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          {children}
        </div>
      )}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({ children, asChild = false, ...props }) {
  const { onOpenChange } = React.useContext(AlertDialogContext);
  
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

export function AlertDialogContent({ 
  children, 
  className = '', 
  ...props 
}) {
  const { open, onOpenChange } = React.useContext(AlertDialogContext);
  
  if (!open) return null;

  return (
    <div 
      className={`relative z-50 w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mx-4 ${className}`}
      {...props}
    >
      <button
        onClick={() => onOpenChange(false)}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
      {children}
    </div>
  );
}

export function AlertDialogHeader({ 
  children, 
  className = '', 
  ...props 
}) {
  return (
    <div className={`flex flex-col space-y-2 text-center sm:text-left ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AlertDialogFooter({ 
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

export function AlertDialogTitle({ 
  children, 
  className = '', 
  ...props 
}) {
  return (
    <h2 className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function AlertDialogDescription({ 
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

export function AlertDialogAction({ 
  children, 
  className = '', 
  onClick,
  ...props 
}) {
  const { onOpenChange } = React.useContext(AlertDialogContext);
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    onOpenChange(false);
  };

  return (
    <button
      className={`inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function AlertDialogCancel({ 
  children, 
  className = '', 
  onClick,
  ...props 
}) {
  const { onOpenChange } = React.useContext(AlertDialogContext);
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    onOpenChange(false);
  };

  return (
    <button
      className={`inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}