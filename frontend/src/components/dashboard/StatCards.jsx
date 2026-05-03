import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Clock, DollarSign, Users, CheckCircle, TrendingUp } from 'lucide-react';

const StatCards = ({ stats }) => {
  const cards = [
    { 
      label: 'Total Filings', 
      value: stats.filings || 0, 
      icon: FileText, 
      gradient: 'from-sky-500 to-sky-600',
      trend: '+12%'
    },
    { 
      label: 'Documents', 
      value: stats.documents || 0, 
      icon: Upload, 
      gradient: 'from-sky-500 to-sky-600',
      trend: '+8'
    },
    { 
      label: 'Pending', 
      value: stats.pending || 0, 
      icon: Clock, 
      gradient: 'from-amber-500 to-amber-600',
      trend: 'Action'
    },
    { 
      label: 'Invoices', 
      value: stats.invoices || 0, 
      icon: DollarSign, 
      gradient: 'from-sky-500 to-sky-600',
      trend: '2 unpaid'
    },
  ];

  if (stats.totalClients !== undefined) {
    cards.push(
      { 
        label: 'Total Clients', 
        value: stats.totalClients || 0, 
        icon: Users, 
        gradient: 'from-sky-500 to-sky-600',
        trend: '+5%'
      },
      { 
        label: 'Filed This Month', 
        value: stats.filedCount || 0, 
        icon: CheckCircle, 
        gradient: 'from-green-500 to-green-600',
        trend: '+18%'
      }
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-sky-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sky-600 text-xs mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-sky-900">{card.value}</p>
              </div>
              <div className={`w-10 h-10 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center`}>
                <Icon size={18} className="text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
              <TrendingUp size={12} />
              <span>{card.trend}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatCards;