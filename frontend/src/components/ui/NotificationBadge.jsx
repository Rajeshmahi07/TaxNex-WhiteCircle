import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBadge = ({ 
  count, 
  max = 99, 
  animate = true,
  variant = 'default',
  size = 'md',
  showZero = false
}) => {
  if (!showZero && (!count || count === 0)) return null;
  
  const displayCount = count > max ? `${max}+` : count;
  
  const variants = {
    default: 'bg-red-500 text-white',
    primary: 'bg-sky-500 text-white',
    gold: 'bg-gold-500 text-white',
    green: 'bg-green-500 text-white',
  };
  
  const sizes = {
    sm: 'min-w-[18px] h-[18px] text-[10px]',
    md: 'min-w-[20px] h-[20px] text-[11px]',
    lg: 'min-w-[24px] h-[24px] text-xs',
  };
  
  const BadgeContent = () => (
    <span className={`
      absolute -top-1 -right-1 rounded-full font-semibold
      flex items-center justify-center shadow-md
      ${variants[variant]} ${sizes[size]}
    `}>
      {displayCount}
    </span>
  );
  
  if (animate) {
    return (
      <AnimatePresence>
        <motion.span
          key={count}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute -top-1 -right-1"
        >
          <BadgeContent />
        </motion.span>
      </AnimatePresence>
    );
  }
  
  return <BadgeContent />;
};

export default NotificationBadge;