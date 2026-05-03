import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is GST and who needs to register?',
      answer: 'GST (Goods and Services Tax) is a unified indirect tax in India. Businesses with an annual turnover exceeding ₹20 lakhs (₹10 lakhs for special states) must register for GST. E-commerce operators and those making interstate supplies must also register regardless of turnover.'
    },
    {
      question: 'What are the different types of ITR forms?',
      answer: 'ITR-1 is for salaried individuals, ITR-2 for individuals with capital gains, ITR-3 for business professionals, ITR-4 for presumptive income, and ITR-5 to ITR-7 for firms, companies, and trusts. We help you choose and file the correct form.'
    },
    {
      question: 'What is TDS and when should it be deposited?',
      answer: 'TDS (Tax Deducted at Source) is tax collected when making specified payments like salary, rent, professional fees. It must be deposited by the 7th of the following month. Quarterly returns (Form 24Q, 26Q, 27Q) must be filed by the due dates.'
    },
    {
      question: 'How does your document upload system work?',
      answer: 'Our secure portal allows you to upload documents by month and category (GST, ITR, TDS). You can upload multiple files, add notes, and track which documents have been processed. All files are encrypted and stored securely.'
    },
    {
      question: 'What are your pricing plans?',
      answer: 'We offer GST Basic at ₹499/month, ITR Pro at ₹999/filing, TDS Compliance at ₹1,499/quarter, and an all-inclusive Enterprise plan at ₹4,999/month. All plans include email support and due date reminders.'
    },
    {
      question: 'How do I track my filing status?',
      answer: 'Once logged in, your dashboard shows real-time status of all filings: Pending, In Process, or Filed. You will receive email and WhatsApp notifications at every stage, and acknowledgements are available for download instantly after filing.'
    }
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
            FAQ
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-gold-500">Questions</span>
          </h2>
          <p className="text-sky-600 max-w-2xl mx-auto">
            Find answers to common questions about tax and compliance
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left hover:bg-sky-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={18} className="text-gold-500" />
                  <span className="font-semibold text-sky-900">{faq.question}</span>
                </div>
                {openIndex === index ? (
                  <ChevronUp size={18} className="text-gold-500" />
                ) : (
                  <ChevronDown size={18} className="text-sky-400" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-sky-100"
                  >
                    <div className="p-5 pt-0 text-sky-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;