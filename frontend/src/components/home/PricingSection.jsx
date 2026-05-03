import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, User, Mail, Phone, MessageCircle, Send, Star, TrendingUp, Shield } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const PricingSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    service: '', 
    message: '',
    agreeTerms: false 
  });
  const [errors, setErrors] = useState({});
  const nameInputRef = useRef(null);

  // Focus on name input when modal opens
  useEffect(() => {
    if (showForm && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [showForm]);

  const plans = [
    {
      name: 'GST Basic',
      price: '499',
      period: '/month',
      description: 'Perfect for small businesses',
      popular: false,
      icon: TrendingUp,
      features: [
        'GSTR-1 Filing',
        'GSTR-3B Filing',
        'Document Upload',
        'Email Support',
        'Due Date Reminders'
      ],
      notIncluded: ['GST Annual Return', 'Tax Audit', 'Dedicated CA']
    },
    {
      name: 'ITR Pro',
      price: '999',
      period: '/filing',
      description: 'For salaried & professionals',
      popular: true,
      icon: Star,
      features: [
        'ITR-1 to ITR-4 Filing',
        'Form 16 Upload',
        'Investment Declaration',
        'Deduction Optimization',
        'Expert Review',
        'Acknowledgement Download'
      ],
      notIncluded: ['Business ITR', 'Tax Planning']
    },
    {
      name: 'TDS Compliance',
      price: '1,499',
      period: '/quarter',
      description: 'Complete TDS management',
      popular: false,
      icon: Shield,
      features: [
        'Quarterly TDS Returns',
        'TAN Management',
        'Challan Generation',
        '26AS Reconciliation',
        'Email & Phone Support'
      ],
      notIncluded: ['TDS Audit', 'Penalty Handling']
    },
    {
      name: 'Enterprise',
      price: '4,999',
      period: '/month',
      description: 'Full compliance suite',
      popular: false,
      icon: Sparkles,
      features: [
        'GST + ITR + TDS',
        'ROC/MCA Compliances',
        'Payroll Processing',
        'Dedicated CA',
        'Priority Support',
        'CFO Advisory',
        'Custom Reports'
      ],
      notIncluded: []
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
    setErrors({});
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setFormData({ 
      name: '', 
      email: '', 
      phone: '', 
      service: '', 
      message: '',
      agreeTerms: false 
    });
    setSelectedPlan(null);
    setErrors({});
    setIsSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success message
    alert(`✨ Thank you for your interest in ${selectedPlan?.name}!\n\nOur team will contact you within 24 hours.\n\n📞 Call us: +91 98765 43210\n📧 Email: support@taxsure.in`);
    
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-sky-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gold-100 text-gold-700 text-sm font-semibold mb-4">
            Pricing Plans
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            Simple, <span className="text-gold-500">Transparent Pricing</span>
          </h2>
          <p className="text-sky-600 text-sm sm:text-base max-w-2xl mx-auto">
            Choose a plan that fits your business needs. No hidden charges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl relative transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 ${
                  plan.popular ? 'ring-2 ring-gold-500 shadow-gold' : 'border border-sky-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 whitespace-nowrap">
                    🔥 MOST POPULAR
                  </div>
                )}
                <div className="p-5 lg:p-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    plan.popular ? 'bg-gold-100 text-gold-600' : 'bg-sky-100 text-sky-600'
                  }`}>
                    <Icon size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-sky-900 mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-sky-900">₹{plan.price}</span>
                    <span className="text-sky-500 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-sky-600 text-sm mb-5">{plan.description}</p>
                  
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-sky-700">
                        <Check size={14} className="text-green-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-sky-400">
                        <X size={14} className="flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.popular ? 'gold' : 'outline'} 
                    className="w-full justify-center"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Consultation Modal with Close Button */}
      <Modal 
        isOpen={showForm} 
        onClose={handleCloseModal} 
        title=""
        size="md"
        showClose={true}
        closeOnOverlayClick={true}
      >
        <div className="relative">
          {/* Close button in modal body as well (for mobile) */}
          <button
            onClick={handleCloseModal}
            className="absolute -top-2 -right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all lg:hidden"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Sparkles size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-sky-900">Request Consultation</h3>
            <p className="text-sky-600 text-sm mt-1">
              {selectedPlan?.name} - ₹{selectedPlan?.price}{selectedPlan?.period}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-sky-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" />
                <input
                  ref={nameInputRef}
                  type="text"
                  name="name"
                  className={`w-full px-4 py-2.5 pl-10 rounded-xl border ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-sky-200 focus:border-gold-500'
                  } focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all`}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-sky-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" />
                <input
                  type="email"
                  name="email"
                  className={`w-full px-4 py-2.5 pl-10 rounded-xl border ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-sky-200 focus:border-gold-500'
                  } focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-sky-700 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" />
                <input
                  type="tel"
                  name="phone"
                  className={`w-full px-4 py-2.5 pl-10 rounded-xl border ${
                    errors.phone ? 'border-red-500 focus:border-red-500' : 'border-sky-200 focus:border-gold-500'
                  } focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all`}
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-medium text-sky-700 mb-1.5">
                Message <span className="text-sky-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <MessageCircle size={18} className="absolute left-3 top-3 text-sky-400" />
                <textarea
                  name="message"
                  className="w-full px-4 py-2.5 pl-10 rounded-xl border border-sky-200 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all min-h-[80px]"
                  rows="3"
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agreeTerms"
                id="agreeTerms"
                className="mt-0.5 w-4 h-4 rounded border-sky-300 text-gold-500 focus:ring-gold-500"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
              />
              <label htmlFor="agreeTerms" className="text-xs text-sky-600">
                I agree to the <a href="#" className="text-gold-500 hover:underline">Terms of Service</a> and <a href="#" className="text-gold-500 hover:underline">Privacy Policy</a>
              </label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms}</p>}

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="gold" 
              className="w-full py-3 mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Request
                </>
              )}
            </Button>

            {/* Contact Info */}
            <div className="text-center pt-3 border-t border-sky-100">
              <p className="text-xs text-sky-500">
                Or call us directly: <a href="tel:+919876543210" className="text-gold-500 font-medium">+91 98765 43210</a>
              </p>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default PricingSection;