import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, Calendar, History, CreditCard, MessageCircle, 
  CheckCircle, Clock, AlertCircle, FileText, Download 
} from 'lucide-react';
import Button from '../ui/Button';

const DashboardPreview = () => {
  const statusCards = [
    { title: 'GSTR-1', status: 'Filed', date: '11th Jan', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'GSTR-3B', status: 'Pending', date: '20th Jan', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'ITR Filing', status: 'In Process', date: '31st July', icon: AlertCircle, color: 'text-sky-600', bg: 'bg-sky-100' },
    { title: 'TDS Q4', status: 'Filed', date: '15th May', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const features = [
    { icon: Calendar, title: 'Due Date Reminders', desc: 'Never miss a deadline with automated alerts' },
    { icon: History, title: 'Acknowledgement History', desc: 'Access all your filing proofs in one place' },
    { icon: CreditCard, title: 'Payment History', desc: 'Track all invoices and payments easily' },
    { icon: MessageCircle, title: 'Chat with Accountant', desc: 'Direct messaging with your CA' },
    { icon: Upload, title: 'Document Upload', desc: 'Secure cloud storage for all documents' },
    { icon: Download, title: 'Download Proofs', desc: 'Instant access to all acknowledgements' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-sky-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold mb-4">
            Smart Dashboard
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Everything at <span className="text-gold-500">Your Fingertips</span>
          </h2>
          <p className="text-sky-600 max-w-2xl mx-auto">
            Track all your compliance activities in one powerful dashboard
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm mb-10">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-sky-900">Filing Status</h3>
            <Button variant="gold" size="sm">
              <Upload size={16} className="mr-2" />
              Monthly Upload
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statusCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sky-800">{card.title}</span>
                    <Icon size={18} className={card.color} />
                  </div>
                  <p className="text-sm text-sky-600 mb-2">Due: {card.date}</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${card.bg} ${card.color}`}>
                    {card.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-sky-50 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center">
                    <Icon size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sky-900 text-sm">{item.title}</h5>
                    <p className="text-xs text-sky-600">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;