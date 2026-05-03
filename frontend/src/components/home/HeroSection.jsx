import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Zap, Users, TrendingUp, Award, CheckCircle, Sun, Cloud } from 'lucide-react';
import Button from '../ui/Button';

const HeroSection = () => {
  const quickLinks = ['GST Filing', 'ITR Filing', 'TDS Filing', 'Business Registration'];
  
  const stats = [
    { icon: Shield, value: '99%', label: 'Filing Accuracy' },
    { icon: Zap, value: '24/7', label: 'Support Available' },
    { icon: Users, value: '50K+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '1L+', label: 'Returns Filed' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Light Sky Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200" />
      
      {/* Soft Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-sky-300/30 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl animate-pulse-soft" />
      </div>

      <div className="container-custom text-center max-w-5xl z-10 py-16 lg:py-24">
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-5 py-2 mb-6 rounded-full shadow-sm border border-sky-200"
        >
          <Sun size={16} className="text-gold-500" />
          <span className="text-sm text-sky-700 font-medium">✨ Trusted by 10,000+ Businesses</span>
          <Award size={14} className="text-gold-500" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-sky-900">India's Most Trusted</span>
          <br />
          <span className="text-gold-600">Tax & Compliance Platform</span>
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sky-700 text-lg mb-8 max-w-2xl mx-auto"
        >
          Simplify your GST, ITR, and TDS filing with our automated compliance platform.
          Get dedicated CA support, instant reminders, and secure document management.
        </motion.p>

        {/* Trust Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {['ISO 27001 Certified', 'GDPR Compliant', 'Bank-Grade Security', '24/7 Support'].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5 text-xs text-sky-600 bg-white/50 px-3 py-1.5 rounded-full">
              <CheckCircle size={12} className="text-gold-500" />
              <span>{badge}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <Link to="/register">
            <Button variant="gold" size="lg" className="group shadow-lg hover:shadow-gold/25">
              Get Started
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg">Login</Button>
          </Link>
          <Button variant="secondary" size="lg">Book Free Consultation →</Button>
        </motion.div>

        {/* Quick Links Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {quickLinks.map((item) => (
            <span 
              key={item} 
              className="bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-sky-700 hover:text-gold-600 hover:bg-white/80 transition-all duration-300 cursor-pointer hover:scale-105 rounded-full shadow-sm"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="bg-white/60 backdrop-blur-sm p-5 text-center hover:bg-white/80 transition-all duration-300 hover:-translate-y-2 rounded-2xl shadow-sm"
              >
                <Icon size={28} className="text-gold-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-sky-900">{stat.value}</div>
                <div className="text-xs text-sky-600 mt-1">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;