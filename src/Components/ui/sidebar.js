import React from 'react';

// Contexto para el Sidebar
const SidebarContext = React.createContext();

export function SidebarProvider({ children, ...props }) {
  const [isOpen, setIsOpen] = React.useState(true);
  
  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, open, close }}>
      <div className="flex h-screen bg-gray-100" {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export function Sidebar({ children, className = '', ...props }) {
  const { isOpen } = useSidebar();
  
  return (
    <aside 
      className={`${isOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ children, className = '', ...props }) {
  return (
    <div className={`p-4 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SidebarContent({ children, className = '', ...props }) {
  return (
    <div className={`flex-1 overflow-y-auto ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SidebarFooter({ children, className = '', ...props }) {
  return (
    <div className={`p-4 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroup({ children, className = '', ...props }) {
  return (
    <div className={`py-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroupLabel({ children, className = '', ...props }) {
  const { isOpen } = useSidebar();
  
  return (
    <div className={`px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider ${!isOpen ? 'hidden' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroupContent({ children, className = '', ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function SidebarMenu({ children, className = '', ...props }) {
  return (
    <nav className={`space-y-1 ${className}`} {...props}>
      {children}
    </nav>
  );
}

export function SidebarMenuItem({ children, className = '', ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function SidebarMenuButton({ 
  children, 
  className = '', 
  isActive = false, 
  asChild = false,
  ...props 
}) {
  const { isOpen } = useSidebar();
  
  const baseClasses = `
    flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
    ${isActive 
      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
    }
    ${!isOpen ? 'justify-center px-2' : 'justify-start'}
  `;
  
  const classes = `${baseClasses} ${className}`;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: classes,
      ...props
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function SidebarTrigger({ className = '', ...props }) {
  const { toggle } = useSidebar();
  
  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${className}`}
      {...props}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 6h16M4 12h16M4 18h16" 
        />
      </svg>
    </button>
  );
}