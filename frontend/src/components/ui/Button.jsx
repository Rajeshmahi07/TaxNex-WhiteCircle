import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false, 
  disabled = false,
  fullWidth = false,
  icon = null,
  onClick,
  ...props 
}) => {
  const variants = {
    // Landing Page Buttons
    gold: 'btn-gold',
    ghost: 'btn-ghost',
    // Dashboard Buttons
    primary: 'btn-blue',
    secondary: 'btn-outline',
    blue: 'btn-blue',
    outline: 'btn-outline',
    danger: 'bg-red-500 text-white hover:bg-red-600 transition-all',
    success: 'bg-green-500 text-white hover:bg-green-600 transition-all',
  };
  
  const sizes = {
    sm: 'btn-sm',
    md: 'px-5 py-2.5 text-sm rounded-lg',
    lg: 'btn-lg',
  };
  
  const baseClasses = `
    font-medium transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
    ${variants[variant]} 
    ${sizes[size]} 
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  const ButtonContent = () => (
    <button
      className={baseClasses}
      disabled={isLoading || disabled}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        icon && <span className="transition-transform duration-200 group-hover:scale-110">{icon}</span>
      )}
      {children}
    </button>
  );
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <ButtonContent />
    </motion.div>
  );
};

export default Button;