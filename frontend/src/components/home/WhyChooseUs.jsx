import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Lock, Calendar, Users, Tag, Zap, 
  Award, Headphones, BarChart3, FileCheck, Clock, Sparkles
} from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    { icon: Shield, title: 'ISO Certified Process', desc: 'Our workflows are ISO 27001 certified for quality and security', color: 'from-sky-500 to-sky-600' },
    { icon: Lock, title: 'Secure Encryption', desc: '256-bit SSL encryption protects all your sensitive data', color: 'from-sky-500 to-sky-600' },
    { icon: Calendar, title: 'Automated Compliance Calendar', desc: 'Never miss a deadline with our smart reminder system', color: 'from-gold-500 to-gold-600' },
    { icon: Users, title: 'Dedicated Accountant', desc: 'A qualified CA assigned exclusively to your account', color: 'from-sky-500 to-sky-600' },
    { icon: Tag, title: 'Transparent Pricing', desc: 'No hidden fees. Pay only for what you need', color: 'from-sky-500 to-sky-600' },
    { icon: Zap, title: 'Fast Turnaround', desc: 'Same-day filing and immediate acknowledgement', color: 'from-gold-500 to-gold-600' },
    { icon: Award, title: 'Award Winning Platform', desc: 'Recognized as India\'s best tax compliance platform', color: 'from-sky-500 to-sky-600' },
    { icon: Headphones, title: '24/7 Customer Support', desc: 'Round-the-clock assistance for all your queries', color: 'from-sky-500 to-sky-600' },
    { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track your compliance health with detailed reports', color: 'from-gold-500 to-gold-600' },
    { icon: FileCheck, title: '100% Digital Workflow', desc: 'End-to-end digital process with zero paperwork', color: 'from-sky-500 to-sky-600' },
    { icon: Clock, title: '10+ Years Experience', desc: 'Decades of expertise in tax and compliance', color: 'from-sky-500 to-sky-600' },
    { icon: Sparkles, title: 'AI-Powered Automation', desc: 'Smart automation for error-free filings', color: 'from-gold-500 to-gold-600' },
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
            Why <span className="text-gold-500">Choose Us?</span>
          </h2>
          <p className="text-sky-600 max-w-2xl mx-auto">
            Trusted by businesses across India for reliable compliance solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-sky-50 rounded-2xl p-6 group hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2 text-sky-900 group-hover:text-gold-600 transition-colors">
                      {reason.title}
                    </h4>
                    <p className="text-sky-600 text-sm leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-sky-100"
        >
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['ISO 27001 Certified', 'GDPR Compliant', 'PCI DSS Level 1', 'SSL Secure', 'Trusted by 10K+'].map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <Shield size={16} className="text-gold-500" />
                <span className="text-sm text-sky-600">{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;