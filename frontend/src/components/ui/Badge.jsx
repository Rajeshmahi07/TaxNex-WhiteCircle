import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Info, Clock, Bell } from 'lucide-react';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  icon = null, 
  animate = false,
  className = '',
  dot = false
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    gold: 'bg-gold-50 text-gold-700 border-gold-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  };
  
  const icons = {
    success: <CheckCircle size={12} />,
    warning: <AlertCircle size={12} />,
    error: <XCircle size={12} />,
    info: <Info size={12} />,
    default: <Clock size={12} />,
    primary: <Bell size={12} />,
    gold: <CheckCircle size={12} />,
    purple: <Info size={12} />,
  };
  
  const BadgeContent = () => (
    <span className={`
      inline-flex items-center font-medium rounded-full border
      ${variants[variant]} ${sizes[size]} ${className}
      transition-all duration-200
    `}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
      {icon !== false && (icon || icons[variant] || icons.default)}
      {children}
    </span>
  );
  
  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <BadgeContent />
      </motion.div>
    );
  }
  
  return <BadgeContent />;
};

export default Badge;