import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const CareerSection = () => {
  const jobs = [
    { 
      title: 'Chartered Accountant', 
      location: 'Mumbai', 
      type: 'Full-time', 
      exp: '2-5 years',
      salary: '₹8L - ₹15L PA'
    },
    { 
      title: 'GST Consultant', 
      location: 'Delhi NCR', 
      type: 'Full-time', 
      exp: '1-3 years',
      salary: '₹5L - ₹10L PA'
    },
    { 
      title: 'Tax Analyst', 
      location: 'Bangalore', 
      type: 'Full-time', 
      exp: '0-2 years',
      salary: '₹4L - ₹7L PA'
    },
    { 
      title: 'Client Relationship Manager', 
      location: 'Hyderabad', 
      type: 'Full-time', 
      exp: '2-4 years',
      salary: '₹6L - ₹12L PA'
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-sky-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gold-100 text-gold-600 text-sm font-semibold mb-4">
            Join Our Team
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Work With <span className="text-gold-500">Industry Leaders</span>
          </h2>
          <p className="text-sky-600 max-w-2xl mx-auto">
            Be part of India's fastest growing tax technology company
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-sky-900 mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-sky-600">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-gold-500" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-gold-500" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} className="text-gold-500" />
                      {job.exp}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-sky-500">Salary Range</p>
                  <p className="font-semibold text-sky-900">{job.salary}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-sky-100">
                <div className="flex gap-2">
                  <span className="bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded-full">Immediate Joiners</span>
                  <span className="bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded-full">WFH Available</span>
                </div>
                <Button variant="outline" size="sm">
                  Apply Now <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-sky-600 mb-4">Can't find the right role?</p>
          <Button variant="secondary">
            Send us your Resume <Sparkles size={16} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerSection;