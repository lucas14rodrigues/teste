import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`uppercase text-base w-full lg:w-[200px] flex items-center justify-center px-4 py-2 border border-green-500 bg-green-500 hover:bg-transparent hover:border-green-500 text-white font-semibold rounded-md transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

const AlternativeButton: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick} 
      className={`uppercase gap-2 text-xs flex items-center justify-center px-4 py-2 border border-green-500 bg-transparent text-green-600 font-semibold rounded-md hover:text-stone-50 hover:border-stone-50 ${className}`}
    >
      {children}
    </button>
  );
};

export { Button, AlternativeButton };
