'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type DropdownContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={menuRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');
  const { setIsOpen, isOpen } = context;

  return (
    <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
      {children}
    </div>
  );
}

export function DropdownMenuContent({ children }: { children: React.ReactNode }) {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownMenuContent must be used within DropdownMenu');
  const { isOpen } = context;

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="py-1">{children}</div>
    </div>
  );
}

type ItemProps = {
  children: React.ReactNode;
  onSelect?: () => void;
  asChild?: boolean;
  className?: string;
};

export function DropdownMenuItem({ children, onSelect, asChild = false, className = '' }: ItemProps) {
  const Component = asChild ? 'div' : 'button';

  return (
    <Component
      onClick={onSelect}
      className={clsx(
        'flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100',
        className
      )}
    >
      {children}
    </Component>
  );
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-gray-200" />;
}
