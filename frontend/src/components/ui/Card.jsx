import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  animate = true,
  padding = 'p-5',
  variant = 'default'
}) => {
  const variants = {
    default: 'dashboard-card',
    glass: 'glass-card',
    stat: 'stat-card',
    gradient: 'bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-2xl shadow-lg',
  };
  
  const hoverClasses = hover ? 'hover:shadow-hover' : '';
  
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : false}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
      whileHover={hover ? { y: -4 } : {}}
      className={`
        rounded-2xl transition-all duration-300 overflow-hidden
        ${variants[variant]} ${hoverClasses} ${padding} ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;