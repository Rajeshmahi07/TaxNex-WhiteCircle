import React from 'react';
import { motion } from 'framer-motion';
import { 
  CloudUpload, Bell, History, UserCheck, Lock, LayoutDashboard, 
  Headphones, Zap, Shield, Award, Rocket, Clock
} from 'lucide-react';

const KeyFeatures = () => {
  const features = [
    { icon: LayoutDashboard, title: '100% Digital Workflow', desc: 'End-to-end digital process with zero paperwork', color: 'from-sky-500 to-sky-600' },
    { icon: CloudUpload, title: 'Auto Document Upload', desc: 'Smart document upload with auto-categorization', color: 'from-sky-500 to-sky-600' },
    { icon: Bell, title: 'Due Date Reminders', desc: 'Automated reminders via Email, WhatsApp & SMS', color: 'from-gold-500 to-gold-600' },
    { icon: History, title: 'Filing History & Proofs', desc: 'Lifetime access to all filings and acknowledgements', color: 'from-sky-500 to-sky-600' },
    { icon: UserCheck, title: 'CA Support', desc: 'Dedicated CA assigned to your account', color: 'from-sky-500 to-sky-600' },
    { icon: Lock, title: 'Secure Cloud Storage', desc: 'Bank-grade encryption for all your documents', color: 'from-sky-500 to-sky-600' },
    { icon: Zap, title: 'Fast Turnaround', desc: 'Same-day filing and immediate acknowledgement', color: 'from-gold-500 to-gold-600' },
    { icon: Headphones, title: '24/7 Support', desc: 'Get answers to your queries anytime', color: 'from-sky-500 to-sky-600' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Powerful Features <span className="text-gold-500">You'll Love</span>
          </h2>
          <p className="text-sky-600 max-w-2xl mx-auto">
            Everything you need to manage your tax compliance effortlessly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-sky-50 rounded-2xl p-6 text-center group hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={28} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-sky-900">{feature.title}</h4>
              <p className="text-sky-600 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;