import React from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

const StatusBadge = ({ status, size = 'md' }) => {
  const statuses = {
    filed: {
      label: 'Filed',
      icon: CheckCircle,
      className: 'bg-success-100 text-success-700',
    },
    completed: {
      label: 'Completed',
      icon: CheckCircle,
      className: 'bg-success-100 text-success-700',
    },
    pending: {
      label: 'Pending',
      icon: Clock,
      className: 'bg-warning-100 text-warning-700',
    },
    'in-process': {
      label: 'In Process',
      icon: Clock,
      className: 'bg-blue-100 text-blue-700',
    },
    overdue: {
      label: 'Overdue',
      icon: AlertCircle,
      className: 'bg-error-100 text-error-600',
    },
    rejected: {
      label: 'Rejected',
      icon: XCircle,
      className: 'bg-error-100 text-error-600',
    },
    unpaid: {
      label: 'Unpaid',
      icon: Clock,
      className: 'bg-warning-100 text-warning-700',
    },
    paid: {
      label: 'Paid',
      icon: CheckCircle,
      className: 'bg-success-100 text-success-700',
    },
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  };
  
  const config = statuses[status] || statuses.pending;
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${config.className} ${sizes[size]}`}>
      <Icon size={size === 'sm' ? 10 : size === 'md' ? 12 : 14} />
      {config.label}
    </span>
  );
};

export default StatusBadge;