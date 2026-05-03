import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, FileText, Percent, BookOpen, Search, 
  Building2, Briefcase, Shield, Sparkles
} from 'lucide-react';

const ServicesGrid = () => {
  const taxServices = [
    { icon: Calculator, title: 'GST Registration', desc: 'Quick GST registration for your business' },
    { icon: FileText, title: 'GST Filing', desc: 'GSTR-1, GSTR-3B, CMP-08, Annual Returns' },
    { icon: Percent, title: 'Income Tax Filing', desc: 'ITR-1 to ITR-7 for all categories' },
    { icon: BookOpen, title: 'Accounting & Bookkeeping', desc: 'Monthly bookkeeping and ledger maintenance' },
    { icon: Search, title: 'Tax Audit', desc: 'Comprehensive tax audit services' },
    { icon: Building2, title: 'ROC/MCA Compliances', desc: 'Annual filings and compliance management' },
    { icon: Briefcase, title: 'Payroll Processing', desc: 'Salary processing and compliance' },
    { icon: Shield, title: 'TDS/TCS Filing', desc: 'Quarterly TDS returns and compliance' },
  ];

  const ServiceCard = ({ icon: Icon, title, desc, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="h-full"
    >
      <div className="bg-white rounded-2xl p-6 group transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform duration-300">
            <Icon size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-sky-900 group-hover:text-gold-600 transition-colors">
              {title}
            </h4>
            <p className="text-sky-600 text-sm leading-relaxed">{desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gold-100 text-gold-600 text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Comprehensive <span className="text-gold-500">Tax & Compliance</span> Solutions
          </h2>
          <p className="text-sky-600 max-w-2xl mx-auto">
            Tailored for Indian businesses, from startups to enterprises
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {taxServices.map((service, idx) => (
            <ServiceCard key={service.title} {...service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;